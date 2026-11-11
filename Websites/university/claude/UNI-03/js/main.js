/* Harbor Valley Community College (fictional) - UNI-03 replica behaviour.
   Vanilla JS, no network. All data below is invented sample data. */
(function () {
  'use strict';

  /* ---------- sample data ---------- */
  var PROGRAMS = [
    { id: 'business-administration', title: 'Business Administration', degree: 'AS', interest: 'Business', credits: 60, modality: 'Hybrid', campuses: ['Riverside', 'Online'], summary: 'Transfer-focused foundation in management, economics and accounting.', courses: ['Principles of Management', 'Microeconomics', 'Financial Accounting', 'Business Statistics'], careers: ['Operations coordinator', 'Small-business owner', 'Transfer to a four-year business major'] },
    { id: 'accounting', title: 'Accounting', degree: 'AAS', interest: 'Business', credits: 62, modality: 'In person', campuses: ['Riverside'], summary: 'Career-ready bookkeeping, payroll and tax preparation skills.', courses: ['Intermediate Accounting', 'Payroll Systems', 'Individual Income Tax', 'Spreadsheet Applications'], careers: ['Bookkeeper', 'Payroll specialist', 'Tax preparer'] },
    { id: 'nursing', title: 'Nursing', degree: 'AAS', interest: 'Health', credits: 70, modality: 'In person', campuses: ['Northgate'], summary: 'Limited-enrollment program with clinical rotations at regional partners.', courses: ['Foundations of Nursing', 'Pharmacology', 'Adult Health Nursing', 'Maternal-Child Nursing'], careers: ['Registered nurse (after licensure exam)', 'Clinic nurse', 'Transfer to a bachelor of nursing program'] },
    { id: 'medical-assisting', title: 'Medical Assisting', degree: 'Certificate', interest: 'Health', credits: 30, modality: 'Hybrid', campuses: ['Northgate', 'Millbrook'], summary: 'One-year certificate covering clinical and front-office skills.', courses: ['Medical Terminology', 'Clinical Procedures', 'Medical Office Practice', 'Externship'], careers: ['Medical assistant', 'Patient coordinator'] },
    { id: 'cybersecurity', title: 'Cybersecurity', degree: 'AAS', interest: 'Technology', credits: 62, modality: 'Hybrid', campuses: ['Northgate', 'Online'], summary: 'Hands-on network defense, ethical hacking and incident response labs.', courses: ['Network Fundamentals', 'Security Essentials', 'Ethical Hacking', 'Incident Response'], careers: ['Security analyst', 'Help-desk technician', 'Network administrator'] },
    { id: 'computer-science', title: 'Computer Science', degree: 'AS', interest: 'Technology', credits: 60, modality: 'Online', campuses: ['Riverside', 'Online'], summary: 'Programming, data structures and discrete mathematics for transfer students.', courses: ['Programming I', 'Programming II', 'Discrete Mathematics', 'Calculus I'], careers: ['Junior developer', 'Transfer to a computer science major'] },
    { id: 'web-development', title: 'Web Development', degree: 'Certificate', interest: 'Technology', credits: 24, modality: 'Online', campuses: ['Online'], summary: 'Short certificate in HTML, CSS, JavaScript and accessible design.', courses: ['Web Foundations', 'Responsive Design', 'JavaScript Basics', 'Web Accessibility'], careers: ['Front-end assistant', 'Freelance web designer'] },
    { id: 'early-childhood-education', title: 'Early Childhood Education', degree: 'AAS', interest: 'Education', credits: 60, modality: 'Hybrid', campuses: ['Millbrook', 'Online'], summary: 'Prepares students to teach and care for children from birth to age eight.', courses: ['Child Development', 'Curriculum Planning', 'Family Engagement', 'Practicum'], careers: ['Preschool teacher', 'Childcare center director'] },
    { id: 'liberal-arts', title: 'Liberal Arts', degree: 'AA', interest: 'Arts & Humanities', credits: 60, modality: 'In person', campuses: ['Riverside', 'Northgate', 'Online'], summary: 'Flexible general-education pathway with concentrations in writing, history or languages.', courses: ['English Composition', 'World History', 'Introduction to Philosophy', 'Elective sequence'], careers: ['Transfer to a bachelor of arts program', 'Communications assistant'] },
    { id: 'graphic-design', title: 'Graphic Design', degree: 'AAS', interest: 'Arts & Humanities', credits: 62, modality: 'In person', campuses: ['Riverside'], summary: 'Studio-based program in typography, layout and digital illustration.', courses: ['Design Fundamentals', 'Typography', 'Digital Illustration', 'Portfolio Seminar'], careers: ['Junior designer', 'Production artist'] },
    { id: 'biology', title: 'Biology', degree: 'AS', interest: 'Science & Math', credits: 60, modality: 'In person', campuses: ['Riverside'], summary: 'Lab-intensive transfer degree in cell biology, genetics and ecology.', courses: ['General Biology I', 'General Biology II', 'General Chemistry', 'Statistics'], careers: ['Lab technician', 'Transfer to a biology or pre-health major'] },
    { id: 'engineering', title: 'Engineering Science', degree: 'AS', interest: 'Trades & Engineering', credits: 64, modality: 'In person', campuses: ['Northgate'], summary: 'Calculus, physics and design courses that transfer to engineering schools.', courses: ['Calculus I-III', 'University Physics', 'Engineering Graphics', 'Statics'], careers: ['Engineering technician', 'Transfer to an engineering major'] },
    { id: 'hvac', title: 'HVAC Technology', degree: 'Certificate', interest: 'Trades & Engineering', credits: 32, modality: 'In person', campuses: ['Millbrook'], summary: 'Heating, cooling and refrigeration training in a working shop.', courses: ['Refrigeration Principles', 'Electrical Controls', 'Heat Pump Systems', 'Shop Safety'], careers: ['HVAC installer', 'Service technician'] },
    { id: 'general-studies', title: 'General Studies', degree: 'AS', interest: 'Science & Math', credits: 60, modality: 'Online', campuses: ['Online'], summary: 'Self-designed associate degree for students still exploring options.', courses: ['College Writing', 'Quantitative Reasoning', 'Natural Science with Lab', 'Electives'], careers: ['Transfer student', 'Career changer'] }
  ];
  var DEGREE_NAMES = { AA: 'Associate of Arts', AS: 'Associate of Science', AAS: 'Associate of Applied Science', Certificate: 'Certificate' };

  var SECTIONS = [
    { code: 'ENG 101', title: 'College Composition I', crn: '20114', campus: 'Riverside', modality: 'In person', when: 'Mon/Wed 9:00-10:15', seats: 4 },
    { code: 'ENG 101', title: 'College Composition I', crn: '20115', campus: 'Online', modality: 'Online', when: 'Asynchronous', seats: 12 },
    { code: 'MTH 151', title: 'Statistics', crn: '20231', campus: 'Northgate', modality: 'Hybrid', when: 'Tue 6:00-8:45', seats: 0 },
    { code: 'BIO 101', title: 'General Biology I', crn: '20302', campus: 'Riverside', modality: 'In person', when: 'Tue/Thu 10:30-12:45', seats: 2 },
    { code: 'ACC 211', title: 'Financial Accounting', crn: '20410', campus: 'Riverside', modality: 'In person', when: 'Mon/Wed 1:00-2:15', seats: 9 },
    { code: 'CYB 120', title: 'Security Essentials', crn: '20533', campus: 'Northgate', modality: 'Hybrid', when: 'Thu 5:30-8:15', seats: 7 },
    { code: 'CSC 201', title: 'Programming I', crn: '20548', campus: 'Online', modality: 'Online', when: 'Asynchronous', seats: 0 },
    { code: 'ECE 100', title: 'Child Development', crn: '20610', campus: 'Millbrook', modality: 'In person', when: 'Wed 6:00-8:45', seats: 11 },
    { code: 'HVC 110', title: 'Refrigeration Principles', crn: '20702', campus: 'Millbrook', modality: 'In person', when: 'Mon-Thu 8:00-10:00', seats: 5 },
    { code: 'HIS 112', title: 'World History II', crn: '20815', campus: 'Online', modality: 'Online', when: 'Asynchronous', seats: 18 }
  ];

  var EVENTS = [
    { term: 'Fall 2026', date: '2026-08-24', label: 'Fall classes begin' },
    { term: 'Fall 2026', date: '2026-09-07', label: 'Labor Day: college closed' },
    { term: 'Fall 2026', date: '2026-11-25', label: 'Thanksgiving recess begins' },
    { term: 'Fall 2026', date: '2026-12-11', label: 'Last day of classes' },
    { term: 'Fall 2026', date: '2026-12-14', label: 'Final exams week begins' },
    { term: 'Spring 2027', date: '2026-11-16', label: 'Spring registration opens for continuing students' },
    { term: 'Spring 2027', date: '2027-01-11', label: 'Spring classes begin' },
    { term: 'Spring 2027', date: '2027-01-18', label: 'Martin Luther King Jr. Day: college closed' },
    { term: 'Spring 2027', date: '2027-03-15', label: 'Spring break begins' },
    { term: 'Spring 2027', date: '2027-05-07', label: 'Last day of classes' },
    { term: 'Spring 2027', date: '2027-05-21', label: 'Commencement ceremony' }
  ];

  var NEWS = [
    { date: '2026-11-04', cat: 'Academics', title: 'Cybersecurity lab earns regional training grant', summary: 'A state workforce grant will fund new network-defense equipment at the Northgate Campus.' },
    { date: '2026-10-28', cat: 'Students', title: 'Heron Pantry expands weekday hours', summary: 'The student food pantry now opens at all three campuses Monday through Thursday.' },
    { date: '2026-10-19', cat: 'Community', title: 'Fall open house draws record families', summary: 'More than 400 visitors toured classrooms, labs and the new Millbrook trades shop.' },
    { date: '2026-10-07', cat: 'Campus', title: 'Riverside library reopens after renovation', summary: 'New quiet study rooms and a 24-hour study lounge are available to enrolled students.' },
    { date: '2026-09-22', cat: 'Academics', title: 'Nursing program receives accreditation renewal', summary: 'The college announced a full renewal for the associate nursing program.' },
    { date: '2026-09-10', cat: 'Students', title: 'Student Government elections open', summary: 'Candidate statements are posted and voting runs through the end of the month.' },
    { date: '2026-08-18', cat: 'Campus', title: 'New shuttle links Riverside and Northgate', summary: 'A free shuttle runs every 30 minutes on weekdays during the fall term.' },
    { date: '2026-08-03', cat: 'Community', title: 'Scholarship foundation awards 120 grants', summary: 'The Harbor Valley Foundation announced its largest scholarship class to date.' }
  ];

  var PEOPLE = [
    { type: 'people', name: 'Dana Okafor', role: 'Professor of Biology', dept: 'Science & Math Division', place: 'Riverside, Hall B-214', phone: '555-0110', email: 'dokafor@hvcc.example' },
    { type: 'people', name: 'Marcus Lindqvist', role: 'Professor of English', dept: 'Humanities Division', place: 'Riverside, Hall A-105', phone: '555-0111', email: 'mlindqvist@hvcc.example' },
    { type: 'people', name: 'Priya Raman', role: 'Cybersecurity Program Lead', dept: 'Technology Division', place: 'Northgate, Lab 3', phone: '555-0112', email: 'praman@hvcc.example' },
    { type: 'people', name: 'Tomas Herrera', role: 'HVAC Instructor', dept: 'Trades Division', place: 'Millbrook, Shop 1', phone: '555-0113', email: 'therrera@hvcc.example' },
    { type: 'people', name: 'Jean-Luc Moreau', role: 'Academic Advisor', dept: 'Advising Center', place: 'Riverside, Student Hall 120', phone: '555-0114', email: 'jmoreau@hvcc.example' },
    { type: 'people', name: 'Sofia Tran', role: 'Financial Aid Counselor', dept: 'Financial Aid Office', place: 'Riverside, Student Hall 140', phone: '555-0115', email: 'stran@hvcc.example' },
    { type: 'people', name: 'Wendell Park', role: 'Director of Admissions', dept: 'Admissions Office', place: 'Riverside, Student Hall 100', phone: '555-0116', email: 'wpark@hvcc.example' },
    { type: 'people', name: 'Amara Diallo', role: 'Accessibility Services Coordinator', dept: 'Accessibility Services', place: 'Northgate, Library 2', phone: '555-0117', email: 'adiallo@hvcc.example' },
    { type: 'offices', name: 'Admissions Office', role: 'Applications, placement and enrollment help', dept: 'Enrollment Services', place: 'Riverside, Student Hall 100', phone: '555-0100', email: 'admissions@hvcc.example' },
    { type: 'offices', name: 'Financial Aid Office', role: 'FAFSA help and scholarships', dept: 'Enrollment Services', place: 'Riverside, Student Hall 140', phone: '555-0101', email: 'aid@hvcc.example' },
    { type: 'offices', name: 'Advising Center', role: 'Academic planning and transfer', dept: 'Student Success', place: 'Riverside, Student Hall 120', phone: '555-0102', email: 'advising@hvcc.example' },
    { type: 'offices', name: 'Library', role: 'Research help and study rooms', dept: 'Learning Resources', place: 'Riverside, Library', phone: '555-0103', email: 'library@hvcc.example' },
    { type: 'offices', name: 'Testing Center', role: 'Placement and proctored exams', dept: 'Student Success', place: 'Northgate, Library 1', phone: '555-0104', email: 'testing@hvcc.example' },
    { type: 'offices', name: 'Campus Safety', role: 'Safety escorts and lost and found', dept: 'Operations', place: 'All campuses', phone: '555-0199', email: 'safety@hvcc.example' }
  ];

  var SITE_PAGES = [
    ['index.html', 'Home', 'Welcome, hero, student support and quick links'],
    ['programs.html', 'Find a Program', 'Search degrees and certificates by interest'],
    ['schedule.html', 'Schedule of Classes', 'Search sample class sections by campus and format'],
    ['calendar.html', 'Academic Calendar', 'Term start dates, holidays and deadlines'],
    ['admissions.html', 'Admissions & Aid', 'Admissions overview and next steps'],
    ['apply.html', 'Apply', 'Steps to apply and a practice application form'],
    ['financial-aid.html', 'Financial Aid', 'Grants, scholarships, work-study and loans'],
    ['tuition.html', 'Tuition & Costs', 'Per-credit rates and a cost estimator'],
    ['visit.html', 'Visit & Connect', 'Tours, open houses and a visit request form'],
    ['student-resources.html', 'Student Resources', 'Advising, tutoring, accessibility and transfer help'],
    ['student-life.html', 'Student Life', 'Clubs, athletics, wellness and arts'],
    ['locations.html', 'Locations', 'Campuses and centers'],
    ['directory.html', 'College Directory', 'Search people and offices'],
    ['news.html', 'News', 'College news and announcements']
  ];

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var params = new URLSearchParams(window.location.search);
  var norm = function (s) { return String(s || '').toLowerCase().trim(); };
  var fmtDate = function (iso) {
    var p = iso.split('-');
    return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  // Data above is invented and trusted; user text is only ever set with textContent.
  function announce(node, text) { node.textContent = text; }

  /* ---------- disclosures: menus, utility dropdowns, mobile nav ---------- */
  var toggles = $$('[data-disclosure]');
  function setOpen(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (panel) panel.hidden = !open;
  }
  // Close every other disclosure, but keep ancestors of the one being opened (mobile menu > group).
  function closeAll(except) {
    toggles.forEach(function (b) {
      var panel = document.getElementById(b.getAttribute('aria-controls'));
      if (b !== except && !(except && panel.contains(except))) setOpen(b, false);
    });
  }
  toggles.forEach(function (btn) {
    setOpen(btn, false);
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      closeAll(open ? btn : null);
      setOpen(btn, open);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var active = document.activeElement;
    // Last match in DOM order is the innermost disclosure (group inside mobile menu).
    var current = toggles.filter(function (b) {
      return b.getAttribute('aria-expanded') === 'true' && (b === active || document.getElementById(b.getAttribute('aria-controls')).contains(active));
    }).pop();
    if (current) { setOpen(current, false); current.focus(); } else closeAll();
  });
  document.addEventListener('click', function (e) {
    toggles.forEach(function (b) {
      var panel = document.getElementById(b.getAttribute('aria-controls'));
      if (b.getAttribute('aria-expanded') === 'true' && !b.contains(e.target) && !(panel && panel.contains(e.target))) setOpen(b, false);
    });
  });
  // Closing menus when focus tabs out of the header keeps the page order predictable.
  var header = $('[data-component="site-header"]');
  if (header) header.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !header.contains(e.relatedTarget)) closeAll();
  });

  /* Language menu: demo only. */
  $$('[data-language]').forEach(function (b) {
    b.addEventListener('click', function () {
      var note = $('[data-language-note]');
      announce(note, 'Demo only: ' + b.textContent + ' selected. Page translation is not available in this replica.');
    });
  });

  /* ---------- sign-in dialog (simulation) ---------- */
  $$('[data-open-dialog]').forEach(function (b) {
    b.addEventListener('click', function () {
      closeAll();
      var d = document.getElementById(b.getAttribute('data-open-dialog'));
      if (d && d.showModal) d.showModal();
    });
  });
  $$('[data-close-dialog]').forEach(function (b) {
    b.addEventListener('click', function () { b.closest('dialog').close(); });
  });

  /* ---------- accordions ---------- */
  $$('[data-accordion] button[aria-controls]').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
    });
  });

  /* ---------- form validation with error summary and focus management ---------- */
  function labelOf(ctl) {
    var l = ctl.id && $('label[for="' + ctl.id + '"]');
    var t = ctl.dataset.label || (l ? l.textContent : ctl.name);
    return String(t).replace(/\s*\*?\s*$/, '').trim();
  }
  function fieldError(ctl, msg) {
    var id = ctl.id + '-error', p = document.getElementById(id);
    if (!msg) {
      if (p) p.remove();
      ctl.removeAttribute('aria-invalid');
      if (ctl.dataset.describedby != null) {
        if (ctl.dataset.describedby) ctl.setAttribute('aria-describedby', ctl.dataset.describedby); else ctl.removeAttribute('aria-describedby');
      }
      return;
    }
    if (ctl.dataset.describedby == null) ctl.dataset.describedby = ctl.getAttribute('aria-describedby') || '';
    if (!p) { p = el('p', 'field-error'); p.id = id; ctl.closest('.field').appendChild(p); }
    p.textContent = 'Error: ' + msg;
    ctl.setAttribute('aria-invalid', 'true');
    ctl.setAttribute('aria-describedby', (ctl.dataset.describedby + ' ' + id).trim());
  }
  function checkControl(ctl) {
    var v = ctl.value.trim(), name = labelOf(ctl);
    if (ctl.type === 'checkbox') return ctl.required && !ctl.checked ? (ctl.dataset.error || 'Confirm: ' + name) : '';
    if (ctl.required && !v) return ctl.tagName === 'SELECT' ? 'Select ' + name.toLowerCase() : 'Enter ' + name.toLowerCase();
    if (!v) return '';
    if (ctl.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) return 'Enter an email address like name@example.com';
    if (ctl.type === 'tel' && !/^[\d\s().+-]{7,}$/.test(v)) return 'Enter a phone number with at least 7 digits';
    if (ctl.type === 'number' && (+v < +ctl.min || +v > +ctl.max || isNaN(+v))) return name + ' must be a number from ' + ctl.min + ' to ' + ctl.max;
    if (ctl.dataset.minlength && v.length < +ctl.dataset.minlength) return name + ' needs at least ' + ctl.dataset.minlength + ' characters';
    if (ctl.type === 'date' && ctl.min && v < ctl.min) return name + ' must be on or after ' + ctl.min;
    return '';
  }
  // Returns true when valid; otherwise shows inline errors plus a summary and focuses the summary.
  function validate(form) {
    var errors = [];
    $$('input, select, textarea', form).forEach(function (ctl) {
      var msg = ctl.type === 'hidden' ? '' : checkControl(ctl);
      fieldError(ctl, msg);
      if (msg) errors.push({ ctl: ctl, msg: msg });
    });
    var sum = $('[data-error-summary]', form);
    if (!sum) { sum = el('div', 'error-summary'); sum.setAttribute('data-error-summary', ''); sum.tabIndex = -1; form.insertBefore(sum, form.firstChild); }
    sum.hidden = !errors.length;
    sum.innerHTML = '';
    if (errors.length) {
      sum.appendChild(el('h2', null, 'There ' + (errors.length > 1 ? 'are ' + errors.length + ' problems' : 'is 1 problem') + ' with this form'));
      var ul = el('ul');
      errors.forEach(function (x) {
        var a = el('a'); a.href = '#' + x.ctl.id; a.textContent = x.msg;
        a.addEventListener('click', function (e) { e.preventDefault(); x.ctl.focus(); });
        var li = el('li'); li.appendChild(a); ul.appendChild(li);
      });
      sum.appendChild(ul);
      sum.focus();
    }
    return !errors.length;
  }
  function clearForm(form) {
    $$('[aria-invalid]', form).forEach(function (c) { fieldError(c, ''); });
    var s = $('[data-error-summary]', form);
    if (s) { s.hidden = true; s.innerHTML = ''; }
  }
  $$('form[data-demo-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var ok = $('[data-success]', form.parentNode);
      form.hidden = true;
      ok.hidden = false;
      ok.focus();
    });
    form.addEventListener('reset', function () { clearForm(form); });
  });
  $$('[data-restart]').forEach(function (b) {
    b.addEventListener('click', function () {
      var ok = b.closest('[data-success]'), form = ok.parentNode.querySelector('form');
      ok.hidden = true;
      form.hidden = false;
      form.reset();
      $('input, select, textarea', form).focus();
    });
  });

  /* ---------- generic filtered list ---------- */
  function filterList(root, items, match, render, label) {
    var list = $('[data-results]', root), status = $('[data-status]', root), empty = $('[data-empty]', root);
    function run() {
      var shown = items.filter(match);
      list.innerHTML = '';
      shown.forEach(function (it) { list.appendChild(render(it)); });
      empty.hidden = shown.length > 0;
      announce(status, shown.length + (shown.length === 1 ? ' ' + label + ' found' : ' ' + label + 's found'));
      return shown;
    }
    return run;
  }
  // Live filtering: any change re-runs the filter; reset (button or native) clears and re-runs.
  function wire(root, form, run) {
    ['submit', 'input', 'change'].forEach(function (t) {
      form.addEventListener(t, function (e) { if (t === 'submit') e.preventDefault(); run(); });
    });
    form.addEventListener('reset', function () { setTimeout(run, 0); });
    $$('[data-reset]', root).forEach(function (b) {
      b.addEventListener('click', function () { form.reset(); $('input, select', form).focus(); });
    });
  }
  function prefill(form) {
    $$('input[type="search"], input[type="text"], select', form).forEach(function (c) { if (params.has(c.name)) c.value = params.get(c.name); });
  }

  /* Program finder */
  var finder = $('[data-component="program-finder"]');
  if (finder) {
    var pf = $('form', finder);
    prefill(pf);
    var runPrograms = filterList(finder, PROGRAMS, function (p) {
      var q = norm(pf.query.value), d = pf.degree.value, i = pf.interest.value;
      return (!q || norm(p.title + ' ' + p.summary + ' ' + p.courses.join(' ')).indexOf(q) > -1) && (!d || p.degree === d) && (!i || p.interest === i);
    }, function (p) {
      var li = el('li', 'card result');
      li.innerHTML = '<h3><a href="program-detail.html?id=' + p.id + '">' + p.title + '</a></h3><p class="meta">' + DEGREE_NAMES[p.degree] + ' &middot; ' + p.interest + ' &middot; ' + p.credits + ' credits</p><p>' + p.summary + '</p>';
      return li;
    }, 'program');
    wire(finder, pf, runPrograms);
    runPrograms();
  }

  /* Program detail */
  var detail = $('[data-component="program-detail"]');
  if (detail) {
    var prog = PROGRAMS.filter(function (p) { return p.id === params.get('id'); })[0];
    var h1 = $('h1');
    if (!prog) {
      h1.textContent = 'Program not found';
      $('[data-found]', detail).hidden = true;
      $('[data-missing]', detail).hidden = false;
      document.title = 'Program not found | Harbor Valley Community College';
    } else {
      h1.textContent = prog.title;
      document.title = prog.title + ' | Harbor Valley Community College';
      $('[data-crumb]').textContent = prog.title;
      $('[data-field="credential"]').textContent = DEGREE_NAMES[prog.degree] + ' (' + prog.degree + ')';
      $('[data-field="credits"]').textContent = prog.credits + ' credits';
      $('[data-field="modality"]').textContent = prog.modality;
      $('[data-field="campuses"]').textContent = prog.campuses.join(', ');
      $('[data-field="summary"]').textContent = prog.summary;
      ['courses', 'careers'].forEach(function (k) {
        prog[k].forEach(function (t) { var li = el('li'); li.textContent = t; $('[data-field="' + k + '"]').appendChild(li); });
      });
      $('[data-missing]', detail).hidden = true;
    }
  }

  /* Schedule */
  var schedule = $('[data-component="schedule-search"]');
  if (schedule) {
    var sf = $('form', schedule);
    prefill(sf);
    var runSchedule = filterList(schedule, SECTIONS, function (s) {
      var q = norm(sf.query.value);
      return (!q || norm(s.code + ' ' + s.title + ' ' + s.crn).indexOf(q) > -1) && (!sf.campus.value || s.campus === sf.campus.value) && (!sf.modality.value || s.modality === sf.modality.value) && (!sf.open.checked || s.seats > 0);
    }, function (s) {
      var tr = el('tr');
      tr.innerHTML = [['Course', s.code], ['Title', s.title], ['CRN', s.crn], ['Campus', s.campus], ['Format', s.modality], ['Days and time', s.when], ['Seats', s.seats ? s.seats + ' open' : 'Full (waitlist)']].map(function (c) { return '<td data-label="' + c[0] + '">' + c[1] + '</td>'; }).join('');
      return tr;
    }, 'section');
    wire(schedule, sf, runSchedule);
    runSchedule();
  }

  /* Academic calendar */
  var cal = $('[data-component="calendar-list"]');
  if (cal) {
    var cf = $('form', cal);
    var runCal = filterList(cal, EVENTS, function (ev) { return ev.term === cf.term.value; }, function (ev) {
      var tr = el('tr'); tr.innerHTML = '<th scope="row">' + fmtDate(ev.date) + '</th><td>' + ev.label + '</td>'; return tr;
    }, 'date');
    cf.addEventListener('submit', function (e) { e.preventDefault(); });
    cf.addEventListener('change', function () { runCal(); $('[data-term-name]').textContent = cf.term.value; });
    runCal();
  }

  /* News */
  var news = $('[data-component="news-list"]');
  if (news) {
    var nf = $('form', news);
    prefill(nf);
    var runNews = filterList(news, NEWS, function (n) {
      var q = norm(nf.query.value);
      return (!q || norm(n.title + ' ' + n.summary).indexOf(q) > -1) && (!nf.cat.value || n.cat === nf.cat.value);
    }, function (n) {
      var li = el('li', 'card result');
      li.innerHTML = '<p class="meta"><time datetime="' + n.date + '">' + fmtDate(n.date) + '</time> &middot; ' + n.cat + '</p><h3>' + n.title + '</h3><p>' + n.summary + '</p>';
      return li;
    }, 'story');
    wire(news, nf, runNews);
    runNews();
  }

  /* Directory: submit-based search that validates the query */
  var dir = $('[data-component="directory-search"]');
  if (dir) {
    var df = $('form', dir);
    var runDir = filterList(dir, PEOPLE, function (p) {
      var q = norm(df.query.value);
      return p.type === df.type.value && norm(p.name + ' ' + p.role + ' ' + p.dept).indexOf(q) > -1;
    }, function (p) {
      var li = el('li', 'card result');
      li.innerHTML = '<h3>' + p.name + '</h3><p class="meta">' + p.role + ' &middot; ' + p.dept + '</p><p>' + p.place + '<br>Phone ' + p.phone + ' &middot; <a href="mailto:' + p.email + '">' + p.email + '</a></p>';
      return li;
    }, 'result');
    $('[data-results-wrap]', dir).hidden = true;
    df.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(df)) return;
      $('[data-results-wrap]', dir).hidden = false;
      var shown = runDir();
      $('[data-query-echo]', dir).textContent = df.query.value.trim();
      if (!shown.length) $('[data-empty]', dir).focus();
    });
  }

  /* Site search over the page index */
  var site = $('[data-component="site-search-results"]');
  if (site) {
    var q0 = params.get('q') || '';
    var sq = norm(q0);
    var hits = SITE_PAGES.filter(function (p) { return sq && norm(p[1] + ' ' + p[2]).indexOf(sq) > -1; });
    PROGRAMS.forEach(function (p) {
      if (sq && norm(p.title + ' ' + p.summary).indexOf(sq) > -1) hits.push(['program-detail.html?id=' + p.id, p.title + ' (program)', p.summary]);
    });
    $('[data-query-echo]', site).textContent = q0;
    var sl = $('[data-results]', site);
    hits.forEach(function (h) { var li = el('li', 'card result'); li.innerHTML = '<h3><a href="' + h[0] + '">' + h[1] + '</a></h3><p>' + h[2] + '</p>'; sl.appendChild(li); });
    $('[data-empty]', site).hidden = hits.length > 0;
    announce($('[data-status]', site), sq ? hits.length + ' results' : 'Enter a search term to see results');
    $('input[name="q"]', site).value = q0;
    if (!sq) $('[data-empty]', site).textContent = 'Enter a search term in the box above to search the college pages and programs.', $('[data-empty]', site).hidden = false;
  }

  /* Tuition estimator */
  var calc = $('[data-component="tuition-calculator"]');
  if (calc) {
    var tf = $('form', calc), RATES = { instate: 164.5, out: 389 }, FEE = 12.75;
    tf.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(tf)) return;
      var cr = +tf.credits.value, tuition = cr * RATES[tf.residency.value], fees = cr * FEE;
      var out = $('[data-estimate]', calc);
      out.hidden = false;
      out.textContent = 'Estimated total for ' + cr + ' credits: $' + (tuition + fees).toFixed(2) + ' (tuition $' + tuition.toFixed(2) + ' + fees $' + fees.toFixed(2) + '). Demo estimate from sample rates only.';
    });
  }
})();
