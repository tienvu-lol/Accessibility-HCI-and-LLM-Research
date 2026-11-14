// Phase B executor: drives one declared open-weight model through one replica over several
// exchanges, writes only what it emits into that slot's directory, preserves the raw artifact,
// then runs the shared QC and a bounded, recorded correction loop.
// It never commits, pushes, publishes or marks a replica accepted.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {
  loadSetup, validateSetup, buildReadiness, validateModels, categoryFor, modelForSlot, modelRecord, slotOf,
  readCSV, inside, cliArgs, hash, nowISO, stamp, writeJSON, readJSON, redact, queueUpdate, padSlot,
} from './lib.mjs';
import {Agent} from './provider.mjs';
import {parseResponse, applyFiles, PROTOCOL_HELP, LIMITS} from './fileproto.mjs';
import {runQC, validationSummary, qcHeadline} from './qc-runner.mjs';

const isMain = meta => process.argv[1] && fileURLToPath(meta.url) === path.resolve(process.argv[1]);

const USAGE = `Usage: node run-build.mjs <ID> --operator "name" [options]

  <ID>            an open-source slot, e.g. UNI-07
  --operator      who is running this build; recorded in the provenance (required)
  --dry-run       print the task that would be sent and exit; no API call, no files
  --max-turns N   override config.execution.max_build_turns
  --repairs N     override config.execution.max_repair_rounds (0 disables correction)
  --no-qc         generate only, skip QC entirely; gates stay not-tested
  --skip-keys     readiness check without requiring the API key present (dry runs only)`;

const DOC_FILES = ['README.md', 'fidelity-notes.md', 'component-inventory.json', 'generation-metadata.json'];
const CORE_FILES = ['index.html', '404.html', 'css/styles.css', 'js/main.js'];

const gitRevision = root => {
  const r = spawnSync('git', ['rev-parse', '--short', 'HEAD'], {cwd: root, encoding: 'utf8'});
  return r.status === 0 ? r.stdout.trim() : null;
};

function copyTree(from, to) {
  fs.mkdirSync(to, {recursive: true});
  for (const entry of fs.readdirSync(from, {withFileTypes: true})) {
    const src = path.join(from, entry.name), dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyTree(src, dest);
    else if (entry.isFile()) fs.copyFileSync(src, dest);
  }
}

const listFiles = dir => !fs.existsSync(dir) ? [] : fs.readdirSync(dir, {withFileTypes: true}).flatMap(e =>
  e.isDirectory() ? listFiles(path.join(dir, e.name)).map(f => `${e.name}/${f}`) : [e.name]);

export function missingDeliverables(siteDir, pageMap) {
  const present = new Set(listFiles(siteDir));
  const wanted = [...new Set([...CORE_FILES, ...DOC_FILES, ...pageMap.map(p => p.local_file)])];
  return wanted.filter(f => !present.has(f));
}

