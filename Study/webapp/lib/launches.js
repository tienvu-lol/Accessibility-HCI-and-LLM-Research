// Host launchers poll separately from workers. The console sends a configured arm ID, never a shell command.
const { timingSafeEqual } = require('node:crypto');
const { isIP } = require('node:net');
const { HttpError } = require('./http');

function create(ctx, token) {
  const hosts = new Map();
  const MAX_HOSTS = 256;
  const registry = ctx.state.registry.launchers;
  // launchers seen before this process started come back offline, with the name and targets they reported
  for (const [ip, r] of Object.entries(registry)) if (r && typeof r === 'object') hosts.set(ip, { ip, node: r.node, user: r.user, name: r.name, targets: r.targets || [], seen: r.seen });
  const online = (h) => ctx.now() - h.seen < 20000;
  const clean = (value) => typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 128) : '';
  const valid = (secret) => {
    if (!token || typeof secret !== 'string') return false;
    const a = Buffer.from(secret), b = Buffer.from(`Bearer ${token}`);
    return a.length === b.length && timingSafeEqual(a, b);
  };
  function claim(h) {
    const task = h.task;
    if (task?.status !== 'starting') return;
    const w = ctx.coord.workers().find((w) => w.id === task.worker && w.online);
    if (!w || (task.target !== 'hosted' && !w.arcs.includes(task.target))) return;
    if (w.manual && !w.paused && !w.requested) {
      try { ctx.coord.requestWork(w.id, task.intent); } catch (e) {
        task.note = e.message;
        if (w.running) { task.status = 'ready'; return; }
        task.status = 'needs-claim'; return;
      }
    }
    task.status = w.paused ? 'needs-claim' : 'ready';
  }
  function poll({ ip, node, user, name, arcs, result, tailnet }) {
    if (typeof ip !== 'string' || !isIP(ip)) throw new HttpError(400, 'launcher needs a Tailscale IP');
    const seen = ctx.now();
    if (tailnet) ctx.tailnet.ingest(`launcher ${ip}`, tailnet); // a malformed report is ignored; the previous one just ages
    if (!hosts.has(ip) && hosts.size >= MAX_HOSTS) {
      for (const [id, h] of hosts) if (!online(h)) { hosts.delete(id); delete registry[id]; }
      if (hosts.size >= MAX_HOSTS) throw new HttpError(409, 'launcher capacity reached');
    }
    const h = hosts.get(ip) || {};
    const targets = ['hosted', ...(Array.isArray(arcs) ? [...new Set(arcs)].filter((id) => Object.hasOwn(ctx.state.arms, id) && ctx.armKind(id) === 'open_source') : [])];
    Object.assign(h, { ip, node: clean(node), user: clean(user), name: clean(name), seen, targets });
    hosts.set(ip, h);
    const r = registry[ip];
    if (!r || r.node !== h.node || r.user !== h.user || r.name !== h.name || JSON.stringify(r.targets) !== JSON.stringify(targets) || seen - r.seen > 60000) {
      registry[ip] = { ip, node: h.node, user: h.user, name: h.name, targets, seen };
      ctx.state.save();
    }
    expire(h);
    const t = h.task;
    if (t?.status === 'deploying' && result?.id === t.id && typeof result.ok === 'boolean') t.status = result.ok ? 'starting' : 'failed';
    if (t?.status === 'canceling' && result?.id === t.id) t.status = 'canceled';
    if (t?.status === 'queued') { t.status = 'deploying'; return { deploy: { id: t.id, target: t.target } }; }
    claim(h);
    return {};
  }
  let sequence = 0;
  // intent = { arm } or { job_id }: what the worker should claim once it is up. Checked here and again by
  // requestWork when the worker checks in, because the queue can change in between.
  function deploy(ip, target, intent) {
    const h = hosts.get(ip);
    if (!h || !online(h)) throw new HttpError(409, 'Docker launcher is offline');
    if (!h.targets.includes(target)) throw new HttpError(400, 'this computer does not have that worker target configured');
    const sel = intent && (intent.job_id || intent.arm) ? (intent.job_id ? { job_id: String(intent.job_id) } : { arm: String(intent.arm), ...(intent.kind ? { kind: String(intent.kind) } : {}) }) : undefined;
    if (sel) {
      const job = sel.job_id ? ctx.coord.jobs.get(sel.job_id) : null;
      if (sel.job_id && !job) throw new HttpError(404, 'unknown job');
      const arm = job ? job.arm : sel.arm;
      if (!Object.hasOwn(ctx.state.arms, arm)) throw new HttpError(400, `unknown arm ${arm}`);
      const want = ctx.armKind(arm) === 'open_source' && (!job || job.kind === 'repair') ? arm : 'hosted';
      if (want !== target) throw new HttpError(400, `${job ? job.id : arm} needs the ${want === 'hosted' ? 'hosted' : want} worker, not ${target}`);
      const open = [...ctx.coord.jobs.values()].filter((j) => (job ? j === job : j.arm === arm && (!sel.kind || j.kind === sel.kind)) && j.state === 'queued');
      if (!open.length) throw new HttpError(409, `no queued ${job ? job.id : arm} job in the selected scope; queue a phase first`);
    }
    expire(h);
    if (h.task && ['queued', 'deploying', 'starting', 'canceling'].includes(h.task.status)) throw new HttpError(409, 'a deployment is already pending for this computer');
    const worker = ip + (target === 'hosted' ? '' : `-${target.toLowerCase()}`);
    if (ctx.coord.workers().some((w) => w.id === worker && w.running)) throw new HttpError(409, 'worker already has running jobs; use its claim controls instead');
    h.task = { id: ++sequence, target, status: 'queued', at: ctx.now(), worker, ...(sel ? { intent: sel } : {}) };
  }
  // Cancels a pending deployment only: it never removes a container or touches a running job.
  function cancel(ip) {
    const h = hosts.get(ip);
    const t = h && h.task;
    if (!t || !['queued', 'deploying', 'starting', 'ready', 'needs-claim'].includes(t.status)) throw new HttpError(409, 'nothing pending to cancel on this computer');
    if (t.status === 'deploying') t.status = 'canceling'; // start.sh is already running; the worker simply will not be asked for jobs
    else t.status = 'canceled';
    try { ctx.coord.unclaimWork(t.worker); } catch { /* worker has not connected yet */ }
  }
  function expire(h) {
    const t = h.task;
    if (t && ['queued', 'deploying', 'starting', 'canceling'].includes(t.status) && ctx.now() - t.at > 240000) t.status = 'timed-out';
  }
  function snapshot() {
    return [...hosts.values()].map((h) => {
      expire(h);
      return { ip: h.ip, node: h.node, user: h.user, name: h.name, seen: h.seen, targets: h.targets, online: online(h), task: h.task };
    });
  }
  return { valid, poll, deploy, cancel, snapshot };
}

module.exports = { create };
