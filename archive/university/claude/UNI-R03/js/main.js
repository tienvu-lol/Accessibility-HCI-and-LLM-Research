/* Cardinal Ridge Community College (fictional) - vanilla JS, inline demo data, no network */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function param(n) { try { return new URLSearchParams(location.search).get(n) || ''; } catch (e) { return ''; } }

  /* ---------- DATA (sample, fictional) ---------- */
  var CAMPUS = { RS: 'Riverside', HC: 'Hillcrest', LV: 'Lakeview', NG: 'Northgate', ON: 'Online' };
  var PROGRAMS = [
    ['accounting-aas', 'Accounting', 'AAS', 'Business', 60, 'RS HC ON', 'Prepare for bookkeeping, payroll and entry-level accounting roles.'],
    ['business-admin-as', 'Business Administration', 'AS', 'Business', 60, 'RS LV ON', 'Transfer-oriented foundation in management, economics and marketing.'],
    ['entrepreneurship-cert', 'Entrepreneurship', 'Certificate', 'Business', 30, 'NG ON', 'Plan, price and launch a small venture.'],
    ['supply-chain-css', 'Supply Chain Basics', 'Career Studies Certificate', 'Business', 15, 'NG ON', 'Short credential covering purchasing, inventory and logistics.'],
    ['nursing-aas', 'Nursing', 'AAS', 'Health', 70, 'HC', 'Clinical nursing pathway with simulation lab and hospital placements.'],
    ['dental-hygiene-aas', 'Dental Hygiene', 'AAS', 'Health', 68, 'HC', 'Clinical preparation for dental hygiene licensure.'],
    ['emt-cert', 'Emergency Medical Technician', 'Certificate', 'Health', 24, 'NG', 'Entry-level prehospital care training.'],
    ['health-info-aas', 'Health Information Management', 'AAS', 'Health', 62, 'ON', 'Medical records, coding and privacy practice.'],
    ['phlebotomy-css', 'Phlebotomy', 'Career Studies Certificate', 'Health', 12, 'NG', 'Blood-draw technique and specimen handling.'],
    ['cyber-aas', 'Cybersecurity', 'AAS', 'Technology', 63, 'RS ON', 'Defend networks, respond to incidents and learn secure configuration.'],
    ['comp-sci-as', 'Computer Science', 'AS', 'Technology', 60, 'RS LV', 'Programming and discrete math that transfers to four-year programs.'],
    ['it-support-cert', 'IT Support', 'Certificate', 'Technology', 30, 'HC ON', 'Help-desk skills, hardware and operating systems.'],
    ['web-dev-css', 'Web Development', 'Career Studies Certificate', 'Technology', 18, 'ON', 'Build accessible, responsive websites by hand.'],
    ['data-analytics-cert', 'Data Analytics', 'Certificate', 'Technology', 30, 'LV ON', 'Spreadsheets, databases and visual storytelling.'],
    ['engineering-as', 'Engineering', 'AS', 'Engineering & Trades', 64, 'RS', 'First two years of an engineering degree.'],
    ['electrical-aas', 'Electrical Technology', 'AAS', 'Engineering & Trades', 62, 'NG', 'Wiring, controls and code-compliant installation.'],
    ['welding-cert', 'Welding', 'Certificate', 'Engineering & Trades', 28, 'NG', 'Hands-on shielded-metal and gas-metal arc welding.'],
    ['hvac-css', 'HVAC Fundamentals', 'Career Studies Certificate', 'Engineering & Trades', 16, 'NG', 'Heating, cooling and refrigeration basics.'],
    ['auto-aas', 'Automotive Technology', 'AAS', 'Engineering & Trades', 60, 'NG', 'Diagnostics and repair for modern vehicles.'],
    ['graphic-design-aas', 'Graphic Design', 'AAS', 'Arts & Design', 61, 'LV', 'Typography, layout and digital production.'],
    ['fine-arts-aa', 'Fine Arts', 'AA', 'Arts & Design', 60, 'LV', 'Studio practice with a transfer focus.'],
    ['music-aa', 'Music', 'AA', 'Arts & Design', 60, 'LV', 'Theory, performance and ensemble work.'],
    ['theater-css', 'Theater Production', 'Career Studies Certificate', 'Arts & Design', 14, 'LV', 'Stagecraft, lighting and stage management.'],
    ['biology-as', 'Biology', 'AS', 'Science & Math', 62, 'RS HC', 'Lab-based transfer pathway for life sciences.'],
    ['chemistry-as', 'Chemistry', 'AS', 'Science & Math', 63, 'RS', 'General and organic chemistry sequence.'],
    ['math-as', 'Mathematics', 'AS', 'Science & Math', 60, 'RS ON', 'Calculus and statistics for transfer.'],
    ['early-childhood-aas', 'Early Childhood Education', 'AAS', 'Education & Social Services', 60, 'HC ON', 'Teach and care for children from birth to age eight.'],
    ['human-services-aas', 'Human Services', 'AAS', 'Education & Social Services', 60, 'HC', 'Case management and community support careers.'],
    ['paralegal-cert', 'Paralegal Studies', 'Certificate', 'Education & Social Services', 30, 'ON', 'Legal research and document preparation.'],
    ['general-studies-aa', 'General Studies', 'AA', 'Transfer', 60, 'RS HC LV ON', 'Flexible plan covering core general education.'],
    ['liberal-arts-aa', 'Liberal Arts', 'AA', 'Transfer', 60, 'RS HC LV ON', 'Broad humanities and social science preparation for transfer.']
  ].map(function (p) {
    return { id: p[0], title: p[1], degree: p[2], interest: p[3], credits: p[4], campuses: p[5].split(' ').map(function (c) { return CAMPUS[c]; }), blurb: p[6] };
  });
  var DEGREES = ['AA', 'AS', 'AAS', 'Certificate', 'Career Studies Certificate'];
  var INTERESTS = ['Arts & Design', 'Business', 'Education & Social Services', 'Engineering & Trades', 'Health', 'Science & Math', 'Technology', 'Transfer'];
  var EVENTS = [
    ['2026-08-24', 'Fall 2026', 'Term', 'Fall classes begin'],
    ['2026-09-07', 'Fall 2026', 'Closure', 'Labor Day holiday - college closed'],
    ['2026-09-08', 'Fall 2026', 'Deadline', 'Last day to add a full-term class'],
    ['2026-10-02', 'Fall 2026', 'Deadline', 'Last day to drop with tuition refund'],
    ['2026-10-12', 'Fall 2026', 'Student event', 'Transfer fair, Riverside Campus'],
    ['2026-11-11', 'Fall 2026', 'Closure', 'Veterans Day observance - college closed'],
    ['2026-11-25', 'Fall 2026', 'Closure', 'Thanksgiving break begins'],
    ['2026-12-11', 'Fall 2026', 'Deadline', 'Last day of classes'],
    ['2026-12-14', 'Fall 2026', 'Term', 'Final exam week begins'],
    ['2027-01-11', 'Spring 2027', 'Deadline', 'Priority financial aid deadline (sample date)'],
    ['2027-01-19', 'Spring 2027', 'Term', 'Spring classes begin'],
    ['2027-02-12', 'Spring 2027', 'Deadline', 'Last day to add a full-term class'],
    ['2027-03-08', 'Spring 2027', 'Closure', 'Spring break begins'],
    ['2027-03-23', 'Spring 2027', 'Student event', 'Open house, all campuses'],
    ['2027-04-16', 'Spring 2027', 'Deadline', 'Graduation application due'],
    ['2027-05-14', 'Spring 2027', 'Term', 'Spring term ends'],
    ['2027-05-22', 'Spring 2027', 'Student event', 'Commencement ceremony']
  ].map(function (e) { return { date: e[0], term: e[1], type: e[2], title: e[3] }; });
  var NEWS = [
    ['2026-11-10', 'Announcement', 'Winter registration opens November 16', 'Students can browse sample winter sections and meet with an advisor before registering.'],
    ['2026-11-04', 'Student Success', 'Peer tutoring hours extended', 'The learning commons will stay open two extra evenings a week through finals.'],
    ['2026-10-28', 'Alerts', 'Sample alert: Hillcrest parking lot B resurfacing', 'Lot B is closed Saturday for repaving. Use lot D and the shuttle stop. This is a fictional notice.'],
    ['2026-10-21', 'Community', 'Autumn art walk comes to Lakeview', 'Student work is displayed in the gallery hall and along the courtyard path.'],
    ['2026-10-15', 'Workforce', 'New electrical apprenticeship partnership', 'A fictional regional employer group will sponsor ten apprenticeship seats.'],
    ['2026-10-02', 'Student Success', 'Food pantry opens at every campus', 'Free groceries are available weekdays; no paperwork is required.'],
    ['2026-09-22', 'Announcement', 'Accessibility services moves to Student Hub', 'Accommodation requests can now be made at the Riverside Student Hub or online.'],
    ['2026-09-14', 'Community', 'Nursing simulation lab dedicated', 'The new lab features eight bays and recorded debrief rooms.'],
    ['2026-09-03', 'Alerts', 'Sample alert: Northgate network maintenance', 'Wi-Fi may be unavailable overnight Friday. Fictional notice.'],
    ['2026-08-18', 'Announcement', 'Fall welcome week schedule posted', 'Orientation sessions run Monday through Thursday at every campus.']
  ].map(function (n) { return { date: n[0], cat: n[1], title: n[2], body: n[3] }; });
  var PEOPLE = [
    ['Marisol Quintero', 'President', 'Office of the President', 'Riverside'], ['Dwayne Okafor', 'Provost', 'Academic Affairs', 'Riverside'],
    ['Priya Raman', 'Dean of Business and Technology', 'Business and Technology', 'Riverside'], ['Tomas Lindqvist', 'Professor of Cybersecurity', 'Business and Technology', 'Riverside'],
    ['Hannah Boateng', 'Instructor, Accounting', 'Business and Technology', 'Hillcrest'], ['Elena Vasquez', 'Dean of Health Sciences', 'Health Sciences', 'Hillcrest'],
    ['Marcus Hale', 'Nursing Program Director', 'Health Sciences', 'Hillcrest'], ['Yuki Nakamura', 'Dental Hygiene Faculty', 'Health Sciences', 'Hillcrest'],
    ['Grace Oduya', 'Dean of Arts and Sciences', 'Arts and Sciences', 'Lakeview'], ['Ben Castellano', 'Professor of Biology', 'Arts and Sciences', 'Riverside'],
    ['Lila Moreau', 'Professor of Fine Arts', 'Arts and Sciences', 'Lakeview'], ['Omar Haddad', 'Instructor, Mathematics', 'Arts and Sciences', 'Riverside'],
    ['Sandra Whitfield', 'Director of Admissions', 'Admissions', 'Riverside'], ['Kwame Asante', 'Financial Aid Counselor', 'Financial Aid', 'Riverside'],
    ['Nadia Petrov', 'Financial Aid Counselor', 'Financial Aid', 'Hillcrest'], ['Jorge Mendes', 'Academic Advisor', 'Advising', 'Lakeview'],
    ['Rhea Kapoor', 'Academic Advisor', 'Advising', 'Northgate'], ['Ian McAllister', 'Coordinator of Accessibility Services', 'Accessibility Services', 'Riverside'],
    ['Tessa Brandt', 'Career Services Specialist', 'Career Services', 'Hillcrest'], ['Victor Nwosu', 'Director of Workforce Training', 'Workforce Development', 'Northgate'],
    ['Alma Reyes', 'Welding Instructor', 'Workforce Development', 'Northgate'], ['Peter Lindgren', 'Librarian', 'Library', 'Lakeview'],
    ['Zoe Abernathy', 'Help Desk Lead', 'Technology Services', 'Riverside'], ['Samir Qureshi', 'Registrar', 'Registrar', 'Riverside']
  ].map(function (p) { return { kind: 'People', name: p[0], role: p[1], dept: p[2], campus: p[3], phone: '555-0' + (100 + (p[0].length * 7) % 900) }; });
  var OFFICES = [
    ['Admissions', 'Student Hub, Riverside'], ['Financial Aid', 'Student Hub, Riverside'], ['Registrar', 'Student Hub, Riverside'], ['Advising', 'All campuses'],
    ['Accessibility Services', 'Student Hub, Riverside'], ['Career Services', 'Hillcrest Library'], ['Library', 'Lakeview Learning Commons'], ['Technology Services', 'Riverside Hall 110']
  ].map(function (o, i) { return { kind: 'Offices', name: o[0], role: 'Office', dept: o[0], campus: o[1], phone: '555-02' + (10 + i * 3) }; });
  var DIRECTORY = PEOPLE.concat(OFFICES);

  /* ---------- DROPDOWNS / MOBILE NAV ---------- */
  var dds = $$('.dd');
  function closeAll(except, restore) {
    dds.forEach(function (d) {
      if (d === except) return;
      var b = $('button', d), p = $('.dd-panel', d);
      if (b && p && !p.hidden) { p.hidden = true; b.setAttribute('aria-expanded', 'false'); if (restore) b.focus(); }
    });
  }
  dds.forEach(function (d) {
    var b = $(':scope > button', d), p = $('.dd-panel', d);
    b.addEventListener('click', function () {
      var open = p.hidden;
      closeAll(d);
      p.hidden = !open; b.setAttribute('aria-expanded', String(open));
    });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (p.hidden) { closeAll(d); p.hidden = false; b.setAttribute('aria-expanded', 'true'); }
        var f = $('a,button', p); if (f) f.focus();
      }
    });
    p.addEventListener('keydown', function (e) {
      var items = $$('a,button', p), i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openDd = dds.filter(function (d) { return !$('.dd-panel', d).hidden; })[0];
    if (openDd) { closeAll(null, true); return; }
    var mt = $('.menu-toggle'), nav = $('#site-nav');
    if (mt && nav && nav.classList.contains('open')) { nav.classList.remove('open'); mt.setAttribute('aria-expanded', 'false'); mt.focus(); }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.dd')) closeAll(); });
  document.addEventListener('focusin', function (e) { if (!e.target.closest('.dd')) closeAll(); });
  var mt = $('.menu-toggle');
  if (mt) mt.addEventListener('click', function () {
    var nav = $('#site-nav'), o = !nav.classList.contains('open');
    nav.classList.toggle('open', o); mt.setAttribute('aria-expanded', String(o));
  });
  $$('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      $('#lang-status').textContent = 'Demo only: "' + b.textContent + '" selected, but no translation service is connected in this replica. Page language is unchanged.';
    });
  });

  /* ---------- FORM VALIDATION ---------- */
  function initForm(form) {
    form.setAttribute('novalidate', '');
    var summary = $('.error-summary', form), success = $('.demo-success', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = [];
      $$('.field', form).forEach(function (f) {
        var c = $('input,select,textarea', f), msgEl = $('.error', f), msg = '';
        if (!c) return;
        var v = c.type === 'checkbox' ? c.checked : c.value.trim();
        var label = ($('label', f).firstChild.textContent || '').trim();
        if (c.required && !v) msg = c.type === 'checkbox' ? 'Please confirm: ' + label + '.' : (c.tagName === 'SELECT' ? 'Choose an option for ' : 'Enter ') + label.toLowerCase() + '.';
        else if (c.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'Enter an email address like name@example.org.';
        else if (c.minLength > 0 && v && v.length < c.minLength) msg = label + ' must be at least ' + c.minLength + ' characters.';
        if (msg) {
          msgEl.textContent = msg; msgEl.hidden = false; c.setAttribute('aria-invalid', 'true');
          errors.push({ id: c.id, msg: msg });
        } else { msgEl.hidden = true; msgEl.textContent = ''; c.removeAttribute('aria-invalid'); }
      });
      if (success) success.hidden = true;
      if (errors.length) {
        summary.innerHTML = '<h2>There ' + (errors.length === 1 ? 'is 1 problem' : 'are ' + errors.length + ' problems') + ' with your entry</h2><ul>' +
          errors.map(function (er) { return '<li><a href="#' + er.id + '">' + esc(er.msg) + '</a></li>'; }).join('') + '</ul>';
        summary.hidden = false; summary.focus();
        $$('a', summary).forEach(function (a) { a.addEventListener('click', function (ev) { ev.preventDefault(); var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) t.focus(); }); });
      } else {
        summary.hidden = true; summary.innerHTML = '';
        if (success) { success.hidden = false; success.focus(); }
        form.reset();
        var dlg = form.closest('dialog'); if (dlg && form.dataset.keepOpen === undefined) { /* stay open to show message */ }
      }
    });
  }
  $$('form[data-validate]').forEach(initForm);

  /* ---------- PROGRAM FINDER ---------- */
  function fillSelect(sel, items, firstLabel) {
    sel.innerHTML = '<option value="">' + firstLabel + '</option>' + items.map(function (i) { return '<option>' + esc(i) + '</option>'; }).join('');
  }
  var pf = $('#program-finder');
  if (pf) {
    var q = $('#pf-query'), deg = $('#pf-degree'), intr = $('#pf-interest'), camp = $('#pf-campus'), out = $('#pf-results'), meta = $('#pf-count');
    fillSelect(deg, DEGREES, 'All degree types'); fillSelect(intr, INTERESTS, 'All interests');
    fillSelect(camp, Object.keys(CAMPUS).map(function (k) { return CAMPUS[k]; }), 'All campuses');
    q.value = param('q'); if (param('interest')) intr.value = param('interest');
    var run = function () {
      var t = q.value.trim().toLowerCase();
      var list = PROGRAMS.filter(function (p) {
        return (!t || (p.title + ' ' + p.blurb + ' ' + p.interest).toLowerCase().indexOf(t) > -1) &&
          (!deg.value || p.degree === deg.value) && (!intr.value || p.interest === intr.value) && (!camp.value || p.campuses.indexOf(camp.value) > -1);
      });
      meta.textContent = list.length + ' of ' + PROGRAMS.length + ' sample programs shown';
      out.innerHTML = list.length ? list.map(function (p) {
        return '<li class="card" data-component="program-card"><h3><a href="program.html?id=' + p.id + '">' + esc(p.title) + '</a></h3><p><span class="tag">' + esc(p.degree) + '</span><span class="tag">' + esc(p.interest) + '</span></p><p>' + esc(p.blurb) + '</p><p>' + p.credits + ' credits. ' + esc(p.campuses.join(', ')) + '</p></li>';
      }).join('') : '<li class="empty" data-component="empty-state"><p><strong>No programs match your search.</strong></p><p>Try a shorter keyword, or clear the filters.</p></li>';
    };
    pf.addEventListener('input', run); pf.addEventListener('change', run);
    pf.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    $('#pf-reset').addEventListener('click', function () { pf.reset(); q.value = ''; run(); q.focus(); });
    run();
  }
  var pd = $('#program-detail');
  if (pd) {
    var p = PROGRAMS.filter(function (x) { return x.id === param('id'); })[0];
    if (!p) {
      pd.innerHTML = '<div class="empty" data-component="empty-state"><h2>Program not found</h2><p>That program is not in this sample set. <a href="programs.html">Return to Find a Program</a>.</p></div>';
    } else {
      document.title = p.title + ' (' + p.degree + ') | Cardinal Ridge Community College';
      $('#pd-title').textContent = p.title; $('#pd-crumb').textContent = p.title;
      pd.innerHTML = '<p><span class="tag">' + esc(p.degree) + '</span><span class="tag">' + esc(p.interest) + '</span></p><p>' + esc(p.blurb) + '</p>' +
        '<h2>At a glance</h2><table data-component="data-table"><caption>Program facts (sample data)</caption><tbody><tr><th scope="row">Credits</th><td>' + p.credits + '</td></tr><tr><th scope="row">Award</th><td>' + esc(p.degree) + '</td></tr><tr><th scope="row">Where offered</th><td>' + esc(p.campuses.join(', ')) + '</td></tr><tr><th scope="row">Typical length</th><td>' + Math.ceil(p.credits / 15) / 2 + ' to ' + Math.ceil(p.credits / 9) / 2 + ' years, depending on load</td></tr></tbody></table>' +
        '<h2>Sample first-year courses</h2><ul><li>' + esc(p.title) + ' foundations (3 credits)</li><li>College writing (3 credits)</li><li>Quantitative reasoning (3 credits)</li><li>Student success seminar (1 credit)</li></ul>' +
        '<p>Course lists are invented placeholders and not a real curriculum.</p><p class="cta"><a class="btn" href="apply.html">Apply now (simulation)</a> <a class="btn btn-alt" href="visit.html">Request information</a> <a class="btn btn-alt" href="programs.html">Back to all programs</a></p>';
    }
  }
  var feat = $('#featured-programs');
  if (feat) feat.innerHTML = PROGRAMS.filter(function (x) { return ['nursing-aas', 'cyber-aas', 'general-studies-aa', 'welding-cert'].indexOf(x.id) > -1; }).map(function (x) {
    return '<li class="card" data-component="program-card"><h3><a href="program.html?id=' + x.id + '">' + esc(x.title) + '</a></h3><p><span class="tag">' + esc(x.degree) + '</span></p><p>' + esc(x.blurb) + '</p></li>';
  }).join('');

  /* ---------- CALENDAR ---------- */
  var cal = $('#calendar-filter');
  if (cal) {
    var ct = $('#cal-term'), cy = $('#cal-type'), cb = $('#cal-body'), cc = $('#cal-count');
    fillSelect(ct, ['Fall 2026', 'Spring 2027'], 'All terms'); fillSelect(cy, ['Term', 'Deadline', 'Closure', 'Student event'], 'All types');
    var runC = function () {
      var l = EVENTS.filter(function (e) { return (!ct.value || e.term === ct.value) && (!cy.value || e.type === cy.value); });
      cc.textContent = l.length + ' dates shown';
      cb.innerHTML = l.length ? l.map(function (e) { return '<tr><td>' + e.date + '</td><td>' + esc(e.term) + '</td><td>' + esc(e.type) + '</td><td>' + esc(e.title) + '</td></tr>'; }).join('') : '<tr><td colspan="4">No dates match these filters.</td></tr>';
    };
    cal.addEventListener('change', runC); cal.addEventListener('submit', function (e) { e.preventDefault(); });
    runC();
  }

  /* ---------- NEWS ---------- */
  var nf = $('#news-filter');
  if (nf) {
    var nc = $('#news-cat'), nq = $('#news-q'), nl = $('#news-list'), nn = $('#news-count');
    fillSelect(nc, ['Alerts', 'Announcement', 'Community', 'Student Success', 'Workforce'], 'All categories');
    if (param('cat')) nc.value = param('cat');
    var runN = function () {
      var t = nq.value.trim().toLowerCase();
      var l = NEWS.filter(function (n) { return (!nc.value || n.cat === nc.value) && (!t || (n.title + ' ' + n.body).toLowerCase().indexOf(t) > -1); });
      nn.textContent = l.length + ' of ' + NEWS.length + ' sample stories shown';
      nl.innerHTML = l.length ? l.map(function (n) {
        return '<li class="card" data-component="news-card"><h3>' + esc(n.title) + '</h3><p><span class="tag">' + esc(n.cat) + '</span> <time datetime="' + n.date + '">' + n.date + '</time></p><details><summary>Read summary</summary><p>' + esc(n.body) + '</p></details></li>';
      }).join('') : '<li class="empty" data-component="empty-state"><p><strong>No stories match.</strong></p><p>Clear the search or choose another category.</p></li>';
    };
    nf.addEventListener('input', runN); nf.addEventListener('change', runN); nf.addEventListener('submit', function (e) { e.preventDefault(); runN(); });
    runN();
  }

  /* ---------- DIRECTORY ---------- */
  var df = $('#directory-form');
  if (df) {
    var dq = $('#dir-q'), dd2 = $('#dir-dept'), dr = $('#dir-results'), dn = $('#dir-count');
    var depts = []; DIRECTORY.forEach(function (x) { if (depts.indexOf(x.dept) < 0) depts.push(x.dept); }); depts.sort();
    fillSelect(dd2, depts, 'Any department');
    var runD = function () {
      var kind = $('input[name="kind"]:checked', df).value, t = dq.value.trim().toLowerCase();
      var l = DIRECTORY.filter(function (x) { return x.kind === kind && (!dd2.value || x.dept === dd2.value) && (!t || (x.name + ' ' + x.role + ' ' + x.dept).toLowerCase().indexOf(t) > -1); });
      dn.textContent = l.length + ' ' + kind.toLowerCase() + ' found (fictional sample entries)';
      dr.innerHTML = l.length ? l.map(function (x) { return '<tr><th scope="row">' + esc(x.name) + '</th><td>' + esc(x.role) + '</td><td>' + esc(x.dept) + '</td><td>' + esc(x.campus) + '</td><td>' + x.phone + '</td></tr>'; }).join('') : '<tr><td colspan="5">No entries match your search. Check spelling or choose Any department.</td></tr>';
    };
    df.addEventListener('input', runD); df.addEventListener('change', runD); df.addEventListener('submit', function (e) { e.preventDefault(); runD(); });
    runD();
  }

  /* ---------- TUITION CALCULATOR (intentional addition) ---------- */
  var tc = $('#tuition-calc');
  if (tc) {
    tc.addEventListener('submit', function (e) {
      e.preventDefault();
      var cr = parseFloat($('#tc-credits').value), res = $('#tc-res').value, o = $('#tc-out'), err = $('#tc-err');
      if (!cr || cr < 1 || cr > 18) {
        err.hidden = false; err.textContent = 'Enter a number of credits from 1 to 18.'; $('#tc-credits').setAttribute('aria-invalid', 'true'); $('#tc-credits').focus(); o.textContent = ''; return;
      }
      err.hidden = true; $('#tc-credits').removeAttribute('aria-invalid');
      var rate = res === 'in' ? 160 : 410, fee = 12 * cr;
      o.textContent = 'Sample estimate for ' + cr + ' credits: tuition $' + (rate * cr).toFixed(2) + ' + fees $' + fee.toFixed(2) + ' = $' + (rate * cr + fee).toFixed(2) + '. Fictional rates, not a real bill.';
    });
  }

  /* ---------- APPLY PORTAL DIALOG (simulation) ---------- */
  var od = $('#open-portal'), dlg = $('#portal-dialog');
  if (od && dlg && dlg.showModal) {
    od.addEventListener('click', function () { dlg.showModal(); var f = $('input', dlg); if (f) f.focus(); });
    $('#portal-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('close', function () { od.focus(); });
  } else if (od) { od.disabled = true; od.textContent = 'Portal demo unavailable in this browser'; }
  var appPrograms = $('#ap-program');
  if (appPrograms) { appPrograms.innerHTML = '<option value="">Choose a program</option><option value="undecided">Undecided</option>' + PROGRAMS.map(function (x) { return '<option value="' + x.id + '">' + esc(x.title) + ' (' + esc(x.degree) + ')</option>'; }).join(''); }
  var rp = $('#ri-program');
  if (rp) { rp.innerHTML = '<option value="">Choose an area</option>' + INTERESTS.map(function (x) { return '<option>' + esc(x) + '</option>'; }).join(''); }
})();
