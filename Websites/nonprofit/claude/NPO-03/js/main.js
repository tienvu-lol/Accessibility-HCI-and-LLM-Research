/* Hollowbrook Animal Alliance - fictional research replica. Vanilla JS, no network use. All data below is invented sample data. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var params = new URLSearchParams(location.search);

  /* ---------- Sample data ---------- */
  var ANIMALS = [
    { id: 'juniper', name: 'Juniper', species: 'Dog', breed: 'Shepherd mix', age: 'Adult', size: 'Large', kids: true, city: 'Port Larkin', blurb: 'Gentle walker who loves fetch and quiet evenings.' },
    { id: 'pickle', name: 'Pickle', species: 'Cat', breed: 'Domestic shorthair', age: 'Young', size: 'Small', kids: true, city: 'Sunvale', blurb: 'Curious climber who will supervise every household project.' },
    { id: 'biscuit', name: 'Biscuit', species: 'Dog', breed: 'Beagle mix', age: 'Senior', size: 'Medium', kids: true, city: 'Cedar Reach', blurb: 'Calm senior who is happiest on a sunny porch.' },
    { id: 'clover', name: 'Clover', species: 'Rabbit', breed: 'Lop-eared rabbit', age: 'Young', size: 'Small', kids: false, city: 'Ashgrove', blurb: 'Shy at first, then a champion binky-jumper.' },
    { id: 'mochi', name: 'Mochi', species: 'Cat', breed: 'Tabby', age: 'Adult', size: 'Small', kids: false, city: 'Port Larkin', blurb: 'Prefers a calm home with no other pets.' },
    { id: 'tucker', name: 'Tucker', species: 'Dog', breed: 'Terrier mix', age: 'Young', size: 'Small', kids: true, city: 'Prairie Fork', blurb: 'Bouncy, clever and already learning to sit.' },
    { id: 'willow', name: 'Willow', species: 'Cat', breed: 'Long-haired tortoiseshell', age: 'Senior', size: 'Small', kids: true, city: 'Ashgrove', blurb: 'Affectionate lap cat with a loud purr.' },
    { id: 'bramble', name: 'Bramble', species: 'Rabbit', breed: 'Dutch rabbit', age: 'Adult', size: 'Small', kids: true, city: 'Sunvale', blurb: 'Bonded pair candidate; loves leafy greens.' },
    { id: 'ranger', name: 'Ranger', species: 'Dog', breed: 'Lab mix', age: 'Adult', size: 'Large', kids: true, city: 'Cedar Reach', blurb: 'Energetic hiking buddy who needs a fenced yard.' },
    { id: 'saffron', name: 'Saffron', species: 'Cat', breed: 'Orange tabby', age: 'Adult', size: 'Small', kids: true, city: 'Prairie Fork', blurb: 'Food-motivated charmer; excellent at greeting guests.' },
    { id: 'pepper', name: 'Pepper', species: 'Dog', breed: 'Hound mix', age: 'Young', size: 'Medium', kids: false, city: 'Port Larkin', blurb: 'Nose-driven adventurer who needs patient training.' },
    { id: 'hazel', name: 'Hazel', species: 'Rabbit', breed: 'Mixed-breed rabbit', age: 'Senior', size: 'Small', kids: true, city: 'Cedar Reach', blurb: 'Quiet companion who enjoys a daily cuddle.' }
  ];
  var NEWS = [
    { id: 'n1', title: 'Rescue team reunites 40 hoarding-case dogs with foster homes', date: '2026-11-03', topic: 'Rescue', summary: 'A multi-day response ended with every dog medically assessed and placed in foster care.' },
    { id: 'n2', title: 'County passes stronger penalties for neglect of working animals', date: '2026-10-27', topic: 'Policy', summary: 'Our advocates testified at three hearings before the final vote.' },
    { id: 'n3', title: 'Mobile clinic completes 1,000 sample spay and neuter visits', date: '2026-10-19', topic: 'Shelters', summary: 'The van now rotates between four neighborhoods every month.' },
    { id: 'n4', title: 'Seasonal checklist: keeping pets safe during holiday gatherings', date: '2026-10-12', topic: 'Pet care', summary: 'Decorations, rich foods and open doors are the three biggest risks we see.' },
    { id: 'n5', title: 'Volunteers repaint the Ashgrove adoption center', date: '2026-10-05', topic: 'Community', summary: 'Sixty neighbors gave up a Saturday to brighten the kennel hallway.' },
    { id: 'n6', title: 'Grant round funds new isolation rooms in five partner shelters', date: '2026-09-28', topic: 'Shelters', summary: 'The rooms help shelters keep sick animals apart from the general population.' },
    { id: 'n7', title: 'Farm-animal transport rule moves to public comment', date: '2026-09-21', topic: 'Policy', summary: 'We explain what the proposed rule would change and how to comment.' },
    { id: 'n8', title: 'Cold-weather horse care: what stable owners should check', date: '2026-09-14', topic: 'Pet care', summary: 'Water access, hoof checks and blanket fit matter most in the first frost.' },
    { id: 'n9', title: 'Cruelty investigators close the year\'s largest cockfighting case', date: '2026-09-07', topic: 'Rescue', summary: 'Evidence gathered by our field team supported local prosecutors.' },
    { id: 'n10', title: 'Pet-food pantry doubles its monthly distribution in Prairie Fork', date: '2026-08-30', topic: 'Community', summary: 'Families received enough food to keep more than 400 pets at home.' }
  ];
  var CITIES = [
    { slug: 'port-larkin', name: 'Port Larkin', blurb: 'Our flagship hub: a veterinary clinic, an adoption center and the rescue field office.', services: ['Veterinary clinic (low-cost)', 'Adoption center', 'Rescue field office', 'Behavior helpline'], stats: [['Animals helped this year', '18,400'], ['Adoptions', '2,150'], ['Clinic visits', '9,300']], hours: 'Adoption center: Tue-Sun, 10:00-18:00' },
    { slug: 'sunvale', name: 'Sunvale', blurb: 'Community outreach with a mobile clinic and a foster network.', services: ['Mobile spay and neuter clinic', 'Foster network', 'Pet-food pantry'], stats: [['Animals helped this year', '7,900'], ['Foster homes', '310'], ['Pantry meals', '52,000']], hours: 'Mobile clinic: see the monthly schedule on this page in a live site' },
    { slug: 'cedar-reach', name: 'Cedar Reach', blurb: 'Partnership hub supporting rural shelters and large-animal rescue.', services: ['Shelter partner grants', 'Large-animal rescue', 'Training for animal-control staff'], stats: [['Animals helped this year', '5,200'], ['Partner shelters', '14'], ['Responders trained', '260']], hours: 'Office: Mon-Fri, 09:00-17:00' },
    { slug: 'ashgrove', name: 'Ashgrove', blurb: 'Adoption center and volunteer-led enrichment programs for shelter pets.', services: ['Adoption center', 'Enrichment program', 'Senior pet fostering'], stats: [['Animals helped this year', '4,600'], ['Adoptions', '980'], ['Enrichment sessions', '1,700']], hours: 'Adoption center: Wed-Sun, 11:00-17:00' },
    { slug: 'prairie-fork', name: 'Prairie Fork', blurb: 'Pantry and wellness events keeping pets with the families who love them.', services: ['Pet-food pantry', 'Vaccination events', 'Humane education visits'], stats: [['Animals helped this year', '3,800'], ['Pantry meals', '61,000'], ['School visits', '75']], hours: 'Pantry: first and third Saturday, 09:00-13:00' }
  ];
  var HAZARDS = [
    { name: 'Chocolate', who: ['Dogs', 'Cats'], level: 'Moderate to severe', note: 'Dark and baking chocolate are the most concerning.' },
    { name: 'Xylitol (sugar-free sweetener)', who: ['Dogs'], level: 'Severe', note: 'Found in some gum, candy and baked goods.' },
    { name: 'Grapes and raisins', who: ['Dogs'], level: 'Severe', note: 'Even small amounts can be a problem for some dogs.' },
    { name: 'Lilies', who: ['Cats'], level: 'Severe', note: 'All parts of true lilies, including pollen and vase water.' },
    { name: 'Onions and garlic', who: ['Dogs', 'Cats'], level: 'Moderate', note: 'Raw, cooked and powdered forms all count.' },
    { name: 'Antifreeze', who: ['Dogs', 'Cats'], level: 'Severe', note: 'Sweet taste attracts animals; clean spills immediately.' },
    { name: 'Macadamia nuts', who: ['Dogs'], level: 'Moderate', note: 'Can cause weakness and vomiting.' },
    { name: 'Red maple leaves (wilted)', who: ['Horses'], level: 'Severe', note: 'Wilted or dried leaves are the risk; check paddock edges.' },
    { name: 'Rodent bait', who: ['Dogs', 'Cats', 'Horses'], level: 'Severe', note: 'Keep out of reach of every species, including secondary exposure.' },
    { name: 'Sago palm', who: ['Dogs', 'Cats'], level: 'Severe', note: 'Seeds are the most dangerous part.' }
  ];
  var CAMPAIGNS = [
    { id: 'c1', title: 'Support the working-animal protection bill', region: 'Sunvale County', summary: 'Ask your representative to back clearer rest and care standards for working animals.' },
    { id: 'c2', title: 'Close the puppy-sales loophole', region: 'National', summary: 'Urge lawmakers to require licensing for large online puppy sellers.' },
    { id: 'c3', title: 'Fund emergency pet shelters in disaster plans', region: 'National', summary: 'Pets are family: help ensure evacuation plans include them.' },
    { id: 'c4', title: 'Ban cosmetic testing on animals locally', region: 'Ashgrove', summary: 'Ask the city council to adopt a resolution supporting cruelty-free products.' },
    { id: 'c5', title: 'Expand low-cost spay and neuter vouchers', region: 'Cedar Reach', summary: 'Support the county budget line that funds vouchers for low-income households.' }
  ];
  var PAGES = [
    { title: 'Home', url: 'index.html', text: 'animal welfare charity donate advocate give monthly' },
    { title: 'About Us', url: 'about.html', text: 'mission history leadership impact privacy terms accessibility' },
    { title: 'Helping Shelters, People and Pets', url: 'helping-shelters.html', text: 'shelters grants scholarships partners spay neuter' },
    { title: 'Investigations and Rescue', url: 'investigations-rescue.html', text: 'cruelty investigations rescue field team disaster' },
    { title: 'Animal Care and Recovery', url: 'animal-care-recovery.html', text: 'veterinary clinic recovery rehabilitation behavior' },
    { title: 'Improving Laws for Animals', url: 'improving-laws.html', text: 'policy legislation lawmakers testimony' },
    { title: 'Adopt a Pet', url: 'adopt.html', text: 'adopt dog cat rabbit foster' },
    { title: 'Pet Care', url: 'pet-care.html', text: 'dog cat horse poison safety tips' },
    { title: 'Get Involved', url: 'get-involved.html', text: 'volunteer advocate donate fundraise' },
    { title: 'Advocacy Center', url: 'advocacy.html', text: 'campaigns contact lawmakers action' },
    { title: 'Ways to Give', url: 'ways-to-give.html', text: 'donate monthly gift tribute legacy matching' },
    { title: 'Donate', url: 'donate.html', text: 'gift amount monthly one-time' },
    { title: 'News', url: 'news.html', text: 'stories press updates' },
    { title: 'Local Initiatives', url: 'local-initiative.html', text: 'locations Port Larkin Sunvale Cedar Reach Ashgrove Prairie Fork' }
  ];

  /* ---------- Header menus ---------- */
  var toggle = $('#menu-toggle'), menu = $('#site-menu');
  function closePopovers(except, restoreFocus) {
    $$('[data-popover]').forEach(function (b) {
      if (b === except || b.getAttribute('aria-expanded') !== 'true') return;
      b.setAttribute('aria-expanded', 'false');
      $('#' + b.getAttribute('aria-controls')).classList.remove('open');
      if (restoreFocus) b.focus();
    });
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open', open);
    });
  }
  $$('[data-popover]').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      closePopovers(b);
      b.setAttribute('aria-expanded', String(open));
      $('#' + b.getAttribute('aria-controls')).classList.toggle('open', open);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var anyOpen = $$('[data-popover][aria-expanded="true"]').length;
    if (anyOpen) { closePopovers(null, true); return; }
    if (toggle && toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') {
      toggle.click(); toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-popover-item]')) closePopovers();
  });

  /* ---------- Dialogs (native <dialog>) ---------- */
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-open-dialog]');
    if (opener) { var d = document.getElementById(opener.getAttribute('data-open-dialog')); if (d && d.showModal) d.showModal(); return; }
    if (e.target.closest('[data-close-dialog]')) { e.target.closest('dialog').close(); return; }
    if (e.target.tagName === 'DIALOG') { var r = e.target.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close(); }
  });
  var cookieForm = $('#cookie-form');
  if (cookieForm) {
    cookieForm.addEventListener('submit', function (e) {
      e.preventDefault();
      $('#cookie-status').textContent = 'Preferences noted for this demo. No cookies are set by this site.';
      setTimeout(function () { $('#cookie-dialog').close(); $('#cookie-status').textContent = ''; }, 900);
    });
  }

  /* ---------- Demo forms: validation, error summary, focus ---------- */
  var EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var extraChecks = {
    donate: function (form) {
      var errs = [], amount = form.elements.amount.value, other = $('#amount-other');
      if (!amount) errs.push({ field: $('#amt-25'), msg: 'Choose a gift amount.' });
      else if (amount === 'other') {
        var v = parseFloat(other.value.replace(/[$,\s]/g, ''));
        if (!(v >= 5 && v <= 50000)) errs.push({ field: other, msg: 'Enter an other amount between $5 and $50,000.' });
      }
      return errs;
    }
  };
  function boxFor(f) { return f.type === 'radio' ? f.closest('fieldset') : (f.closest('.field') || f.parentNode); }
  function clearError(f) {
    var box = boxFor(f);
    var err = $('.field-error', box);
    if (err) err.remove();
    $$('[aria-invalid]', box).forEach(function (x) { x.removeAttribute('aria-invalid'); x.removeAttribute('aria-describedby'); });
  }
  function validate(form) {
    $$('.field-error', form).forEach(function (n) { n.remove(); });
    $$('[aria-invalid]', form).forEach(function (n) { n.removeAttribute('aria-invalid'); n.removeAttribute('aria-describedby'); });
    var errs = [];
    $$('input, select, textarea', form).forEach(function (f) {
      if (f.type === 'radio' || f.type === 'checkbox' || f.type === 'hidden') return;
      var val = f.value.trim();
      if (f.required && !val) errs.push({ field: f, msg: f.getAttribute('data-error-required') || 'Complete this required field.' });
      else if (f.type === 'email' && val && !EMAIL.test(val)) errs.push({ field: f, msg: 'Enter an email address like name@example.org.' });
    });
    if (extraChecks[form.getAttribute('data-demo-form')]) errs = errs.concat(extraChecks[form.getAttribute('data-demo-form')](form));
    errs.forEach(function (er, i) {
      var box = boxFor(er.field);
      var p = document.createElement('p');
      p.className = 'field-error'; p.id = (er.field.id || 'field') + '-error'; p.textContent = er.msg;
      box.appendChild(p);
      er.field.setAttribute('aria-invalid', 'true'); er.field.setAttribute('aria-describedby', p.id);
      if (!er.field.id) er.field.id = 'field-' + i;
    });
    var summary = $('.error-summary', form);
    if (summary) {
      summary.hidden = !errs.length;
      summary.innerHTML = errs.length ? '<h2>There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with your submission</h2><ul>' + errs.map(function (er) { return '<li><a href="#' + er.field.id + '">' + esc(er.msg) + '</a></li>'; }).join('') + '</ul>' : '';
      if (errs.length) summary.focus();
    }
    return errs.length === 0;
  }
  $$('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var ok = document.getElementById(form.getAttribute('data-success'));
      var detail = $('[data-success-detail]', ok);
      if (detail && form.getAttribute('data-demo-form') === 'donate') detail.textContent = donateSummary(form);
      form.hidden = true; ok.hidden = false; ok.focus();
    });
    var clear = function (e) { if ($('.field-error', boxFor(e.target))) clearError(e.target); };
    form.addEventListener('input', clear);
    form.addEventListener('change', clear);
    var summary = $('.error-summary', form);
    if (summary) summary.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      e.preventDefault(); var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) t.focus();
    });
  });
  $$('[data-reset-form]').forEach(function (b) {
    b.addEventListener('click', function () {
      var ok = b.closest('[data-success-panel]'), form = document.querySelector('form[data-success="' + ok.id + '"]');
      form.reset(); form.hidden = false; ok.hidden = true; if (form.updateDonate) form.updateDonate(); $('input, select, textarea', form).focus();
    });
  });

  /* ---------- Donate ---------- */
  var IMPACT = { 25: 'could feed a shelter dog for about a month', 50: 'could cover vaccinations for three rescued animals', 75: 'could pay for a spay or neuter surgery at a partner clinic', 100: 'could stock a rescue go-bag for one field response', 250: 'could fund a day of emergency veterinary care' };
  function donateSummary(form) {
    var amt = form.elements.amount.value === 'other' ? parseFloat($('#amount-other').value.replace(/[$,\s]/g, '')) : form.elements.amount.value;
    return 'Demo only: a ' + (form.elements.frequency.value === 'monthly' ? 'monthly' : 'one-time') + ' gift of $' + amt + ' was simulated. No payment details were collected and no money moved.';
  }
  var donate = $('form[data-demo-form="donate"]');
  if (donate) {
    var other = $('#amount-other'), line = $('#impact-line'), btn = $('#donate-submit');
    donate.updateDonate = function () {
      var a = donate.elements.amount.value, m = donate.elements.frequency.value === 'monthly';
      var n = a === 'other' ? parseFloat(other.value.replace(/[$,\s]/g, '')) : parseFloat(a);
      btn.textContent = n > 0 ? 'Give $' + n + (m ? ' monthly' : '') + ' (demo)' : 'Give now (demo)';
      line.textContent = IMPACT[a] ? 'Your $' + a + (m ? ' each month ' : ' ') + IMPACT[a] + '. (Sample impact figure, not a real claim.)' : (a ? 'Every gift helps. (Sample text.)' : 'Choose an amount to see a sample impact example.');
    };
    donate.addEventListener('change', donate.updateDonate);
    other.addEventListener('input', function () { $('#amt-other').checked = true; donate.updateDonate(); });
    var qa = params.get('amount'), qf = params.get('freq');
    if (qf === 'monthly') $('#freq-monthly').checked = true;
    if (qa && $('input[name=amount][value="' + qa + '"]')) $('input[name=amount][value="' + qa + '"]').checked = true;
    donate.updateDonate();
  }

  /* ---------- Tabs (pet care) ---------- */
  $$('[role=tablist]').forEach(function (list) {
    var tabs = $$('[role=tab]', list);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k === undefined) return;
        e.preventDefault(); select(tabs[(k + tabs.length) % tabs.length], true);
      });
    });
    var hash = location.hash.slice(1), start = tabs.filter(function (t) { return t.getAttribute('aria-controls') === hash; })[0];
    select(start || tabs[0]);
  });

  /* ---------- Hazard lookup ---------- */
  var hz = $('[data-component="hazard-lookup"]');
  if (hz) {
    var hq = $('#hazard-q', hz), hs = $('#hazard-species', hz), hl = $('#hazard-list', hz), hst = $('#hazard-status', hz);
    var renderHaz = function () {
      var q = hq.value.trim().toLowerCase(), sp = hs.value;
      var r = HAZARDS.filter(function (h) { return (!sp || h.who.indexOf(sp) > -1) && (!q || (h.name + ' ' + h.note).toLowerCase().indexOf(q) > -1); });
      hl.innerHTML = r.length ? r.map(function (h) { return '<li><strong>' + esc(h.name) + '</strong> <span class="tag">' + esc(h.level) + '</span> <span class="meta">' + esc(h.who.join(', ')) + '</span><br>' + esc(h.note) + '</li>'; }).join('') : '<li class="empty-state">No sample entries match. This short demo list is not complete. Contact a veterinarian about anything your animal may have eaten.</li>';
      hst.textContent = r.length + ' of ' + HAZARDS.length + ' sample entries shown.';
    };
    hz.addEventListener('input', renderHaz); hz.addEventListener('change', renderHaz);
    $('#hazard-reset', hz).addEventListener('click', function () { hq.value = ''; hs.value = ''; renderHaz(); hq.focus(); });
    hz.addEventListener('submit', function (e) { e.preventDefault(); });
    renderHaz();
  }

  /* ---------- Adoption search ---------- */
  var ad = $('[data-component="adoption-search"]');
  if (ad) {
    var out = $('#pet-results'), status = $('#pet-status'), f = ad.elements;
    if (params.get('q')) f.q.value = params.get('q');
    var renderPets = function () {
      var q = f.q.value.trim().toLowerCase();
      var r = ANIMALS.filter(function (a) {
        return (!f.species.value || a.species === f.species.value) && (!f.age.value || a.age === f.age.value) && (!f.kids.checked || a.kids) &&
          (!q || (a.name + ' ' + a.breed + ' ' + a.city).toLowerCase().indexOf(q) > -1);
      });
      if (f.sort.value === 'name') r.sort(function (a, b) { return a.name.localeCompare(b.name); });
      else if (f.sort.value === 'city') r.sort(function (a, b) { return a.city.localeCompare(b.city) || a.name.localeCompare(b.name); });
      out.innerHTML = r.map(function (a) {
        return '<li><article class="card" data-component="animal-card"><img src="assets/' + a.species.toLowerCase() + '.svg" alt="" width="300" height="200"><div class="body"><h3>' + esc(a.name) + '</h3><p class="meta">' + esc(a.species + ' - ' + a.age + ' - ' + a.city) + '</p><p>' + esc(a.blurb) + '</p><button type="button" class="btn btn-secondary" data-meet="' + a.id + '">Meet ' + esc(a.name) + '</button></div></article></li>';
      }).join('');
      $('#pet-empty').hidden = r.length > 0;
      status.textContent = r.length ? r.length + ' of ' + ANIMALS.length + ' sample animals shown.' : 'No animals match your filters.';
    };
    ad.addEventListener('input', renderPets); ad.addEventListener('change', renderPets);
    ad.addEventListener('submit', function (e) { e.preventDefault(); renderPets(); });
    var resetPets = function () { ad.reset(); renderPets(); f.q.focus(); };
    ad.addEventListener('reset', function () { setTimeout(renderPets); });
    $('#pet-empty-reset').addEventListener('click', resetPets);
    out.addEventListener('click', function (e) {
      var b = e.target.closest('[data-meet]'); if (!b) return;
      var a = ANIMALS.filter(function (x) { return x.id === b.getAttribute('data-meet'); })[0], c = CITIES.filter(function (x) { return x.name === a.city; })[0];
      $('#pet-dialog-title').textContent = a.name;
      $('#pet-dialog-body').innerHTML = '<dl><dt>Species</dt><dd>' + esc(a.species) + '</dd><dt>Breed</dt><dd>' + esc(a.breed) + '</dd><dt>Age group</dt><dd>' + esc(a.age) + '</dd><dt>Size</dt><dd>' + esc(a.size) + '</dd><dt>Good with children</dt><dd>' + (a.kids ? 'Yes' : 'Not recommended') + '</dd></dl><p>' + esc(a.blurb) + '</p><p><a href="local-initiative.html?city=' + c.slug + '">Visit the ' + esc(c.name) + ' initiative page</a></p>';
      $('#pet-dialog').showModal();
    });
    renderPets();
  }

  /* ---------- News ---------- */
  var nf = $('[data-component="news-filter"]');
  if (nf) {
    var nl = $('#news-list'), ns = $('#news-status'), more = $('#news-more'), shown = 6, e = nf.elements;
    if (params.get('q')) e.q.value = params.get('q');
    var fmt = function (d) { return new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }); };
    var renderNews = function (keepCount) {
      if (!keepCount) shown = 6;
      var q = e.q.value.trim().toLowerCase();
      var r = NEWS.filter(function (n) { return (!e.topic.value || n.topic === e.topic.value) && (!q || (n.title + ' ' + n.summary).toLowerCase().indexOf(q) > -1); });
      nl.innerHTML = r.slice(0, shown).map(function (n) {
        return '<li><article class="card" data-component="news-card"><div class="body"><p class="meta"><span class="tag">' + esc(n.topic) + '</span><time datetime="' + n.date + '">' + fmt(n.date) + '</time></p><h3>' + esc(n.title) + '</h3><details><summary>Read summary</summary><p>' + esc(n.summary) + ' (Sample text; the full article is not part of this demo.)</p></details></div></article></li>';
      }).join('');
      $('#news-empty').hidden = r.length > 0;
      more.hidden = r.length <= shown;
      ns.textContent = r.length ? 'Showing ' + Math.min(shown, r.length) + ' of ' + r.length + ' stories.' : 'No stories match your filters.';
    };
    nf.addEventListener('input', function () { renderNews(); }); nf.addEventListener('change', function () { renderNews(); });
    nf.addEventListener('submit', function (ev) { ev.preventDefault(); renderNews(); });
    nf.addEventListener('reset', function () { setTimeout(renderNews); });
    $('#news-empty-reset').addEventListener('click', function () { nf.reset(); e.q.focus(); });
    more.addEventListener('click', function () {
      var prev = shown; shown += 6; renderNews(true);
      var first = $$('#news-list .card details summary')[prev]; if (first) first.focus();
    });
    renderNews();
  }

  /* ---------- Local initiatives ---------- */
  var li = $('[data-component="location-detail"]');
  if (li) {
    var slug = params.get('city') || CITIES[0].slug, c = CITIES.filter(function (x) { return x.slug === slug; })[0];
    var sel = $('#city');
    sel.innerHTML = CITIES.map(function (x) { return '<option value="' + x.slug + '">' + esc(x.name) + '</option>'; }).join('');
    if (!c) {
      li.innerHTML = '<div class="empty-state" role="status"><h2>We could not find that initiative</h2><p>Choose one of our five sample locations from the list above.</p></div>';
    } else {
      sel.value = c.slug; document.title = c.name + ' initiative | Hollowbrook Animal Alliance';
      li.innerHTML = '<h2>' + esc(c.name) + '</h2><p>' + esc(c.blurb) + '</p><h3>Services</h3><ul>' + c.services.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul><h3>This year (sample figures)</h3><ul class="stats">' + c.stats.map(function (s) { return '<li><strong>' + s[1] + '</strong>' + esc(s[0]) + '</li>'; }).join('') + '</ul><h3>Visiting</h3><p>' + esc(c.hours) + '. Addresses and hours on this demo site are fictional.</p>';
      $$('#city-links a').forEach(function (a) { if (a.href.indexOf('city=' + c.slug) > -1) a.setAttribute('aria-current', 'page'); });
    }
  }

  /* ---------- Advocacy ---------- */
  var camp = $('[data-component="campaign-list"]');
  if (camp) {
    var rs = $('#campaign-region'), cl = $('#campaign-items'), cs = $('#campaign-status'), cf = $('#campaign-choice');
    cf.innerHTML = '<option value="">Choose a campaign</option>' + CAMPAIGNS.map(function (x) { return '<option value="' + x.id + '">' + esc(x.title) + '</option>'; }).join('');
    var regions = CAMPAIGNS.map(function (x) { return x.region; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
    rs.innerHTML = '<option value="">All regions</option>' + regions.map(function (x) { return '<option>' + esc(x) + '</option>'; }).join('');
    var renderCamp = function () {
      var r = CAMPAIGNS.filter(function (x) { return !rs.value || x.region === rs.value; });
      cl.innerHTML = r.map(function (x) { return '<li><article class="card"><div class="body"><p class="meta"><span class="tag">' + esc(x.region) + '</span></p><h3>' + esc(x.title) + '</h3><p>' + esc(x.summary) + '</p><button type="button" class="btn btn-secondary" data-act="' + x.id + '">Take action: ' + esc(x.title) + '</button></div></article></li>'; }).join('');
      cs.textContent = r.length + ' of ' + CAMPAIGNS.length + ' sample campaigns shown.';
    };
    rs.addEventListener('change', renderCamp);
    cl.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-act]'); if (!b) return;
      cf.value = b.getAttribute('data-act'); clearError(cf); $('#action-heading').scrollIntoView(); cf.focus();
    });
    renderCamp();
  }

  /* ---------- Site search ---------- */
  var sr = $('[data-component="search-results"]');
  if (sr) {
    var q = (params.get('q') || '').trim(), terms = q.toLowerCase().split(/\s+/).filter(Boolean), sst = $('#search-status');
    $('#search-q').value = q;
    var pool = PAGES.map(function (p) { return { title: p.title, url: p.url, text: p.text, kind: 'Page' }; })
      .concat(NEWS.map(function (n) { return { title: n.title, url: 'news.html?q=' + encodeURIComponent(n.title.split(' ').slice(0, 3).join(' ')), text: n.summary + ' ' + n.topic, kind: 'News' }; }))
      .concat(ANIMALS.map(function (a) { return { title: a.name + ' (' + a.species + ')', url: 'adopt.html?q=' + encodeURIComponent(a.name), text: a.breed + ' ' + a.city + ' ' + a.blurb, kind: 'Adoptable pet' }; }));
    var res = !terms.length ? [] : pool.filter(function (p) { var h = (p.title + ' ' + p.text).toLowerCase(); return terms.every(function (t) { return h.indexOf(t) > -1; }); });
    if (!terms.length) { sst.textContent = 'Enter a search term above.'; sr.innerHTML = ''; }
    else if (!res.length) { sst.textContent = 'No results for this search.'; sr.innerHTML = '<div class="empty-state"><h2>No results found</h2><p>Check the spelling, try a shorter term such as "dog" or "grants", or browse <a href="get-involved.html">Get Involved</a>.</p></div>'; }
    else { sst.textContent = res.length + ' result' + (res.length === 1 ? '' : 's') + ' found.'; sr.innerHTML = '<ul class="cards">' + res.map(function (p) { return '<li class="card"><div class="body"><p class="meta"><span class="tag">' + esc(p.kind) + '</span></p><h3><a href="' + p.url + '">' + esc(p.title) + '</a></h3></div></li>'; }).join('') + '</ul>'; }
  }

})();
