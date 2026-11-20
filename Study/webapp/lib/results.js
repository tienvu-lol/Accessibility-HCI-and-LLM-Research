'use strict';
// Pure analytics over the files under DATA_DIR. Never throws, never emits NaN/Infinity (null instead).
const fs = require('fs');
const path = require('path');

const QUESTIONS = [
  ['Q1', 'h1_visibility_of_status'], ['Q2', 'h2_match_real_world'], ['Q3', 'h3_user_control'],
  ['Q4', 'h4_consistency'], ['Q5', 'h5_error_prevention'], ['Q6', 'h6_recognition'],
  ['Q7', 'h7_flexibility'], ['Q8', 'h8_minimalist_design'], ['Q9', 'h9_error_recovery'],
  ['Q10', 'h10_help'], ['Q11', 'alt_text'], ['Q12', 'headings_labels'],
  ['Q13', 'error_messages'], ['Q14', 'content_order'],
];
const QID_TO_NAME = Object.fromEntries(QUESTIONS);
const HEURISTICS = QUESTIONS.map((q) => q[1]).filter((n) => /^h\d+_/.test(n));
const DEFAULT_ARMS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];
const DEFAULT_CONDITIONS = ['naive', 'wcag', 'nielsen', 'both'];
const KAPPA_GATE = 0.4; // Study/README.md section 7 gate: Fleiss >= 0.40 and Cohen >= 0.40
const BP = 1280;
// ---------- input helpers ----------
function readText(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return ''; }
}

// Small CSV parser: quotes, escaped quotes, CRLF. Returns rows of strings.
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', q = false, i = 0;
  const n = text.length;
  if (text.charCodeAt(0) === 0xfeff) i = 1;
  for (; i < n; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; } else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// -> {columns, rows}; rows with the wrong field count (partial trailing write) are dropped.
function readCsv(p) {
  const all = parseCsv(readText(p));
  if (!all.length) return { columns: [], rows: [] };
  const columns = all[0];
  return { columns, rows: all.slice(1).filter((r) => r.length === columns.length) };
}

function readObjects(p) {
  const { columns, rows } = readCsv(p);
  return rows.map((r) => { const o = {}; for (let i = 0; i < columns.length; i++) o[columns[i]] = r[i]; return o; });
}

function readJsonl(p) {
  const out = [];
  for (const line of readText(p).split('\n')) {
    const s = line.trim();
    if (!s) continue;
    try { const o = JSON.parse(s); if (o && typeof o === 'object') out.push(o); } catch { /* partial line */ }
  }
  return out;
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

const num = (x) => {
  if (x === '' || x === null || x === undefined) return null;
  const v = Number(x);
  return Number.isFinite(v) ? v : null;
};
const mean = (a) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : null);
const fin = (v) => (Number.isFinite(v) ? v : null);
const pct = (k, n) => (n ? (100 * k) / n : null);
function median(a) {
  if (!a.length) return null;
  const s = [...a].sort((x, y) => x - y), m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
const questionName = (q) => QID_TO_NAME[q] || q;

function getAcc(map, key) {
  let v = map.get(key);
  if (!v) { v = { sum: 0, n: 0 }; map.set(key, v); }
  return v;
}

// ---------- line diff ----------
// Edit ratio parts {changed, total}: changed = lines not in the LCS, total = la + lb.
function lineDiff(a, b) {
  const x = a.split('\n'), y = b.split('\n');
  const total = x.length + y.length;
  let s = 0;
  while (s < x.length && s < y.length && x[s] === y[s]) s++;
  let ex = x.length, ey = y.length;
  while (ex > s && ey > s && x[ex - 1] === y[ey - 1]) { ex--; ey--; }
  const m = ex - s, k = ey - s;
  let lcs = s + (x.length - ex);
  if (m && k) {
    if (m * k > 4e6) { // shortcut: huge diffs use a multiset overlap, an upper bound on the LCS
      const cnt = new Map();
      for (let i = s; i < ex; i++) cnt.set(x[i], (cnt.get(x[i]) || 0) + 1);
      for (let j = s; j < ey; j++) { const c = cnt.get(y[j]); if (c) { lcs++; cnt.set(y[j], c - 1); } }
    } else {
      let prev = new Uint32Array(k + 1), cur = new Uint32Array(k + 1);
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < k; j++) cur[j + 1] = x[s + i] === y[s + j] ? prev[j] + 1 : Math.max(prev[j + 1], cur[j]);
        [prev, cur] = [cur, prev];
      }
      lcs += prev[k];
    }
  }
  return { changed: total - 2 * lcs, total };
}

