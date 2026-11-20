/* Fernhollow Outfitters - fictional demo store. Vanilla JS, inline data, no network. */
(function () {
  'use strict';

  /* ---------- sample data (all fictional; prices illustrative) ---------- */
  var COLORS = {
    mo: ['Moss', '#4b5d3a'], sl: ['Slate', '#4a5a6a'], sa: ['Sand', '#c9b48a'], ru: ['Rust', '#9a4a24'],
    ch: ['Charcoal', '#333b40'], ink: ['Ink', '#1f2f4a'], cr: ['Cream', '#e8dfc8'], pl: ['Plum', '#5d3a5a']
  };
  var DEPTS = { men: "Men's", women: "Women's", fly: 'Fly Fishing', dog: 'Dog', bags: 'Packs & Bags' };
  var TYPES = {
    jackets: 'Jackets & vests', shirts: 'Shirts', pants: 'Pants', sweaters: 'Sweaters',
    waders: 'Waders', rods: 'Rods', reels: 'Reels', 'vests-packs': 'Vests & packs',
    beds: 'Beds', coats: 'Coats', leads: 'Leads & collars', bowls: 'Bowls',
    backpacks: 'Backpacks', duffels: 'Duffels', totes: 'Totes'
  };
  var BLURB = {
    jackets: 'Outer layer with a roomy cut for layering underneath.', shirts: 'Everyday shirt with a relaxed fit and reinforced seams.',
    pants: 'Straight-leg pant with a gusseted seat and a mid rise.', sweaters: 'Mid-weight knit for cool mornings.',
    waders: 'Chest-high wader with reinforced knees and an integrated pocket.', rods: 'Four-piece rod supplied with a fabric tube. Illustrative item.',
    reels: 'Machined large-arbor reel with a sealed drag. Illustrative item.', 'vests-packs': 'Carry system with removable pockets and a padded strap.',
    beds: 'Washable cover over a supportive foam base.', coats: 'Weather-resistant coat cut for a comfortable fit around the shoulders.',
    leads: 'Woven webbing with stitched hardware. Gear listing only.', bowls: 'Weighted base with a wipe-clean finish.',
    backpacks: 'Padded back panel and adjustable sternum strap.', duffels: 'Wide-opening carry bag with a separate shoe pocket.', totes: 'Open-top carry bag with an interior zip pocket.'
  };
  var APP = ['S', 'M', 'L', 'XL', 'XXL'];
  /* id, name, dept, type, price, was(sale-before), art, colours, sizes, material, sizeLabel, soldOutSizes */
  var P = [
    ['m1', 'Alderbrook Ridge Shell', 'men', 'jackets', 188, 0, 'jacket', 'mo,sl,ru', APP, 'Ridgeline 3-layer shell', 'Size', ['XXL']],
    ['m2', 'Pinecrest Quilted Vest', 'men', 'jackets', 98, 129, 'vest', 'ch,ink,sa', APP, 'Tamsin lofted fill', 'Size', []],
    ['m3', 'Harrow Field Jacket', 'men', 'jackets', 168, 0, 'jacket', 'sa,mo', APP, 'Waxed Brackwater cotton', 'Size', ['S']],
    ['m4', 'Linden Twill Shirt', 'men', 'shirts', 74, 0, 'shirt', 'sl,cr,ru', APP, 'Tamsin brushed cotton', 'Size', []],
    ['m5', 'Marlow Trail Shirt', 'men', 'shirts', 64, 82, 'shirt', 'ink,mo', APP, 'Quickdry Brackwater weave', 'Size', ['L', 'XL']],
    ['m6', 'Corbett Everyday Pant', 'men', 'pants', 92, 0, 'pants', 'ch,sa,mo', ['30', '32', '34', '36', '38'], 'Stretch Brackwater twill', 'Waist', []],
    ['m7', 'Teller Canvas Pant', 'men', 'pants', 108, 0, 'pants', 'sa,ch', ['30', '32', '34', '36'], 'Heavy Tamsin canvas', 'Waist', ['30', '32', '34', '36']],
    ['m8', 'Brindle Rain Parka', 'men', 'jackets', 228, 285, 'jacket', 'ink,ch', APP, 'Ridgeline 3-layer shell', 'Size', []],
    ['w1', 'Ashgrove Storm Jacket', 'women', 'jackets', 178, 0, 'jacket', 'pl,mo,sl', APP, 'Ridgeline 3-layer shell', 'Size', []],
    ['w2', 'Wren Packable Vest', 'women', 'jackets', 88, 118, 'vest', 'ru,ink', APP, 'Tamsin lofted fill', 'Size', ['XXL']],
    ['w3', 'Sorrel Linen Shirt', 'women', 'shirts', 68, 0, 'shirt', 'cr,sl,pl', APP, 'Washed linen blend', 'Size', []],
    ['w4', 'Fennimore Cable Sweater', 'women', 'sweaters', 124, 0, 'sweater', 'cr,mo,ru', APP, 'Brushed wool blend', 'Size', []],
    ['w5', 'Larkspur Fleece Pullover', 'women', 'sweaters', 82, 104, 'sweater', 'pl,ch,sa', APP, 'Looped Tamsin fleece', 'Size', ['S']],
    ['w6', 'Quill River Shirt', 'women', 'shirts', 72, 0, 'shirt', 'sa,ink', APP, 'Quickdry Brackwater weave', 'Size', []],
    ['w7', 'Hollis Field Jacket', 'women', 'jackets', 158, 0, 'jacket', 'sa,mo', APP, 'Waxed Brackwater cotton', 'Size', []],
    ['f1', 'Clearwater Chest Waders', 'fly', 'waders', 298, 0, 'waders', 'mo,sl', ['S', 'M', 'L', 'XL'], 'Four-layer Ridgeline laminate', 'Size', ['S']],
    ['f2', 'Shallowford Stocking-Foot Waders', 'fly', 'waders', 248, 320, 'waders', 'ch,mo', ['M', 'L', 'XL'], 'Three-layer Ridgeline laminate', 'Size', []],
    ['f3', 'Youth Brookside Waders', 'fly', 'waders', 128, 0, 'waders', 'mo,ink', ['YS', 'YM', 'YL'], 'Two-layer Brackwater nylon', 'Size', []],
    ['f4', 'Eddyline Hip Waders', 'fly', 'waders', 168, 0, 'waders', 'sl', ['M', 'L', 'XL'], 'Two-layer Brackwater nylon', 'Size', ['M', 'L', 'XL']],
    ['f5', 'Millpond Lightweight Waders', 'fly', 'waders', 198, 0, 'waders', 'sa,sl,ch', ['S', 'M', 'L', 'XL'], 'Breathable Ridgeline laminate', 'Size', []],
    ['f6', 'Tern 9-Foot Fly Rod', 'fly', 'rods', 378, 0, 'rod', 'sl,mo', ['4wt', '5wt', '6wt', '8wt'], 'Graphite composite', 'Rod weight', ['8wt']],
    ['f7', 'Kestrel Travel Rod Set', 'fly', 'rods', 448, 520, 'rod', 'ink,ch', ['5wt', '6wt'], 'Graphite composite', 'Rod weight', []],
    ['f8', 'Starter Rod and Reel Kit', 'fly', 'rods', 218, 0, 'rod', 'sa', ['5wt', '6wt'], 'Fibreglass composite', 'Rod weight', []],
    ['f9', 'Dunlin Large-Arbor Reel', 'fly', 'reels', 168, 0, 'reel', 'ch,sl,ru', ['3/5wt', '5/7wt', '7/9wt'], 'Machined alloy', 'Reel size', []],
    ['f10', 'Plover Click Reel', 'fly', 'reels', 98, 128, 'reel', 'ch', ['3/5wt', '5/7wt'], 'Cast alloy', 'Reel size', []],
    ['f11', 'Cutbank Chest Pack', 'fly', 'vests-packs', 88, 0, 'pack', 'mo,sa,ink', ['One size'], 'Brackwater ripstop', 'Size', []],
    ['f12', 'Riffle Mesh Vest', 'fly', 'vests-packs', 78, 0, 'vest', 'sa,mo', ['S/M', 'L/XL'], 'Open mesh Brackwater', 'Size', []],
    ['f13', 'Gravelbar Sling Pack', 'fly', 'vests-packs', 108, 138, 'pack', 'ch,ru', ['One size'], 'Brackwater ripstop', 'Size', []],
    ['d1', 'Thistledown Lounger Bed', 'dog', 'beds', 94, 0, 'bed', 'cr,sl,pl', ['S', 'M', 'L'], 'Tamsin brushed cotton cover', 'Size', []],
    ['d2', 'Bracken Deep-Foam Bed', 'dog', 'beds', 148, 188, 'bed', 'mo,ch', ['M', 'L'], 'Tamsin canvas cover', 'Size', ['M']],
    ['d3', 'Burrow Travel Mat', 'dog', 'beds', 58, 0, 'bed', 'sa,ink', ['S', 'M', 'L'], 'Quickdry Brackwater weave', 'Size', []],
    ['d4', 'Windfall Waxed Dog Coat', 'dog', 'coats', 72, 0, 'dogcoat', 'mo,ru', ['S', 'M', 'L'], 'Waxed Brackwater cotton', 'Size', []],
    ['d5', 'Drizzle Layer Coat', 'dog', 'coats', 64, 84, 'dogcoat', 'ink,sa', ['S', 'M', 'L'], 'Ridgeline shell', 'Size', ['S']],
    ['d6', 'Keeper Woven Lead', 'dog', 'leads', 34, 0, 'lead', 'ru,ink,mo', ['4 ft', '6 ft'], 'Woven Tamsin webbing', 'Length', []],
    ['d7', 'Foxtail Collar', 'dog', 'leads', 28, 0, 'lead', 'pl,sa,ch', ['S', 'M', 'L'], 'Woven Tamsin webbing', 'Size', []],
    ['d8', 'Stoneware-Look Weighted Bowl', 'dog', 'bowls', 32, 0, 'bowl', 'cr,sl', ['1 L', '2 L'], 'Glazed stoneware-look finish', 'Capacity', []],
    ['d9', 'Trailside Fold Bowl', 'dog', 'bowls', 18, 24, 'bowl', 'mo,ru', ['One size'], 'Coated Brackwater fabric', 'Size', []],
    ['b1', 'Switchback 28L Backpack', 'bags', 'backpacks', 138, 0, 'backpack', 'ch,mo,ink', ['28 L'], 'Brackwater ripstop', 'Capacity', []],
    ['b2', 'Crosscut Daypack', 'bags', 'backpacks', 88, 118, 'backpack', 'sa,ru', ['18 L'], 'Tamsin canvas', 'Capacity', []],
    ['b3', 'Peregrine 45L Travel Pack', 'bags', 'backpacks', 218, 0, 'backpack', 'ch,sl', ['35 L', '45 L'], 'Brackwater ripstop', 'Capacity', ['35 L']],
    ['b4', 'Ironwood Weekend Duffel', 'bags', 'duffels', 168, 0, 'duffel', 'mo,ch,sa', ['40 L', '60 L'], 'Waxed Brackwater cotton', 'Capacity', []],
    ['b5', 'Gantry Roll-Top Duffel', 'bags', 'duffels', 128, 158, 'duffel', 'ink,ru', ['40 L'], 'Coated Brackwater fabric', 'Capacity', []],
    ['b6', 'Meadowlark Market Tote', 'bags', 'totes', 54, 0, 'tote', 'cr,mo,pl', ['One size'], 'Tamsin canvas', 'Size', []],
    ['b7', 'Millrace Zip Tote', 'bags', 'totes', 78, 0, 'tote', 'sa,ch', ['One size'], 'Waxed Brackwater cotton', 'Size', ['One size']]
  ].map(function (r) {
    return {
      id: r[0], name: r[1], dept: r[2], type: r[3], price: r[4], was: r[5], art: r[6],
      colors: r[7].split(','), sizes: r[8], material: r[9], sizeLabel: r[10], out: r[11],
      desc: BLURB[r[3]], soldOut: r[8].every(function (s) { return r[11].indexOf(s) > -1; })
    };
  });
  function byId(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; return null; }

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function money(n) { return '$' + n.toFixed(2); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function params() {
    var o = {};
    try { new URLSearchParams(location.search).forEach(function (v, k) { o[k] = v; }); } catch (e) { /* ignore */ }
    return o;
  }
  var live;
  function announce(msg) {
    if (!live) return;
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 30);
  }
  var mem = {};
  function store(kind) {
    return {
      get: function (k) { try { var v = window[kind].getItem(k); return v === null ? (mem[kind + k] || null) : v; } catch (e) { return mem[kind + k] || null; } },
      set: function (k, v) { mem[kind + k] = v; try { window[kind].setItem(k, v); } catch (e) { /* storage unavailable: memory only */ } },
      del: function (k) { delete mem[kind + k]; try { window[kind].removeItem(k); } catch (e) { /* ignore */ } }
    };
  }
  var local = store('localStorage'), session = store('sessionStorage');

  /* ---------- cart ---------- */
  var Cart = {
    key: 'fh-demo-cart-v1',
    read: function () {
      try { var a = JSON.parse(local.get(this.key) || '[]'); return Array.isArray(a) ? a.filter(function (l) { return byId(l.id) && l.qty > 0; }) : []; } catch (e) { return []; }
    },
    write: function (items) { local.set(this.key, JSON.stringify(items)); this.badge(); },
    add: function (id, color, size, qty) {
      var items = this.read(), found = false;
      items.forEach(function (l) { if (l.id === id && l.color === color && l.size === size) { l.qty = Math.min(10, l.qty + qty); found = true; } });
      if (!found) items.push({ id: id, color: color, size: size, qty: qty });
      this.write(items);
    },
    setQty: function (i, q) { var items = this.read(); if (items[i]) { items[i].qty = Math.max(1, Math.min(10, q)); this.write(items); } },
    remove: function (i) { var items = this.read(); items.splice(i, 1); this.write(items); },
    clear: function () { this.write([]); },
    count: function () { return this.read().reduce(function (s, l) { return s + l.qty; }, 0); },
    subtotal: function () { return this.read().reduce(function (s, l) { return s + byId(l.id).price * l.qty; }, 0); },
    badge: function () { $$('[data-cart-count]').forEach(function (e) { e.textContent = Cart.count(); }); }
  };
  function shippingFor(sub, method) {
    if (sub === 0) return 0;
    if (method === 'express') return 18;
    return sub >= 150 ? 0 : 8;
  }
  function variantText(l) {
    var p = byId(l.id);
    return COLORS[l.color][0] + ' / ' + p.sizeLabel + ': ' + l.size;
  }

  /* ---------- category drawer ---------- */
  function initDrawer() {
    var trigger = $('[data-drawer-trigger]'), drawer = $('#category-drawer'), overlay = $('[data-drawer-overlay]');
    if (!trigger || !drawer) return;
    var closeBtn = $('.drawer-close', drawer);
    var behind = $$('[data-inert-when-drawer]');
    function focusables() {
      return $$('a[href], button:not([disabled])', drawer).filter(function (e) { return e.offsetParent !== null; });
    }
    function open() {
      drawer.hidden = false; overlay.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      behind.forEach(function (e) { e.setAttribute('inert', ''); });
      document.body.classList.add('no-scroll');
      closeBtn.focus();
    }
    function close(restore) {
      drawer.hidden = true; overlay.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      behind.forEach(function (e) { e.removeAttribute('inert'); });
      document.body.classList.remove('no-scroll');
      if (restore !== false) trigger.focus();
    }
    trigger.addEventListener('click', function () { drawer.hidden ? open() : close(); });
    closeBtn.addEventListener('click', function () { close(); });
    overlay.addEventListener('click', function () { close(); });
    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        var f = focusables(); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    $$('.acc-btn', drawer).forEach(function (b) {
      b.addEventListener('click', function () {
        var ex = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!ex));
        document.getElementById(b.getAttribute('aria-controls')).hidden = ex;
      });
    });
  }

  /* ---------- generic disclosure / accordion ---------- */
  function initDisclosures() {
    $$('[data-disclosure]').forEach(function (b) {
      b.addEventListener('click', function () {
        var ex = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!ex));
        document.getElementById(b.getAttribute('aria-controls')).hidden = ex;
      });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && b.getAttribute('aria-expanded') === 'true') {
          b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true;
        }
      });
    });
    $$('[data-tabs]').forEach(function (tabs) {
      var btns = $$('[role="tab"]', tabs);
      function select(b, focus) {
        btns.forEach(function (x) {
          var on = x === b;
          x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
          document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
        });
        if (focus) b.focus();
      }
      btns.forEach(function (b, i) {
        b.addEventListener('click', function () { select(b); });
        b.addEventListener('keydown', function (e) {
          var n = null;
          if (e.key === 'ArrowRight') n = btns[(i + 1) % btns.length];
          if (e.key === 'ArrowLeft') n = btns[(i + btns.length - 1) % btns.length];
          if (e.key === 'Home') n = btns[0];
          if (e.key === 'End') n = btns[btns.length - 1];
          if (n) { e.preventDefault(); select(n, true); }
        });
      });
    });
  }

  /* ---------- form validation ---------- */
  function validate(form) {
    var errs = [];
    $$('[data-error-for]', form).forEach(function (s) { s.textContent = ''; });
    $$('[aria-invalid]', form).forEach(function (f) { f.removeAttribute('aria-invalid'); });
    var seenGroups = {};
    $$('input, select, textarea', form).forEach(function (f) {
      if (f.type === 'radio') {
        if (seenGroups[f.name]) return; seenGroups[f.name] = 1;
        var group = $$('input[name="' + f.name + '"]', form);
        if (group[0].hasAttribute('data-required') && !group.some(function (r) { return r.checked; })) {
          errs.push({ field: group[0], msg: group[0].getAttribute('data-msg') || 'Choose an option.' });
        }
        return;
      }
      var v = (f.type === 'checkbox') ? f.checked : f.value.trim();
      var msg = '';
      if (f.hasAttribute('data-required') && !v) msg = f.getAttribute('data-msg') || 'Enter a value for this field.';
      else if (v && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'Enter an email address in the form name@example.com.';
      else if (v && f.hasAttribute('data-pattern') && !new RegExp(f.getAttribute('data-pattern')).test(v)) msg = f.getAttribute('data-pattern-msg') || 'Check the format of this value.';
      else if (v && f.hasAttribute('data-minlength') && v.length < +f.getAttribute('data-minlength')) msg = 'Enter at least ' + f.getAttribute('data-minlength') + ' characters.';
      if (msg) errs.push({ field: f, msg: msg });
    });
    errs.forEach(function (e) {
      e.field.setAttribute('aria-invalid', 'true');
      var s = $('[data-error-for="' + e.field.name + '"]', form);
      if (s) s.textContent = 'Error: ' + e.msg;
    });
    var box = $('[data-error-summary]', form);
    if (box) {
      if (errs.length) {
        box.hidden = false;
        box.innerHTML = '<h2 tabindex="-1" data-summary-title>There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with this form</h2><ul>' +
          errs.map(function (e, i) {
            var lab = e.field.type === 'radio' ? $('legend', e.field.closest('fieldset')) : $('label[for="' + e.field.id + '"]');
            return '<li><a href="#' + e.field.id + '" data-err-idx="' + i + '">' + esc(lab ? lab.textContent.replace(/\s*\(required\)\s*/, '').trim() : e.field.name) + ': ' + esc(e.msg) + '</a></li>';
          }).join('') + '</ul>';
        $$('a[data-err-idx]', box).forEach(function (a) {
          a.addEventListener('click', function (ev) { ev.preventDefault(); errs[+a.getAttribute('data-err-idx')].field.focus(); });
        });
        $('[data-summary-title]', box).focus();
      } else { box.hidden = true; box.innerHTML = ''; }
    }
    return errs.length === 0;
  }
  function wireForm(form, onValid) {
    if (!form) return;
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) { e.preventDefault(); if (validate(form)) onValid(form); });
  }

  /* ---------- product cards, listing ---------- */
  function swatchChips(p) {
    return '<span class="chips" role="img" aria-label="Colours: ' + p.colors.map(function (c) { return COLORS[c][0]; }).join(', ') + '">' +
      p.colors.map(function (c) { return '<span class="chip" style="background:' + COLORS[c][1] + '"></span>'; }).join('') + '</span>';
  }
  function card(p) {
    var price = p.was ? '<span class="price sale"><span class="now">' + money(p.price) + '</span> <s><span class="vh">Was </span>' + money(p.was) + '</s></span>' : '<span class="price">' + money(p.price) + '</span>';
    return '<li class="card" data-component="product-card" data-product-id="' + p.id + '"><a href="product.html?id=' + p.id + '" class="card-link">' +
      '<span class="card-art" style="background:' + COLORS[p.colors[0]][1] + '"><img src="assets/art-' + p.art + '.svg" alt="" width="200" height="200" loading="lazy"></span>' +
      '<span class="card-name">' + esc(p.name) + '</span></a>' + swatchChips(p) + '<span class="card-meta">' + esc(TYPES[p.type]) + '</span>' + price +
      (p.soldOut ? '<span class="badge">Sold out</span>' : (p.was ? '<span class="badge sale-badge">Sale</span>' : '')) + '</li>';
  }
  function initListing() {
    var root = $('[data-listing]');
    if (!root) return;
    var dept = root.getAttribute('data-dept'), sub = root.getAttribute('data-sub') || '';
    var base = P.filter(function (p) { return p.dept === dept && (!sub || p.type === sub); });
    var form = $('form.filters', root), list = $('.card-grid', root), count = $('[data-result-count]', root), empty = $('[data-empty]', root);
    var types = [], colors = [], sizes = [];
    base.forEach(function (p) {
      if (types.indexOf(p.type) < 0) types.push(p.type);
      p.colors.forEach(function (c) { if (colors.indexOf(c) < 0) colors.push(c); });
      p.sizes.forEach(function (s) { if (sizes.indexOf(s) < 0) sizes.push(s); });
    });
    function group(name, legend, opts) {
      return '<fieldset class="filter-group"><legend>' + legend + '</legend>' + opts.map(function (o, i) {
        return '<div class="check"><input type="checkbox" name="' + name + '" id="f-' + name + '-' + i + '" value="' + esc(o[0]) + '"><label for="f-' + name + '-' + i + '">' + esc(o[1]) + '</label></div>';
      }).join('') + '</fieldset>';
    }
    var html = '';
    if (types.length > 1) html += group('type', 'Product type', types.map(function (t) { return [t, TYPES[t]]; }));
    html += group('color', 'Colour', colors.map(function (c) { return [c, COLORS[c][0]]; }));
    if (sizes.length > 1) html += group('size', 'Size / option', sizes.map(function (s) { return [s, s]; }));
    html += '<fieldset class="filter-group"><legend>Price and offers</legend><div class="field"><label for="f-max">Maximum price</label><select id="f-max" name="max"><option value="">Any price</option><option value="50">Up to $50</option><option value="100">Up to $100</option><option value="200">Up to $200</option></select></div>' +
      '<div class="check"><input type="checkbox" name="sale" id="f-sale" value="1"><label for="f-sale">On sale only</label></div>' +
      '<div class="check"><input type="checkbox" name="avail" id="f-avail" value="1"><label for="f-avail">Hide sold-out items</label></div></fieldset>' +
      '<button type="reset" class="btn btn-secondary" data-clear>Clear all filters</button>';
    $('.filter-fields', form).innerHTML = html;
    var q = params();
    if (q.type) $$('input[name="type"]', form).forEach(function (i) { if (i.value === q.type) i.checked = true; });
    function vals(n) { return $$('input[name="' + n + '"]:checked', form).map(function (i) { return i.value; }); }
    function render() {
      var t = vals('type'), c = vals('color'), s = vals('size'), max = +$('[name="max"]', form).value || 0;
      var sale = $('[name="sale"]', form).checked, avail = $('[name="avail"]', form).checked, sort = $('#sort', root).value;
      var r = base.filter(function (p) {
        return (!t.length || t.indexOf(p.type) > -1) && (!c.length || p.colors.some(function (x) { return c.indexOf(x) > -1; })) &&
          (!s.length || p.sizes.some(function (x) { return s.indexOf(x) > -1; })) && (!max || p.price <= max) && (!sale || p.was) && (!avail || !p.soldOut);
      });
      if (sort === 'low') r.sort(function (a, b) { return a.price - b.price; });
      else if (sort === 'high') r.sort(function (a, b) { return b.price - a.price; });
      else if (sort === 'name') r.sort(function (a, b) { return a.name.localeCompare(b.name); });
      list.innerHTML = r.map(card).join('');
      empty.hidden = r.length > 0;
      count.textContent = r.length + (r.length === 1 ? ' product' : ' products') + ' shown';
      return r.length;
    }
    var first = true;
    function update() { var n = render(); if (!first) announce(n + (n === 1 ? ' product' : ' products') + ' shown.'); first = false; }
    form.addEventListener('change', update);
    $('#sort', root).addEventListener('change', update);
    form.addEventListener('reset', function () { setTimeout(update, 0); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    var fb = $('[data-filters-toggle]', root), panel = $('#filters-panel', root);
    if (fb) fb.addEventListener('click', function () {
      var ex = fb.getAttribute('aria-expanded') === 'true';
      fb.setAttribute('aria-expanded', String(!ex)); panel.classList.toggle('open', !ex);
    });
    if (panel) panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && fb && fb.getAttribute('aria-expanded') === 'true' && getComputedStyle(fb).display !== 'none') {
        fb.setAttribute('aria-expanded', 'false'); panel.classList.remove('open'); fb.focus();
      }
    });
    update();
  }

  function initFeatured() {
    var el = $('[data-featured]');
    if (el) el.innerHTML = ['m1', 'w1', 'f1', 'd1', 'b1', 'f9', 'w4', 'm8'].map(function (i) { return card(byId(i)); }).join('');
  }

  /* ---------- product detail ---------- */
  function initProduct() {
    var root = $('[data-product-detail]');
    if (!root) return;
    var p = byId(params().id);
    var h1 = $('h1', root), body = $('[data-product-body]', root);
    if (!p) {
      h1.textContent = 'Product not found';
      body.innerHTML = '<p>That product is not in the demo catalogue. <a href="index.html">Return to the home page</a> or <a href="search.html">search the catalogue</a>.</p>';
      document.title = 'Product not found | Fernhollow Outfitters (demo)';
      return;
    }
    document.title = p.name + ' | Fernhollow Outfitters (demo)';
    h1.textContent = p.name;
    $('[data-crumb-dept]', root).innerHTML = '<a href="' + ({ men: 'men', women: 'women', fly: 'fly-fishing', dog: 'dog-products', bags: 'packs-bags' }[p.dept]) + '.html">' + DEPTS[p.dept] + '</a>';
    $('[data-crumb-name]', root).textContent = p.name;
    var price = p.was ? '<span class="price sale"><span class="now">' + money(p.price) + '</span> <s><span class="vh">Was </span>' + money(p.was) + '</s></span>' : '<span class="price">' + money(p.price) + '</span>';
    $('[data-product-price]', root).innerHTML = price + ' <span class="demo-tag">Illustrative price</span>';
    $('[data-product-desc]', root).textContent = p.desc;
    $('[data-product-features]', root).innerHTML = '<li>Material: ' + esc(p.material) + ' (fictional fabric name)</li><li>Department: ' + esc(DEPTS[p.dept]) + ' / ' + esc(TYPES[p.type]) + '</li><li>Item code: ' + p.id.toUpperCase() + ' (demo)</li>';
    var art = $('[data-product-art]', root), img = $('img', art);
    img.src = 'assets/art-' + p.art + '.svg';
    art.style.background = COLORS[p.colors[0]][1];
    var cw = $('[data-colour-options]', root);
    cw.innerHTML = p.colors.map(function (c, i) {
      return '<div class="opt"><input type="radio" name="color" id="c-' + c + '" value="' + c + '"' + (p.colors.length === 1 ? ' checked' : '') + '><label for="c-' + c + '"><span class="chip big" style="background:' + COLORS[c][1] + '"></span>' + COLORS[c][0] + '</label></div>';
    }).join('');
    $('[data-size-legend]', root).textContent = p.sizeLabel;
    var sw = $('[data-size-options]', root);
    sw.innerHTML = p.sizes.map(function (s, i) {
      var out = p.out.indexOf(s) > -1;
      return '<div class="opt"><input type="radio" name="size" id="s-' + i + '" value="' + esc(s) + '"' + (out ? ' disabled' : '') + (p.sizes.length === 1 && !out ? ' checked' : '') + '><label for="s-' + i + '">' + esc(s) + (out ? ' (sold out)' : '') + '</label></div>';
    }).join('');
    var fr = $('input[name="color"]', root); fr.setAttribute('data-required', ''); fr.setAttribute('data-msg', 'Choose a colour.');
    var fs = $('input[name="size"]', root); fs.setAttribute('data-required', ''); fs.setAttribute('data-msg', 'Choose an option for ' + p.sizeLabel.toLowerCase() + '.');
    var form = $('form', root), status = $('[data-add-status]', root), colourName = $('[data-selected-colour]', root);
    $$('input[name="color"]', form).forEach(function (r) {
      r.addEventListener('change', function () { art.style.background = COLORS[r.value][1]; colourName.textContent = 'Selected colour: ' + COLORS[r.value][0]; });
    });
    if (p.colors.length === 1) colourName.textContent = 'Selected colour: ' + COLORS[p.colors[0]][0];
    if (p.soldOut) {
      $('button[type="submit"]', form).disabled = true;
      status.textContent = 'Every option for this item is sold out in the demo data.';
    }
    wireForm(form, function () {
      var c = form.color.value, s = form.size.value, q = Math.max(1, Math.min(10, parseInt(form.qty.value, 10) || 1));
      Cart.add(p.id, c, s, q);
      var msg = 'Added ' + q + ' x ' + p.name + ' (' + COLORS[c][0] + ', ' + s + ') to the demo cart. Cart now has ' + Cart.count() + ' items.';
      status.innerHTML = esc(msg) + ' <a href="cart.html">View cart</a>';
      announce(msg);
    });
  }

  /* ---------- cart page ---------- */
  function totalsHTML(sub, ship) {
    return '<dl class="totals"><div><dt>Subtotal</dt><dd>' + money(sub) + '</dd></div><div><dt>Shipping (illustrative)</dt><dd>' + (ship === 0 ? 'Free' : money(ship)) + '</dd></div>' +
      '<div><dt>Estimated tax</dt><dd>Not calculated in this demo</dd></div><div class="grand"><dt>Demo total</dt><dd>' + money(sub + ship) + '</dd></div></dl>';
  }
  function initCart() {
    var root = $('[data-cart-page]');
    if (!root) return;
    var itemsEl = $('[data-cart-items]', root), emptyEl = $('[data-cart-empty]', root), sumEl = $('[data-cart-summary]', root), head = $('#cart-heading');
    function render() {
      var items = Cart.read();
      emptyEl.hidden = items.length > 0; $('[data-cart-filled]', root).hidden = items.length === 0;
      itemsEl.innerHTML = items.map(function (l, i) {
        var p = byId(l.id);
        return '<li class="cart-line" data-component="cart-line-item"><span class="card-art small" style="background:' + COLORS[l.color][1] + '"><img src="assets/art-' + p.art + '.svg" alt="" width="80" height="80"></span>' +
          '<div class="cl-info"><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a><p>' + esc(variantText(l)) + '</p><p>' + money(p.price) + ' each</p></div>' +
          '<div class="cl-qty"><label for="q-' + i + '">Quantity</label><input type="number" id="q-' + i + '" min="1" max="10" value="' + l.qty + '" data-idx="' + i + '"></div>' +
          '<p class="cl-total"><span class="vh">Line total </span>' + money(p.price * l.qty) + '</p>' +
          '<button type="button" class="btn btn-link" data-remove="' + i + '" aria-label="Remove ' + esc(p.name) + ', ' + esc(variantText(l)) + ' from cart">Remove</button></li>';
      }).join('');
      var sub = Cart.subtotal();
      sumEl.innerHTML = totalsHTML(sub, shippingFor(sub, 'standard'));
    }
    itemsEl.addEventListener('change', function (e) {
      var t = e.target; if (!t.matches('input[data-idx]')) return;
      var i = +t.getAttribute('data-idx'), n = parseInt(t.value, 10);
      if (!n || n < 1) n = 1; if (n > 10) n = 10;
      Cart.setQty(i, n); render();
      var again = $('#q-' + i); if (again) again.focus();
      var l = Cart.read()[i];
      announce('Quantity for ' + byId(l.id).name + ' set to ' + n + '. Subtotal ' + money(Cart.subtotal()) + '.');
    });
    itemsEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-remove]'); if (!b) return;
      var i = +b.getAttribute('data-remove'), l = Cart.read()[i], name = byId(l.id).name;
      Cart.remove(i); render();
      var next = $$('[data-remove]')[Math.min(i, Cart.read().length - 1)];
      (next || head).focus();
      announce(name + ' removed from cart. ' + (Cart.count() ? 'Subtotal ' + money(Cart.subtotal()) + '.' : 'Your cart is now empty.'));
    });
    $('[data-clear-cart]', root).addEventListener('click', function () { Cart.clear(); render(); head.focus(); announce('All items removed. Your cart is empty.'); });
    render();
  }

  /* ---------- checkout + confirmation ---------- */
  function initCheckout() {
    var root = $('[data-checkout-page]');
    if (!root) return;
    var items = Cart.read(), form = $('form', root);
    $('[data-checkout-empty]', root).hidden = items.length > 0;
    $('[data-checkout-filled]', root).hidden = items.length === 0;
    if (!items.length) return;
    var sumEl = $('[data-checkout-summary]', root);
    function method() { var m = $('input[name="delivery"]:checked', form); return m ? m.value : 'standard'; }
    function render() {
      var sub = Cart.subtotal();
      $('[data-checkout-lines]', root).innerHTML = items.map(function (l) { var p = byId(l.id); return '<li>' + l.qty + ' x ' + esc(p.name) + ' <span>(' + esc(variantText(l)) + ')</span> - ' + money(p.price * l.qty) + '</li>'; }).join('');
      sumEl.innerHTML = totalsHTML(sub, shippingFor(sub, method()));
    }
    $$('input[name="delivery"]', form).forEach(function (r) { r.addEventListener('change', render); });
    render();
    wireForm(form, function () {
      var sub = Cart.subtotal(), ship = shippingFor(sub, method());
      session.set('fh-demo-confirmation', JSON.stringify({ lines: items.map(function (l) { var p = byId(l.id); return { n: p.name, v: variantText(l), q: l.qty, t: p.price * l.qty }; }), sub: sub, ship: ship, delivery: method() }));
      Cart.clear();
      location.href = 'order-demo.html';
    });
  }
  function initConfirmation() {
    var root = $('[data-confirmation]');
    if (!root) return;
    var d = null;
    try { d = JSON.parse(session.get('fh-demo-confirmation') || 'null'); } catch (e) { d = null; }
    $('[data-confirm-empty]', root).hidden = !!d; $('[data-confirm-filled]', root).hidden = !d;
    if (!d) return;
    $('[data-confirm-lines]', root).innerHTML = d.lines.map(function (l) { return '<li>' + l.q + ' x ' + esc(l.n) + ' (' + esc(l.v) + ') - ' + money(l.t) + '</li>'; }).join('');
    $('[data-confirm-totals]', root).innerHTML = totalsHTML(d.sub, d.ship);
    $('[data-forget]', root).addEventListener('click', function () { session.del('fh-demo-confirmation'); location.href = 'index.html'; });
  }

  /* ---------- search ---------- */
  function initSearch() {
    var root = $('[data-search-page]');
    if (!root) return;
    var q = (params().q || '').trim(), input = $('#search-page-q', root);
    input.value = q;
    var out = $('[data-search-results]', root), status = $('[data-search-status]', root), empty = $('[data-empty]', root);
    if (!q) { status.textContent = 'Enter a word such as "waders", "jacket" or "bed" to search the demo catalogue.'; empty.hidden = true; return; }
    var terms = q.toLowerCase().split(/\s+/);
    var r = P.filter(function (p) {
      var hay = (p.name + ' ' + TYPES[p.type] + ' ' + DEPTS[p.dept] + ' ' + p.material + ' ' + p.colors.map(function (c) { return COLORS[c][0]; }).join(' ')).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) > -1 || (t.length > 3 && hay.indexOf(t.replace(/s$/, '')) > -1); });
    });
    out.innerHTML = r.map(card).join('');
    status.textContent = r.length + (r.length === 1 ? ' result' : ' results') + ' for "' + q + '"';
    empty.hidden = r.length > 0;
    document.title = 'Search: ' + q + ' | Fernhollow Outfitters (demo)';
  }

  /* ---------- simple demo forms ---------- */
  function initDemoForms() {
    var login = $('[data-login-form]');
    wireForm(login, function (f) {
      var s = $('[data-form-status]', f.parentNode); s.hidden = false;
      s.textContent = 'Demo only: no account system exists, nothing was sent and you are not signed in.'; s.focus(); announce(s.textContent);
    });
    var gift = $('[data-gift-form]');
    wireForm(gift, function (f) {
      var s = $('[data-form-status]', f.parentNode); s.hidden = false;
      s.textContent = 'Demo only: no gift card was created, sold or sent. A real store would continue to checkout here.'; s.focus(); announce(s.textContent);
    });
    var contact = $('[data-contact-form]');
    wireForm(contact, function (f) {
      var s = $('[data-form-status]', f.parentNode); s.hidden = false;
      s.textContent = 'Demo only: your message was not sent to anyone. Nothing was stored.'; s.focus(); announce(s.textContent);
    });
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    live = $('#live-region');
    Cart.badge();
    initDrawer(); initDisclosures(); initListing(); initFeatured(); initProduct(); initCart(); initCheckout(); initConfirmation(); initSearch(); initDemoForms();
  });
}());
