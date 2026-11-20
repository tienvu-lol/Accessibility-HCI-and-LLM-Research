const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createApp } = require('../server');

const A7 = { A7: 'http://arc-a7:8092/v1' };
function boot(env = { MOCK_PROVIDERS: '1' }) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'claimarm-'));
  const app = createApp({ dataDir, env: { WORKER_TOKEN: 'wt', ...env } });
  const { coord, state } = app.ctx;
  for (const a of ['A1', 'A2', 'A3', 'A4']) state.arms[a] = { provider: 'openai', model_id: 'm' };
  state.settings.sites = ['UNI-01', 'UNI-02'];
  state.settings.conditions = ['naive'];
  state.settings.dispatch_open = true;
  return { coord, state };
}
const hello = (coord, worker_id, extra = {}) => coord.claim({ worker_id, max: 0, info: { manual: true }, ...extra });

test('claiming A7 for one computer queues only A7 and only that computer runs it, with no request needed', () => {
  const { coord, state } = boot();
  hello(coord, 'mac-a7', { arcs: A7, arms: ['A7'] });
  hello(coord, 'win-a7', { arcs: A7, arms: ['A7'] });
  assert.deepEqual(coord.claimArm('A7', 'mac-a7'), { arm: 'A7', worker: 'mac-a7' });
  assert.deepEqual([...coord.jobs.keys()].filter((id) => id.startsWith('repair:')).sort(), ['repair:A7:naive:UNI-01', 'repair:A7:naive:UNI-02']);
  assert.equal(state.assign.A7, 'mac-a7');
  assert.deepEqual(coord.claim({ worker_id: 'win-a7', max: 5, arcs: A7, arms: ['A7'], info: { manual: true } }), []); // someone else owns it
  const got = coord.claim({ worker_id: 'mac-a7', max: 5, arcs: A7, arms: ['A7'], info: { manual: true } }); // manual mode, no Claim click
  assert.equal(got.length, 2);
  assert.ok(got.every((j) => j.arm === 'A7' && j.base_url === A7.A7));
  assert.throws(() => coord.claimArm('A7', 'win-a7'), /claimed by mac-a7/);
  assert.equal(coord.releaseArm('A7').released, true);
  assert.equal(state.assign.A7, undefined);
  assert.throws(() => coord.releaseArm('A7'), /not claimed/);
});

test('an arm cannot be claimed for a computer that cannot run it, and the reason says why', () => {
  const { coord } = boot();
  hello(coord, 'plain'); // no tunnel
  assert.throws(() => coord.claimArm('A7', 'plain'), /no live ARC tunnel for A7/);
  assert.throws(() => coord.claimArm('A7', 'nobody'), /no worker online/);
  assert.throws(() => coord.claimArm('A9', 'plain'), /unknown arm/);
  const w = coord.workers().find((x) => x.id === 'plain');
  assert.match(w.can.A7, /no live ARC tunnel/);
  assert.equal(w.can.A1, null);
});

test('a hosted arm runs on the computer\'s own key; the console key is not needed or sent', () => {
  const { coord } = boot({ WORKER_TOKEN: 'wt' }); // real mode, no console key
  hello(coord, 'rich', { keys: ['A1_API_KEY', 'OPENAI_API_KEY', 'not a key name'] });
  hello(coord, 'poor');
  assert.deepEqual(coord.workers().find((w) => w.id === 'rich').own_keys, ['A1']);
  assert.match(coord.workers().find((w) => w.id === 'poor').can.A1, /no openai key/);
  assert.throws(() => coord.claimArm('A1', 'poor'), /cannot run A1/);
  coord.claimArm('A1', 'rich');
  const jobs = coord.claim({ worker_id: 'rich', max: 5, info: { manual: true }, keys: ['A1_API_KEY'] });
  assert.equal(jobs.length, 2);
  for (const j of jobs) { assert.equal(j.api_key, null); assert.equal(j.api_key_env, 'A1_API_KEY'); }
  assert.equal(coord.jobs.get(jobs[0].id).key_id, 'local:rich');
});