function readTextFiles(dir) {
  const files = new Map();
  let names = [];
  try { names = fs.readdirSync(dir, { recursive: true }); } catch { return files; }
  for (const n of names) {
    if (/\.(html|css)$/.test(n)) files.set(String(n).replace(/\\/g, '/'), readText(path.join(dir, n)));
  }
  return files;
}

// ---------- loaders ----------
function loadMetrics(dataDir, siteSet) {
  const { columns, rows } = readCsv(path.join(dataDir, 'metrics', 'metrics.csv'));
  const ix = Object.fromEntries(columns.map((c, i) => [c, i]));
  // cells: "arm|cond|site" -> Map(iter -> {sum,n}); baselines use "baseline|baseline|site"
  const cells = new Map(), baseRate = new Map(), group = new Map();
  for (const r of rows) {
    const site = r[ix.site_id];
    if (siteSet && !siteSet.has(site)) continue;
    if (ix.status !== undefined && r[ix.status] !== 'ok' && r[ix.status] !== '') continue;
    if (num(r[ix.breakpoint]) !== BP) continue;
    const v = num(r[ix.axe_violations]);
    if (v === null) continue;
    const arm = r[ix.arm], cond = r[ix.condition], it = num(r[ix.iteration]) ?? 0;
    const key = arm + '|' + cond + '|' + site;
    let iters = cells.get(key);
    if (!iters) { iters = new Map(); cells.set(key, iters); }
    const a = getAcc(iters, it);
    a.sum += v; a.n++;
    if (arm === 'baseline') {
      const rate = num(r[ix.violation_rate]);
      if (rate !== null) { const b = getAcc(baseRate, site); b.sum += rate; b.n++; }
    }
    if (ix.generator_group !== undefined && r[ix.generator_group]) group.set(site, r[ix.generator_group]);
  }
  return { cells, baseRate, group };
}

const finalIter = (iters) => { let m = -1; for (const k of iters.keys()) if (k > m) m = k; return m; };
const iterMean = (iters, it) => { const a = iters.get(it); return a && a.n ? a.sum / a.n : null; };

// -> Map "arm|cond|site" -> Map(iter -> Map(ruleId -> nodes)) at breakpoint 1280
function loadRules(dataDir, siteSet) {
  const out = new Map();
  for (const o of readJsonl(path.join(dataDir, 'metrics', 'axe_rules.jsonl'))) {
    if ((siteSet && !siteSet.has(o.site_id)) || (o.breakpoint !== undefined && num(o.breakpoint) !== BP)) continue;
    if (!Array.isArray(o.rules)) continue;
    const key = o.arm + '|' + o.condition + '|' + o.site_id;
    let iters = out.get(key);
    if (!iters) { iters = new Map(); out.set(key, iters); }
    const it = num(o.iteration) ?? 0;
    let rm = iters.get(it);
    if (!rm) { rm = new Map(); iters.set(it, rm); }
    for (const r of o.rules) {
      if (!r || !r.id) continue;
      const nodes = Array.isArray(r.nodes) ? r.nodes.length : (num(r.nodes) ?? 1);
      rm.set(r.id, (rm.get(r.id) || 0) + nodes);
    }
  }
  return out;
}

// -> Map "site|arm|cond|question" -> {sum,n}
function loadJudge(dataDir, siteSet) {
  const rows = readObjects(path.join(dataDir, 'verdicts', 'judge_rankings.csv'));
  const ranks = new Map(), items = new Set();
  for (const r of rows) {
    if (siteSet && !siteSet.has(r.site_id)) continue;
    const rank = num(r.rank);
    if (rank === null) continue;
    const q = questionName(r.question);
    const a = getAcc(ranks, `${r.site_id}|${r.arm}|${r.condition}|${q}`);
    a.sum += rank; a.n++;
    items.add(r.site_id + '|' + r.arm);
  }
  return { ranks, items };
}
const rankOf = (ranks, site, arm, cond, q) => {
  const a = ranks.get(`${site}|${arm}|${cond}|${q}`);
  return a ? a.sum / a.n : null;
};

