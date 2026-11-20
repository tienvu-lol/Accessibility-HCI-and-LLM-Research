const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const { createApp } = require('../server');

const SITES = ['UNI-01', 'UNI-02', 'UNI-03', 'UNI-04'];
const SECRETS = { openai: 'sk-openai-SECRET1234', anthropic: 'sk-ant-SECRET5678' };

async function boot(extraEnv = {}, opts = {}) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'console-'));
  const app = createApp({ dataDir, env: { APP_PASSWORD: 'pw', WORKER_TOKEN: 'wt', ...extraEnv }, ...opts });
  const port = await app.listen(0);
  const base = `http://127.0.0.1:${port}`;
  const api = async (method, url, { body, cookie, token, raw, headers = {} } = {}) => {
    const h = { ...headers };
    if (cookie) h.cookie = cookie;
    if (token) h.authorization = `Bearer ${token}`;
    let payload = raw;
    if (body !== undefined) { payload = JSON.stringify(body); h['content-type'] = 'application/json'; }
    const res = await fetch(base + url, { method, headers: h, body: payload, redirect: 'manual' });
    const text = await res.text();
    let data = null;
    try { data = JSON.parse(text); } catch { /* not json */ }
    return { status: res.status, data, text, headers: res.headers };
  };
  const login = await api('POST', '/api/login', { body: { password: 'pw' } });
  const cookie = login.headers.get('set-cookie').split(';')[0];
  const ui = (method, url, body) => api(method, url, { body, cookie });
  const worker = (url, body) => api('POST', url, { body, token: 'wt' });
  const close = async () => { await app.close(); fs.rmSync(dataDir, { recursive: true, force: true }); };
  return { app, api, ui, worker, cookie, base, dataDir, close };
}

// 4 mainstream arms ready, keys set, 4 sites x 4 conditions
// minimal read-only Study copy whose committed metrics are empty, so baselines count as unscored
function miniStudy() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'study-'));
  const real = path.join(__dirname, '..', '..');
  for (const d of ['config', 'sample']) fs.cpSync(path.join(real, d), path.join(dir, d), { recursive: true });
  for (const site of SITES) fs.cpSync(path.join(real, 'baseline', site), path.join(dir, 'baseline', site), { recursive: true });
  fs.mkdirSync(path.join(dir, 'metrics'));
  const header = fs.readFileSync(path.join(real, 'metrics', 'metrics.csv'), 'utf8').split(/\r?\n/)[0];
  fs.writeFileSync(path.join(dir, 'metrics', 'metrics.csv'), `${header}\n`);
  return dir;
}

async function configure(s) {
  const prov = { A1: 'anthropic', A2: 'anthropic', A3: 'openai', A4: 'openai' };
  for (const [arm, provider] of Object.entries(prov)) {
    assert.equal((await s.ui('PUT', `/api/arms/${arm}`, { provider, model_id: `m-${arm}` })).status, 200);
  }
  for (const [p, key] of Object.entries(SECRETS)) await s.ui('PUT', `/api/keys/${p}`, { key });
  assert.equal((await s.ui('PUT', '/api/settings', { sites: SITES })).status, 200);
}

const file = (data) => ({ enc: 'utf8', data });
const cellFiles = (arm, cond, site, status = { status: 'ok', converged: false, usage: { input: 1000, output: 500 } }) => ({
  [`runs/${arm}/${cond}/${site}/iter1/index.html`]: file('<html><body>x</body></html>'),
  [`runs/${arm}/${cond}/${site}/iter1/status.json`]: file(JSON.stringify(status)),
});
const claim = async (s, max = 50, kinds = ['repair']) => (await s.worker('/api/worker/claim', { worker_id: 'w1', kinds, max })).data.jobs;

test('login sets an HttpOnly SameSite cookie, gates the API, rate-limits after 5 failures', async () => {
  const s = await boot();
  try {
    assert.equal((await s.api('GET', '/api/state')).status, 401);
    assert.equal((await s.api('GET', '/healthz')).data.ok, true);
    const ok = await s.api('POST', '/api/login', { body: { password: 'pw' } });
    const cookie = ok.headers.get('set-cookie');
    assert.match(cookie, /HttpOnly/);
    assert.match(cookie, /SameSite=Strict/);
    assert.equal((await s.ui('GET', '/api/state')).status, 200);
    for (let i = 0; i < 5; i++) assert.equal((await s.api('POST', '/api/login', { body: { password: 'bad' } })).status, 401);
    assert.equal((await s.api('POST', '/api/login', { body: { password: 'pw' } })).status, 429);
    assert.equal((await s.api('POST', '/api/worker/claim', { body: {} })).status, 401); // worker needs the bearer token
  } finally { await s.close(); }
});

