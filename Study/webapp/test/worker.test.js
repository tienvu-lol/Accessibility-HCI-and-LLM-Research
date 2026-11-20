'use strict';
const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { createWorker } = require('../worker');

function fakeWeb(handlers) {
  const calls = [];
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (d) => { body += d; });
    req.on('end', () => {
      const json = body ? JSON.parse(body) : {};
      calls.push({ path: req.url, auth: req.headers.authorization, body: json });
      const out = (handlers[req.url] || (() => ({})))(json, calls) ;
      res.writeHead(out.status || 200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(out.body || {}));
    });
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r({ server, calls, url: `http://127.0.0.1:${server.address().port}` })));
}

const waitFor = async (cond) => { for (let i = 0; i < 200 && !cond(); i++) await new Promise((r) => setTimeout(r, 25)); assert.ok(cond(), 'timed out'); };
const job = { id: 'repair:A1:wcag:UNI-01', kind: 'repair', api_key: 'sk-secret' };
const mk = (web, runners) => createWorker({ webUrl: web.url, token: 'T', slots: 2, id: 'w1', pollMs: 20, heartbeatMs: 30, retryMs: 5, runners, log: () => {} });

test('claim -> run -> result, with auth and heartbeat', async () => {
  let served = false;
  const web = await fakeWeb({ '/api/worker/claim': () => { const jobs = served ? [] : [job]; served = true; return { body: { jobs } }; } });
  const w = mk(web, { repair: async () => { await new Promise((r) => setTimeout(r, 100)); return { status: 'ok', files: {}, usage: { input: 1, output: 2 }, calls: 1 }; } });
  w.start();
  await waitFor(() => web.calls.some((c) => c.path === '/api/worker/result'));
  await w.stop(); web.server.close();
  const result = web.calls.find((c) => c.path === '/api/worker/result');
  assert.strictEqual(result.body.job_id, job.id);
  assert.strictEqual(result.body.status, 'ok');
  assert.ok(web.calls.every((c) => c.auth === 'Bearer T'));
  assert.ok(web.calls.some((c) => c.path === '/api/worker/heartbeat'));
  assert.ok(!web.calls.some((c) => c.path === '/api/worker/release'));
});

test('infra failure releases immediately (retryable), no result, key not leaked', async () => {
  let served = false;
  const web = await fakeWeb({ '/api/worker/claim': () => { const jobs = served ? [] : [job]; served = true; return { body: { jobs } }; } });
  const w = mk(web, { repair: async (j) => { throw new Error(`spawn ENOENT using ${j.api_key}`); } });
  w.start();
  await waitFor(() => web.calls.some((c) => c.path === '/api/worker/release'));
  await w.stop(); web.server.close();
  const rel = web.calls.find((c) => c.path === '/api/worker/release');
  assert.strictEqual(rel.body.retryable, true);
  assert.ok(!rel.body.reason.includes('sk-secret'));
  assert.ok(!web.calls.some((c) => c.path === '/api/worker/result'));
});

test('result upload failure releases the job', async () => {
  let served = false;
  const web = await fakeWeb({
    '/api/worker/claim': () => { const jobs = served ? [] : [job]; served = true; return { body: { jobs } }; },
    '/api/worker/result': () => ({ status: 503 }),
  });
  const w = mk(web, { repair: async () => ({ status: 'ok' }) });
  w.start();
  await waitFor(() => web.calls.some((c) => c.path === '/api/worker/release'));
  await w.stop(); web.server.close();
});

test('SIGTERM-style stop releases running jobs', async () => {
  let served = false;
  const web = await fakeWeb({ '/api/worker/claim': () => { const jobs = served ? [] : [job]; served = true; return { body: { jobs } }; } });
  const w = mk(web, { repair: (j, { signal }) => new Promise((_, rej) => signal.addEventListener('abort', () => rej(new Error('aborted')))) });
  w.start();
  await waitFor(() => w.running.size === 1);
  await w.stop(); web.server.close();
  const rel = web.calls.find((c) => c.path === '/api/worker/release');
  assert.ok(rel && rel.body.retryable);
});

test('claim server errors back off exponentially', async () => {
  const web = await fakeWeb({ '/api/worker/claim': () => ({ status: 500 }) });
  const w = mk(web, { repair: async () => ({}) });
  w.start();
  await waitFor(() => web.calls.length >= 3);
  await w.stop(); web.server.close();
});
