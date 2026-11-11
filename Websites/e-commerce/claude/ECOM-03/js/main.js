/* Larkwater Outfitters - fictional demo store (ECOM-03). Vanilla JS, no network, data inline. */
(function () {
  'use strict';

  /* ---------- Data ---------- */
  var DEPTS = { men: 'Men', women: 'Women', fishing: 'Fly Fishing', dog: 'Dog', hunt: 'Hunt', home: 'Home Goods', packs: 'Packs & Bags' };
  var DEPT_PAGES = { men: 'men.html', women: 'women.html', fishing: 'fly-fishing.html', dog: 'dog-products.html', hunt: 'hunt.html', home: 'search.html?dept=home', packs: 'search.html?dept=packs' };
  var CATS = {
    waders: 'Waders', rods: 'Fly Rods', reels: 'Reels', boots: 'Wading Boots', accessories: 'Accessories',
    'm-jackets': "Men's Jackets & Vests", 'm-shirts': "Men's Shirts", 'm-pants': "Men's Pants",
    'w-jackets': "Women's Jackets", 'w-tops': "Women's Tops & Layers", 'w-pants': "Women's Pants",
    'dog-beds': 'Dog Beds', 'dog-gear': 'Dog Gear', 'dog-toys': 'Dog Toys',
    'hunt-outerwear': 'Hunting Outerwear', 'hunt-gear': 'Hunting Gear',
    'home-decor': 'Home Décor', 'home-kitchen': 'Camp Kitchen', packs: 'Packs & Bags'
  };
  var COLORS = { Olive: '#5b6b3a', Slate: '#4a5a6a', Spruce: '#24493b', Plum: '#5e3a57', Sand: '#c9b58a', Rust: '#a4441c', Charcoal: '#3a3d40', Sky: '#7fa6c4', Khaki: '#a89a6a', Navy: '#1f3350', Moss: '#7a8450', Cream: '#efe6d0', Blaze: '#e8590c', Timber: '#6b4f33' };
  var AP = ['S', 'M', 'L', 'XL', 'XXL'], WAP = ['XS', 'S', 'M', 'L', 'XL'], WD = ['S', 'M', 'L', 'XL'];
  var SIZE_ORDER = ['Youth S', 'Youth M', 'Youth L', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Small', 'Medium', 'Large'];

  // P(id, name, dept, cat, price, salePrice(0 = none), image, colors, sizes, features, style, rating, reviews, isNew, blurb, soldOut["Color|Size"])
  function P(id, name, dept, cat, price, sale, img, colors, sizes, feats, style, rating, reviews, isNew, blurb, oos) {
    return { id: id, name: name, dept: dept, cat: cat, price: price, sale: sale, img: img, colors: colors, sizes: sizes, feats: feats, style: style, rating: rating, reviews: reviews, isNew: isNew, blurb: blurb, oos: oos || [] };
  }
  var PRODUCTS = [
    P('riverbend-kids-waders', "Kids' Riverbend Waders", 'fishing', 'waders', 149, 0, 'waders', ['Olive', 'Slate'], ['Youth S', 'Youth M', 'Youth L'], ['Waterproof', 'Breathable'], 'Stockingfoot', 4.7, 86, false, 'Taped-seam chest waders with adjustable straps, sized for young anglers who keep growing.', ['Slate|Youth L']),
    P('tidewater-mens-waders', "Men's Tidewater Waders", 'fishing', 'waders', 349, 0, 'waders', ['Spruce', 'Slate'], AP, ['Waterproof', 'Breathable'], 'Stockingfoot', 4.8, 412, false, 'Five-layer breathable shell with a gravel guard and a zip-away chest pocket for long days in cold current.', []),
    P('tidewater-womens-waders', "Women's Tidewater Waders", 'fishing', 'waders', 329, 0, 'waders', ['Spruce', 'Plum'], WAP, ['Waterproof', 'Breathable'], 'Stockingfoot', 4.7, 268, false, 'Cut for women, with a lower rise, adjustable suspenders and the same five-layer shell as the men\'s version.', ['Plum|XS']),
    P('frostline-bootfoot', "Men's Frostline Bootfoot Waders", 'fishing', 'waders', 279, 219, 'waders', ['Olive'], ['9', '10', '11', '12', '13'], ['Waterproof', 'Insulated'], 'Bootfoot', 4.4, 138, false, 'Neoprene-lined bootfoot waders for winter steelhead and late-season runs.', []),
    P('shallows-hip-waders', 'Shallows Hip Waders', 'fishing', 'waders', 129, 0, 'waders', ['Olive'], ['M', 'L', 'XL'], ['Waterproof', 'Packable'], 'Hip', 4.1, 57, false, 'Belted hip waders for creek crossings and warm-weather wet wading.', []),
    P('featherpack-waders', 'Featherpack Ultralight Waders', 'fishing', 'waders', 299, 0, 'waders', ['Slate'], WD, ['Waterproof', 'Breathable', 'Packable'], 'Stockingfoot', 4.6, 73, true, 'Light enough for the hike in, and they pack down to the size of a loaf of bread.', []),
    P('meadowfly-rod', 'Meadowfly 9-Foot 5-Weight Fly Rod', 'fishing', 'rods', 398, 0, 'rod', ['Spruce'], [], ['Travel case included'], 'Medium-fast', 4.9, 203, false, 'A four-piece graphite rod with a forgiving tip for dry flies and small streamers.', []),
    P('pocketline-travel-rod', 'Pocketline 6-Piece Travel Rod', 'fishing', 'rods', 298, 0, 'rod', ['Charcoal'], [], ['Travel case included', 'Packable'], 'Medium-fast', 4.5, 91, false, 'Six short sections ride in a carry-on bag and assemble in under a minute.', []),
    P('cadence-reel', 'Cadence Large-Arbor Reel', 'fishing', 'reels', 219, 189, 'rod', ['Slate', 'Rust'], [], ['Waterproof'], 'Large arbor', 4.6, 119, false, 'Machined aluminium frame with a sealed drag that stays smooth in cold water.', []),
    P('gravelbar-boots', 'Gravelbar Rubber-Sole Wading Boots', 'fishing', 'boots', 189, 0, 'waders', ['Charcoal'], ['8', '9', '10', '11', '12', '13'], ['Studs-ready'], 'Lace-up', 4.3, 144, false, 'Sticky rubber soles with pre-drilled stud holes and a fast-draining upper.', []),
    P('dry-fly-box', 'Waterproof Dry-Fly Box', 'fishing', 'accessories', 24, 0, 'rod', ['Charcoal'], [], ['Waterproof'], 'Slit foam', 4.4, 61, false, 'Slotted foam holds 60 flies, and the gasketed lid keeps them dry.', []),
    P('fieldstone-jacket', "Men's Fieldstone Waxed Jacket", 'men', 'm-jackets', 229, 0, 'jacket', ['Olive', 'Charcoal'], AP, ['Water-resistant'], 'Waxed cotton', 4.6, 95, true, 'Waxed cotton canvas with a corduroy collar and four deep pockets. It gets better with age.', ['Charcoal|XXL']),
    P('ridgeline-fleece', "Men's Ridgeline Fleece Pullover", 'men', 'm-jackets', 99, 0, 'jacket', ['Slate', 'Rust'], AP, ['Machine washable'], 'Pullover', 4.5, 310, false, 'Grid-backed fleece that layers under a shell or stands alone on a crisp morning.', []),
    P('sunbreak-mens-shirt', "Men's Sunbreak Fishing Shirt", 'men', 'm-shirts', 79, 0, 'shirt', ['Sky', 'Sand'], AP, ['UPF 50', 'Quick-dry'], 'Long sleeve', 4.7, 521, false, 'Vented back, roll-up sleeves and a chest pocket sized for a tippet spool.', []),
    P('trailworn-chinos', "Men's Trailworn Stretch Chinos", 'men', 'm-pants', 98, 68, 'pants', ['Khaki', 'Charcoal'], ['30', '32', '34', '36', '38'], ['Machine washable'], 'Straight fit', 4.3, 177, false, 'Cotton-blend chinos with a little give in the knee for scrambling down a bank.', []),
    P('lowland-vest', "Men's Lowland Insulated Vest", 'men', 'm-jackets', 128, 0, 'jacket', ['Navy', 'Moss'], AP, ['Insulated', 'Packable'], 'Vest', 4.5, 48, true, 'Recycled-fill insulation in a vest that stuffs into its own pocket.', []),
    P('heron-rain-shell', "Women's Heron Rain Shell", 'women', 'w-jackets', 199, 0, 'jacket', ['Navy', 'Rust'], WAP, ['Waterproof', 'Packable'], 'Shell', 4.7, 156, false, 'A hooded three-layer shell with pit zips and a brim that holds its shape in the rain.', []),
    P('cedar-quarter-zip', "Women's Cedar Fleece Quarter-Zip", 'women', 'w-tops', 89, 0, 'shirt', ['Plum', 'Moss'], WAP, ['Machine washable'], 'Quarter-zip', 4.6, 202, false, 'Soft-faced fleece with a roomy collar and thumb loops.', []),
    P('sunbreak-womens-shirt', "Women's Sunbreak Fishing Shirt", 'women', 'w-tops', 79, 0, 'shirt', ['Sky', 'Sand'], WAP, ['UPF 50', 'Quick-dry'], 'Long sleeve', 4.7, 337, false, 'The same vented, sun-smart design as the men\'s shirt, cut with a shaped waist.', []),
    P('brookside-pants', "Women's Brookside Stretch Pants", 'women', 'w-pants', 98, 0, 'pants', ['Khaki', 'Navy'], ['2', '4', '6', '8', '10', '12'], ['Quick-dry', 'UPF 50'], 'Straight fit', 4.4, 129, false, 'Lightweight stretch pants that dry fast after a wade.', []),
    P('alder-cardigan', "Women's Alder Wool Cardigan", 'women', 'w-tops', 118, 0, 'shirt', ['Cream', 'Spruce'], WAP, ['Merino wool'], 'Cardigan', 4.5, 38, true, 'A merino-blend cardigan with horn-style buttons and deep patch pockets.', []),
    P('hearth-bolster-bed', 'Hearth Bolster Dog Bed', 'dog', 'dog-beds', 129, 0, 'dog', ['Moss', 'Cream'], ['Small', 'Medium', 'Large'], ['Machine washable'], 'Bolster', 4.8, 640, false, 'A bolstered bed with a removable, washable cover and a non-slip base.', ['Cream|Small']),
    P('waxed-canvas-leash', 'Waxed Canvas Dog Leash', 'dog', 'dog-gear', 34, 0, 'dog', ['Olive', 'Rust'], [], ['Water-resistant'], 'Six-foot', 4.6, 215, false, 'A six-foot leash with solid-brass hardware and a padded grip.', []),
    P('field-dog-coat', 'Field Dog Coat', 'dog', 'dog-gear', 59, 0, 'dog', ['Blaze', 'Navy'], ['Small', 'Medium', 'Large'], ['Water-resistant', 'Insulated'], 'Coat', 4.2, 83, false, 'A water-resistant coat with a high-visibility option for fall walks.', []),
    P('ropecore-tug', 'Ropecore Tug Toy', 'dog', 'dog-toys', 16, 0, 'dog', ['Rust'], [], [], 'Rope', 4.5, 402, false, 'Braided cotton rope with a knotted handle for tug and fetch.', []),
    P('travel-bowl-set', 'Collapsible Travel Bowl Set', 'dog', 'dog-gear', 24, 0, 'dog', ['Olive'], [], ['Packable'], 'Set of two', 4.4, 174, false, 'Two silicone bowls that fold flat and clip to a pack.', []),
    P('upland-shell-vest', 'Upland Shell Vest', 'hunt', 'hunt-outerwear', 139, 0, 'hunt', ['Blaze', 'Olive'], AP, ['Water-resistant'], 'Vest', 4.5, 112, false, 'A brush-resistant vest with a game pouch and shell loops.', []),
    P('ridge-hunting-jacket', 'Ridge Waterproof Hunting Jacket', 'hunt', 'hunt-outerwear', 299, 0, 'jacket', ['Timber', 'Olive'], AP, ['Waterproof', 'Insulated'], 'Insulated parka', 4.6, 67, false, 'A quiet, seam-taped jacket with an insulated hood.', []),
    P('blaze-field-cap', 'Blaze Orange Field Cap', 'hunt', 'hunt-gear', 29, 0, 'hunt', ['Blaze'], [], ['Machine washable'], 'Cap', 4.3, 95, false, 'High-visibility cap with a stiff brim and an adjustable back strap.', []),
    P('canvas-game-bag', 'Canvas Field Game Bag', 'hunt', 'hunt-gear', 69, 0, 'pack', ['Khaki'], [], ['Water-resistant'], 'Shoulder bag', 4.4, 41, false, 'Waxed canvas with a mesh back panel that lets the bag breathe.', []),
    P('lodge-wool-throw', 'Lodge Wool Throw Blanket', 'home', 'home-decor', 119, 0, 'home', ['Rust', 'Charcoal'], [], ['Merino wool'], 'Throw', 4.8, 156, false, 'A heavy woven throw for the couch, the cabin, or the back of the truck.', []),
    P('enamel-camp-mugs', 'Enamel Camp Mugs, Set of 4', 'home', 'home-kitchen', 32, 26, 'home', ['Cream', 'Navy'], [], [], 'Set of four', 4.6, 288, false, 'Chip-resistant enamel mugs with a rolled rim.', []),
    P('riverwalk-sling', 'Riverwalk Sling Pack', 'packs', 'packs', 109, 0, 'pack', ['Olive', 'Slate'], [], ['Water-resistant'], 'Sling', 4.7, 231, false, 'Swings around to the front for quick fly changes, with rod tube straps.', []),
    P('dry-duffel-40', 'Roll-Top Dry Duffel, 40 L', 'packs', 'packs', 149, 0, 'pack', ['Rust', 'Charcoal'], [], ['Waterproof'], 'Duffel', 4.5, 109, false, 'Welded seams and a roll-top closure keep gear dry in the boat or the truck bed.', [])
  ];
  var BY_ID = {};
  PRODUCTS.forEach(function (p) { BY_ID[p.id] = p; });
  var GIFT_AMOUNTS = [25, 50, 100, 250];

  /* ---------- Helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { return '$' + (Number.isInteger(n) ? n : n.toFixed(2)); }
  function money2(n) { return '$' + n.toFixed(2); }
  function price(p) { return p.sale || p.price; }
  function priceHtml(p) {
    return p.sale
      ? '<span class="price"><span class="visually-hidden">Sale price </span><strong class="price-sale">' + money(p.sale) + '</strong> <s><span class="visually-hidden">Original price </span>' + money(p.price) + '</s></span>'
      : '<span class="price"><strong>' + money(p.price) + '</strong></span>';
  }
  function say(el, msg) { if (el) { el.textContent = ''; setTimeout(function () { el.textContent = msg; }, 30); } }

  /* ---------- Cart (localStorage with in-memory fallback) ---------- */
  var CART_KEY = 'larkwater-cart-v1', PROMO_KEY = 'larkwater-promo-v1', memCart = [];
  function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return memCart; } }
  function saveCart(cart) {
    memCart = cart;
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage blocked: in-memory only */ }
    updateCartCount();
  }
  function lineKey(l) { return [l.id, l.color || '', l.size || '', l.amount || '', l.to || ''].join('|'); }
  function lineInfo(l) {
    if (l.id === 'gift-card') {
      return { name: 'Larkwater e-Gift Card', unit: l.amount, img: 'gift-card', href: 'gift-card.html', variant: 'Delivered to ' + l.to + ' (demo, nothing is sent)' };
    }
    var p = BY_ID[l.id];
    return { name: p.name, unit: price(p), img: p.img, href: 'product.html?id=' + p.id, variant: [l.color && 'Color: ' + l.color, l.size && 'Size: ' + l.size].filter(Boolean).join(' · ') };
  }
  function addToCart(item) {
    var cart = loadCart(), key = lineKey(item), hit = cart.filter(function (l) { return lineKey(l) === key; })[0];
    if (hit) { hit.qty = Math.min(10, hit.qty + item.qty); } else { cart.push(item); }
    saveCart(cart);
  }
  function updateCartCount() {
    var n = loadCart().reduce(function (s, l) { return s + l.qty; }, 0);
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; });
  }
  function getPromo() { try { return sessionStorage.getItem(PROMO_KEY) === 'TROUT10'; } catch (e) { return false; } }
  function totals(cart, express) {
    var sub = cart.reduce(function (s, l) { return s + lineInfo(l).unit * l.qty; }, 0);
    var discount = getPromo() ? Math.round(sub * 10) / 100 : 0;
    var net = sub - discount;
    var shipping = !cart.length ? 0 : express ? 14.95 : net >= 99 ? 0 : 8.95;
    var tax = Math.round(net * 6) / 100;
    return { sub: sub, discount: discount, shipping: shipping, tax: tax, total: net + shipping + tax };
  }
  function summaryHtml(t) {
    return '<dl class="summary-list"><div><dt>Subtotal</dt><dd>' + money2(t.sub) + '</dd></div>' +
      (t.discount ? '<div><dt>Promo TROUT10 (demo)</dt><dd>-' + money2(t.discount) + '</dd></div>' : '') +
      '<div><dt>Shipping</dt><dd>' + (t.shipping ? money2(t.shipping) : 'Free') + '</dd></div>' +
      '<div><dt>Estimated tax (demo 6%)</dt><dd>' + money2(t.tax) + '</dd></div>' +
      '<div class="summary-total"><dt>Total</dt><dd>' + money2(t.total) + '</dd></div></dl>';
  }

  /* ---------- Navigation, dialogs, disclosure ---------- */
  function initNav() {
    var nav = $('#primary-nav'), toggle = $('.menu-toggle');
    if (!nav || !toggle) return;
    function closePanels(except) {
      $$('.nav-trigger', nav).forEach(function (b) {
        if (b !== except) { b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true; }
      });
    }
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      if (!open) closePanels();
    });
    $$('.nav-trigger', nav).forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true';
        closePanels(b);
        b.setAttribute('aria-expanded', String(open));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openBtn = $('.nav-trigger[aria-expanded="true"]', nav);
      if (openBtn) { closePanels(); openBtn.focus(); }
      else if (toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') { toggle.click(); toggle.focus(); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.nav-item')) closePanels(); });
    document.addEventListener('focusin', function (e) { if (!e.target.closest('.nav-item')) closePanels(); });
  }

  function initDialogs() {
    $$('[data-dialog-open]').forEach(function (b) {
      b.addEventListener('click', function () { document.getElementById(b.dataset.dialogOpen).showModal(); });
    });
    $$('dialog').forEach(function (d) {
      d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    });
  }

  function initAccordions() {
    $$('.accordion-trigger').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(open));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
      });
    });
    var search = $('#faq-search'), list = $('#faq-list');
    if (search && list) {
      var status = $('#faq-status'), none = $('#faq-empty');
      var apply = function () {
        var q = search.value.trim().toLowerCase(), shown = 0;
        $$('li', list).forEach(function (li) { var m = !q || li.textContent.toLowerCase().indexOf(q) > -1; li.hidden = !m; if (m) shown++; });
        none.hidden = shown > 0;
        say(status, shown + (shown === 1 ? ' question matches.' : ' questions match.'));
      };
      search.addEventListener('input', apply);
      search.form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    }
  }

  function initTabs() {
    $$('[data-tabs]').forEach(function (root) {
      var tabs = $$('[role="tab"]', root);
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
          var to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
          if (to === undefined) return;
          e.preventDefault();
          select(tabs[(to + tabs.length) % tabs.length], true);
        });
      });
    });
  }

  /* ---------- Forms: validation with inline errors, summary and focus ---------- */
  function labelText(el) {
    var l = el.labels && el.labels[0];
    if (!l) return el.name;
    var c = l.cloneNode(true);
    $$('.req, .visually-hidden', c).forEach(function (n) { n.remove(); });
    return c.textContent.trim();
  }
  function fieldError(el) {
    if (el.disabled || el.type === 'hidden') return '';
    var v = el.value.trim(), name = labelText(el), lower = name.toLowerCase();
    if (el.type === 'checkbox') return el.required && !el.checked ? (el.dataset.msg || 'Check this box to continue.') : '';
    if (el.required && !v) return el.dataset.msg || (el.tagName === 'SELECT' ? 'Select ' + lower + '.' : 'Enter ' + lower + '.');
    if (!v) return '';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter an email address like name@example.com.';
    if (el.type === 'number' && (!/^\d+$/.test(v) || +v < +el.min || +v > +el.max)) return 'Enter a whole number from ' + el.min + ' to ' + el.max + '.';
    if (el.pattern && !new RegExp('^(?:' + el.pattern + ')$').test(v)) return el.dataset.msg || 'Check the format of ' + lower + '.';
    if (el.minLength > 0 && v.length < el.minLength) return name + ' must be at least ' + el.minLength + ' characters.';
    return '';
  }
  function setError(host, control, msg) {
    var err = $('.field-error', host);
    if (!err) {
      err = document.createElement('p');
      err.className = 'field-error';
      err.id = (control.id || control.name) + '-error';
      host.appendChild(err);
    }
    err.textContent = msg;
    err.hidden = !msg;
    var ids = (control.getAttribute('aria-describedby') || '').split(' ').filter(function (i) { return i && i !== err.id; });
    if (msg) ids.push(err.id);
    control.setAttribute('aria-describedby', ids.join(' '));
    if (msg) control.setAttribute('aria-invalid', 'true'); else control.removeAttribute('aria-invalid');
  }
  function validateForm(form) {
    var errors = [];
    $$('input, select, textarea', form).forEach(function (el) {
      if (el.type === 'radio') return;
      var host = el.closest('.field') || el.parentNode, msg = fieldError(el);
      setError(host, el, msg);
      if (msg) errors.push({ id: el.id, msg: msg, el: el });
    });
    $$('fieldset[data-required-group]', form).forEach(function (fs) {
      var radios = $$('input[type="radio"]', fs), ok = radios.some(function (r) { return r.checked; });
      var msg = ok ? '' : fs.dataset.msg;
      setError(fs, fs, msg);
      if (msg) errors.push({ id: radios[0].id, msg: msg, el: radios[0] });
    });
    errors.sort(function (a, b) { return (a.el.compareDocumentPosition(b.el) & 4) ? -1 : 1; });
    var box = $('.error-summary', form);
    if (box) {
      box.hidden = !errors.length;
      if (errors.length) {
        box.innerHTML = '<h2>There ' + (errors.length === 1 ? 'is 1 problem' : 'are ' + errors.length + ' problems') + ' with this form</h2><ul>' +
          errors.map(function (e) { return '<li><a href="#' + esc(e.id) + '">' + esc(e.msg) + '</a></li>'; }).join('') + '</ul>';
        $$('a', box).forEach(function (a, i) { a.addEventListener('click', function (ev) { ev.preventDefault(); errors[i].el.focus(); }); });
        box.focus();
      }
    }
    return !errors.length;
  }
  function bindForm(form, onValid) {
    form.noValidate = true;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(form)) onValid(form);
    });
    form.addEventListener('input', function (e) {
      var el = e.target;
      if (el.getAttribute('aria-invalid')) setError(el.closest('.field') || el.parentNode, el, fieldError(el));
    });
    form.addEventListener('change', function (e) {
      var fs = e.target.closest('fieldset[data-required-group]');
      if (fs && e.target.checked) setError(fs, fs, '');
    });
  }
  function showResult(form, text) {
    var out = $('.form-result', form);
    out.textContent = text;
    out.hidden = false;
    out.focus();
  }
  function initDemoForms() {
    $$('form[data-demo-message]').forEach(function (form) {
      bindForm(form, function () {
        showResult(form, form.dataset.demoMessage);
        $$('input[type="password"], input[type="text"], input[type="email"], textarea', form).forEach(function (i) { i.value = ''; });
      });
    });
    $$('[data-toggle-password]').forEach(function (cb) {
      cb.addEventListener('change', function () { document.getElementById(cb.dataset.togglePassword).type = cb.checked ? 'text' : 'password'; });
    });
  }

  /* ---------- Product cards and listings ---------- */
  function cardHtml(p) {
    return '<li><article class="product-card" data-component="product-card">' +
      '<a class="product-card-link" href="product.html?id=' + p.id + '"><img src="assets/product-' + p.img + '.svg" alt="" width="320" height="320" loading="lazy">' +
      (p.isNew ? '<span class="badge">New</span>' : p.sale ? '<span class="badge badge-sale">Sale</span>' : '') +
      '<h3>' + esc(p.name) + '</h3></a>' +
      '<p>' + priceHtml(p) + '</p>' +
      '<p class="meta">' + p.rating.toFixed(1) + ' out of 5 (' + p.reviews + ' reviews)' + (p.colors.length > 1 ? ' · ' + p.colors.length + ' colors' : '') + '</p></article></li>';
  }
  function initFeatured() {
    $$('[data-featured]').forEach(function (ul) {
      ul.innerHTML = ul.dataset.featured.split(',').map(function (id) { return BY_ID[id] ? cardHtml(BY_ID[id]) : ''; }).join('');
    });
  }

  var PRICE_BUCKETS = [['Under $50', 0, 50], ['$50 to $99', 50, 100], ['$100 to $199', 100, 200], ['$200 and up', 200, 1e9]];
  var GROUPS = [
    { key: 'cat', label: 'Category', get: function (p) { return [CATS[p.cat]]; } },
    { key: 'size', label: 'Size', get: function (p) { return p.sizes; } },
    { key: 'feat', label: 'Features', get: function (p) { return p.feats; } },
    { key: 'style', label: 'Style type', get: function (p) { return [p.style]; } },
    { key: 'price', label: 'Price', get: function (p) { var x = price(p); return PRICE_BUCKETS.filter(function (b) { return x >= b[1] && x < b[2]; }).map(function (b) { return b[0]; }); } },
    { key: 'sale', label: 'Deals', get: function (p) { return p.sale ? ['On sale'] : []; } }
  ];
  var SORTS = {
    featured: null,
    'price-asc': function (a, b) { return price(a) - price(b); },
    'price-desc': function (a, b) { return price(b) - price(a); },
    rating: function (a, b) { return b.rating - a.rating; },
    name: function (a, b) { return a.name.localeCompare(b.name); }
  };
  function sizeRank(s) { var i = SIZE_ORDER.indexOf(s); return i < 0 ? 100 + (parseFloat(s) || 0) : i; }

  function initListing() {
    var root = $('[data-listing]');
    if (!root) return;
    var params = new URLSearchParams(location.search), base = JSON.parse(root.dataset.listing || '{}');
    var q = (params.get('q') || '').trim().toLowerCase();
    var dept = base.dept || params.get('dept'), cat = base.cat || params.get('cat');
    var title = base.title || (q ? 'Search results for “' + params.get('q').trim() + '”' : cat && CATS[cat] ? CATS[cat] : dept && DEPTS[dept] ? DEPTS[dept] : params.get('new') ? 'New arrivals' : params.get('sale') ? 'Sale' : 'All products');
    var pool = PRODUCTS.filter(function (p) {
      var hay = [p.name, p.blurb, CATS[p.cat], DEPTS[p.dept], p.feats.join(' '), p.style].join(' ').toLowerCase();
      return (!dept || p.dept === dept) && (!cat || p.cat === cat) && (!params.get('new') || p.isNew) && (!params.get('sale') || p.sale) &&
        q.split(/\s+/).every(function (w) { return !w || hay.indexOf(w.replace(/s$/, '')) > -1; });
    });
    if (!base.title) { $('h1', root).textContent = title; document.title = title + ' | Larkwater Outfitters (demo)'; }
    var crumb = $('[data-crumb-current]');
    if (crumb) crumb.textContent = title;

    var filtersHost = $('#filter-groups'), grid = $('#product-grid'), count = $('#result-count'), empty = $('#empty-state'), sort = $('#sort-select');
    var state = {};
    GROUPS.forEach(function (g) {
      var tally = {};
      pool.forEach(function (p) { g.get(p).forEach(function (v) { tally[v] = (tally[v] || 0) + 1; }); });
      var values = Object.keys(tally);
      if (g.key === 'size') values.sort(function (a, b) { return sizeRank(a) - sizeRank(b); });
      else if (g.key === 'price') values.sort(function (a, b) { return PRICE_BUCKETS.map(function (x) { return x[0]; }).indexOf(a) - PRICE_BUCKETS.map(function (x) { return x[0]; }).indexOf(b); });
      else values.sort();
      if (values.length < 2 && g.key !== 'sale') return;
      if (!values.length) return;
      state[g.key] = {};
      var fs = document.createElement('fieldset');
      fs.className = 'filter-group';
      fs.innerHTML = '<legend>' + g.label + '</legend>' + values.map(function (v, i) {
        var id = 'f-' + g.key + '-' + i;
        return '<div class="check"><input type="checkbox" id="' + id + '" data-group="' + g.key + '" value="' + esc(v) + '"><label for="' + id + '">' + esc(v) + ' <span class="count">(' + tally[v] + ')</span></label></div>';
      }).join('');
      filtersHost.appendChild(fs);
    });
    if (!filtersHost.children.length) $('.listing-filters', root).hidden = true;

    function render() {
      var list = pool.filter(function (p) {
        return GROUPS.every(function (g) {
          var sel = Object.keys(state[g.key] || {}).filter(function (k) { return state[g.key][k]; });
          return !sel.length || g.get(p).some(function (v) { return sel.indexOf(v) > -1; });
        });
      });
      if (SORTS[sort.value]) list = list.slice().sort(SORTS[sort.value]);
      grid.innerHTML = list.map(cardHtml).join('');
      var filtered = pool.length && !list.length;
      empty.hidden = !!list.length;
      $('.empty-title', empty).textContent = filtered ? 'No products match these filters' : q ? 'No results for “' + params.get('q').trim() + '”' : 'Nothing here yet';
      $('.empty-body', empty).textContent = filtered ? 'Try removing a filter to see more products.' : 'Check the spelling, try a more general word such as “jacket” or “waders”, or browse a department.';
      $('[data-clear-filters]', empty).hidden = !filtered;
      say(count, list.length + (list.length === 1 ? ' product' : ' products'));
      $('#result-count-visible').textContent = list.length + (list.length === 1 ? ' product' : ' products');
      $('#clear-all').hidden = !GROUPS.some(function (g) { return Object.keys(state[g.key] || {}).some(function (k) { return state[g.key][k]; }); });
    }
    function clearAll() {
      $$('input[type="checkbox"]', filtersHost).forEach(function (c) { c.checked = false; });
      Object.keys(state).forEach(function (k) { state[k] = {}; });
      render();
    }
    filtersHost.addEventListener('change', function (e) { state[e.target.dataset.group][e.target.value] = e.target.checked; render(); });
    sort.addEventListener('change', render);
    $('#clear-all').addEventListener('click', function () { clearAll(); $('#sort-select').focus(); });
    $('[data-clear-filters]', empty).addEventListener('click', function () { clearAll(); $('#sort-select').focus(); });
    var toggle = $('.filter-toggle');
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.nextElementSibling.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') { toggle.click(); toggle.focus(); }
    });
    render();
  }

  /* ---------- Product detail ---------- */
  function initProduct() {
    var root = $('#product-root');
    if (!root) return;
    var p = BY_ID[new URLSearchParams(location.search).get('id')];
    if (!p) {
      document.title = 'Product not found | Larkwater Outfitters (demo)';
      root.innerHTML = '<h1>We could not find that product</h1><p>The link may be out of date. <a href="search.html">Browse all products</a> or return to the <a href="index.html">home page</a>.</p>';
      return;
    }
    document.title = p.name + ' | Larkwater Outfitters (demo)';
    $('[data-crumb-dept]').innerHTML = '<a href="' + DEPT_PAGES[p.dept] + '">' + DEPTS[p.dept] + '</a>';
    $('[data-crumb-cat]').innerHTML = '<a href="search.html?cat=' + p.cat + '">' + esc(CATS[p.cat]) + '</a>';
    $('[data-crumb-current]').textContent = p.name;
    var colorsHtml = p.colors.map(function (c, i) {
      return '<label class="chip swatch" for="color-' + i + '"><input type="radio" name="color" id="color-' + i + '" value="' + c + '"' + (i === 0 ? ' checked' : '') + '><span class="dot" style="background:' + COLORS[c] + '"></span>' + c + '</label>';
    }).join('');
    var sizesHtml = p.sizes.length
      ? '<fieldset class="variant" data-required-group data-msg="Select a size." data-variant="size"><legend>Size <a href="size-and-fit-guide.html">Size &amp; fit guide</a></legend><div class="chips">' +
        p.sizes.map(function (s, i) { return '<label class="chip" for="size-' + i + '"><input type="radio" name="size" id="size-' + i + '" value="' + esc(s) + '">' + esc(s) + '<span class="so"></span></label>'; }).join('') + '</div></fieldset>'
      : '';
    root.innerHTML =
      '<div class="product-layout">' +
      '<div class="product-media"><img src="assets/product-' + p.img + '.svg" alt="Placeholder illustration of ' + esc(p.name) + '" width="640" height="640"></div>' +
      '<div class="product-info" data-section="product-summary" data-component="product-summary">' +
      '<h1>' + esc(p.name) + '</h1>' +
      '<p class="meta">' + p.rating.toFixed(1) + ' out of 5 (' + p.reviews + ' reviews)</p>' +
      '<p class="price-line">' + priceHtml(p) + '</p><p>' + esc(p.blurb) + '</p>' +
      '<form id="add-form" data-section="product-options" data-component="variant-selector" novalidate>' +
      '<div class="error-summary" tabindex="-1" hidden></div>' +
      '<fieldset class="variant" data-variant="color"><legend>Color: <span id="color-name">' + p.colors[0] + '</span></legend><div class="chips">' + colorsHtml + '</div></fieldset>' +
      sizesHtml +
      '<div class="field qty-field"><label for="qty">Quantity <span class="req">(required)</span></label><input type="number" id="qty" name="qty" min="1" max="10" value="1" required inputmode="numeric"></div>' +
      '<button type="submit" class="btn btn-primary">Add to cart</button>' +
      '<div class="add-status" id="add-status" role="status" tabindex="-1"></div></form>' +
      '<div class="product-details" data-section="product-details" data-component="disclosure-list">' +
      '<details open><summary>Details</summary><p>' + esc(p.blurb) + '</p>' + (p.feats.length ? '<ul>' + p.feats.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' : '') + '</details>' +
      '<details><summary>Shipping</summary><p>Free standard shipping on orders over $99; otherwise $8.95. This is a demo store, so nothing ships.</p></details>' +
      '<details><summary>Returns</summary><p>Unused items can be returned within 30 days in this demo policy. See <a href="returns-exchanges.html">returns &amp; exchanges</a>.</p></details>' +
      '</div></div></div>' +
      '<section class="related" aria-labelledby="related-title" data-section="related-products" data-component="card-grid"><h2 id="related-title">You may also like</h2><ul class="product-grid" id="related-grid"></ul></section>';
    $('#related-grid').innerHTML = PRODUCTS.filter(function (x) { return x.dept === p.dept && x.id !== p.id; }).slice(0, 4).map(cardHtml).join('');

    var form = $('#add-form');
    function syncVariants() {
      var color = $('input[name="color"]:checked', form).value;
      $('#color-name').textContent = color;
      $$('input[name="size"]', form).forEach(function (r) {
        var gone = p.oos.indexOf(color + '|' + r.value) > -1;
        r.disabled = gone;
        if (gone && r.checked) r.checked = false;
        r.parentNode.lastChild.textContent = gone ? ' (sold out)' : '';
      });
    }
    form.addEventListener('change', function (e) { if (e.target.name === 'color') syncVariants(); });
    syncVariants();
    bindForm(form, function () {
      var size = $('input[name="size"]:checked', form), color = $('input[name="color"]:checked', form).value, qty = +$('#qty').value;
      addToCart({ id: p.id, color: color, size: size ? size.value : '', qty: qty });
      var out = $('#add-status');
      out.innerHTML = 'Added ' + qty + ' × ' + esc(p.name) + ' (' + esc(color) + (size ? ', ' + esc(size.value) : '') + ') to your cart. <a href="cart.html">View cart</a> or <a href="checkout.html">go to checkout</a>.';
      out.focus();
    });
  }

  /* ---------- Gift card ---------- */
  function initGiftCard() {
    var form = $('#gift-form');
    if (!form) return;
    var amounts = $('#gift-amounts');
    amounts.innerHTML = GIFT_AMOUNTS.map(function (a, i) {
      return '<label class="chip" for="amount-' + i + '"><input type="radio" name="amount" id="amount-' + i + '" value="' + a + '">' + money(a) + '</label>';
    }).join('');
    bindForm(form, function () {
      addToCart({ id: 'gift-card', amount: +$('input[name="amount"]:checked', form).value, to: $('#gift-email').value.trim(), qty: 1 });
      var out = $('.form-result', form);
      out.innerHTML = 'Gift card added to your cart (demo). <a href="cart.html">View cart</a>';
      out.hidden = false;
      out.focus();
    });
  }

  /* ---------- Cart page ---------- */
  function initCartPage() {
    var root = $('#cart-root');
    if (!root) return;
    var status = $('#cart-status');
    function render(focusSel, message) {
      var cart = loadCart();
      $('#cart-empty').hidden = cart.length > 0;
      $('#cart-filled').hidden = !cart.length;
      if (cart.length) {
        $('#cart-lines').innerHTML = cart.map(function (l, i) {
          var info = lineInfo(l);
          return '<li class="cart-line"><img src="assets/product-' + info.img + '.svg" alt="" width="96" height="96">' +
            '<div class="cart-line-info"><h3><a href="' + info.href + '">' + esc(info.name) + '</a></h3><p class="meta">' + esc(info.variant) + '</p><p>' + money2(info.unit) + ' each</p></div>' +
            '<div class="field qty-field"><label for="qty-' + i + '">Quantity<span class="visually-hidden"> for ' + esc(info.name) + '</span></label><input type="number" id="qty-' + i + '" min="1" max="10" value="' + l.qty + '" data-index="' + i + '" inputmode="numeric"></div>' +
            '<p class="line-total"><span class="visually-hidden">Line total </span>' + money2(info.unit * l.qty) + '</p>' +
            '<button type="button" class="link-button" data-remove="' + i + '">Remove<span class="visually-hidden"> ' + esc(info.name) + '</span></button></li>';
        }).join('');
        var t = totals(cart);
        $('#cart-summary').innerHTML = summaryHtml(t);
        var net = t.sub - t.discount;
        $('#ship-note').textContent = net >= 99 ? 'Your order qualifies for free standard shipping.' : 'Add ' + money2(99 - net) + ' more for free standard shipping.';
      }
      updateCartCount();
      if (message) say(status, message);
      if (focusSel) { var f = $(focusSel); if (f) f.focus(); }
    }
    root.addEventListener('change', function (e) {
      if (!e.target.matches('input[data-index]')) return;
      var cart = loadCart(), i = +e.target.dataset.index, v = e.target.value.trim();
      if (!/^\d+$/.test(v) || +v < 1 || +v > 10) {
        render('#qty-' + i, 'Quantity must be a whole number from 1 to 10. Your previous quantity was kept.');
        return;
      }
      cart[i].qty = +v;
      saveCart(cart);
      render('#qty-' + i, 'Quantity updated.');
    });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-remove]');
      if (!b) return;
      var cart = loadCart(), gone = lineInfo(cart[+b.dataset.remove]).name;
      cart.splice(+b.dataset.remove, 1);
      saveCart(cart);
      render(cart.length ? '#cart-lines button, #cart-lines a' : '#cart-heading', gone + ' removed from your cart.');
    });
    var promo = $('#promo-form');
    bindForm(promo, function () {
      var code = $('#promo-code').value.trim().toUpperCase();
      if (code !== 'TROUT10') {
        setError($('#promo-code').parentNode, $('#promo-code'), 'That code is not valid. For this demo, try TROUT10.');
        $('#promo-code').focus();
        return;
      }
      try { sessionStorage.setItem(PROMO_KEY, 'TROUT10'); } catch (e) { /* ignore */ }
      render(null, 'Promo code TROUT10 applied: 10% off.');
    });
    render();
  }

  /* ---------- Checkout (demo) ---------- */
  function initCheckout() {
    var form = $('#checkout-form');
    if (!form) return;
    var cart = loadCart();
    if (!cart.length) { form.hidden = true; $('#checkout-empty').hidden = false; $('#checkout-aside').hidden = true; return; }
    function drawSummary() {
      var express = $('input[name="delivery"]:checked', form).value === 'express', t = totals(loadCart(), express);
      $('#checkout-lines').innerHTML = loadCart().map(function (l) {
        var i = lineInfo(l);
        return '<li>' + l.qty + ' × ' + esc(i.name) + (i.variant && l.id !== 'gift-card' ? '<br><span class="meta">' + esc(i.variant) + '</span>' : '') + '<span>' + money2(i.unit * l.qty) + '</span></li>';
      }).join('');
      $('#checkout-summary').innerHTML = summaryHtml(t);
    }
    form.addEventListener('change', function (e) { if (e.target.name === 'delivery') drawSummary(); });
    drawSummary();
    bindForm(form, function () {
      var lines = loadCart(), express = $('input[name="delivery"]:checked', form).value === 'express', t = totals(lines, express);
      var conf = $('#confirmation');
      $('#confirmation-order').textContent = 'DEMO-' + String(Math.floor(10000 + Math.random() * 90000));
      $('#confirmation-email').textContent = $('#co-email').value.trim();
      $('#confirmation-summary').innerHTML = '<ul class="plain-list">' + lines.map(function (l) { var i = lineInfo(l); return '<li>' + l.qty + ' × ' + esc(i.name) + ' - ' + money2(i.unit * l.qty) + '</li>'; }).join('') + '</ul>' + summaryHtml(t);
      saveCart([]);
      try { sessionStorage.removeItem(PROMO_KEY); } catch (e) { /* ignore */ }
      form.hidden = true;
      $('#checkout-aside').hidden = true;
      conf.hidden = false;
      $('#confirmation-heading').focus();
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    initNav();
    initDialogs();
    initAccordions();
    initTabs();
    initFeatured();
    initListing();
    initProduct();
    initGiftCard();
    initCartPage();
    initCheckout();
    initDemoForms();
  });
})();
