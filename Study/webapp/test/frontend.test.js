'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const C = require('../public/charts.js');
const App = require('../public/app.js');

const pub = (f) => path.join(__dirname, '..', 'public', f);
const state = JSON.parse(fs.readFileSync(pub('demo-state.json'), 'utf8'));
const results = JSON.parse(fs.readFileSync(pub('demo-results.json'), 'utf8'));
const EVIL = '<script>alert("x")</script>\'"&';

function hasKeys(obj, keys, where) {
  for (const k of keys) assert.ok(k in obj, `${where} missing ${k}`);
}

test('demo-state.json contains every snapshot field in API.md', () => {
  hasKeys(state, ['now', 'run', 'settings', 'keys', 'arms', 'judge', 'matrix', 'machines', 'matrix_workers', 'intake', 'projection', 'recent_usage', 'workers', 'pricing', 'warnings', 'human', 'imports'], 'state');
  hasKeys(state.run, ['phase', 'kind', 'started_at'], 'run');
  hasKeys(state.settings, ['budget_usd', 'sites', 'conditions', 'max_iter', 'judge_model_id'], 'settings');
  // three hosted providers plus one key slot per open-source arm
  assert.deepStrictEqual(Object.keys(state.keys).sort(), [...state.arms.filter((a) => a.kind === 'open_source').map((a) => a.id.toLowerCase()), 'anthropic', 'gemini', 'openai'].sort());
  for (const k of Object.values(state.keys)) hasKeys(k, ['set', 'last4', 'source'], 'key');
  assert.deepEqual(state.arms.map((a) => a.id), Object.keys(require('../../config/repair-allocation.json').arms));
  for (const a of state.arms) {
    hasKeys(a, ['id', 'label', 'kind', 'provider', 'model_id', 'ready', 'blockers', 'concurrency', 'cells', 'tokens', 'calls', 'cost_usd', 'tokens_per_min'], a.id);
    hasKeys(a.cells, ['total', 'queued', 'running', 'ok', 'failed', 'truncated', 'imported', 'converged'], a.id + '.cells');
    hasKeys(a.tokens, ['input', 'output'], a.id + '.tokens');
  }
  hasKeys(state.judge, ['provider', 'model_id', 'ready', 'blockers', 'items', 'tokens', 'cost_usd'], 'judge');
  hasKeys(state.judge.items, ['total', 'queued', 'running', 'done', 'failed'], 'judge.items');
  hasKeys(state.intake, ['total', 'rolling5m', 'sources', 'machines', 'series'], 'intake');
  for (const m of state.machines) hasKeys(m, ['id', 'char', 'online', 'os', 'calls', 'input', 'output', 'cost_usd', 'mock_calls', 'cells'], 'machine');
  // one character per site per (arm, condition), matching the state matrix
  for (const arm of Object.keys(state.matrix)) {
    for (const [cond, str] of Object.entries(state.matrix[arm])) {
      assert.strictEqual(state.matrix_workers[arm][cond].length, str.length, arm + ' ' + cond + ' worker row');
    }
  }
  const chars = new Set(state.machines.map((m) => m.char).concat(['-']));
  for (const arm of Object.keys(state.matrix_workers)) {
    for (const str of Object.values(state.matrix_workers[arm])) {
      for (const ch of str) assert.ok(chars.has(ch), 'unknown machine char ' + ch);
    }
  }
  for (const u of state.recent_usage) hasKeys(u, ['ts', 'worker', 'arm', 'kind', 'model_id', 'key_id', 'mock', 'input', 'output', 'calls', 'cost_usd'], 'recent_usage');
  hasKeys(state.intake.rolling5m, ['tokens', 'cost_usd'], 'rolling5m');
  assert.deepStrictEqual(state.intake.sources.map((s) => s.id), [...state.arms.map((a) => a.id), 'judge']);
  for (const s of state.intake.sources) hasKeys(s, ['id', 'input', 'output', 'cost_usd', 'calls', 'tokens_per_min'], 'source');
  for (const p of state.intake.series) hasKeys(p, ['t', 'cum_cost_usd', 'cum_tokens'], 'series');
  hasKeys(state.projection, ['budget_usd', 'spent_usd', 'remaining_usd', 'expected_total_usd', 'over_budget', 'eta_minutes', 'by_arm', 'by_machine', 'by_key', 'mock_calls', 'legacy_calls'], 'projection');
  for (const m of state.projection.by_machine) hasKeys(m, ['id', 'calls', 'input', 'output', 'cost_usd', 'mock_calls', 'share_pct', 'arms'], 'by_machine');
  for (const k of state.projection.by_key) hasKeys(k, ['id', 'arm', 'model_id', 'calls', 'input', 'output', 'cost_usd'], 'by_key');
  for (const b of state.projection.by_arm) {
    hasKeys(b, ['arm', 'model_id', 'calls_total', 'calls_done', 'avg_in', 'avg_out', 'spent_usd', 'est_cost_usd', 'est_total_usd', 'mock_calls', 'basis'], 'by_arm');
    assert.ok(['measured', 'estimated', 'self-hosted', 'unpriced'].includes(b.basis));
  }
  for (const w of state.workers) hasKeys(w, ['id', 'last_seen', 'slots', 'running'], 'worker');
  for (const p of Object.values(state.pricing)) hasKeys(p, ['input_per_mtok', 'output_per_mtok', 'verified'], 'pricing');
  hasKeys(state.human, ['built', 'items', 'raters', 'ratings_rows'], 'human');
  for (const i of state.imports) hasKeys(i, ['ts', 'arms', 'cells', 'rejected'], 'import');
});

