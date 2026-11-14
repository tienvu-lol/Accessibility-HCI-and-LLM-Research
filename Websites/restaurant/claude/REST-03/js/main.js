/* Vane & Alder (fictional) - REST-03 replica. Vanilla JS, inline data, works from file://. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Inline demo data (all fictional) ---------- */
  var DISHES = [
    { id: 'd1', course: 'Opening', name: 'Smoked beet, fermented plum', desc: 'Beet cured over applewood, plum vinegar, a spoon of whipped sunflower seed cream.', diet: ['vegan', 'gluten-free', 'nut-free'] },
    { id: 'd2', course: 'Opening', name: 'Brown butter gougere', desc: 'A warm choux puff filled with aged cheese custard and chive.', diet: ['vegetarian', 'nut-free'] },
    { id: 'd3', course: 'Opening', name: 'Cured trout, buttermilk, dill oil', desc: 'Thin slices of river trout, cultured buttermilk, pickled shallot.', diet: ['gluten-free', 'nut-free'] },
    { id: 'd4', course: 'Garden', name: 'Roasted celeriac, black garlic', desc: 'Celeriac baked in embers with a glaze of black garlic and toasted rye crumb.', diet: ['vegan', 'nut-free'] },
    { id: 'd5', course: 'Garden', name: 'Heirloom carrot, sea buckthorn', desc: 'Carrots from the Lantern Fields in three preparations, tart orange berry sauce.', diet: ['vegan', 'gluten-free', 'nut-free'] },
    { id: 'd6', course: 'Garden', name: 'Mushroom tea, hazelnut', desc: 'A clear mushroom broth poured at the table over hazelnut and wild herbs.', diet: ['vegan', 'gluten-free'] },
    { id: 'd7', course: 'Main', name: 'Duck breast, cherry, juniper', desc: 'Dry-aged duck, preserved cherry, juniper jus, braised endive.', diet: ['gluten-free', 'nut-free'] },
    { id: 'd8', course: 'Main', name: 'Halibut, leek ash, brown shrimp', desc: 'Line-caught halibut, leek cooked to ash, a sauce of shrimp and lemon thyme.', diet: ['gluten-free', 'nut-free'] },
    { id: 'd9', course: 'Main', name: 'Barley risotto, aged cheese', desc: 'Pearl barley slowly cooked in vegetable stock, finished with four-year cheese.', diet: ['vegetarian', 'nut-free'] },
    { id: 'd10', course: 'Dessert', name: 'Pear, thyme, vanilla cream', desc: 'Poached pear, thyme sorbet, cultured vanilla cream.', diet: ['vegetarian', 'gluten-free', 'nut-free'] },
    { id: 'd11', course: 'Dessert', name: 'Dark chocolate, rye, sea salt', desc: 'Warm chocolate tart on a rye crust with a sprinkle of flaked salt.', diet: ['vegetarian', 'nut-free'] },
    { id: 'd12', course: 'Dessert', name: 'Almond milk tart', desc: 'Set almond custard, roasted almond brittle, honey from the roof hives.', diet: ['vegetarian', 'gluten-free'] }
  ];
  var WINES = [
    ['Vale Reserve Blanc', '2019', 'Crisp white, orchard fruit', 'Opening, Garden'],
    ['Alder Hill Rose Brut', 'NV', 'Dry sparkling rose', 'Opening'],
    ['Lantern Bay Riesling', '2020', 'Off-dry, stone fruit', 'Garden, Main (fish)'],
    ['Northfield Pinot Noir', '2018', 'Light red, red berry', 'Main (duck)'],
    ['Old Quill Tawny', '20 yr', 'Nutty fortified wine', 'Dessert']
  ];
  var STORIES = [
    { id: 's1', cat: 'Kitchen', date: '2026-10-02', title: 'Learning to cook with less', body: 'This autumn the kitchen trimmed each dish to the fewest elements that still taste like a place. Our team describes what stayed on the plate, what left, and the arguments that happened in between.' },
    { id: 's2', cat: 'Farm', date: '2026-09-18', title: 'The last tomatoes of the year', body: 'Lantern Fields sent its final crate of tomatoes on a cold Tuesday. We preserved some, dried some, and turned the rest into the vinegar that will season the winter menu.' },
    { id: 's3', cat: 'Dining room', date: '2026-08-21', title: 'How we set a table', body: 'Setting a table at Vane & Alder takes four minutes and eleven decisions. This is a walk through them, from the linen weight to the exact angle of a spoon.' },
    { id: 's4', cat: 'Kitchen', date: '2026-07-09', title: 'A summer of pickling', body: 'Jars line the cellar wall. A short guide to the ferments we made this season and how they will appear on the menu through winter.' },
    { id: 's5', cat: 'Community', date: '2026-06-03', title: 'Open kitchen afternoon', body: 'Neighbors joined us for a free afternoon of knife skills and tasting. Notes from the day, plus plans for the next one.' },
    { id: 's6', cat: 'Dining room', date: '2026-05-14', title: 'Introducing the garden course', body: 'Our new middle course is entirely plant-based. Why we added it, and what it changed about the rhythm of the evening.' }
  ];
  var PRESS = [
    { year: '2026', kind: 'Review', title: 'A quiet, exacting dinner', src: 'The Example Gazette (fictional)', quote: 'Every course arrives with the calm of something decided a long time ago.' },
    { year: '2026', kind: 'Award', title: 'Regional Table of the Year, 2026', src: 'Fictional Dining Guild', quote: '' },
    { year: '2025', kind: 'Review', title: 'The garden course is the point', src: 'Harrowgate Evening Post (fictional)', quote: 'Vegetables are treated with the seriousness usually kept for fish.' },
    { year: '2025', kind: 'Feature', title: 'Inside the cellar at Vane & Alder', src: 'Cellar Quarterly (fictional)', quote: '' },
    { year: '2024', kind: 'Award', title: 'Two-star sustainability mark', src: 'Sample Hospitality Council', quote: '' },
    { year: '2024', kind: 'Review', title: 'Opening notes', src: 'Fictional City Weekly', quote: 'A new room with old manners.' }
  ];
  var FAQS = [
    ['Is this a real restaurant?', 'No. Vane & Alder is a fictional restaurant created for an accessibility and usability research dataset. Nothing here can be booked, ordered or bought.'],
    ['How do I make a reservation?', 'The reservation page is a simulation. On a real site this step would hand off to a third-party booking service. Here it only checks your entries and shows a demo confirmation.'],
    ['What are the dress expectations?', 'Smart casual. We ask that guests avoid beachwear and athletic wear.'],
    ['Can you accommodate dietary restrictions?', 'The sample menu shows vegetarian, vegan, gluten-free and nut-free markers. Tell us about any restriction in the reservation notes.'],
    ['Is the dining room wheelchair accessible?', 'In this fictional scenario, yes: step-free entrance, an accessible restroom and tables with removable chairs.'],
    ['Do you offer a wine pairing?', 'A sample pairing list is on the menu page. It is local sample data only.'],
    ['What is your cancellation policy?', 'Sample policy: changes are free up to 48 hours before dinner. This is placeholder text.'],
    ['Can I bring children?', 'Guests of all ages are welcome. The tasting menu runs about three hours.'],
    ['Do you sell gift cards?', 'The gift card page demonstrates a purchase flow. No payment is collected and no card is issued.']
  ];
  var ROLES = [
    { id: 'r1', dept: 'Kitchen', title: 'Sous Chef', desc: 'Lead a station team through service and help develop seasonal dishes. Five years in fine dining recommended. Sample posting.' },
    { id: 'r2', dept: 'Kitchen', title: 'Pastry Cook', desc: 'Prepare desserts, breads and petits fours. Early starts. Sample posting.' },
    { id: 'r3', dept: 'Dining room', title: 'Server', desc: 'Guide guests through a multi-course evening. Strong memory and calm manner. Sample posting.' },
    { id: 'r4', dept: 'Dining room', title: 'Sommelier Assistant', desc: 'Support cellar organization and table service for pairings. Sample posting.' },
    { id: 'r5', dept: 'Farm', title: 'Garden Coordinator', desc: 'Plan plantings with the kitchen and manage harvest deliveries. Sample posting.' }
  ];
  var SEASONS = {
    spring: ['Asparagus', 'Radish', 'Pea shoots', 'Ramps', 'Rhubarb'],
    summer: ['Tomato', 'Zucchini blossom', 'Cucumber', 'Basil', 'Currants'],
    autumn: ['Beets', 'Celeriac', 'Pears', 'Mushrooms', 'Squash'],
    winter: ['Carrots', 'Kale', 'Leeks', 'Parsnip', 'Preserved lemon']
  };
  var TEAM = [
    ['Maren Oakes', 'Chef and co-founder', 'Maren trained in three countries before opening the kitchen. She tastes every sauce before service.'],
    ['Idris Calloway', 'General manager', 'Idris has run dining rooms for twenty years and keeps the evening running on time.'],
    ['Petra Lindqvist', 'Pastry chef', 'Petra builds desserts around fruit that is slightly past its showiest, when it tastes best.'],
    ['Tobias Quill', 'Head sommelier', 'Tobias assembles the pairings and the small cellar, and will talk about soil for as long as you like.'],
    ['Anjali Rao', 'Farm liaison', 'Anjali walks the Lantern Fields each week and writes the harvest list the kitchen cooks from.'],
    ['Wesley Marrow', 'Sous chef', 'Wesley leads the garden course and runs the ferment cellar.']
  ];

  /* ---------- Helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function store(k, v) { try { if (v === undefined) { return window.sessionStorage.getItem(k); } window.sessionStorage.setItem(k, v); } catch (e) { return null; } return null; }

  /* ---------- Navigation ---------- */
  var toggle = $('.menu-toggle'), navWrap = $('.nav-wrap');
  if (toggle && navWrap) {
    toggle.addEventListener('click', function () {
      var open = navWrap.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  var subToggles = $$('.sub-toggle');
  function closeSubs(except, returnFocus) {
    subToggles.forEach(function (b) {
      if (b !== except && b.getAttribute('aria-expanded') === 'true') {
        b.setAttribute('aria-expanded', 'false');
        document.getElementById(b.getAttribute('aria-controls')).hidden = true;
        if (returnFocus) { b.focus(); }
      }
    });
  }
  subToggles.forEach(function (b) {
    document.getElementById(b.getAttribute('aria-controls')).hidden = true;
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      closeSubs(b, false);
      b.setAttribute('aria-expanded', String(!open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var anyOpen = subToggles.some(function (b) { return b.getAttribute('aria-expanded') === 'true'; });
      if (anyOpen) { closeSubs(null, true); }
      else if (toggle && navWrap && navWrap.classList.contains('open')) { navWrap.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-list > li')) { closeSubs(null, false); }
  });
  document.addEventListener('focusin', function (e) {
    if (!e.target.closest('.nav-list > li')) { closeSubs(null, false); }
  });

  /* ---------- Cart (gift card demo) ---------- */
  var cart = [];
  try { cart = JSON.parse(store('va-cart') || '[]'); } catch (e) { cart = []; }
  function saveCart() { store('va-cart', JSON.stringify(cart)); }
  function renderCartCount() { $$('[data-cart-count]').forEach(function (el) { el.textContent = String(cart.length); }); }
  renderCartCount();

  /* ---------- Generic form validation ---------- */
  function fieldError(el) { return document.getElementById(el.id + '-error') || (el.closest('fieldset') && document.getElementById(el.closest('fieldset').id + '-error')); }
  function labelOf(el) {
    var fs = el.closest('fieldset.field');
    if (fs && (el.type === 'radio' || el.type === 'checkbox')) { var lg = $('legend', fs); return lg ? lg.firstChild.textContent.trim() : ''; }
    var l = document.querySelector('label[for="' + el.id + '"]');
    return l ? l.firstChild.textContent.trim() : el.name;
  }
  function validateField(el) {
    var v = (el.value || '').trim(), msg = '', name = labelOf(el);
    if (el.type === 'radio') {
      var group = $$('input[name="' + el.name + '"]', el.form);
      if (el.hasAttribute('data-required') && !group.some(function (r) { return r.checked; })) { msg = 'Choose an option for ' + name + '.'; }
    } else if (el.type === 'checkbox') {
      if (el.hasAttribute('data-required') && !el.checked) { msg = 'Tick the box: ' + name + '.'; }
    } else {
      if (el.hasAttribute('data-required') && !v) { msg = 'Enter ' + name.toLowerCase() + '.'; }
      else if (v && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { msg = 'Enter an email address in the format name@example.com.'; }
      else if (v && el.type === 'tel' && !/^[0-9+()\-.\s]{7,}$/.test(v)) { msg = 'Enter a phone number with at least 7 digits, for example 555-0100.'; }
      else if (v && el.type === 'date' && el.min && v < el.min) { msg = 'Choose a date on or after ' + el.min + '.'; }
      else if (v && el.type === 'number' && (Number(v) < Number(el.min || -Infinity) || Number(v) > Number(el.max || Infinity))) { msg = name + ' must be between ' + el.min + ' and ' + el.max + '.'; }
      else if (v && el.hasAttribute('data-minlength') && v.length < Number(el.getAttribute('data-minlength'))) { msg = name + ' needs at least ' + el.getAttribute('data-minlength') + ' characters.'; }
    }
    return msg;
  }
  function showError(el, msg) {
    var target = el.type === 'radio' ? el.closest('fieldset') : el;
    var err = el.type === 'radio' ? document.getElementById(target.id + '-error') : document.getElementById(el.id + '-error');
    if (!err) { return; }
    if (msg) { err.textContent = 'Error: ' + msg; err.hidden = false; if (el.type === 'radio') { $$('input[name="' + el.name + '"]', el.form).forEach(function (r) { r.setAttribute('aria-invalid', 'true'); }); } else { el.setAttribute('aria-invalid', 'true'); } }
    else { err.textContent = ''; err.hidden = true; if (el.type === 'radio') { $$('input[name="' + el.name + '"]', el.form).forEach(function (r) { r.removeAttribute('aria-invalid'); }); } else { el.removeAttribute('aria-invalid'); } }
  }
  function initForm(form) {
    form.setAttribute('novalidate', 'novalidate');
    var summary = $('.error-summary', form), success = $('.demo-success', form);
    var fields = $$('input,select,textarea', form).filter(function (f) { return f.type !== 'submit' && f.type !== 'hidden'; });
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.getAttribute('aria-invalid') === 'true') { showError(f, validateField(f)); } });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') { showError(f, validateField(f)); } });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = [], seen = {};
      fields.forEach(function (f) {
        if (f.type === 'radio') { if (seen[f.name]) { return; } seen[f.name] = true; }
        var m = validateField(f); showError(f, m);
        if (m) { errors.push({ el: f, msg: m }); }
      });
      if (success) { success.hidden = true; }
      if (errors.length) {
        if (summary) {
          summary.innerHTML = '<h2>There is a problem</h2><p>Fix ' + errors.length + (errors.length === 1 ? ' error' : ' errors') + ' to continue.</p><ul>' +
            errors.map(function (er) {
              var id = er.el.type === 'radio' ? er.el.id : er.el.id;
              return '<li><a href="#' + id + '">' + esc(er.msg) + '</a></li>';
            }).join('') + '</ul>';
          summary.hidden = false;
          $$('a', summary).forEach(function (a) {
            a.addEventListener('click', function (ev) { ev.preventDefault(); var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) { t.focus(); } });
          });
          summary.focus();
        } else { errors[0].el.focus(); }
        return;
      }
      if (summary) { summary.hidden = true; summary.innerHTML = ''; }
      var handler = form.getAttribute('data-handler');
      var extra = '';
      if (handler === 'gift') {
        var amt = $('input[name="amount"]:checked', form).value;
        cart.push({ amount: amt, to: $('#gift-recipient', form).value.trim() });
        saveCart(); renderCartCount(); renderCart();
        extra = ' A $' + esc(amt) + ' demo gift card was added to the demo cart below.';
      }
      if (success) {
        var p = $('.demo-success-text', success);
        if (p) { p.textContent = p.getAttribute('data-text') + (extra ? extra.replace(/<[^>]*>/g, '') : ''); }
        success.hidden = false; success.focus();
      }
      if (form.getAttribute('data-reset') !== 'no') { form.reset(); }
    });
  }
  $$('form[data-demo-form]').forEach(initForm);

  /* date min = today on date inputs flagged */
  $$('input[type=date][data-future]').forEach(function (d) {
    var t = new Date(); var m = ('0' + (t.getMonth() + 1)).slice(-2), day = ('0' + t.getDate()).slice(-2);
    d.min = t.getFullYear() + '-' + m + '-' + day;
  });

  /* ---------- Menu page ---------- */
  var menuRoot = $('[data-component="menu-browser"]');
  if (menuRoot) {
    var list = $('#dish-list'), count = $('#menu-count'), empty = $('#menu-empty');
    var q = $('#menu-search'), course = $('#menu-course');
    var diets = $$('input[name="diet"]', menuRoot);
    var render = function () {
      var need = diets.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
      var term = q.value.trim().toLowerCase(), cv = course.value;
      var res = DISHES.filter(function (d) {
        return (!cv || d.course === cv) && need.every(function (n) { return d.diet.indexOf(n) > -1 || (n === 'vegetarian' && d.diet.indexOf('vegan') > -1); }) &&
          (!term || (d.name + ' ' + d.desc).toLowerCase().indexOf(term) > -1);
      });
      list.innerHTML = res.map(function (d) {
        return '<li class="dish" data-component="menu-item"><span class="course-label">' + esc(d.course) + '</span><h3>' + esc(d.name) + '</h3><p>' + esc(d.desc) + '</p><ul class="tags" aria-label="Dietary markers">' +
          d.diet.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></li>';
      }).join('');
      count.textContent = res.length + (res.length === 1 ? ' dish shown' : ' dishes shown') + ' of ' + DISHES.length + '.';
      empty.hidden = res.length > 0;
    };
    [q, course].forEach(function (el) { el.addEventListener('input', render); });
    diets.forEach(function (c) { c.addEventListener('change', render); });
    $('#menu-reset').addEventListener('click', function () { q.value = ''; course.value = ''; diets.forEach(function (c) { c.checked = false; }); render(); q.focus(); });
    $('#menu-search-form').addEventListener('submit', function (e) { e.preventDefault(); });
    render();
    var wb = $('#wine-body');
    if (wb) { wb.innerHTML = WINES.map(function (w) { return '<tr><th scope="row">' + esc(w[0]) + '</th><td>' + esc(w[1]) + '</td><td>' + esc(w[2]) + '</td><td>' + esc(w[3]) + '</td></tr>'; }).join(''); }
  }

  /* ---------- Accordions (generic, FAQ, careers) ---------- */
  function wireAccordion(root) {
    $$('.acc-btn', root).forEach(function (b) {
      var panel = document.getElementById(b.getAttribute('aria-controls'));
      panel.hidden = b.getAttribute('aria-expanded') !== 'true';
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open)); panel.hidden = open;
      });
    });
  }
  function accItem(prefix, i, title, body, extra) {
    var id = prefix + i;
    return '<div class="acc-item"' + (extra || '') + '><h3><button type="button" class="acc-btn" id="' + id + '-btn" aria-expanded="false" aria-controls="' + id + '-panel">' + esc(title) + '</button></h3><div class="acc-panel" id="' + id + '-panel" role="region" aria-labelledby="' + id + '-btn" hidden>' + body + '</div></div>';
  }

  /* FAQ */
  var faqRoot = $('[data-component="faq-accordion"]');
  if (faqRoot) {
    var faqList = $('#faq-list'), faqCount = $('#faq-count'), faqEmpty = $('#faq-empty'), faqQ = $('#faq-search');
    var renderFaq = function () {
      var t = faqQ.value.trim().toLowerCase();
      var res = FAQS.map(function (f, i) { return { f: f, i: i }; }).filter(function (o) { return !t || (o.f[0] + ' ' + o.f[1]).toLowerCase().indexOf(t) > -1; });
      faqList.innerHTML = res.map(function (o) { return accItem('faq', o.i, o.f[0], '<p>' + esc(o.f[1]) + '</p>'); }).join('');
      wireAccordion(faqList);
      faqCount.textContent = res.length + (res.length === 1 ? ' question shown.' : ' questions shown.');
      faqEmpty.hidden = res.length > 0;
    };
    faqQ.addEventListener('input', renderFaq);
    $('#faq-search-form').addEventListener('submit', function (e) { e.preventDefault(); });
    renderFaq();
  }

  /* Careers */
  var carRoot = $('[data-component="job-list"]');
  if (carRoot) {
    var carList = $('#role-list'), carSel = $('#role-dept'), carCount = $('#role-count'), carEmpty = $('#role-empty');
    var renderRoles = function () {
      var d = carSel.value;
      var res = ROLES.filter(function (r) { return !d || r.dept === d; });
      carList.innerHTML = res.map(function (r) { return accItem('role', r.id, r.title + ' (' + r.dept + ')', '<p>' + esc(r.desc) + '</p>'); }).join('');
      wireAccordion(carList);
      carCount.textContent = res.length + (res.length === 1 ? ' sample role shown.' : ' sample roles shown.');
      carEmpty.hidden = res.length > 0;
    };
    carSel.addEventListener('change', renderRoles);
    renderRoles();
    var roleSel = $('#apply-role');
    if (roleSel) { ROLES.forEach(function (r) { var o = document.createElement('option'); o.value = r.title; o.textContent = r.title; roleSel.appendChild(o); }); }
  }

  /* Press */
  var pressRoot = $('[data-component="press-list"]');
  if (pressRoot) {
    var pList = $('#press-items'), pYear = $('#press-year'), pKind = $('#press-kind'), pCount = $('#press-count'), pEmpty = $('#press-empty');
    var renderPress = function () {
      var res = PRESS.filter(function (p) { return (!pYear.value || p.year === pYear.value) && (!pKind.value || p.kind === pKind.value); });
      pList.innerHTML = res.map(function (p) {
        return '<li class="card"><p class="eyebrow">' + esc(p.year) + ' / ' + esc(p.kind) + '</p><h3>' + esc(p.title) + '</h3>' + (p.quote ? '<p>&ldquo;' + esc(p.quote) + '&rdquo;</p>' : '') + '<p>' + esc(p.src) + '</p></li>';
      }).join('');
      pCount.textContent = res.length + (res.length === 1 ? ' item shown.' : ' items shown.');
      pEmpty.hidden = res.length > 0;
    };
    [pYear, pKind].forEach(function (s) { s.addEventListener('change', renderPress); });
    renderPress();
  }

  /* Stories + dialog */
  var stRoot = $('[data-component="story-list"]');
  if (stRoot) {
    var sList = $('#story-items'), sCat = $('#story-cat'), sCount = $('#story-count'), sEmpty = $('#story-empty'), dlg = $('#story-dialog'), lastBtn = null;
    var renderStories = function () {
      var res = STORIES.filter(function (s) { return !sCat.value || s.cat === sCat.value; });
      sList.innerHTML = res.map(function (s) {
        return '<li class="card" data-component="story-card"><p class="eyebrow">' + esc(s.cat) + '</p><h3>' + esc(s.title) + '</h3><p><time datetime="' + s.date + '">' + s.date + '</time></p><p>' + esc(s.body.slice(0, 90)) + '&hellip;</p><button type="button" class="btn secondary" data-story="' + s.id + '">Read story<span class="sr-only">: ' + esc(s.title) + '</span></button></li>';
      }).join('');
      sCount.textContent = res.length + (res.length === 1 ? ' story shown.' : ' stories shown.');
      sEmpty.hidden = res.length > 0;
    };
    sCat.addEventListener('change', renderStories);
    sList.addEventListener('click', function (e) {
      var b = e.target.closest('[data-story]'); if (!b) { return; }
      var s = STORIES.filter(function (x) { return x.id === b.getAttribute('data-story'); })[0];
      $('#story-dialog-title').textContent = s.title;
      $('#story-dialog-meta').textContent = s.cat + ' / ' + s.date;
      $('#story-dialog-body').textContent = s.body + ' (Sample story text written for this fictional replica.)';
      lastBtn = b;
      if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
    });
    $('#story-dialog-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('close', function () { if (lastBtn) { lastBtn.focus(); } });
    renderStories();
  }

  /* Team */
  var teamRoot = $('[data-component="team-grid"]');
  if (teamRoot) {
    var tList = $('#team-items');
    tList.innerHTML = TEAM.map(function (m, i) {
      return '<li class="card" data-component="team-card"><img src="assets/portrait.svg" alt="" width="200" height="200"><h3>' + esc(m[0]) + '</h3><p>' + esc(m[1]) + '</p>' +
        '<button type="button" class="btn secondary acc-btn-inline" aria-expanded="false" aria-controls="bio' + i + '">Bio<span class="sr-only"> for ' + esc(m[0]) + '</span></button><p id="bio' + i + '" hidden>' + esc(m[2]) + '</p></li>';
    }).join('');
    $$('.acc-btn-inline', tList).forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open));
        document.getElementById(b.getAttribute('aria-controls')).hidden = open;
      });
    });
  }

  /* Farm tabs */
  var tabs = $$('[role=tab]');
  if (tabs.length) {
    var panel = $('#season-panel'), name = $('#season-name'), ul = $('#season-list');
    var selectTab = function (t, focus) {
      tabs.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; });
      var k = t.getAttribute('data-season');
      panel.setAttribute('aria-labelledby', t.id);
      name.textContent = t.textContent;
      ul.innerHTML = SEASONS[k].map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('');
      if (focus) { t.focus(); }
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { selectTab(t, false); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') { n = tabs[(i + 1) % tabs.length]; }
        if (e.key === 'ArrowLeft') { n = tabs[(i + tabs.length - 1) % tabs.length]; }
        if (e.key === 'Home') { n = tabs[0]; }
        if (e.key === 'End') { n = tabs[tabs.length - 1]; }
        if (n) { e.preventDefault(); selectTab(n, true); }
      });
    });
    selectTab(tabs[0], false);
  }

  /* Gift cart */
  var cartBox = $('#cart-box');
  function renderCart() {
    if (!cartBox) { return; }
    var ul = $('#cart-items'), empty = $('#cart-empty'), actions = $('#cart-actions');
    ul.innerHTML = cart.map(function (c, i) {
      return '<li><span>Demo gift card for ' + esc(c.to) + ': $' + esc(c.amount) + '</span><button type="button" class="btn secondary" data-remove="' + i + '">Remove<span class="sr-only"> gift card for ' + esc(c.to) + '</span></button></li>';
    }).join('');
    empty.hidden = cart.length > 0; actions.hidden = cart.length === 0;
    var total = cart.reduce(function (s, c) { return s + Number(c.amount); }, 0);
    $('#cart-total').textContent = '$' + total + ' (demo, no payment taken)';
  }
  if (cartBox) {
    cartBox.addEventListener('click', function (e) {
      var r = e.target.closest('[data-remove]');
      if (r) { cart.splice(Number(r.getAttribute('data-remove')), 1); saveCart(); renderCartCount(); renderCart(); $('#cart-heading').focus(); }
    });
    $('#checkout-demo').addEventListener('click', function () {
      var m = $('#checkout-msg'); m.hidden = false; m.textContent = 'Demo checkout complete. No payment was taken and no gift card was issued.'; cart = []; saveCart(); renderCartCount(); renderCart(); m.focus();
    });
    renderCart();
  }
})();