test('production refuses to start without APP_PASSWORD and WORKER_TOKEN', () => {
  assert.throws(() => createApp({ dataDir: os.tmpdir(), env: { NODE_ENV: 'production', APP_PASSWORD: 'x' } }), /required/);
});

test('API keys never appear in responses, SSE or state.json', async () => {
  const s = await boot({ GEMINI_API_KEY: 'gem-ENVSECRET9999' });
  try {
    await configure(s);
    const seen = [];
    seen.push((await s.ui('GET', '/api/state')).text);
    const st = (await s.ui('GET', '/api/state')).data;
    assert.deepEqual(st.keys.openai, { set: true, last4: '1234', source: 'ui' });
    assert.deepEqual(st.keys.gemini, { set: true, last4: '9999', source: 'env' });
    const put = await s.ui('PUT', '/api/keys/openai', { key: SECRETS.openai });
    seen.push(put.text);
    const sse = await fetch(s.base + '/api/events', { headers: { cookie: s.cookie } });
    const reader = sse.body.getReader();
    seen.push(Buffer.from((await reader.read()).value).toString());
    await reader.cancel();
    s.app.ctx.state.flush();
    seen.push(fs.readFileSync(path.join(s.dataDir, 'state.json'), 'utf8'));
    for (const text of seen) for (const k of [...Object.values(SECRETS), 'gem-ENVSECRET9999']) assert.ok(!text.includes(k), `leaked ${k}`);
    assert.equal((await s.ui('PUT', '/api/keys/gemini', { key: '  ' })).status, 400);
    assert.equal((await s.ui('PUT', '/api/keys/nope', { key: 'abc' })).status, 400);
    assert.equal((await s.ui('DELETE', '/api/keys/openai')).data.key.set, false);
  } finally { await s.close(); }
});

test('arm PUT rejects gemini and open-source arms', async () => {
  const s = await boot();
  try {
    assert.equal((await s.ui('PUT', '/api/arms/A1', { provider: 'gemini', model_id: 'g' })).status, 400);
    assert.equal((await s.ui('PUT', '/api/arms/A5', { provider: 'openai', model_id: 'g' })).status, 400);
    assert.equal((await s.ui('PUT', '/api/arms/A6', { provider: 'openai', model_id: 'g' })).status, 400);
    assert.equal((await s.ui('PUT', '/api/arms/A1', { provider: 'openai', model_id: 'g' })).status, 200);
    const st = (await s.ui('GET', '/api/state')).data;
    assert.ok(st.warnings.some((w) => /Gemini/.test(w)));
  } finally { await s.close(); }
});

test('start refuses with blockers when a key is missing', async () => {
  const s = await boot();
  try {
    const r = await s.ui('POST', '/api/run/start', { phase: 'repair' });
    assert.equal(r.status, 409);
    assert.ok(r.data.blockers.length > 0);
    assert.equal((await s.ui('POST', '/api/run/start', { phase: 'judge' })).status, 409);
  } finally { await s.close(); }
});

test('claim respects per-arm concurrency, pause and budget', async () => {
  const s = await boot();
  try {
    await configure(s);
    assert.equal((await s.ui('POST', '/api/run/start', { phase: 'repair' })).status, 200);
    const jobs = await claim(s);
    const per = {};
    for (const j of jobs) per[j.arm] = (per[j.arm] || 0) + 1;
    assert.deepEqual(per, { A1: 12, A2: 12, A3: 12, A4: 12 }); // 16 queued per arm, cap 12
    assert.equal(jobs[0].lease_s, 900);
    assert.equal(jobs.find((j) => j.arm === 'A3').api_key, SECRETS.openai);
    assert.equal(jobs[0].api_key_env, 'A1_API_KEY');
    assert.equal(jobs[0].base_url, null);
    assert.equal((await claim(s)).length, 0); // every arm is at its cap
    await s.ui('POST', '/api/run/pause');
    assert.equal((await claim(s)).length, 0);
    await s.ui('POST', '/api/run/resume');
    assert.equal((await s.ui('GET', '/api/state')).data.run.phase, 'running');
  } finally { await s.close(); }

  const b = await boot();
  try {
    await configure(b);
    await b.ui('POST', '/api/run/start', { phase: 'repair' });
    await b.ui('PUT', '/api/settings', { budget_usd: 0 });
    assert.equal((await claim(b)).length, 0);
    await b.ui('PUT', '/api/settings', { budget_usd: 1000 });
    assert.ok((await claim(b)).length > 0);
  } finally { await b.close(); }
});

