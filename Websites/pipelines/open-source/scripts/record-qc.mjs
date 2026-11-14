// Run the shared QC against one open-source replica and append the real result to its run record.
import fs from 'node:fs';
import path from 'node:path';
import {loadSetup, validateSetup, categoryFor, inside, cliArgs, readJSON, writeJSON} from './lib.mjs';
import {runQC, qcHeadline} from './qc-runner.mjs';

try {
  const {positional, flags} = cliArgs(process.argv.slice(2), {run: 'value'});
  const [id] = positional;
  if (positional.length !== 1 || !flags.run || !/^[A-Za-z0-9._-]+$/.test(flags.run))
    throw new Error('Usage: node record-qc.mjs UNI-07 --run RUN-ID');
  const setup = loadSetup();
  const errors = validateSetup(setup);
  if (errors.length) throw new Error(errors.join('\n'));
  const c = categoryFor(setup, id);
  if (!c || !new RegExp(`^${c.prefix}-(07|08|09|10)$`).test(id)) throw new Error('Target must be an open-source ID (07-10)');
  const dir = inside(setup.pipeline, `runs/${flags.run}`);
  const runFile = path.join(dir, 'run.json');
  const run = readJSON(runFile);
  if (run.target !== id || !['build', 'repair'].includes(run.phase)) throw new Error('That run does not belong to this build or repair target');
  const site = inside(setup.root, `${c.category}/open-source/${id}`);
  if (!fs.existsSync(path.join(site, 'index.html'))) throw new Error('No generated site to test');
  const qc = runQC(setup, site, dir, {label: 'qc-manual'});
  run.qc_runs = [...(run.qc_runs ?? []), qc];
  writeJSON(runFile, run);
  console.log(`${qcHeadline(qc)} -> ${path.relative(setup.pipeline, path.join(dir, qc.log))}`);
  if (!qc.passed) [...new Set(qc.failures)].slice(0, 20).forEach(f => console.log('  FAIL', f));
  console.log('A QC result is not acceptance: interaction review and human acceptance are separate steps.');
  process.exitCode = qc.passed ? 0 : 1;
} catch (e) { console.error(e.message); process.exitCode = 1; }
