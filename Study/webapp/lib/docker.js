'use strict';
// Spin worker containers up/down from the dashboard through the `docker` CLI (needs the host docker socket).
// Off unless DOCKER_WORKERS=1. Every container carries the label study-worker=1; we never touch any other container.
const { execFile } = require('node:child_process');
const crypto = require('node:crypto');
const LABEL = 'study-worker=1';
const NAME_RE = /^study-worker-[a-z0-9]+-\d+$/;

function defaultRun(args, env) {
  return new Promise((resolve, reject) => {
    execFile('docker', args, { env, timeout: 120000, maxBuffer: 4 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) reject(new Error(String(stderr || err.message).trim().slice(0, 400)));
      else resolve(stdout);
    });
  });
}

function create({ env = process.env, run = defaultRun, port = 8080 } = {}) {
  const enabled = env.DOCKER_WORKERS === '1';
  const image = env.WORKER_IMAGE || 'study-worker';
  const max = Number(env.DOCKER_MAX_WORKERS) || 8;
  const webUrl = env.WORKER_WEB_URL || `http://host.docker.internal:${port}`;
  let snap = { enabled, available: false, image, max, containers: [], error: enabled ? 'not checked yet' : null };
  let timer = null;

  async function refresh() {
    if (!enabled) return snap;
    try {
      const out = await run(['ps', '-a', '--filter', `label=${LABEL}`, '--format', '{{json .}}']);
      const containers = out.split('\n').filter(Boolean).map((l) => JSON.parse(l))
        .map((c) => ({ name: c.Names, state: c.State, status: c.Status, created: c.CreatedAt }));
      snap = { ...snap, available: true, containers, error: null };
    } catch (e) {
      snap = { ...snap, available: false, containers: [], error: e.message };
    }
    return snap;
  }

  // Token goes through the child's environment (-e NAME with no value), never argv.
  async function start(count, slots) {
    if (!enabled) throw new Error('docker workers are disabled (set DOCKER_WORKERS=1)');
    if (!Number.isInteger(count) || count < 1) throw new Error('count must be a positive integer');
    if (!Number.isInteger(slots) || slots < 1 || slots > 16) throw new Error('slots must be 1-16');
    await refresh();
    if (!snap.available) throw new Error(`docker unavailable: ${snap.error}`);
    const live = snap.containers.filter((c) => c.state === 'running').length;
    if (live + count > max) throw new Error(`limit is ${max} running workers (${live} running)`);
    const batch = crypto.randomBytes(3).toString('hex');
    const names = [], errors = [];
    for (let i = 1; i <= count; i++) {
      const name = `study-worker-${batch}-${i}`;
      const args = ['run', '-d', '--init', '--shm-size=1g', '--name', name, '--label', LABEL,
        '--add-host', 'host.docker.internal:host-gateway',
        '-e', 'WORKER_TOKEN', '-e', `WEB_URL=${webUrl}`, '-e', `WORKER_SLOTS=${slots}`, '-e', `WORKER_ID=${name}`, '-e', `MACHINE_NAME=${env.MACHINE_NAME || 'dashboard'}`];
      if (env.DOCKER_NETWORK) args.push('--network', env.DOCKER_NETWORK);
      args.push(image);
      try { await run(args, { ...process.env, WORKER_TOKEN: env.WORKER_TOKEN }); names.push(name); } catch (e) { errors.push(e.message); }
    }
    await refresh();
    return { started: names, errors };
  }

  async function stop(name) { // name = one container, or null = every labelled one
    if (!enabled) throw new Error('docker workers are disabled (set DOCKER_WORKERS=1)');
    if (name !== null && !NAME_RE.test(name)) throw new Error('bad container name');
    await refresh();
    const targets = snap.containers.map((c) => c.name).filter((n) => name === null || n === name);
    if (name !== null && !targets.length) throw new Error('no such worker container');
    if (targets.length) await run(['rm', '-f', ...targets]);
    await refresh();
    return { removed: targets };
  }

  return {
    enabled, snapshot: () => snap, refresh, start, stop,
    watch(onChange, ms = 5000) {
      if (!enabled || timer) return;
      const tick = () => refresh().then(onChange);
      tick();
      timer = setInterval(tick, ms);
      timer.unref();
    },
    unwatch() { clearInterval(timer); timer = null; },
  };
}
module.exports = { create, NAME_RE };
