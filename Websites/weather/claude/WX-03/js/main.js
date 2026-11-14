/* Meridian 12 Weather (fictional) - WX-03 replica. Vanilla JS, no dependencies. ALL weather data in this file is invented sample data. */
(function () {
'use strict';
document.documentElement.classList.add('js');
var DATA = {
  station: 'Meridian 12 Weather',
  locations: [
    { id: 'CB-101', name: 'Ashford Falls', county: 'Ashford County', dt: 0, dp: 0 },
    { id: 'CB-102', name: 'Marlow', county: 'Marlow County', dt: -3, dp: 5 },
    { id: 'CB-103', name: 'Eastbrook', county: 'Eastbrook County', dt: 2, dp: 10 },
    { id: 'CB-104', name: 'Pine Hollow', county: 'Ashford County', dt: -6, dp: 0 },
    { id: 'CB-105', name: 'Tern Harbor', county: 'Tern County', dt: 4, dp: 15 },
    { id: 'CB-106', name: 'Linden Ridge', county: 'Marlow County', dt: -8, dp: -5 },
    { id: 'CB-107', name: 'Copper Mill', county: 'Eastbrook County', dt: 1, dp: 5 },
    { id: 'CB-108', name: 'Wexley', county: 'Tern County', dt: -2, dp: 0 }
  ],
  cond: {
    sun: ['Sunny', 'icon-sun.svg'], partly: ['Partly cloudy', 'icon-partly.svg'], rain: ['Rain showers', 'icon-rain.svg'],
    storm: ['Thunderstorms', 'icon-storm.svg'], cold: ['Windy and colder', 'icon-cold.svg'], clear: ['Clear', 'icon-moon.svg']
  },
  current: { t: 52, feels: 49, c: 'partly', hum: 58, wind: 'NW 9 mph', vis: '10 mi' },
  days: [
    { d: 'Mon', c: 'sun', hi: 61, lo: 38, p: 5, w: 'NW 8 mph' },
    { d: 'Tue', c: 'partly', hi: 64, lo: 41, p: 10, w: 'W 6 mph' },
    { d: 'Wed', c: 'rain', hi: 58, lo: 46, p: 70, w: 'S 10 mph' },
    { d: 'Thu', c: 'storm', hi: 55, lo: 47, p: 80, w: 'SW 14 mph' },
    { d: 'Fri', c: 'cold', hi: 49, lo: 34, p: 40, w: 'NW 18 mph' },
    { d: 'Sat', c: 'clear', hi: 44, lo: 27, p: 5, w: 'N 7 mph', note: 'A sample hard freeze is possible at dawn, then a bright, chilly afternoon. Good fictional weather for a fictional jacket.' },
    { d: 'Sun', c: 'sun', hi: 50, lo: 30, p: 0, w: 'NE 5 mph', note: 'Sunnier and a little milder in this sample scenario, with light winds all day.' }
  ],
  hours: [
    { h: '6 AM', c: 'clear', t: 41, p: 0, w: 'NW 5 mph' }, { h: '8 AM', c: 'sun', t: 46, p: 0, w: 'NW 6 mph' },
    { h: '10 AM', c: 'sun', t: 54, p: 0, w: 'NW 8 mph' }, { h: '12 PM', c: 'sun', t: 59, p: 5, w: 'NW 9 mph' },
    { h: '2 PM', c: 'partly', t: 61, p: 5, w: 'W 9 mph' }, { h: '4 PM', c: 'partly', t: 60, p: 5, w: 'W 8 mph' },
    { h: '6 PM', c: 'partly', t: 55, p: 10, w: 'W 6 mph' }, { h: '8 PM', c: 'clear', t: 49, p: 10, w: 'W 5 mph' },
    { h: '10 PM', c: 'clear', t: 45, p: 5, w: 'W 4 mph' }, { h: '12 AM', c: 'clear', t: 42, p: 0, w: 'W 4 mph' },
    { h: '2 AM', c: 'clear', t: 40, p: 0, w: 'NW 3 mph' }, { h: '4 AM', c: 'clear', t: 38, p: 0, w: 'NW 3 mph' }
  ],
  closings: [
    { id: 1, name: 'Ashford Falls Elementary', type: 'School', county: 'Ashford County', status: 'Closed', note: 'Closed for the sample scenario.' },
    { id: 2, name: 'Ashford Falls High School', type: 'School', county: 'Ashford County', status: 'Delayed 2 hours', note: 'Buses run 2 hours late in this sample.' },
    { id: 3, name: 'Marlow Community College', type: 'School', county: 'Marlow County', status: 'Remote day', note: 'Classes move online in this sample.' },
    { id: 4, name: 'Marlow Early Learning Center', type: 'Child care', county: 'Marlow County', status: 'Closed', note: 'Closed for the sample scenario.' },
    { id: 5, name: 'Eastbrook Middle School', type: 'School', county: 'Eastbrook County', status: 'Early dismissal', note: 'Sample dismissal at 12:00 PM.' },
    { id: 6, name: 'Eastbrook Public Library', type: 'Government', county: 'Eastbrook County', status: 'Delayed 2 hours', note: 'Opens late in this sample.' },
    { id: 7, name: 'Pine Hollow Elementary', type: 'School', county: 'Ashford County', status: 'Closed', note: 'Closed for the sample scenario.' },
    { id: 8, name: 'Tern Harbor Ferry Terminal Office', type: 'Business', county: 'Tern County', status: 'Closed', note: 'Office closed in this sample.' },
    { id: 9, name: 'Tern County Schools (all sites)', type: 'School', county: 'Tern County', status: 'Delayed 2 hours', note: 'District-wide sample delay.' },
    { id: 10, name: 'Linden Ridge Garden Supply', type: 'Business', county: 'Marlow County', status: 'Early dismissal', note: 'Sample staff leave at 3:00 PM.' },
    { id: 11, name: 'Copper Mill Recreation Center', type: 'Government', county: 'Eastbrook County', status: 'Closed', note: 'Closed for the sample scenario.' },
    { id: 12, name: 'Wexley Senior Day Program', type: 'Child care', county: 'Tern County', status: 'Remote day', note: 'Phone check-ins only in this sample.' },
    { id: 13, name: 'Wexley Bakery and Cafe', type: 'Business', county: 'Tern County', status: 'Delayed 2 hours', note: 'Opens at 9:00 AM in this sample.' },
    { id: 14, name: 'Ashford County Offices', type: 'Government', county: 'Ashford County', status: 'Early dismissal', note: 'Sample release at 2:00 PM.' }
  ],
  alerts: [
    { id: 'a1', level: 'Watch', title: 'Freeze Watch', counties: ['Marlow County', 'Ashford County'], when: 'Sample window: Friday night into Saturday morning', text: 'Sample scenario: temperatures could drop to or below freezing for several hours. Fictional guidance: protect pipes, tender plants and pets.' },
    { id: 'a2', level: 'Warning', title: 'Flood Warning', counties: ['Eastbrook County'], when: 'Sample window: Thursday afternoon to Friday morning', text: 'Sample scenario: low-lying roads near the invented Copper Creek may flood after heavy rain. This is not a real warning and names no real place.' },
    { id: 'a3', level: 'Advisory', title: 'Wind Advisory', counties: ['Tern County', 'Eastbrook County'], when: 'Sample window: Friday daytime', text: 'Sample scenario: gusts to 45 mph with the invented cold front. Secure loose outdoor items in this fictional exercise.' },
    { id: 'a4', level: 'Advisory', title: 'Dense Fog Advisory', counties: ['Tern County'], when: 'Sample window: Wednesday early morning', text: 'Sample scenario: visibility below one quarter mile near the invented harbor. Fictional guidance: slow down and use low beams.' },
    { id: 'a5', level: 'Statement', title: 'Special Weather Statement', counties: ['Ashford County', 'Marlow County', 'Eastbrook County', 'Tern County'], when: 'Sample window: Thursday', text: 'Sample scenario: a strong line of invented thunderstorms may bring brief heavy rain and gusty winds to the whole sample region.' }
  ],
  almanac: [
    ['Jan', 47, 28, 3.3, 78, 1996, -2, 1985], ['Feb', 51, 30, 3.0, 81, 2012, 1, 1983], ['Mar', 59, 36, 3.9, 88, 1990, 12, 1993],
    ['Apr', 68, 44, 3.4, 94, 2002, 24, 1987], ['May', 76, 53, 3.8, 98, 2011, 33, 1989], ['Jun', 84, 62, 3.9, 103, 1998, 43, 1994],
    ['Jul', 88, 67, 4.3, 105, 2010, 50, 1986], ['Aug', 86, 66, 4.2, 104, 2007, 48, 1992], ['Sep', 80, 59, 4.0, 99, 2005, 36, 1988],
    ['Oct', 70, 47, 3.1, 92, 2000, 25, 1991], ['Nov', 60, 38, 3.2, 83, 2015, 14, 1984], ['Dec', 50, 31, 3.1, 76, 1995, 4, 1989]
  ],
  sunmoon: [
    ['Mon', '6:58 AM', '5:21 PM', '10 h 23 m', 'Waxing crescent'], ['Tue', '6:59 AM', '5:20 PM', '10 h 21 m', 'First quarter'],
    ['Wed', '7:00 AM', '5:19 PM', '10 h 19 m', 'Waxing gibbous'], ['Thu', '7:01 AM', '5:18 PM', '10 h 17 m', 'Waxing gibbous'],
    ['Fri', '7:02 AM', '5:18 PM', '10 h 16 m', 'Full moon'], ['Sat', '7:03 AM', '5:17 PM', '10 h 14 m', 'Waning gibbous'],
    ['Sun', '7:04 AM', '5:16 PM', '10 h 12 m', 'Waning gibbous']
  ],
  storms: [
    ['Tropical Storm Quillon', 'Tropical storm', '50 mph', 'Sample position: central basin, far from any coast', 'Moving west at 12 mph'],
    ['Hurricane Tavish', 'Category 2 hurricane', '105 mph', 'Sample position: open water, invented 900 miles out', 'Moving northwest at 9 mph'],
    ['Tropical Depression Nine-X', 'Tropical depression', '35 mph', 'Sample position: near invented islands', 'Moving north at 6 mph']
  ],
  webcams: [
    { id: 'w1', name: 'Harbor Bridge (sample view)', area: 'Coast' }, { id: 'w2', name: 'Courthouse Square (sample view)', area: 'Inland' },
    { id: 'w3', name: 'Linden Ridge Overlook (sample view)', area: 'Hills' }, { id: 'w4', name: 'Tern Harbor Pier (sample view)', area: 'Coast' },
    { id: 'w5', name: 'Copper Mill Main Street (sample view)', area: 'Inland' }, { id: 'w6', name: 'Pine Hollow Trailhead (sample view)', area: 'Hills' }
  ],
  news: [
    { id: 'n1', topic: 'Weather', title: 'Cold front sample: what changes between Thursday and Friday', dek: 'A fictional walk-through of how an invented front could shift winds and temperatures.', link: 'forecast.html' },
    { id: 'n2', topic: 'Ask the Meteorologist', title: 'Ask the Meteorologist: why does fog like river valleys?', dek: 'A sample answer about cool, damp air settling into low ground.' },
    { id: 'n3', topic: 'Weather', title: 'Flooding sample: how to read a flood watch versus a warning', dek: 'Invented examples of what each label means, with no real places named.' },
    { id: 'n4', topic: 'Science', title: 'Space weather sample: a quiet week for the invented sun', dek: 'A made-up summary of solar activity, written for the research replica.' },
    { id: 'n5', topic: 'Weather', title: 'Hurricane season sample: quiet in the invented basin again', dek: 'A fictional update that pairs with the sample tracker page.', link: 'hurricanes.html' },
    { id: 'n6', topic: 'Ask the Meteorologist', title: 'Ask the Meteorologist: what is a "feels like" temperature?', dek: 'A sample explanation of wind chill and heat index, using invented numbers.' },
    { id: 'n7', topic: 'Science', title: 'Science sample: how radar sees raindrops', dek: 'A plain-language, fictional explainer on echoes and reflectivity.' },
    { id: 'n8', topic: 'Science', title: 'Science sample: why the winter sun sits low', dek: 'A short invented piece about the tilt of the Earth and short days.', link: 'almanac.html' }
  ],
  resources: [
    ['Reading a forecast table', 'Highs and lows are the warmest and coolest sample temperatures expected for a day. The precipitation chance is an invented probability that some place in the area sees measurable rain or snow. All of it is made up for this research replica.'],
    ['Watch, warning, advisory: the labels', 'In this sample scheme, a watch means conditions could develop, a warning means they are expected, an advisory means a lesser but still disruptive event, and a statement is background information. Each label also appears as text, never colour alone.'],
    ['Winter preparedness checklist (sample)', 'Keep a fictional kit: flashlight, spare batteries, blankets, water and a battery radio. This list is generic placeholder advice and not official guidance.'],
    ['Storm season checklist (sample)', 'Review an invented evacuation route, charge devices, and photograph belongings. Placeholder advice only; follow your real local officials for real events.'],
    ['Glossary of terms (sample)', 'Front: the boundary between two air masses. Dew point: a measure of moisture in the air. Reflectivity: how strongly radar echoes return from precipitation. Cone: the area a storm center might travel.']
  ]
};

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
function T(n) { return '<span class="temp" data-f="' + n + '">' + n + '&deg;F</span>'; }
function condCell(c) {
  var k = DATA.cond[c];
  return '<img class="cond-icon" src="assets/' + k[1] + '" alt="" width="28" height="28"> <span>' + k[0] + '</span>';
}
function renderDays(loc) {
  return DATA.days.map(function (x) {
    return '<tr><th scope="row">' + x.d + '</th><td class="cond">' + condCell(x.c) + '</td><td>' + T(x.hi + loc.dt) + '</td><td>' + T(x.lo + loc.dt) +
      '</td><td>' + clamp(x.p + loc.dp, 0, 100) + '%</td><td>' + x.w + '</td></tr>';
  }).join('');
}
function renderHours(loc) {
  return DATA.hours.map(function (x) {
    return '<tr><th scope="row">' + x.h + '</th><td class="cond">' + condCell(x.c) + '</td><td>' + T(x.t + loc.dt) + '</td><td>' +
      clamp(x.p + loc.dp, 0, 100) + '%</td><td>' + x.w + '</td></tr>';
  }).join('');
}
function renderWeekend(loc) {
  return DATA.days.filter(function (x) { return x.note; }).map(function (x) {
    var name = x.d === 'Sat' ? 'Saturday' : 'Sunday';
    return '<article class="wk-card"><h3>' + name + ' <span class="badge-sample">Sample</span></h3><p class="wk-cond">' + condCell(x.c) + '</p>' +
      '<dl class="kv"><div><dt>High</dt><dd>' + T(x.hi + loc.dt) + '</dd></div><div><dt>Low</dt><dd>' + T(x.lo + loc.dt) + '</dd></div>' +
      '<div><dt>Precipitation chance</dt><dd>' + clamp(x.p + loc.dp, 0, 100) + '%</dd></div><div><dt>Wind</dt><dd>' + x.w + '</dd></div></dl><p>' + x.note + '</p></article>';
  }).join('');
}
function renderCurrent(loc) {
  var c = DATA.current, k = DATA.cond[c.c];
  return '<div class="cur-main"><img src="assets/' + k[1] + '" alt="" width="64" height="64"><div><p class="cur-temp">' + T(c.t + loc.dt) + '</p><p class="cur-cond">' + k[0] + '</p></div></div>' +
    '<dl class="kv"><div><dt>Feels like</dt><dd>' + T(c.feels + loc.dt) + '</dd></div><div><dt>Humidity</dt><dd>' + c.hum + '%</dd></div>' +
    '<div><dt>Wind</dt><dd>' + c.wind + '</dd></div><div><dt>Visibility</dt><dd>' + c.vis + '</dd></div></dl>';
}
function statusClass(s) { return 'st-' + s.toLowerCase().replace(/[^a-z]+/g, '-'); }
function renderClosings(list) {
  return list.map(function (x) {
    return '<tr data-id="' + x.id + '"><th scope="row">' + x.name + ' <span class="badge-sample">Sample</span></th><td>' + x.type + '</td><td>' + x.county +
      '</td><td><span class="status ' + statusClass(x.status) + '">' + x.status + '</span></td><td>' + x.note + '</td></tr>';
  }).join('');
}
function renderAlerts(list) {
  return list.map(function (a) {
    return '<details class="alert-card lv-' + a.level.toLowerCase() + '" data-level="' + a.level + '" data-id="' + a.id + '"><summary><span class="lvl">' + a.level.toUpperCase() +
      '</span> <span class="alert-title">' + a.title + '</span> <span class="badge-sample">Sample</span></summary><div class="alert-body"><p><strong>Areas (fictional):</strong> ' +
      a.counties.join(', ') + '</p><p><strong>' + a.when + '</strong></p><p>' + a.text + '</p></div></details>';
  }).join('');
}
function renderAlmanac() {
  return DATA.almanac.map(function (m) {
    return '<tr data-month="' + m[0] + '"><th scope="row">' + m[0] + '</th><td>' + T(m[1]) + '</td><td>' + T(m[2]) + '</td><td>' + m[3].toFixed(1) +
      ' in</td><td>' + T(m[4]) + ' (' + m[5] + ')</td><td>' + T(m[6]) + ' (' + m[7] + ')</td></tr>';
  }).join('');
}
function renderSunMoon() {
  return DATA.sunmoon.map(function (r) {
    return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td></tr>';
  }).join('');
}
function renderStorms() {
  return DATA.storms.map(function (s) {
    return '<tr><th scope="row">' + s[0] + ' <span class="badge-sample">Sample</span></th><td>' + s[1] + '</td><td>' + s[2] + '</td><td>' + s[3] + '</td><td>' + s[4] + '</td></tr>';
  }).join('');
}
function renderNews(list) {
  return list.map(function (n) {
    var h = n.link ? '<a href="' + n.link + '">' + n.title + '</a>' : n.title;
    return '<li class="news-item" data-topic="' + n.topic + '"><p class="news-topic">' + n.topic + ' &middot; <span class="badge-sample">Sample story</span></p><h3>' + h + '</h3><p>' + n.dek + '</p></li>';
  }).join('');
}

/* ---- UI behaviour (vanilla JS). All data above is invented sample data. ---- */
var state = { unit: 'F', loc: DATA.locations[0] };
try { var su = localStorage.getItem('wx03-unit'); if (su === 'C' || su === 'F') state.unit = su; } catch (e) { /* storage unavailable */ }

function qs(s, r) { return (r || document).querySelector(s); }
function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function say(el, msg) { if (el) el.textContent = msg; }
function norm(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }

/* Unit toggle (intentional addition) */
function applyUnit(root) {
  qsa('.temp', root).forEach(function (el) {
    var f = +el.getAttribute('data-f');
    el.innerHTML = state.unit === 'F' ? f + '&deg;F' : Math.round((f - 32) * 5 / 9) + '&deg;C';
  });
  qsa('.unit-toggle').forEach(function (b) { b.setAttribute('aria-pressed', state.unit === 'C' ? 'true' : 'false'); });
}
qsa('.unit-toggle').forEach(function (b) {
  b.hidden = false;
  b.addEventListener('click', function () {
    state.unit = state.unit === 'F' ? 'C' : 'F';
    try { localStorage.setItem('wx03-unit', state.unit); } catch (e) { /* ignore */ }
    applyUnit();
    say(qs('#unit-status'), 'Temperatures now shown in ' + (state.unit === 'C' ? 'Celsius' : 'Fahrenheit') + '.');
  });
});

/* Mobile menu disclosure */
(function () {
  var btn = qs('.menu-toggle'), nav = qs('#section-nav');
  if (!btn || !nav) return;
  btn.hidden = false;
  nav.classList.add('is-closed');
  function set(open) { btn.setAttribute('aria-expanded', open ? 'true' : 'false'); nav.classList.toggle('is-closed', !open); }
  btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
  });
})();