function taskContext(setup, {id, category, row, model, runID, snapshots, operator, revision}) {
  const slot = slotOf(id);
  const pageMap = JSON.parse(row.source_pages);
  return {
    phase: 'build', source_id: id, slot, category: category.category, category_name: category.name,
    model_group: 'open-source',
    output_directory: `${category.category}/open-source/${id}`,
    stratum: category.sampling_strata.find(s => s.slot === slot)?.stratum ?? null,
    approved_source: {
      source_name: row.source_name, source_url: row.source_url,
      verified_at: row.verified_at, verification_method: row.verification_method,
      verification_result: row.verification_result, evidence_reference: row.evidence_reference,
      complexity: row.complexity, stack_clues: row.stack_clues, limitations: row.limitations,
      approved_at: row.approved_at, approved_by: row.approved_by, approval_reference: row.approval_reference,
    },
    approved_page_map: pageMap,
    observed_key_regions: JSON.parse(row.key_regions),
    observed_key_interactions: JSON.parse(row.key_interactions),
    category_requirements: {
      representative_pages: category.representative_pages,
      conditional_interactions: category.conditional_interactions,
      simulation_notes: category.simulation_notes,
      scope_rule: category.scope_rule,
    },
    generation_metadata_values: {
      allocation_protocol: 'WEB-REPLICA-ALLOCATION-V1.0',
      generation_protocol: 'WEB-REPLICA-V1.0',
      category: category.category, slot, source_id: id, model_group: 'open-source',
      model_id: model.model_id, model_version: model.model_version ?? null,
      model_provider_or_runtime: `${model.provider} (OpenAI-compatible chat completions); open weights ${model.license}, ${model.weights_url}`,
      generation_mode: 'orchestrated API agent, multi-turn file emission, one replica per run, no human authoring of site code',
      operator,
      approved_source_url: row.source_url,
      source_verified_at: row.verified_at,
      source_approved_at: row.approved_at,
      rules_revision: `WEB-REPLICA-V1.0 / WEB-REPLICA-ALLOCATION-V1.0${revision ? ` at commit ${revision}` : ''} (Rules.md sha256 ${snapshots[0].sha256.slice(0, 12)})`,
      category_prompt_revision: `pipelines/open-source/prompts/build.md sha256 ${snapshots.find(s => s.path.endsWith('prompts/build.md'))?.sha256.slice(0, 12)}`,
      prompt_or_transcript_reference: `pipelines/open-source/runs/${runID}/transcript.json`,
      human_edits: [],
      validation_summary: 'left at not-tested by you; the orchestrator sets these seven gates from the real QC run',
    },
    protocol_snapshots: snapshots,
    verification_limits: 'Source availability was checked by HTTP GET only. No page was rendered in a browser and no interaction was exercised during research. Do not describe the reference as visually inspected.',
  };
}

function buildTask(setup, context) {
  return `${fs.readFileSync(path.join(setup.pipeline, 'prompts/build.md'), 'utf8')}

## The file protocol

${PROTOCOL_HELP}

Size limits: at most ${LIMITS.maxFiles} files and ${Math.round(LIMITS.maxFileBytes / 1024)} KB per file.

## Exact task context

\`\`\`json
${JSON.stringify(context, null, 2)}
\`\`\`

## This exchange

Start with the plan only — no file blocks yet. List: the local pages from \`approved_page_map\` in build order; the shared components and which pages use them; the inline sample datasets with their row counts; the interactions you will implement, each tied to an entry in \`observed_key_interactions\` or marked as an intentional addition; and anything in the page map you think you cannot build and why. Keep it under 400 words and end with \`=== STATUS: CONTINUE ===\`.`;
}

function continuePrompt({written, rejected, missing, turn, maxTurns}) {
  const lines = [`## Exchange ${turn} of at most ${maxTurns}`];
  if (written.length) lines.push(`Written so far (${written.length}): ${written.join(', ')}`);
  if (rejected.length) {
    lines.push(`\nRejected and NOT written — fix and resend each of these in full:`);
    for (const r of rejected) lines.push(`- \`${r.path}\`: ${r.reason}`);
  }
  lines.push(`\nStill missing: ${missing.length ? missing.map(m => `\`${m}\``).join(', ') : 'nothing from the required list'}`);
  lines.push(`\nContinue with the next two or three files, complete, through the file protocol. Emit \`=== STATUS: COMPLETE ===\` only when every required file and every page in the approved map exists and the documentation is written.`);
  return lines.join('\n');
}

