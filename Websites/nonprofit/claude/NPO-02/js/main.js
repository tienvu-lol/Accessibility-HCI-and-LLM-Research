/* Larkfield Region Food Bank (fictional demo site) - shared behavior. Vanilla JS, no network use. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- inline demo data ---------- */
  var PAGES = [
    ['index.html', 'Home', 'Good food today, stronger neighbors tomorrow', 'food bank hunger home'],
    ['hunger.html', 'Hunger in Our Region', 'Food insecurity by county, who is affected and why', 'hunger county rate food insecurity statistics'],
    ['what-we-do.html', 'What We Do', 'Distribution, partnerships, advocacy, nutrition and gardens', 'programs advocacy nutrition farms gardening partnerships'],
    ['distribution.html', 'Direct Food Distribution', 'Mobile markets, senior boxes, weekend packs and campus pantries', 'mobile market senior box kids weekend pantry campus'],
    ['impact.html', 'Our Impact', 'Meals, households and volunteer hours by fiscal year', 'impact meals households volunteers report'],
    ['how-to-help.html', 'How To Help', 'Ways to give: donate, fundraise, corporate and workplace giving', 'give fundraise corporate workplace giving ways to help'],
    ['donate-food.html', 'Donate Food', 'What to bring, what to skip and where to drop it off', 'food drive drop-off canned items donate food'],
    ['donate.html', 'Donate', 'Demo gift form with amount and frequency', 'donate gift monthly one-time money'],
    ['volunteer.html', 'Volunteer', 'Pick a shift and sign up (demo)', 'volunteer shift warehouse sorting packing'],
    ['events.html', 'Events and Campaigns', 'Upcoming drives, conferences and fundraisers', 'events campaigns calendar drive conference'],
    ['blog.html', 'Blog', 'Neighbor stories and news from the food bank', 'blog stories news neighbors'],
    ['partners.html', 'Partners', 'Pantries, kitchens and agencies we work with', 'partners pantry kitchen agency'],
    ['get-help.html', 'Get Help', 'Find food assistance near you by ZIP code, day and type', 'get help find food pantry assistance zip'],
    ['contact.html', 'Contact', 'Message the team (demo form)', 'contact email phone address'],
    ['sign-up.html', 'Email Sign Up', 'Monthly updates and action alerts (demo form)', 'newsletter email sign up']
  ];
  var SITES = [
    { name: 'Orchard Lane Community Pantry', city: 'Millbrook', zip: '20101', type: 'pantry', days: ['Mon', 'Wed', 'Fri'], hours: '10:00 am - 2:00 pm', addr: '112 Orchard Lane' },
    { name: 'St. Brigid Parish Food Shelf', city: 'Millbrook', zip: '20104', type: 'pantry', days: ['Tue', 'Thu'], hours: '9:00 am - 12:00 pm', addr: '40 Chapel Street' },
    { name: 'Riverside Mobile Market', city: 'Harbor City', zip: '20210', type: 'mobile-market', days: ['Sat'], hours: '8:30 am - 11:30 am', addr: 'Riverside Plaza lot B' },
    { name: 'Eastfield Library Mobile Market', city: 'Eastfield', zip: '20315', type: 'mobile-market', days: ['Wed'], hours: '4:00 pm - 6:30 pm', addr: '7 Library Row' },
    { name: 'Harbor City Neighbors Pantry', city: 'Harbor City', zip: '20212', type: 'pantry', days: ['Mon', 'Tue', 'Thu', 'Sat'], hours: '11:00 am - 3:00 pm', addr: '905 Dockside Avenue' },
    { name: 'Cedar Hollow Senior Center Boxes', city: 'Cedar Hollow', zip: '20422', type: 'senior-box', days: ['Fri'], hours: '1:00 pm - 3:00 pm', addr: '18 Maple Court' },
    { name: 'Westmere Senior Box Pickup', city: 'Westmere', zip: '20530', type: 'senior-box', days: ['Tue'], hours: '10:00 am - 12:00 pm', addr: '260 Linden Road' },
    { name: 'Pinecrest Hot Meals Kitchen', city: 'Pinecrest', zip: '20644', type: 'ready-meals', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], hours: '5:00 pm - 6:30 pm', addr: '3 Station Street' },
    { name: 'Eastfield Community Fridge', city: 'Eastfield', zip: '20317', type: 'pantry', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], hours: 'Open daily, 7:00 am - 9:00 pm', addr: '55 Quarry Street' },
    { name: 'Westmere High School Pantry', city: 'Westmere', zip: '20532', type: 'pantry', days: ['Thu'], hours: '3:30 pm - 5:30 pm', addr: '1 School Way' },
    { name: 'Cedar Hollow Saturday Market', city: 'Cedar Hollow', zip: '20425', type: 'mobile-market', days: ['Sat'], hours: '9:00 am - 12:00 pm', addr: 'Town Green' },
    { name: 'Pinecrest Family Pantry', city: 'Pinecrest', zip: '20641', type: 'pantry', days: ['Wed', 'Fri'], hours: '12:00 pm - 4:00 pm', addr: '88 Birch Avenue' },
    { name: 'Harbor City Senior Meals Pickup', city: 'Harbor City', zip: '20215', type: 'ready-meals', days: ['Mon', 'Wed', 'Fri'], hours: '11:30 am - 1:00 pm', addr: '12 Anchor Street' },
    { name: 'Millbrook Sunday Supper', city: 'Millbrook', zip: '20102', type: 'ready-meals', days: ['Sun'], hours: '4:00 pm - 6:00 pm', addr: '21 Mill Road' }
  ];
  var TYPE_LABEL = { 'pantry': 'Food pantry', 'mobile-market': 'Mobile market', 'senior-box': 'Senior box pickup', 'ready-meals': 'Ready-to-eat meals' };
  var YEARS = {
    '2025': { meals: '24.6 million', households: '88,500', pantries: '186', hours: '71,400', fresh: '38%' },
    '2024': { meals: '22.1 million', households: '83,200', pantries: '174', hours: '66,900', fresh: '35%' },
    '2023': { meals: '19.8 million', households: '77,900', pantries: '161', hours: '60,200', fresh: '31%' }
  };

  /* ---------- primary navigation ---------- */
  var nav = $('#primary-nav'), menuBtn = $('.menu-toggle');
  var subToggles = $$('.nav-toggle');
  function closeSubs(except) {
    subToggles.forEach(function (t) {
      if (t === except) return;
      t.setAttribute('aria-expanded', 'false');
      document.getElementById(t.getAttribute('aria-controls')).hidden = true;
    });
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      if (!open) closeSubs();
    });
  }
  subToggles.forEach(function (t) {
    t.addEventListener('click', function () {
      var open = t.getAttribute('aria-expanded') !== 'true';
      closeSubs(t);
      t.setAttribute('aria-expanded', String(open));
      document.getElementById(t.getAttribute('aria-controls')).hidden = !open;
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openToggle = subToggles.filter(function (t) { return t.getAttribute('aria-expanded') === 'true'; })[0];
    if (openToggle) { closeSubs(); openToggle.focus(); }
    else if (nav && nav.classList.contains('is-open') && menuBtn.offsetParent !== null) {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });
  document.addEventListener('click', function (e) { if (nav && !nav.contains(e.target)) closeSubs(); });
  if (nav) nav.addEventListener('focusout', function (e) { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeSubs(); });

  /* ---------- site search dialog ---------- */
  var dlg = $('#site-search');
  if (dlg) {
    var sInput = $('input', dlg), sList = $('.search-results', dlg), sStatus = $('[role="status"]', dlg);
    var renderSearch = function () {
      var terms = sInput.value.toLowerCase().split(/\s+/).filter(Boolean);
      sList.innerHTML = '';
      if (!terms.length) { sStatus.textContent = 'Type a word to search the ' + PAGES.length + ' pages of this demo site.'; return; }
      var hits = PAGES.filter(function (p) { var hay = p.slice(1).join(' ').toLowerCase(); return terms.every(function (t) { return hay.indexOf(t) > -1; }); });
      hits.forEach(function (p) {
        var li = document.createElement('li'), a = document.createElement('a'), s = document.createElement('span');
        a.href = p[0]; a.textContent = p[1]; s.textContent = p[2];
        li.append(a, s); sList.append(li);
      });
      sStatus.textContent = hits.length ? hits.length + (hits.length === 1 ? ' page matches' : ' pages match') + ' “' + sInput.value.trim() + '”.' : 'No pages match “' + sInput.value.trim() + '”. Try a shorter word such as “volunteer” or “pantry”.';
    };
    $$('[data-open-search]').forEach(function (b) {
      b.addEventListener('click', function () { dlg.showModal(); sInput.focus(); renderSearch(); });
    });
    $('[data-close-dialog]', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    $('form', dlg).addEventListener('submit', function (e) { e.preventDefault(); renderSearch(); });
    sInput.addEventListener('input', renderSearch);
    // type=search clears its text on Escape before the dialog sees it; close in one press instead
    sInput.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); dlg.close(); } });
  }

  /* ---------- disclosure buttons (accordions, read more) ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-toggle]');
    if (!b) return;
    var open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    document.getElementById(b.dataset.toggle).hidden = !open;
    if (b.dataset.labelOpen) b.textContent = open ? b.dataset.labelOpen : b.dataset.labelClosed;
  });
  if (location.hash.length > 1) {
    var hashTarget = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    var hashBtn = hashTarget && (hashTarget.matches('[data-toggle]') ? hashTarget : $('[data-toggle]', hashTarget));
    if (hashBtn && hashBtn.getAttribute('aria-expanded') !== 'true') hashBtn.click();
  }

  /* ---------- generic text/select filter lists ---------- */
  $$('[data-filter-list]').forEach(function (root) {
    var items = $$('[data-filter-item]', root), text = $('[data-filter-text]', root);
    var selects = $$('[data-filter-attr]', root), count = $('[data-filter-count]', root), empty = $('[data-filter-empty]', root);
    var run = function () {
      var q = text ? text.value.trim().toLowerCase() : '', n = 0;
      items.forEach(function (it) {
        var ok = (!q || it.textContent.toLowerCase().indexOf(q) > -1) && selects.every(function (s) {
          return !s.value || (it.dataset[s.dataset.filterAttr] || '').split(' ').indexOf(s.value) > -1;
        });
        it.hidden = !ok;
        if (ok) n++;
      });
      count.textContent = 'Showing ' + n + ' of ' + items.length + ' ' + root.dataset.filterNoun;
      empty.hidden = n > 0;
    };
    root.addEventListener('input', run);
    $('[data-filter-reset]', root).addEventListener('click', function () {
      if (text) text.value = '';
      selects.forEach(function (s) { s.value = ''; });
      run();
      (text || selects[0]).focus();
    });
    run();
  });

  /* ---------- sortable table ---------- */
  $$('table[data-sortable]').forEach(function (t) {
    var body = t.tBodies[0], status = $('[data-sort-status]');
    $$('th[data-sort]', t).forEach(function (th) {
      $('button', th).addEventListener('click', function () {
        var dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
        $$('th[aria-sort]', t).forEach(function (o) { o.removeAttribute('aria-sort'); });
        th.setAttribute('aria-sort', dir);
        var i = th.cellIndex, num = th.dataset.sort === 'number', sign = dir === 'ascending' ? 1 : -1;
        var val = function (r) { return r.cells[i].dataset.value || r.cells[i].textContent.trim(); };
        Array.prototype.slice.call(body.rows).sort(function (a, b) {
          return (num ? val(a) - val(b) : val(a).localeCompare(val(b))) * sign;
        }).forEach(function (r) { body.append(r); });
        status.textContent = 'Table sorted by ' + th.textContent.trim() + ', ' + dir + '.';
      });
    });
  });

  /* ---------- form validation with error summary, inline errors, focus management ---------- */
  function errBox(el) { return el.closest('.field, fieldset'); }
  function setError(el, msg) {
    var err = $('.field-error', errBox(el));
    if (!err) return; // optional selects that can never be invalid carry no error slot
    err.textContent = msg ? 'Error: ' + msg : '';
    err.hidden = !msg;
    if (el.dataset.base === undefined) el.dataset.base = el.getAttribute('aria-describedby') || '';
    var ids = (el.dataset.base + (msg ? ' ' + err.id : '')).trim();
    if (ids) el.setAttribute('aria-describedby', ids); else el.removeAttribute('aria-describedby');
    if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  }
  function fieldMessage(el) {
    if (!el.willValidate || el.validity.valid) return '';
    return el.validity.valueMissing ? (el.dataset.msgMissing || el.dataset.label + ' is required.') : (el.dataset.msgInvalid || 'Enter a valid ' + el.dataset.label.toLowerCase() + '.');
  }
  function groupMessage(fs) { return fs.querySelector('input:checked') ? '' : fs.dataset.msgMissing; }
  function checkOne(el) {
    var fs = el.closest('[data-require-one]');
    if (fs) { var first = $('input', fs), g = groupMessage(fs); setError(first, g); return g ? [first, g] : null; }
    if (el.type === 'radio') el = $('input[type="radio"][name="' + el.name + '"]', el.form);
    var m = fieldMessage(el);
    setError(el, m);
    return m ? [el, m] : null;
  }
  function validateForm(form) {
    var seen = {}, errs = [];
    $$('input, select, textarea', form).forEach(function (el) {
      var key = el.closest('[data-require-one]') ? 'g:' + el.closest('[data-require-one]').id : el.type === 'radio' ? 'r:' + el.name : el.id;
      if (seen[key]) return;
      seen[key] = 1;
      var r = checkOne(el);
      if (r) errs.push(r);
    });
    return errs;
  }
  $$('form[data-validate]').forEach(function (form) {
    var summary = $('.error-summary', form), success = form.dataset.successId && document.getElementById(form.dataset.successId);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = validateForm(form);
      if (errs.length) {
        var list = $('ul', summary);
        list.innerHTML = '';
        errs.forEach(function (r) {
          var li = document.createElement('li'), a = document.createElement('a');
          a.href = '#' + r[0].id; a.textContent = r[1];
          a.addEventListener('click', function (ev) { ev.preventDefault(); r[0].focus(); });
          li.append(a); list.append(li);
        });
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;
      form.dispatchEvent(new CustomEvent('valid-submit'));
      if (success) {
        form.hidden = true;
        success.hidden = false;
        success.focus();
      }
    });
    form.addEventListener('input', function (e) {
      var box = errBox(e.target);
      if (box && $('.field-error:not([hidden])', box)) checkOne(e.target);
      if (!$('.field-error:not([hidden])', form)) summary.hidden = true;
    });
    if (success) {
      $('[data-demo-reset]', success).addEventListener('click', function () {
        form.reset();
        form.dispatchEvent(new Event('reset-form'));
        success.hidden = true;
        form.hidden = false;
        $('input, select, textarea', form).focus();
      });
    }
  });

  /* ---------- contact: preselect topic from ?topic= ---------- */
  var topic = $('#contact-topic');
  if (topic) {
    var wanted = new URLSearchParams(location.search).get('topic');
    if (wanted && $('option[value="' + wanted.replace(/[^\w-]/g, '') + '"]', topic)) topic.value = wanted;
  }

  /* ---------- donate form (simulation only) ---------- */
  var gift = $('#donate-form');
  if (gift) {
    var other = $('#gift-other'), out = $('#gift-summary');
    var MEALS_PER_DOLLAR = 3; // illustrative ratio for this fictional site
    var refreshGift = function () {
      var choice = $('input[name="amount"]:checked', gift), isOther = choice && choice.value === 'other';
      other.disabled = !isOther;
      other.required = isOther;
      if (!isOther) { other.value = ''; setError(other, ''); }
      var amt = isOther ? Number(other.value) : choice ? Number(choice.value) : 0;
      var freq = $('input[name="frequency"]:checked', gift);
      out.textContent = amt > 0 && freq ? 'Your demo gift: $' + amt.toLocaleString('en-US') + (freq.value === 'monthly' ? ' every month' : ' one time') + ', about ' + Math.round(amt * MEALS_PER_DOLLAR).toLocaleString('en-US') + ' meals (illustrative ratio). Nothing will be charged.' : 'Choose an amount to see an example of what it could provide.';
    };
    gift.addEventListener('input', refreshGift);
    gift.addEventListener('reset-form', refreshGift);
    refreshGift();
  }

  /* ---------- impact: fiscal year selector ---------- */
  var fy = $('#impact-year');
  if (fy) {
    fy.addEventListener('change', function () {
      var d = YEARS[fy.value];
      $$('[data-stat]').forEach(function (el) { el.textContent = d[el.dataset.stat]; });
      $('#impact-year-status').textContent = 'Showing fiscal year ' + fy.value + ' sample figures.';
    });
  }

  /* ---------- get help: food assistance finder ---------- */
  var finder = $('#finder-form');
  if (finder) {
    var results = $('#finder-results'), fCount = $('#finder-count'), fEmpty = $('#finder-empty');
    var renderSites = function () {
      var zip = $('#finder-zip').value.trim(), day = $('#finder-day').value, type = $('#finder-type').value;
      var list = SITES.filter(function (s) { return (!day || s.days.indexOf(day) > -1) && (!type || s.type === type); });
      if (/^\d{5}$/.test(zip)) list.sort(function (a, b) { return Math.abs(a.zip - zip) - Math.abs(b.zip - zip); });
      else list.sort(function (a, b) { return a.name.localeCompare(b.name); });
      results.innerHTML = list.map(function (s) {
        return '<li class="card" data-component="location-card"><span class="tag">' + TYPE_LABEL[s.type] + '</span><h3>' + s.name + '</h3><p class="meta">' + s.addr + ', ' + s.city + ' ' + s.zip + '</p><p><strong>Days:</strong> ' + s.days.join(', ') + '<br><strong>Hours:</strong> ' + s.hours + '</p></li>';
      }).join('');
      fCount.textContent = list.length + (list.length === 1 ? ' sample location' : ' sample locations') + (/^\d{5}$/.test(zip) ? ' listed by closest ZIP code number (demo approximation).' : ' listed alphabetically.');
      fEmpty.hidden = list.length > 0;
    };
    finder.addEventListener('valid-submit', renderSites);
    $('#finder-reset').addEventListener('click', function () {
      finder.reset();
      setError($('#finder-zip'), '');
      $('.error-summary', finder).hidden = true;
      renderSites();
      $('#finder-zip').focus();
    });
    renderSites();
  }
})();
