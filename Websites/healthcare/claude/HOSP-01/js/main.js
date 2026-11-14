/* Meridian Bay Health - fictional replica for an accessibility/usability study.
   Vanilla JS, no network calls. All data below is invented sample data. */
(function () {
  'use strict';

  /* ---------- sample data ---------- */
  var SPECIALTIES = ['Cancer care', 'Cardiology', 'Dermatology', 'Emergency Medicine', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Ophthalmology', 'Orthopedics', 'Pediatrics', 'Primary Care', 'Psychiatry', 'Pulmonology', 'Surgery', 'Urology', "Women's Health"];
  var LANGS = ['English', 'Spanish', 'Mandarin', 'Tagalog', 'Hindi', 'Arabic', 'Portuguese'];

  var LOCATIONS = [
    { id: 'L1', name: 'Meridian Bay Medical Center', type: 'Hospital', city: 'Meridian Bay', zip: '90101', addr: '100 Example Avenue', phone: '(555) 010-0101', hours: 'Main entrance open daily 6 a.m. to 10 p.m.; emergency department open at all hours (sample data)', svc: ['Cancer care', 'Cardiology', 'Emergency Medicine', 'Neurology', 'Surgery', 'Pulmonology', 'Primary Care'], ed: true },
    { id: 'L2', name: "Meridian Bay Children's Hospital", type: 'Hospital', city: 'Meridian Bay', zip: '90102', addr: '210 Sample Boulevard', phone: '(555) 010-0102', hours: 'Visiting hours 8 a.m. to 8 p.m. (sample data)', svc: ['Pediatrics', 'Surgery', 'Neurology', 'Cardiology'], ed: true },
    { id: 'L3', name: 'Northgate Outpatient Pavilion', type: 'Outpatient center', city: 'Northgate', zip: '90210', addr: '45 Placeholder Way', phone: '(555) 010-0103', hours: 'Monday to Friday 7 a.m. to 6 p.m. (sample data)', svc: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Urology'] },
    { id: 'L4', name: 'Eastport Specialty Clinic', type: 'Clinic', city: 'Eastport', zip: '90305', addr: '78 Demo Street', phone: '(555) 010-0104', hours: 'Monday to Friday 8 a.m. to 5 p.m. (sample data)', svc: ['Ophthalmology', 'Dermatology', 'Neurology', 'Psychiatry'] },
    { id: 'L5', name: 'Cedar Heights Primary Care', type: 'Clinic', city: 'Cedar Heights', zip: '90410', addr: '12 Fictional Court', phone: '(555) 010-0105', hours: 'Monday to Saturday 8 a.m. to 5 p.m. (sample data)', svc: ['Primary Care', 'Pediatrics', "Women's Health"] },
    { id: 'L6', name: 'Lowell Park Urgent Care', type: 'Urgent care', city: 'Lowell Park', zip: '90520', addr: '9 Imaginary Lane', phone: '(555) 010-0106', hours: 'Daily 8 a.m. to 8 p.m. (sample data)', svc: ['Primary Care', 'Orthopedics'] },
    { id: 'L7', name: 'Northgate Cancer Center', type: 'Outpatient center', city: 'Northgate', zip: '90211', addr: '60 Placeholder Way', phone: '(555) 010-0107', hours: 'Monday to Friday 7:30 a.m. to 5:30 p.m. (sample data)', svc: ['Cancer care', 'Surgery', 'Gastroenterology'] },
    { id: 'L8', name: "Eastport Women's Health Center", type: 'Clinic', city: 'Eastport', zip: '90306', addr: '31 Demo Street', phone: '(555) 010-0108', hours: 'Monday to Friday 8 a.m. to 5 p.m. (sample data)', svc: ["Women's Health", 'Cancer care', 'Endocrinology'] },
    { id: 'L9', name: 'Harbor Street Imaging and Lab', type: 'Outpatient center', city: 'Meridian Bay', zip: '90103', addr: '5 Harbor Street', phone: '(555) 010-0109', hours: 'Monday to Saturday 7 a.m. to 4 p.m. (sample data)', svc: ['Cardiology', 'Orthopedics', 'Cancer care'] },
    { id: 'L10', name: 'Cedar Heights Orthopedic Institute', type: 'Clinic', city: 'Cedar Heights', zip: '90411', addr: '88 Fictional Court', phone: '(555) 010-0110', hours: 'Monday to Friday 7 a.m. to 5 p.m. (sample data)', svc: ['Orthopedics', 'Surgery'] },
    { id: 'L11', name: 'Mission Campus Hospital', type: 'Hospital', city: 'Meridian Bay', zip: '90104', addr: '400 Sample Boulevard', phone: '(555) 010-0111', hours: 'Emergency department open at all hours (sample data)', svc: ['Emergency Medicine', 'Primary Care', 'Psychiatry', 'Pulmonology', 'Surgery'], ed: true },
    { id: 'L12', name: 'Lowell Park Primary Care', type: 'Clinic', city: 'Lowell Park', zip: '90521', addr: '14 Imaginary Lane', phone: '(555) 010-0112', hours: 'Monday to Friday 8 a.m. to 5 p.m. (sample data)', svc: ['Primary Care', 'Psychiatry', 'Dermatology'] }
  ];

  function P(id, name, cred, spec, locs, gender, langs, acc, virt, yrs) {
    return { id: id, name: name, cred: cred, spec: spec, locs: locs, gender: gender, langs: langs, acc: acc, virt: virt, yrs: yrs };
  }
  var PROVIDERS = [
    P('p01', 'Ilse Moravec', 'MD', 'Cardiology', ['L1', 'L3'], 'Female', ['English', 'Spanish'], true, true, 18),
    P('p02', 'Tobias Wren', 'MD', 'Cardiology', ['L1', 'L9'], 'Male', ['English'], false, true, 25),
    P('p03', 'Anjali Venkataraman', 'MD, PhD', 'Cancer care', ['L7', 'L1'], 'Female', ['English', 'Hindi'], true, false, 14),
    P('p04', 'Marcus Oyelaran', 'MD', 'Cancer care', ['L7'], 'Male', ['English', 'Portuguese'], true, true, 11),
    P('p05', 'Lucia Ferreira-Dane', 'MD', 'Primary Care', ['L5', 'L12'], 'Female', ['English', 'Spanish', 'Portuguese'], true, true, 9),
    P('p06', 'Henrik Salazar', 'DO', 'Primary Care', ['L5'], 'Male', ['English', 'Spanish'], true, true, 6),
    P('p07', 'Wei Lin Hartwell', 'MD', 'Neurology', ['L1', 'L4'], 'Female', ['English', 'Mandarin'], false, true, 20),
    P('p08', 'Priya Nandakumar', 'MD', 'Pediatrics', ['L2', 'L5'], 'Female', ['English', 'Hindi'], true, true, 12),
    P('p09', 'Gareth Okonkwo-Reyes', 'MD', 'Pediatrics', ['L2'], 'Male', ['English', 'Spanish'], true, false, 8),
    P('p10', 'Sofia Andrade', 'MD', 'Dermatology', ['L3', 'L4', 'L12'], 'Female', ['English', 'Portuguese'], true, true, 10),
    P('p11', 'Elias Brandvold', 'MD', 'Orthopedics', ['L10', 'L6'], 'Male', ['English'], true, false, 16),
    P('p12', 'Naomi Castellanos', 'DPT, MD', 'Orthopedics', ['L10', 'L9'], 'Female', ['English', 'Spanish'], false, false, 13),
    P('p13', 'Dmitri Halloran', 'MD', 'Gastroenterology', ['L3', 'L7'], 'Male', ['English'], true, true, 15),
    P('p14', 'Amara Dlamini', 'MD', 'Endocrinology', ['L3', 'L8'], 'Female', ['English'], true, true, 7),
    P('p15', 'Rafael Quintero', 'MD', 'Psychiatry', ['L4', 'L11', 'L12'], 'Male', ['English', 'Spanish'], true, true, 19),
    P('p16', 'Mei-Ling Aldridge', 'MD', 'Psychiatry', ['L11'], 'Female', ['English', 'Mandarin'], false, true, 22),
    P('p17', 'Joaquin Fairweather', 'MD', 'Emergency Medicine', ['L1', 'L11'], 'Male', ['English', 'Spanish'], false, false, 17),
    P('p18', 'Hana Yoshikawa-Pell', 'MD', 'Ophthalmology', ['L4'], 'Female', ['English'], true, false, 21),
    P('p19', 'Bartholomew Nkemelu', 'MD', 'Pulmonology', ['L1', 'L11'], 'Male', ['English', 'Arabic'], true, true, 14),
    P('p20', 'Camille Duarte', 'MD', 'Surgery', ['L1', 'L10', 'L11'], 'Female', ['English', 'Portuguese'], false, false, 24),
    P('p21', 'Omar Haddad-Voss', 'MD', 'Urology', ['L3'], 'Male', ['English', 'Arabic'], true, true, 12),
    P('p22', 'Greta Lindqvist', 'MD', "Women's Health", ['L8', 'L5'], 'Female', ['English'], true, true, 15),
    P('p23', 'Imani Whitcombe', 'MD', "Women's Health", ['L8'], 'Female', ['English', 'Spanish'], true, false, 5),
    P('p24', 'Nikolai Petrosyan', 'MD, PhD', 'Neurology', ['L1'], 'Male', ['English'], false, false, 27),
    P('p25', 'Tessa Brightwater', 'NP', 'Primary Care', ['L12', 'L5'], 'Female', ['English'], true, true, 4),
    P('p26', 'Anselm Adeyemi', 'MD', 'Cardiology', ['L9', 'L3'], 'Male', ['English'], true, false, 9),
    P('p27', 'Rosalind Chowdhury', 'MD', 'Cancer care', ['L8', 'L7'], 'Female', ['English', 'Hindi'], true, true, 16),
    P('p28', 'Felix Tanaka-Moreau', 'MD', 'Dermatology', ['L12'], 'Male', ['English'], false, true, 3),
    P('p29', 'Leilani Keawe-Marsh', 'MD', 'Endocrinology', ['L8', 'L3'], 'Female', ['English', 'Tagalog'], true, false, 11),
    P('p30', 'Cormac Ellery', 'MD', 'Gastroenterology', ['L7'], 'Male', ['English'], false, false, 20)
  ];
  PROVIDERS.forEach(function (p) {
    p.bio = 'Dr. ' + p.name + ' is a fictional ' + p.spec.toLowerCase() + ' provider created for this layout study. This brochure-level profile is illustrative only and describes no real person, qualifications or clinical approach.';
  });

  var SERVICES = [['Cancer care', 'Cancer care'], ['Breast care', 'Cancer care'], ['Cardiology', 'Cardiology'], ['Heart rhythm care', 'Cardiology'], ['Vascular care', 'Cardiology'], ['Dermatology', 'Dermatology'], ['Diabetes and hormone care', 'Endocrinology'], ['Thyroid care', 'Endocrinology'], ['Digestive health', 'Gastroenterology'], ['Emergency medicine', 'Emergency Medicine'], ['Eye care', 'Ophthalmology'], ['Family medicine', 'Primary Care'], ['General surgery', 'Surgery'], ['Internal medicine', 'Primary Care'], ['Kidney and urinary care', 'Urology'], ['Lung care', 'Pulmonology'], ['Mental health', 'Psychiatry'], ['Neurology', 'Neurology'], ['Orthopedics', 'Orthopedics'], ['Pediatrics', 'Pediatrics'], ['Pregnancy and birth', "Women's Health"], ['Sports medicine', 'Orthopedics'], ['Urology', 'Urology'], ["Women's health", "Women's Health"], ['Wound care', 'Surgery'], ['Weight management', 'Endocrinology']];

  var TOPICS = [
    ['Heart and vascular conditions', 'Condition area', 'Cardiology'], ['Cancer', 'Condition area', 'Cancer care'], ['Diabetes and hormone conditions', 'Condition area', 'Endocrinology'],
    ['Digestive conditions', 'Condition area', 'Gastroenterology'], ['Brain and nervous system conditions', 'Condition area', 'Neurology'], ['Bone and joint conditions', 'Condition area', 'Orthopedics'],
    ['Skin conditions', 'Condition area', 'Dermatology'], ['Lung and breathing conditions', 'Condition area', 'Pulmonology'], ['Eye conditions', 'Condition area', 'Ophthalmology'],
    ['Mental health conditions', 'Condition area', 'Psychiatry'], ['Kidney and urinary conditions', 'Condition area', 'Urology'], ["Women's health conditions", 'Condition area', "Women's Health"],
    ['Children’s health', 'Condition area', 'Pediatrics'], ['Surgical care', 'Treatment area', 'Surgery'], ['Radiation and infusion services', 'Treatment area', 'Cancer care'],
    ['Joint care programs', 'Treatment area', 'Orthopedics'], ['Rehabilitation services', 'Treatment area', 'Orthopedics'], ['Preventive and routine visits', 'Treatment area', 'Primary Care'],
    ['Counseling and therapy services', 'Treatment area', 'Psychiatry'], ['Imaging services', 'Medical test', 'Cardiology'], ['Laboratory services', 'Medical test', 'Primary Care'],
    ['Heart testing services', 'Medical test', 'Cardiology'], ['Vision testing services', 'Medical test', 'Ophthalmology'], ['Screening services', 'Medical test', 'Primary Care']
  ];

  var PLANS = [['Bayline Health PPO', 'Commercial'], ['Bayline Health HMO', 'Commercial'], ['Cobalt Shield Choice', 'Commercial'], ['Cobalt Shield Select', 'Commercial'], ['Evergreen Mutual Family Plan', 'Commercial'], ['Harborlight Gold', 'Commercial'], ['Harborlight Silver', 'Commercial'], ['Statewide Senior Advantage (sample)', 'Medicare'], ['Golden Years Supplement (sample)', 'Medicare'], ['Medicare Part B (sample listing)', 'Medicare'], ['State Family Care (sample)', 'Medicaid'], ['Community Access Plan (sample)', 'Medicaid'], ['Federal Employee Choice (sample)', 'Commercial'], ['Student Health Cover (sample)', 'Commercial']];

  var STORIES = [
    { t: 'A new season of gardening', b: 'This illustrative story is invented for the study. It shows how a hospital might present a patient recovery narrative in a carousel, with a heading, short text and image.', a: 'Illustrative patient story' },
    { t: 'Back on the trail', b: 'A second invented story. Real hospital stories would appear here; this placeholder contains no real person and no medical claims.', a: 'Illustrative patient story' },
    { t: 'Learning to walk to school again', b: 'A third invented story used to exercise carousel controls such as previous, next and pause, as well as keyboard operation.', a: 'Illustrative patient story' }
  ];

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function norm(s) { return String(s).toLowerCase(); }
  function params() { try { return new URLSearchParams(location.search); } catch (e) { return { get: function () { return null; } }; } }
  function locById(id) { return LOCATIONS.filter(function (l) { return l.id === id; })[0]; }
  function say(el, msg) { if (el) { el.textContent = ''; setTimeout(function () { el.textContent = msg; }, 30); } }
  function fillSelect(sel, items, first) {
    if (!sel) return;
    sel.innerHTML = '<option value="">' + esc(first) + '</option>' + items.map(function (i) { return '<option value="' + esc(i[0]) + '">' + esc(i[1]) + '</option>'; }).join('');
  }

  /* ---------- header: mobile menu, dropdown ---------- */
  function initHeader() {
    var toggle = $('.menu-toggle'), nav = $('#primary-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }
    $$('.has-sub').forEach(function (li) {
      var btn = $('.nav-btn', li);
      btn.addEventListener('click', function () {
        var open = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
    function closeAll(returnFocus) {
      $$('.has-sub.open').forEach(function (li) {
        li.classList.remove('open');
        var b = $('.nav-btn', li); b.setAttribute('aria-expanded', 'false');
        if (returnFocus && li.contains(document.activeElement)) b.focus();
      });
      if (nav && nav.classList.contains('open') && toggle && getComputedStyle(toggle).display !== 'none') {
        var had = nav.contains(document.activeElement);
        nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
        if (returnFocus && had) toggle.focus();
      }
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll(true);
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.has-sub')) $$('.has-sub.open').forEach(function (li) { li.classList.remove('open'); $('.nav-btn', li).setAttribute('aria-expanded', 'false'); });
    });
    $$('.has-sub').forEach(function (li) {
      li.addEventListener('focusout', function (e) {
        if (e.relatedTarget && !li.contains(e.relatedTarget)) { li.classList.remove('open'); $('.nav-btn', li).setAttribute('aria-expanded', 'false'); }
      });
    });
  }

  /* ---------- footer groups: disclosure on small screens ---------- */
  function initFooter() {
    var mq = window.matchMedia('(max-width:699px)');
    var groups = $$('.footer-groups [data-open]');
    function apply() {
      groups.forEach(function (g) {
        var b = $('button', g);
        if (mq.matches) { b.disabled = false; b.setAttribute('aria-expanded', g.getAttribute('data-open')); }
        else { b.disabled = true; b.removeAttribute('aria-expanded'); g.setAttribute('data-open', 'true'); }
      });
    }
    groups.forEach(function (g) {
      $('button', g).addEventListener('click', function () {
        var open = g.getAttribute('data-open') !== 'true';
        g.setAttribute('data-open', String(open));
        this.setAttribute('aria-expanded', String(open));
      });
    });
    if (mq.addEventListener) mq.addEventListener('change', apply); else if (mq.addListener) mq.addListener(apply);
    groups.forEach(function (g) { if (mq.matches) g.setAttribute('data-open', 'false'); });
    apply();
  }

  /* ---------- accordions ---------- */
  function initAccordions() {
    $$('.acc-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(open));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
      });
    });
  }

  /* ---------- typeahead (combobox) ---------- */
  function combo(input, list, getItems, onChoose) {
    var active = -1, shown = [];
    function close() { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; }
    function render() {
      var q = norm(input.value.trim());
      if (q.length < 1) return close();
      shown = getItems(q).slice(0, 8);
      if (!shown.length) return close();
      list.innerHTML = shown.map(function (s, i) { return '<li role="option" id="' + list.id + '-o' + i + '" aria-selected="false">' + esc(s.label) + ' <small> (' + esc(s.kind) + ')</small></li>'; }).join('');
      list.hidden = false; input.setAttribute('aria-expanded', 'true'); active = -1;
    }
    function setActive(i) {
      var opts = $$('li', list);
      opts.forEach(function (o, k) { o.setAttribute('aria-selected', String(k === i)); });
      active = i;
      if (i >= 0) { input.setAttribute('aria-activedescendant', opts[i].id); opts[i].scrollIntoView({ block: 'nearest' }); } else input.removeAttribute('aria-activedescendant');
    }
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      var open = !list.hidden;
      if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) render(); if (shown.length) setActive((active + 1) % shown.length); }
      else if (e.key === 'ArrowUp' && open) { e.preventDefault(); setActive(active <= 0 ? shown.length - 1 : active - 1); }
      else if (e.key === 'Enter' && open && active >= 0) { e.preventDefault(); input.value = shown[active].label; close(); if (onChoose) onChoose(shown[active]); }
      else if (e.key === 'Escape' && open) { e.preventDefault(); e.stopPropagation(); close(); }
    });
    list.addEventListener('mousedown', function (e) { e.preventDefault(); });
    list.addEventListener('click', function (e) {
      var li = e.target.closest('li'); if (!li) return;
      var s = shown[$$('li', list).indexOf(li)]; input.value = s.label; close(); if (onChoose) onChoose(s); input.focus();
    });
    input.addEventListener('blur', close);
  }
  function doctorSuggestions(q) {
    var out = [];
    SPECIALTIES.forEach(function (s) { if (norm(s).indexOf(q) > -1) out.push({ label: s, kind: 'Specialty' }); });
    PROVIDERS.forEach(function (p) { if (norm(p.name).indexOf(q) > -1) out.push({ label: p.name, kind: 'Doctor' }); });
    return out;
  }

  /* ---------- home ---------- */
  function initHome() {
    var form = $('#hero-search'); if (!form) return;
    var input = $('#hero-q', form);
    combo(input, $('#hero-q-list'), doctorSuggestions);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      location.href = 'find-a-doctor.html' + (input.value.trim() ? '?q=' + encodeURIComponent(input.value.trim()) : '');
    });
    // carousel
    var car = $('#stories'); if (!car) return;
    var slides = $$('.slide', car), idx = 0, timer = null, playing = false;
    var status = $('#story-status'), pp = $('#story-play');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('active', k === idx); });
      status.textContent = 'Story ' + (idx + 1) + ' of ' + slides.length;
    }
    function play() { playing = true; pp.textContent = 'Pause stories'; pp.setAttribute('aria-pressed', 'true'); car.querySelector('.slides').setAttribute('aria-live', 'off'); timer = setInterval(function () { show(idx + 1); }, 8000); }
    function pause() { playing = false; pp.textContent = 'Play stories'; pp.setAttribute('aria-pressed', 'false'); car.querySelector('.slides').setAttribute('aria-live', 'polite'); clearInterval(timer); }
    $('#story-prev').addEventListener('click', function () { show(idx - 1); });
    $('#story-next').addEventListener('click', function () { show(idx + 1); });
    pp.addEventListener('click', function () { playing ? pause() : play(); });
    show(0); if (reduce) pause(); else play();
  }

  /* ---------- forms: validation helpers ---------- */
  function clearErrors(form) {
    $$('.error-msg', form).forEach(function (n) { n.remove(); });
    $$('.has-error', form).forEach(function (n) { n.classList.remove('has-error'); });
    $$('[aria-invalid]', form).forEach(function (n) { n.removeAttribute('aria-invalid'); });
    var sum = $('.error-summary', form.parentNode) || $('.error-summary', form); if (sum) { sum.hidden = true; $('ul', sum).innerHTML = ''; }
  }
  function validateForm(form, rules, summaryHost) {
    clearErrors(form);
    var errors = [];
    Object.keys(rules).forEach(function (id) {
      var el = document.getElementById(id); if (!el) return;
      var msg = rules[id](el);
      if (msg) errors.push({ id: id, msg: msg, el: el });
    });
    var sum = summaryHost;
    if (!errors.length) { if (sum) sum.hidden = true; return true; }
    errors.forEach(function (er) {
      var field = er.el.closest('.field') || er.el.parentNode;
      field.classList.add('has-error');
      var p = document.createElement('p'); p.className = 'error-msg'; p.id = er.id + '-error'; p.textContent = er.msg;
      field.appendChild(p);
      er.el.setAttribute('aria-invalid', 'true');
      var d = (er.el.getAttribute('aria-describedby') || '').split(' ').filter(Boolean); d.push(p.id); er.el.setAttribute('aria-describedby', d.join(' '));
    });
    sum.hidden = false;
    $('ul', sum).innerHTML = errors.map(function (er) { return '<li><a href="#' + er.id + '">' + esc(er.msg) + '</a></li>'; }).join('');
    $('h2', sum).textContent = errors.length === 1 ? 'There is 1 problem with your submission' : 'There are ' + errors.length + ' problems with your submission';
    $$('a', sum).forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) t.focus(); });
    });
    sum.focus();
    return false;
  }
  function req(label) { return function (el) { return el.value.trim() ? '' : label; }; }

  /* ---------- appointment form ---------- */
  function initAppointment() {
    var form = $('#appt-form'); if (!form) return;
    fillSelect($('#a-specialty'), SPECIALTIES.map(function (s) { return [s, s]; }), 'Choose a specialty');
    fillSelect($('#a-location'), LOCATIONS.filter(function (l) { return l.type !== 'Urgent care'; }).map(function (l) { return [l.id, l.name]; }), 'No preference');
    var pp = params(); if (pp.get('specialty')) $('#a-specialty').value = pp.get('specialty'); if (pp.get('doctor')) $('#a-note').value = 'Requested provider (sample): ' + pp.get('doctor');
    var sum = $('#appt-errors'), ok = $('#appt-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault(); ok.hidden = true;
      var good = validateForm(form, {
        'a-first': req('Enter your first name'), 'a-last': req('Enter your last name'),
        'a-email': function (el) { var v = el.value.trim(); if (!v) return 'Enter your email address'; return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? '' : 'Enter an email address in the format name@example.com'; },
        'a-phone': function (el) { var v = el.value.replace(/\D/g, ''); if (!el.value.trim()) return 'Enter your phone number'; return v.length === 10 ? '' : 'Enter a 10-digit phone number, for example (555) 010-0123'; },
        'a-specialty': req('Choose a specialty'),
        'a-consent': function (el) { return el.checked ? '' : 'Confirm that you understand this is a demonstration form'; }
      }, sum);
      if (good) {
        form.hidden = true; ok.hidden = false;
        $('#appt-name').textContent = $('#a-first').value.trim();
        ok.focus();
      }
    });
    $('#appt-reset').addEventListener('click', function () { form.reset(); clearErrors(form); sum.hidden = true; ok.hidden = true; form.hidden = false; $('#a-first').focus(); });
  }

  /* ---------- find a doctor ---------- */
  function initDoctors() {
    var root = $('#doctor-finder'); if (!root) return;
    var q = $('#d-q'), spec = $('#d-spec'), loc = $('#d-loc'), lang = $('#d-lang'), gen = $('#d-gender'), acc = $('#d-acc'), virt = $('#d-virt'), sort = $('#d-sort');
    var list = $('#d-list'), count = $('#d-count'), more = $('#d-more'), empty = $('#d-empty'), live = $('#d-live');
    fillSelect(spec, SPECIALTIES.map(function (s) { return [s, s]; }), 'All specialties');
    fillSelect(loc, LOCATIONS.map(function (l) { return [l.id, l.name]; }), 'All locations');
    fillSelect(lang, LANGS.map(function (s) { return [s, s]; }), 'Any language');
    var pp = params();
    if (pp.get('q')) q.value = pp.get('q');
    if (pp.get('specialty')) spec.value = pp.get('specialty');
    if (pp.get('location')) loc.value = pp.get('location');
    var limit = 10, filtered = [];
    combo(q, $('#d-q-list'), doctorSuggestions, function () { limit = 10; update(true); });
    function run() {
      var t = norm(q.value.trim());
      filtered = PROVIDERS.filter(function (p) {
        if (t) {
          var hay = norm(p.name + ' ' + p.spec + ' ' + p.cred + ' ' + p.locs.map(function (id) { return locById(id).name + ' ' + locById(id).city; }).join(' '));
          if (t.split(/\s+/).some(function (w) { return hay.indexOf(w) < 0; })) return false;
        }
        if (spec.value && p.spec !== spec.value) return false;
        if (loc.value && p.locs.indexOf(loc.value) < 0) return false;
        if (lang.value && p.langs.indexOf(lang.value) < 0) return false;
        if (gen.value && p.gender !== gen.value) return false;
        if (acc.checked && !p.acc) return false;
        if (virt.checked && !p.virt) return false;
        return true;
      });
      filtered.sort(function (a, b) {
        if (sort.value === 'exp') return b.yrs - a.yrs;
        return a.name.split(' ').slice(-1)[0].localeCompare(b.name.split(' ').slice(-1)[0]);
      });
    }
    function update(announce) {
      run();
      var n = filtered.length, shown = filtered.slice(0, limit);
      count.textContent = n + (n === 1 ? ' doctor' : ' doctors');
      list.innerHTML = shown.map(function (p) {
        return '<li class="result" data-component="provider-card"><img src="assets/provider.svg" alt="" width="84" height="84">' +
          '<div><h3><a href="provider.html?id=' + p.id + '">Dr. ' + esc(p.name) + ', ' + esc(p.cred) + '</a></h3>' +
          '<p class="meta">' + esc(p.spec) + ' &middot; ' + p.yrs + ' years (sample)</p>' +
          '<p>' + p.locs.map(function (id) { return esc(locById(id).name); }).join('; ') + '</p>' +
          '<p>' + (p.acc ? '<span class="tag ok">Accepting new patients (sample)</span>' : '<span class="tag">Not accepting new patients (sample)</span>') + (p.virt ? '<span class="tag">Virtual visits (sample)</span>' : '') + '</p></div></li>';
      }).join('');
      empty.hidden = n !== 0;
      more.hidden = n <= limit;
      more.textContent = 'Show more doctors (' + Math.min(10, n - limit) + ' of ' + (n - limit) + ' remaining)';
      if (announce) say(live, n === 0 ? 'No doctors match your search.' : n + (n === 1 ? ' doctor found.' : ' doctors found.'));
    }
    sort.addEventListener('change', function () { update(true); });
    $$('input,select', $('#d-filters')).forEach(function (el) { el.addEventListener('change', function () { limit = 10; update(true); }); });
    q.addEventListener('input', function () { limit = 10; update(false); });
    $('#d-form').addEventListener('submit', function (e) { e.preventDefault(); limit = 10; update(true); });
    more.addEventListener('click', function () { limit += 10; update(false); var items = $$('.result', list); var first = items[limit - 10]; if (first) { var a = $('a', first); a.focus(); } say(live, 'Showing ' + Math.min(limit, filtered.length) + ' of ' + filtered.length + ' doctors.'); });
    $('#d-reset').addEventListener('click', function () { q.value = ''; spec.value = loc.value = lang.value = gen.value = ''; acc.checked = virt.checked = false; sort.value = 'name'; limit = 10; update(true); q.focus(); });
    $('#d-empty-reset').addEventListener('click', function () { $('#d-reset').click(); });
    var ft = $('#d-filter-toggle'), fp = $('#d-filters');
    if (ft) ft.addEventListener('click', function () { var o = fp.classList.toggle('open'); ft.setAttribute('aria-expanded', String(o)); });
    update(false);
  }

  /* ---------- provider profile ---------- */
  function initProvider() {
    var root = $('#provider-root'); if (!root) return;
    var id = params().get('id');
    var p = PROVIDERS.filter(function (x) { return x.id === id; })[0];
    if (!p) {
      root.innerHTML = '<div class="empty-state"><h1>Provider not found</h1><p>We could not find a provider with that identifier in this demonstration data set.</p><a class="btn" href="find-a-doctor.html">Back to Find a Doctor</a></div>';
      document.title = 'Provider not found | Meridian Bay Health'; $('#provider-crumb').textContent = 'Not found'; return;
    }
    document.title = 'Dr. ' + p.name + ' | Meridian Bay Health';
    $('#provider-crumb').textContent = 'Dr. ' + p.name;
    root.innerHTML =
      '<div class="profile-head"><img src="assets/provider.svg" alt="" width="160" height="160"><div><h1>Dr. ' + esc(p.name) + ', ' + esc(p.cred) + '</h1>' +
      '<p class="meta">' + esc(p.spec) + '</p><p>' + (p.acc ? '<span class="tag ok">Accepting new patients (sample)</span>' : '<span class="tag">Not accepting new patients (sample)</span>') + (p.virt ? '<span class="tag">Virtual visits (sample)</span>' : '') + '</p>' +
      '<div class="btn-row"><a class="btn" href="appointments.html?specialty=' + encodeURIComponent(p.spec) + '&amp;doctor=' + encodeURIComponent('Dr. ' + p.name) + '">Request an appointment</a><a class="btn secondary" href="find-a-doctor.html?specialty=' + encodeURIComponent(p.spec) + '">More ' + esc(p.spec) + ' doctors</a></div></div></div>' +
      '<section aria-labelledby="pf-about" data-section="provider-about" data-component="profile-section" class="band"><h2 id="pf-about">About</h2><p>' + esc(p.bio) + '</p></section>' +
      '<section aria-labelledby="pf-facts" data-section="provider-facts" data-component="profile-section"><h2 id="pf-facts">Details</h2><dl class="facts"><dt>Specialty</dt><dd>' + esc(p.spec) + '</dd><dt>Languages</dt><dd>' + esc(p.langs.join(', ')) + '</dd><dt>Experience</dt><dd>' + p.yrs + ' years (invented)</dd></dl></section>' +
      '<section aria-labelledby="pf-loc" data-section="provider-locations" data-component="location-list" class="band"><h2 id="pf-loc">Locations</h2><ul>' +
      p.locs.map(function (l) { var L = locById(l); return '<li><a href="locations.html?q=' + encodeURIComponent(L.name) + '">' + esc(L.name) + '</a>, ' + esc(L.addr) + ', ' + esc(L.city) + ' &middot; ' + esc(L.phone) + '</li>'; }).join('') + '</ul></section>';
  }

  /* ---------- locations ---------- */
  function initLocations() {
    var root = $('#location-finder'); if (!root) return;
    var q = $('#l-q'), type = $('#l-type'), svc = $('#l-svc'), ed = $('#l-ed');
    var list = $('#l-list'), count = $('#l-count'), empty = $('#l-empty'), live = $('#l-live');
    fillSelect(svc, SPECIALTIES.map(function (s) { return [s, s]; }), 'Any service');
    var pp = params(); if (pp.get('q')) q.value = pp.get('q');
    function update(announce) {
      var t = norm(q.value.trim());
      var res = LOCATIONS.filter(function (l) {
        if (t && norm(l.name + ' ' + l.city + ' ' + l.zip + ' ' + l.addr).indexOf(t) < 0) return false;
        if (type.value && l.type !== type.value) return false;
        if (svc.value && l.svc.indexOf(svc.value) < 0) return false;
        if (ed.checked && !l.ed) return false;
        return true;
      });
      count.textContent = res.length + (res.length === 1 ? ' location' : ' locations');
      list.innerHTML = res.map(function (l) {
        return '<li class="card" data-component="location-card"><img src="assets/location.svg" alt="" width="320" height="180"><h3>' + esc(l.name) + '</h3><p class="meta">' + esc(l.type) + (l.ed ? ' &middot; Emergency department on site' : '') + '</p>' +
          '<p>' + esc(l.addr) + ', ' + esc(l.city) + ' ' + esc(l.zip) + '<br>Phone: ' + esc(l.phone) + '</p><p>' + esc(l.hours) + '</p><p>' + l.svc.map(function (s) { return '<span class="tag">' + esc(s) + '</span>'; }).join('') + '</p>' +
          '<a class="more" href="find-a-doctor.html?location=' + l.id + '">Doctors at this location</a></li>';
      }).join('');
      empty.hidden = res.length !== 0;
      if (announce) say(live, res.length === 0 ? 'No locations match your search.' : res.length + ' locations found.');
    }
    [type, svc, ed].forEach(function (el) { el.addEventListener('change', function () { update(true); }); });
    q.addEventListener('input', function () { update(false); });
    $('#l-form').addEventListener('submit', function (e) { e.preventDefault(); update(true); });
    function reset() { q.value = ''; type.value = ''; svc.value = ''; ed.checked = false; update(true); q.focus(); }
    $('#l-reset').addEventListener('click', reset); $('#l-empty-reset').addEventListener('click', reset);
    update(false);
  }

  /* ---------- medical services A-Z ---------- */
  function initServices() {
    var root = $('#services-az'); if (!root) return;
    var q = $('#s-q'), list = $('#s-list'), az = $('#s-az'), count = $('#s-count'), empty = $('#s-empty'), live = $('#s-live');
    var letter = '';
    var letters = {}; SERVICES.forEach(function (s) { letters[s[0][0].toUpperCase()] = 1; });
    az.innerHTML = Object.keys(letters).sort().map(function (l) { return '<li><button type="button" aria-pressed="false" data-letter="' + l + '"><span class="visually-hidden">Show services starting with </span>' + l + '</button></li>'; }).join('');
    function update(announce) {
      var t = norm(q.value.trim());
      var res = SERVICES.filter(function (s) { return (!letter || s[0][0].toUpperCase() === letter) && (!t || norm(s[0] + ' ' + s[1]).indexOf(t) > -1); }).sort(function (a, b) { return a[0].localeCompare(b[0]); });
      count.textContent = res.length + (res.length === 1 ? ' service' : ' services');
      list.innerHTML = res.map(function (s) { return '<li><a href="find-a-doctor.html?specialty=' + encodeURIComponent(s[1]) + '">' + esc(s[0]) + '</a></li>'; }).join('');
      empty.hidden = res.length !== 0;
      if (announce) say(live, res.length + (res.length === 1 ? ' service shown.' : ' services shown.'));
    }
    $$('button', az).forEach(function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-letter'); letter = letter === l ? '' : l;
        $$('button', az).forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-letter') === letter)); });
        update(true);
      });
    });
    q.addEventListener('input', function () { update(false); });
    $('#s-form').addEventListener('submit', function (e) { e.preventDefault(); update(true); });
    $('#s-reset').addEventListener('click', function () { q.value = ''; letter = ''; $$('button', az).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); update(true); q.focus(); });
    update(false);
  }

  /* ---------- care topics ---------- */
  function initCare() {
    var root = $('#care-search'); if (!root) return;
    var q = $('#c-q'), list = $('#c-list'), count = $('#c-count'), empty = $('#c-empty'), live = $('#c-live');
    function update(announce) {
      var t = norm(q.value.trim()), kind = ($('input[name=ckind]:checked') || {}).value || '';
      var res = TOPICS.filter(function (x) { return (!kind || x[1] === kind) && (!t || norm(x[0] + ' ' + x[2]).indexOf(t) > -1); });
      count.textContent = res.length + (res.length === 1 ? ' result' : ' results');
      list.innerHTML = res.map(function (x) { return '<li class="card" data-component="topic-card"><span class="tag">' + esc(x[1]) + '</span><h3>' + esc(x[0]) + '</h3><a class="more" href="find-a-doctor.html?specialty=' + encodeURIComponent(x[2]) + '">Find ' + esc(x[2]) + ' doctors</a></li>'; }).join('');
      empty.hidden = res.length !== 0;
      if (announce) say(live, res.length + (res.length === 1 ? ' result shown.' : ' results shown.'));
    }
    $$('input[name=ckind]').forEach(function (r) { r.addEventListener('change', function () { update(true); }); });
    q.addEventListener('input', function () { update(false); });
    $('#c-form').addEventListener('submit', function (e) { e.preventDefault(); update(true); });
    $('#c-reset').addEventListener('click', function () { q.value = ''; $('#c-all').checked = true; update(true); q.focus(); });
    update(false);
  }

  /* ---------- insurance plan list ---------- */
  function initPlans() {
    var root = $('#plan-search'); if (!root) return;
    var q = $('#p-q'), type = $('#p-type'), list = $('#p-list'), count = $('#p-count'), empty = $('#p-empty'), live = $('#p-live');
    function update(announce) {
      var t = norm(q.value.trim());
      var res = PLANS.filter(function (p) { return (!type.value || p[1] === type.value) && (!t || norm(p[0]).indexOf(t) > -1); });
      count.textContent = res.length + (res.length === 1 ? ' plan' : ' plans');
      list.innerHTML = res.map(function (p) { return '<li>' + esc(p[0]) + ' <span class="tag">' + esc(p[1]) + '</span></li>'; }).join('');
      empty.hidden = res.length !== 0;
      if (announce) say(live, res.length + (res.length === 1 ? ' plan shown.' : ' plans shown.'));
    }
    q.addEventListener('input', function () { update(false); });
    type.addEventListener('change', function () { update(true); });
    $('#p-form').addEventListener('submit', function (e) { e.preventDefault(); update(true); });
    $('#p-reset').addEventListener('click', function () { q.value = ''; type.value = ''; update(true); q.focus(); });
    update(false);
  }

  /* ---------- portal demo dialog ---------- */
  function initPortal() {
    var dlg = $('#portal-dialog'); if (!dlg) return;
    var opener = null;
    $$('[data-open-portal]').forEach(function (b) {
      b.addEventListener('click', function () {
        opener = b;
        if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
        $('#pt-user').focus();
      });
    });
    function closeDlg() {
      if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
    }
    dlg.addEventListener('close', function () {
      var f = $('#portal-form'); f.reset(); clearErrors(f); $('#portal-errors').hidden = true; $('#portal-done').hidden = true; f.hidden = false;
      if (opener) opener.focus();
    });
    $$('[data-close-portal]', dlg).forEach(function (b) { b.addEventListener('click', closeDlg); });
    $('#portal-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = this;
      var good = validateForm(f, {
        'pt-user': req('Enter your demo username'),
        'pt-pass': function (el) { if (!el.value) return 'Enter your demo password'; return el.value.length >= 6 ? '' : 'Password must be at least 6 characters'; }
      }, $('#portal-errors'));
      if (good) { f.hidden = true; var d = $('#portal-done'); d.hidden = false; d.focus(); }
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initHeader(); initFooter(); initAccordions(); initPortal();
    var page = document.body.getAttribute('data-page');
    var map = { home: initHome, doctors: initDoctors, provider: initProvider, locations: initLocations, services: initServices, care: initCare, appointments: initAppointment, billing: initPlans };
    if (map[page]) map[page]();
  });
})();