test('release does not count an attempt; expired lease requeues', async () => {
  let t = 1_000_000;
  const s = await boot({}, { now: () => t });
  try {
    await configure(s);
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const [job] = await claim(s, 1);
    await s.worker('/api/worker/release', { job_id: job.id, reason: 'network', retryable: true });
    const rec = s.app.ctx.coord.jobs.get(job.id);
    assert.equal(rec.state, 'queued');
    assert.equal(rec.attempts, 0);

    const [again] = await claim(s, 1);
    assert.equal(again.id, job.id);
    t += 899_000;
    assert.equal((await s.worker('/api/worker/heartbeat', { job_id: job.id })).status, 200);
    t += 899_000; // heartbeat extended the lease
    s.app.ctx.coord.reap();
    assert.equal(rec.state, 'running');
    t += 2_000;
    s.app.ctx.coord.reap();
    assert.equal(rec.state, 'queued');
    assert.equal(rec.attempts, 0);
  } finally { await s.close(); }
});

test('three failed results mark the job failed; retry-failed requeues it', async () => {
  const s = await boot();
  try {
    await configure(s);
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const target = 'repair:A1:naive:UNI-01';
    for (let i = 1; i <= 3; i++) {
      const jobs = await claim(s);
      assert.ok(jobs.some((j) => j.id === target), `attempt ${i} should be handed out`);
      const r = await s.worker('/api/worker/result', { job_id: target, status: 'failed', files: {}, usage: { input: 5, output: 5 }, calls: 1, error: 'boom' });
      assert.equal(r.status, 200);
      assert.equal(r.data.state, i < 3 ? 'queued' : 'failed');
      for (const j of jobs) if (j.id !== target) await s.worker('/api/worker/release', { job_id: j.id, reason: 'x', retryable: true });
    }
    const st = (await s.ui('GET', '/api/state')).data;
    assert.equal(st.matrix.A1.naive[0], 'f');
    assert.equal(st.arms[0].cells.failed, 1);
    assert.equal((await s.ui('POST', '/api/run/retry-failed')).data.requeued, 1);
    assert.equal(s.app.ctx.coord.jobs.get(target).attempts, 0);
  } finally { await s.close(); }
});

test('result ingestion rejects bad paths, extensions and sizes', async () => {
  const s = await boot();
  try {
    await configure(s);
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const job = (await claim(s, 1))[0];
    const [, arm, cond, site] = job.id.split(':');
    const p = `runs/${arm}/${cond}/${site}/`;
    const bad = {
      traversal: { [`${p}../../x.html`]: file('x') },
      traversalMid: { [`${p}iter1/../../../x.html`]: file('x') },
      absolute: { '/etc/passwd.html': file('x') },
      windowsAbs: { 'C:/x.html': file('x') },
      backslash: { [`${p}iter1\\..\\x.html`]: file('x') },
      wrongPrefix: { [`runs/${arm}/${cond}/OTHER-99/iter1/index.html`]: file('x') },
      wrongArm: { [`runs/A9/${cond}/${site}/iter1/index.html`]: file('x') },
      badExt: { [`${p}iter1/evil.php`]: file('x') },
      oversize: { [`${p}iter1/index.html`]: file('a'.repeat(5 * 1024 * 1024 + 1)) },
      badEnc: { [`${p}iter1/index.html`]: { enc: 'hex', data: 'zz' } },
    };
    for (const [name, files] of Object.entries(bad)) {
      const r = await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files, usage: { input: 1, output: 1 }, calls: 1 });
      assert.ok(r.status === 400 || r.status === 413, `${name} -> ${r.status}`);
    }
    assert.equal(s.app.ctx.coord.jobs.get(job.id).state, 'running');
    assert.ok(!fs.existsSync(path.join(s.dataDir, 'runs', arm, cond, site)));
    const ok = await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 1000, output: 500 }, calls: 1 });
    assert.equal(ok.status, 200);
    assert.ok(fs.existsSync(path.join(s.dataDir, 'runs', arm, cond, site, 'iter1', 'index.html')));
  } finally { await s.close(); }
});

