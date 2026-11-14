/* Corvane Bank (fictional) replica, CORP-01. Vanilla JS, no network, all data inline. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n, d) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };

  /* ---------- Navigation ---------- */
  var menuToggle = $('#menu-toggle'), siteMenu = $('#site-menu');
  function closeMegas(except, focusBtn) {
    $$('.nav-trigger').forEach(function (b) {
      if (b === except) return;
      if (b.getAttribute('aria-expanded') === 'true') {
        b.setAttribute('aria-expanded', 'false');
        document.getElementById(b.getAttribute('aria-controls')).hidden = true;
        if (focusBtn) b.focus();
      }
    });
  }
  $$('.nav-trigger').forEach(function (b) {
    var panel = document.getElementById(b.getAttribute('aria-controls'));
    function setOpen(o) {
      b.setAttribute('aria-expanded', o ? 'true' : 'false'); panel.hidden = !o;
      if (o) closeMegas(b);
    }
    b.addEventListener('click', function () { setOpen(b.getAttribute('aria-expanded') !== 'true'); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); var a = $('a', panel); if (a) a.focus(); }
    });
    var back = $('[data-close-mega]', panel);
    if (back) back.addEventListener('click', function () { setOpen(false); b.focus(); });
  });
  if (menuToggle && siteMenu) {
    menuToggle.addEventListener('click', function () {
      var o = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', o ? 'true' : 'false');
      siteMenu.classList.toggle('is-open', o);
      if (!o) closeMegas();
    });
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#global-navigation-menubar')) closeMegas();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if ($('dialog[open]')) return; /* native dialog handles Escape */
    var open = $('.nav-trigger[aria-expanded="true"]');
    if (open) { closeMegas(null, true); return; }
    if (menuToggle && menuToggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(menuToggle).display !== 'none') {
      menuToggle.click(); menuToggle.focus();
    }
  });

  /* ---------- Generic helpers: errors ---------- */
  function clearErrors(form) {
    $$('[aria-invalid]', form).forEach(function (i) { i.removeAttribute('aria-invalid'); i.removeAttribute('data-had-error'); });
    $$('.error', form).forEach(function (e) { e.hidden = true; e.textContent = ''; });
    var s = $('[data-error-summary]', form.parentNode) || $('[data-error-summary]', form);
    if (s) { s.hidden = true; $('ul', s).innerHTML = ''; }
  }
  function showErrors(form, errs) { /* errs: [{id,msg}] */
    clearErrors(form);
    var s = $('[data-error-summary]', form.parentNode) || $('[data-error-summary]', form);
    errs.forEach(function (er) {
      var input = document.getElementById(er.id), msg = document.getElementById(er.id + '-error');
      input.setAttribute('aria-invalid', 'true');
      msg.textContent = er.msg; msg.hidden = false;
      var d = (input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      if (d.indexOf(msg.id) < 0) d.push(msg.id);
      input.setAttribute('aria-describedby', d.join(' '));
      var li = document.createElement('li'), a = document.createElement('a');
      a.href = '#' + er.id; a.textContent = er.msg;
      a.addEventListener('click', function (ev) { ev.preventDefault(); input.focus(); });
      li.appendChild(a); $('ul', s).appendChild(li);
    });
    s.hidden = false; s.focus();
  }
  function num(v) {
    var t = String(v).replace(/[$,\s]/g, '');
    if (t === '' || !/^\d*\.?\d+$/.test(t)) return NaN;
    return parseFloat(t);
  }
  function pmt(P, annual, n) {
    var r = annual / 100 / 12;
    return r === 0 ? P / n : P * r / (1 - Math.pow(1 + r, -n));
  }
  function scrollables(root) {
    $$('.table-wrap', root).forEach(function (w) {
      var cap = $('caption', w);
      if (!w.hasAttribute('tabindex')) w.setAttribute('tabindex', '0');
      if (!w.hasAttribute('role')) { w.setAttribute('role', 'region'); w.setAttribute('aria-label', (cap ? cap.textContent : 'Table') + ' (scrollable)'); }
    });
  }
  scrollables(document);
  function showResult(el, html) { el.innerHTML = html; scrollables(el); el.hidden = false; el.focus(); }
  var SAMPLE = '<p class="hint">Fictional sample figures for a design study. Not an offer, quote or financial advice.</p>';

  /* ---------- Login demo dialog ---------- */
  var dlg = $('#login-dialog'), lastOpener = null;
  if (dlg && typeof dlg.showModal === 'function') {
    var form = $('#login-form', dlg), body = $('[data-login-body]', dlg), done = $('[data-login-done]', dlg);
    $$('[data-open-login]').forEach(function (b) {
      b.addEventListener('click', function () {
        lastOpener = b; form.reset(); clearErrors(form); body.hidden = false; done.hidden = true;
        dlg.showModal();
      });
    });
    $$('[data-close-login]').forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
    dlg.addEventListener('close', function () { if (lastOpener) lastOpener.focus(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = [];
      if (!$('#login-user').value.trim()) errs.push({ id: 'login-user', msg: 'Enter a made-up demo user name.' });
      if ($('#login-pass').value.length < 4) errs.push({ id: 'login-pass', msg: 'Enter at least 4 characters of made-up text.' });
      if (errs.length) { showErrors(form, errs); return; }
      form.reset(); clearErrors(form); body.hidden = true; done.hidden = false; done.focus();
    });
  } else {
    $$('[data-open-login]').forEach(function (b) { b.disabled = true; b.title = 'Dialogs are not supported in this browser'; });
  }

  /* ---------- Accordions ---------- */
  $$('.acc-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var o = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', o ? 'true' : 'false');
      document.getElementById(b.getAttribute('aria-controls')).hidden = !o;
    });
  });
  $$('[data-toggle-detail]').forEach(function (b) {
    b.addEventListener('click', function () {
      var o = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', o ? 'true' : 'false');
      b.textContent = o ? 'Hide sample terms' : 'Show sample terms';
      document.getElementById(b.getAttribute('aria-controls')).hidden = !o;
    });
  });

  var page = document.body.getAttribute('data-page');

  /* ---------- Home / enroll demo ---------- */
  var enroll = $('#enroll-form');
  if (enroll) enroll.addEventListener('submit', function (e) {
    e.preventDefault();
    var errs = [], name = $('#en-name').value.trim(), em = $('#en-email').value.trim(), code = $('#en-code').value.trim();
    if (!name) errs.push({ id: 'en-name', msg: 'Enter a made-up name.' });
    if (!em) errs.push({ id: 'en-email', msg: 'Enter an email address such as name@example.com.' });
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) errs.push({ id: 'en-email', msg: 'Email must look like name@example.com.' });
    if (!/^[A-Za-z0-9]{6}$/.test(code)) errs.push({ id: 'en-code', msg: 'Reference code must be exactly 6 letters or digits.' });
    if (errs.length) { showErrors(enroll, errs); return; }
    clearErrors(enroll);
    showResult($('#en-result'), '<p><strong>Demo complete.</strong> No account was created and nothing was sent or stored. A real enrollment would continue here.</p>');
    enroll.reset();
  });

  /* ---------- CD estimator ---------- */
  var cdForm = $('#cd-form');
  if (cdForm) {
    var rows = $$('#cd-table tbody tr');
    function hl() { var t = $('#cd-term').value; rows.forEach(function (r) { r.classList.toggle('is-highlight', r.getAttribute('data-term') === t); }); }
    $('#cd-term').addEventListener('change', hl); hl();
    cdForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var amt = num($('#cd-amount').value), errs = [];
      if (isNaN(amt)) errs.push({ id: 'cd-amount', msg: 'Enter the amount as a number, for example 5,000.' });
      else if (amt < 500 || amt > 250000) errs.push({ id: 'cd-amount', msg: 'Amount must be between 500 and 250,000.' });
      if (errs.length) { showErrors(cdForm, errs); return; }
      clearErrors(cdForm);
      var row = $('#cd-table tbody tr[data-term="' + $('#cd-term').value + '"]'), apy = parseFloat(row.getAttribute('data-apy')), m = parseInt(row.getAttribute('data-term'), 10);
      var end = amt * Math.pow(1 + apy / 100, m / 12);
      showResult($('#cd-result'), '<p>Estimated value at maturity</p><p class="big">' + money(end, 2) + '</p><p>Estimated earnings: ' + money(end - amt, 2) + ' on ' + money(amt) + ' over ' + m + ' months at a sample ' + apy.toFixed(2) + '% APY.</p>' + SAMPLE);
    });
  }

  /* ---------- Card filter ---------- */
  var cardList = $('#card-list');
  if (cardList) {
    var items = $$('li', cardList), goal = $('#card-goal'), nofee = $('#card-nofee');
    var applyCards = function () {
      var n = 0;
      items.forEach(function (li) {
        var ok = (goal.value === 'all' || li.getAttribute('data-goal') === goal.value) && (!nofee.checked || li.getAttribute('data-fee') === 'none');
        li.hidden = !ok; if (ok) n++;
      });
      $('#card-count').textContent = n + (n === 1 ? ' sample card shown' : ' sample cards shown');
      $('#card-empty').hidden = n !== 0;
    };
    goal.addEventListener('change', applyCards); nofee.addEventListener('change', applyCards);
    $('#card-filter').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#card-reset').addEventListener('click', function () { goal.value = 'all'; nofee.checked = false; applyCards(); goal.focus(); });
    applyCards();
  }

  /* ---------- Mortgage rate table ---------- */
  var rateTable = $('#rate-table');
  if (rateTable) {
    var tb = $('tbody', rateTable), rrows = $$('tr', tb), t = $('#rate-type'), tm = $('#rate-term'), so = $('#rate-sort');
    var applyRates = function () {
      var vis = rrows.filter(function (r) {
        return (t.value === 'all' || r.getAttribute('data-type') === t.value) && (tm.value === 'all' || r.getAttribute('data-term') === tm.value);
      });
      vis.sort(function (a, b) {
        if (so.value === 'rate') return parseFloat(a.getAttribute('data-rate')) - parseFloat(b.getAttribute('data-rate'));
        if (so.value === 'term') return parseInt(a.getAttribute('data-term'), 10) - parseInt(b.getAttribute('data-term'), 10);
        return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
      });
      rrows.forEach(function (r) { r.hidden = vis.indexOf(r) < 0; });
      vis.forEach(function (r) { tb.appendChild(r); });
      $('#rate-count').textContent = vis.length + (vis.length === 1 ? ' sample product shown' : ' sample products shown');
      $('#rate-wrap').hidden = vis.length === 0; $('#rate-empty').hidden = vis.length !== 0;
    };
    [t, tm, so].forEach(function (s) { s.addEventListener('change', applyRates); });
    $('#rate-filter').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#rate-reset').addEventListener('click', function () { t.value = 'all'; tm.value = 'all'; so.value = 'name'; applyRates(); t.focus(); });
    applyRates();
  }

  /* ---------- Mortgage calculators ---------- */
  var mort = $('#mort-form');
  if (mort) {
    mort.addEventListener('submit', function (e) {
      e.preventDefault();
      var price = num($('#mp-price').value), down = num($('#mp-down').value), rate = num($('#mp-rate').value), years = parseInt($('#mp-term').value, 10), errs = [];
      if (isNaN(price) || price <= 0 || price > 10000000) errs.push({ id: 'mp-price', msg: 'Home price must be a number between 1 and 10,000,000.' });
      if (isNaN(down) || down < 0) errs.push({ id: 'mp-down', msg: 'Down payment must be a number, 0 or more.' });
      else if (!isNaN(price) && down >= price) errs.push({ id: 'mp-down', msg: 'Down payment must be less than the home price.' });
      if (isNaN(rate) || rate < 0 || rate > 25) errs.push({ id: 'mp-rate', msg: 'Rate must be a number from 0 to 25.' });
      if (errs.length) { showErrors(mort, errs); return; }
      clearErrors(mort);
      var loan = price - down, n = years * 12, m = pmt(loan, rate, n), total = m * n, bal = loan, r = rate / 1200, rowsH = '';
      for (var y = 1; y <= Math.min(years, 5); y++) {
        var ip = 0, pp = 0;
        for (var k = 0; k < 12; k++) { var i = bal * r; var p = m - i; ip += i; pp += p; bal -= p; }
        rowsH += '<tr><th scope="row">Year ' + y + '</th><td class="num">' + money(pp) + '</td><td class="num">' + money(ip) + '</td><td class="num">' + money(Math.max(bal, 0)) + '</td></tr>';
      }
      showResult($('#mp-result'), '<p>Estimated monthly principal and interest</p><p class="big">' + money(m, 2) + '</p><p>Loan amount ' + money(loan) + '. Total interest ' + money(total - loan) + '. Total of payments ' + money(total) + '.</p>' +
        '<div class="table-wrap"><table><caption>First five years of the sample schedule</caption><thead><tr><th scope="col">Year</th><th scope="col" class="num">Principal paid</th><th scope="col" class="num">Interest paid</th><th scope="col" class="num">Ending balance</th></tr></thead><tbody>' + rowsH + '</tbody></table></div>' + SAMPLE);
    });
    $('#mp-reset').addEventListener('click', function () { setTimeout(function () { clearErrors(mort); $('#mp-result').hidden = true; }, 0); });
  }
  var cmp = $('#cmp-form');
  if (cmp) cmp.addEventListener('submit', function (e) {
    e.preventDefault();
    var amt = num($('#cp-amount').value), r30 = num($('#cp-r30').value), r15 = num($('#cp-r15').value), errs = [];
    if (isNaN(amt) || amt <= 0 || amt > 10000000) errs.push({ id: 'cp-amount', msg: 'Loan amount must be a number between 1 and 10,000,000.' });
    if (isNaN(r30) || r30 < 0 || r30 > 25) errs.push({ id: 'cp-r30', msg: '30-year rate must be a number from 0 to 25.' });
    if (isNaN(r15) || r15 < 0 || r15 > 25) errs.push({ id: 'cp-r15', msg: '15-year rate must be a number from 0 to 25.' });
    if (errs.length) { showErrors(cmp, errs); return; }
    clearErrors(cmp);
    var m30 = pmt(amt, r30, 360), m15 = pmt(amt, r15, 180), i30 = m30 * 360 - amt, i15 = m15 * 180 - amt;
    showResult($('#cp-result'), '<div class="table-wrap"><table><caption>Sample comparison on ' + money(amt) + '</caption><thead><tr><th scope="col">Term</th><th scope="col" class="num">Monthly payment</th><th scope="col" class="num">Total interest</th></tr></thead><tbody><tr><th scope="row">30 years</th><td class="num">' + money(m30, 2) + '</td><td class="num">' + money(i30) + '</td></tr><tr><th scope="row">15 years</th><td class="num">' + money(m15, 2) + '</td><td class="num">' + money(i15) + '</td></tr></tbody></table></div><p>In this sample, the shorter term has a monthly payment ' + money(m15 - m30, 2) + ' different and total interest ' + money(i30 - i15) + ' lower.</p>' + SAMPLE);
  });

  /* ---------- Personal loan calculator ---------- */
  var loan = $('#loan-form');
  if (loan) {
    $('#pl-tier').addEventListener('change', function () { $('#pl-rate').value = $('#pl-tier').value; });
    loan.addEventListener('submit', function (e) {
      e.preventDefault();
      var amt = num($('#pl-amount').value), rate = num($('#pl-rate').value), n = parseInt($('#pl-term').value, 10), errs = [];
      if (isNaN(amt) || amt < 1000 || amt > 100000) errs.push({ id: 'pl-amount', msg: 'Loan amount must be a number from 1,000 to 100,000.' });
      if (isNaN(rate) || rate < 0 || rate > 36) errs.push({ id: 'pl-rate', msg: 'Rate must be a number from 0 to 36.' });
      if (errs.length) { showErrors(loan, errs); return; }
      clearErrors(loan);
      var m = pmt(amt, rate, n);
      showResult($('#pl-result'), '<p>Estimated monthly payment</p><p class="big">' + money(m, 2) + '</p><p>Over ' + n + ' months: total interest ' + money(m * n - amt) + ', total of payments ' + money(m * n) + '.</p>' + SAMPLE);
    });
  }

  /* ---------- FAQ search ---------- */
  var faqForm = $('#faq-form');
  if (faqForm) {
    var faqs = $$('#faq-list .acc');
    var applyFaq = function () {
      var q = $('#faq-q').value.trim().toLowerCase(), topic = $('#faq-topic').value, words = q.split(/\s+/).filter(Boolean), n = 0;
      faqs.forEach(function (a) {
        var txt = a.textContent.toLowerCase();
        var ok = (topic === 'all' || a.getAttribute('data-topic') === topic) && words.every(function (w) { return txt.indexOf(w) >= 0; });
        a.hidden = !ok; if (ok) n++;
      });
      $('#faq-count').textContent = n + (n === 1 ? ' help topic shown' : ' help topics shown');
      $('#faq-empty').hidden = n !== 0;
    };
    $('#faq-q').addEventListener('input', applyFaq); $('#faq-topic').addEventListener('change', applyFaq);
    faqForm.addEventListener('submit', function (e) { e.preventDefault(); applyFaq(); });
    $('#faq-reset').addEventListener('click', function () { $('#faq-q').value = ''; $('#faq-topic').value = 'all'; applyFaq(); $('#faq-q').focus(); });
    applyFaq();
  }

  /* ---------- Education chips ---------- */
  var chips = $$('[data-topic-chip]');
  if (chips.length) {
    var arts = $$('#edu-grid article');
    var applyEdu = function (t) {
      var n = 0;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-topic-chip') === t ? 'true' : 'false'); });
      arts.forEach(function (a) { var ok = t === 'all' || a.getAttribute('data-topic') === t; a.hidden = !ok; if (ok) n++; });
      $('#edu-count').textContent = n + (n === 1 ? ' summary shown' : ' summaries shown');
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { applyEdu(c.getAttribute('data-topic-chip')); }); });
    applyEdu('all');
  }

  /* ---------- Locator ---------- */
  var LOCS = [
    ['Cedar Hollow Main Branch', 'Branch', '412 Example Avenue', 'Cedar Hollow', '00101', '555-0101', 1, 0, 1, 1],
    ['Cedar Hollow Market ATM', 'ATM', '88 Sample Street', 'Cedar Hollow', '00101', '', 1, 1, 0, 1],
    ['Brookmere Branch', 'Branch', '17 Placeholder Road', 'Brookmere', '00102', '555-0102', 0, 1, 1, 1],
    ['Brookmere Station ATM', 'ATM', '2 Rail Plaza', 'Brookmere', '00102', '', 1, 0, 0, 1],
    ['Ashport Harbor Branch', 'Branch', '300 Dockside Lane', 'Ashport', '00103', '555-0103', 0, 0, 1, 0],
    ['Ashport Ferry ATM', 'ATM', '5 Ferry Row', 'Ashport', '00103', '', 1, 0, 0, 0],
    ['Lindenfield Branch', 'Branch', '61 Orchard Way', 'Lindenfield', '00104', '555-0104', 0, 1, 1, 1],
    ['Lindenfield Mall ATM', 'ATM', '900 Mallway', 'Lindenfield', '00104', '', 0, 0, 0, 1],
    ['Quarry Bend Branch', 'Branch', '12 Stonecutter Drive', 'Quarry Bend', '00105', '555-0105', 0, 1, 0, 1],
    ['Quarry Bend Drive-up ATM', 'ATM', '14 Stonecutter Drive', 'Quarry Bend', '00105', '', 1, 1, 0, 0],
    ['Marlow Bay Branch', 'Branch', '700 Seaview Boulevard', 'Marlow Bay', '00106', '555-0106', 0, 0, 1, 1],
    ['Marlow Bay Pier ATM', 'ATM', '1 Pier Walk', 'Marlow Bay', '00106', '', 1, 0, 0, 0],
    ['Fenwick Branch', 'Branch', '45 Meadow Court', 'Fenwick', '00107', '555-0107', 0, 1, 0, 1],
    ['Fenwick Clinic ATM', 'ATM', '8 Care Circle', 'Fenwick', '00107', '', 1, 0, 0, 1],
    ['Tamsin Park Branch', 'Branch', '230 Parkside Avenue', 'Tamsin Park', '00108', '555-0108', 0, 0, 1, 1],
    ['Tamsin Park Campus ATM', 'ATM', '1 University Green', 'Tamsin Park', '00108', '', 1, 0, 0, 1],
    ['Redwater Branch', 'Branch', '19 Mill Street', 'Redwater', '00109', '555-0109', 0, 1, 1, 0],
    ['Redwater Bridge ATM', 'ATM', '3 Bridge Approach', 'Redwater', '00109', '', 0, 1, 0, 0],
    ['Hollis Crossing Branch', 'Branch', '505 Crossing Road', 'Hollis Crossing', '00110', '555-0110', 0, 1, 1, 1],
    ['Hollis Crossing Gas Stop ATM', 'ATM', '77 Highway Spur', 'Hollis Crossing', '00110', '', 1, 1, 0, 0],
    ['Pinecrest Branch', 'Branch', '29 Alpine Terrace', 'Pinecrest', '00111', '555-0111', 0, 0, 0, 1],
    ['Pinecrest Lodge ATM', 'ATM', '4 Summit Trail', 'Pinecrest', '00111', '', 1, 0, 0, 1],
    ['Owlsgate Branch', 'Branch', '120 Lantern Street', 'Owlsgate', '00112', '555-0112', 0, 1, 1, 1],
    ['Owlsgate Library ATM', 'ATM', '6 Reading Row', 'Owlsgate', '00112', '', 0, 0, 0, 1],
    ['Sunvale Branch', 'Branch', '850 Citrus Avenue', 'Sunvale', '00113', '555-0113', 0, 1, 1, 1],
    ['Sunvale Airfield ATM', 'ATM', 'Terminal Drive', 'Sunvale', '00113', '', 1, 0, 0, 1],
    ['Eastbarrow Branch', 'Branch', '33 Hill Road', 'Eastbarrow', '00114', '555-0114', 0, 0, 0, 0],
    ['Eastbarrow Square ATM', 'ATM', '10 Market Square', 'Eastbarrow', '00114', '', 1, 0, 0, 0],
    ['Westmere Branch', 'Branch', '2 Lakeshore Plaza', 'Westmere', '00115', '555-0115', 0, 1, 1, 1],
    ['Westmere Lakeside ATM', 'ATM', '9 Boardwalk', 'Westmere', '00115', '', 1, 0, 0, 1]
  ];
  var locList = $('#loc-list');
  if (locList) {
    var locForm = $('#loc-form');
    var recs = LOCS.map(function (r) {
      return { name: r[0], type: r[1], addr: r[2], city: r[3], zip: r[4], phone: r[5], open24: !!r[6], drive: !!r[7], sat: !!r[8], step: !!r[9] };
    });
    var hoursOf = function (r) { return r.type === 'ATM' ? (r.open24 ? 'Open 24 hours' : 'Hours: 6 a.m. to 10 p.m.') : 'Mon to Fri 9 a.m. to 5 p.m.' + (r.sat ? '; Sat 9 a.m. to 1 p.m.' : '; closed Sat'); };
    var renderLocs = function (list) {
      locList.innerHTML = '';
      list.forEach(function (r) {
        var li = document.createElement('li'); li.setAttribute('data-component', 'location-result');
        var tags = [r.type]; if (r.open24) tags.push('Open 24 hours'); if (r.drive) tags.push('Drive-up'); if (r.sat) tags.push('Saturday hours'); if (r.step) tags.push('Step-free entrance');
        li.innerHTML = '<h2 style="font-size:1.1rem"></h2><p class="addr"></p><p class="hrs"></p><p class="tags"></p>';
        $('h2', li).textContent = r.name;
        $('.addr', li).textContent = r.addr + ', ' + r.city + ' ' + r.zip + (r.phone ? ' | ' + r.phone : '');
        $('.hrs', li).textContent = hoursOf(r);
        tags.forEach(function (t) { var s = document.createElement('span'); s.className = 'tag'; s.textContent = t; $('.tags', li).appendChild(s); });
        locList.appendChild(li);
      });
    };
    var runLocs = function (fromSubmit) {
      var q = $('#loc-q').value.trim().toLowerCase();
      clearErrors(locForm);
      if (/^\d+$/.test(q) && q.length !== 5) {
        if (fromSubmit) { showErrors(locForm, [{ id: 'loc-q', msg: 'Postal codes in this sample have exactly 5 digits, for example 00101.' }]); }
        locList.innerHTML = ''; $('#loc-count').textContent = 'Enter a complete postal code to search.'; $('#loc-empty').hidden = true;
        return;
      }
      var type = $('#loc-type').value, svc = $$('input[name=svc]:checked', locForm).map(function (c) { return c.value; });
      var out = recs.filter(function (r) {
        if (type !== 'all' && r.type !== type) return false;
        if (!svc.every(function (s) { return r[s]; })) return false;
        return !q || (r.name + ' ' + r.city + ' ' + r.zip + ' ' + r.addr).toLowerCase().indexOf(q) >= 0;
      });
      out.sort(function (a, b) { var k = $('#loc-sort').value === 'city' ? 'city' : 'name'; return a[k].localeCompare(b[k]) || a.name.localeCompare(b.name); });
      renderLocs(out);
      $('#loc-count').textContent = out.length + (out.length === 1 ? ' fictional location shown' : ' fictional locations shown') + ' of ' + recs.length;
      $('#loc-empty').hidden = out.length !== 0;
    };
    var resetLocs = function () { locForm.reset(); runLocs(false); $('#loc-q').focus(); };
    locForm.addEventListener('submit', function (e) { e.preventDefault(); runLocs(true); });
    $('#loc-q').addEventListener('input', function () { runLocs(false); });
    $$('select,input[name=svc]', locForm).forEach(function (c) { c.addEventListener('change', function () { runLocs(false); }); });
    $('#loc-reset').addEventListener('click', resetLocs);
    $('#loc-empty-reset').addEventListener('click', resetLocs);
    runLocs(false);
  }

  /* ---------- Site search ---------- */
  var INDEX = [
    ['Home', 'index.html', 'Personal banking overview with sample offers', 'home banking offers'],
    ['Checking accounts', 'checking.html', 'Compare three fictional checking accounts', 'checking debit overdraft fee monthly'],
    ['Savings accounts', 'savings.html', 'Sample savings and money market yields', 'savings money market apy yield interest'],
    ['Certificates of deposit', 'cds.html', 'Sample CD yields and maturity estimator', 'cd certificate deposit term maturity'],
    ['Credit cards', 'credit-cards.html', 'Filter six fictional credit cards', 'credit card cash back travel annual fee apr rewards'],
    ['Mortgage loans', 'mortgage.html', 'Overview of fictional home loans', 'mortgage home refinance equity'],
    ['Sample mortgage rates', 'mortgage-rates.html', 'Filter and sort a fictional rate table', 'mortgage rates apr fixed adjustable'],
    ['Mortgage calculators', 'mortgage-calculators.html', 'Monthly payment and 15 versus 30 year comparison', 'calculator payment amortization compare'],
    ['Personal loan calculator', 'personal-loan-calculator.html', 'Estimate a personal loan payment', 'loan personal calculator debt consolidation payment'],
    ['Customer service', 'customer-service.html', 'Search help topics and contact options', 'help support faq contact phone'],
    ['Mobile and online banking', 'online-banking.html', 'Digital features, demo log in and enroll', 'online mobile app login enroll alerts'],
    ['Accessibility services', 'accessibility.html', 'Sample support for customers with disabilities', 'accessibility accessible braille large print'],
    ['Financial education', 'financial-education.html', 'General-education summaries by topic', 'education learn credit saving security'],
    ['Branch and ATM locator', 'locations.html', 'Search 30 fictional branches and ATMs', 'branch atm location find near hours']
  ];
  var ART_IDX = [
    ['Thinking about an emergency cushion', 'how-much-cushion'], ['Savings buckets explained', 'savings-buckets'], ['What a CD ladder is', 'cd-ladder-basics'],
    ['How credit reports work, in general terms', 'credit-basics'], ['Reading a card statement', 'card-statements'], ['Balances and available credit', 'utilization'],
    ['Mortgage vocabulary', 'mortgage-vocab'], ['What closing costs can include', 'closing-costs'], ['Comparing loan offers', 'loan-comparison'],
    ['Two ways people organize debt payoff', 'debt-payoff-methods'], ['Common signs of a phishing message', 'phishing-signs'], ['Choosing passcodes you can manage', 'strong-passcodes']
  ];
  ART_IDX.forEach(function (a) { INDEX.push([a[0], 'financial-education.html#article-' + a[1], 'Education summary', 'article education ' + a[0].toLowerCase()]); });
  var ssForm = $('#search-form');
  if (ssForm) {
    var runSearch = function (q) {
      var words = q.toLowerCase().split(/\s+/).filter(Boolean), list = $('#ss-list');
      list.innerHTML = '';
      var res = INDEX.filter(function (r) { var t = (r[0] + ' ' + r[2] + ' ' + r[3]).toLowerCase(); return words.every(function (w) { return t.indexOf(w) >= 0; }); });
      res.forEach(function (r) {
        var li = document.createElement('li'), a = document.createElement('a'), p = document.createElement('p');
        li.setAttribute('data-component', 'search-result');
        a.href = r[1]; a.textContent = r[0]; p.textContent = r[2]; p.style.margin = '0';
        li.appendChild(a); li.appendChild(p); list.appendChild(li);
      });
      $('#ss-count').textContent = res.length + (res.length === 1 ? ' result' : ' results') + ' for "' + q + '"';
      $('#ss-empty').hidden = res.length !== 0;
    };
    var params = new URLSearchParams(location.search), initial = (params.get('q') || '').trim();
    if (initial) { $('#ss-q').value = initial; runSearch(initial); }
    ssForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = $('#ss-q').value.trim();
      if (!q) { showErrors(ssForm, [{ id: 'ss-q', msg: 'Enter a word to search for.' }]); $('#ss-list').innerHTML = ''; $('#ss-count').textContent = ''; $('#ss-empty').hidden = true; return; }
      clearErrors(ssForm); runSearch(q);
    });
  }
})();