test('cancelQueued removes only waiting jobs, by job, by arm or all; running jobs are refused', () => {
  const { coord } = boot();
  coord.start('repair');
  const before = coord.jobs.size;
  assert.equal(coord.cancelQueued({ job_id: 'repair:A7:naive:UNI-01' }).canceled, 1);
  assert.equal(coord.jobs.size, before - 1);
  assert.equal(coord.cancelQueued({ arm: 'A1', kind: 'repair' }).canceled, 2);
  assert.throws(() => coord.cancelQueued({}), /say which jobs/);
  assert.throws(() => coord.cancelQueued({ job_id: 'nope' }), /unknown job/);
  assert.throws(() => coord.cancelQueued({ arm: 'A9' }), /unknown arm/);
  coord.claim({ worker_id: 'w', max: 1 });
  const running = [...coord.jobs.values()].find((j) => j.state === 'running');
  assert.throws(() => coord.cancelQueued({ job_id: running.id }), /Stop job/);
  coord.cancelQueued({ all: true });
  assert.ok([...coord.jobs.values()].every((j) => j.state !== 'queued'));
  assert.throws(() => coord.cancelQueued({ all: true }), /no waiting jobs/);
});

test('cancelling everything that waits returns the run to idle', () => {
  const { coord } = boot();
  coord.start('repair');
  coord.cancelQueued({ all: true });
  assert.equal(coord.runInfo().phase, 'idle');
});

test('machine view splits each computer\'s jobs into running, stalled and finished', () => {
  const { coord } = boot();
  hello(coord, 'm');
  coord.start('repair');
  coord.claim({ worker_id: 'm', max: 3, info: {} });
  let m = coord.machineView(null).machines.find((x) => x.id === 'm');
  assert.deepEqual(m.jobs, { running: 3, stalled: 0, done: 0, failed: 0 });
  for (const j of coord.jobs.values()) if (j.state === 'running') { j.lease_exp -= 40000; break; } // one silent for 40 s
  m = coord.machineView(null).machines.find((x) => x.id === 'm');
  assert.deepEqual([m.jobs.running, m.jobs.stalled], [2, 1]);
  assert.equal(coord.jobView().jobs.filter((j) => j.stalled).length, 1);
});

test('one ARC_API_KEY covers every open-source arm on the console; a per-arm variable still overrides it', () => {
  const { coord } = boot({ MOCK_PROVIDERS: '1', ARC_API_KEY: 'shared-1111', A6_API_KEY: 'own-2222' });
  hello(coord, 'm', { arcs: { A5: 'http://arc-a5:1/v1', A6: 'http://arc-a6:1/v1', A7: A7.A7 } });
  coord.claimArm('A5', 'm'); coord.claimArm('A6', 'm'); coord.claimArm('A7', 'm');
  const byArm = Object.fromEntries(coord.claim({ worker_id: 'm', max: 9, info: { manual: true }, arcs: { A5: 'http://arc-a5:1/v1', A6: 'http://arc-a6:1/v1', A7: A7.A7 } }).map((j) => [j.arm, j]));
  assert.equal(byArm.A5.api_key, 'shared-1111');
  assert.equal(byArm.A7.api_key, 'shared-1111');
  assert.equal(byArm.A6.api_key, 'own-2222');
});

test('a worker with ARC_API_KEY holds the key for every arm it has a tunnel for, and no other arm', () => {
  const { createWorker } = require('../worker');
  const saved = { ...process.env };
  try {
    process.env.ARC_API_KEY = 'shared-1111'; delete process.env.A5_API_KEY; delete process.env.A1_API_KEY; process.env.A6_API_KEY = 'own-2222';
    createWorker({ webUrl: 'http://127.0.0.1:1', token: 't', arcUrls: { A5: 'http://x/v1', A6: 'http://y/v1' } });
    assert.equal(process.env.A5_API_KEY, 'shared-1111');
    assert.equal(process.env.A6_API_KEY, 'own-2222'); // per-arm override wins
    assert.equal(process.env.A1_API_KEY, undefined);   // hosted arms never get the ARC key
  } finally { for (const k of Object.keys(process.env)) if (!(k in saved)) delete process.env[k]; Object.assign(process.env, saved); }
});