// Cached per cell: file reads are the slow part (AV-scanned disks), stats are ~10x cheaper. An iteration's
// status.json is immutable once a later one exists, so only the newest known iteration is re-stat'ed, and the
// next one is probed only when the newest is not terminal (failed/converged).
const cellCache = new Map();
const isTerminal = (st) => st.status === 'failed' || st.converged === true;

function readIteration(dir, n, prev) {
  const sp = path.join(dir, 'iter' + n, 'status.json');
  const st = fs.statSync(sp, { throwIfNoEntry: false });
  if (!st) return null;
  const sig = st.mtimeMs + ':' + st.size;
  if (prev && prev.sig === sig) return prev;
  const value = readJson(sp);
  return value ? { n, st: value, dir: path.join(dir, 'iter' + n), sig } : undefined;
}

function cellIterations(dir) {
  let iters = cellCache.get(dir) || [];
  let last = iters.length ? readIteration(dir, iters.length, iters[iters.length - 1]) : null;
  if (iters.length && !last) iters = []; // newest iteration vanished: rescan
  else if (last) iters = [...iters.slice(0, -1), last];
  for (let n = iters.length + 1; !iters.length || !isTerminal(iters[iters.length - 1].st); n++) {
    const it = readIteration(dir, n, null);
    if (!it) break;
    iters.push(it);
  }
  if (cellCache.size > 20000) cellCache.clear();
  cellCache.set(dir, iters);
  return iters;
}

function loadLoops(dataDir, siteSet) {
  const cells = [];
  const ls = (p) => { try { return fs.readdirSync(p); } catch { return []; } };
  const runs = path.join(dataDir, 'runs');
  for (const arm of ls(runs)) {
    for (const cond of ls(path.join(runs, arm))) {
      for (const site of ls(path.join(runs, arm, cond))) {
        if (siteSet && !siteSet.has(site)) continue;
        const iters = cellIterations(path.join(runs, arm, cond, site));
        if (iters.length) cells.push({ arm, cond, site, iters });
      }
    }
  }
  return cells;
}

// {changed,total} line diff between two iteration dirs, cached on both status signatures.
const diffCache = new Map();
function iterationDiff(p, q) {
  const key = p.dir + '|' + q.dir, sig = p.sig + '|' + q.sig;
  const hit = diffCache.get(key);
  if (hit && hit.sig === sig) return hit.value;
  const fa = readTextFiles(p.dir), fb = readTextFiles(q.dir);
  let changed = 0, total = 0;
  for (const name of new Set([...fa.keys(), ...fb.keys()])) { const d = lineDiff(fa.get(name) || '', fb.get(name) || ''); changed += d.changed; total += d.total; }
  if (diffCache.size > 50000) diffCache.clear();
  const value = { changed, total };
  diffCache.set(key, { sig, value });
  return value;
}

// ---------- kappa ----------
function cohen(pairs) {
  const n = pairs.length;
  if (!n) return null;
  const cats = new Set(pairs.flat());
  let po = 0, pe = 0;
  const ca = {}, cb = {};
  for (const [a, b] of pairs) { if (a === b) po++; ca[a] = (ca[a] || 0) + 1; cb[b] = (cb[b] || 0) + 1; }
  po /= n;
  for (const c of cats) pe += ((ca[c] || 0) / n) * ((cb[c] || 0) / n);
  return pe === 1 ? null : fin((po - pe) / (1 - pe));
}

// items: array of {category: count}, each with the same rater total n
function fleiss(items, n) {
  const N = items.length;
  if (!N || n < 2) return null;
  const tot = {};
  let pBar = 0;
  for (const it of items) {
    let s = 0;
    for (const [c, k] of Object.entries(it)) { s += k * k; tot[c] = (tot[c] || 0) + k; }
    pBar += (s - n) / (n * (n - 1));
  }
  pBar /= N;
  let pe = 0;
  for (const k of Object.values(tot)) pe += (k / (N * n)) ** 2;
  return pe === 1 ? null : fin((pBar - pe) / (1 - pe));
}

