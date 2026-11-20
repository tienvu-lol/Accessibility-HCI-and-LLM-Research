'use strict';
// Per-job dispatch, leases, stop, and per-device presence. Pure coordinator/launcher logic, mock providers.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('node:http');
const { createApp } = require('../server');
const { createWorker } = require('../worker');

function boot(env = {}) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'disp-'));
  const app = createApp({ dataDir, env: { MOCK_PROVIDERS: '1', WORKER_TOKEN: 'wt', ...env } });
  const { coord, state } = app.ctx;
  for (const a of ['A1', 'A2', 'A3', 'A4']) state.arms[a] = { provider: 'openai', model_id: 'm' };
  state.settings.sites = ['UNI-01', 'UNI-02'];
  state.settings.conditions = ['naive'];
  return { app, coord, state, ctx: app.ctx };
}
const manual = (id, extra = {}) => ({ worker_id: id, max: 0, slots: 4, info: { manual: true, tailnet_ip: id, host: id }, ...extra });
const ARC = { A7: 'http://arc-a7:8092/v1' };

test('requesting A1 claims only A1, even with A2 queued first', () => {
  const { coord } = boot();
  coord.start('repair');
  coord.claim(manual('mac'));
  const r = coord.requestWork('mac', { arm: 'A1' });
  assert.equal(r.requested, 2); // A1 has two queued repair jobs (two sites)
  const got = coord.claim({ ...manual('mac'), max: 10 });
  assert.ok(got.length > 0 && got.every((j) => j.arm === 'A1'), got.map((j) => j.id).join());
  assert.equal(coord.claim({ ...manual('mac'), max: 10 }).length, 0, 'the request is spent');
});

test('requesting an arm with nothing queued, or one this machine cannot run, is refused with the reason', () => {
  const { coord, state } = boot();
  coord.start('repair');
  coord.claim(manual('mac'));
  assert.throws(() => coord.requestWork('mac', { arm: 'A9' }), /unknown arm/);
  state.settings.dispatch_open = true;
  coord.start('repair'); // plans A5-A7 too
  coord.claim(manual('mac'));
  assert.throws(() => coord.requestWork('mac', { arm: 'A7' }), /no live ARC tunnel for A7/);
  coord.claim(manual('mac', { arcs: ARC }));
  assert.equal(coord.requestWork('mac', { arm: 'A7' }).want.arm, 'A7');
  // a plain request for A1 after everything of A1 is done is explained
  const { coord: c2 } = boot();
  c2.start('repair'); c2.claim(manual('m2'));
  assert.throws(() => c2.requestWork('m2', { arm: 'A1', kind: 'judge' }), /no queued A1 judge in the selected scope/);
});

test('a named job is reserved for one worker: nobody else can claim or request it', () => {
  const { coord } = boot();
  coord.start('repair');
  coord.claim(manual('a'));
  coord.claim(manual('b'));
  coord.claim(manual('c'));
  const id = 'repair:A1:naive:UNI-02', other = 'repair:A2:naive:UNI-01';
  coord.requestWork('a', { job_id: id });
  coord.requestWork('c', { job_id: other });
  assert.throws(() => coord.requestWork('b', { job_id: id }), /cannot take .*reserved for a/);
  // an auto-mode worker sweeping the whole queue skips both reserved jobs
  const auto = coord.claim({ worker_id: 'auto', max: 50, slots: 50 });
  assert.ok(auto.length > 0 && !auto.some((j) => j.id === id || j.id === other));
  const mine = coord.claim({ ...manual('a'), max: 5 });
  assert.deepEqual(mine.map((j) => j.id), [id]);
  assert.equal(mine[0].lease, 1);
  // unclaim releases the reservation, after which another worker can request that job
  coord.unclaimWork('c');
  assert.equal(coord.requestWork('b', { job_id: other }).requested, 1);
});

