// End-to-end smoke: real server + real worker, mock providers (no API calls, no keys).
// Run from repo root: node Study/webapp/e2e-mock.js   (exit 0 = pass)
const { spawn } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path'), assert = require('assert');

const PORT = 18099, URL_ = `http://127.0.0.1:${PORT}`, PW = 'pw-test', TOK = 'tok-test';
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-'));
const SITES = ['UNI-01', 'UNI-02', 'CORP-01'];
const kids = [];
let cookie = '';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function start(file, env, tag) {
  const p = spawn(process.execPath, [path.join(__dirname, file)], {
    env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'] });
  p.tag = tag; p.out = '';
  p.stdout.on('data', d => { p.out += d; }); p.stderr.on('data', d => { p.out += d; });
  kids.push(p); return p;
}
async function api(method, p, body, raw) {
  const r = await fetch(URL_ + p, { method, headers: { 'content-type': 'application/json', cookie }, body: body === undefined ? undefined : JSON.stringify(body) });
  const t = await r.text(); let j; try { j = JSON.parse(t); } catch { j = t; }
  return { status: r.status, body: j, headers: r.headers, text: t };
}
async function until(label, fn, ms = 240000) {
  const end = Date.now() + ms; let last;
  while (Date.now() < end) { last = await fn(); if (last) return last; await sleep(1500); }
  throw new Error('timeout: ' + label);
}
function step(s) { console.log('\n== ' + s); }

(async () => {
  try {
    start('server.js', { PORT, DATA_DIR: dataDir, APP_PASSWORD: PW, WORKER_TOKEN: TOK, MOCK_PROVIDERS: '1', NODE_ENV: 'production', PYTHONDONTWRITEBYTECODE: '1' }, 'server');
    await until('server up', async () => { try { return (await fetch(URL_ + '/healthz')).ok; } catch { return false; } }, 20000);

    step('auth');
    for (const a of ['/app.js', '/charts.js', '/style.css', '/login.html']) {
      const r = await fetch(URL_ + a, { redirect: 'manual' });
      assert.strictEqual(r.status, 200, a + ' must load without a cookie (login page needs it)');
    }
    assert.strictEqual((await fetch(URL_ + '/', { redirect: 'manual' })).status, 302, 'SPA must redirect when logged out');
    assert.strictEqual((await api('GET', '/api/state')).status, 401, 'state must need login');
    assert.strictEqual((await api('POST', '/api/login', { password: 'nope' })).status, 401);
    const li = await api('POST', '/api/login', { password: PW });
    assert.strictEqual(li.status, 200); cookie = li.headers.get('set-cookie').split(';')[0];

    step('keys + arms + settings');
    for (const [p, k] of [['openai', 'sk-TESTKEY-1111'], ['anthropic', 'sk-ant-TESTKEY-2222'], ['gemini', 'AIza-TESTKEY-3333']])
      assert.strictEqual((await api('PUT', '/api/keys/' + p, { key: k })).status, 200);
    assert.strictEqual((await api('PUT', '/api/arms/A3', { provider: 'gemini', model_id: 'x' })).status, 400, 'gemini arm must be rejected');
    assert.strictEqual((await api('PUT', '/api/arms/A5', { provider: 'openai', model_id: 'x' })).status, 400, 'open-source arm not editable');
    assert.strictEqual((await api('PUT', '/api/arms/A3', { provider: 'openai', model_id: 'gpt-mock' })).status, 200);
    assert.strictEqual((await api('PUT', '/api/arms/A4', { provider: 'anthropic', model_id: 'claude-mock' })).status, 200);
    assert.strictEqual((await api('PUT', '/api/settings', { budget_usd: 50, sites: SITES, conditions: ['naive', 'wcag', 'nielsen', 'both'], max_iter: 2, judge_model_id: 'gemini-mock' })).status, 200);
    let st = (await api('GET', '/api/state')).body;
    const leak = JSON.stringify(st);
    for (const k of ['TESTKEY-1111', 'TESTKEY-2222', 'TESTKEY-3333']) assert(!leak.includes(k), 'key leaked in state');
    assert.strictEqual(st.keys.openai.last4, '1111');

    step('worker + repair (A1-A4 x 4 conditions x 3 sites)');
    start('worker.js', { WEB_URL: URL_, WORKER_TOKEN: TOK, WORKER_SLOTS: '6', POLL_MS: '500', PYTHONDONTWRITEBYTECODE: '1' }, 'worker');
    const rs = await api('POST', '/api/run/start', { phase: 'repair' });
    assert.strictEqual(rs.status, 200, 'start repair: ' + rs.text);
    st = await until('repair done', async () => {
      const s = (await api('GET', '/api/state')).body;
      const mainstream = s.arms.filter(a => a.kind === 'mainstream');
      const done = mainstream.every(a => a.cells.total > 0 && a.cells.ok + a.cells.failed === a.cells.total);
      return done ? s : null;
    });
    for (const a of st.arms.filter(a => a.kind === 'mainstream')) {
      console.log(`  ${a.id} cells ok=${a.cells.ok} failed=${a.cells.failed}/${a.cells.total} tokens in=${a.tokens.input} out=${a.tokens.output} cost=$${a.cost_usd}`);
      assert.strictEqual(a.cells.failed, 0, a.id + ' had failed cells');
      assert(a.tokens.input > 0 && a.tokens.output > 0, a.id + ' no tokens recorded');
    }
    assert(!JSON.stringify(st).includes('TESTKEY'), 'key leaked after run');

    step('scoring (auto-pipelined; needs chromium)');
    await until('scored', async () => {
      const r = await api('GET', '/api/results');
      return r.status === 200 && r.body.coverage.variants_scored >= 4 * 4 * SITES.length ? r.body : null;
    }, 420000);

    step('judge (explicit start)');
    const js = await api('POST', '/api/run/start', { phase: 'judge', force: true });
    assert.strictEqual(js.status, 200, 'start judge: ' + js.text);
    await until('judged', async () => {
      const s = (await api('GET', '/api/state')).body;
      return s.judge.items.total > 0 && s.judge.items.done + s.judge.items.failed === s.judge.items.total ? s : null;
    }, 240000);
    st = (await api('GET', '/api/state')).body;
    assert(st.judge.items.done > 0 && st.judge.items.failed === 0, 'judge items: ' + JSON.stringify(st.judge.items));
    console.log('  judge', JSON.stringify(st.judge.items), 'tokens', JSON.stringify(st.judge.tokens));

    step('results + exports');
    const res = (await api('GET', '/api/results')).body;
    for (const k of ['coverage', 'gate', 'fig2', 'fig3', 'fig4', 'fig5', 'fig6', 'loop', 'headline', 'agreement', 'notes']) assert(k in res, 'results missing ' + k);
    assert(res.fig2.length > 0 && res.fig3.length > 0 && res.loop.length > 0, 'empty figures');
    assert(!JSON.stringify(res).match(/NaN|Infinity/), 'NaN in results');
    for (const n of ['fig2_violations', 'fig3_judge_ranks', 'fig5_gain_vs_usability', 'loop_behavior', 'metrics_all', 'judge_rankings', 'cost_by_source']) {
      const c = await api('GET', `/api/export/${n}.csv`);
      assert.strictEqual(c.status, 200, n + ' export'); assert(c.text.split('\n').length > 1, n + ' empty csv');
    }
    assert.strictEqual((await api('GET', '/api/export/all.json')).status, 200);
    const v = await api('GET', '/api/variant/A1/wcag/UNI-01/1/index.html');
    assert.strictEqual(v.status, 200); assert(/sandbox/.test(v.headers.get('content-security-policy') || ''), 'variant must be sandboxed');
    assert.strictEqual((await api('GET', '/api/variant/A1/wcag/UNI-01/1/..%2f..%2f..%2fstate.json')).status === 200, false, 'traversal');
    console.log('  fig2 rows', res.fig2.length, 'fig5 pts', res.fig5.length, 'fig6', res.fig6.length, 'loop', res.loop.length);

    step('human rating by name');
    const rt = await api('POST', '/api/rate/start', { name: 'Test Researcher' });
    assert.strictEqual(rt.status, 200, 'rate start: ' + rt.text);
    console.log('  rate start', JSON.stringify(rt.body).slice(0, 160));
    assert.strictEqual((await api('POST', '/api/rate/start', { name: '' })).status >= 400, true);

    step('static pages');
    for (const p of ['/', '/rate', '/style.css', '/app.js']) assert.strictEqual((await api('GET', p)).status, 200, p);
    console.log('\nE2E PASS');
    process.exitCode = 0;
  } catch (e) {
    console.error('\nE2E FAIL:', e.message);
    for (const k of kids) console.error(`--- ${k.tag} output (tail)\n` + k.out.split('\n').slice(-25).join('\n'));
    process.exitCode = 1;
  } finally {
    for (const k of kids) k.kill();
    await sleep(500);
    try { fs.rmSync(dataDir, { recursive: true, force: true }); } catch {}
  }
})();
