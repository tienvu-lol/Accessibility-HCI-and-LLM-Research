'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const results = require('../lib/results');
const { toCsv } = require('../lib/export');

const MET_COLS = 'site_id,category,generator_group,arm,condition,iteration,page,breakpoint,axe_violations,axe_passes,axe_incomplete,violation_rate,status';
const metRow = (site, arm, cond, it, page, bp, v, rate = 0.1) =>
  [site, 'company', 'claude', arm, cond, it, page, bp, v, 10, 0, rate, 'ok'].join(',');

function write(root, rel, text) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text);
}
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'results-test-'));
const jl = (a) => a.map((o) => JSON.stringify(o)).join('\n') + '\n';
const status = (n, extra) => JSON.stringify({ status: 'ok', iteration: n, converged: false, usage: { input: 0, output: 0 }, ...extra });
const judgeRows = (rows) => 'site_id,arm,question,condition,rank,judge_model,call_id\n' +
  rows.map(([s, a, q, c, r]) => [s, a, q, c, r, 'm', 'c1'].join(',')).join('\n') + '\n';

// Hand-computable tree: sites S1,S2; arm A1; conditions naive,wcag.
function smallTree() {
  const root = tmp();
  write(root, 'metrics/metrics.csv', [MET_COLS,
    metRow('S1', 'baseline', 'baseline', 0, 'index.html', 1280, 10, 0.1),
    metRow('S1', 'baseline', 'baseline', 0, 'a.html', 1280, 6, 0.3),
    metRow('S1', 'baseline', 'baseline', 0, 'index.html', 375, 99),
    metRow('S2', 'baseline', 'baseline', 0, 'index.html', 1280, 4, 0.2),
    metRow('S1', 'A1', 'wcag', 1, 'index.html', 1280, 5), metRow('S1', 'A1', 'wcag', 1, 'a.html', 1280, 5),
    metRow('S1', 'A1', 'wcag', 2, 'index.html', 1280, 2), metRow('S1', 'A1', 'wcag', 2, 'a.html', 1280, 2),
    metRow('S2', 'A1', 'wcag', 1, 'index.html', 1280, 6),
    metRow('S1', 'A1', 'naive', 1, 'index.html', 1280, 7), metRow('S1', 'A1', 'naive', 1, 'a.html', 1280, 7),
    metRow('S2', 'A1', 'naive', 1, 'index.html', 1280, 4),
    metRow('S9', 'A1', 'wcag', 1, 'index.html', 1280, 1), // unplanned site
  ].join('\n') + '\n');
  const rule = (id, nodes) => ({ id, impact: 'serious', tags: [], nodes });
  const rr = (arm, cond, it, rules) => ({ site_id: 'S1', arm, condition: cond, iteration: it, page: 'index.html', breakpoint: 1280, rules });
  write(root, 'metrics/axe_rules.jsonl', jl([
    rr('baseline', 'baseline', 0, [rule('color-contrast', 4), rule('image-alt', 2)]),
    rr('A1', 'wcag', 1, [rule('color-contrast', 2), rule('image-alt', 2), rule('label', 1)]),
    rr('A1', 'wcag', 2, [rule('image-alt', 1)]),
  ]) + '{"site_id":"S1","arm":"A1","condi'); // trailing partial line
  write(root, 'verdicts/judge_rankings.csv', judgeRows([
    ['S1', 'A1', 'h1_visibility_of_status', 'naive', 1], ['S1', 'A1', 'h1_visibility_of_status', 'wcag', 3],
    ['S1', 'A1', 'h2_match_real_world', 'naive', 2], ['S1', 'A1', 'h2_match_real_world', 'wcag', 1],
    ['S2', 'A1', 'h1_visibility_of_status', 'naive', 1], ['S2', 'A1', 'h1_visibility_of_status', 'wcag', 1],
    ['S1', 'A1', 'h1_visibility_of_status', 'baseline', 1], ['S1', 'A1', 'h2_match_real_world', 'baseline', 2],
    ['S2', 'A1', 'h1_visibility_of_status', 'baseline', 1],
  ]));
  const cell = 'runs/A1/wcag/';
  write(root, cell + 'S1/iter1/status.json', status(1, { usage: { input: 100, output: 50 } }));
  write(root, cell + 'S1/iter1/index.html', 'a\nb\nc\nd');
  write(root, cell + 'S1/iter2/status.json', status(2, { converged: true, usage: { input: 10, output: 5 } }));
  write(root, cell + 'S1/iter2/index.html', 'a\nb\nc\nX');
  write(root, cell + 'S2/iter1/status.json', JSON.stringify({ status: 'failed', reason: 'truncated: short', usage: { input: 20, output: 0 } }));
  write(root, 'runs/A1/naive/S1/iter1/status.json', status(1)); // still running
  write(root, 'usage.jsonl', jl([
    { ts: 1, source: 'A1', arm: 'A1', kind: 'repair', input: 1000000, output: 500000, calls: 2 },
    { ts: 2, source: 'A1', arm: 'A1', kind: 'repair', input: 1000000, output: 0, calls: 1 },
    { ts: 3, source: 'judge', kind: 'judge', input: 10, output: 5, calls: 1 },
  ]) + '{"ts":4,"sou');
  return root;
}
const OPTS = { sites: ['S1', 'S2'], conditions: ['naive', 'wcag'], arms: ['A1'] };
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} !== ${b}`);

test('results.build: coverage, gate, fig2', () => {
  const r = results.build(smallTree(), OPTS);
  assert.deepEqual(r.coverage, { variants_expected: 4, variants_scored: 4, baselines_scored: 2, judge_items_done: 2, judge_items_expected: 2, human_raters: 0, human_items_complete: 0 });
  close(r.gate.median_baseline_violation_rate, (0.2 + 0.2) / 2); // S1 mean(.1,.3)=.2, S2 .2
  assert.equal(r.gate.sites_zero_axe, 0);
  assert.equal(r.gate.warn, false);
  const wcag = r.fig2.find((c) => c.condition === 'wcag');
  assert.deepEqual([wcag.before_mean, wcag.after_mean, wcag.n], [6, 4, 2]); // S1 8->2, S2 4->6
  assert.deepEqual(wcag.sites, [{ site: 'S1', before: 8, after: 2 }, { site: 'S2', before: 4, after: 6 }]);
  const naive = r.fig2.find((c) => c.condition === 'naive');
  assert.deepEqual([naive.before_mean, naive.after_mean], [6, 5.5]);
});

test('results.build: fig3, fig5, fig6, fig4, headline', () => {
  const r = results.build(smallTree(), OPTS);
  const f3 = Object.fromEntries(r.fig3.map((c) => [c.condition, c]));
  close(f3.naive.mean_rank, 4 / 3); close(f3.wcag.mean_rank, 5 / 3);
  close(f3.baseline.mean_rank, 4 / 3); // baseline is a judged condition row
  assert.equal(f3.wcag.n, 2);
  const f5 = (s, c) => r.fig5.find((x) => x.site === s && x.condition === c);
  assert.deepEqual(f5('S1', 'wcag'), { site: 'S1', arm: 'A1', generator_group: 'claude', condition: 'wcag', wcag_gain: 6, usability_delta: -0.5 });
  assert.equal(f5('S2', 'wcag').wcag_gain, -2);
  assert.equal(f5('S2', 'wcag').usability_delta, 0);
  assert.equal(f5('S1', 'naive').wcag_gain, 1);
  assert.equal(f5('S1', 'naive').usability_delta, 0);
  assert.deepEqual(r.fig6, [{
    site: 'S1', arm: 'A1', condition: 'wcag', wcag_gain: 6, worst_heuristic: 'h1_visibility_of_status', worst_delta: -2,
    before_url: '/api/variant/baseline/baseline/S1/0/index.html', after_url: '/api/variant/A1/wcag/S1/2/index.html',
  }]);
  assert.deepEqual(r.fig4.criteria, ['color-contrast', 'image-alt']);
  assert.equal(r.fig4.heuristics.length, 10);
  assert.deepEqual(r.fig4.cells.map((row) => row.reduce((a, b) => a + b, 0)), [1, 1]);
  assert.equal(r.fig4.cells[0][0], 1);
  assert.deepEqual(r.headline, { pct_sites_gained_wcag_lost_nielsen: 50, n_sites: 2, top_conflict: { criterion: 'color-contrast', heuristic: 'h1_visibility_of_status', count: 1 } });
  assert.deepEqual(r.notes.filter((n) => /no baseline/.test(n)), []); // caveat removed: baseline is judged
});

test('results.build: loop behavior', () => {
  const r = results.build(smallTree(), OPTS);
  const w = r.loop.find((x) => x.condition === 'wcag');
  assert.deepEqual(w, {
    arm: 'A1', condition: 'wcag', sites: 2, mean_iterations: 1.5, pct_converged: 50, pct_hit_cap: 0, pct_failed: 50, pct_truncated: 50,
    mean_edit_ratio: 0.25, regressions_per_cell: 1, self_reported_tokens_in: 130, self_reported_tokens_out: 55,
  });
  const n = r.loop.find((x) => x.condition === 'naive');
  assert.equal(n.sites, 1); assert.equal(n.pct_converged, null); assert.equal(n.mean_iterations, null);
});

test('results.build: agreement (Cohen judge-vs-human, Fleiss across raters)', () => {
  const root = tmp();
  const Q = ['h1_visibility_of_status', 'h2_match_real_world', 'h3_user_control', 'h4_consistency', 'h5_error_prevention'];
  write(root, 'verdicts/judge_rankings.csv', judgeRows([
    ['S1', 'A1', Q[0], 'wcag', 1], ['S1', 'A1', Q[0], 'both', 2],
    ['S1', 'A1', Q[1], 'wcag', 2], ['S1', 'A1', Q[1], 'both', 1],
    ['S1', 'A1', Q[2], 'wcag', 1], ['S1', 'A1', Q[2], 'both', 1],
    ['S1', 'A1', Q[3], 'wcag', 1], ['S1', 'A1', Q[3], 'both', 3],
  ]));
  const v = [['wcag', 'wcag', 'wcag'], ['both', 'both', 'both'], ['tie', 'tie', 'tie'], ['wcag', 'wcag', 'wcag'], ['wcag', 'both', 'tie']];
  const lines = ['site_id,arm,question,rater_id,verdict,note,shown_left,shown_right,ts'];
  v.forEach((vs, i) => vs.forEach((x, j) => lines.push(`S1,A1,${Q[i]},r${j},${x},,wcag,both,0`)));
  write(root, 'human/human_ratings.csv', lines.join('\r\n') + '\r\n');
  const r = results.build(root, { sites: ['S1'], arms: ['A1'] });
  assert.deepEqual(r.agreement.judge_vs_human, { kappa: 1, n: 4 }); // h5 has no majority -> excluded
  assert.equal(r.agreement.human_fleiss.n_items, 5);
  assert.equal(r.agreement.human_fleiss.raters, 3);
  close(r.agreement.human_fleiss.kappa, 0.6875);
  assert.deepEqual(r.agreement.gate, { threshold: 0.4, pass: true });
  assert.equal(r.coverage.human_raters, 3);
  assert.equal(r.coverage.human_items_complete, 0); // 5 of 14 questions answered
});

test('missing files: well-formed empty structures, no NaN', () => {
  const root = tmp();
  for (const opts of [undefined, {}, OPTS]) {
    const r = results.build(root, opts);
    assert.deepEqual([r.fig2, r.fig3, r.fig5, r.fig6, r.loop], [[], [], [], [], []]);
    assert.deepEqual(r.fig4.cells, []);
    assert.equal(r.gate.median_baseline_violation_rate, null);
    assert.equal(r.gate.warn, false);
    assert.deepEqual(r.headline, { pct_sites_gained_wcag_lost_nielsen: null, n_sites: 0, top_conflict: null });
    assert.deepEqual(r.agreement, { judge_vs_human: null, human_fleiss: null, gate: { threshold: 0.4, pass: null } });
    assert.ok(Array.isArray(r.notes));
    assert.ok(!/NaN|Infinity/.test(JSON.stringify(r)));
  }
  const t = results.tables(root, {});
  assert.deepEqual(Object.keys(t), ['fig2_violations', 'fig3_judge_ranks', 'fig4_conflict_heatmap', 'fig5_gain_vs_usability', 'fig6_broke_usability',
    'loop_behavior', 'headline', 'agreement', 'metrics_all', 'judge_rankings', 'human_ratings', 'cost_by_source']);
  for (const x of Object.values(t)) { assert.ok(Array.isArray(x.columns)); assert.ok(Array.isArray(x.rows)); }
  assert.doesNotThrow(() => toCsv(t.headline));
});

test('empty and garbage inputs do not throw', () => {
  const root = tmp();
  write(root, 'metrics/metrics.csv', '');
  write(root, 'metrics/axe_rules.jsonl', '\n{not json\n');
  write(root, 'verdicts/judge_rankings.csv', 'site_id,arm\nS1\n"unterminated');
  write(root, 'runs/A1/wcag/S1/iter1/status.json', '{partial');
  assert.doesNotThrow(() => results.build(root, OPTS));
  assert.doesNotThrow(() => results.tables(root, OPTS));
});

test('tables: values, partial ledger line, cost_by_source with pricing', () => {
  const root = smallTree();
  const t = results.tables(root, { ...OPTS, pricing: { A1: { input_per_mtok: 2, output_per_mtok: 4 } } });
  assert.deepEqual(t.fig2_violations.rows[0], ['A1', 'naive', 'S1', 8, 7]);
  assert.deepEqual(t.fig6_broke_usability.rows.length, 1);
  assert.equal(t.fig4_conflict_heatmap.columns.length, 11);
  assert.deepEqual(t.cost_by_source.rows, [['A1', 2000000, 500000, 3, 6], ['judge', 10, 5, 1, null]]); // 2M*2 + 0.5M*4
  assert.equal(t.metrics_all.rows.length, 13);
  assert.equal(t.judge_rankings.rows.length, 9);
  assert.ok(toCsv(t.fig5_gain_vs_usability).startsWith('site,arm,generator_group,condition,wcag_gain,usability_delta\r\n'));
});

test('toCsv: quoting, CR, formula guard, null', () => {
  const csv = toCsv({
    columns: ['a', 'b'],
    rows: [['x,y', 'say "hi"'], ['line1\nline2', 'cr\rhere'], ['=SUM(A1)', '+1+2'], ['-cmd', '@x'], [-5, '-5'], [null, undefined], [NaN, 0]],
  });
  assert.equal(csv, 'a,b\r\n"x,y","say ""hi"""\r\n"line1\nline2","cr\rhere"\r\n\'=SUM(A1),\'+1+2\r\n\'-cmd,\'@x\r\n-5,-5\r\n,\r\n,0\r\n');
  assert.equal(toCsv({ columns: ['k'], rows: [] }), 'k\r\n');
});

test('performance: 1,512 variants / ~13k metrics rows / 21k judge rows under 500 ms', () => {
  const root = tmp();
  const arms = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'], conds = ['naive', 'wcag', 'nielsen', 'both'];
  const sites = Array.from({ length: 63 }, (_, i) => 'S' + String(i).padStart(2, '0'));
  const met = [MET_COLS], rules = [], judge = [], H = results.HEURISTICS;
  for (const s of sites) {
    met.push(metRow(s, 'baseline', 'baseline', 0, 'index.html', 1280, 10), metRow(s, 'baseline', 'baseline', 0, 'index.html', 375, 10));
    rules.push({ site_id: s, arm: 'baseline', condition: 'baseline', iteration: 0, page: 'index.html', breakpoint: 1280, rules: [{ id: 'color-contrast', nodes: 3 }] });
    for (const a of arms) for (const c of conds) {
      for (const it of [1, 2]) {
        for (const bp of [1280, 375]) met.push(metRow(s, a, c, it, 'index.html', bp, 3));
        write(root, `runs/${a}/${c}/${s}/iter${it}/status.json`, status(it, { converged: it === 2 }));
        write(root, `runs/${a}/${c}/${s}/iter${it}/index.html`, 'line\n'.repeat(50) + it);
      }
      rules.push({ site_id: s, arm: a, condition: c, iteration: 2, page: 'index.html', breakpoint: 1280, rules: [{ id: 'label', nodes: 1 }] });
      for (const [i, q] of results.HEURISTICS.entries()) judge.push([s, a, q, c, 1 + ((i + c.length) % 4)]);
      for (const q of ['alt_text', 'headings_labels', 'error_messages', 'content_order']) judge.push([s, a, q, c, 2]);
    }
  }
  write(root, 'metrics/metrics.csv', met.join('\n') + '\n');
  write(root, 'metrics/axe_rules.jsonl', jl(rules));
  write(root, 'verdicts/judge_rankings.csv', judgeRows(judge));
  // The first call fills the (mtime,size) file cache (cold run is bounded by disk speed: ~1 ms per file read on
  // AV-scanned Windows); the server polls every 3 s, so the budget applies to the warm call.
  const cold0 = Date.now();
  results.build(root, { sites });
  const coldMs = Date.now() - cold0;
  const t0 = process.hrtime.bigint();
  const r = results.build(root, { sites });
  const ms = Number(process.hrtime.bigint() - t0) / 1e6;
  console.log(`# cold ${coldMs} ms, warm ${ms.toFixed(0)} ms`);
  assert.equal(r.coverage.variants_scored, 1512);
  assert.equal(r.fig2.length, 24);
  assert.equal(r.loop.length, 24);
  assert.ok(ms < 500, `warm build took ${ms.toFixed(0)} ms`);
});