test('queue view says why each machine cannot take a group, and why an arm has nothing queued', () => {
  const { coord, state } = boot();
  coord.start('repair');
  coord.claim(manual('mac'));
  coord.claim({ worker_id: 'bot', max: 0, slots: 2 });
  state.settings.dispatch_open = true;
  coord.start('repair');
  const v = coord.jobView();
  const a7 = v.queue.find((g) => g.arm === 'A7' && g.kind === 'repair');
  assert.match(a7.eligible.mac, /no live ARC tunnel for A7/);
  assert.match(a7.eligible.bot, /auto mode/);
  assert.equal(v.queue.find((g) => g.arm === 'A1' && g.kind === 'repair').eligible.mac, null);
  assert.equal(a7.ids.length, a7.jobs.length);
  const { coord: c2 } = boot();
  assert.match(c2.jobView().idle.find((x) => x.arm === 'A1').reason, /not queued yet/);
  assert.match(c2.jobView().idle.find((x) => x.arm === 'A7').reason, /not dispatched/);
});

test('leases carry a generation: a late heartbeat, result or release from the old owner is refused', () => {
  const { coord, ctx } = boot();
  coord.start('repair');
  const [first] = coord.claim({ worker_id: 'old', max: 1, slots: 1 });
  assert.equal(first.lease, 1);
  coord.heartbeat(first.id, { worker_id: 'old', lease: 1 });
  assert.throws(() => coord.heartbeat(first.id, { worker_id: 'someone-else', lease: 1 }), /stale lease/);
  // the lease expires, a different worker takes the job
  ctx.coord.jobs.get(first.id).lease_exp = 0;
  coord.reap();
  const again = coord.claim({ worker_id: 'new', max: 50, slots: 50 }).find((j) => j.id === first.id);
  assert.equal(again.lease, 2);
  assert.throws(() => coord.heartbeat(first.id, { worker_id: 'old', lease: 1 }), /stale lease/);
  assert.throws(() => coord.release(first.id, 'late', true, { worker_id: 'old', lease: 1 }), /stale lease/);
  assert.throws(() => coord.result({ job_id: first.id, worker_id: 'old', lease: 1, status: 'ok', files: {}, usage: {} }), /stale lease/);
  assert.equal(coord.jobs.get(first.id).state, 'running');
  assert.equal(coord.jobs.get(first.id).worker, 'new');
});

test('stop job: only that job, confirmed by the worker, not requeued, late results cannot revive it', () => {
  const { coord } = boot();
  coord.start('repair');
  const jobs = coord.claim({ worker_id: 'w', max: 3, slots: 3 });
  const [a, b] = jobs;
  assert.throws(() => coord.stopJob('repair:A4:naive:UNI-02'), /not running/);
  assert.deepEqual(coord.stopJob(a.id), { ok: true, pending: true });
  assert.equal(coord.jobView().jobs.find((j) => j.id === a.id).stopping, true);
  assert.equal(coord.heartbeat(a.id, { worker_id: 'w', lease: a.lease }).stop, true);
  assert.equal(coord.heartbeat(b.id, { worker_id: 'w', lease: b.lease }).stop, undefined, 'the other job is untouched');
  assert.equal(coord.jobs.get(a.id).state, 'running', 'still running until the worker confirms');
  assert.deepEqual(coord.release(a.id, 'x', false, { worker_id: 'w', lease: a.lease, stopped: true }), { ok: true, canceled: true });
  const ja = coord.jobs.get(a.id);
  assert.equal(ja.state, 'failed'); assert.equal(ja.canceled, true); assert.match(ja.error, /stopped by operator/);
  assert.equal(coord.jobs.get(b.id).state, 'running');
  assert.equal(coord.result({ job_id: a.id, worker_id: 'w', lease: a.lease, status: 'ok', files: {}, usage: {} }).ignored, true);
  assert.equal(coord.jobs.get(a.id).state, 'failed');
  assert.equal(coord.retryFailed(), 1); // retry brings it back, cleanly
  assert.equal(coord.jobs.get(a.id).state, 'queued');
  assert.equal(coord.jobs.get(a.id).canceled, undefined);
});

test('stop job: if the worker never answers, the lease expiry cancels it instead of requeueing', () => {
  const { coord } = boot();
  coord.start('repair');
  const [a] = coord.claim({ worker_id: 'w', max: 1, slots: 1 });
  coord.stopJob(a.id);
  coord.jobs.get(a.id).lease_exp = 0;
  coord.reap();
  assert.equal(coord.jobs.get(a.id).state, 'failed');
  assert.equal(coord.jobs.get(a.id).canceled, true);
});

