/* Marrowvale Portal (fictional). Vanilla JS, local data only. No network use. */
(function () {
  'use strict';
  const CATS=[{"id":"permits","label":"Permits & Passes"},{"id":"markets","label":"Makers & Markets"},{"id":"community","label":"Community & Learning"},{"id":"parks","label":"Parks & Heritage"},{"id":"govinfo","label":"Government Information"}];
const SECTORS=[{"id":"culture","label":"Culture & Heritage"},{"id":"environment","label":"Land & Environment"},{"id":"commerce","label":"Trade & Makers"},{"id":"community","label":"Community & Learning"},{"id":"admin","label":"Administration"}];
const AGENCIES=[{"id":"a01","name":"Department of Orchard and Hillside Affairs","sector":"environment","desc":"An invented department that stewards imaginary orchards, terraces and hillside paths.","phone":"555-0101"},{"id":"a02","name":"Canal and Waterways Board","sector":"environment","desc":"An invented board for imaginary canals, locks and towpaths.","phone":"555-0102"},{"id":"a03","name":"Office of Heritage Trails","sector":"culture","desc":"An invented office that tends fictional walking trails and waymarkers.","phone":"555-0103"},{"id":"a04","name":"Marrowvale Museums Council","sector":"culture","desc":"An invented council coordinating sample museums and exhibitions.","phone":"555-0104"},{"id":"a05","name":"Festival and Lantern Commission","sector":"culture","desc":"An invented commission for sample seasonal festivals.","phone":"555-0105"},{"id":"a06","name":"Small Works Office","sector":"commerce","desc":"An invented office for makers, workshops and craft stalls.","phone":"555-0106"},{"id":"a07","name":"Market Streets Authority","sector":"commerce","desc":"An invented authority for sample open-air markets.","phone":"555-0107"},{"id":"a08","name":"Bureau of Weights and Measures Trivia","sector":"commerce","desc":"An invented bureau that exists only to illustrate a directory entry.","phone":"555-0108"},{"id":"a09","name":"Library and Reading Service","sector":"community","desc":"An invented service running sample reading rooms.","phone":"555-0109"},{"id":"a10","name":"Learning Commons Agency","sector":"community","desc":"An invented agency for imaginary evening classes and study halls.","phone":"555-0110"},{"id":"a11","name":"Office for Community Gardens","sector":"community","desc":"An invented office for shared garden plots in fictional towns.","phone":"555-0111"},{"id":"a12","name":"Youth Orchestra Trust","sector":"community","desc":"An invented trust that supports a sample youth orchestra.","phone":"555-0112"},{"id":"a13","name":"Office of the State Archive Index","sector":"admin","desc":"An invented office holding an index of sample, fictional documents.","phone":"555-0113"},{"id":"a14","name":"Portal Content Office","sector":"admin","desc":"An invented office that maintains the pages of this fictional portal.","phone":"555-0114"},{"id":"a15","name":"Public Notices Desk","sector":"admin","desc":"An invented desk that lists sample, fictional announcements about the fictional portal itself.","phone":"555-0115"},{"id":"a16","name":"Parks and Open Spaces Agency","sector":"environment","desc":"An invented agency for sample parks, meadows and viewpoints.","phone":"555-0116"}];
const SERVICES=[{"id":"s01","name":"Orchard Gleaning Pass","cat":"permits","agency":"a01","summary":"An illustrative pass that would let a fictional visitor wander a sample orchard during an invented season.","provider":"orchard-board.example"},{"id":"s02","name":"Canal Boat Mooring Slot","cat":"permits","agency":"a02","summary":"An illustrative description of a pretend mooring slot beside an invented canal.","provider":"canal-board.example"},{"id":"s03","name":"Kite Field Booking","cat":"permits","agency":"a16","summary":"A sample booking idea for a make-believe kite field on a fictional hill.","provider":"open-spaces.example"},{"id":"s04","name":"Heritage Trail Walking Pass","cat":"permits","agency":"a03","summary":"An illustrative day pass for a sample heritage trail with invented waymarkers.","provider":"heritage-trails.example"},{"id":"s05","name":"Lantern Festival Stall Slot","cat":"permits","agency":"a05","summary":"A pretend stall slot at an invented lantern festival.","provider":"lantern-commission.example"},{"id":"s06","name":"Meadow Picnic Shelter Hire","cat":"permits","agency":"a16","summary":"A sample shelter hire for an imaginary meadow picnic area.","provider":"open-spaces.example"},{"id":"s07","name":"Hillside Beekeeping Corner","cat":"permits","agency":"a01","summary":"An illustrative corner of a fictional hillside set aside for sample hives.","provider":"orchard-board.example"},{"id":"s08","name":"Market Stall Pass","cat":"markets","agency":"a07","summary":"An illustrative stall pass for a sample open-air market in an invented town.","provider":"market-streets.example"},{"id":"s09","name":"Craft Workshop Bench Share","cat":"markets","agency":"a06","summary":"A pretend shared bench in an invented craft workshop.","provider":"small-works.example"},{"id":"s10","name":"Makers Showcase Weekend","cat":"markets","agency":"a06","summary":"A sample showcase event listing for fictional makers.","provider":"small-works.example"},{"id":"s11","name":"Weights and Measures Trivia Quiz","cat":"markets","agency":"a08","summary":"A playful sample entry that exists only to fill a directory.","provider":"measures-trivia.example"},{"id":"s12","name":"Street Food Cart Corner","cat":"markets","agency":"a07","summary":"A pretend corner reserved for sample food carts at an invented market.","provider":"market-streets.example"},{"id":"s13","name":"Maker Mentor Matching","cat":"markets","agency":"a06","summary":"An illustrative matching idea between fictional makers.","provider":"small-works.example"},{"id":"s14","name":"Seasonal Bazaar Calendar","cat":"markets","agency":"a07","summary":"A sample listing of invented bazaar weekends.","provider":"market-streets.example"},{"id":"s15","name":"Reading Room Membership","cat":"community","agency":"a09","summary":"An illustrative membership for a sample reading room.","provider":"reading-service.example"},{"id":"s16","name":"Evening Class Catalogue","cat":"community","agency":"a10","summary":"A pretend catalogue of invented evening classes such as bookbinding and lantern making.","provider":"learning-commons.example"},{"id":"s17","name":"Study Hall Seat Booking","cat":"community","agency":"a10","summary":"A sample seat booking for an imaginary study hall.","provider":"learning-commons.example"},{"id":"s18","name":"Community Garden Plot Waitlist","cat":"community","agency":"a11","summary":"An illustrative waitlist idea for a shared garden plot in a fictional town.","provider":"community-gardens.example"},{"id":"s19","name":"Youth Orchestra Open Rehearsal","cat":"community","agency":"a12","summary":"A sample open rehearsal listing for an invented youth orchestra.","provider":"youth-orchestra.example"},{"id":"s20","name":"Story Hour for Small Readers","cat":"community","agency":"a09","summary":"A pretend story hour in an invented library.","provider":"reading-service.example"},{"id":"s21","name":"Museum Late Opening Listing","cat":"parks","agency":"a04","summary":"An illustrative listing of a sample museum opening on an invented evening.","provider":"museums-council.example"},{"id":"s22","name":"Viewpoint Telescope Rota","cat":"parks","agency":"a16","summary":"A pretend rota for a sample telescope at an invented viewpoint.","provider":"open-spaces.example"},{"id":"s23","name":"Waymarker Adoption Scheme","cat":"parks","agency":"a03","summary":"An illustrative scheme where fictional volunteers would look after a sample waymarker.","provider":"heritage-trails.example"},{"id":"s24","name":"Orchard Blossom Walk","cat":"parks","agency":"a01","summary":"A sample guided walk through an invented orchard.","provider":"orchard-board.example"},{"id":"s25","name":"Lock-Keeper Open Day","cat":"parks","agency":"a02","summary":"A pretend open day at an imaginary canal lock.","provider":"canal-board.example"},{"id":"s26","name":"Archive Index Browser","cat":"govinfo","agency":"a13","summary":"An illustrative description of a browsable index of invented sample documents.","provider":"archive-index.example"},{"id":"s27","name":"Public Notices Listing","cat":"govinfo","agency":"a15","summary":"A sample listing page for invented notices about this fictional portal only.","provider":"notices-desk.example"},{"id":"s28","name":"Portal Feedback Desk","cat":"govinfo","agency":"a14","summary":"An illustrative feedback desk for this fictional portal; the local contact page is a simulation.","provider":"portal-content.example"},{"id":"s29","name":"Agency Directory Overview","cat":"govinfo","agency":"a14","summary":"A description of the directory of invented agencies in this portal.","provider":"portal-content.example"},{"id":"s30","name":"Accessible Formats Library","cat":"govinfo","agency":"a09","summary":"An illustrative library of invented large-print and audio sample items.","provider":"reading-service.example"}];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function param(n) { try { return new URLSearchParams(location.search).get(n) || ''; } catch (e) { return ''; } }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function catLabel(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i].label; return id; }
  function sectorLabel(id) { for (var i = 0; i < SECTORS.length; i++) if (SECTORS[i].id === id) return SECTORS[i].label; return id; }
  function agencyName(id) { for (var i = 0; i < AGENCIES.length; i++) if (AGENCIES[i].id === id) return AGENCIES[i].name; return ''; }

  /* ---------- disclosures ---------- */
  function wire(btnId, panelId) {
    var b = document.getElementById(btnId), p = document.getElementById(panelId);
    if (!b || !p) return;
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open)); p.hidden = open;
    });
  }
  wire('notice-toggle', 'notice-more');
  wire('lang-toggle', 'lang-panel');

  var menuBtn = document.getElementById('menu-toggle');
  var menu = document.getElementById('primary-menu');
  var ddBtns = $$('.dd-btn');
  function closeDropdowns(except) {
    ddBtns.forEach(function (b) {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      document.getElementById(b.getAttribute('aria-controls')).hidden = true;
    });
  }
  ddBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      closeDropdowns(b);
      b.setAttribute('aria-expanded', String(!open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
  });
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
    if (open) closeDropdowns();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape') return;
    var focusTarget = null;
    ddBtns.forEach(function (b) { if (b.getAttribute('aria-expanded') === 'true') focusTarget = focusTarget || b; });
    closeDropdowns();
    ['notice-toggle', 'lang-toggle'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b && b.getAttribute('aria-expanded') === 'true') { b.click(); focusTarget = focusTarget || b; }
    });
    if (!focusTarget && menuBtn && menuBtn.getAttribute('aria-expanded') === 'true' && menuBtn.offsetParent !== null) { menuBtn.click(); focusTarget = menuBtn; }
    if (focusTarget && !focusTarget.contains(document.activeElement) ) focusTarget.focus();
  });
  document.addEventListener('click', function (ev) {
    if (!ev.target.closest('.primary-nav')) closeDropdowns();
  });
  document.addEventListener('focusin', function (ev) {
    if (!ev.target.closest('.primary-nav')) closeDropdowns();
  });

  /* ---------- helpers ---------- */
  function norm(s) { return String(s).toLowerCase(); }
  function matches(text, q) {
    var words = norm(q).split(/\s+/).filter(Boolean);
    var t = norm(text);
    return words.every(function (w) { return t.indexOf(w) !== -1; });
  }
  function serviceCard(s) {
    var li = el('li', 'card'); li.id = s.id; li.setAttribute('data-component', 'service-card');
    li.appendChild(el('h2', 'card-h', s.name));
    li.appendChild(el('p', 'tag', catLabel(s.cat) + ' | ' + agencyName(s.agency) + ' (invented)'));
    li.appendChild(el('p', null, s.summary));
    var p = el('p'); p.appendChild(el('span', 'offsite', 'Off-site provider (fictional, not linked): ' + s.provider)); li.appendChild(p);
    return li;
  }
  function agencyCard(a) {
    var li = el('li', 'card'); li.id = a.id; li.setAttribute('data-component', 'agency-card');
    li.appendChild(el('h2', 'card-h', a.name));
    li.appendChild(el('p', 'tag', sectorLabel(a.sector)));
    li.appendChild(el('p', null, a.desc));
    li.appendChild(el('p', null, 'Phone (invented): ' + a.phone));
    return li;
  }
  function plural(n, w) { return n + ' ' + w + (n === 1 ? '' : 's'); }

  /* ---------- services directory ---------- */
  function initServices() {
    var q = $('#svc-q'), cat = $('#svc-cat'), list = $('#svc-list'), count = $('#svc-count'), empty = $('#svc-empty');
    q.value = param('q'); var c = param('category'); if (c) cat.value = c;
    function run(announce) {
      var out = SERVICES.filter(function (s) {
        return (!cat.value || s.cat === cat.value) && (!q.value.trim() || matches(s.name + ' ' + s.summary + ' ' + catLabel(s.cat) + ' ' + agencyName(s.agency), q.value));
      });
      list.textContent = '';
      out.forEach(function (s) { list.appendChild(serviceCard(s)); });
      empty.hidden = out.length > 0; list.hidden = out.length === 0;
      count.textContent = out.length ? plural(out.length, 'service') + ' shown of ' + SERVICES.length + '.' : 'No services match.';
    }
    q.addEventListener('input', run); cat.addEventListener('change', run);
    $('#svc-filters').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#svc-reset').addEventListener('click', function () { q.value = ''; cat.value = ''; run(); q.focus(); });
    run();
    if (location.hash && document.getElementById(location.hash.slice(1))) document.getElementById(location.hash.slice(1)).scrollIntoView();
  }

  /* ---------- agencies ---------- */
  function initAgencies() {
    var q = $('#ag-q'), sec = $('#ag-sector'), list = $('#ag-list'), count = $('#ag-count'), empty = $('#ag-empty');
    q.value = param('q');
    function run() {
      var out = AGENCIES.filter(function (a) {
        return (!sec.value || a.sector === sec.value) && (!q.value.trim() || matches(a.name + ' ' + a.desc + ' ' + sectorLabel(a.sector), q.value));
      });
      list.textContent = '';
      out.forEach(function (a) { list.appendChild(agencyCard(a)); });
      empty.hidden = out.length > 0; list.hidden = out.length === 0;
      count.textContent = out.length ? out.length + (out.length === 1 ? ' agency' : ' agencies') + ' shown of ' + AGENCIES.length + '.' : 'No agencies match.';
    }
    q.addEventListener('input', run); sec.addEventListener('change', run);
    $('#ag-filters').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#ag-reset').addEventListener('click', function () { q.value = ''; sec.value = ''; run(); q.focus(); });
    run();
  }

  /* ---------- site search ---------- */
  var PAGES = [
    ['index.html', 'Home', 'Fictional state portal home with topic hubs'],
    ['services.html', 'Services directory', 'Directory of invented sample services'],
    ['agencies.html', 'State agencies directory', 'Directory of invented agencies'],
    ['permits-passes.html', 'Permits & Passes', 'Invented passes for orchards, canals, fields and trails'],
    ['makers-markets.html', 'Makers & Markets', 'Invented market and workshop listings'],
    ['community-learning.html', 'Community & Learning', 'Invented reading rooms, classes and gardens'],
    ['accessibility.html', 'Accessibility resources and support', 'Invented accessibility support page and site statement'],
    ['faq.html', 'Frequently asked questions', 'Questions about this fictional portal'],
    ['about.html', 'About this portal', 'What this fictional portal is and why'],
    ['contact.html', 'Provide feedback (demo)', 'Simulated feedback form, sends nothing']
  ];
  function initSearch() {
    var form = $('#site-search'), q = $('#q'), res = $('#results'), count = $('#result-count');
    q.value = param('q');
    function group(title, items) {
      if (!items.length) return;
      var sec = el('section'); sec.setAttribute('data-component', 'result-group');
      var h = el('h2', null, title + ' (' + items.length + ')'); sec.appendChild(h);
      var ul = el('ul', 'plain'); items.forEach(function (i) { ul.appendChild(i); }); sec.appendChild(ul); res.appendChild(sec);
    }
    function run() {
      res.textContent = '';
      var term = q.value.trim();
      if (!term) { count.textContent = 'Type a word to search.'; return; }
      var sv = SERVICES.filter(function (s) { return matches(s.name + ' ' + s.summary, term); }).map(function (s) {
        var li = el('li'); var a = el('a', null, s.name); a.href = 'services.html?q=' + encodeURIComponent(s.name); li.appendChild(a); li.appendChild(el('span', 'tag', ' ' + catLabel(s.cat) + ' (directory entry)')); return li;
      });
      var ag = AGENCIES.filter(function (a) { return matches(a.name + ' ' + a.desc, term); }).map(function (a) {
        var li = el('li'); var l = el('a', null, a.name); l.href = 'agencies.html?q=' + encodeURIComponent(a.name); li.appendChild(l); return li;
      });
      var pg = PAGES.filter(function (p) { return matches(p[1] + ' ' + p[2], term); }).map(function (p) {
        var li = el('li'); var a = el('a', null, p[1]); a.href = p[0]; li.appendChild(a); li.appendChild(el('span', 'tag', ' ' + p[2])); return li;
      });
      var total = sv.length + ag.length + pg.length;
      group('Services', sv); group('Agencies', ag); group('Pages', pg);
      if (!total) {
        var d = el('div', 'empty'); d.setAttribute('data-component', 'empty-state');
        d.appendChild(el('h2', null, 'No results'));
        d.appendChild(el('p', null, 'Nothing in the invented data matches "' + term + '". Check the spelling, try a shorter word, or browse the services directory.'));
        var a = el('a', null, 'Browse the services directory'); a.href = 'services.html'; var p = el('p'); p.appendChild(a); d.appendChild(p);
        res.appendChild(d); count.textContent = 'No results for ' + term + '.';
      } else count.textContent = plural(total, 'result') + ' for ' + term + '.';
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    q.addEventListener('input', run);
    run();
  }

  /* ---------- contact (simulation) ---------- */
  function initContact() {
    var form = $('#contact-form'), sum = $('#error-summary'), list = $('#error-list'), result = $('#demo-result');
    var fields = [
      { id: 'c-topic', label: 'Topic', check: function (v) { return v ? '' : 'Choose a topic.'; } },
      { id: 'c-msg', label: 'Message', check: function (v) { v = v.trim(); return !v ? 'Enter a message.' : v.length < 10 ? 'Enter at least 10 characters.' : ''; } },
      { id: 'c-mail', label: 'Reply email', check: function (v) { v = v.trim(); return v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter an email in the form name@example.test, or leave it blank.' : ''; } }
    ];
    function validate() {
      var errs = [];
      fields.forEach(function (f) {
        var input = document.getElementById(f.id), msg = document.getElementById(f.id + '-err');
        var m = f.check(input.value);
        if (m) { errs.push({ f: f, m: m }); msg.textContent = 'Error: ' + m; msg.hidden = false; input.setAttribute('aria-invalid', 'true'); }
        else { msg.textContent = ''; msg.hidden = true; input.removeAttribute('aria-invalid'); }
      });
      return errs;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault(); result.hidden = true;
      var errs = validate();
      list.textContent = '';
      if (errs.length) {
        errs.forEach(function (x) {
          var li = el('li'), a = el('a', null, x.f.label + ': ' + x.m); a.href = '#' + x.f.id;
          a.addEventListener('click', function (ev) { ev.preventDefault(); document.getElementById(x.f.id).focus(); });
          li.appendChild(a); list.appendChild(li);
        });
        sum.hidden = false; sum.focus(); return;
      }
      sum.hidden = true; result.hidden = false; result.focus();
    });
  }

  var page = document.body.getAttribute('data-page');
  if (page === 'services') initServices();
  else if (page === 'agencies') initAgencies();
  else if (page === 'search') initSearch();
  else if (page === 'contact') initContact();
})();
