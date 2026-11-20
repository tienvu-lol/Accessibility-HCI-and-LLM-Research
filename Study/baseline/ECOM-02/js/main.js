/* Larkwood Home (fictional) - ECOM-02 replica. Vanilla JS, no network, all data inline.
   Everything here is SAMPLE DATA for an accessibility research dataset. Nothing can be bought. */
(function () {
  'use strict';

  /* ---------- utilities ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function params() { try { return new URLSearchParams(window.location.search); } catch (e) { return { get: function () { return null; } }; } }

  /* storage: every access wrapped; falls back to memory */
  var mem = {};
  var store = {
    get: function (k) { try { var v = window.sessionStorage.getItem(k); return v === null ? (mem[k] || null) : v; } catch (e) { return mem[k] || null; } },
    set: function (k, v) { mem[k] = v; try { window.sessionStorage.setItem(k, v); } catch (e) { /* storage unavailable: memory only */ } },
    remove: function (k) { delete mem[k]; try { window.sessionStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };

  /* polite live region (lives in the header on every page) */
  var liveTimer = null;
  function announce(msg) {
    var r = $('#live-polite');
    if (!r) { return; }
    r.textContent = '';
    window.clearTimeout(liveTimer);
    liveTimer = window.setTimeout(function () { r.textContent = msg; }, 60);
  }

  /* ---------- sample data ---------- */
  var FIN = {
    fabric: [['Oat', '#d8cdb8'], ['Slate grey', '#5f6b73'], ['Moss green', '#5d7a55'], ['Clay', '#b4694b']],
    wood: [['Natural oak', '#c9a46b'], ['Walnut', '#6b4a32'], ['White ash', '#ece6da'], ['Black stain', '#2b2b2b']],
    metal: [['Brushed brass', '#b79a4a'], ['Matte black', '#2a2a2a'], ['Chalk white', '#f1efe8'], ['Sage', '#8fa58c']]
  };
  var SIZES = {
    'Sofas': [['2-seat', 0], ['3-seat', 220]],
    'Armchairs': [['Standard', 0], ['Wide', 60]],
    'Table lamps': [['Small', 0], ['Large', 30]],
    'Floor lamps': [['Standard', 0]],
    'Pendant lights': [['Small shade', 0], ['Large shade', 35]],
    'Wall lights': [['Standard', 0]],
    'Bed frames': [['Twin', 0], ['Full', 80], ['Queen', 160]],
    'Headboards': [['Full', 0], ['Queen', 40]],
    'Bedside tables': [['Standard', 0]],
    'Desks': [['Standard', 0], ['Wide', 70]],
    'Bookcases': [['Standard', 0]],
    'Office chairs': [['Standard', 0]]
  };
  var SHAPE = { 'Sofas': 'sofa', 'Armchairs': 'chair', 'Table lamps': 'tlamp', 'Floor lamps': 'flamp', 'Pendant lights': 'pend', 'Wall lights': 'wall', 'Bed frames': 'bed', 'Headboards': 'head', 'Bedside tables': 'side', 'Desks': 'desk', 'Bookcases': 'shelf', 'Office chairs': 'chair' };
  var CATLABEL = { sofas: 'Sofas & armchairs', lighting: 'Lighting', beds: 'Beds & bedroom', desks: 'Desks & storage' };
  var CATPAGE = { sofas: 'sofas.html', lighting: 'lighting.html', beds: 'beds.html', desks: 'search.html?q=desk' };

  /* id, name, cat, type, price, material, style, w, d, h, finish set, isNew, rooms, wasPrice */
  var RAW = [
    ['s01', 'Pellam sofa', 'sofas', 'Sofas', 749, 'Woven polyester, pine frame', 'Modern', 84, 36, 33, 'fabric', 0, 'living', 899],
    ['s02', 'Dunmore sofa', 'sofas', 'Sofas', 1099, 'Linen blend, beech frame', 'Classic', 88, 38, 34, 'fabric', 1, 'living', 0],
    ['s03', 'Quillon sofa', 'sofas', 'Sofas', 649, 'Cotton blend, birch frame', 'Compact', 72, 33, 32, 'fabric', 0, 'living', 0],
    ['s04', 'Ashcombe sofa', 'sofas', 'Sofas', 1349, 'Boucle fabric, oak frame', 'Rounded', 90, 39, 31, 'fabric', 1, 'living', 0],
    ['s05', 'Torvane sofa', 'sofas', 'Sofas', 899, 'Woven polyester, pine frame', 'Modern', 86, 37, 32, 'fabric', 0, 'living', 0],
    ['s06', 'Rivelle sofa', 'sofas', 'Sofas', 1199, 'Velvet-look polyester, ash frame', 'Classic', 82, 36, 34, 'fabric', 0, 'living', 1399],
    ['s07', 'Merrin sofa', 'sofas', 'Sofas', 549, 'Cotton blend, pine frame', 'Compact', 68, 32, 31, 'fabric', 0, 'living', 0],
    ['s08', 'Hollis armchair', 'sofas', 'Armchairs', 349, 'Woven polyester, birch frame', 'Modern', 29, 31, 32, 'fabric', 0, 'living', 0],
    ['s09', 'Brannoch armchair', 'sofas', 'Armchairs', 429, 'Boucle fabric, oak frame', 'Rounded', 31, 32, 30, 'fabric', 1, 'living', 0],
    ['s10', 'Wexley armchair', 'sofas', 'Armchairs', 299, 'Cotton blend, pine frame', 'Classic', 28, 30, 33, 'fabric', 0, 'living', 369],
    ['s11', 'Isolde armchair', 'sofas', 'Armchairs', 519, 'Linen blend, ash frame', 'Classic', 30, 33, 34, 'fabric', 0, 'living', 0],
    ['s12', 'Cobb armchair', 'sofas', 'Armchairs', 389, 'Woven polyester, beech frame', 'Compact', 27, 29, 31, 'fabric', 0, 'living', 0],

    ['l01', 'Orrin table lamp', 'lighting', 'Table lamps', 49, 'Painted steel, linen shade', 'Modern', 10, 10, 18, 'metal', 0, 'living,office', 0],
    ['l02', 'Selby table lamp', 'lighting', 'Table lamps', 69, 'Ceramic base, cotton shade', 'Classic', 12, 12, 20, 'metal', 1, 'living,bedroom', 0],
    ['l03', 'Tavish table lamp', 'lighting', 'Table lamps', 39, 'Painted steel, paper shade', 'Compact', 8, 8, 15, 'metal', 0, 'bedroom,office', 0],
    ['l04', 'Wren table lamp', 'lighting', 'Table lamps', 89, 'Solid oak, linen shade', 'Modern', 11, 11, 22, 'wood', 0, 'living', 109],
    ['l05', 'Kestrel floor lamp', 'lighting', 'Floor lamps', 129, 'Powder-coated steel', 'Modern', 14, 14, 62, 'metal', 0, 'living', 0],
    ['l06', 'Marrow floor lamp', 'lighting', 'Floor lamps', 159, 'Steel, linen shade', 'Classic', 16, 16, 60, 'metal', 1, 'living,bedroom', 0],
    ['l07', 'Aldous floor lamp', 'lighting', 'Floor lamps', 99, 'Painted steel, paper shade', 'Compact', 12, 12, 58, 'metal', 0, 'office', 0],
    ['l08', 'Fennick pendant light', 'lighting', 'Pendant lights', 79, 'Woven bamboo shade', 'Rounded', 18, 18, 14, 'wood', 0, 'living', 0],
    ['l09', 'Dorrel pendant light', 'lighting', 'Pendant lights', 119, 'Spun aluminium shade', 'Modern', 16, 16, 12, 'metal', 0, 'office', 149],
    ['l10', 'Yarrow pendant light', 'lighting', 'Pendant lights', 59, 'Cotton shade, steel fitting', 'Compact', 14, 14, 11, 'metal', 0, 'bedroom', 0],
    ['l11', 'Calder wall light', 'lighting', 'Wall lights', 45, 'Painted steel', 'Modern', 6, 8, 9, 'metal', 0, 'bedroom', 0],
    ['l12', 'Nessa wall light', 'lighting', 'Wall lights', 65, 'Brushed steel, glass shade', 'Classic', 7, 9, 10, 'metal', 1, 'living', 0],

    ['b01', 'Harrow bed frame', 'beds', 'Bed frames', 399, 'Solid pine', 'Classic', 82, 62, 36, 'wood', 0, 'bedroom', 0],
    ['b02', 'Eskdale bed frame', 'beds', 'Bed frames', 549, 'Oak veneer', 'Modern', 84, 64, 34, 'wood', 1, 'bedroom', 0],
    ['b03', 'Thornby bed frame', 'beds', 'Bed frames', 699, 'Upholstered polyester, birch', 'Rounded', 86, 66, 40, 'fabric', 0, 'bedroom', 849],
    ['b04', 'Westerly bed frame', 'beds', 'Bed frames', 329, 'Powder-coated steel', 'Compact', 80, 60, 30, 'metal', 0, 'bedroom', 0],
    ['b05', 'Ormond bed frame', 'beds', 'Bed frames', 799, 'Solid ash', 'Classic', 85, 65, 38, 'wood', 0, 'bedroom', 0],
    ['b06', 'Vesper bed frame', 'beds', 'Bed frames', 629, 'Linen blend, pine slats', 'Modern', 84, 63, 35, 'fabric', 1, 'bedroom', 0],
    ['b07', 'Cairn headboard', 'beds', 'Headboards', 179, 'Upholstered cotton blend', 'Classic', 64, 4, 30, 'fabric', 0, 'bedroom', 0],
    ['b08', 'Ebb headboard', 'beds', 'Headboards', 149, 'Solid pine', 'Modern', 62, 3, 28, 'wood', 0, 'bedroom', 0],
    ['b09', 'Pim bedside table', 'beds', 'Bedside tables', 69, 'Pine veneer', 'Compact', 16, 14, 22, 'wood', 0, 'bedroom', 0],
    ['b10', 'Lark bedside table', 'beds', 'Bedside tables', 99, 'Solid oak', 'Modern', 18, 15, 24, 'wood', 0, 'bedroom', 119],
    ['b11', 'Tolly bedside table', 'beds', 'Bedside tables', 79, 'Painted steel, ash top', 'Rounded', 15, 15, 23, 'metal', 1, 'bedroom', 0],
    ['b12', 'Reed bedside table', 'beds', 'Bedside tables', 119, 'Walnut veneer', 'Classic', 17, 14, 25, 'wood', 0, 'bedroom', 0],

    ['d01', 'Mabry desk', 'desks', 'Desks', 249, 'Birch veneer', 'Compact', 47, 24, 29, 'wood', 0, 'office', 0],
    ['d02', 'Colden desk', 'desks', 'Desks', 399, 'Solid oak', 'Classic', 55, 27, 30, 'wood', 1, 'office', 0],
    ['d03', 'Ridley standing desk frame', 'desks', 'Desks', 459, 'Steel frame, ash top', 'Modern', 60, 28, 40, 'metal', 0, 'office', 529],
    ['d04', 'Sorrel desk', 'desks', 'Desks', 299, 'Pine veneer', 'Modern', 50, 25, 29, 'wood', 0, 'office', 0],
    ['d05', 'Tamar bookcase', 'desks', 'Bookcases', 189, 'Pine veneer', 'Classic', 31, 12, 72, 'wood', 0, 'office,living', 0],
    ['d06', 'Quill bookcase', 'desks', 'Bookcases', 229, 'Steel, oak shelves', 'Modern', 35, 13, 75, 'metal', 0, 'office,living', 0],
    ['d07', 'Gable office chair', 'desks', 'Office chairs', 169, 'Mesh polyester, steel base', 'Modern', 24, 24, 38, 'fabric', 0, 'office', 0],
    ['d08', 'Fenwick office chair', 'desks', 'Office chairs', 219, 'Cotton blend, beech base', 'Classic', 25, 25, 37, 'fabric', 1, 'office', 0]
  ];
  var PRODUCTS = RAW.map(function (r) {
    return { id: r[0], name: r[1], cat: r[2], type: r[3], price: r[4], material: r[5], style: r[6], w: r[7], d: r[8], h: r[9], finishes: FIN[r[10]], isNew: !!r[11], rooms: r[12].split(','), was: r[13], sizes: SIZES[r[3]] };
  });
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].id === id) { return PRODUCTS[i]; } } return null; }
  function singular(t) { return t.toLowerCase().replace(/ies$/, 'y').replace(/ses$/, 's').replace(/s$/, ''); }

  var STORES = [
    { name: 'Larkwood Fairmeadow', street: '100 Sample Row', city: 'Fairmeadow', state: 'OH', zip: '40001', phone: '(555) 555-0101', services: 'Showroom, sample pickup point' },
    { name: 'Larkwood Brindlecross', street: '22 Placeholder Way', city: 'Brindlecross', state: 'OH', zip: '40012', phone: '(555) 555-0102', services: 'Showroom' },
    { name: 'Larkwood Oldmere', street: '7 Example Park', city: 'Oldmere', state: 'PA', zip: '50017', phone: '(555) 555-0103', services: 'Showroom, sample pickup point' },
    { name: 'Larkwood Stonebridge', street: '301 Demo Boulevard', city: 'Stonebridge', state: 'PA', zip: '50044', phone: '(555) 555-0104', services: 'Showroom' },
    { name: 'Larkwood Quarry Hill', street: '58 Fictional Court', city: 'Quarry Hill', state: 'VA', zip: '60021', phone: '(555) 555-0105', services: 'Showroom, sample pickup point' },
    { name: 'Larkwood Wexford Green', street: '9 Invented Lane', city: 'Wexford Green', state: 'VA', zip: '60059', phone: '(555) 555-0106', services: 'Showroom' },
    { name: 'Larkwood Hartsong', street: '470 Sample Avenue', city: 'Hartsong', state: 'TX', zip: '70033', phone: '(555) 555-0107', services: 'Showroom, sample pickup point' },
    { name: 'Larkwood Dunlin Bay', street: '15 Make-Believe Drive', city: 'Dunlin Bay', state: 'WA', zip: '80015', phone: '(555) 555-0108', services: 'Showroom' }
  ];

  /* ---------- placeholder product art (abstract furniture silhouettes, no people) ---------- */
  function art(type, hex) {
    var s = SHAPE[type] || 'sofa', f = 'fill="' + hex + '" stroke="#26343a" stroke-width="3" stroke-linejoin="round"', g = '';
    var m = {
      sofa: '<rect x="30" y="70" width="180" height="55" rx="10" ' + f + '/><rect x="40" y="48" width="160" height="32" rx="10" ' + f + '/><rect x="22" y="78" width="26" height="50" rx="8" ' + f + '/><rect x="192" y="78" width="26" height="50" rx="8" ' + f + '/><path d="M44 132v10M196 132v10" stroke="#26343a" stroke-width="5"/>',
      chair: '<rect x="75" y="42" width="90" height="55" rx="12" ' + f + '/><rect x="62" y="86" width="116" height="40" rx="10" ' + f + '/><path d="M78 128v18M162 128v18" stroke="#26343a" stroke-width="5"/>',
      tlamp: '<path d="M92 40h56l14 52H78z" ' + f + '/><path d="M120 92v38" stroke="#26343a" stroke-width="5"/><ellipse cx="120" cy="136" rx="30" ry="8" ' + f + '/>',
      flamp: '<path d="M100 22h40l10 36H90z" ' + f + '/><path d="M120 58v92" stroke="#26343a" stroke-width="5"/><ellipse cx="120" cy="154" rx="30" ry="7" ' + f + '/>',
      pend: '<path d="M120 10v46" stroke="#26343a" stroke-width="4"/><path d="M70 100a50 44 0 0 1 100 0z" ' + f + '/><path d="M96 110h48" stroke="#26343a" stroke-width="3"/>',
      wall: '<rect x="40" y="60" width="14" height="50" rx="3" ' + f + '/><path d="M54 85h46" stroke="#26343a" stroke-width="5"/><path d="M96 56h60l-10 52h-40z" ' + f + '/>',
      bed: '<rect x="28" y="52" width="14" height="82" rx="3" ' + f + '/><rect x="42" y="92" width="170" height="26" rx="4" ' + f + '/><rect x="198" y="80" width="14" height="54" rx="3" ' + f + '/><rect x="50" y="70" width="60" height="24" rx="8" fill="#ffffff" stroke="#26343a" stroke-width="3"/>',
      head: '<rect x="40" y="44" width="160" height="80" rx="12" ' + f + '/><path d="M70 62v44M110 62v44M150 62v44" stroke="#26343a" stroke-width="2" stroke-opacity=".5"/>',
      side: '<rect x="68" y="62" width="104" height="14" rx="3" ' + f + '/><rect x="76" y="76" width="88" height="46" ' + f + '/><circle cx="120" cy="99" r="4" fill="#26343a"/><path d="M80 122v22M160 122v22" stroke="#26343a" stroke-width="5"/>',
      desk: '<rect x="28" y="62" width="184" height="14" rx="3" ' + f + '/><path d="M44 76v70M196 76v70" stroke="#26343a" stroke-width="6"/><rect x="140" y="76" width="50" height="40" ' + f + '/>',
      shelf: '<rect x="70" y="14" width="100" height="136" ' + f + '/><path d="M70 48h100M70 82h100M70 116h100" stroke="#26343a" stroke-width="3"/>'
    };
    g = m[s];
    return '<svg viewBox="0 0 240 170" role="presentation" focusable="false" aria-hidden="true"><rect width="240" height="170" fill="#efe9df"/>' + g + '</svg>';
  }

  /* ---------- cart ---------- */
  var CART_KEY = 'larkwood-demo-cart';
  var DELIVERY_FEE = 39;
  function loadCart() {
    var raw = store.get(CART_KEY), out = [];
    if (!raw) { return out; }
    try { var a = JSON.parse(raw); if (Array.isArray(a)) { a.forEach(function (l) { if (l && byId(l.id) && l.qty > 0) { out.push({ id: l.id, finish: String(l.finish), size: String(l.size), qty: Math.min(10, Math.max(1, parseInt(l.qty, 10) || 1)) }); } }); } } catch (e) { /* corrupt: start empty */ }
    return out;
  }
  function saveCart(c) { store.set(CART_KEY, JSON.stringify(c)); updateBadge(c); }
  function unitPrice(line) { var p = byId(line.id), add = 0; (p.sizes || []).forEach(function (s) { if (s[0] === line.size) { add = s[1]; } }); return p.price + add; }
  function cartCount(c) { return c.reduce(function (n, l) { return n + l.qty; }, 0); }
  function subtotal(c) { return c.reduce(function (n, l) { return n + unitPrice(l) * l.qty; }, 0); }
  function updateBadge(c) { var n = cartCount(c || loadCart()); $$('[data-cart-count]').forEach(function (e) { e.textContent = n; }); }

  /* ---------- header: menus ---------- */
  function initHeader() {
    updateBadge();
    var toggle = $('.menu-toggle'), wrap = $('#site-nav');
    var trigger = $('.mega-trigger'), panel = $('#mega-panel');
    var depts = $$('.dept-btn');

    function closeDepts(except) {
      depts.forEach(function (b) {
        if (b === except) { return; }
        b.setAttribute('aria-expanded', 'false');
        var p = document.getElementById(b.getAttribute('aria-controls')); if (p) { p.hidden = true; }
      });
    }
    function openMega() { panel.hidden = false; trigger.setAttribute('aria-expanded', 'true'); }
    function closeMega() { panel.hidden = true; trigger.setAttribute('aria-expanded', 'false'); closeDepts(null); }
    if (trigger && panel) {
      trigger.addEventListener('click', function () { if (panel.hidden) { openMega(); } else { closeMega(); } });
      depts.forEach(function (b) {
        b.addEventListener('click', function () {
          var open = b.getAttribute('aria-expanded') === 'true', p = document.getElementById(b.getAttribute('aria-controls'));
          closeDepts(b);
          b.setAttribute('aria-expanded', open ? 'false' : 'true');
          p.hidden = open;
        });
      });
    }
    if (toggle && wrap) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
        wrap.classList.toggle('is-open', !open);
        if (open && panel) { closeMega(); }
      });
    }
    /* Escape: innermost level first (department -> mega menu -> mobile menu) */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      var openDept = depts.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
      if (openDept) { closeDepts(null); openDept.focus(); e.preventDefault(); return; }
      if (panel && !panel.hidden) { closeMega(); trigger.focus(); e.preventDefault(); return; }
      if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false'); wrap.classList.remove('is-open'); toggle.focus(); e.preventDefault();
      }
    });
    /* close the mega menu when focus or a click lands outside it */
    document.addEventListener('focusin', function (e) { if (panel && !panel.hidden && !e.target.closest('.mega-wrap')) { closeMega(); } });
    document.addEventListener('click', function (e) { if (panel && !panel.hidden && !e.target.closest('.mega-wrap')) { closeMega(); } });
    /* prefill header search */
    var q = params().get('q'), inp = $('#q');
    if (inp && q && document.body.getAttribute('data-page') === 'search') { inp.value = q; }
  }

  /* ---------- product cards ---------- */
  function cardHtml(p, headingLevel) {
    var h = headingLevel || 3, names = p.finishes.map(function (f) { return f[0]; });
    var price = p.was ? '<span class="price-now">' + money(p.price) + '</span> <span class="price-was">Sample price was <s>' + money(p.was) + '</s></span>' : '<span class="price-now">' + money(p.price) + '</span>';
    return '<li class="card" data-component="product-card" data-product-id="' + p.id + '"><div class="card-media">' + art(p.type, p.finishes[0][1]) + '</div><div class="card-body">' +
      (p.isNew ? '<p class="badge">New</p>' : '') +
      '<h' + h + ' class="card-title"><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h' + h + '>' +
      '<p class="card-meta">' + esc(p.type) + ' &middot; ' + esc(p.material) + '</p>' +
      '<p class="card-price">' + price + '</p>' +
      '<p class="card-meta">' + names.length + ' finishes: ' + esc(names.join(', ')) + '</p></div></li>';
  }
  function fillCards() {
    $$('[data-fill]').forEach(function (box) {
      var kind = box.getAttribute('data-fill'), list;
      if (kind === 'deals') { list = PRODUCTS.filter(function (p) { return p.was; }).slice(0, 4); }
      else if (kind === 'new') { list = PRODUCTS.filter(function (p) { return p.isNew; }).slice(0, parseInt(box.getAttribute('data-limit') || '4', 10)); }
      else if (kind === 'newall') { list = PRODUCTS.filter(function (p) { return p.isNew; }); }
      else if (kind === 'featured') { list = ['s01', 'b02', 'd02', 'l06'].map(byId); }
      else if (kind.indexOf('room:') === 0) { var r = kind.slice(5); list = PRODUCTS.filter(function (p) { return p.rooms.indexOf(r) > -1; }).slice(0, 6); }
      else { list = []; }
      box.innerHTML = list.map(function (p) { return cardHtml(p, parseInt(box.getAttribute('data-h') || '3', 10)); }).join('');
    });
  }

  /* ---------- listing pages: filters, sort, show more ---------- */
  function initListing() {
    var root = $('#listing'); if (!root) { return; }
    var cat = root.getAttribute('data-cat'), all = PRODUCTS.filter(function (p) { return p.cat === cat; });
    var form = $('#filter-form'), grid = $('#results-grid'), count = $('#result-count'), sortSel = $('#sort'), empty = $('#empty-state'), more = $('#show-more'), clearBtns = $$('.clear-filters');
    var PAGE = 8, shown = PAGE;
    var types = [], finishes = [];
    all.forEach(function (p) { if (types.indexOf(p.type) < 0) { types.push(p.type); } p.finishes.forEach(function (f) { if (finishes.indexOf(f[0]) < 0) { finishes.push(f[0]); } }); });
    var BRACKETS = [['any', 'Any price', 0, 1e9], ['u100', 'Under $100', 0, 99.99], ['100', '$100 to $299', 100, 299.99], ['300', '$300 to $699', 300, 699.99], ['700', '$700 and over', 700, 1e9]];
    var tmpl = '<fieldset class="fgroup" data-component="filter-group"><legend>Product type</legend>' + types.map(function (t, i) { return '<label class="check"><input type="checkbox" name="type" value="' + esc(t) + '"> ' + esc(t) + '</label>'; }).join('') + '</fieldset>' +
      '<fieldset class="fgroup" data-component="filter-group"><legend>Colour or finish</legend>' + finishes.map(function (t) { return '<label class="check"><input type="checkbox" name="finish" value="' + esc(t) + '"> ' + esc(t) + '</label>'; }).join('') + '</fieldset>' +
      '<fieldset class="fgroup" data-component="filter-group"><legend>Price</legend>' + BRACKETS.map(function (b, i) { return '<label class="check"><input type="radio" name="price" value="' + b[0] + '"' + (i === 0 ? ' checked' : '') + '> ' + b[1] + '</label>'; }).join('') + '</fieldset>' +
      '<fieldset class="fgroup" data-component="filter-group"><legend>Other</legend><label class="check"><input type="checkbox" name="isnew" value="1"> New designs only</label></fieldset>';
    $('#filter-fields').innerHTML = tmpl;

    var want = params().get('type');
    if (want) { $$('input[name=type]', form).forEach(function (i) { if (i.value.toLowerCase() === want.toLowerCase()) { i.checked = true; } }); }

    function state() {
      var t = $$('input[name=type]:checked', form).map(function (i) { return i.value; }),
        f = $$('input[name=finish]:checked', form).map(function (i) { return i.value; }),
        pr = $('input[name=price]:checked', form).value, nw = $('input[name=isnew]', form).checked;
      return { t: t, f: f, pr: BRACKETS.filter(function (b) { return b[0] === pr; })[0], nw: nw };
    }
    function active() { var s = state(); return s.t.length + s.f.length + (s.pr[0] !== 'any' ? 1 : 0) + (s.nw ? 1 : 0); }
    function apply(resetShown, announceIt) {
      if (resetShown) { shown = PAGE; }
      var s = state();
      var list = all.filter(function (p) {
        if (s.t.length && s.t.indexOf(p.type) < 0) { return false; }
        if (s.f.length && !p.finishes.some(function (x) { return s.f.indexOf(x[0]) > -1; })) { return false; }
        if (p.price < s.pr[2] || p.price > s.pr[3]) { return false; }
        if (s.nw && !p.isNew) { return false; }
        return true;
      });
      var k = sortSel.value;
      list.sort(function (a, b) {
        if (k === 'price-asc') { return a.price - b.price; }
        if (k === 'price-desc') { return b.price - a.price; }
        if (k === 'name') { return a.name.localeCompare(b.name); }
        if (k === 'new') { return (b.isNew - a.isNew) || a.name.localeCompare(b.name); }
        return all.indexOf(a) - all.indexOf(b);
      });
      var vis = list.slice(0, shown);
      grid.innerHTML = vis.map(function (p) { return cardHtml(p, 3); }).join('');
      var msg = list.length + (list.length === 1 ? ' product' : ' products') + (active() ? ' match your filters' : ' in this category') + (list.length > vis.length ? ' (showing ' + vis.length + ')' : '');
      count.textContent = msg;
      empty.hidden = list.length > 0;
      more.hidden = list.length <= vis.length;
      more.textContent = 'Show more (' + (list.length - vis.length) + ' remaining)';
      clearBtns.forEach(function (b) { b.hidden = active() === 0; });
      var sum = $('#filter-count'); if (sum) { sum.textContent = active() ? ' (' + active() + ' active)' : ''; }
      if (announceIt) { announce(msg); }
      return list.length;
    }
    form.addEventListener('change', function () { apply(true, true); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    sortSel.addEventListener('change', function () { apply(true, true); announce('Sorted: ' + sortSel.options[sortSel.selectedIndex].text); });
    clearBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        form.reset();
        $$('input[name=price]', form)[0].checked = true;
        apply(true, true);
        var h = $('#results-heading'); if (h) { h.focus(); }
      });
    });
    more.addEventListener('click', function () {
      var before = shown; shown += PAGE;
      apply(false, false);
      var cards = $$('.card a', grid), target = cards[before];
      if (target) { target.focus(); }
      announce('Showing ' + Math.min(shown, grid.children.length) + ' products');
    });
    var ft = $('#filter-toggle'), fp = $('#filter-panel');
    if (ft) { ft.addEventListener('click', function () { var o = ft.getAttribute('aria-expanded') === 'true'; ft.setAttribute('aria-expanded', o ? 'false' : 'true'); fp.classList.toggle('is-open', !o); }); }
    apply(true, false);
  }

  /* ---------- search ---------- */
  function initSearch() {
    var root = $('#search-root'); if (!root) { return; }
    var q = (params().get('q') || '').trim(), status = $('#search-status'), grid = $('#search-grid'), empty = $('#search-empty'), sortSel = $('#search-sort');
    function hay(p) { return [p.name, p.type, p.material, p.style, p.cat, CATLABEL[p.cat], p.rooms.join(' '), p.finishes.map(function (f) { return f[0]; }).join(' ')].join(' ').toLowerCase(); }
    function run() {
      if (!q) { status.textContent = 'Type a word such as desk, lamp, sofa or oak into the search box.'; grid.innerHTML = ''; empty.hidden = true; $('#search-controls').hidden = true; return; }
      var toks = q.toLowerCase().split(/\s+/).filter(Boolean).map(function (t) { return t.length > 3 ? t.replace(/s$/, '') : t; });
      var list = PRODUCTS.filter(function (p) { var h = hay(p); return toks.every(function (t) { return h.indexOf(t) > -1; }); });
      var k = sortSel.value;
      list.sort(function (a, b) { if (k === 'price-asc') { return a.price - b.price; } if (k === 'price-desc') { return b.price - a.price; } if (k === 'name') { return a.name.localeCompare(b.name); } return 0; });
      grid.innerHTML = list.map(function (p) { return cardHtml(p, 2); }).join('');
      $('#search-controls').hidden = list.length === 0;
      empty.hidden = list.length > 0;
      var msg = list.length + (list.length === 1 ? ' result' : ' results') + ' for “' + q + '”';
      status.textContent = msg;
      $('#search-term').textContent = q;
      return msg;
    }
    sortSel.addEventListener('change', function () { run(); announce('Sorted: ' + sortSel.options[sortSel.selectedIndex].text); });
    var m = run(); if (m) { announce(m); }
  }

  /* ---------- product detail ---------- */
  function initProduct() {
    var root = $('#product-root'); if (!root) { return; }
    var id = params().get('id'), p = byId(id || 's01');
    if (id && !p) {
      $('#product-title').textContent = 'Product not found';
      root.innerHTML = '<div class="empty" data-component="empty-state"><p>We could not find a product with that code in this sample catalogue.</p><p><a class="btn" href="search.html">Search products</a> <a class="btn btn-secondary" href="index.html">Back to home</a></p></div>';
      $('#bc-current').textContent = 'Not found'; document.title = 'Product not found - Larkwood Home (demo)';
      return;
    }
    document.title = p.name + ' - Larkwood Home (demo)';
    $('#product-title').textContent = p.name;
    var bc = $('#bc-cat'); bc.textContent = CATLABEL[p.cat]; bc.setAttribute('href', CATPAGE[p.cat]);
    $('#bc-current').textContent = p.name;
    var cur = { finish: p.finishes[0][0], size: p.sizes[0][0] };
    var sizeHtml = p.sizes.length > 1 ?
      '<div class="field"><label for="size">Size</label><select id="size" name="size">' + p.sizes.map(function (s) { return '<option value="' + esc(s[0]) + '">' + esc(s[0]) + (s[1] ? ' (+' + money(s[1]) + ')' : '') + '</option>'; }).join('') + '</select></div>' :
      '<p class="plain">Size: ' + esc(p.sizes[0][0]) + ' (only option)</p>';
    root.innerHTML =
      '<div class="pdp-media" data-component="product-gallery" id="pdp-art">' + art(p.type, p.finishes[0][1]) + '</div>' +
      '<div class="pdp-buy" data-section="product-purchase" data-component="product-purchase">' +
      '<p class="card-meta">' + esc(p.type) + ' &middot; ' + esc(p.style) + (p.isNew ? ' &middot; <span class="badge-inline">New</span>' : '') + '</p>' +
      '<p class="pdp-price" aria-live="off"><span id="pdp-price"></span>' + (p.was ? ' <span class="price-was">Sample price was <s>' + money(p.was) + '</s></span>' : '') + '</p>' +
      '<p class="note">Sample data: invented product and illustrative price. It cannot be purchased.</p>' +
      '<form id="buy-form" novalidate>' +
      '<fieldset class="variant" data-component="variant-selector"><legend>Colour or finish: <span id="finish-name">' + esc(cur.finish) + '</span></legend><div class="swatches">' +
      p.finishes.map(function (f, i) { return '<label class="swatch"><input type="radio" name="finish" value="' + esc(f[0]) + '"' + (i === 0 ? ' checked' : '') + '><span class="chip" style="background:' + f[1] + '" aria-hidden="true"></span><span class="swatch-text">' + esc(f[0]) + '</span></label>'; }).join('') +
      '</div></fieldset>' + sizeHtml +
      '<div class="field"><label for="qty">Quantity (1 to 10)</label><div class="stepper" data-component="quantity-stepper"><button type="button" id="qty-dec" aria-label="Decrease quantity">&minus;</button><input id="qty" name="qty" type="number" inputmode="numeric" min="1" max="10" value="1" aria-describedby="qty-err"><button type="button" id="qty-inc" aria-label="Increase quantity">+</button></div><p class="field-error" id="qty-err" hidden></p></div>' +
      '<button class="btn btn-block" type="submit" data-component="add-to-bag">Add to bag</button>' +
      '<p class="add-status" id="add-status" role="status" data-component="inline-status"></p>' +
      '</form>' +
      '<section class="pdp-details" aria-labelledby="det-h" data-section="product-details" data-component="spec-list"><h2 id="det-h">Details</h2><dl><dt>Material</dt><dd>' + esc(p.material) + '</dd><dt>Style</dt><dd>' + esc(p.style) + '</dd><dt>Width</dt><dd>' + p.w + ' in</dd><dt>Depth</dt><dd>' + p.d + ' in</dd><dt>Height</dt><dd>' + p.h + ' in</dd><dt>Finishes</dt><dd>' + esc(p.finishes.map(function (f) { return f[0]; }).join(', ')) + '</dd></dl>' +
      '<p>A ' + esc(p.style.toLowerCase()) + ' ' + esc(singular(p.type)) + ' in ' + esc(p.material.toLowerCase()) + '. Dimensions are invented sample values, shown in inches.</p></section></div>';
    var form = $('#buy-form'), qty = $('#qty'), qerr = $('#qty-err'), sizeSel = $('#size');
    function curSize() { return sizeSel ? sizeSel.value : p.sizes[0][0]; }
    function refresh() {
      var add = 0; p.sizes.forEach(function (s) { if (s[0] === curSize()) { add = s[1]; } });
      $('#pdp-price').textContent = money(p.price + add);
      var hex = '#ccc'; p.finishes.forEach(function (f) { if (f[0] === cur.finish) { hex = f[1]; } });
      $('#pdp-art').innerHTML = art(p.type, hex);
      $('#finish-name').textContent = cur.finish;
    }
    $$('input[name=finish]', form).forEach(function (r) { r.addEventListener('change', function () { cur.finish = r.value; refresh(); announce('Finish selected: ' + r.value); }); });
    if (sizeSel) { sizeSel.addEventListener('change', function () { refresh(); announce('Size selected: ' + sizeSel.value + '. Price ' + $('#pdp-price').textContent); }); }
    function clamp(v) { return Math.min(10, Math.max(1, v)); }
    $('#qty-dec').addEventListener('click', function () { qty.value = clamp((parseInt(qty.value, 10) || 1) - 1); qerr.hidden = true; qty.removeAttribute('aria-invalid'); });
    $('#qty-inc').addEventListener('click', function () { qty.value = clamp((parseInt(qty.value, 10) || 1) + 1); qerr.hidden = true; qty.removeAttribute('aria-invalid'); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = parseInt(qty.value, 10);
      if (!(n >= 1 && n <= 10)) {
        qerr.textContent = 'Enter a quantity from 1 to 10.'; qerr.hidden = false; qty.setAttribute('aria-invalid', 'true'); qty.focus(); return;
      }
      qerr.hidden = true; qty.removeAttribute('aria-invalid');
      var cart = loadCart(), line = null;
      cart.forEach(function (l) { if (l.id === p.id && l.finish === cur.finish && l.size === curSize()) { line = l; } });
      if (line) { line.qty = Math.min(10, line.qty + n); } else { cart.push({ id: p.id, finish: cur.finish, size: curSize(), qty: n }); }
      saveCart(cart);
      var msg = 'Added ' + n + ' × ' + p.name + ', ' + cur.finish + ', ' + curSize() + ' to the demo bag. Bag now has ' + cartCount(cart) + ' items.';
      $('#add-status').innerHTML = esc(msg) + ' <a href="cart.html">View bag</a>';
      announce(msg);
    });
    refresh();
  }

  /* ---------- cart page ---------- */
  function initCart() {
    var root = $('#cart-root'); if (!root) { return; }
    function render(focusSel) {
      var cart = loadCart();
      if (!cart.length) {
        root.innerHTML = '<div class="empty" data-component="empty-state"><h2>Your bag is empty</h2><p>Nothing has been added in this demo session. Browse the sample catalogue to add items.</p><p><a class="btn" href="furniture.html">Shop furniture</a> <a class="btn btn-secondary" href="new.html">See what is new</a></p></div>';
        return;
      }
      var rows = cart.map(function (l, i) {
        var p = byId(l.id), up = unitPrice(l), hex = '#ccc';
        p.finishes.forEach(function (f) { if (f[0] === l.finish) { hex = f[1]; } });
        return '<li class="line" data-component="cart-line" data-line="' + i + '"><div class="line-media">' + art(p.type, hex) + '</div><div class="line-info"><h3 class="card-title"><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3><p class="card-meta">Finish: ' + esc(l.finish) + '. Size: ' + esc(l.size) + '.</p><p class="card-meta">Unit price: ' + money(up) + ' (sample)</p></div>' +
          '<div class="line-qty"><div class="stepper" data-component="quantity-stepper"><button type="button" data-act="dec" data-i="' + i + '" aria-label="Decrease quantity of ' + esc(p.name) + '">&minus;</button><input type="number" min="1" max="10" value="' + l.qty + '" data-act="set" data-i="' + i + '" aria-label="Quantity of ' + esc(p.name) + ', ' + esc(l.finish) + '" inputmode="numeric"><button type="button" data-act="inc" data-i="' + i + '" aria-label="Increase quantity of ' + esc(p.name) + '">+</button></div><p class="field-error" id="cart-err-' + i + '" hidden></p></div>' +
          '<p class="line-total"><span class="sr-only">Line total </span>' + money(up * l.qty) + '</p><button type="button" class="link-btn" data-act="rm" data-i="' + i + '" aria-label="Remove ' + esc(p.name) + ', ' + esc(l.finish) + ' from bag">Remove</button></li>';
      }).join('');
      var sub = subtotal(cart);
      root.innerHTML = '<div class="cart-layout"><section aria-labelledby="lines-h" data-section="cart-items" data-component="cart-line-list"><h2 id="lines-h" tabindex="-1">Items in your demo bag (' + cartCount(cart) + ')</h2><ul class="lines">' + rows + '</ul></section>' +
        '<section aria-labelledby="sum-h" class="summary" data-section="order-summary" data-component="order-summary"><h2 id="sum-h">Summary</h2><dl><dt>Subtotal</dt><dd>' + money(sub) + '</dd><dt>Sample delivery fee</dt><dd>' + money(DELIVERY_FEE) + '</dd><dt class="total">Sample total</dt><dd class="total">' + money(sub + DELIVERY_FEE) + '</dd></dl><p class="note">All amounts are illustrative sample values. This demo bag cannot be purchased.</p><a class="btn btn-block" href="checkout.html">Continue to demo checkout</a><button type="button" class="btn btn-secondary btn-block" id="clear-bag">Empty the demo bag</button></section></div>';
      if (focusSel) { var f = $(focusSel, root); if (f) { f.focus(); } }
    }
    function setQty(i, n, how) {
      var cart = loadCart(), l = cart[i]; if (!l) { return; }
      var p = byId(l.id);
      if (!(n >= 1 && n <= 10)) {
        var err = $('#cart-err-' + i); if (err) { err.textContent = 'Enter a quantity from 1 to 10.'; err.hidden = false; var inp = $('input[data-i="' + i + '"]', root); inp.setAttribute('aria-invalid', 'true'); inp.setAttribute('aria-describedby', 'cart-err-' + i); inp.focus(); }
        announce('Quantity must be from 1 to 10.'); return;
      }
      l.qty = n; saveCart(cart);
      render(how === 'set' ? 'input[data-i="' + i + '"]' : 'button[data-act="' + how + '"][data-i="' + i + '"]');
      announce('Quantity of ' + p.name + ' set to ' + n + '. Bag subtotal ' + money(subtotal(cart)) + '.');
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) { if (e.target.id === 'clear-bag') { /* handled below */ } return; }
      var i = parseInt(b.getAttribute('data-i'), 10), cart = loadCart(), act = b.getAttribute('data-act');
      if (act === 'inc') { setQty(i, Math.min(10, cart[i].qty + 1), 'inc'); }
      else if (act === 'dec') { setQty(i, Math.max(1, cart[i].qty - 1), 'dec'); }
      else if (act === 'rm') {
        var name = byId(cart[i].id).name; cart.splice(i, 1); saveCart(cart);
        render(cart.length ? '[data-act="rm"][data-i="' + Math.min(i, cart.length - 1) + '"]' : null);
        announce(name + ' removed from the demo bag. ' + (cart.length ? 'Bag subtotal ' + money(subtotal(cart)) + '.' : 'Your bag is now empty.'));
        if (!cart.length) { var h = $('#empty-h, .empty h2', root); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); } }
      }
    });
    root.addEventListener('click', function (e) {
      if (e.target.id === 'clear-bag') {
        saveCart([]); render(null); announce('Demo bag emptied.');
        var h = $('.empty h2', root); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
      }
    });
    root.addEventListener('change', function (e) {
      if (e.target.getAttribute && e.target.getAttribute('data-act') === 'set') { setQty(parseInt(e.target.getAttribute('data-i'), 10), parseInt(e.target.value, 10), 'set'); }
    });
    render(null);
  }

  /* ---------- generic form helpers ---------- */
  function showErrors(form, errs, summary) {
    $$('.field-error', form).forEach(function (e) { e.hidden = true; e.textContent = ''; });
    $$('[aria-invalid]', form).forEach(function (e) { e.removeAttribute('aria-invalid'); });
    if (!errs.length) { summary.hidden = true; summary.innerHTML = ''; return true; }
    errs.forEach(function (er) {
      var msg = $('#' + er.id + '-err'); if (msg) { msg.textContent = er.msg; msg.hidden = false; }
      var f = document.getElementById(er.id); if (f) { f.setAttribute('aria-invalid', 'true'); }
    });
    summary.innerHTML = '<h2 id="' + summary.id + '-h">There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with the form</h2><ul>' + errs.map(function (er) { return '<li><a href="#' + er.focus + '">' + esc(er.msg) + '</a></li>'; }).join('') + '</ul>';
    summary.hidden = false; summary.focus();
    $$('a', summary).forEach(function (a) { a.addEventListener('click', function (ev) { ev.preventDefault(); var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) { t.focus(); } }); });
    return false;
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ---------- checkout (simulation only) ---------- */
  function initCheckout() {
    var form = $('#checkout-form'); if (!form) { return; }
    var cart = loadCart(), summary = $('#error-summary'), sbox = $('#checkout-summary');
    if (!cart.length) {
      form.hidden = true; sbox.hidden = true;
      $('#checkout-empty').hidden = false; return;
    }
    sbox.innerHTML = '<h2 id="cs-h">Demo order summary</h2><ul class="mini-lines">' + cart.map(function (l) { return '<li>' + l.qty + ' &times; ' + esc(byId(l.id).name) + ', ' + esc(l.finish) + ', ' + esc(l.size) + ' <span class="amt">' + money(unitPrice(l) * l.qty) + '</span></li>'; }).join('') + '</ul><dl><dt>Subtotal</dt><dd>' + money(subtotal(cart)) + '</dd><dt>Sample delivery fee</dt><dd>' + money(DELIVERY_FEE) + '</dd><dt class="total">Sample total</dt><dd class="total">' + money(subtotal(cart) + DELIVERY_FEE) + '</dd></dl><p class="note">Illustrative amounts. No payment is taken and no order is placed.</p>';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return (document.getElementById(id).value || '').trim(); }, errs = [];
      if (!v('c-email')) { errs.push({ id: 'c-email', focus: 'c-email', msg: 'Enter an email address.' }); } else if (!EMAIL.test(v('c-email'))) { errs.push({ id: 'c-email', focus: 'c-email', msg: 'Enter an email address in the form name@example.com.' }); }
      if (!v('c-name')) { errs.push({ id: 'c-name', focus: 'c-name', msg: 'Enter your full name.' }); }
      if (!v('c-street')) { errs.push({ id: 'c-street', focus: 'c-street', msg: 'Enter a street address.' }); }
      if (!v('c-city')) { errs.push({ id: 'c-city', focus: 'c-city', msg: 'Enter a city.' }); }
      if (!v('c-state')) { errs.push({ id: 'c-state', focus: 'c-state', msg: 'Choose a state.' }); }
      if (!v('c-zip')) { errs.push({ id: 'c-zip', focus: 'c-zip', msg: 'Enter a 5-digit ZIP code.' }); } else if (!/^\d{5}$/.test(v('c-zip'))) { errs.push({ id: 'c-zip', focus: 'c-zip', msg: 'ZIP code must be exactly 5 digits.' }); }
      if (!$('input[name=delivery]:checked', form)) { errs.push({ id: 'delivery', focus: 'd-standard', msg: 'Choose a sample delivery option.' }); }
      if (!$('#c-ack').checked) { errs.push({ id: 'c-ack', focus: 'c-ack', msg: 'Confirm that you understand this is a demo and no order will be placed.' }); }
      if (!showErrors(form, errs, summary)) { return; }
      /* snapshot of items only: no personal details are stored */
      store.set('larkwood-demo-confirmation', JSON.stringify({ items: cart.map(function (l) { return { id: l.id, finish: l.finish, size: l.size, qty: l.qty }; }) }));
      saveCart([]);
      window.location.href = 'confirmation.html';
    });
  }
  function initConfirmation() {
    var root = $('#confirm-items'); if (!root) { return; }
    var raw = store.get('larkwood-demo-confirmation'), data = null;
    try { data = raw ? JSON.parse(raw) : null; } catch (e) { data = null; }
    if (!data || !data.items || !data.items.length) {
      root.innerHTML = '<p>No demo checkout was completed in this browser session, so there is nothing to show. Remember: nothing is ever ordered on this site.</p>';
      return;
    }
    var items = data.items.filter(function (l) { return byId(l.id); });
    root.innerHTML = '<h2>Items that were in the demo bag</h2><ul class="mini-lines">' + items.map(function (l) { return '<li>' + l.qty + ' &times; ' + esc(byId(l.id).name) + ', ' + esc(l.finish) + ', ' + esc(l.size) + '</li>'; }).join('') + '</ul>';
  }

  /* ---------- login (demo) ---------- */
  function initLogin() {
    var form = $('#login-form'); if (!form) { return; }
    var summary = $('#error-summary'), ok = $('#login-ok');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var em = form.elements.email.value.trim(), pw = form.elements.password.value, errs = [];
      if (!em) { errs.push({ id: 'l-email', focus: 'l-email', msg: 'Enter your email address.' }); } else if (!EMAIL.test(em)) { errs.push({ id: 'l-email', focus: 'l-email', msg: 'Enter an email address in the form name@example.com.' }); }
      if (!pw) { errs.push({ id: 'l-pass', focus: 'l-pass', msg: 'Enter a password.' }); }
      if (!showErrors(form, errs, summary)) { return; }
      form.elements.password.value = '';
      ok.hidden = false; ok.focus(); announce('Demo sign-in complete. No account exists.');
    });
  }

  /* ---------- stores ---------- */
  function initStores() {
    var form = $('#store-form'); if (!form) { return; }
    var list = $('#store-list'), status = $('#store-status'), empty = $('#store-empty');
    var states = []; STORES.forEach(function (s) { if (states.indexOf(s.state) < 0) { states.push(s.state); } });
    $('#store-state').innerHTML = '<option value="">All states</option>' + states.sort().map(function (s) { return '<option>' + s + '</option>'; }).join('');
    function run(ann) {
      var q = form.elements.q.value.trim().toLowerCase(), st = form.elements.state.value;
      var res = STORES.filter(function (s) { return (!st || s.state === st) && (!q || [s.name, s.city, s.state, s.zip, s.street].join(' ').toLowerCase().indexOf(q) > -1); });
      list.innerHTML = res.map(function (s) { return '<li class="store" data-component="store-card"><h3>' + esc(s.name) + '</h3><p>' + esc(s.street) + '<br>' + esc(s.city) + ', ' + s.state + ' ' + s.zip + '</p><p>Phone: <a href="tel:' + s.phone.replace(/[^0-9+]/g, '') + '">' + s.phone + '</a> (invented number)</p><p class="card-meta">' + esc(s.services) + '</p></li>'; }).join('');
      empty.hidden = res.length > 0;
      var msg = res.length + (res.length === 1 ? ' fictional store' : ' fictional stores') + ' found';
      status.textContent = msg; if (ann) { announce(msg); }
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); run(true); });
    form.elements.state.addEventListener('change', function () { run(true); });
    $('#store-reset').addEventListener('click', function () { form.reset(); run(true); form.elements.q.focus(); });
    var q = params().get('q'); if (q) { form.elements.q.value = q; }
    run(false);
  }

  /* ---------- accordion (FAQ) ---------- */
  function initAccordion() {
    $$('.acc-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', open ? 'false' : 'true');
        document.getElementById(b.getAttribute('aria-controls')).hidden = open;
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    initHeader(); fillCards(); initListing(); initSearch(); initProduct(); initCart();
    initCheckout(); initConfirmation(); initLogin(); initStores(); initAccordion();
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
}());