test('demo matrix: 60 chars per condition, legal glyphs, counters agree with it', () => {
  for (const a of state.arms) {
    let total = 0;
    for (const cond of Object.keys(state.matrix[a.id])) {
      const row = state.matrix[a.id][cond];
      assert.strictEqual(row.length, 60, `${a.id}/${cond}`);
      assert.match(row, /^[.roftI\-i]+$/);
      total += [...row].filter((c) => c !== '-').length;
    }
    assert.strictEqual(a.cells.total, total, a.id + ' total');
    const count = (ch) => Object.values(state.matrix[a.id]).join('').split(ch).length - 1;
    assert.strictEqual(a.cells.failed, count('f'));
    assert.strictEqual(a.cells.imported, count('i'));
  }
  assert.strictEqual(state.settings.sites, null, 'null = all 60 sites');
});

test('demo-results.json contains every results field in API.md', () => {
  hasKeys(results, ['coverage', 'gate', 'fig2', 'fig3', 'fig4', 'fig5', 'fig6', 'loop', 'headline', 'agreement', 'notes'], 'results');
  hasKeys(results.coverage, ['variants_expected', 'variants_scored', 'baselines_scored', 'judge_items_done', 'judge_items_expected', 'human_raters', 'human_items_complete'], 'coverage');
  hasKeys(results.gate, ['median_baseline_violation_rate', 'sites_zero_axe', 'warn', 'note'], 'gate');
  for (const r of results.fig2) { hasKeys(r, ['arm', 'condition', 'before_mean', 'after_mean', 'n', 'sites'], 'fig2'); hasKeys(r.sites[0], ['site', 'before', 'after'], 'fig2.sites'); }
  assert.strictEqual(new Set(results.fig2.map((r) => r.arm)).size, 6);
  for (const r of results.fig3) hasKeys(r, ['arm', 'condition', 'mean_rank', 'n'], 'fig3');
  hasKeys(results.fig4, ['criteria', 'heuristics', 'cells', 'basis'], 'fig4');
  assert.strictEqual(results.fig4.cells.length, results.fig4.criteria.length);
  assert.strictEqual(results.fig4.heuristics.length, 10);
  for (const r of results.fig5) hasKeys(r, ['site', 'arm', 'generator_group', 'condition', 'wcag_gain', 'usability_delta'], 'fig5');
  for (const r of results.fig6) hasKeys(r, ['site', 'arm', 'condition', 'wcag_gain', 'worst_heuristic', 'worst_delta', 'before_url', 'after_url'], 'fig6');
  for (const r of results.loop) hasKeys(r, ['arm', 'condition', 'sites', 'mean_iterations', 'pct_converged', 'pct_hit_cap', 'pct_failed', 'pct_truncated', 'mean_edit_ratio', 'regressions_per_cell', 'self_reported_tokens_in', 'self_reported_tokens_out'], 'loop');
  hasKeys(results.headline, ['pct_sites_gained_wcag_lost_nielsen', 'n_sites', 'top_conflict'], 'headline');
  hasKeys(results.agreement, ['judge_vs_human', 'human_fleiss', 'gate'], 'agreement');
  hasKeys(results.agreement.gate, ['threshold', 'pass'], 'agreement.gate');
  assert.ok(results.notes.length > 0);
});

