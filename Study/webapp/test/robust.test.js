'use strict';
// A running job must survive a console restart, a finished result must reach the console, and a cell whose
// computer has gone quiet must not be shown as running.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const http = require('node:http');
const os = require('os');
const path = require('path');
const { createApp } = require('../server');
const { createWorker } = require('../worker');

const A7 = { A7: 'http://arc-a7:8092/v1' };

function boot(dataDir, now) {
  const app = createApp({ dataDir, env: { WORKER_TOKEN: 'wt', MOCK_PROVIDERS: '1' }, now });
  const { coord, state } = app.ctx;
  state.settings.sites = ['UNI-01'];
  state.settings.conditions = ['naive'];
  state.settings.dispatch_open = true;
  state.settings.arms = ['A7'];
  return { app, coord, state };
}
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'robust-'));
const JOB = 'repair:A7:naive:UNI-01';
const claimJob = (coord, worker_id = 'w1') => coord.claim({ worker_id, max: 1, arcs: A7, arms: ['A7'] })[0];
const rejects = (fn, status) => assert.throws(fn, (e) => e.status === status || e.statusCode === status);

test('a running job survives a console restart and its worker keeps it', () => {
  let t = 1_000_000;
  const dir = tmp();
  const a = boot(dir, () => t);
  assert.deepEqual(a.coord.start('repair'), { ok: true });
  const job = claimJob(a.coord);
  assert.equal(job.id, JOB);
  assert.equal(a.coord.jobs.get(JOB).state, 'running');
  a.state.flush();

  t += 5_000; // the console restarts
  const b = boot(dir, () => t);
  assert.equal(b.coord.jobs.get(JOB).state, 'running', 'restored as running, not queued');
  assert.equal(b.coord.jobs.get(JOB).worker, 'w1');
  // another computer cannot take it during the grace period
  assert.deepEqual(b.coord.claim({ worker_id: 'w2', max: 5, arcs: A7, arms: ['A7'] }), []);
  // the worker's next heartbeat is accepted instead of telling it the job is gone
  assert.equal(b.coord.heartbeat(JOB, { worker_id: 'w1', lease: job.lease }).ok, true);
  assert.equal(b.coord.jobs.get(JOB).state, 'running');
});

test('a restored job whose worker never reports back is requeued after the grace period', () => {
  let t = 1_000_000;
  const dir = tmp();
  const a = boot(dir, () => t);
  a.coord.start('repair');
  claimJob(a.coord);
  a.state.flush();

  const b = boot(dir, () => t);
  t += 59_000;
  b.coord.reap();
  assert.equal(b.coord.jobs.get(JOB).state, 'running', 'still inside the grace period');
  t += 2_000;
  b.coord.reap();
  assert.equal(b.coord.jobs.get(JOB).state, 'queued');
  assert.equal(b.coord.jobs.get(JOB).error, 'lease expired');
});

test('a job an older console saved as queued is taken back by the worker that still holds its lease', () => {
  const t = 1_000_000;
  const { coord } = boot(tmp(), () => t);
  coord.start('repair');
  const job = claimJob(coord);
  coord.jobs.get(JOB).state = 'queued'; // how an older console wrote a running job to disk
  assert.equal(coord.heartbeat(JOB, { worker_id: 'w1', lease: job.lease }).ok, true);
  assert.equal(coord.jobs.get(JOB).state, 'running');

  coord.jobs.get(JOB).state = 'queued';
  rejects(() => coord.heartbeat(JOB, { worker_id: 'w2', lease: job.lease }), 409); // not its worker
  rejects(() => coord.heartbeat(JOB, { worker_id: 'w1', lease: job.lease + 1 }), 409); // not its lease
  assert.equal(coord.jobs.get(JOB).state, 'queued', 'a refused heartbeat changes nothing');
});

test('a worker that never held the job cannot take a queued job by heartbeat', () => {
  const { coord } = boot(tmp(), () => 1_000_000);
  coord.start('repair');
  rejects(() => coord.heartbeat(JOB, { worker_id: 'w1', lease: 1 }), 409);
  assert.equal(coord.jobs.get(JOB).state, 'queued');
});

