const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createApp } = require('../server');

function boot() {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wctl-'));
  const app = createApp({ dataDir, env: { MOCK_PROVIDERS: '1', WORKER_TOKEN: 'wt' } });
  const { coord, state } = app.ctx;
  for (const a of ['A1', 'A2', 'A3', 'A4']) state.arms[a] = { provider: 'openai', model_id: 'm' };
  state.settings.sites = ['UNI-01'];
  coord.start('repair');
  return { app, coord };
}

test('info is recorded, keepalive claims nothing, and workers stay listed', () => {
  const { coord } = boot();
  assert.deepEqual(coord.claim({ worker_id: 'mac', max: 0, slots: 4, info: { host: 'Pat-MBP', os: 'macOS arm64' } }), []);
  const [w] = coord.workers();
  assert.equal(w.id, 'mac');
  assert.equal(w.slots, 4);
  assert.deepEqual(w.info, { host: 'Pat-MBP', os: 'macOS arm64' });
});

test('cap limits concurrent jobs, pause stops claims, clearing the cap restores them', () => {
  const { coord } = boot();
  coord.claim({ worker_id: 'a', max: 0, slots: 8 });
  coord.setWorkerCtl('a', { cap: 2 });
  assert.equal(coord.claim({ worker_id: 'a', max: 8, slots: 8 }).length, 2);
  assert.equal(coord.claim({ worker_id: 'a', max: 8, slots: 8 }).length, 0); // already at cap
  coord.setWorkerCtl('a', { cap: null, paused: true });
  assert.equal(coord.claim({ worker_id: 'a', max: 8, slots: 8 }).length, 0);
  coord.setWorkerCtl('a', { paused: false });
  assert.ok(coord.claim({ worker_id: 'a', max: 3, slots: 8 }).length > 0);
  assert.equal(coord.workers()[0].cap, null);
});

test('setWorkerCtl validates', () => {
  const { coord } = boot();
  coord.claim({ worker_id: 'a', max: 0 });
  assert.throws(() => coord.setWorkerCtl('nope', { cap: 1 }), /unknown worker/);
  assert.throws(() => coord.setWorkerCtl('a', { cap: -1 }), /cap/);
  assert.throws(() => coord.setWorkerCtl('a', { paused: 'yes' }), /paused/);
});
