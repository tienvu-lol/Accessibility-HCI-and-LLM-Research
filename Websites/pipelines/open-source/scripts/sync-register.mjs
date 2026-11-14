// Coordination writes for the open-source group, each one explicit and separately authorized.
// It edits only this group's rows (slots 07-10) and leaves every other record's bytes untouched.
// It never invents an approval: approval cells are written from flags the operator passes.
import fs from 'node:fs';
import path from 'node:path';
import {
  loadSetup, validateSetup, categoryFor, readCSV, inside, cliArgs, readJSON, nowISO,
  editCSVRecords, modelForSlot, SLOTS, padSlot, slotOf,
} from './lib.mjs';
import {qcHeadline} from './qc-runner.mjs';

const USAGE = `Usage:
  node sync-register.mjs rows <PREFIX>
      Write this group's four proposed rows from research/proposals/<PREFIX>-rows.json into
      metadata/source-inventories/<category>.csv. Approval cells stay empty.

  node sync-register.mjs approve <PREFIX> --approved-by "name" --approval-reference "where the decision is recorded" [--approved-at YYYY-MM-DD]
      Record the project lead's actual approval for this group's four rows and synchronize
      source_url, model_id, model_version and approved_at into metadata/assignments.csv.

  node sync-register.mjs delivered <ID> --run RUN-ID
      Set this group's assignment row to submitted from a real completed build run.

  node sync-register.mjs log --message "what happened"
      Append a dated entry to metadata/change-log.md.

Nothing here commits, pushes or accepts anything.`;

const inventoryFields = [
  'category', 'slot', 'source_id', 'model_group', 'model_id', 'model_version', 'subcategory',
  'source_name', 'source_url', 'verified_at', 'verification_method', 'verification_result',
  'evidence_reference', 'source_pages', 'key_regions', 'key_interactions', 'complexity',
  'stack_clues', 'limitations', 'approved_at', 'approved_by', 'approval_reference',
];

function writeFile(file, text) { fs.writeFileSync(file, text); }

function applyRows(setup, prefix) {
  const category = categoryFor(setup, prefix);
  if (!category) throw new Error(`Unknown category or prefix "${prefix}"`);
  const proposalPath = inside(setup.pipeline, `research/proposals/${category.prefix}-rows.json`);
  if (!fs.existsSync(proposalPath)) throw new Error(`No proposals at ${path.relative(setup.pipeline, proposalPath)}; run run-research.mjs first`);
  const proposal = readJSON(proposalPath);
  const byId = new Map(proposal.rows.map(r => [r.source_id, r]));
  for (const slot of SLOTS) {
    const id = `${category.prefix}-${padSlot(slot)}`;
    if (!byId.has(id)) throw new Error(`Proposal file is missing a row for ${id}`);
  }
  const file = inside(setup.root, `${setup.config.paths.inventories}/${category.category}.csv`);
  const raw = fs.readFileSync(file, 'utf8');
  const {text, changed} = editCSVRecords(raw, {
    match: row => row.model_group === 'open-source' && byId.has(row.source_id),
    update: row => {
      const p = byId.get(row.source_id);
      const serialize = value => typeof value === 'string' ? value : JSON.stringify(value ?? []);
      const next = {...row};
      next.subcategory = p.subcategory ?? row.subcategory;
      next.source_name = p.source_name ?? '';
      next.source_url = p.source_url ?? '';
      next.verified_at = p.verified_at ?? '';
      next.verification_method = p.verification_method ?? '';
      next.verification_result = p.verification_result ?? '';
      next.evidence_reference = p.evidence_reference ?? proposal.evidence_reference ?? '';
      next.source_pages = serialize(p.source_pages);
      next.key_regions = serialize(p.key_regions);
      next.key_interactions = serialize(p.key_interactions);
      next.complexity = p.complexity ?? '';
      next.stack_clues = p.stack_clues ?? '';
      next.limitations = p.limitations ?? '';
      const model = modelForSlot(setup, slotOf(row.source_id));
      next.model_id = model?.model_id ?? '';
      next.model_version = model?.model_version ?? '';
      // Approval is a separate, explicit decision.
      next.approved_at = row.approved_at ?? '';
      next.approved_by = row.approved_by ?? '';
      next.approval_reference = row.approval_reference ?? '';
      return next;
    },
  });
  writeFile(file, text);
  return {category: category.category, changed, unapproved: true};
}

