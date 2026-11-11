/* Harborlight Children's Fund - fictional demo site. Vanilla JS, no network access, works from file://. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Sample data (fictional; illustrative only) ---------- */
  var DATA = {
    pages: [
      { title: 'Who we are', url: 'who-we-are.html', summary: 'Mission, values, governance, transparency and safeguarding at Harborlight Children\'s Fund.' },
      { title: 'What we do', url: 'what-we-do.html', summary: 'Learning, health and nutrition, child protection, safe water and emergency response.' },
      { title: 'Research and reports', url: 'reports.html', summary: 'Filterable library of reports, briefs and data sheets.' },
      { title: 'Stories and features', url: 'stories.html', summary: 'Stories, features and press releases from our programmes.' },
      { title: 'Where we work', url: 'where-we-work.html', summary: 'Find a country office and see its programme highlights.' },
      { title: 'Take action', url: 'take-action.html', summary: 'Give, volunteer, fundraise, speak up and sign up for updates.' },
      { title: 'Work with us', url: 'work-with-us.html', summary: 'Staff, internship and volunteer opportunities, and a volunteer interest form.' },
      { title: 'Donate', url: 'donate.html', summary: 'Choose an amount and frequency in a simulated donation form.' },
      { title: 'Subscribe to updates', url: 'subscribe.html', summary: 'Sign up for the demo newsletter.' },
      { title: 'Karavel floods emergency', url: 'emergency.html', summary: 'Response to the fictional Karavel Province floods.' },
      { title: 'Frequently asked questions', url: 'faq.html', summary: 'Answers about donations, safeguarding, privacy and this demo site.' }
    ],
    stories: [
      { id: 'lantern-library', title: 'A lantern library keeps lessons going after the floods', type: 'Story', topic: 'Education', region: 'Asia', date: '2026-10-28', image: 'story-learning.svg', alt: 'Illustration of children reading by lantern light', summary: 'A volunteer teacher turns a shared storage room into a night reading space.', body: ['When the river rose, the school closed for three weeks. Nadia, a volunteer teacher, moved books to a dry storage room and hung solar lanterns from the rafters.', 'Forty children now meet there each evening. The reading circles are led by older students, and the lanterns are charged by day on the roof.', 'Fictional story written for this demonstration. Names and places are invented.'] },
      { id: 'clinic-on-wheels', title: 'The clinic on wheels that reaches the last village', type: 'Feature', topic: 'Health', region: 'Africa', date: '2026-10-19', image: 'story-health.svg', alt: 'Illustration of a small mobile clinic van on a dirt road', summary: 'A mobile team brings vaccines and check-ups to families beyond the paved road.', body: ['Every second Thursday a small white van leaves the district hospital before dawn. Inside are a nurse, a community health worker and a cold box of vaccines.', 'By noon the team has seen thirty families. Parents say the biggest change is not having to walk a day to reach care.', 'Fictional feature written for this demonstration. Names and places are invented.'] },
      { id: 'water-points', title: 'Press release: New water points open at twelve schools', type: 'Press release', topic: 'Climate', region: 'Latin America', date: '2026-10-12', image: 'story-water.svg', alt: 'Illustration of a hand pump beside a school building', summary: 'Solar-powered pumps and handwashing stations are now running at twelve partner schools.', body: ['Harborlight and local partners opened twelve school water points this month, each with a solar pump and a handwashing station.', 'School committees will manage maintenance, supported by a small repair fund and training for two caretakers per site.', 'Fictional press release written for this demonstration.'] },
      { id: 'safe-spaces', title: 'Safe spaces give teenagers a place to talk', type: 'Story', topic: 'Protection', region: 'Middle East', date: '2026-09-30', image: 'story-learning.svg', alt: 'Illustration of teenagers sitting in a circle', summary: 'Youth workers and peer mentors run weekly sessions on safety, rights and study skills.', body: ['The community hall is quiet until three o\'clock, when teenagers arrive for the weekly session. Peer mentors set out chairs in a circle.', 'Topics range from exam stress to how to report a problem safely. Youth workers are trained in safeguarding and referral.', 'Fictional story written for this demonstration. Names and places are invented.'] },
      { id: 'porridge-project', title: 'Press release: Fortified porridge reaches 40 nurseries', type: 'Press release', topic: 'Nutrition', region: 'Africa', date: '2026-09-14', image: 'story-health.svg', alt: 'Illustration of a pot of porridge and bowls', summary: 'A local mill and nursery cooks join forces to improve early childhood nutrition.', body: ['A regional mill has begun producing a fortified porridge flour for partner nurseries.', 'Cooks receive training on preparation and storage, and nurseries track growth checks every term.', 'Fictional press release written for this demonstration.'] },
      { id: 'rooftop-school', title: 'A rooftop school above the flood line', type: 'Feature', topic: 'Emergencies', region: 'Europe', date: '2026-08-22', image: 'story-water.svg', alt: 'Illustration of a school built on stilts above water', summary: 'Prefabricated classrooms on raised platforms keep learning going when the water comes.', body: ['Engineers and teachers designed the classrooms together. Raised platforms and sealed storage protect books and equipment.', 'When the next flood arrives, the school plans to stay open as a shelter and a learning space.', 'Fictional feature written for this demonstration. Names and places are invented.'] }
    ],
    reports: [
      { id: 'r1', title: 'Safe Water, Safe Schools', topic: 'Climate', year: '2026', type: 'Report', pages: 84, summary: 'Reviews water and sanitation access in schools across twelve partner countries and sets out priority investments.' },
      { id: 'r2', title: 'Learning Interrupted: Floods and School Closures', topic: 'Education', year: '2026', type: 'Brief', pages: 16, summary: 'A short brief on how seasonal flooding affects attendance and what continuity plans work.' },
      { id: 'r3', title: 'State of the World\'s Children: A Sample Edition', topic: 'Protection', year: '2025', type: 'Report', pages: 120, summary: 'A fictional flagship report used to demonstrate long document listings and filtering.' },
      { id: 'r4', title: 'Immunization Coverage Data Sheet', topic: 'Health', year: '2026', type: 'Data', pages: 8, summary: 'Sample coverage tables by region for routine childhood vaccines.' },
      { id: 'r5', title: 'First 1,000 Days: Nutrition Programming', topic: 'Nutrition', year: '2025', type: 'Report', pages: 56, summary: 'Lessons from early childhood nutrition programmes and recommended indicators.' },
      { id: 'r6', title: 'Teen Safe Spaces: Evaluation Summary', topic: 'Protection', year: '2024', type: 'Brief', pages: 20, summary: 'Findings from an evaluation of peer-led safe spaces for adolescents.' },
      { id: 'r7', title: 'Digital Learning Access Data Sheet', topic: 'Education', year: '2025', type: 'Data', pages: 12, summary: 'Sample figures on devices, connectivity and learning platform use.' },
      { id: 'r8', title: 'Emergency Response: Annual Review', topic: 'Emergencies', year: '2024', type: 'Report', pages: 64, summary: 'A review of response times, supply pipelines and community feedback across emergencies.' }
    ],
    countries: [
      { id: 'c1', name: 'Bangladesh', region: 'Asia', reached: '2.1 million', programmes: ['Learning', 'Water and sanitation'], summary: 'Flood-ready schools and community water points.' },
      { id: 'c2', name: 'Brazil', region: 'Latin America', reached: '640,000', programmes: ['Protection', 'Learning'], summary: 'Youth programmes and school re-enrolment campaigns.' },
      { id: 'c3', name: 'Colombia', region: 'Latin America', reached: '510,000', programmes: ['Protection', 'Health'], summary: 'Child protection networks and mobile health teams.' },
      { id: 'c4', name: 'Ethiopia', region: 'Africa', reached: '3.4 million', programmes: ['Health', 'Nutrition'], summary: 'Vaccination outreach and community nutrition screening.' },
      { id: 'c5', name: 'Ghana', region: 'Africa', reached: '780,000', programmes: ['Learning', 'Nutrition'], summary: 'Early learning centres and fortified food partnerships.' },
      { id: 'c6', name: 'Jordan', region: 'Middle East', reached: '420,000', programmes: ['Protection', 'Learning'], summary: 'Safe spaces and catch-up classes for adolescents.' },
      { id: 'c7', name: 'Kenya', region: 'Africa', reached: '1.6 million', programmes: ['Health', 'Water and sanitation'], summary: 'Mobile clinics and drought-resilient water systems.' },
      { id: 'c8', name: 'Lebanon', region: 'Middle East', reached: '380,000', programmes: ['Learning', 'Protection'], summary: 'Non-formal education and family support services.' },
      { id: 'c9', name: 'Nepal', region: 'Asia', reached: '1.2 million', programmes: ['Learning', 'Emergencies'], summary: 'School reconstruction and flood preparedness.' },
      { id: 'c10', name: 'Peru', region: 'Latin America', reached: '450,000', programmes: ['Health', 'Nutrition'], summary: 'Highland nutrition and anaemia prevention.' },
      { id: 'c11', name: 'Poland', region: 'Europe', reached: '210,000', programmes: ['Protection', 'Learning'], summary: 'Language support and psychosocial care for displaced children.' },
      { id: 'c12', name: 'Sudan', region: 'Africa', reached: '2.8 million', programmes: ['Emergencies', 'Nutrition'], summary: 'Emergency feeding and child-friendly spaces.' },
      { id: 'c13', name: 'Ukraine', region: 'Europe', reached: '1.3 million', programmes: ['Protection', 'Emergencies'], summary: 'Psychosocial support and mobile learning kits.' },
      { id: 'c14', name: 'Viet Nam', region: 'Asia', reached: '690,000', programmes: ['Health', 'Learning'], summary: 'Early childhood development and school health.' }
    ],
    jobs: [
      { id: 'j1', title: 'Education Programme Officer', type: 'Staff', location: 'Remote (Europe time zones)', deadline: '2026-12-05', summary: 'Support country offices with learning programme design and reporting.' },
      { id: 'j2', title: 'Communications Intern', type: 'Internship', location: 'Geneva (sample)', deadline: '2026-11-30', summary: 'Help produce stories, social posts and accessible web content.' },
      { id: 'j3', title: 'Community Fundraising Volunteer', type: 'Volunteer', location: 'Remote', deadline: '2026-12-20', summary: 'Organise a local event or online drive for children\'s learning.' },
      { id: 'j4', title: 'Water and Sanitation Consultant', type: 'Consultancy', location: 'Nairobi (sample)', deadline: '2026-12-12', summary: 'Assess school water points and recommend maintenance models.' },
      { id: 'j5', title: 'Emergency Logistics Officer', type: 'Staff', location: 'Nairobi (sample)', deadline: '2026-12-01', summary: 'Coordinate supply pipelines for rapid response.' },
      { id: 'j6', title: 'Youth Advocacy Volunteer', type: 'Volunteer', location: 'Remote', deadline: '2027-01-10', summary: 'Help young people share their views with decision makers.' }
    ]
  };
  var BY_ID = function (list, id) { return list.filter(function (x) { return x.id === id; })[0]; };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var params = new URLSearchParams(location.search);

  /* ---------- Disclosures: nav menus, language switcher, accordions ---------- */
  function setExpanded(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (panel) panel.hidden = !open;
  }
  // Close every open menu/popover that does not contain the event target.
  function closeOutside(target) {
    $$('[data-popover][aria-expanded="true"]').forEach(function (b) { if (!b.closest('[data-popover-item]').contains(target)) setExpanded(b, false); });
  }
  // Panels are visible without JS; collapse them once the script runs.
  $$('button[aria-controls][aria-expanded]').forEach(function (b) { if (b.id !== 'menu-toggle') setExpanded(b, b.getAttribute('aria-expanded') === 'true'); });
  document.addEventListener('click', function (e) {
    closeOutside(e.target);
    var btn = e.target.closest('button[aria-controls][aria-expanded]');
    if (btn && btn.id !== 'menu-toggle') setExpanded(btn, btn.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('focusin', function (e) { closeOutside(e.target); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = $('[data-popover][aria-expanded="true"]');
    if (open) { setExpanded(open, false); open.focus(); return; }
    var menu = $('#menu-toggle[aria-expanded="true"]');
    if (menu) { toggleMenu(false); menu.focus(); }
  });
  var expandAll = $('[data-expand-all]');
  if (expandAll) expandAll.addEventListener('click', function () {
    var open = expandAll.getAttribute('data-state') !== 'open';
    $$('.accordion button[aria-expanded]').forEach(function (b) { setExpanded(b, open); });
    expandAll.setAttribute('data-state', open ? 'open' : 'closed');
    expandAll.textContent = open ? 'Collapse all' : 'Expand all';
  });
  if (location.hash) { // open an FAQ item linked by hash
    var target = document.getElementById(location.hash.slice(1));
    var tb = target && target.closest('.accordion') && $('button[aria-expanded]', target.closest('.accordion-item'));
    if (tb) setExpanded(tb, true);
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('#menu-toggle');
  function toggleMenu(open) {
    var m = document.getElementById(menuBtn.getAttribute('aria-controls'));
    m.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('.label').textContent = open ? 'Close menu' : 'Menu';
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { toggleMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });

  /* ---------- Filterable lists (reports, stories, countries, jobs) ---------- */
  var SOURCES = {
    reports: { items: DATA.reports, text: ['title', 'summary'], noun: 'reports', render: function (r) {
      return '<li class="card" data-component="result-card"><p class="kicker">' + esc(r.type) + ' · ' + esc(r.year) + ' · ' + esc(r.topic) + '</p><h3>' + esc(r.title) + '</h3><p>' + esc(r.summary) + '</p><p><button type="button" class="btn btn-secondary" data-summary="' + r.id + '">Read summary<span class="sr-only">: ' + esc(r.title) + '</span></button></p></li>'; } },
    stories: { items: DATA.stories, text: ['title', 'summary'], noun: 'stories', render: function (s) {
      return '<li class="card" data-component="story-card"><img src="assets/' + s.image + '" alt="" width="400" height="220" loading="lazy"><div class="card-body"><p class="kicker">' + esc(s.type) + ' · ' + esc(s.date) + '</p><h3><a href="story-detail.html?id=' + s.id + '">' + esc(s.title) + '</a></h3><p>' + esc(s.summary) + '</p><p class="meta">' + esc(s.topic) + ' · ' + esc(s.region) + '</p></div></li>'; } },
    countries: { items: DATA.countries, text: ['name', 'summary'], noun: 'country offices', render: function (c) {
      return '<li class="card" data-component="result-card"><h3>' + esc(c.name) + '</h3><p class="kicker">' + esc(c.region) + '</p><p>' + esc(c.summary) + '</p><p><button type="button" class="btn btn-secondary" data-country="' + c.id + '">View details<span class="sr-only">: ' + esc(c.name) + '</span></button></p></li>'; } },
    jobs: { items: DATA.jobs, text: ['title', 'summary'], noun: 'opportunities', render: function (j) {
      return '<li class="card" data-component="result-card"><p class="kicker">' + esc(j.type) + ' · ' + esc(j.location) + '</p><h3>' + esc(j.title) + '</h3><p>' + esc(j.summary) + '</p><p class="meta">Apply by ' + esc(j.deadline) + ' (sample date)</p><p><button type="button" class="btn btn-secondary" data-apply="' + j.id + '">Express interest<span class="sr-only">: ' + esc(j.title) + '</span></button></p></li>'; } }
  };
  function matches(item, src, form) {
    return $$('select[name], input[name]', form).every(function (c) {
      var v = c.value.trim().toLowerCase();
      if (!v) return true;
      if (c.name === 'q') return src.text.some(function (k) { return String(item[k]).toLowerCase().indexOf(v) > -1; });
      return String(item[c.name]).toLowerCase() === v;
    });
  }
  function initFilter(form) {
    var src = SOURCES[form.getAttribute('data-filter')];
    var out = document.getElementById(form.getAttribute('data-results'));
    var count = document.getElementById(form.getAttribute('data-count'));
    params.forEach(function (v, k) { // preset from query string, e.g. stories.html?type=Press%20release
      var c = form.elements[k];
      if (c && c.options) { if ($$('option', c).some(function (o) { return o.value === v; })) c.value = v; } else if (c) c.value = v;
    });
    function run() {
      var hits = src.items.filter(function (i) { return matches(i, src, form); });
      out.innerHTML = hits.length ? hits.map(src.render).join('') : '<li class="empty" data-component="empty-state"><p><strong>No ' + src.noun + ' match your filters.</strong> Try a different keyword or clear the filters.</p></li>';
      count.textContent = 'Showing ' + hits.length + ' of ' + src.items.length + ' ' + src.noun + '.';
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    form.addEventListener('input', run);
    form.addEventListener('reset', function () { setTimeout(run, 0); });
    run();
  }
  $$('form[data-filter]').forEach(initFilter);

  /* ---------- Dialog (report summaries) ---------- */
  var dlg = $('#summary-dialog'), lastOpener = null;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-summary]');
    if (b && dlg) {
      var r = BY_ID(DATA.reports, b.getAttribute('data-summary'));
      lastOpener = b;
      $('#summary-title').textContent = r.title;
      $('#summary-body').textContent = r.summary + ' (' + r.pages + ' pages, ' + r.year + ')';
      dlg.showModal();
    }
    if (e.target.closest('[data-close-dialog]') && dlg) dlg.close();
    var c = e.target.closest('[data-country]');
    if (c) {
      var k = BY_ID(DATA.countries, c.getAttribute('data-country')), d = $('#country-detail');
      d.innerHTML = '<h3 tabindex="-1" id="country-detail-title">' + esc(k.name) + ' country office</h3><p>' + esc(k.summary) + '</p><dl class="facts"><div><dt>Region</dt><dd>' + esc(k.region) + '</dd></div><div><dt>Children reached (sample figure)</dt><dd>' + esc(k.reached) + '</dd></div><div><dt>Programmes</dt><dd>' + esc(k.programmes.join(', ')) + '</dd></div></dl>';
      $('#country-detail-title').focus();
    }
    var a = e.target.closest('[data-apply]');
    if (a) {
      var sel = $('#vol-role');
      sel.value = a.getAttribute('data-apply');
      $('#volunteer-title').focus();
    }
  });
  if (dlg) dlg.addEventListener('close', function () { if (lastOpener) lastOpener.focus(); });

  /* ---------- Site search page ---------- */
  var sform = $('form[data-site-search]');
  if (sform) {
    var sout = $('#search-results'), scount = $('#search-count'), q = $('#search-q');
    q.value = params.get('q') || '';
    var runSearch = function () {
      var term = q.value.trim().toLowerCase(), hits = [];
      if (term) {
        DATA.pages.forEach(function (p) { if ((p.title + ' ' + p.summary).toLowerCase().indexOf(term) > -1) hits.push({ t: p.title, u: p.url, s: p.summary, k: 'Page' }); });
        DATA.stories.forEach(function (p) { if ((p.title + ' ' + p.summary + ' ' + p.topic).toLowerCase().indexOf(term) > -1) hits.push({ t: p.title, u: 'story-detail.html?id=' + p.id, s: p.summary, k: p.type }); });
        DATA.reports.forEach(function (p) { if ((p.title + ' ' + p.summary + ' ' + p.topic).toLowerCase().indexOf(term) > -1) hits.push({ t: p.title, u: 'reports.html?q=' + encodeURIComponent(p.title), s: p.summary, k: p.type }); });
      }
      sout.innerHTML = !term ? '<li class="empty"><p>Enter a keyword to search pages, stories and reports.</p></li>' : hits.length ? hits.map(function (h) { return '<li class="card" data-component="result-card"><p class="kicker">' + esc(h.k) + '</p><h3><a href="' + h.u + '">' + esc(h.t) + '</a></h3><p>' + esc(h.s) + '</p></li>'; }).join('') : '<li class="empty" data-component="empty-state"><p><strong>No results for "' + esc(q.value.trim()) + '".</strong> Check the spelling or try words like "water", "school" or "health".</p></li>';
      scount.textContent = term ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for "' + q.value.trim() + '".' : '';
    };
    sform.addEventListener('submit', function (e) { e.preventDefault(); runSearch(); });
    runSearch();
  }

  /* ---------- Story detail ---------- */
  var article = $('[data-story-detail]');
  if (article) {
    var st = BY_ID(DATA.stories, params.get('id')) || DATA.stories[0];
    document.title = st.title + ' | Harborlight Children\'s Fund';
    $('#story-title').textContent = st.title;
    $('#story-meta').textContent = st.type + ' · ' + st.topic + ' · ' + st.region + ' · ' + st.date;
    var img = $('#story-image'); img.src = 'assets/' + st.image; img.alt = st.alt;
    $('#story-body').innerHTML = st.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    $('#related-list').innerHTML = DATA.stories.filter(function (s) { return s.id !== st.id; }).slice(0, 3).map(SOURCES.stories.render).join('');
  }

  /* ---------- Form validation (shared) ---------- */
  function labelOf(el) {
    var l = el.id && $('label[for="' + el.id + '"]');
    return (l ? l.firstChild.textContent : el.name).replace(/\s*\(.*$/, '').replace(/\s+$/, '').trim();
  }
  function addError(host, control, msg, list) {
    var id = (control.id || control.name) + '-error';
    var p = document.createElement('p');
    p.className = 'field-error'; p.id = id; p.textContent = 'Error: ' + msg;
    host.appendChild(p);
    host.classList.add('has-error');
    if (control.tagName !== 'FIELDSET') control.setAttribute('aria-invalid', 'true');
    control.setAttribute('aria-describedby', ((control.getAttribute('aria-describedby') || '') + ' ' + id).trim());
    list.push({ control: control, msg: msg });
  }
  function clearField(host) {
    $$('.field-error', host).forEach(function (n) { n.remove(); });
    host.classList.remove('has-error');
    $$('[aria-invalid]', host).forEach(function (n) { n.removeAttribute('aria-invalid'); });
    $$('[aria-describedby]', host).concat(host.matches('[aria-describedby]') ? [host] : []).forEach(function (n) {
      var keep = n.getAttribute('aria-describedby').split(' ').filter(function (t) { return !/-error$/.test(t); }).join(' ');
      if (keep) n.setAttribute('aria-describedby', keep); else n.removeAttribute('aria-describedby');
    });
  }
  function validate(form) {
    var errors = [];
    $$('.field, fieldset[data-required-group]', form).forEach(clearField);
    $$('input, select, textarea', form).forEach(function (el) {
      if (el.type === 'radio' || el.type === 'hidden' || el.disabled || el.closest('[hidden]') || el.validity.valid) return;
      var host = el.closest('.field') || el.parentNode, name = labelOf(el), v = el.validity, msg;
      if (v.valueMissing) msg = el.type === 'checkbox' ? 'Please tick the box to confirm.' : (el.tagName === 'SELECT' ? 'Choose an option for ' : 'Enter ') + name.toLowerCase() + '.';
      else if (v.typeMismatch && el.type === 'email') msg = 'Enter an email address in the format name@example.org.';
      else if (v.rangeUnderflow || v.rangeOverflow) msg = name + ' must be between ' + el.min + ' and ' + el.max + '.';
      else if (v.badInput || v.stepMismatch) msg = 'Enter a whole number for ' + name.toLowerCase() + '.';
      else msg = 'Check ' + name.toLowerCase() + '.';
      addError(host, el, msg, errors);
    });
    $$('fieldset[data-required-group]', form).forEach(function (fs) {
      if (fs.hasAttribute('hidden') || $('input:checked', fs)) return;
      addError(fs, fs, 'Choose one option for ' + $('legend', fs).textContent.toLowerCase() + '.', errors);
      errors[errors.length - 1].control = $('input', fs);
    });
    errors.sort(function (x, y) { return x.control.compareDocumentPosition(y.control) & 4 ? -1 : 1; }); // DOM order
    var summary = $('[data-error-summary]', form);
    if (errors.length) {
      $('ul', summary).innerHTML = errors.map(function (e, i) {
        e.control.setAttribute('data-err-idx', i);
        return '<li><a href="#' + (e.control.id || '') + '" data-focus-idx="' + i + '">' + esc(e.msg) + '</a></li>';
      }).join('');
      summary.hidden = false; summary.focus();
    } else summary.hidden = true;
    return errors.length === 0;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-focus-idx]');
    if (!a) return;
    e.preventDefault();
    var c = $('[data-err-idx="' + a.getAttribute('data-focus-idx') + '"]');
    if (c) c.focus();
  });
  function onFieldChange(e) {
    var host = e.target.closest('.field, fieldset[data-required-group]');
    if (host && host.classList.contains('has-error')) clearField(host);
  }
  $$('form[data-validate]').forEach(function (form) {
    form.noValidate = true;
    form.addEventListener('input', onFieldChange);
    form.addEventListener('change', onFieldChange);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var ok = document.getElementById(form.getAttribute('data-success'));
      var detail = $('[data-success-detail]', ok);
      if (detail && form.id === 'donate-form') detail.textContent = $('#donation-summary').textContent;
      form.hidden = true; ok.hidden = false; ok.focus();
    });
    form.addEventListener('reset', function () { setTimeout(function () { $$('.field, fieldset[data-required-group]', form).forEach(clearField); $('[data-error-summary]', form).hidden = true; form.dispatchEvent(new Event('change')); }, 0); });
  });
  $$('[data-restart]').forEach(function (b) {
    b.addEventListener('click', function () {
      var ok = b.closest('[data-success-panel]'), form = document.getElementById(ok.getAttribute('data-for'));
      form.reset(); ok.hidden = true; form.hidden = false; $('input', form).focus();
    });
  });

  /* ---------- Donation form (simulation only) ---------- */
  var donate = $('#donate-form');
  if (donate) {
    var IMPACT = { 10: 'covers school supplies for one child for a term', 25: 'provides vaccines for ten children', 50: 'supplies a family with clean water for a month', 100: 'equips a classroom with learning materials' };
    var other = $('#other-amount'), otherField = $('#other-amount-field'), summary = $('#donation-summary');
    var update = function () {
      var amt = donate.elements.amount.value, freq = donate.elements.frequency.value;
      otherField.hidden = amt !== 'other';
      other.required = amt === 'other';
      var value = amt === 'other' ? other.value : amt;
      var impact = amt !== 'other' && IMPACT[amt] ? ' - ' + IMPACT[amt] + ' (illustrative)' : '';
      summary.textContent = value ? 'Your choice: $' + value + (freq === 'monthly' ? ' per month' : ' once') + impact + '. Demo only: no payment is taken.' : 'Choose an amount to see a summary. Demo only: no payment is taken.';
    };
    donate.addEventListener('change', update);
    donate.addEventListener('input', update);
    var pre = params.get('designation');
    if (pre && $('option[value="' + pre + '"]', donate.elements.fund)) donate.elements.fund.value = pre;
    update();
  }
})();