function computeAgreement(dataDir, siteSet, judge) {
  const human = readObjects(path.join(dataDir, 'human', 'human_ratings.csv'))
    .filter((r) => !siteSet || siteSet.has(r.site_id));
  const items = new Map(); // site|arm|question -> {rater: verdict}
  for (const r of human) {
    if (!['wcag', 'both', 'tie'].includes(r.verdict)) continue;
    const key = `${r.site_id}|${r.arm}|${questionName(r.question)}`;
    let m = items.get(key);
    if (!m) { m = new Map(); items.set(key, m); }
    m.set(r.rater_id, r.verdict); // last answer wins
  }
  const sizes = new Map();
  for (const m of items.values()) sizes.set(m.size, (sizes.get(m.size) || 0) + 1);
  let modal = 0, best = 0;
  for (const [s, c] of sizes) if (c > best || (c === best && s > modal)) { best = c; modal = s; }

  const fl = [], pairs = [];
  for (const [key, m] of items) {
    const counts = {};
    for (const v of m.values()) counts[v] = (counts[v] || 0) + 1;
    if (m.size === modal && modal >= 2) fl.push(counts);
    // judge's pairwise verdict: lower rank wins
    const [site, arm, q] = key.split('|');
    const rw = rankOf(judge.ranks, site, arm, 'wcag', q), rb = rankOf(judge.ranks, site, arm, 'both', q);
    if (rw === null || rb === null) continue;
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (top[0][1] * 2 <= m.size) continue; // no strict majority: excluded from Cohen
    pairs.push([rw < rb ? 'wcag' : rb < rw ? 'both' : 'tie', top[0][0]]);
  }
  const ck = cohen(pairs), fk = fleiss(fl, modal);
  return {
    agreement: {
      judge_vs_human: ck === null ? null : { kappa: ck, n: pairs.length },
      human_fleiss: fk === null ? null : { kappa: fk, n_items: fl.length, raters: modal },
      gate: { threshold: KAPPA_GATE, pass: ck === null || fk === null ? null : ck >= KAPPA_GATE && fk >= KAPPA_GATE },
    },
    raters: new Set(human.map((r) => r.rater_id)).size,
    items: items,
    human,
  };
}

// ---------- build ----------
function build(dataDir, opts = {}) {
  try { return buildUnsafe(dataDir, opts || {}); } catch (e) { return { ...emptyResults(), notes: ['results error: ' + e.message] }; }
}

function emptyResults() {
  return {
    coverage: { variants_expected: 0, variants_scored: 0, variants_out_of_scope: 0, baselines_scored: 0, baselines_expected: 0, judge_items_done: 0, judge_items_expected: 0, human_raters: 0, human_items_complete: 0 },
    gate: { median_baseline_violation_rate: null, sites_zero_axe: 0, warn: false, note: 'no baseline data' },
    fig2: [], fig3: [], fig4: { criteria: [], heuristics: HEURISTICS, cells: [], basis: '' }, fig5: [], fig6: [], loop: [],
    headline: { pct_sites_gained_wcag_lost_nielsen: null, n_sites: 0, top_conflict: null },
    agreement: { judge_vs_human: null, human_fleiss: null, gate: { threshold: KAPPA_GATE, pass: null } },
    notes: [],
  };
}