test('charts: scales, ticks, paths', () => {
  const s = C.linear(0, 10, 100, 200);
  assert.strictEqual(s(0), 100); assert.strictEqual(s(10), 200); assert.strictEqual(s(5), 150);
  assert.strictEqual(C.linear(3, 3, 0, 10)(3), 5, 'degenerate domain centres');
  assert.deepStrictEqual(C.niceTicks(0, 13.7, 5), { min: 0, max: 15, ticks: [0, 5, 10, 15] });
  const t = C.niceTicks(-0.9, 1.4, 6);
  assert.ok(t.min <= -0.9 && t.max >= 1.4 && t.ticks.includes(0));
  assert.ok(C.niceTicks(NaN, 5).ticks.length > 1, 'NaN input falls back');
  assert.strictEqual(C.niceTicks(2, 2).max, 3);
  assert.strictEqual(C.linePath([[0, 0], [1.234, 5.678]]), 'M0,0 L1.23,5.68');
  assert.strictEqual(C.textOn('#861F41'), '#ffffff');
  assert.strictEqual(C.textOn('#ffffff'), '#000000');
  assert.strictEqual(C.heatColor(0), '#ffffff'); assert.strictEqual(C.heatColor(1), '#861f41');
  assert.strictEqual(C.num(null), 'n/a'); assert.strictEqual(C.num(NaN), 'n/a'); assert.strictEqual(C.num(1.005, 1), '1.0');
});

test('charts: csv escaping and table builders', () => {
  assert.strictEqual(C.csvEscape('a,b'), '"a,b"');
  assert.strictEqual(C.csvEscape('say "hi"'), '"say ""hi"""');
  assert.strictEqual(C.csvEscape('l1\nl2'), '"l1\nl2"');
  assert.strictEqual(C.csvEscape(null), ''); assert.strictEqual(C.csvEscape(0), '0');
  assert.strictEqual(C.toCsv(['a', 'b'], [[1, 'x,y']]), 'a,b\r\n1,"x,y"\r\n');
  const T = C.tables(results);
  for (const n of ['fig2_violations', 'fig3_judge_ranks', 'fig4_conflict_heatmap', 'fig5_gain_vs_usability', 'fig6_broke_usability', 'loop_behavior', 'headline', 'agreement']) {
    assert.ok(T[n], n);
    for (const r of T[n].rows) assert.strictEqual(r.length, T[n].columns.length, n + ' row width');
  }
  assert.doesNotThrow(() => C.tables({}), 'tables survive empty results');
});

test('charts: every figure renders valid-looking self-contained SVG with title and axis labels', () => {
  const figs = {
    fig2: C.fig2Svg(results.fig2, 'wcag'), fig3: C.fig3Svg(results.fig3), fig4: C.fig4Svg(results.fig4), fig5: C.fig5Svg(results.fig5),
    spark: C.sparkSvg(state.intake.series, 'cum_cost_usd', 'Cumulative cost')
  };
  for (const [k, svg] of Object.entries(figs)) {
    assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 \d+ \d+"/, k);
    assert.ok(svg.endsWith('</svg>'), k);
    assert.ok(!/NaN|undefined|Infinity/.test(svg), k + ' has NaN/undefined');
    assert.match(svg, /<title>/, k);
  }
  assert.match(figs.fig2, /Violations per site \(mean\)/);
  assert.match(figs.fig5, /WCAG violations fixed/);
  assert.match(figs.fig5, /Usability delta/);
  assert.match(figs.fig4, /Nielsen heuristic/);
  assert.match(figs.fig3, /Mean judge rank/);
});

