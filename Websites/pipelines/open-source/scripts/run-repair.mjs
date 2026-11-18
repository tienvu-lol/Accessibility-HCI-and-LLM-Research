// Post-hoc QC correction for a replica that was already delivered.
//
// The in-run correction loop in run-build.mjs only applies to a build as it happens. Sixteen
// replicas were generated on 2026-11-17 while execution.max_repair_rounds was 0, so they were
// delivered uncorrected while the rest of the arm had been corrected in-run. This script applies
// the same correction stage to an existing replica so the arm is one consistent condition.
//
// It is NOT the study's accessibility-repair condition. It uses prompts/repair.md, the same prompt
// the in-run loop uses, and it is recorded as a separate run with phase "repair-posthoc" so the
// difference from an in-run correction stays visible in the data.
import fs from 'node:fs';
import path from 'node:path';
import {
  loadSetup, validateSetup, categoryFor, readCSV, inside, cliArgs, nowISO, stamp, writeJSON,
  hash, modelForSlot, slotOf, padSlot, buildReadiness, queueUpdate,
} from './lib.mjs';
import {Agent} from './provider.mjs';
import {parseResponse, applyFiles} from './fileproto.mjs';
import {runQC, qcHeadline} from './qc-runner.mjs';
import {
  missingDeliverables, copyTree, taskContext, continuePrompt, repairPrompt, finalizeProvenance,
} from './run-build.mjs';

const USAGE = `Usage: node run-repair.mjs <ID> --operator "name" [--rounds N] [--dry-run]

  Applies the QC correction stage to an ALREADY DELIVERED replica. The replica must exist and have
  an index.html. The pre-correction artifact is copied into the new run directory as before/ so the
  uncorrected emission is never lost.`;