function buildUnsafe(dataDir, opts) {
  const siteSet = Array.isArray(opts.sites) ? new Set(opts.sites) : null;
  const conditions = opts.conditions && opts.conditions.length ? opts.conditions : DEFAULT_CONDITIONS;
  const arms = opts.arms && opts.arms.length ? opts.arms : DEFAULT_ARMS;
  const maxIter = opts.maxIter || 3;
  const out = emptyResults();

  const { cells, baseRate, group } = loadMetrics(dataDir, siteSet);
  const rules = loadRules(dataDir, siteSet);
  const judge = loadJudge(dataDir, siteSet);
  const agr = computeAgreement(dataDir, siteSet, judge);

  const baseSites = [];
  const variants = []; // site-variants with before/after
  const armSet = new Set(arms), condSet = new Set(conditions);
  let scored = 0, outOfScope = 0;
  for (const [key, iters] of cells) {
    const [arm, cond, site] = key.split('|');
    if (arm === 'baseline') { baseSites.push(site); continue; }
    // Coverage is "how much of the work in scope is scored", so a cell from an arm or condition that is
    // not in scope cannot count towards it - otherwise narrowing the settings makes scoring look finished.
    if (!armSet.has(arm) || !condSet.has(cond)) { outOfScope++; continue; }
    scored++;
    const fi = finalIter(iters);
    const bIters = cells.get('baseline|baseline|' + site);
    const before = bIters ? iterMean(bIters, finalIter(bIters)) : null;
    variants.push({ arm, cond, site, fi, before, after: iterMean(iters, fi), group: group.get(site) || null });
  }
  const sitesAll = siteSet ? [...siteSet] : [...new Set([...baseSites, ...variants.map((v) => v.site)])];

  // coverage
  out.coverage.variants_expected = sitesAll.length * arms.length * conditions.length;
  out.coverage.variants_scored = Math.min(scored, out.coverage.variants_expected);
  out.coverage.variants_out_of_scope = outOfScope;
  out.coverage.baselines_scored = baseSites.length;
  out.coverage.baselines_expected = sitesAll.length;
  out.coverage.judge_items_done = judge.items.size;
  out.coverage.judge_items_expected = sitesAll.length * arms.length;
  out.coverage.human_raters = agr.raters;
  const perRater = agr.raters * QUESTIONS.length;
  const answered = new Map();
  for (const [key, m] of agr.items) { const k = key.split('|').slice(0, 2).join('|'); answered.set(k, (answered.get(k) || 0) + m.size); }
  out.coverage.human_items_complete = perRater ? [...answered.values()].filter((c) => c >= perRater).length : 0;

  // gate
  const med = median([...baseRate.values()].map((a) => a.sum / a.n));
  const zero = baseSites.filter((s) => { const it = cells.get('baseline|baseline|' + s); return iterMean(it, finalIter(it)) === 0; }).length;
  out.gate = {
    median_baseline_violation_rate: med, sites_zero_axe: zero, warn: med !== null && med < 0.02,
    note: med === null ? 'no baseline scores yet'
      : med < 0.02 ? 'Ceiling risk: median baseline violation rate < 0.02; repairs have little room to improve.'
        : 'Baseline violation rate leaves room to improve.',
  };

  // fig2
  const cellKeys = new Map();
  for (const v of variants) {
    if (v.before === null || v.after === null) continue;
    const k = v.arm + '|' + v.cond;
    if (!cellKeys.has(k)) cellKeys.set(k, { arm: v.arm, condition: v.cond, sites: [] });
    cellKeys.get(k).sites.push({ site: v.site, before: v.before, after: v.after });
  }
  out.fig2 = [...cellKeys.values()].sort((a, b) => a.arm.localeCompare(b.arm) || a.condition.localeCompare(b.condition)).map((c) => {
    c.sites.sort((a, b) => a.site.localeCompare(b.site));
    return { arm: c.arm, condition: c.condition, before_mean: mean(c.sites.map((s) => s.before)), after_mean: mean(c.sites.map((s) => s.after)), n: c.sites.length, sites: c.sites };
  });

  // fig3
  const f3 = new Map();
  for (const [k, a] of judge.ranks) {
    const [site, arm, cond] = k.split('|');
    const kk = arm + '|' + cond;
    let c = f3.get(kk);
    if (!c) { c = { arm, condition: cond, sum: 0, n: 0, sites: new Set() }; f3.set(kk, c); }
    c.sum += a.sum / a.n; c.n++; c.sites.add(site);
  }
  out.fig3 = [...f3.values()].sort((a, b) => a.arm.localeCompare(b.arm) || a.condition.localeCompare(b.condition))
    .map((c) => ({ arm: c.arm, condition: c.condition, mean_rank: fin(c.sum / c.n), n: c.sites.size }));

  // fig4 / fig5 / fig6 / headline
  const crit = new Set(), pairCount = new Map();
  const f5 = [], f6 = [], conflictSites = new Set(), evalSites = new Set();
  for (const v of variants) {
    if (v.before === null || v.after === null) continue;
    const gain = v.before - v.after;
    let delta = null, worstH = null, worstD = null;
    const worse = [];
    const deltas = [];
    for (const q of HEURISTICS) {
      const rb0 = rankOf(judge.ranks, v.site, v.arm, 'baseline', q), rc = rankOf(judge.ranks, v.site, v.arm, v.cond, q);
      if (rb0 === null || rc === null) continue;
      const d = rb0 - rc; // positive = repaired page judged better than the original
      deltas.push(d);
      if (d < 0) { worse.push(q); if (worstD === null || d < worstD) { worstD = d; worstH = q; } }
    }
    if (deltas.length) delta = mean(deltas);
    f5.push({ site: v.site, arm: v.arm, generator_group: v.group, condition: v.cond, wcag_gain: gain, usability_delta: delta });
    if (deltas.length) evalSites.add(v.site);
    if (gain > 0 && worse.length) {
      conflictSites.add(v.site);
      f6.push({ site: v.site, arm: v.arm, condition: v.cond, wcag_gain: gain, worst_heuristic: worstH, worst_delta: worstD,
        before_url: `/api/variant/baseline/baseline/${v.site}/0/`, after_url: `/api/variant/${v.arm}/${v.cond}/${v.site}/${v.fi}/`, _v: v });
      // improved rules for this variant
      const bR = rules.get('baseline|baseline|' + v.site), aR = rules.get(`${v.arm}|${v.cond}|${v.site}`);
      const b = bR && bR.get(finalIter(bR)), a = aR && aR.get(v.fi);
      if (b && a) {
        for (const [id, nb] of b) {
          if ((a.get(id) || 0) < nb) {
            crit.add(id);
            for (const h of worse) { const k = id + '|' + h; pairCount.set(k, (pairCount.get(k) || 0) + 1); }
          }
        }
      }
    }
  }
  out.fig5 = f5.sort((a, b) => a.site.localeCompare(b.site) || a.arm.localeCompare(b.arm) || a.condition.localeCompare(b.condition));
  // fig6 page: first slice page is unknown here, so the viewer path ends with the page the variant stores
  out.fig6 = f6.sort((a, b) => a.worst_delta - b.worst_delta || b.wcag_gain - a.wcag_gain || a.site.localeCompare(b.site)).map((r) => {
    const page = opts.pageOf ? opts.pageOf(r.site) : 'index.html';
    const { _v, ...rest } = r;
    return { ...rest, before_url: rest.before_url + page, after_url: rest.after_url + page };
  });
  const criteria = [...crit].sort();
  out.fig4 = {
    criteria, heuristics: HEURISTICS,
    cells: criteria.map((c) => HEURISTICS.map((h) => pairCount.get(c + '|' + h) || 0)),
    basis: 'Cell = site-variants where the WCAG rule had fewer violating nodes after repair AND the heuristic ranked worse than the same (site, arm) unrepaired baseline page (delta = rank(baseline) - rank(variant); positive = repaired judged better). Rules from metrics/axe_rules.jsonl at 1280px; judge ranks from verdicts/judge_rankings.csv.',
  };
  let top = null;
  for (const [k, count] of pairCount) {
    const [criterion, heuristic] = k.split('|');
    if (!top || count > top.count || (count === top.count && (criterion + heuristic) < (top.criterion + top.heuristic))) top = { criterion, heuristic, count };
  }
  out.headline = { pct_sites_gained_wcag_lost_nielsen: pct(conflictSites.size, evalSites.size), n_sites: evalSites.size, top_conflict: top };

  out.loop = buildLoop(loadLoops(dataDir, siteSet), rules, maxIter);
  out.agreement = agr.agreement;
  return out;
}