test('devices: one row per computer with its workers and launcher; legacy ids go to history', () => {
  const { coord, ctx } = boot();
  coord.start('repair');
  const w = (id, ip, extra = {}) => coord.claim({ worker_id: id, max: 0, slots: 2, info: { host: 'win', tailnet_ip: ip, tailnet_node: 'win.ts.net' }, ...extra });
  w('100.1.1.1', '100.1.1.1');
  w('100.1.1.1-a7', '100.1.1.1', { arcs: ARC, arms: ['A7'] });
  coord.claim({ worker_id: 'old-laptop-arc', max: 1, slots: 1 }); // takes a job, then is never seen again
  const launchers = [{ ip: '100.1.1.1', node: 'win.ts.net', online: true, targets: ['hosted', 'A7'], task: null },
    { ip: '100.9.9.9', node: 'mac.ts.net', online: true, targets: ['hosted'], task: null }];
  const { devices, history_machines } = coord.devices(launchers);
  const win = devices.find((d) => d.key === '100.1.1.1');
  assert.deepEqual(win.workers.map((x) => x.id).sort(), ['100.1.1.1', '100.1.1.1-a7']);
  assert.equal(win.launcher.online, true);
  const mac = devices.find((d) => d.key === '100.9.9.9');
  assert.equal(mac.workers.length, 0, 'a launcher alone is not a worker');
  assert.equal(mac.launcher.online, true);
  assert.equal(mac.workers_online, 0);
  assert.ok(!history_machines.includes('100.1.1.1'));
  // a worker that is gone but whose launcher stays up: the device stays online through the launcher, worker offline
  ctx.now = () => Date.now() + 120000;
  const later = coord.devices(launchers).devices.find((d) => d.key === '100.1.1.1');
  assert.equal(later.workers.every((x) => !x.online), true);
  assert.equal(later.launcher.online, true);
});

test('machine view and worker list share one freshness rule', () => {
  const { coord, ctx } = boot();
  coord.claim({ worker_id: 'w', max: 0, slots: 1 });
  const t0 = Date.now();
  ctx.now = () => t0 + 50000; // 50 s: past the 45 s rule, before the old 60 s one
  assert.equal(coord.workers()[0].online, false);
  assert.equal(coord.machineView().machines.find((m) => m.id === 'w').online, false);
});

test('deploy & claim A1 is validated against the queue and target; cancel touches no container or job', () => {
  const { coord, ctx, state } = boot();
  const L = ctx.launches;
  L.poll({ ip: '100.9.9.9', node: 'mac', user: 'u', arcs: [] });
  assert.throws(() => L.deploy('100.9.9.9', 'hosted', { arm: 'A1' }), /no queued A1 job/);
  coord.start('repair');
  assert.throws(() => L.deploy('100.9.9.9', 'hosted', { arm: 'A9' }), /unknown arm/);
  assert.throws(() => L.deploy('100.9.9.9', 'hosted', { arm: 'A7' }), /needs the A7 worker/);
  L.deploy('100.9.9.9', 'hosted', { arm: 'A1' });
  assert.deepEqual(L.snapshot()[0].task.intent, { arm: 'A1' });
  assert.throws(() => L.deploy('100.9.9.9', 'hosted', { arm: 'A2' }), /already pending/);
  // the worker comes up on that machine; the claim sent for it is for A1 only
  L.poll({ ip: '100.9.9.9', node: 'mac', arcs: [] }); // -> deploying
  L.poll({ ip: '100.9.9.9', node: 'mac', arcs: [], result: { id: L.snapshot()[0].task.id, ok: true } }); // -> starting
  coord.claim({ worker_id: '100.9.9.9', max: 0, slots: 4, info: { manual: true, tailnet_ip: '100.9.9.9' } });
  L.poll({ ip: '100.9.9.9', node: 'mac', arcs: [] });
  assert.equal(L.snapshot()[0].task.status, 'ready');
  assert.deepEqual(coord.workers().find((w) => w.id === '100.9.9.9').requested, 2);
  const got = coord.claim({ worker_id: '100.9.9.9', max: 10, slots: 4, info: { manual: true } });
  assert.ok(got.every((j) => j.arm === 'A1'));
  // cancel after ready: pending request dropped, running jobs untouched
  L.cancel('100.9.9.9');
  assert.equal(L.snapshot()[0].task.status, 'canceled');
  assert.ok([...coord.jobs.values()].filter((j) => j.state === 'running').length === got.length);
  assert.throws(() => L.cancel('100.9.9.9'), /nothing pending/);
  assert.equal(typeof state.run.phase, 'string');
});

