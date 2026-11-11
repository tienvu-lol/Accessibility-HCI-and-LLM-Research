/* Cathedral of Saint Aurelian (fictional) - shared behaviour. Vanilla JS; all data is inline so every page works from file://. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  function h(tag, attrs) {
    const el = document.createElement(tag);
    Object.keys(attrs || {}).forEach((k) => (k === 'text' ? (el.textContent = attrs[k]) : el.setAttribute(k, attrs[k])));
    for (let i = 2; i < arguments.length; i++) if (arguments[i]) el.append(arguments[i]);
    return el;
  }
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parseIso = (s) => new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
  const longDate = (d) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const monthLabel = (d) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  function clock(t) {
    const hh = +t.slice(0, 2);
    return (hh % 12 || 12) + ':' + t.slice(3) + (hh < 12 ? ' am' : ' pm');
  }
  const money = (n) => '$' + n.toFixed(2).replace(/\.00$/, '');
  const today = new Date();

  /* ---------- sample data (fictional) ---------- */
  const WINDOW_START = new Date(2026, 10, 1);
  const WINDOW_END = new Date(2027, 5, 30);
  const TYPE_LABELS = { worship: 'Worship', music: 'Music', tours: 'Tours', talks: 'Talks and arts', family: 'Family' };
  const WEEKLY = [
    { title: 'Daily Eucharist', days: [1, 2, 3, 4, 5], time: '12:15', type: 'worship', place: 'Lady Chapel', desc: 'A said midday Eucharist of about thirty minutes. Everyone is welcome to receive.' },
    { title: 'Online Morning Prayer', days: [1, 2, 3, 4, 5, 6], time: '08:30', type: 'worship', place: 'Online (demo listing, no stream)', desc: 'Morning Prayer led from the Lady Chapel. In this demo no live stream exists; see Watch and Listen for sample archive entries.' },
    { title: 'Early Eucharist', days: [0], time: '08:00', type: 'worship', place: 'Lady Chapel', desc: 'A quiet said Eucharist without music.' },
    { title: 'Holy Eucharist', days: [0], time: '11:00', type: 'worship', place: 'Nave', desc: 'The principal Sunday service with choir, procession and a sermon from the Dean or a guest preacher.' },
    { title: 'Choral Evensong', days: [4], time: '17:30', type: 'music', place: 'Choir', desc: 'Sung evening prayer by the Aurelian Choir of Men and Boys, Thursdays through the season.' },
    { title: 'Public Guided Tour', days: [2, 3, 4, 5, 6], time: '11:00', type: 'tours', place: 'Meet at the Welcome Desk', desc: 'A 60-minute docent-led walk through the nave, chapels and cloister.' },
    { title: 'Public Guided Tour', days: [2, 3, 4, 5, 6], time: '14:00', type: 'tours', place: 'Meet at the Welcome Desk', desc: 'A 60-minute docent-led walk through the nave, chapels and cloister.' }
  ];
  const SPECIAL = [
    ['2026-11-15', '16:00', 'Organ Recital: Autumn Voluntaries', 'music', 'Nave', 'Our Cathedral Organist plays voluntaries from three centuries on the great organ.'],
    ['2026-11-22', '11:00', 'Feast of Christ the King', 'worship', 'Nave', 'Festal Eucharist closing the liturgical year, with full choir and brass.'],
    ['2026-11-28', '10:00', 'Wreath-Making Workshop', 'family', 'Cloister Hall', 'Families make Advent wreaths from greenery cut in the Cathedral gardens. Materials provided.'],
    ['2026-12-06', '16:00', 'Advent Procession', 'music', 'Nave', 'A candlelit procession with readings and choral music that moves through the whole building.'],
    ['2026-12-20', '19:00', 'Winter Solstice Concert', 'music', 'Nave', 'A concert of ancient and new music for choir, cello and handbells.'],
    ['2026-12-24', '22:00', 'Christmas Eve Vigil', 'worship', 'Nave', 'Carols followed by a festal Eucharist at the stroke of midnight.'],
    ['2026-12-25', '11:00', 'Christmas Day Eucharist', 'worship', 'Nave', 'A joyful morning Eucharist with congregational carols.'],
    ['2027-01-23', '15:00', 'Talk: Light in Medieval Glass', 'talks', 'Cloister Hall', 'A visiting art historian explains how stained glass was designed to be read, with slides.'],
    ['2027-02-10', '19:00', 'Ash Wednesday Liturgy', 'worship', 'Nave', 'The imposition of ashes and a sung Eucharist.'],
    ['2027-02-27', '10:30', 'Family Stone-Carving Morning', 'family', 'Masons’ Yard', 'Children aged 8 and up try soft stone under the guidance of the Cathedral masons.'],
    ['2027-03-21', '11:00', 'Palm Sunday Procession', 'worship', 'Cloister and Nave', 'The procession begins in the cloister garden and enters the nave in song.'],
    ['2027-03-25', '19:00', 'Tenebrae', 'music', 'Choir', 'Psalms and lamentations as the candles are extinguished one by one.'],
    ['2027-03-28', '11:00', 'Easter Day Festal Eucharist', 'worship', 'Nave', 'The principal service of the year, with brass, timpani and full choir.'],
    ['2027-04-17', '14:00', 'Talk: Preserving a Roof of Oak', 'talks', 'Cloister Hall', 'The Cathedral’s surveyor describes a decade of roof conservation.'],
    ['2027-05-08', '19:30', 'Spring Choral Concert', 'music', 'Nave', 'The Aurelian Singers and Youth Chorale share a programme of English and American anthems.'],
    ['2027-06-12', '10:00', 'Garden Open Morning', 'family', 'Bishop’s Garden', 'The walled garden opens for a free morning of music, tea and guided plant walks.']
  ];
  const EVENTS = (function () {
    const list = [];
    for (let d = new Date(WINDOW_START); d <= WINDOW_END; d.setDate(d.getDate() + 1)) {
      WEEKLY.forEach((w) => w.days.indexOf(d.getDay()) > -1 && list.push({ date: iso(d), time: w.time, title: w.title, type: w.type, place: w.place, desc: w.desc, special: false }));
    }
    SPECIAL.forEach((s) => list.push({ date: s[0], time: s[1], title: s[2], type: s[3], place: s[4], desc: s[5], special: true }));
    list.sort((a, b) => (a.date + a.time < b.date + b.time ? -1 : 1));
    return list;
  })();

  const MEDIA = [
    { title: 'Sermon: The Stones Cry Out', kind: 'Video', date: '2026-11-08', length: '18 min', series: 'Worship', desc: 'A Sunday sermon on memory and the built environment, filmed in the nave.' },
    { title: 'Choral Evensong for All Souls', kind: 'Audio', date: '2026-11-05', length: '42 min', series: 'Music', desc: 'Sung evensong with Duruflé-style motets by the Aurelian Choir.' },
    { title: 'Holy Eucharist, Twenty-Fourth Sunday after Pentecost', kind: 'Livestream', date: '2026-11-01', length: '1 hr 10 min', series: 'Worship', desc: 'Archive of the Sunday liturgy as originally webcast (sample entry).' },
    { title: 'Organ Recital: The Great Organ at Dusk', kind: 'Video', date: '2026-10-18', length: '55 min', series: 'Music', desc: 'Recital recorded with a camera in the organ loft.' },
    { title: 'Lecture: Who Built the Cathedral?', kind: 'Video', date: '2026-10-10', length: '47 min', series: 'Talks', desc: 'The head mason traces the trades behind the medieval and modern building campaigns.' },
    { title: 'Morning Prayer Podcast, Season 3', kind: 'Audio', date: '2026-09-29', length: '12 min', series: 'Worship', desc: 'Short spoken reflections recorded in the Lady Chapel.' },
    { title: 'Blessing of the Animals', kind: 'Livestream', date: '2026-10-04', length: '1 hr 5 min', series: 'Worship', desc: 'Archive of the annual outdoor blessing, with dogs, a tortoise and one very calm alpaca.' },
    { title: 'Talk: The Rose Window Restored', kind: 'Video', date: '2026-09-12', length: '38 min', series: 'Talks', desc: 'Conservators explain the removal, cleaning and replacement of the west rose window.' },
    { title: 'Summer Evensong: Bells and Voices', kind: 'Audio', date: '2026-07-16', length: '36 min', series: 'Music', desc: 'Evensong with a change-ringing peal from the tower.' },
    { title: 'Easter Day Festal Eucharist 2026', kind: 'Video', date: '2026-04-05', length: '1 hr 25 min', series: 'Worship', desc: 'Last year’s Easter liturgy with brass and timpani.' },
    { title: 'Youth Chorale Spring Concert', kind: 'Video', date: '2026-05-09', length: '50 min', series: 'Music', desc: 'Young singers perform a programme of folk-song settings.' },
    { title: 'Lecture: Prayer in Public Space', kind: 'Audio', date: '2026-03-14', length: '51 min', series: 'Talks', desc: 'A panel discussion recorded in the Cloister Hall.' }
  ];

  const PAGES = [
    ['Home', 'index.html', 'Welcome, hours and admission, Sunday services and upcoming events.'],
    ['About the Cathedral', 'about.html', 'History, mission, space rentals and the columbarium of the Cathedral of Saint Aurelian.'],
    ['Leadership', 'leadership.html', 'Trustees, senior staff and clergy leadership.'],
    ['Plan Your Visit', 'visit.html', 'Hours, admission prices, timed ticket demo, accessibility on site and FAQs.'],
    ['Public Guided Tours', 'tours.html', 'Docent-led tours, school and youth programmes, tour reservation demo.'],
    ['Services', 'services.html', 'Sunday and weekday services, holy days and pastoral care.'],
    ['Dean & Clergy', 'dean-clergy.html', 'The Dean, canons and clergy of the Cathedral.'],
    ['Music', 'music.html', 'Concerts, organ recitals and music at the Cathedral.'],
    ['Choral Ensembles', 'choral-ensembles.html', 'The Aurelian Choir, Singers and Youth Chorale: rehearsal times and who sings.'],
    ['Calendar', 'calendar.html', 'Filterable calendar of services, concerts, tours and talks.'],
    ['Watch & Listen', 'watch-listen.html', 'Archive of sermons, recordings and talks with search and filters.'],
    ['Donate', 'donate.html', 'Support the Cathedral (simulated giving form).'],
    ['Volunteer', 'volunteer.html', 'Volunteer roles with filter and a demo interest form.'],
    ['Search', 'search.html', 'Search the pages, events and recordings of this site.']
  ];

  /* ---------- dialog ---------- */
  function openDialog(title, nodes, opener) {
    const dlg = h('dialog', { class: 'dialog', 'aria-labelledby': 'dialog-title' });
    const close = h('button', { type: 'button', class: 'btn btn-secondary', text: 'Close' });
    dlg.append(h('h2', { id: 'dialog-title', text: title }), ...nodes, h('p', {}, close));
    document.body.append(dlg);
    close.addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => e.target === dlg && dlg.close());
    dlg.addEventListener('close', () => { dlg.remove(); if (opener) opener.focus(); });
    dlg.showModal();
  }

  /* ---------- today ---------- */
  $$('[data-today]').forEach((el) => (el.textContent = longDate(today)));

  /* ---------- primary navigation ---------- */
  const nav = $('[data-component="primary-nav"]');
  const toggle = $('.nav-toggle');
  function closeMenus(except) {
    $$('.nav-button[aria-expanded="true"]', nav).forEach((b) => {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      document.getElementById(b.getAttribute('aria-controls')).classList.remove('is-open');
    });
  }
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      if (!open) closeMenus();
    });
    $$('.nav-button', nav).forEach((b) => b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') !== 'true';
      closeMenus(b);
      b.setAttribute('aria-expanded', String(open));
      document.getElementById(b.getAttribute('aria-controls')).classList.toggle('is-open', open);
    }));
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || document.querySelector('dialog[open]')) return;
      const openButton = $('.nav-button[aria-expanded="true"]', nav);
      const focusInside = nav.contains(document.activeElement);
      if (openButton) {
        closeMenus();
        if (focusInside) openButton.focus();
      } else if (toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') {
        toggle.click();
        toggle.focus();
      }
    });
    document.addEventListener('click', (e) => !nav.contains(e.target) && closeMenus());
    nav.addEventListener('focusout', (e) => e.relatedTarget && !nav.contains(e.relatedTarget) && closeMenus());
  }

  /* ---------- accordion ---------- */
  $$('.accordion button[aria-controls]').forEach((b) => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
  }));

  /* ---------- tabs ---------- */
  $$('[data-component="tabs"]').forEach((box) => {
    const tabs = $$('[role="tab"]', box);
    function select(tab, focus) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        select(tabs[(to + tabs.length) % tabs.length], true);
      });
    });
  });

  /* ---------- static filter lists (leadership, volunteer roles) ---------- */
  $$('[data-component="filter-list"]').forEach((box) => {
    const text = $('[data-filter-text]', box);
    const select = $('[data-filter-key]', box);
    const items = $$('[data-filter-item]', box);
    const status = $('[data-filter-status]', box);
    const empty = $('[data-filter-empty]', box);
    function apply() {
      const q = text.value.trim().toLowerCase();
      const key = select.getAttribute('data-filter-key');
      let shown = 0;
      items.forEach((it) => {
        const ok = (!select.value || it.getAttribute('data-' + key) === select.value) && (!q || it.textContent.toLowerCase().indexOf(q) > -1);
        it.hidden = !ok;
        if (ok) shown++;
      });
      empty.hidden = shown > 0;
      status.textContent = shown + ' of ' + items.length + ' shown.';
    }
    $('form', box).addEventListener('submit', (e) => { e.preventDefault(); apply(); });
    text.addEventListener('input', apply);
    select.addEventListener('change', apply);
    $('[data-filter-reset]', box).addEventListener('click', () => { text.value = ''; select.value = ''; apply(); text.focus(); });
    apply();
  });

  /* ---------- home: next events ---------- */
  const upcoming = $('[data-upcoming]');
  if (upcoming) {
    const now = today >= WINDOW_START && today <= WINDOW_END ? today : WINDOW_START;
    const stamp = iso(now) + pad(now.getHours()) + ':' + pad(now.getMinutes());
    const seen = {};
    EVENTS.filter((e) => e.date + e.time >= stamp).forEach((e) => {
      if (Object.keys(seen).length >= 4 || seen[e.title]) return;
      seen[e.title] = 1;
      upcoming.append(h('li', { class: 'card' },
        h('p', { class: 'meta', text: longDate(parseIso(e.date)) + ', ' + clock(e.time) }),
        h('h3', { text: e.title }),
        h('p', { text: e.place }),
        h('p', {}, h('a', { href: 'calendar.html', text: 'See in the calendar' }))));
    });
    if (!Object.keys(seen).length) upcoming.append(h('li', { class: 'empty-state', text: 'No upcoming sample events remain in the demo calendar window.' }));
  }

  /* ---------- calendar ---------- */
  const calendar = $('[data-component="event-calendar"]');
  if (calendar) {
    const f = { month: $('#cal-month'), type: $('#cal-type'), q: $('#cal-q') };
    const out = $('[data-calendar-results]');
    const status = $('[data-calendar-status]');
    const more = $('[data-calendar-more]');
    const PAGE = 20;
    let shown = PAGE;
    for (let d = new Date(WINDOW_START); d <= WINDOW_END; d.setMonth(d.getMonth() + 1)) f.month.append(h('option', { value: d.getFullYear() + '-' + pad(d.getMonth() + 1), text: monthLabel(d) }));
    Object.keys(TYPE_LABELS).forEach((k) => f.type.append(h('option', { value: k, text: TYPE_LABELS[k] })));
    const startMonth = iso(today >= WINDOW_START && today <= WINDOW_END ? today : WINDOW_START).slice(0, 7);
    f.month.value = startMonth;
    function render() {
      const q = f.q.value.trim().toLowerCase();
      const hits = EVENTS.filter((e) => (!f.month.value || e.date.slice(0, 7) === f.month.value) && (!f.type.value || e.type === f.type.value) && (!q || (e.title + ' ' + e.place + ' ' + e.desc).toLowerCase().indexOf(q) > -1));
      out.textContent = '';
      let lastDate = '';
      let list;
      hits.slice(0, shown).forEach((e) => {
        if (e.date !== lastDate) {
          lastDate = e.date;
          out.append(h('h3', { class: 'event-date', text: longDate(parseIso(e.date)) }));
          list = h('ul', { class: 'event-list' });
          out.append(list);
        }
        const btn = h('button', { type: 'button', class: 'btn btn-secondary', text: 'Details' });
        btn.setAttribute('aria-label', 'Details for ' + e.title + ', ' + clock(e.time));
        btn.addEventListener('click', () => openDialog(e.title, [
          h('p', { class: 'meta', text: longDate(parseIso(e.date)) + ', ' + clock(e.time) + ' · ' + e.place }),
          h('p', { text: e.desc }),
          h('p', { class: 'demo-note', text: 'Demo: this is fictional sample data. No registration or tickets are attached to this listing.' })], btn));
        list.append(h('li', {},
          h('h4', { text: clock(e.time) + ' · ' + e.title }),
          h('p', { class: 'meta' }, h('span', { class: 'tag', text: TYPE_LABELS[e.type] }), ' ' + e.place),
          h('p', {}, btn)));
      });
      if (!hits.length) out.append(h('div', { class: 'empty-state' }, h('p', { text: 'No events match these filters.' }), h('p', {}, 'Try another month, choose “All types”, or clear the search words.')));
      status.textContent = hits.length ? 'Showing ' + Math.min(shown, hits.length) + ' of ' + hits.length + ' events.' : '0 events found.';
      more.hidden = hits.length <= shown;
    }
    [f.month, f.type].forEach((el) => el.addEventListener('change', () => { shown = PAGE; render(); }));
    f.q.addEventListener('input', () => { shown = PAGE; render(); });
    $('form', calendar).addEventListener('submit', (e) => { e.preventDefault(); shown = PAGE; render(); });
    $('[data-calendar-reset]', calendar).addEventListener('click', () => { f.month.value = startMonth; f.type.value = ''; f.q.value = ''; shown = PAGE; render(); f.month.focus(); });
    more.addEventListener('click', () => { shown += PAGE; render(); });
    render();
  }

  /* ---------- watch and listen ---------- */
  const archive = $('[data-component="media-archive"]');
  if (archive) {
    const q = $('#media-q'), kind = $('#media-kind'), series = $('#media-series'), sort = $('#media-sort');
    const out = $('[data-media-results]'), status = $('[data-media-status]');
    function render() {
      const term = q.value.trim().toLowerCase();
      const hits = MEDIA.filter((m) => (!kind.value || m.kind === kind.value) && (!series.value || m.series === series.value) && (!term || (m.title + ' ' + m.desc).toLowerCase().indexOf(term) > -1));
      hits.sort((a, b) => ({ newest: b.date.localeCompare(a.date), oldest: a.date.localeCompare(b.date), title: a.title.localeCompare(b.title) })[sort.value]);
      out.textContent = '';
      hits.forEach((m) => {
        const btn = h('button', { type: 'button', class: 'btn btn-secondary', text: 'Open player' });
        btn.setAttribute('aria-label', 'Open player for ' + m.title);
        btn.addEventListener('click', () => openDialog(m.title, [
          h('img', { src: 'assets/media-placeholder.svg', alt: '' }),
          h('p', { class: 'meta', text: m.kind + ' · ' + m.series + ' · ' + longDate(parseIso(m.date)) + ' · ' + m.length }),
          h('p', { text: m.desc }),
          h('p', { class: 'demo-note', text: 'Demo: no audio or video file is included. A real player would load here.' })], btn));
        out.append(h('li', {},
          h('h3', { text: m.title }),
          h('p', { class: 'meta' }, h('span', { class: 'tag', text: m.kind }), ' ' + m.series + ' · ' + longDate(parseIso(m.date)) + ' · ' + m.length),
          h('p', { text: m.desc }),
          h('p', {}, btn)));
      });
      if (!hits.length) out.append(h('li', { class: 'empty-state', text: 'No recordings match. Clear a filter or try different words.' }));
      status.textContent = hits.length + (hits.length === 1 ? ' recording' : ' recordings') + ' found.';
    }
    [q, kind, series, sort].forEach((el) => el.addEventListener(el === q ? 'input' : 'change', render));
    $('form', archive).addEventListener('submit', (e) => { e.preventDefault(); render(); });
    $('[data-media-reset]', archive).addEventListener('click', () => { q.value = ''; kind.value = ''; series.value = ''; sort.value = 'newest'; render(); q.focus(); });
    render();
  }

  /* ---------- site search ---------- */
  const searchBox = $('[data-component="site-search"]');
  if (searchBox) {
    const term = (new URLSearchParams(location.search).get('q') || '').trim();
    const input = $('#site-q'), out = $('[data-search-results]'), status = $('[data-search-status]');
    input.value = term;
    if (!term) {
      status.textContent = 'Enter a word to search pages, events and recordings.';
    } else {
      const words = term.toLowerCase().split(/\s+/);
      const seenEvent = {};
      const pool = PAGES.map((p) => ({ kind: 'Page', title: p[0], href: p[1], text: p[2] }))
        .concat(EVENTS.filter((e) => e.special || (!seenEvent[e.title] && (seenEvent[e.title] = 1))).map((e) => ({ kind: 'Event', title: e.title, href: 'calendar.html', text: (e.special ? longDate(parseIso(e.date)) + '. ' : 'Recurring. ') + e.desc })))
        .concat(MEDIA.map((m) => ({ kind: m.kind, title: m.title, href: 'watch-listen.html', text: m.desc })));
      const hits = pool.filter((r) => words.every((w) => (r.title + ' ' + r.text).toLowerCase().indexOf(w) > -1));
      hits.forEach((r) => out.append(h('li', {},
        h('h3', {}, h('a', { href: r.href, text: r.title })),
        h('p', { class: 'meta' }, h('span', { class: 'tag', text: r.kind })),
        h('p', { text: r.text }))));
      status.textContent = hits.length ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for “' + term + '”.' : '';
      if (!hits.length) out.append(h('li', { class: 'empty-state', text: 'No results for “' + term + '”. Try a shorter word such as “choir”, “tour” or “parking”.' }));
    }
  }

  /* ---------- form validation (all forms are demos) ---------- */
  function fieldLabel(el) {
    const src = el.type === 'radio' ? el.closest('fieldset').querySelector('legend') : el.labels[0];
    const c = src.cloneNode(true);
    $$('.hint,.req', c).forEach((n) => n.remove());
    return c.textContent.trim();
  }
  function nativeMessage(el) {
    const v = el.validity, name = fieldLabel(el);
    if (v.valueMissing) return (el.tagName === 'SELECT' || el.type === 'radio' ? 'Choose ' : 'Enter ') + name.toLowerCase() + '.';
    if (v.typeMismatch) return 'Enter a valid ' + name.toLowerCase() + ', for example name@example.org.';
    if (v.rangeUnderflow || v.rangeOverflow) return name + ' must be between ' + el.min + ' and ' + el.max + '.';
    if (v.badInput || v.stepMismatch) return name + ' must be a whole number.';
    return name + ' is not valid.';
  }
  const hooks = {
    tickets(form) {
      const e = [];
      const total = $$('input[type="number"]', form).reduce((s, i) => s + (+i.value || 0), 0);
      if (!total) e.push([$('#t-adults'), 'Choose at least one ticket.']);
      const d = form.elements.date.value && parseIso(form.elements.date.value);
      if (d && d.getDay() === 0 && form.elements.slot.value && form.elements.slot.value < '13:00') e.push([form.elements.slot, 'On Sundays visiting begins at 1:00 pm. Choose a later time.']);
      return e;
    },
    tour(form) {
      const d = form.elements.date.value && parseIso(form.elements.date.value);
      return d && (d.getDay() === 0 || d.getDay() === 1) ? [[form.elements.date, 'Public tours run Tuesday to Saturday. Choose another date.']] : [];
    },
    donate(form) {
      if (form.elements.amount.value !== 'other') return [];
      const c = form.elements.custom, n = +c.value;
      return !c.value || !(n >= 5 && n <= 10000) ? [[c, 'Enter an amount between $5 and $10,000.']] : [];
    }
  };
  function validate(form) {
    $$('.field-error', form).forEach((n) => n.remove());
    $$('[aria-invalid]', form).forEach((n) => { n.removeAttribute('aria-invalid'); n.removeAttribute('aria-describedby'); });
    const old = $('.error-summary', form);
    if (old) old.remove();
    const errors = [];
    const radios = {};
    Array.from(form.elements).forEach((el) => {
      if (!el.name || el.disabled || el.type === 'submit' || el.type === 'button') return;
      if (el.type === 'radio') {
        if (radios[el.name]) return;
        radios[el.name] = 1;
      }
      if (!el.checkValidity()) errors.push([el, nativeMessage(el)]);
    });
    if (hooks[form.dataset.validate]) hooks[form.dataset.validate](form).forEach((x) => !errors.some((y) => y[0] === x[0]) && errors.push(x));
    errors.forEach((x, i) => {
      const el = x[0];
      if (!el.id) el.id = form.id + '-f' + i;
      const err = h('p', { class: 'field-error', id: el.id + '-error', text: x[1] });
      (el.closest('fieldset') || el.closest('.field') || el.parentNode).append(err);
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', err.id);
      x.push(err);
    });
    return errors;
  }
  $$('form[data-validate]').forEach((form) => {
    form.noValidate = true;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.parentNode.querySelector('[data-form-success]');
      if (success) success.hidden = true;
      const errors = validate(form);
      if (errors.length) {
        const list = h('ul');
        errors.forEach((x) => {
          const a = h('a', { href: '#' + x[0].id, text: x[1] });
          a.addEventListener('click', (ev) => { ev.preventDefault(); x[0].focus(); });
          list.append(h('li', {}, a));
        });
        const box = h('div', { class: 'error-summary', tabindex: '-1', 'aria-labelledby': form.id + '-summary-title' },
          h('h2', { id: form.id + '-summary-title', text: errors.length === 1 ? 'There is 1 problem' : 'There are ' + errors.length + ' problems' }), list);
        form.prepend(box);
        box.focus();
        return;
      }
      const note = $('[data-success-detail]', form.parentNode);
      if (note && form.dataset.validate === 'tickets') note.textContent = ' ' + $('[data-ticket-total]', form).textContent;
      if (note && form.dataset.validate === 'donate') note.textContent = ' ' + $('[data-gift-summary]', form).textContent;
      form.reset();
      if (form.dataset.validate === 'tickets') updateTotal();
      if (form.dataset.validate === 'donate') updateGift();
      if (success) { success.hidden = false; success.focus(); }
    });
  });

  /* ---------- ticket demo ---------- */
  const ticketForm = $('form[data-validate="tickets"]');
  const PRICES = { adults: 12, seniors: 10, children: 0 };
  function updateTotal() {
    const f = ticketForm.elements;
    const total = Object.keys(PRICES).reduce((s, k) => s + (+f[k].value || 0) * PRICES[k], 0);
    $('[data-ticket-total]', ticketForm).textContent = 'Estimated total: ' + money(total) + ' (demo prices)';
  }
  if (ticketForm) {
    ticketForm.addEventListener('input', updateTotal);
    ticketForm.elements.date.min = iso(today);
    updateTotal();
  }
  const tourForm = $('form[data-validate="tour"]');
  if (tourForm) tourForm.elements.date.min = iso(today);

  /* ---------- donate demo ---------- */
  const donateForm = $('form[data-validate="donate"]');
  function updateGift() {
    const f = donateForm.elements;
    const amt = f.amount.value === 'other' ? +f.custom.value : +f.amount.value;
    const freq = f.frequency.value === 'monthly' ? 'monthly' : 'one-time';
    $('[data-gift-summary]', donateForm).textContent = amt > 0 ? 'Gift summary: ' + money(amt) + ' ' + freq + ' (demo, nothing is charged)' : 'Gift summary: choose an amount.';
  }
  if (donateForm) {
    donateForm.addEventListener('input', updateGift);
    donateForm.elements.custom.addEventListener('focus', () => (donateForm.elements.amount.value = 'other'));
    updateGift();
  }

  /* ---------- copy link ---------- */
  $$('[data-copy-link]').forEach((b) => b.addEventListener('click', () => {
    const msg = $('[data-copy-status]');
    const fail = () => (msg.textContent = 'Copying is unavailable here. Address: ' + location.href);
    if (!navigator.clipboard) return fail();
    navigator.clipboard.writeText(location.href).then(() => (msg.textContent = 'Page address copied.'), fail);
  }));
})();