test('a running cell whose computer went quiet is shown as stalled, and as running again once it reports', () => {
  let t = 1_000_000;
  const { coord } = boot(tmp(), () => t);
  coord.start('repair');
  const job = claimJob(coord);
  assert.equal(coord.matrix().A7.naive, 'r');
  t += 20_000;
  assert.equal(coord.matrix().A7.naive, 'r', 'a heartbeat is due every 10 s; 20 s is still fine');
  t += 15_000; // 35 s without one
  assert.equal(coord.matrix().A7.naive, 's');
  assert.equal(coord.armCells('A7').running, 1, 'it still counts as running; only its glyph changes');
  coord.heartbeat(JOB, { worker_id: 'w1', lease: job.lease });
  coord.claim({ worker_id: 'w1', max: 0, arcs: A7, arms: ['A7'] }); // the worker polls again
  assert.equal(coord.matrix().A7.naive, 'r');
});

// ---- the worker side: a finished result is retried for a long time and the lease is kept alive meanwhile
function fakeWeb(handlers) {
  const calls = [];
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (d) => { body += d; });
    req.on('end', () => {
      const json = body ? JSON.parse(body) : {};
      calls.push({ path: req.url, body: json });
      const out = (handlers[req.url] || (() => ({})))(json, calls);
      res.writeHead(out.status || 200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(out.body || {}));
    });
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r({ server, calls, url: `http://127.0.0.1:${server.address().port}` })));
}
const waitFor = async (cond) => { for (let i = 0; i < 300 && !cond(); i++) await new Promise((r) => setTimeout(r, 25)); assert.ok(cond(), 'timed out'); };
const job = { id: JOB, kind: 'repair', lease: 3 };
const mk = (web, runners) => createWorker({ webUrl: web.url, token: 'T', slots: 2, id: 'w1', pollMs: 20, heartbeatMs: 30, retryMs: 5, runners, log: () => {} });

test('a result the console rejects at first is retried until it is accepted, and is not released', async () => {
  let served = false, attempts = 0;
  const web = await fakeWeb({
    '/api/worker/claim': () => { const jobs = served ? [] : [job]; served = true; return { body: { jobs } }; },
    '/api/worker/result': () => (++attempts <= 5 ? { status: 503 } : { body: { ok: true } }),
  });
  const w = mk(web, { repair: async () => ({ status: 'ok', files: {}, usage: { input: 1, output: 1 }, calls: 1 }) });
  w.start();
  await waitFor(() => attempts >= 6);
  await new Promise((r) => setTimeout(r, 50));
  await w.stop(); web.server.close();
  assert.equal(attempts, 6, 'five refusals then one success');
  assert.ok(!web.calls.some((c) => c.path === '/api/worker/release'), 'a delivered result is never released');
});

test('the worker keeps heartbeating while the result uploads', async () => {
  let served = false, resultCalls = 0;
  const web = await fakeWeb({
    '/api/worker/claim': () => { const jobs = served ? [] : [job]; served = true; return { body: { jobs } }; },
    '/api/worker/result': () => (++resultCalls <= 6 ? { status: 503 } : { body: { ok: true } }),
  });
  const w = mk(web, { repair: async () => ({ status: 'ok', files: {} }) });
  w.start();
  await waitFor(() => resultCalls >= 7);
  await w.stop(); web.server.close();
  const firstResult = web.calls.findIndex((c) => c.path === '/api/worker/result');
  const lastResult = web.calls.map((c) => c.path).lastIndexOf('/api/worker/result');
  const beatsDuring = web.calls.slice(firstResult, lastResult).filter((c) => c.path === '/api/worker/heartbeat');
  assert.ok(beatsDuring.length >= 1, 'at least one heartbeat between the first and the last upload attempt');
});

test('a result that stays undeliverable is released after every retry, so the job is not left running', async () => {
  let served = false, attempts = 0;
  const web = await fakeWeb({
    '/api/worker/claim': () => { const jobs = served ? [] : [job]; served = true; return { body: { jobs } }; },
    '/api/worker/result': () => { attempts++; return { status: 503 }; },
  });
  const w = mk(web, { repair: async () => ({ status: 'ok', files: {} }) });
  w.start();
  await waitFor(() => web.calls.some((c) => c.path === '/api/worker/release'));
  await w.stop(); web.server.close();
  assert.equal(attempts, 8, 'eight tries before giving up');
  assert.equal(web.calls.find((c) => c.path === '/api/worker/release').body.retryable, true);
});