test('charts: empty and null data never throw or print NaN', () => {
  for (const svg of [C.fig2Svg([], 'wcag'), C.fig3Svg([]), C.fig3Svg(undefined), C.fig4Svg({}), C.fig4Svg(undefined), C.fig5Svg([]), C.sparkSvg([], 'x', 'y'),
    C.fig2Svg([{ arm: 'A1', condition: 'wcag', before_mean: null, after_mean: null, n: 0, sites: [] }], 'wcag'),
    C.fig5Svg([{ site: 's', arm: 'A1', generator_group: 'x', condition: 'wcag', wcag_gain: null, usability_delta: null }])]) {
    assert.ok(!/NaN|undefined/.test(svg));
  }
});

test('hostile strings are escaped in chart renderers', () => {
  const svgs = [
    C.fig2Svg([{ arm: EVIL, condition: 'wcag', before_mean: 2, after_mean: 1, n: 3, sites: [] }], 'wcag'),
    C.fig3Svg([{ arm: EVIL, condition: EVIL, mean_rank: 2, n: 1 }]),
    C.fig4Svg({ criteria: [EVIL], heuristics: [EVIL], cells: [[1]], basis: EVIL }),
    C.fig5Svg([{ site: EVIL, arm: EVIL, generator_group: EVIL, condition: EVIL, wcag_gain: 1, usability_delta: 1 }]),
    C.sparkSvg([{ cum_cost_usd: 1 }, { cum_cost_usd: 2 }], 'cum_cost_usd', EVIL)
  ];
  for (const s of svgs) { assert.ok(!s.includes('<script>'), 'raw <script> leaked'); assert.ok(!s.includes('alert("x")'), 'raw quote leaked'); }
});

function evilState() {
  const s = JSON.parse(JSON.stringify(state));
  s.arms[0].label = EVIL; s.arms[0].model_id = EVIL; s.arms[0].blockers = [EVIL];
  s.warnings = [EVIL]; s.keys.openai = { set: true, last4: EVIL, source: EVIL };
  s.workers[0].id = EVIL; s.pricing[EVIL] = { input_per_mtok: 1, output_per_mtok: 2, verified: false };
  s.intake.sources[0].id = EVIL; s.projection.by_arm[0].arm = EVIL; s.projection.by_arm[0].basis = EVIL;
  s.imports = [{ ts: EVIL, arms: [EVIL], cells: 1, rejected: 0 }]; s.settings.judge_model_id = EVIL; s.settings.sites = [EVIL];
  s.matrix.A1 = { [EVIL]: 'o'.repeat(60) };
  return s;
}
function evilResults() {
  const r = JSON.parse(JSON.stringify(results));
  r.gate.note = EVIL; r.notes = [EVIL]; r.fig6[0].site = EVIL; r.fig6[0].arm = EVIL; r.fig6[0].worst_heuristic = EVIL;
  r.fig6[0].before_url = EVIL; r.fig6[0].after_url = EVIL; r.headline.top_conflict = { criterion: EVIL, heuristic: EVIL, count: 1 };
  r.loop[0].arm = EVIL; r.fig2[0].arm = EVIL; r.fig4.criteria[0] = EVIL;
  return r;
}

test('hostile strings are escaped in every view renderer', () => {
  const S = evilState(), R = evilResults();
  const ui = { cond: 'wcag', open: { fig2: true }, viewer: { site: EVIL, arm: EVIL, condition: EVIL, before_url: EVIL, after_url: EVIL }, busy: false,
    blockers: { title: EVIL, list: [EVIL], canForce: true }, imp: { file: { name: EVIL, size: 1 }, error: EVIL, result: { imported_cells: 1, rejected: [{ line: EVIL, reason: EVIL }] } } };
  for (const [name, view] of Object.entries(App.views)) {
    const html = view(S, R, ui).map((s) => s.html).join('\n');
    assert.ok(html.length > 100, name + ' rendered');
    assert.ok(!html.includes('<script>'), name + ' leaked raw <script>');
    assert.ok(!html.includes('alert("x")'), name + ' leaked a raw quote');
    assert.ok(!/NaN|undefined/.test(html), name + ' printed NaN/undefined');
  }
});