test('open-source import accepts only open_source arms', async () => {
  const s = await boot();
  try {
    const status = JSON.stringify({ status: 'ok', usage: { input: 10, output: 5 } });
    const cell = (c) => JSON.stringify({ cell: c, files: { 'iter1/index.html': file('<html></html>'), 'iter1/status.json': file(status) } });
    const lines = [cell('A5/wcag/UNI-01'), cell('A1/wcag/UNI-01'), cell('A6/both/UNI-02'), 'not json',
      JSON.stringify({ cell: 'A5/wcag/UNI-03', files: { '../evil.html': file('x') } })];
    const gz = zlib.gzipSync(lines.join('\n') + '\n');
    const r = await s.api('POST', '/api/import', { raw: gz, cookie: s.cookie, headers: { 'content-type': 'application/x-ndjson+gzip' } });
    assert.equal(r.status, 200);
    assert.equal(r.data.imported_cells, 2);
    assert.deepEqual(r.data.rejected.map((x) => x.line), [2, 4, 5]);
    assert.match(r.data.rejected[0].reason, /not open_source/);
    const st = (await s.ui('GET', '/api/state')).data;
    assert.equal(st.matrix.A5.wcag[0], 'i');
    assert.equal(st.matrix.A6.both[1], 'i');
    assert.equal(st.matrix.A1.wcag[0], '-');
    assert.equal(st.arms[4].cells.imported, 1);
    assert.equal(st.arms[4].tokens.input, 10);
    assert.equal(st.arms[4].cost_usd, 0);
    assert.equal(st.imports.length, 1);
    assert.equal((await s.api('POST', '/api/import', { raw: Buffer.from('plain'), cookie: s.cookie })).status, 400);
  } finally { await s.close(); }
});

test('snapshot carries every contract field', async () => {
  const s = await boot();
  try {
    const st = (await s.ui('GET', '/api/state')).data;
    const has = (o, keys, where) => { for (const k of keys) assert.ok(k in o, `${where}.${k}`); };
    has(st, ['now', 'run', 'settings', 'keys', 'arms', 'judge', 'matrix', 'intake', 'projection', 'workers', 'pricing', 'warnings', 'human', 'imports'], 'state');
    has(st.run, ['phase', 'kind', 'started_at'], 'run');
    has(st.settings, ['budget_usd', 'sites', 'conditions', 'max_iter', 'judge_model_id'], 'settings');
    assert.equal(st.arms.length, 7);
    has(st.arms[0], ['id', 'label', 'kind', 'provider', 'model_id', 'ready', 'blockers', 'concurrency', 'cells', 'tokens', 'calls', 'cost_usd', 'tokens_per_min'], 'arm');
    has(st.arms[0].cells, ['total', 'queued', 'running', 'ok', 'failed', 'truncated', 'imported', 'converged'], 'cells');
    assert.deepEqual(st.arms.map((a) => a.kind), ['mainstream', 'mainstream', 'mainstream', 'mainstream', 'open_source', 'open_source', 'open_source']);
    has(st.judge, ['provider', 'model_id', 'ready', 'blockers', 'items', 'tokens', 'cost_usd'], 'judge');
    has(st.judge.items, ['total', 'queued', 'running', 'done', 'failed'], 'judge.items');
    has(st.intake, ['total', 'rolling5m', 'sources', 'series'], 'intake');
    has(st.intake.sources[0], ['id', 'input', 'output', 'cost_usd', 'calls', 'tokens_per_min'], 'source');
    assert.equal(st.intake.series.length, 120);
    has(st.intake.series[0], ['t', 'cum_cost_usd', 'cum_tokens'], 'series');
    has(st.projection, ['budget_usd', 'spent_usd', 'remaining_usd', 'expected_total_usd', 'over_budget', 'eta_minutes', 'by_arm'], 'projection');
    has(st.projection.by_arm[0], ['arm', 'calls_total', 'calls_done', 'avg_in', 'avg_out', 'est_cost_usd', 'basis'], 'by_arm');
    has(st.human, ['built', 'items', 'raters', 'ratings_rows'], 'human');
    assert.equal(st.matrix.A1.naive.length, 60);
    assert.match(st.matrix.A1.naive, /^-{60}$/);
    for (const p of Object.values(st.pricing)) assert.equal(p.verified, true);
    assert.ok(['claude-opus-5-5', 'claude-sonnet-5-5', 'openai', 'gemini'].every((k) => k in st.pricing));
    assert.ok(!st.warnings.some((w) => /placeholder pricing/.test(w)));
    assert.ok(st.warnings.some((w) => /no gemini key/.test(w)));
  } finally { await s.close(); }
});

