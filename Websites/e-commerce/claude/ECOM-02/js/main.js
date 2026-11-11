/* Lindora Home - fictional retailer replica. Vanilla JS, inline demo data, no network. */
(function () {
  'use strict';

  /* ---------- demo data ---------- */
  var COLORS = { Beige: '#d9c9a8', Gray: '#a7adb3', Charcoal: '#4a4f55', Green: '#7e9a7d', Blue: '#6f8fb0', Terracotta: '#c47a5a', Oak: '#c9a36b', White: '#f1f1ee', Black: '#2d2d2d', Brass: '#c8a24a', Walnut: '#7a5a3c' };
  var CATEGORIES = {
    sofas: { name: 'Sofas & armchairs', page: 'sofas.html', colorLabel: 'Cover', optionLabel: 'Fabric',
      options: [{ label: 'Standard weave', add: 0 }, { label: 'Performance weave', add: 60 }] },
    lighting: { name: 'Lighting', page: 'lighting.html', colorLabel: 'Finish', optionLabel: 'Bulb',
      options: [{ label: 'Warm LED bulb included', add: 0 }, { label: 'Smart bulb included', add: 12 }, { label: 'No bulb', add: -4 }] },
    beds: { name: 'Beds & mattresses', page: 'beds.html', colorLabel: 'Finish', optionLabel: 'Size',
      options: [{ label: 'Twin', add: 0 }, { label: 'Full', add: 60 }, { label: 'Queen', add: 120 }, { label: 'King', add: 220 }] }
  };
  // fields: id, name, category, type, price, was (sale), rating, reviews, isNew, colors, rooms, art, desc, dims
  var PRODUCTS = [
    { id: 'solvik-3-seat-sofa', name: 'Solvik 3-seat sofa', cat: 'sofas', type: 'Sofas', price: 699, rating: 4.6, reviews: 812, colors: ['Beige', 'Gray', 'Green'], rooms: 'living room', art: 'sofa', desc: 'A relaxed three-seater with deep cushions and a removable cover.', dims: 'Width 84 in, depth 36 in, height 33 in' },
    { id: 'maren-sectional', name: 'Maren sectional sofa', cat: 'sofas', type: 'Sectionals', price: 1199, was: 1399, rating: 4.4, reviews: 265, colors: ['Gray', 'Blue', 'Charcoal'], rooms: 'living room', art: 'sofa', desc: 'A modular sectional with a reversible chaise and hidden storage.', dims: 'Width 112 in, depth 64 in, height 32 in' },
    { id: 'tolle-armchair', name: 'Tolle armchair', cat: 'sofas', type: 'Armchairs', price: 249, rating: 4.7, reviews: 540, isNew: true, colors: ['Terracotta', 'Beige', 'Green'], rooms: 'living room bedroom', art: 'armchair', desc: 'A compact armchair with a supportive curved back.', dims: 'Width 30 in, depth 31 in, height 33 in' },
    { id: 'fjelby-2-seat-sofa', name: 'Fjelby 2-seat sofa', cat: 'sofas', type: 'Sofas', price: 549, rating: 4.2, reviews: 190, colors: ['Blue', 'Gray'], rooms: 'living room', art: 'sofa', desc: 'A small-space sofa with slim arms and firm seating.', dims: 'Width 66 in, depth 33 in, height 32 in' },
    { id: 'ravn-sleeper-sofa', name: 'Ravn sleeper sofa', cat: 'sofas', type: 'Sleeper sofas', price: 849, rating: 4.3, reviews: 320, colors: ['Charcoal', 'Beige'], rooms: 'living room office', art: 'sofa', desc: 'Folds flat in one motion to sleep a guest.', dims: 'Width 78 in, depth 35 in, height 34 in' },
    { id: 'hasle-swivel-armchair', name: 'Hasle swivel armchair', cat: 'sofas', type: 'Armchairs', price: 329, was: 399, rating: 4.5, reviews: 133, colors: ['Green', 'Gray', 'Terracotta'], rooms: 'living room office', art: 'armchair', desc: 'Turns a full circle on a quiet metal base.', dims: 'Width 31 in, depth 29 in, height 32 in' },
    { id: 'kullen-sectional', name: 'Kullen corner sectional', cat: 'sofas', type: 'Sectionals', price: 1499, rating: 4.8, reviews: 98, isNew: true, colors: ['Beige', 'Charcoal'], rooms: 'living room', art: 'sofa', desc: 'A deep corner sectional with washable covers.', dims: 'Width 120 in, depth 90 in, height 32 in' },
    { id: 'ormo-loveseat', name: 'Ormo loveseat', cat: 'sofas', type: 'Sofas', price: 479, rating: 4.1, reviews: 76, colors: ['Terracotta', 'Gray'], rooms: 'living room hallway', art: 'sofa', desc: 'A two-person seat that fits at the end of a bed or in a hallway.', dims: 'Width 58 in, depth 31 in, height 31 in' },
    { id: 'lysa-floor-lamp', name: 'Lysa floor lamp', cat: 'lighting', type: 'Floor lamps', price: 79, rating: 4.5, reviews: 410, colors: ['Black', 'Brass', 'White'], rooms: 'living room bedroom', art: 'floor-lamp', desc: 'A slim floor lamp with a fabric shade and foot switch.', dims: 'Height 62 in, base diameter 11 in' },
    { id: 'nova-arc-floor-lamp', name: 'Nova arc floor lamp', cat: 'lighting', type: 'Floor lamps', price: 129, rating: 4.6, reviews: 220, isNew: true, colors: ['Black', 'Brass'], rooms: 'living room', art: 'floor-lamp', desc: 'An arched lamp that lights a sofa corner from above.', dims: 'Height 78 in, reach 42 in' },
    { id: 'tindra-table-lamp', name: 'Tindra table lamp', cat: 'lighting', type: 'Table lamps', price: 29.99, rating: 4.3, reviews: 905, colors: ['White', 'Terracotta', 'Green'], rooms: 'bedroom hallway', art: 'table-lamp', desc: 'A ceramic-look base with a soft glow shade.', dims: 'Height 15 in, shade diameter 9 in' },
    { id: 'glim-desk-lamp', name: 'Glim desk lamp', cat: 'lighting', type: 'Table lamps', price: 24.99, was: 34.99, rating: 4.7, reviews: 1204, colors: ['Black', 'White'], rooms: 'office bedroom', art: 'table-lamp', desc: 'An adjustable task lamp with three brightness steps.', dims: 'Height 18 in, base diameter 6 in' },
    { id: 'ekko-pendant', name: 'Ekko pendant lamp', cat: 'lighting', type: 'Pendant lights', price: 59, rating: 4.4, reviews: 301, colors: ['White', 'Brass', 'Black'], rooms: 'living room hallway', art: 'pendant', desc: 'A dome pendant with a long adjustable cord.', dims: 'Diameter 16 in, cord 78 in' },
    { id: 'spira-cluster-pendant', name: 'Spira cluster pendant', cat: 'lighting', type: 'Pendant lights', price: 149, rating: 4.0, reviews: 54, colors: ['Brass', 'White'], rooms: 'living room', art: 'pendant', desc: 'Five small shades grouped on one canopy.', dims: 'Diameter 24 in, cord 78 in' },
    { id: 'veda-wall-sconce', name: 'Veda wall sconce', cat: 'lighting', type: 'Wall lights', price: 39, rating: 4.5, reviews: 87, isNew: true, colors: ['Black', 'Brass'], rooms: 'bedroom hallway', art: 'wall-light', desc: 'A hardwired sconce with a swing arm.', dims: 'Width 6 in, reach 14 in' },
    { id: 'lund-plug-in-wall-lamp', name: 'Lund plug-in wall lamp', cat: 'lighting', type: 'Wall lights', price: 34.99, rating: 4.2, reviews: 142, colors: ['White', 'Black'], rooms: 'bedroom office', art: 'wall-light', desc: 'Plugs into an outlet, with a cord switch and no wiring.', dims: 'Width 8 in, reach 10 in' },
    { id: 'sovna-bed-frame', name: 'Sovna bed frame', cat: 'beds', type: 'Bed frames', price: 299, rating: 4.5, reviews: 670, colors: ['Oak', 'White', 'Black'], rooms: 'bedroom', art: 'bed', desc: 'A simple frame with a slatted base and a low headboard.', dims: 'Queen: width 63 in, length 85 in, height 34 in' },
    { id: 'alder-storage-bed', name: 'Alder storage bed', cat: 'beds', type: 'Bed frames', price: 549, was: 649, rating: 4.6, reviews: 312, colors: ['Walnut', 'Gray'], rooms: 'bedroom', art: 'bed', desc: 'Four drawers under the mattress platform.', dims: 'Queen: width 64 in, length 86 in, height 36 in' },
    { id: 'hvile-upholstered-bed', name: 'Hvile upholstered bed', cat: 'beds', type: 'Bed frames', price: 679, rating: 4.7, reviews: 180, isNew: true, colors: ['Gray', 'Beige', 'Blue'], rooms: 'bedroom', art: 'bed', desc: 'A padded headboard with a wrapped frame.', dims: 'Queen: width 65 in, length 87 in, height 46 in' },
    { id: 'drom-foam-mattress', name: 'Drom foam mattress', cat: 'beds', type: 'Mattresses', price: 349, rating: 4.3, reviews: 1450, colors: ['White'], rooms: 'bedroom', art: 'bed', desc: 'A medium-firm foam mattress shipped rolled in a box.', dims: 'Queen: 60 in x 80 in x 10 in' },
    { id: 'moln-hybrid-mattress', name: 'Moln hybrid mattress', cat: 'beds', type: 'Mattresses', price: 599, rating: 4.6, reviews: 830, colors: ['White'], rooms: 'bedroom', art: 'bed', desc: 'Coils plus a foam top layer, with a 90-day comfort trial.', dims: 'Queen: 60 in x 80 in x 12 in' },
    { id: 'nattro-nightstand', name: 'Nattro nightstand', cat: 'beds', type: 'Nightstands', price: 69, rating: 4.4, reviews: 390, colors: ['Oak', 'White', 'Black'], rooms: 'bedroom', art: 'nightstand', desc: 'One drawer and an open shelf, sized for a phone and a book.', dims: 'Width 18 in, depth 14 in, height 22 in' },
    { id: 'kvist-two-drawer-nightstand', name: 'Kvist 2-drawer nightstand', cat: 'beds', type: 'Nightstands', price: 89, was: 109, rating: 4.2, reviews: 99, colors: ['Walnut', 'White'], rooms: 'bedroom', art: 'nightstand', desc: 'Two soft-close drawers and a cable hole in the top.', dims: 'Width 20 in, depth 16 in, height 24 in' },
    { id: 'skog-platform-bed', name: 'Skog platform bed', cat: 'beds', type: 'Bed frames', price: 399, rating: 4.1, reviews: 66, colors: ['Oak', 'Walnut'], rooms: 'bedroom', art: 'bed', desc: 'A low platform frame that needs no box spring.', dims: 'Queen: width 62 in, length 84 in, height 12 in' }
  ];
  var DELIVERY = { standard: { label: 'Standard delivery (5-8 business days)', cost: 29 }, express: { label: 'Express delivery (2-3 business days)', cost: 59 } };
  var FREE_DELIVERY_OVER = 500;
  var PROMO = { code: 'FAMILY10', rate: 0.1 };
  var PAGE_SIZE = 6;

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var money = function (n) { return '$' + n.toFixed(2); };
  var byId = function (id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; };
  var params = new URLSearchParams(window.location.search);
  var memory = {};
  var store = {
    get: function (k) { try { return JSON.parse(window.localStorage.getItem(k)); } catch (e) { return memory[k] || null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { memory[k] = v; } }
  };
  var session = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return memory[k] || null; } },
    set: function (k, v) { try { if (v === null) { window.sessionStorage.removeItem(k); } else { window.sessionStorage.setItem(k, v); } } catch (e) { memory[k] = v; } }
  };
  var srOnly = function (t) { return '<span class="visually-hidden">' + t + '</span>'; };

  /* ---------- bag ---------- */
  var BAG_KEY = 'lindora.bag';
  var bag = function () { return store.get(BAG_KEY) || []; };
  var saveBag = function (items) { store.set(BAG_KEY, items); updateBagCount(); };
  var unitPrice = function (item) {
    var p = byId(item.id), opt = CATEGORIES[p.cat].options.filter(function (o) { return o.label === item.option; })[0];
    return p.price + (opt ? opt.add : 0);
  };
  function updateBagCount() {
    var n = bag().reduce(function (a, i) { return a + i.qty; }, 0);
    $$('[data-bag-count]').forEach(function (el) { el.textContent = n; });
    $$('[data-bag-link]').forEach(function (a) { a.setAttribute('aria-label', 'Shopping bag, ' + n + (n === 1 ? ' item' : ' items')); });
  }
  function totals(items) {
    var subtotal = items.reduce(function (a, i) { return a + unitPrice(i) * i.qty; }, 0);
    var discount = store.get('lindora.promo') === PROMO.code ? subtotal * PROMO.rate : 0;
    var method = store.get('lindora.delivery') || 'standard';
    var shipping = !items.length || subtotal - discount >= FREE_DELIVERY_OVER ? 0 : DELIVERY[method].cost;
    return { subtotal: subtotal, discount: discount, shipping: shipping, total: subtotal - discount + shipping };
  }

  /* ---------- product card ---------- */
  function card(p) {
    var badges = (p.isNew ? '<span class="badge">New</span>' : '') + (p.was ? '<span class="badge sale">Sale</span>' : '');
    var price = '<p class="price' + (p.was ? ' on-sale' : '') + '">' + (p.was ? srOnly('Now ') : '') + money(p.price) +
      (p.was ? '<span class="price-was">' + srOnly('Was ') + money(p.was) + '</span>' : '') + '</p>';
    return '<li><article class="card" data-component="product-card" style="--tint:' + COLORS[p.colors[0]] + '">' +
      '<div class="card-media"><img src="assets/product-' + p.art + '.svg" alt="" width="400" height="300" loading="lazy"></div>' +
      (badges ? '<div class="badges">' + badges + '</div>' : '') +
      '<div class="card-body"><h3 class="card-title"><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3>' +
      '<p class="card-type">' + esc(p.type) + ' &middot; ' + p.colors.length + (p.colors.length === 1 ? ' color' : ' colors') + '</p>' + price +
      '<p class="rating"><span aria-hidden="true">&#9733; ' + p.rating + ' (' + p.reviews + ')</span>' + srOnly('Rated ' + p.rating + ' out of 5 from ' + p.reviews + ' reviews') + '</p></div></article></li>';
  }
  var cards = function (list) { return list.map(card).join(''); };

  /* ---------- forms: validation, error summary, focus ---------- */
  function labelOf(el) {
    var wrap = el.closest('.field'), l = wrap && (wrap.querySelector('legend') || wrap.querySelector('label'));
    return l ? l.textContent.replace(/\(.*?\)|\*/g, '').trim() : el.name;
  }
  function errorFor(el) {
    var v = el.value.trim(), label = labelOf(el);
    if (el.type === 'radio') {
      return el.required && !$$('input[name="' + el.name + '"]', el.form).some(function (r) { return r.checked; }) ? (el.dataset.errorEmpty || 'Choose ' + label.toLowerCase()) : '';
    }
    if (el.type === 'checkbox') { return el.required && !el.checked ? (el.dataset.errorEmpty || 'Confirm ' + label.toLowerCase()) : ''; }
    if (el.required && !v) { return el.dataset.errorEmpty || (el.tagName === 'SELECT' ? 'Choose ' : 'Enter ') + label.toLowerCase(); }
    if (!v) { return ''; }
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { return 'Enter an email address like name@example.com'; }
    if (el.dataset.pattern && !new RegExp(el.dataset.pattern).test(v)) { return el.dataset.errorPattern || label + ' is not in the expected format'; }
    if (el.minLength > 0 && v.length < el.minLength) { return label + ' must be at least ' + el.minLength + ' characters'; }
    if (el.type === 'number' && (isNaN(+v) || +v < +el.min || +v > +el.max)) { return label + ' must be a number from ' + el.min + ' to ' + el.max; }
    return '';
  }
  function clearErrors(form) {
    $$('.field-error', form).forEach(function (e) { e.remove(); });
    $$('[aria-invalid]', form).forEach(function (e) { e.removeAttribute('aria-invalid'); });
    $$('[data-described]', form).forEach(function (e) { e.removeAttribute('aria-describedby'); e.removeAttribute('data-described'); });
    var s = $('[data-error-summary]', form);
    if (s) { s.hidden = true; s.innerHTML = ''; }
  }
  // errors: [{el, msg}]; shows inline errors, the summary, and moves focus to the summary
  function showErrors(form, errors) {
    errors.forEach(function (e, i) {
      var wrap = e.el.closest('.field'), id = (e.el.id || e.el.name) + '-error-' + i;
      var p = document.createElement('p');
      p.className = 'field-error'; p.id = id; p.textContent = e.msg;
      wrap.appendChild(p);
      var target = e.el.type === 'radio' ? wrap : e.el;
      target.setAttribute('aria-describedby', id); target.setAttribute('data-described', '');
      e.el.setAttribute('aria-invalid', 'true');
    });
    var s = $('[data-error-summary]', form);
    s.innerHTML = '<h2>There is a problem</h2><ul>' + errors.map(function (e) {
      return '<li><a href="#' + e.el.id + '" data-focus="' + e.el.id + '">' + esc(e.msg) + '</a></li>';
    }).join('') + '</ul>';
    s.hidden = false; s.focus();
  }
  function validate(form) {
    var seen = {}, errors = [];
    $$('input, select, textarea', form).forEach(function (el) {
      if (el.type === 'radio') { if (seen[el.name]) { return; } seen[el.name] = true; }
      var msg = errorFor(el);
      if (msg) { errors.push({ el: el, msg: msg }); }
    });
    return errors;
  }
  // handlers[name](form) may return extra errors; otherwise it completes the demo action
  function wireForm(form, handler) {
    form.noValidate = true;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      clearErrors(form);
      var errors = validate(form);
      if (!errors.length) { errors = handler(form) || []; }
      if (errors.length) { showErrors(form, errors); }
    });
    form.addEventListener('click', function (ev) {
      var a = ev.target.closest('[data-focus]');
      if (a) { ev.preventDefault(); var t = document.getElementById(a.dataset.focus); if (t) { t.focus(); } }
    });
  }
  function say(form, text) { var s = $('[data-form-status]', form); if (s) { s.textContent = text; } }
  var field = function (form, name) { return form.elements[name]; };

  /* ---------- header ---------- */
  function initHeader() {
    var btn = $('[data-menu-toggle]'), panel = btn && document.getElementById(btn.getAttribute('aria-controls'));
    function setMenu(open, refocus) {
      btn.setAttribute('aria-expanded', String(open)); panel.hidden = !open;
      if (!open && refocus) { btn.focus(); }
    }
    if (btn) {
      btn.addEventListener('click', function () { setMenu(panel.hidden); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { setMenu(false, true); } });
      document.addEventListener('click', function (e) { if (!panel.hidden && !e.target.closest('.has-menu')) { setMenu(false); } });
      panel.addEventListener('focusout', function (e) { if (e.relatedTarget && !panel.contains(e.relatedTarget) && e.relatedTarget !== btn) { setMenu(false); } });
    }
    var q = $('.search-form input[name="q"]');
    if (q && params.get('q') && $('[data-search-results]')) { q.value = params.get('q'); }
    var user = session.get('lindora.user');
    $$('[data-account-link]').forEach(function (a) { if (user) { a.textContent = 'Hi, ' + user; } });
    updateBagCount();
  }

  /* ---------- product feeds (home, new) ---------- */
  function initFeeds() {
    $$('[data-product-feed]').forEach(function (ul) {
      var kind = ul.dataset.productFeed, list = PRODUCTS.filter(function (p) { return kind === 'sale' ? p.was : p.isNew; });
      ul.innerHTML = cards(list.slice(0, +ul.dataset.limit || list.length));
    });
  }

  /* ---------- listing with filters, sort, pagination ---------- */
  function initListing(root) {
    var catKey = root.dataset.listing, items = PRODUCTS.filter(function (p) { return p.cat === catKey; });
    var form = $('[data-filter-form]', root), grid = $('[data-results]', root), status = $('[data-result-count]', root), heading = $('[data-results-heading]', root);
    var chips = $('[data-active-filters]', root), pager = $('[data-pagination]', root), empty = $('[data-empty]', root), sortSel = $('[data-sort]', root);
    var toggle = $('[data-filter-toggle]', root), panel = $('#filters-panel', root), page = 1;
    var uniq = function (arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }).sort(); };
    var group = function (name, legend, values) {
      return '<fieldset><legend>' + legend + '</legend>' + values.map(function (v, i) {
        return '<label class="check"><input type="checkbox" name="' + name + '" value="' + esc(v) + '"> ' + esc(v) + '</label>';
      }).join('') + '</fieldset>';
    };
    form.innerHTML = group('type', 'Product type', uniq(items.map(function (p) { return p.type; }))) +
      group('color', CATEGORIES[catKey].colorLabel, uniq([].concat.apply([], items.map(function (p) { return p.colors; })))) +
      '<fieldset><legend>Price and rating</legend><div class="field"><label for="max-price">Maximum price</label><select id="max-price" name="maxPrice"><option value="">Any price</option><option value="50">Under $50</option><option value="100">Under $100</option><option value="300">Under $300</option><option value="700">Under $700</option><option value="1000">Under $1,000</option></select></div>' +
      '<div class="field"><label for="min-rating">Customer rating</label><select id="min-rating" name="minRating"><option value="">Any rating</option><option value="4">4 stars and up</option><option value="4.5">4.5 stars and up</option></select></div></fieldset>' +
      '<fieldset><legend>Highlights</legend><label class="check"><input type="checkbox" name="flag" value="sale"> On sale</label><label class="check"><input type="checkbox" name="flag" value="new"> New designs</label></fieldset>' +
      '<button type="reset" class="btn btn-secondary">Clear all filters</button>';
    var preset = params.get('type');
    $$('input[name="type"]', form).forEach(function (c) { if (c.value === preset) { c.checked = true; } });

    var checked = function (name) { return $$('input[name="' + name + '"]:checked', form).map(function (c) { return c.value; }); };
    var state = function () {
      return { types: checked('type'), colors: checked('color'), flags: checked('flag'), maxPrice: +form.maxPrice.value || 0, minRating: +form.minRating.value || 0 };
    };
    var sorters = {
      best: function (a, b) { return b.reviews - a.reviews; },
      'price-asc': function (a, b) { return a.price - b.price; },
      'price-desc': function (a, b) { return b.price - a.price; },
      rating: function (a, b) { return b.rating - a.rating; },
      name: function (a, b) { return a.name.localeCompare(b.name); }
    };
    function activeChips(s) {
      var out = [];
      s.types.forEach(function (v) { out.push(['type', v, v]); });
      s.colors.forEach(function (v) { out.push(['color', v, CATEGORIES[catKey].colorLabel + ': ' + v]); });
      s.flags.forEach(function (v) { out.push(['flag', v, v === 'sale' ? 'On sale' : 'New designs']); });
      if (s.maxPrice) { out.push(['maxPrice', '', 'Under $' + s.maxPrice]); }
      if (s.minRating) { out.push(['minRating', '', s.minRating + ' stars and up']); }
      return out;
    }
    function render(moveFocus) {
      var s = state();
      var list = items.filter(function (p) {
        return (!s.types.length || s.types.indexOf(p.type) > -1) &&
          (!s.colors.length || p.colors.some(function (c) { return s.colors.indexOf(c) > -1; })) &&
          (s.flags.indexOf('sale') < 0 || p.was) && (s.flags.indexOf('new') < 0 || p.isNew) &&
          (!s.maxPrice || p.price < s.maxPrice) && (!s.minRating || p.rating >= s.minRating);
      }).sort(sorters[sortSel.value]);
      var pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
      page = Math.min(page, pages);
      grid.innerHTML = cards(list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
      empty.hidden = list.length > 0;
      status.textContent = list.length ? 'Showing ' + Math.min(list.length, (page - 1) * PAGE_SIZE + 1) + '-' + Math.min(list.length, page * PAGE_SIZE) + ' of ' + list.length + ' products' : 'No products match your filters';
      var ac = activeChips(s);
      chips.innerHTML = ac.map(function (c) { return '<button type="button" class="chip" data-chip="' + c[0] + '" data-value="' + esc(c[1]) + '">' + srOnly('Remove filter: ') + esc(c[2]) + '</button>'; }).join('');
      $('[data-filter-count]', root).textContent = ac.length ? '(' + ac.length + ')' : '';
      var nums = '';
      for (var i = 1; i <= pages; i++) { nums += '<button type="button" data-page="' + i + '"' + (i === page ? ' aria-current="page"' : '') + ' aria-label="Page ' + i + '">' + i + '</button>'; }
      pager.innerHTML = pages > 1 ? '<button type="button" data-page="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') + '>Previous</button>' + nums + '<button type="button" data-page="' + (page + 1) + '"' + (page === pages ? ' disabled' : '') + '>Next</button>' : '';
      if (moveFocus) { heading.focus(); }
    }
    form.addEventListener('change', function () { page = 1; render(false); });
    form.addEventListener('reset', function () { page = 1; setTimeout(function () { render(false); }, 0); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    sortSel.addEventListener('change', function () { page = 1; render(false); });
    pager.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-page]');
      if (b && !b.disabled) { page = +b.dataset.page; render(true); }
    });
    root.addEventListener('click', function (e) {
      var c = e.target.closest('[data-chip]'), clear = e.target.closest('[data-clear]');
      if (c) {
        var n = c.dataset.chip;
        if (n === 'maxPrice' || n === 'minRating') { form[n].value = ''; }
        else { $$('input[name="' + n + '"]', form).forEach(function (i) { if (i.value === c.dataset.value) { i.checked = false; } }); }
        page = 1; render(true);
      }
      if (clear) { form.reset(); heading.focus(); }
    });
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open)); panel.classList.toggle('is-open', open);
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') {
        toggle.setAttribute('aria-expanded', 'false'); panel.classList.remove('is-open'); toggle.focus();
      }
    });
    render(false);
  }

  /* ---------- search ---------- */
  function initSearch(root) {
    var q = (params.get('q') || '').trim(), words = q.toLowerCase().split(/\s+/).filter(Boolean);
    var status = $('[data-search-status]', root), grid = $('[data-results]', root), empty = $('[data-empty]', root);
    var hits = !words.length ? [] : PRODUCTS.filter(function (p) {
      var hay = [p.name, p.type, CATEGORIES[p.cat].name, p.desc, p.rooms, p.colors.join(' ')].join(' ').toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) > -1; });
    });
    grid.innerHTML = cards(hits);
    empty.hidden = hits.length > 0;
    $('[data-empty-message]', root).textContent = q ? 'No products found for "' + q + '". Check the spelling or try a broader word such as "lamp", "sofa" or "bedroom".' : 'Type a word in the search box above, such as "lamp", "sofa" or "bedroom".';
    status.textContent = q ? hits.length + (hits.length === 1 ? ' result' : ' results') + ' for "' + q + '"' : 'Enter a search term';
    document.title = (q ? 'Search: ' + q : 'Search') + ' - Lindora Home';
  }

  /* ---------- product detail ---------- */
  function initProduct(root) {
    var p = byId(params.get('id')), cat = p && CATEGORIES[p.cat];
    if (!p) {
      root.innerHTML = '<h1>Product not found</h1><p>We could not find that product. It may be a demo link that no longer exists.</p><p><a class="btn" href="furniture.html">Browse furniture</a></p>';
      document.title = 'Product not found - Lindora Home';
      return;
    }
    document.title = p.name + ' - Lindora Home';
    $('[data-crumb-category]').innerHTML = '<a href="' + cat.page + '">' + cat.name + '</a>';
    $('[data-crumb-current]').textContent = p.name;
    var views = [['product-' + p.art, 'Product view'], ['detail', 'Close-up view'], ['scene', 'In a room']];
    root.innerHTML =
      '<div class="pdp-gallery" data-component="product-gallery"><div class="gallery-main" style="--tint:' + COLORS[p.colors[0]] + '"><img src="assets/' + views[0][0] + '.svg" alt="Illustration: ' + esc(p.name) + ', product view" width="400" height="300" data-gallery-main></div>' +
      '<div class="thumbs" role="group" aria-label="Product images">' + views.map(function (v, i) {
        return '<button type="button" data-view="' + v[0] + '" data-label="' + v[1] + '" aria-pressed="' + (i === 0) + '" aria-label="Show ' + v[1].toLowerCase() + '"><img src="assets/' + v[0] + '.svg" alt="" width="400" height="300"></button>';
      }).join('') + '</div></div>' +
      '<div><h1>' + esc(p.name) + '</h1><p class="card-type">' + esc(p.type) + ' &middot; ' + esc(cat.name) + '</p>' +
      '<p class="pdp-price" data-pdp-price></p><p class="rating"><span aria-hidden="true">&#9733; ' + p.rating + ' (' + p.reviews + ' reviews)</span>' + srOnly('Rated ' + p.rating + ' out of 5 from ' + p.reviews + ' reviews') + '</p>' +
      '<p>' + esc(p.desc) + '</p>' +
      '<form data-section="add-to-bag" data-component="variant-form" novalidate><div hidden tabindex="-1" class="error-summary" data-error-summary></div>' +
      '<fieldset class="field"><legend>' + cat.colorLabel + ' <span aria-hidden="true">*</span></legend><div class="swatches">' + p.colors.map(function (c, i) {
        return '<label class="swatch"><input type="radio" name="color" id="color-' + i + '" value="' + c + '" required data-error-empty="Choose a ' + cat.colorLabel.toLowerCase() + '"><span style="--c:' + COLORS[c] + '">' + c + '</span></label>';
      }).join('') + '</div></fieldset>' +
      '<div class="field"><label for="option">' + cat.optionLabel + ' <span aria-hidden="true">*</span></label><select id="option" name="option" required data-error-empty="Choose an option for ' + cat.optionLabel.toLowerCase() + '"><option value="">Choose an option</option>' + cat.options.map(function (o) {
        return '<option value="' + o.label + '">' + o.label + (o.add ? ' (' + (o.add > 0 ? '+' : '-') + '$' + Math.abs(o.add) + ')' : '') + '</option>';
      }).join('') + '</select></div>' +
      '<div class="field"><label for="qty">Quantity</label><input id="qty" name="qty" type="number" value="1" min="1" max="10" inputmode="numeric" required data-error-empty="Enter a quantity from 1 to 10"></div>' +
      '<button type="submit" class="btn">Add to bag</button></form>' +
      '<p class="hint" style="margin-top:1rem">Demo store: items are saved only in this browser and nothing can be purchased for real.</p>' +
      '<div style="margin-top:1.5rem" data-component="accordion"><details class="acc"><summary>Product details</summary><p>' + esc(p.desc) + ' Rated ' + p.rating + ' out of 5 by ' + p.reviews + ' demo reviewers.</p></details>' +
      '<details class="acc"><summary>Dimensions</summary><p>' + esc(p.dims) + '</p></details>' +
      '<details class="acc"><summary>Care and returns</summary><p>Wipe clean with a damp cloth. See the <a href="returns.html">returns page</a> for the 30-day policy.</p></details></div></div>';
    var form = $('form', root), main = $('[data-gallery-main]', root), priceEl = $('[data-pdp-price]', root), tint = $('.gallery-main', root);
    function refreshPrice() {
      var o = cat.options.filter(function (x) { return x.label === form.option.value; })[0], base = p.price + (o ? o.add : 0);
      priceEl.innerHTML = money(base) + (p.was ? '<span class="price-was">' + srOnly('Was ') + money(p.was + (o ? o.add : 0)) + '</span>' : '');
    }
    refreshPrice();
    form.option.addEventListener('change', refreshPrice);
    $$('input[name="color"]', form).forEach(function (r) { r.addEventListener('change', function () { tint.style.setProperty('--tint', COLORS[r.value]); }); });
    $$('[data-view]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        main.src = 'assets/' + b.dataset.view + '.svg'; main.alt = 'Illustration: ' + p.name + ', ' + b.dataset.label.toLowerCase();
        $$('[data-view]', root).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      });
    });
    var dialog = document.createElement('dialog');
    dialog.setAttribute('aria-labelledby', 'bag-dialog-title');
    dialog.setAttribute('data-component', 'confirmation-dialog');
    dialog.innerHTML = '<h2 id="bag-dialog-title">Added to your bag</h2><p data-dialog-text></p><div class="dialog-actions"><a class="btn" href="cart.html">View bag</a><button type="button" class="btn btn-secondary" data-close>Continue shopping</button></div>';
    document.body.appendChild(dialog);
    $('[data-close]', dialog).addEventListener('click', function () { dialog.close(); });
    wireForm(form, function () {
      var qty = Math.floor(+form.qty.value);
      if (qty !== +form.qty.value) { return [{ el: form.qty, msg: 'Quantity must be a whole number' }]; }
      var items = bag(), hit = items.filter(function (i) { return i.id === p.id && i.color === form.color.value && i.option === form.option.value; })[0];
      if (hit) { hit.qty = Math.min(10, hit.qty + qty); } else { items.push({ id: p.id, color: form.color.value, option: form.option.value, qty: qty }); }
      saveBag(items);
      $('[data-dialog-text]', dialog).textContent = qty + ' x ' + p.name + ' (' + form.color.value + ', ' + form.option.value + ') added.';
      dialog.showModal();
    });
    var related = PRODUCTS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 4);
    $('[data-related]').innerHTML = cards(related);
  }

  /* ---------- cart ---------- */
  function renderSummary(el, items) {
    var t = totals(items);
    el.innerHTML = '<div class="row"><dt>Subtotal</dt><dd>' + money(t.subtotal) + '</dd></div>' +
      (t.discount ? '<div class="row"><dt>Family discount (' + PROMO.code + ')</dt><dd>-' + money(t.discount) + '</dd></div>' : '') +
      '<div class="row"><dt>Delivery</dt><dd>' + (t.shipping ? money(t.shipping) : 'Free') + '</dd></div>' +
      '<div class="row total"><dt>Estimated total</dt><dd>' + money(t.total) + '</dd></div>';
    return t;
  }
  function lineHTML(item, editable) {
    var p = byId(item.id), cat = CATEGORIES[p.cat], u = unitPrice(item), key = esc(item.id + '|' + item.color + '|' + item.option);
    var opts = ''; for (var i = 1; i <= 10; i++) { opts += '<option' + (i === item.qty ? ' selected' : '') + '>' + i + '</option>'; }
    return '<li class="line" data-key="' + key + '"><img src="assets/product-' + p.art + '.svg" alt="" width="400" height="300">' +
      '<div><h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3><p class="line-meta">' + cat.colorLabel + ': ' + item.color + '<br>' + cat.optionLabel + ': ' + esc(item.option) + '<br>' + money(u) + ' each</p>' +
      (editable ? '<div class="line-controls"><label>Qty' + srOnly(' for ' + esc(p.name)) + ' <select data-qty>' + opts + '</select></label><button type="button" class="btn-link" data-remove aria-label="Remove ' + esc(p.name) + ' from bag">Remove</button></div>' : '<p class="line-meta">Qty ' + item.qty + '</p>') +
      '</div><p class="line-total line-total-cell">' + srOnly('Line total ') + money(u * item.qty) + '</p></li>';
  }
  function initCart(root) {
    var list = $('[data-lines]', root), status = $('[data-cart-status]', root), full = $('[data-cart-full]', root), none = $('[data-cart-empty]', root), summary = $('[data-summary]', root), heading = $('[data-cart-heading]', root);
    var keyOf = function (i) { return i.id + '|' + i.color + '|' + i.option; };
    function render() {
      var items = bag();
      full.hidden = !items.length; none.hidden = !!items.length;
      list.innerHTML = items.map(function (i) { return lineHTML(i, true); }).join('');
      renderSummary(summary, items);
    }
    list.addEventListener('change', function (e) {
      var li = e.target.closest('.line'), items = bag();
      items.forEach(function (i) { if (keyOf(i) === li.dataset.key) { i.qty = +e.target.value; } });
      saveBag(items); render(); status.textContent = 'Quantity updated. Estimated total ' + money(totals(items).total);
      var again = $$('.line', list).filter(function (x) { return x.dataset.key === li.dataset.key; })[0]; if (again) { $('select', again).focus(); }
    });
    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-remove]'); if (!b) { return; }
      var li = b.closest('.line'), name = $('h3', li).textContent;
      saveBag(bag().filter(function (i) { return keyOf(i) !== li.dataset.key; }));
      render(); status.textContent = name + ' removed from your bag.'; heading.focus();
    });
    var promo = $('[data-promo-form]', root);
    wireForm(promo, function () {
      var code = field(promo, 'code').value.trim().toUpperCase();
      if (code !== PROMO.code) { return [{ el: field(promo, 'code'), msg: 'That code is not valid. Try the demo code ' + PROMO.code }]; }
      store.set('lindora.promo', PROMO.code); render(); status.textContent = 'Code ' + PROMO.code + ' applied: 10% off.';
    });
    render();
  }

  /* ---------- checkout ---------- */
  function initCheckout(root) {
    var items = bag(), form = $('[data-checkout-form]', root), none = $('[data-cart-empty]', root);
    if (!items.length) { form.closest('[data-checkout-layout]').hidden = true; none.hidden = false; return; }
    var summary = $('[data-summary]', root);
    $('[data-order-lines]', root).innerHTML = items.map(function (i) { return lineHTML(i, false); }).join('');
    var refresh = function () { store.set('lindora.delivery', field(form, 'delivery').value || 'standard'); renderSummary(summary, items); };
    $$('input[name="delivery"]', form).forEach(function (r) { r.checked = r.value === (store.get('lindora.delivery') || 'standard'); r.addEventListener('change', refresh); });
    refresh();
    wireForm(form, function () {
      var t = totals(items), order = 'DEMO-' + String(Math.floor(100000 + Math.random() * 900000));
      var conf = $('[data-confirmation]', root);
      $('[data-order-number]', conf).textContent = order;
      $('[data-confirm-email]', conf).textContent = field(form, 'email').value;
      $('[data-confirm-lines]', conf).innerHTML = items.map(function (i) { return lineHTML(i, false); }).join('');
      $('[data-confirm-total]', conf).textContent = money(t.total);
      saveBag([]); store.set('lindora.promo', null);
      $('[data-checkout-layout]', root).hidden = true; $('[data-checkout-heading]', root).hidden = true; conf.hidden = false;
      document.title = 'Demo order placed - Lindora Home';
      $('h1', conf).focus();
    });
  }

  /* ---------- account (demo) ---------- */
  function initLogin(root) {
    var out = $('[data-signed-in]', root), forms = $('[data-signin-forms]', root);
    function sync() {
      var user = session.get('lindora.user');
      out.hidden = !user; forms.hidden = !!user;
      if (user) { $('[data-user-name]', out).textContent = user; }
      $$('[data-account-link]').forEach(function (a) { a.textContent = user ? 'Hi, ' + user : 'Log in or sign up'; });
    }
    $$('form[data-demo-auth]', root).forEach(function (f) {
      wireForm(f, function () {
        var name = f.elements.name ? f.elements.name.value.trim() : f.elements.email.value.split('@')[0];
        session.set('lindora.user', name); sync(); $('h2', out).focus();
      });
    });
    $('[data-signout]', root).addEventListener('click', function () { session.set('lindora.user', null); sync(); $('[data-signin-forms] h2', root).focus(); });
    sync();
  }

  /* ---------- simple demo forms ---------- */
  function initDemoForms() {
    $$('form[data-demo-form]').forEach(function (f) {
      wireForm(f, function () {
        say(f, f.dataset.demoForm + ' (demo only: nothing was sent or stored).');
        f.reset();
      });
    });
    var ret = $('[data-return-form]');
    if (ret) {
      wireForm(ret, function () {
        var bought = new Date(field(ret, 'date').value + 'T00:00:00'), today = new Date(); today.setHours(0, 0, 0, 0);
        if (bought > today) { return [{ el: field(ret, 'date'), msg: 'Purchase date cannot be in the future' }]; }
        var days = +field(ret, 'item').value, end = new Date(bought.getTime()); end.setDate(end.getDate() + days);
        var fmt = end.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        say(ret, end >= today ? 'This item can be returned until ' + fmt + ' (' + days + '-day window, demo policy).' : 'The ' + days + '-day return window ended on ' + fmt + '. Contact us to ask about options (demo).');
      });
    }
  }

  /* ---------- FAQ filter ---------- */
  function initFaq(root) {
    var input = $('[data-faq-search]', root), items = $$('details', root), status = $('[data-faq-status]', root), empty = $('[data-empty]', root);
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase(), n = 0;
      items.forEach(function (d) { var show = !q || d.textContent.toLowerCase().indexOf(q) > -1; d.hidden = !show; if (show) { n++; } });
      empty.hidden = n > 0; status.textContent = q ? n + (n === 1 ? ' question matches' : ' questions match') : '';
    });
    $('form', root).addEventListener('submit', function (e) { e.preventDefault(); });
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initHeader(); initFeeds(); initDemoForms();
    var el;
    if ((el = $('[data-listing]'))) { initListing(el); }
    if ((el = $('[data-search-results]'))) { initSearch(el); }
    if ((el = $('[data-product-detail]'))) { initProduct(el); }
    if ((el = $('[data-cart-page]'))) { initCart(el); }
    if ((el = $('[data-checkout-page]'))) { initCheckout(el); }
    if ((el = $('[data-login-page]'))) { initLogin(el); }
    if ((el = $('[data-faq]'))) { initFaq(el); }
  });
}());