function approve(setup, prefix, {by, reference, at}) {
  const category = categoryFor(setup, prefix);
  if (!category) throw new Error(`Unknown category or prefix "${prefix}"`);
  if (!by?.trim() || !reference?.trim()) throw new Error('--approved-by and --approval-reference are both required: an approval cell records a real decision');
  const date = at ?? new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('--approved-at must be YYYY-MM-DD');

  const invFile = inside(setup.root, `${setup.config.paths.inventories}/${category.category}.csv`);
  const rows = readCSV(invFile).filter(r => r.model_group === 'open-source');
  const incomplete = rows.filter(r => !r.source_url?.trim() || r.verification_result !== 'verified');
  if (incomplete.length)
    throw new Error(`These rows are not ready to approve (missing source or not verified): ${incomplete.map(r => r.source_id).join(', ')}`);
  if (setup.config.approval.require_all_ten_sources) {
    const all = readCSV(invFile);
    const blank = all.filter(r => !r.source_url?.trim());
    if (blank.length)
      console.warn(`WARN config.approval.require_all_ten_sources is true, but ${blank.length} row(s) of this category still have no source: ${blank.map(r => r.source_id).join(', ')}. Approving only this group's four slots; MODEL_ALLOCATION.md section 4 allows a group to proceed over its own slots.`);
  }
  const invResult = editCSVRecords(fs.readFileSync(invFile, 'utf8'), {
    match: r => r.model_group === 'open-source',
    update: r => ({...r, approved_at: date, approved_by: by, approval_reference: reference}),
  });
  writeFile(invFile, invResult.text);

  const approved = new Map(readCSV(invFile).filter(r => r.model_group === 'open-source').map(r => [r.source_id, r]));
  const regFile = inside(setup.root, setup.config.paths.assignments);
  const regResult = editCSVRecords(fs.readFileSync(regFile, 'utf8'), {
    match: r => r.category === category.category && r.model_group === 'open-source' && approved.has(r.source_id),
    update: r => {
      const inv = approved.get(r.source_id);
      return {...r,
        source_name: inv.source_name, source_url: inv.source_url,
        model_id: inv.model_id, model_version: inv.model_version,
        status: 'approved', approved_at: date,
      };
    },
  });
  writeFile(regFile, regResult.text);
  return {category: category.category, inventory_rows: invResult.changed, register_rows: regResult.changed, date};
}

function delivered(setup, id, runID) {
  const category = categoryFor(setup, id);
  if (!category || !new RegExp(`^${category.prefix}-(07|08|09|10)$`).test(id)) throw new Error('Target must be an open-source ID (07-10)');
  const run = readJSON(path.join(inside(setup.pipeline, `runs/${runID}`), 'run.json'));
  if (run.target !== id || run.phase !== 'build') throw new Error('That run is not a build of this replica');
  if (run.status !== 'completed') throw new Error(`Run status is "${run.status}"; only a completed build is recorded as submitted`);
  const siteDir = inside(setup.root, `${category.category}/open-source/${id}`);
  if (!fs.existsSync(path.join(siteDir, 'index.html'))) throw new Error('No delivered site at the expected path');
  const qc = run.qc_runs?.at(-1) ?? null;
  const regFile = inside(setup.root, setup.config.paths.assignments);
  const result = editCSVRecords(fs.readFileSync(regFile, 'utf8'), {
    match: r => r.source_id === id && r.model_group === 'open-source',
    update: r => ({...r,
      status: 'submitted',
      generated_at: run.generation_completed_at ?? nowISO(),
      model_id: run.model?.model_id ?? r.model_id,
      model_version: run.model?.model_version ?? r.model_version,
      notes: [r.notes, `run ${runID}; ${qc ? qcHeadline(qc) : 'QC not run'}; not accepted`].filter(Boolean).join(' | '),
    }),
  });
  if (!result.changed) throw new Error(`No open-source register row found for ${id}`);
  writeFile(regFile, result.text);
  return {id, runID, qc: qc ? qcHeadline(qc) : 'QC not run', changed: result.changed};
}

function appendLog(setup, message) {
  const file = inside(setup.root, setup.config.paths.change_log);
  const entry = `\n## ${nowISO()} — open-source pipeline\n\n${message.trim()}\n`;
  fs.appendFileSync(file, entry);
  return {file: setup.config.paths.change_log};
}

try {
  const {positional, flags} = cliArgs(process.argv.slice(2), {
    'approved-by': 'value', 'approval-reference': 'value', 'approved-at': 'value', run: 'value', message: 'value',
  });
  const [command, target] = positional;
  const setup = loadSetup();
  const errors = validateSetup(setup);
  if (errors.length) throw new Error(errors.join('\n'));

  if (command === 'rows') {
    if (!target) throw new Error(USAGE);
    const r = applyRows(setup, target);
    console.log(`Wrote ${r.changed} open-source row(s) into metadata/source-inventories/${r.category}.csv.`);
    console.log('Approval cells were left empty. No source is approved by this command, and no other group\'s row was touched.');
  } else if (command === 'approve') {
    if (!target) throw new Error(USAGE);
    const r = approve(setup, target, {by: flags['approved-by'], reference: flags['approval-reference'], at: flags['approved-at']});
    console.log(`Recorded approval dated ${r.date} on ${r.inventory_rows} inventory row(s) and synchronized ${r.register_rows} register row(s) for ${r.category}.`);
    console.log('This records a decision you stated; the script cannot authenticate it.');
  } else if (command === 'delivered') {
    if (!target || !flags.run) throw new Error(USAGE);
    const r = delivered(setup, target, flags.run);
    console.log(`${r.id}: register row set to submitted (${r.qc}).`);
    console.log('Submitted is not accepted: a human reviewer decides acceptance.');
  } else if (command === 'log') {
    if (!flags.message) throw new Error(USAGE);
    const r = appendLog(setup, flags.message);
    console.log(`Appended an entry to ${r.file}.`);
  } else throw new Error(USAGE);
} catch (e) { console.error(e.message); process.exitCode = 1; }
