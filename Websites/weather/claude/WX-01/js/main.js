/* Halcyon National Weather Service (fictional replica) - shared behaviour. Vanilla JS, inline sample data, no network. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // ---------- sample data (all invented) ----------
  var LOCATIONS = [
    { id: 'port-alder', name: 'Port Alder', region: 'Calder Coast', code: '40101', t: 52, cond: 'Rain', hum: 88, wind: 17, dir: 'SW', press: 29.71, vis: 6,
      hi: [54, 51, 55, 58, 57, 53, 52], lo: [44, 41, 40, 43, 46, 45, 42], conds: ['Rain', 'Cloudy', 'Partly cloudy', 'Sunny', 'Partly cloudy', 'Rain', 'Rain'], pop: [90, 40, 20, 10, 20, 70, 80] },
    { id: 'port-alder-heights', name: 'Port Alder Heights', region: 'Calder Coast', code: '40102', t: 49, cond: 'Cloudy', hum: 81, wind: 12, dir: 'W', press: 29.74, vis: 8,
      hi: [51, 49, 53, 56, 55, 50, 49], lo: [41, 38, 37, 40, 43, 42, 39], conds: ['Cloudy', 'Cloudy', 'Partly cloudy', 'Sunny', 'Partly cloudy', 'Rain', 'Rain'], pop: [60, 30, 20, 10, 20, 60, 70] },
    { id: 'kestrel-falls', name: 'Kestrel Falls', region: 'Highreach', code: '51220', t: 31, cond: 'Sunny', hum: 46, wind: 6, dir: 'NW', press: 30.12, vis: 10,
      hi: [38, 40, 42, 41, 36, 33, 35], lo: [24, 26, 28, 27, 22, 19, 21], conds: ['Sunny', 'Sunny', 'Partly cloudy', 'Cloudy', 'Snow', 'Snow', 'Partly cloudy'], pop: [0, 0, 10, 20, 70, 60, 20] },
    { id: 'mossgate', name: 'Mossgate', region: 'Southern Basin', code: '62003', t: 68, cond: 'Partly cloudy', hum: 55, wind: 9, dir: 'S', press: 30.02, vis: 10,
      hi: [73, 75, 74, 70, 68, 71, 74], lo: [55, 57, 56, 54, 52, 53, 56], conds: ['Partly cloudy', 'Sunny', 'Sunny', 'Thunderstorms', 'Rain', 'Partly cloudy', 'Sunny'], pop: [10, 0, 0, 60, 70, 20, 0] },
    { id: 'dunmere', name: 'Dunmere', region: 'Southern Basin', code: '62110', t: 64, cond: 'Fog', hum: 93, wind: 3, dir: 'E', press: 30.05, vis: 1,
      hi: [70, 72, 71, 69, 67, 68, 71], lo: [58, 59, 58, 56, 54, 55, 57], conds: ['Fog', 'Partly cloudy', 'Sunny', 'Thunderstorms', 'Rain', 'Cloudy', 'Sunny'], pop: [20, 10, 0, 50, 60, 30, 10] },
    { id: 'harrow-bay', name: 'Harrow Bay', region: 'Calder Coast', code: '40377', t: 50, cond: 'Rain', hum: 90, wind: 22, dir: 'SW', press: 29.66, vis: 4,
      hi: [52, 50, 54, 57, 56, 52, 51], lo: [45, 42, 41, 44, 47, 46, 43], conds: ['Rain', 'Rain', 'Cloudy', 'Partly cloudy', 'Partly cloudy', 'Rain', 'Rain'], pop: [95, 60, 30, 10, 20, 70, 80] },
    { id: 'elmwick', name: 'Elmwick', region: 'Highreach', code: '51004', t: 28, cond: 'Cloudy', hum: 62, wind: 8, dir: 'N', press: 30.09, vis: 9,
      hi: [35, 37, 40, 39, 34, 31, 33], lo: [21, 23, 25, 24, 20, 17, 19], conds: ['Cloudy', 'Partly cloudy', 'Partly cloudy', 'Cloudy', 'Snow', 'Snow', 'Sunny'], pop: [10, 10, 10, 30, 70, 60, 10] },
    { id: 'tallow-ridge', name: 'Tallow Ridge', region: 'Teal Islands', code: '78015', t: 79, cond: 'Thunderstorms', hum: 78, wind: 14, dir: 'E', press: 29.92, vis: 5,
      hi: [82, 83, 84, 82, 81, 83, 84], lo: [72, 73, 74, 73, 72, 73, 74], conds: ['Thunderstorms', 'Rain', 'Partly cloudy', 'Sunny', 'Partly cloudy', 'Thunderstorms', 'Rain'], pop: [70, 50, 20, 10, 20, 60, 50] }
  ];
  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var ALERTS = [
    { id: 'a1', type: 'flood-warning', typeLabel: 'Flood Warning', sev: 'Warning', area: 'Harrow Bay and lower Alder River', region: 'Calder Coast', issued: 'Sample issue 05:10', expires: 'Sample expiry 18:00', detail: 'Minor flooding of low roads is expected as the sample river rises 2 feet above flood stage. These details are invented.' },
    { id: 'a2', type: 'flood-warning', typeLabel: 'Flood Warning', sev: 'Warning', area: 'Dunmere river basin', region: 'Southern Basin', issued: 'Sample issue 04:30', expires: 'Sample expiry 21:00', detail: 'Slow-rising sample river levels may reach flood stage by evening. Invented for layout testing.' },
    { id: 'a3', type: 'gale-warning', typeLabel: 'Gale Warning', sev: 'Warning', area: 'Calder Coast waters out 20 miles', region: 'Calder Coast', issued: 'Sample issue 03:00', expires: 'Sample expiry 15:00', detail: 'Sample southwest winds of 35 to 45 knots with seas of 10 to 14 feet.' },
    { id: 'a4', type: 'frost-advisory', typeLabel: 'Frost Advisory', sev: 'Advisory', area: 'Highreach valleys', region: 'Highreach', issued: 'Sample issue 02:20', expires: 'Sample expiry 09:00', detail: 'Sample low temperatures of 28 to 32°F may harm sensitive plants.' },
    { id: 'a5', type: 'frost-advisory', typeLabel: 'Frost Advisory', sev: 'Advisory', area: 'Elmwick and surrounding hills', region: 'Highreach', issued: 'Sample issue 02:20', expires: 'Sample expiry 09:00', detail: 'Patchy sample frost is possible after midnight.' },
    { id: 'a6', type: 'dense-fog-advisory', typeLabel: 'Dense Fog Advisory', sev: 'Advisory', area: 'Dunmere and Mossgate', region: 'Southern Basin', issued: 'Sample issue 04:00', expires: 'Sample expiry 10:00', detail: 'Sample visibility one quarter mile or less in places. Slow down and use low-beam headlights. Invented content.' },
    { id: 'a7', type: 'thunderstorm-watch', typeLabel: 'Severe Thunderstorm Watch', sev: 'Watch', area: 'Tallow Ridge and nearby islands', region: 'Teal Islands', issued: 'Sample issue 07:45', expires: 'Sample expiry 14:00', detail: 'Conditions are sample-favorable for severe thunderstorms with gusty winds. Invented.' },
    { id: 'a8', type: 'high-wind-warning', typeLabel: 'High Wind Warning', sev: 'Warning', area: 'Port Alder coast', region: 'Calder Coast', issued: 'Sample issue 05:00', expires: 'Sample expiry 17:00', detail: 'Sample southwest winds 30 to 40 mph with gusts to 60 mph could down trees.' },
    { id: 'a9', type: 'winter-weather-advisory', typeLabel: 'Winter Weather Advisory', sev: 'Advisory', area: 'Kestrel Falls and the north pass', region: 'Highreach', issued: 'Sample issue 06:00', expires: 'Sample expiry 06:00 next day', detail: 'Sample snow accumulations of 2 to 4 inches are possible late in the week. Invented.' },
    { id: 'a10', type: 'heat-advisory', typeLabel: 'Heat Advisory', sev: 'Advisory', area: 'Tallow Ridge lowlands', region: 'Teal Islands', issued: 'Sample issue 08:00', expires: 'Sample expiry 19:00', detail: 'Sample heat index values up to 100°F. Drink water and take breaks in shade.' }
  ];
  var STATIONS = [
    { name: 'Port Alder Harbor', region: 'Calder Coast', t: 52, cond: 'Rain', hum: 88, wind: 17, dir: 'SW', press: 29.71 },
    { name: 'Harrow Bay Pier', region: 'Calder Coast', t: 50, cond: 'Rain', hum: 90, wind: 22, dir: 'SW', press: 29.66 },
    { name: 'Kestrel Falls Airfield', region: 'Highreach', t: 31, cond: 'Sunny', hum: 46, wind: 6, dir: 'NW', press: 30.12 },
    { name: 'Elmwick Ridge', region: 'Highreach', t: 28, cond: 'Cloudy', hum: 62, wind: 8, dir: 'N', press: 30.09 },
    { name: 'Mossgate Airport', region: 'Southern Basin', t: 68, cond: 'Partly cloudy', hum: 55, wind: 9, dir: 'S', press: 30.02 },
    { name: 'Dunmere Marsh', region: 'Southern Basin', t: 64, cond: 'Fog', hum: 93, wind: 3, dir: 'E', press: 30.05 },
    { name: 'Tallow Ridge Light', region: 'Teal Islands', t: 79, cond: 'Thunderstorms', hum: 78, wind: 14, dir: 'E', press: 29.92 },
    { name: 'Marrow Cove', region: 'Marrow Islands', t: 83, cond: 'Sunny', hum: 70, wind: 11, dir: 'NE', press: 29.98 },
    { name: 'Far Reach Station', region: 'Marrow Islands', t: 86, cond: 'Partly cloudy', hum: 66, wind: 19, dir: 'E', press: 29.95 },
    { name: 'Teal Harbor', region: 'Teal Islands', t: 81, cond: 'Rain', hum: 84, wind: 12, dir: 'SE', press: 29.9 }
  ];
  var NEWS = [
    { title: 'New sample radar product explained', cat: 'Operations', date: 'Sample date 3 Nov', sum: 'A look at how a fictional high-resolution radar layer is organized.' },
    { title: 'Prepare your household before the storm season', cat: 'Safety', date: 'Sample date 1 Nov', sum: 'A checklist of preparedness steps, written for layout testing.' },
    { title: 'Volunteer observers log 50 years of rainfall', cat: 'Outreach', date: 'Sample date 29 Oct', sum: 'Invented story about a cooperative observer in the Highreach.' },
    { title: 'Research note: fog forecasting in river basins', cat: 'Research', date: 'Sample date 27 Oct', sum: 'A sample summary of a fictional study on valley fog.' },
    { title: 'Frost season outlook for the interior', cat: 'Climate', date: 'Sample date 24 Oct', sum: 'Invented seasonal frost outlook with sample probabilities.' },
    { title: 'Schools invited to the weather-spotter day', cat: 'Outreach', date: 'Sample date 22 Oct', sum: 'A sample announcement about a classroom event.' },
    { title: 'Service notice: product retirement schedule', cat: 'Operations', date: 'Sample date 19 Oct', sum: 'A fictional schedule for retiring an old text product.' },
    { title: 'Cold-water safety on the Calder Coast', cat: 'Safety', date: 'Sample date 15 Oct', sum: 'Sample tips about cold-water shock and life jackets.' },
    { title: 'Ocean temperatures stay above normal', cat: 'Climate', date: 'Sample date 10 Oct', sum: 'A sample note about invented sea-surface temperature anomalies.' }
  ];
  var GLOSSARY = [
    ['Advisory', 'A message that conditions are expected to cause inconvenience but not usually danger.'],
    ['Barometer', 'An instrument that measures air pressure.'],
    ['Cold front', 'The leading edge of a colder air mass that replaces warmer air.'],
    ['Dew point', 'The temperature at which air becomes saturated and dew forms.'],
    ['Flood stage', 'The river level at which water starts to cause damage.'],
    ['Gale', 'A wind of 34 to 47 knots.'],
    ['Humidity', 'The amount of water vapor in the air.'],
    ['Isobar', 'A line on a map connecting places with equal pressure.'],
    ['Jet stream', 'A narrow band of strong high-altitude wind.'],
    ['Radar echo', 'The returned signal from rain or snow shown on radar.'],
    ['Warning', 'A message that a hazard is occurring or about to occur and action is needed.'],
    ['Watch', 'A message that conditions favor a hazard but it has not yet occurred.'],
    ['Wind chill', 'How cold the air feels on skin because of wind.'],
    ['Wind gust', 'A brief increase in wind speed.']
  ];
  var PAGES = [
    ['Home', 'index.html', 'national summary radar alerts regional offices'],
    ['Active Alerts', 'alerts.html', 'warnings watches advisories flood gale frost'],
    ['Current Conditions', 'current.html', 'observations stations temperature humidity wind pressure'],
    ['Local Forecast', 'forecast.html', 'hourly seven day location search'],
    ['National Forecast Maps', 'forecast-maps.html', 'surface precipitation temperature wind maps'],
    ['Satellite Images', 'satellite.html', 'visible infrared water vapor'],
    ['Radar', 'radar.html', 'enhanced standard low bandwidth loop'],
    ['Weather Safety', 'safety.html', 'flood lightning tornado winter heat coastal'],
    ['Weather Education', 'education.html', 'students teachers families lessons'],
    ['Information Center', 'information.html', 'radio spotter publications models statistics'],
    ['Specialized Forecasts and Past Weather', 'topics.html', 'aviation marine rivers hurricanes fire space air quality climate astronomical'],
    ['News', 'news.html', 'stories announcements'],
    ['About HNWS', 'about.html', 'mission organization privacy disclaimer careers'],
    ['Contact Us', 'contact.html', 'form help feedback'],
    ['Glossary', 'glossary.html', 'terms definitions']
  ];

  // ---------- helpers ----------
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } return null; }
  var params = new URLSearchParams(location.search);
  var page = document.body.getAttribute('data-page');

  var unit = store('hnws-unit') === 'C' ? 'C' : 'F';
  var unitListeners = [];
  function temp(f) { return unit === 'C' ? Math.round((f - 32) * 5 / 9) + '°C' : Math.round(f) + '°F'; }
  function iconKind(c) { return /rain|thunder/i.test(c) ? 'rain' : /snow/i.test(c) ? 'snow' : /fog|cloudy/i.test(c) && !/partly/i.test(c) ? 'cloud' : /partly/i.test(c) ? 'part' : 'sun'; }
  function icon(c) {
    var k = iconKind(c), sun = '<circle cx="22" cy="20" r="9" fill="#f2b705"/>', cloud = '<path d="M12 40a8 8 0 0 1 8-8 10 10 0 0 1 19 3 6 6 0 0 1 1 12H18a5 5 0 0 1-6-7z" fill="#5b7794"/>';
    var extra = k === 'rain' ? '<path d="M18 52l-3 6M28 52l-3 6M38 52l-3 6" stroke="#0a5aa8" stroke-width="3" stroke-linecap="round"/>' : k === 'snow' ? '<circle cx="18" cy="56" r="2.5" fill="#0b2a4a"/><circle cx="28" cy="56" r="2.5" fill="#0b2a4a"/><circle cx="38" cy="56" r="2.5" fill="#0b2a4a"/>' : '';
    return '<svg class="wx-icon" viewBox="0 0 56 64" aria-hidden="true" focusable="false">' + (k === 'sun' || k === 'part' ? sun : '') + (k === 'sun' ? '' : cloud) + extra + '</svg>';
  }
  function setStatus(el, msg) { if (el) el.textContent = msg; }

  // ---------- unit toggle ----------
  var unitBtn = $('#unit-toggle');
  if (unitBtn) {
    unitBtn.setAttribute('aria-pressed', unit === 'C');
    unitBtn.addEventListener('click', function () {
      unit = unit === 'C' ? 'F' : 'C';
      store('hnws-unit', unit);
      unitBtn.setAttribute('aria-pressed', unit === 'C');
      unitListeners.forEach(function (fn) { fn(); });
      var st = $('#station-status') || $('#fc-message');
      setStatus(st, 'Temperatures now shown in °' + unit + '.');
    });
  }

  // ---------- navigation ----------
  var navToggle = $('#nav-toggle'), nav = $('#primary-nav');
  var menus = $$('.has-menu');
  var hoverOK = window.matchMedia('(min-width: 60em)');
  function setMenu(li, open) {
    li.classList.toggle('open', open);
    $('button', li).setAttribute('aria-expanded', open);
  }
  function closeMenus(except) { menus.forEach(function (li) { if (li !== except) setMenu(li, false); }); }
  navToggle.addEventListener('click', function () {
    var o = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', o);
  });
  menus.forEach(function (li) {
    var btn = $('button', li);
    btn.addEventListener('click', function () {
      if (li.dataset.hover === '1') { li.dataset.hover = ''; setMenu(li, true); return; }
      var o = !li.classList.contains('open');
      closeMenus(li);
      setMenu(li, o);
    });
    li.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && hoverOK.matches) { closeMenus(li); li.dataset.hover = '1'; setMenu(li, true); } });
    li.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && hoverOK.matches) { li.dataset.hover = ''; setMenu(li, false); } });
    li.addEventListener('focusout', function (e) { if (!e.relatedTarget || !li.contains(e.relatedTarget)) setMenu(li, false); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-menu')) closeMenus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = menus.filter(function (li) { return li.classList.contains('open'); })[0];
    if (open) { setMenu(open, false); $('button', open).focus(); return; }
    if (nav.classList.contains('open') && !hoverOK.matches && nav.parentNode.contains(document.activeElement)) {
      nav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.focus();
    }
  });

  // ---------- header location search ----------
  var locForm = $('#loc-form'), locInput = $('#loc-input'), locError = $('#loc-error'), remember = $('#loc-remember');
  var savedQuery = store('hnws-location');
  remember.checked = !!savedQuery;
  if (page === 'forecast' && params.get('q')) locInput.value = params.get('q');
  locForm.addEventListener('submit', function (e) {
    var q = locInput.value.trim();
    if (!q) {
      e.preventDefault();
      locError.textContent = 'Enter a town name or five-digit sample code, for example Port Alder or 40101.';
      locError.hidden = false;
      locInput.setAttribute('aria-invalid', 'true');
      locInput.focus();
      return;
    }
    locError.hidden = true;
    locInput.removeAttribute('aria-invalid');
    store('hnws-location', remember.checked ? q : null);
  });
  locInput.addEventListener('input', function () { locError.hidden = true; locInput.removeAttribute('aria-invalid'); });
  remember.addEventListener('change', function () { if (!remember.checked) store('hnws-location', null); else if (locInput.value.trim()) store('hnws-location', locInput.value.trim()); });

  function findLocations(q) {
    q = q.trim().toLowerCase();
    return LOCATIONS.filter(function (l) { return l.code === q || l.name.toLowerCase().indexOf(q) !== -1; });
  }

  // ---------- site search dialog ----------
  var dlg = $('#search-dialog'), sq = $('#search-q'), sres = $('#search-results'), sstat = $('#search-status'), opener = $('#open-search');
  function runSearch() {
    var q = sq.value.trim().toLowerCase(), scope = $('input[name="scope"]:checked', dlg).value, hits = [];
    sres.innerHTML = '';
    if (!q) { sstat.textContent = 'Type a word to search.'; return; }
    if (scope === 'pages') hits = PAGES.filter(function (p) { return (p[0] + ' ' + p[2]).toLowerCase().indexOf(q) !== -1; }).map(function (p) { return '<a href="' + p[1] + '">' + esc(p[0]) + '</a>'; });
    else hits = GLOSSARY.filter(function (g) { return (g[0] + ' ' + g[1]).toLowerCase().indexOf(q) !== -1; }).map(function (g) { return '<a href="glossary.html?term=' + encodeURIComponent(g[0]) + '">' + esc(g[0]) + '</a>: ' + esc(g[1]); });
    sres.innerHTML = hits.map(function (h) { return '<li>' + h + '</li>'; }).join('');
    sstat.textContent = hits.length ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for "' + sq.value.trim() + '".' : 'No results for "' + sq.value.trim() + '". Try a shorter word such as "flood".';
  }
  opener.addEventListener('click', function () { if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', ''); sq.focus(); });
  $('#close-search').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('close', function () { opener.focus(); });
  $('#search-form').addEventListener('submit', function (e) { e.preventDefault(); runSearch(); });
  sq.addEventListener('input', runSearch);
  sq.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); dlg.close(); } }); // type=search would otherwise clear the field first
  $$('input[name="scope"]', dlg).forEach(function (r) { r.addEventListener('change', runSearch); });

  // ---------- tabs (forecast, maps) ----------
  function initTabs(root) {
    var tabs = $$('[role="tab"]', root);
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on);
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (n === undefined) return;
        e.preventDefault();
        select(tabs[(n + tabs.length) % tabs.length], true);
      });
    });
  }

  // ---------- page: home ----------
  if (page === 'index') {
    var types = {};
    ALERTS.forEach(function (a) { (types[a.type] = types[a.type] || { label: a.typeLabel, n: 0 }).n++; });
    $('#alert-type-links').innerHTML = Object.keys(types).map(function (k) { return '<li><a href="alerts.html?type=' + k + '">' + types[k].label + '</a> (' + types[k].n + ')</li>'; }).join('');
    $('#sample-location-cards').innerHTML = LOCATIONS.slice(0, 4).map(function (l) { return '<li><h3><a href="forecast.html?loc=' + l.id + '">' + l.name + '</a></h3><p>' + l.region + '</p><p>' + l.cond + ', ' + temp(l.t) + ' <span class="sample-tag">sample</span></p></li>'; }).join('');
    if (savedQuery) {
      $('#saved-text').innerHTML = 'Saved search: <a href="forecast.html?q=' + encodeURIComponent(savedQuery) + '">' + esc(savedQuery) + '</a>. Uncheck "Remember my location" in the header to forget it.';
      $('#saved-location').hidden = false;
    }
  }

  // ---------- page: alerts ----------
  if (page === 'alerts') {
    var fType = $('#f-type'), fSev = $('#f-severity'), fReg = $('#f-region'), fKey = $('#f-keyword'), list = $('#alert-list');
    var seen = {};
    ALERTS.forEach(function (a) { if (!seen[a.type]) { seen[a.type] = 1; fType.add(new Option(a.typeLabel, a.type)); } });
    ALERTS.map(function (a) { return a.region; }).filter(function (r, i, arr) { return arr.indexOf(r) === i; }).forEach(function (r) { fReg.add(new Option(r, r)); });
    if (params.get('type') && seen[params.get('type')]) fType.value = params.get('type');
    var renderAlerts = function () {
      var k = fKey.value.trim().toLowerCase();
      var rows = ALERTS.filter(function (a) {
        return (!fType.value || a.type === fType.value) && (!fSev.value || a.sev === fSev.value) && (!fReg.value || a.region === fReg.value) &&
          (!k || (a.typeLabel + ' ' + a.area + ' ' + a.detail).toLowerCase().indexOf(k) !== -1);
      });
      list.innerHTML = rows.map(function (a) {
        return '<li class="sev-' + a.sev.toLowerCase() + '"><h2><span class="badge">' + a.sev + '</span>' + a.typeLabel + '</h2><p class="meta">' + a.area + ' · ' + a.region + '<br>' + a.issued + ' · ' + a.expires + '</p>' +
          '<button type="button" class="disclose" aria-expanded="false" aria-controls="d-' + a.id + '">Show details</button><p id="d-' + a.id + '" hidden>' + a.detail + '</p></li>';
      }).join('');
      $('#alert-empty').hidden = rows.length > 0;
      setStatus($('#alert-status'), 'Showing ' + rows.length + ' of ' + ALERTS.length + ' sample alerts.');
    };
    [fType, fSev, fReg].forEach(function (c) { c.addEventListener('change', renderAlerts); });
    fKey.addEventListener('input', renderAlerts);
    $('#alert-filter').addEventListener('reset', function () { setTimeout(renderAlerts, 0); });
    $('#alert-filter').addEventListener('submit', function (e) { e.preventDefault(); });
    list.addEventListener('click', function (e) {
      var b = e.target.closest('.disclose');
      if (!b) return;
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open);
      b.textContent = open ? 'Hide details' : 'Show details';
      document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
    });
    renderAlerts();
  }

  // ---------- page: current conditions ----------
  if (page === 'current') {
    var sText = $('#s-text'), sReg = $('#s-region'), sSort = $('#s-sort');
    STATIONS.map(function (s) { return s.region; }).filter(function (r, i, a) { return a.indexOf(r) === i; }).forEach(function (r) { sReg.add(new Option(r, r)); });
    var renderStations = function () {
      var k = sText.value.trim().toLowerCase();
      var rows = STATIONS.filter(function (s) { return (!sReg.value || s.region === sReg.value) && (!k || s.name.toLowerCase().indexOf(k) !== -1); });
      var sorts = { name: function (a, b) { return a.name.localeCompare(b.name); }, 'temp-desc': function (a, b) { return b.t - a.t; }, 'temp-asc': function (a, b) { return a.t - b.t; }, 'wind-desc': function (a, b) { return b.wind - a.wind; } };
      rows.sort(sorts[sSort.value]);
      $('#station-body').innerHTML = rows.length ? rows.map(function (s) {
        return '<tr><th scope="row">' + s.name + '</th><td>' + s.region + '</td><td>' + temp(s.t) + '</td><td>' + s.cond + '</td><td>' + s.hum + '%</td><td>' + s.dir + ' ' + s.wind + ' mph</td><td>' + s.press.toFixed(2) + ' inHg</td></tr>';
      }).join('') : '<tr><td colspan="7">No sample stations match. Clear the name or choose another region.</td></tr>';
      setStatus($('#station-status'), 'Showing ' + rows.length + ' of ' + STATIONS.length + ' sample stations.');
    };
    [sText, sReg, sSort].forEach(function (c) { c.addEventListener(c === sText ? 'input' : 'change', renderStations); });
    $('#station-filter').addEventListener('submit', function (e) { e.preventDefault(); });
    unitListeners.push(renderStations);
    renderStations();
  }

  // ---------- page: forecast ----------
  if (page === 'forecast') {
    initTabs($('[data-component="tabs"]'));
    var msg = $('#fc-message'), picker = $('#fc-picker'), err = $('#fc-error'), result = $('#fc-result'), current = null;
    var show = function (l) {
      current = l;
      picker.hidden = err.hidden = true;
      result.hidden = false;
      $('#fc-place').textContent = l.name + ', ' + l.region + ' (sample)';
      document.title = 'Forecast for ' + l.name + ' | Halcyon National Weather Service (fictional sample)';
      renderForecast();
      setStatus(msg, 'Showing sample forecast for ' + l.name + '.');
    };
    var renderForecast = function () {
      var l = current;
      if (!l) return;
      $('#now-body').innerHTML = icon(l.cond) + '<span class="temp">' + temp(l.t) + '</span><dl><dt>Conditions</dt><dd>' + l.cond + '</dd><dt>Humidity</dt><dd>' + l.hum + '%</dd><dt>Wind</dt><dd>' + l.dir + ' ' + l.wind + ' mph</dd><dt>Pressure</dt><dd>' + l.press.toFixed(2) + ' inHg</dd><dt>Visibility</dt><dd>' + l.vis + ' mi</dd></dl>';
      $('#daily-list').innerHTML = DAYS.map(function (d, i) {
        return '<li><h3>' + (i === 0 ? 'Today (' + d + ')' : d) + '</h3>' + icon(l.conds[i]) + '<p>' + l.conds[i] + '</p><p>High ' + temp(l.hi[i]) + ' / Low ' + temp(l.lo[i]) + '</p><p>Precipitation chance: ' + l.pop[i] + '%</p></li>';
      }).join('');
      var rows = '';
      for (var i = 0; i < 24; i++) {
        var h = (6 + i) % 24, d = i < 18 ? 0 : 1, frac = 0.5 - 0.5 * Math.cos(2 * Math.PI * (h - 4) / 24);
        rows += '<tr><th scope="row">' + (h % 12 || 12) + ' ' + (h < 12 ? 'AM' : 'PM') + '</th><td>' + temp(l.lo[d] + (l.hi[d] - l.lo[d]) * frac) + '</td><td>' + l.conds[d] + '</td><td>' + l.pop[d] + '%</td></tr>';
      }
      $('#hourly-body').innerHTML = rows;
    };
    unitListeners.push(renderForecast);
    var q = params.get('q'), id = params.get('loc'), one = id && LOCATIONS.filter(function (l) { return l.id === id; })[0];
    if (one) show(one);
    else if (q && q.trim()) {
      var found = findLocations(q);
      if (found.length === 1) show(found[0]);
      else if (found.length > 1) {
        result.hidden = err.hidden = true; picker.hidden = false;
        $('#picker-list').innerHTML = found.map(function (l) { return '<li><a href="forecast.html?loc=' + l.id + '">' + l.name + ', ' + l.region + '</a> (sample code ' + l.code + ')</li>'; }).join('');
        setStatus(msg, found.length + ' sample locations match "' + q + '".');
      } else {
        err.innerHTML = '<h2 class="h3">No sample location found for "' + esc(q) + '"</h2><p>Only fictional sample locations are available. Try one of these:</p><ul class="plain-list">' + LOCATIONS.map(function (l) { return '<li><a href="forecast.html?loc=' + l.id + '">' + l.name + ', ' + l.region + '</a></li>'; }).join('') + '</ul>';
        err.hidden = false;
        setStatus(msg, 'No match for "' + q + '".');
      }
    } else {
      err.innerHTML = '<h2 class="h3">Choose a location</h2><p>Use the box at the top of the page, or pick a sample location:</p><ul class="plain-list">' + LOCATIONS.map(function (l) { return '<li><a href="forecast.html?loc=' + l.id + '">' + l.name + ', ' + l.region + '</a></li>'; }).join('') + '</ul>';
      err.hidden = false;
    }
  }

  // ---------- page: forecast maps ----------
  if (page === 'forecast-maps') {
    initTabs($('[data-component="tabs"]'));
    var mapDay = $('#map-day'), labels = { surface: 'Surface map', precip: 'Precipitation map', temp: 'Temperature map', wind: 'Wind map' };
    var renderCaptions = function () {
      $$('[data-map-caption]').forEach(function (c) { c.textContent = labels[c.getAttribute('data-map-caption')] + ', ' + mapDay.options[mapDay.selectedIndex].text + ' (placeholder graphic, invented data).'; });
    };
    mapDay.addEventListener('change', renderCaptions);
    renderCaptions();
  }

  // ---------- page: satellite ----------
  if (page === 'satellite') {
    var renderSat = function () {
      var p = $('input[name="product"]:checked').value, s = $('#sat-sector').value;
      setStatus($('#sat-caption'), p + ' view, ' + s + ' sector (placeholder graphic, invented imagery).');
      $('#sat-img').style.filter = p === 'Visible' ? 'none' : p === 'Infrared' ? 'grayscale(1) contrast(1.2)' : 'hue-rotate(160deg)';
    };
    $('#sat-form').addEventListener('change', renderSat);
    $('#sat-form').addEventListener('submit', function (e) { e.preventDefault(); });
    renderSat();
  }

  // ---------- page: radar ----------
  if (page === 'radar') {
    var wrap = $('.radar'), cells = $('#radar-cells'), svg = $('#radar-svg'), rtext = $('#radar-text'), frame = 0, timer = null, play = $('#frame-play');
    var modeLabel = { enhanced: 'Enhanced', standard: 'Standard', low: 'Low-bandwidth' };
    var drawFrame = function () {
      cells.setAttribute('transform', 'translate(' + frame * 14 + ' ' + frame * -9 + ')');
      setStatus($('#frame-status'), 'Frame ' + (frame + 1) + ' of 5 (sample)');
    };
    var applyMode = function () {
      var m = $('input[name="mode"]:checked').value, site = $('#radar-sector').value;
      wrap.classList.toggle('mode-standard', m === 'standard');
      svg.toggleAttribute('hidden', m === 'low');
      rtext.hidden = m !== 'low';
      rtext.textContent = site + ': ' + modeLabel[m] + ' mode. Sample text summary: two invented rain areas, one over the southwest and one over the northeast, drifting northeast.';
    };
    var stop = function () { clearInterval(timer); timer = null; play.setAttribute('aria-pressed', 'false'); play.textContent = 'Play loop'; };
    if (params.get('mode') && $('input[name="mode"][value="' + params.get('mode') + '"]')) $('input[name="mode"][value="' + params.get('mode') + '"]').checked = true;
    $('#radar-form').addEventListener('change', applyMode);
    $('#radar-form').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#frame-next').addEventListener('click', function () { frame = (frame + 1) % 5; drawFrame(); });
    $('#frame-prev').addEventListener('click', function () { frame = (frame + 4) % 5; drawFrame(); });
    play.addEventListener('click', function () {
      if (timer) { stop(); return; }
      play.setAttribute('aria-pressed', 'true'); play.textContent = 'Pause loop';
      timer = setInterval(function () { frame = (frame + 1) % 5; drawFrame(); }, 900);
    });
    applyMode(); drawFrame();
  }

  // ---------- page: safety accordion ----------
  if (page === 'safety') {
    var accBtns = $$('.accordion .acc-h button'), all = $('#expand-all');
    var setAcc = function (b, open) { b.setAttribute('aria-expanded', open); document.getElementById(b.getAttribute('aria-controls')).hidden = !open; };
    accBtns.forEach(function (b) { b.addEventListener('click', function () { setAcc(b, b.getAttribute('aria-expanded') !== 'true'); }); });
    all.addEventListener('click', function () {
      var open = all.getAttribute('aria-pressed') !== 'true';
      all.setAttribute('aria-pressed', open);
      all.textContent = open ? 'Collapse all' : 'Expand all';
      accBtns.forEach(function (b) { setAcc(b, open); });
    });
  }

  // ---------- page: education chips ----------
  if (page === 'education') {
    var chips = $$('.chip');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
        var f = c.getAttribute('data-filter'), n = 0;
        $$('#edu-list > li').forEach(function (li) { var on = f === 'all' || li.getAttribute('data-aud') === f; li.hidden = !on; if (on) n++; });
        setStatus($('#edu-status'), 'Showing ' + n + ' resources for ' + c.textContent + '.');
      });
    });
  }

  // ---------- page: news ----------
  if (page === 'news') {
    var nCat = $('#n-cat'), nText = $('#n-text'), shown = 4, PAGE = 4;
    NEWS.map(function (n) { return n.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }).sort().forEach(function (c) { nCat.add(new Option(c, c)); });
    var renderNews = function (focusFrom) {
      var k = nText.value.trim().toLowerCase();
      var rows = NEWS.filter(function (n) { return (!nCat.value || n.cat === nCat.value) && (!k || (n.title + ' ' + n.sum).toLowerCase().indexOf(k) !== -1); });
      $('#news-list').innerHTML = rows.slice(0, shown).map(function (n) { return '<li><p class="meta">' + n.cat + ' · ' + n.date + '</p><h2>' + n.title + '</h2><p>' + n.sum + '</p></li>'; }).join('');
      $('#news-empty').hidden = rows.length > 0;
      $('#news-more').hidden = rows.length <= shown;
      setStatus($('#news-status'), 'Showing ' + Math.min(shown, rows.length) + ' of ' + rows.length + ' sample stories.');
      if (focusFrom !== undefined) { var h = $$('#news-list h2')[focusFrom]; if (h) { h.tabIndex = -1; h.focus(); } }
    };
    var reset = function () { shown = PAGE; renderNews(); };
    nCat.addEventListener('change', reset);
    nText.addEventListener('input', reset);
    $('#news-filter').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#news-more').addEventListener('click', function () { var from = shown; shown += PAGE; renderNews(from); });
    renderNews();
  }

  // ---------- page: glossary ----------
  if (page === 'glossary') {
    var gText = $('#g-text'), gLetter = $('#g-letter');
    GLOSSARY.map(function (g) { return g[0][0]; }).filter(function (c, i, a) { return a.indexOf(c) === i; }).forEach(function (c) { gLetter.add(new Option(c, c)); });
    if (params.get('term')) gText.value = params.get('term');
    var renderGloss = function () {
      var k = gText.value.trim().toLowerCase();
      var rows = GLOSSARY.filter(function (g) { return (!gLetter.value || g[0][0] === gLetter.value) && (!k || (g[0] + ' ' + g[1]).toLowerCase().indexOf(k) !== -1); });
      $('#gloss-list').innerHTML = rows.map(function (g) { return '<dt>' + g[0] + '</dt><dd>' + g[1] + '</dd>'; }).join('');
      $('#gloss-empty').hidden = rows.length > 0;
      setStatus($('#gloss-status'), 'Showing ' + rows.length + ' of ' + GLOSSARY.length + ' terms.');
    };
    gText.addEventListener('input', renderGloss);
    gLetter.addEventListener('change', renderGloss);
    $('#gloss-filter').addEventListener('submit', function (e) { e.preventDefault(); });
    renderGloss();
  }

  // ---------- page: contact form ----------
  if (page === 'contact') {
    var form = $('#contact-form'), summary = $('#error-summary'), errList = $('#error-list'), ok = $('#contact-success');
    var checks = [
      ['c-name', 'Enter your full name.', function (f) { return f.name.value.trim().length > 0; }],
      ['c-email', 'Enter an email address in the form name@example.org.', function (f) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim()); }],
      ['c-topic', 'Choose a topic.', function (f) { return f.topic.value !== ''; }],
      ['c-reply', 'Choose a preferred reply method.', function (f) { return !!f.querySelector('input[name="reply"]:checked'); }],
      ['c-msg', 'Enter a message of at least 10 characters.', function (f) { return f.message.value.trim().length >= 10; }],
      ['c-consent', 'Tick the box to confirm you understand this is a demonstration.', function (f) { return f.consent.checked; }]
    ];
    var fieldOf = function (id) { return id === 'c-reply' ? $('input[name="reply"]', form) : document.getElementById(id); };
    var clearError = function (id) {
      var m = document.getElementById(id + '-err');
      m.hidden = true;
      if (id !== 'c-reply') fieldOf(id).removeAttribute('aria-invalid');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ok.hidden = true;
      var bad = checks.filter(function (c) { return !c[2](form); });
      checks.forEach(function (c) { clearError(c[0]); });
      if (!bad.length) {
        summary.hidden = true;
        form.reset();
        ok.hidden = false;
        ok.focus();
        return;
      }
      bad.forEach(function (c) {
        var m = document.getElementById(c[0] + '-err');
        m.textContent = c[1]; m.hidden = false;
        if (c[0] !== 'c-reply') fieldOf(c[0]).setAttribute('aria-invalid', 'true');
      });
      errList.innerHTML = bad.map(function (c) { return '<li><a href="#' + (c[0] === 'c-reply' ? 'c-reply-err' : c[0]) + '" data-target="' + c[0] + '">' + c[1] + '</a></li>'; }).join('');
      summary.hidden = false;
      summary.focus();
    });
    errList.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      fieldOf(a.getAttribute('data-target')).focus();
    });
    form.addEventListener('input', function (e) { var id = e.target.id || 'c-reply'; if (document.getElementById(id + '-err')) clearError(id); });
    form.addEventListener('change', function (e) { var id = e.target.id || 'c-reply'; if (document.getElementById(id + '-err')) clearError(id); });
  }
})();
