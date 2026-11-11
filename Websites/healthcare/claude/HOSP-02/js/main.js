/* Marlowe Bay Health - fictional replica. All data below is invented sample data. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var params = new URLSearchParams(window.location.search);

  /* ---------- Sample data (inline: no fetch, works from file://) ---------- */
  var LOCATIONS = [
    { id: 'hospital-harbor-point', name: 'Marlowe Bay Hospital Harbor Point', type: 'hospital', city: 'Harbor Point', address: '100 Seawall Drive', phone: '(800) 555-0142', hours: 'Open 24 hours (sample)', page: 'location-harbor-point.html' },
    { id: 'hospital-eastvale', name: 'Marlowe Bay Hospital Eastvale', type: 'hospital', city: 'Eastvale', address: '2400 Orchard Parkway', phone: '(800) 555-0143', hours: 'Open 24 hours (sample)' },
    { id: 'pc-harbor-point', name: 'Harbor Point Primary Care', type: 'primary-care', city: 'Harbor Point', address: '310 Dockside Lane, Suite 200', phone: '(800) 555-0151', hours: 'Mon-Fri 8:00-17:00 (sample)' },
    { id: 'pc-cedar-heights', name: 'Cedar Heights Primary Care', type: 'primary-care', city: 'Cedar Heights', address: '75 Cedar Row', phone: '(800) 555-0152', hours: 'Mon-Fri 8:00-17:00 (sample)' },
    { id: 'pc-brightwater', name: 'Brightwater Family Medicine', type: 'primary-care', city: 'Brightwater', address: '18 Creekside Court', phone: '(800) 555-0153', hours: 'Mon-Sat 8:00-14:00 (sample)' },
    { id: 'hc-eastvale', name: 'Eastvale Health Center', type: 'health-center', city: 'Eastvale', address: '2450 Orchard Parkway', phone: '(800) 555-0161', hours: 'Mon-Fri 7:30-18:00 (sample)' },
    { id: 'hc-pine-ridge', name: 'Pine Ridge Health Center', type: 'health-center', city: 'Pine Ridge', address: '9 Summit Road', phone: '(800) 555-0162', hours: 'Mon-Fri 8:00-17:00 (sample)' },
    { id: 'uc-harbor-point', name: 'Harbor Point Urgent Care', type: 'urgent-care', city: 'Harbor Point', address: '420 Seawall Drive', phone: '(800) 555-0171', hours: 'Daily 8:00-20:00 (sample)' },
    { id: 'uc-brightwater', name: 'Brightwater Urgent Care', type: 'urgent-care', city: 'Brightwater', address: '55 Creekside Court', phone: '(800) 555-0172', hours: 'Daily 8:00-20:00 (sample)' }
  ];
  var LOCATION_TYPES = { hospital: 'Hospital', 'primary-care': 'Primary care', 'health-center': 'Health center', 'urgent-care': 'Urgent care' };
  var locName = function (id) { return LOCATIONS.filter(function (l) { return l.id === id; })[0].name; };

  var PROVIDERS = [
    { id: 'p1', name: 'Amara Okafor, MD', specialty: 'Cardiology', conditions: 'heart failure, arrhythmia, high blood pressure', languages: ['English', 'Igbo'], locations: ['hospital-harbor-point', 'hc-eastvale'], accepting: true, phone: '(800) 555-0201', bio: 'Sample profile. Focuses on prevention and long-term management of heart rhythm and blood pressure conditions.' },
    { id: 'p2', name: 'Daniel Reyes, MD', specialty: 'Cardiology', conditions: 'coronary artery disease, heart attack, chest pain, cholesterol', languages: ['English', 'Spanish'], locations: ['hospital-eastvale'], accepting: false, phone: '(800) 555-0202', bio: 'Sample profile. Sees patients for coronary disease and cardiac rehabilitation referrals.' },
    { id: 'p3', name: 'Priya Natarajan, MD', specialty: 'Oncology', conditions: 'breast cancer, lung cancer, chemotherapy', languages: ['English', 'Tamil'], locations: ['hospital-harbor-point'], accepting: true, phone: '(800) 555-0203', bio: 'Sample profile. Medical oncologist who coordinates care with surgery and radiation teams.' },
    { id: 'p4', name: 'Greta Lindqvist, DO', specialty: 'Primary Care', conditions: 'annual physical, diabetes, preventive care', languages: ['English', 'Swedish'], locations: ['pc-harbor-point'], accepting: true, phone: '(800) 555-0204', bio: 'Sample profile. Family medicine physician with an interest in preventive health.' },
    { id: 'p5', name: 'Marcus Webb, NP', specialty: 'Primary Care', conditions: 'colds and flu, vaccinations, hypertension', languages: ['English'], locations: ['pc-cedar-heights', 'uc-harbor-point'], accepting: true, phone: '(800) 555-0205', bio: 'Sample profile. Nurse practitioner providing same-week primary care visits.' },
    { id: 'p6', name: 'Lucia Fontaine, MD', specialty: 'Primary Care', conditions: 'pediatrics, adolescent health, asthma', languages: ['English', 'French', 'Spanish'], locations: ['pc-brightwater'], accepting: false, phone: '(800) 555-0206', bio: 'Sample profile. Cares for children, teens and adults in one family practice.' },
    { id: 'p7', name: 'Hiroshi Tanabe, MD', specialty: 'Orthopedics', conditions: 'knee replacement, hip pain, sports injury', languages: ['English', 'Japanese'], locations: ['hospital-eastvale', 'hc-eastvale'], accepting: true, phone: '(800) 555-0207', bio: 'Sample profile. Joint replacement and sports medicine surgeon.' },
    { id: 'p8', name: 'Naomi Abebe, MD', specialty: 'Orthopedics', conditions: 'spine, back pain, scoliosis', languages: ['English', 'Amharic'], locations: ['hospital-harbor-point'], accepting: true, phone: '(800) 555-0208', bio: 'Sample profile. Treats back and neck conditions with surgical and non-surgical options.' },
    { id: 'p9', name: 'Samuel Ortega, MD', specialty: 'Neurology', conditions: 'migraine, epilepsy, memory loss, dementia', languages: ['English', 'Spanish'], locations: ['hospital-harbor-point', 'hc-pine-ridge'], accepting: true, phone: '(800) 555-0209', bio: 'Sample profile. Evaluates headaches, seizures and memory concerns.' },
    { id: 'p10', name: 'Elise Hartmann, MD', specialty: 'Gastroenterology', conditions: 'acid reflux, colon screening, Crohn disease', languages: ['English', 'German'], locations: ['hospital-eastvale'], accepting: true, phone: '(800) 555-0210', bio: 'Sample profile. Performs screening colonoscopy and manages inflammatory bowel disease.' },
    { id: 'p11', name: 'Tomasz Kowalski, MD', specialty: 'Gastroenterology', conditions: 'liver disease, abdominal pain', languages: ['English', 'Polish'], locations: ['hc-pine-ridge'], accepting: false, phone: '(800) 555-0211', bio: 'Sample profile. Sees adult patients with liver and digestive conditions.' },
    { id: 'p12', name: 'Rachel Adeyemi, MD', specialty: "Women's Health", conditions: 'pregnancy, menopause, pelvic pain', languages: ['English', 'Yoruba'], locations: ['hc-eastvale', 'hospital-eastvale'], accepting: true, phone: '(800) 555-0212', bio: 'Sample profile. Obstetrician-gynecologist providing prenatal and midlife care.' },
    { id: 'p13', name: 'Mei-Ling Chou, MD', specialty: "Women's Health", conditions: 'breast imaging, annual exam, fertility', languages: ['English', 'Mandarin'], locations: ['pc-harbor-point', 'hospital-harbor-point'], accepting: true, phone: '(800) 555-0213', bio: 'Sample profile. Provides annual exams and coordinates breast imaging.' },
    { id: 'p14', name: 'Victor Nilsson, MD', specialty: 'Pulmonology', conditions: 'asthma, COPD, sleep apnea', languages: ['English'], locations: ['hospital-harbor-point'], accepting: true, phone: '(800) 555-0214', bio: 'Sample profile. Manages chronic lung conditions and sleep-related breathing problems.' }
  ];

  var EVENTS = [
    { id: 'e1', title: 'Heart-Healthy Cooking Demo', type: 'class', date: '2027-01-12', time: '18:00', format: 'In person', where: 'Eastvale Health Center', text: 'A dietitian shares low-sodium recipes. Sample class.' },
    { id: 'e2', title: 'Childbirth Preparation Series', type: 'class', date: '2027-01-19', time: '10:00', format: 'In person', where: 'Marlowe Bay Hospital Eastvale', text: 'Four-session class for expectant parents. Sample class.' },
    { id: 'e3', title: 'Diabetes Self-Management Basics', type: 'class', date: '2027-02-02', time: '17:30', format: 'Virtual', where: 'Online video session', text: 'Meal planning, glucose monitoring and medicine questions.' },
    { id: 'e4', title: 'Cancer Caregiver Support Circle', type: 'support', date: '2027-01-14', time: '13:00', format: 'In person', where: 'Marlowe Bay Hospital Harbor Point', text: 'A peer-led circle for family members and caregivers.' },
    { id: 'e5', title: 'Grief and Loss Group', type: 'support', date: '2027-01-21', time: '18:30', format: 'Virtual', where: 'Online video session', text: 'A facilitated group for adults coping with the loss of a loved one.' },
    { id: 'e6', title: 'Stroke Survivors Meet-Up', type: 'support', date: '2027-02-09', time: '11:00', format: 'In person', where: 'Pine Ridge Health Center', text: 'Share recovery tips and local resources.' },
    { id: 'e7', title: 'Heart Health Risk Assessment', type: 'assessment', date: '2027-01-26', time: '09:00', format: 'In person', where: 'Harbor Point Primary Care', text: 'A 30-minute screening with a nurse. Sample listing; not a diagnosis.' },
    { id: 'e8', title: 'Bone and Joint Health Assessment', type: 'assessment', date: '2027-02-16', time: '09:30', format: 'In person', where: 'Eastvale Health Center', text: 'Balance and mobility check with a physical therapist.' },
    { id: 'e9', title: 'Online Sleep Health Questionnaire', type: 'assessment', date: '2027-03-01', time: '08:00', format: 'Virtual', where: 'Online', text: 'A self-guided questionnaire reviewed by a sleep nurse.' },
    { id: 'e10', title: 'Community Health Fair', type: 'event', date: '2027-03-06', time: '10:00', format: 'In person', where: 'Harbor Point Waterfront Park', text: 'Free screenings, family activities and local health organizations.' },
    { id: 'e11', title: 'Walk With a Doc', type: 'event', date: '2027-02-20', time: '08:30', format: 'In person', where: 'Cedar Heights Trailhead', text: 'A relaxed group walk with a Marlowe Bay physician.' },
    { id: 'e12', title: 'Mindful Breathing for Stress', type: 'class', date: '2027-03-10', time: '12:15', format: 'Virtual', where: 'Online video session', text: 'A 45-minute guided lunchtime session.' }
  ];
  var EVENT_TYPES = { class: 'Class', support: 'Support group', assessment: 'Health risk assessment', event: 'Community event' };

  var INSURERS = [
    { name: 'Evergreen Health Plan', kind: 'Commercial' }, { name: 'Evergreen Health Plan Medicare Advantage', kind: 'Medicare' },
    { name: 'Northwind Blue Shield (sample)', kind: 'Commercial' }, { name: 'Northwind Senior Choice', kind: 'Medicare' },
    { name: 'Pacific Harvest Health', kind: 'Commercial' }, { name: 'Harbor Mutual', kind: 'Commercial' },
    { name: 'Summit Care HMO', kind: 'Commercial' }, { name: 'Summit Care PPO', kind: 'Commercial' },
    { name: 'Original Medicare (Parts A and B)', kind: 'Medicare' }, { name: 'Marlowe County Medical Assistance', kind: 'Medicaid' },
    { name: 'Marlowe Family Health Plan', kind: 'Medicaid' }, { name: 'Cedar Union Employee Plan', kind: 'Commercial' },
    { name: 'Brightwater Community Plan', kind: 'Medicaid' }, { name: 'Lakeshore PPO', kind: 'Commercial' },
    { name: 'TriState Veterans Care Network', kind: 'Other' }, { name: 'Pine Ridge Cooperative Health', kind: 'Commercial' }
  ];

  /* ---------- Navigation: mobile disclosure + dropdown menus ---------- */
  var nav = $('[data-component="primary-nav"]');
  var navToggle = $('.nav-toggle');
  if (nav && navToggle) {
    var triggers = $$('.menu-trigger', nav);
    var panelOf = function (b) { return document.getElementById(b.getAttribute('aria-controls')); };
    var closeMenus = function (except) {
      triggers.forEach(function (b) {
        if (b !== except) { b.setAttribute('aria-expanded', 'false'); panelOf(b).hidden = true; }
      });
    };
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') !== 'true';
      setNav(open);
      if (!open) closeMenus();
    });
    triggers.forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true';
        closeMenus(b);
        b.setAttribute('aria-expanded', String(open));
        panelOf(b).hidden = !open;
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openTrigger = triggers.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
      if (openTrigger) { closeMenus(); openTrigger.focus(); }
      else if (navToggle.getAttribute('aria-expanded') === 'true' && navToggle.offsetParent !== null) { setNav(false); navToggle.focus(); }
    });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeMenus(); });
    nav.addEventListener('focusout', function (e) { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeMenus(); });
  }

  /* ---------- Accordions ---------- */
  $$('.accordion-trigger').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
    });
  });

  /* ---------- Dialog (native <dialog>, focus returns to opener) ---------- */
  var dialog = $('#info-dialog');
  var dialogOpener = null;
  var openDialog = function (title, html, opener) {
    dialogOpener = opener;
    $('#dialog-title').textContent = title;
    $('#dialog-body').innerHTML = html;
    dialog.showModal();
  };
  if (dialog) {
    $$('[data-dialog-close]', dialog).forEach(function (b) { b.addEventListener('click', function () { dialog.close(); }); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (dialogOpener) dialogOpener.focus(); });
  }

  /* ---------- Testimonial carousel (manual controls, no autoplay) ---------- */
  var carousel = $('[data-component="testimonial-carousel"]');
  if (carousel) {
    var slides = $$('.slide', carousel);
    var current = 0;
    var status = $('.carousel-status', carousel);
    var show = function (n) {
      current = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.hidden = i !== current; });
      status.textContent = 'Story ' + (current + 1) + ' of ' + slides.length;
    };
    $('[data-carousel="prev"]', carousel).addEventListener('click', function () { show(current - 1); });
    $('[data-carousel="next"]', carousel).addEventListener('click', function () { show(current + 1); });
    show(0);
  }

  /* ---------- Forms (simulated; nothing leaves the page) ---------- */
  var fieldLabel = function (el) { return el.getAttribute('data-label') || 'This field'; };
  var fieldProblem = function (el) {
    var v = el.value.trim();
    if (el.required && !v) return el.getAttribute('data-error-required') || fieldLabel(el) + ' is required.';
    if (!v) return '';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter an email address like name@example.com.';
    if (el.pattern && !new RegExp('^(?:' + el.pattern + ')$').test(v)) return el.getAttribute('data-error-format') || fieldLabel(el) + ' is not in the expected format.';
    if (el.minLength > 0 && v.length < el.minLength) return fieldLabel(el) + ' must be at least ' + el.minLength + ' characters.';
    return '';
  };
  $$('form[data-demo-form]').forEach(function (form) {
    var summary = $('.error-summary', form);
    var success = $('.demo-success', form);
    var controls = $$('input, select, textarea', form);
    var setError = function (el, msg) {
      var p = document.getElementById(el.id + '-error');
      p.textContent = msg;
      p.hidden = !msg;
      if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
    };
    controls.forEach(function (el) { el.addEventListener('blur', function () { if (el.getAttribute('aria-invalid')) setError(el, fieldProblem(el)); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      success.hidden = true;
      var bad = [];
      controls.forEach(function (el) {
        var msg = fieldProblem(el);
        setError(el, msg);
        if (msg) bad.push({ el: el, msg: msg });
      });
      if (bad.length) {
        var list = $('ul', summary);
        list.innerHTML = bad.map(function (b) { return '<li><a href="#' + b.el.id + '">' + esc(b.msg) + '</a></li>'; }).join('');
        $$('a', list).forEach(function (a, i) { a.addEventListener('click', function (ev) { ev.preventDefault(); bad[i].el.focus(); }); });
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;
      form.reset();
      success.hidden = false;
      success.focus();
    });
  });

  /* ---------- Shared list rendering ---------- */
  var renderList = function (listEl, statusEl, emptyEl, items, label, html) {
    listEl.innerHTML = items.map(html).join('');
    emptyEl.hidden = items.length > 0;
    statusEl.textContent = items.length + (items.length === 1 ? ' ' + label + ' found.' : ' ' + label + 's found.');
  };
  var preset = function (form) {
    $$('input[type="text"], input[type="search"], select', form).forEach(function (el) { if (params.has(el.name)) el.value = params.get(el.name); });
  };
  var wireFilter = function (form, run, reset) {
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    $$('select, input[type="checkbox"], input[type="radio"]', form).forEach(function (el) { el.addEventListener('change', run); });
    if (reset) reset.addEventListener('click', function () { form.reset(); run(); $('input[type="text"], input[type="search"]', form).focus(); });
  };
  var includes = function (hay, needle) { return hay.toLowerCase().indexOf(needle.trim().toLowerCase()) !== -1; };

  /* ---------- Find care ---------- */
  var careForm = $('#care-form');
  if (careForm) {
    var careMode = params.get('mode') === 'find_a_physician' ? 'find_a_physician' : 'specialty_or_condition';
    $$('input[name="mode"]', careForm).forEach(function (r) { r.checked = r.value === careMode; });
    preset(careForm);
    if (params.get('accepting') === '1') careForm.elements.accepting.checked = true;
    var careSpecialties = PROVIDERS.map(function (p) { return p.specialty; }).filter(function (s, i, a) { return a.indexOf(s) === i; }).sort();
    careForm.elements.specialty.insertAdjacentHTML('beforeend', careSpecialties.map(function (s) { return '<option>' + esc(s) + '</option>'; }).join(''));
    careForm.elements.location.insertAdjacentHTML('beforeend', LOCATIONS.map(function (l) { return l.city; }).filter(function (c, i, a) { return a.indexOf(c) === i; }).sort().map(function (c) { return '<option>' + esc(c) + '</option>'; }).join(''));
    if (params.has('specialty')) careForm.elements.specialty.value = params.get('specialty');
    if (params.has('loc')) careForm.elements.location.value = params.get('loc');
    var qLabel = $('label[for="care-q"]', careForm);
    var syncMode = function () {
      var phys = careForm.elements.mode.value === 'find_a_physician';
      qLabel.textContent = phys ? 'Physician name' : 'Specialty, condition or keyword';
      careForm.elements.q.placeholder = phys ? 'e.g. Okafor' : 'e.g. heart, migraine, knee';
    };
    var runCare = function () {
      syncMode();
      var f = careForm.elements, phys = f.mode.value === 'find_a_physician', q = f.q.value;
      var found = PROVIDERS.filter(function (p) {
        if (q.trim() && !includes(phys ? p.name : p.specialty + ' ' + p.conditions, q)) return false;
        if (f.specialty.value && p.specialty !== f.specialty.value) return false;
        if (f.location.value && !p.locations.some(function (id) { return LOCATIONS.filter(function (l) { return l.id === id; })[0].city === f.location.value; })) return false;
        if (f.accepting.checked && !p.accepting) return false;
        return true;
      });
      renderList($('#care-results'), $('#care-status'), $('#care-empty'), found, 'provider', function (p) {
        return '<li class="card" data-component="provider-card"><h3>' + esc(p.name) + '</h3><p class="card-meta">' + esc(p.specialty) + '</p>' +
          '<p>' + esc(p.locations.map(locName).join('; ')) + '</p>' +
          '<p><span class="badge ' + (p.accepting ? 'badge-ok' : 'badge-no') + '">' + (p.accepting ? 'Accepting new patients (sample)' : 'Not accepting new patients (sample)') + '</span></p>' +
          '<button type="button" class="btn btn-secondary" data-provider="' + p.id + '">View profile<span class="visually-hidden"> for ' + esc(p.name) + '</span></button></li>';
      });
    };
    wireFilter(careForm, runCare, $('#care-reset'));
    $('#care-results').addEventListener('click', function (e) {
      var b = e.target.closest('[data-provider]');
      if (!b) return;
      var p = PROVIDERS.filter(function (x) { return x.id === b.getAttribute('data-provider'); })[0];
      openDialog(p.name, '<p class="card-meta">' + esc(p.specialty) + '</p><p>' + esc(p.bio) + '</p><dl class="facts"><dt>Conditions</dt><dd>' + esc(p.conditions) +
        '</dd><dt>Languages</dt><dd>' + esc(p.languages.join(', ')) + '</dd><dt>Locations</dt><dd>' + esc(p.locations.map(locName).join('; ')) +
        '</dd><dt>Office phone</dt><dd>' + esc(p.phone) + ' (fictional number)</dd></dl><p class="note">Demo profile for a fictional provider. To request a visit use the <a href="contact.html">contact form</a>.</p>', b);
    });
    runCare();
  }

  /* ---------- Locations ---------- */
  var locForm = $('#location-form');
  if (locForm) {
    locForm.elements.type.insertAdjacentHTML('beforeend', Object.keys(LOCATION_TYPES).map(function (k) { return '<option value="' + k + '">' + LOCATION_TYPES[k] + '</option>'; }).join(''));
    preset(locForm);
    var runLoc = function () {
      var f = locForm.elements;
      var found = LOCATIONS.filter(function (l) {
        return (!f.type.value || l.type === f.type.value) && (!f.q.value.trim() || includes(l.name + ' ' + l.city + ' ' + l.address, f.q.value));
      });
      renderList($('#location-results'), $('#location-status'), $('#location-empty'), found, 'location', function (l) {
        return '<li class="card" id="loc-' + l.id + '" data-component="location-card"><h3>' + (l.page ? '<a href="' + l.page + '">' + esc(l.name) + '</a>' : esc(l.name)) + '</h3>' +
          '<p class="card-meta">' + LOCATION_TYPES[l.type] + '</p><p>' + esc(l.address) + ', ' + esc(l.city) + ', Marlowe County</p><p>' + esc(l.phone) + ' (fictional)</p><p>' + esc(l.hours) + '</p></li>';
      });
    };
    wireFilter(locForm, runLoc, $('#location-reset'));
    runLoc();
    var target = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
  }

  /* ---------- Classes & events ---------- */
  var eventForm = $('#event-form');
  if (eventForm) {
    eventForm.elements.type.insertAdjacentHTML('beforeend', Object.keys(EVENT_TYPES).map(function (k) { return '<option value="' + k + '">' + EVENT_TYPES[k] + '</option>'; }).join(''));
    preset(eventForm);
    var fmtDate = function (iso) { return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }); };
    var runEvents = function () {
      var f = eventForm.elements;
      var found = EVENTS.filter(function (ev) {
        return (!f.type.value || ev.type === f.type.value) && (!f.format.value || ev.format === f.format.value) && (!f.q.value.trim() || includes(ev.title + ' ' + ev.text, f.q.value));
      }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      renderList($('#event-results'), $('#event-status'), $('#event-empty'), found, 'listing', function (ev) {
        return '<li class="card" data-component="event-card"><h3>' + esc(ev.title) + '</h3><p class="card-meta">' + EVENT_TYPES[ev.type] + ' &middot; ' + ev.format + '</p>' +
          '<p>' + fmtDate(ev.date) + ', ' + ev.time + '</p><p>' + esc(ev.where) + '</p><p>' + esc(ev.text) + '</p>' +
          '<button type="button" class="btn btn-secondary" data-event="' + ev.id + '">Register (demo)<span class="visually-hidden"> for ' + esc(ev.title) + '</span></button></li>';
      });
    };
    wireFilter(eventForm, runEvents, $('#event-reset'));
    $('#event-results').addEventListener('click', function (e) {
      var b = e.target.closest('[data-event]');
      if (!b) return;
      var ev = EVENTS.filter(function (x) { return x.id === b.getAttribute('data-event'); })[0];
      openDialog('Registration demo', '<p>You selected <strong>' + esc(ev.title) + '</strong> on ' + fmtDate(ev.date) + '.</p><p class="note">This is a demonstration. No registration was submitted and no seat was reserved.</p>', b);
    });
    runEvents();
  }

  /* ---------- Insurance accepted ---------- */
  var insForm = $('#insurance-form');
  if (insForm) {
    var runIns = function () {
      var f = insForm.elements;
      var found = INSURERS.filter(function (i) { return (!f.kind.value || i.kind === f.kind.value) && (!f.q.value.trim() || includes(i.name, f.q.value)); });
      renderList($('#insurance-results'), $('#insurance-status'), $('#insurance-empty'), found, 'plan', function (i) {
        return '<li><strong>' + esc(i.name) + '</strong> <span class="badge">' + i.kind + '</span></li>';
      });
    };
    wireFilter(insForm, runIns, $('#insurance-reset'));
    runIns();
  }

  /* ---------- Specialties & programs filter (static cards) ---------- */
  var svcForm = $('#service-form');
  if (svcForm) {
    preset(svcForm);
    var runSvc = function () {
      var q = svcForm.elements.q.value, shown = 0;
      $$('#service-results > li').forEach(function (li) {
        var hit = !q.trim() || includes(li.textContent, q);
        li.hidden = !hit;
        if (hit) shown++;
      });
      $('#service-empty').hidden = shown > 0;
      $('#service-status').textContent = shown + (shown === 1 ? ' program found.' : ' programs found.');
    };
    wireFilter(svcForm, runSvc, $('#service-reset'));
    runSvc();
  }
})();
