// Tailscale status for the Computers panel. Only ever real `tailscale status --json` data: reported by a
// launcher on a host that has the CLI, or read directly when the console itself runs where `TAILSCALE_CLI` works.
// A report older than FRESH_MS is shown as stale, never as current.
const { isIP } = require('node:net');
const { execFile } = require('node:child_process');

const FRESH_MS = 60000, MAX_PEERS = 512;
const text = (v, n = 128) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n) : '');

// `tailscale status --json` -> the compact shape the launcher sends and the console stores
function fromStatus(st) {
  const users = (st && st.User) || {};
  const one = (n) => {
    const ip = (n.TailscaleIPs || []).find((x) => isIP(x) === 4) || (n.TailscaleIPs || [])[0];
    if (!ip || !isIP(ip)) return null;
    const seen = n.LastSeen && Date.parse(n.LastSeen) > 0 ? Date.parse(n.LastSeen) : null;
    return { ip, name: text((n.DNSName || n.HostName || '').replace(/\.$/, '')), os: text(n.OS, 32), online: n.Online === true,
      last_seen: seen, user: text((users[n.UserID] || {}).LoginName) };
  };
  const peers = Object.values((st && st.Peer) || {}).map(one).filter(Boolean);
  const self = st && st.Self ? one({ ...st.Self, Online: st.BackendState === 'Running' }) : null;
  return { state: text(st && st.BackendState, 32), self, peers };
}

function create(ctx, cli) {
  let report = null; // { source, at, state, self, peers }
  // validates a report from outside (launcher body); returns false when it is not usable
  function ingest(source, r) {
    if (!r || typeof r !== 'object' || !Array.isArray(r.peers)) return false;
    const peers = r.peers.slice(0, MAX_PEERS).filter((p) => p && typeof p.ip === 'string' && isIP(p.ip)).map((p) => ({
      ip: p.ip, name: text(p.name), os: text(p.os, 32), online: p.online === true, user: text(p.user),
      last_seen: Number.isFinite(p.last_seen) && p.last_seen > 0 ? p.last_seen : null }));
    const self = r.self && typeof r.self.ip === 'string' && isIP(r.self.ip) ? { ip: r.self.ip, name: text(r.self.name), os: text(r.self.os, 32), online: r.self.online === true, user: text(r.self.user), last_seen: null } : null;
    report = { source: text(source), at: ctx.now(), state: text(r.state, 32), self, peers };
    return true;
  }
  let timer = null;
  function pollLocal() {
    execFile(cli, ['status', '--json'], { timeout: 8000, maxBuffer: 8 * 1024 * 1024 }, (err, stdout) => {
      if (err) return;
      try { ingest('console', fromStatus(JSON.parse(stdout))); } catch { /* keep the previous report; it will go stale */ }
    });
  }
  if (cli) { pollLocal(); timer = setInterval(pollLocal, 15000); timer.unref(); }
  return {
    ingest, fromStatus, stop: () => { if (timer) clearInterval(timer); },
    // Everything the console knows about the tailnet, with its age, and a lookup by IP.
    snapshot() {
      if (!report) return { available: false, fresh: false, source: null, at: null, peers: [] };
      const peers = [...(report.self ? [report.self] : []), ...report.peers];
      return { available: true, fresh: ctx.now() - report.at < FRESH_MS, source: report.source, at: report.at, state: report.state, peers };
    },
  };
}

module.exports = { create, fromStatus };
