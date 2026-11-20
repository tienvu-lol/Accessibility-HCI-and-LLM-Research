/* Pure chart + CSV helpers. Browser: window.Charts. Node: module.exports (tests). No DOM needed except pngFromSvg. */
(function (root) {
  'use strict';

  var FONT = 'Atkinson Hyperlegible Next, Segoe UI, system-ui, Arial, sans-serif';
  // The published (export) palette: light, print-safe. Exported unchanged as ARM_COLORS / COND_COLORS.
  var ARM_COLORS = { A1: '#861F41', A2: '#E5751F', A3: '#1a1a1a', A4: '#6b6b6b', A5: '#1F6F78', A6: '#3F5FA8', A7: '#7A4EA3' };
  var COND_COLORS = { naive: '#6b6b6b', wcag: '#E5751F', nielsen: '#1F6F78', both: '#861F41', baseline: '#111111' };
  var THEMES = {
    light: { ink: '#1a1a1a', muted: '#595959', grid: '#d9d6d2', bg: '#ffffff', edge: '#ffffff', arm: ARM_COLORS, cond: COND_COLORS, before: '#8a8a8a', after: '#861F41', group: '#444444', heatA: [255, 255, 255], heatB: [134, 31, 65], spark: '#861F41' },
    // On-screen console cards: the same chart on the dark surface. Every mark is at least 3:1 against #0e1014.
    dark: { ink: '#f7f8f8', muted: '#9e9f9f', grid: '#2a2c30', bg: '#0e1014', edge: '#0e1014',
      arm: { A1: '#ee8aa8', A2: '#ff7a2e', A3: '#f7f8f8', A4: '#9e9f9f', A5: '#4cc3d0', A6: '#7b9be0', A7: '#c39be8' },
      cond: { naive: '#9e9f9f', wcag: '#ff7a2e', nielsen: '#4cc3d0', both: '#ee8aa8', baseline: '#f7f8f8' },
      before: '#7c7d7d', after: '#ee8aa8', group: '#c8c9c9', heatA: [23, 23, 24], heatB: [208, 85, 127], spark: '#ee8aa8' }
  };
  var INK, MUTED, GRID, BG, EDGE, ARM, COND, BEFORE, AFTER, GROUP, HEAT_A, HEAT_B, SPARK;
  function use(name) {
    var th = THEMES[name] || THEMES.light;
    INK = th.ink; MUTED = th.muted; GRID = th.grid; BG = th.bg; EDGE = th.edge; ARM = th.arm; COND = th.cond;
    BEFORE = th.before; AFTER = th.after; GROUP = th.group; HEAT_A = th.heatA; HEAT_B = th.heatB; SPARK = th.spark;
  }
  // Charts are built synchronously, so a scoped swap is safe; the default stays light so exports never change.
  function themed(name, fn) { use(name); try { return fn(); } finally { use('light'); } }
  use('light');
  var COND_ORDER = ['naive', 'wcag', 'nielsen', 'both', 'baseline'];
  var GROUP_SHAPES = { claude: 'circle', codex: 'square', 'open-source': 'triangle' };
  var COND_SHAPES = { naive: 'circle', wcag: 'square', nielsen: 'triangle', both: 'diamond', baseline: 'circle' };

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function csvEscape(v) {
    if (v == null) return '';
    var s = String(v);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function toCsv(columns, rows) {
    var lines = [columns.map(csvEscape).join(',')];
    rows.forEach(function (r) { lines.push(r.map(csvEscape).join(',')); });
    return lines.join('\r\n') + '\r\n';
  }

  function num(v, digits) {
    if (v == null || typeof v !== 'number' || !isFinite(v)) return 'n/a';
    return v.toFixed(digits == null ? 2 : digits);
  }

  function round(n) { return Math.round(n * 100) / 100; }

  function linear(d0, d1, r0, r1) {
    var span = d1 - d0;
    return function (v) { return span === 0 ? (r0 + r1) / 2 : r0 + ((v - d0) / span) * (r1 - r0); };
  }

  // Nice 1/2/5 ticks covering [min,max]; returns {min,max,ticks}.
  function niceTicks(min, max, count) {
    count = count || 5;
    if (!isFinite(min) || !isFinite(max)) { min = 0; max = 1; }
    if (min === max) { max = min + 1; }
    var raw = (max - min) / count;
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var f = raw / mag;
    var step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * mag;
    var lo = Math.floor(min / step) * step;
    var hi = Math.ceil(max / step) * step;
    var ticks = [];
    for (var t = lo; t <= hi + step / 2; t += step) ticks.push(Math.round(t / step) * step);
    return { min: lo, max: hi, ticks: ticks.map(function (t) { return +t.toPrecision(12); }) };
  }

  function linePath(points) {
    return points.map(function (p, i) { return (i ? 'L' : 'M') + round(p[0]) + ',' + round(p[1]); }).join(' ');
  }

  function textOn(hex) {
    var h = hex.replace('#', '');
    var c = [0, 2, 4].map(function (i) {
      var v = parseInt(h.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.35 ? '#000000' : '#ffffff';
  }

  // White -> maroon ramp, t in [0,1].
  function heatColor(t) {
    t = Math.max(0, Math.min(1, t));
    var a = HEAT_A, b = HEAT_B;
    var c = a.map(function (v, i) { return Math.round(v + (b[i] - v) * t); });
    return '#' + c.map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join('');
  }

  function t(x, y, s, o) {
    o = o || {};
    return '<text x="' + round(x) + '" y="' + round(y) + '" font-family="' + FONT + '" font-size="' + (o.size || 12) +
      '" fill="' + (o.fill || INK) + '"' + (o.anchor ? ' text-anchor="' + o.anchor + '"' : '') +
      (o.weight ? ' font-weight="' + o.weight + '"' : '') +
      (o.rotate ? ' transform="rotate(' + o.rotate + ' ' + round(x) + ' ' + round(y) + ')"' : '') + '>' + esc(s) + '</text>';
  }

  function marker(shape, cx, cy, r, fill, extra) {
    extra = extra || '';
    if (shape === 'square') return '<rect x="' + round(cx - r) + '" y="' + round(cy - r) + '" width="' + 2 * r + '" height="' + 2 * r + '" fill="' + fill + '" ' + extra + '/>';
    if (shape === 'triangle') return '<path d="M' + round(cx) + ',' + round(cy - r * 1.2) + ' L' + round(cx + r * 1.1) + ',' + round(cy + r * 0.9) + ' L' + round(cx - r * 1.1) + ',' + round(cy + r * 0.9) + ' Z" fill="' + fill + '" ' + extra + '/>';
    if (shape === 'diamond') return '<path d="M' + round(cx) + ',' + round(cy - r * 1.3) + ' L' + round(cx + r * 1.3) + ',' + round(cy) + ' L' + round(cx) + ',' + round(cy + r * 1.3) + ' L' + round(cx - r * 1.3) + ',' + round(cy) + ' Z" fill="' + fill + '" ' + extra + '/>';
    return '<circle cx="' + round(cx) + '" cy="' + round(cy) + '" r="' + r + '" fill="' + fill + '" ' + extra + '/>';
  }

  function wrap(w, h, title, desc, inner) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h +
      '" role="img" aria-label="' + esc(title) + '"><title>' + esc(title) + '</title><desc>' + esc(desc) + '</desc>' +
      '<rect width="' + w + '" height="' + h + '" fill="' + BG + '"/>' + inner + '</svg>';
  }

  function header(w, title, subtitle) {
    return t(16, 24, title, { size: 15, weight: 700 }) + (subtitle ? t(16, 42, subtitle, { size: 11.5, fill: MUTED }) : '');
  }

  function yAxis(box, ticks, ymap, label, fmt) {
    var s = '';
    ticks.forEach(function (v) {
      var y = ymap(v);
      s += '<line x1="' + box.l + '" x2="' + box.r + '" y1="' + round(y) + '" y2="' + round(y) + '" stroke="' + GRID + '"/>' +
        t(box.l - 6, y + 4, fmt ? fmt(v) : v, { anchor: 'end', size: 11, fill: MUTED });
    });
    s += t(14, (box.t + box.b) / 2, label, { anchor: 'middle', size: 11.5, fill: INK, rotate: -90 });
    return s;
  }

  function legend(items, x, y) {
    var s = '', cx = x;
    items.forEach(function (it) {
      s += marker(it.shape || 'square', cx + 6, y - 4, 5, it.color) + t(cx + 16, y, it.label, { size: 11.5 });
      cx += 24 + it.label.length * 6.4;
    });
    return s;
  }

  function armsIn(rows) {
    var seen = {};
    rows.forEach(function (r) { seen[r.arm] = 1; });
    return Object.keys(seen).sort();
  }

  /* Fig 2: grouped bars, before vs after per arm, one condition. */
  function fig2Build(fig2, condition) {
    var rows = (fig2 || []).filter(function (r) { return r.condition === condition; });
    var arms = rows.map(function (r) { return r.arm; }).sort();
    var W = 760, H = 380, box = { l: 62, r: W - 20, t: 78, b: H - 52 };
    var title = 'Fig 2. WCAG violations per site, baseline vs after repair (' + condition + ' prompt)';
    var max = 0;
    rows.forEach(function (r) { max = Math.max(max, r.before_mean || 0, r.after_mean || 0); });
    var ax = niceTicks(0, max || 1, 5);
    var ymap = linear(ax.min, ax.max, box.b, box.t);
    var s = header(W, title, 'Mean axe violations per site at 1280 px. Lower is better.') + yAxis(box, ax.ticks, ymap, 'Violations per site (mean)');
    s += legend([{ label: 'Baseline (before)', color: BEFORE }, { label: 'After repair', color: AFTER }], box.l, 64);
    var band = (box.r - box.l) / Math.max(arms.length, 1), bw = Math.min(40, band / 3);
    rows.sort(function (a, b) { return a.arm < b.arm ? -1 : 1; }).forEach(function (r, i) {
      var cx = box.l + band * (i + 0.5);
      [['before_mean', BEFORE, -bw - 2], ['after_mean', AFTER, 2]].forEach(function (k) {
        var v = r[k[0]];
        if (v == null) return;
        var y = ymap(v);
        s += '<rect x="' + round(cx + k[2]) + '" y="' + round(y) + '" width="' + bw + '" height="' + round(box.b - y) + '" fill="' + k[1] + '"/>' +
          t(cx + k[2] + bw / 2, y - 4, num(v, 1), { anchor: 'middle', size: 11 });
      });
      s += t(cx, box.b + 18, r.arm, { anchor: 'middle', size: 12, weight: 600 }) + t(cx, box.b + 33, 'n=' + r.n, { anchor: 'middle', size: 10.5, fill: MUTED });
    });
    s += '<line x1="' + box.l + '" x2="' + box.r + '" y1="' + box.b + '" y2="' + box.b + '" stroke="' + INK + '"/>' + t((box.l + box.r) / 2, H - 6, 'Repair arm (n = sites scored)', { anchor: 'middle', size: 11.5 });
    if (!rows.length) s += t((box.l + box.r) / 2, (box.t + box.b) / 2, 'No scored sites for this condition yet', { anchor: 'middle', size: 13, fill: MUTED });
    return wrap(W, H, title, 'Grouped bars per arm. ' + rows.map(function (r) { return r.arm + ' ' + num(r.before_mean, 1) + ' before, ' + num(r.after_mean, 1) + ' after'; }).join('; '), s);
  }

  function fig2Svg(fig2, condition, theme) { return themed(theme, function () { return fig2Build(fig2, condition); }); }
  function fig3Svg(fig3, theme) { return themed(theme, function () { return fig3Build(fig3); }); }
  function fig4Svg(fig4, theme) { return themed(theme, function () { return fig4Build(fig4); }); }
  function fig5Svg(fig5, theme) { return themed(theme, function () { return fig5Build(fig5); }); }
  function sparkSvg(series, field, label, theme) { return themed(theme, function () { return sparkBuild(series, field, label); }); }

  /* Fig 3: judge mean rank per condition per arm, dot plot (rank 1 = best, left). */
  function fig3Build(fig3) {
    var rows = fig3 || [], arms = armsIn(rows);
    var W = 760, H = 118 + arms.length * 46, box = { l: 70, r: W - 30, t: 96, b: H - 44 };
    var title = 'Fig 3. Judge mean rank by condition and arm';
    return fig3Draw(rows, arms, W, H, box, title, header(W, title, 'Rank 1 is best. Judge ranks five variants: four repaired conditions plus the baseline.'));
  }

  function fig3Draw(rows, arms, W, H, box, title, head) {
    var rowH = 46, xmap = linear(1, 5, box.l, box.r);
    var s = head + legend(COND_ORDER.map(function (c) { return { label: c, color: COND[c], shape: COND_SHAPES[c] }; }), box.l, 66);
    [1, 2, 3, 4, 5].forEach(function (v) {
      s += '<line x1="' + round(xmap(v)) + '" x2="' + round(xmap(v)) + '" y1="' + box.t + '" y2="' + box.b + '" stroke="' + GRID + '"/>' + t(xmap(v), box.b + 16, v, { anchor: 'middle', size: 11, fill: MUTED });
    });
    arms.forEach(function (a, i) {
      var cy = box.t + rowH * (i + 0.5);
      s += t(box.l - 10, cy + 4, a, { anchor: 'end', size: 12, weight: 600 }) + '<line x1="' + box.l + '" x2="' + box.r + '" y1="' + cy + '" y2="' + cy + '" stroke="' + GRID + '" stroke-dasharray="2 3"/>';
      rows.filter(function (r) { return r.arm === a && r.mean_rank != null; }).forEach(function (r) {
        var k = Math.max(0, COND_ORDER.indexOf(r.condition));
        s += marker(COND_SHAPES[r.condition] || 'circle', xmap(r.mean_rank), cy + (k - 2) * 7, 5, COND[r.condition] || INK, 'stroke="' + EDGE + '" stroke-width="1"');
      });
    });
    s += t((box.l + box.r) / 2, H - 6, 'Mean judge rank (1 = best, 4 = worst)', { anchor: 'middle', size: 11.5 });
    if (!arms.length) s += t((box.l + box.r) / 2, box.t + 30, 'No judge ranks yet', { anchor: 'middle', size: 13, fill: MUTED });
    return wrap(W, H, title, 'Dot plot of mean rank. ' + rows.map(function (r) { return r.arm + ' ' + r.condition + ' ' + num(r.mean_rank); }).join('; '), s);
  }

  /* Fig 4: WCAG criterion x Nielsen heuristic heatmap with counts printed in cells. */
  function fig4Build(fig4) {
    fig4 = fig4 || {};
    var crit = fig4.criteria || [], heur = fig4.heuristics || [], cells = fig4.cells || [];
    var cw = 54, ch = 24, left = 80, top = 96, W = left + cw * Math.max(heur.length, 1) + 24, H = top + ch * Math.max(crit.length, 1) + 64;
    W = Math.max(W, 560);
    var title = 'Fig 4. WCAG criteria improved vs Nielsen heuristics worse than baseline';
    var max = 0;
    cells.forEach(function (r) { r.forEach(function (v) { max = Math.max(max, v || 0); }); });
    var s = header(W, title, 'Count of site-variants. Darker = more conflicts; the number is printed in each cell.');
    heur.forEach(function (h, j) {
      var m = /^h(\d+)/.exec(h);
      s += t(left + cw * (j + 0.5), top - 8, m ? 'H' + m[1] : h, { anchor: 'middle', size: 11.5, weight: 600 });
    });
    s += t(left + (cw * heur.length) / 2, top - 28, 'Nielsen heuristic (H1 to H10)', { anchor: 'middle', size: 11.5 });
    crit.forEach(function (c, i) {
      s += t(left - 8, top + ch * (i + 0.5) + 4, c, { anchor: 'end', size: 11.5 });
      heur.forEach(function (h, j) {
        var v = (cells[i] || [])[j] || 0, fill = heatColor(max ? v / max : 0);
        s += '<rect x="' + (left + cw * j) + '" y="' + (top + ch * i) + '" width="' + cw + '" height="' + ch + '" fill="' + fill + '" stroke="' + EDGE + '"><title>' + esc('WCAG ' + c + ' x ' + h + ': ' + v) + '</title></rect>' +
          t(left + cw * (j + 0.5), top + ch * (i + 0.5) + 4, v, { anchor: 'middle', size: 11, fill: textOn(fill) });
      });
    });
    s += t(14, top + (ch * crit.length) / 2, 'WCAG success criterion', { anchor: 'middle', size: 11.5, rotate: -90 });
    s += t(16, H - 12, fig4.basis || '', { size: 10.5, fill: MUTED });
    if (!crit.length) s += t(left, top + 30, 'No conflicts computed yet', { size: 13, fill: MUTED });
    return wrap(W, H, title, 'Heatmap, ' + crit.length + ' criteria by ' + heur.length + ' heuristics; see the data table below for every count.', s);
  }

  /* Fig 5: scatter, WCAG gain vs usability delta; colour = arm, shape = generator group. */
  function fig5Build(fig5) {
    var pts = (fig5 || []).filter(function (p) { return p.wcag_gain != null && p.usability_delta != null; });
    var W = 760, H = 460, box = { l: 66, r: W - 24, t: 96, b: H - 56 };
    var title = 'Fig 5. WCAG gain vs usability change (per site-variant)';
    var xs = pts.map(function (p) { return p.wcag_gain; }), ys = pts.map(function (p) { return p.usability_delta; });
    var ax = niceTicks(Math.min.apply(null, xs.concat([0])), Math.max.apply(null, xs.concat([1])), 6);
    var ay = niceTicks(Math.min.apply(null, ys.concat([-0.5])), Math.max.apply(null, ys.concat([0.5])), 6);
    var xmap = linear(ax.min, ax.max, box.l, box.r), ymap = linear(ay.min, ay.max, box.b, box.t);
    var s = header(W, title, 'Gain = violations before minus after. Usability = mean rank gain over baseline; above 0 is better than the original page.');
    s += legend(armsIn(pts).map(function (a) { return { label: a, color: ARM[a] || INK, shape: 'square' }; }), box.l, 64);
    s += legend(Object.keys(GROUP_SHAPES).map(function (g) { return { label: g, color: GROUP, shape: GROUP_SHAPES[g] }; }), box.l, 82);
    s += yAxis(box, ay.ticks, ymap, 'Usability delta vs baseline');
    ax.ticks.forEach(function (v) { s += t(xmap(v), box.b + 16, v, { anchor: 'middle', size: 11, fill: MUTED }); });
    if (ay.min < 0 && ay.max > 0) s += '<line x1="' + box.l + '" x2="' + box.r + '" y1="' + round(ymap(0)) + '" y2="' + round(ymap(0)) + '" stroke="' + INK + '"/>';
    if (ax.min < 0 && ax.max > 0) s += '<line x1="' + round(xmap(0)) + '" x2="' + round(xmap(0)) + '" y1="' + box.t + '" y2="' + box.b + '" stroke="' + INK + '" stroke-dasharray="3 3"/>';
    pts.forEach(function (p) {
      s += marker(GROUP_SHAPES[p.generator_group] || 'circle', xmap(p.wcag_gain), ymap(p.usability_delta), 4, ARM[p.arm] || INK, 'fill-opacity="0.72" stroke="' + EDGE + '" stroke-width="0.8"');
    });
    s += '<line x1="' + box.l + '" x2="' + box.r + '" y1="' + box.b + '" y2="' + box.b + '" stroke="' + INK + '"/>' + t((box.l + box.r) / 2, H - 8, 'WCAG violations fixed (gain per site)', { anchor: 'middle', size: 11.5 });
    if (!pts.length) s += t((box.l + box.r) / 2, (box.t + box.b) / 2, 'No scored and judged site-variants yet', { anchor: 'middle', size: 13, fill: MUTED });
    return wrap(W, H, title, 'Scatter of ' + pts.length + ' site-variants; see the data table for values.', s);
  }

  function sparkBuild(series, field, label) {
    var pts = (series || []).filter(function (p) { return typeof p[field] === 'number'; });
    var W = 320, H = 64;
    if (pts.length < 2) return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(label) + ': not enough data"><title>' + esc(label) + ': not enough data</title></svg>';
    var max = Math.max.apply(null, pts.map(function (p) { return p[field]; }));
    var x = linear(0, pts.length - 1, 2, W - 2), y = linear(0, max || 1, H - 4, 4);
    var path = linePath(pts.map(function (p, i) { return [x(i), y(p[field])]; }));
    var first = pts[0][field], last = pts[pts.length - 1][field];
    var d = 'M' + round(x(0)) + ',' + (H - 2) + ' ' + path.replace(/^M/, 'L') + ' L' + round(x(pts.length - 1)) + ',' + (H - 2) + ' Z';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(label + ': from ' + num(first) + ' to ' + num(last) + ' over ' + pts.length + ' minutes') + '">' +
      '<title>' + esc(label) + '</title><path d="' + d + '" fill="' + SPARK + '" fill-opacity="0.12"/><path d="' + path + '" fill="none" stroke="' + SPARK + '" stroke-width="2"/></svg>';
  }

  /* Tables behind every chart: also the data-table alternative and the demo CSV source. */
  function tables(r) {
    r = r || {};
    var out = {};
    out.fig2_violations = { columns: ['arm', 'condition', 'before_mean', 'after_mean', 'n'], rows: (r.fig2 || []).map(function (x) { return [x.arm, x.condition, x.before_mean, x.after_mean, x.n]; }) };
    out.fig3_judge_ranks = { columns: ['arm', 'condition', 'mean_rank', 'n'], rows: (r.fig3 || []).map(function (x) { return [x.arm, x.condition, x.mean_rank, x.n]; }) };
    var f4 = r.fig4 || { criteria: [], heuristics: [], cells: [] };
    out.fig4_conflict_heatmap = { columns: ['criterion'].concat(f4.heuristics), rows: f4.criteria.map(function (c, i) { return [c].concat(f4.cells[i] || []); }) };
    out.fig5_gain_vs_usability = { columns: ['site', 'arm', 'generator_group', 'condition', 'wcag_gain', 'usability_delta'], rows: (r.fig5 || []).map(function (x) { return [x.site, x.arm, x.generator_group, x.condition, x.wcag_gain, x.usability_delta]; }) };
    out.fig6_broke_usability = { columns: ['site', 'arm', 'condition', 'wcag_gain', 'worst_heuristic', 'worst_delta'], rows: (r.fig6 || []).map(function (x) { return [x.site, x.arm, x.condition, x.wcag_gain, x.worst_heuristic, x.worst_delta]; }) };
    out.loop_behavior = { columns: ['arm', 'condition', 'sites', 'mean_iterations', 'pct_converged', 'pct_hit_cap', 'pct_failed', 'pct_truncated', 'mean_edit_ratio', 'regressions_per_cell', 'self_reported_tokens_in', 'self_reported_tokens_out'], rows: (r.loop || []).map(function (x) { return [x.arm, x.condition, x.sites, x.mean_iterations, x.pct_converged, x.pct_hit_cap, x.pct_failed, x.pct_truncated, x.mean_edit_ratio, x.regressions_per_cell, x.self_reported_tokens_in, x.self_reported_tokens_out]; }) };
    var h = r.headline || {}, tc = h.top_conflict || {};
    out.headline = { columns: ['pct_sites_gained_wcag_lost_nielsen', 'n_sites', 'top_conflict_criterion', 'top_conflict_heuristic', 'top_conflict_count'], rows: [[h.pct_sites_gained_wcag_lost_nielsen, h.n_sites, tc.criterion, tc.heuristic, tc.count]] };
    var a = r.agreement || {}, jh = a.judge_vs_human || {}, fl = a.human_fleiss || {}, g = a.gate || {};
    out.agreement = { columns: ['judge_vs_human_kappa', 'judge_vs_human_n', 'human_fleiss_kappa', 'human_fleiss_items', 'human_fleiss_raters', 'gate_threshold', 'gate_pass'], rows: [[jh.kappa, jh.n, fl.kappa, fl.n_items, fl.raters, g.threshold, g.pass]] };
    return out;
  }

  // Serialise an SVG string to a PNG blob at `scale`x. Pass the light SVG: exports are always on white.
  function pngFromSvg(svg, scale) {
    return new Promise(function (resolve, reject) {
      var m = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
      if (!m) return reject(new Error('SVG has no viewBox'));
      var w = +m[1] * scale, h = +m[2] * scale;
      var img = new Image();
      var url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
      img.onload = function () {
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        var ctx = c.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { b ? resolve(b) : reject(new Error('PNG encode failed')); }, 'image/png');
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('SVG failed to render')); };
      img.src = url;
    });
  }

  root.Charts = {
    esc: esc, csvEscape: csvEscape, toCsv: toCsv, num: num, linear: linear, niceTicks: niceTicks, linePath: linePath,
    textOn: textOn, heatColor: heatColor, tables: tables, pngFromSvg: pngFromSvg,
    fig2Svg: fig2Svg, fig3Svg: fig3Svg, fig4Svg: fig4Svg, fig5Svg: fig5Svg, sparkSvg: sparkSvg,
    ARM_COLORS: ARM_COLORS, COND_COLORS: COND_COLORS, COND_ORDER: COND_ORDER
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.Charts;
})(typeof window !== 'undefined' ? window : {});
