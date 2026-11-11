/* City of Port Alder (fictional) - GOV-01 replica. Vanilla JS, no network. All data below is invented sample data. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var fmtDate = function (iso, opts) { return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', Object.assign({ timeZone: 'UTC' }, opts || { month: 'short', day: 'numeric', year: 'numeric' })); };

  /* ---------- sample data ---------- */
  var SERVICES = [
    { id: 'parking-permit', title: 'Get a resident parking permit', dept: 'Parking Clerk', type: 'Apply', desc: 'Permit for on-street parking in your neighborhood permit zone.', steps: 'Bring proof of residency and vehicle registration. Permits renew every year.', href: 'service-parking-permit.html' },
    { id: 'report-pothole', title: 'Report a pothole or street problem', dept: 'Port Alder 311', type: 'Report', desc: 'Tell the city about potholes, broken streetlights, graffiti and missed pickups.', steps: 'Describe the problem and where it is. You get a demo confirmation number.', href: 'report-problem.html' },
    { id: 'pay-parking-ticket', title: 'Pay a parking ticket', dept: 'Parking Clerk', type: 'Pay', desc: 'Pay or contest a parking violation notice.', steps: 'Have your ticket number and plate number ready. Contest requests are due within 21 days (sample rule).' },
    { id: 'pay-property-tax', title: 'Pay a property tax bill', dept: 'Treasury', type: 'Pay', desc: 'Pay quarterly property tax and check your balance.', steps: 'You need the parcel number from your bill. Payments by e-check carry no fee (sample rule).' },
    { id: 'birth-certificate', title: 'Order a birth certificate', dept: 'City Clerk', type: 'Request', desc: 'Certified copies of birth records for events in Port Alder.', steps: 'Photo ID is required. Certified copies are available at the Clerk counter or by mail.' },
    { id: 'marriage-license', title: 'Apply for a marriage license', dept: 'City Clerk', type: 'Apply', desc: 'Both people apply in person at the City Clerk office.', steps: 'Bring photo ID. There is a short waiting period before the ceremony (sample rule).' },
    { id: 'dog-license', title: 'License your dog', dept: 'City Clerk', type: 'Apply', desc: 'Annual license for dogs older than six months.', steps: 'Provide a rabies vaccination certificate. Licenses expire December 31.' },
    { id: 'building-permit', title: 'Apply for a building permit', dept: 'Inspectional Services', type: 'Apply', desc: 'Permits for construction, renovation and demolition.', steps: 'Submit plans and a contractor license number. Review takes about ten business days (sample figure).' },
    { id: 'food-permit', title: 'Get a food establishment permit', dept: 'Public Health', type: 'Apply', desc: 'Permit for restaurants, food trucks and caterers.', steps: 'Schedule a plan review and a pre-opening inspection.' },
    { id: 'street-event', title: 'Request a street closure for an event', dept: 'Public Works', type: 'Request', desc: 'Block parties and festivals that need a street closed.', steps: 'Apply at least 30 days ahead with a map and a neighbor notice.' },
    { id: 'bulk-pickup', title: 'Schedule a bulk item pickup', dept: 'Public Works', type: 'Request', desc: 'Pickup for furniture and large household items.', steps: 'Two free pickups per household each year. Items go at the curb the night before.' },
    { id: 'recycling-cart', title: 'Request a recycling or trash cart', dept: 'Public Works', type: 'Request', desc: 'New, replacement or repaired carts.', steps: 'Give your address and the cart size you need.' },
    { id: 'library-card', title: 'Get a library card', dept: 'Public Library', type: 'Apply', desc: 'Free card for residents and students.', steps: 'Bring ID showing a Port Alder address, or sign up online and finish at a branch.' },
    { id: 'register-vote', title: 'Register to vote', dept: 'Elections Division', type: 'Apply', desc: 'Register or update your address for city elections.', steps: 'Registration closes ten days before an election (sample rule).' },
    { id: 'pool-pass', title: 'Buy a swimming pool pass', dept: 'Parks and Recreation', type: 'Pay', desc: 'Season and day passes for city pools.', steps: 'Residents get a discount with a proof-of-address document.' },
    { id: 'records-request', title: 'Make a public records request', dept: 'City Clerk', type: 'Request', desc: 'Ask for city documents that are open to the public.', steps: 'Describe the records as specifically as you can. The city replies within a set number of days.' }
  ];
  var DEPARTMENTS = [
    { name: 'Assessing Department', desc: 'Property values and exemptions.', phone: '555-0110' },
    { name: 'Boards and Commissions Office', desc: 'Volunteer boards, appointments and public meetings.', phone: '555-0111' },
    { name: 'City Clerk', desc: 'Vital records, licenses and the city archive.', phone: '555-0112', href: 'city-clerk.html' },
    { name: 'City Council', desc: 'The legislative branch of Port Alder.', phone: '555-0113', href: 'city-council.html' },
    { name: 'Elections Division', desc: 'Voter registration, polling places and election results.', phone: '555-0114' },
    { name: 'Fire Department', desc: 'Fire prevention, rescue and emergency response.', phone: '555-0115' },
    { name: 'Inspectional Services', desc: 'Building, housing and zoning code enforcement.', phone: '555-0116' },
    { name: 'Mayor\'s Office', desc: 'Executive leadership and constituent services.', phone: '555-0117', href: 'contact.html' },
    { name: 'Parking Clerk', desc: 'Parking tickets, permits and appeals.', phone: '555-0118', href: 'service-parking-permit.html' },
    { name: 'Parks and Recreation', desc: 'Parks, playgrounds, pools and recreation programs.', phone: '555-0119' },
    { name: 'Planning Office', desc: 'Neighborhood planning, zoning and development review.', phone: '555-0120' },
    { name: 'Police Department', desc: 'Public safety and community policing.', phone: '555-0121' },
    { name: 'Port Alder 311', desc: 'Report problems and ask for city services, any hour.', phone: '311 (demo: 555-0100)', href: 'department-311.html' },
    { name: 'Public Health', desc: 'Health inspections, clinics and prevention programs.', phone: '555-0122' },
    { name: 'Public Library', desc: 'Branch libraries, digital collections and classes.', phone: '555-0123' },
    { name: 'Public Works', desc: 'Streets, trash, recycling, snow removal and water.', phone: '555-0124' },
    { name: 'Treasury', desc: 'Tax collection, payments and city finances.', phone: '555-0125' }
  ];
  var EVENTS = [
    { date: '2026-11-12', time: '6:00 PM', title: 'Harbor Ward neighborhood meeting', place: 'Harbor Ward Community Center', area: 'Harbor Ward', type: 'Meeting', desc: 'Hear updates on the pier repair schedule and ask questions.' },
    { date: '2026-11-14', time: '10:00 AM', title: 'Shred-a-thon and e-waste drop-off', place: 'Public Works Yard', area: 'Eastgate', type: 'Community', desc: 'Bring paper documents and old electronics for safe disposal.' },
    { date: '2026-11-17', time: '7:00 PM', title: 'City Council regular meeting', place: 'City Hall, Council Chamber', area: 'Downtown', type: 'Meeting', desc: 'Agenda includes the street lighting contract and a zoning amendment.' },
    { date: '2026-11-18', time: '5:30 PM', title: 'Free tax-help workshop for renters', place: 'Millbrook Branch Library', area: 'Millbrook', type: 'Workshop', desc: 'Volunteers explain renter credits and common forms.' },
    { date: '2026-11-21', time: '9:00 AM', title: 'Fall park cleanup day', place: 'Alder Point Park', area: 'Alder Point', type: 'Community', desc: 'Gloves and bags provided. Families welcome.' },
    { date: '2026-11-24', time: '6:30 PM', title: 'Public hearing: Eastgate bus lane proposal', place: 'Eastgate Library Hall', area: 'Eastgate', type: 'Hearing', desc: 'Share your views on the proposed dedicated bus lane.' },
    { date: '2026-12-02', time: '12:00 PM', title: 'Small business permit office hours', place: 'City Hall, Room 104', area: 'Downtown', type: 'Workshop', desc: 'Staff from three departments answer permit questions in one place.' },
    { date: '2026-12-05', time: '4:00 PM', title: 'Holiday lighting ceremony', place: 'Harbor Square', area: 'Harbor Ward', type: 'Community', desc: 'Music, cocoa and the switch-on of the harbor lights.' },
    { date: '2026-12-08', time: '6:00 PM', title: 'Planning Board meeting', place: 'City Hall, Room 210', area: 'Downtown', type: 'Meeting', desc: 'Review of two housing proposals.' },
    { date: '2026-12-10', time: '5:00 PM', title: 'Winter parking rules open house', place: 'Millbrook Branch Library', area: 'Millbrook', type: 'Workshop', desc: 'Learn about snow emergency routes and resident permit changes.' }
  ];
  var NEWS = [
    { date: '2026-11-09', cat: 'Public Works', title: 'Leaf collection starts on a rotating route schedule', desc: 'Crews will collect bagged and loose leaves from the curb. Find your route by street name.' },
    { date: '2026-11-06', cat: 'Housing', title: 'Mayor announces 120 new affordable apartments near the rail station', desc: 'The sample project adds ground-floor shops and a small public plaza.' },
    { date: '2026-11-04', cat: 'Public Safety', title: 'Fire Department reminds residents to test smoke alarms this month', desc: 'Free alarm checks are available on request through 311.' },
    { date: '2026-10-30', cat: 'Parks', title: 'Alder Point Park playground reopens after renovation', desc: 'The new play area includes accessible swings and a shaded seating area.' },
    { date: '2026-10-27', cat: 'Transportation', title: 'Eastgate bus lane proposal opens for public comment', desc: 'Comments are accepted by form, mail or at the November 24 hearing.' },
    { date: '2026-10-22', cat: 'Public Health', title: 'Flu clinics scheduled at three branch libraries', desc: 'Walk-ins are welcome. Clinic times are listed on the events page.' },
    { date: '2026-10-19', cat: 'Housing', title: 'Renter help line adds evening hours', desc: 'Call or visit to ask about leases, repairs and deposits.' },
    { date: '2026-10-15', cat: 'Parks', title: 'Winter pool schedule posted', desc: 'The indoor pool at the Millbrook center keeps weekday morning lap swim.' }
  ];
  var NOTICES = [
    { date: '2026-11-10', type: 'Public hearing', title: 'Hearing on proposed Eastgate dedicated bus lane', desc: 'Held November 24, 6:30 PM at Eastgate Library Hall. Written comments due November 23.' },
    { date: '2026-11-09', type: 'Bid', title: 'Request for bids: street lighting replacement, Phase 2', desc: 'Sealed bids due December 4 at the Treasury office. Specifications are available from Public Works.' },
    { date: '2026-11-06', type: 'Zoning', title: 'Zoning Board of Appeal: variance request for 48 Millbrook Road', desc: 'Hearing December 3. Abutters have been notified by mail (sample text).' },
    { date: '2026-11-05', type: 'Meeting', title: 'Notice of City Council committee on Housing', desc: 'Meets November 19 at 5:00 PM in Room 210. Agenda posted 48 hours ahead.' },
    { date: '2026-11-03', type: 'Bid', title: 'Request for proposals: library digital catalog hosting', desc: 'Proposals due December 11 to the Public Library director.' },
    { date: '2026-10-29', type: 'Zoning', title: 'Planning Board: site plan review for Harbor Square mixed-use building', desc: 'Public comment is taken at the December 8 meeting.' },
    { date: '2026-10-26', type: 'Public hearing', title: 'Hearing on parking permit fee schedule', desc: 'Held November 17 as part of the City Council regular meeting.' },
    { date: '2026-10-21', type: 'Meeting', title: 'Notice of Boards and Commissions open seats', desc: 'Applications are accepted for the Disability Access and Conservation boards.' }
  ];
  var NEIGHBORHOODS = [
    { name: 'Alder Point', desc: 'Waterfront peninsula with a large park and ferry landing.', note: 'Alder Point Park' },
    { name: 'Brightwater', desc: 'Quiet residential streets and a small commercial strip.', note: 'Brightwater Market' },
    { name: 'Downtown', desc: 'City Hall, the main library and most government offices.', note: 'City Hall Plaza' },
    { name: 'Eastgate', desc: 'Transit hub with a mix of apartments and light industry.', note: 'Eastgate Station' },
    { name: 'Fairhaven', desc: 'Older houses, tree-lined avenues and two elementary schools.', note: 'Fairhaven Green' },
    { name: 'Harbor Ward', desc: 'Working harbor, fish market and the holiday lighting square.', note: 'Harbor Square' },
    { name: 'Lantern Hill', desc: 'Hilltop neighborhood with views over the harbor.', note: 'Lantern Hill Lookout' },
    { name: 'Millbrook', desc: 'Former mill district with new housing and a community center.', note: 'Millbrook Community Center' },
    { name: 'North Quay', desc: 'Newly rebuilt riverfront with walking paths.', note: 'North Quay Promenade' },
    { name: 'Orchard Row', desc: 'Garden district known for community gardens.', note: 'Orchard Row Gardens' },
    { name: 'Southfield', desc: 'Family neighborhood with ball fields and a branch library.', note: 'Southfield Branch Library' },
    { name: 'West End', desc: 'Historic district with narrow streets and small shops.', note: 'West End Historic Walk' }
  ];

  /* ---------- list configs: data, searchable text, filter fields, row renderer ---------- */
  var LISTS = {
    services: { data: SERVICES, text: function (s) { return [s.title, s.dept, s.desc, s.type, s.steps].join(' '); }, fields: { type: function (s) { return s.type; }, dept: function (s) { return s.dept; } }, noun: 'service',
      row: function (s, i) {
        var id = 'svc-' + s.id;
        return '<li class="result-item" data-component="service-item"><h3>' + esc(s.title) + '</h3><p>' + esc(s.desc) + '</p><p class="meta"><span class="tag">' + esc(s.type) + '</span> ' + esc(s.dept) + '</p>' +
          '<p><button type="button" class="btn btn-small" data-toggle aria-expanded="false" aria-controls="' + id + '">What you need<span class="sr-only"> for ' + esc(s.title) + '</span></button>' +
          (s.href ? ' <a class="btn btn-small btn-secondary" href="' + s.href + '">Go to page<span class="sr-only">: ' + esc(s.title) + '</span></a>' : '') + '</p>' +
          '<div id="' + id + '" class="inline-detail" hidden><p>' + esc(s.steps) + '</p>' + (s.href ? '' : '<p class="meta">Demo: this replica has no separate page or online form for this service.</p>') + '</div></li>';
      } },
    departments: { data: DEPARTMENTS, text: function (d) { return d.name + ' ' + d.desc; }, fields: { letter: function (d) { return d.name.charAt(0).toUpperCase(); } }, noun: 'department',
      row: function (d) {
        return '<li class="result-item" data-component="department-item"><h3>' + (d.href ? '<a href="' + d.href + '">' + esc(d.name) + '</a>' : esc(d.name)) + '</h3><p>' + esc(d.desc) + '</p><p class="meta">Phone: ' + esc(d.phone) + (d.href ? '' : ' &middot; Demo: no separate department page in this replica') + '</p></li>';
      } },
    events: { data: EVENTS, text: function (e) { return [e.title, e.place, e.area, e.desc].join(' '); }, fields: { type: function (e) { return e.type; }, area: function (e) { return e.area; } }, noun: 'event',
      row: function (e) {
        return '<li class="result-item event-item" data-component="event-item"><time class="event-date" datetime="' + e.date + '"><span>' + fmtDate(e.date, { month: 'short' }) + '</span><strong>' + fmtDate(e.date, { day: 'numeric' }) + '</strong></time><div><h3>' + esc(e.title) + '</h3><p>' + fmtDate(e.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) + ', ' + esc(e.time) + '</p><p>' + esc(e.place) + ' (' + esc(e.area) + ')</p><p>' + esc(e.desc) + '</p><p class="meta"><span class="tag">' + esc(e.type) + '</span></p></div></li>';
      } },
    news: { data: NEWS, text: function (n) { return n.title + ' ' + n.desc + ' ' + n.cat; }, fields: { cat: function (n) { return n.cat; } }, noun: 'news item',
      row: function (n) {
        return '<li class="result-item" data-component="news-item"><p class="meta"><time datetime="' + n.date + '">' + fmtDate(n.date) + '</time> &middot; <span class="tag">' + esc(n.cat) + '</span></p><h3>' + esc(n.title) + '</h3><p>' + esc(n.desc) + '</p></li>';
      } },
    notices: { data: NOTICES, text: function (n) { return n.title + ' ' + n.desc + ' ' + n.type; }, fields: { type: function (n) { return n.type; } }, noun: 'notice',
      row: function (n) {
        return '<li class="result-item" data-component="notice-item"><p class="meta"><time datetime="' + n.date + '">Posted ' + fmtDate(n.date) + '</time> &middot; <span class="tag">' + esc(n.type) + '</span></p><h3>' + esc(n.title) + '</h3><p>' + esc(n.desc) + '</p></li>';
      } },
    neighborhoods: { data: NEIGHBORHOODS, text: function (n) { return n.name + ' ' + n.desc + ' ' + n.note; }, fields: {}, noun: 'neighborhood',
      row: function (n) {
        return '<li class="result-item" data-component="neighborhood-item"><h3>' + esc(n.name) + '</h3><p>' + esc(n.desc) + '</p><p class="meta">Landmark: ' + esc(n.note) + '</p></li>';
      } }
  };

  function initList(root) {
    var cfg = LISTS[root.getAttribute('data-list')];
    var q = $('[data-filter-q]', root), results = $('[data-results]', root), count = $('[data-count]', root), empty = $('[data-empty]', root);
    var selects = $$('select[data-filter]', root), letters = $('[data-letters]', root), letter = '';
    selects.forEach(function (sel) {
      var get = cfg.fields[sel.getAttribute('data-filter')];
      cfg.data.map(get).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort().forEach(function (v) { sel.insertAdjacentHTML('beforeend', '<option>' + esc(v) + '</option>'); });
      sel.addEventListener('change', render);
    });
    if (letters) {
      letters.innerHTML = ['All'].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).map(function (l) { return '<button type="button" class="letter-btn" aria-pressed="' + (l === 'All') + '" data-letter="' + (l === 'All' ? '' : l) + '">' + l + '</button>'; }).join('');
      letters.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        letter = b.getAttribute('data-letter');
        $$('button', letters).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        render();
      });
    }
    var initial = new URLSearchParams(location.search).get('q');
    if (initial && q) q.value = initial;
    if (q) q.addEventListener('input', render);
    $('form', root) && $('form', root).addEventListener('submit', function (e) { e.preventDefault(); render(); });
    $('[data-reset]', root).addEventListener('click', function () {
      if (q) q.value = ''; selects.forEach(function (s) { s.value = ''; }); letter = '';
      if (letters) $$('button', letters).forEach(function (x, i) { x.setAttribute('aria-pressed', String(i === 0)); });
      render(); if (q) q.focus();
    });
    function render() {
      var term = q ? q.value.trim().toLowerCase() : '';
      var rows = cfg.data.filter(function (item) {
        if (term && !term.split(/\s+/).every(function (w) { return cfg.text(item).toLowerCase().indexOf(w) > -1; })) return false;
        if (letter && cfg.fields.letter(item) !== letter) return false;
        return selects.every(function (sel) { return !sel.value || cfg.fields[sel.getAttribute('data-filter')](item) === sel.value; });
      });
      if (root.getAttribute('data-list') === 'events') rows.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      if (root.getAttribute('data-list') === 'news' || root.getAttribute('data-list') === 'notices') rows.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
      results.innerHTML = rows.map(cfg.row).join('');
      count.textContent = rows.length + ' ' + cfg.noun + (rows.length === 1 ? '' : 's') + ' shown of ' + cfg.data.length + '.';
      empty.hidden = rows.length > 0;
    }
    render();
  }
  $$('[data-list]').forEach(initList);

  /* ---------- home: today's date heading (client clock) ---------- */
  var today = $('[data-today]');
  if (today) today.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  /* ---------- disclosures: [data-toggle] buttons with aria-controls ---------- */
  function setOpen(btn, open) {
    var target = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(open));
    if (target) target.hidden = !open;
  }
  function closeMenus(except) {
    $$('[data-toggle][data-menu][aria-expanded="true"]').forEach(function (b) { if (b !== except) setOpen(b, false); });
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-toggle]');
    if (btn) {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      if (btn.hasAttribute('data-menu')) closeMenus(btn);
      setOpen(btn, open);
      if (open && btn.getAttribute('data-focus')) { var f = document.getElementById(btn.getAttribute('data-focus')); f && f.focus(); }
      return;
    }
    var navBtn = e.target.closest('[data-nav-toggle]');
    if (navBtn) {
      var navOpen = navBtn.getAttribute('aria-expanded') !== 'true';
      navBtn.setAttribute('aria-expanded', String(navOpen));
      document.getElementById(navBtn.getAttribute('aria-controls')).classList.toggle('is-open', navOpen);
      return;
    }
    if (!e.target.closest('[data-menu-scope]')) closeMenus();
    var dismiss = e.target.closest('[data-banner-dismiss]');
    if (dismiss) { var banner = dismiss.closest('[data-component="alert-banner"]'); banner.hidden = true; var h = $('.brand'); h && h.focus(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openBtn = $('[data-toggle][data-menu][aria-expanded="true"]');
    if (openBtn) {
      var panel = document.getElementById(openBtn.getAttribute('aria-controls'));
      var hadFocus = panel.contains(document.activeElement);
      $$('[data-toggle][data-menu][aria-expanded="true"]').forEach(function (b) { setOpen(b, false); });
      if (hadFocus) openBtn.focus();
      return;
    }
    var nav = $('#primary-nav.is-open'), nb = $('[data-nav-toggle]');
    if (nav && nb) { nav.classList.remove('is-open'); nb.setAttribute('aria-expanded', 'false'); nb.focus(); }
  });
  // close a dropdown when keyboard focus leaves its scope
  document.addEventListener('focusin', function (e) {
    if (!e.target.closest('[data-menu-scope]')) closeMenus();
  });

  /* ---------- header search: picks the page to search (demo of the "search type" control) ---------- */
  var sform = $('[data-header-search]');
  if (sform) sform.addEventListener('submit', function () { sform.action = $('select', sform).value; });

  /* ---------- dialogs (native <dialog>) ---------- */
  $$('[data-open-dialog]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = document.getElementById(b.getAttribute('data-open-dialog'));
      var title = b.getAttribute('data-dialog-title');
      if (title) { $('[data-dialog-title-target]', d).textContent = title; }
      d.showModal();
    });
  });
  $$('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    $$('[data-close-dialog]', d).forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
  });
  var langForm = $('[data-language-form]');
  if (langForm) langForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var sel = $('select', langForm);
    $('[data-language-status]').textContent = 'Demo only: "' + sel.options[sel.selectedIndex].text + '" was selected, but this replica has no translated pages. Nothing on the page changed.';
  });

  /* ---------- forms: validation, error summary, focus, demo success ---------- */
  var labelOf = function (f) { var l = $('label[for="' + f.id + '"]'); return l ? l.firstChild.textContent.replace(/\s+/g, ' ').trim() : f.name; };
  function fieldError(f) {
    var v = f.value.trim();
    if (f.required && !v) return f.tagName === 'SELECT' ? 'Choose ' + labelOf(f).toLowerCase() + '.' : 'Enter ' + labelOf(f).toLowerCase() + '.';
    if (v && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter an email address in the format name@example.org.';
    if (v && f.minLength > 0 && v.length < f.minLength) return labelOf(f) + ' must be at least ' + f.minLength + ' characters.';
    return '';
  }
  function showError(f, msg) {
    var id = f.id + '-error', el = document.getElementById(id);
    if (!msg) { if (el) el.remove(); f.removeAttribute('aria-invalid'); f.setAttribute('aria-describedby', (f.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== id; }).join(' ') || ''); if (!f.getAttribute('aria-describedby')) f.removeAttribute('aria-describedby'); return; }
    if (!el) { el = document.createElement('p'); el.id = id; el.className = 'field-error'; f.parentNode.insertBefore(el, f); }
    el.textContent = 'Error: ' + msg;
    f.setAttribute('aria-invalid', 'true');
    if ((f.getAttribute('aria-describedby') || '').indexOf(id) < 0) f.setAttribute('aria-describedby', ((f.getAttribute('aria-describedby') || '') + ' ' + id).trim());
  }
  $$('form[data-validate]').forEach(function (form) {
    var summary = $('.error-summary', form), success = $('.demo-success', form);
    var fields = $$('input, select, textarea', form).filter(function (f) { return f.type !== 'hidden' && f.type !== 'submit'; });
    fields.forEach(function (f) { f.addEventListener('input', function () { if (f.getAttribute('aria-invalid')) showError(f, fieldError(f)); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      success.hidden = true;
      var errs = [];
      fields.forEach(function (f) { var m = fieldError(f); showError(f, m); if (m) errs.push({ f: f, m: m }); });
      if (errs.length) {
        $('ul', summary).innerHTML = errs.map(function (x) { return '<li><a href="#' + x.f.id + '">' + esc(x.m) + '</a></li>'; }).join('');
        summary.hidden = false; summary.focus();
        return;
      }
      summary.hidden = true;
      var ref = 'DEMO-' + String(Math.floor(Math.random() * 90000) + 10000);
      var refEl = $('[data-demo-ref]', success); if (refEl) refEl.textContent = ref;
      form.reset(); success.hidden = false; success.focus();
    });
    summary.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus();
    });
  });
})();
