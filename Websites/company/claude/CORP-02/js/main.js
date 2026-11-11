/* Fernhollow Credit Union (fictional) - shared behaviour for the CORP-02 replica. Vanilla JS, no network. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  /* ---------- inline demo data (all fictional) ---------- */
  var PAGES = [
    { title: 'Home', url: 'index.html', words: 'fernhollow credit union benefits offers members app' },
    { title: 'Checking accounts', url: 'checking.html', words: 'checking debit overdraft free account fees' },
    { title: 'Savings accounts and dividend calculator', url: 'savings.html', words: 'savings dividend calculator apy youth money market' },
    { title: 'Certificate accounts', url: 'certificates.html', words: 'certificate cd term apy early withdrawal' },
    { title: 'Auto loans', url: 'auto-loans.html', words: 'auto car vehicle loan payment calculator refinance' },
    { title: 'Home mortgage loans', url: 'mortgage.html', words: 'mortgage home loan fixed arm calculator down payment' },
    { title: 'Credit cards', url: 'credit-cards.html', words: 'credit card rewards travel apr cash back' },
    { title: 'Rates', url: 'rates.html', words: 'rates apy apr savings certificate loan mortgage' },
    { title: 'Support center', url: 'support.html', words: 'support help faq forms direct deposit wires checks password' },
    { title: 'Branches and ATMs', url: 'branches.html', words: 'branch atm locator hours zip near me' },
    { title: 'Become a member', url: 'membership.html', words: 'join member eligibility apply application' },
    { title: 'Financial education center', url: 'education.html', words: 'learn education budget article fraud saving' },
    { title: 'Careers', url: 'careers.html', words: 'jobs careers openings work apply' },
    { title: 'Contact us', url: 'contact.html', words: 'contact phone email message' },
    { title: 'Accessibility statement', url: 'accessibility.html', words: 'accessibility statement feedback assistive' }
  ];

  var FAQ = [
    { cat: 'Accounts', q: 'How do I open a checking account?', a: 'Become a member first, then choose Everyday Checking. The demo membership form on the Become a member page shows the steps; no real application is taken.' },
    { cat: 'Accounts', q: 'Is there a minimum balance for savings?', a: 'In this sample data, Share Savings needs a $5 opening deposit. Fictional terms only.' },
    { cat: 'Accounts', q: 'How do I set up direct deposit?', a: 'Give your employer the sample routing number 000000000 and your account number. These are placeholders, not real numbers.' },
    { cat: 'Accounts', q: 'How do I order checks?', a: 'Use the Orders menu after signing in. The login on this site is a demonstration and does not sign anyone in.' },
    { cat: 'Cards', q: 'What should I do if my card is lost?', a: 'Call the sample 24-hour line at (555) 010-0142 to freeze it. This number is fictional.' },
    { cat: 'Cards', q: 'How do I activate a new card?', a: 'Follow the instructions on the card sticker. In this demo, no card is issued.' },
    { cat: 'Loans', q: 'How do I make a loan payment?', a: 'The Pay my loan button opens a demo notice. No payment is processed on this site.' },
    { cat: 'Loans', q: 'Can I pay my auto loan off early?', a: 'In this sample, yes, with no prepayment penalty.' },
    { cat: 'Online banking', q: 'I forgot my username or password.', a: 'Use the Forgot username or password button in the Log in panel. It opens a demo notice only.' },
    { cat: 'Online banking', q: 'Can I use the mobile app?', a: 'The mobile app is described on the home page. There is no real app for this fictional credit union.' },
    { cat: 'Security', q: 'How can I spot a phishing message?', a: 'Be wary of urgent requests for passwords or codes. A real credit union will never ask for your full password.' },
    { cat: 'Security', q: 'What is a wire transfer and how long does it take?', a: 'A wire sends funds electronically between institutions, usually the same business day. Sample answer for demonstration only.' }
  ];

  var BRANCHES = [
    { name: 'Millbrook Main Branch', type: 'Branch', town: 'Millbrook', state: 'MA', zip: '01001', address: '100 Example Street', hours: 'Mon-Fri 9-5, Sat 9-1', saturday: true, services: 'Teller, loans, safe deposit' },
    { name: 'Aldergate Branch', type: 'Branch', town: 'Aldergate', state: 'MA', zip: '01002', address: '22 Sample Avenue', hours: 'Mon-Fri 9-5', saturday: false, services: 'Teller, loans' },
    { name: 'Hartwell Branch', type: 'Branch', town: 'Hartwell', state: 'NH', zip: '03001', address: '8 Placeholder Road', hours: 'Mon-Fri 9-5, Sat 9-12', saturday: true, services: 'Teller, mortgage advisor' },
    { name: 'Cobble Hill Branch', type: 'Branch', town: 'Cobble Hill', state: 'MA', zip: '01003', address: '45 Demo Lane', hours: 'Mon-Fri 10-6', saturday: false, services: 'Teller, loans, drive-up' },
    { name: 'Millbrook Library ATM', type: 'ATM', town: 'Millbrook', state: 'MA', zip: '01001', address: '5 Library Walk', hours: '24 hours', saturday: true, services: 'Cash withdrawal, deposits' },
    { name: 'Aldergate Station ATM', type: 'ATM', town: 'Aldergate', state: 'MA', zip: '01002', address: 'Station Plaza', hours: '6am-10pm', saturday: true, services: 'Cash withdrawal' },
    { name: 'Hartwell Market ATM', type: 'ATM', town: 'Hartwell', state: 'NH', zip: '03001', address: '77 Market Court', hours: '24 hours', saturday: true, services: 'Cash withdrawal, deposits' },
    { name: 'Riverside Co-op Shared ATM', type: 'Shared ATM', town: 'Riverside', state: 'NH', zip: '03002', address: '3 Co-op Way', hours: 'Store hours', saturday: true, services: 'Cash withdrawal' },
    { name: 'Northgate Shared ATM', type: 'Shared ATM', town: 'Northgate', state: 'MA', zip: '01004', address: '900 Northgate Mall', hours: 'Mall hours', saturday: true, services: 'Cash withdrawal' },
    { name: 'Eastfield Branch', type: 'Branch', town: 'Eastfield', state: 'MA', zip: '01005', address: '61 Orchard Street', hours: 'Mon-Fri 9-4', saturday: false, services: 'Teller, member services' }
  ];

  var ARTICLES = [
    { title: 'Build a monthly budget in four steps', topic: 'Budgeting', min: 6, text: 'List income, fixed bills, flexible spending, and savings goals. Review once a month and adjust.' },
    { title: 'Tracking spending without a spreadsheet', topic: 'Budgeting', min: 4, text: 'A simple weekly check of your account activity is enough to spot where money goes.' },
    { title: 'How an emergency fund works', topic: 'Saving', min: 5, text: 'Aim for one month of expenses first, then grow toward three to six months.' },
    { title: 'Certificates versus savings: which fits?', topic: 'Saving', min: 7, text: 'Certificates lock funds for a term in exchange for a fixed rate; savings stay flexible.' },
    { title: 'What affects the rate on a loan', topic: 'Borrowing', min: 8, text: 'Credit history, term, down payment, and loan type all influence the rate offered.' },
    { title: 'Using a credit card without carrying a balance', topic: 'Borrowing', min: 5, text: 'Pay the statement balance in full each month to avoid interest charges.' },
    { title: 'Getting ready to buy a home', topic: 'Home and auto', min: 9, text: 'Check your credit, save for a down payment, and compare mortgage types before you shop.' },
    { title: 'Financing a car: new versus used', topic: 'Home and auto', min: 6, text: 'Compare total cost, not just the monthly payment. Shorter terms usually cost less overall.' },
    { title: 'Five signs of a scam message', topic: 'Fraud and security', min: 4, text: 'Urgency, unusual payment methods, unknown senders, requests for codes, and too-good-to-be-true offers.' }
  ];

  var JOBS = [
    { title: 'Member Service Representative', dept: 'Member Services', loc: 'Millbrook, MA', type: 'Full-time', text: 'Help members with accounts and everyday questions at our main branch.' },
    { title: 'Part-time Teller', dept: 'Member Services', loc: 'Hartwell, NH', type: 'Part-time', text: 'Process transactions and welcome members at the Hartwell branch.' },
    { title: 'Mortgage Loan Officer', dept: 'Lending', loc: 'Aldergate, MA', type: 'Full-time', text: 'Guide members through the home buying process, from pre-approval to closing.' },
    { title: 'Auto Loan Underwriter', dept: 'Lending', loc: 'Remote', type: 'Full-time', text: 'Review auto loan applications against policy and guidelines.' },
    { title: 'Front-end Developer', dept: 'Technology', loc: 'Remote', type: 'Full-time', text: 'Build accessible member-facing web experiences with HTML, CSS, and JavaScript.' },
    { title: 'Help Desk Analyst', dept: 'Technology', loc: 'Millbrook, MA', type: 'Full-time', text: 'Support staff devices and software.' },
    { title: 'Fraud Prevention Analyst', dept: 'Risk', loc: 'Remote', type: 'Full-time', text: 'Monitor activity for fraud patterns and help members recover.' },
    { title: 'Marketing Intern', dept: 'Marketing', loc: 'Millbrook, MA', type: 'Part-time', text: 'Support community events and content for a summer term.' }
  ];

  /* ---------- disclosures (accordions, "read more" cards) ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button[aria-controls].accordion-trigger, button[aria-controls].disclosure');
    if (!t) return;
    var open = t.getAttribute('aria-expanded') === 'true';
    t.setAttribute('aria-expanded', String(!open));
    document.getElementById(t.getAttribute('aria-controls')).hidden = open;
  });

  /* ---------- navigation ---------- */
  var navToggle = $('[data-menu-toggle]');
  var nav = $('#primary-nav');
  var submenuButtons = $$('.nav-button');
  function closeSubmenus(except) {
    submenuButtons.forEach(function (b) {
      if (b !== except && b.getAttribute('aria-expanded') === 'true') {
        b.setAttribute('aria-expanded', 'false');
        document.getElementById(b.getAttribute('aria-controls')).hidden = true;
      }
    });
  }
  submenuButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      closeSubmenus(b);
      b.setAttribute('aria-expanded', String(!open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
  });
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) closeSubmenus();
  });
  document.addEventListener('focusin', function (e) {
    var group = e.target.closest('.has-sub');
    closeSubmenus(group ? $('.nav-button', group) : null);
  });

  /* ---------- login panel (demo) ---------- */
  var loginToggle = $('[data-login-toggle]');
  var loginPanel = $('#login-panel');
  function setLogin(open) {
    loginPanel.hidden = !open;
    loginToggle.setAttribute('aria-expanded', String(open));
  }
  loginToggle.addEventListener('click', function () {
    var open = loginToggle.getAttribute('aria-expanded') !== 'true';
    setLogin(open);
    if (open) $('#login-user').focus();
  });

  /* ---------- site search over the page index ---------- */
  var searchForm = $('.site-search');
  var searchResults = $('#search-results');
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = $('input', searchForm).value.trim().toLowerCase();
    var words = q.split(/\s+/).filter(Boolean);
    var hits = words.length ? PAGES.filter(function (p) {
      var hay = (p.title + ' ' + p.words).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    }) : [];
    var body = !words.length ? '<p>Type a word such as "mortgage" or "branch" and search again.</p>'
      : hits.length ? '<ul>' + hits.map(function (p) { return '<li><a href="' + p.url + '">' + esc(p.title) + '</a></li>'; }).join('') + '</ul>'
      : '<p>No pages match "' + esc(q) + '". Try a shorter word such as "rates" or "loan".</p>';
    searchResults.innerHTML = '<div class="container"><p class="results-title" role="status">' + (words.length ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for "' + esc(q) + '"' : 'Search the site') + '</p>' + body + '<button type="button" class="link-button" data-close-search>Close search results</button></div>';
    searchResults.hidden = false;
    searchResults.focus();
  });
  searchResults.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-search]')) { searchResults.hidden = true; $('input', searchForm).focus(); }
  });

  /* ---------- Escape handling ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openSub = submenuButtons.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openSub) { closeSubmenus(); openSub.focus(); return; }
    if (!searchResults.hidden) { searchResults.hidden = true; $('input', searchForm).focus(); return; }
    if (!loginPanel.hidden) { setLogin(false); loginToggle.focus(); return; }
    if (navToggle && nav.classList.contains('is-open') && getComputedStyle(navToggle).display !== 'none') {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  /* ---------- demo dialog ---------- */
  var dialog = $('#demo-dialog');
  var dialogOpener = null;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-demo]');
    if (b) {
      dialogOpener = b;
      $('#demo-dialog-title').textContent = b.getAttribute('data-demo');
      $('#demo-dialog-text').textContent = 'This is a demonstration site for accessibility research. Fernhollow Credit Union is fictional, so no real login, payment, application, or message happens here.';
      dialog.showModal();
      return;
    }
    if (e.target.closest('[data-dialog-close]') || e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', function () { if (dialogOpener) dialogOpener.focus(); });

  /* ---------- form validation ---------- */
  function messageFor(el) {
    var label = el.getAttribute('data-label') || el.name || 'this field';
    var v = el.validity;
    if (v.valueMissing) return el.type === 'checkbox' ? 'Check the box: ' + label + '.' : (el.tagName === 'SELECT' ? 'Select ' : 'Enter ') + label + '.';
    if (v.typeMismatch) return 'Enter ' + label + ' in a valid format, such as name@example.com.';
    if (v.patternMismatch) return el.getAttribute('data-pattern-message') || 'Check the format of ' + label + '.';
    if (v.rangeUnderflow) return label + ' must be at least ' + el.min + '.';
    if (v.rangeOverflow) return label + ' must be no more than ' + el.max + '.';
    if (v.tooShort) return label + ' must be at least ' + el.minLength + ' characters.';
    if (v.badInput) return 'Enter ' + label + ' as a number.';
    return 'Check ' + label + '.';
  }
  function setError(el, msg) {
    var err = document.getElementById(el.id + '-error');
    if (msg) { err.textContent = msg; err.hidden = false; el.setAttribute('aria-invalid', 'true'); }
    else { err.hidden = true; err.textContent = ''; el.removeAttribute('aria-invalid'); }
  }
  // Returns true when valid; otherwise fills the error summary and focuses it.
  function validate(form) {
    var bad = [];
    $$('input, select, textarea', form).forEach(function (el) {
      if (el.type === 'hidden' || !document.getElementById(el.id + '-error')) return;
      var msg = el.checkValidity() ? '' : messageFor(el);
      setError(el, msg);
      if (msg) bad.push({ el: el, msg: msg });
    });
    var summary = $('[data-error-summary]', form);
    if (summary) {
      summary.hidden = !bad.length;
      $('ul', summary).innerHTML = bad.map(function (b) { return '<li><a href="#' + b.el.id + '">' + esc(b.msg) + '</a></li>'; }).join('');
      if (bad.length) summary.focus();
    } else if (bad.length) bad[0].el.focus();
    return !bad.length;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-error-summary] a');
    if (a) { e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus(); }
  });
  document.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) setError(e.target, '');
  });

  function showSuccess(form, text) {
    var box = $('[data-demo-success]', form);
    if (!box) return;
    $('p', box).textContent = text;
    box.hidden = false;
    box.focus();
  }

  $$('form[data-form]').forEach(function (form) {
    form.noValidate = true;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = $('[data-demo-success]', form);
      if (success) success.hidden = true;
      if (!validate(form)) return;
      var kind = form.getAttribute('data-form');
      if (kind === 'login') {
        showSuccess(form, 'Demo only: no sign-in took place and nothing you typed was stored or sent.');
        form.reset();
      } else if (kind === 'eligibility') {
        var map = {
          live: 'Demo result: people who live or work in the sample service counties could qualify.',
          employer: 'Demo result: employees of sample partner employers could qualify.',
          family: 'Demo result: family members of existing members could qualify.',
          association: 'Demo result: joining the sample Fernhollow Friends association could open membership.'
        };
        showSuccess(form, map[$('#elig-reason').value]);
      } else if (kind === 'calc') {
        calculate(form);
      } else {
        showSuccess(form, 'Demo only: your ' + (form.getAttribute('data-form-noun') || 'form') + ' was checked in your browser but not sent anywhere. No application or message was submitted.');
        form.reset();
      }
    });
  });

  /* ---------- calculators ---------- */
  function calculate(form) {
    var kind = form.getAttribute('data-calc');
    var out = $('[data-calc-result]', form);
    var n = function (id) { return parseFloat(document.getElementById(id).value); };
    var html;
    if (kind === 'loan') {
      var p = n(form.id + '-amount'), months = n(form.id + '-years') * 12, r = n(form.id + '-rate') / 1200;
      var pay = r === 0 ? p / months : p * r / (1 - Math.pow(1 + r, -months));
      html = '<dt>Estimated monthly payment</dt><dd>' + money.format(pay) + '</dd><dt>Total of payments</dt><dd>' + money.format(pay * months) + '</dd><dt>Total interest</dt><dd>' + money.format(pay * months - p) + '</dd>';
    } else {
      var bal = n('div-balance'), dep = n('div-deposit'), apy = n('div-apy') / 100, mths = n('div-years') * 12;
      var m = Math.pow(1 + apy, 1 / 12) - 1, start = bal;
      for (var i = 0; i < mths; i++) bal = bal * (1 + m) + dep;
      var put = start + dep * mths;
      html = '<dt>Estimated ending balance</dt><dd>' + money.format(bal) + '</dd><dt>Total you put in</dt><dd>' + money.format(put) + '</dd><dt>Estimated dividends earned</dt><dd>' + money.format(bal - put) + '</dd>';
    }
    out.innerHTML = '<dl>' + html + '</dl><p class="hint">Estimate from sample inputs only; not an offer or a rate quote.</p>';
    out.hidden = false;
  }

  /* ---------- tabs ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var to = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        select(tabs[to], true);
      });
    });
  });

  var rateSort = $('#rate-sort');
  if (rateSort) {
    $$('.rates-table tbody').forEach(function (tb) {
      $$('tr', tb).forEach(function (tr, i) { tr.setAttribute('data-order', i); });
    });
    rateSort.addEventListener('change', function () {
      var byRate = rateSort.value === 'rate';
      $$('.rates-table tbody').forEach(function (tb) {
        $$('tr', tb).sort(function (a, b) {
          return byRate ? b.getAttribute('data-rate') - a.getAttribute('data-rate') : a.getAttribute('data-order') - b.getAttribute('data-order');
        }).forEach(function (tr) { tb.appendChild(tr); });
      });
      $('#rate-sort-status').textContent = byRate ? 'Rows sorted by highest rate first.' : 'Rows in default order.';
    });
  }

  /* ---------- filterable lists ---------- */
  var has = function (hay, q) { return hay.toLowerCase().indexOf(q) !== -1; };
  var LISTS = {
    faq: {
      data: FAQ,
      noun: 'answer',
      test: function (d, v) { return (!v.cat || d.cat === v.cat) && (!v.q || has(d.q + ' ' + d.a, v.q)); },
      render: function (items) {
        return '<div class="accordion">' + items.map(function (d, i) {
          return '<h3><button type="button" class="accordion-trigger" aria-expanded="false" aria-controls="faq-' + i + '">' + esc(d.q) + '</button></h3><div class="accordion-panel" id="faq-' + i + '" hidden><p><strong>' + esc(d.cat) + ':</strong> ' + esc(d.a) + '</p></div>';
        }).join('') + '</div>';
      }
    },
    branches: {
      data: BRANCHES,
      noun: 'location',
      test: function (d, v) {
        return (!v.type || d.type === v.type) && (!v.saturday || d.saturday) &&
          (!v.q || has([d.name, d.town, d.state, d.zip, d.address].join(' '), v.q));
      },
      render: function (items) {
        return '<div class="table-wrap" role="region" aria-label="Branch and ATM results" tabindex="0"><table><caption>Sample branch and ATM locations (fictional)</caption><thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Address</th><th scope="col">Hours</th><th scope="col">Services</th></tr></thead><tbody>' +
          items.map(function (d) {
            return '<tr><th scope="row">' + esc(d.name) + '</th><td>' + d.type + '</td><td>' + esc(d.address) + ', ' + esc(d.town) + ', ' + d.state + ' ' + d.zip + '</td><td>' + esc(d.hours) + '</td><td>' + esc(d.services) + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      }
    },
    articles: {
      data: ARTICLES,
      noun: 'article',
      test: function (d, v) { return (!v.topic || d.topic === v.topic) && (!v.q || has(d.title + ' ' + d.text, v.q)); },
      render: function (items) {
        return '<ul class="card-grid">' + items.map(function (d, i) {
          return '<li><article class="card" data-component="article-card"><p class="tag">' + esc(d.topic) + ' &middot; ' + d.min + ' min read</p><h3>' + esc(d.title) + '</h3><button type="button" class="link-button disclosure" aria-expanded="false" aria-controls="art-' + i + '">Show summary<span class="visually-hidden">: ' + esc(d.title) + '</span></button><p id="art-' + i + '" hidden>' + esc(d.text) + '</p></article></li>';
        }).join('') + '</ul>';
      }
    },
    jobs: {
      data: JOBS,
      noun: 'opening',
      test: function (d, v) { return (!v.dept || d.dept === v.dept) && (!v.loc || d.loc === v.loc) && (!v.type || d.type === v.type) && (!v.q || has(d.title + ' ' + d.text, v.q)); },
      render: function (items) {
        return items.map(function (d) {
          return '<article class="job" data-component="job-listing"><h3>' + esc(d.title) + '</h3><p class="meta">' + esc(d.dept) + ' &middot; ' + esc(d.loc) + ' &middot; ' + d.type + '</p><p>' + esc(d.text) + '</p><button type="button" class="btn btn-secondary btn-small" data-demo="Apply: ' + esc(d.title) + '">Apply (demo)<span class="visually-hidden"> for ' + esc(d.title) + '</span></button></article>';
        }).join('');
      }
    }
  };

  $$('form[data-filter]').forEach(function (form) {
    var cfg = LISTS[form.getAttribute('data-filter')];
    var results = $('[data-results]', form.parentNode);
    var status = $('[data-status]', form.parentNode);
    function run() {
      var v = {};
      $$('input, select', form).forEach(function (el) {
        v[el.name] = el.type === 'checkbox' ? el.checked : (el.type === 'search' ? el.value.trim().toLowerCase() : el.value);
      });
      var items = cfg.data.filter(function (d) { return cfg.test(d, v); });
      status.textContent = items.length + ' ' + cfg.noun + (items.length === 1 ? '' : 's') + ' found';
      results.innerHTML = items.length ? cfg.render(items) : '<div class="empty-state"><p><strong>No ' + cfg.noun + 's match your filters.</strong></p><p>Try a different word, or clear the filters to see all sample ' + cfg.noun + 's.</p></div>';
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    form.addEventListener('input', run);
    form.addEventListener('change', run);
    form.addEventListener('reset', function () { setTimeout(run, 0); });
    run();
  });

  // Topic shortcut buttons on the support page set the FAQ category filter.
  $$('[data-topic]').forEach(function (b) {
    b.addEventListener('click', function () {
      var sel = $('#faq-cat');
      sel.value = b.getAttribute('data-topic');
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      $('#faq-results').scrollIntoView();
      $('#faq-status').focus();
    });
  });
})();
