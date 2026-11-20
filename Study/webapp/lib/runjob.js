'use strict';
// Job runners for the worker. Return a result object (status ok|failed) for job-level outcomes;
// THROW for infrastructure problems (spawn, scratch dir, runner crash) so the worker releases the lease.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');

const STUDY = path.resolve(__dirname, '..', '..');
const python = () => process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
const isInside = (base, p) => { const r = path.relative(base, p); return r && !r.startsWith('..') && !path.isAbsolute(r); };

// Child env: never the worker token; the API key only under the job's env name.
function childEnv(job, extra = {}) {
  const env = { ...process.env, ...extra };
  delete env.WORKER_TOKEN;
  if (job.api_key && job.api_key_env) env[job.api_key_env] = job.api_key;
  return env;
}

function scrub(text, job) {
  return job.api_key ? String(text).split(job.api_key).join('***') : String(text);
}

function run(cmd, args, { env, cwd, input, signal }) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { env, cwd, stdio: ['pipe', 'pipe', 'pipe'], signal });
    let stdout = '', stderr = '';
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', (d) => { stderr = (stderr + d).slice(-4000); });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
    child.stdin.on('error', () => {});
    child.stdin.end(input || '');
  });
}

const walk = (dir, base = dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p, base) : [path.relative(base, p).split(path.sep).join('/')];
});

function writeFiles(dir, files) {
  for (const [rel, text] of Object.entries(files)) {
    const dest = path.resolve(dir, rel);
    if (!isInside(dir, dest)) throw new Error(`unsafe path ${rel}`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, text);
  }
}

async function withTmp(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'study-job-'));
  try { return await fn(dir); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const iterNum = (name) => Number(name.slice(4));

async function runRepair(job, { signal, studyRoot = STUDY } = {}) {
  return withTmp(async (scratch) => {
    for (const d of ['prompts', 'criteria', 'sample', 'config']) fs.cpSync(path.join(studyRoot, d), path.join(scratch, d), { recursive: true });
    // only this site's baseline: the runner never reads another one
    fs.cpSync(path.join(studyRoot, 'baseline', job.site), path.join(scratch, 'baseline', job.site), { recursive: true });
    const cfgPath = path.join(scratch, 'config', 'repair-allocation.json');
    const cfg = readJson(cfgPath);
    const arm = cfg.arms[job.arm];
    if (!arm) throw new Error(`unknown arm ${job.arm}`);
    Object.assign(arm, { provider: job.provider, base_url: job.base_url ?? null, model_id: job.model_id, api_key_env: job.api_key_env, concurrency: 1 });
    if (job.model_version) arm.model_version = job.model_version;
    fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));

    const args = [path.join(studyRoot, 'tools', 'runner', 'runner.py'), '--arms', job.arm, '--conditions', job.condition,
      '--sites', job.site, '--root', scratch, '--max-iter', String(job.max_iter)];
    const env = childEnv(job, job.mock ? { STUDY_MOCK: '1' } : {});
    const r = await run(python(), args, { env, cwd: scratch, signal });

    const cellDir = path.join(scratch, 'runs', job.arm, job.condition, job.site);
    const iters = fs.existsSync(cellDir) ? fs.readdirSync(cellDir).filter((n) => /^iter\d+$/.test(n)).sort((a, b) => iterNum(a) - iterNum(b)) : [];
    const statuses = iters.map((n) => { try { return readJson(path.join(cellDir, n, 'status.json')); } catch { return null; } });
    const last = statuses[statuses.length - 1];
    if (!last) throw new Error(scrub(`runner produced no status (exit ${r.code}): ${r.stderr.trim().slice(-500)}`, job));

    const files = {};
    for (const rel of walk(cellDir)) files[`runs/${job.arm}/${job.condition}/${job.site}/${rel}`] = { enc: 'utf8', data: fs.readFileSync(path.join(cellDir, rel), 'utf8') };
    const usage = { input: 0, output: 0 };
    let calls = 0;
    for (const s of statuses.filter(Boolean)) {
      usage.input += s.usage?.input || 0; usage.output += s.usage?.output || 0; calls += s.attempts || 0;
    }
    // what the provider said served the call, so the console's usage row names the real model
    const model_version = statuses.filter(Boolean).map((st) => st.model_version).filter(Boolean).pop() || null;
    const terminal = last.status === 'failed' || last.converged || last.iteration >= job.max_iter;
    if (last.status === 'ok' && terminal) return { status: 'ok', files, usage, calls, model_version, error: null };
    return { status: 'failed', files, usage, calls, model_version, error: scrub(last.reason || 'cell did not reach a terminal iteration', job) };
  });
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// --rules-out file: JSON array or JSON lines of {page,breakpoint,rules:[...]}; tolerate absence (older score.js).
function readRules(file, meta) {
  if (!fs.existsSync(file)) return [];
  const text = fs.readFileSync(file, 'utf8').trim();
  if (!text) return [];
  let recs;
  try { recs = text.startsWith('[') ? JSON.parse(text) : text.split('\n').map((l) => JSON.parse(l)); } catch { return []; }
  return recs.map((r) => ({ site_id: meta.site, arm: meta.arm, condition: meta.condition, iteration: meta.iteration, ...r }));
}

async function runScore(job, { signal, studyRoot = STUDY, scoreScript } = {}) {
  const script = scoreScript || path.join(studyRoot, 'tools', 'score', 'score.js');
  return withTmp(async (tmp) => {
    const rows = [], rules = [];
    for (const [iter, files] of Object.entries(job.iterations)) {
      const variant = path.join(tmp, `v${iter}`);
      writeFiles(variant, files);
      const csv = path.join(tmp, `rows${iter}.csv`), rulesOut = path.join(tmp, `rules${iter}.json`);
      const args = [script, '--variant', variant, '--files', job.slice_files.join(';'), '--site', job.site, '--arm', job.arm,
        '--condition', job.condition, '--iteration', iter, '--out', csv, '--rules-out', rulesOut];
      const r = await run(process.execPath, args, { env: childEnv(job), cwd: studyRoot, signal });
      if (r.code !== 0 || !fs.existsSync(csv)) throw new Error(`score.js failed (exit ${r.code}): ${r.stderr.trim().slice(-500)}`);
      rows.push(...parseCsv(fs.readFileSync(csv, 'utf8')).slice(1));
      rules.push(...readRules(rulesOut, { site: job.site, arm: job.arm, condition: job.condition, iteration: Number(iter) }));
    }
    return { status: 'ok', rows, rules, error: null };
  });
}

async function runJudge(job, { signal, studyRoot = STUDY } = {}) {
  const { api_key, ...safe } = job;
  const env = childEnv({ api_key, api_key_env: 'JUDGE_API_KEY' }, job.mock ? { STUDY_MOCK: '1' } : {});
  const r = await run(python(), [path.join(__dirname, '..', 'worker', 'judge_job.py')], { env, cwd: studyRoot, input: JSON.stringify(safe), signal });
  let out;
  try { out = JSON.parse(r.stdout); } catch { throw new Error(scrub(`judge_job crashed (exit ${r.code}): ${r.stderr.trim().slice(-500)}`, { api_key })); }
  if (out.error) return { status: 'failed', rows: [], key_rows: [], usage: out.usage || { input: 0, output: 0 }, error: scrub(out.error, { api_key }) };
  return { status: 'ok', rows: out.rows, key_rows: out.key_rows, usage: out.usage, error: null };
}

module.exports = { runRepair, runScore, runJudge, parseCsv, STUDY };