function repairPrompt(setup, {qc, round, maxRounds}) {
  const failures = [...new Set(qc.failures)];
  const shown = failures.slice(0, 60);
  return `${fs.readFileSync(path.join(setup.pipeline, 'prompts/repair.md'), 'utf8')}

## The file protocol

${PROTOCOL_HELP}

## Correction round ${round} of at most ${maxRounds}

The shared QC tool ran against your delivered site. Exit code ${qc.exit_code}; it reported ${qc.failure_count} failures over ${qc.pages} pages, at viewport widths 1280px and 375px.

${shown.length ? `Failures:\n${shown.map(f => `- ${f}`).join('\n')}` : '(no failure list was captured)'}${failures.length > shown.length ? `\n- ...and ${failures.length - shown.length} more of the same kinds` : ''}

${qc.warnings?.length ? `Warnings (not failures, but worth a look):\n${[...new Set(qc.warnings)].slice(0, 10).map(w => `- ${w}`).join('\n')}\n` : ''}
Resend every file you change, complete. End with \`=== STATUS: COMPLETE ===\` and a list of what you changed.`;
}

function finalizeProvenance({siteDir, context, qc, usage, runID, interactionsReviewed}) {
  const file = path.join(siteDir, 'generation-metadata.json');
  let existing = {};
  let wasValid = false;
  try { existing = readJSON(file); wasValid = existing && typeof existing === 'object' && !Array.isArray(existing); }
  catch { wasValid = false; }
  if (!wasValid) existing = {};
  const authoritative = {...context.generation_metadata_values};
  delete authoritative.validation_summary;
  delete authoritative.human_edits;
  const edits = Array.isArray(existing.human_edits) ? existing.human_edits : [];
  const summary = qc ? validationSummary(qc, {interactionsReviewed}) : {
    technology: 'not-tested', completeness: 'not-tested', structure: 'not-tested',
    interaction: 'not-tested', accessibility: 'not-tested', traceability: 'not-tested', scope: 'not-tested',
  };
  const merged = {
    ...existing,
    ...authoritative,
    generation_started_at: context.generation_started_at ?? existing.generation_started_at ?? null,
    generation_completed_at: context.generation_completed_at ?? null,
    validation_summary: summary,
    human_edits: [...edits, {
      by: 'open-source pipeline orchestrator (scripts/run-build.mjs)',
      at: nowISO(),
      what: wasValid
        ? 'Normalized the provenance identifiers, model attribution, approval and revision fields to the recorded task values, and set validation_summary from the actual QC run. No website code was authored or edited by the orchestrator.'
        : 'The model did not emit a valid generation-metadata.json, so the orchestrator wrote it from the recorded task values and the actual QC run. No website code was authored or edited by the orchestrator.',
      qc_evidence: qc ? `pipelines/open-source/runs/${runID}/${qc.report ?? qc.log}` : null,
      generation_budget: usage ? {requests: usage.requests, retries: usage.retries, total_tokens: usage.total_tokens || null} : null,
    }],
  };
  writeJSON(file, merged);
  return {wrote: true, modelEmittedValidMetadata: wasValid};
}

