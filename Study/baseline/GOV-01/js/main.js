/* City of Quillhaven (fictional) - shared behaviour. Vanilla JS, inline demo data, no network. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Demo data (all invented) ---------- */
  var SERVICES = [
    ['Lantern lamp care', 'Streets & Lights', 'An invented crew that tends imaginary street lanterns.'],
    ['Cobble tidying', 'Streets & Lights', 'A fictional service that straightens made-up cobblestones.'],
    ['Crosswalk painting', 'Streets & Lights', 'An imagined team that repaints sample crosswalk stripes.'],
    ['Bench care', 'Streets & Lights', 'A made-up service for wobbly invented benches.'],
    ['Bridge lantern show', 'Streets & Lights', 'A fictional seasonal light display on an imaginary bridge.'],
    ['Pavement chalk festival', 'Streets & Lights', 'An invented event where the street becomes a canvas.'],
    ['Community garden plots', 'Parks & Gardens', 'An imagined list of sample garden plots, shown for layout only.'],
    ['Hedge trimming days', 'Parks & Gardens', 'A fictional day when invented hedges get tidied.'],
    ['Shady Streets tree list', 'Parks & Gardens', 'An invented catalogue of imaginary tree species.'],
    ['Play area visits', 'Parks & Gardens', 'A fictional round of friendly play-area inspections.'],
    ['Pond skimmer volunteers', 'Parks & Gardens', 'An imaginary volunteer group for the made-up Fennick pond.'],
    ['Garden seed swap', 'Parks & Gardens', 'A fictional exchange of invented seed packets.'],
    ['Glimmer bin service', 'Waste & Recycling', 'An illustrative waste collection description, not real guidance.'],
    ['Cargo bike collection', 'Waste & Recycling', 'A fictional waste pickup by imaginary cargo bikes.'],
    ['Compost corner', 'Waste & Recycling', 'An invented neighbourhood compost spot.'],
    ['Mend-it workshop', 'Waste & Recycling', 'A fictional repair meet-up for imaginary appliances.'],
    ['Bulky object roundup', 'Waste & Recycling', 'An invented seasonal pickup, described for layout only.'],
    ['Recycling art show', 'Waste & Recycling', 'A made-up showcase of sculptures from imaginary scrap.'],
    ['Reading nook program', 'Libraries & Culture', 'An invented set of cosy reading corners.'],
    ['Storytelling evenings', 'Libraries & Culture', 'A fictional series of tall tales.'],
    ['Map and atlas room', 'Libraries & Culture', 'An imaginary reading room of made-up maps.'],
    ['Gallery of Small Things', 'Libraries & Culture', 'A fictional museum of tiny objects.'],
    ['Lantern craft classes', 'Libraries & Culture', 'Invented craft sessions with paper and glue.'],
    ['Open mic afternoons', 'Libraries & Culture', 'An imaginary stage for fictional performers.'],
    ['Neighbourhood noticeboard', 'Neighbourhoods', 'An invented board of sample community announcements.'],
    ['Street party kit loan', 'Neighbourhoods', 'A fictional lending shelf of bunting and trestle tables.'],
    ['Open Doors Afternoons', 'Neighbourhoods', 'An imaginary day when sample offices open for tours.'],
    ['Good Neighbour badges', 'Neighbourhoods', 'A made-up recognition scheme with enamel badges.'],
    ['Quiet hour mornings', 'Neighbourhoods', 'A fictional morning of gentler sounds.'],
    ['Block mural project', 'Neighbourhoods', 'An invented wall-painting project.'],
    ['Saturday Lantern Market', 'Business & Markets', 'A fictional weekly market of invented crafts.'],
    ['Pop-up stall showcase', 'Business & Markets', 'An imaginary showcase of sample stalls.'],
    ['Kiln Row studios', 'Business & Markets', 'A fictional row of ceramics workshops.'],
    ['Small shop spotlight', 'Business & Markets', 'An invented feature of imaginary shops.'],
    ['Makers meetup', 'Business & Markets', 'A made-up evening for crafters.'],
    ['Market lantern hire', 'Business & Markets', 'A fictional hire shelf of paper lanterns.']
  ];
  var DEPTS = [
    ['Office of Streets & Lanterns', 'Public places', 'Imaginary care of streets, lamps and benches.', '555-0110'],
    ['Parks & Gardens Office', 'Public places', 'Fictional parks, ponds and play areas.', '555-0111'],
    ['Waste & Reuse Team', 'Public places', 'Invented collection and repair programs.', '555-0112'],
    ['Heron Marsh Stewardship', 'Public places', 'A made-up wetland care group.', '555-0113'],
    ['Library & Atlas Service', 'Culture', 'Imaginary reading rooms and map collections.', '555-0120'],
    ['Lantern Arts Office', 'Culture', 'Invented festivals and craft classes.', '555-0121'],
    ['Gallery of Small Things', 'Culture', 'A fictional museum of tiny objects.', '555-0122'],
    ['Executive Office', 'Administration', 'The imaginary coordinating office.', '555-0101'],
    ['Records & Minutes Office', 'Administration', 'A made-up keeper of sample meeting notes.', '555-0102'],
    ['Open Doors Team', 'Neighbourhoods', 'Invented community days.', '555-0130'],
    ['Makers & Markets Desk', 'Neighbourhoods', 'An imaginary desk for stalls and studios.', '555-0131'],
    ['Good Neighbour Program', 'Neighbourhoods', 'A fictional recognition scheme.', '555-0132']
  ];
  var PERMITS = [
    ['Lantern Market stall permit', 'Markets & Events', 'An invented permit type for an imaginary weekly market.'],
    ['Street party permit', 'Markets & Events', 'A made-up permit type for fictional street gatherings.'],
    ['Chalk festival permit', 'Markets & Events', 'An imaginary permit type for pavement art days.'],
    ['Pop-up showcase permit', 'Markets & Events', 'A fictional permit type for temporary stalls.'],
    ['Garden shed permit', 'Gardens & Trees', 'An invented permit type shown only for list layout.'],
    ['Tree naming permit', 'Gardens & Trees', 'An imaginary permit type for tree naming ceremonies.'],
    ['Hedge sculpture permit', 'Gardens & Trees', 'A made-up permit type for ornamental hedges.'],
    ['Pond feature permit', 'Gardens & Trees', 'A fictional permit type for decorative ponds.'],
    ['Kiln studio permit', 'Workshops & Studios', 'An invented permit type for ceramics studios.'],
    ['Lantern workshop permit', 'Workshops & Studios', 'An imaginary permit type for craft workshops.'],
    ['Mural wall permit', 'Workshops & Studios', 'A fictional permit type for sample murals.'],
    ['Open studio day permit', 'Workshops & Studios', 'A made-up permit type for studio open days.']
  ];
  var BODIES = ['City Council', 'Lantern Arts Board', 'Heron Marsh Stewards', 'Shady Streets Panel', 'Library Friends Council'];
  var MEETINGS = [
    ['2099-01-12', '18:00', 0, 'Imaginary Chamber, 100 Lantern Row', ['Welcome and sample minutes', 'Review of the invented lantern schedule', 'Open floor (fictional)']],
    ['2099-01-19', '17:30', 1, 'Studio Room B (invented)', ['Festival colours discussion', 'Sample budget chart review']],
    ['2099-02-02', '18:00', 0, 'Imaginary Chamber, 100 Lantern Row', ['Market naming ideas', 'Review of invented park themes']],
    ['2099-02-09', '16:00', 2, 'Marsh Hut (invented)', ['Heron count (fictional)', 'Boardwalk painting ideas']],
    ['2099-02-23', '17:00', 3, 'Garden Room (invented)', ['Tree species list review', 'Planting day theme']],
    ['2099-03-02', '18:00', 0, 'Imaginary Chamber, 100 Lantern Row', ['Sample annual theme', 'Review of invented mural ideas']],
    ['2099-03-16', '17:30', 4, 'Reading Nook (invented)', ['Story evening plans', 'Atlas room refresh ideas']],
    ['2099-04-06', '18:00', 0, 'Imaginary Chamber, 100 Lantern Row', ['Sample neighbourhood badge ideas', 'Review of invented market hours']],
    ['2099-04-13', '17:30', 1, 'Studio Room B (invented)', ['Paper lantern supplies', 'Open mic planning']],
    ['2099-05-04', '18:00', 0, 'Imaginary Chamber, 100 Lantern Row', ['Open Doors Afternoon ideas', 'Sample thank-you notes']],
    ['2099-05-11', '16:00', 2, 'Marsh Hut (invented)', ['Reed planting ideas', 'Boardwalk bench ideas']],
    ['2099-05-25', '17:00', 3, 'Garden Room (invented)', ['Blossom calendar', 'Shade map review']],
    ['2099-06-01', '18:00', 0, 'Imaginary Chamber, 100 Lantern Row', ['Mid-year sample review', 'Invented festival wrap-up']],
    ['2099-06-15', '17:30', 4, 'Reading Nook (invented)', ['Summer story list', 'Volunteer thank-you']]
  ];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June'];

  /* ---------- Helpers ---------- */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function param(n) { try { return new URLSearchParams(location.search).get(n) || ''; } catch (e) { return ''; } }
  function fill(sel, vals) { vals.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o); }); }
  function uniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function has(sel, val) { return $$('option', sel).some(function (o) { return o.value === val; }); }

  /* ---------- Navigation ---------- */
  var menuBtn = $('#menu-toggle'), nav = $('#primary-nav');
  function closePanels(except, refocus) {
    $$('.nav-toggle').forEach(function (b) {
      if (b === except) return;
      if (b.getAttribute('aria-expanded') === 'true') {
        b.setAttribute('aria-expanded', 'false');
        $('#' + b.getAttribute('aria-controls')).hidden = true;
        if (refocus) b.focus();
      }
    });
  }
  $$('.nav-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      closePanels(b);
      b.setAttribute('aria-expanded', String(!open));
      $('#' + b.getAttribute('aria-controls')).hidden = open;
    });
  });
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
    if (open) closePanels(null);
  });
  var langBtn = $('#lang-toggle'), langPanel = $('#lang-panel');
  if (langBtn) langBtn.addEventListener('click', function () {
    var open = langBtn.getAttribute('aria-expanded') === 'true';
    langBtn.setAttribute('aria-expanded', String(!open));
    langPanel.hidden = open;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openPanel = $$('.nav-toggle').filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openPanel) { closePanels(null, false); openPanel.focus(); return; }
    if (langBtn && langBtn.getAttribute('aria-expanded') === 'true') { langBtn.setAttribute('aria-expanded', 'false'); langPanel.hidden = true; langBtn.focus(); return; }
    if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true' && getComputedStyle(menuBtn).display !== 'none') {
      menuBtn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); menuBtn.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item.has-panel')) closePanels(null);
  });
  nav && nav.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !nav.contains(e.relatedTarget)) closePanels(null);
  });

  /* ---------- Directory (services, departments, permits) ---------- */
  function directory(o) {
    var q = $(o.q), sel = $(o.sel), list = $(o.list), count = $(o.count), empty = $(o.empty), form = $(o.form);
    if (!q || !list) return;
    fill(sel, uniq(o.rows.map(function (r) { return r[1]; })));
    var initQ = param(o.qParam || 'q'); if (initQ && initQ !== 'all') q.value = initQ;
    var initG = param(o.gParam || 'group'); if (initG && has(sel, initG)) sel.value = initG;
    function run() {
      var term = q.value.trim().toLowerCase(), g = sel.value;
      var hits = o.rows.filter(function (r) {
        return (g === 'all' || r[1] === g) && (!term || (r[0] + ' ' + r[1] + ' ' + r[2]).toLowerCase().indexOf(term) !== -1);
      });
      list.innerHTML = '';
      hits.forEach(function (r) {
        var li = el('li', 'dir-item', '<h3>' + esc(r[0]) + '</h3><p class="tag">' + esc(r[1]) + '</p><p>' + esc(r[2]) + '</p>' + (r[3] ? '<p class="phone">Telephone (invented): ' + esc(r[3]) + '</p>' : ''));
        li.setAttribute('data-component', o.item);
        list.appendChild(li);
      });
      empty.hidden = hits.length !== 0;
      list.hidden = hits.length === 0;
      count.textContent = hits.length === 0 ? 'No ' + o.noun + ' found.' : plural(hits.length, o.one, o.noun) + ' shown of ' + o.rows.length + '.';
    }
    q.addEventListener('input', run);
    sel.addEventListener('change', run);
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    form.addEventListener('reset', function () { setTimeout(run, 0); });
    run();
  }
  directory({ form: '#svc-form', q: '#svc-q', sel: '#svc-group', list: '#svc-list', count: '#svc-count', empty: '#svc-empty', rows: SERVICES, item: 'service-item', noun: 'services', one: 'service' });
  directory({ form: '#dept-form', q: '#dept-q', sel: '#dept-group', list: '#dept-list', count: '#dept-count', empty: '#dept-empty', rows: DEPTS, item: 'department-item', noun: 'departments', one: 'department' });
  directory({ form: '#prm-form', q: '#prm-q', sel: '#prm-cat', list: '#prm-list', count: '#prm-count', empty: '#prm-empty', rows: PERMITS, item: 'permit-item', noun: 'sample permit types', one: 'sample permit type', qParam: 'search', gParam: 'category' });

  /* ---------- Meetings table ---------- */
  var mBody = $('#mtg-body'), mMonth = $('#mtg-month');
  if (mBody) {
    var rowsEl = $('#mtg-body-rows'), mCount = $('#mtg-count'), mEmpty = $('#mtg-empty'), tbl = $('#mtg-table');
    fill(mBody, BODIES); fill(mMonth, MONTHS);
    var pb = param('body'); if (pb && has(mBody, pb)) mBody.value = pb;
    var runM = function () {
      var b = mBody.value, m = mMonth.value;
      var hits = MEETINGS.filter(function (r) {
        return (b === 'all' || BODIES[r[2]] === b) && (m === 'all' || MONTHS[parseInt(r[0].slice(5, 7), 10) - 1] === m);
      });
      rowsEl.innerHTML = '';
      hits.forEach(function (r) {
        var d = r[0], tr = el('tr', null,
          '<th scope="row" data-label="Date"><time datetime="' + d + '">' + d.slice(8) + ' ' + MONTHS[parseInt(d.slice(5, 7), 10) - 1] + ' 2099</time></th>' +
          '<td data-label="Time">' + r[1] + '</td><td data-label="Body">' + esc(BODIES[r[2]]) + '</td><td data-label="Location (invented)">' + esc(r[3]) + '</td>' +
          '<td data-label="Sample agenda"><details><summary>Sample agenda <span class="sr-only">for ' + esc(BODIES[r[2]]) + ' on ' + d + '</span></summary><ol>' + r[4].map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ol></details></td>');
        tr.setAttribute('data-component', 'meeting-row');
        rowsEl.appendChild(tr);
      });
      tbl.hidden = hits.length === 0; mEmpty.hidden = hits.length !== 0;
      mCount.textContent = hits.length === 0 ? 'No meetings found.' : plural(hits.length, 'meeting', 'meetings') + ' shown of ' + MEETINGS.length + '.';
    };
    mBody.addEventListener('change', runM); mMonth.addEventListener('change', runM);
    $('#mtg-form').addEventListener('reset', function () { setTimeout(runM, 0); });
    runM();
  }

  /* ---------- Report-an-issue simulation ---------- */
  var rf = $('#rep-form');
  if (rf) {
    var skipClear = false, summary = $('#rep-summary'), slist = $('#rep-summary-list'), outcome = $('#rep-outcome');
    var rules = [
      ['rep-type', function (v) { return v ? '' : 'Choose a sample type of issue.'; }],
      ['rep-loc', function (v) { return v.trim() ? '' : 'Enter an invented location.'; }],
      ['rep-desc', function (v) { return v.trim().length >= 10 ? '' : 'Describe the sample issue in at least 10 characters.'; }],
      ['rep-mail', function (v) { return !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a made-up email address in the form name@quillhaven.example, or leave it empty.'; }],
      ['rep-ack', function (v, i) { return i.checked ? '' : 'Tick the box to confirm you understand this is a demo.'; }]
    ];
    var clear = function () {
      rules.forEach(function (r) { var i = $('#' + r[0]), m = $('#' + r[0] + '-err'); i.removeAttribute('aria-invalid'); m.hidden = true; m.textContent = ''; });
      summary.hidden = true; slist.innerHTML = ''; outcome.hidden = true;
    };
    rf.addEventListener('submit', function (e) {
      e.preventDefault(); clear();
      var errs = [];
      rules.forEach(function (r) {
        var i = $('#' + r[0]), msg = r[1](i.value, i);
        if (msg) {
          errs.push([r[0], msg]); i.setAttribute('aria-invalid', 'true');
          var m = $('#' + r[0] + '-err'); m.textContent = 'Error: ' + msg; m.hidden = false;
        }
      });
      if (errs.length) {
        slist.innerHTML = errs.map(function (x) { return '<li><a href="#' + x[0] + '">' + esc(x[1]) + '</a></li>'; }).join('');
        $('#rep-summary-title').textContent = plural(errs.length, 'problem', 'problems') + ' to fix';
        summary.hidden = false; summary.focus();
      } else { skipClear = true; rf.reset(); outcome.hidden = false; outcome.focus(); }
    });
    slist.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      e.preventDefault(); var t = $(a.getAttribute('href')); if (t) t.focus();
    });
    rf.addEventListener('reset', function () { setTimeout(function () { if (skipClear) { skipClear = false; return; } clear(); }, 0); });
  }
})();