test('cancel while start.sh is running waits for it, then never asks the worker for jobs', () => {
  const { coord, ctx } = boot();
  const L = ctx.launches;
  coord.start('repair');
  L.poll({ ip: '100.9.9.9', node: 'mac', arcs: [] });
  L.deploy('100.9.9.9', 'hosted', { arm: 'A1' });
  L.poll({ ip: '100.9.9.9', node: 'mac', arcs: [] }); // deploying
  L.cancel('100.9.9.9');
  assert.equal(L.snapshot()[0].task.status, 'canceling');
  coord.claim({ worker_id: '100.9.9.9', max: 0, slots: 4, info: { manual: true, tailnet_ip: '100.9.9.9' } });
  L.poll({ ip: '100.9.9.9', node: 'mac', arcs: [], result: { id: L.snapshot()[0].task.id, ok: true } });
  assert.equal(L.snapshot()[0].task.status, 'canceled');
  assert.equal(coord.workers().find((w) => w.id === '100.9.9.9').requested, 0);
  L.deploy('100.9.9.9', 'hosted'); // a fresh deploy is allowed afterwards
});

// --- worker.js: a stop aborts that one job and is acknowledged; leases ride on every call
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
const waitFor = async (cond) => { for (let i = 0; i < 200 && !cond(); i++) await new Promise((r) => setTimeout(r, 25)); assert.ok(cond(), 'timed out'); };

test('worker: a stop on the heartbeat aborts only that job and acknowledges it; the other job finishes', async () => {
  const jobs = [{ id: 'repair:A1:naive:S1', kind: 'repair', lease: 4 }, { id: 'repair:A1:naive:S2', kind: 'repair', lease: 7 }];
  let served = false;
  const web = await fakeWeb({
    '/api/worker/claim': () => { const out = served ? [] : jobs; served = true; return { body: { jobs: out } }; },
    '/api/worker/heartbeat': (b) => ({ body: b.job_id === jobs[0].id ? { ok: true, stop: true } : { ok: true } }),
  });
  const aborted = [];
  const w = createWorker({ webUrl: web.url, token: 'T', slots: 2, id: 'w1', pollMs: 20, heartbeatMs: 30, retryMs: 5, log: () => {},
    runners: { repair: (job, { signal }) => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => { aborted.push(job.id); reject(new Error('aborted')); });
      if (job.id === jobs[1].id) setTimeout(() => resolve({ status: 'ok', files: {}, usage: {}, calls: 1 }), 400);
    }) } });
  w.start();
  await waitFor(() => web.calls.some((c) => c.path === '/api/worker/result') && web.calls.some((c) => c.path === '/api/worker/release'));
  await w.stop(); web.server.close();
  assert.deepEqual(aborted, [jobs[0].id]);
  const rel = web.calls.find((c) => c.path === '/api/worker/release');
  assert.deepEqual([rel.body.job_id, rel.body.stopped, rel.body.retryable, rel.body.lease, rel.body.worker_id], [jobs[0].id, true, false, 4, 'w1']);
  const res = web.calls.find((c) => c.path === '/api/worker/result');
  assert.deepEqual([res.body.job_id, res.body.lease, res.body.worker_id], [jobs[1].id, 7, 'w1']);
});