function buildLoop(cells, rules, maxIter) {
  const groups = new Map();
  for (const c of cells) {
    const k = c.arm + '|' + c.cond;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(c);
  }
  const res = [];
  for (const [k, list] of groups) {
    const [arm, cond] = k.split('|');
    let done = 0, conv = 0, cap = 0, failed = 0, trunc = 0, iterSum = 0, tin = 0, tout = 0, reg = 0, regCells = 0, chg = 0, tot = 0;
    const ratios = [];
    for (const c of list) {
      const last = c.iters[c.iters.length - 1];
      for (const it of c.iters) { tin += num(it.st.usage && it.st.usage.input) || 0; tout += num(it.st.usage && it.st.usage.output) || 0; }
      if (last.st.status === 'failed') { failed++; if (String(last.st.reason || '').startsWith('truncated')) trunc++; }
      else if (last.st.converged) conv++;
      else if (last.n >= maxIter) cap++;
      else continue;
      done++; iterSum += last.n;
      // edit ratio between consecutive ok iterations
      for (let i = 1; i < c.iters.length; i++) {
        const p = c.iters[i - 1], q = c.iters[i];
        if (q.n !== p.n + 1 || p.st.status !== 'ok' || q.st.status !== 'ok') continue;
        const { changed: ch, total: t } = iterationDiff(p, q);
        ratios.push(t ? ch / t : 0);
      }
      // regressions: rules present after iteration n that were absent before it (iter 0 = baseline)
      const rm = rules.get(`${arm}|${cond}|${c.site}`), base = rules.get('baseline|baseline|' + c.site);
      if (rm) {
        let r = 0, seen = false;
        for (const it of c.iters) {
          const cur = rm.get(it.n);
          if (!cur) continue;
          const prevMap = it.n === 1 ? (base && base.get(finalIter(base))) : rm.get(it.n - 1);
          if (!prevMap) continue;
          seen = true;
          for (const id of cur.keys()) if (!prevMap.has(id)) r++;
        }
        if (seen) { reg += r; regCells++; }
      }
    }
    res.push({
      arm, condition: cond, sites: list.length, mean_iterations: done ? iterSum / done : null,
      pct_converged: pct(conv, done), pct_hit_cap: pct(cap, done), pct_failed: pct(failed, done), pct_truncated: pct(trunc, done),
      mean_edit_ratio: mean(ratios), regressions_per_cell: regCells ? reg / regCells : null,
      self_reported_tokens_in: tin, self_reported_tokens_out: tout,
    });
  }
  return res.sort((a, b) => a.arm.localeCompare(b.arm) || a.condition.localeCompare(b.condition));
}

