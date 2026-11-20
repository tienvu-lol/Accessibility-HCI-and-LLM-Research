// Run on the host: node --env-file=Study/agent/agent.env --env-file=Study/agent/launcher.env Study/agent/launch.js
'use strict';
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { execFile } = require('node:child_process');
const { fromStatus } = require('../webapp/lib/tailnet');
const { promisify } = require('node:util');
const exec = promisify(execFile);
const env = process.env;
const cwd = __dirname;

async function main() {
  const url = new URL('/api/launcher/poll', env.WEB_URL);
  if (!env.DASHBOARD_LAUNCH_TOKEN || !['http:', 'https:'].includes(url.protocol)) throw new Error('Set WEB_URL and DASHBOARD_LAUNCH_TOKEN');
  const { stdout } = await exec(env.TAILSCALE_CLI || 'tailscale', ['status', '--json']);
  const { Self: self, User: users, BackendState } = JSON.parse(stdout);
  const ip = self?.TailscaleIPs?.find((ip) => ip.includes('.')) || self?.TailscaleIPs?.[0];
  if (!ip || BackendState !== 'Running') throw new Error('Connect this host to Tailscale first');
  const node = (self.DNSName || self.HostName || '').replace(/\.$/, '');
  const user = users?.[self.UserID]?.LoginName || '';
  const dockerEnv = { ...env, TAILNET_NODE: node, TAILNET_IP: ip, TAILNET_USER: user, WORKER_MANUAL_CLAIM: '1', HOST_OS: `${os.type()} ${os.arch()}` };
  delete dockerEnv.DASHBOARD_LAUNCH_TOKEN;
  const gitBash = path.join(env.ProgramFiles || 'C:\\Program Files', 'Git', 'usr', 'bin', 'bash.exe');
  const bash = env.BASH_EXE || (process.platform === 'win32' && fs.existsSync(gitBash) ? gitBash : 'bash');
  const config = await exec('docker', ['compose', '--profile', '*', 'config', '--services'], { cwd, env: dockerEnv, timeout: 15000 });
  const services = new Set(config.stdout.trim().split(/\r?\n/));
  const arcs = [...services].map((s) => /^worker-(a\d+)$/.exec(s)?.[1]).filter(Boolean)
    .map((arm) => arm.toUpperCase()).filter((arm) => env[`ARC_${arm}_TARGET`] && env.ARC_USER && env.ARC_HOST);
  // Tailscale status is re-read every 15 s and sent with the poll, so the console shows real tailnet presence.
  let tailnet = fromStatus(JSON.parse(stdout)), tailnetAt = Date.now();
  console.log(`Docker launcher enrolled as ${node}: hosted${arcs.length ? `, ${arcs.join(', ')}` : ''}`);
  let result = null;
  let busy = false;
  let connected = true;
  for (;;) {
    try {
      if (Date.now() - tailnetAt > 15000) {
        tailnetAt = Date.now();
        try { tailnet = fromStatus(JSON.parse((await exec(env.TAILSCALE_CLI || 'tailscale', ['status', '--json'], { timeout: 8000, maxBuffer: 8 * 1024 * 1024 })).stdout)); } catch { /* keep the last report; the console marks it stale */ }
      }
      const res = await fetch(url, { method: 'POST', signal: AbortSignal.timeout(10000), headers: { 'content-type': 'application/json', authorization: `Bearer ${env.DASHBOARD_LAUNCH_TOKEN}` },
        body: JSON.stringify({ ip, node, user, name: env.MACHINE_NAME, arcs, result, tailnet }) });
      if (!res.ok) throw new Error(`console HTTP ${res.status}`);
      const { deploy } = await res.json();
      result = null;
      connected = true;
      if (deploy && !busy) {
        busy = true;
        const service = deploy.target === 'hosted' ? 'worker' : arcs.includes(deploy.target) ? `worker-${deploy.target.toLowerCase()}` : null;
        const run = service ? exec(bash, ['./start.sh'], { cwd, env: { ...dockerEnv, DASHBOARD_WORKER_SERVICE: service }, timeout: 180000 }) : Promise.reject(new Error('worker target not configured'));
        run.then(() => { result = { id: deploy.id, ok: true }; }, () => {
          result = { id: deploy.id, ok: false };
          console.error(`Docker could not start ${service || 'requested worker'}. Check local Docker and the agent configuration.`);
        }).finally(() => { busy = false; });
      }
    } catch (error) {
      if (connected) console.error(`Launcher cannot reach the console (${error.message}); retrying`);
      connected = false;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

main().catch((error) => { console.error(error.message.split('\n')[0]); process.exitCode = 1; });
