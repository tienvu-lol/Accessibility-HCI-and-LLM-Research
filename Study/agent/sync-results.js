#!/usr/bin/env node
'use strict';
// Pull results from the hosted console into this checkout so they can be committed.
//   WEB_URL=https://<console> APP_PASSWORD=... node agent/sync-results.js [--commit]
// Writes Study/runs/** (stored run tree) and Study/results-export/{all.json,<table>.csv}. --commit stages and commits them (no push).
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const csv = require('../webapp/lib/csv');
const base = (process.env.WEB_URL || '').replace(/\/$/, '');
const password = process.env.APP_PASSWORD;
if (!base || !password) { console.error('Set WEB_URL and APP_PASSWORD'); process.exit(2); }
const study = path.join(__dirname, '..');

(async () => {
  const login = await fetch(`${base}/api/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password }) });
  if (!login.ok) throw new Error(`login failed (${login.status})`);
  const cookie = login.headers.get('set-cookie').split(';')[0];
  const get = async (p) => {
    const r = await fetch(base + p, { headers: { cookie } });
    if (!r.ok) throw new Error(`${p}: HTTP ${r.status}`);
    return r;
  };
  const out = path.join(study, 'results-export');
  fs.mkdirSync(out, { recursive: true });
  const all = await (await get('/api/export/all.json')).json();
  fs.writeFileSync(path.join(out, 'all.json'), JSON.stringify(all, null, 1));
  for (const [name, t] of Object.entries(all.tables || {})) fs.writeFileSync(path.join(out, `${name}.csv`), csv.stringify([t.columns, ...t.rows]));
  const tmp = path.join(out, '.runs.tar.gz'); // tar gets relative paths: GNU tar on Windows reads "C:" as a remote host
  const runs = await fetch(`${base}/api/export/runs.tar.gz`, { headers: { cookie } });
  if (runs.ok) {
    fs.writeFileSync(tmp, Buffer.from(await runs.arrayBuffer()));
    const x = spawnSync('tar', ['-xzf', '.runs.tar.gz', '-C', '..'], { cwd: out, stdio: 'inherit' });
    fs.rmSync(tmp, { force: true });
    if (x.status !== 0) throw new Error('tar extract failed');
  } else console.log(`no run tree yet (HTTP ${runs.status})`);
  console.log(`synced ${Object.keys(all.tables || {}).length} tables and the run tree into ${study}`);
  if (process.argv.includes('--commit')) {
    const git = (...a) => { const r = spawnSync('git', a, { cwd: study, stdio: 'inherit' }); if (r.status !== 0) throw new Error(`git ${a[0]} failed`); };
    git('add', 'results-export', 'runs');
    git('commit', '-m', `data(study): sync results from hosted console ${new Date().toISOString().slice(0, 10)}`);
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
