const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createApp } = require('../server');

function boot() {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arc-'));
  const app = createApp({ dataDir, env: { MOCK_PROVIDERS: '1', WORKER_TOKEN: 'wt' } });
  const { coord, state } = app.ctx;
  for (const a of ['A1', 'A2', 'A3', 'A4']) state.arms[a] = { provider: 'openai', model_id: 'm' };
  state.settings.sites = ['UNI-01'];
  state.settings.conditions = ['naive'];
  return { app, coord, state };
}
const ARCS = { A5: 'http://arc-a5:8091/v1', A6: 'http://arc-a6:8090/v1' };

test('open-source arms are not dispatched unless dispatch_open is on', () => {
  const { coord } = boot();
  coord.start('repair');
  assert.equal([...coord.jobs.keys()].filter((id) => /^repair:A[56]:/.test(id)).length, 0);
});

test('dispatch_open: start is blocked until an ARC worker is online, then only that worker gets A5/A6 jobs', () => {
  const { coord, state } = boot();
  state.settings.dispatch_open = true;
  const blocked = coord.start('repair');
  assert.deepEqual(blocked.blockers.filter((b) => /ARC/.test(b)).length, 2);
  coord.claim({ worker_id: 'mac-a5', max: 0, arcs: { A5: ARCS.A5 }, arms: ['A5'] });
  coord.claim({ worker_id: 'mac-a6', max: 0, arcs: { A6: ARCS.A6 }, arms: ['A6'] });
  assert.equal(coord.start('repair').ok, true);
  const plain = coord.claim({ worker_id: 'plain', max: 20 }); // no tunnel: never gets open arms
  assert.ok(plain.length > 0 && plain.every((j) => !/^A[56]$/.test(j.arm)));
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
  assert.deepEqual(coord.workers()[0].arcs, ['A5', 'A6']);
  assert.equal(coord.start('repair').ok, true);
  assert.ok(coord.claim({ worker_id: 'w', max: 50, arcs: ARCS }).some((j) => j.arm === 'A5'));
  assert.ok(coord.claim({ worker_id: 'w', max: 50, arcs: {} }).every((j) => j.arm !== 'A5')); // tunnel down
});
