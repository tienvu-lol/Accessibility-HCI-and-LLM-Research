/* Researcher console. Vanilla JS. Views are pure (state -> sections of HTML strings) so tests can run them in Node. */
(function (root) {
  'use strict';

  var C = root.Charts || (typeof require !== 'undefined' ? require('./charts.js') : null);
  var esc = C.esc;

  var CONDS = ['naive', 'wcag', 'nielsen', 'both'];
  var SITE_PREFIXES = ['UNI', 'HOSP', 'CORP', 'ECOM', 'NEWS', 'GOV', 'FASH', 'WX', 'PORT', 'REST'];
  // settings.sites === null means all 60 sites from Study/sample/sites.csv, in this order.
  var SITE_IDS = [];
  SITE_PREFIXES.forEach(function (p) { for (var i = 1; i <= 6; i++) SITE_IDS.push(p + '-0' + i); });
  var CELL = {
    '.': ['queued', '\u00b7', 'Queued'], r: ['running', 'R', 'Running'], o: ['ok', '\u2713', 'OK'], f: ['failed', '\u2715', 'Failed'],
    t: ['truncated', 'T', 'Truncated'], i: ['imported', 'I', 'Imported'], '-': ['none', '\u2013', 'Not planned']
  };
  var VIEWS = [
    ['overview', 'Overview'], ['keys', 'Keys & arms'], ['runs', 'Runs'], ['cost', 'Cost'],
    ['results', 'Results'], ['human', 'Human'], ['import', 'Import']
  ];
  var HEURISTICS = {
    h1: 'Visibility of system status', h2: 'Match between system and real world', h3: 'User control and freedom', h4: 'Consistency and standards',
    h5: 'Error prevention', h6: 'Recognition rather than recall', h7: 'Flexibility and efficiency', h8: 'Aesthetic and minimalist design',
    h9: 'Error recovery', h10: 'Help and documentation'
  };

  /* ---------- formatting ---------- */
  function int(n) { return typeof n === 'number' && isFinite(n) ? Math.round(n).toLocaleString('en-US') : 'n/a'; }
  function usd(n) { return typeof n === 'number' && isFinite(n) ? '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'n/a'; }
  function tok(n) {
    if (typeof n !== 'number' || !isFinite(n)) return 'n/a';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + ' M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + ' k';
    return String(Math.round(n));
  }
  function pct(a, b) { return b > 0 ? Math.round((a / b) * 100) : 0; }
  function mins(m) {
    if (typeof m !== 'number' || !isFinite(m)) return 'n/a';
    if (m < 1) return '<1 min';
    var h = Math.floor(m / 60), r = Math.round(m % 60);
    return h ? h + ' h ' + r + ' min' : r + ' min';
  }
  function ms(v) { return typeof v === 'number' ? v : Date.parse(v); } // server sends epoch ms; demo data sends ISO strings
  function ago(iso, now) {
    var s = Math.round(((now ? ms(now) : Date.now()) - ms(iso)) / 1000);
    if (!isFinite(s)) return 'n/a';
    if (s < 5) return 'just now';
    if (s < 90) return s + ' s ago';
    if (s < 5400) return Math.round(s / 60) + ' min ago';
    return Math.round(s / 3600) + ' h ago';
  }
  function when(iso) { var d = new Date(iso); return isFinite(d) ? d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : 'n/a'; }
  function heurLabel(h) { var m = /^h(\d+)/.exec(h || ''); return m ? 'H' + m[1] + ' ' + (HEURISTICS['h' + m[1]] || h) : String(h == null ? '' : h); }

  /* ---------- small markup helpers (every dynamic value passes through esc) ---------- */
  function badge(kind, text) { return '<span class="badge badge-' + esc(kind) + '">' + esc(text) + '</span>'; }
  function tableWrap(label, inner) { return '<div class="table-wrap" tabindex="0" role="region" aria-label="' + esc(label) + '">' + inner + '</div>'; }
  function notice(kind, html, role) { return '<div class="notice notice-' + kind + '"' + (role ? ' role="' + role + '"' : '') + '><span class="notice-tag">' + (kind === 'error' ? 'Error' : kind === 'warn' ? 'Warning' : 'Note') + '</span><div>' + html + '</div></div>'; }
  function empty(title, body) { return '<div class="empty"><p class="empty-title">' + esc(title) + '</p><p>' + esc(body) + '</p></div>'; }
  function bar(done, total, label) {
    return '<div class="bar" role="img" aria-label="' + esc(label + ': ' + int(done) + ' of ' + int(total)) + '"><span style="width:' + Math.min(100, pct(done, total)) + '%"></span></div>';
  }
  function variance(b) {
    if (typeof b.variance_usd !== 'number') return 'n/a';
    var sign = b.variance_usd >= 0 ? '+' : '-';
    return sign + usd(Math.abs(b.variance_usd)) + (typeof b.variance_pct === 'number' ? ' (' + sign + Math.abs(b.variance_pct).toFixed(0) + '%)' : '');
  }
  function panel(id, title, body, extra) {
    return { id: id, html: '<h2 id="' + id + '-h">' + esc(title) + '</h2>' + body, form: !!(extra && extra.form) };
  }
  function csvLink(name, label) {
    return '<a class="btn btn-quiet" href="/api/export/' + esc(name) + '.csv" download data-action="csv" data-name="' + esc(name) + '">' + esc(label || 'CSV') + '</a>';
  }
  function siteList(S) { return S && S.settings && Array.isArray(S.settings.sites) ? S.settings.sites : SITE_IDS; }

  /* ---------- Overview ---------- */
  // `done` is work that produced a usable result. A cell that failed or was truncated is finished, not
  // done: it is reported separately as `bad` so a phase never reads "Done" while cells are broken.
  function phaseStatus(done, total, active, bad) {
    if (total > 0 && done >= total) return ['done', 'Done'];
    if (total > 0 && done + (bad || 0) >= total) return ['attn', (bad || 0) + ' failed'];
    if (active || done > 0 || bad) return ['active', 'In progress'];
    return ['pending', 'Not started'];
  }

  function steps(S, R) {
    var main = S.arms.filter(function (a) { return a.kind === 'mainstream'; });
    var open = S.arms.filter(function (a) { return a.kind === 'open_source'; });
    var sum = function (arr, k) { return arr.reduce(function (n, a) { return n + (a.cells[k] || 0); }, 0); };
    // repair: ok and imported cells have output; failed and truncated ones do not
    var mainTotal = sum(main, 'total');
    var mainDone = sum(main, 'ok') + sum(main, 'imported');
    var mainBad = sum(main, 'failed') + sum(main, 'truncated');
    // open arms arrive either by import or, with dispatch on, as ordinary finished cells
    var openTotal = sum(open, 'total');
    var openDone = sum(open, 'imported') + sum(open, 'ok');
    var openBad = sum(open, 'failed') + sum(open, 'truncated');
    var cov = (R && R.coverage) || {};
    var blockers = main.concat([S.judge]).filter(function (a) { return !a.ready; });
    var running = S.run.phase === 'running';
    // the judge's own queue only holds the items created so far, so the total comes from coverage
    var judgeTotal = Math.max(cov.judge_items_expected || 0, S.judge.items.total || 0);
    var list = [
      { name: 'Setup', done: blockers.length ? 0 : 1, total: 1, unit: '', note: blockers.length ? blockers.length + ' not ready' : 'Keys and arms ready', state: blockers.length ? ['attn', 'Needs attention'] : ['done', 'Done'] },
      { name: 'Open-source arms (A5, A6, A7)', done: openDone, total: openTotal, bad: openBad, unit: 'cells', active: running && S.run.kind === 'repair' && openDone + openBad < openTotal },
      { name: 'Repair', done: mainDone, total: mainTotal, bad: mainBad, unit: 'cells', active: running && S.run.kind === 'repair' },
      { name: 'Score', done: cov.variants_scored || 0, total: cov.variants_expected || 0, unit: 'variants', active: running && S.run.kind === 'score' },
      { name: 'Judge (Gemini)', done: S.judge.items.done, total: judgeTotal, bad: S.judge.items.failed || 0, unit: 'items', active: running && S.run.kind === 'judge' },
      { name: 'Human rating', done: cov.human_items_complete || 0, total: S.human.items || 0, unit: 'items' }
    ];
    return list.map(function (s) { s.state = s.state || phaseStatus(s.done, s.total, s.active, s.bad); return s; });
  }

  function overview(S, R, ui) {
    var out = [];
    var stepHtml = steps(S, R).map(function (s, i) {
      return '<li class="step step-' + s.state[0] + '"><span class="step-n" aria-hidden="true">' + (i + 1) + '</span><div><strong>' + esc(s.name) + '</strong>' +
        '<span class="step-state">' + badge(s.state[0], s.state[1]) + '</span>' +
        '<span class="step-count">' + (s.note ? esc(s.note) : int(s.done) + ' / ' + int(s.total) + ' ' + esc(s.unit) + (s.bad ? ', ' + int(s.bad) + ' failed' : '')) + '</span>' +
        (s.note ? '' : bar(s.done, s.total, s.name)) + '</div></li>';
    }).join('');
    var run = S.run, running = run.phase === 'running', paused = run.phase === 'paused', busy = ui && ui.busy ? ' disabled' : '';
    var blk = ui && ui.blockers ? notice('warn', '<p><strong>' + esc(ui.blockers.title) + '</strong></p>' +
      (ui.blockers.list.length ? '<ul>' + ui.blockers.list.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' : '') +
      (ui.blockers.canForce ? '<p><button type="button" class="btn btn-danger" data-action="run" data-arg="start:judge:force">Start judge anyway (force)</button> Scores will be incomplete.</p>' : ''), 'alert') : '';
    var ctl = '<div class="controls" role="group" aria-label="Run controls">' +
      ['repair', 'score', 'judge'].map(function (p) { return '<button type="button" class="btn btn-primary" data-action="run" data-arg="start:' + p + '"' + busy + '>Start ' + p + '</button>'; }).join('') +
      '<button type="button" class="btn" data-action="run" data-arg="pause"' + (running && !busy ? '' : ' disabled') + '>Pause</button>' +
      '<button type="button" class="btn" data-action="run" data-arg="resume"' + (paused && !busy ? '' : ' disabled') + '>Resume</button>' +
      '<button type="button" class="btn" data-action="run" data-arg="retry-failed"' + busy + '>Retry failed</button></div>';
    var runLine = '<p class="runline">' + badge(running ? 'active' : paused ? 'attn' : 'pending', running ? 'Running' : paused ? 'Paused' : 'Idle') +
      (run.kind ? ' <span>' + esc(run.kind) + (run.started_at ? ', started ' + esc(ago(run.started_at, S.now)) : '') + '</span>' : ' <span>No phase active. Start a phase below.</span>') + '</p>';
    out.push(panel('ov-run', 'Pipeline', '<ol class="stepper">' + stepHtml + '</ol>' + runLine + ctl + blk +
      '<p class="hint">Retry failed re-queues every failed cell and item. Judge start is refused while repair or imports are incomplete.</p>'));

    var P = S.projection, scale = Math.max(P.budget_usd, P.expected_total_usd, P.spent_usd) || 1;
    var over = P.over_budget;
    out.push(panel('ov-spend', 'Spend vs budget',
      '<div class="spend" role="img" aria-label="' + esc('Spent ' + usd(P.spent_usd) + ' of ' + usd(P.budget_usd) + ' budget; projected total ' + usd(P.expected_total_usd)) + '">' +
      '<span class="spend-fill' + (P.spent_usd > P.budget_usd ? ' spend-over' : '') + '" style="width:' + (P.spent_usd / scale * 100) + '%"></span>' +
      '<span class="mark mark-proj" style="left:' + (P.expected_total_usd / scale * 100) + '%"></span>' +
      '<span class="mark mark-budget" style="left:' + (P.budget_usd / scale * 100) + '%"></span></div>' +
      '<p class="hint">Solid bar = spent. Orange tick = projected total. White tick = budget.</p>' +
      '<dl class="facts"><div><dt>Spent</dt><dd>' + usd(P.spent_usd) + ' <span class="sub">' + pct(P.spent_usd, P.budget_usd) + '% of budget</span></dd></div>' +
      '<div><dt>Budget</dt><dd>' + usd(P.budget_usd) + '</dd></div>' +
      '<div><dt>Remaining</dt><dd>' + usd(P.remaining_usd) + '</dd></div>' +
      '<div><dt>Projected total</dt><dd>' + usd(P.expected_total_usd) + '</dd></div>' +
      '<div><dt>ETA</dt><dd>' + mins(P.eta_minutes) + '</dd></div></dl>' +
      (over ? notice('warn', 'Projected total is <strong>' + usd(P.expected_total_usd - P.budget_usd) + '</strong> over budget. The coordinator stops handing out jobs at the cap.') : '')));

    var I = S.intake, perMin = I.rolling5m.tokens / 5;
    out.push(panel('ov-intake', 'Live intake',
      '<dl class="facts"><div><dt>Tokens, last 5 min</dt><dd>' + tok(I.rolling5m.tokens) + ' <span class="sub">' + tok(perMin) + '/min</span></dd></div>' +
      '<div><dt>Cost, last 5 min</dt><dd>' + usd(I.rolling5m.cost_usd) + '</dd></div>' +
      '<div><dt>Tokens in, total</dt><dd>' + tok(I.total.input) + '</dd></div>' +
      '<div><dt>Tokens out, total</dt><dd>' + tok(I.total.output) + '</dd></div>' +
      '<div><dt>Cost, total</dt><dd>' + usd(I.total.cost_usd) + '</dd></div></dl>' +
      '<div class="spark">' + C.sparkSvg(I.series, 'cum_cost_usd', 'Cumulative cost', 'dark') + '<p class="hint">Cumulative cost, last ' + (I.series.length) + ' min' +
      (I.series.length ? ': ' + usd(I.series[0].cum_cost_usd) + ' to ' + usd(I.series[I.series.length - 1].cum_cost_usd) : '') + '</p></div>'));

    out.push(panel('ov-warn', 'Warnings (' + S.warnings.length + ')', S.warnings.length ?
      '<ul class="warnlist">' + S.warnings.map(function (w) { return '<li>' + notice('warn', esc(w)) + '</li>'; }).join('') + '</ul>' :
      '<p class="muted">No warnings.</p>'));
    return out;
  }

  /* ---------- Keys & arms ---------- */
  var PROVIDERS = [
    ['openai', 'ChatGPT / OpenAI', 'Used by repair arms with provider openai.'],
    ['anthropic', 'Claude / Anthropic', 'Used by repair arms with provider anthropic.'],
    ['gemini', 'Gemini', 'Judge only. Gemini never repairs, so the judge stays neutral to the arms.']
  ];
  // One key per open-source arm. They are different llama.cpp servers in different ARC sessions, so
  // the keys are never interchangeable; either one can also be left on the laptop that tunnels to it.
  var ARM_KEYS = [
    ['a5', 'A5 DeepSeek (llama.cpp on ARC)', 'Its own key, separate from A6 and A7. Leave empty to use the A5_API_KEY on the laptop running the A5 tunnel.'],
    ['a6', 'A6 Qwen (llama.cpp on ARC)', 'Its own key, separate from A5 and A7. Leave empty to use the A6_API_KEY on the laptop running the A6 tunnel.'],
    ['a7', 'A7 GLM 4.7 Flash (llama.cpp on ARC)', 'Its own key, separate from A5 and A6. Leave empty to use the A7_API_KEY on the laptop running the A7 tunnel.']
  ];

  function keyCard(S, p) {
    var k = S.keys[p[0]] || { set: false };
    var status = k.set ? badge('done', 'Set') + ' <span>ends in <code>' + esc(k.last4) + '</code>, source ' + esc(k.source) + '</span>' : badge('attn', 'Not set') + ' <span>Paste a key and save.</span>';
    return '<form class="card keycard" data-form="key" data-provider="' + esc(p[0]) + '" autocomplete="off">' +
      '<h3>' + esc(p[1]) + '</h3><p class="hint">' + esc(p[2]) + '</p><p class="keystate">' + status + '</p>' +
      '<label for="key-' + esc(p[0]) + '">API key</label>' +
      '<input id="key-' + esc(p[0]) + '" name="key" type="password" autocomplete="off" spellcheck="false" autocapitalize="off" required aria-describedby="key-' + esc(p[0]) + '-h">' +
      '<p id="key-' + esc(p[0]) + '-h" class="hint">Sent once to the server and never shown again.</p>' +
      '<div class="row"><button class="btn btn-primary" type="submit">' + (k.set ? 'Replace key' : 'Save key') + '</button>' +
      '<button class="btn" type="button" data-action="clear-key" data-provider="' + esc(p[0]) + '"' + (k.set ? '' : ' disabled') + '>Clear key</button></div></form>';
  }

  function keys(S) {
    var out = [];
    out.push(panel('k-keys', 'API keys', '<div class="cards">' + PROVIDERS.map(function (p) { return keyCard(S, p); }).join('') + '</div>' +
      '<h3 class="sub-h">Open-source arms</h3>' +
      '<p class="hint">A5, A6 and A7 are separate self-hosted models with separate credentials. A key set here is sent inside that arm\u2019s jobs and used only by them; with no key here, the arm uses the one on the laptop that holds its tunnel, which never leaves that machine. Spend is attributed per key in Cost.</p>' +
      '<div class="cards">' + ARM_KEYS.map(function (p) { return keyCard(S, p); }).join('') + '</div>', { form: true }));

    var rows = S.arms.map(function (a) {
      var editable = a.kind === 'mainstream';
      var cell = editable ?
        '<td><select aria-label="' + esc(a.id + ' provider') + '" data-field="provider"><option value="openai"' + (a.provider === 'openai' ? ' selected' : '') + '>openai</option><option value="anthropic"' + (a.provider === 'anthropic' ? ' selected' : '') + '>anthropic</option></select></td>' +
        '<td><input aria-label="' + esc(a.id + ' model id') + '" data-field="model_id" value="' + esc(a.model_id) + '" spellcheck="false"></td>' +
        '<td><button type="button" class="btn" data-action="save-arm" data-arm="' + esc(a.id) + '">Save ' + esc(a.id) + '</button></td>' :
        '<td colspan="3" class="muted">Open-source on ARC: dispatched to a laptop with a live tunnel when that setting is on, otherwise imported. Model id and its own key are fixed per arm.</td>';
      var st = a.ready ? badge('done', 'Ready') : badge('attn', 'Blocked') + (a.blockers.length ? ' <span class="sub">' + a.blockers.map(esc).join('; ') + '</span>' : '');
      return '<tr data-arm="' + esc(a.id) + '"><th scope="row">' + esc(a.id) + '</th><td>' + esc(a.label) + '</td><td>' + esc(a.kind === 'open_source' ? 'Open-source' : 'Mainstream') + '</td>' + cell + '<td>' + st + '</td></tr>';
    }).join('');
    out.push(panel('k-arms', 'Arms',
      '<p class="hint">A1 to A4 take provider openai or anthropic only. Gemini is the judge, so it is not offered here.</p>' +
      tableWrap('Arms table', '<table class="grid"><thead><tr><th scope="col">Arm</th><th scope="col">Label</th><th scope="col">Kind</th><th scope="col">Provider</th><th scope="col">Model id</th><th scope="col">Save</th><th scope="col">Status</th></tr></thead><tbody>' + rows + '</tbody></table>'), { form: true }));

    var s = S.settings, cond = s.conditions || [];
    out.push(panel('k-settings', 'Run settings',
      '<form data-form="settings" class="stack" autocomplete="off">' +
      '<div class="fields"><div><label for="set-budget">Budget (USD)</label><input id="set-budget" name="budget_usd" type="number" min="0" step="0.01" required value="' + esc(s.budget_usd) + '"></div>' +
      '<div><label for="set-iter">Max iterations</label><input id="set-iter" name="max_iter" type="number" min="1" max="10" step="1" required value="' + esc(s.max_iter) + '"></div>' +
      '<div><label for="set-judge">Judge model id</label><input id="set-judge" name="judge_model_id" required value="' + esc(s.judge_model_id) + '" spellcheck="false"></div></div>' +
      '<label class="check"><input type="checkbox" name="dispatch_open"' + (s.dispatch_open ? ' checked' : '') + '> Run open-source arms (A5, A6, A7) on laptops with an ARC tunnel</label>' +
      '<p class="hint">Off = A5/A6/A7 are imported from ARC runs. On = their jobs go only to workers started with <code>start.sh --arc</code> whose tunnel is up.</p>' +
      '<fieldset><legend>Conditions</legend><div class="checks">' + CONDS.map(function (c) { return '<label class="check"><input type="checkbox" name="conditions" value="' + c + '"' + (cond.indexOf(c) >= 0 ? ' checked' : '') + '> ' + c + '</label>'; }).join('') + '</div></fieldset>' +
      '<div><label for="set-sites">Sites</label><textarea id="set-sites" name="sites" rows="3" spellcheck="false" aria-describedby="set-sites-h" placeholder="Leave empty for all 60 sites">' + esc(Array.isArray(s.sites) ? s.sites.join(', ') : '') + '</textarea>' +
      '<p id="set-sites-h" class="hint">Site ids separated by commas or spaces, e.g. UNI-01, GOV-03. Empty means all 60.</p></div>' +
      '<div class="row"><button class="btn btn-primary" type="submit">Save settings</button></div></form>', { form: true }));

    var models = Object.keys(S.pricing);
    var prow = models.map(function (m, i) { return pricingRow(i, m, S.pricing[m]); }).join('') + pricingRow(models.length, '', null);
    out.push(panel('k-pricing', 'Pricing (USD per million tokens)',
      '<p class="hint">Shipped prices are placeholders until verified against each provider price page. Cost projections use them as-is.</p>' +
      '<form data-form="pricing" autocomplete="off">' + tableWrap('Pricing table', '<table class="grid"><thead><tr><th scope="col">Model id</th><th scope="col">Input / Mtok</th><th scope="col">Output / Mtok</th><th scope="col">Status</th></tr></thead><tbody>' + prow + '</tbody></table>') +
      '<div class="row"><button class="btn btn-primary" type="submit">Save pricing</button></div></form>', { form: true }));
    return out;
  }

  function pricingRow(i, id, p) {
    var n = esc(i);
    return '<tr><td><input name="id-' + n + '" aria-label="' + (id ? esc(id) + ' model id' : 'New model id') + '" value="' + esc(id) + '" spellcheck="false"' + (id ? ' readonly' : ' placeholder="add model id"') + '></td>' +
      '<td><input name="in-' + n + '" type="number" min="0" step="0.01" aria-label="' + esc(id || 'New model') + ' input price" value="' + esc(p ? p.input_per_mtok : '') + '"></td>' +
      '<td><input name="out-' + n + '" type="number" min="0" step="0.01" aria-label="' + esc(id || 'New model') + ' output price" value="' + esc(p ? p.output_per_mtok : '') + '"></td>' +
      '<td>' + (p ? (p.verified ? badge('done', 'Verified') : badge('attn', 'Unverified placeholder')) : '<span class="muted">New</span>') + '</td></tr>';
  }

  /* ---------- Runs ---------- */
  // Each cell shows its state as a glyph and, as a background tint, the machine that ran it. The tint
  // is only ever extra information: the glyph and the accessible text carry the state on their own.
  function matrixGrid(S, armId) {
    var m = S.matrix[armId] || {}, sites = siteList(S);
    var conds = Object.keys(m);
    if (!conds.length) return '<p class="muted">No cells planned for this arm.</p>';
    var who = (S.matrix_workers || {})[armId] || {};
    var byChar = {};
    (S.machines || []).forEach(function (x, i) { byChar[x.char] = { id: x.id, hue: (i * 47) % 360 }; });
    var head = '<tr><th scope="col" class="corner">Condition</th>' + sites.map(function (id, i) { return '<th scope="col" class="site"><span class="sr">' + esc(id) + '</span><span aria-hidden="true">' + ((i + 1) % 10 === 0 || i === 0 ? i + 1 : '') + '</span></th>'; }).join('') + '</tr>';
    var body = conds.map(function (c) {
      var str = String(m[c] || ''), ws = String(who[c] || '');
      return '<tr><th scope="row">' + esc(c) + '</th>' + sites.map(function (id, i) {
        var d = CELL[str.charAt(i)] || CELL['-'];
        var mm = byChar[ws.charAt(i)];
        return '<td class="cell cell-' + d[0] + '"' + (mm ? ' style="--machine:hsl(' + mm.hue + ' 70% 45%)"' : '') +
          ' title="' + esc(armId + ' ' + c + ' ' + id + ': ' + d[2] + (mm ? ' \u00b7 ' + mm.id : '')) + '">' +
          '<span aria-hidden="true">' + d[1] + '</span><span class="sr">' + esc(d[2] + (mm ? ', ran by ' + mm.id : '')) + '</span></td>';
      }).join('') + '</tr>';
    }).join('');
    return tableWrap(armId + ' cell matrix', '<table class="matrix"><thead>' + head + '</thead><tbody>' + body + '</tbody></table>');
  }

  function dockerBody(D) {
    if (!D.available) return notice('error', 'Docker is not reachable: ' + esc(D.error || 'unknown error'), 'alert');
    var rows = D.containers.map(function (c) {
      return '<tr><th scope="row">' + esc(c.name) + '</th><td>' + esc(c.status) + '</td><td><button type="button" class="btn" data-action="docker-stop" data-name="' + esc(c.name) + '">Remove</button></td></tr>';
    }).join('');
    return '<form data-form="docker"><div class="fields">' +
      '<div><label for="dk-count">Containers</label><input id="dk-count" name="count" type="number" min="1" max="' + D.max + '" step="1" required value="1"></div>' +
      '<div><label for="dk-slots">Slots each</label><input id="dk-slots" name="slots" type="number" min="1" max="16" step="1" required value="4"></div></div>' +
      '<div class="row"><button type="submit" class="btn btn-primary">Start workers</button> ' +
      '<button type="button" class="btn btn-danger" data-action="docker-stop" data-name=""' + (D.containers.length ? '' : ' disabled') + '>Remove all</button></div></form>' +
      '<p class="hint">Image ' + esc(D.image) + '; up to ' + D.max + ' running. Each container connects back to this console as a worker.</p>' +
      (D.containers.length ? tableWrap('Docker worker containers', '<table class="grid"><thead><tr><th scope="col">Container</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead><tbody>' + rows + '</tbody></table>') :
        empty('No worker containers', 'Start some above; they appear in Workers below once they connect.'));
  }
  function runs(S) {
    var out = [];
    out.push(panel('r-legend', 'Cell states',
      '<ul class="legend">' + Object.keys(CELL).map(function (k) { return '<li><span class="cell cell-' + CELL[k][0] + ' lg" aria-hidden="true">' + CELL[k][1] + '</span> ' + esc(CELL[k][2]) + '</li>'; }).join('') + '</ul>' +
      '<p class="hint">Columns are sites in settings order (' + siteList(S).length + '); hover or focus the grid for each cell\u2019s site id.</p>' +
      ((S.machines && S.machines.length) ?
        '<h3 class="sub-h">Machines</h3><ul class="legend legend-machines">' + S.machines.map(function (x, i) {
          return '<li><span class="mswatch" style="background:hsl(' + ((i * 47) % 360) + ' 70% 45%)" aria-hidden="true"></span> ' +
            esc(x.id) + ' <span class="muted">' + int(x.cells) + ' cells' + (x.online ? ', online' : '') + (x.os ? ', ' + esc(x.os) : '') + '</span></li>';
        }).join('') + '</ul>' +
        '<p class="hint">A cell is tinted with the colour of the computer that ran it, so you can see how the work was split. The same colours are used in Cost \u2192 Contribution by machine.</p>' : '')));
    S.arms.forEach(function (a) {
      var c = a.cells;
      var counters = ['total', 'queued', 'running', 'ok', 'failed', 'truncated', 'imported', 'converged'].map(function (k) { return '<div><dt>' + esc(k) + '</dt><dd>' + int(c[k]) + '</dd></div>'; }).join('');
      out.push(panel('r-' + a.id, a.id + ' \u00b7 ' + a.label, '<dl class="facts compact">' + counters + '</dl>' + matrixGrid(S, a.id)));
    });
    if (S.docker && S.docker.enabled) out.push(panel('r-docker', 'Docker workers', dockerBody(S.docker), { form: true }));
    out.push(panel('r-workers', 'Workers (' + S.workers.length + ')', S.workers.length ?
      tableWrap('Workers', '<table class="grid"><thead><tr><th scope="col">Worker</th><th scope="col">Machine</th><th scope="col">Status</th><th scope="col">Slots</th><th scope="col">Running</th><th scope="col">Share of compute</th></tr></thead><tbody>' +
        S.workers.map(function (w) {
          var online = ms(S.now) - ms(w.last_seen) < 45000;
          var inf = w.info || {};
          var status = w.paused ? badge('attn', 'Paused') : online ? badge('done', 'Online') : badge('attn', 'Offline');
          var lid = 'cap-' + esc(w.id);
          return '<tr><th scope="row">' + esc(w.id) + '</th><td>' + esc([inf.host, inf.os].filter(Boolean).join(' \u00b7 ') || 'n/a') + (w.arcs && w.arcs.length ? ' ' + badge('active', 'ARC ' + w.arcs.join('+')) : '') + '</td><td>' + status + ' ' + esc(ago(w.last_seen, S.now)) + '</td>' +
            '<td class="num">' + int(w.slots) + '</td><td class="num">' + int(w.running) + '</td>' +
            '<td><label class="sr" for="' + lid + '">Slot cap for ' + esc(w.id) + '</label><input id="' + lid + '" type="number" min="0" max="64" step="1" placeholder="no cap" value="' + (w.cap === null ? '' : esc(w.cap)) + '" data-field="cap"> ' +
            '<button type="button" class="btn" data-action="worker-cap" data-id="' + esc(w.id) + '">Set cap</button> ' +
            '<button type="button" class="btn" data-action="worker-pause" data-id="' + esc(w.id) + '" data-paused="' + (w.paused ? '0' : '1') + '">' + (w.paused ? 'Resume' : 'Pause') + '</button></td></tr>';
        }).join('') + '</tbody></table>') + '<p class="hint">Cap = most jobs this machine runs at once (empty = its full slot count). Pause stops it taking new jobs; running ones finish.</p>' :
      empty('No workers connected', 'Start a worker (agent script or Docker) with WEB_URL and WORKER_TOKEN set. Jobs wait in the queue until one claims them.')));
    return out;
  }

  /* ---------- machines: one stable colour per computer, used by Cost and Runs ---------- */
  // The colour comes from the machine's position in S.machines, which the server sorts by id, so a
  // machine keeps its colour across reloads and means the same thing in every view.
  function machineMap(S) {
    var m = {};
    (S.machines || []).forEach(function (x, i) { m[x.id] = { i: i, hue: (i * 47) % 360, char: x.char, meta: x }; });
    return m;
  }
  function machineStyle(e) { return 'background:hsl(' + e.hue + ' 70% 45% / .18);border-color:hsl(' + e.hue + ' 70% 45% / .55)'; }
  function machineChip(S, id, map) {
    if (!id) return '<span class="muted">n/a</span>';
    var e = (map || machineMap(S))[id];
    if (!e) return '<span class="mchip">' + esc(id) + '</span>';
    return '<span class="mchip" style="' + machineStyle(e) + '">' + esc(id) + '</span>';
  }

  /* ---------- Cost ---------- */
  function cost(S) {
    var I = S.intake;
    var srcRows = I.sources.map(function (s) {
      return '<tr><th scope="row">' + esc(s.id) + '</th><td class="num">' + int(s.input) + '</td><td class="num">' + int(s.output) + '</td><td class="num">' + int(s.calls) + '</td><td class="num">' + usd(s.cost_usd) + '</td><td class="num">' + int(s.tokens_per_min) + '</td></tr>';
    }).join('');
    var tot = I.total;
    var out = [panel('c-src', 'Intake by source',
      '<div class="toolbar">' + csvLink('cost_by_source') + '</div>' +
      tableWrap('Cost by source', '<table class="grid"><thead><tr><th scope="col">Source</th><th scope="col" class="num">Input tokens</th><th scope="col" class="num">Output tokens</th><th scope="col" class="num">Calls</th><th scope="col" class="num">Cost</th><th scope="col" class="num">Tokens / min</th></tr></thead><tbody>' + srcRows +
        '</tbody><tfoot><tr><th scope="row">Total</th><td class="num">' + int(tot.input) + '</td><td class="num">' + int(tot.output) + '</td><td class="num">' + int(I.sources.reduce(function (n, s) { return n + s.calls; }, 0)) + '</td><td class="num">' + usd(tot.cost_usd) + '</td><td class="num"></td></tr></tfoot></table>') +
      '<p class="hint">Open-source arms count tokens only; their cost is $0.00 unless a price is set.</p>')];
    var P = S.projection;
    var pr = P.by_arm.map(function (b) {
      return '<tr><th scope="row">' + esc(b.arm) + '</th><td>' + esc(b.model_id || 'not set') + '</td><td class="num">' + int(b.calls_done) + ' / ' + int(b.calls_total) + '</td><td class="num">' + int(b.avg_in) + '</td><td class="num">' + int(b.avg_out) + '</td><td class="num">' + usd(b.spent_usd) + '</td><td class="num">' + usd(b.est_cost_usd) + '</td><td class="num">' + usd(b.est_total_usd) + '</td><td class="num">' + usd(b.baseline_total_usd) + '</td><td class="num">' + variance(b) + '</td><td>' + badge(b.basis === 'measured' ? 'done' : b.basis === 'estimated' || b.basis === 'unpriced' ? 'attn' : 'pending', b.basis) + (b.mock_calls ? ' ' + badge('pending', int(b.mock_calls) + ' test') : '') + '</td></tr>';
    }).join('');
    var mmap = machineMap(S);
    out.push(panel('c-live', 'Live API usage (newest first)', (S.recent_usage && S.recent_usage.length) ?
      tableWrap('Recent usage', '<table class="grid compact"><thead><tr><th scope="col">When</th><th scope="col">Machine</th><th scope="col">Arm</th><th scope="col">Model</th><th scope="col">Key</th><th scope="col" class="num">Calls</th><th scope="col" class="num">Tokens in</th><th scope="col" class="num">Tokens out</th><th scope="col" class="num">Cost</th></tr></thead><tbody>' +
        S.recent_usage.map(function (u) {
          return '<tr><th scope="row">' + esc(ago(u.ts, S.now)) + '</th><td>' + machineChip(S, u.worker, mmap) + '</td><td>' + esc(u.arm) + '</td>' +
            '<td>' + esc(u.model_id || 'n/a') + '</td><td>' + (u.key_id ? '<code>' + esc(u.key_id) + '</code>' : '<span class="muted">n/a</span>') + '</td>' +
            '<td class="num">' + int(u.calls) + '</td><td class="num">' + int(u.input) + '</td><td class="num">' + int(u.output) + '</td>' +
            '<td class="num">' + (u.mock ? badge('pending', 'test') : usd(u.cost_usd)) + (u.legacy ? ' ' + badge('attn', 'legacy') : '') + '</td></tr>';
        }).join('') + '</tbody></table>') +
      '<p class="hint">One row per finished job as its result arrives, with the machine that ran it, the model that served it and the key that paid. Rows marked <em>test</em> came from a mock run and cost nothing; <em>legacy</em> rows predate per-call attribution and are priced on read.</p>' :
      empty('No usage yet', 'Rows appear here as workers report finished calls.')));

    // --- who ran what, and what it cost per machine
    var mach = P.by_machine || [];
    var mRows = mach.map(function (m) {
      var e = mmap[m.id];
      return '<tr' + (e ? ' style="' + machineStyle(e) + '"' : '') + '><th scope="row">' + machineChip(S, m.id, mmap) + '</th>' +
        '<td class="num">' + int(m.calls) + '</td><td class="num">' + int(m.input) + '</td><td class="num">' + int(m.output) + '</td>' +
        '<td class="num">' + usd(m.cost_usd) + '</td><td class="num">' + (m.share_pct === null ? 'n/a' : m.share_pct.toFixed(1) + '%') + '</td>' +
        '<td>' + (m.arms.length ? m.arms.map(function (a) { return esc(a.arm) + ' ' + usd(a.cost_usd) + ' (' + int(a.calls) + ')'; }).join(', ') : '<span class="muted">none</span>') +
        '</td><td class="num">' + (m.mock_calls ? int(m.mock_calls) : '0') + '</td></tr>';
    }).join('');
    var kRows = (P.by_key || []).map(function (k) {
      return '<tr><th scope="row"><code>' + esc(k.id) + '</code></th><td>' + esc(k.arm) + '</td><td>' + esc(k.model_id || 'n/a') + '</td>' +
        '<td class="num">' + int(k.calls) + '</td><td class="num">' + int(k.input) + '</td><td class="num">' + int(k.output) + '</td><td class="num">' + usd(k.cost_usd) + '</td></tr>';
    }).join('');
    out.push(panel('c-machines', 'Contribution by machine',
      (mach.length ?
        tableWrap('Cost by machine', '<table class="grid"><thead><tr><th scope="col">Machine</th><th scope="col" class="num">Calls</th><th scope="col" class="num">Tokens in</th><th scope="col" class="num">Tokens out</th><th scope="col" class="num">Spent</th><th scope="col" class="num">Share</th><th scope="col">By arm</th><th scope="col" class="num">Test calls</th></tr></thead><tbody>' + mRows + '</tbody></table>') +
        '<p class="hint">Every finished call is attributed to the computer that ran it, so you can see which machine contributed what. Imported cells are attributed to <code>(imported)</code>. Test calls are counted but cost nothing. The same colour marks that machine in the Runs matrix.</p>'
        : empty('Nothing recorded yet', 'Rows appear once a worker finishes a job.')) +
      '<h3 class="sub-h">Spend by API key</h3>' +
      (kRows ? tableWrap('Cost by key', '<table class="grid"><thead><tr><th scope="col">Key</th><th scope="col">Arm</th><th scope="col">Model</th><th scope="col" class="num">Calls</th><th scope="col" class="num">Tokens in</th><th scope="col" class="num">Tokens out</th><th scope="col" class="num">Spent</th></tr></thead><tbody>' + kRows + '</tbody></table>') +
        '<p class="hint">Keys appear as slot plus the last four characters, never the key itself. A5, A6 and A7 have separate keys, so their spend is separate. <code>local:&lt;machine&gt;</code> means the arm used the key held on that laptop.</p>'
        : empty('No key attribution yet', 'Calls finished before this was recorded show under legacy rows instead.'))));
    out.push(panel('c-proj', 'Projection by arm',
      '<p>Expected total <strong>' + usd(P.expected_total_usd) + '</strong> against a budget of ' + usd(P.budget_usd) + '; ETA ' + mins(P.eta_minutes) + '.' +
      (P.baseline ? ' Projected at start ' + usd(P.baseline.expected_total_usd) + ' (' + esc(when(P.baseline.at)) + '); now ' + variance(P) + '.' : ' No baseline yet: it is taken when you first start a phase.') + '</p>' +
      '<form data-form="budget" class="row" autocomplete="off"><label for="cost-budget">Budget cap (USD)</label> <input id="cost-budget" name="budget_usd" type="number" min="0" step="1" required value="' + esc(P.budget_usd) + '"> <button type="submit" class="btn btn-primary">Update cap</button></form>' +
      '<p class="hint">The cap is a hard stop: no new job is dispatched once spent plus the estimate for running jobs reaches it. Change it any time; it applies to the next job.</p>' +
      '<p><button type="button" class="btn" data-action="rebaseline">Reset baseline to now</button> ' +
      '<button type="button" class="btn btn-danger" data-action="reset-usage">Clear usage history</button></p>' +
      ((P.mock_calls || P.legacy_calls) ? notice('warn',
        '<p>' + (P.mock_calls ? '<strong>' + int(P.mock_calls) + ' mock (test) calls</strong> are recorded. They cost nothing and are excluded from spend and from the measured averages. ' : '') +
        (P.legacy_calls ? '<strong>' + int(P.legacy_calls) + ' rows predate per-call attribution</strong>, so they carry no machine, model or key and are priced at today\u2019s rate for the arm\u2019s current model. ' : '') +
        'Clear the usage history to start the books from a known-clean state.</p>') : '') +
      tableWrap('Projection by arm', '<table class="grid"><thead><tr><th scope="col">Arm</th><th scope="col">Model</th><th scope="col" class="num">Calls done / total</th><th scope="col" class="num">Avg tokens in</th><th scope="col" class="num">Avg tokens out</th><th scope="col" class="num">Spent</th><th scope="col" class="num">Remaining (est.)</th><th scope="col" class="num">Projected total</th><th scope="col" class="num">At start</th><th scope="col" class="num">Change</th><th scope="col">Basis</th></tr></thead><tbody>' + pr + '</tbody></table>') +
      '<p class="hint">Measured = from real finished calls on the model the arm uses <em>now</em>; change an arm\u2019s model and it falls back to estimated until that model has data. Mock (test) calls never count. Estimated = from prompt sizes. Self-hosted = tokens only, no price set. Unpriced = no price entry for the model, so its cost is counted as $0 (add a price). The judge row is included in the expected total.</p>', { form: true }));
    return out;
  }

  /* ---------- Results ---------- */
  function exportBar(fig, csvName, opts) {
    return '<div class="toolbar" role="group" aria-label="Export ' + esc(fig) + '">' +
      (opts && opts.chart ? '<button type="button" class="btn btn-quiet" data-action="dl-svg" data-fig="' + esc(fig) + '">SVG</button><button type="button" class="btn btn-quiet" data-action="dl-png" data-fig="' + esc(fig) + '">PNG (4\u00d7)</button>' : '') +
      csvLink(csvName) + '</div>';
  }

  function dataTable(key, ui, label, columns, rows, limit) {
    var open = ui && ui.open && ui.open[key] ? ' open' : '';
    var shown = rows.slice(0, limit || 400);
    return '<details data-key="' + esc(key) + '"' + open + '><summary>Data table: ' + esc(label) + ' (' + rows.length + ' rows)</summary>' +
      tableWrap(label + ' data', '<table class="grid compact"><thead><tr>' + columns.map(function (c) { return '<th scope="col">' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        shown.map(function (r) { return '<tr>' + r.map(function (v, i) { return i === 0 ? '<th scope="row">' + esc(v) + '</th>' : '<td class="num">' + esc(typeof v === 'number' ? v : v == null ? '' : v) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>') +
      (rows.length > shown.length ? '<p class="hint">Showing ' + shown.length + ' of ' + rows.length + '. The CSV has every row.</p>' : '') + '</details>';
  }

  function chartPanel(id, title, fig, csvName, svg, table, ui, extraTop) {
    return panel(id, title, (extraTop || '') + exportBar(fig, csvName, { chart: true }) + '<div class="chart" tabindex="0" role="region" aria-label="' + esc(title) + ' chart" data-fig="' + esc(fig) + '">' + svg + '</div>' + dataTable(fig, ui, title, table.columns, table.rows));
  }

  function viewerHtml(v) {
    if (!v) return '<p class="muted">Pick a fix in the list to compare the original and the repaired page.</p>';
    var title = v.site + ' \u00b7 ' + v.arm + ' \u00b7 ' + v.condition;
    var src = function (u) { return root.__variantSrc ? root.__variantSrc(u) : u; };
    return '<div class="viewer-head"><strong>' + esc(title) + '</strong><button type="button" class="btn" data-action="close-viewer">Close viewer</button></div>' +
      '<div class="viewer"><figure><figcaption>Original</figcaption><iframe sandbox title="' + esc('Original page, ' + title) + '" src="' + esc(src(v.before_url)) + '" loading="lazy"></iframe></figure>' +
      '<figure><figcaption>After (' + esc(v.arm + ', ' + v.condition) + ')</figcaption><iframe sandbox title="' + esc('Repaired page, ' + title) + '" src="' + esc(src(v.after_url)) + '" loading="lazy"></iframe></figure></div>';
  }

  function results(S, R, ui) {
    if (!R) return [panel('res-wait', 'Results', empty('No results loaded yet', 'Results appear once the first variants are scored. If this stays empty, check that the server is reachable.'))];
    var out = [];
    var cov = R.coverage || {}, gate = R.gate || {}, ag = R.agreement || {}, hl = R.headline || {};
    var banner = gate.warn ? notice('warn', '<strong>Ceiling check.</strong> ' + esc(gate.note || '') + ' Median baseline violation rate ' + esc(C.num(gate.median_baseline_violation_rate, 3)) + '; ' + esc(gate.sites_zero_axe) + ' sites have zero axe violations.', 'alert') :
      notice('info', '<strong>Ceiling check passed.</strong> ' + esc(gate.note || '') + ' Median baseline violation rate ' + esc(C.num(gate.median_baseline_violation_rate, 3)) + '.');
    var cv = function (label, d, t) { return '<div><dt>' + esc(label) + '</dt><dd>' + int(d) + ' / ' + int(t) + ' <span class="sub">' + pct(d, t) + '%</span></dd>' + bar(d, t, label) + '</div>'; };
    var jh = ag.judge_vs_human, fl = ag.human_fleiss, g = ag.gate || {};
    var tc = hl.top_conflict;
    out.push(panel('res-top', 'Headline and coverage',
      '<div class="toolbar"><button type="button" class="btn btn-primary" data-action="export-all">Export everything</button><span class="hint">all.json plus every CSV</span></div>' + banner +
      '<dl class="facts"><div><dt>Sites that gained WCAG and lost Nielsen</dt><dd>' + (hl.pct_sites_gained_wcag_lost_nielsen == null ? 'n/a' : esc(C.num(hl.pct_sites_gained_wcag_lost_nielsen, 1)) + '%') + ' <span class="sub">of ' + int(hl.n_sites) + ' sites</span></dd></div>' +
      '<div><dt>Top conflict</dt><dd>' + (tc ? esc(tc.criterion) + ' vs ' + esc(heurLabel(tc.heuristic)) + ' <span class="sub">' + int(tc.count) + ' variants</span>' : 'n/a') + '</dd></div>' +
      '<div><dt>Judge vs human kappa</dt><dd>' + (jh ? esc(C.num(jh.kappa)) + ' <span class="sub">n=' + int(jh.n) + '</span>' : 'n/a') + '</dd></div>' +
      '<div><dt>Human Fleiss kappa</dt><dd>' + (fl ? esc(C.num(fl.kappa)) + ' <span class="sub">' + int(fl.n_items) + ' items, ' + int(fl.raters) + ' raters</span>' : 'n/a') + '</dd></div>' +
      '<div><dt>Agreement gate (\u2265 ' + esc(g.threshold == null ? 'n/a' : g.threshold) + ')</dt><dd>' + (g.pass == null ? badge('pending', 'Not yet computable') : g.pass ? badge('done', 'Pass') : badge('attn', 'Below threshold')) + '</dd></div></dl>' +
      '<dl class="coverage">' + cv('Variants scored', cov.variants_scored, cov.variants_expected) + cv('Judge items', cov.judge_items_done, cov.judge_items_expected) +
      '<div><dt>Baselines scored</dt><dd>' + int(cov.baselines_scored) + '</dd></div><div><dt>Human raters</dt><dd>' + int(cov.human_raters) + '</dd></div><div><dt>Human items complete</dt><dd>' + int(cov.human_items_complete) + '</dd></div></dl>' +
      '<div class="toolbar">' + csvLink('headline', 'Headline CSV') + csvLink('agreement', 'Agreement CSV') + csvLink('metrics_all', 'All metrics CSV') + csvLink('judge_rankings', 'Judge rankings CSV') + '</div>'));

    var T = C.tables(R);
    var cond = (ui && ui.cond) || 'wcag';
    // exports are always light, rebuilt from the same data as the dark figures on screen
    FIGS = { fig2: function () { return C.fig2Svg(R.fig2, cond, 'light'); }, fig3: function () { return C.fig3Svg(R.fig3, 'light'); }, fig4: function () { return C.fig4Svg(R.fig4, 'light'); }, fig5: function () { return C.fig5Svg(R.fig5, 'light'); } };
    var picker = '<fieldset class="picker"><legend>Condition</legend>' + CONDS.map(function (c) {
      return '<label class="check"><input type="radio" name="cond" id="cond-' + c + '" value="' + c + '"' + (c === cond ? ' checked' : '') + '> ' + c + '</label>';
    }).join('') + '</fieldset>';
    out.push({ id: 'res-fig2-ctl', html: '<h2 id="res-fig2-ctl-h">Fig 2 condition</h2>' + picker, form: true });
    out.push(chartPanel('res-fig2', 'Fig 2. Violations before vs after', 'fig2', 'fig2_violations', C.fig2Svg(R.fig2, cond, 'dark'), T.fig2_violations, ui));
    out.push(chartPanel('res-fig3', 'Fig 3. Judge mean rank', 'fig3', 'fig3_judge_ranks', C.fig3Svg(R.fig3, 'dark'), T.fig3_judge_ranks, ui,
      notice('info', 'The judge ranks five blinded variants: the four repaired conditions plus the unrepaired <em>baseline</em>. Fig 5 uses the baseline rank as the usability reference.')));
    out.push(chartPanel('res-fig4', 'Fig 4. Criteria vs heuristics conflicts', 'fig4', 'fig4_conflict_heatmap', C.fig4Svg(R.fig4, 'dark'), T.fig4_conflict_heatmap, ui));
    out.push(chartPanel('res-fig5', 'Fig 5. WCAG gain vs usability', 'fig5', 'fig5_gain_vs_usability', C.fig5Svg(R.fig5, 'dark'), T.fig5_gain_vs_usability, ui));

    var fixes = R.fig6 || [];
    var sel = ui && ui.viewer;
    var rows = fixes.map(function (f, i) {
      var on = sel && sel.site === f.site && sel.arm === f.arm && sel.condition === f.condition;
      return '<tr><th scope="row">' + esc(f.site) + '</th><td>' + esc(f.arm) + '</td><td>' + esc(f.condition) + '</td><td class="num">' + esc(f.wcag_gain) + '</td><td>' + esc(heurLabel(f.worst_heuristic)) + '</td><td class="num">' + esc(f.worst_delta) + '</td>' +
        '<td><button type="button" class="btn" data-action="view-fix" data-i="' + i + '" aria-pressed="' + (on ? 'true' : 'false') + '" aria-label="' + esc('Compare original and after, ' + f.site + ' ' + f.arm + ' ' + f.condition) + '">' + (on ? 'Viewing' : 'Compare') + '</button></td></tr>';
    }).join('');
    out.push(panel('res-fig6', 'Fig 6. Fixes that broke usability',
      '<div class="toolbar">' + csvLink('fig6_broke_usability') + '</div>' +
      (fixes.length ? '<p class="hint">Gained on WCAG but lost on a Nielsen heuristic. Worst first. Pages open in sandboxed frames without scripts.</p>' +
        tableWrap('Fixes that broke usability', '<table class="grid"><thead><tr><th scope="col">Site</th><th scope="col">Arm</th><th scope="col">Condition</th><th scope="col" class="num">WCAG gain</th><th scope="col">Worst heuristic</th><th scope="col" class="num">Delta</th><th scope="col">Viewer</th></tr></thead><tbody>' + rows + '</tbody></table>') :
        empty('No broken fixes found yet', 'Entries appear when a variant improves on WCAG but ranks worse on a Nielsen heuristic than the original page.'))));
    out.push({ id: 'res-viewer', html: '<h2 id="res-viewer-h">Original vs after</h2>' + viewerHtml(sel), form: true });

    var lp = T.loop_behavior;
    out.push(panel('res-loop', 'Loop behaviour',
      '<div class="toolbar">' + csvLink('loop_behavior') + '</div>' + (lp.rows.length ?
        tableWrap('Loop behaviour', '<table class="grid compact"><thead><tr>' + lp.columns.map(function (c) { return '<th scope="col"' + (c === 'arm' || c === 'condition' ? '' : ' class="num"') + '>' + esc(c.replace(/_/g, ' ')) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          lp.rows.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th>' + r.slice(1).map(function (v, i) { return i === 0 ? '<td>' + esc(v) + '</td>' : '<td class="num">' + esc(typeof v === 'number' && !Number.isInteger(v) ? C.num(v, 2) : v) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>') :
        empty('No loop data yet', 'Appears after the first repair cells finish.'))));
    out.push(panel('res-notes', 'Notes', (R.notes && R.notes.length ? '<ul>' + R.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' : '<p class="muted">No notes.</p>')));
    return out;
  }

  /* ---------- Human ---------- */
  function human(S) {
    var H = S.human;
    return [
      panel('h-how', 'Human rating',
        '<p class="lead">Raters compare two blinded page sets per item and answer 14 questions: pick A, B or tie. Type your name on the rating page and start. Reload with the same name to resume where you stopped.</p>' +
        '<p><a class="btn btn-primary btn-lg" href="/rate">Open rating page</a></p>' +
        '<p class="hint">No account needed. Names become a rater id (lowercase letters, digits, hyphens). Arm and condition names never reach the browser.</p>'),
      panel('h-progress', 'Progress',
        '<dl class="facts"><div><dt>Harness</dt><dd>' + (H.built ? badge('done', 'Ready') : badge('attn', 'Not built')) + '</dd></div>' +
        '<div><dt>Items</dt><dd>' + int(H.items) + '</dd></div><div><dt>Raters</dt><dd>' + int(H.raters) + '</dd></div><div><dt>Rating rows</dt><dd>' + int(H.ratings_rows) + '</dd></div></dl>' +
        (H.items ? bar(H.ratings_rows, H.items * 14 * Math.max(H.raters, 1), 'Rating rows') + '<p class="hint">' + int(H.ratings_rows) + ' of ' + int(H.items * 14 * Math.max(H.raters, 1)) + ' answers across ' + int(H.raters) + ' raters so far (items \u00d7 14 questions \u00d7 raters).</p>' : '') +
        '<div class="toolbar">' + csvLink('human_ratings', 'Download human_ratings CSV') + '</div>')
    ];
  }

  /* ---------- Import ---------- */
  function imports(S, R, ui) {
    var imp = (ui && ui.imp) || {};
    var f = imp.file;
    var res = imp.result;
    var out = [];
    out.push({
      id: 'i-up', form: true, html: '<h2 id="i-up-h">Import open-source runs</h2>' +
        '<p class="hint">Upload a gzip\u2019d NDJSON file (<code>.ndjson.gz</code>) of A5/A6/A7 cells from the ARC run. Only open-source arms are accepted.</p>' +
        '<div class="drop" data-drop><label for="imp-file" class="btn btn-primary">Choose file</label><input id="imp-file" type="file" accept=".gz,.ndjson.gz,application/gzip,application/x-gzip" class="sr-file">' +
        '<span class="drop-hint">or drop a file here</span></div>' +
        '<p id="imp-sel" aria-live="polite">' + (f ? 'Selected: <strong>' + esc(f.name) + '</strong> (' + esc((f.size / 1048576).toFixed(2)) + ' MB)' : 'No file selected.') + '</p>' +
        '<div class="row"><button type="button" class="btn btn-primary" data-action="do-import"' + (f && !imp.busy ? '' : ' disabled') + '>' + (imp.busy ? 'Uploading\u2026' : 'Upload and import') + '</button></div>' +
        (imp.busy ? '<progress max="100" value="' + esc(imp.progress || 0) + '" aria-label="Upload progress"></progress> <span>' + esc(imp.progress || 0) + '%</span>' : '') +
        (imp.error ? notice('error', esc(imp.error) + ' <button type="button" class="btn" data-action="do-import">Retry</button>', 'alert') : '')
    });
    if (res) {
      var rej = res.rejected || [];
      out.push(panel('i-res', 'Import result',
        notice(rej.length ? 'warn' : 'info', '<strong>' + int(res.imported_cells) + '</strong> cells imported, <strong>' + int(rej.length) + '</strong> rejected.') +
        (rej.length ? '<div class="scroll-list" tabindex="0" role="region" aria-label="Rejected lines"><table class="grid compact"><thead><tr><th scope="col">Line</th><th scope="col">Reason</th></tr></thead><tbody>' +
          rej.slice(0, 200).map(function (r) { return '<tr><th scope="row">' + esc(r.line) + '</th><td>' + esc(r.reason) + '</td></tr>'; }).join('') + '</tbody></table>' + (rej.length > 200 ? '<p class="hint">Showing the first 200 of ' + rej.length + '.</p>' : '') + '</div>' : '')));
    }
    var hist = S.imports || [];
    out.push(panel('i-hist', 'Import history (' + hist.length + ')', hist.length ?
      tableWrap('Import history', '<table class="grid"><thead><tr><th scope="col">When</th><th scope="col">Arms</th><th scope="col" class="num">Cells</th><th scope="col" class="num">Rejected</th></tr></thead><tbody>' +
        hist.slice().reverse().map(function (h) { return '<tr><th scope="row">' + esc(when(h.ts)) + '</th><td>' + esc((h.arms || []).join(', ')) + '</td><td class="num">' + int(h.cells) + '</td><td class="num">' + int(h.rejected) + '</td></tr>'; }).join('') + '</tbody></table>') :
      empty('Nothing imported yet', 'Choose the .ndjson.gz produced by the ARC run above. Imported cells show state I in the Runs matrix.')));
    return out;
  }

  var views = { overview: overview, keys: keys, runs: runs, cost: cost, results: results, human: human, import: imports };
  var TITLES = { overview: 'Overview', keys: 'Keys & arms', runs: 'Runs', cost: 'Cost', results: 'Results', human: 'Human rating', import: 'Import' };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { views: views, steps: steps, matrixGrid: matrixGrid, viewerHtml: viewerHtml, keyCard: keyCard, SITE_IDS: SITE_IDS, fmt: { int: int, usd: usd, tok: tok, mins: mins, ago: ago } };
  }
  if (typeof document === 'undefined') return;

  /* ====================== browser runtime ====================== */
  var qs = new URLSearchParams(location.search);
  var DEMO = qs.get('demo') === '1';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var S = null, R = null;
  var ui = { cond: 'wcag', open: {}, viewer: null, busy: false, blockers: null, imp: {} };
  var conn = 'connecting';
  var demo = { state: null, results: null };

  function announce(kind, text) {
    var box = $('#flash');
    if (!box) return;
    box.innerHTML = '<div class="notice notice-' + kind + '" role="' + (kind === 'error' ? 'alert' : 'status') + '"><span class="notice-tag">' + (kind === 'error' ? 'Error' : 'Done') + '</span><div>' + esc(text) + '</div><button type="button" class="btn btn-quiet" data-action="dismiss">Dismiss</button></div>';
  }

  /* ---- API (demo mode stubs writes locally) ---- */
  function api(method, path, body) {
    return DEMO ? demoApi(method, path, body) : fetch(path, {
      method: method, credentials: 'same-origin', headers: body !== undefined ? { 'Content-Type': 'application/json' } : {},
      body: body !== undefined ? JSON.stringify(body) : undefined
    }).then(function (r) {
      if (r.status === 401) { location.href = '/login.html'; return new Promise(function () {}); }
      return r.text().then(function (t) { var d = null; try { d = t ? JSON.parse(t) : null; } catch (e) { d = { error: t.slice(0, 200) }; } return { ok: r.ok, status: r.status, data: d }; });
    });
  }

  function demoApi(method, path, body) {
    var s = demo.state, ok = function (d) { return Promise.resolve({ ok: true, status: 200, data: d || { ok: true } }); };
    var fail = function (st, d) { return Promise.resolve({ ok: false, status: st, data: d }); };
    var m;
    if (method === 'GET' && path === '/api/state') return ok(JSON.parse(JSON.stringify(s)));
    if (method === 'GET' && path === '/api/results') return ok(demo.results);
    if ((m = /^\/api\/keys\/(\w+)$/.exec(path))) {
      if (!s.keys[m[1]]) return fail(400, { error: 'bad provider' });
      if (method === 'PUT') { if (!body.key) return fail(400, { error: 'empty key' }); s.keys[m[1]] = { set: true, last4: body.key.slice(-4), source: 'ui' }; } else s.keys[m[1]] = { set: false, last4: null, source: null };
      return ok();
    }
    if ((m = /^\/api\/arms\/(A\d)$/.exec(path))) {
      if (body.provider === 'gemini') return fail(400, { error: 'gemini cannot repair' });
      s.arms.forEach(function (a) { if (a.id === m[1]) { a.provider = body.provider; a.model_id = body.model_id; } });
      return ok();
    }
    if (path === '/api/settings') { Object.assign(s.settings, body); return ok(); }
    if (path === '/api/pricing') { Object.keys(body).forEach(function (k) { s.pricing[k] = { input_per_mtok: body[k].input_per_mtok, output_per_mtok: body[k].output_per_mtok, verified: false }; }); return ok(); }
    if (path === '/api/run/start') {
      if (body.phase === 'judge' && !body.force) return fail(409, { error: 'blocked', blockers: ['Repair is incomplete: 62% of mainstream cells are finished.', 'A6 import is incomplete.'] });
      s.run = { phase: 'running', kind: body.phase, started_at: new Date().toISOString() }; return ok();
    }
    if (path === '/api/run/pause') { s.run.phase = 'paused'; return ok(); }
    if (path === '/api/run/resume') { s.run.phase = 'running'; return ok(); }
    if (path === '/api/run/retry-failed') return ok();
    return fail(404, { error: 'not available in demo' });
  }

  /* ---- section renderer: replaces only changed sections, protects focus, selection, scroll ---- */
  function applySection(host, sec, idx) {
    var el = document.getElementById(sec.id);
    if (!el) { el = document.createElement('section'); el.id = sec.id; el.className = 'panel'; el.setAttribute('aria-labelledby', sec.id + '-h'); }
    if (host.children[idx] !== el) host.insertBefore(el, host.children[idx] || null);
    if (el._html === sec.html) return;
    var sel = window.getSelection && window.getSelection();
    if (sel && !sel.isCollapsed && el.contains(sel.anchorNode)) return;
    if (sec.form && (el.contains(document.activeElement) && /^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement.tagName) || el.dataset.dirty)) return;
    var focusId = document.activeElement && el.contains(document.activeElement) ? document.activeElement.id : null;
    var scrolls = [].map.call(el.querySelectorAll('.table-wrap,.scroll-list'), function (n) { return n.scrollLeft + ',' + n.scrollTop; });
    el.innerHTML = sec.html; el._html = sec.html;
    [].forEach.call(el.querySelectorAll('.table-wrap,.scroll-list'), function (n, i) { var p = (scrolls[i] || '0,0').split(','); n.scrollLeft = +p[0]; n.scrollTop = +p[1]; });
    if (focusId) { var f = document.getElementById(focusId); if (f) f.focus({ preventScroll: true }); }
  }

  function currentRoute() { var h = location.hash.replace(/^#\/?/, ''); return views[h] ? h : 'overview'; }

  function renderNav() {
    var route = currentRoute();
    $('#nav').innerHTML = VIEWS.map(function (v) { return '<a href="#' + v[0] + '"' + (v[0] === route ? ' aria-current="page"' : '') + '>' + esc(v[1]) + '</a>'; }).join('');
  }

  function render() {
    renderNav();
    if (!S) return;
    var route = currentRoute(), host = $('#view');
    var y = window.scrollY;
    if (host.dataset.route !== route) { host.innerHTML = ''; host.dataset.route = route; }
    var secs = views[route](S, R, ui);
    secs.forEach(function (sec, i) { applySection(host, sec, i); });
    while (host.children.length > secs.length) host.removeChild(host.lastChild);
    if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y);
    var run = S.run;
    $('#runpill').innerHTML = badge(run.phase === 'running' ? 'active' : run.phase === 'paused' ? 'attn' : 'pending', run.phase === 'running' ? 'Running ' + (run.kind || '') : run.phase === 'paused' ? 'Paused' : 'Idle') +
      ' <span class="conn conn-' + conn + '">' + esc(DEMO ? 'Demo data' : conn === 'live' ? 'Live' : conn === 'polling' ? 'Polling' : conn === 'offline' ? 'Offline: showing last data' : 'Connecting') + '</span>';
  }

  function renderRoute(focus) {
    var route = currentRoute();
    $('#h1').textContent = TITLES[route];
    document.title = TITLES[route] + ' | Repair Study Console';
    render();
    if (focus) { var h = $('#h1'); h.focus(); window.scrollTo(0, 0); }
  }

  /* ---- data loading: SSE with polling fallback ---- */
  var lastResultsAt = 0, pollTimer = null;
  function setState(next) {
    S = next;
    render();
    if (Date.now() - lastResultsAt > 2500) loadResults();
  }
  function loadResults() {
    lastResultsAt = Date.now();
    return api('GET', '/api/results').then(function (r) { if (r.ok) { R = r.data; render(); } });
  }
  function poll() {
    return api('GET', '/api/state').then(function (r) {
      if (r.ok) { conn = 'polling'; setState(r.data); } else conn = 'offline';
    }, function () { conn = 'offline'; render(); });
  }
  function startPolling() { if (!pollTimer) { poll(); pollTimer = setInterval(poll, 3000); } }
  function connect() {
    if (DEMO) { demo.ready.then(function () { return poll(); }); return; }
    if (!window.EventSource) { startPolling(); return; }
    var es = new EventSource('/api/events');
    es.addEventListener('state', function (e) {
      if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
      conn = 'live';
      try { setState(JSON.parse(e.data)); } catch (err) { /* ignore a malformed frame */ }
    });
    es.onerror = function () { conn = es.readyState === 2 ? 'offline' : 'polling'; render(); startPolling(); };
  }

  /* ---- downloads ---- */
  function download(name, blob) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }
  var FIGS = {};
  function figSvg(fig) { return FIGS[fig] ? FIGS[fig]() : null; }

  function exportAll() {
    var names = Object.keys(C.tables(R || {})).concat(['metrics_all', 'judge_rankings', 'human_ratings', 'cost_by_source']);
    var jobs = [function () { return DEMO ? download('all.json', new Blob([JSON.stringify(R, null, 2)], { type: 'application/json' })) : fetch('/api/export/all.json', { credentials: 'same-origin' }).then(function (r) { return r.blob(); }).then(function (b) { download('all.json', b); }); }];
    names.forEach(function (n) {
      jobs.push(function () {
        if (DEMO) { var t = C.tables(R)[n]; return t ? download(n + '.csv', new Blob([C.toCsv(t.columns, t.rows)], { type: 'text/csv' })) : null; }
        return fetch('/api/export/' + n + '.csv', { credentials: 'same-origin' }).then(function (r) { return r.ok ? r.blob() : null; }).then(function (b) { if (b) download(n + '.csv', b); });
      });
    });
    announce('ok', 'Exporting ' + jobs.length + ' files. Your browser may ask to allow multiple downloads.');
    return jobs.reduce(function (p, j) { return p.then(j).then(function () { return new Promise(function (r) { setTimeout(r, 250); }); }); }, Promise.resolve());
  }

  /* ---- actions ---- */
  function runAction(arg) {
    var parts = arg.split(':'), path, body;
    if (parts[0] === 'start') { path = '/api/run/start'; body = { phase: parts[1] }; if (parts[2] === 'force') body.force = true; }
    else path = '/api/run/' + parts[0];
    ui.busy = true; ui.blockers = null; render();
    return api('POST', path, body || {}).then(function (r) {
      ui.busy = false;
      if (r.ok) { announce('ok', 'Done: ' + arg.replace(/:/g, ' ')); }
      else if (r.status === 409) { ui.blockers = { title: 'Cannot ' + arg.split(':').slice(0, 2).join(' ') + ' yet', list: (r.data && r.data.blockers) || [r.data && r.data.error || 'Blocked'], canForce: parts[1] === 'judge' && parts[2] !== 'force' }; }
      else announce('error', 'Could not ' + arg.replace(/:/g, ' ') + ': ' + ((r.data && r.data.error) || 'HTTP ' + r.status));
      return poll();
    });
  }

  function save(label, method, path, body, formEl) {
    return api(method, path, body).then(function (r) {
      if (r.ok) { announce('ok', label + ' saved.'); if (formEl) { var sec = formEl.closest('section'); if (sec) delete sec.dataset.dirty; } return poll(); }
      announce('error', label + ' not saved: ' + ((r.data && r.data.error) || 'HTTP ' + r.status) + '. Fix the value and try again.');
    }, function () { announce('error', label + ' not saved: the server did not respond. Try again.'); });
  }

  function dockerCall(method, path, body) {
    return api(method, path, body).then(function (r) {
      var d = r.data || {};
      if (r.ok) announce('ok', d.started ? 'Started ' + d.started.length + ' worker container(s).' : 'Removed ' + (d.removed || []).length + ' container(s).');
      else announce('error', 'Docker: ' + (d.error || (d.errors && d.errors[0]) || 'HTTP ' + r.status));
      return poll();
    });
  }
  function onSubmit(e) {
    var f = e.target;
    if (f.id === 'login-form') return;
    var kind = f.dataset.form;
    if (!kind) return;
    e.preventDefault();
    var fd = new FormData(f);
    if (kind === 'key') {
      var input = f.elements.key, p = f.dataset.provider, val = input.value.trim();
      input.value = '';
      if (!val) { announce('error', 'Paste a key first.'); return; }
      save(p + ' key', 'PUT', '/api/keys/' + p, { key: val }, f);
      val = null;
    } else if (kind === 'settings') {
      var siteText = String(fd.get('sites') || '').trim();
      var sites = siteText ? siteText.split(/[\s,]+/).filter(Boolean) : null;
      var bad = sites && sites.filter(function (x) { return SITE_IDS.indexOf(x) < 0; });
      if (bad && bad.length) { announce('error', 'Unknown site id: ' + bad.slice(0, 5).join(', ') + '. Use ids like UNI-01.'); return; }
      var conds = fd.getAll('conditions');
      if (!conds.length) { announce('error', 'Pick at least one condition.'); return; }
      save('Settings', 'PUT', '/api/settings', { budget_usd: +fd.get('budget_usd'), sites: sites, conditions: conds, max_iter: +fd.get('max_iter'), judge_model_id: String(fd.get('judge_model_id')).trim(), dispatch_open: fd.get('dispatch_open') === 'on' }, f);
    } else if (kind === 'budget') {
      save('Budget cap', 'PUT', '/api/settings', { budget_usd: +fd.get('budget_usd') }, f);
    } else if (kind === 'docker') {
      dockerCall('POST', '/api/docker/workers', { count: +fd.get('count'), slots: +fd.get('slots') });
    } else if (kind === 'pricing') {
      var body = {}, i = 0;
      while (fd.has('id-' + i)) {
        var id = String(fd.get('id-' + i)).trim(), a = fd.get('in-' + i), b = fd.get('out-' + i);
        if (id && a !== '' && b !== '') body[id] = { input_per_mtok: +a, output_per_mtok: +b };
        i++;
      }
      save('Pricing', 'PUT', '/api/pricing', body, f);
    }
  }

  function onClick(e) {
    var t = e.target.closest('[data-action]');
    if (!t) return;
    var a = t.dataset.action;
    if (a === 'dismiss') { $('#flash').innerHTML = ''; }
    else if (a === 'run') runAction(t.dataset.arg);
    else if (a === 'worker-cap') { var cv = t.closest('tr').querySelector('[data-field=cap]').value.trim(); save('Cap for ' + t.dataset.id, 'PUT', '/api/workers/' + encodeURIComponent(t.dataset.id), { cap: cv === '' ? null : +cv }); }
    else if (a === 'worker-pause') save(t.dataset.paused === '1' ? t.dataset.id + ' paused' : t.dataset.id + ' resumed', 'PUT', '/api/workers/' + encodeURIComponent(t.dataset.id), { paused: t.dataset.paused === '1' });
    else if (a === 'docker-stop') { var dn = t.dataset.name; if (window.confirm(dn ? 'Remove container ' + dn + '?' : 'Remove every Docker worker container?')) dockerCall('DELETE', '/api/docker/workers' + (dn ? '/' + encodeURIComponent(dn) : '')); }
    else if (a === 'clear-key') { if (window.confirm('Clear the ' + t.dataset.provider + ' key from the server?')) save(t.dataset.provider + ' key cleared', 'DELETE', '/api/keys/' + t.dataset.provider, undefined, t.closest('form')); }
    else if (a === 'save-arm') {
      var row = t.closest('tr');
      save(t.dataset.arm, 'PUT', '/api/arms/' + t.dataset.arm, { provider: row.querySelector('[data-field=provider]').value, model_id: row.querySelector('[data-field=model_id]').value.trim() }, row);
    }
    else if (a === 'dl-svg') { var svg = figSvg(t.dataset.fig); if (svg) download(t.dataset.fig + '.svg', new Blob([svg], { type: 'image/svg+xml' })); }
    else if (a === 'dl-png') {
      var s2 = figSvg(t.dataset.fig);
      if (s2) C.pngFromSvg(s2, 4).then(function (b) { download(t.dataset.fig + '.png', b); }, function (err) { announce('error', 'PNG export failed: ' + err.message); });
    }
    else if (a === 'csv') {
      if (DEMO) { e.preventDefault(); var tb = C.tables(R || {})[t.dataset.name]; if (tb) download(t.dataset.name + '.csv', new Blob([C.toCsv(tb.columns, tb.rows)], { type: 'text/csv' })); else announce('error', 'This CSV needs the real server.'); }
    }
    else if (a === 'export-all') exportAll();
    else if (a === 'view-fix') { var fx = R.fig6[+t.dataset.i]; ui.viewer = { site: fx.site, arm: fx.arm, condition: fx.condition, before_url: fx.before_url, after_url: fx.after_url }; render(); }
    else if (a === 'close-viewer') { ui.viewer = null; render(); }
    else if (a === 'rebaseline') { if (window.confirm('Replace the start projection with the current one?')) save('Baseline reset', 'POST', '/api/projection/baseline', {}); }
    else if (a === 'reset-usage') {
      if (window.confirm('Clear the recorded API usage?\n\nEvery row is moved to an archive file on the server and the spend, the measured averages and the start baseline go back to zero. Use this after a test run. Finished cells and results are not touched.')) {
        save('Usage history cleared', 'POST', '/api/usage/reset', {});
      }
    }
    else if (a === 'do-import') doImport();
    else if (a === 'logout') { (DEMO ? Promise.resolve() : fetch('/api/logout', { method: 'POST', credentials: 'same-origin' })).then(function () { location.href = '/login.html' + (DEMO ? '?demo=1' : ''); }); }
  }

  function onChange(e) {
    var t = e.target;
    if (t.name === 'cond' && t.type === 'radio') { ui.cond = t.value; render(); }
    else if (t.id === 'imp-file') pickFile(t.files[0]);
    else if (t.closest && t.closest('section') && t.closest('form,table')) { var sec = t.closest('section'); if (sec && sec.id.indexOf('k-') === 0) sec.dataset.dirty = '1'; }
  }
  function onInput(e) { var sec = e.target.closest && e.target.closest('section'); if (sec && /^(k-|i-up)/.test(sec.id) && e.target.type !== 'file') sec.dataset.dirty = '1'; }

  /* ---- import ---- */
  function pickFile(f) {
    if (!f) return;
    if (!/\.gz$/i.test(f.name)) { ui.imp = { error: 'That file is not a .ndjson.gz. Choose the gzip\u2019d export from the ARC run.' }; render(); return; }
    ui.imp = { file: f }; render();
  }
  function doImport() {
    var f = ui.imp.file;
    if (!f) return;
    ui.imp = { file: f, busy: true, progress: 0 }; render();
    if (DEMO) {
      var n = 0, tm = setInterval(function () {
        n += 20; ui.imp.progress = n; render();
        if (n >= 100) { clearInterval(tm); ui.imp = { file: f, result: { imported_cells: 120, rejected: [{ line: 14, reason: 'arm A2 is not open-source' }, { line: 77, reason: 'path escapes cell prefix: ../x.html' }, { line: 90, reason: 'file larger than 5 MB: iter2/index.html' }] } }; render(); }
      }, 250);
      return;
    }
    var x = new XMLHttpRequest();
    x.open('POST', '/api/import');
    x.setRequestHeader('Content-Type', 'application/x-ndjson+gzip');
    x.upload.onprogress = function (ev) { if (ev.lengthComputable) { ui.imp.progress = Math.round(ev.loaded / ev.total * 100); render(); } };
    x.onerror = function () { ui.imp = { file: f, error: 'Upload failed: the server did not respond. Check your connection and retry.' }; render(); };
    x.onload = function () {
      if (x.status === 401) { location.href = '/login.html'; return; }
      var d = null; try { d = JSON.parse(x.responseText); } catch (er) { /* non-JSON error body */ }
      ui.imp = x.status >= 200 && x.status < 300 && d ? { result: d } : { file: f, error: 'Import refused (HTTP ' + x.status + '): ' + ((d && d.error) || 'unexpected reply') + '.' };
      render(); poll();
    };
    x.send(f);
  }

  /* ---- login page ---- */
  function initLogin() {
    var f = $('#login-form'), msg = $('#login-msg'), btn = $('#login-btn'), pw = $('#password');
    function show(kind, text) { msg.className = 'notice notice-' + kind; msg.innerHTML = '<span class="notice-tag">' + (kind === 'error' ? 'Error' : 'Note') + '</span><div>' + esc(text) + '</div>'; msg.setAttribute('role', kind === 'error' ? 'alert' : 'status'); msg.hidden = false; }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!pw.value) { show('error', 'Enter the shared password, then press Sign in.'); pw.focus(); return; }
      btn.disabled = true; btn.textContent = 'Signing in\u2026'; msg.hidden = true;
      var done = function () { btn.disabled = false; btn.textContent = DEMO ? 'Sign in (demo)' : 'Sign in'; };
      if (DEMO) { setTimeout(function () { done(); if (pw.value === 'demo') location.href = '/?demo=1'; else { show('error', 'Wrong password. In demo mode the password is "demo". Try again.'); pw.select(); } }, 400); return; }
      fetch('/api/login', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw.value }) }).then(function (r) {
        done();
        if (r.ok) { location.href = '/'; return; }
        pw.value = '';
        show('error', r.status === 429 ? 'Too many attempts. Wait a minute, then try again.' : r.status === 401 ? 'Wrong password. Check it and try again.' : 'The server answered with an error (HTTP ' + r.status + '). Try again in a moment.');
        pw.focus();
      }, function () { done(); show('error', 'Cannot reach the server. Check your connection, then press Sign in to retry.'); });
    });
  }

  function boot() {
    if ($('#login-form')) { if (DEMO) $('#login-btn').textContent = 'Sign in (demo)'; return initLogin(); }
    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    document.addEventListener('change', onChange);
    document.addEventListener('input', onInput);
    document.addEventListener('toggle', function (e) { var k = e.target.dataset && e.target.dataset.key; if (k) ui.open[k] = e.target.open; }, true);
    window.addEventListener('hashchange', function () { renderRoute(true); });
    var drop = document;
    drop.addEventListener('dragover', function (e) { if (e.target.closest && e.target.closest('[data-drop]')) { e.preventDefault(); e.target.closest('[data-drop]').classList.add('over'); } });
    drop.addEventListener('dragleave', function (e) { var d = e.target.closest && e.target.closest('[data-drop]'); if (d) d.classList.remove('over'); });
    drop.addEventListener('drop', function (e) { var d = e.target.closest && e.target.closest('[data-drop]'); if (d) { e.preventDefault(); d.classList.remove('over'); pickFile(e.dataTransfer.files[0]); } });
    $('#h1').textContent = TITLES[currentRoute()];
    if (DEMO) {
      root.__variantSrc = function (u) {
        var m = /\/api\/variant\/([^/]+)\/([^/]+)\/([^/]+)\//.exec(u) || [];
        var base = m[1] === 'baseline';
        var page = '<!doctype html><html lang="en"><meta charset="utf-8"><title>Demo</title><body style="font:16px Georgia,serif;margin:0">' +
          '<div style="background:' + (base ? '#9aa' : '#861F41') + ';color:' + (base ? '#bcc' : '#fff') + ';padding:16px"><b>' + (m[3] || 'site') + '</b> ' + (base ? '(original)' : '(' + m[1] + ', ' + m[2] + ')') + '</div>' +
          '<p style="padding:16px;color:' + (base ? '#aab' : '#222') + '">Demo page standing in for ' + (u.replace(/[<>"&]/g, '')) + '. ' + (base ? 'Low contrast heading and unlabeled field.' : 'Repaired contrast; denser layout.') + '</p></body></html>';
        return 'data:text/html;charset=utf-8,' + encodeURIComponent(page);
      };
      demo.ready = Promise.all([fetch('demo-state.json').then(function (r) { return r.json(); }), fetch('demo-results.json').then(function (r) { return r.json(); })]).then(function (a) { demo.state = a[0]; demo.results = a[1]; R = a[1]; });
    }
    connect();
    $('#view').innerHTML = '<div class="skeleton" aria-hidden="true"></div><p class="muted" role="status">Loading the latest state\u2026</p>';
    window.addEventListener('error', function () { /* keep the UI alive; surfaced via connection pill */ });
    renderRoute(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(typeof window !== 'undefined' ? window : {});
