#!/usr/bin/env node
'use strict';
// Apply config/live-arms.json (A1-A4 models, judge) and their prices to a running console, then print the projection by arm.
//   WEB_URL=http://100.112.79.22:8080 APP_PASSWORD=... node webapp/tools/apply-config.js        (run from Study/)
// Prices come from webapp/lib/pricing.default.json: add a model there first if the script says it has no price.
const fs = require('node:fs');
const path = require('node:path');
const base = (process.env.WEB_URL || '').replace(/\/$/, '');
if (!base || !process.env.APP_PASSWORD) { console.error('Set WEB_URL and APP_PASSWORD'); process.exit(2); }
const live = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/live-arms.json'), 'utf8'));
const prices = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/pricing.default.json'), 'utf8'));

(async () => {
  const login = await fetch(`${base}/api/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password: process.env.APP_PASSWORD }) });
  if (!login.ok) throw new Error(`login failed (${login.status})`);
  const cookie = login.headers.get('set-cookie').split(';')[0];
  const call = async (method, p, body) => {
    const r = await fetch(base + p, { method, headers: { cookie, 'content-type': 'application/json' }, body: body && JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`${method} ${p}: ${d.error || r.status}`);
    return d;
  };
  const models = new Set([live.judge_model_id, ...Object.values(live.arms).map((a) => a.model_id)]);
  const body = {};
  for (const m of models) {
    if (!prices[m]) throw new Error(`no price for ${m} in webapp/lib/pricing.default.json: add it first`);
    body[m] = { input_per_mtok: prices[m].input_per_mtok, output_per_mtok: prices[m].output_per_mtok };
  }
  await call('PUT', '/api/pricing', body);
  for (const [id, a] of Object.entries(live.arms)) await call('PUT', `/api/arms/${id}`, a);
  await call('PUT', '/api/settings', { judge_model_id: live.judge_model_id });
  const { projection: p } = await call('GET', '/api/state');
  const usd = (n) => `$${n.toFixed(2)}`;
  console.log(`budget ${usd(p.budget_usd)}  spent ${usd(p.spent_usd)}  projected total ${usd(p.expected_total_usd)}${p.over_budget ? '  OVER BUDGET' : ''}`);
  for (const r of p.by_arm) {
    console.log(`${r.arm.padEnd(6)} ${String(r.calls_done).padStart(5)}/${String(r.calls_total).padEnd(5)} spent ${usd(r.spent_usd).padStart(8)}  remaining ${usd(r.est_cost_usd).padStart(8)}  total ${usd(r.est_total_usd).padStart(8)}  ${r.basis}`);
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