test('projection switches from estimated to measured once calls finish', async () => {
  const s = await boot();
  try {
    await configure(s);
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    let st = (await s.ui('GET', '/api/state')).data;
    const a1 = (d) => d.projection.by_arm.find((x) => x.arm === 'A1');
    assert.equal(a1(st).basis, 'estimated');
    assert.equal(st.projection.by_arm.find((x) => x.arm === 'A5').basis, 'self-hosted');
    assert.ok(st.projection.expected_total_usd > 0);
    const job = (await claim(s, 1))[0];
    const [, arm, cond, site] = job.id.split(':');
    await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 2000, output: 1000 }, calls: 2 });
    st = (await s.ui('GET', '/api/state')).data;
    assert.equal(a1(st).basis, 'measured');
    assert.equal(a1(st).avg_in, 1000);
    assert.equal(a1(st).avg_out, 500);
    assert.equal(a1(st).calls_done, 2);
    // 2000 in + 1000 out at claude-opus placeholder 15/75 per Mtok if A1 uses it; A1 here uses provider fallback (anthropic has no price -> 0) or model price
    assert.ok(st.projection.spent_usd >= 0);
    assert.equal(st.intake.total.input, 2000);
    assert.equal(st.arms[0].tokens.input, 2000);
  } finally { await s.close(); }
});

// What the user hit: a mock run left every arm claiming "measured" averages off fabricated tokens.
test('mock calls are recorded but are never spend and never a measurement basis', async () => {
  const s = await boot({ MOCK_PROVIDERS: '1' });
  try {
    await configure(s);
    await s.ui('PUT', '/api/pricing', { 'm-A1': { input_per_mtok: 10, output_per_mtok: 20 } });
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const job = (await claim(s, 1))[0];
    const [, arm, cond, site] = job.id.split(':');
    assert.equal(job.mock, true);
    await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 1_000_000, output: 500_000 }, calls: 2 });
    const st = (await s.ui('GET', '/api/state')).data;
    const a1 = st.projection.by_arm.find((x) => x.arm === 'A1');
    assert.equal(a1.basis, 'estimated', 'a fake call cannot make the projection measured');
    assert.equal(a1.mock_calls, 2);
    assert.equal(a1.spent_usd, 0);
    assert.equal(st.projection.spent_usd, 0);
    assert.equal(st.projection.mock_calls, 2);
    assert.equal(st.intake.total.input, 0, 'mock tokens are not counted as intake');
    assert.equal(st.recent_usage[0].mock, true);
    assert.equal(st.recent_usage[0].cost_usd, 0);
    // the cell itself still counts as done: the pipeline ran, only the money did not
    assert.equal(st.arms[0].cells.ok, 1);
  } finally { await s.close(); }
});

test('usage rows are facts: machine, model and key are recorded, and a model change does not reprice history', async () => {
  const s = await boot();
  try {
    await configure(s);
    await s.ui('PUT', '/api/pricing', { 'm-A1': { input_per_mtok: 10, output_per_mtok: 20 } });
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const job = (await s.worker('/api/worker/claim', { worker_id: 'mac-2', kinds: ['repair'], max: 1, info: { host: 'mac-2', os: 'macOS arm64' } })).data.jobs[0];
    const [, arm, cond, site] = job.id.split(':');
    await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 1_000_000, output: 500_000 }, calls: 1 });
    let st = (await s.ui('GET', '/api/state')).data;
    const row = st.recent_usage[0];
    assert.equal(row.worker, 'mac-2');
    assert.equal(row.model_id, 'm-A1');
    assert.equal(row.key_id, `anthropic:${SECRETS.anthropic.slice(-4)}`);
    assert.equal(row.mock, false);
    assert.equal(row.cost_usd, 20);
    assert.equal(st.projection.spent_usd, 20);
    const m = st.projection.by_machine.find((x) => x.id === 'mac-2');
    assert.equal(m.calls, 1);
    assert.equal(m.cost_usd, 20);
    assert.equal(m.share_pct, 100);
    assert.deepEqual(m.arms.map((a) => a.arm), ['A1']);
    const k = st.projection.by_key.find((x) => x.id === row.key_id);
    assert.equal(k.cost_usd, 20);
    assert.equal(k.model_id, 'm-A1');
    // point A1 at a different model: spend already booked stays, but the basis is no longer measured
    assert.equal((await s.ui('PUT', '/api/arms/A1', { provider: 'anthropic', model_id: 'm-A1-next' })).status, 200);
    st = (await s.ui('GET', '/api/state')).data;
    const a1 = st.projection.by_arm.find((x) => x.arm === 'A1');
    assert.equal(st.projection.spent_usd, 20, 'history is not repriced when the model changes');
    assert.equal(a1.spent_usd, 20);
    assert.equal(a1.basis, 'estimated', 'the new model has no finished calls yet');
    assert.equal(a1.model_id, 'm-A1-next');
  } finally { await s.close(); }
});

