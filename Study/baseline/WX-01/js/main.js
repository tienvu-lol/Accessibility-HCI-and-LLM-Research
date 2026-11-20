/* Meridian Weather Authority replica - vanilla JS. ALL data below is fictional sample data. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  };
  var params = new URLSearchParams(window.location.search);
  var SAMPLE_TAG = '<p class="sample-tag">Sample data: fictional, invented for a research exercise; not real weather</p>';

  /* ---------- sample data (fictional) ---------- */
  var LOCATIONS = [
    { id: 'larkspur-bay', name: 'Larkspur Bay', region: 'CO', regionName: 'Coastal Reach', base: 64, cond: 0, hum: 78, wind: 9, press: 29.94, vis: 10, office: 'Larkspur Bay Forecast Office' },
    { id: 'ironwood', name: 'Ironwood', region: 'NV', regionName: 'Northvale', base: 41, cond: 3, hum: 66, wind: 14, press: 29.71, vis: 7, office: 'Northvale Forecast Office' },
    { id: 'copper-mesa', name: 'Copper Mesa', region: 'HP', regionName: 'Highplains', base: 78, cond: 1, hum: 22, wind: 18, press: 30.02, vis: 10, office: 'Highplains Forecast Office' },
    { id: 'saltmarsh', name: 'Saltmarsh', region: 'EM', regionName: 'Eastmarch', base: 58, cond: 4, hum: 88, wind: 6, press: 29.88, vis: 2, office: 'Eastmarch Forecast Office' },
    { id: 'pinecrest', name: 'Pinecrest', region: 'NV', regionName: 'Northvale', base: 29, cond: 5, hum: 71, wind: 11, press: 29.65, vis: 5, office: 'Northvale Forecast Office' },
    { id: 'redfern', name: 'Redfern', region: 'SR', regionName: 'Sunreach', base: 91, cond: 1, hum: 35, wind: 8, press: 29.99, vis: 10, office: 'Sunreach Forecast Office' },
    { id: 'glasswater', name: 'Glasswater', region: 'CO', regionName: 'Coastal Reach', base: 67, cond: 2, hum: 74, wind: 13, press: 29.91, vis: 9, office: 'Larkspur Bay Forecast Office' },
    { id: 'thistledown', name: 'Thistledown', region: 'EM', regionName: 'Eastmarch', base: 52, cond: 2, hum: 69, wind: 10, press: 29.83, vis: 8, office: 'Eastmarch Forecast Office' },
    { id: 'amber-hollow', name: 'Amber Hollow', region: 'SR', regionName: 'Sunreach', base: 86, cond: 0, hum: 48, wind: 7, press: 29.96, vis: 10, office: 'Sunreach Forecast Office' },
    { id: 'windmere', name: 'Windmere', region: 'HP', regionName: 'Highplains', base: 72, cond: 6, hum: 41, wind: 27, press: 29.77, vis: 9, office: 'Highplains Forecast Office' }
  ];
  var CONDS = ['Mostly Sunny', 'Sunny', 'Partly Cloudy', 'Light Rain', 'Dense Fog', 'Light Snow', 'Windy and Partly Cloudy'];
  var REGIONS = { CO: 'Coastal Reach', NV: 'Northvale', HP: 'Highplains', EM: 'Eastmarch', SR: 'Sunreach' };
  var ALERTS = [
    { id: 'a01', type: 'Flash Flood Warning', level: 'warning', region: 'EM', area: 'Saltmarsh and the Brinewater valley', ends: 'Sample Day 1, 18:00', text: 'Sample text: invented heavy rain over saturated sample ground. Move to higher ground in this fictional scenario.' },
    { id: 'a02', type: 'High Wind Warning', level: 'warning', region: 'HP', area: 'Windmere and the Copper Mesa plateau', ends: 'Sample Day 1, 23:00', text: 'Sample text: invented sustained winds of 40 to 50 mph with gusts to 65 mph. Secure outdoor objects in this fictional scenario.' },
    { id: 'a03', type: 'Winter Storm Warning', level: 'warning', region: 'NV', area: 'Pinecrest and the upper Ironwood hills', ends: 'Sample Day 2, 12:00', text: 'Sample text: invented heavy snow, 8 to 14 inches. Travel would be difficult in this fictional scenario.' },
    { id: 'a04', type: 'Flood Watch', level: 'watch', region: 'EM', area: 'Eastmarch lowlands', ends: 'Sample Day 2, 06:00', text: 'Sample text: conditions invented to be favorable for flooding. Be ready to act if a warning were issued in this fictional scenario.' },
    { id: 'a05', type: 'Severe Thunderstorm Watch', level: 'watch', region: 'SR', area: 'Redfern and Amber Hollow', ends: 'Sample Day 1, 21:00', text: 'Sample text: invented conditions favorable for severe storms with hail. Review your plan in this fictional scenario.' },
    { id: 'a06', type: 'Freeze Watch', level: 'watch', region: 'NV', area: 'Northvale river basin', ends: 'Sample Day 3, 09:00', text: 'Sample text: invented sub-freezing overnight lows that could damage sample crops.' },
    { id: 'a07', type: 'Winter Weather Advisory', level: 'advisory', region: 'NV', area: 'Ironwood and surrounding towns', ends: 'Sample Day 2, 03:00', text: 'Sample text: invented light snow and blowing snow, 2 to 4 inches. Slippery roads in this fictional scenario.' },
    { id: 'a08', type: 'Dense Fog Advisory', level: 'advisory', region: 'EM', area: 'Saltmarsh harbor district', ends: 'Sample Day 1, 10:00', text: 'Sample text: invented visibility of one quarter mile or less. Use low beams in this fictional scenario.' },
    { id: 'a09', type: 'Heat Advisory', level: 'advisory', region: 'SR', area: 'Redfern valley', ends: 'Sample Day 1, 20:00', text: 'Sample text: invented heat index values near 105. Drink water and take breaks in this fictional scenario.' },
    { id: 'a10', type: 'Coastal Flood Advisory', level: 'advisory', region: 'CO', area: 'Larkspur Bay shoreline', ends: 'Sample Day 1, 15:00', text: 'Sample text: invented minor tidal flooding of low-lying streets near high tide.' },
    { id: 'a11', type: 'Frost Advisory', level: 'advisory', region: 'HP', area: 'Highplains foothills', ends: 'Sample Day 2, 08:00', text: 'Sample text: invented patchy frost likely. Cover sensitive sample plants.' },
    { id: 'a12', type: 'Red Flag Warning', level: 'warning', region: 'SR', area: 'Amber Hollow scrublands', ends: 'Sample Day 1, 22:00', text: 'Sample text: invented critical fire weather from low humidity and gusty wind.' },
    { id: 'a13', type: 'Small Craft Advisory', level: 'advisory', region: 'CO', area: 'Glasswater sound', ends: 'Sample Day 2, 00:00', text: 'Sample text: invented winds and seas hazardous to small boats.' },
    { id: 'a14', type: 'Air Quality Alert', level: 'advisory', region: 'HP', area: 'Copper Mesa basin', ends: 'Sample Day 1, 23:59', text: 'Sample text: invented elevated sample particle levels. Sensitive groups should limit outdoor exertion.' }
  ];
  var LEVELS = { warning: { label: 'WARNING', mark: '▲' }, watch: { label: 'WATCH', mark: '■' }, advisory: { label: 'ADVISORY', mark: '●' } };
  var LOCATION_ALERTS = { saltmarsh: ['a01', 'a04', 'a08'], windmere: ['a02', 'a14'], pinecrest: ['a03', 'a06'], ironwood: ['a07', 'a03'], redfern: ['a05', 'a09'], 'amber-hollow': ['a12', 'a05'], 'larkspur-bay': ['a10'], glasswater: ['a13'], 'copper-mesa': ['a02', 'a14'], thistledown: ['a04'] };
  var GLOSSARY = [
    ['Advisory', 'A sample-site term: a message that conditions are expected to cause inconvenience, and could become hazardous.'],
    ['Barometric pressure', 'The weight of the air above a point, shown here in inches of the fictional sample scale.'],
    ['Blowing snow', 'Snow lifted from the ground by wind, reducing visibility.'],
    ['Dew point', 'The temperature at which air would become saturated; higher values feel more humid.'],
    ['Flash flood', 'A rapid rise of water over low-lying ground, usually from heavy rain over a short time.'],
    ['Flood watch', 'Conditions are favorable for flooding, but it is not yet occurring or imminent.'],
    ['Freeze', 'Air temperature at or below 32 degrees Fahrenheit (0 degrees Celsius) for long enough to damage tender plants.'],
    ['Frost', 'Ice crystals forming on surfaces when temperatures are near freezing.'],
    ['Gust', 'A brief increase in wind speed lasting a few seconds.'],
    ['Heat index', 'A measure combining air temperature and humidity to describe how hot it feels.'],
    ['High wind', 'Sustained strong wind expected to cause damage in this fictional scenario.'],
    ['Humidity', 'The amount of water vapor in the air, shown as a percentage.'],
    ['Precipitation chance', 'The sample likelihood that measurable rain or snow falls at a point in the period.'],
    ['Red flag', 'Weather that, with dry fuels, would raise wildfire danger.'],
    ['Visibility', 'The greatest distance a person can see and identify objects.'],
    ['Warning', 'A message that hazardous conditions are occurring or imminent and action is needed.'],
    ['Watch', 'A message that conditions are favorable for a hazard; stay prepared.'],
    ['Wind chill', 'How cold the air feels on exposed skin when wind is combined with low temperature.']
  ];
  var NEWS = [
    { id: 'n1', cat: 'Education', title: 'Why sample forecasts carry a label (a fictional explainer)', date: 'Sample Day 1', text: 'An invented article describing why every figure on this research site is labeled as sample data, and how readers can tell it is not real weather.' },
    { id: 'n2', cat: 'Safety', title: 'Practice your sample severe-weather plan', date: 'Sample Day 2', text: 'A made-up preparedness note: know your shelter, keep a kit, and rehearse a plan. The advice is generic and the scenario is fictional.' },
    { id: 'n3', cat: 'Science', title: 'Inside a fictional forecast office', date: 'Sample Day 3', text: 'A fictional feature on how a forecast office staffed by invented meteorologists might prepare a sample daily outlook.' },
    { id: 'n4', cat: 'Education', title: 'Reading a hazard map: shapes, patterns and words', date: 'Sample Day 4', text: 'Invented guidance showing that alert levels are marked with words and symbols as well as colour.' },
    { id: 'n5', cat: 'Science', title: 'Sample satellite loops: what the bands show', date: 'Sample Day 5', text: 'A fictional overview of visible, infrared and water-vapor placeholder imagery.' },
    { id: 'n6', cat: 'Community', title: 'Fictional spotter training open house', date: 'Sample Day 6', text: 'An invented community event listing. No real event is being advertised.' }
  ];
  var STATIONS = LOCATIONS.concat([
    { id: 'st-11', name: 'Harrow Airfield', region: 'NV', base: 38, cond: 2, hum: 62, wind: 12, press: 29.72, vis: 10 },
    { id: 'st-12', name: 'Quillon Pass', region: 'HP', base: 70, cond: 1, hum: 25, wind: 21, press: 29.98, vis: 10 }
  ]);

  function seed(loc) { return loc.id.length + loc.base; }
  function dailyFor(loc) {
    var out = [], s = seed(loc);
    for (var i = 0; i < 7; i++) {
      var hi = Math.round(loc.base + 7 * Math.sin(i * 1.1 + s) + 2);
      var lo = hi - 10 - (s + i) % 4;
      var c = (loc.cond + i * 2 + s) % CONDS.length;
      out.push({ day: 'Sample Day ' + (i + 1), hi: hi, lo: lo, cond: CONDS[c], pop: ((s + i * 17) % 7) * 10 + (c === 3 || c === 5 ? 30 : 0), wind: loc.wind + ((i * 3 + s) % 9) - 4 });
    }
    return out;
  }
  function hourlyFor(loc) {
    var out = [], s = seed(loc);
    for (var h = 0; h < 24; h++) {
      var t = Math.round(loc.base - 6 + 9 * Math.sin((h - 9) / 24 * Math.PI * 2));
      var c = (loc.cond + Math.floor(h / 6) + s) % CONDS.length;
      out.push({ hour: (h < 10 ? '0' : '') + h + ':00', t: t, cond: CONDS[c], pop: ((h * 7 + s) % 6) * 10, wind: Math.max(0, loc.wind + Math.round(4 * Math.sin(h / 3))) });
    }
    return out;
  }

  /* ---------- temperature unit toggle (intentional addition) ---------- */
  var unit = store.get('mwa-unit') === 'C' ? 'C' : 'F';
  function temp(f) { return unit === 'C' ? Math.round((f - 32) * 5 / 9) + '°C' : Math.round(f) + '°F'; }
  function speed(mph) { return unit === 'C' ? Math.round(mph * 1.609) + ' km/h' : Math.round(mph) + ' mph'; }
  function applyStatic() {
    $$('[data-temp-f]').forEach(function (el) { el.textContent = temp(parseFloat(el.getAttribute('data-temp-f'))); });
    $$('[data-speed-mph]').forEach(function (el) { el.textContent = speed(parseFloat(el.getAttribute('data-speed-mph'))); });
  }
  function initUnit(onChange) {
    var g = $('[data-component="unit-toggle"]');
    if (!g) return;
    var btns = $$('button', g);
    function sync() {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-unit') === unit)); });
      var st = $('.unit-status', g); if (st) st.textContent = 'Showing ' + (unit === 'F' ? 'Fahrenheit and mph' : 'Celsius and km/h') + '.';
      applyStatic();
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { unit = b.getAttribute('data-unit'); store.set('mwa-unit', unit); sync(); onChange && onChange(); }); });
    sync();
  }

  /* ---------- navigation ---------- */
  function initNav() {
    var nav = $('#topnav'), mb = $('.menu-button');
    if (!nav) return;
    if (mb) {
      mb.setAttribute('aria-expanded', 'false');
      mb.addEventListener('click', function () {
        var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o));
      });
    }
    var toggles = $$('button[aria-controls]', nav);
    function closeAll(except) {
      toggles.forEach(function (b) {
        if (b === except) return;
        b.setAttribute('aria-expanded', 'false');
        var p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.classList.remove('open');
      });
    }
    toggles.forEach(function (b) {
      var panel = document.getElementById(b.getAttribute('aria-controls'));
      b.setAttribute('aria-expanded', 'false');
      var byHover = false;
      b.addEventListener('click', function () {
        var open = byHover ? true : b.getAttribute('aria-expanded') !== 'true'; byHover = false;
        closeAll(b); b.setAttribute('aria-expanded', String(open)); panel.classList.toggle('open', open);
      });
      var timer;
      var li = b.parentNode;
      li.addEventListener('mouseenter', function () {
        if (window.matchMedia('(hover:hover) and (min-width:861px)').matches) { clearTimeout(timer); closeAll(b); byHover = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', 'true'); panel.classList.add('open'); }
      });
      li.addEventListener('mouseleave', function () {
        if (window.matchMedia('(hover:hover) and (min-width:861px)').matches) { timer = setTimeout(function () { byHover = false; b.setAttribute('aria-expanded', 'false'); panel.classList.remove('open'); }, 250); }
      });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); closeAll(b); b.setAttribute('aria-expanded', 'true'); panel.classList.add('open'); var a = $('a', panel); a && a.focus(); }
      });
      panel.addEventListener('keydown', function (e) {
        var links = $$('a', panel), i = links.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); links[(i + 1) % links.length].focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openBtn = toggles.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
      if (openBtn) { closeAll(); openBtn.focus(); }
      else if (mb && nav.classList.contains('open')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.focus(); }
    });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeAll(); });
    nav.addEventListener('focusout', function (e) { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeAll(); });
  }

  /* ---------- generic tabs ---------- */
  function initTabs(root) {
    var tabs = $$('[role=tab]', root), panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function select(i, focus) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; panels[j].hidden = i !== j; });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length;
        if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % n, true); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + n) % n, true); }
        else if (e.key === 'Home') { e.preventDefault(); select(0, true); }
        else if (e.key === 'End') { e.preventDefault(); select(n - 1, true); }
      });
    });
    select(0);
  }

  /* ---------- alerts rendering ---------- */
  function alertHtml(a, headingTag) {
    var L = LEVELS[a.level], h = headingTag || 'h3';
    return '<li class="alert alert--' + a.level + '" id="' + a.id + '" data-component="alert-item"><' + h + '><span class="level"><span aria-hidden="true">' + L.mark + ' </span>' + L.label + '</span>' + esc(a.type) + '</' + h + '>' +
      '<p class="meta"><strong>Area:</strong> ' + esc(a.area) + ' (' + esc(REGIONS[a.region]) + ')</p><p class="meta"><strong>Sample expiry:</strong> ' + esc(a.ends) + ' (fictional)</p><p>' + esc(a.text) + '</p></li>';
  }

  /* ---------- location search (shared) ---------- */
  function searchLocations(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return LOCATIONS.filter(function (l) { return l.name.toLowerCase().indexOf(q) > -1 || l.regionName.toLowerCase().indexOf(q) > -1 || l.region.toLowerCase() === q; });
  }
  function rememberedLoc() { var id = store.get('mwa-loc'); return LOCATIONS.filter(function (l) { return l.id === id; })[0] || null; }

  function initSiteSearch() {
    var f = $('#site-search form');
    if (!f) return;
    var inp = $('input[type=search]', f);
    f.addEventListener('submit', function (e) {
      if (!inp.value.trim()) { e.preventDefault(); inp.focus(); inp.setAttribute('aria-invalid', 'true'); inp.setAttribute('aria-describedby', 'site-search-error'); var er = $('#site-search-error'); if (er) { er.hidden = false; } return; }
      inp.removeAttribute('aria-invalid');
    });
    inp.addEventListener('input', function () { inp.removeAttribute('aria-invalid'); var er = $('#site-search-error'); if (er) er.hidden = true; });
  }

  /* ---------- page: home ---------- */
  function pageHome() {
    var box = $('#hazard-list');
    var types = {}; ALERTS.forEach(function (a) { (types[a.type] = types[a.type] || []).push(a); });
    box.innerHTML = Object.keys(types).sort().map(function (t) { return '<li><a href="alerts.html?type=' + encodeURIComponent(t) + '">' + esc(t) + '</a> <span>(' + types[t].length + ' sample)</span></li>'; }).join('');
    // radar variant toggle (demo)
    var img = $('#radar-img'), btns = $$('[data-radar]');
    btns.forEach(function (b) { b.addEventListener('click', function () {
      btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      img.src = b.getAttribute('data-radar') === 'enhanced' ? 'assets/radar-enhanced.svg' : 'assets/radar-standard.svg';
      img.alt = b.getAttribute('data-radar') === 'enhanced' ? 'Sample placeholder of an enhanced radar view with invented rain bands; not real radar.' : 'Sample placeholder of a low-bandwidth radar view with invented rain blobs; not real radar.';
      $('#radar-status').textContent = 'Showing the ' + b.textContent.trim() + ' sample placeholder.';
    }); });
    // My Forecast widget (INFERRED feature)
    var form = $('#myforecast-form'), out = $('#myforecast-result');
    function show() {
      var l = rememberedLoc();
      if (!l) { out.innerHTML = '<p>No saved location yet. Search for a sample location (try "Ironwood" or "Coastal").</p>'; return; }
      var d = dailyFor(l)[0];
      out.innerHTML = SAMPLE_TAG + '<p><strong>' + esc(l.name) + '</strong> (saved in this browser only)</p><p>Sample Day 1 outlook: ' + esc(d.cond) + ', high <span data-temp-f="' + d.hi + '"></span>, low <span data-temp-f="' + d.lo + '"></span>.</p><p><a href="point-forecast.html?loc=' + l.id + '">Open the full sample forecast for ' + esc(l.name) + '</a> <button type="button" class="btn btn-secondary" id="forget-loc">Forget location</button></p>';
      applyStatic();
      $('#forget-loc').addEventListener('click', function () { try { window.localStorage.removeItem('mwa-loc'); } catch (e) {} show(); $('#myforecast-q').focus(); });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = $('#myforecast-q'), err = $('#myforecast-error'), r = searchLocations(q.value);
      if (!q.value.trim()) { err.textContent = 'Enter a sample location name or region.'; err.hidden = false; q.setAttribute('aria-invalid', 'true'); q.focus(); return; }
      if (!r.length) { err.textContent = 'No sample location matches "' + q.value + '". Try Ironwood, Saltmarsh or Coastal.'; err.hidden = false; q.setAttribute('aria-invalid', 'true'); q.focus(); return; }
      err.hidden = true; q.removeAttribute('aria-invalid');
      store.set('mwa-loc', r[0].id); show();
      $('#myforecast-status').textContent = 'Saved ' + r[0].name + ' as your sample location.';
    });
    show();
  }

  /* ---------- page: alerts ---------- */
  function pageAlerts() {
    var list = $('#alert-list'), status = $('#alert-status');
    var fl = $('#f-level'), fr = $('#f-region'), fq = $('#f-q'), ft = $('#f-type');
    var types = []; ALERTS.forEach(function (a) { if (types.indexOf(a.type) < 0) types.push(a.type); }); types.sort();
    ft.innerHTML = '<option value="">All types</option>' + types.map(function (t) { return '<option>' + esc(t) + '</option>'; }).join('');
    fr.innerHTML = '<option value="">All regions</option>' + Object.keys(REGIONS).map(function (k) { return '<option value="' + k + '">' + esc(REGIONS[k]) + '</option>'; }).join('');
    if (params.get('type')) ft.value = params.get('type');
    if (params.get('region')) fr.value = params.get('region');
    function render() {
      var q = fq.value.trim().toLowerCase();
      var r = ALERTS.filter(function (a) { return (!fl.value || a.level === fl.value) && (!fr.value || a.region === fr.value) && (!ft.value || a.type === ft.value) && (!q || (a.type + ' ' + a.area + ' ' + a.text).toLowerCase().indexOf(q) > -1); });
      var order = { warning: 0, watch: 1, advisory: 2 };
      r.sort(function (a, b) { return order[a.level] - order[b.level]; });
      list.innerHTML = r.map(function (a) { return alertHtml(a); }).join('');
      $('#alert-empty').hidden = r.length > 0;
      status.textContent = r.length + ' of ' + ALERTS.length + ' sample alerts shown.';
    }
    [fl, fr, ft].forEach(function (el) { el.addEventListener('change', render); });
    fq.addEventListener('input', render);
    $('#alert-filter').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    $('#alert-reset').addEventListener('click', function () { fl.value = fr.value = ft.value = fq.value = ''; render(); fq.focus(); });
    render();
  }

  /* ---------- page: current conditions ---------- */
  function pageCurrent() {
    var body = $('#obs-body'), sortKey = 'name', dir = 1;
    var fr = $('#o-region'), fq = $('#o-q');
    fr.innerHTML = '<option value="">All regions</option>' + Object.keys(REGIONS).map(function (k) { return '<option value="' + k + '">' + esc(REGIONS[k]) + '</option>'; }).join('');
    function render() {
      var q = fq.value.trim().toLowerCase();
      var r = STATIONS.filter(function (s) { return (!fr.value || s.region === fr.value) && (!q || s.name.toLowerCase().indexOf(q) > -1); });
      r.sort(function (a, b) { var x = a[sortKey], y = b[sortKey]; return (x > y ? 1 : x < y ? -1 : 0) * dir; });
      body.innerHTML = r.map(function (s) {
        var link = s.office ? '<a href="point-forecast.html?loc=' + s.id + '">' + esc(s.name) + '</a>' : esc(s.name);
        return '<tr><th scope="row">' + link + '</th><td>' + esc(REGIONS[s.region]) + '</td><td>' + temp(s.base) + '</td><td>' + esc(CONDS[s.cond]) + '</td><td>' + s.hum + '%</td><td>' + speed(s.wind) + '</td><td>' + s.press.toFixed(2) + ' in</td></tr>';
      }).join('');
      $('#obs-empty').hidden = r.length > 0;
      $('#obs-status').textContent = r.length + ' sample stations shown, sorted by ' + sortKey + (dir === 1 ? ' ascending' : ' descending') + '.';
      $$('th[aria-sort]').forEach(function (th) { th.setAttribute('aria-sort', 'none'); });
      var cur = $('th[data-key="' + sortKey + '"]'); if (cur) cur.setAttribute('aria-sort', dir === 1 ? 'ascending' : 'descending');
    }
    $$('th[data-key] button').forEach(function (b) { b.addEventListener('click', function () {
      var k = b.parentNode.getAttribute('data-key'); if (k === sortKey) dir = -dir; else { sortKey = k; dir = 1; } render();
    }); });
    fr.addEventListener('change', render); fq.addEventListener('input', render);
    $('#obs-form').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    initUnit(render); render();
  }

  /* ---------- page: point forecast ---------- */
  function pagePoint() {
    var out = $('#point-out'), resBox = $('#point-results');
    var loc = LOCATIONS.filter(function (l) { return l.id === params.get('loc'); })[0];
    var q = params.get('q');
    var form = $('#point-form'), inp = $('#point-q'), err = $('#point-error');
    if (q) inp.value = q;
    form.addEventListener('submit', function (e) {
      var r = searchLocations(inp.value);
      if (!inp.value.trim()) { e.preventDefault(); err.textContent = 'Enter a sample location name or region.'; err.hidden = false; inp.setAttribute('aria-invalid', 'true'); inp.focus(); }
    });
    if (!loc && q) {
      var r = searchLocations(q);
      if (r.length === 1) { loc = r[0]; }
      else {
        out.hidden = true; resBox.hidden = false;
        resBox.innerHTML = r.length ? '<h2 id="results-h" tabindex="-1">' + r.length + ' sample locations match "' + esc(q) + '"</h2><ul>' + r.map(function (l) { return '<li><a href="point-forecast.html?loc=' + l.id + '">' + esc(l.name) + ', ' + esc(l.regionName) + '</a></li>'; }).join('') + '</ul>'
          : '<h2 id="results-h" tabindex="-1">No sample location matches "' + esc(q) + '"</h2><p>Try Ironwood, Saltmarsh, Larkspur Bay or a region such as Highplains.</p>';
        $('#results-h').focus();
        return;
      }
    }
    if (!loc) loc = rememberedLoc() || LOCATIONS[1];
    store.set('mwa-loc', loc.id);
    var daily = dailyFor(loc), hourly = hourlyFor(loc);
    function render() {
      var al = (LOCATION_ALERTS[loc.id] || []).map(function (id) { return ALERTS.filter(function (a) { return a.id === id; })[0]; });
      var dp = Math.round(loc.base - (100 - loc.hum) / 5);
      out.innerHTML =
        '<div class="grid-2"><section aria-labelledby="pf-now" data-section="current-conditions" data-component="current-conditions-card" class="panel">' + SAMPLE_TAG +
        '<h2 id="pf-now">Sample conditions: ' + esc(loc.name) + '</h2><p><strong style="font-size:2rem">' + temp(loc.base) + '</strong> ' + esc(CONDS[loc.cond]) + '</p>' +
        '<dl class="defs"><dt>Humidity</dt><dd>' + loc.hum + '%</dd><dt>Wind</dt><dd>' + speed(loc.wind) + '</dd><dt>Dew point</dt><dd>' + temp(dp) + '</dd><dt>Pressure</dt><dd>' + loc.press.toFixed(2) + ' in</dd><dt>Visibility</dt><dd>' + loc.vis + ' mi</dd></dl>' +
        '<p>Sample observation time: Sample Day 1, 06:00 (fictional). This is not a real observation.</p></section>' +
        '<section aria-labelledby="pf-haz" data-section="hazards" data-component="hazards-box" class="panel">' + SAMPLE_TAG + '<h2 id="pf-haz">Sample hazards</h2>' +
        (al.length ? '<ul class="alert-list">' + al.map(function (a) { return alertHtml(a, 'h3'); }).join('') + '</ul>' : '<p>No sample hazards are listed for this fictional location.</p>') + '<p><a href="alerts.html?region=' + loc.region + '">All sample alerts for ' + esc(loc.regionName) + '</a></p></section></div>' +
        '<section aria-labelledby="pf-fc" data-section="forecast" data-component="forecast-tabs"><h2 id="pf-fc">Sample forecast</h2>' + SAMPLE_TAG +
        '<div role="tablist" aria-label="Forecast views"><button role="tab" id="tab-daily" aria-controls="panel-daily" type="button">7-day (sample)</button><button role="tab" id="tab-hourly" aria-controls="panel-hourly" type="button">Hourly (sample)</button></div>' +
        '<div role="tabpanel" id="panel-daily" aria-labelledby="tab-daily"><div class="table-wrap" tabindex="0" role="region" aria-label="Sample 7-day table"><table><caption>Fictional 7-day outlook for ' + esc(loc.name) + '</caption><thead><tr><th scope="col">Period</th><th scope="col">Sky</th><th scope="col">High</th><th scope="col">Low</th><th scope="col">Rain/snow chance</th><th scope="col">Wind</th></tr></thead><tbody>' +
        daily.map(function (d) { return '<tr><th scope="row">' + d.day + '</th><td>' + esc(d.cond) + '</td><td>' + temp(d.hi) + '</td><td>' + temp(d.lo) + '</td><td>' + d.pop + '%</td><td>' + speed(d.wind) + '</td></tr>'; }).join('') + '</tbody></table></div></div>' +
        '<div role="tabpanel" id="panel-hourly" aria-labelledby="tab-hourly" hidden><div class="table-wrap" tabindex="0" role="region" aria-label="Sample hourly table"><table><caption>Fictional hourly outlook for Sample Day 1, ' + esc(loc.name) + '</caption><thead><tr><th scope="col">Sample hour</th><th scope="col">Temp</th><th scope="col">Sky</th><th scope="col">Chance</th><th scope="col">Wind</th></tr></thead><tbody>' +
        hourly.map(function (h) { return '<tr><th scope="row">' + h.hour + '</th><td>' + temp(h.t) + '</td><td>' + esc(h.cond) + '</td><td>' + h.pop + '%</td><td>' + speed(h.wind) + '</td></tr>'; }).join('') + '</tbody></table></div></div></section>' +
        '<p>Forecast office: <a href="local-office.html">' + esc(loc.office || 'Sample Forecast Office') + '</a> (fictional).</p>';
      var tl = $('[role=tablist]', out); initTabs(out);
    }
    var cur = $('#point-title'); cur.textContent = 'Sample point forecast: ' + loc.name + ', ' + loc.regionName;
    document.title = 'Sample point forecast: ' + loc.name + ' - Meridian Weather Authority (fictional)';
    var sel = out.getAttribute('data-ready');
    var active = null;
    initUnit(function () { var selected = $('[role=tab][aria-selected="true"]', out); var id = selected && selected.id; render(); if (id === 'tab-hourly') { $('#tab-hourly').click(); } });
    render();
  }

  /* ---------- page: forecast maps ---------- */
  function pageMaps() {
    var img = $('#fmap-img'), cap = $('#fmap-cap'), prod = 'temperature', day = 1;
    var ALT = { temperature: 'Sample placeholder map with invented temperature bands; not a real forecast.', precipitation: 'Sample placeholder map with invented rain and snow areas; not a real forecast.', wind: 'Sample placeholder map with invented wind arrows; not a real forecast.' };
    function render() {
      img.src = 'assets/forecast-' + prod + '.svg'; img.alt = ALT[prod];
      img.style.transform = 'translateX(' + (-(day - 1) * 4) + '%) scale(1.1)';
      cap.textContent = 'Sample ' + prod + ' map, Sample Day ' + day + ' (fictional placeholder).';
      $$('[data-prod]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-prod') === prod)); });
      $$('[data-day]').forEach(function (b) { b.setAttribute('aria-pressed', String(parseInt(b.getAttribute('data-day'), 10) === day)); });
    }
    $$('[data-prod]').forEach(function (b) { b.addEventListener('click', function () { prod = b.getAttribute('data-prod'); render(); }); });
    $$('[data-day]').forEach(function (b) { b.addEventListener('click', function () { day = parseInt(b.getAttribute('data-day'), 10); render(); }); });
    render();
  }

  /* ---------- page: satellite ---------- */
  function pageSat() {
    var img = $('#sat-img'), rng = $('#sat-frame'), out = $('#sat-frame-out'), band = 'visible';
    var ALT = { visible: 'Sample placeholder of a visible-light satellite view with invented clouds; not real imagery.', infrared: 'Sample placeholder of an infrared satellite view with invented cloud-top shading; not real imagery.', vapor: 'Sample placeholder of a water-vapor satellite view with invented moisture swirls; not real imagery.' };
    function render() {
      img.src = 'assets/sat-' + band + '.svg'; img.alt = ALT[band];
      var f = parseInt(rng.value, 10);
      img.style.transform = 'translateX(' + (f - 1) * 3 + '%) scale(1.12)';
      out.textContent = 'Sample frame ' + f + ' of 6, ' + band + ' band (fictional).';
      rng.setAttribute('aria-valuetext', 'Sample frame ' + f + ' of 6');
      $$('[data-band]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-band') === band)); });
    }
    $$('[data-band]').forEach(function (b) { b.addEventListener('click', function () { band = b.getAttribute('data-band'); render(); }); });
    rng.addEventListener('input', render); render();
  }

  /* ---------- page: glossary ---------- */
  function pageGlossary() {
    var list = $('#gloss-list'), q = $('#g-q'), letter = '';
    var letters = {}; GLOSSARY.forEach(function (g) { letters[g[0][0].toUpperCase()] = 1; });
    var lb = $('#g-letters');
    lb.innerHTML = '<button type="button" class="btn btn-secondary" data-letter="" aria-pressed="true">All</button>' + Object.keys(letters).sort().map(function (l) { return '<button type="button" class="btn btn-secondary" data-letter="' + l + '" aria-pressed="false">' + l + '</button>'; }).join('');
    function render() {
      var s = q.value.trim().toLowerCase();
      var r = GLOSSARY.filter(function (g) { return (!letter || g[0][0].toUpperCase() === letter) && (!s || (g[0] + ' ' + g[1]).toLowerCase().indexOf(s) > -1); });
      list.innerHTML = r.map(function (g) { return '<dt>' + esc(g[0]) + '</dt><dd>' + esc(g[1]) + '</dd>'; }).join('');
      $('#g-empty').hidden = r.length > 0;
      $('#g-status').textContent = r.length + ' of ' + GLOSSARY.length + ' terms shown.';
    }
    $$('button', lb).forEach(function (b) { b.addEventListener('click', function () { letter = b.getAttribute('data-letter'); $$('button', lb).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); render(); }); });
    q.addEventListener('input', render); $('#g-form').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    render();
  }

  /* ---------- page: news ---------- */
  function pageNews() {
    var list = $('#news-list'), sel = $('#n-cat'), q = $('#n-q');
    var cats = []; NEWS.forEach(function (n) { if (cats.indexOf(n.cat) < 0) cats.push(n.cat); });
    sel.innerHTML = '<option value="">All topics</option>' + cats.map(function (c) { return '<option>' + c + '</option>'; }).join('');
    function render() {
      var s = q.value.trim().toLowerCase();
      var r = NEWS.filter(function (n) { return (!sel.value || n.cat === sel.value) && (!s || (n.title + n.text).toLowerCase().indexOf(s) > -1); });
      list.innerHTML = r.map(function (n) { return '<li class="panel" id="' + n.id + '" data-component="news-item"><h3>' + esc(n.title) + '</h3><p class="meta">' + esc(n.cat) + ' | ' + esc(n.date) + ' (fictional)</p><p>' + esc(n.text) + '</p></li>'; }).join('');
      $('#n-empty').hidden = r.length > 0;
      $('#n-status').textContent = r.length + ' of ' + NEWS.length + ' sample articles shown.';
    }
    sel.addEventListener('change', render); q.addEventListener('input', render); $('#n-form').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    render();
  }

  /* ---------- page: contact form ---------- */
  function pageContact() {
    var form = $('#contact-form'), sumBox = $('#error-summary'), ok = $('#contact-success');
    var rules = [
      { id: 'c-name', test: function (v) { return v.trim().length > 0; }, msg: 'Enter your name.' },
      { id: 'c-email', test: function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); }, msg: 'Enter an email address like name@example.org.' },
      { id: 'c-topic', test: function (v) { return v !== ''; }, msg: 'Choose a topic.' },
      { id: 'c-msg', test: function (v) { return v.trim().length >= 10; }, msg: 'Enter a message of at least 10 characters.' }
    ];
    function clear() { rules.forEach(function (r) { var el = document.getElementById(r.id); el.removeAttribute('aria-invalid'); var e = document.getElementById(r.id + '-err'); if (e) e.remove(); }); sumBox.hidden = true; sumBox.innerHTML = ''; }
    form.addEventListener('submit', function (e) {
      e.preventDefault(); clear(); ok.hidden = true;
      var errs = [];
      rules.forEach(function (r) {
        var el = document.getElementById(r.id);
        if (!r.test(el.value)) {
          errs.push(r);
          el.setAttribute('aria-invalid', 'true');
          var p = document.createElement('p'); p.className = 'error-text'; p.id = r.id + '-err'; p.textContent = r.msg;
          el.parentNode.appendChild(p);
          el.setAttribute('aria-describedby', r.id + '-err');
        }
      });
      if (errs.length) {
        sumBox.hidden = false;
        sumBox.innerHTML = '<h2 id="es-h">There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with your message</h2><ul>' + errs.map(function (r) { return '<li><a href="#' + r.id + '">' + esc(r.msg) + '</a></li>'; }).join('') + '</ul>';
        sumBox.focus();
        $$('a', sumBox).forEach(function (a) { a.addEventListener('click', function (ev) { ev.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus(); }); });
        return;
      }
      form.reset(); ok.hidden = false; ok.focus();
    });
  }

  /* ---------- page: safety accordion ---------- */
  function pageSafety() {
    var all = $$('.accordion details');
    var open = $('#acc-open'), close = $('#acc-close');
    open.addEventListener('click', function () { all.forEach(function (d) { d.open = true; }); });
    close.addEventListener('click', function () { all.forEach(function (d) { d.open = false; }); });
  }

  /* ---------- page: local office ---------- */
  function pageOffice() {
    var sel = $('#office-sel'), out = $('#office-out');
    var offices = {}; LOCATIONS.forEach(function (l) { (offices[l.office] = offices[l.office] || []).push(l); });
    var names = Object.keys(offices).sort();
    sel.innerHTML = names.map(function (n) { return '<option>' + esc(n) + '</option>'; }).join('');
    function render() {
      var n = sel.value, ls = offices[n];
      out.innerHTML = '<h2>' + esc(n) + '</h2>' + SAMPLE_TAG + '<p>Fictional office serving: ' + ls.map(function (l) { return '<a href="point-forecast.html?loc=' + l.id + '">' + esc(l.name) + '</a>'; }).join(', ') + '.</p><p>Invented sample discussion: a slow-moving sample system keeps showers likely through Sample Day 2, with clearing on Sample Day 3. This text is fictional and describes no real weather.</p>';
    }
    sel.addEventListener('change', render); render();
  }

  /* ---------- boot ---------- */
  function boot() {
    initNav(); initSiteSearch();
    var page = document.body.getAttribute('data-page');
    var map = { home: pageHome, alerts: pageAlerts, current: pageCurrent, point: pagePoint, maps: pageMaps, satellite: pageSat, glossary: pageGlossary, news: pageNews, contact: pageContact, safety: pageSafety, office: pageOffice };
    if (page !== 'current' && page !== 'point') initUnit();
    if (map[page]) map[page]();
    applyStatic();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