export async function runBuild({id, operator, dryRun = false, maxTurns, repairs, noQC = false, skipKeys = false, root} = {}) {
  const setup = loadSetup(root);
  const setupErrors = validateSetup(setup);
  if (setupErrors.length) throw new Error('Pipeline validation failed:\n' + setupErrors.join('\n'));
  const category = categoryFor(setup, id);
  if (!category || !new RegExp(`^${category.prefix}-(07|08|09|10)$`).test(id))
    throw new Error(`Build target must be an allocated open-source ID (07-10); got "${id}"`);
  if (!operator?.trim()) throw new Error('--operator is required: the provenance record names who ran the build');

  const blockers = buildReadiness(setup, id, {requireKeys: !dryRun && !skipKeys});
  if (blockers.length) throw new Error('BLOCKED — build prerequisites are not met:\n' + blockers.map(b => `- ${b}`).join('\n'));
  const declarationNotes = validateModels(setup, {needSlots: [slotOf(id)]}).filter(e => e.startsWith('Note:'));
  for (const note of declarationNotes) console.warn(`WARN ${note}`);

  const slot = slotOf(id);
  const model = modelForSlot(setup, slot);
  const inventoryPath = inside(setup.root, `${setup.config.paths.inventories}/${category.category}.csv`);
  const row = readCSV(inventoryPath).find(r => r.source_id === id);
  const siteRel = `${category.category}/open-source/${id}`;
  const siteDir = inside(setup.root, siteRel);
  if (fs.existsSync(siteDir) && fs.readdirSync(siteDir).length)
    throw new Error(`${siteRel} already has files. A regeneration is a recorded decision: move or remove the existing replica first, or run a correction round against its existing run.`);

  const turnBudget = maxTurns ?? setup.config.execution.max_build_turns;
  const repairBudget = repairs ?? setup.config.execution.max_repair_rounds;
  const revision = gitRevision(setup.root);

  const runID = `${stamp()}-build-${id}`;
  const snapshotSources = [
    inside(setup.root, setup.config.paths.rules),
    inside(setup.root, setup.config.paths.allocation),
    path.join(setup.pipeline, 'config.json'),
    path.join(setup.pipeline, 'categories.json'),
    path.join(setup.pipeline, 'prompts/system.md'),
    path.join(setup.pipeline, 'prompts/build.md'),
    path.join(setup.pipeline, 'prompts/repair.md'),
    path.join(setup.pipeline, setup.config.models_file),
    inventoryPath,
    inside(setup.root, setup.config.paths.assignments),
  ];
  const snapshots = snapshotSources.map(file => ({
    path: path.relative(setup.root, file).split(path.sep).join('/'),
    sha256: hash(fs.readFileSync(file)),
    source: file,
  }));
  const context = taskContext(setup, {id, category, row, model, runID, snapshots: snapshots.map(({source, ...s}) => s), operator, revision});
  const system = fs.readFileSync(path.join(setup.pipeline, 'prompts/system.md'), 'utf8');
  const task = buildTask(setup, context);

  if (dryRun) return {dryRun: true, system, task, model: modelRecord(model), site: siteRel,
    pages: context.approved_page_map.length, turnBudget, repairBudget};

  const dir = inside(setup.pipeline, `runs/${runID}`);
  fs.mkdirSync(dir, {recursive: false});
  const snapDir = path.join(dir, 'snapshots');
  fs.mkdirSync(snapDir);
  snapshots.forEach((s, i) => fs.copyFileSync(s.source, path.join(snapDir, `${padSlot(i + 1)}-${path.basename(s.source)}`), fs.constants.COPYFILE_EXCL));

  const run = {
    run_id: runID, phase: 'build', target: id, category: category.category, slot,
    model_group: 'open-source', model: modelRecord(model), operator,
    status: 'running', prepared_at: nowISO(), generation_started_at: nowISO(), generation_completed_at: null,
    tool_access: 'chat-completions API only: no browsing, no shell, no filesystem. The orchestrator wrote every file and ran every check.',
    budget: {max_build_turns: turnBudget, max_repair_rounds: repairBudget, max_tokens_per_request: model.params.max_tokens, temperature: model.params.temperature},
    approved_source: context.approved_source, approved_page_map: context.approved_page_map,
    protocol_snapshots: snapshots.map(({source, ...s}) => s),
    turns: [], rejected_files: [], qc_runs: [], repair_rounds: [], retries: [], human_edits: [],
    usage: null, errors: [], outputs: {site: siteRel, transcript: `pipelines/open-source/runs/${runID}/transcript.json`},
  };
  const runFile = path.join(dir, 'run.json');
  const save = () => writeJSON(runFile, run);
  save();
  const queueTask = `build-${id}`;
  queueUpdate(setup, queueTask, {status: 'running', run_id: runID});

  const agent = new Agent({model, api: setup.config.api, system});
  fs.mkdirSync(siteDir, {recursive: true});
  const state = {written: new Map(), bytes: 0};
  let claimedComplete = false;

  const recordTurn = (label, response, applied) => {
    run.turns.push({
      turn: agent.turns.length, label,
      status_line: applied.status, prose_chars: applied.prose.length,
      files_written: applied.results.filter(r => r.ok).map(r => r.path),
      files_rejected: applied.results.filter(r => !r.ok).map(r => ({path: r.path, reason: r.reason})),
      truncated: applied.truncated,
      finish_reason: agent.turns.at(-1)?.finish_reason ?? null,
      usage: agent.turns.at(-1)?.usage ?? null,
      at: nowISO(),
    });
    run.rejected_files.push(...applied.results.filter(r => !r.ok).map(r => ({turn: agent.turns.length, path: r.path, reason: r.reason})));
    run.usage = agent.usage;
    save();
  };

  const emit = async (prompt, label) => {
    const res = await agent.ask(prompt, {label});
    const parsed = parseResponse(res.text);
    const {results} = applyFiles(siteDir, parsed.files, {state});
    const applied = {...parsed, results};
    recordTurn(label, res.text, applied);
    return applied;
  };

  try {
    let applied = await emit(task, 'plan');
    for (let turn = 2; turn <= turnBudget; turn++) {
      const missing = missingDeliverables(siteDir, context.approved_page_map);
      const rejected = applied.results.filter(r => !r.ok).map(r => ({path: r.path, reason: r.reason}));
      if (applied.status === 'COMPLETE') claimedComplete = true;
      if (applied.status === 'COMPLETE' && !missing.length && !rejected.length) break;
      applied = await emit(continuePrompt({
        written: [...state.written.keys()], rejected, missing, turn, maxTurns: turnBudget,
      }), `files-${turn}`);
      agent.trim(8);
    }
    const missingAtEnd = missingDeliverables(siteDir, context.approved_page_map);
    if (applied.status === 'COMPLETE') claimedComplete = true;
    run.delivered = {
      files: [...state.written.keys()].sort(), file_count: state.written.size, bytes: state.bytes,
      pages_in_map: context.approved_page_map.length,
      missing_required: missingAtEnd,
      model_claimed_complete: claimedComplete,
      delivered_complete: Boolean(state.written.size) && !missingAtEnd.length,
      turns_used: agent.turns.length, turn_budget: turnBudget,
    };
    save();

    // Preserve the raw generated artifact before any correction round touches it.
    if (setup.config.execution.preserve_initial_artifact && state.written.size) {
      copyTree(siteDir, path.join(dir, 'initial'));
      run.initial_artifact = `pipelines/open-source/runs/${runID}/initial`;
      save();
    }

    let qc = null;
    if (!noQC && state.written.size) {
      qc = runQC(setup, siteDir, dir, {label: 'qc-initial'});
      run.qc_runs.push(qc);
      save();
      for (let round = 1; round <= repairBudget && qc.executed && !qc.passed; round++) {
        const applied2 = await emit(repairPrompt(setup, {qc, round, maxRounds: repairBudget}), `repair-${round}`);
        for (let extra = 1; extra <= 4; extra++) {
          if (applied2.status === 'COMPLETE' && !applied2.results.some(r => !r.ok)) break;
          const rejected = applied2.results.filter(r => !r.ok).map(r => ({path: r.path, reason: r.reason}));
          Object.assign(applied2, await emit(continuePrompt({
            written: [...state.written.keys()], rejected,
            missing: missingDeliverables(siteDir, context.approved_page_map),
            turn: agent.turns.length + 1, maxTurns: turnBudget + repairBudget * 5,
          }), `repair-${round}-cont-${extra}`));
        }
        const after = runQC(setup, siteDir, dir, {label: `qc-repair-${round}`});
        run.qc_runs.push(after);
        run.repair_rounds.push({
          round, before: {outcome: qc.outcome, failures: qc.failure_count},
          after: {outcome: after.outcome, failures: after.failure_count},
          files_changed: applied2.results.filter(r => r.ok).map(r => r.path),
          at: nowISO(),
        });
        qc = after;
        save();
      }
    }

    context.generation_started_at = run.generation_started_at;
    context.generation_completed_at = nowISO();
    const provenance = state.written.size
      ? finalizeProvenance({siteDir, context, qc, usage: agent.usage, runID, interactionsReviewed: false})
      : {wrote: false, modelEmittedValidMetadata: false};
    run.human_edits.push({
      by: 'orchestrator script', at: nowISO(),
      what: 'Wrote the model\'s emitted files, normalized generation-metadata.json provenance fields, and set validation_summary from the recorded QC run. No site markup, style or script was authored or edited by hand.',
    });

    writeJSON(path.join(dir, 'transcript.json'), {run_id: runID, model: modelRecord(model), turns: agent.transcript});
    run.generation_completed_at = context.generation_completed_at;
    run.usage = agent.usage;
    run.provenance = provenance;
    const deliveredOK = state.written.size > 0 && !missingAtEnd.length;
    run.status = deliveredOK ? 'completed' : 'incomplete';
    run.acceptance = 'not accepted: a QC result is not acceptance, and interaction review plus human acceptance happen outside this script';
    save();
    queueUpdate(setup, queueTask, {status: deliveredOK ? 'completed' : 'blocked'});
    return {runID, dir, site: siteRel, delivered: run.delivered, qc, usage: agent.usage,
      repairRounds: run.repair_rounds, provenance, status: run.status};
  } catch (e) {
    run.status = 'failed';
    run.errors.push(redact(e.message));
    run.usage = agent.usage;
    run.generation_completed_at = nowISO();
    try { writeJSON(path.join(dir, 'transcript.json'), {run_id: runID, model: modelRecord(model), turns: agent.transcript}); } catch {}
    save();
    queueUpdate(setup, queueTask, {status: 'blocked'});
    throw e;
  }
}