// --- a variable number of computers: names are kept, stored, and listed
test('any number of computers is listed by the name it reported, and the list survives a console restart', () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'reg-'));
  const mk = () => createApp({ dataDir, env: { MOCK_PROVIDERS: '1', WORKER_TOKEN: 'wt' } });
  let app = mk();
  const names = Array.from({ length: 40 }, (_, i) => `Lab-PC-${String(i).padStart(2, '0')}`);
  names.forEach((n, i) => app.ctx.coord.claim({ worker_id: `100.64.1.${i + 1}`, max: 0, slots: 2, info: { host: n, os: 'Windows x64', tailnet_ip: `100.64.1.${i + 1}`, tailnet_node: `${n.toLowerCase()}.ts.net` } }));
  const first = app.ctx.coord.devices([]);
  assert.equal(first.devices.length, 40);
  assert.deepEqual(first.devices.map((d) => d.label), [...names].sort());
  assert.deepEqual(first.computers, { total: 40, online: 40 });
  // more than 36 computers: the legend keeps 36 and says how many it left out; none vanish from the list
  assert.equal(app.ctx.coord.machineView(null).machines.length, 36);
  assert.equal(app.ctx.coord.machineView(null).machines_omitted, 4);
  app.ctx.state.flush();
  // restart: nobody is connected, but every computer is still listed (offline) under its own name
  app = mk();
  const after = app.ctx.coord.devices([]);
  assert.deepEqual(after.devices.map((d) => d.label), [...names].sort());
  assert.equal(after.devices[0].tailnet.node, 'lab-pc-00.ts.net');
  assert.equal(after.devices[0].os, 'Windows x64');
  assert.equal(app.ctx.coord.workers().length, 40);
});

test('launcher-only computers are remembered too, with the name from MACHINE_NAME', () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'reg-'));
  const mk = () => createApp({ dataDir, env: { MOCK_PROVIDERS: '1', WORKER_TOKEN: 'wt', DASHBOARD_LAUNCH_TOKEN: 'lt' } });
  let app = mk();
  app.ctx.launches.poll({ ip: '100.64.2.9', node: 'mac-9.ts.net', user: 'sam', name: "Sam's  MacBook\nAir", arcs: [] });
  assert.equal(app.ctx.launches.snapshot()[0].name, "Sam's MacBook Air", 'control characters and runs of spaces are cleaned');
  app.ctx.state.flush();
  app = mk();
  app.ctx.now = () => Date.now() + 60000; // a minute later, nobody has checked in
  const [h] = app.ctx.launches.snapshot();
  assert.equal(h.name, "Sam's MacBook Air");
  assert.equal(h.online, false);
  const d = app.ctx.coord.devices(app.ctx.launches.snapshot()).devices[0];
  assert.equal(d.label, "Sam's MacBook Air");
  assert.equal(d.launcher.online, false);
});

test('two computers claiming one worker id are flagged instead of silently merged', () => {
  const { coord } = boot();
  const info = (ip) => ({ host: 'my-laptop', tailnet_ip: ip, manual: true });
  coord.claim({ worker_id: 'my-laptop', max: 0, slots: 1, info: info('100.64.3.1') });
  coord.claim({ worker_id: 'my-laptop', max: 0, slots: 1, info: info('100.64.3.2') });
  assert.equal(coord.workers()[0].conflict, true);
  assert.equal(coord.devices([]).devices.some((d) => d.conflict), true);
});

test('machine names are sanitised before they are stored or shown', () => {
  const { coord } = boot();
  coord.claim({ worker_id: 'w', max: 0, slots: 1, info: { host: '  <b>Pat</b>\u0007\n  PC  ', os: 'x'.repeat(200) } });
  const [w] = coord.workers();
  assert.equal(w.info.host, '<b>Pat</b> PC'); // HTML is escaped by the page, not stripped, so the name stays faithful
  assert.equal(w.info.os.length, 64);
});

// --- Tailscale status in the Computers panel: only real `tailscale status --json` data, matched by IP
const STATUS = {
  BackendState: 'Running',
  Self: { HostName: 'host-win', DNSName: 'host-win.tail1234.ts.net.', TailscaleIPs: ['100.64.0.2', 'fd7a::2'], OS: 'windows', UserID: 7 },
  User: { 7: { LoginName: 'sam@example.org' } },
  Peer: {
    k1: { HostName: 'samhiths-macbook-air', DNSName: 'samhiths-macbook-air.tail1234.ts.net.', TailscaleIPs: ['100.64.0.9'], OS: 'macOS', Online: true, LastSeen: '2026-11-20T12:00:00Z', UserID: 7 },
    k2: { HostName: 'old-phone', DNSName: 'old-phone.tail1234.ts.net.', TailscaleIPs: ['100.64.0.30'], OS: 'iOS', Online: false, LastSeen: '2026-11-18T08:00:00Z', UserID: 7 },
    k3: { HostName: 'no-ip', TailscaleIPs: [], Online: true },
  },
};