// ---------- tables ----------
function tables(dataDir, opts = {}) {
  opts = opts || {};
  let r;
  try { r = buildUnsafe(dataDir, opts); } catch { r = emptyResults(); }
  const raw = (p) => { const { columns, rows } = readCsv(path.join(dataDir, p)); return { columns, rows }; };
  const hd = r.headline, ag = r.agreement;
  return {
    fig2_violations: { columns: ['arm', 'condition', 'site', 'before', 'after'], rows: r.fig2.flatMap((c) => c.sites.map((s) => [c.arm, c.condition, s.site, s.before, s.after])) },
    fig3_judge_ranks: { columns: ['arm', 'condition', 'mean_rank', 'n'], rows: r.fig3.map((c) => [c.arm, c.condition, c.mean_rank, c.n]) },
    fig4_conflict_heatmap: { columns: ['criterion', ...r.fig4.heuristics], rows: r.fig4.criteria.map((c, i) => [c, ...r.fig4.cells[i]]) },
    fig5_gain_vs_usability: { columns: ['site', 'arm', 'generator_group', 'condition', 'wcag_gain', 'usability_delta'], rows: r.fig5.map((x) => [x.site, x.arm, x.generator_group, x.condition, x.wcag_gain, x.usability_delta]) },
    fig6_broke_usability: { columns: ['site', 'arm', 'condition', 'wcag_gain', 'worst_heuristic', 'worst_delta', 'before_url', 'after_url'], rows: r.fig6.map((x) => [x.site, x.arm, x.condition, x.wcag_gain, x.worst_heuristic, x.worst_delta, x.before_url, x.after_url]) },
    loop_behavior: {
      columns: ['arm', 'condition', 'sites', 'mean_iterations', 'pct_converged', 'pct_hit_cap', 'pct_failed', 'pct_truncated', 'mean_edit_ratio', 'regressions_per_cell', 'self_reported_tokens_in', 'self_reported_tokens_out'],
      rows: r.loop.map((x) => [x.arm, x.condition, x.sites, x.mean_iterations, x.pct_converged, x.pct_hit_cap, x.pct_failed, x.pct_truncated, x.mean_edit_ratio, x.regressions_per_cell, x.self_reported_tokens_in, x.self_reported_tokens_out]),
    },
    headline: {
      columns: ['pct_sites_gained_wcag_lost_nielsen', 'n_sites', 'top_conflict_criterion', 'top_conflict_heuristic', 'top_conflict_count'],
      rows: [[hd.pct_sites_gained_wcag_lost_nielsen, hd.n_sites, hd.top_conflict && hd.top_conflict.criterion, hd.top_conflict && hd.top_conflict.heuristic, hd.top_conflict && hd.top_conflict.count]],
    },
    agreement: {
      columns: ['metric', 'value', 'n'],
      rows: [
        ['judge_vs_human_kappa', ag.judge_vs_human && ag.judge_vs_human.kappa, ag.judge_vs_human && ag.judge_vs_human.n],
        ['human_fleiss_kappa', ag.human_fleiss && ag.human_fleiss.kappa, ag.human_fleiss && ag.human_fleiss.n_items],
        ['gate_threshold', ag.gate.threshold, null],
        ['gate_pass', ag.gate.pass, null],
      ],
    },
    metrics_all: raw('metrics/metrics.csv'),
    judge_rankings: raw('verdicts/judge_rankings.csv'),
    human_ratings: raw('human/human_ratings.csv'),
    cost_by_source: costBySource(dataDir, opts),
  };
}

