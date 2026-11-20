/* Larkspur Weather (WX-02) - shared behavior. Vanilla JS, no network, works from file://.
   ALL weather values are FICTIONAL SAMPLE DATA generated from the inline seeds below. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- inline sample data (fictional) ---------- */
  var COND = ['Clear', 'Partly cloudy', 'Cloudy', 'Showers', 'Thunderstorms', 'Fog', 'Light snow'];
  var CHANCE = [5, 15, 30, 65, 80, 25, 55];
  // base = mean temp F, swing = daily half-range F, wind mph, hum %, seq = condition code per 3-hour block / day
  var LOC = [
    { id: 'alder-ridge', name: 'Alder Ridge', region: 'Northmere', base: 61, swing: 9, wind: 8, hum: 58, seq: '1121033120', x: 190, y: 70 },
    { id: 'marlow-bay', name: 'Marlow Bay', region: 'Southcoast', base: 78, swing: 6, wind: 12, hum: 76, seq: '3430343103', x: 120, y: 210 },
    { id: 'pinecrest-hollow', name: 'Pinecrest Hollow', region: 'Highvale', base: 44, swing: 12, wind: 6, hum: 52, seq: '6656266562', x: 300, y: 110 },
    { id: 'sablewood', name: 'Sablewood', region: 'Dry Basin', base: 94, swing: 16, wind: 10, hum: 22, seq: '0001000010', x: 330, y: 230 },
    { id: 'cinder-falls', name: 'Cinder Falls', region: 'Highvale', base: 52, swing: 11, wind: 14, hum: 47, seq: '1210121012', x: 260, y: 150 },
    { id: 'harrow-point', name: 'Harrow Point', region: 'Southcoast', base: 82, swing: 5, wind: 15, hum: 80, seq: '4343433434', x: 70, y: 250 },
    { id: 'quill-harbor', name: 'Quill Harbor', region: 'Northmere', base: 49, swing: 7, wind: 17, hum: 71, seq: '5225322522', x: 90, y: 60 },
    { id: 'wren-meadows', name: 'Wren Meadows', region: 'Central Plain', base: 68, swing: 10, wind: 11, hum: 55, seq: '1033110331', x: 210, y: 180 }
  ];
  var ALERTS = [
    { loc: 'marlow-bay', level: 'Warning', title: 'Sample thunderstorm warning', text: 'Invented alert: fictional storm cells are drawn over Marlow Bay in this exercise.' },
    { loc: 'harrow-point', level: 'Watch', title: 'Sample flood watch', text: 'Invented alert: pretend heavy rain on a fictional coastline.' },
    { loc: 'sablewood', level: 'Advisory', title: 'Sample heat advisory', text: 'Invented alert: pretend high temperatures in a fictional basin.' },
    { loc: 'pinecrest-hollow', level: 'Advisory', title: 'Sample snow advisory', text: 'Invented alert: pretend light snow in fictional hills.' }
  ];
  var ARTICLES = [
    { id: 'a1', topic: 'Science', title: 'Why sample fog forms in valleys (a made-up explainer)', summary: 'A short fictional primer on cool, still air and moisture.', body: ['This is original sample copy written for a research exercise. It does not report on any real event.', 'In the story world, cold air drains into low ground overnight and a thin layer of moisture hangs above the creek.'] },
    { id: 'a2', topic: 'Storms', title: 'Reading a pretend storm track', summary: 'How to read the dotted line and shaded cone on the sample tropical page.', body: ['The tracks on the storms page are invented. The cone is drawn only to show how a cone could be explained.', 'Always treat any real forecast cone as guidance and follow real official sources when it matters.'] },
    { id: 'a3', topic: 'Climate', title: 'Ten sample years of imaginary rainfall', summary: 'What the fictional historical table can and cannot tell you.', body: ['Every figure in the history tool is generated from a few invented numbers.', 'The point is to exercise a data table, not to describe any real place.'] },
    { id: 'a4', topic: 'Preparedness', title: 'A sample go-bag list for a fictional weekend', summary: 'Checklist-style article that pairs with the demo preparedness page.', body: ['Water, a light, a phone charger and a paper copy of important numbers appear in most real lists.', 'This article is a demonstration of article layout.'] },
    { id: 'a5', topic: 'Science', title: 'Units explained: Fahrenheit, Celsius and the sample toggle', summary: 'How the settings menu converts every sample value on the site.', body: ['Use the Settings button in the header to switch temperature, wind and precipitation units.', 'Your choice is kept in this browser only.'] },
    { id: 'a6', topic: 'Storms', title: 'Thunderstorms in a pretend season', summary: 'Fictional outlook notes for the sample Southcoast region.', body: ['This outlook is not real. It shows how longer articles can be collapsed and expanded.', 'Nothing here should be used to plan anything.'] }
  ];
  var VIDEOS = [
    { id: 'v1', topic: 'Explainers', title: 'Sample explainer: how a radar loop works', len: '2:10' },
    { id: 'v2', topic: 'Storms', title: 'Sample storm-season preview', len: '3:05' },
    { id: 'v3', topic: 'Explainers', title: 'Sample guide to the hourly table', len: '1:45' },
    { id: 'v4', topic: 'Preparedness', title: 'Sample ten-minute home safety walkthrough', len: '4:30' },
    { id: 'v5', topic: 'Climate', title: 'Sample look at ten fictional years', len: '2:50' },
    { id: 'v6', topic: 'Storms', title: 'Sample tour of the interactive map', len: '3:20' }
  ];
  var STATIONS = [
    { id: 'LRKS-001', name: 'Orchard Lane Roof', loc: 'alder-ridge', net: 'Weather station', off: 1 },
    { id: 'LRKS-002', name: 'Lighthouse Pier', loc: 'marlow-bay', net: 'Weather station', off: -2 },
    { id: 'LRKS-003', name: 'Ski Hut Mast', loc: 'pinecrest-hollow', net: 'Weather station', off: -4 },
    { id: 'LRKS-004', name: 'Dune Garden', loc: 'sablewood', net: 'Weather station', off: 2 },
    { id: 'LRKS-005', name: 'School Yard East', loc: 'cinder-falls', net: 'Community school', off: 0 },
    { id: 'LRKS-006', name: 'Breakwater Cafe', loc: 'harrow-point', net: 'Weather station', off: 1 },
    { id: 'LRKS-007', name: 'Harbor Air Node 4', loc: 'quill-harbor', net: 'Air quality sensor', off: -1 },
    { id: 'LRKS-008', name: 'Meadow Library', loc: 'wren-meadows', net: 'Community school', off: 3 },
    { id: 'LRKS-009', name: 'Ridge Air Node 2', loc: 'alder-ridge', net: 'Air quality sensor', off: 0 },
    { id: 'LRKS-010', name: 'Bay Air Node 7', loc: 'marlow-bay', net: 'Air quality sensor', off: 1 }
  ];
  var STORMS = [
    { id: 's1', name: 'Hurricane Zephyra', cat: 'Category 3 (sample)', basin: 'Western Basin', status: 'Open', wind: 120, pts: [[30, 230], [90, 200], [150, 150], [210, 120], [270, 70]], note: 'An invented major storm moving north-east across fictional open water.' },
    { id: 's2', name: 'Tropical Storm Orlo', cat: 'Tropical storm (sample)', basin: 'Western Basin', status: 'Open', wind: 50, pts: [[40, 90], [100, 110], [160, 150], [220, 200], [280, 230]], note: 'An invented weak storm drifting south-east, labelled for demonstration only.' },
    { id: 's3', name: 'Hurricane Juniper', cat: 'Category 1 (sample)', basin: 'Eastern Basin', status: 'Open', wind: 80, pts: [[280, 240], [240, 200], [200, 170], [170, 120], [120, 80]], note: 'An invented hurricane curving north-west.' },
    { id: 's4', name: 'Tropical Depression Fennel', cat: 'Depression (sample)', basin: 'Western Basin', status: 'Closed', wind: 30, pts: [[60, 150], [120, 160], [180, 170], [240, 190]], note: 'A closed (finished) invented system.' },
    { id: 's5', name: 'Hurricane Thistle', cat: 'Category 2 (sample)', basin: 'Western Basin', status: 'Closed', wind: 100, pts: [[20, 60], [80, 100], [140, 150], [200, 190], [260, 220]], note: 'A closed invented hurricane kept for the empty-state and filter demo.' }
  ];
  // monthly normals (F / in) for history - fictional
  var HIST_HI = [40, 43, 52, 62, 72, 81, 86, 85, 77, 65, 52, 43];
  var HIST_LO = [24, 26, 33, 42, 52, 61, 66, 65, 57, 45, 35, 27];
  var HIST_PR = [3.1, 2.8, 3.6, 3.9, 4.4, 4.0, 4.2, 3.8, 3.5, 3.3, 3.4, 3.2];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sample Day 1', 'Sample Day 2', 'Sample Day 3', 'Sample Day 4', 'Sample Day 5', 'Sample Day 6', 'Sample Day 7', 'Sample Day 8', 'Sample Day 9', 'Sample Day 10'];

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function locById(id) { for (var i = 0; i < LOC.length; i++) { if (LOC[i].id === id) return LOC[i]; } return null; }
  function locName(l) { return l.name + ', ' + l.region; }
  function param(k) { var m = new RegExp('[?&]' + k + '=([^&]*)').exec(location.search); return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; }
  var page = document.body.getAttribute('data-page') || '';
  var renderers = [];

  /* ---------- preferences ---------- */
  var DEFAULTS = { temp: 'F', wind: 'mph', precip: 'in', density: 'comfortable', theme: 'system' };
  var prefs = {};
  function loadPrefs() {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem('larkspur.prefs') || '{}') || {}; } catch (e) { saved = {}; }
    for (var k in DEFAULTS) { prefs[k] = saved[k] || DEFAULTS[k]; }
  }
  function savePrefs() { try { localStorage.setItem('larkspur.prefs', JSON.stringify(prefs)); return true; } catch (e) { return false; } }
  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* ignore */ } }
  function unstore(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  function fT(f) { return prefs.temp === 'C' ? Math.round((f - 32) * 5 / 9) + '°C' : Math.round(f) + '°F'; }
  function fW(m) { return prefs.wind === 'kmh' ? Math.round(m * 1.609) + ' km/h' : Math.round(m) + ' mph'; }
  function fP(i) { return prefs.precip === 'mm' ? (i * 25.4).toFixed(1) + ' mm' : i.toFixed(2) + ' in'; }
  function uT() { return prefs.temp === 'C' ? '°C' : '°F'; }
  function uW() { return prefs.wind === 'kmh' ? 'km/h' : 'mph'; }
  function uP() { return prefs.precip === 'mm' ? 'mm' : 'in'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function applyPrefs() {
    var h = document.documentElement;
    h.setAttribute('data-density', prefs.density);
    if (prefs.theme === 'system') { h.removeAttribute('data-theme'); } else { h.setAttribute('data-theme', prefs.theme); }
    $$('[data-q]').forEach(function (el) {
      var v = parseFloat(el.getAttribute('data-v'));
      var q = el.getAttribute('data-q');
      el.textContent = q === 'temp' ? fT(v) : q === 'wind' ? fW(v) : fP(v);
    });
    $$('[data-unit]').forEach(function (el) {
      var u = el.getAttribute('data-unit');
      el.textContent = u === 'temp' ? uT() : u === 'wind' ? uW() : uP();
    });
    $$('input[name="pref-temp"]').forEach(function (r) { r.checked = r.value === prefs.temp; });
    $$('input[name="pref-wind"]').forEach(function (r) { r.checked = r.value === prefs.wind; });
    $$('input[name="pref-precip"]').forEach(function (r) { r.checked = r.value === prefs.precip; });
    $$('input[name="pref-density"]').forEach(function (r) { r.checked = r.value === prefs.density; });
    $$('input[name="pref-theme"]').forEach(function (r) { r.checked = r.value === prefs.theme; });
  }
  function refresh() { applyPrefs(); renderers.forEach(function (fn) { fn(); }); }

  /* ---------- sample weather generator (deterministic) ---------- */
  function hourly(l) {
    var rows = [];
    for (var h = 0; h < 24; h++) {
      var code = parseInt(l.seq.charAt(Math.floor(h / 3) % 10), 10);
      var t = l.base + l.swing * Math.sin(2 * Math.PI * (h - 9) / 24);
      var chance = Math.min(95, CHANCE[code] + (h % 4) * 3);
      rows.push({
        h: h, code: code, cond: COND[code], t: t, feels: t - (l.wind > 12 ? 3 : 1) + (l.hum > 70 ? 3 : 0),
        chance: chance, amt: chance >= 60 ? chance / 100 * 0.1 : 0, wind: l.wind + (h % 5), hum: Math.max(10, Math.min(98, l.hum - (t - l.base) + (code === 3 || code === 4 ? 10 : 0)))
      });
    }
    return rows;
  }
  function daily(l) {
    var rows = [];
    for (var d = 0; d < 10; d++) {
      var code = parseInt(l.seq.charAt(d), 10);
      var drift = Math.sin(d * 1.3) * 4;
      var chance = Math.min(95, CHANCE[code] + (d % 3) * 4);
      rows.push({ d: d, code: code, cond: COND[code], hi: l.base + l.swing * 0.8 + drift, lo: l.base - l.swing * 0.8 + drift, chance: chance, amt: chance >= 60 ? chance / 100 * 0.35 : 0, wind: l.wind + (d % 4) });
    }
    return rows;
  }
  function current(l) { return hourly(l)[14]; }

  /* ---------- error summary / field errors ---------- */
  function clearErrors(form) {
    var s = $('.error-summary', form); if (s) { s.parentNode.removeChild(s); }
    $$('.field-error', form).forEach(function (e) { e.parentNode.removeChild(e); });
    $$('[aria-invalid]', form).forEach(function (f) { f.removeAttribute('aria-invalid'); var d = (f.getAttribute('aria-describedby') || '').replace(/\S*-err\b/, '').trim(); if (d) { f.setAttribute('aria-describedby', d); } else { f.removeAttribute('aria-describedby'); } });
  }
  function showErrors(form, errors) {
    clearErrors(form);
    var sum = document.createElement('div');
    sum.className = 'error-summary'; sum.setAttribute('role', 'alert'); sum.tabIndex = -1;
    var html = '<h2>There ' + (errors.length === 1 ? 'is 1 problem' : 'are ' + errors.length + ' problems') + ' with this form</h2><ul>';
    errors.forEach(function (er) { html += '<li><a href="#' + er.field.id + '">' + er.msg + '</a></li>'; });
    sum.innerHTML = html + '</ul>';
    form.insertBefore(sum, form.firstChild);
    errors.forEach(function (er) {
      var p = document.createElement('p'); p.className = 'field-error'; p.id = er.field.id + '-err'; p.textContent = er.msg;
      er.field.parentNode.insertBefore(p, er.field.nextSibling);
      er.field.setAttribute('aria-invalid', 'true');
      er.field.setAttribute('aria-describedby', ((er.field.getAttribute('aria-describedby') || '') + ' ' + p.id).trim());
    });
    $$('.error-summary a', form).forEach(function (a) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) { t.focus(); } });
    });
    sum.focus();
  }

  /* ---------- tabs ---------- */
  function initTabs(root) {
    var tabs = $$('[role="tab"]', root);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls')); if (p) { p.hidden = !on; }
      });
      if (focus) { tab.focus(); }
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') { n = tabs[(i + 1) % tabs.length]; }
        else if (e.key === 'ArrowLeft') { n = tabs[(i - 1 + tabs.length) % tabs.length]; }
        else if (e.key === 'Home') { n = tabs[0]; }
        else if (e.key === 'End') { n = tabs[tabs.length - 1]; }
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    return select;
  }

  /* ---------- global header behaviour ---------- */
  function initHeader() {
    var menuBtn = $('.menu-btn'), nav = $('#primary-nav');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', function () {
        var open = menuBtn.getAttribute('aria-expanded') !== 'true';
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        nav.classList.toggle('open', open);
      });
    }
    var drops = $$('.nav-drop-btn');
    function closeDrops(except) {
      drops.forEach(function (b) {
        if (b !== except) { b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true; }
      });
    }
    drops.forEach(function (b) {
      var list = document.getElementById(b.getAttribute('aria-controls'));
      list.hidden = true;
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true';
        closeDrops(b);
        b.setAttribute('aria-expanded', open ? 'true' : 'false'); list.hidden = !open;
      });
    });
    var sBtn = $('#settings-btn'), sPanel = $('#settings-panel');
    function closeSettings(focus) { if (sBtn) { sBtn.setAttribute('aria-expanded', 'false'); sPanel.hidden = true; if (focus) { sBtn.focus(); } } }
    if (sBtn && sPanel) {
      sPanel.hidden = true;
      sBtn.addEventListener('click', function () {
        var open = sBtn.getAttribute('aria-expanded') !== 'true';
        sBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); sPanel.hidden = !open;
        if (open) { closeDrops(null); }
      });
      sPanel.addEventListener('change', function (e) {
        var n = e.target.name; if (!n || n.indexOf('pref-') !== 0) { return; }
        prefs[n.slice(5)] = e.target.value;
        var ok = savePrefs();
        refresh();
        var st = $('#settings-status'); if (st) { st.textContent = ok ? 'Saved in this browser.' : 'Applied for this page only (browser storage is unavailable).'; }
      });
      var rs = $('#settings-reset');
      if (rs) { rs.addEventListener('click', function () { for (var k in DEFAULTS) { prefs[k] = DEFAULTS[k]; } savePrefs(); refresh(); $('#settings-status').textContent = 'Settings reset to defaults.'; }); }
    }
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      var openDrop = drops.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
      if (openDrop) { closeDrops(null); openDrop.focus(); return; }
      if (sBtn && sBtn.getAttribute('aria-expanded') === 'true') { closeSettings(true); return; }
      if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true' && getComputedStyle(menuBtn).display !== 'none') { menuBtn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); menuBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest) { return; }
      if (!e.target.closest('.nav-drop')) { closeDrops(null); }
      if (!e.target.closest('.settings-wrap') && sBtn && sBtn.getAttribute('aria-expanded') === 'true') { closeSettings(false); }
    });
    // location search
    var form = $('.loc-search'), dl = $('#loc-list');
    if (dl) { dl.innerHTML = LOC.map(function (l) { return '<option value="' + locName(l) + '"></option>'; }).join(''); }
    if (form) {
      form.addEventListener('submit', function (e) {
        var inp = $('#loc-q'); var err = $('#loc-q-error');
        if (!inp.value.trim()) {
          e.preventDefault(); err.textContent = 'Enter a sample place name, for example "Alder".'; err.hidden = false;
          inp.setAttribute('aria-invalid', 'true'); inp.setAttribute('aria-describedby', 'loc-q-error'); inp.focus();
        } else { err.hidden = true; inp.removeAttribute('aria-invalid'); }
      });
    }
  }

  /* ---------- pages ---------- */
  function sampleCaption(txt) { return 'Sample data (fictional): ' + txt; }

  function tableWrap(label, html) { return '<div class="table-scroll" role="region" tabindex="0" aria-label="' + label + '">' + html + '</div>'; }

  var pages = {};

  pages.home = function () {
    var l = locById('alder-ridge');
    var tb = $('#home-hourly');
    renderers.push(function () {
      var rows = hourly(l).slice(14, 22);
      tb.innerHTML = '<caption>' + sampleCaption('next 8 sample hours for ' + locName(l)) + '</caption><thead><tr><th scope="col">Sample time</th><th scope="col">Condition</th><th scope="col">Temp (' + uT() + ')</th><th scope="col">Rain chance</th></tr></thead><tbody>' +
        rows.map(function (r) { return '<tr><th scope="row">' + pad(r.h) + ':00</th><td>' + r.cond + '</td><td>' + fT(r.t) + '</td><td>' + r.chance + '%</td></tr>'; }).join('') + '</tbody>';
    });
    var ul = $('#home-alerts');
    ul.innerHTML = ALERTS.slice(0, 3).map(function (a) {
      return '<li><strong>' + a.level + ' (sample)</strong>: <a href="forecast.html?loc=' + a.loc + '#alerts">' + a.title + '</a> - ' + locName(locById(a.loc)) + '</li>';
    }).join('');
    renderers.push(function () { renderFavs($('#fav-list'), $('#fav-empty')); });
  };

  function getFavs() { var v = unstore('larkspur.favs'); return v ? v.split(',').filter(function (id) { return locById(id); }) : []; }
  function renderFavs(ul, empty) {
    if (!ul) { return; }
    var f = getFavs();
    empty.hidden = f.length > 0;
    ul.innerHTML = f.map(function (id) { var l = locById(id), c = current(l); return '<li><a href="forecast.html?loc=' + id + '">' + locName(l) + '</a> <span class="muted">sample: ' + fT(c.t) + ', ' + c.cond + '</span></li>'; }).join('');
  }

  pages.forecast = function () {
    var q = param('q').trim(), id = param('loc');
    var h1 = $('#page-title'), main = $('#forecast-view'), results = $('#results-view');
    if (!id && q) {
      var ql = q.toLowerCase();
      var m = LOC.filter(function (l) { return locName(l).toLowerCase().indexOf(ql) > -1 || l.id.indexOf(ql.replace(/\s+/g, '-')) > -1; });
      if (m.length === 1) { location.replace('forecast.html?loc=' + m[0].id); return; }
      main.hidden = true; results.hidden = false;
      h1.textContent = 'Location search results';
      document.title = 'Location search - Larkspur Weather (sample data)';
      var list = m.length ? m : LOC;
      var st = $('#results-status');
      st.textContent = m.length ? m.length + ' sample locations match "' + q + '".' : 'No sample locations match "' + q + '". Showing all ' + LOC.length + ' sample locations instead.';
      $('#results-list').innerHTML = list.map(function (l) { return '<li><a href="forecast.html?loc=' + l.id + '">' + locName(l) + '</a></li>'; }).join('');
      return;
    }
    var l = locById(id) || locById('alder-ridge');
    var invalid = id && !locById(id);
    h1.textContent = locName(l);
    document.title = locName(l) + ' - sample conditions - Larkspur Weather';
    if (invalid) { $('#loc-notice').hidden = false; $('#loc-notice').textContent = 'Sample location "' + id + '" was not found, so the default sample location is shown.'; }
    var sel = initTabs($('#forecast-tabs'));
    var hash = location.hash.replace('#', '');
    if (hash === 'alerts') { sel($('#tab-alerts'), false); }
    var fav = $('#fav-toggle');
    function favState() { var on = getFavs().indexOf(l.id) > -1; fav.setAttribute('aria-pressed', on ? 'true' : 'false'); fav.textContent = on ? 'Remove from favorites' : 'Save to favorites'; }
    fav.addEventListener('click', function () {
      var f = getFavs(), i = f.indexOf(l.id); if (i > -1) { f.splice(i, 1); } else { f.push(l.id); }
      store('larkspur.favs', f.join(',')); favState(); $('#fav-status').textContent = i > -1 ? 'Removed from favorites.' : 'Saved to favorites in this browser.';
    });
    favState();
    renderers.push(function () {
      var c = current(l);
      $('#now-temp').textContent = fT(c.t);
      $('#now-cond').textContent = c.cond;
      $('#now-feels').textContent = fT(c.feels);
      $('#now-wind').textContent = fW(c.wind);
      $('#now-hum').textContent = Math.round(c.hum) + '%';
      $('#now-rain').textContent = c.chance + '%';
      var hr = hourly(l);
      $('#hourly-table').innerHTML = '<caption>' + sampleCaption('24 sample hours for ' + locName(l) + ', "Sample Day 1". Invented values, not a forecast.') + '</caption><thead><tr><th scope="col">Sample time</th><th scope="col">Condition</th><th scope="col">Temp (' + uT() + ')</th><th scope="col">Feels like (' + uT() + ')</th><th scope="col">Rain chance</th><th scope="col">Rain amount (' + uP() + ')</th><th scope="col">Wind (' + uW() + ')</th><th scope="col">Humidity</th></tr></thead><tbody>' +
        hr.map(function (r) { return '<tr><th scope="row">' + pad(r.h) + ':00</th><td>' + r.cond + '</td><td>' + fT(r.t) + '</td><td>' + fT(r.feels) + '</td><td>' + r.chance + '%</td><td>' + fP(r.amt) + '</td><td>' + fW(r.wind) + '</td><td>' + Math.round(r.hum) + '%</td></tr>'; }).join('') + '</tbody>';
      var dy = daily(l);
      $('#daily-table').innerHTML = '<caption>' + sampleCaption('10 sample days for ' + locName(l) + '. Invented values, not a forecast.') + '</caption><thead><tr><th scope="col">Day</th><th scope="col">Condition</th><th scope="col">High (' + uT() + ')</th><th scope="col">Low (' + uT() + ')</th><th scope="col">Rain chance</th><th scope="col">Rain amount (' + uP() + ')</th><th scope="col">Wind (' + uW() + ')</th></tr></thead><tbody>' +
        dy.map(function (r) { return '<tr><th scope="row">' + DAYS[r.d] + '</th><td>' + r.cond + '</td><td>' + fT(r.hi) + '</td><td>' + fT(r.lo) + '</td><td>' + r.chance + '%</td><td>' + fP(r.amt) + '</td><td>' + fW(r.wind) + '</td></tr>'; }).join('') + '</tbody>';
    });
    var al = ALERTS.filter(function (a) { return a.loc === l.id; });
    $('#alerts-list').innerHTML = al.length ? al.map(function (a) { return '<li><h3>' + a.level + ' (sample): ' + a.title + '</h3><p>' + a.text + '</p></li>'; }).join('') : '';
    $('#alerts-empty').hidden = al.length > 0;
  };

  pages.maps = function () {
    var sel = $('#map-filter'), items = $$('.map-card'), st = $('#map-status');
    sel.addEventListener('change', function () {
      var n = 0;
      items.forEach(function (it) { var show = sel.value === 'all' || it.getAttribute('data-kind') === sel.value; it.hidden = !show; if (show) { n++; } });
      st.textContent = n + ' of ' + items.length + ' sample maps shown.';
    });
  };

  /* radar: five static frames, drifting blobs */
  pages.radar = function () {
    var svg = $('#radar-svg'), slider = $('#frame'), play = $('#play'), desc = $('#radar-desc'), region = $('#radar-region'), product = $('#radar-product');
    var timer = null;
    var seeds = { northmere: [[90, 70, 38], [200, 110, 26], [250, 60, 20]], southcoast: [[80, 200, 42], [170, 230, 30], [260, 170, 24]], highvale: [[120, 120, 30], [230, 80, 36], [280, 200, 22]] };
    var cols = { precip: ['#2c7fb8', '#41ab5d', '#d9a400'], clouds: ['#9aa7b4', '#b9c3cc', '#dde3e8'] };
    function draw() {
      var f = parseInt(slider.value, 10), s = seeds[region.value], c = cols[product.value];
      var out = '<rect width="360" height="300" fill="var(--map-sea)"/><path d="M0 40 L110 20 L230 50 L360 25 L360 300 L0 300Z" fill="var(--map-land)" stroke="var(--border)"/>';
      s.forEach(function (b, i) {
        var x = b[0] + f * 9 * (i % 2 ? 1 : 0.6), y = b[1] + f * 3 * (i % 2 ? -0.6 : 0.8), r = b[2];
        out += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + r * 1.3 + '" ry="' + r + '" fill="' + c[2] + '" opacity="0.55"/><ellipse cx="' + x + '" cy="' + y + '" rx="' + r * 0.85 + '" ry="' + r * 0.65 + '" fill="' + c[1] + '" opacity="0.7"/><ellipse cx="' + x + '" cy="' + y + '" rx="' + r * 0.4 + '" ry="' + r * 0.3 + '" fill="' + c[0] + '" opacity="0.85"/>';
      });
      out += '<text x="10" y="290" font-size="13" fill="var(--text)">SAMPLE ILLUSTRATION - not radar</text>';
      svg.innerHTML = out;
      var names = { northmere: 'Northmere', southcoast: 'Southcoast', highvale: 'Highvale' };
      desc.textContent = 'Sample frame ' + (f + 1) + ' of 6, ' + (product.value === 'precip' ? 'precipitation' : 'cloud') + ' layer, ' + names[region.value] + ' region. Three invented blobs drift slowly east.';
      $('#frame-out').textContent = (f + 1) + ' of 6';
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } play.textContent = 'Play loop'; play.setAttribute('aria-pressed', 'false'); }
    play.addEventListener('click', function () {
      if (timer) { stop(); return; }
      play.textContent = 'Pause loop'; play.setAttribute('aria-pressed', 'true');
      timer = setInterval(function () { slider.value = (parseInt(slider.value, 10) + 1) % 6; draw(); }, 1200);
    });
    $('#step-back').addEventListener('click', function () { stop(); slider.value = (parseInt(slider.value, 10) + 5) % 6; draw(); });
    $('#step-fwd').addEventListener('click', function () { stop(); slider.value = (parseInt(slider.value, 10) + 1) % 6; draw(); });
    slider.addEventListener('input', function () { stop(); draw(); });
    region.addEventListener('change', draw); product.addEventListener('change', draw);
    draw();
  };

  /* interactive map: layers + marker buttons + data table */
  pages.map = function () {
    var svg = $('#imap-svg'), detail = $('#imap-detail'), layerSel = $('#imap-layer'), tbl = $('#imap-table');
    var q = param('layer'); if (q && $('#imap-layer option[value="' + q + '"]')) { layerSel.value = q; }
    var info = {
      temp: 'Marker label = sample temperature.', clouds: 'Marker label = sample cloud condition (satellite-style approximation, invented).',
      severe: 'Marker label = sample alert level. Shaded areas are invented.', convective: 'Marker label = sample thunderstorm chance.', wildfire: 'Marker label = sample wildfire-risk word. Invented.'
    };
    var selected = null;
    function val(l) {
      var c = current(l);
      if (layerSel.value === 'temp') { return fT(c.t); }
      if (layerSel.value === 'clouds') { return c.cond; }
      if (layerSel.value === 'severe') { var a = ALERTS.filter(function (x) { return x.loc === l.id; })[0]; return a ? a.level : 'None'; }
      if (layerSel.value === 'convective') { return c.code === 4 ? 'High' : c.code === 3 ? 'Medium' : 'Low'; }
      return l.hum < 30 ? 'High' : l.hum < 50 ? 'Moderate' : 'Low';
    }
    function layerName() { return layerSel.options[layerSel.selectedIndex].text; }
    function render() {
      var shade = { temp: '#e07a3f', clouds: '#9aa7b4', severe: '#c0392b', convective: '#d9a400', wildfire: '#a0522d' }[layerSel.value];
      var out = '<rect width="400" height="300" fill="var(--map-sea)"/><path d="M0 30 L120 10 L260 40 L400 15 L400 300 L0 300Z" fill="var(--map-land)" stroke="var(--border)"/>';
      out += '<ellipse cx="120" cy="215" rx="70" ry="40" fill="' + shade + '" opacity="0.28"/><ellipse cx="320" cy="225" rx="60" ry="35" fill="' + shade + '" opacity="0.2"/>';
      out += '<text x="8" y="292" font-size="12" fill="var(--text)">SAMPLE ILLUSTRATION - fictional places and shading</text>';
      LOC.forEach(function (l) { out += '<text x="' + (l.x + 12) + '" y="' + (l.y + 4) + '" font-size="11" fill="var(--text)">' + l.name + '</text>'; });
      svg.innerHTML = out;
      var wrap = $('#imap-markers'); wrap.innerHTML = '';
      LOC.forEach(function (l) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'marker';
        b.style.left = (l.x / 400 * 100) + '%'; b.style.top = (l.y / 300 * 100) + '%';
        b.setAttribute('aria-pressed', selected === l.id ? 'true' : 'false');
        b.setAttribute('aria-label', locName(l) + ', ' + layerName() + ': ' + val(l) + ' (sample)');
        b.textContent = val(l);
        b.addEventListener('click', function () { selected = l.id; render(); showDetail(l); var nb = $$('.marker').filter(function (m) { return m.getAttribute('aria-label').indexOf(locName(l)) === 0; })[0]; if (nb) { nb.focus(); } });
        wrap.appendChild(b);
      });
      $('#imap-info').textContent = info[layerSel.value];
      tbl.innerHTML = '<caption>' + sampleCaption(layerName() + ' values at 8 fictional places (text alternative to the map)') + '</caption><thead><tr><th scope="col">Place</th><th scope="col">' + layerName() + '</th><th scope="col">Forecast page</th></tr></thead><tbody>' +
        LOC.map(function (l) { return '<tr><th scope="row">' + locName(l) + '</th><td>' + val(l) + '</td><td><a href="forecast.html?loc=' + l.id + '">Open sample forecast<span class="sr-only"> for ' + locName(l) + '</span></a></td></tr>'; }).join('') + '</tbody>';
    }
    function showDetail(l) {
      var c = current(l);
      detail.innerHTML = '<h3>' + locName(l) + '</h3><p class="badge-line"><span class="badge">SAMPLE DATA</span></p><p>' + layerName() + ': <strong>' + val(l) + '</strong>. Sample temperature ' + fT(c.t) + ', ' + c.cond.toLowerCase() + '.</p><p><a href="forecast.html?loc=' + l.id + '">Open sample forecast</a></p>';
    }
    layerSel.addEventListener('change', function () { render(); });
    renderers.push(function () { render(); if (selected) { showDetail(locById(selected)); } });
  };

  pages.history = function () {
    var form = $('#history-form'), out = $('#history-out'), sel = $('#h-loc');
    sel.innerHTML = '<option value="">Choose a sample location</option>' + LOC.map(function (l) { return '<option value="' + l.id + '">' + locName(l) + '</option>'; }).join('');
    var last = null;
    function draw() {
      if (!last) { return; }
      var l = locById(last.loc), y = last.year, off = ((y * 7) % 9) - 4, base = (l.base - 61) * 0.8;
      var rows = '';
      for (var m = 0; m < 12; m++) {
        var wob = Math.sin(y + m) * 2;
        var hi = HIST_HI[m] + off + base + wob, lo = HIST_LO[m] + off + base + wob, pr = Math.max(0.2, HIST_PR[m] * (1 + Math.sin(y * 2 + m) * 0.3));
        rows += '<tr><th scope="row">' + MONTHS[m] + '</th><td>' + fT(hi) + '</td><td>' + fT(lo) + '</td><td>' + fP(pr) + '</td></tr>';
      }
      out.innerHTML = '<h2 id="history-result-title" tabindex="-1">Sample monthly summary: ' + locName(l) + ', sample year ' + y + '</h2><p class="sample-badge"><span class="badge">SAMPLE DATA</span> Invented history. These figures are not observations.</p>' +
        tableWrap('Sample monthly summary table', '<table><caption>' + sampleCaption('monthly average high, low and total precipitation, ' + locName(l) + ', sample year ' + y) + '</caption><thead><tr><th scope="col">Month</th><th scope="col">Avg high (' + uT() + ')</th><th scope="col">Avg low (' + uT() + ')</th><th scope="col">Precipitation (' + uP() + ')</th></tr></thead><tbody>' + rows + '</tbody></table>');
    }
    renderers.push(draw);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var yr = $('#h-year'), errs = [];
      if (!sel.value) { errs.push({ field: sel, msg: 'Choose a sample location.' }); }
      var v = yr.value.trim();
      if (!v) { errs.push({ field: yr, msg: 'Enter a year between 2015 and 2024.' }); }
      else if (!/^\d{4}$/.test(v) || +v < 2015 || +v > 2024) { errs.push({ field: yr, msg: 'The sample archive only covers 2015 to 2024. "' + v + '" is outside that range.' }); }
      if (errs.length) { out.innerHTML = ''; showErrors(form, errs); return; }
      clearErrors(form);
      last = { loc: sel.value, year: +v };
      draw();
      $('#history-result-title').focus();
    });
  };

  pages.tropical = function () {
    var sf = $('#t-status'), bf = $('#t-basin'), tb = $('#storm-table'), st = $('#storm-status'), pan = $('#storm-detail'), svg = $('#track-svg');
    var sel = null;
    function track(s) {
      var o = '<rect width="320" height="280" fill="var(--map-sea)"/><text x="8" y="270" font-size="12" fill="var(--text)">SAMPLE ILLUSTRATION - invented track</text>';
      if (s) {
        var pts = s.pts.map(function (p) { return p.join(','); }).join(' ');
        o += '<polyline points="' + pts + '" fill="none" stroke="var(--text)" stroke-width="22" opacity="0.12" stroke-linecap="round" stroke-linejoin="round"/><polyline points="' + pts + '" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="6 5"/>';
        s.pts.forEach(function (p, i) { o += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i === 0 ? 7 : 4) + '" fill="var(--accent)"/>'; });
        o += '<text x="' + (s.pts[0][0] + 10) + '" y="' + (s.pts[0][1] - 8) + '" font-size="12" fill="var(--text)">start</text>';
      }
      svg.innerHTML = o;
    }
    function draw() {
      var list = STORMS.filter(function (s) { return (sf.value === 'all' || s.status === sf.value) && (bf.value === 'all' || s.basin === bf.value); });
      st.textContent = list.length ? list.length + ' sample systems shown.' : 'No sample systems match these filters. Choose "All" to see them again.';
      var h = '<caption>' + sampleCaption('five fictional tropical systems') + '</caption><thead><tr><th scope="col">System</th><th scope="col">Strength</th><th scope="col">Basin</th><th scope="col">Sample status</th><th scope="col">Max wind (' + uW() + ')</th><th scope="col">Track</th></tr></thead><tbody>';
      list.forEach(function (s) { h += '<tr><th scope="row">' + s.name + '</th><td>' + s.cat + '</td><td>' + s.basin + '</td><td>' + s.status + '</td><td>' + fW(s.wind) + '</td><td><button type="button" class="btn small" data-storm="' + s.id + '" aria-pressed="' + (sel === s.id ? 'true' : 'false') + '">Show track<span class="sr-only"> for ' + s.name + '</span></button></td></tr>'; });
      if (!list.length) { h += '<tr><td colspan="6">No matching sample systems.</td></tr>'; }
      tb.innerHTML = h + '</tbody>';
      $$('[data-storm]', tb).forEach(function (b) {
        b.addEventListener('click', function () {
          sel = b.getAttribute('data-storm'); var s = STORMS.filter(function (x) { return x.id === sel; })[0];
          track(s); pan.innerHTML = '<h3>' + s.name + '</h3><p><span class="badge">SAMPLE DATA</span></p><p>' + s.cat + ', ' + s.basin + '. Max wind ' + fW(s.wind) + '. ' + s.note + '</p>';
          $$('[data-storm]', tb).forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        });
      });
    }
    sf.addEventListener('change', draw); bf.addEventListener('change', draw);
    renderers.push(draw);
    track(null);
  };

  pages.stations = function () {
    var q = $('#s-q'), net = $('#s-net'), tb = $('#station-table'), st = $('#station-status'), empty = $('#station-empty');
    function draw() {
      var term = q.value.trim().toLowerCase();
      var list = STATIONS.filter(function (s) { return (net.value === 'all' || s.net === net.value) && (!term || (s.name + ' ' + s.id + ' ' + locName(locById(s.loc))).toLowerCase().indexOf(term) > -1); });
      st.textContent = list.length + ' of ' + STATIONS.length + ' sample stations shown.';
      empty.hidden = list.length > 0;
      tb.hidden = list.length === 0;
      tb.innerHTML = '<caption>' + sampleCaption('ten fictional stations with invented readings') + '</caption><thead><tr><th scope="col">Station ID</th><th scope="col">Name</th><th scope="col">Place</th><th scope="col">Network</th><th scope="col">Sample temp (' + uT() + ')</th></tr></thead><tbody>' +
        list.map(function (s) { var l = locById(s.loc); return '<tr><th scope="row">' + s.id + '</th><td>' + s.name + '</td><td><a href="forecast.html?loc=' + l.id + '">' + locName(l) + '</a></td><td>' + s.net + '</td><td>' + fT(current(l).t + s.off) + '</td></tr>'; }).join('') + '</tbody>';
    }
    q.addEventListener('input', draw); net.addEventListener('change', draw);
    $('#s-form').addEventListener('submit', function (e) { e.preventDefault(); draw(); });
    renderers.push(draw);
    var form = $('#join-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nm = $('#j-name'), rg = $('#j-region'), ty = $('#j-type'), ck = $('#j-ok'), errs = [];
      if (!nm.value.trim()) { errs.push({ field: nm, msg: 'Enter a station nickname.' }); }
      else if (nm.value.trim().length < 3) { errs.push({ field: nm, msg: 'Station nickname must be at least 3 characters.' }); }
      if (!rg.value) { errs.push({ field: rg, msg: 'Choose a sample region.' }); }
      if (!ty.value) { errs.push({ field: ty, msg: 'Choose a sensor type.' }); }
      if (!ck.checked) { errs.push({ field: ck, msg: 'Confirm that you understand this is a demonstration.' }); }
      var ok = $('#join-ok');
      if (errs.length) { ok.hidden = true; showErrors(form, errs); return; }
      clearErrors(form);
      ok.hidden = false; ok.textContent = 'Demo only: nothing was sent or saved. In a real service, "' + nm.value.trim() + '" would be queued for review here.';
      ok.focus(); form.reset();
    });
  };

  pages.articles = function () {
    var q = $('#a-q'), tp = $('#a-topic'), ul = $('#article-list'), st = $('#article-status'), empty = $('#article-empty');
    function draw() {
      var term = q.value.trim().toLowerCase();
      var list = ARTICLES.filter(function (a) { return (tp.value === 'all' || a.topic === tp.value) && (!term || (a.title + ' ' + a.summary).toLowerCase().indexOf(term) > -1); });
      st.textContent = list.length + ' of ' + ARTICLES.length + ' sample articles shown.';
      empty.hidden = list.length > 0;
      ul.innerHTML = list.map(function (a) {
        return '<li><article class="card" data-component="article-card"><p class="eyebrow">' + a.topic + ' - sample article</p><h3>' + a.title + '</h3><p>' + a.summary + '</p><button type="button" class="btn small" aria-expanded="false" aria-controls="body-' + a.id + '">Read sample text<span class="sr-only">: ' + a.title + '</span></button><div id="body-' + a.id + '" hidden>' + a.body.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div></article></li>';
      }).join('');
      $$('button[aria-expanded]', ul).forEach(function (b) {
        b.addEventListener('click', function () { var o = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', o ? 'true' : 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = !o; });
      });
    }
    q.addEventListener('input', draw); tp.addEventListener('change', draw);
    $('#a-form').addEventListener('submit', function (e) { e.preventDefault(); draw(); });
    draw();
  };

  pages.prepare = function () {
    $$('.prep-list').forEach(function (fs) {
      var key = 'larkspur.prep.' + fs.getAttribute('data-key');
      var saved = (unstore(key) || '').split(',');
      var boxes = $$('input[type="checkbox"]', fs);
      var out = $('.prep-count', fs.parentNode);
      function upd() { var n = boxes.filter(function (b) { return b.checked; }).length; out.textContent = n + ' of ' + boxes.length + ' items checked'; store(key, boxes.map(function (b, i) { return b.checked ? i : ''; }).filter(String).join(',')); }
      boxes.forEach(function (b, i) { b.checked = saved.indexOf(String(i)) > -1 && saved[0] !== ''; b.addEventListener('change', upd); });
      out.textContent = boxes.filter(function (b) { return b.checked; }).length + ' of ' + boxes.length + ' items checked';
    });
    $$('.acc-btn').forEach(function (b) {
      b.addEventListener('click', function () { var o = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', o ? 'true' : 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = !o; });
    });
  };

  pages.videos = function () {
    var tp = $('#v-topic'), ul = $('#video-list'), st = $('#video-status'), dlg = $('#video-dialog'), opener = null;
    function draw() {
      var list = VIDEOS.filter(function (v) { return tp.value === 'all' || v.topic === tp.value; });
      st.textContent = list.length + ' of ' + VIDEOS.length + ' sample videos shown.';
      ul.innerHTML = list.map(function (v) {
        return '<li><article class="card" data-component="video-card"><img src="assets/video-thumb.svg" alt="" width="320" height="180" loading="lazy"><p class="eyebrow">' + v.topic + ' - sample, ' + v.len + '</p><h3>' + v.title + '</h3><button type="button" class="btn small" data-video="' + v.id + '">Open sample player<span class="sr-only">: ' + v.title + '</span></button></article></li>';
      }).join('');
      $$('[data-video]', ul).forEach(function (b) {
        b.addEventListener('click', function () {
          var v = VIDEOS.filter(function (x) { return x.id === b.getAttribute('data-video'); })[0];
          opener = b; $('#video-dialog-title').textContent = v.title; dlg.showModal(); $('#video-close').focus();
        });
      });
    }
    $('#video-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('close', function () { if (opener) { opener.focus(); } });
    tp.addEventListener('change', draw);
    draw();
  };

  /* ---------- boot ---------- */
  loadPrefs();
  initHeader();
  if (pages[page]) { pages[page](); }
  refresh();
})();