/* Hub: 7 Day / Hourly / Weekend anchor panels. Without JS all three stay visible and the anchors scroll. */
var panelIds = ['7-day', 'hourly', 'weekend'];
function showPanel(id, move) {
  if (panelIds.indexOf(id) < 0) return false;
  panelIds.forEach(function (p) {
    var el = document.getElementById(p); if (el) el.hidden = (p !== id);
  });
  qsa('.view-nav a').forEach(function (a) {
    if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  if (move) { var t = document.getElementById(id); t.focus({ preventScroll: true }); t.scrollIntoView({ block: 'start' }); }
  return true;
}
(function () {
  if (!qs('#forecast-panels')) return;
  var h = location.hash.replace('#', '');
  showPanel(panelIds.indexOf(h) >= 0 ? h : '7-day', panelIds.indexOf(h) >= 0);
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null; if (!a) return;
    var m = a.getAttribute('href').match(/^(?:index\.html)?#(7-day|hourly|weekend)$/);
    if (!m) return;
    e.preventDefault();
    try { history.pushState(null, '', '#' + m[1]); } catch (x) { location.hash = m[1]; }
    showPanel(m[1], true);
    var nav = qs('.menu-toggle'); if (nav && nav.getAttribute('aria-expanded') === 'true') { nav.click(); }
  });
  window.addEventListener('popstate', function () {
    var h2 = location.hash.replace('#', ''); showPanel(panelIds.indexOf(h2) >= 0 ? h2 : '7-day', false);
  });
})();

/* Hub: location search over inline sample places (inferred feature) */
function setLocation(loc, announce) {
  state.loc = loc;
  qsa('[data-loc-name]').forEach(function (el) { el.textContent = loc.name; });
  var cur = qs('#current-body'); if (cur) cur.innerHTML = renderCurrent(loc);
  var d = qs('#days-body'); if (d) d.innerHTML = renderDays(loc);
  var h = qs('#hours-body'); if (h) h.innerHTML = renderHours(loc);
  var w = qs('#weekend-list'); if (w) w.innerHTML = renderWeekend(loc);
  applyUnit();
  if (announce) say(qs('#loc-status'), 'Showing sample forecast for ' + loc.name + ' (' + loc.id + ').');
}
(function () {
  var form = qs('#loc-form'); if (!form) return;
  var input = qs('#loc-q'), err = qs('#loc-error'), sum = qs('#loc-summary'), res = qs('#loc-results');
  function clearErr() { err.textContent = ''; err.hidden = true; input.removeAttribute('aria-invalid'); sum.hidden = true; sum.innerHTML = ''; }
  function fail(msg) {
    err.textContent = msg; err.hidden = false; input.setAttribute('aria-invalid', 'true');
    sum.innerHTML = '<h2 id="loc-summary-title">There is a problem</h2><ul><li><a href="#loc-q">' + msg + '</a></li></ul>'; sum.hidden = false; sum.focus();
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault(); clearErr(); res.innerHTML = '';
    var q = norm(input.value);
    if (!q) { fail('Enter a place name or a sample code such as CB-101.'); return; }
    var hits = DATA.locations.filter(function (l) { return norm(l.name).indexOf(q) >= 0 || norm(l.id) === q || norm(l.county).indexOf(q) >= 0; });
    if (!hits.length) { res.innerHTML = '<p class="empty">No sample places match &ldquo;' + input.value.replace(/</g, '&lt;') + '&rdquo;. Try Ashford, Marlow or CB-105. Real places are not in this sample list.</p>'; say(qs('#loc-status'), 'No sample places found.'); return; }
    if (hits.length === 1) { setLocation(hits[0], true); return; }
    res.innerHTML = '<p>' + hits.length + ' sample places match. Choose one:</p><ul class="loc-list">' + hits.map(function (l) {
      return '<li><button type="button" class="btn btn-secondary" data-loc="' + l.id + '">' + l.name + ' (' + l.id + ')</button></li>'; }).join('') + '</ul>';
    say(qs('#loc-status'), hits.length + ' sample places match.');
  });
  res.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-loc]'); if (!b) return;
    var loc = DATA.locations.filter(function (l) { return l.id === b.getAttribute('data-loc'); })[0];
    setLocation(loc, true); res.innerHTML = '';
  });
  sum.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a) { e.preventDefault(); input.focus(); } });
  qs('#loc-reset').addEventListener('click', function () { clearErr(); res.innerHTML = ''; input.value = ''; setLocation(DATA.locations[0], true); });
})();

