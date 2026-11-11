/* State of Aldermere portal (fictional replica). Vanilla JS, local data only, works from file://. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- sample data (all invented) ---------- */
  var CATEGORIES = [
    ['assistance', 'Assistance Programs and Benefits'], ['driving', 'Driving and Vehicles'], ['education', 'Education'],
    ['environment', 'Environment and Energy'], ['family', 'Family and Children'], ['health', 'Health'],
    ['housing', 'Housing and Property'], ['licenses', 'Licenses and Permits'], ['records', 'Personal Records'],
    ['safety', 'Public Safety and Emergencies'], ['taxes', 'Taxes'], ['veterans', 'Veterans'],
    ['business', 'Business Assistance'], ['jobs', 'Jobs and Career Support']
  ];
  // id, name, abbreviation, description, phone
  var AGENCIES = [
    ['arts', 'Arts Council', 'AC', 'Funds galleries, festivals and artists across Aldermere.', '555-0120'],
    ['elections', 'Board of Elections', 'BOE', 'Runs voter registration and state elections.', '555-0121'],
    ['business', 'Business Development Office', 'BDO', 'Helps new and growing businesses with registration and counseling.', '555-0188'],
    ['education', 'Education Department', 'ED', 'Oversees public schools and student financial aid.', '555-0122'],
    ['emergency', 'Emergency Management Division', 'EMD', 'Coordinates alerts, preparedness and disaster response.', '555-0123'],
    ['environment', 'Environment and Energy Department', 'EED', 'Protects natural resources and runs utility assistance programs.', '555-0124'],
    ['family', 'Family Support Agency', 'FSA', 'Administers food, heating and child care assistance.', '555-0125'],
    ['health', 'Health Department', 'HD', 'Public health, insurance enrollment and immunization records.', '555-0126'],
    ['housing', 'Housing Finance Agency', 'HFA', 'Homebuyer programs and property tax exemptions.', '555-0127'],
    ['labor', 'Labor Department', 'LD', 'Unemployment insurance, job listings and workplace safety.', '555-0128'],
    ['licensing', 'Licensing Bureau', 'LB', 'Issues and verifies professional and recreational licenses.', '555-0129'],
    ['motor', 'Motor Vehicles Bureau', 'MVB', 'Driver licenses, vehicle registration and traffic violations.', '555-0142'],
    ['veterans', 'Office of Veterans Services', 'OVS', 'Benefits counseling for veterans and their families.', '555-0130'],
    ['parks', 'Parks and Heritage Commission', 'PHC', 'State parks, trails and historic sites.', '555-0131'],
    ['revenue', 'Taxation and Revenue Department', 'TRD', 'Collects state taxes and processes refunds.', '555-0177'],
    ['vital', 'Vital Records Office', 'VRO', 'Birth, marriage and death certificates.', '555-0132']
  ];
  // id, title, category, agency id, summary, who, documents, how to submit, [static page]
  var SERVICES = [
    ['vehicle-registration', 'Renew a vehicle registration', 'driving', 'motor', 'Renew online and receive a new sticker by mail.', '', '', '', 'service-vehicle-registration.html'],
    ['food-assistance', 'Apply or recertify for food support', 'assistance', 'family', 'Help buying groceries for eligible households.', '', '', '', 'service-food-assistance.html'],
    ['drivers-license', 'Renew a driver license', 'driving', 'motor', 'Renew a standard driver license online or in person.', 'Licensed drivers whose license expires within a year.', 'Current license and proof of address.', 'Complete the online form and pay the fee.'],
    ['traffic-ticket', 'Pay a traffic violation', 'driving', 'motor', 'Pay or contest a traffic ticket.', 'Anyone who received a traffic ticket.', 'Ticket number and plate number.', 'Pay by card online or mail the stub with a check.'],
    ['heating', 'Apply for heating assistance', 'assistance', 'family', 'Seasonal help with home heating costs.', 'Households under the sample income limit.', 'Recent heating bill and proof of income.', 'Apply online between November and March.'],
    ['utility-discounts', 'Utility bill discount program', 'environment', 'environment', 'Lower electric and gas rates for eligible households.', 'Households that receive another benefit.', 'Account number and benefit letter.', 'Ask your utility to enroll you after approval.'],
    ['unemployment', 'File for unemployment insurance', 'jobs', 'labor', 'Weekly benefits while you look for work.', 'Workers who lost a job through no fault of their own.', 'Employer names, dates and your ID.', 'File an initial claim online, then certify each week.'],
    ['workers-rights', 'Report a workplace safety concern', 'jobs', 'labor', 'Report an unsafe workplace or a wage problem.', 'Any worker in Aldermere.', 'Employer name, address and a description.', 'Submit a confidential complaint to the Labor Department.'],
    ['job-search', 'Search state job listings', 'jobs', 'labor', 'Browse openings in state government and private employers.', 'Anyone seeking work.', 'A resume is optional.', 'Search by keyword and region.'],
    ['child-care', 'Find child care assistance', 'family', 'family', 'Help paying for licensed child care.', 'Working parents under the sample income limit.', 'Proof of work hours and income.', 'Apply through the Family Support Agency.'],
    ['health-insurance', 'Find health insurance', 'health', 'health', 'Compare plans and enroll during open enrollment.', 'Residents without employer coverage.', 'Household income estimate.', 'Compare plans and enroll online or by phone.'],
    ['vaccine-records', 'Request immunization records', 'health', 'health', 'Get a copy of your immunization history.', 'Patients or parents of minors.', 'Photo ID and date of birth.', 'Submit a request form; records arrive by mail.'],
    ['student-aid', 'Apply for student financial aid', 'education', 'education', 'State grants and scholarships for college.', 'Residents enrolled or planning to enroll.', 'Tax records and school choice.', 'Complete the state aid form by the deadline.'],
    ['property-tax', 'Apply for a property tax exemption', 'housing', 'housing', 'Reduce your property tax bill if you qualify.', 'Owners who are seniors, veterans or primary residents.', 'Deed and proof of eligibility.', 'File the exemption form with your county.'],
    ['homebuyer', 'First-time homebuyer program', 'housing', 'housing', 'Low-rate loans and down payment help.', 'First-time buyers under the sample price limit.', 'Income documents and a counseling certificate.', 'Complete a course, then apply through a lender.'],
    ['birth-certificate', 'Order a birth certificate', 'records', 'vital', 'Order a certified copy of a birth record.', 'The person named, a parent, or a legal guardian.', 'Photo ID and application form.', 'Order online or by mail.'],
    ['voter-registration', 'Register to vote', 'records', 'elections', 'Register or update your voter registration.', 'Citizens aged 18 or older (or turning 18 by election day).', 'Driver license or last four digits of your ID number.', 'Register online or by mailed form.'],
    ['fishing-license', 'Get a fishing license', 'licenses', 'licensing', 'Annual and short-term fishing licenses.', 'Anyone over 16 who fishes in state waters.', 'Photo ID.', 'Buy online and print the license.'],
    ['professional-license', 'Verify a professional license', 'licenses', 'licensing', 'Check that a professional holds a valid license.', 'Anyone hiring a licensed professional.', 'The professional’s name or license number.', 'Search the public lookup.'],
    ['file-taxes', 'File and pay personal income tax', 'taxes', 'revenue', 'File a return, pay a balance or set up a payment plan.', 'Residents with state income.', 'Income statements and last year’s return.', 'File electronically or by mail.'],
    ['sales-tax', 'Register for sales tax', 'taxes', 'revenue', 'Get a sales tax account for your business.', 'Businesses that sell taxable goods.', 'Business name and ID number.', 'Register online; certificate arrives by mail.'],
    ['business-register', 'Register a business name', 'business', 'business', 'Reserve and register a business name.', 'New businesses.', 'Owner details and a unique name.', 'Submit the online form and pay the fee.'],
    ['veterans-benefits', 'Find veterans benefits', 'veterans', 'veterans', 'Counseling on state and national veterans benefits.', 'Veterans and their families.', 'Discharge papers.', 'Book a counseling appointment.'],
    ['emergency-alerts', 'Sign up for emergency alerts', 'safety', 'emergency', 'Receive text and email alerts about local emergencies.', 'Anyone in Aldermere.', 'A phone number or email.', 'Sign-up is a demo in this replica.']
  ];
  // name, seat, region, population (sample)
  var COUNTIES = [
    ['Alder County', 'Alderton', 'North', 84200], ['Birchwood County', 'Birch Falls', 'North', 51300], ['Cedar Ridge County', 'Cedar City', 'Central', 142900],
    ['Dunmore County', 'Dunmore', 'Valley', 66800], ['Elmhurst County', 'Elmhurst', 'Central', 213400], ['Fairhaven County', 'Fairhaven', 'Coastal', 97100],
    ['Granite County', 'Stonebridge', 'North', 38600], ['Harlow County', 'Harlow', 'Valley', 72500], ['Ironwood County', 'Ironwood', 'Valley', 45900],
    ['Juniper County', 'Juniper Bay', 'Coastal', 120700], ['Kestrel County', 'Kestrel', 'Central', 58200], ['Larkspur County', 'Larkspur', 'Coastal', 79400]
  ];
  // id, title, date, type, place, summary, agenda
  var EVENTS = [
    ['ev1', 'Board of Elections public meeting', '2026-11-18', 'Public meeting', 'Hearing Room A, Capitol Annex (fictional)', 'Monthly open meeting of the Board of Elections.', ['Call to order', 'Approval of minutes', 'Early voting site plan', 'Public comment']],
    ['ev2', 'Winter heating assistance workshop', '2026-11-21', 'Workshop', 'Online (demo)', 'Learn how to apply for heating assistance.', []],
    ['ev3', 'Parks Commission budget hearing', '2026-12-02', 'Hearing', 'Heron Marsh Visitor Center (fictional)', 'Public hearing on the next-year parks budget.', ['Opening statement', 'Budget overview', 'Public testimony']],
    ['ev4', 'Small business counseling day', '2026-12-05', 'Workshop', 'Elmhurst Library (fictional)', 'Free sample counseling sessions for new businesses.', []],
    ['ev5', 'Larkspur Winter Lights', '2026-12-12', 'Community event', 'Larkspur Green (fictional)', 'Community lights festival with local food and music.', []],
    ['ev6', 'Health Department advisory meeting', '2026-12-16', 'Public meeting', 'Online (demo)', 'Quarterly advisory committee meeting.', ['Call to order', 'Immunization report', 'Open discussion']],
    ['ev7', 'Veterans benefits information session', '2027-01-09', 'Workshop', 'Dunmore Community Hall (fictional)', 'Meet counselors and ask about benefits.', []],
    ['ev8', 'Housing Finance Agency board meeting', '2027-01-20', 'Public meeting', 'Hearing Room B, Capitol Annex (fictional)', 'Regular board meeting.', ['Call to order', 'Homebuyer program update', 'Executive session', 'Adjournment']],
    ['ev9', 'Emergency preparedness town hall', '2027-02-04', 'Hearing', 'Juniper Bay High School (fictional)', 'Hear from the Emergency Management Division about storm planning.', ['Welcome', 'Storm plan overview', 'Questions']],
    ['ev10', 'Founders’ Day celebration', '2027-03-03', 'Community event', 'Capitol Lawn (fictional)', 'Annual celebration of the founding of Aldermere (fictional).', []]
  ];
  var PAGES = [
    ['Services & Benefits', 'services-and-benefits.html', 'Search and filter state services and benefits'],
    ['Renew a Vehicle Registration Online', 'service-vehicle-registration.html', 'Renew a vehicle registration online'],
    ['Apply or Recertify for Food Support', 'service-food-assistance.html', 'Apply for or recertify food support benefits'],
    ['State Agencies and Departments', 'agencies.html', 'Directory of state agencies and departments'],
    ['Counties', 'counties.html', 'List of the counties of Aldermere'],
    ['Taxes', 'taxes.html', 'File, pay and learn about state taxes'],
    ['Start a Business', 'start-business.html', 'Step-by-step guide to starting a business'],
    ['Events', 'events.html', 'Public meetings, hearings and community events'],
    ['State Government', 'government.html', 'How the state is organized, holidays and emergency contacts'],
    ['Visit & Explore', 'visit-and-explore.html', 'Parks, historic sites, arts and the autumn color report'],
    ['Elections and Voting', 'elections-and-voting.html', 'Key election dates and finding your county board of elections'],
    ['Accessibility', 'accessibility.html', 'Accessibility statement, disclaimer, privacy and problem report']
  ];

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var params = new URLSearchParams(location.search);
  var catLabel = function (id) { var c = CATEGORIES.filter(function (x) { return x[0] === id; })[0]; return c ? c[1] : id; };
  var agency = function (id) { return AGENCIES.filter(function (a) { return a[0] === id; })[0]; };
  var norm = function (s) { return String(s).toLowerCase(); };
  var matches = function (hay, q) { hay = norm(hay); return norm(q).split(/\s+/).filter(Boolean).every(function (t) { return hay.indexOf(t) !== -1; }); };
  var plural = function (n, one, many) { return n + ' ' + (n === 1 ? one : many); };
  function serviceUrl(s) { return s[8] || 'service.html?id=' + s[0]; }
  function fillSelect(sel, pairs) { pairs.forEach(function (p) { var o = document.createElement('option'); o.value = p[0]; o.textContent = p[1]; sel.appendChild(o); }); }
  // keeps the URL in sync so filtered views can be shared; ignored where history is unavailable
  function syncUrl(obj) { var p = new URLSearchParams(); Object.keys(obj).forEach(function (k) { if (obj[k]) p.set(k, obj[k]); }); try { history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : '')); } catch (e) { /* file:// in some browsers */ } }

  /* ---------- disclosures: banner, language, mobile menu, mega menu ---------- */
  function setExpanded(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    if (btn.classList.contains('menu-toggle')) panel.classList.toggle('is-open', open); else panel.hidden = !open;
  }
  var allToggles = $$('button[aria-controls][aria-expanded]');
  function closeAll(except, returnFocus) {
    allToggles.forEach(function (b) {
      if (b === except || b.getAttribute('aria-expanded') !== 'true') return;
      if (b.classList.contains('link-button') || (except && b.classList.contains('menu-toggle'))) return; // banner detail stays until toggled; mobile menu stays while a submenu opens
      setExpanded(b, false);
      if (returnFocus) b.focus();
    });
  }
  allToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      if (btn.classList.contains('menu-trigger') || btn.closest('.lang')) closeAll(btn, false);
      setExpanded(btn, open);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openBtn = allToggles.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; }).pop();
    if (openBtn) { setExpanded(openBtn, false); openBtn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-wrap') && !e.target.closest('.lang')) closeAll(null, false);
  });

  /* language selector: labeled demo only */
  $$('.lang-option').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.lang-option').forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      $('.lang-status').textContent = b.dataset.lang === 'en' ? 'English selected.' : 'Demo: ' + b.textContent + ' is not available. This replica stays in English.';
    });
  });

  /* header search: clear button */
  var searchInput = $('#site-search-input'), clearBtn = $('.search-clear');
  if (searchInput && clearBtn) {
    var toggleClear = function () { clearBtn.hidden = !searchInput.value; };
    searchInput.addEventListener('input', toggleClear);
    clearBtn.addEventListener('click', function () { searchInput.value = ''; toggleClear(); searchInput.focus(); });
    if (params.get('q') && document.body.dataset.page === 'search') searchInput.value = params.get('q');
    toggleClear();
  }

  /* alert banner dismiss */
  var dismiss = $('.alert-dismiss');
  if (dismiss) dismiss.addEventListener('click', function () { var b = $('.alert-banner'); b.hidden = true; var h = $('#main-content h1'); if (h) { h.tabIndex = -1; h.focus(); } });

  /* demo dialog */
  var dialog = $('#demo-dialog');
  $$('[data-demo]').forEach(function (b) {
    b.addEventListener('click', function () {
      $('#demo-dialog-title').textContent = b.dataset.demoTitle;
      $('#demo-dialog-text').textContent = b.dataset.demoText;
      dialog.showModal();
    });
  });
  dialog.addEventListener('click', function (e) { if (e.target === dialog || e.target.hasAttribute('data-dialog-close')) dialog.close(); });

  /* tabs (food support page) */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (n === undefined) return;
        e.preventDefault(); select(tabs[(n + tabs.length) % tabs.length], true);
      });
    });
  });

  /* ---------- form validation with error summary ---------- */
  function fieldMessage(f) {
    var label = f.dataset.label || 'This field', v = f.value.trim();
    if (f.required && !v) return label + ' is required.';
    if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter ' + label.toLowerCase() + ' in the format name@example.org.';
    if (f.minLength > 0 && v.length < f.minLength) return label + ' must be at least ' + f.minLength + ' characters.';
    return '';
  }
  function validatedForm(form, onValid) {
    var summary = $('.error-summary', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = [];
      $$('[data-validate]', form).forEach(function (f) {
        var msg = fieldMessage(f), out = document.getElementById(f.id + '-error');
        out.hidden = !msg; out.textContent = msg;
        f.setAttribute('aria-invalid', msg ? 'true' : 'false');
        var ids = (f.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== out.id; });
        if (msg) { ids.push(out.id); errors.push([f, msg]); }
        if (ids.length) f.setAttribute('aria-describedby', ids.join(' ')); else f.removeAttribute('aria-describedby');
      });
      if (errors.length) {
        summary.innerHTML = '<h2>' + (errors.length === 1 ? 'There is 1 problem' : 'There are ' + errors.length + ' problems') + ' with your submission</h2><ul>' +
          errors.map(function (x) { return '<li><a href="#' + x[0].id + '">' + esc(x[1]) + '</a></li>'; }).join('') + '</ul>';
        summary.hidden = false; summary.focus();
      } else { summary.hidden = true; onValid(); }
    });
    summary.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus();
    });
  }

  /* ---------- page renderers ---------- */
  var page = document.body.dataset.page;

  function renderServices() {
    var q = $('#svc-q'), cat = $('#svc-cat'), list = $('#svc-results'), status = $('#svc-status'), empty = $('#svc-empty');
    fillSelect(cat, CATEGORIES);
    q.value = params.get('q') || ''; cat.value = params.get('category') || '';
    if (cat.value !== (params.get('category') || '')) cat.value = '';
    function run() {
      var rows = SERVICES.filter(function (s) {
        var a = agency(s[3]);
        return (!cat.value || s[2] === cat.value) && matches([s[1], s[4], catLabel(s[2]), a[1], a[2]].join(' '), q.value);
      });
      list.innerHTML = rows.map(function (s) {
        return '<li class="result" data-component="service-card"><h3><a href="' + serviceUrl(s) + '">' + esc(s[1]) + '</a></h3><p>' + esc(s[4]) + '</p><p class="meta">Topic: ' + esc(catLabel(s[2])) + ' &middot; Agency: ' + esc(agency(s[3])[1]) + '</p></li>';
      }).join('');
      empty.hidden = rows.length > 0;
      status.textContent = plural(rows.length, 'service', 'services') + ' shown' + (cat.value ? ' in ' + catLabel(cat.value) : '') + '.';
      syncUrl({ q: q.value, category: cat.value });
    }
    q.addEventListener('input', run); cat.addEventListener('change', run);
    $('#service-filter').addEventListener('submit', function (e) { e.preventDefault(); run(); });
    $('#svc-reset').addEventListener('click', function () { q.value = ''; cat.value = ''; run(); q.focus(); });
    run();
  }

  function renderServiceDetail() {
    var s = SERVICES.filter(function (x) { return x[0] === params.get('id'); })[0];
    if (!s) { $('#svc-detail-missing').hidden = false; return; }
    if (s[8]) { location.replace(s[8]); return; }
    var a = agency(s[3]);
    document.title = s[1] + ' | State of Aldermere';
    $('h1').textContent = s[1];
    $('#svc-detail-lead').textContent = s[4] + ' (Sample entry; details are invented.)';
    $('#sd-summary').textContent = s[4];
    $('#sd-who-text').textContent = s[5];
    $('#sd-steps').innerHTML = ['Check eligibility: ' + s[5], 'Gather what you need: ' + s[6], 'Submit: ' + s[7]].map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
    $('#sd-agency').textContent = a[1];
    $('#sd-phone').textContent = 'Phone: ' + a[4] + ' (fictional)';
    $('#sd-more').href = 'services-and-benefits.html?category=' + s[2];
    $('#sd-more').textContent = 'More services: ' + catLabel(s[2]);
    $('#svc-detail').hidden = false;
  }

  function renderAgencies() {
    var q = $('#ag-q'), list = $('#ag-results'), status = $('#ag-status'), empty = $('#ag-empty'), bar = $('#ag-letters'), letter = '';
    var letters = AGENCIES.map(function (a) { return a[1][0]; }).filter(function (l, i, arr) { return arr.indexOf(l) === i; }).sort();
    bar.innerHTML = ['All'].concat(letters).map(function (l) { return '<button type="button" class="letter" data-letter="' + (l === 'All' ? '' : l) + '" aria-pressed="' + (l === 'All') + '">' + l + '</button>'; }).join('');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      letter = b.dataset.letter;
      $$('.letter', bar).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      run();
    });
    function run() {
      var rows = AGENCIES.filter(function (a) { return (!letter || a[1][0] === letter) && matches(a.slice(1, 4).join(' '), q.value); });
      list.innerHTML = rows.map(function (a) {
        return '<li class="result" data-component="agency-card"><h3>' + esc(a[1]) + ' (' + esc(a[2]) + ')</h3><p>' + esc(a[3]) + '</p><p class="meta">Phone: ' + a[4] + ' (fictional)</p><p><a href="services-and-benefits.html?q=' + encodeURIComponent(a[2]) + '">Services from the ' + esc(a[2]) + '<span class="sr-only"> (' + esc(a[1]) + ')</span></a></p></li>';
      }).join('');
      empty.hidden = rows.length > 0;
      status.textContent = plural(rows.length, 'agency', 'agencies') + ' shown' + (letter ? ' starting with ' + letter : '') + '.';
    }
    q.value = params.get('q') || '';
    q.addEventListener('input', run);
    $('#agency-filter').addEventListener('submit', function (e) { e.preventDefault(); run(); });
    run();
  }

  function renderCounties() {
    var q = $('#co-q'), rows = $('#co-rows'), status = $('#co-status'), empty = $('#co-empty');
    function run() {
      var r = COUNTIES.filter(function (c) { return matches(c.slice(0, 3).join(' '), q.value); });
      rows.innerHTML = r.map(function (c) { return '<tr><th scope="row">' + esc(c[0]) + '</th><td>' + esc(c[1]) + '</td><td>' + c[2] + '</td><td>' + c[3].toLocaleString('en-US') + '</td></tr>'; }).join('');
      empty.hidden = r.length > 0;
      status.textContent = plural(r.length, 'county', 'counties') + ' shown.';
    }
    q.addEventListener('input', run);
    $('#county-filter').addEventListener('submit', function (e) { e.preventDefault(); });
    run();
  }

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function fmtDate(iso) { var p = iso.split('-'); return MONTHS[+p[1] - 1] + ' ' + +p[2] + ', ' + p[0]; }
  function renderEvents() {
    var q = $('#ev-q'), type = $('#ev-type'), month = $('#ev-month'), list = $('#ev-results'), status = $('#ev-status'), empty = $('#ev-empty');
    var types = EVENTS.map(function (e) { return e[3]; }).filter(function (t, i, a) { return a.indexOf(t) === i; });
    fillSelect(type, types.map(function (t) { return [t, t]; }));
    fillSelect(month, EVENTS.map(function (e) { return e[2].slice(0, 7); }).filter(function (m, i, a) { return a.indexOf(m) === i; }).map(function (m) { return [m, MONTHS[+m.slice(5) - 1] + ' ' + m.slice(0, 4)]; }));
    function run() {
      var rows = EVENTS.filter(function (e) { return (!type.value || e[3] === type.value) && (!month.value || e[2].indexOf(month.value) === 0) && matches([e[1], e[4], e[5]].join(' '), q.value); });
      list.innerHTML = rows.map(function (e) {
        return '<li class="result" data-component="event-card"><h3>' + esc(e[1]) + '</h3><p class="meta"><time datetime="' + e[2] + '">' + fmtDate(e[2]) + '</time> &middot; ' + esc(e[3]) + ' &middot; ' + esc(e[4]) + '</p><p>' + esc(e[5]) + '</p>' +
          (e[6].length ? '<details><summary>Agenda</summary><ol>' + e[6].map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ol></details>' : '') + '</li>';
      }).join('');
      empty.hidden = rows.length > 0;
      status.textContent = plural(rows.length, 'event', 'events') + ' shown. Dates are sample data.';
    }
    q.addEventListener('input', run); type.addEventListener('change', run); month.addEventListener('change', run);
    $('#event-filter').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#ev-reset').addEventListener('click', function () { q.value = ''; type.value = ''; month.value = ''; run(); q.focus(); });
    run();
  }

  function renderElections() {
    var sel = $('#boe-county'), out = $('#boe-result');
    fillSelect(sel, COUNTIES.map(function (c) { return [c[0], c[0]]; }));
    validatedForm($('#boe-form'), function () {
      var c = COUNTIES.filter(function (x) { return x[0] === sel.value; })[0];
      out.innerHTML = '<p><strong>' + esc(c[0]) + ' Board of Elections</strong></p><p>Office: ' + esc(c[1]) + ' Municipal Building (fictional)</p><p>Phone: 555-01' + (40 + COUNTIES.indexOf(c)) + ' (fictional)</p>';
      out.focus();
    });
  }

  function renderAccessibility() {
    var ok = $('#report-success');
    validatedForm($('#report-form'), function () {
      ok.hidden = false;
      ok.innerHTML = '<p><strong>Demo only: nothing was sent.</strong></p><p>In a real portal this would confirm your report. Your entries stay in this browser tab.</p>';
      ok.focus();
    });
  }

  function renderSearch() {
    var q = (params.get('q') || '').trim(), groups = $('#search-groups'), status = $('#search-status'), empty = $('#search-empty');
    $('#search-lead').textContent = q ? 'Results for “' + q + '” from the local sample data.' : 'Type a word in the search box at the top of the page.';
    if (!q) { status.textContent = 'No search term entered.'; return; }
    var sets = [
      ['Services', SERVICES.filter(function (s) { return matches([s[1], s[4], catLabel(s[2]), agency(s[3])[1]].join(' '), q); }).map(function (s) { return [s[1], serviceUrl(s), s[4]]; })],
      ['Agencies', AGENCIES.filter(function (a) { return matches(a.slice(1, 4).join(' '), q); }).map(function (a) { return [a[1], 'agencies.html?q=' + encodeURIComponent(a[2]), a[3]]; })],
      ['Events', EVENTS.filter(function (e) { return matches([e[1], e[4], e[5]].join(' '), q); }).map(function (e) { return [e[1], 'events.html', fmtDate(e[2]) + '. ' + e[5]]; })],
      ['Pages', PAGES.filter(function (p) { return matches(p[0] + ' ' + p[2], q); }).map(function (p) { return [p[0], p[1], p[2]]; })]
    ].filter(function (g) { return g[1].length; });
    var total = sets.reduce(function (n, g) { return n + g[1].length; }, 0);
    groups.innerHTML = sets.map(function (g) {
      return '<section aria-label="' + g[0] + ' results"><h2>' + g[0] + ' (' + g[1].length + ')</h2><ul class="result-list">' + g[1].map(function (r) { return '<li class="result"><h3><a href="' + r[1] + '">' + esc(r[0]) + '</a></h3><p>' + esc(r[2]) + '</p></li>'; }).join('') + '</ul></section>';
    }).join('');
    empty.hidden = total > 0;
    status.textContent = plural(total, 'result', 'results') + ' found.';
  }

  var routes = { services: renderServices, service: renderServiceDetail, agencies: renderAgencies, counties: renderCounties, events: renderEvents, elections: renderElections, accessibility: renderAccessibility, search: renderSearch };
  if (routes[page]) routes[page]();
})();