test('views render every demo section with unique ids, and survive missing results', () => {
  for (const [name, view] of Object.entries(App.views)) {
    const secs = view(state, results, { cond: 'wcag', open: {}, imp: {} });
    const ids = secs.map((s) => s.id);
    assert.strictEqual(new Set(ids).size, ids.length, name + ' duplicate section ids');
    assert.ok(!/NaN|undefined/.test(secs.map((s) => s.html).join('')), name);
  }
  const empty = App.views.results(state, null, {});
  assert.match(empty[0].html, /No results loaded yet/);
  assert.doesNotThrow(() => App.views.overview(state, null, {}));
});

test('results view: ceiling banner, fig 3 note, export controls, sandboxed viewer', () => {
  const html = App.views.results(state, results, { cond: 'wcag', open: {}, viewer: results.fig6[0] }).map((s) => s.html).join('\n');
  assert.match(html, /Ceiling check/);
  assert.match(html, /five blinded variants/);
  assert.match(html, /data-action="export-all"/);
  for (const n of ['fig2_violations', 'fig3_judge_ranks', 'fig4_conflict_heatmap', 'fig5_gain_vs_usability', 'fig6_broke_usability', 'loop_behavior']) assert.ok(html.includes(`/api/export/${n}.csv`), n);
  assert.strictEqual((html.match(/data-action="dl-png"/g) || []).length, 4);
  assert.strictEqual((html.match(/<iframe sandbox /g) || []).length, 2, 'two sandboxed iframes without allow-scripts');
  assert.ok(!/sandbox="[^"]*allow-scripts/.test(html));
});

test('keys view never renders a key value and offers a slot per provider and per open arm', () => {
  const html = App.views.keys(state).map((s) => s.html).join('\n');
  const open = state.arms.filter((a) => a.kind === 'open_source');
  assert.strictEqual((html.match(/data-form="key"/g) || []).length, 3 + open.length);
  assert.strictEqual((html.match(/type="password"/g) || []).length, 3 + open.length);
  for (const a of open) assert.ok(html.includes('data-provider="' + a.id.toLowerCase() + '"'));
  assert.match(html, /A7 .*GLM/);
  for (const slot of Object.keys(state.keys)) {
    assert.match(html, new RegExp('data-provider="' + slot + '"'), slot + ' has its own key card');
  }
  assert.ok(!/<input[^>]*type="password"[^>]*value=/.test(html), 'password inputs carry no value');
  assert.ok(!/gemini<\/option>/.test(html), 'gemini is not an arm provider option');
  assert.match(html, /Unverified placeholder/);
});