export async function runRepair({id, operator, rounds, dryRun = false, root} = {}) {
  const setup = loadSetup(root);
  const errs = validateSetup(setup);
  if (errs.length) throw new Error('Pipeline validation failed:\n' + errs.join('\n'));
  if (!operator?.trim()) throw new Error('--operator is required');
  const category = categoryFor(setup, id);
  if (!category) throw new Error(`Unknown target ${id}`);
  const ready = buildReadiness(setup, id, {requireKeys: !dryRun});
  if (ready.length) throw new Error('Not ready:\n' + ready.join('\n'));

  const siteDir = inside(setup.root, `${category.category}/open-source/${id}`);
  if (!fs.existsSync(path.join(siteDir, 'index.html')))
    throw new Error(`${id} has no delivered index.html; this script corrects an existing replica, it does not build one`);

  const row = readCSV(inside(setup.root, `${setup.config.paths.inventories}/${category.category}.csv`))
    .find(r => r.source_id === id);
  const slot = slotOf(id);
  const model = modelForSlot(setup, slot);
  if (!model) throw new Error(`slot ${padSlot(slot)} is not declared`);
  if (!dryRun && !process.env[model.api_key_env])
    throw new Error(`${model.api_key_env} is not set`);
  const budget = rounds ?? setup.config.execution.max_repair_rounds;
  if (!budget) throw new Error('Repair budget is 0; pass --rounds N or raise execution.max_repair_rounds');

  const system = fs.readFileSync(path.join(setup.pipeline, 'prompts/system.md'), 'utf8');
  if (dryRun) {
    const qc = runQC(setup, siteDir, null, {label: 'qc-dry', noWrite: true});
    return {dryRun: true, id, qc, budget, prompt: repairPrompt(setup, {qc, round: 1, maxRounds: budget})};
  }

  const runID = `${stamp()}-repair-${id}`;
  const dir = inside(setup.pipeline, `runs/${runID}`);
  fs.mkdirSync(dir, {recursive: false});
  const snapFiles = [
    inside(setup.root, setup.config.paths.rules),
    inside(setup.root, setup.config.paths.allocation),
    path.join(setup.pipeline, 'config.json'),
    path.join(setup.pipeline, 'prompts/system.md'),
    path.join(setup.pipeline, 'prompts/repair.md'),
    path.join(setup.pipeline, setup.config.models_file),
  ];
  const snapDir = path.join(dir, 'snapshots');
  fs.mkdirSync(snapDir);
  const snapshots = snapFiles.map((f, i) => {
    fs.copyFileSync(f, path.join(snapDir, `${padSlot(i + 1)}-${path.basename(f)}`));
    return {path: path.relative(setup.root, f).split(path.sep).join('/'), sha256: hash(fs.readFileSync(f))};
  });

  // The uncorrected artifact, preserved again here so this run is self-contained.
  copyTree(siteDir, path.join(dir, 'before'));

  const run = {
    run_id: runID, phase: 'repair-posthoc', target: id, category: category.category, slot,
    operator,
    note: 'Post-hoc QC correction of an already delivered replica. The in-run correction loop did not run for this replica because execution.max_repair_rounds was 0 at build time. Applied so this arm is one consistent condition. This is generation-stage correction, not the study accessibility-repair condition.',
    uncorrected_artifact: `pipelines/open-source/runs/${runID}/before`,
    model: {model_id: model.model_id, model_version: model.model_version, provider: model.provider,
      base_url_env_note: 'endpoint recorded in models.json', license: model.license},
    budget: {max_repair_rounds: budget, max_tokens_per_request: model.params?.max_tokens ?? null},
    protocol_snapshots: snapshots,
    status: 'running', started_at: nowISO(), completed_at: null,
    turns: [], rejected_files: [], qc_runs: [], repair_rounds: [], human_edits: [], usage: null, errors: [],
  };
  const runFile = path.join(dir, 'run.json');
  const save = () => writeJSON(runFile, run);
  save();

  const agent = new Agent({model, api: setup.config.api, system});
  const state = {written: new Map(), bytes: 0};
  const pageMap = JSON.parse(row.source_pages);
  const emit = async (prompt, label) => {
    const res = await agent.ask(prompt, {label});
    const parsed = parseResponse(res.text);
    const {results} = applyFiles(siteDir, parsed.files, {state});
    const applied = {...parsed, results};
    run.turns.push({turn: agent.turns.length, label, status_line: applied.status,
      files_written: results.filter(r => r.ok).map(r => r.path),
      files_rejected: results.filter(r => !r.ok).map(r => ({path: r.path, reason: r.reason})),
      truncated: applied.truncated, finish_reason: agent.turns.at(-1)?.finish_reason ?? null,
      usage: agent.turns.at(-1)?.usage ?? null, at: nowISO()});
    run.rejected_files.push(...results.filter(r => !r.ok).map(r => ({turn: agent.turns.length, path: r.path, reason: r.reason})));
    run.usage = agent.usage;
    save();
    return applied;
  };

  try {
    let qc = runQC(setup, siteDir, dir, {label: 'qc-before'});
    run.qc_runs.push(qc);
    save();
    if (!qc.executed) throw new Error('QC did not execute; refusing to correct against an unavailable report');
    for (let round = 1; round <= budget && !qc.passed; round++) {
      const applied = await emit(repairPrompt(setup, {qc, round, maxRounds: budget}), `repair-${round}`);
      for (let extra = 1; extra <= 4; extra++) {
        if (applied.status === 'COMPLETE' && !applied.results.some(r => !r.ok)) break;
        Object.assign(applied, await emit(continuePrompt({
          written: [...state.written.keys()],
          rejected: applied.results.filter(r => !r.ok).map(r => ({path: r.path, reason: r.reason})),
          missing: missingDeliverables(siteDir, pageMap),
          turn: agent.turns.length + 1, maxTurns: budget * 5,
        }), `repair-${round}-cont-${extra}`));
      }
      const after = runQC(setup, siteDir, dir, {label: `qc-repair-${round}`});
      run.qc_runs.push(after);
      run.repair_rounds.push({round,
        before: {outcome: qc.outcome, failures: qc.failure_count},
        after: {outcome: after.outcome, failures: after.failure_count},
        files_changed: applied.results.filter(r => r.ok).map(r => r.path), at: nowISO()});
      qc = after;
      save();
    }

    // Re-state the gates from the QC run that actually describes what is now on disk.
    const revision = null;
    const context = taskContext(setup, {id, category, row, model, runID, snapshots, operator, revision});
    context.generation_started_at = null;
    context.generation_completed_at = null;
    const provenance = finalizeProvenance({siteDir, context, qc, usage: agent.usage, runID, interactionsReviewed: false});
    run.human_edits.push({by: 'orchestrator script (run-repair.mjs)', at: nowISO(),
      what: 'Sent the recorded QC failures to the slot model using prompts/repair.md, wrote the files it returned, re-ran QC after each round, and set validation_summary from the final QC run. No site markup, style or script was authored or edited by hand. The uncorrected artifact is preserved in this run under before/.'});
    run.provenance = provenance;
    run.status = 'completed';
    run.completed_at = nowISO();
    run.usage = agent.usage;
    save();
    queueUpdate(setup, `build-${id}`, {post_hoc_repair_run: runID});
    return {runID, id, qc, rounds: run.repair_rounds, headline: qcHeadline(qc), usage: agent.usage};
  } catch (e) {
    run.status = 'failed'; run.errors.push(e.message); run.completed_at = nowISO(); run.usage = agent.usage; save();
    throw e;
  }
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  try {
    const {positional, flags} = cliArgs(process.argv.slice(2), {operator: 'value', rounds: 'value', 'dry-run': 'boolean'});
    if (positional.length !== 1) throw new Error(USAGE);
    const r = await runRepair({id: positional[0], operator: flags.operator,
      rounds: flags.rounds !== undefined ? Number(flags.rounds) : undefined, dryRun: Boolean(flags['dry-run'])});
    if (r.dryRun) {
      console.log(`${r.id}: QC reports ${r.qc.failure_count} failures; up to ${r.budget} correction round(s) would run. No API call, nothing written.`);
    } else {
      console.log(`Repair run ${r.runID} completed for ${r.id}.`);
      for (const x of r.rounds) console.log(`  round ${x.round}: ${x.before.failures} -> ${x.after.failures} failures (${x.after.outcome})`);
      console.log(`  final: ${r.headline}`);
      console.log(`  tokens: ${r.usage?.total_tokens ?? 'n/a'} over ${r.usage?.requests ?? '?'} request(s)`);
      console.log('The uncorrected artifact is preserved in that run under before/. Nothing was committed or accepted.');
    }
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
