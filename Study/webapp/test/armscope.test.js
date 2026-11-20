const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createApp } = require('../server');
const { applySettings } = require('../lib/state');

// Real (non-mock) console with NO provider keys: exactly the situation of a live A6/A7 test.
function boot(dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'armscope-'))) {
  const app = createApp({ dataDir, env: { WORKER_TOKEN: 'wt' } });
  const { coord, state } = app.ctx;
  state.settings.sites = ['UNI-01'];
  state.settings.conditions = ['naive'];
  return { app, coord, state, dataDir };
}
const repairArms = (coord) => [...coord.jobs.values()].filter((j) => j.kind === 'repair').map((j) => j.arm).sort();

test('default scope is unchanged: every hosted arm still needs its key before a repair starts', () => {
  const { coord, state } = boot();
  assert.equal(state.settings.arms, null);
  const r = coord.start('repair');
  assert.ok(r.blockers.some((b) => /^A1: no anthropic key$/.test(b)));
  assert.ok(r.blockers.some((b) => /^A3: provider not set$/.test(b)));
  assert.equal(repairArms(coord).length, 0, 'a blocked start plans nothing');
});

test('scoped to A6 and A7: starts with no keys at all and plans only those two arms', () => {
  const { app, coord, state } = boot();
  state.settings.dispatch_open = true;
  assert.equal(applySettings(app.ctx, { arms: ['A7', 'A6'] }), null);
  assert.deepEqual(state.settings.arms, ['A6', 'A7'], 'stored in config order');
  assert.deepEqual(coord.start('repair'), { ok: true });
  assert.deepEqual(repairArms(coord), ['A6', 'A7']);
});

test('scope only checks the selected hosted arms', () => {
  const { app, coord } = boot();
  applySettings(app.ctx, { arms: ['A1'] });
  assert.deepEqual(coord.start('repair').blockers, ['A1: no anthropic key']);
  app.ctx.keys.set('anthropic', 'sk-test');
  assert.deepEqual(coord.start('repair'), { ok: true });
  assert.deepEqual(repairArms(coord), ['A1']);
});

test('open-source arms only, with dispatch off, is refused instead of starting an empty run', () => {
  const { app, coord, state } = boot();
  applySettings(app.ctx, { arms: ['A6'] });
  assert.match(coord.start('repair').blockers.join(), /no selected arm will be dispatched/);
  state.settings.dispatch_open = true;
  assert.deepEqual(coord.start('repair'), { ok: true });
  assert.deepEqual(repairArms(coord), ['A6']);
});

test('settings validation: unknown arm, empty list and wrong type are rejected; all arms normalises to null', () => {
  const { app, state } = boot();
  const ids = Object.keys(state.arms);
  for (const bad of [['A99'], [], 'A6', ['A6', 'nope'], 7]) {
    assert.match(applySettings(app.ctx, { arms: bad }), /arms must be null or a non-empty list/, JSON.stringify(bad));
    assert.equal(state.settings.arms, null, 'a rejected value changes nothing');
  }
  assert.equal(applySettings(app.ctx, { arms: ids }), null);
  assert.equal(state.settings.arms, null);
  applySettings(app.ctx, { arms: ['A6'] });
  assert.deepEqual(state.settings.arms, ['A6']);
  applySettings(app.ctx, { arms: null });
  assert.equal(state.settings.arms, null);
});

test('scope survives a restart, and an older state.json without it loads as all arms', async () => {
  const a = boot();
  applySettings(a.app.ctx, { arms: ['A6', 'A7'] });
  a.state.flush();
  const b = boot(a.dataDir);
  assert.deepEqual(b.app.ctx.state.settings.arms, ['A6', 'A7']);

  const old = fs.mkdtempSync(path.join(os.tmpdir(), 'armscope-old-'));
  fs.writeFileSync(path.join(old, 'state.json'), JSON.stringify({ settings: { budget_usd: 50 } }));
  assert.equal(boot(old).app.ctx.state.settings.arms, null);
});

test('the pipeline scope only mentions arms when a scope is set (existing shape is untouched)', () => {
  const { app, coord } = boot();
  assert.equal(Object.hasOwn(coord.pipelineProgress().scope, 'arms'), false);
  applySettings(app.ctx, { arms: ['A6', 'A7'] });
  const { arms, study_arms } = coord.pipelineProgress().scope;
  assert.equal(arms, 2);
  assert.equal(study_arms, Object.keys(app.ctx.state.arms).length);
});

test('PUT /api/settings accepts and rejects arms over HTTP', async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'armscope-http-'));
  const app = createApp({ dataDir, env: { APP_PASSWORD: 'pw', WORKER_TOKEN: 'wt' } });
  const port = await app.listen(0);
  try {
    const call = async (method, url, body, cookie) => {
      const res = await fetch(`http://127.0.0.1:${port}${url}`, { method, headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) }, body: JSON.stringify(body), redirect: 'manual' });
      return { res, data: await res.json().catch(() => null) };
    };
    const login = await call('POST', '/api/login', { password: 'pw' });
    const cookie = login.res.headers.get('set-cookie').split(';')[0];
    const ok = await call('PUT', '/api/settings', { arms: ['A6', 'A7'] }, cookie);
    assert.equal(ok.res.status, 200);
    assert.deepEqual(ok.data.settings.arms, ['A6', 'A7']);
    const bad = await call('PUT', '/api/settings', { arms: ['A42'] }, cookie);
    assert.equal(bad.res.status, 400);
    assert.match(bad.data.error, /arms must be null or a non-empty list/);
  } finally { await app.close(); fs.rmSync(dataDir, { recursive: true, force: true }); }
});