/* Closings filter (inferred search; filter by type and status) */
(function () {
  var form = qs('#closings-form'); if (!form) return;
  var q = qs('#cl-q'), type = qs('#cl-type'), stat = qs('#cl-status'), body = qs('#closings-body'), empty = qs('#closings-empty'), count = qs('#closings-count'), tbl = qs('#closings-table-wrap');
  function run() {
    var list = DATA.closings.filter(function (x) {
      return (!q.value.trim() || norm(x.name).indexOf(norm(q.value)) >= 0 || norm(x.county).indexOf(norm(q.value)) >= 0) &&
        (type.value === 'all' || x.type === type.value) && (stat.value === 'all' || x.status === stat.value);
    });
    body.innerHTML = renderClosings(list);
    empty.hidden = list.length > 0; tbl.hidden = list.length === 0;
    say(count, list.length + ' of ' + DATA.closings.length + ' sample entries shown.');
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
  [q, type, stat].forEach(function (el) { el.addEventListener('input', run); el.addEventListener('change', run); });
  qs('#cl-reset').addEventListener('click', function () { q.value = ''; type.value = 'all'; stat.value = 'all'; run(); q.focus(); });
})();

/* Alerts filter */
(function () {
  var form = qs('#alerts-form'); if (!form) return;
  var lvl = qs('#al-level'), cty = qs('#al-county'), list = qs('#alerts-list'), empty = qs('#alerts-empty'), count = qs('#alerts-count');
  function run() {
    var items = DATA.alerts.filter(function (a) {
      return (lvl.value === 'all' || a.level === lvl.value) && (cty.value === 'all' || a.counties.indexOf(cty.value) >= 0);
    });
    list.innerHTML = renderAlerts(items); empty.hidden = items.length > 0;
    say(count, items.length + ' of ' + DATA.alerts.length + ' sample alerts shown.');
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
  [lvl, cty].forEach(function (el) { el.addEventListener('change', run); });
})();

/* Almanac month filter */
(function () {
  var sel = qs('#alm-month'); if (!sel) return;
  var rows = qsa('#almanac-body tr'), count = qs('#alm-count');
  sel.addEventListener('change', function () {
    var n = 0;
    rows.forEach(function (r) { var show = sel.value === 'all' || r.getAttribute('data-month') === sel.value; r.hidden = !show; if (show) n++; });
    say(count, n + (n === 1 ? ' month' : ' months') + ' of sample climate data shown.');
  });
})();

/* Hurricanes: demo scenario switch */
(function () {
  var sel = qs('#storm-scenario'); if (!sel) return;
  sel.addEventListener('change', function () {
    var quiet = sel.value === 'quiet';
    qs('#storm-active').hidden = quiet; qs('#storm-quiet').hidden = !quiet;
    say(qs('#storm-status'), quiet ? 'Showing the quiet-basin sample scenario: no active systems.' : 'Showing the active sample scenario: three invented systems.');
  });
})();

/* Map center: layer radios, zoom buttons, legend disclosure (all demo) */
(function () {
  var wrap = qs('#map-stage'); if (!wrap) return;
  var img = qs('#map-img'), cap = qs('#map-caption'), scale = 1;
  var layers = { radar: ['assets/map-radar.svg', 'Sample radar layer: an invented map with made-up rain areas. Not real radar.'],
    satellite: ['assets/map-satellite.svg', 'Sample satellite layer: an invented cloud pattern. Not a real satellite image.'],
    temps: ['assets/map-temps.svg', 'Sample temperature layer: invented temperature bands. Not real observations.'] };
  qsa('input[name="layer"]').forEach(function (r) {
    r.addEventListener('change', function () { var l = layers[r.value]; img.src = l[0]; img.alt = l[1]; say(cap, l[1]); });
  });
  function zoom(d) {
    scale = d === 0 ? 1 : Math.max(1, Math.min(2.5, scale + d));
    img.style.transform = 'scale(' + scale + ')';
    qs('#zoom-in').setAttribute('aria-disabled', scale >= 2.5 ? 'true' : 'false');
    qs('#zoom-out').setAttribute('aria-disabled', scale <= 1 ? 'true' : 'false');
    say(qs('#map-status'), 'Demo zoom ' + Math.round(scale * 100) + ' percent.');
  }
  qs('#zoom-in').addEventListener('click', function () { if (qs('#zoom-in').getAttribute('aria-disabled') !== 'true') zoom(0.5); });
  qs('#zoom-out').addEventListener('click', function () { if (qs('#zoom-out').getAttribute('aria-disabled') !== 'true') zoom(-0.5); });
  qs('#zoom-reset').addEventListener('click', function () { zoom(0); });
  var lb = qs('#legend-toggle'), lg = qs('#legend');
  lb.hidden = false;
  lb.addEventListener('click', function () { var o = lb.getAttribute('aria-expanded') === 'true'; lb.setAttribute('aria-expanded', o ? 'false' : 'true'); lg.hidden = o; });
  lg.hidden = false; lb.setAttribute('aria-expanded', 'true');
  lg.addEventListener('keydown', function (e) { if (e.key === 'Escape') { lb.click(); lb.focus(); } });
})();

/* Webcams: filter and placeholder preview dialog */
(function () {
  var grid = qs('#cam-grid'); if (!grid) return;
  var sel = qs('#cam-area'), cards = qsa('.cam-card'), count = qs('#cam-count'), dlg = qs('#cam-dialog'), last = null;
  sel.addEventListener('change', function () {
    var n = 0; cards.forEach(function (c) { var s = sel.value === 'all' || c.getAttribute('data-area') === sel.value; c.hidden = !s; if (s) n++; });
    say(count, n + ' of ' + cards.length + ' placeholder cameras shown.');
  });
  qsa('.cam-open').forEach(function (b) {
    b.hidden = false;
    b.addEventListener('click', function () {
      last = b; qs('#cam-dialog-title').textContent = b.getAttribute('data-name'); dlg.showModal(); qs('#cam-close').focus();
    });
  });
  qs('#cam-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('close', function () { if (last) last.focus(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();

/* Radar video placeholder: manual frame stepping, optional demo loop */
(function () {
  var fig = qs('#radar-player'); if (!fig) return;
  var img = qs('#radar-frame'), label = qs('#radar-frame-label'), i = 0, timer = null, N = 4;
  var play = qs('#radar-play'), reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(n) { i = (n + N) % N; img.src = 'assets/radar-frame-' + (i + 1) + '.svg'; label.textContent = 'Sample frame ' + (i + 1) + ' of ' + N + ' (invented, not live)'; }
  function stop() { if (timer) { clearInterval(timer); timer = null; } play.setAttribute('aria-pressed', 'false'); play.textContent = 'Play demo loop'; }
  qs('#radar-next').addEventListener('click', function () { show(i + 1); });
  qs('#radar-prev').addEventListener('click', function () { show(i - 1); });
  if (reduce) { play.hidden = true; qs('#radar-reduce-note').hidden = false; }
  play.addEventListener('click', function () {
    if (timer) { stop(); return; }
    play.setAttribute('aria-pressed', 'true'); play.textContent = 'Pause demo loop';
    timer = setInterval(function () { show(i + 1); }, 1200);
  });
})();

/* News topic filter + Ask the Meteorologist demo form */
(function () {
  var list = qs('#news-list'); if (!list) return;
  var btns = qsa('.topic-btn'), count = qs('#news-count');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-topic');
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var items = DATA.news.filter(function (n) { return t === 'all' || n.topic === t; });
      list.innerHTML = renderNews(items);
      say(count, items.length + ' of ' + DATA.news.length + ' sample stories shown.');
    });
  });
  var form = qs('#ask-form'), sum = qs('#ask-summary'), ok = qs('#ask-success');
  form.addEventListener('submit', function (e) {
    e.preventDefault(); ok.hidden = true;
    var f = [
      { el: qs('#ask-email'), re: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, empty: 'Enter your email address.', bad: 'Enter an email in the form name@example.com.' },
      { el: qs('#ask-q'), min: 10, empty: 'Enter your question.', bad: 'Write at least 10 characters so the question makes sense.' }
    ], errs = [];
    f.forEach(function (x) {
      var v = x.el.value.trim(), msg = '';
      if (!v) msg = x.empty; else if ((x.re && !x.re.test(v)) || (x.min && v.length < x.min)) msg = x.bad;
      var span = qs('#' + x.el.id + '-error');
      if (msg) { errs.push({ id: x.el.id, msg: msg }); span.textContent = msg; span.hidden = false; x.el.setAttribute('aria-invalid', 'true'); }
      else { span.textContent = ''; span.hidden = true; x.el.removeAttribute('aria-invalid'); }
    });
    if (errs.length) {
      sum.innerHTML = '<h3>There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + '</h3><ul>' +
        errs.map(function (x) { return '<li><a href="#' + x.id + '">' + x.msg + '</a></li>'; }).join('') + '</ul>';
      sum.hidden = false; sum.focus(); return;
    }
    sum.hidden = true; form.reset(); ok.hidden = false; ok.focus();
  });
  sum.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return; e.preventDefault(); qs(a.getAttribute('href')).focus();
  });
})();

applyUnit();

})();