if (isMain(import.meta)) {
  try {
    const {positional, flags} = cliArgs(process.argv.slice(2), {
      operator: 'value', 'dry-run': 'boolean', 'max-turns': 'value', repairs: 'value', 'no-qc': 'boolean', 'skip-keys': 'boolean',
    });
    if (positional.length !== 1) throw new Error(USAGE);
    const result = await runBuild({
      id: positional[0], operator: flags.operator,
      dryRun: Boolean(flags['dry-run']),
      maxTurns: flags['max-turns'] ? Number(flags['max-turns']) : undefined,
      repairs: flags.repairs !== undefined ? Number(flags.repairs) : undefined,
      noQC: Boolean(flags['no-qc']), skipKeys: Boolean(flags['skip-keys']),
    });
    if (result.dryRun) {
      console.log(`--- system ---\n${result.system}\n--- build task (${result.model.model_id}) ---\n${result.task}`);
      console.log(`\nDry run for ${result.site}: ${result.pages} mapped pages, up to ${result.turnBudget} build turns and ${result.repairBudget} correction rounds. No API call, no files written.`);
    } else {
      console.log(`Build run ${result.runID} -> ${result.site} (${result.status})`);
      console.log(`Files: ${result.delivered.file_count}, turns: ${result.delivered.turns_used}/${result.delivered.turn_budget}, model claimed complete: ${result.delivered.model_claimed_complete}`);
      if (result.delivered.missing_required.length) console.log(`Missing required: ${result.delivered.missing_required.join(', ')}`);
      console.log(result.qc ? qcHeadline(result.qc) : 'QC skipped: every gate stays not-tested.');
      for (const r of result.repairRounds) console.log(`  correction ${r.round}: ${r.before.failures} -> ${r.after.failures} failures (${r.after.outcome})`);
      console.log(`Tokens: ${result.usage.total_tokens || 'not reported'} over ${result.usage.requests} requests (${result.usage.retries} retries).`);
      console.log('Nothing was committed, pushed or accepted. Register sync and human review are separate steps.');
    }
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