// Who spent what: one row per (arm, machine, model, key), from the facts recorded in usage.jsonl.
// Cost is the figure stored when the call finished; only legacy rows (no cost_usd) are priced here, from
// the pricing passed in. Mock rows are kept, flagged, and cost 0, so a test run is visible but separable.
function costBySource(dataDir, opts) {
  const pricing = opts.pricing || {}, modelBySource = opts.modelBySource || {};
  const by = new Map();
  for (const l of readJsonl(path.join(dataDir, 'usage.jsonl'))) {
    const arm = String(l.arm ?? l.source ?? '');
    const machine = String(l.worker ?? l.source ?? 'unknown');
    const model = String(l.model_id ?? modelBySource[arm] ?? '');
    const key = String(l.key_id ?? '');
    const mock = l.mock === true;
    const k = [arm, machine, model, key, mock].join('\u0000');
    let a = by.get(k);
    if (!a) { a = { arm, machine, model, key, mock, input: 0, output: 0, calls: 0, cost: 0, priced: false }; by.set(k, a); }
    const inp = num(l.input) || 0, outp = num(l.output) || 0;
    a.input += inp; a.output += outp; a.calls += num(l.calls) || 0;
    if (typeof l.cost_usd === 'number') { a.priced = true; a.cost += l.cost_usd; continue; }
    if (mock) { a.priced = true; continue; }
    const p = pricing[model] || pricing[modelBySource[arm]] || pricing[arm];
    if (p) {
      a.priced = true;
      a.cost += (inp * (num(p.input_per_mtok) || 0) + outp * (num(p.output_per_mtok) || 0)) / 1e6;
    }
  }
  const cmp = (a, b) => a.arm.localeCompare(b.arm) || a.machine.localeCompare(b.machine) || a.model.localeCompare(b.model) || a.key.localeCompare(b.key);
  return {
    columns: ['arm', 'machine', 'model_id', 'key_id', 'mock', 'input', 'output', 'calls', 'cost_usd'],
    rows: [...by.values()].sort(cmp).map((a) => [a.arm, a.machine, a.model, a.key, a.mock, a.input, a.output, a.calls, a.priced ? a.cost : null]),
  };
}

module.exports = { build, tables, parseCsv, lineDiff, cohen, fleiss, HEURISTICS };
