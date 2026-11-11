/* Harbor 9 Weather (fictional) - WX-03 replica. Vanilla JS, no network. All weather data below is invented sample data. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable: keep in-memory state only */ } }
  };

  /* ---------- sample data (fictional) ---------- */
  const LOCATIONS = [
    { id: 'marlow-bay', name: 'Marlow Bay', county: 'Harbor', zip: '98001', hi: 58, lo: 46, wet: 1.0, dir: 'SW' },
    { id: 'alder-falls', name: 'Alder Falls', county: 'Ridge', zip: '98002', hi: 52, lo: 38, wet: 1.2, dir: 'W' },
    { id: 'cedar-point', name: 'Cedar Point', county: 'Harbor', zip: '98003', hi: 57, lo: 47, wet: 0.9, dir: 'S' },
    { id: 'stonewater', name: 'Stonewater', county: 'Valley', zip: '98004', hi: 55, lo: 41, wet: 0.8, dir: 'NW' },
    { id: 'pinecrest', name: 'Pinecrest', county: 'Ridge', zip: '98005', hi: 46, lo: 31, wet: 1.3, dir: 'N' },
    { id: 'kestrel-heights', name: 'Kestrel Heights', county: 'Valley', zip: '98006', hi: 54, lo: 40, wet: 0.7, dir: 'NE' },
    { id: 'ferngrove', name: 'Ferngrove', county: 'Islands', zip: '98007', hi: 56, lo: 48, wet: 1.1, dir: 'SW' },
    { id: 'saltmere', name: 'Saltmere', county: 'Islands', zip: '98008', hi: 55, lo: 49, wet: 1.0, dir: 'S' }
  ];
  const DAY_PATTERN = [
    { c: 'Showers', h: 0, l: 0, p: 60, w: 12 }, { c: 'Rain', h: -2, l: -1, p: 80, w: 18 },
    { c: 'Rain', h: -3, l: -2, p: 70, w: 16 }, { c: 'Cloudy', h: -1, l: -1, p: 30, w: 8 },
    { c: 'Partly cloudy', h: 1, l: -1, p: 10, w: 6 }, { c: 'Sunny', h: 3, l: -2, p: 5, w: 5 },
    { c: 'Sunny', h: 4, l: -1, p: 0, w: 5 }, { c: 'Partly cloudy', h: 2, l: 0, p: 20, w: 8 },
    { c: 'Showers', h: 0, l: 1, p: 50, w: 10 }, { c: 'Rain', h: -2, l: 1, p: 70, w: 14 }
  ];
  const HOUR_POP = [10, 10, 20, 30, 50, 60, 60, 50, 40, 30, 20, 20, 10, 10, 10, 20, 30, 40, 50, 60, 70, 60, 50, 40];
  const BASE_DATE = Date.UTC(2026, 10, 11); // sample "day 1": Wed 11 Nov 2026
  const START_HOUR = 9;
  const ALERTS = [
    { id: 'a1', title: 'Flood Warning for Alder Creek', sev: 'Warning', county: 'Ridge', until: 'Thu 12 Nov, 6:00 PM', summary: 'Alder Creek is forecast to rise above its banks near low-lying roads.', todo: 'Avoid creek-side roads. Never drive through flooded streets.' },
    { id: 'a2', title: 'High Wind Watch for the Islands', sev: 'Watch', county: 'Islands', until: 'Fri 13 Nov, 4:00 AM', summary: 'South winds of 30 to 40 mph with higher gusts are possible overnight.', todo: 'Secure loose outdoor items. Check ferry notices before travel.' },
    { id: 'a3', title: 'Dense Fog Advisory for the Valley', sev: 'Advisory', county: 'Valley', until: 'Wed 11 Nov, 10:00 AM', summary: 'Visibility of a quarter mile or less in patchy dense fog.', todo: 'Slow down, use low-beam headlights and leave extra distance.' },
    { id: 'a4', title: 'Small Craft Advisory for Harbor waters', sev: 'Advisory', county: 'Harbor', until: 'Thu 12 Nov, 2:00 AM', summary: 'Choppy seas and gusty winds may be hazardous to small boats.', todo: 'Inexperienced mariners should stay in port.' },
    { id: 'a5', title: 'Special Weather Statement: heavy rain totals', sev: 'Statement', county: 'Harbor', until: 'Thu 12 Nov, 12:00 PM', summary: 'Steady rain could total one to two inches near the shoreline.', todo: 'Clear storm drains near your home if it is safe to do so.' },
    { id: 'a6', title: 'Winter Weather Watch for mountain passes', sev: 'Watch', county: 'Ridge', until: 'Sat 14 Nov, 9:00 AM', summary: 'Snow levels may fall to pass level late in the week.', todo: 'Carry chains and check pass conditions before leaving.' }
  ];
  const TRAFFIC = [
    { route: 'Route 9', sev: 'Major', text: 'Two lanes blocked northbound by a stalled truck near Exit 14.' },
    { route: 'Harbor Bridge', sev: 'Minor', text: 'Right lane closed for sample inspection work until midday.' },
    { route: 'Ferry Road', sev: 'Minor', text: 'Standing water on the shoulder near the marina entrance.' },
    { route: 'Bay Loop', sev: 'Minor', text: 'Slow traffic from a disabled vehicle on the eastbound shoulder.' },
    { route: 'Route 9', sev: 'Minor', text: 'Debris on the southbound ramp at Exit 11.' }
  ];
  const DRIVE_TIMES = [
    { route: 'Marlow Bay to Cedar Point', typical: 22, now: 31 },
    { route: 'Alder Falls to Marlow Bay', typical: 38, now: 44 },
    { route: 'Stonewater to Kestrel Heights', typical: 17, now: 17 },
    { route: 'Ferngrove ferry terminal to Saltmere', typical: 25, now: 29 },
    { route: 'Pinecrest to Alder Falls', typical: 28, now: 41 }
  ];
  const WEBCAMS = [
    { id: 1, name: 'Harbor Bridge, looking north', area: 'Harbor' }, { id: 2, name: 'Marlow Bay waterfront', area: 'Harbor' },
    { id: 3, name: 'Alder Pass summit', area: 'Ridge' }, { id: 4, name: 'Stonewater farm market', area: 'Valley' },
    { id: 5, name: 'Ferngrove ferry dock', area: 'Islands' }, { id: 6, name: 'Kestrel Heights ridge line', area: 'Valley' }
  ];
  const CLOSINGS = [
    { org: 'Harbor County School District', type: 'School district', status: 'Delayed 2 hours', note: 'Buses run on the snow-free routes only (sample).' },
    { org: 'Ridge Valley School District', type: 'School district', status: 'Closed', note: 'All schools and offices closed (sample).' },
    { org: 'Marlow Community College', type: 'College', status: 'Remote classes', note: 'Campus open, classes online until noon (sample).' },
    { org: 'Islands Ferry Authority', type: 'Transit', status: 'Open, modified schedule', note: 'Two sailings cancelled (sample).' },
    { org: 'Alder Falls Library', type: 'Library', status: 'Closed', note: 'Reopens Friday (sample).' },
    { org: 'Cedar Point City Offices', type: 'Government', status: 'Open', note: 'Normal hours (sample).' },
    { org: 'Stonewater Farm Market', type: 'Business', status: 'Delayed 2 hours', note: 'Opens at noon (sample).' },
    { org: 'Pinecrest Ski School', type: 'Business', status: 'Closed', note: 'Closed for the day (sample).' },
    { org: 'Valley Christian Preschool', type: 'School district', status: 'Open', note: 'Normal schedule (sample).' },
    { org: 'Kestrel Heights Senior Center', type: 'Community', status: 'Delayed 2 hours', note: 'Morning programs moved to 11 a.m. (sample).' },
    { org: 'Saltmere Recycling Center', type: 'Government', status: 'Closed', note: 'Pickup resumes tomorrow (sample).' },
    { org: 'Ferngrove Community Pool', type: 'Community', status: 'Open', note: 'Normal hours (sample).' }
  ];
  const TEAM = [
    { name: 'Priya Lindqvist', role: 'Chief Meteorologist', group: 'Weather team', bio: 'Leads the weather team and writes the sample morning outlook.' },
    { name: 'Marcus Ellery', role: 'Meteorologist', group: 'Weather team', bio: 'Covers evening forecasts and loves explaining marine layers.' },
    { name: 'Tomás Whitcombe', role: 'Weekend Meteorologist', group: 'Weather team', bio: 'Brings the weekend forecast and the occasional storm-chasing story.' },
    { name: 'Jun Abernathy-Cole', role: 'Morning Anchor', group: 'News anchors', bio: 'Anchors the early show from the Marlow Bay studio.' },
    { name: 'Helena Voss', role: 'Evening Anchor', group: 'News anchors', bio: 'Anchors the six o’clock newscast and community specials.' },
    { name: 'Bao Thackeray', role: 'Traffic Reporter', group: 'Reporters', bio: 'Tracks the Route 9 commute and ferry delays.' },
    { name: 'Odette Marlowe', role: 'Environment Reporter', group: 'Reporters', bio: 'Reports on rivers, tides and the ridge snowpack.' },
    { name: 'Ravi Kessler', role: 'Investigative Reporter', group: 'Reporters', bio: 'Digs into local stories that need a closer look.' },
    { name: 'Sunniva Park', role: 'Community Reporter', group: 'Reporters', bio: 'Covers neighborhoods across the Islands and Valley.' }
  ];
  const TV_SCHEDULE = {
    wed: [['6:00 AM', 'Harbor 9 Morning'], ['9:00 AM', 'Cooking With Maren'], ['11:00 AM', 'Midday Weather Update'], ['12:00 PM', 'Harbor 9 at Noon'], ['4:00 PM', 'Harbor 9 News Now'], ['6:00 PM', 'Harbor 9 Evening News'], ['7:00 PM', 'Garden Hour'], ['8:00 PM', 'Mystery Theater (sample)']],
    thu: [['6:00 AM', 'Harbor 9 Morning'], ['9:00 AM', 'Home Fix-It Club'], ['11:00 AM', 'Midday Weather Update'], ['12:00 PM', 'Harbor 9 at Noon'], ['4:00 PM', 'Harbor 9 News Now'], ['6:00 PM', 'Harbor 9 Evening News'], ['7:00 PM', 'Ridge Stories'], ['8:00 PM', 'Mystery Theater (sample)']],
    fri: [['6:00 AM', 'Harbor 9 Morning'], ['9:00 AM', 'Cooking With Maren'], ['11:00 AM', 'Midday Weather Update'], ['12:00 PM', 'Harbor 9 at Noon'], ['4:00 PM', 'Harbor 9 News Now'], ['6:00 PM', 'Harbor 9 Evening News'], ['7:00 PM', 'Weekend Planner'], ['8:00 PM', 'Movie Night (sample)']]
  };

  /* ---------- state ---------- */
  let unit = store.get('h9.unit', 'F') === 'C' ? 'C' : 'F';
  const currentLoc = () => LOCATIONS.find((l) => l.id === store.get('h9.loc', 'marlow-bay')) || LOCATIONS[0];
  const fmtTemp = (f) => (unit === 'C' ? Math.round((f - 32) * 5 / 9) : f) + '°' + unit;
  const temp = (f) => '<span class="temp" data-f="' + f + '">' + fmtTemp(f) + '</span>';

  /* ---------- forecast model ---------- */
  const hourLabel = (h) => (h % 12 || 12) + ':00 ' + (h < 12 ? 'AM' : 'PM');
  function condFor(pop, h) {
    const night = h >= 18 || h < 6;
    if (pop >= 60) return 'Rain';
    if (pop >= 40) return 'Showers';
    if (pop >= 20) return 'Cloudy';
    return night ? 'Clear' : (pop < 10 ? 'Sunny' : 'Partly cloudy');
  }
  function hourly(loc) {
    const mid = (loc.hi + loc.lo) / 2, amp = (loc.hi - loc.lo) / 2;
    return HOUR_POP.map((base, i) => {
      const h = (START_HOUR + i) % 24;
      const pop = Math.min(95, Math.round(base * loc.wet / 5) * 5);
      return { label: hourLabel(h), temp: Math.round(mid + amp * Math.sin(((h - 9) / 24) * 2 * Math.PI)), pop, cond: condFor(pop, h), wind: Math.round(5 + loc.wet * 4 + (i % 5)), dir: loc.dir };
    });
  }
  function days(loc) {
    return DAY_PATTERN.map((d, i) => {
      const date = new Date(BASE_DATE + i * 864e5);
      const hi = loc.hi + d.h, lo = loc.lo + d.l, pop = Math.min(95, Math.round(d.p * loc.wet / 5) * 5);
      return {
        i, hi, lo, pop, cond: d.c, wind: d.w,
        name: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
        text: d.c + ' with a high near ' + hi + '°F. Chance of precipitation ' + pop + '%. Winds ' + loc.dir + ' around ' + d.w + ' mph.'
      };
    });
  }
  function icon(cond) {
    const cloud = '<path d="M7 19a4 4 0 0 1 .5-8A6 6 0 0 1 19 12.5a3.3 3.3 0 0 1-.5 6.5z"/>';
    const body = {
      'Sunny': '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
      'Clear': '<path d="M20 14a8 8 0 1 1-10-10 6 6 0 0 0 10 10z"/>',
      'Partly cloudy': '<circle cx="8" cy="8" r="3"/><path d="M8 2v1M2 8h1M3.5 3.5l.7.7M12.5 3.5l-.7.7"/><path transform="translate(2 1) scale(.8)" d="M7 19a4 4 0 0 1 .5-8A6 6 0 0 1 19 12.5a3.3 3.3 0 0 1-.5 6.5z"/>',
      'Cloudy': cloud,
      'Showers': '<path transform="translate(0 -3)" d="M7 19a4 4 0 0 1 .5-8A6 6 0 0 1 19 12.5a3.3 3.3 0 0 1-.5 6.5z"/><path d="M9 19l-1 2M14 19l-1 2"/>',
      'Rain': '<path transform="translate(0 -3)" d="M7 19a4 4 0 0 1 .5-8A6 6 0 0 1 19 12.5a3.3 3.3 0 0 1-.5 6.5z"/><path d="M8 19l-1 3M12 19l-1 3M16 19l-1 3"/>'
    }[cond] || cloud;
    return '<svg class="wx-icon" viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
  }

  /* ---------- shared UI: navigation, disclosures ---------- */
  function initNav() {
    const toggle = $('.menu-toggle'), nav = $('#primary-nav');
    const setMenu = (btn, open) => {
      btn.setAttribute('aria-expanded', String(open));
      document.getElementById(btn.getAttribute('aria-controls')).classList.toggle('is-open', open);
    };
    const closeMenus = () => $$('.submenu-toggle').forEach((b) => setMenu(b, false));
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    $$('.submenu-toggle').forEach((btn) => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      closeMenus();
      setMenu(btn, !open);
    }));
    nav.addEventListener('focusout', (e) => { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeMenus(); });
    document.addEventListener('click', (e) => { if (!e.target.closest('.has-sub')) closeMenus(); });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const open = $('.submenu-toggle[aria-expanded="true"]');
      if (open) { open.focus(); closeMenus(); return; }
      if (toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') { toggle.click(); toggle.focus(); }
    });
  }
  function initDisclosures() {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-disclosure]');
      if (!b) return;
      const open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
  }
  const say = (msg) => { const s = $('#live-status'); if (s) { s.textContent = ''; setTimeout(() => { s.textContent = msg; }, 30); } };

  /* ---------- location search + unit toggle (intentional addition) ---------- */
  function initTools(onChange) {
    const form = $('#loc-form');
    if (!form) return;
    const input = $('#loc-input'), error = $('#loc-error'), results = $('#loc-results'), label = $('#loc-current');
    const setLoc = (loc) => {
      store.set('h9.loc', loc.id);
      label.textContent = loc.name + ', ' + loc.county + ' County (ZIP ' + loc.zip + ')';
      results.innerHTML = '';
      error.hidden = true; input.removeAttribute('aria-invalid'); input.value = '';
      onChange(loc);
      say('Showing sample data for ' + loc.name + '.');
    };
    label.textContent = currentLoc().name + ', ' + currentLoc().county + ' County (ZIP ' + currentLoc().zip + ')';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim().toLowerCase();
      results.innerHTML = '';
      if (!q) {
        error.textContent = 'Enter a place name, county or ZIP code to search the sample locations.';
        error.hidden = false; input.setAttribute('aria-invalid', 'true'); input.focus();
        return;
      }
      error.hidden = true; input.removeAttribute('aria-invalid');
      const hits = LOCATIONS.filter((l) => [l.name, l.county + ' county', l.zip].some((v) => v.toLowerCase().includes(q)));
      if (hits.length === 1) { setLoc(hits[0]); label.focus(); return; }
      if (!hits.length) { results.innerHTML = '<p class="empty">No sample location matches “' + esc(input.value.trim()) + '”. Try Marlow Bay, Ridge County or ZIP 98004.</p>'; return; }
      results.innerHTML = '<p>' + hits.length + ' sample locations match. Choose one:</p><ul class="chip-list">' + hits.map((l) => '<li><button type="button" class="btn btn-secondary" data-loc="' + l.id + '">' + esc(l.name) + ', ' + esc(l.county) + ' County</button></li>').join('') + '</ul>';
    });
    results.addEventListener('click', (e) => {
      const b = e.target.closest('[data-loc]');
      if (b) { setLoc(LOCATIONS.find((l) => l.id === b.dataset.loc)); label.focus(); }
    });
    $$('[data-unit]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.unit === unit));
      b.addEventListener('click', () => {
        unit = b.dataset.unit; store.set('h9.unit', unit);
        $$('[data-unit]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.unit === unit)));
        $$('.temp').forEach((t) => { t.textContent = fmtTemp(Number(t.dataset.f)); });
        say('Temperatures now shown in degrees ' + (unit === 'C' ? 'Celsius' : 'Fahrenheit') + '.');
      });
    });
  }

  /* ---------- page renderers ---------- */
  function renderCurrent(loc) {
    const now = hourly(loc)[0];
    const rows = [['Feels like', temp(now.temp - 2)], ['Humidity', Math.min(98, Math.round(62 + loc.wet * 18)) + '%'], ['Wind', loc.dir + ' ' + now.wind + ' mph'], ['Pressure', (29.8 + (1 - loc.wet) * 0.2).toFixed(2) + ' in'], ['Visibility', Math.round(10 - loc.wet * 3) + ' mi'], ['Sunrise / sunset', '7:08 AM / 4:41 PM']];
    $('#current-conditions').innerHTML = '<div class="now-main">' + icon(now.cond) + '<p class="now-temp">' + temp(now.temp) + '</p><p class="now-cond">' + now.cond + ' in ' + esc(loc.name) + '</p></div><dl class="facts">' + rows.map((r) => '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>').join('') + '</dl>';
  }
  function renderDays(loc, target, withDetails) {
    $(target).innerHTML = days(loc).map((d) => '<li class="day-card"><div class="day-row"><span class="day-name">' + d.name + '<span class="day-date"> ' + d.date + '</span></span>' + icon(d.cond) + '<span class="day-temps"><span class="visually-hidden">High </span>' + temp(d.hi) + ' <span class="lo"><span class="visually-hidden">Low </span>' + temp(d.lo) + '</span></span><span class="day-cond">' + d.cond + '</span><span class="day-pop">' + d.pop + '% precip</span>' +
      (withDetails ? '<button type="button" class="btn btn-link" data-disclosure aria-expanded="false" aria-controls="day-detail-' + d.i + '">Details<span class="visually-hidden"> for ' + d.name + ' ' + d.date + '</span></button>' : '') + '</span></div>' +
      (withDetails ? '<p class="day-detail" id="day-detail-' + d.i + '" hidden>' + esc(d.text) + '</p>' : '') + '</li>').join('');
  }
  function renderHourStrip(loc) {
    $('#hourly-strip').innerHTML = hourly(loc).slice(0, 8).map((h) => '<li class="hour-card"><span class="hour-label">' + h.label + '</span>' + icon(h.cond) + '<span>' + temp(h.temp) + '</span><span class="muted">' + h.pop + '% precip</span></li>').join('');
  }
  function renderRegion() {
    $('#region-table').innerHTML = LOCATIONS.map((l) => {
      const d = days(l)[0];
      return '<tr><th scope="row">' + esc(l.name) + '</th><td>' + esc(l.county) + '</td><td>' + d.cond + '</td><td>' + temp(d.hi) + ' / ' + temp(d.lo) + '</td></tr>';
    }).join('');
  }

  function initHome() {
    const draw = (loc) => {
      renderCurrent(loc); renderDays(loc, '#tenday-strip', false); renderHourStrip(loc);
      $('#script-text').textContent = 'Good morning from the Harbor 9 sample weather desk. In ' + loc.name + ' expect ' + days(loc)[0].cond.toLowerCase() + ' today with a high near ' + loc.hi + ' degrees Fahrenheit. This is invented text for a demo site, not a real forecast.';
    };
    renderRegion();
    initTools(draw); draw(currentLoc());
    const items = $$('#news-list > li'), status = $('#carousel-status'), prev = $('[data-carousel-prev]'), next = $('[data-carousel-next]');
    const mq = window.matchMedia('(max-width: 700px)');
    let page = 0;
    const show = () => {
      const size = mq.matches ? 1 : 3, pages = Math.ceil(items.length / size);
      page = Math.min(page, pages - 1);
      items.forEach((li, i) => { li.hidden = Math.floor(i / size) !== page; });
      prev.disabled = page === 0; next.disabled = page === pages - 1;
      status.textContent = 'Showing stories ' + (page * size + 1) + ' to ' + Math.min(items.length, (page + 1) * size) + ' of ' + items.length + '.';
    };
    prev.addEventListener('click', () => { page--; show(); });
    next.addEventListener('click', () => { page++; show(); });
    mq.addEventListener('change', show);
    show();
  }

  function initTenDay() {
    const draw = (loc) => { $('#tenday-title-loc').textContent = loc.name; renderDays(loc, '#tenday-list', true); };
    initTools(draw); draw(currentLoc());
  }

  function initHourly() {
    const count = $('#hours-count'), wet = $('#wet-only');
    const draw = () => {
      const loc = currentLoc();
      let rows = hourly(loc).slice(0, Number(count.value));
      if (wet.checked) rows = rows.filter((h) => h.pop >= 40);
      $('#hourly-title-loc').textContent = loc.name;
      $('#hourly-empty').hidden = rows.length > 0;
      $('#hourly-table').hidden = rows.length === 0;
      $('#hourly-body').innerHTML = rows.map((h) => '<tr><th scope="row">' + h.label + '</th><td>' + temp(h.temp) + '</td><td><span class="cond">' + icon(h.cond) + h.cond + '</span></td><td>' + h.pop + '%</td><td>' + h.dir + ' ' + h.wind + ' mph</td></tr>').join('');
      $('#hourly-count').textContent = rows.length + (rows.length === 1 ? ' hour' : ' hours') + ' shown.';
    };
    count.addEventListener('change', draw); wet.addEventListener('change', draw);
    initTools(draw); draw();
  }

  function initAlerts() {
    const sev = $('#alert-sev'), county = $('#alert-county');
    const draw = () => {
      const rows = ALERTS.filter((a) => (!sev.value || a.sev === sev.value) && (!county.value || a.county === county.value));
      $('#alert-list').innerHTML = rows.map((a) => '<li class="alert-item sev-' + a.sev.toLowerCase() + '"><h3><span class="sev-tag">' + a.sev + '</span> ' + esc(a.title) + '</h3><p class="muted">' + a.county + ' County · Until ' + a.until + ' (sample)</p><button type="button" class="btn btn-link" data-disclosure aria-expanded="false" aria-controls="' + a.id + '-detail">Details<span class="visually-hidden"> for ' + esc(a.title) + '</span></button><div id="' + a.id + '-detail" hidden><p>' + esc(a.summary) + '</p><p><strong>What to do:</strong> ' + esc(a.todo) + '</p></div></li>').join('');
      $('#alert-empty').hidden = rows.length > 0;
      $('#alert-count').textContent = rows.length + (rows.length === 1 ? ' sample alert' : ' sample alerts') + ' shown.';
    };
    sev.addEventListener('change', draw); county.addEventListener('change', draw);
    $('#alert-reset').addEventListener('click', () => { sev.value = ''; county.value = ''; draw(); sev.focus(); });
    draw();
  }

  function initRadar() {
    const echo = $('#radar-echo'), zoomBox = $('#radar-zoom'), range = $('#radar-frame'), label = $('#radar-frame-label'), play = $('#radar-play');
    const TIMES = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
    let zoom = 1, timer = null;
    const frame = (n) => {
      range.value = n;
      echo.style.transform = 'translate(' + (n * 3) + '%,' + (n * -1.5) + '%)';
      range.setAttribute('aria-valuetext', TIMES[n] + ' sample frame');
      label.textContent = 'Sample frame ' + (n + 1) + ' of 6, ' + TIMES[n] + ' (fictional)';
    };
    const stop = () => { clearInterval(timer); timer = null; play.textContent = 'Play'; play.setAttribute('aria-pressed', 'false'); };
    const step = (d) => { stop(); frame((Number(range.value) + d + 6) % 6); };
    play.addEventListener('click', () => {
      if (timer) { stop(); return; }
      play.textContent = 'Pause'; play.setAttribute('aria-pressed', 'true');
      if (Number(range.value) === 5) frame(0);
      timer = setInterval(() => { if (Number(range.value) >= 5) { stop(); return; } frame(Number(range.value) + 1); }, 1000);
    });
    $('#radar-prev').addEventListener('click', () => step(-1));
    $('#radar-next').addEventListener('click', () => step(1));
    range.addEventListener('input', () => { stop(); frame(Number(range.value)); });
    const setZoom = (z) => { zoom = Math.max(1, Math.min(3, z)); zoomBox.style.transform = 'scale(' + zoom + ')'; $('#radar-zoom-label').textContent = 'Zoom ' + zoom.toFixed(1) + 'x'; };
    $('#radar-zoom-in').addEventListener('click', () => setZoom(zoom + 0.5));
    $('#radar-zoom-out').addEventListener('click', () => setZoom(zoom - 0.5));
    $('#radar-zoom-reset').addEventListener('click', () => setZoom(1));
    $$('input[name="radar-layer"]').forEach((r) => r.addEventListener('change', () => {
      echo.className = 'radar-echo layer-' + r.value;
      say('Layer: ' + r.dataset.name + '. This is a demo; the same placeholder graphic is recolored.');
    }));
    initTools((loc) => { $('#radar-loc').textContent = loc.name; });
    $('#radar-loc').textContent = currentLoc().name;
    frame(0); setZoom(1);
  }

  function initMaps() {
    const tabs = $$('[role="tab"]');
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t, false));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k === undefined) return;
        e.preventDefault(); select(tabs[(k + tabs.length) % tabs.length], true);
      });
    });
    const hash = location.hash.slice(1), fromHash = tabs.find((t) => t.id === 'tab-' + hash);
    select(fromHash || tabs[0], false);
  }

  function initTraffic() {
    const route = $('#traffic-route'), sevSel = $('#traffic-sev');
    const draw = () => {
      const rows = TRAFFIC.filter((t) => (!route.value || t.route === route.value) && (!sevSel.value || t.sev === sevSel.value));
      $('#traffic-list').innerHTML = rows.map((t) => '<li class="alert-item sev-' + (t.sev === 'Major' ? 'warning' : 'advisory') + '"><h3><span class="sev-tag">' + t.sev + '</span> ' + t.route + '</h3><p>' + esc(t.text) + '</p></li>').join('');
      $('#traffic-empty').hidden = rows.length > 0;
      $('#traffic-count').textContent = rows.length + (rows.length === 1 ? ' sample incident' : ' sample incidents') + ' shown.';
    };
    route.addEventListener('change', draw); sevSel.addEventListener('change', draw);
    draw();
    const body = $('#drive-body');
    let sortKey = 'route', dir = 1;
    const drawTimes = () => {
      const rows = DRIVE_TIMES.slice().sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : a[sortKey] < b[sortKey] ? -1 : 0) * dir);
      body.innerHTML = rows.map((r) => '<tr><th scope="row">' + esc(r.route) + '</th><td>' + r.typical + ' min</td><td>' + r.now + ' min</td><td>' + (r.now - r.typical > 0 ? '+' + (r.now - r.typical) + ' min' : 'On time') + '</td></tr>').join('');
      $$('[data-sort]').forEach((b) => b.closest('th').setAttribute('aria-sort', b.dataset.sort === sortKey ? (dir === 1 ? 'ascending' : 'descending') : 'none'));
    };
    $$('[data-sort]').forEach((b) => b.addEventListener('click', () => {
      dir = sortKey === b.dataset.sort ? -dir : 1; sortKey = b.dataset.sort; drawTimes();
      say('Sorted by ' + b.textContent.trim() + ', ' + (dir === 1 ? 'ascending' : 'descending') + '.');
    }));
    drawTimes();
  }

  function initWebcams() {
    const area = $('#cam-area'), dlg = $('#cam-dialog');
    let opener = null;
    const draw = () => {
      const rows = WEBCAMS.filter((c) => !area.value || c.area === area.value);
      $('#cam-grid').innerHTML = rows.map((c) => '<li class="cam-card"><img src="assets/cam-' + c.id + '.svg" alt="Sample placeholder image for the ' + esc(c.name) + ' camera" width="320" height="180"><h3>' + esc(c.name) + '</h3><p class="muted">' + c.area + ' County · sample image, not live</p><button type="button" class="btn btn-secondary" data-cam="' + c.id + '">View larger<span class="visually-hidden">: ' + esc(c.name) + '</span></button></li>').join('');
      $('#cam-count').textContent = rows.length + (rows.length === 1 ? ' sample camera' : ' sample cameras') + ' shown.';
    };
    area.addEventListener('change', draw); draw();
    $('#cam-grid').addEventListener('click', (e) => {
      const b = e.target.closest('[data-cam]');
      if (!b) return;
      const c = WEBCAMS.find((w) => w.id === Number(b.dataset.cam));
      opener = b;
      $('#cam-dialog-title').textContent = c.name;
      $('#cam-dialog-img').src = 'assets/cam-' + c.id + '.svg';
      $('#cam-dialog-img').alt = 'Larger sample placeholder image for the ' + c.name + ' camera';
      dlg.showModal();
    });
    $('#cam-close').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => { if (opener && document.contains(opener)) opener.focus(); });
  }

  function initClosings() {
    const q = $('#closing-q'), st = $('#closing-status');
    const draw = () => {
      const needle = q.value.trim().toLowerCase();
      const rows = CLOSINGS.filter((c) => (!st.value || c.status === st.value) && (!needle || (c.org + ' ' + c.type).toLowerCase().includes(needle)));
      $('#closing-body').innerHTML = rows.map((c) => '<tr><th scope="row">' + esc(c.org) + '</th><td>' + c.type + '</td><td><span class="status-tag">' + c.status + '</span></td><td>' + esc(c.note) + '</td></tr>').join('');
      $('#closing-table').hidden = rows.length === 0;
      $('#closing-empty').hidden = rows.length > 0;
      $('#closing-count').textContent = rows.length + (rows.length === 1 ? ' sample listing' : ' sample listings') + ' shown.';
    };
    q.addEventListener('input', draw); st.addEventListener('change', draw);
    $('#closing-reset').addEventListener('click', () => { q.value = ''; st.value = ''; draw(); q.focus(); });
    $('#closing-form').addEventListener('submit', (e) => e.preventDefault());
    draw();
  }

  function initTeam() {
    const sel = $('#team-group');
    const draw = () => {
      const rows = TEAM.filter((p) => !sel.value || p.group === sel.value);
      $('#team-grid').innerHTML = rows.map((p) => '<li class="person-card"><img src="assets/avatar.svg" alt="" width="96" height="96"><h3>' + esc(p.name) + '</h3><p class="role">' + p.role + '</p><p>' + esc(p.bio) + '</p></li>').join('');
      $('#team-count').textContent = rows.length + ' fictional team members shown.';
    };
    sel.addEventListener('change', draw); draw();
  }

  function initTv() {
    const sel = $('#tv-day');
    const draw = () => {
      $('#tv-body').innerHTML = TV_SCHEDULE[sel.value].map((r) => '<tr><th scope="row">' + r[0] + '</th><td>' + esc(r[1]) + '</td></tr>').join('');
      $('#tv-day-name').textContent = sel.options[sel.selectedIndex].text;
    };
    sel.addEventListener('change', draw); draw();
  }

  function initContact() {
    const form = $('#contact-form'), summary = $('#error-summary'), success = $('#contact-success');
    const topic = new URLSearchParams(location.search).get('topic');
    if (topic && Array.from($('#topic').options).some((o) => o.value === topic)) $('#topic').value = topic;
    const rules = [
      ['name', (v) => (v.trim() ? '' : 'Enter your full name.')],
      ['email', (v) => (!v.trim() ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter an email address like name@example.com.')],
      ['topic', (v) => (v ? '' : 'Choose a topic.')],
      ['message', (v) => (v.trim().length >= 10 ? '' : 'Enter a message of at least 10 characters.')]
    ];
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      success.hidden = true;
      const errs = [];
      rules.forEach(([id, check]) => {
        const field = document.getElementById(id), msg = check(field.value), box = document.getElementById(id + '-error');
        box.textContent = msg; box.hidden = !msg;
        if (msg) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
        if (msg) errs.push([id, msg]);
      });
      if (errs.length) {
        summary.hidden = false;
        $('#error-list').innerHTML = errs.map((x) => '<li><a href="#' + x[0] + '">' + esc(x[1]) + '</a></li>').join('');
        summary.focus();
        return;
      }
      summary.hidden = true;
      form.reset();
      success.hidden = false; success.focus();
    });
    $('#error-list').addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) { e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus(); }
    });
  }

  function initLegal() {
    const box = $('#dns-optout'), out = $('#dns-status');
    $('#dns-form').addEventListener('submit', (e) => {
      e.preventDefault();
      out.textContent = 'Demo only: your choice (' + (box.checked ? 'opted out' : 'not opted out') + ') was not saved or sent anywhere.';
    });
  }

  /* ---------- boot ---------- */
  initNav(); initDisclosures();
  const pages = { home: initHome, 'ten-day': initTenDay, hourly: initHourly, alerts: initAlerts, radar: initRadar, maps: initMaps, traffic: initTraffic, webcams: initWebcams, closings: initClosings, team: initTeam, tv: initTv, contact: initContact, legal: initLegal };
  const init = pages[document.body.dataset.page];
  if (init) init();
})();
