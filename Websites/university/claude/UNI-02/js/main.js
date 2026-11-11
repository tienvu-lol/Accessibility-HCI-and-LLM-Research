/* Embedded demo data: all values are fictional. */
var SITE_DATA = {
 "depts": [
  {
   "slug": "art-history",
   "name": "Art History",
   "division": "Humanities",
   "offers": "Major & minor",
   "blurb": "Students learn to read images, buildings and objects as evidence, with regular studio-visit seminars at regional museums.",
   "courses": [
    "ARTH 010 Seeing the Medieval World",
    "ARTH 062 Modern Architecture",
    "ARTH 118 Museums and Their Publics"
   ]
  },
  {
   "slug": "biology",
   "name": "Biology",
   "division": "Natural Sciences & Engineering",
   "offers": "Major & minor",
   "blurb": "Biology at Alderbrook pairs small laboratory sections with field work in the Wren Creek watershed, from cell signaling to forest ecology.",
   "courses": [
    "BIOL 001 Cellular Foundations",
    "BIOL 033 Ecology of Wren Creek",
    "BIOL 107 Genomes and Evolution"
   ]
  },
  {
   "slug": "chemistry",
   "name": "Chemistry & Biochemistry",
   "division": "Natural Sciences & Engineering",
   "offers": "Major & minor",
   "blurb": "Majors work with shared instruments from their first year and complete a capstone research project with a faculty mentor.",
   "courses": [
    "CHEM 010 Structure and Reactivity",
    "CHEM 044 Analytical Methods",
    "CHEM 120 Protein Chemistry"
   ]
  },
  {
   "slug": "classics",
   "name": "Classics",
   "division": "Humanities",
   "offers": "Major & minor",
   "blurb": "Language, literature and material culture of Greece and Rome, taught in seminars of twelve or fewer.",
   "courses": [
    "CLAS 005 Myth and Meaning",
    "CLAS 041 Intermediate Latin",
    "CLAS 090 Rome in the Provinces"
   ]
  },
  {
   "slug": "computer-science",
   "name": "Computer Science",
   "division": "Natural Sciences & Engineering",
   "offers": "Major & minor",
   "blurb": "A curriculum that connects algorithms and systems to questions of ethics, accessibility and public interest.",
   "courses": [
    "CS 021 Introduction to Computing",
    "CS 035 Data Structures",
    "CS 088 Human-Centered Software"
   ]
  },
  {
   "slug": "economics",
   "name": "Economics",
   "division": "Social Sciences",
   "offers": "Major & minor",
   "blurb": "Theory and data analysis applied to labor, development, public finance and the economics of climate policy.",
   "courses": [
    "ECON 001 Principles of Economics",
    "ECON 031 Econometrics",
    "ECON 075 Development Economics"
   ]
  },
  {
   "slug": "engineering",
   "name": "Engineering",
   "division": "Natural Sciences & Engineering",
   "offers": "Major only",
   "blurb": "A liberal-arts engineering degree built around design studios, with an emphasis on sustainable infrastructure.",
   "courses": [
    "ENGR 004 Engineering Design Studio",
    "ENGR 025 Circuits and Systems",
    "ENGR 071 Water and Environment"
   ]
  },
  {
   "slug": "english-literature",
   "name": "English Literature",
   "division": "Humanities",
   "offers": "Major & minor",
   "blurb": "Reading and writing across periods and forms, including a popular course sequence in creative writing.",
   "courses": [
    "ENGL 002 Reading Poetry",
    "ENGL 048 The Novel After 1900",
    "ENGL 112 Writing Workshop"
   ]
  },
  {
   "slug": "environmental-studies",
   "name": "Environmental Studies",
   "division": "Interdisciplinary",
   "offers": "Major & minor",
   "blurb": "An interdisciplinary program joining ecology, policy and the humanities around local sustainability projects.",
   "courses": [
    "ENVS 001 People and Planet",
    "ENVS 040 Climate Policy",
    "ENVS 095 Community Capstone"
   ]
  },
  {
   "slug": "history",
   "name": "History",
   "division": "Humanities",
   "offers": "Major & minor",
   "blurb": "Students practice archival research on regional, national and global topics and defend an original thesis.",
   "courses": [
    "HIST 003 The Atlantic World",
    "HIST 057 Cities and Citizens",
    "HIST 120 Oral History Methods"
   ]
  },
  {
   "slug": "linguistics",
   "name": "Linguistics",
   "division": "Interdisciplinary",
   "offers": "Major & minor",
   "blurb": "The structure of language, from sound systems to meaning, with a lab for experimental and computational work.",
   "courses": [
    "LING 001 Language and Mind",
    "LING 030 Phonology",
    "LING 066 Language in Society"
   ]
  },
  {
   "slug": "mathematics",
   "name": "Mathematics & Statistics",
   "division": "Natural Sciences & Engineering",
   "offers": "Major & minor",
   "blurb": "Pure and applied mathematics with a statistics track and a tradition of undergraduate problem-solving seminars.",
   "courses": [
    "MATH 015 Calculus II",
    "MATH 054 Linear Algebra",
    "STAT 031 Applied Statistics"
   ]
  },
  {
   "slug": "music",
   "name": "Music",
   "division": "Humanities",
   "offers": "Major & minor",
   "blurb": "Performance, theory and composition, with ensembles open to every student on campus.",
   "courses": [
    "MUS 010 Fundamentals of Music",
    "MUS 046 Composition Studio",
    "MUS 083 Ethnomusicology"
   ]
  },
  {
   "slug": "peace-conflict",
   "name": "Peace & Conflict Studies",
   "division": "Interdisciplinary",
   "offers": "Minor only",
   "blurb": "A minor on nonviolence, mediation and the study of conflict, taught across several departments.",
   "courses": [
    "PCS 001 Introduction to Peace Studies",
    "PCS 038 Mediation Practicum"
   ]
  },
  {
   "slug": "philosophy",
   "name": "Philosophy",
   "division": "Humanities",
   "offers": "Major & minor",
   "blurb": "Questions in ethics, logic, mind and politics, discussed in small, conversation-driven courses.",
   "courses": [
    "PHIL 001 Big Questions",
    "PHIL 029 Symbolic Logic",
    "PHIL 101 Philosophy of Technology"
   ]
  },
  {
   "slug": "physics-astronomy",
   "name": "Physics & Astronomy",
   "division": "Natural Sciences & Engineering",
   "offers": "Major & minor",
   "blurb": "Majors observe with the campus telescope, build experiments and present results at regional conferences.",
   "courses": [
    "PHYS 003 Mechanics",
    "ASTR 020 Stars and Galaxies",
    "PHYS 112 Quantum Mechanics"
   ]
  },
  {
   "slug": "political-science",
   "name": "Political Science",
   "division": "Social Sciences",
   "offers": "Major & minor",
   "blurb": "Comparative politics, international relations and American politics, with semester options in the state capital.",
   "courses": [
    "POLS 002 Democratic Politics",
    "POLS 044 International Order",
    "POLS 105 Policy Analysis"
   ]
  },
  {
   "slug": "psychology",
   "name": "Psychology",
   "division": "Social Sciences",
   "offers": "Major & minor",
   "blurb": "Research-focused training in cognition, development and social behavior, with lab placements from year one.",
   "courses": [
    "PSYC 001 Introduction to Psychology",
    "PSYC 028 Research Methods",
    "PSYC 090 Cognition and Perception"
   ]
  },
  {
   "slug": "sociology-anthropology",
   "name": "Sociology & Anthropology",
   "division": "Social Sciences",
   "offers": "Major & minor",
   "blurb": "Ethnography, survey research and social theory applied to communities from Quillfield to abroad.",
   "courses": [
    "SOAN 001 Culture and Society",
    "SOAN 036 Fieldwork Methods",
    "SOAN 080 Migration and Belonging"
   ]
  }
 ],
 "people": [
  {
   "name": "Marisol Okafor",
   "title": "Professor of Biology",
   "dept": "Biology",
   "role": "Faculty",
   "office": "Hendry Hall 214",
   "phone": "(555) 010-2101",
   "email": "marisol.okafor@alderbrook.example"
  },
  {
   "name": "Tobias Lindqvist",
   "title": "Associate Professor of Biology",
   "dept": "Biology",
   "role": "Faculty",
   "office": "Hendry Hall 220",
   "phone": "(555) 010-2102",
   "email": "tobias.lindqvist@alderbrook.example"
  },
  {
   "name": "Priya Raman",
   "title": "Lab Manager, Biology",
   "dept": "Biology",
   "role": "Staff",
   "office": "Hendry Hall 108",
   "phone": "(555) 010-2103",
   "email": "priya.raman@alderbrook.example"
  },
  {
   "name": "Gregor Anselm",
   "title": "Professor of Computer Science",
   "dept": "Computer Science",
   "role": "Faculty",
   "office": "Fenwick Center 305",
   "phone": "(555) 010-2210",
   "email": "gregor.anselm@alderbrook.example"
  },
  {
   "name": "Naomi Castellanos",
   "title": "Assistant Professor of Computer Science",
   "dept": "Computer Science",
   "role": "Faculty",
   "office": "Fenwick Center 311",
   "phone": "(555) 010-2211",
   "email": "naomi.castellanos@alderbrook.example"
  },
  {
   "name": "Elias Brandt",
   "title": "Professor of History",
   "dept": "History",
   "role": "Faculty",
   "office": "Marlow Hall 122",
   "phone": "(555) 010-2320",
   "email": "elias.brandt@alderbrook.example"
  },
  {
   "name": "Haruka Mizuno",
   "title": "Associate Professor of Economics",
   "dept": "Economics",
   "role": "Faculty",
   "office": "Pell Hall 410",
   "phone": "(555) 010-2430",
   "email": "haruka.mizuno@alderbrook.example"
  },
  {
   "name": "Desmond Achebe",
   "title": "Professor of Physics & Astronomy",
   "dept": "Physics & Astronomy",
   "role": "Faculty",
   "office": "Observatory Annex 2",
   "phone": "(555) 010-2540",
   "email": "desmond.achebe@alderbrook.example"
  },
  {
   "name": "Lucía Ferreira",
   "title": "Professor of English Literature",
   "dept": "English Literature",
   "role": "Faculty",
   "office": "Marlow Hall 301",
   "phone": "(555) 010-2650",
   "email": "lucia.ferreira@alderbrook.example"
  },
  {
   "name": "Joel Whitaker",
   "title": "Director of Financial Aid",
   "dept": "Admissions & Financial Aid",
   "role": "Staff",
   "office": "Gatehouse 12",
   "phone": "(555) 010-3001",
   "email": "joel.whitaker@alderbrook.example"
  },
  {
   "name": "Amara Singh",
   "title": "Senior Associate Director of Admissions",
   "dept": "Admissions & Financial Aid",
   "role": "Staff",
   "office": "Gatehouse 4",
   "phone": "(555) 010-3002",
   "email": "amara.singh@alderbrook.example"
  },
  {
   "name": "Colin Oyelaran",
   "title": "Campus Tour Coordinator",
   "dept": "Admissions & Financial Aid",
   "role": "Staff",
   "office": "Gatehouse 2",
   "phone": "(555) 010-3003",
   "email": "colin.oyelaran@alderbrook.example"
  },
  {
   "name": "Rebecca Thornton",
   "title": "Registrar",
   "dept": "Registrar",
   "role": "Staff",
   "office": "Pell Hall 105",
   "phone": "(555) 010-3100",
   "email": "rebecca.thornton@alderbrook.example"
  },
  {
   "name": "Samir Haddad",
   "title": "Director of Career Services",
   "dept": "Career Services",
   "role": "Staff",
   "office": "Commons 220",
   "phone": "(555) 010-3200",
   "email": "samir.haddad@alderbrook.example"
  },
  {
   "name": "Ingrid Solberg",
   "title": "Sustainability Coordinator",
   "dept": "Facilities & Sustainability",
   "role": "Staff",
   "office": "Plant Annex 1",
   "phone": "(555) 010-3300",
   "email": "ingrid.solberg@alderbrook.example"
  },
  {
   "name": "Wen Zhao",
   "title": "Assistant Professor of Mathematics & Statistics",
   "dept": "Mathematics & Statistics",
   "role": "Faculty",
   "office": "Fenwick Center 140",
   "phone": "(555) 010-2760",
   "email": "wen.zhao@alderbrook.example"
  }
 ],
 "news": [
  {
   "id": "n1",
   "title": "Students map the Wren Creek watershed with new sensor network",
   "date": "2026-11-03",
   "category": "Research",
   "summary": "A first-year seminar and a senior capstone team placed twelve low-cost water sensors along the creek that borders campus."
  },
  {
   "id": "n2",
   "title": "Alderbrook announces a new tuition guarantee for the class of 2031",
   "date": "2026-10-27",
   "category": "Campus",
   "summary": "Families of incoming students will see a fixed tuition rate for all four years of study."
  },
  {
   "id": "n3",
   "title": "Herons soccer wins conference title in overtime thriller",
   "date": "2026-10-24",
   "category": "Athletics",
   "summary": "A late header sealed the first conference championship for the women’s team since 2019."
  },
  {
   "id": "n4",
   "title": "Campus solar array reaches halfway point toward net zero goal",
   "date": "2026-10-15",
   "category": "Sustainability",
   "summary": "The second phase of rooftop panels now supplies about a third of daytime electricity use."
  },
  {
   "id": "n5",
   "title": "Fall dance concert brings student choreography to the Atrium Stage",
   "date": "2026-10-09",
   "category": "Arts",
   "summary": "Eight new works, created over a semester of studio time, premiere across two evenings."
  },
  {
   "id": "n6",
   "title": "Professor Okafor named a fellow of a national science society",
   "date": "2026-09-30",
   "category": "Research",
   "summary": "The recognition honors two decades of research on freshwater microbial communities."
  },
  {
   "id": "n7",
   "title": "Open Library Week highlights special collections and zine archive",
   "date": "2026-09-18",
   "category": "Campus",
   "summary": "Visitors can browse rare maps, student-made zines and a growing digital archive."
  },
  {
   "id": "n8",
   "title": "Student orchestra and choir join for harvest concert in Quillfield",
   "date": "2026-09-12",
   "category": "Arts",
   "summary": "The free community concert marked the ensembles’ first joint performance off campus."
  }
 ],
 "cal": [
  {
   "date": "2026-08-31",
   "title": "First day of fall classes",
   "term": "Fall 2026",
   "kind": "Academic"
  },
  {
   "date": "2026-09-14",
   "title": "Last day to add or drop a fall course",
   "term": "Fall 2026",
   "kind": "Deadline"
  },
  {
   "date": "2026-10-09",
   "title": "Fall break begins (no classes)",
   "term": "Fall 2026",
   "kind": "Academic"
  },
  {
   "date": "2026-11-13",
   "title": "Founders’ Weekend: open house and concert",
   "term": "Fall 2026",
   "kind": "Campus event"
  },
  {
   "date": "2026-11-20",
   "title": "Pre-registration for spring courses opens",
   "term": "Fall 2026",
   "kind": "Deadline"
  },
  {
   "date": "2026-11-24",
   "title": "Thanksgiving recess begins",
   "term": "Fall 2026",
   "kind": "Academic"
  },
  {
   "date": "2026-12-05",
   "title": "Lantern Walk and holiday lights on the quad",
   "term": "Fall 2026",
   "kind": "Campus event"
  },
  {
   "date": "2026-12-11",
   "title": "Last day of fall classes",
   "term": "Fall 2026",
   "kind": "Academic"
  },
  {
   "date": "2026-12-16",
   "title": "Fall term grades due",
   "term": "Fall 2026",
   "kind": "Deadline"
  },
  {
   "date": "2027-01-19",
   "title": "First day of spring classes",
   "term": "Spring 2027",
   "kind": "Academic"
  },
  {
   "date": "2027-02-12",
   "title": "Winter Arts Showcase in the Atrium Stage",
   "term": "Spring 2027",
   "kind": "Campus event"
  },
  {
   "date": "2027-03-01",
   "title": "Declaration of major deadline for sophomores",
   "term": "Spring 2027",
   "kind": "Deadline"
  },
  {
   "date": "2027-03-20",
   "title": "Spring break begins (no classes)",
   "term": "Spring 2027",
   "kind": "Academic"
  },
  {
   "date": "2027-04-17",
   "title": "Admitted Students Day",
   "term": "Spring 2027",
   "kind": "Campus event"
  },
  {
   "date": "2027-05-14",
   "title": "Last day of spring classes",
   "term": "Spring 2027",
   "kind": "Academic"
  },
  {
   "date": "2027-05-23",
   "title": "Commencement",
   "term": "Spring 2027",
   "kind": "Campus event"
  }
 ],
 "pages": [
  [
   "index.html",
   "Alderbrook Home",
   "Welcome to Alderbrook College, a small liberal arts college."
  ],
  [
   "meet.html",
   "Meet Alderbrook",
   "Mission, history, by the numbers, traditions and the president."
  ],
  [
   "academics.html",
   "Academics and programs of study",
   "Find majors and minors by department, division or keyword."
  ],
  [
   "design-your-own-major.html",
   "Design your own major",
   "Propose an individual course of study with two faculty advisors."
  ],
  [
   "academic-calendar.html",
   "Academic calendar",
   "Term dates, breaks, deadlines and commencement."
  ],
  [
   "admissions.html",
   "Admissions and aid",
   "Overview of applying, costs, aid and visiting."
  ],
  [
   "apply.html",
   "Apply to Alderbrook",
   "Deadlines, requirements and a demo application portal sign-in."
  ],
  [
   "affordability.html",
   "Affordability and access",
   "Financial aid, tuition guarantee and a demo net price estimator."
  ],
  [
   "visit.html",
   "Campus tours and virtual visits",
   "Request a campus tour, take a self-guided walk or a virtual tour."
  ],
  [
   "campus-life.html",
   "Campus life",
   "Arts, athletics, wellbeing, careers, clubs, living on campus and sustainability."
  ],
  [
   "news-events.html",
   "News and events",
   "Recent news and upcoming campus events."
  ],
  [
   "stories.html",
   "Stories from Alderbrook",
   "Features about students, faculty and alumni."
  ],
  [
   "directory.html",
   "Directory",
   "Find faculty and staff by name, title or department."
  ]
 ],
 "costOfAttendance": 78400
};
/* Alderbrook College (fictional) - UNI-02 replica behavior. Vanilla JS, no network access. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var fmtDate = function (iso) { return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }); };
  var norm = function (s) { return String(s).toLowerCase(); };
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage unavailable: setting just won't persist */ } }
  };

  /* ---------- header: menus, search flyout, accessibility options ---------- */
  var nav = $('#primary-nav'), menuBtn = $('#menu-toggle');
  var groupBtns = $$('.nav-group-toggle');
  var flyouts = [['#search-toggle', '#search-flyout'], ['#a11y-toggle', '#a11y-panel']].map(function (p) { return { btn: $(p[0]), panel: $(p[1]) }; });

  var hoverCapable = window.matchMedia('(min-width: 60em) and (hover: hover)');
  function closeGroups(except) { groupBtns.forEach(function (b) { if (b !== except) b.setAttribute('aria-expanded', 'false'); }); }
  function closeFlyouts(except) {
    flyouts.forEach(function (f) {
      if (f.btn && f !== except) { f.btn.setAttribute('aria-expanded', 'false'); f.panel.hidden = true; }
    });
  }
  groupBtns.forEach(function (b) {
    b.addEventListener('click', function (e) {
      // a mouse click on a menu already opened by hover keeps it open; keyboard clicks (detail 0) still toggle
      var open = b.getAttribute('aria-expanded') === 'true' && !(hoverCapable.matches && e.detail > 0);
      closeGroups(b); closeFlyouts();
      b.setAttribute('aria-expanded', String(!open));
    });
  });
  $$('.nav-item').forEach(function (li) {
    var b = $('.nav-group-toggle', li);
    li.addEventListener('mouseenter', function () { if (hoverCapable.matches) { closeGroups(b); b.setAttribute('aria-expanded', 'true'); } });
    li.addEventListener('mouseleave', function () { if (hoverCapable.matches) b.setAttribute('aria-expanded', 'false'); });
  });
  if (nav) nav.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeGroups();
  });
  if (menuBtn && nav) menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
    if (!open) closeGroups();
  });
  flyouts.forEach(function (f) {
    if (!f.btn) return;
    f.btn.addEventListener('click', function () {
      var open = f.btn.getAttribute('aria-expanded') === 'true';
      closeFlyouts(f); closeGroups();
      f.btn.setAttribute('aria-expanded', String(!open));
      f.panel.hidden = open;
      if (!open) { var first = $('input', f.panel); if (first) first.focus(); }
    });
  });
  doc.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) closeGroups();
    if (!e.target.closest('.flyout') && !e.target.closest('.utility-list button')) closeFlyouts();
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openGroup = groupBtns.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    var openFly = flyouts.filter(function (f) { return f.btn && f.btn.getAttribute('aria-expanded') === 'true'; })[0];
    if (openGroup) { closeGroups(); openGroup.focus(); }
    else if (openFly) { closeFlyouts(); openFly.btn.focus(); }
    else if (nav && nav.classList.contains('is-open')) { nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
  });

  var animToggle = $('#anim-toggle'), reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setAnimation(off) { root.classList.toggle('anim-off', off); if (animToggle) animToggle.checked = off; }
  setAnimation(store.get('alderbrook-anim-off') === '1' || reducedMotion.matches);
  if (animToggle) animToggle.addEventListener('change', function () { setAnimation(animToggle.checked); store.set('alderbrook-anim-off', animToggle.checked ? '1' : '0'); });

  var hero = $('.hero'), heroPause = $('#hero-pause');
  if (hero && heroPause) {
    var setPaused = function (p) { hero.classList.toggle('is-paused', p); heroPause.textContent = p ? 'Play background animation' : 'Pause background animation'; };
    setPaused(reducedMotion.matches);
    heroPause.addEventListener('click', function () { setPaused(!hero.classList.contains('is-paused')); });
  }

  /* ---------- shared form helpers (client-side validation, error summary, focus) ---------- */
  var EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  function showError(el, msg) {
    var err = doc.getElementById(el.id + '-error');
    if (el.dataset.describedby === undefined) el.dataset.describedby = el.getAttribute('aria-describedby') || '';
    var base = el.dataset.describedby;
    if (msg) {
      err.textContent = msg; err.hidden = false;
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', (base + ' ' + err.id).trim());
    } else {
      err.textContent = ''; err.hidden = true;
      el.removeAttribute('aria-invalid');
      if (base) el.setAttribute('aria-describedby', base); else el.removeAttribute('aria-describedby');
    }
  }
  function validate(form, custom) {
    var errors = [];
    $$('[data-label]', form).forEach(function (el) {
      var isBox = el.type === 'checkbox', v = isBox ? el.checked : el.value.trim(), msg = '';
      if (el.required && !v) msg = el.dataset.msg || el.dataset.label + ' is required.';
      else if (v && el.type === 'email' && !EMAIL.test(v)) msg = el.dataset.label + ' must be an email address such as name@example.org.';
      else if (v && custom && custom[el.id]) msg = custom[el.id](v) || '';
      showError(el, msg);
      if (msg) errors.push({ el: el, msg: msg });
    });
    return errors;
  }
  function showSummary(form, errors) {
    var box = $('.error-summary', form), ok = $('.success-box', form.parentNode);
    if (ok) ok.hidden = true;
    if (!errors.length) { box.hidden = true; return; }
    box.innerHTML = '<h2 tabindex="-1">There ' + (errors.length === 1 ? 'is 1 problem' : 'are ' + errors.length + ' problems') + ' with this form</h2><ul>' +
      errors.map(function (e) { return '<li><a href="#' + e.el.id + '">' + esc(e.msg) + '</a></li>'; }).join('') + '</ul>';
    box.hidden = false;
    $$('a', box).forEach(function (a, i) { a.addEventListener('click', function (ev) { ev.preventDefault(); errors[i].el.focus(); }); });
    $('h2', box).focus();
  }
  function wireForm(id, custom, onValid) {
    var form = doc.getElementById(id);
    if (!form) return;
    form.noValidate = true;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = validate(form, custom);
      showSummary(form, errors);
      if (errors.length) return;
      var ok = $('.success-box', form.parentNode);
      ok.hidden = false;
      var extra = onValid ? onValid(form, ok) : null;
      if (extra) $('.result', ok).textContent = extra;
      ok.focus();
      form.reset();
    });
  }

  /* ---------- program finder (academics.html) ---------- */
  var DEPT_BY_SLUG = {};
  SITE_DATA.depts.forEach(function (d) { DEPT_BY_SLUG[d.slug] = d; });

  var finder = $('#program-finder');
  if (finder) {
    var pfList = $('#pf-list'), pfCount = $('#pf-count'), pfEmpty = $('#pf-empty');
    var runFinder = function () {
      var q = norm($('#pf-q').value.trim()), div = $('#pf-division').value, offers = $('#pf-offers').value;
      var hits = SITE_DATA.depts.filter(function (d) {
        return (!div || d.division === div) && (!offers || d.offers.indexOf(offers) !== -1) &&
          (!q || norm(d.name + ' ' + d.blurb + ' ' + d.courses.join(' ')).indexOf(q) !== -1);
      });
      pfList.innerHTML = hits.map(function (d) {
        return '<li><div class="card"><div class="card-body"><h3><a href="department.html?dept=' + d.slug + '">' + esc(d.name) + '</a></h3><p class="meta"><span class="tag">' + esc(d.division) + '</span> <span class="tag">' + esc(d.offers) + '</span></p><p>' + esc(d.blurb) + '</p></div></div></li>';
      }).join('');
      pfEmpty.hidden = hits.length > 0;
      pfCount.textContent = hits.length + (hits.length === 1 ? ' program' : ' programs') + ' shown of ' + SITE_DATA.depts.length;
    };
    finder.addEventListener('submit', function (e) { e.preventDefault(); runFinder(); });
    finder.addEventListener('input', runFinder);
    finder.addEventListener('change', runFinder);
    $('#pf-reset').addEventListener('click', function () { finder.reset(); runFinder(); $('#pf-q').focus(); });
    runFinder();
  }

  /* ---------- department detail (department.html?dept=slug) ---------- */
  var deptRoot = $('#dept-root');
  if (deptRoot) {
    var slug = new URLSearchParams(window.location.search).get('dept') || 'biology', d = DEPT_BY_SLUG[slug];
    if (!d) {
      doc.title = 'Department not found :: Alderbrook College';
      $('#dept-title').textContent = 'Department not found';
      $('#dept-lede').textContent = 'No program matches “' + slug + '”.';
      deptRoot.innerHTML = '<div class="empty-state"><p>Try the <a href="academics.html#programs">programs of study list</a> to pick a department.</p></div>';
    } else {
      doc.title = d.name + ' :: Academics :: Alderbrook College';
      $('#dept-title').textContent = d.name;
      $('#dept-crumb').textContent = d.name;
      $('#dept-lede').textContent = d.division + ' · ' + d.offers;
      var people = SITE_DATA.people.filter(function (p) { return p.dept === d.name; });
      deptRoot.innerHTML = '<section aria-labelledby="dept-about" data-section="department-overview" data-component="content-block"><h2 id="dept-about">About the program</h2><p>' + esc(d.blurb) + '</p></section>' +
        '<section aria-labelledby="dept-courses" data-section="sample-courses" data-component="content-block"><h2 id="dept-courses">Sample courses</h2><ul>' + d.courses.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul><p class="demo-note">Course titles are fictional sample data, not a catalog.</p></section>' +
        '<section aria-labelledby="dept-people" data-section="department-people" data-component="result-list"><h2 id="dept-people">Faculty and staff</h2>' +
        (people.length ? '<ul class="result-list">' + people.map(function (p) { return '<li><h3>' + esc(p.name) + '</h3><p>' + esc(p.title) + '</p><p><a href="mailto:' + p.email + '">' + esc(p.email) + '</a></p></li>'; }).join('') + '</ul>' : '<div class="empty-state"><p>No sample directory entries for this department. <a href="directory.html">Search the full directory</a>.</p></div>') + '</section>';
    }
  }

  /* ---------- academic calendar ---------- */
  var calForm = $('#calendar-filter');
  if (calForm) {
    var calBody = $('#cal-body'), calCount = $('#cal-count'), calEmpty = $('#cal-empty'), calTable = $('#cal-table');
    var runCal = function () {
      var term = $('#cal-term').value, kind = $('#cal-kind').value;
      var hits = SITE_DATA.cal.filter(function (c) { return (!term || c.term === term) && (!kind || c.kind === kind); });
      calBody.innerHTML = hits.map(function (c) { return '<tr><th scope="row"><time datetime="' + c.date + '">' + fmtDate(c.date) + '</time></th><td>' + esc(c.title) + '</td><td>' + esc(c.kind) + '</td><td>' + esc(c.term) + '</td></tr>'; }).join('');
      calTable.hidden = !hits.length; calEmpty.hidden = hits.length > 0;
      calCount.textContent = hits.length + (hits.length === 1 ? ' date' : ' dates') + ' shown';
    };
    calForm.addEventListener('submit', function (e) { e.preventDefault(); runCal(); });
    calForm.addEventListener('change', runCal);
    runCal();
  }

  /* ---------- news and events ---------- */
  var newsForm = $('#news-filter');
  if (newsForm) {
    var newsList = $('#news-list'), newsCount = $('#news-count'), newsEmpty = $('#news-empty');
    var runNews = function () {
      var q = norm($('#news-q').value.trim()), cat = $('#news-cat').value;
      var hits = SITE_DATA.news.filter(function (n) { return (!cat || n.category === cat) && (!q || norm(n.title + ' ' + n.summary).indexOf(q) !== -1); });
      newsList.innerHTML = hits.map(function (n) { return '<li><article><h3>' + esc(n.title) + '</h3><p class="meta"><time datetime="' + n.date + '">' + fmtDate(n.date) + '</time> · <span class="tag">' + esc(n.category) + '</span></p><p>' + esc(n.summary) + '</p></article></li>'; }).join('');
      newsEmpty.hidden = hits.length > 0;
      newsCount.textContent = hits.length + (hits.length === 1 ? ' story' : ' stories') + ' shown';
    };
    newsForm.addEventListener('submit', function (e) { e.preventDefault(); runNews(); });
    newsForm.addEventListener('input', runNews);
    $('#news-reset').addEventListener('click', function () { newsForm.reset(); runNews(); $('#news-q').focus(); });
    runNews();
    $('#events-list').innerHTML = SITE_DATA.cal.filter(function (c) { return c.kind === 'Campus event'; }).map(function (c) {
      return '<li><div class="card"><div class="card-body"><h3>' + esc(c.title) + '</h3><p class="meta"><time datetime="' + c.date + '">' + fmtDate(c.date) + '</time></p></div></div></li>';
    }).join('');
  }

  /* ---------- directory ---------- */
  var dirForm = $('#directory-form');
  if (dirForm) {
    var dirList = $('#dir-list'), dirCount = $('#dir-count'), dirEmpty = $('#dir-empty');
    var runDir = function () {
      var q = norm($('#dir-q').value.trim()), role = $('#dir-role').value;
      var hits = SITE_DATA.people.filter(function (p) { return (!role || p.role === role) && (!q || norm(p.name + ' ' + p.title + ' ' + p.dept).indexOf(q) !== -1); });
      dirList.innerHTML = hits.map(function (p) {
        return '<li><h3>' + esc(p.name) + '</h3><p>' + esc(p.title) + '</p><p>' + esc(p.dept) + ' · ' + esc(p.office) + '</p><p><a href="mailto:' + p.email + '">' + esc(p.email) + '</a> · ' + esc(p.phone) + '</p></li>';
      }).join('');
      dirEmpty.hidden = hits.length > 0;
      dirCount.textContent = hits.length + (hits.length === 1 ? ' person' : ' people') + ' found';
    };
    $('#dir-q').value = new URLSearchParams(window.location.search).get('q') || '';
    dirForm.addEventListener('submit', function (e) { e.preventDefault(); runDir(); });
    dirForm.addEventListener('input', runDir);
    $('#dir-reset').addEventListener('click', function () { dirForm.reset(); runDir(); $('#dir-q').focus(); });
    runDir();
  }

  /* ---------- site search (search.html?keys=...) ---------- */
  var searchOut = $('#search-results');
  if (searchOut) {
    var keys = (new URLSearchParams(window.location.search).get('keys') || '').trim(), sq = norm(keys);
    $('#search-keys').value = keys;
    var index = SITE_DATA.pages.map(function (p) { return { href: p[0], title: p[1], text: p[2], type: 'Page' }; })
      .concat(SITE_DATA.depts.map(function (d) { return { href: 'department.html?dept=' + d.slug, title: d.name, text: d.blurb, type: 'Program' }; }))
      .concat(SITE_DATA.news.map(function (n) { return { href: 'news-events.html#news', title: n.title, text: n.summary, type: 'News' }; }));
    var status = $('#search-status');
    if (!sq) {
      status.textContent = 'Enter a search term to search this demonstration site.';
    } else {
      var found = index.filter(function (r) { return norm(r.title + ' ' + r.text).indexOf(sq) !== -1; });
      status.textContent = found.length + (found.length === 1 ? ' result' : ' results') + ' for “' + keys + '”';
      searchOut.innerHTML = found.length ? found.map(function (r) { return '<li><h3><a href="' + r.href + '">' + esc(r.title) + '</a></h3><p><span class="tag">' + r.type + '</span></p><p>' + esc(r.text) + '</p></li>'; }).join('')
        : '<li class="empty-state">No results. Try a shorter word such as “biology”, “aid” or “visit”, or browse the <a href="academics.html#programs">programs of study</a>.</li>';
      doc.title = 'Search results :: Alderbrook College';
    }
  }

  /* ---------- visit request form + virtual tour dialog ---------- */
  var todayIso = function () { var t = new Date(); return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2); };
  wireForm('visit-form', {
    'visit-date': function (v) { return v < todayIso() ? 'Preferred date must be today or later.' : ''; },
    'visit-size': function (v) { return (+v < 1 || +v > 8 || Math.floor(+v) !== +v) ? 'Group size must be a whole number from 1 to 8.' : ''; }
  });
  var tourDlg = $('#tour-dialog'), tourBtn = $('#tour-open');
  if (tourDlg && tourBtn) {
    tourBtn.addEventListener('click', function () { tourDlg.showModal(); });
    $$('[data-close-dialog]', tourDlg).forEach(function (b) { b.addEventListener('click', function () { tourDlg.close(); }); });
    tourDlg.addEventListener('click', function (e) { if (e.target === tourDlg) tourDlg.close(); });
  }

  /* ---------- application portal sign-in (simulation) + net price estimator (demo) ---------- */
  wireForm('portal-form', { 'portal-password': function (v) { return v.length < 8 ? 'Password must be at least 8 characters.' : ''; } });
  wireForm('estimator-form', {
    'est-income': function (v) { return (isNaN(+v) || +v < 0) ? 'Income must be a number of 0 or more.' : ''; }
  }, function (form) {
    var income = +$('#est-income').value, size = +$('#est-size').value, cost = SITE_DATA.costOfAttendance;
    var contribution = Math.min(cost, Math.round(Math.max(0, income - 40000) * 0.25 / (1 + 0.12 * (size - 1)) / 100) * 100);
    var fmt = function (n) { return '$' + n.toLocaleString('en-US'); };
    return 'For a household of ' + size + ' with an income of ' + fmt(income) + ', the demonstration formula gives an estimated yearly net price of ' + fmt(contribution) + ' (aid: ' + fmt(cost - contribution) + ' of a ' + fmt(cost) + ' sample cost of attendance). This is not an offer, quote or prediction.';
  });
})();
