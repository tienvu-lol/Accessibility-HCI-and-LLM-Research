'use strict';
// Pull worker: claim jobs from the web service, run them in scratch dirs, push results back.
// Infra failures (anything thrown by a runner) release the lease immediately; job-level failures are results.
const os = require('node:os');
const runjob = require('./lib/runjob');

const KINDS = { repair: runjob.runRepair, judge: runjob.runJudge, score: runjob.runScore };

function createWorker(opts = {}) {
  const webUrl = (opts.webUrl || process.env.WEB_URL || '').replace(/\/$/, '');
  const token = opts.token || process.env.WORKER_TOKEN;
  const slots = opts.slots || Number(process.env.WORKER_SLOTS) || 4;
  const id = (opts.id || process.env.WORKER_ID || os.hostname()) + (opts.id ? '' : process.env.WORKER_SUFFIX || '');
  const pollMs = opts.pollMs ?? (Number(process.env.POLL_MS) || 3000);
  const heartbeatMs = opts.heartbeatMs ?? 60000;
  const retryMs = opts.retryMs ?? 1000; // base of the exponential backoff
  const runners = opts.runners || KINDS;
  const info = opts.info || { host: process.env.MACHINE_NAME || os.hostname(), os: process.env.HOST_OS || `${os.platform()} ${os.arch()}` };
  // ARC tunnels this machine can reach: ARC_URLS="A5=http://arc-a5:8091/v1,A6=http://arc-a6:8090/v1". An arm is advertised only
  // while its tunnel answers and its key (A5_API_KEY ...) is set locally, so a dropped SSH session just stops new claims.
  const arcUrls = opts.arcUrls || Object.fromEntries((process.env.ARC_URLS || '').split(',').filter(Boolean).map((p) => p.split(/=(.+)/).slice(0, 2)));
  const onlyArms = opts.arms || (process.env.WORKER_ARMS ? process.env.WORKER_ARMS.split(',') : undefined);
  async function liveArcs() {
    const out = {};
    for (const [arm, url] of Object.entries(arcUrls)) {
      if (!process.env[`${arm}_API_KEY`]) continue;
      try { await fetch(`${url.replace(/\/$/, '')}/models`, { headers: { authorization: `Bearer ${process.env[`${arm}_API_KEY`]}` }, signal: AbortSignal.timeout(3000) }); out[arm] = url; } catch { /* tunnel down */ }
    }
    return out;
  }
  const log = opts.log || ((m) => console.log(`[worker ${id}] ${m}`));
  if (!webUrl || !token) throw new Error('WEB_URL and WORKER_TOKEN are required');

  const running = new Map(); // job id -> { ac, promise }
  const stopper = new AbortController();
  let loopDone = Promise.resolve();

  async function api(path, body) {
    const res = await fetch(webUrl + path, {
      method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify(body), signal: AbortSignal.timeout(30000),
    });
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* non-JSON error page */ }
    return { status: res.status, body: json };
  }

  const sleep = (ms) => new Promise((r) => {
    const t = setTimeout(r, ms);
    stopper.signal.addEventListener('abort', () => { clearTimeout(t); r(); }, { once: true });
  });

  // POST with retries on network error / 5xx; returns the last response or null.
  async function post(path, body, tries = 3) {
    for (let i = 0; i < tries; i++) {
      try {
        const r = await api(path, body);
        if (r.status < 500) return r;
      } catch { /* network: retry */ }
      if (i < tries - 1) await new Promise((r) => setTimeout(r, retryMs * 2 ** i));
    }
    return null;
  }

  const clean = (msg, job) => (job.api_key ? String(msg).split(job.api_key).join('***') : String(msg)).slice(0, 500);

  async function handle(job, ac) {
    let lost = false;
    const hb = setInterval(async () => {
      try {
        const r = await api('/api/worker/heartbeat', { job_id: job.id });
        if (r.status === 404 || r.status === 409) { lost = true; ac.abort(); }
      } catch { /* next beat retries */ }
    }, heartbeatMs);
    try {
      const run = runners[job.kind];
      if (!run) throw new Error(`unsupported job kind ${job.kind}`);
      const result = await run(job, { signal: ac.signal });
      clearInterval(hb);
      const r = await post('/api/worker/result', { job_id: job.id, ...result });
      if (!r || r.status >= 300) throw new Error(`result upload failed (${r ? r.status : 'network'})`);
      log(`${job.id} ${result.status}`);
    } catch (e) {
      clearInterval(hb);
      if (lost) { log(`${job.id} lease lost`); return; }
      const reason = clean(stopper.signal.aborted ? 'worker shutting down' : e.message, job);
      log(`${job.id} released: ${reason}`);
      await post('/api/worker/release', { job_id: job.id, reason, retryable: true });
    } finally {
      clearInterval(hb);
    }
  }

  async function loop() {
    let backoff = 0;
    while (!stopper.signal.aborted) {
      let jobs = [];
      const free = slots - running.size;
      {
        try { // free = 0 still polls (max 0) so an all-busy machine stays online
          const r = await api('/api/worker/claim', { worker_id: id, kinds: Object.keys(runners), max: free, slots, info, arcs: await liveArcs(), arms: onlyArms });
          if (r.status >= 500) throw new Error(`claim ${r.status}`);
          if (r.status >= 400) throw new Error(`claim rejected ${r.status}`);
          jobs = r.body?.jobs || [];
          backoff = 0;
        } catch (e) {
          backoff = Math.min(backoff ? backoff * 2 : Math.max(pollMs, retryMs), 60000);
          log(`claim failed (${e.message}); retry in ${backoff} ms`);
          await sleep(backoff);
          continue;
        }
      }
      for (const job of jobs) {
        const ac = new AbortController();
        const promise = handle(job, ac).finally(() => running.delete(job.id));
        running.set(job.id, { ac, promise });
      }
      if (!jobs.length || running.size >= slots) await sleep(pollMs * (1 + Math.random() * 0.25)); // jitter vs stampede
    }
  }

  return {
    running,
    start() { loopDone = loop(); return loopDone; },
    async stop() {
      stopper.abort();
      for (const { ac } of running.values()) ac.abort();
      await Promise.all([...running.values()].map((j) => j.promise));
      await loopDone;
    },
  };
}

module.exports = { createWorker };

if (require.main === module) {
  const w = createWorker();
  const quit = () => w.stop().then(() => process.exit(0));
  process.on('SIGTERM', quit);
  process.on('SIGINT', quit);
  w.start();
}
