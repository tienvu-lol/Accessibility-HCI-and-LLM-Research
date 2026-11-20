/* Linden Ridge College (fictional) - vanilla JS, inline demo data, works from file:// */
(function () {
  'use strict';
  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var desktop = function () { return window.matchMedia('(min-width: 60.01em)').matches; };

  /* ---------- inline demo data ---------- */
  var PEOPLE = [
    { n: 'Imani Okafor', t: 'Professor of Biology; Department Chair', d: 'Biology', k: 'Faculty', e: 'iokafor@lindenridge.example', p: '(555) 010-0171', o: 'Hollis 210' },
    { n: 'Tobias Lindqvist', t: 'Associate Professor of Biology', d: 'Biology', k: 'Faculty', e: 'tlindqvist@lindenridge.example', p: '(555) 010-0172', o: 'Hollis 214' },
    { n: 'Renata Salgado', t: 'Assistant Professor of Biology', d: 'Biology', k: 'Faculty', e: 'rsalgado@lindenridge.example', p: '(555) 010-0173', o: 'Hollis 218' },
    { n: 'Priya Venkataraman', t: 'Professor of Mathematics', d: 'Mathematics and Statistics', k: 'Faculty', e: 'pvenkat@lindenridge.example', p: '(555) 010-0181', o: 'Ashby 305' },
    { n: 'Gustav Berglund', t: 'Associate Professor of Statistics', d: 'Mathematics and Statistics', k: 'Faculty', e: 'gberglund@lindenridge.example', p: '(555) 010-0182', o: 'Ashby 307' },
    { n: 'Marisol Quintero', t: 'Professor of English Literature', d: 'English Literature', k: 'Faculty', e: 'mquintero@lindenridge.example', p: '(555) 010-0191', o: 'Dunmore 12' },
    { n: 'Edmund Achterberg', t: 'Assistant Professor of English Literature', d: 'English Literature', k: 'Faculty', e: 'eachterberg@lindenridge.example', p: '(555) 010-0192', o: 'Dunmore 15' },
    { n: 'Hana Watanabe', t: 'Associate Professor of Chemistry', d: 'Chemistry and Biochemistry', k: 'Faculty', e: 'hwatanabe@lindenridge.example', p: '(555) 010-0201', o: 'Hollis 120' },
    { n: 'Cormac Reilly', t: 'Professor of Physics', d: 'Physics', k: 'Faculty', e: 'creilly@lindenridge.example', p: '(555) 010-0211', o: 'Hollis 330' },
    { n: 'Zainab Hussein', t: 'Assistant Professor of Computer Science', d: 'Computer Science', k: 'Faculty', e: 'zhussein@lindenridge.example', p: '(555) 010-0221', o: 'Ashby 410' },
    { n: 'Lucas Ferreira', t: 'Professor of History', d: 'History', k: 'Faculty', e: 'lferreira@lindenridge.example', p: '(555) 010-0231', o: 'Dunmore 28' },
    { n: 'Odile Marchetti', t: 'Associate Professor of French', d: 'French', k: 'Faculty', e: 'omarchetti@lindenridge.example', p: '(555) 010-0241', o: 'Dunmore 41' },
    { n: 'Nathaniel Brooks', t: 'Professor of Economics', d: 'Economics', k: 'Faculty', e: 'nbrooks@lindenridge.example', p: '(555) 010-0251', o: 'Merritt 205' },
    { n: 'Akiko Tanabe', t: 'Lecturer in Music and Dance', d: 'Music and Dance', k: 'Faculty', e: 'atanabe@lindenridge.example', p: '(555) 010-0261', o: 'Meridian Hall 3' },
    { n: 'Delia Whitcombe', t: 'Dean of Academic Affairs', d: 'Academic Affairs', k: 'Staff', e: 'dwhitcombe@lindenridge.example', p: '(555) 010-0150', o: 'Admin 201' },
    { n: 'Samuel Oyelaran', t: 'Director of Financial Aid', d: 'Financial Aid', k: 'Staff', e: 'soyelaran@lindenridge.example', p: '(555) 010-0160', o: 'Admin 104' },
    { n: 'Grace Lindholm', t: 'Associate Director of Financial Aid', d: 'Financial Aid', k: 'Staff', e: 'glindholm@lindenridge.example', p: '(555) 010-0161', o: 'Admin 106' },
    { n: 'Rafael Domínguez', t: 'Director of Admissions', d: 'Admissions', k: 'Staff', e: 'rdominguez@lindenridge.example', p: '(555) 010-0140', o: 'Admissions House' },
    { n: 'Mei-Ling Cho', t: 'Admissions Visit Coordinator', d: 'Admissions', k: 'Staff', e: 'mcho@lindenridge.example', p: '(555) 010-0143', o: 'Admissions House' },
    { n: 'Bertrand Okoye', t: 'Registrar', d: 'Registrar', k: 'Staff', e: 'bokoye@lindenridge.example', p: '(555) 010-0155', o: 'Admin 118' },
    { n: 'Sofia Lindgren', t: 'Head Librarian', d: 'Libraries', k: 'Staff', e: 'slindgren@lindenridge.example', p: '(555) 010-0270', o: 'Ashby Library' },
    { n: 'Tariq Mansoor', t: 'Sustainability Coordinator', d: 'Facilities', k: 'Staff', e: 'tmansoor@lindenridge.example', p: '(555) 010-0280', o: 'Facilities 2' },
    { n: 'Johanna Eriksen', t: 'Director of Career Services', d: 'Career Services', k: 'Staff', e: 'jeriksen@lindenridge.example', p: '(555) 010-0290', o: 'Commons 220' },
    { n: 'Winston Achebe', t: 'Counselor, Wellness Center', d: 'Student Wellbeing', k: 'Staff', e: 'wachebe@lindenridge.example', p: '(555) 010-0295', o: 'Wellness Center' }
  ];
  var INDEX = [
    ['Home', 'index.html', 'Linden Ridge College home page, hero, alumni voices, Founders Weekend, news.'],
    ['Meet Linden Ridge', 'meet.html', 'Overview of the college, what makes it distinctive, why a liberal arts college.'],
    ['Academics', 'academics.html', 'Programs of study, departments and academic resources.'],
    ['Biology', 'biology.html', 'Biology department: courses, faculty, research and opportunities.'],
    ['Design Your Own Major', 'design-your-own-major.html', 'Proposal process for a self-designed major, committee, sponsors.'],
    ['Academic Calendar', 'academic-calendar.html', 'Semester dates, classes begin, breaks, final examinations, commencement.'],
    ['Admissions & Aid', 'admissions.html', 'Admissions and aid overview, paths to apply, visit and afford.'],
    ['Apply to Linden Ridge', 'apply.html', 'Application deadlines, requirements, early decision, regular decision, transfer.'],
    ['Affordability & Access', 'affordability.html', 'Need-based grants, fixed tuition pledge, aid statistics.'],
    ['Financial Aid', 'financial-aid.html', 'Cost of attendance, tuition, room and board, how to apply for aid.'],
    ['Campus Tours and Virtual Visits', 'visit.html', 'Request a guided tour (simulated), self-guided route, virtual tour.'],
    ['Campus Life', 'campus-life.html', 'Housing, dining, arts, athletics, wellbeing, sustainability.'],
    ['News & Events', 'news-events.html', 'News list, upcoming events calendar, social media channels.'],
    ['Stories from Linden Ridge', 'stories.html', 'Feature stories: alumni voices, lab notes, stage, library, orchard, poetry and data.'],
    ['Directory', 'directory.html', 'Search faculty and staff by name, department or title.'],
    ['Site Feedback and Accessibility', 'accessibility.html', 'Accessibility notes about this replica and keyboard help.'],
    ['Tuition Pledge', 'affordability.html#pledge', 'The fixed tuition pledge keeps the rate flat for four years.'],
    ['Sustainability', 'campus-life.html#sustainability', 'Net zero by 2040, solar, energy dashboard, waste goals.'],
    ['Living on Campus', 'campus-life.html#living', 'First-year halls, housing, dining stations.'],
    ['Upcoming Events', 'news-events.html#events', 'Lectures, chamber music, open mic, dance showcase, Founders Weekend.']
  ];
  var TOUR_DATES = ['2026-12-01', '2026-12-03', '2026-12-08', '2026-12-10', '2027-01-12', '2027-01-14', '2027-02-02', '2027-02-04'];

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }
  function hl(text, q) {
    var safe = esc(text);
    if (!q) return safe;
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/&/g, '&amp;') + ')', 'ig');
    return safe.replace(re, '<mark>$1</mark>');
  }

  /* ---------- mega-menu (ARIA menubar pattern) ---------- */
  var items = $$('.nav-item');
  var triggers = items.map(function (li) { return $('.nav-trigger', li); });
  $$('.mega-panel a').forEach(function (a) { a.tabIndex = -1; });
  function panelOf(btn) { return doc.getElementById(btn.getAttribute('aria-controls')); }
  function menuLinks(btn) { return $$('a', panelOf(btn)); }
  function closeMenu(btn, restore) {
    btn.setAttribute('aria-expanded', 'false');
    panelOf(btn).classList.remove('is-open');
    if (restore) btn.focus();
  }
  function closeAll(except) { triggers.forEach(function (b) { if (b !== except) closeMenu(b, false); }); }
  function openMenu(btn, focusFirst, last) {
    closeAll(btn);
    btn.setAttribute('aria-expanded', 'true');
    panelOf(btn).classList.add('is-open');
    if (focusFirst) { var l = menuLinks(btn); (last ? l[l.length - 1] : l[0]).focus(); }
  }
  triggers.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      btn.getAttribute('aria-expanded') === 'true' ? closeMenu(btn, false) : openMenu(btn, false);
    });
    btn.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowDown' || k === 'Enter' || k === ' ') { e.preventDefault(); openMenu(btn, true); }
      else if (k === 'ArrowUp') { e.preventDefault(); openMenu(btn, true, true); }
      else if (k === 'ArrowRight' && desktop()) { e.preventDefault(); triggers[(i + 1) % triggers.length].focus(); }
      else if (k === 'ArrowLeft' && desktop()) { e.preventDefault(); triggers[(i - 1 + triggers.length) % triggers.length].focus(); }
      else if (k === 'Home') { e.preventDefault(); triggers[0].focus(); }
      else if (k === 'End') { e.preventDefault(); triggers[triggers.length - 1].focus(); }
      else if (k === 'Escape') { closeMenu(btn, true); }
    });
    var panel = panelOf(btn);
    panel.addEventListener('keydown', function (e) {
      var links = menuLinks(btn), idx = links.indexOf(doc.activeElement), k = e.key;
      if (k === 'ArrowDown') { e.preventDefault(); links[(idx + 1) % links.length].focus(); }
      else if (k === 'ArrowUp') { e.preventDefault(); links[(idx - 1 + links.length) % links.length].focus(); }
      else if (k === 'Home') { e.preventDefault(); links[0].focus(); }
      else if (k === 'End') { e.preventDefault(); links[links.length - 1].focus(); }
      else if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); closeMenu(btn, true); }
      else if ((k === 'ArrowRight' || k === 'ArrowLeft') && desktop()) {
        e.preventDefault();
        var n = triggers[(i + (k === 'ArrowRight' ? 1 : triggers.length - 1)) % triggers.length];
        openMenu(n, true);
      }
    });
    items[i].addEventListener('focusout', function (e) {
      if (!e.relatedTarget || !items[i].contains(e.relatedTarget)) { if (btn.getAttribute('aria-expanded') === 'true') closeMenu(btn, false); }
    });
    items[i].addEventListener('mouseenter', function () { if (desktop()) openMenu(btn, false); });
    items[i].addEventListener('mouseleave', function () { if (desktop()) closeMenu(btn, false); });
  });
  doc.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) closeAll();
    if (!e.target.closest('.a11y-wrap')) togglePanel(false, false);
  });

  /* mobile disclosure */
  var navToggle = $('#nav-toggle'), nav = $('#primary-nav');
  function setNav(open, restore) {
    navToggle.setAttribute('aria-expanded', open);
    nav.classList.toggle('is-open', open);
    navToggle.textContent = open ? 'Close menu' : 'Menu';
    if (!open) closeAll();
    if (restore) navToggle.focus();
  }
  navToggle.addEventListener('click', function () { setNav(navToggle.getAttribute('aria-expanded') !== 'true'); });

  /* search flyout */
  var sBtn = $('#search-toggle'), sBox = $('#search-flyout'), sIn = $('#site-search-input');
  function setSearch(open, restore) {
    sBtn.setAttribute('aria-expanded', open);
    sBox.classList.toggle('is-open', open);
    if (open) sIn.focus(); else if (restore) sBtn.focus();
  }
  sBtn.addEventListener('click', function () { setSearch(sBtn.getAttribute('aria-expanded') !== 'true'); });
  sBox.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); setSearch(false, true); } });

  /* accessibility options + animation toggle */
  var aBtn = $('#a11y-toggle'), aPanel = $('#a11y-panel');
  function togglePanel(open, restore) {
    aBtn.setAttribute('aria-expanded', open);
    aPanel.classList.toggle('is-open', open);
    if (!open && restore) aBtn.focus();
  }
  aBtn.addEventListener('click', function () { togglePanel(aBtn.getAttribute('aria-expanded') !== 'true'); });
  aPanel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { togglePanel(false, true); } });
  var animBtn = $('#anim-toggle'), animState = $('#anim-state');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setAnim(on) {
    doc.documentElement.classList.toggle('no-anim', !on);
    animBtn.setAttribute('aria-pressed', String(!on));
    animBtn.textContent = on ? 'Turn animation off' : 'Turn animation on';
    animState.textContent = on ? 'on' : 'off';
    var hp = $('#hero-pause'); if (hp && !on) { hp.setAttribute('aria-pressed', 'true'); hp.textContent = 'Play background animation'; }
  }
  animBtn.addEventListener('click', function () { setAnim(animBtn.getAttribute('aria-pressed') === 'true'); });
  if (reduce) setAnim(false);

  var hp = $('#hero-pause');
  if (hp) {
    var hero = $('.hero');
    hp.addEventListener('click', function () {
      var pause = hp.getAttribute('aria-pressed') !== 'true';
      hp.setAttribute('aria-pressed', String(pause));
      hp.textContent = pause ? 'Play background animation' : 'Pause background animation';
      hero.classList.toggle('paused', pause);
    });
  }

  /* global Escape: close any open menu / flyout / panel */
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = triggers.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (open) { closeMenu(open, true); return; }
    if (sBtn.getAttribute('aria-expanded') === 'true') { setSearch(false, true); return; }
    if (aBtn.getAttribute('aria-expanded') === 'true') { togglePanel(false, true); return; }
    if (navToggle.getAttribute('aria-expanded') === 'true') setNav(false, true);
  });

  /* ---------- directory ---------- */
  var dirForm = $('#dir-form');
  if (dirForm) {
    var q = $('#dir-q'), type = $('#dir-type'), list = $('#dir-results'), status = $('#dir-status'), empty = $('#dir-empty');
    var render = function () {
      var term = q.value.trim().toLowerCase(), kind = type.value;
      var rows = PEOPLE.filter(function (p) {
        if (kind && p.k !== kind) return false;
        return !term || [p.n, p.t, p.d, p.e].join(' ').toLowerCase().indexOf(term) !== -1;
      });
      list.innerHTML = rows.map(function (p) {
        return '<li data-component="person-card"><h3>' + hl(p.n, q.value.trim()) + '</h3><p>' + hl(p.t, q.value.trim()) + '</p><p>' + esc(p.d) + ' &middot; ' + esc(p.k) + '</p><p><a href="mailto:' + esc(p.e) + '">' + esc(p.e) + '</a> &middot; ' + esc(p.p) + ' &middot; ' + esc(p.o) + '</p></li>';
      }).join('');
      empty.hidden = rows.length !== 0;
      status.textContent = rows.length === 0 ? 'No people found' + (term ? ' for "' + q.value.trim() + '"' : '') + '.' : rows.length + (rows.length === 1 ? ' person' : ' people') + ' found' + (term ? ' for "' + q.value.trim() + '"' : '') + '.';
    };
    dirForm.addEventListener('submit', function (e) { e.preventDefault(); render(); });
    q.addEventListener('input', render); type.addEventListener('change', render);
    $('#dir-clear').addEventListener('click', function () { q.value = ''; type.value = ''; render(); q.focus(); });
    q.value = param('q'); render();
  }

  /* ---------- site search ---------- */
  var sForm = $('#search-form');
  if (sForm) {
    var keys = param('keys').trim();
    $('#keys').value = keys;
    var res = $('#search-results'), st = $('#search-status'), se = $('#search-empty');
    if (!keys) { st.textContent = 'Enter a search term to see results.'; }
    else {
      var words = keys.toLowerCase().split(/\s+/);
      var hits = INDEX.filter(function (r) { var hay = (r[0] + ' ' + r[2]).toLowerCase(); return words.every(function (w) { return hay.indexOf(w) !== -1; }); });
      res.innerHTML = hits.map(function (r) { return '<li data-component="search-result"><h3><a href="' + r[1] + '">' + hl(r[0], keys) + '</a></h3><p>' + hl(r[2], keys) + '</p><p class="url">' + esc(r[1]) + '</p></li>'; }).join('');
      se.hidden = hits.length !== 0;
      st.textContent = hits.length + (hits.length === 1 ? ' result' : ' results') + ' for "' + keys + '".';
    }
  }

  /* ---------- not-replicated label ---------- */
  var nr = $('#nr-text');
  if (nr && param('page')) nr.textContent = 'The page "' + param('page') + '" appears in the reference site\'s navigation, but it was not rebuilt in this replica. No content exists here.';

  /* ---------- tour form (simulation) ---------- */
  var form = $('#visit-form');
  if (form) {
    var sel = $('#tdate');
    TOUR_DATES.forEach(function (d) {
      var o = doc.createElement('option'); o.value = d;
      o.textContent = new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      sel.appendChild(o);
    });
    var summary = $('#form-summary'), ok = $('#form-success');
    var rules = {
      fname: function (v) { return v.trim() ? '' : 'Enter your first name.'; },
      lname: function (v) { return v.trim() ? '' : 'Enter your last name.'; },
      email: function (v) { return !v.trim() ? 'Enter your email address.' : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter an email address in the format name@example.org.'); },
      tdate: function (v) { return v ? '' : 'Choose a tour date.'; },
      guests: function (v) { var n = Number(v); return v === '' ? 'Enter the number of guests.' : (!(n >= 1 && n <= 6) || n % 1 ? 'Enter a whole number from 1 to 6.' : ''); }
    };
    var setErr = function (id, msg) {
      var f = doc.getElementById(id), er = doc.getElementById(id + '-err');
      if (msg) { er.textContent = msg; er.hidden = false; f.setAttribute('aria-invalid', 'true'); f.setAttribute('aria-describedby', (f.getAttribute('data-desc') || '') + ' ' + id + '-err'); }
      else { er.hidden = true; f.removeAttribute('aria-invalid'); }
    };
    $$('input,select', form).forEach(function (f) { if (f.getAttribute('aria-describedby')) f.setAttribute('data-desc', f.getAttribute('aria-describedby')); });
    Object.keys(rules).forEach(function (id) { doc.getElementById(id).addEventListener('blur', function () { if (this.getAttribute('aria-invalid') || this.value) setErr(id, rules[id](this.value)); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = [];
      Object.keys(rules).forEach(function (id) { var m = rules[id](doc.getElementById(id).value); setErr(id, m); if (m) errs.push([id, m]); });
      if (errs.length) {
        var ul = $('ul', summary);
        ul.innerHTML = errs.map(function (x) { return '<li><a href="#' + x[0] + '">' + esc(x[1]) + '</a></li>'; }).join('');
        summary.hidden = false; summary.focus();
        $$('a', ul).forEach(function (a) { a.addEventListener('click', function (ev) { ev.preventDefault(); doc.getElementById(a.getAttribute('href').slice(1)).focus(); }); });
        return;
      }
      summary.hidden = true;
      $('#success-text').textContent = 'Thank you, ' + $('#fname').value.trim() + '. Your sample request for ' + sel.options[sel.selectedIndex].textContent + ' (' + $('#guests').value + ' guest(s)) was handled entirely in your browser.';
      form.hidden = true; ok.hidden = false; ok.focus();
    });
    $('#form-reset').addEventListener('click', function () { form.reset(); form.hidden = false; ok.hidden = true; $('#fname').focus(); });
  }
})();
