/* Driftwell Weather (WX-02) - fictional demo. All weather data below is SAMPLE data generated
   from the inline parameters in this file. Nothing here is live, official, or a real forecast. */
(function () {
  'use strict';

  // ---------- helpers ----------
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function el(tag, attrs) {
    const n = document.createElement(tag);
    Object.keys(attrs || {}).forEach((k) => {
      const v = attrs[k];
      if (v === false || v == null) return;
      if (k === 'text') n.textContent = v; else n.setAttribute(k, v === true ? '' : v);
    });
    for (let i = 2; i < arguments.length; i++) n.append(arguments[i]);
    return n;
  }
  const store = {
    get(k, d) { try { const v = localStorage.getItem('dw-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('dw-' + k, JSON.stringify(v)); } catch (e) { /* storage blocked: keep going without persistence */ } }
  };
  const sec = (id, title, inner, comp) =>
    `<section aria-labelledby="${id}-h" data-section="${id}" data-component="${comp || 'content-panel'}"><h2 id="${id}-h">${title}</h2>${inner}</section>`;
  function say(msg) { const s = $('#global-status'); if (s) s.textContent = msg; }

  // ---------- sample data ----------
  const SAMPLE_DATE = '2026-11-10';
  const DEFAULT_LOC = 'marlow-ridge-va';
  const LOCS = [
    { id: 'marlow-ridge-va', name: 'Marlow Ridge', st: 'VA', lat: 39.02, lon: -77.47, mean: 55, season: 21, range: 19, wind: 6, alerts: [
      { sev: 'Advisory', title: 'Dense Fog Advisory (sample)', until: '9:00 AM Wed, Nov 11', text: 'Sample text: visibility may drop below one quarter mile in low-lying areas overnight. Slow down and use low beams.' }] },
    { id: 'fairhaven-oh', name: 'Fairhaven', st: 'OH', lat: 40.11, lon: -82.93, mean: 51, season: 24, range: 18, wind: 9, alerts: [] },
    { id: 'port-selby-wa', name: 'Port Selby', st: 'WA', lat: 47.6, lon: -122.3, mean: 52, season: 13, range: 11, wind: 7, alerts: [
      { sev: 'Watch', title: 'Flood Watch (sample)', until: '4:00 PM Thu, Nov 12', text: 'Sample text: repeated rounds of heavy rain could raise creek levels. Keep an eye on low-lying roads.' }] },
    { id: 'dunmore-tx', name: 'Dunmore', st: 'TX', lat: 32.8, lon: -96.8, mean: 67, season: 20, range: 20, wind: 11, alerts: [] },
    { id: 'quill-harbor-me', name: 'Quill Harbor', st: 'ME', lat: 44.1, lon: -69.1, mean: 45, season: 25, range: 16, wind: 10, alerts: [
      { sev: 'Warning', title: 'High Wind Warning (sample)', until: '11:00 PM Tue, Nov 10', text: 'Sample text: gusts near 55 mph are possible along the coast. Secure loose outdoor objects.' }] },
    { id: 'saguaro-flats-az', name: 'Saguaro Flats', st: 'AZ', lat: 33.4, lon: -112.0, mean: 76, season: 19, range: 27, wind: 6, alerts: [] },
    { id: 'lake-orrin-mn', name: 'Lake Orrin', st: 'MN', lat: 45.0, lon: -93.3, mean: 44, season: 31, range: 17, wind: 10, alerts: [] },
    { id: 'bellwether-fl', name: 'Bellwether', st: 'FL', lat: 27.9, lon: -82.4, mean: 74, season: 11, range: 15, wind: 8, alerts: [] },
    { id: 'kestrel-bluff-co', name: 'Kestrel Bluff', st: 'CO', lat: 39.7, lon: -105.0, mean: 51, season: 23, range: 26, wind: 8, alerts: [] },
    { id: 'tidewater-nc', name: 'Tidewater', st: 'NC', lat: 35.2, lon: -75.7, mean: 62, season: 17, range: 14, wind: 12, alerts: [] }
  ];
  const STREETS = ['Maple Lane', 'Old Mill Rd', 'Harbor View', 'Ridgeback Ct', 'Cedar Hollow', 'Quarry Hill', 'Willow Bend', 'North Meadow', 'Lantern Row', 'Birch Terrace'];
  const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const STORMS = [
    { id: 'odalys', name: 'Tropical Storm Odalys', basin: 'Atlantic', status: 'Active', wind: 60, pressure: 998, move: 'NW at 9 mph', where: '410 mi south of a fictional island chain', note: 'Sample entry. Gradual strengthening is shown for the demo only.' },
    { id: 'perrin', name: 'Hurricane Perrin', basin: 'Atlantic', status: 'Active', wind: 100, pressure: 968, move: 'N at 12 mph', where: '220 mi east of a fictional cape', note: 'Sample entry. A category 2 storm in the demo data.' },
    { id: 'tamsin', name: 'Tropical Depression Tamsin', basin: 'East Pacific', status: 'Active', wind: 35, pressure: 1004, move: 'W at 7 mph', where: '690 mi off a fictional coast', note: 'Sample entry. Weakening in the demo data.' },
    { id: 'wexley', name: 'Typhoon Wexley', basin: 'West Pacific', status: 'Active', wind: 120, pressure: 951, move: 'NW at 14 mph', where: '300 mi from a fictional archipelago', note: 'Sample entry.' },
    { id: 'ilvara', name: 'Hurricane Ilvara', basin: 'Atlantic', status: 'Dissipated', wind: 0, pressure: 1011, move: 'Dissipated', where: 'Remnants over open water', note: 'Sample entry for a storm that ended earlier in the demo season.' },
    { id: 'corvane', name: 'Post-Tropical Cyclone Corvane', basin: 'East Pacific', status: 'Post-tropical', wind: 45, pressure: 992, move: 'NE at 18 mph', where: 'Far north Pacific, fictional waters', note: 'Sample entry.' }
  ];
  const MAPS = [
    { id: 'radar-national', title: 'National radar mosaic', cat: 'radar', layer: 'radar', desc: 'Placeholder composite of sample precipitation echoes.' },
    { id: 'radar-regional', title: 'Regional radar loop', cat: 'radar', layer: 'radar', desc: 'Placeholder six-frame loop for one sample region.' },
    { id: 'sat-visible', title: 'Visible satellite', cat: 'satellite', layer: 'satellite', desc: 'Placeholder cloud-cover view.' },
    { id: 'sat-infrared', title: 'Infrared satellite', cat: 'satellite', layer: 'satellite', desc: 'Placeholder cloud-top view.' },
    { id: 'severe-outlook', title: 'Severe weather outlook', cat: 'severe', layer: 'radar', desc: 'Placeholder risk-area shapes for demonstration.' },
    { id: 'convective', title: 'Convective outlook', cat: 'severe', layer: 'radar', desc: 'Placeholder thunderstorm risk categories.' },
    { id: 'tropical', title: 'Tropical cyclone tracks', cat: 'tropical', layer: 'satellite', desc: 'Placeholder tracks for the sample storms.' },
    { id: 'fire', title: 'Fire weather map', cat: 'fire', layer: 'temperature', desc: 'Placeholder dryness and wind shading.' },
    { id: 'temp', title: 'Temperature map', cat: 'temperature', layer: 'temperature', desc: 'Placeholder temperature shading.' }
  ];
  const VIDEOS = [
    { id: 'v1', title: 'How to read a radar loop', topic: 'Learning', dur: '3:12' },
    { id: 'v2', title: 'What a hurricane watch means', topic: 'Tropics', dur: '2:48' },
    { id: 'v3', title: 'Fog formation explained', topic: 'Learning', dur: '4:05' },
    { id: 'v4', title: 'Week ahead: a wet start in the sample Northwest', topic: 'Forecast', dur: '1:55' },
    { id: 'v5', title: 'Building a backyard station', topic: 'Stations', dur: '6:30' },
    { id: 'v6', title: 'Storm shelter basics', topic: 'Safety', dur: '5:20' }
  ];
  const STATIONS = [
    { id: 'DWX-1001', name: 'Maple Lane Roof', region: 'East', temp: 54, age: 4 },
    { id: 'DWX-1002', name: 'Harbor View Pier', region: 'Northeast', temp: 47, age: 12 },
    { id: 'DWX-1003', name: 'Ridgeback Garden', region: 'East', temp: 52, age: 2 },
    { id: 'DWX-1004', name: 'Lantern Row School', region: 'Midwest', temp: 49, age: 30 },
    { id: 'DWX-1005', name: 'Quarry Hill Farm', region: 'West', temp: 58, age: 7 },
    { id: 'DWX-1006', name: 'Willow Bend Park', region: 'South', temp: 71, age: 1 },
    { id: 'DWX-1007', name: 'North Meadow Barn', region: 'Midwest', temp: 44, age: 19 },
    { id: 'DWX-1008', name: 'Birch Terrace Deck', region: 'West', temp: 61, age: 5 }
  ];
  const ARTICLES = [
    { id: 'fog-nights', cat: 'Explainers', title: 'Why fog loves a clear November night', date: 'Nov 9, 2026', img: 'article-1.svg',
      text: ['Sample article written for this demo. On calm, clear nights the ground cools quickly and the air next to it can reach its dew point.', 'When the air holds enough moisture, tiny droplets form and fog appears. Valleys and river corridors tend to fill first because cold air pools there.'] },
    { id: 'wet-northwest', cat: 'Forecasts', title: 'A wet week sets up in the sample Northwest', date: 'Nov 8, 2026', img: 'article-2.svg',
      text: ['Sample article. A string of fictional Pacific systems lines up for the coming days in this demo scenario.', 'Totals shown here are invented to exercise the interface and do not describe any real forecast.'] },
    { id: 'season-recap', cat: 'Tropics', title: 'Season recap: two sample hurricanes, one lingering storm', date: 'Nov 6, 2026', img: 'article-3.svg',
      text: ['Sample article. The tracker page lists six invented storms; this note explains how the demo labels each status.', 'Active means the storm is shown with current sample winds. Dissipated storms stay listed for reference.'] },
    { id: 'station-siting', cat: 'Stations', title: 'Where to put a backyard station', date: 'Nov 4, 2026', img: 'article-1.svg',
      text: ['Sample article. Place the sensor away from walls and pavement, in open air about five feet above the ground.', 'Shade and airflow matter more than a pretty mounting spot.'] },
    { id: 'wind-chill', cat: 'Explainers', title: 'Feels-like temperature: what the number means', date: 'Nov 2, 2026', img: 'article-2.svg',
      text: ['Sample article. Feels-like blends air temperature with wind and humidity into one comfort number.', 'It is a guide, not a measurement, and it differs between people.'] },
    { id: 'first-snow', cat: 'Forecasts', title: 'First flakes of the sample season', date: 'Oct 30, 2026', img: 'article-3.svg',
      text: ['Sample article. The demo shows light snow in the coldest sample locations when temperatures drop below freezing.', 'Use the unit toggle to see the same values in metric.'] }
  ];
  const HAZARDS = {
    hurricane: ['Know your evacuation zone and route.', 'Fill vehicle fuel tanks before the storm arrives.', 'Secure or bring in outdoor furniture.'],
    flood: ['Never drive through flooded roads.', 'Move valuables to upper floors.', 'Keep a battery radio nearby.'],
    winter: ['Keep blankets and warm clothing in the car.', 'Stock water and non-perishable food.', 'Check on neighbors who live alone.'],
    heat: ['Drink water before you feel thirsty.', 'Never leave people or pets in parked vehicles.', 'Schedule outdoor work for early morning.'],
    tornado: ['Choose an interior room on the lowest floor.', 'Keep sturdy shoes near your shelter spot.', 'Use a helmet if you have one.']
  };
  const CHECKLIST = ['Water for three days (one gallon per person per day)', 'Non-perishable food for three days', 'Battery or hand-crank radio', 'Flashlight and spare batteries', 'First-aid kit and medications', 'Copies of key documents in a waterproof bag', 'Phone chargers and a power bank', 'A written family contact plan'];

  // ---------- sample weather generation (deterministic) ----------
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rnd(seed) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const dateAdd = (ds, n) => { const d = new Date(ds + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  const dayLabel = (ds, o) => new Date(ds + 'T12:00:00Z').toLocaleDateString('en-US', Object.assign({ timeZone: 'UTC' }, o));
  const dayOfYear = (ds) => { const d = new Date(ds + 'T00:00:00Z'); return Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5); };
  function pickCond(r, hi) {
    const v = r();
    if (hi < 36 && v > 0.55) return 'Snow';
    return v < 0.22 ? 'Sunny' : v < 0.38 ? 'Mostly Sunny' : v < 0.52 ? 'Partly Cloudy' : v < 0.66 ? 'Mostly Cloudy' : v < 0.76 ? 'Cloudy' : v < 0.86 ? 'Light Rain' : v < 0.93 ? 'Rain' : v < 0.97 ? 'Thunderstorms' : 'Fog';
  }
  const WET = /Rain|Thunder|Snow/;
  function daily(l, ds) {
    const r = rnd(hash(l.id + ds));
    const m = l.mean + l.season * Math.cos(2 * Math.PI * (dayOfYear(ds) - 200) / 365) + (r() - 0.5) * 12;
    const hi = m + l.range / 2 + (r() - 0.5) * 4, lo = m - l.range / 2 + (r() - 0.5) * 4;
    const cond = pickCond(r, hi), wet = WET.test(cond);
    return { date: ds, hi, lo, cond, pop: Math.round(wet ? 55 + r() * 40 : r() * 30), precip: wet ? Math.round(r() * 90) / 100 : 0,
      wind: Math.round(l.wind + r() * 9), dir: DIRS[Math.floor(r() * 8)], hum: Math.round(48 + r() * 45), uv: Math.round(r() * 3 + 1) };
  }
  function hourly(l, ds) {
    const d = daily(l, ds), r = rnd(hash(l.id + ds + 'h')), out = [];
    for (let h = 0; h < 24; h++) {
      const t = (d.hi + d.lo) / 2 + (d.hi - d.lo) / 2 * Math.sin((h - 9) / 24 * 2 * Math.PI);
      const pop = Math.max(0, Math.min(100, Math.round(d.pop * (0.5 + r()))));
      const wet = pop >= 50 && WET.test(d.cond);
      out.push({ h, temp: t, feels: t - d.wind * 0.25, cond: wet ? d.cond : (d.cond === 'Fog' && h > 10 && h < 20 ? 'Cloudy' : d.cond.replace(/Rain|Thunderstorms|Snow/, 'Mostly Cloudy')), pop,
        amount: wet ? Math.round(r() * 12) / 100 : 0, hum: Math.round(Math.min(99, d.hum + (d.hi - t) * 0.8)), wind: Math.max(1, Math.round(d.wind + (r() - 0.5) * 5)), dir: d.dir,
        cloud: Math.round(wet ? 85 + r() * 15 : r() * 70), press: 29.7 + r() * 0.6 });
    }
    return out;
  }
  function current(l) {
    const hr = hourly(l, SAMPLE_DATE)[14], r = rnd(hash(l.id + 'now'));
    return Object.assign({}, hr, { dew: hr.temp - (100 - hr.hum) / 5, vis: hr.cond === 'Fog' ? 0.5 : 10, gust: hr.wind + Math.round(r() * 8), uv: daily(l, SAMPLE_DATE).uv });
  }
  function nearby(l) {
    const c = current(l), r = rnd(hash(l.id + 'stn'));
    return STREETS.slice(0, 5).map((s, i) => ({ id: 'DWX-' + (2000 + (hash(l.id + i) % 900)), name: s, temp: c.temp + (r() - 0.5) * 4, wind: Math.max(0, c.wind + Math.round((r() - 0.5) * 6)), dist: (0.8 + i * 1.3 + r()).toFixed(1) }));
  }

  // ---------- units ----------
  let units = store.get('units', 'imperial');
  const metric = () => units === 'metric';
  const T = (f) => (metric() ? Math.round((f - 32) * 5 / 9) + '°C' : Math.round(f) + '°F');
  const W = (m) => (metric() ? Math.round(m * 1.609) + ' km/h' : Math.round(m) + ' mph');
  const P = (i) => (metric() ? (i * 25.4).toFixed(1) + ' mm' : i.toFixed(2) + ' in');
  const PR = (i) => (metric() ? Math.round(i * 33.8639) + ' hPa' : i.toFixed(2) + ' inHg');
  const V = (m) => (metric() ? (m * 1.609).toFixed(1) + ' km' : m + ' mi');
  const hourLabel = (h) => (h === 0 ? '12 AM' : h < 12 ? h + ' AM' : h === 12 ? '12 PM' : h - 12 + ' PM');

  const ICONS = {
    sun: '<circle cx="16" cy="16" r="6"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3"/>',
    cloud: '<path d="M9 24a5 5 0 010-10 7 7 0 0113.5-1A5.5 5.5 0 0123 24z"/>',
    partly: '<circle cx="11" cy="11" r="4"/><path d="M11 3v2M3 11h2M5 5l1.5 1.5M17 5l-1.5 1.5"/><path d="M12 26a4 4 0 010-8 6 6 0 0111.5-1A4.5 4.5 0 0124 26z"/>',
    rain: '<path d="M9 20a5 5 0 010-10 7 7 0 0113.5-1A5.5 5.5 0 0123 20z"/><path d="M11 23l-1 4M17 23l-1 4M23 23l-1 4"/>',
    storm: '<path d="M9 19a5 5 0 010-10 7 7 0 0113.5-1A5.5 5.5 0 0123 19z"/><path d="M17 19l-3 5h5l-3 6"/>',
    snow: '<path d="M9 19a5 5 0 010-10 7 7 0 0113.5-1A5.5 5.5 0 0123 19z"/><path d="M11 24h.1M17 26h.1M23 24h.1M14 28h.1M20 28h.1"/>',
    fog: '<path d="M6 12h20M4 17h22M8 22h20M6 27h16"/>'
  };
  const iconFor = (c) => (/Thunder/.test(c) ? 'storm' : /Snow/.test(c) ? 'snow' : /Rain/.test(c) ? 'rain' : c === 'Fog' ? 'fog' : /Sunny$/.test(c) ? 'sun' : c === 'Partly Cloudy' ? 'partly' : 'cloud');
  const icon = (c) => `<svg class="wx-icon" viewBox="0 0 32 32" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[iconFor(c)]}</svg>`;

  // ---------- location context ----------
  const params = new URLSearchParams(location.search);
  const findLoc = (id) => LOCS.find((l) => l.id === id);
  let locId = params.get('loc') || store.get('loc', DEFAULT_LOC);
  const locName = (l) => l.name + ', ' + l.st;
  function setLoc(id) { locId = id; store.set('loc', id); }
  if (findLoc(locId)) store.set('loc', locId);
  const dateFull = (ds) => dayLabel(ds, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  // ---------- dialogs ----------
  function openDialog(title, body, opener, comp) {
    const dlg = el('dialog', { class: 'dialog', 'aria-labelledby': 'dlg-title', 'data-section': 'dialog', 'data-component': comp || 'modal-dialog' },
      el('div', { class: 'dialog-head' }, el('h2', { id: 'dlg-title', text: title }), el('button', { type: 'button', class: 'btn btn-quiet', 'data-close': true, text: 'Close' })), body);
    document.body.append(dlg);
    dlg.addEventListener('close', () => { dlg.remove(); if (opener) opener.focus(); });
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.hasAttribute('data-close')) dlg.close(); });
    dlg.showModal();
    return dlg;
  }

  // ---------- form validation (labels, inline errors, error summary, focus) ----------
  const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  function wireForm(form, rules, onValid) {
    form.noValidate = true;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      $$('.error-summary, .field-error, .form-success', form).forEach((n) => n.remove());
      $$('[aria-invalid]', form).forEach((n) => { n.removeAttribute('aria-invalid'); n.setAttribute('aria-describedby', (n.getAttribute('aria-describedby') || '').split(' ').filter((t) => !/-error$/.test(t)).join(' ')); });
      const errs = [];
      rules.forEach((r) => {
        const inp = form.elements[r.name];
        const v = inp.type === 'checkbox' ? inp.checked : inp.value.trim();
        const msg = r.check(v);
        if (!msg) return;
        errs.push({ inp, msg, label: r.label });
        const err = el('p', { class: 'field-error', id: inp.id + '-error', text: 'Error: ' + msg });
        inp.closest('.field').append(err);
        inp.setAttribute('aria-invalid', 'true');
        inp.setAttribute('aria-describedby', ((inp.getAttribute('aria-describedby') || '') + ' ' + err.id).trim());
      });
      if (errs.length) {
        const ul = el('ul');
        errs.forEach((x) => { const a = el('a', { href: '#' + x.inp.id, text: x.label + ': ' + x.msg }); a.addEventListener('click', (ev) => { ev.preventDefault(); x.inp.focus(); }); ul.append(el('li', {}, a)); });
        const sum = el('div', { class: 'error-summary', role: 'alert', tabindex: '-1', 'data-component': 'error-summary' }, el('h2', { text: 'There ' + (errs.length > 1 ? 'are ' + errs.length + ' problems' : 'is 1 problem') + ' with your entries' }), ul);
        form.prepend(sum);
        sum.focus();
        return;
      }
      onValid(form);
    });
  }
  function demoSuccess(form, msg) {
    const ok = el('p', { class: 'form-success', role: 'status', tabindex: '-1', text: msg });
    form.append(ok);
    ok.focus();
  }

  // ---------- global header behavior ----------
  function closePanels(except) {
    $$('.disclosure[aria-expanded="true"]').forEach((b) => {
      if (b === except || b.classList.contains('menu-toggle') || b.closest('.accordion-item')) return;
      if (b.hasAttribute('data-panel')) { b.setAttribute('aria-expanded', 'false'); const p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = true; }
    });
  }
  function initChrome() {
    // filter bars apply on change; Enter inside them must not reload the page
    document.addEventListener('submit', (e) => { if (e.target.matches('.filter-bar, .viewer-controls') && e.target.id !== 'hs-form') e.preventDefault(); });
    document.addEventListener('click', (e) => {
      const b = e.target.closest('.disclosure');
      if (b) {
        const open = b.getAttribute('aria-expanded') === 'true', panel = document.getElementById(b.getAttribute('aria-controls'));
        if (b.hasAttribute('data-panel') && !open) closePanels(b);
        b.setAttribute('aria-expanded', String(!open));
        if (b.classList.contains('menu-toggle')) $('#site-menu').classList.toggle('open', !open);
        else if (panel) panel.hidden = open;
        return;
      }
      if (!e.target.closest('[data-panel], .panel, .loc-search')) { closePanels(); hideResults(); }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || $('dialog[open]')) return;
      const open = $('.disclosure[data-panel][aria-expanded="true"]');
      if (open) { const had = open.closest('li, div').contains(document.activeElement); closePanels(); if (had) open.focus(); return; }
      const res = $('#loc-q-results');
      if (res && !res.hidden) { hideResults(); $('#loc-q').focus(); return; }
      const mt = $('.menu-toggle');
      if (mt && mt.getAttribute('aria-expanded') === 'true' && getComputedStyle(mt).display !== 'none') { mt.click(); mt.focus(); }
    });
    // units
    $$('[data-unit]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.unit === units));
      b.addEventListener('click', () => { units = b.dataset.unit; store.set('units', units); $$('[data-unit]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.unit === units))); say('Units set to ' + (metric() ? 'metric' : 'imperial') + '.'); render(); });
    });
    // use-my-location (demo: never reads the real location)
    const gl = $('#get-location');
    gl.addEventListener('click', () => {
      setLoc(DEFAULT_LOC);
      say('Demo: no real location was read. Showing the sample default location, ' + locName(findLoc(DEFAULT_LOC)) + '.');
      render();
    });
    // login demo
    $('#login-open').addEventListener('click', (e) => {
      const form = el('form', { 'data-section': 'login', 'data-component': 'login-form' },
        el('p', { class: 'demo-note', text: 'Demo only: there are no accounts. Nothing you type is sent or stored.' }),
        el('div', { class: 'field' }, el('label', { for: 'lg-email', text: 'Email address' }), el('input', { id: 'lg-email', name: 'email', type: 'email', autocomplete: 'email' })),
        el('div', { class: 'field' }, el('label', { for: 'lg-pw', text: 'Password' }), el('input', { id: 'lg-pw', name: 'pw', type: 'password', autocomplete: 'current-password' })),
        el('button', { type: 'submit', class: 'btn', text: 'Log in (demo)' }));
      wireForm(form, [
        { name: 'email', label: 'Email address', check: (v) => (!v ? 'Enter your email address.' : EMAIL.test(v) ? '' : 'Enter an email like name@example.com.') },
        { name: 'pw', label: 'Password', check: (v) => (v.length < 8 ? 'Enter a password of at least 8 characters.' : '') }
      ], (f) => demoSuccess(f, 'Demo only: login simulated. No account exists and nothing was sent.'));
      openDialog('Log in (demo)', form, e.currentTarget, 'login-dialog');
    });
    // favorites
    renderFavorites();
    // search
    initSearch();
  }
  function favs() { return store.get('favs', []); }
  function renderFavorites() {
    const box = $('#favorites-list');
    if (!box) return;
    const f = favs().map(findLoc).filter(Boolean);
    box.replaceChildren(...(f.length ? f.map((l) => el('li', {}, el('a', { href: 'conditions.html?loc=' + l.id, text: locName(l) }))) : [el('li', { class: 'empty', text: 'No favorites yet. Open a location and choose "Add to favorites".' })]));
  }

  // ---------- header location search ----------
  const matches = (q) => { q = q.toLowerCase(); return LOCS.filter((l) => (l.name + ' ' + l.st + ' ' + locName(l)).toLowerCase().includes(q)); };
  function hideResults() { const r = $('#loc-q-results'); if (r) r.hidden = true; }
  function initSearch() {
    const form = $('.loc-search'), input = $('#loc-q'), res = $('#loc-q-results'), list = $('ul', res), status = $('#loc-q-status'), err = $('#loc-q-error');
    const showErr = (m) => { err.textContent = m ? 'Error: ' + m : ''; err.hidden = !m; if (m) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); };
    function update() {
      const q = input.value.trim();
      showErr('');
      if (!q) { hideResults(); return null; }
      const m = matches(q);
      list.replaceChildren(...m.slice(0, 6).map((l) => el('li', {}, el('a', { href: 'conditions.html?loc=' + l.id, text: locName(l) }))));
      status.textContent = m.length ? m.length + (m.length === 1 ? ' sample location found.' : ' sample locations found.') : 'No sample locations match "' + q + '".';
      res.hidden = false;
      return m;
    }
    input.addEventListener('input', update);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.value.trim()) { showErr('Enter a city or state to search the sample locations.'); input.focus(); return; }
      const m = update();
      if (!m.length) { showErr('No sample locations match "' + input.value.trim() + '". Try Marlow Ridge, Fairhaven or a state such as WA.'); input.focus(); } else if (m.length === 1) location.href = 'conditions.html?loc=' + m[0].id;
      else $('a', list).focus();
    });
  }

  // ---------- shared pieces ----------
  function locHeader(l) {
    $('#loc-title').textContent = locName(l) + ' ' + document.body.dataset.titleSuffix;
    $('#loc-meta').textContent = 'Sample data for demonstration. Sample date: ' + dateFull(SAMPLE_DATE) + '. Latitude ' + l.lat + ', longitude ' + l.lon + ' (fictional).';
    document.title = locName(l) + ' ' + document.body.dataset.titleSuffix + ' | Driftwell Weather (demo)';
    tabLinks(l);
  }
  function tabLinks(l) {
    $$('[data-component="location-tabs"] a').forEach((a) => { a.href = a.getAttribute('href').split('?')[0] + '?loc=' + l.id; });
  }
  function unknownLocation() {
    $('#loc-title').textContent = 'Location not found';
    $('#loc-meta').textContent = '';
    $('#loc-content').innerHTML = `<div class="notice notice-error" role="alert"><p>The location "<span id="bad-loc"></span>" is not in the sample dataset.</p></div><h2>Choose a sample location</h2><ul class="chip-list">${LOCS.map((l) => `<li><a class="chip" href="${location.pathname.split('/').pop()}?loc=${l.id}">${esc(locName(l))}</a></li>`).join('')}</ul>`;
    $('#bad-loc').textContent = params.get('loc');
  }
  const dayCard = (l, i) => {
    const d = daily(l, dateAdd(SAMPLE_DATE, i));
    return `<li class="day-card"><p class="day-name">${i === 0 ? 'Today' : dayLabel(d.date, { weekday: 'short' })}</p><p class="muted">${dayLabel(d.date, { month: 'short', day: 'numeric' })}</p>${icon(d.cond)}<p class="day-temps"><span class="hi">${T(d.hi)}</span> <span class="lo"><span class="visually-hidden">low </span>${T(d.lo)}</span></p><p>${d.cond}</p><p class="muted">${d.pop}% precip.</p></li>`;
  };
  const alertsHTML = (l) => (l.alerts.length
    ? '<ul class="alert-list">' + l.alerts.map((a, i) => `<li class="alert alert-${a.sev.toLowerCase()}"><h3><button type="button" class="disclosure alert-toggle" aria-expanded="false" aria-controls="al-${i}"><strong>${a.sev}:</strong> ${esc(a.title)}</button></h3><div id="al-${i}" class="alert-body" hidden><p>${esc(a.text)}</p><p class="muted">Sample alert in effect until ${esc(a.until)}. Not a real warning.</p></div></li>`).join('') + '</ul>'
    : '<p class="empty">No sample alerts for this location.</p>');

  // ---------- page renderers ----------
  const pages = {};

  pages.home = () => {
    const l = findLoc(locId) || findLoc(DEFAULT_LOC), c = current(l);
    $('#home-current').innerHTML = `<div class="current-card"><div class="cc-main">${icon(c.cond)}<p class="cc-temp">${T(c.temp)}</p><p class="cc-cond">${c.cond}</p><p>Feels like ${T(c.feels)}</p></div><div><p><strong>${esc(locName(l))}</strong> (sample default; the original site picks a location from your network address, this demo does not)</p><p class="muted">Sample reading, 2:00 PM ${dateFull(SAMPLE_DATE)}. Not a live observation.</p><p><a class="btn" href="conditions.html?loc=${l.id}">See full conditions</a> <a class="btn btn-quiet" href="hourly.html?loc=${l.id}">Hourly</a> <a class="btn btn-quiet" href="forecast.html?loc=${l.id}">10-day</a></p></div></div>`;
    $('#home-days').innerHTML = [0, 1, 2, 3, 4].map((i) => dayCard(l, i)).join('');
    $('#home-alerts').innerHTML = alertsHTML(l);
    $('#home-picks').innerHTML = LOCS.slice(0, 6).map((x) => `<li><a class="chip" href="conditions.html?loc=${x.id}">${esc(locName(x))}</a></li>`).join('');
  };

  pages.conditions = () => {
    const l = findLoc(locId);
    if (!l) return unknownLocation();
    locHeader(l);
    const c = current(l), d = daily(l, SAMPLE_DATE), hrs = hourly(l, SAMPLE_DATE).slice(8, 20), isFav = favs().includes(l.id);
    const stat = [['Wind', DIRS[(hash(l.id) % 8)] + ' ' + W(c.wind)], ['Gusts', W(c.gust)], ['Humidity', c.hum + '%'], ['Dew point', T(c.dew)], ['Pressure', PR(c.press)], ['Visibility', V(c.vis)], ['UV index', String(c.uv)], ['Cloud cover', c.cloud + '%']];
    const maxAmt = Math.max(0.01, ...hrs.map((h) => h.amount));
    const almHi = l.mean + l.season * Math.cos(2 * Math.PI * (dayOfYear('2026-11-15') - 200) / 365) + l.range / 2, almLo = almHi - l.range;
    $('#loc-content').innerHTML =
      sec('current-conditions', 'Current conditions', `<div class="current-card"><div class="cc-main">${icon(c.cond)}<p class="cc-temp">${T(c.temp)}</p><p class="cc-cond">${c.cond}</p><p>Feels like ${T(c.feels)}</p></div><dl class="stat-grid">${stat.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div><p class="muted">Sample reading labelled 2:00 PM, ${dateFull(SAMPLE_DATE)}. Not a live observation.</p><p><button type="button" class="btn btn-quiet" id="fav-toggle" aria-pressed="${isFav}">${isFav ? 'Remove from favorites' : 'Add to favorites'}</button></p>`, 'current-conditions-card') +
      sec('weather-alerts', 'Sample alerts', alertsHTML(l), 'alert-list') +
      sec('todays-forecast', 'Today', `<div class="two-col"><div><h3>Day</h3><p>${d.cond}. High near ${T(d.hi)}. Winds ${d.dir} at ${W(d.wind)}. Chance of precipitation ${d.pop}%.</p></div><div><h3>Night</h3><p>${d.cond.replace(/Sunny/, 'Clear')}. Low near ${T(d.lo)}. Winds light and variable. Humidity ${d.hum}%.</p></div></div>`, 'forecast-summary') +
      sec('hourly-precipitation', 'Hourly liquid precipitation', `<table class="data-table"><caption>Sample precipitation, 8 AM to 7 PM (${metric() ? 'millimeters' : 'inches'})</caption><thead><tr><th scope="col">Hour</th><th scope="col">Amount</th><th scope="col">Chance</th><th scope="col"><span class="visually-hidden">Bar</span></th></tr></thead><tbody>${hrs.map((h) => `<tr><th scope="row">${hourLabel(h.h)}</th><td>${P(h.amount)}</td><td>${h.pop}%</td><td><span class="bar" style="width:${Math.round(h.amount / maxAmt * 100)}%"></span></td></tr>`).join('')}</tbody></table>`, 'precipitation-chart') +
      sec('five-day', 'Next 5 days', `<ul class="day-row">${[1, 2, 3, 4, 5].map((i) => dayCard(l, i)).join('')}</ul><p><a href="forecast.html?loc=${l.id}">See the full 10-day forecast</a></p>`, 'forecast-cards') +
      sec('nearby-stations', 'Nearby sample stations', `<div class="table-wrap"><table class="data-table"><caption>Fictional community stations near ${esc(locName(l))}</caption><thead><tr><th scope="col">Station</th><th scope="col">ID</th><th scope="col">Temp</th><th scope="col">Wind</th><th scope="col">Distance</th></tr></thead><tbody>${nearby(l).map((s) => `<tr><th scope="row">${s.name}</th><td>${s.id}</td><td>${T(s.temp)}</td><td>${W(s.wind)}</td><td>${metric() ? (s.dist * 1.609).toFixed(1) + ' km' : s.dist + ' mi'}</td></tr>`).join('')}</tbody></table></div>`, 'station-table') +
      sec('almanac', 'Almanac for November', `<div class="table-wrap"><table class="data-table"><caption>Sample almanac values (invented)</caption><thead><tr><th scope="col">Measure</th><th scope="col">Value</th></tr></thead><tbody><tr><th scope="row">Average high</th><td>${T(almHi)}</td></tr><tr><th scope="row">Average low</th><td>${T(almLo)}</td></tr><tr><th scope="row">Record high (sample)</th><td>${T(almHi + 21)}</td></tr><tr><th scope="row">Record low (sample)</th><td>${T(almLo - 24)}</td></tr></tbody></table></div>`, 'almanac-table') +
      sec('radar-preview', 'Radar', `<a class="media-link" href="radar.html?loc=${l.id}"><img src="assets/radar-map.svg" alt="Placeholder radar map for ${esc(locName(l))}. No real radar data." width="640" height="320"></a><p><a href="radar.html?loc=${l.id}">Open the radar placeholder</a></p>`, 'map-preview');
    $('#fav-toggle').addEventListener('click', (e) => {
      const f = favs(), i = f.indexOf(l.id);
      if (i < 0) f.push(l.id); else f.splice(i, 1);
      store.set('favs', f);
      e.currentTarget.setAttribute('aria-pressed', String(i < 0));
      e.currentTarget.textContent = i < 0 ? 'Remove from favorites' : 'Add to favorites';
      renderFavorites();
      say(locName(l) + (i < 0 ? ' added to' : ' removed from') + ' favorites.');
    });
  };

  pages.hourly = () => {
    const l = findLoc(locId);
    if (!l) return unknownLocation();
    locHeader(l);
    const sel = $('#hr-day'), wet = $('#hr-wet');
    if (!sel.options.length) for (let i = 0; i < 5; i++) sel.append(el('option', { value: i, text: (i === 0 ? 'Today, ' : i === 1 ? 'Tomorrow, ' : '') + dayLabel(dateAdd(SAMPLE_DATE, i), { weekday: 'short', month: 'short', day: 'numeric' }) }));
    const rows = hourly(l, dateAdd(SAMPLE_DATE, +sel.value)).filter((h) => !wet.checked || h.pop >= 40);
    $('#hr-body').innerHTML = rows.map((h) => `<tr><th scope="row">${hourLabel(h.h)}</th><td>${icon(h.cond)} ${h.cond}</td><td>${T(h.temp)}</td><td>${T(h.feels)}</td><td>${h.pop}%</td><td>${P(h.amount)}</td><td>${h.hum}%</td><td>${h.dir} ${W(h.wind)}</td><td>${PR(h.press)}</td></tr>`).join('');
    $('#hr-table').hidden = !rows.length;
    $('#hr-empty').hidden = !!rows.length;
    $('#hr-status').textContent = rows.length ? 'Showing ' + rows.length + ' hourly sample rows for ' + locName(l) + '.' : '';
  };

  pages.forecast = () => {
    const l = findLoc(locId);
    if (!l) return unknownLocation();
    locHeader(l);
    $('#fc-list').innerHTML = Array.from({ length: 10 }, (_, i) => {
      const d = daily(l, dateAdd(SAMPLE_DATE, i));
      return `<li class="accordion-item"><h3><button type="button" class="disclosure acc-btn" aria-expanded="false" aria-controls="fc-${i}">${icon(d.cond)}<span class="acc-day">${i === 0 ? 'Today' : dayLabel(d.date, { weekday: 'long' })}, ${dayLabel(d.date, { month: 'short', day: 'numeric' })}</span><span class="acc-temps">${T(d.hi)} / ${T(d.lo)}</span><span class="acc-cond">${d.cond}, ${d.pop}% precip.</span></button></h3><div id="fc-${i}" class="acc-body" hidden><p>${d.cond}. High near ${T(d.hi)}, low near ${T(d.lo)}. Winds ${d.dir} at ${W(d.wind)}. Humidity ${d.hum}%. UV index ${d.uv}. Expected precipitation ${P(d.precip)}.</p><p class="muted">Sample forecast text.</p></div></li>`;
    }).join('');
    $('#fc-all').textContent = 'Expand all';
    $('#fc-all').setAttribute('aria-expanded', 'false');
  };

  pages.history = () => {
    const l = findLoc($('#hs-loc').value) || findLoc(locId);
    const ds = $('#hs-date').value || dateAdd(SAMPLE_DATE, -7);
    const out = $('#hs-out');
    if (!l) return;
    const row = (x) => `<tr><th scope="row">${dayLabel(x.date, { month: 'short', day: 'numeric' })}</th><td>${T(x.hi)}</td><td>${T(x.lo)}</td><td>${T((x.hi + x.lo) / 2)}</td><td>${P(x.precip)}</td><td>${W(x.wind)}</td><td>${x.cond}</td></tr>`;
    const head = '<thead><tr><th scope="col">Date</th><th scope="col">High</th><th scope="col">Low</th><th scope="col">Average</th><th scope="col">Precip.</th><th scope="col">Wind</th><th scope="col">Conditions</th></tr></thead>';
    let rows;
    if ($('#hs-month').checked) {
      const first = ds.slice(0, 8) + '01', days = [];
      for (let i = 0; i < 31; i++) { const x = dateAdd(first, i); if (x.slice(0, 7) !== first.slice(0, 7) || x > SAMPLE_DATE) break; days.push(daily(l, x)); }
      rows = days.map(row).join('');
      out.innerHTML = `<h2 id="hs-out-h" tabindex="-1">${dayLabel(ds, { month: 'long', year: 'numeric' })} at ${esc(locName(l))}</h2><div class="table-wrap"><table class="data-table"><caption>Sample monthly history (invented; days after the sample date are omitted)</caption>${head}<tbody>${rows}</tbody></table></div>`;
    } else {
      const x = daily(l, ds);
      out.innerHTML = `<h2 id="hs-out-h" tabindex="-1">${dateFull(ds)} at ${esc(locName(l))}</h2><div class="table-wrap"><table class="data-table"><caption>Sample daily history (invented)</caption>${head}<tbody>${row(x)}</tbody></table></div>`;
    }
  };

  pages.hurricane = () => {
    const b = $('#hu-basin').value, s = $('#hu-status').value;
    const rows = STORMS.filter((x) => (b === 'all' || x.basin === b) && (s === 'all' || x.status === s));
    $('#hu-body').innerHTML = rows.map((x) => `<tr><th scope="row">${x.name}</th><td>${x.basin}</td><td>${x.status}</td><td>${x.status === 'Dissipated' ? 'n/a' : metric() ? Math.round(x.wind * 1.609) + ' km/h' : x.wind + ' mph'}</td><td>${PR(x.pressure / 33.8639)}</td><td><button type="button" class="btn btn-quiet" data-storm="${x.id}">View track (demo)<span class="visually-hidden">: ${x.name}</span></button></td></tr>`).join('');
    $('#hu-table').hidden = !rows.length;
    $('#hu-empty').hidden = !!rows.length;
    $('#hu-status-msg').textContent = 'Showing ' + rows.length + ' of ' + STORMS.length + ' sample storms.';
  };

  pages.maps = () => {
    const c = $('#mp-cat').value, q = $('#mp-q').value.trim().toLowerCase();
    const rows = MAPS.filter((m) => (c === 'all' || m.cat === c) && (!q || (m.title + ' ' + m.desc).toLowerCase().includes(q)));
    $('#mp-list').innerHTML = rows.map((m, i) => `<li class="card"><img src="assets/map-${i % 3 + 1}.svg" alt="" width="320" height="180" loading="lazy"><h3><a href="radar.html?layer=${m.layer}">${m.title}</a></h3><p>${m.desc}</p><p class="muted">Category: ${m.cat}</p></li>`).join('');
    $('#mp-empty').hidden = !!rows.length;
    $('#mp-status').textContent = rows.length + (rows.length === 1 ? ' map' : ' maps') + ' shown.';
  };

  pages.video = () => {
    const t = $('#vd-topic').value, rows = VIDEOS.filter((v) => t === 'all' || v.topic === t);
    $('#vd-list').innerHTML = rows.map((v) => `<li class="card"><img src="assets/video-poster.svg" alt="" width="320" height="180" loading="lazy"><h3>${v.title}</h3><p class="muted">${v.topic} · ${v.dur}</p><button type="button" class="btn" data-video="${v.id}">Play (demo)<span class="visually-hidden">: ${v.title}</span></button></li>`).join('');
    $('#vd-status').textContent = rows.length + ' sample videos shown.';
  };

  pages.stations = () => {
    const r = $('#st-region').value, q = $('#st-q').value.trim().toLowerCase(), sort = $('#st-sort').value;
    const rows = STATIONS.filter((s) => (r === 'all' || s.region === r) && (!q || (s.name + ' ' + s.id).toLowerCase().includes(q)))
      .sort((a, b) => (sort === 'temp' ? b.temp - a.temp : sort === 'age' ? a.age - b.age : a.name.localeCompare(b.name)));
    $('#st-body').innerHTML = rows.map((s) => `<tr><th scope="row">${s.name}</th><td>${s.id}</td><td>${s.region}</td><td>${T(s.temp)}</td><td>${s.age} min ago (sample)</td></tr>`).join('');
    $('#st-table').hidden = !rows.length;
    $('#st-empty').hidden = !!rows.length;
    $('#st-status').textContent = rows.length + ' of ' + STATIONS.length + ' sample stations shown.';
  };

  pages.blog = () => {
    const c = $('#bl-filter [aria-pressed="true"]').dataset.cat;
    const rows = ARTICLES.filter((a) => c === 'all' || a.cat === c);
    $('#bl-list').innerHTML = rows.map((a) => `<li class="article-card" id="a-${a.id}" data-section="article" data-component="article-card"><img src="assets/${a.img}" alt="" width="320" height="180" loading="lazy"><div><p class="muted">${a.cat} · ${a.date}</p><h3>${a.title}</h3><div class="article-body" id="body-${a.id}" hidden>${a.text.map((p) => '<p>' + p + '</p>').join('')}</div><button type="button" class="disclosure btn btn-quiet" aria-expanded="false" aria-controls="body-${a.id}" data-more>Read article<span class="visually-hidden">: ${a.title}</span></button></div></li>`).join('');
    $('#bl-status').textContent = rows.length + ' sample articles shown.';
    const h = location.hash.slice(1);
    if (h && document.getElementById(h) && /^a-/.test(h)) { const b = $('[data-more]', document.getElementById(h)); if (b && b.getAttribute('aria-expanded') === 'false') b.click(); document.getElementById(h).scrollIntoView(); }
  };

  // ---------- page-specific wiring (runs once) ----------
  const wire = {};

  wire.hourly = () => { $('#hr-day').addEventListener('change', render); $('#hr-wet').addEventListener('change', render); };
  wire.forecast = () => {
    $('#fc-all').addEventListener('click', (e) => {
      const open = e.currentTarget.getAttribute('aria-expanded') !== 'true';
      $$('.acc-btn').forEach((b) => { b.setAttribute('aria-expanded', String(open)); document.getElementById(b.getAttribute('aria-controls')).hidden = !open; });
      e.currentTarget.setAttribute('aria-expanded', String(open));
      e.currentTarget.textContent = open ? 'Collapse all' : 'Expand all';
    });
  };
  wire.history = () => {
    const sel = $('#hs-loc');
    LOCS.forEach((l) => sel.append(el('option', { value: l.id, text: locName(l) })));
    sel.value = findLoc(locId) ? locId : DEFAULT_LOC;
    tabLinks(findLoc(sel.value));
    $('#hs-date').value = dateAdd(SAMPLE_DATE, -7);
    const form = $('#hs-form');
    wireForm(form, [
      { name: 'loc', label: 'Location', check: (v) => (v ? '' : 'Choose a location.') },
      { name: 'date', label: 'Date', check: (v) => (!v ? 'Enter a date (YYYY-MM-DD).' : !/^\d{4}-\d{2}-\d{2}$/.test(v) || isNaN(new Date(v)) ? 'Enter a valid date.' : v < '2026-01-01' || v > SAMPLE_DATE ? 'Choose a date between 2026-01-01 and ' + SAMPLE_DATE + ' (the sample window).' : '') }
    ], () => { render(); $('#hs-out-h').focus(); });
  };
  wire.hurricane = () => {
    $('#hu-basin').addEventListener('change', render);
    $('#hu-status').addEventListener('change', render);
    $('#hu-body').addEventListener('click', (e) => {
      const b = e.target.closest('[data-storm]');
      if (!b) return;
      const s = STORMS.find((x) => x.id === b.dataset.storm);
      openDialog(s.name, el('div', {}, el('img', { src: 'assets/storm-cone.svg', alt: 'Placeholder track-and-cone graphic. Not a real forecast track.', width: '480', height: '300' }), el('p', { text: s.where + '. Movement: ' + s.move + '.' }), el('p', { class: 'demo-note', text: s.note + ' Fictional storm; no real advisory.' })), b, 'storm-dialog');
    });
  };
  wire.maps = () => {
    const c = params.get('cat');
    if (c && Array.from($('#mp-cat').options).some((o) => o.value === c)) $('#mp-cat').value = c;
    $('#mp-cat').addEventListener('change', render);
    $('#mp-q').addEventListener('input', render);
    $('#mp-reset').addEventListener('click', () => { $('#mp-cat').value = 'all'; $('#mp-q').value = ''; render(); $('#mp-q').focus(); });
  };
  wire.video = () => {
    $('#vd-topic').addEventListener('change', render);
    $('#vd-list').addEventListener('click', (e) => {
      const b = e.target.closest('[data-video]');
      if (!b) return;
      const v = VIDEOS.find((x) => x.id === b.dataset.video);
      openDialog(v.title, el('div', {}, el('img', { src: 'assets/video-poster.svg', alt: 'Placeholder video frame', width: '480', height: '270' }), el('p', { class: 'demo-note', text: 'Demo only: no video file ships with this replica, so nothing plays.' })), b, 'video-dialog');
    });
  };
  wire.stations = () => {
    ['#st-region', '#st-sort'].forEach((s) => $(s).addEventListener('change', render));
    $('#st-q').addEventListener('input', render);
    wireForm($('#connect-form'), [
      { name: 'sname', label: 'Station name', check: (v) => (v ? '' : 'Enter a name for your station.') },
      { name: 'email', label: 'Email address', check: (v) => (!v ? 'Enter your email address.' : EMAIL.test(v) ? '' : 'Enter an email like name@example.com.') },
      { name: 'model', label: 'Station model', check: (v) => (v ? '' : 'Choose a station model.') },
      { name: 'zip', label: 'ZIP code', check: (v) => (/^\d{5}$/.test(v) ? '' : 'Enter a 5-digit ZIP code.') },
      { name: 'agree', label: 'Demo notice', check: (v) => (v ? '' : 'Confirm that you understand this is a demo.') }
    ], (f) => demoSuccess(f, 'Demo only: station registration simulated. Nothing was sent or saved.'));
  };
  wire.blog = () => {
    $('#bl-filter').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('#bl-filter button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      render();
    });
  };
  wire.prepare = () => {
    const saved = store.get('checklist', []), box = $('#pp-list');
    box.innerHTML = CHECKLIST.map((t, i) => `<li><input type="checkbox" id="pp-${i}" ${saved.includes(i) ? 'checked' : ''}><label for="pp-${i}">${t}</label></li>`).join('');
    const upd = () => { const n = $$('input:checked', box).length; $('#pp-progress').textContent = n + ' of ' + CHECKLIST.length + ' items ready.'; store.set('checklist', $$('input', box).map((x, i) => (x.checked ? i : -1)).filter((i) => i >= 0)); };
    box.addEventListener('change', upd);
    $('#pp-reset').addEventListener('click', () => { $$('input', box).forEach((x) => { x.checked = false; }); upd(); say('Checklist cleared.'); });
    upd();
    $('#pp-hazard').addEventListener('change', (e) => {
      const t = HAZARDS[e.target.value];
      $('#pp-tips').innerHTML = t ? t.map((x) => '<li>' + x + '</li>').join('') : '<li class="empty">Choose a hazard to see sample tips.</li>';
    });
  };
  wire.about = () => {
    wireForm($('#feedback-form'), [
      { name: 'name', label: 'Your name', check: (v) => (v ? '' : 'Enter your name.') },
      { name: 'email', label: 'Email address', check: (v) => (!v ? 'Enter your email address.' : EMAIL.test(v) ? '' : 'Enter an email like name@example.com.') },
      { name: 'topic', label: 'Topic', check: (v) => (v ? '' : 'Choose a topic.') },
      { name: 'message', label: 'Message', check: (v) => (v.length < 10 ? 'Write at least 10 characters.' : '') }
    ], (f) => demoSuccess(f, 'Demo only: your message was not sent anywhere.'));
  };
  wire.radar = () => {
    const stage = $('#rd-stage'), frame = $('#rd-frame'), label = $('#rd-label'), play = $('#rd-play'), st = $('#rd-status');
    const layers = { radar: 'Radar', satellite: 'Satellite', temperature: 'Temperature' };
    const l = findLoc(locId) || findLoc(DEFAULT_LOC);
    $('#rd-loc').textContent = locName(l);
    tabLinks(l);
    const want = params.get('layer');
    if (layers[want]) $('#rd-layer-' + want).checked = true;
    let timer = null;
    function draw() {
      const layer = $('input[name="layer"]:checked').value, i = +frame.value;
      stage.dataset.layer = layer;
      stage.style.setProperty('--shift', i * 14 + 'px');
      label.textContent = layers[layer] + ' placeholder, sample frame ' + (i + 1) + ' of 6';
      frame.setAttribute('aria-valuetext', 'Frame ' + (i + 1) + ' of 6');
    }
    function stop() { clearInterval(timer); timer = null; play.textContent = 'Play loop'; play.setAttribute('aria-pressed', 'false'); }
    play.addEventListener('click', () => {
      if (timer) { stop(); st.textContent = 'Loop paused.'; return; }
      play.textContent = 'Pause loop'; play.setAttribute('aria-pressed', 'true'); st.textContent = 'Loop playing (sample frames).';
      timer = setInterval(() => { frame.value = (+frame.value + 1) % 6; draw(); }, 900);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && timer) { stop(); st.textContent = 'Loop paused.'; } });
    frame.addEventListener('input', draw);
    $$('input[name="layer"]').forEach((r) => r.addEventListener('change', draw));
    draw();
  };

  // ---------- boot ----------
  function render() {
    if (pages[page]) pages[page]();
    // scrollable table wrappers must be keyboard reachable
    $$('.table-wrap').forEach((w) => { const c = $('caption', w); w.tabIndex = 0; w.setAttribute('role', 'region'); w.setAttribute('aria-label', (c ? c.textContent : 'Table') + ' (scrollable)'); });
  }
  const page = document.body.dataset.page;
  initChrome();
  if (wire[page]) wire[page]();
  render();
})();
