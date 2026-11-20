// Browser test of per-job dispatch, presence, and stop. Self-contained: starts its own console on a temp
// data dir with mock providers (no paid calls, no production credentials) and plays two machines over HTTP.
//   node webapp/e2e-dispatch.js        (run from Study/; needs Playwright chromium)
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { createApp } = require('./server');

const PASSWORD = 'e2e-pass', WTOKEN = 'e2e-worker', LTOKEN = 'e2e-launch';
const step = (m) => console.log('ok -', m);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const IP_B = '100.64.0.2', IP_C = '100.64.0.3';

(async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-dispatch-'));
  const app = createApp({ dataDir, env: { MOCK_PROVIDERS: '1', APP_PASSWORD: PASSWORD, WORKER_TOKEN: WTOKEN, DASHBOARD_LAUNCH_TOKEN: LTOKEN } });
  const { state, coord } = app.ctx;
  for (const a of ['A1', 'A2', 'A3', 'A4']) state.arms[a] = { provider: 'openai', model_id: 'm' };
  state.settings.sites = ['UNI-01', 'UNI-02'];
  state.settings.conditions = ['naive'];
  state.settings.dispatch_open = true;
  const port = await app.listen(0);
  const base = `http://127.0.0.1:${port}`;
  const post = async (p, body, token) => {
    const r = await fetch(base + p, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
    return { status: r.status, body: await r.json().catch(() => ({})) };
  };
  // two simulated machines
  const agent = (id, extra = {}) => post('/api/worker/claim', { worker_id: id, max: 0, slots: 4, info: { host: id, os: 'test', tailnet_ip: id, manual: true }, ...extra }, WTOKEN);
  const takeJobs = (id, extra = {}) => post('/api/worker/claim', { worker_id: id, max: 10, slots: 4, info: { host: id, os: 'test', tailnet_ip: id, manual: true }, ...extra }, WTOKEN).then((r) => r.body.jobs || []);
  const launcher = (result, ip = IP_B) => post('/api/launcher/poll', { ip, node: `${ip}.ts.net`, user: 'tester', name: ip === IP_B ? 'Host B' : 'Host C', arcs: [], result }, LTOKEN);

  const browser = await chromium.launch();
  const errors = [];
  const open = async () => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('dialog', (d) => d.accept());
    await page.goto(`${base}/login.html`);
    await page.fill('input[type=password]', PASSWORD);
    await page.click('button[type=submit]');
    await page.waitForURL(`${base}/`);
    await page.goto(`${base}/#runs`);
    await page.waitForSelector('#r-queue-h');
    return { ctx, page };
  };
  const one = await open(), two = await open();
  const p1 = one.page, p2 = two.page;

  // 1. no workers at all: the queue is still there, with reasons for the arms that are empty
  assert.equal(await p1.locator('#r-workers :text("No workers connected")').count(), 1);
  assert.match(await p1.locator('#queue-idle').innerText(), /A1[\s\S]*not queued yet/);
  await p1.click('button:has-text("Queue repair jobs")');
  await p1.waitForSelector('summary:has-text("repair · A1")');
  assert.equal(await p2.locator('summary:has-text("repair · A1")').count() || (await p2.waitForSelector('summary:has-text("repair · A1")'), 1), 1);
  step('queue is visible with zero workers, in both browser sessions, and empty arms explain themselves');

  // 2. two machines: A has no tunnel, B has a launcher; B's worker is its own device
  await agent('host-a');
  await agent(IP_B);
  await launcher();
  await p1.waitForSelector('#r-computers tbody tr >> nth=1');
  const rows = await p1.locator('#r-computers tbody tr').allInnerTexts();
  assert.equal(rows.length, 2);
  const rowB = rows.find((r) => r.includes(IP_B));
  assert.match(rowB, /Launcher online/); assert.match(rowB, /Worker online/);
  assert.match(rows.find((r) => r.includes('host-a')), /No launcher/);
  step('one row per computer, launcher and worker shown separately');

  // any number of computers: five more connect under their own names and all are listed, by name
  for (let i = 1; i <= 5; i++) await post('/api/worker/claim', { worker_id: `100.64.9.${i}`, max: 0, slots: 2, info: { host: `Lab PC ${i}`, os: 'Windows x64', tailnet_ip: `100.64.9.${i}`, manual: true } }, WTOKEN);
  await p1.waitForSelector('#computers-summary:text("7 computers known, 7 online")');
  await p2.waitForSelector('#computers-summary:text("7 computers known, 7 online")');
  const labels = await p1.locator('#r-computers tbody th').allInnerTexts();
  for (let i = 1; i <= 5; i++) assert.ok(labels.some((l) => l.startsWith(`Lab PC ${i}`)), `Lab PC ${i} listed by name`);
  assert.equal(labels.length, 7);
  step('seven computers listed by the names they reported, in both sessions');

  // 3. claim A1 specifically on host B (worker already up)
  await p1.click('summary:has-text("repair · A1")');
  await p1.selectOption('[id="pick-repair:A1"]', `w|${IP_B}`);
  assert.equal((await p1.locator('[id="dispatch-repair:A1"]').innerText()).trim(), 'Claim A1');
  await p1.click('[id="dispatch-repair:A1"]');
  await p1.waitForSelector('#flash :text("Requested A1")');
  const got = await takeJobs(IP_B);
  assert.ok(got.length === 2 && got.every((j) => j.arm === 'A1'), got.map((j) => j.id).join());
  const bad = await takeJobs(IP_B);
  assert.equal(bad.length, 0, 'the claim is spent; A2..A4 were not touched');
  step('selecting A1 and host B starts only A1 on B');

  // second browser session sees it without a refresh
  await p2.waitForSelector('#r-live-jobs :text("repair · A1 · naive · UNI-01")');
  step('second session sees the running A1 jobs without refreshing');

  // 4. host A cannot claim ARC work it has no tunnel for; the UI shows why and the server refuses
  await p1.click('summary:has-text("repair · A7")');
  const a7opts = await p1.locator('[id="pick-repair:A7"] option').allInnerTexts();
  assert.ok(a7opts.some((o) => /host-a.*no live ARC tunnel for A7/.test(o)), a7opts.join(' | '));
  assert.equal(await p1.locator('[id="pick-repair:A7"] option:disabled').count() >= 2, true);
  const refused = await p1.request.post(`${base}/api/workers/host-a/claim`, { data: { arm: 'A7' } });
  assert.equal(refused.status(), 409);
  assert.match((await refused.json()).error, /no live ARC tunnel for A7/);
  step('host A cannot claim unavailable ARC work (UI and server agree)');

  // 5. last-second competing claims for the same job: exactly one wins
  const target = 'repair:A2:naive:UNI-01';
  const [ra, rb] = await Promise.all([
    p1.request.post(`${base}/api/workers/host-a/claim`, { data: { job_id: target } }),
    p2.request.post(`${base}/api/workers/${IP_B}/claim`, { data: { job_id: target } }),
  ]);
  assert.deepEqual([ra.status(), rb.status()].sort(), [200, 409]);
  const winner = ra.status() === 200 ? 'host-a' : IP_B, loser = winner === 'host-a' ? IP_B : 'host-a';
  assert.deepEqual(await takeJobs(loser), [], 'the loser gets nothing, not even a sweep');
  const won = await takeJobs(winner);
  assert.deepEqual(won.map((j) => j.id), [target]);
  step(`competing claims for one job: ${winner} won, ${loser} refused, no double run`);

  // 6. unassign a pending reservation without touching running work
  await p1.waitForSelector('#r-workers tbody tr');
  const free = 'repair:A3:naive:UNI-02';
  const r1 = await p1.request.post(`${base}/api/workers/${IP_B}/claim`, { data: { job_id: free } });
  assert.equal(r1.status(), 200);
  await p1.waitForSelector(`[id="claim-${IP_B}"]:text("Unclaim")`);
  await p1.click(`[id="claim-${IP_B}"]`);
  await p1.waitForSelector(`[id="claim-${IP_B}"]:text("Claim jobs")`);
  assert.equal(coord.jobs.get(free).state, 'queued');
  assert.equal(coord.jobs.get(free).reserved_by, undefined);
  assert.ok([...coord.jobs.values()].filter((j) => j.state === 'running').length >= 3, 'running jobs untouched');
  step('unclaim drops a pending reservation only');

  // 7. stop exactly one running job
  const running = [...coord.jobs.values()].filter((j) => j.state === 'running');
  const victim = running.find((j) => j.arm === 'A1' && j.site === 'UNI-01');
  const keep = running.find((j) => j.id !== victim.id);
  await p1.click(`button[data-action="stop-job"][data-id="${victim.id}"]`);
  await p1.waitForSelector(`button[data-id="${victim.id}"]:text("Stopping")`);
  await p2.waitForSelector(`button[data-id="${victim.id}"]:text("Stopping")`);
  assert.equal(coord.jobs.get(victim.id).state, 'running', 'not confirmed until the worker acknowledges');
  const hb = await post('/api/worker/heartbeat', { job_id: victim.id, worker_id: victim.worker, lease: victim.lease }, WTOKEN);
  assert.equal(hb.body.stop, true);
  const hbKeep = await post('/api/worker/heartbeat', { job_id: keep.id, worker_id: keep.worker, lease: keep.lease }, WTOKEN);
  assert.equal(hbKeep.body.stop, undefined);
  await post('/api/worker/release', { job_id: victim.id, worker_id: victim.worker, lease: victim.lease, reason: 'stopped', retryable: false, stopped: true }, WTOKEN);
  await p2.waitForSelector(`#r-live-jobs tr:has(button[data-id="${keep.id}"]) .badge-active`);
  await p2.waitForSelector(`#r-live-jobs tr:has-text("${victim.id.replace(/^repair:/, '').split(':').join(' · ')}") .badge:text("stopped")`);
  assert.equal(coord.jobs.get(keep.id).state, 'running');
  // a late result from the stopped job is ignored
  const late = await post('/api/worker/result', { job_id: victim.id, worker_id: victim.worker, lease: victim.lease, status: 'ok', files: {}, usage: {} }, WTOKEN);
  assert.equal(late.body.ignored, true);
  assert.equal(coord.jobs.get(victim.id).state, 'failed');
  step('stop job aborts one job, shown in both sessions only after the worker confirms; late result ignored');

  // 8. keyboard focus and an in-progress cap edit survive live updates
  const cap = p1.locator(`[id="cap-${IP_B}"]`);
  await cap.focus();
  await p1.keyboard.type('3');
  await agent('host-a'); // any check-in notifies every session
  await post('/api/worker/heartbeat', { job_id: keep.id, worker_id: keep.worker, lease: keep.lease }, WTOKEN);
  await sleep(600);
  assert.equal(await cap.inputValue(), '3');
  assert.equal(await p1.evaluate(() => document.activeElement && document.activeElement.id), `cap-${IP_B}`);
  const sel = p1.locator('[id="pick-repair:A1"]');
  step('a half-typed cap and its focus survive state updates');

  // 9. Deploy & claim through the launcher on a computer with no running work: validated, intent kept, cancelable.
  // (Host B's launcher is offered as disabled for A4 because its worker is busy: that is checked first.)
  await launcher();
  await p1.click('summary:has-text("repair · A4")');
  await p1.waitForSelector(`[id="pick-repair:A4"] option[value="l|${IP_B}|hosted"][disabled]`, { state: 'attached' });
  assert.match(await p1.locator(`[id="pick-repair:A4"] option[value="l|${IP_B}|hosted"]`).innerText(), /already running jobs/);
  await launcher(undefined, IP_C);
  await p1.waitForSelector(`[id="pick-repair:A4"] option[value="l|${IP_C}|hosted"]:not([disabled])`, { state: 'attached' });
  await p1.selectOption('[id="pick-repair:A4"]', `l|${IP_C}|hosted`);
  assert.equal((await p1.locator('[id="dispatch-repair:A4"]').innerText()).trim(), 'Deploy & claim A4');
  await p1.click('[id="dispatch-repair:A4"]');
  await p1.waitForSelector('#r-deploy :text("hosted (A4)")');
  const dep = await launcher(undefined, IP_C);
  assert.ok(dep.body.deploy, 'launcher is told to deploy');
  await p1.click(`#cancel-deploy-${IP_C.replace(/\./g, '\\.')}`);
  await p1.waitForSelector('#r-deploy :text("Canceling: start.sh is still running")'); // start.sh cannot be recalled mid-run
  await launcher({ id: dep.body.deploy.id, ok: true }, IP_C);
  await p1.waitForSelector('#r-deploy :text("Canceled; nothing was removed")');
  await p2.waitForSelector('#r-deploy :text("Canceled; nothing was removed")');
  assert.equal(coord.jobs.get('repair:A4:naive:UNI-01').state, 'queued', 'canceled deployment claimed nothing');
  // the launcher's own name labels its computer
  assert.ok((await p1.locator('#r-computers tbody th').allInnerTexts()).some((t) => t.startsWith('Host C')));
  step('deploy & claim carries its A4 intent; cancel claims nothing and removes nothing; busy hosts are disabled with a reason');

  assert.deepEqual(errors, [], 'no browser errors');
  await browser.close();
  await app.close();
  fs.rmSync(dataDir, { recursive: true, force: true });
  console.log('PASS: e2e-dispatch');
})().catch((e) => { console.error(e); process.exit(1); });