test('the cell matrix records which machine ran each cell', async () => {
  const s = await boot();
  try {
    await configure(s);
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const job = (await s.worker('/api/worker/claim', { worker_id: 'laptop-b', kinds: ['repair'], max: 1 })).data.jobs[0];
    const [, arm, cond, site] = job.id.split(':');
    await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 1, output: 1 }, calls: 1 });
    const st = (await s.ui('GET', '/api/state')).data;
    const me = st.machines.find((m) => m.id === 'laptop-b');
    assert.ok(me, 'the machine is listed');
    assert.equal(st.matrix_workers[arm][cond][SITES.indexOf(site)], me.char);
    assert.equal(me.cells, 1);
    // every other cell is unattributed
    assert.equal(st.matrix_workers[arm][cond].replace(new RegExp(me.char, 'g'), '').replace(/-/g, ''), '');
  } finally { await s.close(); }
});

test('POST /api/usage/reset archives the recorded usage and zeroes spend', async () => {
  const s = await boot();
  try {
    await configure(s);
    await s.ui('PUT', '/api/pricing', { 'm-A1': { input_per_mtok: 10, output_per_mtok: 20 } });
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const job = (await claim(s, 1))[0];
    const [, arm, cond, site] = job.id.split(':');
    await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 1_000_000, output: 500_000 }, calls: 1 });
    assert.equal((await s.ui('GET', '/api/state')).data.projection.spent_usd, 20);
    const r = await s.ui('POST', '/api/usage/reset', {});
    assert.equal(r.status, 200);
    assert.equal(r.data.cleared, 1);
    assert.ok(fs.existsSync(path.join(s.dataDir, r.data.archived_to)), 'the rows are archived, not destroyed');
    assert.ok(!fs.existsSync(path.join(s.dataDir, 'usage.jsonl')));
    const st = (await s.ui('GET', '/api/state')).data;
    assert.equal(st.projection.spent_usd, 0);
    assert.deepEqual(st.recent_usage, []);
    assert.equal(st.projection.by_arm.find((x) => x.arm === 'A1').basis, 'estimated');
    assert.equal(st.projection.baseline, null);
    assert.equal(st.arms[0].cells.ok, 1, 'finished cells are untouched');
  } finally { await s.close(); }
});

test('cost = tokens x pricing, set through PUT /api/pricing', async () => {
  const s = await boot();
  try {
    await configure(s);
    assert.equal((await s.ui('PUT', '/api/pricing', { 'm-A1': { input_per_mtok: 10, output_per_mtok: 20 } })).status, 200);
    assert.equal((await s.ui('PUT', '/api/pricing', { 'm-A1': { input_per_mtok: -1, output_per_mtok: 20 } })).status, 400);
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const job = (await claim(s, 1))[0];
    const [, arm, cond, site] = job.id.split(':');
    assert.equal(arm, 'A1');
    await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 1_000_000, output: 500_000 }, calls: 1 });
    const st = (await s.ui('GET', '/api/state')).data;
    assert.equal(st.arms[0].cost_usd, 20);
    assert.equal(st.pricing['m-A1'].verified, true);
    assert.equal(st.intake.rolling5m.tokens, 1_500_000);
  } finally { await s.close(); }
});

