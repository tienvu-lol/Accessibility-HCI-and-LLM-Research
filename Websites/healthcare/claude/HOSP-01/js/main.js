/* Harborlight Health replica: vanilla JS, inline sample data (fictional), no network. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- sample data (fictional) ---------- */
  var LOCATIONS = [
    { id: 'l1', name: 'Harborlight Medical Center', type: 'Hospital', city: 'Bayfield', zip: '94101', address: '100 Example Way, Bayfield, CA 94101', phone: '(555) 010-0100', hours: 'Open 24 hours, every day', services: ['Emergency Department', 'Cancer Care', 'Heart Care', 'Surgery'] },
    { id: 'l2', name: 'Harborlight Children’s Hospital', type: 'Hospital', city: 'Bayfield', zip: '94102', address: '250 Sample Avenue, Bayfield, CA 94102', phone: '(555) 010-0200', hours: 'Open 24 hours, every day', services: ['Emergency Department', 'Pediatrics', 'Neurology'] },
    { id: 'l3', name: 'Harborlight Cancer & Imaging Center', type: 'Imaging', city: 'Bayfield', zip: '94103', address: '75 Placeholder Street, Bayfield, CA 94103', phone: '(555) 010-0300', hours: 'Mon–Fri 7 am–6 pm', services: ['Cancer Care', 'Medical Imaging'] },
    { id: 'l4', name: 'Northshore Specialty Clinic', type: 'Clinic', city: 'Northshore', zip: '94210', address: '18 Demo Road, Northshore, CA 94210', phone: '(555) 010-0400', hours: 'Mon–Fri 8 am–5 pm', services: ['Primary Care', 'Cardiology', 'Endocrinology', 'Dermatology'] },
    { id: 'l5', name: 'Eastgate Primary Care', type: 'Clinic', city: 'Eastgate', zip: '94305', address: '402 Fictional Lane, Eastgate, CA 94305', phone: '(555) 010-0500', hours: 'Mon–Sat 8 am–6 pm', services: ['Primary Care', 'Women’s Health', 'Psychiatry'] },
    { id: 'l6', name: 'Bayfield Urgent Care', type: 'Urgent care', city: 'Bayfield', zip: '94104', address: '9 Mock Plaza, Bayfield, CA 94104', phone: '(555) 010-0600', hours: 'Daily 8 am–8 pm', services: ['Urgent Care'] },
    { id: 'l7', name: 'Southport Orthopedics & Eye Center', type: 'Clinic', city: 'Southport', zip: '94411', address: '61 Sandbox Court, Southport, CA 94411', phone: '(555) 010-0700', hours: 'Mon–Fri 7:30 am–5 pm', services: ['Orthopedic Surgery', 'Eye Care'] }
  ];

  var PROVIDERS = [
    { id: 'p01', name: 'Amara Okafor', creds: 'MD', specialty: 'Cardiology', locs: ['l1', 'l4'], languages: ['English', 'Igbo'], newPatients: true, video: true, keywords: 'heart failure arrhythmia chest pain', bio: 'Dr. Okafor treats heart rhythm disorders and heart failure, and leads the sample Heart Care clinic.', education: 'MD, Example University School of Medicine; Cardiology fellowship, Harborlight Medical Center', interests: 'Atrial fibrillation, heart failure, preventive cardiology' },
    { id: 'p02', name: 'Priya Raman', creds: 'MD, PhD', specialty: 'Oncology', locs: ['l1', 'l3'], languages: ['English', 'Tamil', 'Hindi'], newPatients: true, video: true, keywords: 'cancer breast lung chemotherapy clinical trial', bio: 'Dr. Raman cares for adults with breast and lung cancers and coordinates clinical trial referrals.', education: 'MD, PhD, Sample University; Oncology fellowship, Harborlight Medical Center', interests: 'Breast cancer, lung cancer, clinical trials' },
    { id: 'p03', name: 'Mateo Alvarez', creds: 'MD', specialty: 'Orthopedic Surgery', locs: ['l7', 'l1'], languages: ['English', 'Spanish'], newPatients: true, video: false, keywords: 'knee hip replacement sports injury fracture', bio: 'Dr. Alvarez performs joint replacement and treats sports injuries in adults.', education: 'MD, Placeholder College of Medicine; Orthopedic residency, Demo Medical Center', interests: 'Hip and knee replacement, sports medicine' },
    { id: 'p04', name: 'Hannah Lindqvist', creds: 'MD', specialty: 'Pediatrics', locs: ['l2', 'l5'], languages: ['English', 'Swedish'], newPatients: true, video: true, keywords: 'children newborn vaccines asthma growth', bio: 'Dr. Lindqvist provides well-child care and manages childhood asthma and allergies.', education: 'MD, Example University; Pediatrics residency, Harborlight Children’s Hospital', interests: 'Well-child care, asthma, adolescent health' },
    { id: 'p05', name: 'Daniel Cho', creds: 'MD', specialty: 'Neurology', locs: ['l2', 'l1'], languages: ['English', 'Korean'], newPatients: false, video: true, keywords: 'migraine epilepsy stroke seizure memory', bio: 'Dr. Cho treats migraine, epilepsy and stroke recovery. He is not accepting new patients in this sample data.', education: 'MD, Sample University; Neurology residency, Demo Medical Center', interests: 'Epilepsy, migraine, stroke' },
    { id: 'p06', name: 'Sofia Marchetti', creds: 'MD', specialty: 'Women’s Health', locs: ['l5', 'l1'], languages: ['English', 'Italian'], newPatients: true, video: true, keywords: 'pregnancy prenatal obstetrics gynecology menopause', bio: 'Dr. Marchetti provides prenatal care, gynecologic care and menopause management.', education: 'MD, Placeholder College of Medicine; OB-GYN residency, Harborlight Medical Center', interests: 'Prenatal care, menopause, minimally invasive surgery' },
    { id: 'p07', name: 'Elias Haddad', creds: 'MD', specialty: 'Emergency Medicine', locs: ['l1'], languages: ['English', 'Arabic', 'French'], newPatients: false, video: false, keywords: 'trauma emergency injury', bio: 'Dr. Haddad is an emergency physician. Emergency physicians see patients who arrive at the Emergency Department; there are no scheduled visits.', education: 'MD, Example University; Emergency Medicine residency, Demo Medical Center', interests: 'Trauma care, emergency ultrasound' },
    { id: 'p08', name: 'Grace Whitfield', creds: 'MD', specialty: 'Dermatology', locs: ['l4'], languages: ['English'], newPatients: true, video: true, keywords: 'skin rash acne mole eczema psoriasis', bio: 'Dr. Whitfield treats skin conditions such as eczema, psoriasis and acne, and performs skin cancer screening.', education: 'MD, Sample University; Dermatology residency, Harborlight Medical Center', interests: 'Eczema, psoriasis, skin cancer screening' },
    { id: 'p09', name: 'Tomasz Kowalski', creds: 'MD', specialty: 'Gastroenterology', locs: ['l1', 'l4'], languages: ['English', 'Polish'], newPatients: true, video: true, keywords: 'colon reflux crohn colonoscopy liver', bio: 'Dr. Kowalski treats digestive and liver conditions and performs colonoscopy.', education: 'MD, Placeholder College of Medicine; GI fellowship, Demo Medical Center', interests: 'Inflammatory bowel disease, colon cancer screening' },
    { id: 'p10', name: 'Naomi Barrett', creds: 'MD', specialty: 'Psychiatry', locs: ['l5'], languages: ['English', 'Spanish'], newPatients: true, video: true, keywords: 'depression anxiety adhd mental health therapy', bio: 'Dr. Barrett provides evaluation and medication management for adults with depression and anxiety.', education: 'MD, Example University; Psychiatry residency, Harborlight Medical Center', interests: 'Mood disorders, anxiety, adult ADHD' },
    { id: 'p11', name: 'Kenji Watanabe', creds: 'MD', specialty: 'Eye Care', locs: ['l7'], languages: ['English', 'Japanese'], newPatients: true, video: false, keywords: 'cataract glaucoma retina vision', bio: 'Dr. Watanabe performs cataract surgery and treats glaucoma.', education: 'MD, Sample University; Ophthalmology residency, Demo Medical Center', interests: 'Cataract surgery, glaucoma' },
    { id: 'p12', name: 'Lucia Fernandes', creds: 'MD', specialty: 'Endocrinology', locs: ['l4'], languages: ['English', 'Portuguese'], newPatients: true, video: true, keywords: 'diabetes thyroid hormone obesity', bio: 'Dr. Fernandes treats diabetes, thyroid disease and other hormone conditions.', education: 'MD, Placeholder College of Medicine; Endocrinology fellowship, Harborlight Medical Center', interests: 'Type 1 and type 2 diabetes, thyroid disease' },
    { id: 'p13', name: 'Samuel Adeyemi', creds: 'MD', specialty: 'Primary Care', locs: ['l5', 'l4'], languages: ['English', 'Yoruba'], newPatients: true, video: true, keywords: 'checkup physical family medicine blood pressure', bio: 'Dr. Adeyemi provides primary care for adults, including checkups and chronic condition management.', education: 'MD, Example University; Internal medicine residency, Harborlight Medical Center', interests: 'Preventive care, hypertension, chronic disease' }
  ];

  var SERVICES = [
    { name: 'Cancer Care', blurb: 'Diagnosis, treatment and support for adults with cancer.', href: 'cancer-care.html' },
    { name: 'Cardiology', blurb: 'Heart rhythm, heart failure and prevention.', specialty: 'Cardiology' },
    { name: 'Dermatology', blurb: 'Skin conditions and skin cancer screening.', specialty: 'Dermatology' },
    { name: 'Emergency Department', blurb: 'Round-the-clock emergency care.', href: 'emergency-department.html' },
    { name: 'Endocrinology', blurb: 'Diabetes, thyroid and hormone conditions.', specialty: 'Endocrinology' },
    { name: 'Eye Care', blurb: 'Cataract, glaucoma and general eye exams.', specialty: 'Eye Care' },
    { name: 'Gastroenterology', blurb: 'Digestive and liver conditions.', specialty: 'Gastroenterology' },
    { name: 'Neurology', blurb: 'Migraine, epilepsy, stroke and memory care.', specialty: 'Neurology' },
    { name: 'Orthopedic Surgery', blurb: 'Joint replacement, fractures and sports injuries.', specialty: 'Orthopedic Surgery' },
    { name: 'Pediatrics', blurb: 'Care for infants, children and teens.', specialty: 'Pediatrics' },
    { name: 'Primary Care', blurb: 'Checkups and ongoing care for adults.', specialty: 'Primary Care' },
    { name: 'Psychiatry', blurb: 'Mental health evaluation and treatment.', specialty: 'Psychiatry' },
    { name: 'Women’s Health', blurb: 'Pregnancy, gynecology and menopause.', specialty: 'Women’s Health' }
  ];

  var CARE = {
    conditions: [
      { name: 'Asthma', blurb: 'Long-term airway inflammation causing wheezing and breathlessness.', specialty: 'Pediatrics' },
      { name: 'Atrial fibrillation', blurb: 'An irregular heart rhythm that can raise stroke risk.', specialty: 'Cardiology' },
      { name: 'Breast cancer', blurb: 'Cancer that begins in breast tissue.', specialty: 'Oncology' },
      { name: 'Cataracts', blurb: 'Clouding of the eye’s lens that blurs vision.', specialty: 'Eye Care' },
      { name: 'Depression', blurb: 'A mood disorder with lasting sadness or loss of interest.', specialty: 'Psychiatry' },
      { name: 'Eczema', blurb: 'Itchy, inflamed skin that often flares and settles.', specialty: 'Dermatology' },
      { name: 'Epilepsy', blurb: 'A brain condition that causes repeated seizures.', specialty: 'Neurology' },
      { name: 'Knee osteoarthritis', blurb: 'Wear of joint cartilage causing pain and stiffness.', specialty: 'Orthopedic Surgery' },
      { name: 'Migraine', blurb: 'Recurring, often one-sided headaches with other symptoms.', specialty: 'Neurology' },
      { name: 'Type 2 diabetes', blurb: 'A condition where the body does not use insulin well.', specialty: 'Endocrinology' }
    ],
    treatments: [
      { name: 'Chemotherapy', blurb: 'Medicines that destroy or slow the growth of cancer cells.', specialty: 'Oncology' },
      { name: 'Cataract surgery', blurb: 'Replacing a clouded lens with a clear artificial one.', specialty: 'Eye Care' },
      { name: 'Joint replacement', blurb: 'Surgery that replaces a worn hip or knee joint.', specialty: 'Orthopedic Surgery' },
      { name: 'Cardiac ablation', blurb: 'A procedure that treats some irregular heart rhythms.', specialty: 'Cardiology' },
      { name: 'Talk therapy referral', blurb: 'Referral to counseling and behavioral health support.', specialty: 'Psychiatry' }
    ],
    tests: [
      { name: 'Colonoscopy', blurb: 'An exam of the colon that screens for polyps and cancer.', specialty: 'Gastroenterology' },
      { name: 'Echocardiogram', blurb: 'An ultrasound picture of the heart.', specialty: 'Cardiology' },
      { name: 'MRI scan', blurb: 'Detailed images of organs and tissue made with magnets.', specialty: 'Neurology' },
      { name: 'Skin check', blurb: 'A full-body exam for suspicious moles and lesions.', specialty: 'Dermatology' }
    ]
  };

  var PLANS = {
    northbridge: { name: 'Northbridge PPO', status: 'In network', note: 'Most services at all Harborlight locations are covered at in-network rates.' },
    summit: { name: 'Summit Choice HMO', status: 'In network', note: 'A referral from your primary care provider may be needed for specialty visits.' },
    evergreen: { name: 'Evergreen Medicare Advantage', status: 'In network', note: 'Cancer Care and Heart Care are covered; check your plan for imaging prior approval.' },
    beacon: { name: 'Beacon Medi-Plan (managed Medicaid)', status: 'Limited network', note: 'Covered at the Bayfield hospitals and Eastgate Primary Care only.' },
    tricounty: { name: 'TriCounty Select', status: 'Out of network', note: 'Services are billed at out-of-network rates. Ask about our financial assistance options.' }
  };

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function h(tag, attrs) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) return;
      if (k === 'text') e.textContent = v; else e.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) { if (arguments[i] != null) e.append(arguments[i]); }
    return e;
  }
  function locById(id) { return LOCATIONS.filter(function (l) { return l.id === id; })[0]; }
  function providerById(id) { return PROVIDERS.filter(function (p) { return p.id === id; })[0]; }
  function params() { return new URLSearchParams(window.location.search); }
  function fill(sel, values, firstLabel) {
    var s = $(sel);
    if (!s) return null;
    if (firstLabel) s.append(h('option', { value: '', text: firstLabel }));
    values.forEach(function (v) { s.append(h('option', { value: v.value, text: v.text })); });
    return s;
  }
  var SPECIALTIES = PROVIDERS.map(function (p) { return p.specialty; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
  function setStatus(el, text) { if (el) el.textContent = text; }

  /* ---------- disclosures: menus, search panel, footer groups, accordions ---------- */
  function setExpanded(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    if (panel.classList.contains('primary-nav')) panel.classList.toggle('is-open', open); else panel.hidden = !open;
  }
  function isOpen(btn) { return btn.getAttribute('aria-expanded') === 'true'; }

  function initHeader() {
    var transient = $$('.has-submenu > button, .search-toggle, .menu-toggle');
    $$('.has-submenu > button, .search-toggle').forEach(function (b) { setExpanded(b, false); });
    transient.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = !isOpen(btn);
        if (btn.matches('.has-submenu > button, .search-toggle')) {
          transient.forEach(function (o) { if (o !== btn && !o.matches('.menu-toggle')) setExpanded(o, false); });
        }
        setExpanded(btn, open);
        if (open && btn.classList.contains('search-toggle')) $('input', document.getElementById(btn.getAttribute('aria-controls'))).focus();
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openBtn = transient.filter(isOpen).pop();
      if (openBtn) { setExpanded(openBtn, false); openBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      transient.forEach(function (b) {
        if (b.classList.contains('menu-toggle') || !isOpen(b)) return;
        var scope = b.closest('li') || b.parentElement;
        var panel = document.getElementById(b.getAttribute('aria-controls'));
        if (!scope.contains(e.target) && !(panel && panel.contains(e.target)) && !b.contains(e.target)) setExpanded(b, false);
      });
    });
    $$('.has-submenu').forEach(function (li) {
      li.addEventListener('focusout', function (e) {
        if (e.relatedTarget && !li.contains(e.relatedTarget)) setExpanded($('button', li), false);
      });
    });
  }

  function initDisclosures() {
    var desktop = window.matchMedia('(min-width: 768px)').matches;
    $$('.footer-group > button').forEach(function (b) { setExpanded(b, desktop); });
    $$('.accordion-item button[aria-expanded], .footer-group > button').forEach(function (b) {
      b.addEventListener('click', function () { setExpanded(b, !isOpen(b)); });
    });
    $$('[data-component="accordion"] .accordion-panel').forEach(function (p) { p.hidden = true; });
  }

  /* ---------- combobox typeahead (hero + find a doctor) ---------- */
  function suggestionsFor(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2) return [];
    var out = [];
    PROVIDERS.forEach(function (p) {
      if (('dr. ' + p.name).toLowerCase().indexOf(q) > -1) out.push({ kind: 'Doctor', text: 'Dr. ' + p.name + ', ' + p.specialty, value: p.name, href: 'provider.html?id=' + p.id });
    });
    SPECIALTIES.forEach(function (s) { if (s.toLowerCase().indexOf(q) > -1) out.push({ kind: 'Specialty', text: s, value: s }); });
    CARE.conditions.forEach(function (c) { if (c.name.toLowerCase().indexOf(q) > -1) out.push({ kind: 'Condition', text: c.name, value: c.name }); });
    return out.slice(0, 8);
  }

  function initCombobox(input, onPick) {
    var list = document.getElementById(input.getAttribute('aria-controls'));
    var status = document.getElementById(input.getAttribute('data-status'));
    var items = [], active = -1;
    function close() { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; }
    function setActive(i) {
      active = i;
      $$('[role="option"]', list).forEach(function (o, n) { o.setAttribute('aria-selected', n === i ? 'true' : 'false'); });
      if (i > -1) input.setAttribute('aria-activedescendant', list.children[i].id); else input.removeAttribute('aria-activedescendant');
    }
    function pick(i) { close(); onPick(items[i]); }
    function render() {
      items = suggestionsFor(input.value);
      list.textContent = '';
      if (!items.length) { close(); setStatus(status, ''); return; }
      items.forEach(function (it, i) {
        var li = h('li', { role: 'option', id: list.id + '-' + i, 'aria-selected': 'false' }, h('span', { class: 'kind', text: it.kind }), ' ' + it.text);
        li.addEventListener('mousedown', function (e) { e.preventDefault(); pick(i); });
        list.append(li);
      });
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      setStatus(status, items.length + ' suggestion' + (items.length === 1 ? '' : 's') + ' available. Use up and down arrows to review.');
    }
    input.addEventListener('input', render);
    input.addEventListener('blur', function () { close(); });
    input.addEventListener('keydown', function (e) {
      var open = !list.hidden;
      if (e.key === 'ArrowDown' && open) { e.preventDefault(); setActive((active + 1) % items.length); }
      else if (e.key === 'ArrowUp' && open) { e.preventDefault(); setActive((active + items.length - 1) % items.length); }
      else if (e.key === 'Enter' && open && active > -1) { e.preventDefault(); pick(active); }
      else if (e.key === 'Escape' && open) { e.stopPropagation(); close(); }
    });
  }

  /* ---------- cards ---------- */
  function providerCard(p) {
    var locs = p.locs.map(function (id) { return locById(id).name; }).join('; ');
    return h('li', { class: 'card provider-card', 'data-component': 'provider-card' },
      h('img', { src: 'assets/provider-avatar.svg', alt: '', width: 64, height: 64 }),
      h('div', {},
        h('h3', {}, h('a', { href: 'provider.html?id=' + p.id, text: 'Dr. ' + p.name + ', ' + p.creds })),
        h('p', { class: 'meta', text: p.specialty }),
        h('p', { text: locs }),
        h('p', { class: 'tags' },
          h('span', { class: 'tag', text: p.newPatients ? 'Accepting new patients' : 'Not accepting new patients' }),
          p.video ? h('span', { class: 'tag', text: 'Video visits' }) : null)));
  }
  function locationCard(l) {
    return h('li', { class: 'card location-card', 'data-component': 'location-card' },
      h('h3', { text: l.name }),
      h('p', { class: 'meta', text: l.type + ' · ' + l.city }),
      h('p', { text: l.address }),
      h('p', {}, 'Phone: ', h('span', { text: l.phone }), ' (fictional number)'),
      h('p', { text: 'Hours: ' + l.hours }),
      h('p', { text: 'Services: ' + l.services.join(', ') }),
      h('p', {}, h('a', { href: 'find-a-doctor.html?location=' + l.id, text: 'Find doctors at this location' })));
  }
  function renderList(listEl, nodes) { listEl.textContent = ''; nodes.forEach(function (n) { listEl.append(n); }); }

  /* ---------- home ---------- */
  function initHome() {
    var form = $('[data-component="hero-search"]');
    if (!form) return;
    var input = $('input[type="search"]', form);
    initCombobox(input, function (it) {
      if (it.href) window.location.href = it.href;
      else { input.value = it.value; form.submit(); }
    });
    renderList($('[data-render="featured-providers"]'), ['p01', 'p02', 'p04'].map(function (id) { return providerCard(providerById(id)); }));
    renderList($('[data-render="location-preview"]'), ['l1', 'l2', 'l5'].map(function (id) { return locationCard(locById(id)); }));
    initCarousel($('[data-component="carousel"]'));
  }

  function initCarousel(root) {
    var slides = $$('.slide', root), prev = $('.carousel-prev', root), next = $('.carousel-next', root), toggle = $('.carousel-toggle', root);
    var live = $('.carousel-slides', root), idx = 0, timer = null, playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.hidden = n !== idx; });
      $('.carousel-count', root).textContent = 'Story ' + (idx + 1) + ' of ' + slides.length;
    }
    function sync() {
      clearInterval(timer);
      if (playing) timer = setInterval(function () { show(idx + 1); }, 8000);
      toggle.textContent = playing ? 'Pause stories' : 'Play stories';
      toggle.setAttribute('aria-pressed', playing ? 'false' : 'true');
      live.setAttribute('aria-live', playing ? 'off' : 'polite');
    }
    prev.addEventListener('click', function () { show(idx - 1); });
    next.addEventListener('click', function () { show(idx + 1); });
    toggle.addEventListener('click', function () { playing = !playing; sync(); });
    root.addEventListener('focusin', function () { clearInterval(timer); });
    root.addEventListener('focusout', sync);
    show(0);
    sync();
  }

  /* ---------- find a doctor ---------- */
  function initDoctorSearch() {
    var form = $('#doctor-form');
    if (!form) return;
    var q = $('#q'), spec = $('#specialty'), loc = $('#location'), lang = $('#language');
    fill('#specialty', SPECIALTIES.map(function (s) { return { value: s, text: s }; }), 'All specialties');
    fill('#location', LOCATIONS.map(function (l) { return { value: l.id, text: l.name }; }), 'All locations');
    var langs = [];
    PROVIDERS.forEach(function (p) { p.languages.forEach(function (l) { if (langs.indexOf(l) < 0) langs.push(l); }); });
    fill('#language', langs.sort().map(function (l) { return { value: l, text: l }; }), 'Any language');
    var count = $('#result-count'), results = $('#results'), empty = $('#empty-state');
    var qs = params();
    q.value = qs.get('q') || '';
    spec.value = qs.get('specialty') || '';
    loc.value = qs.get('location') || '';
    if (spec.value !== (qs.get('specialty') || '')) spec.value = '';

    function apply() {
      var term = q.value.trim().toLowerCase();
      var list = PROVIDERS.filter(function (p) {
        var hay = ('dr. ' + p.name + ' ' + p.specialty + ' ' + p.keywords + ' ' + p.interests).toLowerCase();
        return (!term || term.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; })) &&
          (!spec.value || p.specialty === spec.value) &&
          (!loc.value || p.locs.indexOf(loc.value) > -1) &&
          (!lang.value || p.languages.indexOf(lang.value) > -1) &&
          (!$('#new-patients').checked || p.newPatients) &&
          (!$('#video').checked || p.video);
      });
      var by = $('#sort').value;
      list.sort(function (a, b) { return by === 'specialty' ? a.specialty.localeCompare(b.specialty) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name); });
      renderList(results, list.map(providerCard));
      empty.hidden = list.length > 0;
      setStatus(count, list.length + ' of ' + PROVIDERS.length + ' sample doctors shown.');
    }
    initCombobox(q, function (it) {
      if (it.href) { window.location.href = it.href; return; }
      q.value = it.value; apply();
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    form.addEventListener('change', apply);
    $('#reset-filters').addEventListener('click', function () { form.reset(); window.setTimeout(apply, 0); q.focus(); });
    apply();
  }

  /* ---------- provider profile ---------- */
  function initProvider() {
    var root = $('#provider-detail');
    if (!root) return;
    var p = providerById(params().get('id') || '');
    var title = $('#provider-title');
    if (!p) {
      title.textContent = 'Doctor not found';
      root.append(h('p', {}, 'We could not find that doctor in the sample data. ', h('a', { href: 'find-a-doctor.html', text: 'Search all doctors' }), '.'));
      document.title = 'Doctor not found | Harborlight Health';
      return;
    }
    title.textContent = 'Dr. ' + p.name + ', ' + p.creds;
    document.title = 'Dr. ' + p.name + ' | Harborlight Health';
    $('#crumb-current').textContent = 'Dr. ' + p.name;
    root.append(
      h('p', { class: 'meta', text: p.specialty }),
      h('p', { class: 'tags' }, h('span', { class: 'tag', text: p.newPatients ? 'Accepting new patients' : 'Not accepting new patients' }), p.video ? h('span', { class: 'tag', text: 'Video visits' }) : null),
      h('section', { 'aria-labelledby': 'pv-about', 'data-section': 'provider-about' }, h('h2', { id: 'pv-about', text: 'About' }), h('p', { text: p.bio })),
      h('section', { 'aria-labelledby': 'pv-edu', 'data-section': 'provider-education' }, h('h2', { id: 'pv-edu', text: 'Education and training' }), h('p', { text: p.education })),
      h('section', { 'aria-labelledby': 'pv-int', 'data-section': 'provider-interests' }, h('h2', { id: 'pv-int', text: 'Clinical interests' }), h('p', { text: p.interests }), h('p', { text: 'Languages: ' + p.languages.join(', ') })),
      h('section', { 'aria-labelledby': 'pv-loc', 'data-section': 'provider-locations' }, h('h2', { id: 'pv-loc', text: 'Locations' }), h('ul', { class: 'card-list' }, p.locs.map(function (id) { return locationCard(locById(id)); }))));
    var cta = $('#provider-cta');
    cta.href = 'request-appointment.html?provider=' + p.id;
    cta.hidden = false;
  }

  /* ---------- locations ---------- */
  function initLocations() {
    var form = $('#location-form');
    if (!form) return;
    var q = $('#loc-q'), type = $('#loc-type'), svc = $('#loc-service'), list = $('#loc-results'), count = $('#loc-count'), empty = $('#loc-empty');
    var types = LOCATIONS.map(function (l) { return l.type; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    var svcs = [];
    LOCATIONS.forEach(function (l) { l.services.forEach(function (s) { if (svcs.indexOf(s) < 0) svcs.push(s); }); });
    fill('#loc-type', types.map(function (t) { return { value: t, text: t }; }), 'All location types');
    fill('#loc-service', svcs.sort().map(function (s) { return { value: s, text: s }; }), 'All services');
    function apply() {
      var term = q.value.trim().toLowerCase();
      var res = LOCATIONS.filter(function (l) {
        return (!term || (l.name + ' ' + l.city + ' ' + l.zip + ' ' + l.address).toLowerCase().indexOf(term) > -1) &&
          (!type.value || l.type === type.value) && (!svc.value || l.services.indexOf(svc.value) > -1);
      });
      renderList(list, res.map(locationCard));
      empty.hidden = res.length > 0;
      setStatus(count, res.length + ' of ' + LOCATIONS.length + ' sample locations shown.');
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    form.addEventListener('change', apply);
    q.addEventListener('input', apply);
    $('#loc-reset').addEventListener('click', function () { form.reset(); window.setTimeout(apply, 0); q.focus(); });
    apply();
  }

  /* ---------- medical services A-Z ---------- */
  function initServices() {
    var list = $('#service-list');
    if (!list) return;
    var q = $('#service-q'), count = $('#service-count'), empty = $('#service-empty'), az = $('#az-filter'), letter = '';
    var letters = SERVICES.map(function (s) { return s.name[0]; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    function href(s) { return s.href || 'find-a-doctor.html?specialty=' + encodeURIComponent(s.specialty); }
    function apply() {
      var term = q.value.trim().toLowerCase();
      var res = SERVICES.filter(function (s) { return (!term || (s.name + ' ' + s.blurb).toLowerCase().indexOf(term) > -1) && (!letter || s.name[0] === letter); });
      renderList(list, res.map(function (s) {
        return h('li', { class: 'card' }, h('h3', {}, h('a', { href: href(s), text: s.name })), h('p', { text: s.blurb }));
      }));
      empty.hidden = res.length > 0;
      setStatus(count, res.length + ' of ' + SERVICES.length + ' services shown.');
    }
    [''].concat(letters).forEach(function (l) {
      var b = h('button', { type: 'button', 'aria-pressed': l === '' ? 'true' : 'false', text: l || 'All' });
      b.addEventListener('click', function () {
        letter = l;
        $$('button', az).forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        apply();
      });
      az.append(b);
    });
    q.addEventListener('input', apply);
    $('#service-form').addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    apply();
  }

  /* ---------- conditions & care tabs ---------- */
  function initCare() {
    var root = $('[data-component="tabs"]');
    if (!root) return;
    var tabs = $$('[role="tab"]', root), q = $('#care-q'), count = $('#care-count');
    function apply() {
      var term = q.value.trim().toLowerCase(), total = 0;
      ['conditions', 'treatments', 'tests'].forEach(function (k) {
        var res = CARE[k].filter(function (c) { return !term || (c.name + ' ' + c.blurb).toLowerCase().indexOf(term) > -1; });
        total += res.length;
        renderList($('#list-' + k), res.map(function (c) {
          return h('li', { class: 'card' }, h('h3', {}, h('a', { href: 'find-a-doctor.html?specialty=' + encodeURIComponent(c.specialty), text: c.name })), h('p', { text: c.blurb }));
        }));
        $('#empty-' + k).hidden = res.length > 0;
      });
      setStatus(count, total + ' matching items across conditions, treatments and tests.');
    }
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (n == null) return;
        e.preventDefault();
        select(tabs[(n + tabs.length) % tabs.length], true);
      });
    });
    var fromHash = tabs.filter(function (t) { return '#' + t.id === window.location.hash; })[0];
    select(fromHash || tabs[0]);
    q.addEventListener('input', apply);
    $('#care-form').addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    apply();
  }

  /* ---------- form validation (shared) ---------- */
  function fieldLabel(c) {
    var l = c.id && $('label[for="' + c.id + '"]');
    return (l ? l.textContent : c.name).replace(/\(required\)|\*/g, '').trim().replace(/[:.]$/, '');
  }
  function validateForm(form) {
    $$('.field-error', form).forEach(function (e) { e.remove(); });
    $$('[aria-invalid]', form).forEach(function (c) { c.removeAttribute('aria-invalid'); });
    var errors = [], seenGroups = {};
    $$('input, select, textarea', form).forEach(function (c) {
      if (c.type === 'hidden' || c.disabled) return;
      if (c.type === 'radio') { if (seenGroups[c.name]) return; seenGroups[c.name] = true; }
      var blank = c.type === 'radio' || c.type === 'checkbox' ? false : c.required && !c.value.trim();
      if (c.checkValidity() && !blank) return;
      var msg;
      var label = c.type === 'radio' ? c.closest('fieldset').querySelector('legend').textContent.replace(/\(required\)/, '').trim() : fieldLabel(c);
      if (c.validity.valueMissing || blank) msg = c.dataset.errorRequired || ((c.tagName === 'SELECT' || c.type === 'radio' ? 'Select ' : c.type === 'checkbox' ? 'Confirm: ' : 'Enter ') + label.toLowerCase() + '.');
      else msg = c.dataset.errorFormat || (label + ' is not valid.');
      var host = c.type === 'radio' ? c.closest('fieldset') : c.closest('.field') || c.parentElement;
      var eid = (c.type === 'radio' ? c.name : c.id) + '-error';
      host.append(h('p', { class: 'field-error', id: eid }, h('span', { class: 'visually-hidden', text: 'Error: ' }), msg));
      (c.type === 'radio' ? host : c).setAttribute('aria-describedby', ((c.type === 'radio' ? host : c).getAttribute('aria-describedby') || '').replace(eid, '').trim() + ' ' + eid);
      c.setAttribute('aria-invalid', 'true');
      errors.push({ id: c.id, msg: msg });
    });
    var box = $('[data-error-summary]', form), ul = $('ul', box);
    ul.textContent = '';
    errors.forEach(function (er) {
      var a = h('a', { href: '#' + er.id, text: er.msg });
      a.addEventListener('click', function (e) { e.preventDefault(); document.getElementById(er.id).focus(); });
      ul.append(h('li', {}, a));
    });
    box.hidden = errors.length === 0;
    if (errors.length) box.focus();
    return errors.length === 0;
  }
  function bindForm(form, onValid) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(form)) onValid();
    });
  }
  function showSuccess(form, message, extra) {
    var panel = $('[data-success]', form.parentElement);
    $('.success-text', panel).textContent = message;
    panel.hidden = false;
    form.hidden = true;
    panel.focus();
    var again = $('[data-again]', panel);
    if (again) again.onclick = function () { form.reset(); panel.hidden = true; form.hidden = false; $('input, select', form).focus(); };
    if (extra) extra(panel);
  }

  /* ---------- appointment request (simulated) ---------- */
  function initAppointment() {
    var form = $('#appointment-form');
    if (!form) return;
    fill('#appt-specialty', SPECIALTIES.map(function (s) { return { value: s, text: s }; }), 'Select a specialty');
    fill('#appt-provider', PROVIDERS.map(function (p) { return { value: p.id, text: 'Dr. ' + p.name + ' (' + p.specialty + ')' }; }), 'No preference');
    fill('#appt-location', LOCATIONS.filter(function (l) { return l.type !== 'Urgent care'; }).map(function (l) { return { value: l.id, text: l.name }; }), 'Select a location');
    var d = new Date(), pad = function (n) { return String(n).padStart(2, '0'); };
    $('#appt-date').min = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    var qs = params(), p = providerById(qs.get('provider') || '');
    if (p) { $('#appt-provider').value = p.id; $('#appt-specialty').value = p.specialty; }
    else if (qs.get('specialty')) $('#appt-specialty').value = qs.get('specialty');
    bindForm(form, function () {
      var ref = 'DEMO-' + String(Math.floor(100000 + Math.random() * 900000));
      showSuccess(form, 'Demonstration only: no request was sent and nothing was stored. Thank you, ' + $('#first-name').value.trim() + '. In a live site your request would receive reference ' + ref + '.');
    });
  }

  /* ---------- billing tools (demo) ---------- */
  function initInsuranceChecker() {
    var form = $('#plan-form');
    if (!form) return;
    fill('#plan', Object.keys(PLANS).map(function (k) { return { value: k, text: PLANS[k].name }; }), 'Select a plan');
    var out = $('#plan-result');
    bindForm(form, function () {
      var pl = PLANS[$('#plan').value];
      out.textContent = '';
      out.append(h('strong', { text: pl.name + ': ' + pl.status + '. ' }), pl.note + ' (Fictional sample plans; always confirm with your insurer.)');
      out.hidden = false;
    });
  }
  function initAssistance() {
    var form = $('#assist-form');
    if (!form) return;
    var out = $('#assist-result');
    bindForm(form, function () {
      var size = Number($('#household').value), income = Number($('#income').value), limit = 30000 + 10000 * (size - 1), msg;
      if (income <= limit) msg = 'Based on the sample thresholds, you may qualify for full financial assistance.';
      else if (income <= limit * 2) msg = 'Based on the sample thresholds, you may qualify for partial financial assistance.';
      else msg = 'Based on the sample thresholds, you may not qualify, but payment plans are still available.';
      out.textContent = msg + ' This is an illustration with invented thresholds, not an eligibility decision.';
      out.hidden = false;
    });
  }

  /* ---------- hospital stay checklist ---------- */
  function initChecklist() {
    var items = $$('#packing-list input[type="checkbox"]');
    if (!items.length) return;
    var out = $('#packing-count');
    function update() { out.textContent = items.filter(function (i) { return i.checked; }).length + ' of ' + items.length + ' items packed.'; }
    items.forEach(function (i) { i.addEventListener('change', update); });
    update();
  }

  /* ---------- patient portal login (demo) ---------- */
  function initLogin() {
    var form = $('#login-form');
    if (!form) return;
    bindForm(form, function () {
      showSuccess(form, 'Demonstration only: no sign-in was attempted and no credentials were stored or sent. The real patient portal is not part of this replica.');
    });
    var pw = $('#password');
    $('#show-password').addEventListener('change', function (e) { pw.type = e.target.checked ? 'text' : 'password'; });
    var dlg = $('#forgot-dialog');
    $('#forgot-open').addEventListener('click', function () { dlg.showModal(); });
    $$('[data-close-dialog]', dlg).forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
    dlg.addEventListener('close', function () { $('#forgot-open').focus(); });
  }

  function init() {
    initHeader();
    initDisclosures();
    initHome();
    initDoctorSearch();
    initProvider();
    initLocations();
    initServices();
    initCare();
    initAppointment();
    initInsuranceChecker();
    initAssistance();
    initChecklist();
    initLogin();
    var q = params().get('q');
    var siteQ = $('#site-search-input');
    if (siteQ && q) siteQ.value = q;
  }
  init();
}());