test('fromStatus reads real tailscale JSON: peers with IPs only, MagicDNS name, account, online flag', () => {
  const t = require('../lib/tailnet').fromStatus(STATUS);
  assert.equal(t.peers.length, 2, 'a peer without an address is dropped');
  const mac = t.peers.find((p) => p.ip === '100.64.0.9');
  assert.deepEqual([mac.name, mac.os, mac.online, mac.user], ['samhiths-macbook-air.tail1234.ts.net', 'macOS', true, 'sam@example.org']);
  assert.equal(mac.last_seen, Date.parse('2026-11-20T12:00:00Z'));
  assert.equal(t.self.ip, '100.64.0.2');
  assert.equal(t.self.online, true);
});

test('devices carry Tailscale online/offline/stale/no-report, and unmatched peers are listed separately', () => {
  const { coord, ctx } = boot({ DASHBOARD_LAUNCH_TOKEN: 'lt' });
  coord.claim({ worker_id: '100.64.0.2', max: 0, slots: 1, info: { host: 'Host B', tailnet_ip: '100.64.0.2' } });
  coord.claim({ worker_id: 'lan-box', max: 0, slots: 1, info: { host: 'LAN box' } });
  const L = ctx.launches;
  // before any report: unknown, said plainly
  let d = coord.devices([], ctx.tailnet.snapshot());
  assert.equal(d.devices.find((x) => x.key === '100.64.0.2').tailscale.state, 'unknown');
  assert.equal(d.tailnet_status.available, false);
  // a launcher poll carries the report
  L.poll({ ip: '100.64.0.9', node: 'mac', name: 'Sam MacBook Air', arcs: [], tailnet: require('../lib/tailnet').fromStatus(STATUS) });
  d = coord.devices(L.snapshot(), ctx.tailnet.snapshot());
  const by = (k) => d.devices.find((x) => x.key === k);
  assert.equal(by('100.64.0.2').tailscale.state, 'online');
  assert.equal(by('100.64.0.9').tailscale.state, 'online', 'the Mac: launcher up and Tailscale up');
  assert.equal(by('LAN box').tailscale.state, 'not-listed', 'a worker not in the tailnet report is not claimed to be on it');
  assert.deepEqual(d.tailnet_only.map((p) => [p.name, p.online]), [['old-phone.tail1234.ts.net', false]]);
  assert.deepEqual([d.tailnet_status.available, d.tailnet_status.fresh, d.tailnet_status.peers], [true, true, 3]);
  // the report ages out: every state becomes stale instead of staying "online"
  ctx.now = () => Date.now() + 120000;
  d = coord.devices(L.snapshot(), ctx.tailnet.snapshot());
  assert.equal(d.devices.find((x) => x.key === '100.64.0.2').tailscale.state, 'stale');
  assert.equal(d.tailnet_status.fresh, false);
});

test('a peer that is offline on Tailscale is shown offline, and a malformed report is ignored', () => {
  const { ctx, coord } = boot({ DASHBOARD_LAUNCH_TOKEN: 'lt' });
  const st = JSON.parse(JSON.stringify(STATUS));
  st.Peer.k1.Online = false;
  coord.claim({ worker_id: '100.64.0.9', max: 0, slots: 1, info: { host: 'Mac', tailnet_ip: '100.64.0.9' } });
  ctx.launches.poll({ ip: '100.64.0.2', node: 'win', arcs: [], tailnet: require('../lib/tailnet').fromStatus(st) });
  const mac = () => coord.devices(ctx.launches.snapshot(), ctx.tailnet.snapshot()).devices.find((x) => x.key === '100.64.0.9');
  assert.equal(mac().tailscale.state, 'offline');
  ctx.launches.poll({ ip: '100.64.0.2', node: 'win', arcs: [], tailnet: { peers: 'nope' } });
  ctx.launches.poll({ ip: '100.64.0.2', node: 'win', arcs: [], tailnet: { peers: [{ ip: 'not-an-ip', online: true }, { ip: '100.64.0.9', online: true, name: '<x>' }] } });
  assert.equal(mac().tailscale.state, 'online', 'valid entries kept, invalid ones dropped');
});
