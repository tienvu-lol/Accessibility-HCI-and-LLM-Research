const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createApp } = require('../server');

function boot(env = {}) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arc-'));
  const app = createApp({ dataDir, env: { MOCK_PROVIDERS: '1', WORKER_TOKEN: 'wt', ...env } });
  const { coord, state } = app.ctx;
  for (const a of ['A1', 'A2', 'A3', 'A4']) state.arms[a] = { provider: 'openai', model_id: 'm' };
  state.settings.sites = ['UNI-01'];
  state.settings.conditions = ['naive'];
  return { app, coord, state };
}
const ARCS = { A5: 'http://arc-a5:8091/v1', A6: 'http://arc-a6:8090/v1', A7: 'http://arc-a7:8092/v1' };

test('open-source arms are not dispatched unless dispatch_open is on', () => {
  const { coord } = boot();
  coord.start('repair');
  assert.equal([...coord.jobs.keys()].filter((id) => /^repair:A[56]:/.test(id)).length, 0);
});

test('dispatch_open queues all configured arms, but only a worker with the matching tunnel claims an open arm', () => {
  const { coord, state } = boot();
  state.settings.dispatch_open = true;
  assert.equal(coord.start('repair').ok, true);
  assert.equal(coord.jobs.get('repair:A7:naive:UNI-01').state, 'queued');
  coord.claim({ worker_id: 'mac-a5', max: 0, arcs: { A5: ARCS.A5 }, arms: ['A5'] });
  coord.claim({ worker_id: 'mac-a6', max: 0, arcs: { A6: ARCS.A6 }, arms: ['A6'] });
  assert.equal(coord.start('repair').ok, true);
  const plain = coord.claim({ worker_id: 'plain', max: 20 }); // no tunnel: never gets open arms
  assert.ok(plain.length > 0 && plain.every((j) => !Object.hasOwn(ARCS, j.arm)));
  const a5 = coord.claim({ worker_id: 'mac-a5', max: 5, arcs: { A5: ARCS.A5 }, arms: ['A5'] });
  assert.ok(a5.length > 0);
  for (const j of a5) {
    assert.equal(j.arm, 'A5');
    assert.equal(j.base_url, ARCS.A5);        // the claiming worker's own tunnel
    assert.equal(j.api_key, null);             // key stays on that machine
    assert.equal(j.api_key_env, 'A5_API_KEY');
    assert.equal(j.provider, 'vt-arc-falcon-llamacpp');
    assert.ok(!/PENDING|\(/.test(j.model_id), 'config note stripped from the model id');
  }
  const a6 = coord.claim({ worker_id: 'mac-a6', max: 5, arcs: { A6: ARCS.A6 }, arms: ['A6'] });
  assert.ok(a6.length > 0 && a6.every((j) => j.arm === 'A6' && j.base_url === ARCS.A6));
});

test('a worker that drops its tunnel stops receiving open-arm jobs; bad urls are ignored', () => {
  const { coord, state } = boot();
  state.settings.dispatch_open = true;
  coord.claim({ worker_id: 'w', max: 0, arcs: { A5: 'file:///etc/passwd', A9: ARCS.A5 } });
  assert.deepEqual(coord.workers()[0].arcs, []);
  coord.claim({ worker_id: 'w', max: 0, arcs: ARCS });
  assert.deepEqual(coord.workers()[0].arcs, Object.keys(ARCS));
  assert.equal(coord.start('repair').ok, true);
  assert.ok(coord.claim({ worker_id: 'w', max: 50, arcs: ARCS }).some((j) => j.arm === 'A5'));
  assert.ok(coord.claim({ worker_id: 'w', max: 50, arcs: {} }).every((j) => j.arm !== 'A5')); // tunnel down
});

test('open arms take separate keys, including A7', () => {
  const { coord, state } = boot({ A5_API_KEY: 'deepseek-key-1111', A6_API_KEY: 'qwen-key-2222', A7_API_KEY: 'glm-key-3333' });
  state.settings.dispatch_open = true;
  coord.claim({ worker_id: 'mac', max: 0, arcs: ARCS });
  assert.equal(coord.start('repair').ok, true);
  const jobs = coord.claim({ worker_id: 'mac', max: 50, arcs: ARCS }).filter((j) => Object.hasOwn(ARCS, j.arm));
  const byArm = Object.fromEntries(jobs.map((j) => [j.arm, j]));
  assert.equal(byArm.A5.api_key, 'deepseek-key-1111');
  assert.equal(byArm.A5.api_key_env, 'A5_API_KEY');
  assert.equal(byArm.A6.api_key, 'qwen-key-2222');
  assert.equal(byArm.A6.api_key_env, 'A6_API_KEY');
  assert.equal(byArm.A7.api_key, 'glm-key-3333');
  assert.equal(byArm.A7.api_key_env, 'A7_API_KEY');
  assert.equal(byArm.A7.base_url, ARCS.A7);
  assert.notEqual(byArm.A5.api_key, byArm.A6.api_key);
  // and the spend each one causes is attributed to its own key, not pooled
  assert.equal(coord.jobs.get(byArm.A5.id).key_id, 'a5:1111');
  assert.equal(coord.jobs.get(byArm.A6.id).key_id, 'a6:2222');
});

test('with no key on the console the open arm uses the one on its worker, which never travels', () => {
  const { coord, state } = boot();
  state.settings.dispatch_open = true;
  coord.claim({ worker_id: 'mac', max: 0, arcs: ARCS });
  coord.start('repair');
  const j = coord.claim({ worker_id: 'mac', max: 50, arcs: ARCS }).find((x) => x.arm === 'A5');
  assert.equal(j.api_key, null, 'nothing to send: the key stays in the worker\u2019s own A5_API_KEY');
  assert.equal(j.api_key_env, 'A5_API_KEY');
  assert.equal(coord.jobs.get(j.id).key_id, 'local:mac', 'spend is still attributed, to that machine\u2019s own key');
});

test('one arm keyed on the console and the other on the laptop work side by side', () => {
  const { coord, state } = boot({ A6_API_KEY: 'qwen-key-2222' });
  state.settings.dispatch_open = true;
  coord.claim({ worker_id: 'mac', max: 0, arcs: ARCS });
  coord.start('repair');
  const jobs = coord.claim({ worker_id: 'mac', max: 50, arcs: ARCS });
  assert.equal(jobs.find((j) => j.arm === 'A5').api_key, null);
  assert.equal(jobs.find((j) => j.arm === 'A6').api_key, 'qwen-key-2222');
});