// What the user hit: the stepper read "Done" for repair and score while cells were failed or unscored.
test('a phase is Done only when every cell produced output', () => {
  const cells = (o) => Object.assign({ total: 10, queued: 0, running: 0, ok: 0, failed: 0, truncated: 0, imported: 0, converged: 0 }, o);
  const base = {
    run: { phase: 'running', kind: 'repair' }, human: { items: 0 },
    judge: { ready: true, items: { total: 0, done: 0, failed: 0 } },
    arms: [
      { id: 'A1', kind: 'mainstream', ready: true, blockers: [], cells: cells({ ok: 10 }) },
      { id: 'A5', kind: 'open_source', ready: true, blockers: [], cells: cells({ imported: 10 }) },
    ],
  };
  const stepOf = (S, R, name) => App.steps(S, R).find((x) => x.name === name);
  const full = { coverage: { variants_scored: 20, variants_expected: 20, judge_items_expected: 2 } };
  assert.strictEqual(stepOf(base, full, 'Repair').state[1], 'Done');

  // one failed cell: finished, but not done
  const withFail = { ...base, arms: [{ ...base.arms[0], cells: cells({ ok: 9, failed: 1 }) }, base.arms[1]] };
  const rep = stepOf(withFail, full, 'Repair');
  assert.strictEqual(rep.done, 9);
  assert.strictEqual(rep.bad, 1);
  assert.strictEqual(rep.state[0], 'attn');
  assert.strictEqual(rep.state[1], '1 failed');

  // a truncated cell counts the same way
  const withTrunc = { ...base, arms: [{ ...base.arms[0], cells: cells({ ok: 9, truncated: 1 }) }, base.arms[1]] };
  assert.strictEqual(stepOf(withTrunc, full, 'Repair').state[0], 'attn');

  // score cannot be Done while variants are unscored, even if some are
  const partial = { coverage: { variants_scored: 12, variants_expected: 20, judge_items_expected: 2 } };
  assert.strictEqual(stepOf(base, partial, 'Score').state[1], 'In progress');

  // the judge total comes from coverage, not from the few items queued so far
  const judgeStarted = { ...base, run: { phase: 'running', kind: 'judge' }, judge: { ready: true, items: { total: 2, done: 2, failed: 0 } } };
  const jud = stepOf(judgeStarted, { coverage: { variants_scored: 20, variants_expected: 20, judge_items_expected: 120 } }, 'Judge (Gemini)');
  assert.strictEqual(jud.total, 120);
  assert.notStrictEqual(jud.state[1], 'Done');

  // dispatched open arms count as done, not only imported ones
  const dispatched = { ...base, arms: [base.arms[0], { ...base.arms[1], cells: cells({ ok: 6, imported: 4 }) }] };
  assert.strictEqual(stepOf(dispatched, full, 'Open-source arms (A5)').state[1], 'Done');

  const live = { ...base, settings: { dispatch_open: false }, pipeline: {
    mock: true, repair: { done: 0, total: 40 }, open: { done: 2, total: 40 }, score: { done: 1, total: 90 }, judge: { done: 0, total: 20 },
  } };
  assert.strictEqual(stepOf(live, full, 'Setup').state[1], 'Mock mode');
  assert.notStrictEqual(stepOf(live, full, 'Repair').state[1], 'Done');
  assert.strictEqual(stepOf(live, full, 'Score').total, 90);
});

