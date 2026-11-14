/* Pebblebloom (fictional demo store) - vanilla JS, no network, works from file://.
   All catalog data is inline sample data. Prices and ratings are illustrative. */
(function () {
  'use strict';

  /* ---------- sample data ---------- */
  function S(name, hex, out) { return { n: name, c: hex, out: !!out }; }
  function Z(name, price) { return { n: name, p: price }; }
  var sizes = function (a, b, bp) { return [Z(a), Z(b, bp)]; };
  var PRODUCTS = [
    { id: 'hush-cloud-cream', name: 'Hush Cloud Cream', cat: 'Skincare', type: 'Moisturizers', price: 24, bs: 1, isNew: 3, rating: 4.6, rc: 128, kind: 'Size', variants: sizes('30 ml', '50 ml', 34), format: 'Whipped cream in a jar', finish: 'Soft, cushiony feel', desc: 'A light, whipped cream that spreads easily and sits softly on the skin. Sample product copy for a fictional store.' },
    { id: 'lumen-gel-cream', name: 'Lumen Gel Cream', cat: 'Skincare', type: 'Moisturizers', price: 28, rating: 4.4, rc: 87, isNew: 5, kind: 'Size', variants: sizes('30 ml', '50 ml', 40), format: 'Gel-cream in a pump bottle', finish: 'Fresh, bouncy feel', desc: 'A gel-cream texture that melts in quickly. Pump bottle for one-handed use.' },
    { id: 'slow-morning-lotion', name: 'Slow Morning Lotion', cat: 'Skincare', type: 'Moisturizers', price: 22, rating: 4.1, rc: 54, isNew: 8, kind: 'Size', variants: sizes('75 ml', '150 ml', 36), format: 'Lotion in a tube', finish: 'Smooth, even feel', desc: 'A everyday lotion in a squeeze tube with a flip cap, made for easy morning routines.' },
    { id: 'softwick-balm-pot', name: 'Softwick Balm Pot', cat: 'Skincare', type: 'Moisturizers', price: 18, rating: 4.7, rc: 201, isNew: 2, kind: 'Size', variants: sizes('15 g', '30 g', 30), format: 'Balm in a pot', finish: 'Cushiony, soft-focus feel', desc: 'A multi-use balm with a smooth, melting texture for lips, hands and anywhere that wants a soft finish.' },
    { id: 'dawn-rinse-gel-wash', name: 'Dawn Rinse Gel Wash', cat: 'Skincare', type: 'Cleansers', price: 16, bs: 1, rating: 4.5, rc: 143, isNew: 6, kind: 'Size', variants: sizes('120 ml', '240 ml', 26), format: 'Gel wash in a pump bottle', finish: 'Fresh, rinse-off feel', desc: 'A clear gel that lathers lightly and rinses clean. Sample product copy.' },
    { id: 'melt-away-cleansing-balm', name: 'Melt Away Cleansing Balm', cat: 'Skincare', type: 'Cleansers', price: 24, rating: 4.3, rc: 66, isNew: 10, format: 'Solid balm in a pot, 50 g', finish: 'Silky, melting texture', desc: 'A solid balm that warms into a silky oil between the fingers, with a muslin cloth included.' },
    { id: 'foam-whisper-cleanser', name: 'Foam Whisper Cleanser', cat: 'Skincare', type: 'Cleansers', price: 18, rating: 3.9, rc: 31, isNew: 12, format: 'Foaming cleanser, 150 ml', finish: 'Airy foam', desc: 'A pump-foam cleanser that dispenses as a cloud of light foam.' },
    { id: 'glow-ladder-serum', name: 'Glow Ladder Serum', cat: 'Skincare', type: 'Treatments', price: 32, bs: 1, rating: 4.5, rc: 176, isNew: 4, kind: 'Size', variants: sizes('20 ml', '30 ml', 46), format: 'Serum with a dropper', finish: 'Lightweight, glossy feel', desc: 'A lightweight serum with a dropper top. Sample product copy for a fictional store.' },
    { id: 'cool-linen-mist', name: 'Cool Linen Mist', cat: 'Skincare', type: 'Treatments', price: 20, rating: 4.0, rc: 49, isNew: 9, kind: 'Size', variants: sizes('60 ml', '120 ml', 32), format: 'Fine mist spray', finish: 'Cool, light veil', desc: 'A fine, even mist in a pocket-size bottle.' },
    { id: 'overnight-pillow-mask', name: 'Overnight Pillow Mask', cat: 'Skincare', type: 'Treatments', price: 26, rating: 4.2, rc: 72, isNew: 7, format: 'Sleeping mask in a tub, 50 ml', finish: 'Plush, cushiony texture', desc: 'A plush, pillowy mask texture designed to be smoothed on at the end of the day.' },
    { id: 'velvet-round-pads', name: 'Velvet Round Pads', cat: 'Skincare', type: 'Treatments', price: 28, rating: 4.1, rc: 38, isNew: 11, format: 'Textured pads, 30 count', finish: 'Soft, slightly textured', desc: 'Soft textured pads in a resealable jar, sold as a sample item in this fictional catalog.' },
    { id: 'easy-routine-set', name: 'The Easy Routine Set', cat: 'Skincare', type: 'Sets', price: 52, set: 1, rating: 4.8, rc: 95, isNew: 1, format: 'Set of three: wash, cream, balm', finish: 'Mixed', desc: 'A three-piece gift set: Dawn Rinse Gel Wash, Hush Cloud Cream and Softwick Balm Pot in travel sizes.' },

    { id: 'second-skin-tint', name: 'Second Skin Tint', cat: 'Makeup', type: 'Face', price: 26, bs: 1, rating: 4.6, rc: 310, isNew: 3, kind: 'Shade', variants: [S('Porcelain Moon', '#f1d9c8'), S('Soft Sand', '#e6c4a4'), S('Warm Honey', '#d3a47a'), S('Golden Fig', '#b98258'), S('Toasted Almond', '#9b6842'), S('Copper Dusk', '#7e4f31', true), S('Deep Cocoa', '#5e3924'), S('Espresso Night', '#3f271a')], format: 'Liquid tint with a dropper pump', finish: 'Natural, skin-like finish', desc: 'A sheer, buildable liquid tint. Shade names are fictional and the swatches are illustrative colours only.' },
    { id: 'cover-stick-concealer', name: 'Cover Stick Concealer', cat: 'Makeup', type: 'Face', price: 20, rating: 4.2, rc: 118, isNew: 6, kind: 'Shade', variants: [S('Pale Oat', '#f3dcca'), S('Sandstone', '#e3bd9a'), S('Amber Light', '#c99468'), S('Chestnut', '#9a6a46'), S('Walnut', '#6b432b'), S('Ebony Shell', '#40271b')], format: 'Twist-up stick', finish: 'Soft matte finish', desc: 'A twist-up concealer stick with a creamy, blendable texture.' },
    { id: 'haze-powder', name: 'Haze Powder', cat: 'Makeup', type: 'Face', price: 28, rating: 4.0, rc: 59, isNew: 9, kind: 'Shade', variants: [S('Sheer Light', '#f0e0d2'), S('Sheer Medium', '#d9b99b'), S('Sheer Deep', '#8a5d3f')], format: 'Loose powder in a shaker jar', finish: 'Soft-focus matte', desc: 'A finely milled loose powder with a shaker top.' },
    { id: 'blur-primer-cream', name: 'Blur Primer Cream', cat: 'Makeup', type: 'Face', price: 24, rating: 3.8, rc: 27, isNew: 13, format: 'Cream primer in a tube, 30 ml', finish: 'Smooth, velvety base', desc: 'A silky cream applied before base makeup for a smooth, even-looking surface.' },
    { id: 'velvet-smudge-lip-tint', name: 'Velvet Smudge Lip Tint', cat: 'Makeup', type: 'Lip', price: 18, bs: 1, rating: 4.7, rc: 264, isNew: 2, kind: 'Shade', variants: [S('Rosewater', '#d98a94'), S('Brick Lane', '#a8452f'), S('Plum Hour', '#6d2a46'), S('Peach Fizz', '#e9906c'), S('Cherry Static', '#b5172f', true), S('Mocha Ink', '#5a3329')], format: 'Doe-foot liquid lip tint', finish: 'Velvety matte-blur', desc: 'A liquid lip tint with a soft, blurred matte finish and a doe-foot applicator.' },
    { id: 'glasshouse-lip-gloss', name: 'Glasshouse Lip Gloss', cat: 'Makeup', type: 'Lip', price: 16, rating: 4.4, rc: 101, isNew: 5, kind: 'Shade', variants: [S('Clear Glass', '#f2d4cf'), S('Pink Pane', '#e5a0b0'), S('Amber Sill', '#c9733f'), S('Berry Frame', '#8f2f55')], format: 'Gloss with a flat applicator', finish: 'High-shine', desc: 'A non-sticky-feeling gloss with a mirror shine, fictional sample product.' },
    { id: 'melt-balm-stick', name: 'Melt Balm Stick', cat: 'Makeup', type: 'Lip', price: 14, rating: 4.3, rc: 77, isNew: 8, kind: 'Shade', variants: [S('Bare Petal', '#e7b3a8'), S('Tea Rose', '#c97f86'), S('Spiced Fig', '#8a3e4a'), S('Clay Pot', '#b86b4f')], format: 'Twist-up tinted balm stick', finish: 'Glossy-satin', desc: 'A tinted balm stick with a smooth glide.' },
    { id: 'satin-lip-pencil', name: 'Satin Lip Pencil', cat: 'Makeup', type: 'Lip', price: 15, rating: 4.1, rc: 45, isNew: 12, kind: 'Shade', variants: [S('Nude Ribbon', '#c89a86'), S('Rosewood', '#9d5459'), S('Mulberry', '#6b2e47'), S('Terracotta', '#b0583c'), S('Soft Wine', '#7a2538')], format: 'Retractable pencil', finish: 'Satin', desc: 'A retractable pencil with a creamy, satin finish.' },
    { id: 'brushwork-brow-gel', name: 'Brushwork Brow Gel', cat: 'Makeup', type: 'Brow', price: 18, bs: 1, rating: 4.5, rc: 189, isNew: 4, kind: 'Shade', variants: [S('Blonde Straw', '#c8a56e'), S('Chestnut', '#7b5232'), S('Umber', '#4d3524'), S('Soot', '#2b2220')], format: 'Tinted gel with a mini brush', finish: 'Natural, brushed-up look', desc: 'A tinted brow gel with a small spoolie-style brush.' },
    { id: 'micro-brow-pencil', name: 'Micro Brow Pencil', cat: 'Makeup', type: 'Brow', price: 20, rating: 4.2, rc: 61, isNew: 10, kind: 'Shade', variants: [S('Sand', '#bd9a66'), S('Hazel', '#8a6540'), S('Cocoa', '#58392a'), S('Charcoal', '#34302e')], format: 'Ultra-fine retractable pencil', finish: 'Fine, hair-like strokes', desc: 'An ultra-fine retractable pencil with a spoolie on the other end.' },
    { id: 'lid-cream-pot', name: 'Lid Cream Pot', cat: 'Makeup', type: 'Eye', price: 20, rating: 4.0, rc: 52, isNew: 7, kind: 'Shade', variants: [S('Moonstone', '#d9cfc4'), S('Bronze Hour', '#a8794a'), S('Sage Dusk', '#7f8a6a'), S('Plum Smoke', '#6a4a62'), S('Midnight Teal', '#2f4f55')], format: 'Cream eyeshadow pot', finish: 'Satin to shimmer', desc: 'A cream shadow you can pat on with fingertips.' },
    { id: 'fringe-mascara', name: 'Fringe Mascara', cat: 'Makeup', type: 'Eye', price: 22, bs: 1, rating: 4.4, rc: 240, isNew: 6, kind: 'Shade', variants: [S('Black Ink', '#1d1918'), S('Brown Bark', '#4a3326')], format: 'Mascara with a curved wand', finish: 'Defined, separated look', desc: 'A mascara with a curved wand and flexible bristles.' },
    { id: 'pocket-liner', name: 'Pocket Liner', cat: 'Makeup', type: 'Eye', price: 17, rating: 4.1, rc: 39, isNew: 11, kind: 'Shade', variants: [S('Jet', '#1a1615'), S('Espresso', '#42291f'), S('Deep Navy', '#1f2a4a')], format: 'Gel pencil liner', finish: 'Smudge-friendly cream', desc: 'A soft gel pencil liner small enough for a pocket.' },
    { id: 'cheek-pudding', name: 'Cheek Pudding', cat: 'Makeup', type: 'Cheek', price: 20, bs: 1, rating: 4.6, rc: 222, isNew: 3, kind: 'Shade', variants: [S('Petal Pink', '#eaa0ad'), S('Apricot Cream', '#eb9a74'), S('Berry Jam', '#a8365b'), S('Rosy Clay', '#c4776d'), S('Raisin', '#7b3a43'), S('Pale Peach', '#f2c2a6')], format: 'Cream blush in a pot', finish: 'Dewy, bouncy', desc: 'A bouncy cream blush that blends with fingertips.' },
    { id: 'warm-up-stick', name: 'Warm Up Stick', cat: 'Makeup', type: 'Cheek', price: 24, rating: 4.0, rc: 33, isNew: 9, kind: 'Shade', variants: [S('Light Warm', '#d9a77f'), S('Medium Warm', '#b27a52'), S('Deep Warm', '#7d4e32')], format: 'Cream bronzer stick', finish: 'Satin', desc: 'A cream bronzer stick for sweeping across cheeks and temples.' },
    { id: 'pressed-flush-compact', name: 'Pressed Flush Compact', cat: 'Makeup', type: 'Cheek', price: 22, rating: 4.2, rc: 48, isNew: 12, kind: 'Shade', variants: [S('Soft Coral', '#ee8a78'), S('Rose Dust', '#d58a96'), S('Wine Sip', '#8c3a52'), S('Cinnamon', '#a85f45')], format: 'Pressed powder blush in a compact', finish: 'Soft matte', desc: 'A pressed powder blush with a small mirror in the lid.' },
    { id: 'weekend-face-kit', name: 'The Weekend Face Kit', cat: 'Makeup', type: 'Sets', price: 48, set: 1, rating: 4.7, rc: 70, isNew: 1, kind: 'Shade', variants: [S('Light Kit', '#e6c4a4'), S('Medium Kit', '#b98258'), S('Deep Kit', '#6b432b')], format: 'Set of three: tint, cheek, lip', finish: 'Mixed', desc: 'A starter set with a mini tint, cheek pudding and balm stick in a matching shade family.' },

    { id: 'marigold-hour', name: 'Marigold Hour', cat: 'Fragrance', type: 'Scents', price: 68, bs: 1, rating: 4.5, rc: 110, isNew: 4, kind: 'Size', variants: sizes('30 ml', '50 ml', 98), format: 'Eau de parfum spray', finish: 'Warm, sunny scent', desc: 'A bright, warm scent in a glass bottle. Scent notes in this fictional catalog are described loosely: sunny, golden, soft.' },
    { id: 'salt-and-linen', name: 'Salt and Linen', cat: 'Fragrance', type: 'Scents', price: 68, rating: 4.3, rc: 84, isNew: 6, kind: 'Size', variants: sizes('30 ml', '50 ml', 98), format: 'Eau de parfum spray', finish: 'Clean, airy scent', desc: 'A clean, airy scent in a glass bottle with a magnetic cap.' },
    { id: 'night-orchard', name: 'Night Orchard', cat: 'Fragrance', type: 'Scents', price: 72, rating: 4.4, rc: 63, isNew: 7, kind: 'Size', variants: sizes('30 ml', '50 ml', 104), format: 'Eau de parfum spray', finish: 'Deep, fruity-sweet scent', desc: 'A deeper evening scent in a dark glass bottle.' },
    { id: 'paper-moon', name: 'Paper Moon', cat: 'Fragrance', type: 'Scents', price: 66, rating: 4.1, rc: 41, isNew: 10, kind: 'Size', variants: sizes('30 ml', '50 ml', 94), format: 'Eau de parfum spray', finish: 'Powdery, soft scent', desc: 'A soft, powdery scent in a frosted bottle.' },
    { id: 'ember-tea', name: 'Ember Tea', cat: 'Fragrance', type: 'Scents', price: 70, rating: 4.2, rc: 36, isNew: 8, kind: 'Size', variants: sizes('30 ml', '50 ml', 100), format: 'Eau de parfum spray', finish: 'Smoky-sweet scent', desc: 'A smoky-sweet scent in an amber glass bottle.' },
    { id: 'sampler-set', name: 'Fragrance Sampler Set', cat: 'Fragrance', type: 'Sets', price: 36, set: 1, rating: 4.6, rc: 58, isNew: 2, kind: 'Size', variants: [Z('Five 2 ml vials')], format: 'Five sample vials', finish: 'Mixed', desc: 'Five small sample vials, one for each scent in the catalog.' }
  ];
  var BY_ID = {};
  PRODUCTS.forEach(function (p, i) { p.order = i; BY_ID[p.id] = p; });

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { return '$' + Number(n).toFixed(2); }
  function params() { try { return new URLSearchParams(location.search); } catch (e) { return { get: function () { return null; } }; } }
  function unitPrice(p, vName) {
    if (p.variants && vName) { for (var i = 0; i < p.variants.length; i++) { if (p.variants[i].n === vName && p.variants[i].p) return p.variants[i].p; } }
    return p.price;
  }
  function fromPrice(p) {
    var lo = p.price, hi = p.price;
    (p.variants || []).forEach(function (v) { var x = v.p || p.price; if (x < lo) lo = x; if (x > hi) hi = x; });
    return lo !== hi ? 'From ' + money(lo) : money(lo);
  }

  var live = null;
  function announce(msg) {
    if (!live) live = $('#live-status');
    if (!live) return;
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 60);
  }

  /* ---------- storage (always guarded) ---------- */
  var mem = {};
  function store(kind) { try { return window[kind]; } catch (e) { return null; } }
  function sGet(key) {
    try { var st = store('sessionStorage'); if (st) { var v = st.getItem(key); if (v !== null) return v; } } catch (e) { /* storage unavailable */ }
    return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : null;
  }
  function sSet(key, val) {
    mem[key] = val;
    try { var st = store('sessionStorage'); if (st) st.setItem(key, val); } catch (e) { /* storage unavailable: memory fallback only */ }
  }
  function sDel(key) {
    delete mem[key];
    try { var st = store('sessionStorage'); if (st) st.removeItem(key); } catch (e) { /* ignore */ }
  }

  /* ---------- cart ---------- */
  var CART_KEY = 'pebblebloom.demo.cart';
  var MAX_QTY = 10;
  function loadCart() {
    var raw = sGet(CART_KEY), out = [];
    if (!raw) return out;
    try {
      JSON.parse(raw).forEach(function (l) { if (l && BY_ID[l.id] && l.qty > 0) out.push({ id: l.id, v: l.v || '', qty: Math.min(MAX_QTY, l.qty | 0) }); });
    } catch (e) { /* corrupt data: start empty */ }
    return out;
  }
  function saveCart(c) { sSet(CART_KEY, JSON.stringify(c)); }
  function cartCount(c) { return c.reduce(function (n, l) { return n + l.qty; }, 0); }
  function cartTotal(c) { return c.reduce(function (n, l) { return n + l.qty * unitPrice(BY_ID[l.id], l.v); }, 0); }
  function lineLabel(l) { var p = BY_ID[l.id]; return p.name + (l.v ? ', ' + l.v : ''); }

  function addToCart(id, v, qty) {
    var c = loadCart(), found = null;
    c.forEach(function (l) { if (l.id === id && l.v === v) found = l; });
    if (found) found.qty = Math.min(MAX_QTY, found.qty + qty); else c.push({ id: id, v: v, qty: Math.min(MAX_QTY, qty) });
    saveCart(c);
    renderCartUI();
    announce('Added ' + qty + ' x ' + lineLabel({ id: id, v: v }) + ' to your demo bag. Bag now has ' + cartCount(c) + ' items, subtotal ' + money(cartTotal(c)) + '.');
  }
  function setQty(index, qty) {
    var c = loadCart(); if (!c[index]) return;
    qty = Math.max(1, Math.min(MAX_QTY, qty | 0 || 1));
    c[index].qty = qty; saveCart(c); renderCartUI();
    announce('Quantity of ' + lineLabel(c[index]) + ' is now ' + qty + '. Bag subtotal ' + money(cartTotal(c)) + '.');
  }
  function removeLine(index, focusAfter) {
    var c = loadCart(); if (!c[index]) return;
    var label = lineLabel(c[index]); c.splice(index, 1); saveCart(c); renderCartUI();
    announce('Removed ' + label + ' from your demo bag. ' + (c.length ? 'Bag subtotal ' + money(cartTotal(c)) + '.' : 'Your bag is now empty.'));
    if (focusAfter) {
      var container = focusAfter;
      var next = container.querySelector('[data-remove]') || container.querySelector('[data-empty-focus]');
      if (next) next.focus();
    }
  }

  function cartLinesHTML(c, readonly) {
    if (!c.length) return '';
    return '<ul class="cart-lines">' + c.map(function (l, i) {
      var p = BY_ID[l.id], up = unitPrice(p, l.v), label = esc(lineLabel(l));
      var qty = readonly ? '<span>Qty ' + l.qty + '</span>' :
        '<label class="qty"><span class="qty__label">Quantity<span class="sr-only"> for ' + label + '</span></span><input type="number" min="1" max="' + MAX_QTY + '" value="' + l.qty + '" inputmode="numeric" data-qty-input="' + i + '"></label>';
      var rm = readonly ? '' : '<button type="button" class="btn-link" data-remove="' + i + '">Remove<span class="sr-only"> ' + label + '</span></button>';
      return '<li class="cart-line" data-component="cart-line-item"><div class="cart-line__art">' + productArt(p, variantColor(p, l.v)) + '</div><div class="cart-line__body"><p class="cart-line__name"><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></p>' +
        (l.v ? '<p class="cart-line__variant">' + esc(p.kind || 'Option') + ': ' + esc(l.v) + '</p>' : '') +
        '<p class="cart-line__price">' + money(up) + ' each</p><div class="cart-line__controls">' + qty + rm + '</div></div><p class="cart-line__total">' + money(up * l.qty) + '</p></li>';
    }).join('') + '</ul>';
  }

  function renderCartUI() {
    var c = loadCart(), n = cartCount(c);
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; });
    $$('[data-cart-lines]').forEach(function (el) {
      var ro = el.hasAttribute('data-readonly');
      if (!c.length) {
        el.innerHTML = '<div class="empty-state" data-component="empty-state"><p><strong>Your demo bag is empty.</strong></p><p>Add something from the catalog and it will show up here.</p><p><a class="btn" href="shop.html" data-empty-focus>Browse all products</a></p></div>';
      } else {
        el.innerHTML = cartLinesHTML(c, ro);
      }
    });
    $$('[data-cart-subtotal]').forEach(function (el) { el.textContent = money(cartTotal(c)); });
    $$('[data-cart-hide-empty]').forEach(function (el) { el.hidden = !c.length; });
  }

  /* ---------- product art (abstract inline SVG placeholders) ---------- */
  function variantColor(p, vName) {
    if (p.variants && vName) { for (var i = 0; i < p.variants.length; i++) if (p.variants[i].n === vName && p.variants[i].c) return p.variants[i].c; }
    return null;
  }
  var BG = { Skincare: '#e9f0ea', Makeup: '#f7e3df', Fragrance: '#eee5f2' };
  function productArt(p, color) {
    var c = color || '#7a2744', body = '';
    if (p.cat === 'Skincare') body = '<rect x="30" y="52" width="60" height="42" rx="9" fill="#fbf7f2"/><rect x="34" y="38" width="52" height="18" rx="6" fill="' + c + '"/>';
    else if (p.cat === 'Makeup') body = '<rect x="48" y="22" width="24" height="76" rx="12" fill="#fbf7f2"/><rect x="48" y="22" width="24" height="30" rx="12" fill="' + c + '"/><circle cx="84" cy="88" r="10" fill="' + c + '"/>';
    else body = '<rect x="36" y="42" width="48" height="56" rx="9" fill="#fbf7f2"/><rect x="50" y="24" width="20" height="20" rx="4" fill="' + c + '"/><circle cx="60" cy="70" r="9" fill="' + c + '"/>';
    return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" class="art"><rect width="120" height="120" fill="' + (BG[p.cat] || '#eee') + '"/><circle cx="60" cy="64" r="46" fill="#ffffff" opacity=".55"/>' + body + '</svg>';
  }

  function cardHTML(p, hl) {
    return '<li class="product-card" data-component="product-card" data-product-id="' + p.id + '"><div class="product-card__art">' + productArt(p) + '</div>' +
      '<h' + hl + ' class="product-card__name"><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h' + hl + '>' +
      '<p class="product-card__meta">' + esc(p.cat) + ' / ' + esc(p.type) + (p.bs ? ' / Best-seller' : '') + '</p>' +
      '<p class="product-card__price">' + fromPrice(p) + '</p></li>';
  }
  function renderCards(el, list) { var hl = el.getAttribute('data-hl') || '3'; el.innerHTML = list.map(function (p) { return cardHTML(p, hl); }).join(''); }

  /* ---------- header: nav disclosures, mobile menu, drawer, search ---------- */
  function initHeader() {
    var nav = $('#site-nav'), menuBtn = $('#menu-toggle');
    function closeSubmenus(except) {
      $$('.nav-toggle').forEach(function (b) {
        if (b === except) return;
        b.setAttribute('aria-expanded', 'false');
        var panel = document.getElementById(b.getAttribute('aria-controls')); if (panel) panel.hidden = true;
      });
    }
    $$('.nav-toggle').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        closeSubmenus(b);
        b.setAttribute('aria-expanded', open ? 'false' : 'true');
        var panel = document.getElementById(b.getAttribute('aria-controls')); if (panel) panel.hidden = open;
      });
    });
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', function () {
        var open = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
        nav.classList.toggle('is-open', !open);
        if (open) closeSubmenus(null);
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var dlg = $('#cart-drawer'); if (dlg && dlg.open) return; /* native dialog handles Escape */
      var openBtn = $('.nav-toggle[aria-expanded="true"]');
      if (openBtn) { closeSubmenus(null); openBtn.focus(); return; }
      if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true' && menuBtn.offsetParent !== null) {
        menuBtn.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); menuBtn.focus();
      }
    });
    document.addEventListener('click', function (e) { if (nav && !nav.contains(e.target)) closeSubmenus(null); });
    document.addEventListener('focusin', function (e) { if (nav && !nav.contains(e.target)) closeSubmenus(null); });

    /* cart drawer */
    var dlg = $('#cart-drawer'), cb = $('#cart-button'), lastFocus = null;
    if (dlg && cb && typeof dlg.showModal === 'function') {
      cb.addEventListener('click', function () { lastFocus = cb; renderCartUI(); dlg.showModal(); });
      $('#drawer-close').addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', function () { if (lastFocus) lastFocus.focus(); });
      window.openDrawer = function (from) { lastFocus = from || cb; renderCartUI(); dlg.showModal(); };
    } else if (cb) {
      cb.addEventListener('click', function () { location.href = 'cart.html'; });
    }

    /* header search: keep query in the field on the results page */
    var q = params().get('q'), sf = $('#header-search-input');
    if (sf && q) sf.value = q;
  }

  /* delegated cart events (page + drawer) */
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-qty-input]')) setQty(+t.getAttribute('data-qty-input'), parseInt(t.value, 10));
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-remove]') : null;
    if (t) removeLine(+t.getAttribute('data-remove'), t.closest('[data-cart-lines]'));
  });

  /* ---------- listing pages ---------- */
  var PRICE_BANDS = [
    { k: 'u20', label: 'Under $20', test: function (x) { return x < 20; } },
    { k: '20-39', label: '$20 to $39.99', test: function (x) { return x >= 20 && x < 40; } },
    { k: '40up', label: '$40 and over', test: function (x) { return x >= 40; } }
  ];
  var SORTS = {
    featured: function (a, b) { return a.order - b.order; },
    'price-asc': function (a, b) { return a.price - b.price || a.order - b.order; },
    'price-desc': function (a, b) { return b.price - a.price || a.order - b.order; },
    'name-asc': function (a, b) { return a.name.localeCompare(b.name); },
    newest: function (a, b) { return a.isNew - b.isNew; }
  };

  function initListing() {
    var main = $('#main-content'), coll = main.getAttribute('data-collection'); if (!coll) return;
    var base = PRODUCTS.filter(function (p) {
      if (coll === 'all') return true;
      if (coll === 'best-sellers') return !!p.bs;
      return p.cat.toLowerCase() === coll;
    });
    var field = (coll === 'all' || coll === 'best-sellers') ? 'cat' : 'type';
    var fieldLabel = field === 'cat' ? 'Category' : 'Type';
    var values = []; base.forEach(function (p) { if (values.indexOf(p[field]) < 0) values.push(p[field]); });
    var pre = params().get('type');
    var grid = $('#product-grid'), count = $('#result-count'), empty = $('#empty-results'), groups = $('#filter-groups');
    var sortSel = $('#sort-select'), toggle = $('#filter-toggle'), panel = $('#filter-panel');
    groups.innerHTML =
      '<fieldset class="filter-group" data-component="filter-group"><legend>' + fieldLabel + '</legend>' + values.map(function (v, i) {
        return '<label class="check"><input type="checkbox" name="t" value="' + esc(v) + '"' + (pre && pre.toLowerCase() === v.toLowerCase() ? ' checked' : '') + '> ' + esc(v) + '</label>';
      }).join('') + '</fieldset>' +
      '<fieldset class="filter-group" data-component="filter-group"><legend>Price</legend>' + PRICE_BANDS.map(function (b) {
        return '<label class="check"><input type="checkbox" name="pr" value="' + b.k + '"> ' + b.label + '</label>';
      }).join('') + '</fieldset>' +
      '<fieldset class="filter-group" data-component="filter-group"><legend>More</legend>' +
      (coll === 'best-sellers' ? '' : '<label class="check"><input type="checkbox" name="bs" value="1"> Best-sellers only</label>') +
      '<label class="check"><input type="checkbox" name="set" value="1"> Sets only</label>' +
      '<label class="check"><input type="checkbox" name="ok" value="1"> Hide products with an unavailable option</label></fieldset>';

    function apply(announceIt) {
      var t = $$('input[name=t]:checked', groups).map(function (i) { return i.value; });
      var pr = $$('input[name=pr]:checked', groups).map(function (i) { return i.value; });
      var bsOnly = !!$('input[name=bs]:checked', groups), setOnly = !!$('input[name=set]:checked', groups), ok = !!$('input[name=ok]:checked', groups);
      var list = base.filter(function (p) {
        if (t.length && t.indexOf(p[field]) < 0) return false;
        if (pr.length && !PRICE_BANDS.some(function (b) { return pr.indexOf(b.k) >= 0 && b.test(p.price); })) return false;
        if (bsOnly && !p.bs) return false;
        if (setOnly && !p.set) return false;
        if (ok && (p.variants || []).some(function (v) { return v.out; })) return false;
        return true;
      }).sort(SORTS[sortSel.value] || SORTS.featured);
      renderCards(grid, list);
      var msg = list.length + (list.length === 1 ? ' product' : ' products') + ' shown';
      count.textContent = msg; empty.hidden = list.length > 0; grid.hidden = list.length === 0;
      if (announceIt) announce(msg + '. Sorted by ' + sortSel.options[sortSel.selectedIndex].text + '.');
    }
    groups.addEventListener('change', function () { apply(true); });
    sortSel.addEventListener('change', function () { apply(true); });
    $$('[data-clear-filters]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('input[type=checkbox]', groups).forEach(function (i) { i.checked = false; });
        sortSel.value = 'featured'; apply(true);
        var first = $('input', groups); if (first) first.focus();
      });
    });
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true'); panel.classList.toggle('is-open', !open);
    });
    apply(false);
  }

  /* ---------- search ---------- */
  function initSearch() {
    var out = $('#search-results'); if (!out) return;
    var q = (params().get('q') || '').trim(), status = $('#search-status'), empty = $('#search-empty'), grid = $('#search-grid'), h = $('#search-heading');
    if (!q) {
      status.textContent = 'Type something in the search box above to search the sample catalog.'; empty.hidden = true; grid.hidden = true; return;
    }
    var words = q.toLowerCase().split(/\s+/);
    var hits = PRODUCTS.filter(function (p) {
      var hay = [p.name, p.cat, p.type, p.desc, p.format, p.finish].concat((p.variants || []).map(function (v) { return v.n; })).join(' ').toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) >= 0; });
    });
    h.textContent = 'Search results for “' + q + '”';
    document.title = 'Search: ' + q + ' | Pebblebloom (demo)';
    status.textContent = hits.length + (hits.length === 1 ? ' item' : ' items');
    announce(hits.length + ' search results for ' + q + '.');
    if (hits.length) { renderCards(grid, hits); grid.hidden = false; empty.hidden = true; }
    else { grid.hidden = true; empty.hidden = false; $('#search-empty-q').textContent = q; }
  }

  /* ---------- product page ---------- */
  function initProduct() {
    var root = $('#product-root'); if (!root) return;
    var id = params().get('id'), p = BY_ID[id], h1 = $('#product-title');
    if (!p) {
      root.hidden = true; $('#product-missing').hidden = false; h1.textContent = 'Product not found';
      document.title = 'Product not found | Pebblebloom (demo)'; return;
    }
    document.title = p.name + ' | Pebblebloom (demo)';
    h1.textContent = p.name;
    $('#crumb-cat').innerHTML = '<a href="' + p.cat.toLowerCase() + '.html">' + esc(p.cat) + '</a>';
    $('#crumb-name').textContent = p.name;
    var art = $('#product-art'), priceEl = $('#product-price'), sel = null, err = $('#variant-error'), vbox = $('#variant-box');
    function showArt(color, vname) {
      art.innerHTML = productArt(p, color).replace('aria-hidden="true"', 'role="img" aria-label="Illustrative placeholder image of ' + esc(p.name) + (vname ? ', ' + esc(vname) : '') + '"');
    }
    showArt(null, '');
    priceEl.textContent = fromPrice(p);
    $('#product-desc').textContent = p.desc;
    $('#product-details').innerHTML = '<div><dt>Category</dt><dd>' + esc(p.cat) + ' / ' + esc(p.type) + '</dd></div><div><dt>Format</dt><dd>' + esc(p.format) + '</dd></div><div><dt>Finish</dt><dd>' + esc(p.finish) + '</dd></div>';
    $('#product-rating').innerHTML = '<span aria-hidden="true">★</span> ' + p.rating.toFixed(1) + ' out of 5 (' + p.rc + ' sample ratings). <em>Fictional sample data, not real customer reviews.</em>';

    if (p.variants && p.variants.length) {
      vbox.hidden = false;
      var kind = p.kind || 'Option';
      $('#variant-legend').textContent = kind;
      $('#variant-list').innerHTML = p.variants.map(function (v, i) {
        var swatch = v.c ? '<span class="swatch" style="background:' + v.c + '" aria-hidden="true"></span>' : '';
        return '<li><input type="radio" name="variant" id="variant-' + i + '" value="' + esc(v.n) + '"' + (v.out ? ' disabled' : '') + '><label for="variant-' + i + '" class="variant">' + swatch +
          '<span class="variant__name">' + esc(v.n) + '</span>' + (v.p ? '<span class="variant__price">' + money(v.p) + '</span>' : '') + (v.out ? '<span class="variant__note">Unavailable (demo)</span>' : '') + '</label></li>';
      }).join('');
      $('#variant-list').addEventListener('change', function (e) {
        sel = e.target.value; err.hidden = true; err.textContent = '';
        $('#variant-list').removeAttribute('aria-describedby');
        priceEl.textContent = money(unitPrice(p, sel));
        showArt(variantColor(p, sel), sel);
        $('#variant-selected').textContent = kind + ' selected: ' + sel;
        announce(kind + ' ' + sel + ' selected. Price ' + money(unitPrice(p, sel)) + '.');
        syncSticky();
      });
    }
    var qtyEl = $('#qty-input');
    function doAdd(from) {
      if (p.variants && p.variants.length && !sel) {
        err.textContent = 'Choose a ' + (p.kind || 'option').toLowerCase() + ' before adding to your bag.'; err.hidden = false;
        var first = $('input[name=variant]:not([disabled])'); if (first) first.focus();
        announce(err.textContent); return;
      }
      var q = parseInt(qtyEl.value, 10);
      if (!(q >= 1 && q <= MAX_QTY)) { $('#qty-error').textContent = 'Enter a quantity from 1 to ' + MAX_QTY + '.'; $('#qty-error').hidden = false; qtyEl.focus(); return; }
      $('#qty-error').hidden = true;
      addToCart(p.id, sel || '', q);
      if (window.openDrawer) window.openDrawer(from);
    }
    $('#add-button').addEventListener('click', function () { doAdd($('#add-button')); });
    /* sticky add-to-bag bar (appears on small screens when the main button scrolls away) */
    var bar = $('#sticky-atb'), stickyBtn = $('#sticky-add');
    function syncSticky() { $('#sticky-name').textContent = p.name + (sel ? ' - ' + sel : ''); $('#sticky-price').textContent = money(unitPrice(p, sel)); }
    syncSticky();
    stickyBtn.addEventListener('click', function () { doAdd(stickyBtn); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { bar.hidden = en[0].isIntersecting || en[0].boundingClientRect.top > 0; }).observe($('#add-button'));
    }
    var rel = PRODUCTS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 4);
    renderCards($('#related-grid'), rel);
  }

  /* ---------- gift guide ---------- */
  function initGift() {
    $$('[data-gift-ids]').forEach(function (el) {
      var list = el.getAttribute('data-gift-ids').split(',').map(function (i) { return BY_ID[i.trim()]; }).filter(Boolean);
      renderCards(el, list);
    });
  }

  /* ---------- home ---------- */
  function initHome() {
    var track = $('#bestseller-track'); if (!track) return;
    renderCards(track, PRODUCTS.filter(function (p) { return p.bs; }));
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function step(dir) { track.scrollBy({ left: dir * Math.max(240, track.clientWidth * 0.8), behavior: reduce ? 'auto' : 'smooth' }); }
    $('#carousel-prev').addEventListener('click', function () { step(-1); });
    $('#carousel-next').addEventListener('click', function () { step(1); });
  }

  /* ---------- generic form validation ---------- */
  function validateForm(form, rules, summary) {
    var errors = [];
    rules.forEach(function (r) {
      var el = form.elements[r.name], msgEl = document.getElementById(r.name + '-error'), msg = '';
      var val = el.type === 'checkbox' ? el.checked : (el.value || '').trim();
      if (r.required && !val) msg = r.required;
      else if (val && r.test && !r.test(val)) msg = r.msg;
      var describedBase = (el.getAttribute('data-hint-id') || '');
      if (msg) {
        errors.push({ name: r.name, msg: msg });
        msgEl.textContent = msg; msgEl.hidden = false; el.setAttribute('aria-invalid', 'true');
        el.setAttribute('aria-describedby', (describedBase + ' ' + msgEl.id).trim());
      } else {
        msgEl.textContent = ''; msgEl.hidden = true; el.removeAttribute('aria-invalid');
        if (describedBase) el.setAttribute('aria-describedby', describedBase); else el.removeAttribute('aria-describedby');
      }
    });
    var list = $('ul', summary);
    if (errors.length) {
      list.innerHTML = errors.map(function (e) { return '<li><a href="#' + e.name + '" data-focus-field="' + e.name + '">' + esc(e.msg) + '</a></li>'; }).join('');
      summary.hidden = false; summary.focus();
      announce(errors.length + (errors.length === 1 ? ' error' : ' errors') + ' found. Review the error summary.');
    } else { summary.hidden = true; list.innerHTML = ''; }
    return errors.length === 0;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('[data-focus-field]') : null;
    if (a) { e.preventDefault(); var f = document.getElementById(a.getAttribute('data-focus-field')); if (f) f.focus(); }
  });
  var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

  /* ---------- checkout (simulation: no payment data is collected) ---------- */
  function initCheckout() {
    var form = $('#checkout-form'); if (!form) return;
    var summary = $('#error-summary');
    var rules = [
      { name: 'email', required: 'Enter an email address.', test: emailOk, msg: 'Enter an email address like name@example.test.' },
      { name: 'fullname', required: 'Enter the full name for delivery.' },
      { name: 'address1', required: 'Enter a street address.' },
      { name: 'city', required: 'Enter a city.' },
      { name: 'region', required: 'Enter a state or region.' },
      { name: 'postal', required: 'Enter a postal code.', test: function (v) { return /^[A-Za-z0-9 -]{3,10}$/.test(v); }, msg: 'Postal code should be 3 to 10 letters, numbers, spaces or hyphens.' },
      { name: 'phone', test: function (v) { return v.replace(/\D/g, '').length >= 7; }, msg: 'Phone number should have at least 7 digits (or leave it blank).' },
      { name: 'demo-ack', required: 'Tick the box to confirm you understand this is a demonstration.' }
    ];
    function guard() {
      var empty = cartCount(loadCart()) === 0;
      $('#checkout-empty').hidden = !empty; form.hidden = empty; $('#checkout-aside').hidden = empty;
    }
    guard();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form, rules, summary)) return;
      var c = loadCart(), ship = form.elements['shipping'].value;
      var snap = { items: c.map(function (l) { return { label: lineLabel(l), qty: l.qty, total: unitPrice(BY_ID[l.id], l.v) * l.qty }; }), subtotal: cartTotal(c), shipping: ship };
      sSet('pebblebloom.demo.summary', JSON.stringify(snap));
      saveCart([]);
      location.href = 'confirmation.html';
    });
  }

  function initConfirmation() {
    var box = $('#confirm-items'); if (!box) return;
    var raw = sGet('pebblebloom.demo.summary'), snap = null;
    try { snap = raw ? JSON.parse(raw) : null; } catch (e) { snap = null; }
    if (!snap) { box.innerHTML = '<p>No demo checkout was completed in this browser session, so there is nothing to summarize. No order exists either way.</p>'; return; }
    box.innerHTML = '<ul class="plain-list">' + snap.items.map(function (i) { return '<li>' + i.qty + ' x ' + esc(i.label) + ' <span class="muted">(' + money(i.total) + ')</span></li>'; }).join('') + '</ul>' +
      '<p>Sample subtotal: ' + money(snap.subtotal) + '. Delivery option you picked: ' + esc(snap.shipping === 'express' ? 'Express (demo)' : 'Standard (demo)') + '.</p>';
    sDel('pebblebloom.demo.summary');
  }

  /* ---------- account sign-in (demo) ---------- */
  function initAccount() {
    var form = $('#signin-form'); if (!form) return;
    var summary = $('#error-summary');
    var rules = [
      { name: 'acct-email', required: 'Enter your email address.', test: emailOk, msg: 'Enter an email address like name@example.test.' },
      { name: 'acct-password', required: 'Enter a password (any made-up text; it is not checked or stored).' }
    ];
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = validateForm(form, rules, summary), res = $('#signin-result');
      if (!ok) { res.hidden = true; return; }
      form.reset(); res.hidden = false; res.focus();
      announce('Demo only. Nothing was checked and nobody was signed in.');
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    live = $('#live-status');
    initHeader(); renderCartUI(); initHome(); initListing(); initSearch(); initProduct(); initGift(); initCheckout(); initConfirmation(); initAccount();
  });
})();
