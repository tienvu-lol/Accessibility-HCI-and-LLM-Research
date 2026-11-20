// Host launchers poll separately from workers. The console sends a configured arm ID, never a shell command.
const { timingSafeEqual } = require('node:crypto');
const { isIP } = require('node:net');
const { HttpError } = require('./http');

function create(ctx, token) {
  const hosts = new Map();
  const online = (h) => ctx.now() - h.seen < 20000;
  const clean = (value) => typeof value === 'string' ? value.slice(0, 128) : '';
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
      try { ctx.coord.requestWork(w.id); } catch (e) {
        if (w.running) { task.status = 'ready'; return; }
        task.status = 'needs-claim'; return;
      }
    }
    task.status = w.paused ? 'needs-claim' : 'ready';
  }
  function poll({ ip, node, user, arcs, result }) {
    if (typeof ip !== 'string' || !isIP(ip)) throw new HttpError(400, 'launcher needs a Tailscale IP');
    const seen = ctx.now();
    if (!hosts.has(ip) && hosts.size >= 32) {
      for (const [id, h] of hosts) if (!online(h)) hosts.delete(id);
      if (hosts.size >= 32) throw new HttpError(409, 'launcher capacity reached');
    }
    const h = hosts.get(ip) || {};
    const targets = ['hosted', ...(Array.isArray(arcs) ? [...new Set(arcs)].filter((id) => Object.hasOwn(ctx.state.arms, id) && ctx.armKind(id) === 'open_source') : [])];
    Object.assign(h, { ip, node: clean(node), user: clean(user), seen, targets });
    hosts.set(ip, h);
    expire(h);
    const t = h.task;
    if (t?.status === 'deploying' && result?.id === t.id && typeof result.ok === 'boolean') t.status = result.ok ? 'starting' : 'failed';
    if (t?.status === 'queued') { t.status = 'deploying'; return { deploy: { id: t.id, target: t.target } }; }
    claim(h);
    return {};
  }
  let sequence = 0;
  function deploy(ip, target) {
    const h = hosts.get(ip);
    if (!h || !online(h)) throw new HttpError(409, 'Docker launcher is offline');
    if (!h.targets.includes(target)) throw new HttpError(400, 'this computer does not have that worker target configured');
    expire(h);
    if (h.task && ['queued', 'deploying', 'starting'].includes(h.task.status)) throw new HttpError(409, 'a deployment is already pending for this computer');
    const worker = ip + (target === 'hosted' ? '' : `-${target.toLowerCase()}`);
    if (ctx.coord.workers().some((w) => w.id === worker && w.running)) throw new HttpError(409, 'worker already has running jobs; use its claim controls instead');
    h.task = { id: ++sequence, target, status: 'queued', at: ctx.now(), worker };
  }
  function expire(h) {
    const t = h.task;
    if (t && ['queued', 'deploying', 'starting'].includes(t.status) && ctx.now() - t.at > 240000) t.status = 'timed-out';
  }
  function snapshot() {
    return [...hosts.values()].map((h) => {
      expire(h);
      return { ip: h.ip, node: h.node, user: h.user, targets: h.targets, online: online(h), task: h.task };
    });
  }
  return { valid, poll, deploy, snapshot };
}

module.exports = { create };
