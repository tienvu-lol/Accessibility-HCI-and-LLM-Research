/* Wren Hollow University (fictional) - UNI-01 replica. Vanilla JS, inline demo data, no network. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Demo data (all fictional) ---------- */
  var PAGES = [
    { title: 'Academics', url: 'academics.html', keys: 'schools colleges classes courses degrees' },
    { title: 'Majors and certificates', url: 'majors.html', keys: 'program finder majors certificates degrees' },
    { title: 'Admissions & Aid', url: 'admissions.html', keys: 'tuition cost financial aid scholarships wren promise afford' },
    { title: 'Apply', url: 'apply.html', keys: 'application freshman transfer international deadlines' },
    { title: 'Visit Wren Hollow', url: 'visit.html', keys: 'tour campus visit info session' },
    { title: 'Directory search', url: 'directory.html', keys: 'people phone email faculty staff' },
    { title: 'Research', url: 'research.html', keys: 'discoveries labs undergraduate research' },
    { title: 'Student Life', url: 'student-life.html', keys: 'housing clubs wellness dining organizations' },
    { title: 'Athletics', url: 'athletics.html', keys: 'wrens teams tickets games' },
    { title: 'About Wren Hollow', url: 'about.html', keys: 'mission history leadership map' },
    { title: 'Facts and figures', url: 'facts.html', keys: 'enrollment statistics numbers' },
    { title: 'News and events', url: 'news.html', keys: 'stories events calendar lectures' }
  ];
  var PROGRAMS = [
    { id: 'biology', name: 'Biology', school: 'School of Life Sciences', type: 'Major', area: 'Science & health', credits: 120, blurb: 'Study living systems from molecules to ecosystems, with lab work starting in the first year.', careers: ['Lab research', 'Biotechnology', 'Pre-health pathways'], extra: 'Includes a capstone field course at the Lake Mendel station.' },
    { id: 'data-science', name: 'Data Science', school: 'College of Engineering and Computing', type: 'Major', area: 'Engineering & computing', credits: 120, blurb: 'Statistics, programming and modeling applied to real campus and community datasets.', careers: ['Data analyst', 'Machine learning engineer', 'Public policy analyst'], extra: 'Students complete a client project in the senior year.' },
    { id: 'computer-science', name: 'Computer Science', school: 'College of Engineering and Computing', type: 'Major', area: 'Engineering & computing', credits: 120, blurb: 'Algorithms, systems and software design with optional tracks in security and graphics.', careers: ['Software engineer', 'Security analyst', 'Game developer'], extra: 'Co-op placements are available after the second year.' },
    { id: 'civil-engineering', name: 'Civil Engineering', school: 'College of Engineering and Computing', type: 'Major', area: 'Engineering & computing', credits: 128, blurb: 'Design the structures, water systems and transport networks communities depend on.', careers: ['Structural engineer', 'Water resources', 'Transportation planner'], extra: 'Accredited-program status is not claimed in this demo.' },
    { id: 'nursing', name: 'Nursing', school: 'School of Nursing and Public Health', type: 'Major', area: 'Science & health', credits: 124, blurb: 'Clinical practice, patient communication and evidence-based care across community settings.', careers: ['Registered nurse', 'Community health', 'Nurse educator'], extra: 'Clinical placements begin in the third semester.' },
    { id: 'public-health', name: 'Public Health', school: 'School of Nursing and Public Health', type: 'Major', area: 'Science & health', credits: 120, blurb: 'Population health, epidemiology and health policy with a community-engagement focus.', careers: ['Epidemiologist', 'Program coordinator', 'Health policy advisor'], extra: 'Pairs well with a certificate in Disability Studies.' },
    { id: 'environmental-studies', name: 'Environmental Studies', school: 'College of Letters and Sciences', type: 'Major', area: 'Science & health', credits: 120, blurb: 'An interdisciplinary look at climate, land use and the policy choices that shape them.', careers: ['Conservation', 'Sustainability consultant', 'Environmental law (graduate study)'], extra: 'Field seminars meet at sites around Lake Mendel.' },
    { id: 'english', name: 'English', school: 'College of Letters and Sciences', type: 'Major', area: 'Arts & humanities', credits: 120, blurb: 'Read widely, write carefully and learn to argue with evidence across literary traditions.', careers: ['Editor', 'Communications', 'Teaching'], extra: 'Creative-writing and literature tracks share a common core.' },
    { id: 'economics', name: 'Economics', school: 'College of Letters and Sciences', type: 'Major', area: 'Business & society', credits: 120, blurb: 'Markets, incentives and public choices, taught with quantitative methods and policy cases.', careers: ['Economist', 'Financial analyst', 'Consultant'], extra: 'An honors thesis option is open to students with a 3.5 GPA.' },
    { id: 'music-performance', name: 'Music Performance', school: 'School of Music and Arts', type: 'Major', area: 'Arts & humanities', credits: 122, blurb: 'Studio instruction, ensembles and recitals for instrumentalists, vocalists and composers.', careers: ['Performer', 'Studio teacher', 'Arts administration'], extra: 'An audition is required; dates are listed on the Apply page.' },
    { id: 'graphic-design', name: 'Graphic Design', school: 'School of Music and Arts', type: 'Major', area: 'Arts & humanities', credits: 120, blurb: 'Typography, interface and print design built around studio critique and client briefs.', careers: ['Brand designer', 'Interface designer', 'Art director'], extra: 'A portfolio review happens at the end of the second year.' },
    { id: 'business-analytics', name: 'Business Analytics', school: 'Hollow School of Business', type: 'Major', area: 'Business & society', credits: 120, blurb: 'Use data to guide decisions in operations, marketing and finance.', careers: ['Business analyst', 'Operations manager', 'Product analyst'], extra: 'Shares first-year courses with Data Science.' },
    { id: 'entrepreneurship', name: 'Entrepreneurship', school: 'Hollow School of Business', type: 'Certificate', area: 'Business & society', credits: 15, blurb: 'Five courses on starting and funding ventures, open to students in any major.', careers: ['Founder', 'Small-business owner', 'Innovation lead'], extra: 'Includes a pitch showcase each spring.' },
    { id: 'digital-humanities', name: 'Digital Humanities', school: 'College of Letters and Sciences', type: 'Certificate', area: 'Arts & humanities', credits: 12, blurb: 'Apply computational methods to texts, maps and archives.', careers: ['Archivist', 'Digital librarian', 'Research assistant'], extra: 'Courses are taught in a shared studio in the Central Library.' },
    { id: 'disability-studies', name: 'Disability Studies', school: 'College of Letters and Sciences', type: 'Certificate', area: 'Business & society', credits: 15, blurb: 'Explore disability through history, law, design and lived experience.', careers: ['Accessibility specialist', 'Advocacy', 'Policy analyst'], extra: 'Open to students in any major.' }
  ];
  var PEOPLE = [
    { name: 'Amara Okafor', role: 'Faculty', title: 'Professor of Biology', dept: 'School of Life Sciences', email: 'amara.okafor@wrenhollow.example', phone: '(555) 010-0101', office: 'Hollow Hall 214' },
    { name: 'Daniel Reyes', role: 'Faculty', title: 'Associate Professor of Computer Science', dept: 'College of Engineering and Computing', email: 'daniel.reyes@wrenhollow.example', phone: '(555) 010-0102', office: 'Engineering Annex 305' },
    { name: 'Priya Natarajan', role: 'Faculty', title: 'Assistant Professor of Data Science', dept: 'College of Engineering and Computing', email: 'priya.natarajan@wrenhollow.example', phone: '(555) 010-0103', office: 'Engineering Annex 312' },
    { name: 'Helen Fairbanks', role: 'Faculty', title: 'Professor of English', dept: 'College of Letters and Sciences', email: 'helen.fairbanks@wrenhollow.example', phone: '(555) 010-0104', office: 'Union South 108' },
    { name: 'Marcus Lindqvist', role: 'Faculty', title: 'Professor of Economics', dept: 'College of Letters and Sciences', email: 'marcus.lindqvist@wrenhollow.example', phone: '(555) 010-0105', office: 'Union South 220' },
    { name: 'Sofia Alvarez', role: 'Faculty', title: 'Clinical Professor of Nursing', dept: 'School of Nursing and Public Health', email: 'sofia.alvarez@wrenhollow.example', phone: '(555) 010-0106', office: 'Health Sciences Building 410' },
    { name: 'Jonas Whitaker', role: 'Staff', title: 'Director of Admissions', dept: 'Office of Admissions', email: 'jonas.whitaker@wrenhollow.example', phone: '(555) 010-0201', office: 'Hollow Hall 100' },
    { name: 'Lena Park', role: 'Staff', title: 'Financial Aid Counselor', dept: 'Office of Student Financial Aid', email: 'lena.park@wrenhollow.example', phone: '(555) 010-0202', office: 'Hollow Hall 120' },
    { name: 'Tomas Berg', role: 'Staff', title: 'Visit Program Coordinator', dept: 'Office of Admissions', email: 'tomas.berg@wrenhollow.example', phone: '(555) 010-0203', office: 'Welcome Center' },
    { name: 'Grace Mbeki', role: 'Staff', title: 'Accessibility Resource Coordinator', dept: 'Accessibility Resource Center', email: 'grace.mbeki@wrenhollow.example', phone: '(555) 010-0204', office: 'Central Library 150' },
    { name: 'Owen Castillo', role: 'Staff', title: 'Residence Life Manager', dept: 'University Housing', email: 'owen.castillo@wrenhollow.example', phone: '(555) 010-0205', office: 'Lakeshore Commons 12' },
    { name: 'Ingrid Sato', role: 'Staff', title: 'Research Compliance Officer', dept: 'Office of Research', email: 'ingrid.sato@wrenhollow.example', phone: '(555) 010-0206', office: 'Hollow Hall 340' }
  ];
  var EVENTS = [
    { id: 'e1', title: 'Open Lab Night: Life Sciences', date: '2026-11-17', time: '6:00 pm', place: 'Hollow Hall 100', cat: 'Lectures', text: 'Tour teaching labs and meet faculty and student researchers.' },
    { id: 'e2', title: 'Wrens vs. Lakeshore Gulls (volleyball)', date: '2026-11-20', time: '7:00 pm', place: 'Heron Arena', cat: 'Athletics', text: 'Regular-season home match. Free admission for students with a campus card.' },
    { id: 'e3', title: 'Transfer Student Info Session', date: '2026-11-21', time: '10:00 am', place: 'Welcome Center', cat: 'Admissions', text: 'Credit transfer, deadlines and advising for incoming transfer students.' },
    { id: 'e4', title: 'Fall Choral Concert', date: '2026-12-03', time: '7:30 pm', place: 'Union South Auditorium', cat: 'Campus life', text: 'The University Chorale and the Chamber Singers perform seasonal works.' },
    { id: 'e5', title: 'Lecture: Water and the Changing Lakeshore', date: '2026-12-08', time: '4:30 pm', place: 'Central Library Atrium', cat: 'Lectures', text: 'A public talk from the Center for Freshwater Studies.' },
    { id: 'e6', title: 'Winter Break Move-Out Help Desk', date: '2026-12-12', time: '9:00 am', place: 'Lakeshore Commons', cat: 'Campus life', text: 'Storage tips, shuttle times and recycling drop-off points.' },
    { id: 'e7', title: 'Admitted Student Welcome Day', date: '2027-01-23', time: '9:30 am', place: 'Heron Arena', cat: 'Admissions', text: 'Sessions for admitted students and families, with campus tours.' },
    { id: 'e8', title: 'Wrens Basketball Home Opener', date: '2027-01-29', time: '6:30 pm', place: 'Heron Arena', cat: 'Athletics', text: 'Doors open one hour before tip-off.' }
  ];
  var NEWS = [
    { id: 'story-lake-sensors', title: 'Student-built sensors track Lake Mendel temperatures', cat: 'Research', date: '2026-11-05', img: 'assets/lake.svg', summary: 'Undergraduates deployed a low-cost sensor array across the lake this fall.', body: 'A team of undergraduates in the Center for Freshwater Studies built and deployed twelve low-cost temperature sensors. The readings will be shared in an open dataset for local schools.' },
    { id: 'story-promise', title: 'Wren Promise expands to cover more families', cat: 'Campus life', date: '2026-11-03', img: 'assets/campus.svg', summary: 'The tuition program now reaches households earning up to $60,000 (demo figures).', body: 'The sample figures on this page are fictional and used only for demonstration. See the Admissions & Aid page for the estimator.' },
    { id: 'story-wrens-volley', title: 'Wrens volleyball clinches a home playoff match', cat: 'Athletics', date: '2026-11-01', img: 'assets/stadium.svg', summary: 'A five-set win on Saturday secured home-court advantage.', body: 'The team won its final regular-season match in five sets. Playoff details will be posted on the Athletics page (sample content).' },
    { id: 'story-open-lab', title: 'New open lab brings first-year students into research', cat: 'Research', date: '2026-10-28', img: 'assets/lab.svg', summary: 'A drop-in lab gives first-year students a path into faculty projects.', body: 'The open lab is staffed by graduate mentors and runs three evenings a week. Students can join a project for a single semester.' },
    { id: 'story-food-pantry', title: 'Campus food pantry doubles weekly hours', cat: 'Community', date: '2026-10-22', img: 'assets/community.svg', summary: 'Student volunteers and local partners keep shelves stocked.', body: 'The pantry is now open six days a week. Volunteers can sign up through Student Life (sample content, no live sign-up).' },
    { id: 'story-library-accessible', title: 'Library adds quiet, sensory-friendly study rooms', cat: 'Campus life', date: '2026-10-15', img: 'assets/campus.svg', summary: 'Four rooms offer adjustable lighting and low-noise spaces.', body: 'Rooms can be reserved by any student through the library desk. Staff from the Accessibility Resource Center helped design them.' }
  ];
  var RATES = { resident: 480, nonresident: 1350, fees: 380, housing: { none: 0, hall: 4100, apartment: 3600 }, promiseIncomeCap: 2 };
  var TOOL_NAMES = ['Email and calendar', 'Canvas (learning site)', 'Box (file storage)', 'Zoom', 'Libraries', 'Campus map', 'Jobs', 'Give'];

  /* ---------- Helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var norm = function (s) { return String(s).toLowerCase(); };
  var fmtDate = function (iso) { return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); };
  var param = function (n) { return new URLSearchParams(location.search).get(n) || ''; };
  var hits = function (hay, q) { var h = norm(hay); return norm(q).split(/\s+/).filter(Boolean).every(function (w) { return h.indexOf(w) !== -1; }); };

  /* ---------- Mobile menu, tools menu, Escape ---------- */
  var menuBtn = $('.menu-toggle'), nav = $('.primary-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }
  var toolsBtn = $('.tools-toggle'), toolsMenu = $('.tools-menu');
  function closeTools(refocus) {
    if (!toolsMenu || toolsMenu.hidden) return;
    toolsMenu.hidden = true;
    toolsBtn.setAttribute('aria-expanded', 'false');
    if (refocus) toolsBtn.focus();
  }
  if (toolsBtn && toolsMenu) {
    TOOL_NAMES.forEach(function (n) {
      var li = document.createElement('li');
      li.innerHTML = '<button type="button" data-demo-tool="' + esc(n) + '">' + esc(n) + '</button>';
      toolsMenu.appendChild(li);
    });
    toolsBtn.addEventListener('click', function () {
      var open = toolsMenu.hidden;
      toolsMenu.hidden = !open;
      toolsBtn.setAttribute('aria-expanded', String(open));
    });
  }
  document.addEventListener('click', function (e) {
    if (toolsBtn && !e.target.closest('.tools-wrap')) closeTools(false);
    var tool = e.target.closest('[data-demo-tool]');
    if (tool) { closeTools(false); openDialog('Demo link: ' + tool.dataset.demoTool, '<p>This is a demonstration. In the reference site this item leads to a separate campus service. Nothing is loaded in this replica.</p>', tool, toolsBtn); }
    var signIn = e.target.closest('[data-demo-signin]');
    if (signIn) openDialog('MyWren sign-in (demo)', signInForm(), signIn);
    var t = e.target.closest('[data-toggle]');
    if (t) {
      var open = t.getAttribute('aria-expanded') !== 'true';
      t.setAttribute('aria-expanded', String(open));
      document.getElementById(t.getAttribute('aria-controls')).hidden = !open;
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (toolsMenu && !toolsMenu.hidden) closeTools(true);
    if (nav && nav.classList.contains('is-open') && !document.querySelector('dialog[open]')) {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });

  /* ---------- Demo dialog (native <dialog>: focus trap + Escape built in) ---------- */
  function openDialog(title, bodyHtml, opener, fallbackFocus) {
    var d = document.getElementById('demo-dialog');
    if (!d) {
      d = document.createElement('dialog');
      d.id = 'demo-dialog';
      d.setAttribute('aria-labelledby', 'demo-dialog-title');
      d.setAttribute('data-section', 'demo-dialog');
      d.setAttribute('data-component', 'modal-dialog');
      document.body.appendChild(d);
    }
    d.innerHTML = '<h2 id="demo-dialog-title">' + esc(title) + '</h2><p class="demo-note"><span class="badge">Demo</span> Nothing you type here is sent or stored.</p><div class="dialog-body">' + bodyHtml + '</div><div class="dialog-actions"><button type="button" class="btn btn-secondary" data-close-dialog>Close</button></div>';
    $$('form[data-validate]', d).forEach(initForm);
    d.addEventListener('close', function () { (opener && document.contains(opener) && opener.offsetParent !== null ? opener : fallbackFocus || document.body).focus(); }, { once: true });
    d.showModal();
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-dialog]')) e.target.closest('dialog').close();
  });
  function signInForm() {
    return '<form data-validate data-section="demo-signin" data-component="login-form" novalidate data-success="Demo sign-in accepted. No account exists and no session was started." data-instance="myuw-demo">' +
      '<div class="field"><label for="d-netid">Wren ID</label><p class="hint" id="d-netid-hint">Letters and numbers, at least 3 characters.</p><input type="text" id="d-netid" name="netid" required minlength="3" pattern="[A-Za-z0-9]+" autocomplete="username" data-msg-required="Enter your Wren ID." data-msg="Wren ID must be at least 3 letters or numbers, with no spaces."></div>' +
      '<div class="field"><label for="d-pass">Password</label><input type="password" id="d-pass" name="password" required minlength="8" autocomplete="current-password" data-msg-required="Enter your password." data-msg="Password must be at least 8 characters."></div>' +
      '<button type="submit" class="btn">Sign in (demo)</button></form>';
  }

  /* ---------- Form validation (shared) ---------- */
  function labelFor(el) { var l = el.id && $('label[for="' + el.id + '"]'); return l ? l.textContent.trim() : el.name; }
  function errorMessage(el) {
    var v = el.validity, d = el.dataset;
    if (el.type === 'date' && el.value && el.hasAttribute('data-not-past')) {
      var n = new Date(), today = n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
      if (el.value < today) return d.msgPast || 'Choose a date that is today or later.';
    }
    if (v.valid) return '';
    if (v.valueMissing) return d.msgRequired || (el.tagName === 'SELECT' ? 'Select ' : 'Enter ') + labelFor(el) + '.';
    return d.msg || d.msgType || 'Check the value entered for ' + labelFor(el) + '.';
  }
  function clearError(el) {
    el.removeAttribute('aria-invalid');
    var e = document.getElementById(el.id + '-error');
    if (e) e.remove();
    var base = (el.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== el.id + '-error'; });
    if (base.length) el.setAttribute('aria-describedby', base.join(' ')); else el.removeAttribute('aria-describedby');
  }
  function showError(el, msg) {
    var p = document.createElement('p');
    p.className = 'field-error';
    p.id = el.id + '-error';
    p.textContent = msg;
    (el.type === 'checkbox' ? el.parentNode : el).insertAdjacentElement('afterend', p);
    el.setAttribute('aria-invalid', 'true');
    el.setAttribute('aria-describedby', ((el.getAttribute('aria-describedby') || '') + ' ' + p.id).trim());
  }
  function initForm(form) {
    var summary = document.createElement('div');
    summary.className = 'error-summary';
    summary.setAttribute('role', 'alert');
    summary.tabIndex = -1;
    summary.hidden = true;
    form.insertBefore(summary, form.firstChild);
    var controls = function () { return $$('input:not([type=hidden]),select,textarea', form); };
    controls().forEach(function (el) { el.addEventListener('input', function () { if (el.getAttribute('aria-invalid')) { clearError(el); var m = errorMessage(el); if (m) showError(el, m); } }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = [];
      controls().forEach(function (el) { clearError(el); var m = errorMessage(el); if (m) { showError(el, m); bad.push({ el: el, m: m }); } });
      if (bad.length) {
        summary.innerHTML = '<h2>There ' + (bad.length === 1 ? 'is 1 problem' : 'are ' + bad.length + ' problems') + ' with this form</h2><ul>' + bad.map(function (b) { return '<li><a href="#' + b.el.id + '">' + esc(b.m) + '</a></li>'; }).join('') + '</ul>';
        summary.hidden = false;
        summary.focus();
        $$('a', summary).forEach(function (a, i) { a.addEventListener('click', function (ev) { ev.preventDefault(); bad[i].el.focus(); }); });
        return;
      }
      summary.hidden = true;
      var handler = form.dataset.handler;
      if (handler === 'estimate') return estimate(form);
      var ok = document.createElement('div');
      ok.className = 'demo-success';
      ok.tabIndex = -1;
      ok.setAttribute('role', 'status');
      ok.innerHTML = '<h2>Demo submission complete</h2><p>' + esc(form.dataset.success) + '</p><button type="button" class="btn btn-secondary">Start over</button>';
      form.hidden = true;
      form.insertAdjacentElement('afterend', ok);
      ok.focus();
      $('button', ok).addEventListener('click', function () { ok.remove(); form.reset(); form.hidden = false; controls()[0].focus(); });
    });
  }
  $$('form[data-validate]').forEach(initForm);

  /* ---------- Tuition estimator (admissions.html) ---------- */
  function estimate(form) {
    var f = form.elements, credits = +f.credits.value, resident = f.residency.value === 'resident';
    var covered = resident && +f.income.value <= RATES.promiseIncomeCap;
    var tuition = credits * (resident ? RATES.resident : RATES.nonresident), fees = RATES.fees, housing = RATES.housing[f.housing.value];
    var money = function (n) { return '$' + n.toLocaleString('en-US'); };
    var out = $('#estimate-result');
    out.hidden = false;
    out.innerHTML = '<h3>Estimated cost for one semester (demo figures)</h3><table><caption class="visually-hidden">Estimated semester cost</caption><tbody>' +
      '<tr><th scope="row">Tuition (' + credits + ' credits)</th><td>' + money(tuition) + '</td></tr>' +
      '<tr><th scope="row">Fees</th><td>' + money(fees) + '</td></tr>' +
      '<tr><th scope="row">Housing</th><td>' + money(housing) + '</td></tr>' +
      (covered ? '<tr><th scope="row">Wren Promise tuition award</th><td>−' + money(tuition) + '</td></tr>' : '') +
      '<tr><th scope="row">Estimated total</th><td><strong>' + money(tuition + fees + housing - (covered ? tuition : 0)) + '</strong></td></tr></tbody></table><p class="hint">Fictional rates for demonstration only. This is not a quote and no aid decision is made.</p>';
  }

  /* ---------- Header search look-ahead ---------- */
  $$('form[data-component="site-search"]').forEach(function (form, n) {
    var input = $('input[type=search]', form), id = 'lookahead-' + n;
    var list = document.createElement('ul'), status = document.createElement('p');
    list.className = 'lookahead'; list.id = id; list.hidden = true;
    status.className = 'visually-hidden'; status.setAttribute('role', 'status');
    input.setAttribute('aria-controls', id);
    form.appendChild(list); form.appendChild(status);
    var close = function () { list.hidden = true; };
    input.addEventListener('input', function () {
      var q = input.value.trim(), items = q.length < 2 ? [] : PAGES.filter(function (p) { return hits(p.title + ' ' + p.keys, q); }).concat(PROGRAMS.filter(function (p) { return hits(p.name, q); }).map(function (p) { return { title: p.name + ' (' + p.type.toLowerCase() + ')', url: 'program.html?id=' + p.id }; })).slice(0, 6);
      list.innerHTML = items.map(function (i) { return '<li><a href="' + i.url + '">' + esc(i.title) + '</a></li>'; }).join('');
      list.hidden = !items.length;
      status.textContent = q.length < 2 ? '' : items.length ? items.length + ' suggestions. Press Down Arrow to review.' : 'No suggestions.';
    });
    form.addEventListener('keydown', function (e) {
      var links = $$('a', list), i = links.indexOf(document.activeElement);
      if (e.key === 'Escape' && !list.hidden) { close(); input.focus(); e.stopPropagation(); }
      else if (e.key === 'ArrowDown' && links.length && !list.hidden) { e.preventDefault(); links[Math.min(i + 1, links.length - 1)].focus(); }
      else if (e.key === 'ArrowUp' && i >= 0) { e.preventDefault(); (i ? links[i - 1] : input).focus(); }
    });
    form.addEventListener('focusout', function (e) { if (!form.contains(e.relatedTarget)) close(); });
  });

  /* ---------- Program finder (majors.html) ---------- */
  var finder = $('#program-filter');
  if (finder) {
    var results = $('#pf-results'), count = $('#pf-count'), empty = $('#pf-empty');
    var areas = PROGRAMS.map(function (p) { return p.area; }).filter(function (a, i, arr) { return arr.indexOf(a) === i; }).sort();
    $('#pf-area').insertAdjacentHTML('beforeend', areas.map(function (a) { return '<option>' + esc(a) + '</option>'; }).join(''));
    var runFinder = function () {
      var q = $('#pf-q').value, area = $('#pf-area').value, type = $('#pf-type').value;
      var list = PROGRAMS.filter(function (p) { return (!q || hits(p.name + ' ' + p.school + ' ' + p.blurb, q)) && (!area || p.area === area) && (!type || p.type === type); });
      results.innerHTML = list.map(function (p) { return '<li><article class="card" data-component="program-card"><div class="card-body"><p class="meta">' + esc(p.type) + ' · ' + esc(p.school) + '</p><h3><a class="card-link" href="program.html?id=' + p.id + '">' + esc(p.name) + '</a></h3><p>' + esc(p.blurb) + '</p><span class="tag">' + esc(p.area) + '</span></div></article></li>'; }).join('');
      empty.hidden = list.length > 0;
      count.textContent = list.length + (list.length === 1 ? ' program' : ' programs') + ' shown of ' + PROGRAMS.length;
    };
    finder.addEventListener('input', runFinder);
    finder.addEventListener('change', runFinder);
    finder.addEventListener('submit', function (e) { e.preventDefault(); runFinder(); });
    finder.addEventListener('reset', function () { setTimeout(runFinder); });
    $('#pf-clear').addEventListener('click', function () { finder.reset(); $('#pf-q').focus(); });
    $('#pf-q').value = param('q');
    runFinder();
  }

  /* ---------- Program detail (program.html?id=...) ---------- */
  var detail = $('#program-detail');
  if (detail) {
    var p = PROGRAMS.filter(function (x) { return x.id === param('id'); })[0], title = $('#program-title');
    if (!p) {
      title.textContent = 'Program not found';
      detail.innerHTML = '<div class="empty-state"><p>We could not find a program with that identifier.</p><p><a class="btn" href="majors.html">Back to majors and certificates</a></p></div>';
    } else {
      title.textContent = p.name;
      document.title = p.name + ' - Wren Hollow University';
      $('#program-crumb').textContent = p.name;
      detail.innerHTML = '<p class="lead">' + esc(p.blurb) + '</p><dl class="plain-dl"><dt>Type</dt><dd>' + esc(p.type) + '</dd><dt>School or college</dt><dd>' + esc(p.school) + '</dd><dt>Area of interest</dt><dd>' + esc(p.area) + '</dd><dt>Credits to complete</dt><dd>' + p.credits + '</dd></dl>' +
        '<h2>Where graduates go</h2><ul>' + p.careers.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul><h2>Good to know</h2><p>' + esc(p.extra) + '</p>' +
        '<div class="btn-row"><a class="btn" href="apply.html">Apply</a><a class="btn btn-secondary" href="visit.html">Request a visit</a><a class="btn btn-secondary" href="majors.html">All programs</a></div>';
    }
  }

  /* ---------- Directory (directory.html) ---------- */
  var dir = $('#directory-form');
  if (dir) {
    var dres = $('#dir-results'), dstat = $('#dir-count'), dempty = $('#dir-empty');
    dir.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = $('#dir-q').value.trim(), role = (dir.elements.role.value);
      var list = PEOPLE.filter(function (x) { return hits(x.name + ' ' + x.title + ' ' + x.dept, q) && (role === 'all' || x.role === role); });
      dres.innerHTML = list.map(function (x) { return '<li class="person" data-component="person-card"><h3>' + esc(x.name) + '</h3><p>' + esc(x.title) + ', ' + esc(x.dept) + '</p><dl><dt>Email</dt><dd>' + esc(x.email) + '</dd><dt>Phone</dt><dd>' + esc(x.phone) + '</dd><dt>Office</dt><dd>' + esc(x.office) + '</dd></dl></li>'; }).join('');
      dempty.hidden = list.length > 0;
      dstat.textContent = list.length + (list.length === 1 ? ' person found' : ' people found');
    });
  }

  /* ---------- News and events (news.html) ---------- */
  var newsList = $('#news-list');
  if (newsList) {
    var cats = ['All'].concat(NEWS.map(function (n) { return n.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var bar = $('#news-filters'), ncount = $('#news-count');
    newsList.innerHTML = NEWS.map(function (n) {
      return '<li data-cat="' + esc(n.cat) + '"><article class="card" id="' + n.id + '" data-component="news-card"><img src="' + n.img + '" alt="" width="640" height="400"><div class="card-body"><p class="meta">' + esc(n.cat) + ' · ' + fmtDate(n.date) + '</p><h3>' + esc(n.title) + '</h3><p>' + esc(n.summary) + '</p><button type="button" class="expander" data-toggle aria-expanded="false" aria-controls="' + n.id + '-body">Read more<span class="visually-hidden">: ' + esc(n.title) + '</span></button><div id="' + n.id + '-body" hidden><p>' + esc(n.body) + '</p></div></div></article></li>';
    }).join('');
    bar.innerHTML = cats.map(function (c, i) { return '<button type="button" aria-pressed="' + (i === 0) + '">' + esc(c) + '</button>'; }).join('');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      $$('button', bar).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var shown = 0;
      $$('li', newsList).forEach(function (li) { var ok = b.textContent === 'All' || li.dataset.cat === b.textContent; li.hidden = !ok; if (ok) shown++; });
      ncount.textContent = shown + ' ' + (shown === 1 ? 'story' : 'stories') + ' shown in ' + b.textContent;
    });
    var target = location.hash && document.getElementById(location.hash.slice(1));
    if (target && target.querySelector('[data-toggle]')) target.querySelector('[data-toggle]').click();

    var evForm = $('#event-filter'), evList = $('#event-list'), evCount = $('#event-count'), evEmpty = $('#event-empty');
    var runEvents = function () {
      var q = $('#ev-q').value, cat = $('#ev-cat').value;
      var list = EVENTS.filter(function (v) { return (!q || hits(v.title + ' ' + v.text + ' ' + v.place, q)) && (!cat || v.cat === cat); });
      evList.innerHTML = list.map(function (v) {
        var d = new Date(v.date + 'T12:00:00');
        return '<li data-component="event-item"><div class="event-date" aria-hidden="true"><strong>' + d.getDate() + '</strong>' + d.toLocaleDateString('en-US', { month: 'short' }) + '</div><div><h3>' + esc(v.title) + '</h3><p class="meta">' + fmtDate(v.date) + ', ' + esc(v.time) + ' · ' + esc(v.place) + ' · ' + esc(v.cat) + '</p><p>' + esc(v.text) + '</p></div></li>';
      }).join('');
      evEmpty.hidden = list.length > 0;
      evCount.textContent = list.length + (list.length === 1 ? ' event' : ' events') + ' shown';
    };
    evForm.addEventListener('input', runEvents);
    evForm.addEventListener('submit', function (e) { e.preventDefault(); runEvents(); });
    runEvents();
  }

  /* ---------- Site search results (search.html?q=...) ---------- */
  var sres = $('#search-results');
  if (sres) {
    var q = param('q').trim(), sec = [];
    $('#search-q').value = q;
    $('#search-heading').textContent = q ? 'Results for “' + q + '”' : 'Search Wren Hollow';
    if (q) {
      var add = function (name, arr) { if (arr.length) sec.push('<h2>' + name + '</h2><ul>' + arr.join('') + '</ul>'); };
      add('Pages', PAGES.filter(function (x) { return hits(x.title + ' ' + x.keys, q); }).map(function (x) { return '<li><a href="' + x.url + '">' + esc(x.title) + '</a></li>'; }));
      add('Programs', PROGRAMS.filter(function (x) { return hits(x.name + ' ' + x.blurb, q); }).map(function (x) { return '<li><a href="program.html?id=' + x.id + '">' + esc(x.name) + '</a> (' + esc(x.type.toLowerCase()) + ')</li>'; }));
      add('News', NEWS.filter(function (x) { return hits(x.title + ' ' + x.summary, q); }).map(function (x) { return '<li><a href="news.html#' + x.id + '">' + esc(x.title) + '</a></li>'; }));
      add('People', PEOPLE.filter(function (x) { return hits(x.name + ' ' + x.title + ' ' + x.dept, q); }).map(function (x) { return '<li><a href="directory.html">' + esc(x.name) + '</a>, ' + esc(x.title) + '</li>'; }));
    }
    sres.innerHTML = !q ? '<p>Enter a search term above.</p>' : sec.length ? sec.join('') : '<div class="empty-state"><p>No results for “' + esc(q) + '”. Try a shorter word, or browse <a href="majors.html">majors and certificates</a>.</p></div>';
  }
})();
