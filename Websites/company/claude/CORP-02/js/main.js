/* Harborlight Community Credit Union (fictional) - vanilla JS, inline data, works from file:// */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- DATA (all fictional sample data) ---------- */
  var SITE_INDEX = [
    { t: 'Home', u: 'index.html', k: 'home credit union member owned welcome' },
    { t: 'Free Checking', u: 'checking.html', k: 'checking account debit card overdraft fees everyday' },
    { t: 'Savings and dividend calculator', u: 'savings.html', k: 'savings dividend calculator youth money market apy' },
    { t: 'Certificates', u: 'certificates.html', k: 'certificate term deposit cd fixed rate' },
    { t: 'Auto Loans', u: 'auto-loans.html', k: 'auto vehicle car loan payment calculator refinance' },
    { t: 'Home Mortgages', u: 'mortgages.html', k: 'mortgage home loan fixed adjustable house' },
    { t: 'Credit Cards', u: 'credit-cards.html', k: 'credit card rewards starter apr balance' },
    { t: 'Rates (sample data)', u: 'rates.html', k: 'rates apy apr savings certificate auto mortgage card table' },
    { t: 'Support Center and FAQ', u: 'support.html', k: 'help faq support questions password forms direct deposit wire' },
    { t: 'Branches and ATMs', u: 'branches.html', k: 'branch atm locator hours near location shared network' },
    { t: 'Become a member', u: 'membership.html', k: 'join eligibility membership apply member' },
    { t: 'Financial Education Center', u: 'education.html', k: 'learn budgeting credit education articles' },
    { t: 'Contact', u: 'contact.html', k: 'contact phone message appointment email' },
    { t: 'Accessibility statement', u: 'accessibility.html', k: 'accessibility statement keyboard screen reader' }
  ];

  var BRANCHES = [
    { n: 'Harbor Square Branch', ty: 'Branch', c: 'Port Calder', a: '100 Anchor Row', p: '(555) 010-0101', h: 'Mon-Fri 9-5, Sat 9-1', sat: true, drive: true },
    { n: 'Port Calder ATM at Lantern Market', ty: 'ATM', c: 'Port Calder', a: '14 Market Lane', p: '', h: 'Open 24 hours', sat: true, drive: false },
    { n: 'Marrow Bay Branch', ty: 'Branch', c: 'Marrow Bay', a: '22 Tidewater Road', p: '(555) 010-0102', h: 'Mon-Fri 9-5, Sat 9-1', sat: true, drive: true },
    { n: 'Marrow Bay ATM at Ferry Terminal', ty: 'ATM', c: 'Marrow Bay', a: '1 Ferry Slip', p: '', h: 'Open 24 hours', sat: true, drive: false },
    { n: 'Eastfield Branch', ty: 'Branch', c: 'Eastfield', a: '305 Orchard Street', p: '(555) 010-0103', h: 'Mon-Fri 9-5', sat: false, drive: true },
    { n: 'Eastfield ATM at Mill Commons', ty: 'ATM', c: 'Eastfield', a: '9 Mill Commons', p: '', h: 'Open 24 hours', sat: true, drive: true },
    { n: 'Pinegate Branch', ty: 'Branch', c: 'Pinegate', a: '48 Cedar Avenue', p: '(555) 010-0104', h: 'Mon-Fri 9-6, Sat 9-2', sat: true, drive: false },
    { n: 'Pinegate ATM at Library Plaza', ty: 'ATM', c: 'Pinegate', a: '2 Library Plaza', p: '', h: 'Daily 6am-10pm', sat: true, drive: false },
    { n: 'Lantern Falls Branch', ty: 'Branch', c: 'Lantern Falls', a: '77 Cascade Drive', p: '(555) 010-0105', h: 'Mon-Fri 9-5, Sat 9-1', sat: true, drive: true },
    { n: 'Lantern Falls ATM at Trailhead Plaza', ty: 'ATM', c: 'Lantern Falls', a: '5 Trailhead Plaza', p: '', h: 'Open 24 hours', sat: true, drive: true },
    { n: 'Whitsea Branch', ty: 'Branch', c: 'Whitsea', a: '210 Gull Point Road', p: '(555) 010-0106', h: 'Mon-Fri 10-4', sat: false, drive: false },
    { n: 'Whitsea ATM at Harbor Cooperative Dock', ty: 'ATM', c: 'Whitsea', a: '12 Dockside Way', p: '', h: 'Daily 5am-11pm', sat: true, drive: false },
    { n: 'Brightwater Branch', ty: 'Branch', c: 'Brightwater', a: '640 North Ridge Road', p: '(555) 010-0107', h: 'Mon-Fri 9-5, Sat 9-1', sat: true, drive: true },
    { n: 'Brightwater ATM at Campus Green', ty: 'ATM', c: 'Brightwater', a: '3 Campus Green', p: '', h: 'Open 24 hours', sat: true, drive: false },
    { n: 'Stonebridge Shared ATM (LinkLoop network, fictional)', ty: 'Shared ATM', c: 'Stonebridge', a: '88 Quarry Street', p: '', h: 'Open 24 hours', sat: true, drive: false },
    { n: 'Kestrel Hill Shared ATM (LinkLoop network, fictional)', ty: 'Shared ATM', c: 'Kestrel Hill', a: '19 Summit Court', p: '', h: 'Daily 6am-midnight', sat: true, drive: false },
    { n: 'Ashmoor Shared ATM (LinkLoop network, fictional)', ty: 'Shared ATM', c: 'Ashmoor', a: '400 Depot Road', p: '', h: 'Open 24 hours', sat: true, drive: true },
    { n: 'Dunmere Branch', ty: 'Branch', c: 'Dunmere', a: '31 Heron Way', p: '(555) 010-0108', h: 'Tue-Sat 9-4', sat: true, drive: false }
  ];

  var FAQS = [
    { c: 'Membership', q: 'Who can become a member?', a: 'In this fictional model, membership is open to people who live, work, worship or attend school in Tidewater County, to family of current members, and to people who join the sample Tidewater Neighbors Association. It is a member-owned cooperative, so members share ownership rather than being customers of a retail bank.' },
    { c: 'Membership', q: 'What is a membership share?', a: 'A membership share is a small sample balance kept in a base savings account to show ownership in the cooperative. The amount on this site is illustrative only.' },
    { c: 'Membership', q: 'Can I join from outside the county?', a: 'Online membership is described here as nationally available through the association route or a family connection. This is a simulation of the eligibility idea, not a real policy.' },
    { c: 'Accounts', q: 'How do I set up direct deposit?', a: 'Sample answer: ask your employer for its direct deposit form and enter the placeholder account details shown in your own online account. No real account or routing numbers appear on this site.' },
    { c: 'Accounts', q: 'How can I order checks?', a: 'Sample answer: use the check ordering option in a signed-in session or visit a branch. Online banking on this site is a non-functional demo.' },
    { c: 'Accounts', q: 'What does a dividend mean?', a: 'Credit unions often describe earnings on savings as dividends. The figures on this site are fictional sample data and are not an offer.' },
    { c: 'Online banking', q: 'I forgot my username or password.', a: 'On a real service you would use the recovery option on the sign-in page. This demo has no accounts, so there is nothing to recover. Do not type real credentials anywhere on this site.' },
    { c: 'Online banking', q: 'How do I pay my loan online?', a: 'The Pay my loan button opens a demo dialog that explains no payment can be made on this study site.' },
    { c: 'Online banking', q: 'Is there a mobile app?', a: 'The fictional Lantern App is shown as a concept only. There is no download.' },
    { c: 'Cards', q: 'How do I report a lost card?', a: 'Sample answer: call the sample line (555) 010-0199. This is a fictional number, so nobody will answer.' },
    { c: 'Cards', q: 'Which network is on the debit card?', a: 'The fictional Meridian Card Network, invented for this study. It does not exist.' },
    { c: 'Cards', q: 'Which ATMs can I use without a fee?', a: 'In this model, Harborlight ATMs and the fictional LinkLoop shared ATM network. See the Branches and ATMs page for sample locations.' },
    { c: 'Loans', q: 'How long does a loan decision take?', a: 'Sample answer: this site makes no decisions of any kind. The calculators only do arithmetic on numbers you type.' },
    { c: 'Loans', q: 'Can I refinance a loan?', a: 'Sample answer: the auto loan page describes a refinance concept. No application exists in this replica.' },
    { c: 'Loans', q: 'What affects the rate I am offered?', a: 'Real lenders weigh many factors. All rates here are fictional sample figures, and this answer is general information, not financial advice.' },
    { c: 'Loans', q: 'Where are the rate tables?', a: 'The Rates page lists fictional sample figures in tabbed tables.' }
  ];

  var ARTICLES = [
    { t: 'Building a simple monthly budget', tp: 'Budgeting', m: 6, s: 'A neutral walk-through of listing income and recurring costs in one view.' },
    { t: 'What a credit report is', tp: 'Credit', m: 5, s: 'General background on what appears in a report and why people review them.' },
    { t: 'Savings goals and emergency funds', tp: 'Saving', m: 7, s: 'Ways people think about setting aside money for planned and unplanned costs.' },
    { t: 'Understanding APR and APY', tp: 'Borrowing', m: 8, s: 'Plain definitions of two commonly confused terms, with invented numbers.' },
    { t: 'Questions to ask before a vehicle purchase', tp: 'Borrowing', m: 6, s: 'A checklist of topics to research, not a recommendation.' },
    { t: 'First-time home buyer vocabulary', tp: 'Homes', m: 9, s: 'A glossary of terms such as escrow, closing and amortization.' },
    { t: 'Spotting common scam messages', tp: 'Security', m: 5, s: 'Patterns in suspicious messages and why to contact an organization using a trusted number.' },
    { t: 'Teaching kids about money', tp: 'Saving', m: 4, s: 'Conversation starters for families.' },
    { t: 'How credit unions are organized', tp: 'Membership', m: 5, s: 'A short explanation of member ownership and volunteer boards.' },
    { t: 'Reading a loan disclosure', tp: 'Borrowing', m: 7, s: 'Which sections to look at and what each one generally means.' }
  ];

  /* ---------- menus ---------- */
  var navBtns = $$('#primary-nav button[aria-controls]');
  function closeMenus(except) {
    navBtns.forEach(function (b) {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      var p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = true;
    });
  }
  navBtns.forEach(function (b) {
    var p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = true;
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      closeMenus(b);
      b.setAttribute('aria-expanded', String(!open));
      p.hidden = open;
    });
  });
  var toggle = $('.menu-toggle'), pnav = $('#primary-nav');
  if (toggle && pnav) toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    pnav.classList.toggle('open', !open);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openBtn = navBtns.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openBtn) { closeMenus(); openBtn.focus(); return; }
    if (toggle && toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') {
      toggle.setAttribute('aria-expanded', 'false'); pnav.classList.remove('open'); toggle.focus();
    }
    var sr = $('#search-results');
    if (sr && !sr.hidden) { sr.hidden = true; var si = $('#site-search-input'); if (si) si.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#primary-nav')) closeMenus();
  });

  /* ---------- site search ---------- */
  var sform = $('.site-search');
  if (sform) sform.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = $('#site-search-input').value.trim().toLowerCase();
    var box = $('#search-results'), list = $('#search-results-body');
    box.hidden = false;
    if (!q) { list.innerHTML = '<p>Type a word such as "checking" or "branch" to search this demo site.</p>'; return; }
    var words = q.split(/\s+/);
    var hits = SITE_INDEX.filter(function (i) { var hay = (i.t + ' ' + i.k).toLowerCase(); return words.every(function (w) { return hay.indexOf(w) > -1; }); });
    list.innerHTML = hits.length
      ? '<p>' + hits.length + ' page' + (hits.length > 1 ? 's' : '') + ' found for "' + esc(q) + '":</p><ul>' + hits.map(function (h) { return '<li><a href="' + h.u + '">' + esc(h.t) + '</a></li>'; }).join('') + '</ul>'
      : '<p>No pages matched "' + esc(q) + '". Try a broader word, or browse the Support Center.</p>';
    $('#search-results-title').focus();
  });
  var sclose = $('#search-close');
  if (sclose) sclose.addEventListener('click', function () { $('#search-results').hidden = true; $('#site-search-input').focus(); });

  /* ---------- dialogs ---------- */
  $$('[data-open-dialog]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = document.getElementById(b.getAttribute('data-open-dialog'));
      if (d && d.showModal) { d.returnTo = b; d.showModal(); }
    });
  });
  $$('dialog').forEach(function (d) {
    d.addEventListener('close', function () { if (d.returnTo) d.returnTo.focus(); });
    $$('[data-close-dialog]', d).forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
  });

  /* ---------- generic form validation ---------- */
  function fieldLabel(f) { var l = document.querySelector('label[for="' + f.id + '"]'); return l ? l.textContent.replace(/\s*\(required\)\s*/, '').trim() : f.name; }
  function setErr(f, msg) {
    var id = f.id + '-error', ex = document.getElementById(id);
    if (!msg) { if (ex) ex.remove(); f.removeAttribute('aria-invalid'); f.removeAttribute('aria-describedby'); return; }
    if (!ex) { ex = document.createElement('p'); ex.id = id; ex.className = 'field-error'; (f.closest('.field') || f.parentNode).appendChild(ex); }
    ex.textContent = msg; f.setAttribute('aria-invalid', 'true'); f.setAttribute('aria-describedby', id);
  }
  function check(f) {
    var v = (f.type === 'checkbox') ? (f.checked ? 'y' : '') : f.value.trim(), n = fieldLabel(f);
    if (f.required && !v) return f.type === 'checkbox' ? 'Please confirm: ' + n : n + ' is required.';
    if (v && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return n + ' must look like name@example.test.';
    if (v && f.getAttribute('minlength') && v.length < +f.getAttribute('minlength')) return n + ' needs at least ' + f.getAttribute('minlength') + ' characters.';
    if (v && f.dataset.num !== undefined) {
      var x = parseNum(v);
      if (isNaN(x)) return n + ' must be a number, for example 1500.';
      if (f.dataset.min !== undefined && x < +f.dataset.min) return n + ' must be at least ' + f.dataset.min + '.';
      if (f.dataset.max !== undefined && x > +f.dataset.max) return n + ' must be no more than ' + f.dataset.max + '.';
    }
    return '';
  }
  function parseNum(v) { var s = String(v).replace(/[$,\s%]/g, ''); return /^-?\d*\.?\d+$/.test(s) ? parseFloat(s) : NaN; }
  function validate(form) {
    var errs = [];
    $$('input,select,textarea', form).forEach(function (f) {
      if (f.type === 'hidden' || f.closest('[hidden]')) return;
      var m = check(f); setErr(f, m); if (m) errs.push({ f: f, m: m });
    });
    var sum = $('.error-summary', form);
    if (!sum) { sum = document.createElement('div'); sum.className = 'error-summary'; sum.tabIndex = -1; sum.setAttribute('role', 'alert'); form.insertBefore(sum, form.firstChild); }
    if (errs.length) {
      sum.hidden = false;
      sum.innerHTML = '<h3>There ' + (errs.length > 1 ? 'are ' + errs.length + ' problems' : 'is 1 problem') + ' with this form</h3><ul>' + errs.map(function (e) { return '<li><a href="#' + e.f.id + '">' + esc(e.m) + '</a></li>'; }).join('') + '</ul>';
      $$('a', sum).forEach(function (a) { a.addEventListener('click', function (ev) { ev.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus(); }); });
      sum.focus();
    } else { sum.hidden = true; sum.innerHTML = ''; }
    return !errs.length;
  }
  $$('form[data-validate]').forEach(function (form) {
    form.noValidate = true;
    $$('input,select,textarea', form).forEach(function (f) {
      f.addEventListener('blur', function () { if (f.getAttribute('aria-invalid') === 'true') setErr(f, check(f)); });
    });
  });

  function demoSuccess(form, html) {
    var s = $('.demo-success', form.parentNode) || $('.demo-success', form);
    if (!s) return;
    s.hidden = false; s.innerHTML = html; s.setAttribute('tabindex', '-1'); s.focus();
  }

  /* contact form */
  var cf = $('form[data-form="contact"]');
  if (cf) cf.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate(cf)) return;
    demoSuccess(cf, '<h3>Demo only: message not sent</h3><p>Nothing left your browser. A real credit union would reply within a business day; this fictional site stores and sends nothing.</p>');
    cf.reset();
  });

  /* login dialog */
  var lf = $('form[data-form="login-demo"]');
  if (lf) lf.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate(lf)) return;
    $('.demo-success', lf.parentNode).hidden = false;
    $('.demo-success', lf.parentNode).innerHTML = '<p><strong>Demo only.</strong> No sign-in happened and nothing you typed was stored or sent.</p>';
    lf.reset();
  });

  /* ---------- tabs (rates) ---------- */
  var tablist = $('[role=tablist]');
  if (tablist) {
    var tabs = $$('[role=tab]', tablist), sel = $('#rate-group');
    var activate = function (t, focus) {
      tabs.forEach(function (x) {
        var on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (sel) sel.value = t.getAttribute('aria-controls');
      if (focus) t.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(t); });
      t.addEventListener('keydown', function (e) {
        var j = i;
        if (e.key === 'ArrowRight') j = (i + 1) % tabs.length; else if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = tabs.length - 1; else return;
        e.preventDefault(); activate(tabs[j], true);
      });
    });
    if (sel) sel.addEventListener('change', function () {
      var t = tabs.filter(function (x) { return x.getAttribute('aria-controls') === sel.value; })[0]; if (t) activate(t);
    });
    var fromHash = tabs.filter(function (x) { return '#' + x.getAttribute('aria-controls') === location.hash; })[0];
    activate(fromHash || tabs[0]);
  }

  /* ---------- calculators ---------- */
  function money(n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  var dc = $('form[data-form="dividend-calc"]');
  if (dc) dc.addEventListener('submit', function (e) {
    e.preventDefault();
    var out = $('#calc-result'); if (!validate(dc)) { out.hidden = true; return; }
    var p = parseNum($('#dc-start').value), m = parseNum($('#dc-monthly').value), r = parseNum($('#dc-rate').value) / 100, y = parseNum($('#dc-years').value);
    var bal = p, contrib = p, n = Math.round(y * 12);
    for (var i = 0; i < n; i++) { bal = bal * (1 + r / 12) + m; contrib += m; }
    out.hidden = false;
    out.innerHTML = '<h3>Illustrative result</h3><p>Ending balance: <strong>' + money(bal) + '</strong></p><p>Total deposited: ' + money(contrib) + '. Sample dividends: ' + money(bal - contrib) + '.</p><p class="hint">Fictional arithmetic with a made-up rate. Not an offer, quote or financial advice.</p>';
  });
  var lc = $('form[data-form="loan-calc"]');
  if (lc) lc.addEventListener('submit', function (e) {
    e.preventDefault();
    var out = $('#calc-result'); if (!validate(lc)) { out.hidden = true; return; }
    var P = parseNum($('#lc-amount').value), apr = parseNum($('#lc-rate').value) / 100, n = Math.round(parseNum($('#lc-term').value)), i = apr / 12;
    var pay = i === 0 ? P / n : P * i / (1 - Math.pow(1 + i, -n));
    out.hidden = false;
    out.innerHTML = '<h3>Illustrative result</h3><p>Monthly payment: <strong>' + money(pay) + '</strong></p><p>Total of payments: ' + money(pay * n) + '. Total sample interest: ' + money(pay * n - P) + '.</p><p class="hint">Fictional arithmetic with a made-up rate. Not an offer, quote or financial advice.</p>';
  });

  /* ---------- FAQ ---------- */
  var faqList = $('#faq-list');
  if (faqList) {
    var fq = $('#faq-q'), fc = $('#faq-cat'), fs = $('#faq-status');
    var renderFaq = function () {
      var q = fq.value.trim().toLowerCase(), c = fc.value;
      var hits = FAQS.filter(function (f) { return (!c || f.c === c) && (!q || (f.q + ' ' + f.a).toLowerCase().indexOf(q) > -1); });
      faqList.innerHTML = hits.map(function (f, i) {
        return '<div class="acc-item" data-component="accordion-item"><h3><button class="acc-btn" type="button" aria-expanded="false" aria-controls="faq-p' + i + '" id="faq-b' + i + '">' + esc(f.q) + '</button></h3><div class="acc-panel" id="faq-p' + i + '" role="region" aria-labelledby="faq-b' + i + '" hidden><p><span class="tag">' + esc(f.c) + '</span></p><p>' + esc(f.a) + '</p></div></div>';
      }).join('');
      fs.textContent = hits.length ? hits.length + ' of ' + FAQS.length + ' questions shown.' : 'No questions match your search. Clear the search or choose "All topics".';
      $$('.acc-btn', faqList).forEach(function (b) {
        b.addEventListener('click', function () {
          var o = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', String(!o)); document.getElementById(b.getAttribute('aria-controls')).hidden = o;
        });
      });
    };
    $('#faq-form').addEventListener('submit', function (e) { e.preventDefault(); renderFaq(); });
    fq.addEventListener('input', renderFaq); fc.addEventListener('change', renderFaq);
    $('#faq-reset').addEventListener('click', function () { fq.value = ''; fc.value = ''; renderFaq(); fq.focus(); });
    renderFaq();
  }

  /* ---------- branch locator ---------- */
  var bBody = $('#branch-rows');
  if (bBody) {
    var bq = $('#loc-q'), bt = $('#loc-type'), bs = $('#loc-sort'), bsat = $('#loc-sat'), bdr = $('#loc-drive'), bst = $('#loc-status'), bemp = $('#loc-empty'), btab = $('#loc-table-wrap');
    var renderB = function () {
      var q = bq.value.trim().toLowerCase();
      var hits = BRANCHES.filter(function (b) {
        return (!q || (b.n + ' ' + b.c + ' ' + b.a).toLowerCase().indexOf(q) > -1) && (!bt.value || b.ty === bt.value) && (!bsat.checked || b.sat) && (!bdr.checked || b.drive);
      });
      hits.sort(function (a, b) { return bs.value === 'type' ? a.ty.localeCompare(b.ty) || a.c.localeCompare(b.c) : a.c.localeCompare(b.c) || a.n.localeCompare(b.n); });
      bBody.innerHTML = hits.map(function (b) {
        return '<tr data-component="location-row"><th scope="row">' + esc(b.n) + '</th><td>' + esc(b.ty) + '</td><td>' + esc(b.a) + ', ' + esc(b.c) + '</td><td>' + esc(b.h) + '</td><td>' + (b.p ? esc(b.p) : 'None') + '</td><td>' + (b.drive ? 'Yes' : 'No') + '</td></tr>';
      }).join('');
      btab.hidden = !hits.length; bemp.hidden = !!hits.length;
      bst.textContent = hits.length + ' of ' + BRANCHES.length + ' sample locations shown.';
    };
    $('#loc-form').addEventListener('submit', function (e) { e.preventDefault(); renderB(); });
    [bq, bt, bs, bsat, bdr].forEach(function (c) { c.addEventListener(c.type === 'search' || c.type === 'text' ? 'input' : 'change', renderB); });
    $('#loc-reset').addEventListener('click', function () { bq.value = ''; bt.value = ''; bs.value = 'town'; bsat.checked = false; bdr.checked = false; renderB(); bq.focus(); });
    renderB();
  }

  /* ---------- education filter ---------- */
  var eList = $('#edu-list');
  if (eList) {
    var eq = $('#edu-q'), et = $('#edu-topic'), est = $('#edu-status');
    var renderE = function () {
      var q = eq.value.trim().toLowerCase(), t = et.value;
      var hits = ARTICLES.filter(function (a) { return (!t || a.tp === t) && (!q || (a.t + ' ' + a.s).toLowerCase().indexOf(q) > -1); });
      eList.innerHTML = hits.length ? hits.map(function (a) { return '<article class="card" data-component="article-card"><span class="tag">' + esc(a.tp) + '</span><h3>' + esc(a.t) + '</h3><p>' + esc(a.s) + '</p><p class="hint">' + a.m + ' minute read (sample summary only, full text not included)</p></article>'; }).join('') : '<p>No articles match. Clear the filters to see all ' + ARTICLES.length + ' sample articles.</p>';
      est.textContent = hits.length + ' of ' + ARTICLES.length + ' articles shown.';
    };
    $('#edu-form').addEventListener('submit', function (e) { e.preventDefault(); renderE(); });
    eq.addEventListener('input', renderE); et.addEventListener('change', renderE);
    $('#edu-reset').addEventListener('click', function () { eq.value = ''; et.value = ''; renderE(); eq.focus(); });
    renderE();
  }

  /* ---------- membership eligibility + join demo ---------- */
  var ef = $('form[data-form="eligibility"]');
  if (ef) {
    var res = $('#elig-result'), jf = $('#join-demo');
    ef.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(ef)) { res.hidden = true; jf.hidden = true; return; }
      var c = $('#elig-connection').value, town = $('#elig-town').value;
      var ok = false, why = '';
      if (c === 'local') { ok = !!town && town !== 'other'; why = ok ? 'You said you live, work, worship or study in ' + town + ', which is in the sample field of membership.' : 'The sample field of membership covers only the listed Tidewater County towns. Choose a town, or try another connection.'; }
      else if (c === 'family') { ok = true; why = 'Family of a current member qualifies in this sample model.'; }
      else if (c === 'employer') { ok = true; why = 'Employees of the invented partner employers qualify in this sample model.'; }
      else if (c === 'association') { ok = true; why = 'Joining the fictional Tidewater Neighbors Association (a sample $5 payment, nothing is collected here) opens eligibility in this model.'; }
      else { why = 'None of the sample routes apply. In a real cooperative you might ask about other options; here, try the association route.'; }
      res.hidden = false;
      res.innerHTML = '<h3>' + (ok ? 'Sample result: you appear eligible' : 'Sample result: not eligible by these rules') + '</h3><p>' + esc(why) + '</p><p class="hint">Simulation only. This is not a membership decision.</p>';
      jf.hidden = !ok;
      res.setAttribute('tabindex', '-1'); res.focus();
    });
    jf.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(jf)) return;
      var s = $('#join-success'); s.hidden = false;
      s.innerHTML = '<h3>Demo complete: no application was created</h3><p>Nothing you typed was saved or sent, and you are not a member of anything. Real applications would also ask for identity verification, which this study site never collects.</p>';
      s.setAttribute('tabindex', '-1'); s.focus(); jf.reset();
    });
    $('#elig-connection').addEventListener('change', function () {
      var show = this.value === 'local'; $('#town-field').hidden = !show;
      if (!show) { var t = $('#elig-town'); t.value = ''; setErr(t, ''); }
    });
    $('#town-field').hidden = true;
  }
})();