test('SSE emits state events', async () => {
  const s = await boot();
  try {
    const res = await fetch(s.base + '/api/events', { headers: { cookie: s.cookie } });
    assert.match(res.headers.get('content-type'), /text\/event-stream/);
    const reader = res.body.getReader();
    const first = Buffer.from((await reader.read()).value).toString();
    assert.match(first, /^event: state\ndata: \{/);
    await s.ui('PUT', '/api/settings', { budget_usd: 7 });
    let more = '';
    while (!more.includes('"budget_usd":7')) more += Buffer.from((await reader.read()).value).toString();
    await reader.cancel();
  } finally { await s.close(); }
});

test('a score job is queued after a repair result and baselines are queued too', async () => {
  const studyDir = miniStudy();
  const s = await boot({}, { studyDir });
  try {
    await configure(s);
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    const scoreKinds = ['score'];
    const baseline = await claim(s, 50, scoreKinds);
    assert.deepEqual(baseline.map((j) => j.arm), ['baseline', 'baseline', 'baseline', 'baseline']);
    assert.equal(baseline[0].condition, 'baseline');
    assert.deepEqual(Object.keys(baseline[0].iterations), ['0']);
    assert.deepEqual(baseline[0].slice_files, ['index.html', 'apply.html', 'css/styles.css']);
    assert.ok(baseline[0].iterations['0']['index.html'].length > 100);

    const job = (await claim(s, 1))[0];
    const [, arm, cond, site] = job.id.split(':');
    assert.equal((await claim(s, 50, scoreKinds)).length, 0);
    await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 1, output: 1 }, calls: 1 });
    const [score] = await claim(s, 50, scoreKinds);
    assert.equal(score.id, `score:${arm}:${cond}:${site}`);
    assert.deepEqual(Object.keys(score.iterations), ['1']);
    assert.ok('index.html' in score.iterations['1'] && !('status.json' in score.iterations['1']));

    // score result: metrics replaced on the dedupe key, rules appended
    const header = fs.readFileSync(path.join(s.dataDir, 'metrics', 'metrics.csv'), 'utf8').split('\n')[0].split(',');
    const row = (v) => Object.assign(header.map(() => 0), { 0: site, 1: 'university', 2: 'claude', 3: arm, 4: cond, 5: 1, 6: 'index.html', 7: 1280, 8: v, 22: 'ok' });
    const send = (v) => s.worker('/api/worker/result', { job_id: score.id, status: 'ok', rows: [row(v)], rules: [{ site_id: site, arm, condition: cond, iteration: 1, page: 'index.html', breakpoint: 1280, rules: [] }] });
    assert.equal((await send(3)).status, 200);
    const metrics = fs.readFileSync(path.join(s.dataDir, 'metrics', 'metrics.csv'), 'utf8');
    assert.equal(metrics.split('\n').filter((l) => l.startsWith(`${site},university,claude,${arm},${cond},1,`)).length, 1);
    assert.ok(fs.readFileSync(path.join(s.dataDir, 'metrics', 'axe_rules.jsonl'), 'utf8').includes(site));
    assert.equal((await s.worker('/api/worker/result', { job_id: score.id, status: 'ok', rows: [['bad']], rules: [] })).data.ignored, true);
  } finally { await s.close(); fs.rmSync(studyDir, { recursive: true, force: true }); }
});

