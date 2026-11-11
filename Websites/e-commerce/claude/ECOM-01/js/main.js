/* Softbloom demo store: all data is inline, nothing is sent anywhere. */
(function () {
  'use strict';

  /* ---------- data ---------- */
  var COLLECTIONS = {
    'all': { title: 'Shop all', desc: 'Every Softbloom product in one place: skincare, makeup and fragrance.', test: function () { return true; } },
    'best-sellers': { title: 'Best-sellers', desc: 'The products our fictional customers reorder the most.', test: function (p) { return p.bestseller; } },
    'skincare': { title: 'Skincare', desc: 'Gentle cleansers, moisturizers, treatments and sunscreen.', test: function (p) { return p.collection === 'skincare'; } },
    'makeup': { title: 'Makeup', desc: 'Light, buildable color for face, lips, brows, eyes and cheeks.', test: function (p) { return p.collection === 'makeup'; } },
    'fragrance': { title: 'Fragrance', desc: 'Soft, skin-close scents in two sizes.', test: function (p) { return p.collection === 'fragrance'; } }
  };

  var PRODUCTS = [
    { id: 'cloudmilk-cleanser', name: 'Cloudmilk Cream Cleanser', collection: 'skincare', type: 'Cleansers', price: 18, shape: 'tube', bestseller: true, rating: 4.7, reviews: 312, variantLabel: 'Size', variants: [{ id: '4oz', label: '4 oz' }, { id: '8oz', label: '8 oz', price: 28 }], tagline: 'A creamy, low-lather cleanser for every skin type.', desc: 'Melts away sunscreen and daily grime without leaving skin tight. Fragrance free.', ingredients: 'Water, glycerin, oat extract, coco-glucoside, panthenol, allantoin.', howto: 'Massage onto damp skin morning and night, then rinse with lukewarm water.' },
    { id: 'gentle-foam-wash', name: 'Gentle Foam Wash', collection: 'skincare', type: 'Cleansers', price: 16, shape: 'tube', bestseller: false, rating: 4.3, reviews: 96, variantLabel: 'Size', variants: [{ id: '5oz', label: '5 oz' }], tagline: 'A light foam that rinses clean.', desc: 'A airy foaming wash for oilier days. Leaves skin soft, never squeaky.', ingredients: 'Water, glycerin, chamomile extract, decyl glucoside, citric acid.', howto: 'Pump once into wet hands, work into a foam, and rinse.' },
    { id: 'dew-barrier-cream', name: 'Dew Barrier Moisturizer', collection: 'skincare', type: 'Moisturizers', price: 28, shape: 'jar', bestseller: true, rating: 4.8, reviews: 540, variantLabel: 'Size', variants: [{ id: '1-7oz', label: '1.7 oz' }, { id: '3oz', label: '3 oz', price: 42 }], tagline: 'Rich, cushiony hydration that supports your skin barrier.', desc: 'A whipped cream with ceramides and squalane that keeps skin comfortable all day.', ingredients: 'Water, squalane, ceramide NP, shea butter, glycerin, tocopherol.', howto: 'Smooth over clean skin as the last step of your routine.' },
    { id: 'oat-water-gel', name: 'Oat Water Gel Moisturizer', collection: 'skincare', type: 'Moisturizers', price: 30, shape: 'jar', bestseller: false, rating: 4.5, reviews: 187, variantLabel: 'Size', variants: [{ id: '1-7oz', label: '1.7 oz' }], tagline: 'Weightless gel moisture for warm days.', desc: 'A bouncy water gel that sinks in fast and layers well under sunscreen.', ingredients: 'Water, oat extract, hyaluronic acid, aloe leaf juice, glycerin.', howto: 'Apply a pea-sized amount to face and neck morning and night.' },
    { id: 'clear-slate-serum', name: 'Clear Slate Serum', collection: 'skincare', type: 'Treatments', price: 34, shape: 'bottle', bestseller: false, rating: 4.4, reviews: 143, variantLabel: 'Size', variants: [{ id: '1oz', label: '1 oz' }], tagline: 'A daily serum for smoother-looking texture.', desc: 'Niacinamide and gentle acids to even out the look of skin over time.', ingredients: 'Water, niacinamide, gluconolactone, zinc PCA, glycerin.', howto: 'Apply 2-3 drops after cleansing. Use sunscreen during the day.' },
    { id: 'bright-c-ampoule', name: 'Bright C Ampoule', collection: 'skincare', type: 'Treatments', price: 42, shape: 'bottle', bestseller: false, rating: 4.6, reviews: 78, variantLabel: 'Size', variants: [{ id: '0-5oz', label: '0.5 oz' }], tagline: 'A small-batch vitamin C boost.', desc: 'A stable vitamin C blend for a brighter-looking morning routine.', ingredients: 'Water, ascorbyl glucoside, ferulic acid, glycerin, sodium hyaluronate.', howto: 'Press 2 drops into clean skin in the morning, before moisturizer.' },
    { id: 'daily-veil-spf', name: 'Daily Veil SPF 40', collection: 'skincare', type: 'Sunscreen', price: 26, shape: 'tube', bestseller: true, rating: 4.6, reviews: 421, variantLabel: 'Size', variants: [{ id: '1-7oz', label: '1.7 oz' }], tagline: 'Invisible, lightweight daily sunscreen.', desc: 'Broad-spectrum protection that disappears into skin with no white cast.', ingredients: 'Active: zinc oxide 14%. Inactive: water, squalane, glycerin, vitamin E.', howto: 'Apply generously 15 minutes before sun exposure and reapply every two hours.' },
    { id: 'starter-ritual-set', name: 'Starter Ritual Set', collection: 'skincare', type: 'Sets', price: 45, shape: 'set', bestseller: false, rating: 4.9, reviews: 64, variantLabel: 'Skin type', variants: [{ id: 'dry', label: 'Dry skin' }, { id: 'oily', label: 'Oily skin' }], tagline: 'Cleanser, moisturizer and sunscreen in travel sizes.', desc: 'Three mini products to try a simple routine, packed in a reusable pouch.', ingredients: 'See the individual product pages for full ingredient lists.', howto: 'Cleanse, moisturize, then finish with sunscreen in the morning.' },
    { id: 'brow-whisper-gel', name: 'Brow Whisper Gel', collection: 'makeup', type: 'Brow', price: 18, shape: 'stick', bestseller: true, rating: 4.7, reviews: 689, variantLabel: 'Shade', variants: [{ id: 'soft-brown', label: 'Soft Brown' }, { id: 'espresso', label: 'Espresso' }, { id: 'clear', label: 'Clear', soldOut: true }], tagline: 'A fluffy, tinted gel that shapes and holds.', desc: 'Tiny fibers add fullness while the flexible gel keeps hairs in place all day.', ingredients: 'Water, acrylates copolymer, panthenol, iron oxides, pea extract.', howto: 'Brush upward and outward through brows, starting at the inner corner.' },
    { id: 'petal-lip-balm', name: 'Lip Petal Balm', collection: 'makeup', type: 'Lip', price: 14, shape: 'stick', bestseller: true, rating: 4.8, reviews: 903, variantLabel: 'Shade', variants: [{ id: 'clear', label: 'Clear' }, { id: 'rose', label: 'Rose' }, { id: 'plum', label: 'Plum' }], tagline: 'A cushiony balm with a sheer wash of color.', desc: 'Soothes dry lips with shea butter and a hint of petal-pink tint.', ingredients: 'Ricinus communis seed oil, shea butter, beeswax, vitamin E, mica.', howto: 'Swipe on whenever lips need comfort.' },
    { id: 'cheek-wash-tint', name: 'Cheek Wash Tint', collection: 'makeup', type: 'Cheek', price: 20, shape: 'compact', bestseller: false, rating: 4.5, reviews: 215, variantLabel: 'Shade', variants: [{ id: 'peach', label: 'Peach' }, { id: 'berry', label: 'Berry' }], tagline: 'A liquid flush that blends like skin.', desc: 'Dab and blend with fingertips for a natural, lit-from-within look.', ingredients: 'Water, glycerin, caprylic triglyceride, iron oxides, aloe.', howto: 'Tap a small amount onto cheeks and blend outward.' },
    { id: 'skin-veil-tint', name: 'Skin Veil Tint', collection: 'makeup', type: 'Face', price: 28, shape: 'bottle', bestseller: false, rating: 4.2, reviews: 158, variantLabel: 'Shade', variants: [{ id: 'light', label: 'Light' }, { id: 'medium', label: 'Medium' }, { id: 'deep', label: 'Deep', soldOut: true }], tagline: 'Sheer coverage that lets skin show through.', desc: 'A light tinted moisturizer that evens tone without feeling like makeup.', ingredients: 'Water, squalane, glycerin, titanium dioxide, iron oxides.', howto: 'Shake well, then blend a small amount over face and neck.' },
    { id: 'lash-lift-mascara', name: 'Lash Lift Mascara', collection: 'makeup', type: 'Eye', price: 22, shape: 'stick', bestseller: false, rating: 4.4, reviews: 266, variantLabel: 'Shade', variants: [{ id: 'black', label: 'Black' }, { id: 'brown', label: 'Brown' }], tagline: 'Lengthening, smudge-resistant color.', desc: 'A flexible brush separates each lash for a defined, feathery finish.', ingredients: 'Water, beeswax, carnauba wax, iron oxides, panthenol.', howto: 'Wiggle the brush from root to tip. Layer for more drama.' },
    { id: 'lid-cloud-shadow', name: 'Lid Cloud Shadow', collection: 'makeup', type: 'Eye', price: 18, shape: 'compact', bestseller: false, rating: 4.1, reviews: 52, variantLabel: 'Shade', variants: [{ id: 'oat', label: 'Oat', soldOut: true }, { id: 'fig', label: 'Fig', soldOut: true }], tagline: 'A cream-to-powder wash of color for lids.', desc: 'Sweep on with a finger for a soft, one-swipe look. Currently sold out in every shade.', ingredients: 'Dimethicone, mica, silica, iron oxides, tocopherol.', howto: 'Dab onto lids and blend to the edges.' },
    { id: 'everyday-face-set', name: 'Everyday Face Set', collection: 'makeup', type: 'Sets', price: 38, shape: 'set', bestseller: false, rating: 4.7, reviews: 91, variantLabel: 'Shade', variants: [{ id: 'light', label: 'Light' }, { id: 'medium', label: 'Medium' }], tagline: 'Tint, cheek color and lip balm together.', desc: 'A grab-and-go trio for five-minute mornings.', ingredients: 'See the individual product pages for full ingredient lists.', howto: 'Apply tint first, then cheeks and lips.' },
    { id: 'dusk-fern-parfum', name: 'Dusk Fern Eau de Parfum', collection: 'fragrance', type: 'Fragrance', price: 68, shape: 'bottle', bestseller: true, rating: 4.6, reviews: 378, variantLabel: 'Size', variants: [{ id: '30ml', label: '30 ml' }, { id: '50ml', label: '50 ml', price: 92 }], tagline: 'Green fern, soft musk and cedar.', desc: 'A calm, woodsy scent that settles close to skin.', ingredients: 'Alcohol denat., fragrance, water, linalool, limonene.', howto: 'Spray on pulse points from about 6 inches away.' },
    { id: 'warm-linen-parfum', name: 'Warm Linen Eau de Parfum', collection: 'fragrance', type: 'Fragrance', price: 68, shape: 'bottle', bestseller: false, rating: 4.4, reviews: 129, variantLabel: 'Size', variants: [{ id: '30ml', label: '30 ml' }, { id: '50ml', label: '50 ml', price: 92 }], tagline: 'Sun-dried cotton, pear and amber.', desc: 'A clean, cozy scent that feels like a fresh sweater.', ingredients: 'Alcohol denat., fragrance, water, coumarin, limonene.', howto: 'Spray on pulse points from about 6 inches away.' },
    { id: 'pear-salt-mist', name: 'Pear Salt Body Mist', collection: 'fragrance', type: 'Fragrance', price: 24, shape: 'bottle', bestseller: false, rating: 4.3, reviews: 84, variantLabel: 'Size', variants: [{ id: '100ml', label: '100 ml' }], tagline: 'A light, juicy mist for hair and body.', desc: 'Crisp pear and sea salt in a refreshing everyday spray.', ingredients: 'Water, alcohol denat., fragrance, glycerin, sea salt.', howto: 'Mist over body and hair as often as you like.' }
  ];

  var STORES = [
    { name: 'Softbloom Mercer Street', city: 'New York', region: 'NY', zip: '10012', address: '100 Sample Mercer St', hours: 'Mon-Sat 10-8, Sun 11-6', sundays: true },
    { name: 'Softbloom Fillmore', city: 'San Francisco', region: 'CA', zip: '94115', address: '200 Example Fillmore St', hours: 'Mon-Sat 10-7, Sun 11-5', sundays: true },
    { name: 'Softbloom Silver Lake', city: 'Los Angeles', region: 'CA', zip: '90026', address: '300 Demo Sunset Blvd', hours: 'Mon-Sun 10-8', sundays: true },
    { name: 'Softbloom Newbury', city: 'Boston', region: 'MA', zip: '02116', address: '400 Placeholder Newbury St', hours: 'Mon-Sat 10-7, closed Sun', sundays: false },
    { name: 'Softbloom Wicker Park', city: 'Chicago', region: 'IL', zip: '60622', address: '500 Fictional Milwaukee Ave', hours: 'Tue-Sat 11-7, closed Sun-Mon', sundays: false },
    { name: 'Softbloom Capitol Hill', city: 'Seattle', region: 'WA', zip: '98102', address: '600 Mockup Pine St', hours: 'Mon-Sat 10-7, Sun 11-5', sundays: true }
  ];

  var STATES = ['CA', 'IL', 'MA', 'NY', 'TX', 'WA'];
  var SHIPPING = { standard: { label: 'Standard (3-5 business days)' }, express: { label: 'Express (1-2 business days)', cost: 12 } };
  var FREE_SHIPPING_AT = 40, STANDARD_SHIPPING = 5, MAX_QTY = 10;
  var CART_KEY = 'softbloom-cart-v1', ORDER_KEY = 'softbloom-last-order-v1';

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); };
  var money = function (n) { return '$' + n.toFixed(2); };
  var byId = function (id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; };
  var variantOf = function (p, vid) { return p.variants.filter(function (v) { return v.id === vid; })[0]; };
  var basePrice = function (p) { return p.price; };
  var inStock = function (p) { return p.variants.some(function (v) { return !v.soldOut; }); };
  var params = new URLSearchParams(location.search);
  var page = document.body.dataset.page;

  function safeStorage(kind) {
    try { var s = window[kind]; s.setItem('t', '1'); s.removeItem('t'); return s; } catch (e) {
      var m = {};
      return { getItem: function (k) { return k in m ? m[k] : null; }, setItem: function (k, v) { m[k] = String(v); }, removeItem: function (k) { delete m[k]; } };
    }
  }
  var local = safeStorage('localStorage'), session = safeStorage('sessionStorage');

  function announce(msg) {
    var r = $('#live-region');
    if (!r) return;
    r.textContent = '';
    setTimeout(function () { r.textContent = msg; }, 50);
  }

  /* ---------- cart ---------- */
  function getCart() {
    try {
      var c = JSON.parse(local.getItem(CART_KEY) || '[]');
      return Array.isArray(c) ? c.filter(function (l) { var p = byId(l.pid); return p && variantOf(p, l.vid) && l.qty > 0; }) : [];
    } catch (e) { return []; }
  }
  function saveCart(c) { local.setItem(CART_KEY, JSON.stringify(c)); renderCartUI(); }
  function addToCart(pid, vid, qty) {
    var c = getCart(), l = c.filter(function (x) { return x.pid === pid && x.vid === vid; })[0];
    if (l) l.qty = Math.min(MAX_QTY, l.qty + qty); else c.push({ pid: pid, vid: vid, qty: Math.min(MAX_QTY, qty) });
    saveCart(c);
    announce('Added ' + byId(pid).name + ' to your bag.');
  }
  function lineData(l) {
    var p = byId(l.pid), v = variantOf(p, l.vid), price = v.price || p.price;
    return { p: p, v: v, price: price, qty: l.qty, total: price * l.qty, key: l.pid + '|' + l.vid };
  }
  function subtotal(lines) { return lines.reduce(function (n, d) { return n + d.total; }, 0); }

  function lineHTML(d, editable) {
    var name = esc(d.p.name) + ', ' + esc(d.v.label);
    var controls = editable ? '<div class="qty" role="group" aria-label="Quantity for ' + name + '">' +
      '<button type="button" class="qty-btn" data-action="dec" data-key="' + d.key + '" aria-label="Decrease quantity of ' + name + '">&minus;</button>' +
      '<span class="qty-value">' + d.qty + '</span>' +
      '<button type="button" class="qty-btn" data-action="inc" data-key="' + d.key + '" aria-label="Increase quantity of ' + name + '">+</button></div>' +
      '<button type="button" class="link-button" data-action="remove" data-key="' + d.key + '" aria-label="Remove ' + name + '">Remove</button>' : '<p class="muted">Quantity: ' + d.qty + '</p>';
    return '<li class="cart-line" data-component="cart-line"><img src="assets/product-' + d.p.shape + '.svg" alt="" width="72" height="72">' +
      '<div><p class="line-name"><a href="product.html?id=' + d.p.id + '">' + esc(d.p.name) + '</a></p>' +
      '<p class="muted">' + esc(d.p.variantLabel) + ': ' + esc(d.v.label) + ' &middot; ' + money(d.price) + ' each</p>' + controls + '</div>' +
      '<p class="line-total">' + money(d.total) + '</p></li>';
  }

  function shippingCost(sub, method) {
    if (sub === 0) return 0;
    return method === 'express' ? SHIPPING.express.cost : (sub >= FREE_SHIPPING_AT ? 0 : STANDARD_SHIPPING);
  }

  function totalsHTML(sub, ship, shippingNote) {
    return '<dl class="totals"><div><dt>Subtotal</dt><dd>' + money(sub) + '</dd></div>' +
      '<div><dt>Shipping</dt><dd>' + shippingNote + '</dd></div>' +
      '<div class="grand"><dt>Total</dt><dd>' + money(sub + ship) + '</dd></div></dl>';
  }

  function renderCartUI() {
    var lines = getCart().map(lineData), sub = subtotal(lines);
    $$('.bag-count').forEach(function (el) { el.textContent = lines.reduce(function (n, d) { return n + d.qty; }, 0); });

    var body = $('#drawer-body'), foot = $('#drawer-foot');
    if (body) {
      body.innerHTML = lines.length ? '<ul class="cart-lines">' + lines.map(function (d) { return lineHTML(d, true); }).join('') + '</ul>' : '<p>Your bag is empty.</p>';
      foot.innerHTML = lines.length ?
        '<p class="row"><span>Subtotal</span><strong>' + money(sub) + '</strong></p><p class="muted">Shipping and total are shown at checkout. This is a demo store.</p>' +
        '<a class="btn btn-secondary" href="cart.html">View bag</a> <a class="btn" href="checkout.html">Checkout (demo)</a>' :
        '<a class="btn" href="shop.html">Start shopping</a>';
    }

    var root = $('#cart-root');
    if (root) {
      if (!lines.length) {
        root.innerHTML = '<section class="empty-state" data-component="empty-state" aria-labelledby="cart-empty-title"><h2 id="cart-empty-title" class="cart-focus" tabindex="-1">Your bag is empty</h2><p>Add something you like and it will show up here.</p><a class="btn" href="shop.html">Continue shopping</a></section>';
      } else {
        var left = FREE_SHIPPING_AT - sub;
        root.innerHTML = '<div class="cart-layout"><section aria-labelledby="cart-items-title" data-section="cart-items" data-component="cart-line-list"><h2 id="cart-items-title" class="cart-focus" tabindex="-1">Items (' + lines.length + ')</h2>' +
          '<ul class="cart-lines">' + lines.map(function (d) { return lineHTML(d, true); }).join('') + '</ul></section>' +
          '<section class="summary" aria-labelledby="cart-summary-title" data-section="cart-summary" data-component="order-summary"><h2 id="cart-summary-title">Order summary</h2>' +
          totalsHTML(sub, shippingCost(sub, 'standard'), sub >= FREE_SHIPPING_AT ? 'Free' : money(STANDARD_SHIPPING) + ' (standard)') +
          '<p class="muted">' + (left > 0 ? 'Add ' + money(left) + ' more for free standard shipping.' : 'You have unlocked free standard shipping.') + '</p>' +
          '<a class="btn" href="checkout.html">Checkout (demo)</a> <a class="btn btn-secondary" href="shop.html">Continue shopping</a></section></div>';
      }
    }
    renderCheckoutSummary();
  }

  function renderCheckoutSummary() {
    var box = $('#checkout-summary');
    if (!box) return;
    var lines = getCart().map(lineData), sub = subtotal(lines), form = $('#checkout-form');
    var method = form && form.elements.shipping.value || 'standard', ship = shippingCost(sub, method);
    $('#checkout-empty').hidden = lines.length > 0;
    form.hidden = !lines.length;
    box.hidden = !lines.length;
    box.innerHTML = '<h2 id="summary-title">Order summary</h2><ul class="cart-lines">' + lines.map(function (d) { return lineHTML(d, false); }).join('') + '</ul>' +
      totalsHTML(sub, ship, ship ? money(ship) : 'Free');
  }

  /* ---------- product cards ---------- */
  function cardHTML(p, level) {
    var from = p.variants.some(function (v) { return v.price; }) ? 'From ' : '';
    var available = p.variants.filter(function (v) { return !v.soldOut; });
    var action = !available.length ? '<span class="badge badge-muted">Sold out</span>' :
      p.variants.length === 1 ? '<button type="button" class="btn btn-small" data-action="quick-add" data-pid="' + p.id + '" data-vid="' + available[0].id + '" aria-label="Add to bag: ' + esc(p.name) + '">Add to bag</button>' :
      '<a class="btn btn-small btn-secondary" href="product.html?id=' + p.id + '" aria-label="Choose options: ' + esc(p.name) + '">Choose options</a>';
    return '<li class="card" data-component="product-card" data-collection="' + p.collection + '"><a class="card-media" href="product.html?id=' + p.id + '" tabindex="-1" aria-hidden="true"><img src="assets/product-' + p.shape + '.svg" alt="" width="240" height="240" loading="lazy"></a>' +
      '<div class="card-body">' + (p.bestseller ? '<span class="badge">Best-seller</span>' : '') +
      '<h' + level + ' class="card-title"><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h' + level + '>' +
      '<p class="muted">' + esc(p.type) + '</p><p class="price">' + from + money(basePrice(p)) + '</p>' + action + '</div></li>';
  }
  function renderCards(list, level) { return list.map(function (p) { return cardHTML(p, level); }).join(''); }

  /* ---------- forms ---------- */
  var req = function (what) { return function (v) { return v ? '' : 'Enter ' + what + '.'; }; };
  var reqSelect = function (what) { return function (v) { return v ? '' : 'Select ' + what + '.'; }; };
  var emailRule = function (v) { return !v ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter an email address like name@example.com.'; };

  function validate(form, rules) {
    var errors = [];
    $$('.field-error', form).forEach(function (p) { p.hidden = true; p.textContent = ''; });
    $$('[aria-invalid]', form).forEach(function (i) { i.removeAttribute('aria-invalid'); });
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name], first = $('[name="' + name + '"]', form);
      var msg = rules[name]((field.value || '').trim(), form);
      if (!msg) return;
      var out = $('#' + name + '-error', form);
      out.textContent = msg; out.hidden = false;
      first.setAttribute('aria-invalid', 'true');
      errors.push({ id: first.id, msg: msg });
    });
    var summary = $('.error-summary', form);
    if (summary) {
      summary.hidden = !errors.length;
      if (errors.length) {
        summary.innerHTML = '<h2>There ' + (errors.length === 1 ? 'is 1 problem' : 'are ' + errors.length + ' problems') + ' with your entries</h2><ul>' +
          errors.map(function (e) { return '<li><a href="#' + e.id + '">' + esc(e.msg) + '</a></li>'; }).join('') + '</ul>';
        summary.focus();
      }
    }
    return !errors.length;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('.error-summary a');
    if (!a) return;
    e.preventDefault();
    var t = document.getElementById(a.getAttribute('href').slice(1));
    if (t) t.focus();
  });

  function showStatus(form, msg) {
    var s = $('.form-status', form);
    s.textContent = msg; s.hidden = false;
  }
  function luhn(n) {
    var sum = 0, alt = false;
    for (var i = n.length - 1; i >= 0; i--) { var d = +n[i]; if (alt) { d *= 2; if (d > 9) d -= 9; } sum += d; alt = !alt; }
    return sum % 10 === 0;
  }

  /* ---------- header, menus, dialogs ---------- */
  function initHeader() {
    var nav = $('#primary-nav'), toggle = $('.menu-toggle');
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    function closeSubmenus(except) {
      $$('.submenu-toggle').forEach(function (b) {
        if (b === except) return;
        b.setAttribute('aria-expanded', 'false');
        document.getElementById(b.getAttribute('aria-controls')).hidden = true;
      });
    }
    $$('.submenu-toggle').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true';
        closeSubmenus(b);
        b.setAttribute('aria-expanded', String(open));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openBtn = $('.submenu-toggle[aria-expanded="true"]');
      if (openBtn) { closeSubmenus(); if (nav.contains(document.activeElement)) openBtn.focus(); return; }
      if (toggle.getAttribute('aria-expanded') === 'true') { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); toggle.focus(); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('#primary-nav')) closeSubmenus(); });
    nav.addEventListener('focusout', function (e) { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeSubmenus(); });

    var here = location.pathname.split('/').pop() + (page === 'shop' && !params.get('collection') ? '?collection=all' : location.search);
    $$('#primary-nav a').forEach(function (a) { if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page'); });

    var region = $('#region-select');
    region.value = session.getItem('softbloom-region') || 'United States';
    region.addEventListener('change', function () {
      session.setItem('softbloom-region', region.value);
      announce('Region set to ' + region.value + '. Demo only: prices stay in US dollars.');
      $('#region-note').textContent = 'Demo only: prices stay in USD.';
    });
  }

  function initDialogs() {
    var drawer = $('#cart-drawer');
    $('#bag-button').addEventListener('click', function () { drawer.showModal(); });
    var cookieBtn = $('#cookie-button');
    cookieBtn.addEventListener('click', function () { $('#cookie-dialog').showModal(); });
    $$('dialog').forEach(function (d) {
      d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    });
    document.addEventListener('click', function (e) {
      var c = e.target.closest('[data-close-dialog]');
      if (c) c.closest('dialog').close();
    });
  }

  document.addEventListener('click', function (e) {
    var acc = e.target.closest('.acc-button');
    if (acc) {
      var open = acc.getAttribute('aria-expanded') !== 'true';
      acc.setAttribute('aria-expanded', String(open));
      document.getElementById(acc.getAttribute('aria-controls')).hidden = !open;
      return;
    }
    var b = e.target.closest('[data-action]');
    if (!b) return;
    var action = b.dataset.action;
    if (action === 'quick-add') {
      addToCart(b.dataset.pid, b.dataset.vid, 1);
      $('#cart-drawer').showModal();
    } else if (action === 'inc' || action === 'dec' || action === 'remove') {
      var scopeName = b.closest('[data-cart-scope]').dataset.cartScope, key = b.dataset.key;
      var cart = getCart().filter(function (l) {
        if (l.pid + '|' + l.vid !== key) return true;
        if (action === 'remove') return false;
        l.qty = Math.min(MAX_QTY, Math.max(0, l.qty + (action === 'inc' ? 1 : -1)));
        return l.qty > 0;
      });
      saveCart(cart);
      var scope = $('[data-cart-scope="' + scopeName + '"]');
      var again = $('[data-action="' + action + '"][data-key="' + key + '"]', scope) || $('.cart-focus', scope);
      if (again) again.focus();
      announce(action === 'remove' ? 'Item removed from your bag.' : 'Bag updated.');
    }
  });

  /* ---------- page: home ---------- */
  function initHome() {
    $('#home-bestsellers').innerHTML = renderCards(PRODUCTS.filter(function (p) { return p.bestseller; }).slice(0, 4), 3);
    var form = $('#newsletter-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form, { email: emailRule })) return;
      showStatus(form, 'Demo only: nothing was submitted and no email was saved.');
      form.reset();
    });
  }

  /* ---------- page: shop ---------- */
  function initShop() {
    var key = COLLECTIONS[params.get('collection')] ? params.get('collection') : 'all', coll = COLLECTIONS[key];
    var inColl = PRODUCTS.filter(coll.test);
    document.title = coll.title + ' - Softbloom';
    $('#shop-title').textContent = coll.title;
    $('#shop-desc').textContent = coll.desc;
    $('#crumb-current').textContent = coll.title;
    $$('.collection-nav a').forEach(function (a) { if (a.getAttribute('href') === 'shop.html?collection=' + key) a.setAttribute('aria-current', 'page'); });

    var types = inColl.map(function (p) { return p.type; }).filter(function (t, i, a) { return a.indexOf(t) === i; });
    var preset = (params.get('type') || '').split(',');
    var form = $('#filters');
    $('#filter-fields').innerHTML =
      '<fieldset><legend>Product type</legend>' + types.map(function (t, i) {
        return '<div class="check"><input type="checkbox" name="type" id="type-' + i + '" value="' + esc(t) + '"' + (preset.indexOf(t) > -1 ? ' checked' : '') + '><label for="type-' + i + '">' + esc(t) + '</label></div>';
      }).join('') + '</fieldset>' +
      '<fieldset><legend>Price</legend>' + [['u25', 'Under $25'], ['m', '$25 to $50'], ['o50', 'Over $50']].map(function (o) {
        return '<div class="check"><input type="checkbox" name="price" id="price-' + o[0] + '" value="' + o[0] + '"><label for="price-' + o[0] + '">' + o[1] + '</label></div>';
      }).join('') + '</fieldset>' +
      '<fieldset><legend>Availability</legend><div class="check"><input type="checkbox" name="stock" id="stock" value="1"><label for="stock">In stock only</label></div></fieldset>';

    var grid = $('#product-grid'), count = $('#result-count'), empty = $('#empty-state');
    function bucket(p) { return p.price < 25 ? 'u25' : p.price <= 50 ? 'm' : 'o50'; }
    function render() {
      var t = $$('[name="type"]:checked', form).map(function (i) { return i.value; });
      var pr = $$('[name="price"]:checked', form).map(function (i) { return i.value; });
      var stock = $('#stock').checked, sort = $('#sort').value;
      var list = inColl.filter(function (p) {
        return (!t.length || t.indexOf(p.type) > -1) && (!pr.length || pr.indexOf(bucket(p)) > -1) && (!stock || inStock(p));
      });
      if (sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
      else if (sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
      else if (sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name); });
      grid.innerHTML = renderCards(list, 2);
      count.textContent = list.length + (list.length === 1 ? ' product' : ' products');
      empty.hidden = list.length > 0;
      grid.hidden = !list.length;
    }
    form.addEventListener('change', render);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    $('#sort').addEventListener('change', render);
    function clear() { form.reset(); $('#sort').value = 'featured'; render(); }
    $('#clear-filters').addEventListener('click', clear);
    $('#empty-clear').addEventListener('click', function () { clear(); $('#shop-title').focus(); });

    var ft = $('#filters-toggle'), panel = $('#filter-panel');
    ft.addEventListener('click', function () {
      var open = ft.getAttribute('aria-expanded') !== 'true';
      ft.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ft.getAttribute('aria-expanded') === 'true' && getComputedStyle(ft).display !== 'none') { ft.click(); ft.focus(); }
    });
    render();
  }

  /* ---------- page: product ---------- */
  function initProduct() {
    var root = $('#product-root'), id = params.get('id') || PRODUCTS[0].id, p = byId(id);
    if (!p) {
      document.title = 'Product not found - Softbloom';
      root.innerHTML = '<section class="empty-state" data-component="empty-state"><h2>We could not find that product</h2><p>The link may be old. Browse the full range instead.</p><a class="btn" href="shop.html">Shop all</a></section>';
      $('#product-title-fallback').hidden = false;
      return;
    }
    document.title = p.name + ' - Softbloom';
    var images = [
      { src: 'assets/product-' + p.shape + '.svg', alt: p.name + ', front of pack (illustration)' },
      { src: 'assets/texture.svg', alt: 'Illustration of the product texture' },
      { src: 'assets/lifestyle.svg', alt: 'Illustration of the product in a daily routine' }
    ];
    var first = p.variants.filter(function (v) { return !v.soldOut; })[0];
    var soldOut = !first;
    var stars = '&#9733;'.repeat(Math.round(p.rating)) + '&#9734;'.repeat(5 - Math.round(p.rating));
    var coll = COLLECTIONS[p.collection];
    function acc(n, title, text) {
      return '<div class="acc-item"><h2 class="acc-heading"><button type="button" class="acc-button" aria-expanded="false" aria-controls="acc-' + n + '">' + title + '</button></h2><div id="acc-' + n + '" class="acc-panel" hidden><p>' + esc(text) + '</p></div></div>';
    }
    root.innerHTML =
      '<div class="pdp" data-section="product-detail">' +
      '<div class="pdp-gallery" data-section="product-gallery" data-component="product-gallery"><div class="gallery-main" data-collection="' + p.collection + '"><img id="gallery-image" src="' + images[0].src + '" alt="' + esc(images[0].alt) + '" width="480" height="480"></div>' +
      '<ul class="thumbs">' + images.map(function (im, i) {
        return '<li><button type="button" class="thumb" data-index="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Show image ' + (i + 1) + ' of 3"><img src="' + im.src + '" alt="" width="64" height="64"></button></li>';
      }).join('') + '</ul></div>' +
      '<div class="pdp-info" data-section="product-info"><h1>' + esc(p.name) + '</h1><p class="lead">' + esc(p.tagline) + '</p>' +
      '<p class="rating"><span aria-hidden="true">' + stars + '</span> <span>' + p.rating + ' out of 5 (' + p.reviews + ' sample reviews)</span></p>' +
      '<p class="price pdp-price" id="pdp-price">' + money(first ? (first.price || p.price) : p.price) + '</p>' +
      '<p>' + esc(p.desc) + '</p>' +
      '<form id="pdp-form" novalidate data-section="add-to-bag" data-component="product-form"><div class="error-summary" role="alert" tabindex="-1" hidden></div>' +
      '<fieldset class="variants" data-component="variant-selector" aria-describedby="variant-error"><legend>' + esc(p.variantLabel) + '</legend>' + p.variants.map(function (v, i) {
        return '<div class="variant"><input type="radio" name="variant" id="variant-' + i + '" value="' + v.id + '"' + (v === first ? ' checked' : '') + (v.soldOut ? ' disabled' : '') + '><label for="variant-' + i + '">' + esc(v.label) + (v.soldOut ? ' (sold out)' : '') + '</label></div>';
      }).join('') + '</fieldset><p class="field-error" id="variant-error" hidden></p>' +
      '<div class="field qty-field"><label for="qty">Quantity</label><div class="qty-input"><button type="button" class="qty-btn" data-qty="-1" aria-label="Decrease quantity">&minus;</button><input id="qty" name="qty" type="number" inputmode="numeric" min="1" max="' + MAX_QTY + '" value="1" aria-describedby="qty-hint qty-error"><button type="button" class="qty-btn" data-qty="1" aria-label="Increase quantity">+</button></div>' +
      '<p class="hint" id="qty-hint">Up to ' + MAX_QTY + ' per order.</p><p class="field-error" id="qty-error" hidden></p></div>' +
      '<button type="submit" class="btn btn-wide" id="add-button"' + (soldOut ? ' disabled' : '') + '>' + (soldOut ? 'Sold out' : 'Add to bag') + '</button></form>' +
      '<div class="accordion" data-component="accordion" data-section="product-details">' + acc(1, 'Ingredients', p.ingredients) + acc(2, 'How to use', p.howto) + acc(3, 'Shipping and returns', 'Standard shipping is free over $40. Unopened items can be returned within 30 days. This is a demo store, so nothing actually ships.') + '</div></div></div>' +
      '<div class="sticky-atb" id="sticky-atb" hidden data-component="sticky-add-to-bag"><p><strong>' + esc(p.name) + '</strong></p><button type="button" class="btn btn-small" id="sticky-add">Add to bag</button></div>' +
      '<section aria-labelledby="related-title" data-section="related-products" data-component="card-grid"><h2 id="related-title">You may also like</h2><ul class="card-grid">' +
      renderCards(PRODUCTS.filter(function (o) { return o.collection === p.collection && o.id !== p.id; }).slice(0, 4), 3) + '</ul></section>';

    $('#crumb-collection').textContent = coll.title;
    $('#crumb-collection').href = 'shop.html?collection=' + p.collection;
    $('#crumb-current').textContent = p.name;

    var form = $('#pdp-form'), qty = $('#qty');
    form.addEventListener('change', function (e) {
      if (e.target.name !== 'variant') return;
      var v = variantOf(p, e.target.value);
      $('#pdp-price').textContent = money(v.price || p.price);
    });
    form.addEventListener('click', function (e) {
      var q = e.target.closest('[data-qty]');
      if (q) qty.value = Math.min(MAX_QTY, Math.max(1, (parseInt(qty.value, 10) || 1) + (+q.dataset.qty)));
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = validate(form, {
        variant: function (v) { return v ? '' : 'Select a ' + p.variantLabel.toLowerCase() + '.'; },
        qty: function (v) { var n = Number(v); return v && Number.isInteger(n) && n >= 1 && n <= MAX_QTY ? '' : 'Enter a quantity between 1 and ' + MAX_QTY + '.'; }
      });
      if (!ok) return;
      addToCart(p.id, form.elements.variant.value, parseInt(qty.value, 10));
      $('#cart-drawer').showModal();
    });
    $('#sticky-add').addEventListener('click', function () { form.requestSubmit(); });
    if (!soldOut) {
      var sticky = $('#sticky-atb'), addBtn = $('#add-button');
      var syncSticky = function () { sticky.hidden = addBtn.getBoundingClientRect().bottom >= 0; };
      addEventListener('scroll', syncSticky, { passive: true });
      addEventListener('resize', syncSticky);
      syncSticky();
    }
    $$('.thumb').forEach(function (t) {
      t.addEventListener('click', function () {
        var im = images[+t.dataset.index], main = $('#gallery-image');
        main.src = im.src; main.alt = im.alt;
        $$('.thumb').forEach(function (o) { o.setAttribute('aria-pressed', String(o === t)); });
      });
    });
  }

  /* ---------- page: search ---------- */
  function initSearch() {
    var q = (params.get('q') || '').trim(), input = $('#search-page-input');
    input.value = q;
    var title = $('#search-title'), grid = $('#search-grid'), empty = $('#search-empty');
    if (!q) {
      title.textContent = 'Search';
      $('#search-summary').textContent = 'Type a product, ingredient or category, such as balm or sunscreen.';
      return;
    }
    var words = q.toLowerCase().split(/\s+/);
    var hits = PRODUCTS.filter(function (p) {
      var hay = (p.name + ' ' + p.type + ' ' + p.collection + ' ' + p.tagline + ' ' + p.desc + ' ' + p.ingredients).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) > -1; });
    });
    document.title = 'Search results for "' + q + '" - Softbloom';
    title.textContent = 'Search results for “' + q + '”';
    $('#search-summary').textContent = hits.length + (hits.length === 1 ? ' item' : ' items');
    grid.innerHTML = renderCards(hits, 2);
    empty.hidden = hits.length > 0;
    grid.hidden = !hits.length;
    announce(hits.length + ' results for ' + q);
  }

  /* ---------- page: gift guide ---------- */
  function initGifts() {
    var groups = {
      under25: function (p) { return p.price < 25; },
      sets: function (p) { return p.type === 'Sets'; },
      fragrance: function (p) { return p.collection === 'fragrance'; }
    };
    $$('[data-gift-group]').forEach(function (el) { el.innerHTML = renderCards(PRODUCTS.filter(groups[el.dataset.giftGroup]), 3); });
  }

  /* ---------- page: checkout ---------- */
  function initCheckout() {
    var form = $('#checkout-form');
    form.elements.state.innerHTML = '<option value="">Select a state</option>' + STATES.map(function (s) { return '<option>' + s + '</option>'; }).join('');
    form.addEventListener('change', function (e) { if (e.target.name === 'shipping') renderCheckoutSummary(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = validate(form, {
        email: emailRule,
        firstName: req('your first name'), lastName: req('your last name'), address: req('your street address'), city: req('your city'),
        state: reqSelect('a state'),
        zip: function (v) { return /^\d{5}$/.test(v) ? '' : 'Enter a 5-digit ZIP code.'; },
        shipping: reqSelect('a shipping method'),
        cardName: req('the name on the card'),
        cardNumber: function (v) { var n = v.replace(/\s/g, ''); return /^\d{13,19}$/.test(n) && luhn(n) ? '' : 'Enter a valid card number. For this demo use 4242 4242 4242 4242.'; },
        expiry: function (v) {
          var m = /^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/.exec(v), now = new Date();
          if (!m) return 'Enter the expiry date as MM/YY.';
          return (2000 + +m[2]) * 12 + +m[1] < now.getFullYear() * 12 + now.getMonth() + 1 ? 'This card has expired. Enter a future date.' : '';
        },
        cvc: function (v) { return /^\d{3,4}$/.test(v) ? '' : 'Enter the 3 or 4 digit security code.'; }
      });
      if (!ok) return;
      var lines = getCart().map(lineData), sub = subtotal(lines), method = form.elements.shipping.value, ship = shippingCost(sub, method);
      session.setItem(ORDER_KEY, JSON.stringify({
        id: 'DEMO-' + String(Math.floor(10000 + Math.random() * 90000)), email: form.elements.email.value.trim(), first: form.elements.firstName.value.trim(),
        ship: form.elements.address.value.trim() + ', ' + form.elements.city.value.trim() + ', ' + form.elements.state.value + ' ' + form.elements.zip.value.trim(),
        method: SHIPPING[method].label, sub: sub, shipping: ship,
        items: lines.map(function (d) { return { name: d.p.name, variant: d.v.label, qty: d.qty, total: d.total }; })
      }));
      saveCart([]);
      location.href = 'order-confirmation.html';
    });
    renderCheckoutSummary();
  }

  function initConfirmation() {
    var o;
    try { o = JSON.parse(session.getItem(ORDER_KEY)); } catch (e) { o = null; }
    var box = $('#order-root');
    if (!o) {
      box.innerHTML = '<section class="empty-state" data-component="empty-state"><h2>No demo order found</h2><p>Demo orders only last for the current browser tab. Place one from the checkout page.</p><a class="btn" href="shop.html">Shop all</a></section>';
      return;
    }
    box.innerHTML = '<section class="summary" aria-labelledby="order-title" data-section="order-details" data-component="order-summary"><h2 id="order-title">Demo order ' + esc(o.id) + '</h2>' +
      '<p>Thanks, ' + esc(o.first) + '. This is a simulated confirmation: <strong>no payment was taken, no email was sent and nothing will ship.</strong></p>' +
      '<ul class="cart-lines">' + o.items.map(function (i) { return '<li class="cart-line"><div><p class="line-name">' + esc(i.name) + '</p><p class="muted">' + esc(i.variant) + ' &middot; Quantity ' + i.qty + '</p></div><p class="line-total">' + money(i.total) + '</p></li>'; }).join('') + '</ul>' +
      totalsHTML(o.sub, o.shipping, o.shipping ? money(o.shipping) : 'Free') +
      '<h3>Shipping to</h3><p>' + esc(o.ship) + '<br>' + esc(o.method) + '</p><a class="btn" href="index.html">Back to home</a></section>';
    $('#order-title').tabIndex = -1;
    $('#order-title').focus();
  }

  /* ---------- page: account ---------- */
  function initAccount() {
    var form = $('#login-form'), reset = $('#reset-form'), link = $('#forgot-button');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form, { email: emailRule, password: function (v) { return v.length >= 8 ? '' : 'Enter a password with at least 8 characters.'; } })) return;
      showStatus(form, 'Demo only: there are no accounts on this site, so you were not signed in.');
    });
    reset.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(reset, { 'reset-email': emailRule })) return;
      showStatus(reset, 'Demo only: no reset email was sent.');
    });
    link.addEventListener('click', function () {
      var open = link.getAttribute('aria-expanded') !== 'true';
      link.setAttribute('aria-expanded', String(open));
      reset.hidden = !open;
      if (open) $('#reset-email').focus();
    });
  }

  /* ---------- page: locations ---------- */
  function initLocations() {
    var q = $('#store-query'), sun = $('#store-sunday'), list = $('#store-list'), count = $('#store-count'), empty = $('#store-empty');
    function render() {
      var term = q.value.trim().toLowerCase();
      var hits = STORES.filter(function (s) {
        return (!term || (s.city + ' ' + s.region + ' ' + s.zip + ' ' + s.name).toLowerCase().indexOf(term) > -1) && (!sun.checked || s.sundays);
      });
      list.innerHTML = hits.map(function (s) {
        return '<li class="store" data-component="store-card"><h3>' + esc(s.name) + '</h3><p>' + esc(s.address) + '<br>' + esc(s.city) + ', ' + s.region + ' ' + s.zip + '</p><p class="muted">' + esc(s.hours) + '</p></li>';
      }).join('');
      count.textContent = hits.length + (hits.length === 1 ? ' store' : ' stores');
      empty.hidden = hits.length > 0;
    }
    q.addEventListener('input', render);
    sun.addEventListener('change', render);
    $('#store-form').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    render();
  }

  /* ---------- page: help ---------- */
  function initHelp() {
    var q = $('#faq-query'), items = $$('#faq-list .acc-item'), count = $('#faq-count'), empty = $('#faq-empty');
    function render() {
      var term = q.value.trim().toLowerCase(), n = 0;
      items.forEach(function (it) {
        var show = !term || it.textContent.toLowerCase().indexOf(term) > -1;
        it.hidden = !show;
        if (show) n++;
      });
      count.textContent = n + (n === 1 ? ' answer' : ' answers');
      empty.hidden = n > 0;
    }
    q.addEventListener('input', render);
    $('#faq-form').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    var form = $('#contact-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form, {
        name: req('your name'), email: emailRule, topic: reqSelect('a topic'),
        message: function (v) { return v.length >= 10 ? '' : 'Enter a message of at least 10 characters.'; }
      })) return;
      showStatus(form, 'Demo only: your message was not sent anywhere.');
      form.reset();
    });
  }

  /* ---------- boot ---------- */
  initHeader();
  initDialogs();
  renderCartUI();
  var pages = { home: initHome, shop: initShop, product: initProduct, search: initSearch, gifts: initGifts, checkout: initCheckout, confirmation: initConfirmation, account: initAccount, locations: initLocations, help: initHelp };
  if (pages[page]) pages[page]();
}());
