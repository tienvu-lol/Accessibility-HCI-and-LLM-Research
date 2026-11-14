/* Harborview Community Hospital - fictional research replica. Vanilla JS, inline demo data, no network. */
(function () {
  'use strict';

  /* ---------- Demo data (all fictional) ---------- */
  var LOCATIONS = [
    { id: 'bayfront', name: 'Harborview Hospital Bayfront', type: 'Hospital', city: 'Bayfront', addr: '100 Example Harbor Way', zip: '90001', phone: '(800) 555-0142', hours: 'Open 24 hours (main campus)', services: ['cancer', 'heart', 'imaging', 'primary', 'digestive', 'neuro', 'ortho', 'spine', 'womens', 'rehab', 'lab'], page: 'hospital-bayfront.html' },
    { id: 'westmere', name: 'Harborview Hospital Westmere', type: 'Hospital', city: 'Westmere', addr: '200 Sample Ridge Road', zip: '90002', phone: '(800) 555-0143', hours: 'Open 24 hours (sample listing)', services: ['heart', 'imaging', 'womens', 'ortho', 'lab', 'primary'] },
    { id: 'bayfront-hc', name: 'Bayfront Health Center', type: 'Health Center', city: 'Bayfront', addr: '310 Demo Plaza Drive', zip: '90001', phone: '(800) 555-0150', hours: 'Mon-Fri 8am-5pm', services: ['imaging', 'lab', 'ortho', 'spine', 'rehab'] },
    { id: 'cedar-hc', name: 'Cedar Point Health Center', type: 'Health Center', city: 'Cedar Point', addr: '45 Placeholder Court', zip: '90003', phone: '(800) 555-0151', hours: 'Mon-Fri 8am-6pm', services: ['imaging', 'digestive', 'lab', 'cancer'] },
    { id: 'lantern-hc', name: 'Lantern Hill Health Center', type: 'Health Center', city: 'Lantern Hill', addr: '780 Fictional Hill Blvd', zip: '90004', phone: '(800) 555-0152', hours: 'Mon-Fri 8am-5pm, Sat 9am-1pm', services: ['neuro', 'imaging', 'womens', 'lab'] },
    { id: 'marlow-hc', name: 'Marlow Cove Health Center', type: 'Health Center', city: 'Marlow Cove', addr: '12 Sample Cove Lane', zip: '90005', phone: '(800) 555-0153', hours: 'Mon-Fri 8am-5pm', services: ['heart', 'lab', 'rehab'] },
    { id: 'bayfront-pc', name: 'Harborview Primary Care - Bayfront', type: 'Primary Care', city: 'Bayfront', addr: '55 Example Main Street', zip: '90001', phone: '(800) 555-0160', hours: 'Mon-Fri 8am-5pm', services: ['primary', 'lab'] },
    { id: 'westmere-pc', name: 'Harborview Primary Care - Westmere', type: 'Primary Care', city: 'Westmere', addr: '9 Demo Garden Row', zip: '90002', phone: '(800) 555-0161', hours: 'Mon-Fri 8am-5pm', services: ['primary', 'womens'] },
    { id: 'cedar-pc', name: 'Harborview Primary Care - Cedar Point', type: 'Primary Care', city: 'Cedar Point', addr: '600 Sample Orchard Way', zip: '90003', phone: '(800) 555-0162', hours: 'Mon-Thu 8am-5pm', services: ['primary'] },
    { id: 'sable-pc', name: 'Harborview Primary Care - Sable Ridge', type: 'Primary Care', city: 'Sable Ridge', addr: '3 Placeholder Terrace', zip: '90006', phone: '(800) 555-0163', hours: 'Mon-Fri 9am-5pm', services: ['primary', 'lab'] },
    { id: 'bayfront-uc', name: 'Harborview Urgent Care - Bayfront', type: 'Urgent Care', city: 'Bayfront', addr: '77 Example Quay Street', zip: '90001', phone: '(800) 555-0170', hours: 'Daily 8am-8pm (sample hours)', services: ['imaging'] },
    { id: 'lantern-uc', name: 'Harborview Urgent Care - Lantern Hill', type: 'Urgent Care', city: 'Lantern Hill', addr: '21 Fictional Lantern Lane', zip: '90004', phone: '(800) 555-0171', hours: 'Daily 8am-8pm (sample hours)', services: ['imaging'] }
  ];
  var SERVICES = [
    { id: 'primary', name: 'Primary Care', kw: 'family doctor checkup wellness internal medicine', blurb: 'Everyday and preventive care with a long-term care team (illustrative description).', page: 'specialties-services.html#primary' },
    { id: 'cancer', name: 'Cancer Care', kw: 'oncology tumor infusion radiation', blurb: 'Coordinated cancer services at the Harborview Family Cancer Institute.', page: 'cancer-institute.html' },
    { id: 'digestive', name: 'Digestive Health', kw: 'gastroenterology stomach colon liver', blurb: 'Brochure-level overview of digestive health programs.', page: 'specialties-services.html#digestive' },
    { id: 'heart', name: 'Heart & Vascular', kw: 'cardiology cardiac vascular circulation', blurb: 'Programs of the Harborview Heart & Vascular Institute.', page: 'heart-vascular-institute.html' },
    { id: 'neuro', name: 'Neurosciences', kw: 'neurology brain nerve memory', blurb: 'Services for brain and nervous system care (illustrative).', page: 'specialties-services.html#neuro' },
    { id: 'ortho', name: 'Orthopedics', kw: 'bone joint muscle sports', blurb: 'Bone, joint and sports medicine programs.', page: 'specialties-services.html#ortho' },
    { id: 'spine', name: 'Spine', kw: 'back neck spinal', blurb: 'Spine care services and clinics.', page: 'specialties-services.html#spine' },
    { id: 'womens', name: "Women's Health", kw: 'obstetrics gynecology maternity pregnancy breast', blurb: "Women's health and maternity services overview.", page: 'specialties-services.html#womens' },
    { id: 'imaging', name: 'Imaging & Radiology', kw: 'xray mri ct ultrasound mammogram scan', blurb: 'Diagnostic imaging at hospital and health center sites.', page: 'specialties-services.html#imaging' },
    { id: 'rehab', name: 'Rehabilitation Services', kw: 'physical therapy occupational recovery', blurb: 'Therapy and rehabilitation programs.', page: 'specialties-services.html#rehab' },
    { id: 'lab', name: 'Laboratory Services', kw: 'blood test specimen', blurb: 'Outpatient laboratory draw sites.', page: 'specialties-services.html#lab' }
  ];
  var PROVIDERS = [
    ['Dr. Alina Whitcombe', 'primary', 'bayfront-pc', 1], ['Dr. Marcus Delacroix-Hale', 'primary', 'westmere-pc', 0],
    ['Dr. Priya Ramanathan-Ellis', 'primary', 'cedar-pc', 1], ['Dr. Tobias Lindqvist', 'primary', 'sable-pc', 1],
    ['Dr. Naomi Okonkwo-Reed', 'cancer', 'bayfront', 1], ['Dr. Felix Aranguren', 'cancer', 'cedar-hc', 0],
    ['Dr. Sunita Bhargava-Lowe', 'heart', 'bayfront', 1], ['Dr. Gareth Pemberton', 'heart', 'westmere', 1],
    ['Dr. Yuki Tanabe-Hollis', 'heart', 'marlow-hc', 0], ['Dr. Odalys Fontaine', 'digestive', 'cedar-hc', 1],
    ['Dr. Reuben Castellano', 'digestive', 'bayfront', 0], ['Dr. Ingrid Solheim-Ward', 'neuro', 'lantern-hc', 1],
    ['Dr. Kwame Adjei-Brandt', 'neuro', 'bayfront', 1], ['Dr. Leila Hosseini-Park', 'ortho', 'bayfront-hc', 1],
    ['Dr. Dmitri Volkov-Reyes', 'ortho', 'westmere', 0], ['Dr. Beatrix Nakamura-Cole', 'spine', 'bayfront-hc', 1],
    ['Dr. Anselm Mbeki-Rowe', 'spine', 'bayfront', 0], ['Dr. Camila Ortega-Finch', 'womens', 'lantern-hc', 1],
    ['Dr. Harriet Vandenberg', 'womens', 'westmere-pc', 1], ['Dr. Isaac Moreau-Singh', 'imaging', 'bayfront', 1],
    ['Dr. Zoya Petrenko-Wells', 'imaging', 'cedar-hc', 0], ['Dr. Ellis Thornbury', 'rehab', 'marlow-hc', 1],
    ['Dr. Mei-Ling Castellane', 'rehab', 'bayfront-hc', 1], ['Dr. Rafael Quintero-Blake', 'primary', 'bayfront-pc', 0]
  ].map(function (p, i) { return { id: 'p' + (i + 1), name: p[0], spec: p[1], loc: p[2], accepting: !!p[3] }; });
  var EVENTS = [
    ['Healthy Habits Workshop', 'Class', '2026-12-03', '10:00 am', 'bayfront-hc', 'A general wellness discussion series (sample listing).', 0],
    ['Caregiver Support Circle', 'Support group', '2026-12-04', '6:00 pm', 'bayfront', 'Peer-led gathering for family caregivers.', 0],
    ['Gentle Movement Class', 'Class', '2026-12-08', '9:00 am', 'marlow-hc', 'Low-impact group exercise (illustrative).', 0],
    ['Cooking for Wellness Demo', 'Class', '2026-12-10', '5:30 pm', 'cedar-hc', 'A cooking demonstration with sample recipes.', 0],
    ['Cancer Survivors Meet-up', 'Support group', '2026-12-11', '7:00 pm', 'bayfront', 'Community conversation hosted by the cancer institute.', 1],
    ['Community Health Fair', 'Event', '2026-12-13', '11:00 am', 'westmere', 'Booths and screenings information (sample event).', 0],
    ['New Parent Gathering', 'Support group', '2026-12-15', '10:30 am', 'lantern-hc', 'Social meet-up for new parents.', 0],
    ['Mindfulness Basics', 'Class', '2027-01-07', '12:00 pm', 'bayfront', 'Introductory guided relaxation class.', 1],
    ['Grief Support Group', 'Support group', '2027-01-12', '6:30 pm', 'cedar-hc', 'Peer support conversation, drop-in format.', 0],
    ['Heart-Healthy Living Talk', 'Class', '2027-01-14', '6:00 pm', 'westmere', 'Education session from the heart institute team.', 1],
    ['Diabetes Education Series', 'Class', '2027-01-20', '2:00 pm', 'sable-pc', 'Group education sessions (illustrative).', 0],
    ['Volunteer Orientation', 'Event', '2027-01-22', '4:00 pm', 'bayfront', 'Learn how community volunteers support the hospital.', 0],
    ['Memory Care Family Forum', 'Support group', '2027-02-02', '5:00 pm', 'lantern-hc', 'Family conversation hosted by neurosciences staff.', 1],
    ['Spring Wellness Walk', 'Event', '2027-02-27', '8:30 am', 'marlow-hc', 'Community walk around the cove.', 0]
  ].map(function (e, i) { return { id: 'e' + (i + 1), title: e[0], type: e[1], date: e[2], time: e[3], loc: e[4], desc: e[5], virtual: !!e[6] }; });
  var INSURERS = [
    ['Northwind Health Plan', 'Commercial'], ['Evergreen Mutual', 'Commercial'], ['Lakeshore Benefit Alliance', 'Commercial'],
    ['Pinecrest Care Network', 'Commercial'], ['Silverline Health Partners', 'Commercial'], ['Redwood Union Health', 'Commercial'],
    ['Granite State Choice', 'Commercial'], ['Meridian Care Group', 'Commercial'], ['Bluebird Family Plan', 'Commercial'],
    ['Summit Senior Advantage', 'Medicare plan'], ['Golden Years Medicare Plus', 'Medicare plan'], ['Heritage Medicare Select', 'Medicare plan'],
    ['Harbor County Health Access', 'Medicaid plan'], ['Community First Medicaid Plan', 'Medicaid plan'], ['Coastal Families Coverage', 'Medicaid plan'],
    ['Veterans Community Care (sample)', 'Other'], ['Workers Recovery Fund (sample)', 'Other'], ['Student Health Alliance', 'Other'],
    ['Fairway Employer Plan', 'Commercial'], ['Orchard Cooperative Health', 'Commercial']
  ].map(function (p) { return { name: p[0], type: p[1] }; });
  var TESTIMONIALS = [
    { q: 'Everyone on the team took time to explain things and made a stressful week easier.', who: 'Sample patient story, Bayfront' },
    { q: 'Getting my family’s questions answered in one place was a real relief.', who: 'Sample caregiver story, Westmere' },
    { q: 'The health center felt close to home and easy to find.', who: 'Sample patient story, Cedar Point' }
  ];

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function byId(list, id) { for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; } return null; }
  function params() {
    var out = {}; var q = (location.search || '').replace(/^\?/, '');
    q.split('&').forEach(function (kv) { if (!kv) return; var p = kv.split('='); try { out[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' ')); } catch (e) { /* ignore malformed */ } });
    return out;
  }
  function norm(s) { return String(s || '').toLowerCase(); }
  function fmtDate(iso) {
    var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var p = iso.split('-'); return m[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0];
  }
  function setStatus(el, msg) { if (el) { el.textContent = ''; window.setTimeout(function () { el.textContent = msg; }, 30); } }

  /* ---------- navigation ---------- */
  function initNav() {
    var nav = $('[data-component="primary-nav"]'); if (!nav) return;
    var toggle = $('.menu-toggle'); var triggers = $$('.nav-trigger', nav);
    var mq = window.matchMedia('(max-width: 899px)');
    function applyMode() {
      if (mq.matches) { nav.setAttribute('data-collapsed', toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); }
      else { nav.setAttribute('data-collapsed', 'false'); }
    }
    function closeAll(except) {
      triggers.forEach(function (t) { if (t !== except) { t.setAttribute('aria-expanded', 'false'); var m = document.getElementById(t.getAttribute('aria-controls')); if (m) m.hidden = true; } });
    }
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true'); applyMode();
    });
    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        var open = t.getAttribute('aria-expanded') === 'true'; closeAll(t);
        t.setAttribute('aria-expanded', open ? 'false' : 'true');
        document.getElementById(t.getAttribute('aria-controls')).hidden = open;
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openTrigger = triggers.filter(function (t) { return t.getAttribute('aria-expanded') === 'true'; })[0];
      if (openTrigger) { closeAll(); openTrigger.focus(); return; }
      if (mq.matches && toggle.getAttribute('aria-expanded') === 'true') { toggle.setAttribute('aria-expanded', 'false'); applyMode(); toggle.focus(); }
    });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeAll(); });
    nav.addEventListener('focusout', function (e) { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeAll(); });
    if (mq.addEventListener) mq.addEventListener('change', applyMode); applyMode();
  }

  /* ---------- portal demo dialog ---------- */
  function initPortal() {
    var dlg = $('#portal-dialog'); if (!dlg) return;
    var opener = null; var form = $('form', dlg); var msg = $('.portal-msg', dlg);
    $$('[data-open-portal]').forEach(function (b) {
      b.addEventListener('click', function () {
        opener = b; msg.hidden = true; msg.textContent = '';
        if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
        $('input', dlg).focus();
      });
    });
    function close() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); if (opener) opener.focus(); }
    $('[data-close-dialog]', dlg).addEventListener('click', close);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener('close', function () { if (opener) opener.focus(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = $('#portal-user'), p = $('#portal-pass'); var bad = [];
      [u, p].forEach(function (f) {
        var er = document.getElementById(f.id + '-error');
        if (!f.value.trim()) { f.classList.add('invalid'); f.setAttribute('aria-invalid', 'true'); er.textContent = 'Enter a ' + (f === u ? 'username' : 'password') + ' (any text works in this demo).'; bad.push(f); }
        else { f.classList.remove('invalid'); f.removeAttribute('aria-invalid'); er.textContent = ''; }
      });
      if (bad.length) { bad[0].focus(); return; }
      msg.hidden = false; msg.textContent = 'Demo only: no sign-in took place and nothing was stored or sent.';
      p.value = '';
    });
  }

  /* ---------- accordion ---------- */
  function initAccordions() {
    $$('[data-component="accordion"]').forEach(function (acc) {
      $$('button[aria-controls]', acc).forEach(function (b) {
        b.addEventListener('click', function () {
          var open = b.getAttribute('aria-expanded') === 'true';
          b.setAttribute('aria-expanded', open ? 'false' : 'true');
          document.getElementById(b.getAttribute('aria-controls')).hidden = open;
        });
      });
    });
  }

  /* ---------- carousel ---------- */
  function initCarousel() {
    var c = $('[data-component="testimonial-carousel"]'); if (!c) return;
    var i = 0; var q = $('blockquote p', c), cap = $('figcaption', c), pos = $('.carousel-pos', c);
    function show(n) { i = (n + TESTIMONIALS.length) % TESTIMONIALS.length; q.textContent = TESTIMONIALS[i].q; cap.textContent = TESTIMONIALS[i].who; pos.textContent = 'Story ' + (i + 1) + ' of ' + TESTIMONIALS.length; }
    $('[data-carousel-prev]', c).addEventListener('click', function () { show(i - 1); });
    $('[data-carousel-next]', c).addEventListener('click', function () { show(i + 1); });
    show(0);
  }

  /* ---------- find care ---------- */
  function initFindCare() {
    var form = $('#find-care-form'); if (!form) return;
    var out = $('#find-results'), status = $('#find-status');
    var specSel = $('#fc-specialty');
    SERVICES.forEach(function (s) { var o = document.createElement('option'); o.value = s.id; o.textContent = s.name; specSel.appendChild(o); });
    var pr = params();
    if (pr.type === 'physician') $('#fc-physician').checked = true;
    if (pr.q) $('#fc-q').value = pr.q; if (pr.loc) $('#fc-loc').value = pr.loc;
    function mode() { return $('#fc-physician').checked ? 'physician' : 'specialty'; }
    function locMatch(l, t) { return !t || norm(l.city + ' ' + l.zip + ' ' + l.name + ' ' + l.addr).indexOf(t) > -1; }
    function sync() {
      var phys = mode() === 'physician';
      $('#fc-physician-opts').hidden = !phys;
      $('#fc-q-label').textContent = phys ? 'Doctor name or specialty' : 'Specialty or condition';
    }
    function render() {
      var t = norm($('#fc-q').value).trim(), lt = norm($('#fc-loc').value).trim(), html = '', n = 0;
      if (mode() === 'physician') {
        var sp = specSel.value, acc = $('#fc-accepting').checked, sort = $('#fc-sort').value;
        var list = PROVIDERS.filter(function (p) {
          var l = byId(LOCATIONS, p.loc), s = byId(SERVICES, p.spec);
          return (!t || norm(p.name + ' ' + s.name + ' ' + s.kw).indexOf(t) > -1) && (!sp || p.spec === sp) && (!acc || p.accepting) && locMatch(l, lt);
        });
        list.sort(function (a, b) { return sort === 'location' ? byId(LOCATIONS, a.loc).city.localeCompare(byId(LOCATIONS, b.loc).city) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name); });
        n = list.length;
        html = list.map(function (p) {
          var l = byId(LOCATIONS, p.loc), s = byId(SERVICES, p.spec);
          return '<li class="result" data-component="provider-result"><h3>' + esc(p.name) + '</h3><p class="meta">' + esc(s.name) + ' &middot; ' + esc(l.name) + ', ' + esc(l.city) + '</p><p>' + (p.accepting ? 'Accepting new patients (sample data)' : 'Not accepting new patients (sample data)') + '</p><a href="contact-us.html?service=' + esc(p.spec) + '&amp;loc=' + esc(p.loc) + '#appointment-title">Request an appointment (simulated)<span class="visually-hidden"> with ' + esc(p.name) + '</span></a></li>';
        }).join('');
        status.dataset.noun = 'doctor';
      } else {
        var sp2 = specSel.value;
        var sl = SERVICES.filter(function (s) { return (!t || norm(s.name + ' ' + s.kw + ' ' + s.blurb).indexOf(t) > -1) && (!sp2 || s.id === sp2); });
        sl = sl.map(function (s) { return { s: s, locs: LOCATIONS.filter(function (l) { return l.services.indexOf(s.id) > -1 && locMatch(l, lt); }) }; })
          .filter(function (x) { return x.locs.length; });
        n = sl.length;
        html = sl.map(function (x) {
          return '<li class="result" data-component="service-result"><h3><a href="' + x.s.page + '">' + esc(x.s.name) + '</a></h3><p>' + esc(x.s.blurb) + '</p><p class="meta">Offered at: ' + x.locs.map(function (l) { return esc(l.name); }).join('; ') + '</p></li>';
        }).join('');
      }
      out.innerHTML = n ? html : '<li class="empty-state" data-component="empty-state"><h3>No matches in this sample data</h3><p>Try a shorter search term, clear the location box, or switch between specialty and doctor search. This demo only contains a small set of invented records.</p></li>';
      setStatus(status, n + (n === 1 ? ' result' : ' results') + ' shown.');
      try { history.replaceState(null, '', '?type=' + mode() + '&q=' + encodeURIComponent($('#fc-q').value) + '&loc=' + encodeURIComponent($('#fc-loc').value)); } catch (e) { /* file:// may refuse */ }
    }
    $$('input[name=type]', form).forEach(function (r) { r.addEventListener('change', function () { sync(); render(); }); });
    ['#fc-specialty', '#fc-accepting', '#fc-sort'].forEach(function (s) { $(s).addEventListener('change', render); });
    form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
    $('#fc-reset').addEventListener('click', function () { form.reset(); sync(); render(); $('#fc-q').focus(); });
    sync(); render();
  }

  /* ---------- locations ---------- */
  function initLocations() {
    var form = $('#location-filter'); if (!form) return;
    var out = $('#location-results'), status = $('#location-status');
    var pr = params(); if (pr.type) $('#loc-type').value = pr.type;
    function render() {
      var t = norm($('#loc-q').value).trim(), ty = $('#loc-type').value;
      var list = LOCATIONS.filter(function (l) { return (!ty || l.type === ty) && (!t || norm(l.name + ' ' + l.city + ' ' + l.zip + ' ' + l.addr).indexOf(t) > -1); });
      out.innerHTML = list.length ? list.map(function (l) {
        var name = l.page ? '<a href="' + l.page + '">' + esc(l.name) + '</a>' : esc(l.name);
        return '<li class="result" data-component="location-card"><h3>' + name + '</h3><p class="meta">' + esc(l.type) + '</p><p>' + esc(l.addr) + ', ' + esc(l.city) + ' ' + esc(l.zip) + '<br>Phone: ' + esc(l.phone) + '<br>Hours: ' + esc(l.hours) + '</p></li>';
      }).join('') : '<li class="empty-state" data-component="empty-state"><h3>No locations match</h3><p>Try a city name such as Bayfront, a ZIP code starting 900, or choose &ldquo;All location types&rdquo;.</p></li>';
      setStatus(status, list.length + ' of ' + LOCATIONS.length + ' locations shown.');
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
    $('#loc-type').addEventListener('change', render);
    $('#loc-q').addEventListener('input', render);
    $('#loc-reset').addEventListener('click', function () { form.reset(); render(); $('#loc-q').focus(); });
    render();
  }

  /* ---------- classes & events ---------- */
  function initEvents() {
    var form = $('#event-filter'); if (!form) return;
    var out = $('#event-results'), status = $('#event-status');
    var months = {}; EVENTS.forEach(function (e) { months[e.date.slice(0, 7)] = fmtDate(e.date + '').replace(/ \d+,/, ''); });
    var ms = $('#ev-month'); Object.keys(months).sort().forEach(function (k) { var o = document.createElement('option'); o.value = k; o.textContent = months[k]; ms.appendChild(o); });
    function render() {
      var t = norm($('#ev-q').value).trim(), ty = $('#ev-type').value, mo = ms.value;
      var list = EVENTS.filter(function (e) { return (!ty || e.type === ty) && (!mo || e.date.indexOf(mo) === 0) && (!t || norm(e.title + ' ' + e.desc).indexOf(t) > -1); });
      out.innerHTML = list.length ? list.map(function (e) {
        var l = byId(LOCATIONS, e.loc);
        return '<li class="result" data-component="event-card"><h3>' + esc(e.title) + '</h3><p class="meta"><span class="tag">' + esc(e.type) + '</span>' + (e.virtual ? '<span class="tag">Online option (sample)</span>' : '') + '</p><p>' + esc(fmtDate(e.date)) + ' at ' + esc(e.time) + ' &middot; ' + esc(l.name) + '</p><p>' + esc(e.desc) + '</p></li>';
      }).join('') : '<li class="empty-state" data-component="empty-state"><h3>No classes or events found</h3><p>Try another month or category, or clear the search box. Sample listings only; registration is not available in this demo.</p></li>';
      setStatus(status, list.length + (list.length === 1 ? ' listing' : ' listings') + ' shown.');
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
    ['#ev-type', '#ev-month'].forEach(function (s) { $(s).addEventListener('change', render); });
    $('#ev-q').addEventListener('input', render);
    $('#ev-reset').addEventListener('click', function () { form.reset(); render(); $('#ev-q').focus(); });
    render();
  }

  /* ---------- insurance ---------- */
  function initInsurance() {
    var form = $('#insurance-filter'); if (!form) return;
    var out = $('#insurance-results'), status = $('#insurance-status');
    function render() {
      var t = norm($('#ins-q').value).trim(), ty = $('#ins-type').value;
      var list = INSURERS.filter(function (i) { return (!ty || i.type === ty) && (!t || norm(i.name).indexOf(t) > -1); });
      out.innerHTML = list.length ? list.map(function (i) { return '<li class="result" data-component="insurance-item"><strong>' + esc(i.name) + '</strong> <span class="tag">' + esc(i.type) + '</span></li>'; }).join('')
        : '<li class="empty-state" data-component="empty-state"><h3>No plan found in this sample list</h3><p>This list contains invented plan names only. A real hospital would ask you to confirm coverage with your plan and the billing office.</p></li>';
      setStatus(status, list.length + ' of ' + INSURERS.length + ' sample plans shown.');
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
    $('#ins-type').addEventListener('change', render); $('#ins-q').addEventListener('input', render);
    $('#ins-reset').addEventListener('click', function () { form.reset(); render(); $('#ins-q').focus(); });
    render();
  }

  /* ---------- specialties list ---------- */
  function initServices() {
    var out = $('#service-list'); if (!out) return;
    var q = $('#svc-q'), status = $('#svc-status');
    function render() {
      var t = norm(q.value).trim();
      var list = SERVICES.filter(function (s) { return !t || norm(s.name + ' ' + s.kw + ' ' + s.blurb).indexOf(t) > -1; });
      out.innerHTML = list.length ? list.map(function (s) {
        var more = s.page.indexOf('specialties') === 0 ? '' : '<p><a href="' + s.page + '">Visit the ' + esc(s.name) + ' page</a></p>';
        return '<li class="result" id="' + s.id + '" data-component="service-card"><h3>' + esc(s.name) + '</h3><p>' + esc(s.blurb) + '</p>' + more + '<p><a href="find-care.html?type=physician&amp;q=' + encodeURIComponent(s.name) + '">Find a doctor in ' + esc(s.name) + '</a></p></li>';
      }).join('') : '<li class="empty-state" data-component="empty-state"><h3>No programs match</h3><p>Clear the search box to see all sample programs.</p></li>';
      setStatus(status, list.length + ' programs shown.');
    }
    q.addEventListener('input', render); $('#svc-form').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    render();
    if (location.hash) { var el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }
  }

  /* ---------- appointment request form (simulated) ---------- */
  function initAppointment() {
    var form = $('#appointment-form'); if (!form) return;
    var svc = $('#ap-service'), loc = $('#ap-location');
    SERVICES.forEach(function (s) { var o = document.createElement('option'); o.value = s.id; o.textContent = s.name; svc.appendChild(o); });
    LOCATIONS.forEach(function (l) { var o = document.createElement('option'); o.value = l.id; o.textContent = l.name; loc.appendChild(o); });
    var pr = params(); if (pr.service && byId(SERVICES, pr.service)) svc.value = pr.service; if (pr.loc && byId(LOCATIONS, pr.loc)) loc.value = pr.loc;
    var summary = $('#ap-summary'), ok = $('#ap-success');
    var rules = [
      { id: 'ap-name', test: function (v) { return v.trim().length > 1; }, msg: 'Enter your full name.' },
      { id: 'ap-email', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }, msg: 'Enter an email address like name@example.org.' },
      { id: 'ap-phone', test: function (v) { return !v.trim() || /^[\d\s().+-]{7,}$/.test(v.trim()); }, msg: 'Enter a phone number with digits only, or leave it blank.' },
      { id: 'ap-service', test: function (v) { return !!v; }, msg: 'Choose a service.' },
      { id: 'ap-location', test: function (v) { return !!v; }, msg: 'Choose a location.' },
      { id: 'ap-date', test: function (v) { var d = new Date(); var today = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); return !v || v >= today; }, msg: 'Choose a date that is not in the past, or leave it blank.' },
      { id: 'ap-consent', test: function (v, el) { return el.checked; }, msg: 'Confirm that you understand this is a simulated form.' }
    ];
    form.addEventListener('submit', function (e) {
      e.preventDefault(); ok.hidden = true; var errs = [];
      rules.forEach(function (r) {
        var el = document.getElementById(r.id), er = document.getElementById(r.id + '-error'), good = r.test(el.value, el);
        if (good) { el.classList.remove('invalid'); el.removeAttribute('aria-invalid'); er.textContent = ''; }
        else { el.classList.add('invalid'); el.setAttribute('aria-invalid', 'true'); er.textContent = r.msg; errs.push(r); }
      });
      if (errs.length) {
        summary.hidden = false;
        summary.innerHTML = '<h2 id="ap-summary-title">There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with your request</h2><ul>' + errs.map(function (r) { return '<li><a href="#' + r.id + '">' + esc(r.msg) + '</a></li>'; }).join('') + '</ul>';
        summary.focus();
        $$('a', summary).forEach(function (a) { a.addEventListener('click', function (ev) { ev.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus(); }); });
        return;
      }
      summary.hidden = true; summary.innerHTML = '';
      ok.hidden = false; ok.focus();
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav(); initPortal(); initAccordions(); initCarousel(); initFindCare(); initLocations(); initEvents(); initInsurance(); initServices(); initAppointment();
  });
})();