test('runs view: cells carry the machine that ran them, as colour and as text', () => {
  const html = App.matrixGrid(state, 'A1');
  const m = state.machines[0];
  assert.match(html, /--machine:hsl\(/, 'the machine is a colour variable, not the only cue');
  assert.ok(html.includes(', ran by ' + m.id), 'the machine is in the cell text alternative');
  assert.ok(html.includes('\u00b7 ' + m.id) || html.includes('· ' + m.id), 'and in the cell title');
  const runsHtml = App.views.runs(state).map((s) => s.html).join('\n');
  assert.match(runsHtml, /class="mswatch"/, 'the Runs view has a machine legend');
  assert.ok(runsHtml.includes(m.id));
});

test('cost view attributes spend to machines and to separate keys', () => {
  const html = App.views.cost(state).map((s) => s.html).join('\n');
  for (const m of state.machines) assert.ok(html.includes(m.id), 'machine ' + m.id + ' is listed');
  // A5 and A6 spend is attributed to their own keys, never pooled
  assert.ok(html.includes('a5:ds01'));
  assert.ok(html.includes('local:demo-laptop-2'));
  assert.match(html, /Contribution by machine/);
  assert.match(html, /Spend by API key/);
});

test('runs view: one grid cell per arm x condition x site, with text alternatives', () => {
  const html = App.matrixGrid(state, 'A1');
  assert.strictEqual((html.match(/class="cell /g) || []).length, 4 * 60);
  assert.match(html, /title="A1 naive UNI-01: /);
  assert.match(html, /<span class="sr">/);
});

test('static pages: landmarks, language, no external origins', () => {
  for (const f of ['index.html', 'login.html']) {
    const h = fs.readFileSync(pub(f), 'utf8');
    assert.match(h, /<html lang="en">/); assert.match(h, /<main/); assert.match(h, /<h1/);
    assert.ok(!/https?:\/\//.test(h), f + ' references an external origin');
  }
  const idx = fs.readFileSync(pub('index.html'), 'utf8');
  assert.match(idx, /<header/); assert.match(idx, /<nav[^>]*aria-label/); assert.match(idx, /class="skip"/);
  for (const f of ['app.js', 'charts.js', 'style.css']) assert.ok(!/https?:\/\/(?!www\.w3\.org)/.test(fs.readFileSync(pub(f), 'utf8')), f + ' external URL');
});

test('charts: dark cards on screen, light for export, and the theme never leaks', () => {
  const light = C.fig2Svg(results.fig2, 'wcag');
  const dark = C.fig2Svg(results.fig2, 'wcag', 'dark');
  assert.match(light, /<rect width="\d+" height="\d+" fill="#ffffff"\/>/);
  assert.match(dark, /<rect width="\d+" height="\d+" fill="#0e1014"\/>/);
  assert.ok(!/#ffffff|#1a1a1a/.test(dark), 'dark figure carries no light-theme colours');
  assert.strictEqual(C.fig2Svg(results.fig2, 'wcag'), light, 'default stays light after a dark render');
  assert.strictEqual(C.heatColor(0), '#ffffff', 'default heat ramp stays light');
  for (const svg of [C.fig3Svg(results.fig3, 'dark'), C.fig4Svg(results.fig4, 'dark'), C.fig5Svg(results.fig5, 'dark'), C.sparkSvg(state.intake.series, 'cum_cost_usd', 'Cost', 'dark')]) {
    assert.ok(!/NaN|undefined|Infinity/.test(svg));
  }
  const idx = fs.readFileSync(pub('index.html'), 'utf8');
  assert.match(idx, /vendor\/gsap\.min\.js/); assert.match(idx, /intro\.js/);
});

test('runs view lists every computer by its reported name, escaped, with a summary and stop/dispatch controls', () => {
  const evil = '<img src=x onerror=alert(1)>';
  const devices = Array.from({ length: 12 }, (_, i) => ({ key: '100.64.0.' + i, label: i === 0 ? evil : 'Lab PC ' + i, os: 'Windows x64', online: i % 2 === 0, last_seen: Date.now() - 3600000,
    tailnet: { node: 'n' + i + '.ts.net', ip: '100.64.0.' + i, user: 'u' }, conflict: i === 3, launcher: i === 1 ? { online: true } : null,
    workers: [{ id: '100.64.0.' + i, online: i % 2 === 0, arcs: [], running: 0 }] }));
  const st = { ...state, devices, history_machines: ['legacy-1'], computers: { total: 12, online: 6 }, machines_omitted: 3, now: Date.now(),
    live_jobs: { counts: { queued: 1, running: 1, done: 0, failed: 0 }, idle: [{ arm: 'A1', reason: 'not queued yet in this scope' }],
      queue: [{ kind: 'repair', arm: 'A2', jobs: [['UNI-01', 'naive']], ids: ['repair:A2:naive:UNI-01'], reserved: {}, eligible: {} }],
      jobs: [{ id: 'repair:A1:naive:UNI-01', kind: 'repair', arm: 'A1', condition: 'naive', site: 'UNI-01', state: 'running', worker: 'w', stopping: false }] } };
  const html = App.views.runs(st).map((s) => s.html).join('\n');
  assert.ok(!html.includes(evil), 'a hostile name is escaped');
  assert.match(html, /12 computers known, 6 online/);
  for (let i = 1; i < 12; i++) assert.ok(html.includes('Lab PC ' + i), 'Lab PC ' + i);
  assert.match(html, /Two computers share this id/);
  assert.match(html, /legacy-1/);
  assert.match(html, /3 more computers are not tinted/);
  assert.match(html, /data-action="stop-job" data-id="repair:A1:naive:UNI-01"/);
  assert.match(html, /data-action="dispatch"[^>]*data-arm="A2"/);
  assert.match(html, /not queued yet in this scope/);
});
