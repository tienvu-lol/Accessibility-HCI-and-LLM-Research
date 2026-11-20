// Persisted console state (settings, arms, pricing, queue; never keys) and the /api/state snapshot.
const fs = require('fs');
const path = require('path');
const csv = require('./csv');
const proj = require('./projection');
const defaultPricing = require('./pricing.default.json');

const CONDITIONS = ['naive', 'wcag', 'nielsen', 'both'];
const ARM_PROVIDERS = ['openai', 'anthropic'];
const tbd = (v) => (typeof v === 'string' && v && !/^TBD/.test(v) ? v : null);

function load(dataDir, cfg) {
  const file = path.join(dataDir, 'state.json');
  let raw = {};
  try { raw = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { /* first boot */ }
  const arms = {};
  for (const [id, a] of Object.entries(cfg.arms)) {
    // claude-family arms default to anthropic so the config's provider "TBD" does not block A1/A2
    arms[id] = { provider: tbd(a.provider) || (a.family === 'claude' ? 'anthropic' : null), model_id: tbd(a.model_id), ...(raw.arms && raw.arms[id]) };
  }
  const state = {
    settings: {
      budget_usd: 200, sites: null, conditions: [...CONDITIONS],
      max_iter: cfg.held_constant.max_iterations || 3, judge_model_id: tbd(cfg.judge && cfg.judge.model_id),
      ...raw.settings,
    },
    arms,
    pricing: { ...defaultPricing, ...raw.pricing },
    run: raw.run || { phase: 'idle', kind: null, started_at: null },
    queue: raw.queue || [],
    imported: raw.imported || [],
    imports: raw.imports || [],
    workerCtl: raw.workerCtl || {},
  };
  let timer = null;
  const flush = () => {
    if (timer) { clearTimeout(timer); timer = null; }
    csv.writeAtomic(file, JSON.stringify(state));
  };
  state.save = () => { if (!timer) { timer = setTimeout(flush, 1000); timer.unref(); } };
  state.flush = flush;
  return state;
}

// -> error string or null; mutates ctx.state.settings on success
function applySettings(ctx, b) {
  const s = { ...ctx.state.settings };
  const known = new Set(ctx.sites.map((x) => x.site_id));
  if ('budget_usd' in b) { if (typeof b.budget_usd !== 'number' || !(b.budget_usd >= 0)) return 'budget_usd must be a number >= 0'; s.budget_usd = b.budget_usd; }
  if ('sites' in b) {
    if (b.sites !== null && !(Array.isArray(b.sites) && b.sites.length && b.sites.every((x) => known.has(x)))) return 'sites must be null or a list of known site ids';
    s.sites = b.sites;
  }
  if ('conditions' in b) {
    if (!Array.isArray(b.conditions) || !b.conditions.length || !b.conditions.every((c) => CONDITIONS.includes(c))) return 'bad conditions';
    s.conditions = CONDITIONS.filter((c) => b.conditions.includes(c));
  }
  if ('max_iter' in b) { if (!Number.isInteger(b.max_iter) || b.max_iter < 1 || b.max_iter > 10) return 'max_iter must be 1-10'; s.max_iter = b.max_iter; }
  if ('judge_model_id' in b) {
    if (b.judge_model_id !== null && (typeof b.judge_model_id !== 'string' || !b.judge_model_id.trim())) return 'bad judge_model_id';
    s.judge_model_id = b.judge_model_id;
  }
  ctx.state.settings = s;
  return null;
}

function applyPricing(ctx, b) {
  for (const [model, p] of Object.entries(b)) {
    if (!p || !(p.input_per_mtok >= 0) || !(p.output_per_mtok >= 0)) return `bad price for ${model}`;
  }
  for (const [model, p] of Object.entries(b)) {
    ctx.state.pricing[model] = { input_per_mtok: p.input_per_mtok, output_per_mtok: p.output_per_mtok, verified: true };
  }
  return null;
}

function humanSection(ctx) {
  const dir = path.join(ctx.dataDir, 'human');
  const ratings = csv.readRows(path.join(dir, 'human_ratings.csv'));
  const rater = ratings.length ? ratings[0].indexOf('rater_id') : -1;
  let built = false;
  try { built = fs.readdirSync(path.join(dir, 'harness')).length > 0; } catch { /* not built */ }
  return {
    built,
    items: Math.max(0, csv.readRows(path.join(ctx.studyDir, 'sample', 'human_items.csv')).length - 1),
    raters: rater < 0 ? 0 : new Set(ratings.slice(1).map((r) => r[rater])).size,
    ratings_rows: Math.max(0, ratings.length - 1),
  };
}

function warnings(ctx) {
  const { arms, pricing, settings } = ctx.state;
  const w = [];
  for (const [id, a] of Object.entries(arms)) {
    if (ctx.armKind(id) === 'mainstream' && a.provider && !ctx.mock && !ctx.keys.get(a.provider)) w.push(`${id}: no ${a.provider} key set`);
    if (a.provider === 'gemini') w.push(`${id}: Gemini is the judge only, not a repair arm`);
  }
  if (ctx.geminiRejected) w.push('Gemini was rejected as a repair-arm provider (judge only)');
  if (!ctx.mock && !ctx.keys.get('gemini')) w.push('judge: no gemini key set');
  const used = new Set();
  for (const id of Object.keys(arms)) {
    if (ctx.armKind(id) !== 'mainstream') continue;
    const p = pricing[arms[id].model_id] || pricing[arms[id].provider];
    if (p && !p.verified) used.add(arms[id].model_id || arms[id].provider);
  }
  if (pricing.gemini && !pricing.gemini.verified) used.add('gemini (judge)');
  if (used.size) w.push(`placeholder pricing (unverified): ${[...used].join(', ')}`);
  const judgeModel = settings.judge_model_id || '';
  if ((judgeModel && !/gemini/i.test(judgeModel)) || Object.values(arms).some((a) => /gemini/i.test(a.model_id || ''))) {
    w.push('judge neutrality: judge must be a Gemini model and no arm may use one');
  }
  return w;
}

function snapshot(ctx) {
  const { state, coord } = ctx;
  const now = ctx.now();
  coord.reap();
  const agg = proj.aggregate(ctx, now);
  const ids = Object.keys(state.arms);
  const counts = {};
  const arms = ids.map((id) => {
    const cells = coord.armCells(id);
    counts[id] = { total: cells.total, done: cells.ok + cells.failed + cells.truncated + cells.imported };
    const s = agg.by[id];
    const a = state.arms[id];
    const blockers = coord.armBlockers(id);
    return {
      id, label: ctx.cfg.arms[id].model, kind: ctx.armKind(id), provider: a.provider, model_id: a.model_id,
      ready: blockers.length === 0, blockers, concurrency: ctx.concurrency(id), cells,
      tokens: { input: s.input, output: s.output }, calls: s.calls, cost_usd: s.cost_usd, tokens_per_min: s.rtokens / 5,
    };
  });
  const j = agg.by.judge;
  const jb = coord.judgeBlockers();
  return {
    now, run: coord.runInfo(), settings: state.settings, keys: ctx.keys.status(), arms,
    judge: {
      provider: 'gemini', model_id: state.settings.judge_model_id, ready: jb.length === 0, blockers: jb,
      items: coord.judgeItems(), tokens: { input: j.input, output: j.output }, cost_usd: j.cost_usd,
    },
    matrix: coord.matrix(),
    intake: proj.intake(agg),
    projection: proj.project(ctx, agg, counts),
    workers: coord.workers(),
    docker: ctx.docker && ctx.docker.snapshot(),
    pricing: state.pricing,
    warnings: warnings(ctx),
    human: humanSection(ctx),
    imports: state.imports,
  };
}

// Synthetic, deterministic snapshot for DEMO=1.
function demoSnapshot(ctx) {
  const now = ctx.now();
  const sites = ctx.siteIds();
  const conds = CONDITIONS;
  const char = (a, c, i) => (a > 'A4' ? 'i' : (i * 7 + c.length * 3 + a.charCodeAt(1)) % 11 === 0 ? 'f' : i < 30 + a.charCodeAt(1) % 20 ? 'o' : i < 40 ? 'r' : '.');
  const matrix = {};
  const armsOut = Object.keys(ctx.cfg.arms).map((id, k) => {
    matrix[id] = {};
    const cells = { total: sites.length * conds.length, queued: 0, running: 0, ok: 0, failed: 0, truncated: 0, imported: 0, converged: 0 };
    for (const c of conds) {
      matrix[id][c] = sites.map((_, i) => char(id, c, i)).join('');
      for (const ch of matrix[id][c]) cells[{ '.': 'queued', r: 'running', o: 'ok', f: 'failed', i: 'imported' }[ch]]++;
    }
    cells.converged = Math.floor(cells.ok * 0.6);
    const open = id > 'A4';
    return {
      id, label: ctx.cfg.arms[id].model, kind: open ? 'open_source' : 'mainstream', provider: open ? 'vt-arc' : k % 2 ? 'openai' : 'anthropic',
      model_id: ctx.cfg.arms[id].model_id, ready: true, blockers: [], concurrency: 12, cells,
      tokens: { input: 900000 * (k + 1), output: 400000 * (k + 1) }, calls: 300 * (k + 1), cost_usd: open ? 0 : 20 * (k + 1), tokens_per_min: 5000 * (k + 1),
    };
  });
  const series = Array.from({ length: 120 }, (_, i) => ({ t: now - (119 - i) * 60000, cum_cost_usd: i * 0.9, cum_tokens: i * 40000 }));
  const sources = [...armsOut.map((a) => ({ id: a.id, input: a.tokens.input, output: a.tokens.output, cost_usd: a.cost_usd, calls: a.calls, tokens_per_min: a.tokens_per_min })),
    { id: 'judge', input: 500000, output: 80000, cost_usd: 1.2, calls: 120, tokens_per_min: 900 }];
  return {
    now, run: { phase: 'running', kind: 'repair', started_at: now - 3600000 },
    settings: { budget_usd: 300, sites: null, conditions: conds, max_iter: 3, judge_model_id: 'gemini-demo' },
    keys: { openai: { set: true, last4: 'demo', source: 'env' }, anthropic: { set: true, last4: 'demo', source: 'ui' }, gemini: { set: false, last4: null, source: null } },
    arms: armsOut,
    judge: { provider: 'gemini', model_id: 'gemini-demo', ready: false, blockers: ['no gemini key set'], items: { total: 360, queued: 360, running: 0, done: 0, failed: 0 }, tokens: { input: 0, output: 0 }, cost_usd: 0 },
    matrix,
    intake: { total: { input: 4e6, output: 1.5e6, cost_usd: 100 }, rolling5m: { tokens: 25000, cost_usd: 0.9 }, sources, series },
    projection: {
      budget_usd: 300, spent_usd: 100, remaining_usd: 200, expected_total_usd: 240, over_budget: false, eta_minutes: 95,
      by_arm: Object.keys(ctx.cfg.arms).map((arm, k) => ({ arm, calls_total: 480, calls_done: 300 * (k + 1), avg_in: 9000, avg_out: 6000, est_cost_usd: arm > 'A4' ? 0 : 35, basis: arm > 'A4' ? 'self-hosted' : k < 2 ? 'measured' : 'estimated' })),
    },
    workers: [{ id: 'demo-worker-1', last_seen: now, slots: 4, running: 3 }],
    pricing: ctx.state.pricing, warnings: ['DEMO mode: synthetic data'],
    human: { built: false, items: 30, raters: 0, ratings_rows: 0 },
    imports: [],
  };
}

module.exports = { load, applySettings, applyPricing, snapshot, demoSnapshot, CONDITIONS, ARM_PROVIDERS };