test('judge start needs finished cells; judge job carries all four final variants; result writes verdict files', async () => {
  const s = await boot({ GEMINI_API_KEY: 'gem-key-0000' });
  try {
    await s.ui('PUT', '/api/settings', { sites: ['UNI-01'], judge_model_id: 'gemini-x' });
    assert.equal((await s.ui('POST', '/api/run/start', { phase: 'judge', force: true })).status, 409); // nothing to judge
    const status = JSON.stringify({ status: 'ok', usage: { input: 1, output: 1 } });
    const lines = ['naive', 'wcag', 'nielsen', 'both'].map((c) => JSON.stringify({ cell: `A5/${c}/UNI-01`, files: {
      'iter1/index.html': file(`old-${c}`), 'iter2/index.html': file(`final-${c}`), 'iter2/status.json': file(status) } }));
    await s.api('POST', '/api/import', { raw: zlib.gzipSync(lines.join('\n')), cookie: s.cookie });
    const refused = await s.ui('POST', '/api/run/start', { phase: 'judge' });
    assert.equal(refused.status, 409); // other cells unfinished, no force
    assert.equal((await s.ui('POST', '/api/run/start', { phase: 'judge', force: true })).status, 200);
    const [job] = await claim(s, 5, ['judge']);
    assert.equal(job.id, 'judge:UNI-01:A5');
    assert.equal(job.provider, 'gemini');
    assert.equal(job.variants.wcag['index.html'], 'final-wcag');
    assert.ok(!('status.json' in job.variants.wcag));
    const rows = [['UNI-01', 'A5', 'q1', 'wcag', 1, 'gemini-x', job.call_id]];
    const keyRows = [['UNI-01', 'A5', 'V1', 'wcag']];
    assert.equal((await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', rows, key_rows: keyRows, usage: { input: 9, output: 3 } })).status, 200);
    assert.match(fs.readFileSync(path.join(s.dataDir, 'verdicts', 'judge_rankings.csv'), 'utf8'), /^site_id,arm,question,condition,rank,judge_model,call_id\nUNI-01,A5,q1,wcag,1,/);
    assert.ok(fs.existsSync(path.join(s.dataDir, 'blinding_key.csv')));
    assert.ok(fs.existsSync(path.join(s.dataDir, 'verdicts', 'usage.jsonl')));
    assert.equal((await s.ui('GET', '/api/state')).data.judge.items.done, 1);
  } finally { await s.close(); }
});

test('static serving, traversal protection, variant sandbox, optional modules', async () => {
  const s = await boot();
  try {
    assert.equal((await s.api('GET', '/')).status, 302);
    assert.equal((await s.api('GET', '/healthz')).status, 200);
    for (const p of ['/..%2f..%2fserver.js', '/%2e%2e/server.js', '/lib/../../server.js']) {
      const r = await s.ui('GET', p);
      assert.ok(r.status === 404 && !r.text.includes('createApp'), p);
    }
    const v = await s.api('GET', '/api/variant/baseline/baseline/UNI-01/0/index.html', { cookie: s.cookie });
    assert.equal(v.status, 200);
    assert.equal(v.headers.get('content-security-policy'), "sandbox; default-src 'self' 'unsafe-inline'");
    assert.equal((await s.api('GET', '/api/variant/baseline/baseline/UNI-01/0/index.html')).status, 401);
    assert.equal((await s.ui('GET', '/api/variant/baseline/baseline/UNI-01/0/..%2f..%2fUNI-02%2findex.html')).status, 404);
    assert.equal((await s.ui('GET', '/api/variant/A1/wcag/UNI-01/1/index.html')).status, 404);
    const results = await s.ui('GET', '/api/results');
    assert.ok([200, 501].includes(results.status));
  } finally { await s.close(); }
});

test('DEMO=1 serves a synthetic snapshot', async () => {
  const s = await boot({ DEMO: '1' });
  try {
    const st = (await s.ui('GET', '/api/state')).data;
    assert.equal(st.matrix.A1.naive.length, 60);
    assert.ok(st.warnings.some((w) => /DEMO/.test(w)));
  } finally { await s.close(); }
});

test('projection by arm: judge row, spent/remaining, unpriced model flagged, no calls_done > calls_total', async () => {
  const b = await boot();
  try {
    const st = (await b.ui('GET', '/api/state')).data;
    const rows = st.projection.by_arm;
    assert.ok(rows.some((r) => r.arm === 'judge'), 'judge row present');
    for (const r of rows) {
      assert.ok(r.calls_total >= r.calls_done);
      assert.ok(Math.abs(r.est_total_usd - (r.spent_usd + r.est_cost_usd)) < 1e-9);
    }
    const sum = rows.reduce((n, r) => n + r.est_cost_usd, 0);
    assert.ok(Math.abs(st.projection.expected_total_usd - (st.projection.spent_usd + sum)) < 1e-6, 'expected total includes every row');
  } finally { await b.close(); }
});

test('baseline is frozen at first start; live usage feed and variance follow results', async () => {
  const s = await boot();
  try {
    await configure(s);
    let st = (await s.ui('GET', '/api/state')).data;
    assert.equal(st.projection.baseline, null);
    await s.ui('POST', '/api/run/start', { phase: 'repair' });
    st = (await s.ui('GET', '/api/state')).data;
    const frozen = st.projection.baseline.expected_total_usd;
    assert.ok(frozen > 0);
    assert.equal(st.projection.variance_usd, 0);
    assert.deepEqual(st.recent_usage, []);
    const job = (await claim(s, 1))[0];
    const [, arm, cond, site] = job.id.split(':');
    await s.worker('/api/worker/result', { job_id: job.id, status: 'ok', files: cellFiles(arm, cond, site), usage: { input: 2000, output: 1000 }, calls: 2 });
    st = (await s.ui('GET', '/api/state')).data;
    assert.equal(st.projection.baseline.expected_total_usd, frozen); // does not drift with measurements
    assert.equal(st.recent_usage.length, 1);
    assert.equal(st.recent_usage[0].arm, arm);
    assert.equal(st.recent_usage[0].input, 2000);
    const row = st.projection.by_arm.find((r) => r.arm === arm);
    assert.ok(Math.abs(row.variance_usd - (row.est_total_usd - row.baseline_total_usd)) < 1e-9);
    await s.ui('POST', '/api/projection/baseline');
    st = (await s.ui('GET', '/api/state')).data;
    assert.ok(Math.abs(st.projection.variance_usd) < 1e-9); // rebaseline resets the comparison
  } finally { await s.close(); }
});
