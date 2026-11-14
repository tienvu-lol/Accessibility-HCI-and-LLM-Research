/* Cinder Ridge Smokehouse - fictional research replica. Vanilla JS, no network, all data inline. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function store(k, v) {
    try {
      if (v === undefined) { return window.sessionStorage.getItem(k); }
      if (v === null) { window.sessionStorage.removeItem(k); } else { window.sessionStorage.setItem(k, v); }
    } catch (e) { /* storage unavailable: degrade silently */ }
    return null;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function money(n) { return '$' + n.toFixed(2); }
  function announce(msg) { var r = $('#live-region'); if (r) { r.textContent = ''; window.setTimeout(function () { r.textContent = msg; }, 30); } }

  /* ---------- Data (all fictional) ---------- */
  var MENU = [
    { id: 'm1', name: 'Post-oak brisket', cat: 'meats', price: 31, unit: 'per lb', tags: ['gluten-free', 'dairy-free'], img: 'brisket', limited: true, desc: 'Fourteen hours over oak, pepper bark, sliced to order. Moist or lean on request.' },
    { id: 'm2', name: 'Pork spare ribs', cat: 'meats', price: 24, unit: 'per lb', tags: ['dairy-free'], img: 'ribs', limited: true, desc: 'Sweet-heat rub, a light glaze at the end, tender with a clean bite.' },
    { id: 'm3', name: 'Pulled pork shoulder', cat: 'meats', price: 20, unit: 'per lb', tags: ['gluten-free', 'dairy-free'], img: 'brisket', limited: false, desc: 'Hand-pulled, tossed in its own juices. Sauce on the side.' },
    { id: 'm4', name: 'Hot-link sausage', cat: 'meats', price: 18, unit: 'per lb', tags: ['spicy', 'dairy-free'], img: 'sausage', limited: true, desc: 'Coarse-ground beef and pork with cayenne and black pepper.' },
    { id: 'm5', name: 'Smoked turkey breast', cat: 'meats', price: 22, unit: 'per lb', tags: ['gluten-free', 'dairy-free'], img: 'brisket', limited: false, desc: 'Brined overnight, smoked over pecan wood until just done.' },
    { id: 'm6', name: 'Smoked mushroom steak', cat: 'meats', price: 17, unit: 'per lb', tags: ['vegetarian', 'gluten-free', 'dairy-free'], img: 'sides', limited: false, desc: 'Thick king-oyster mushrooms, smoked and finished with garlic oil.' },
    { id: 'p1', name: 'Brisket sandwich', cat: 'plates', price: 14, unit: 'each', tags: ['dairy-free'], img: 'brisket', limited: true, desc: 'Chopped brisket on a toasted bun with pickles and onion.' },
    { id: 'p2', name: 'Two-meat plate', cat: 'plates', price: 19, unit: 'each', tags: [], img: 'ribs', limited: false, desc: 'Choose two meats, two sides, white bread and pickles.' },
    { id: 'p3', name: 'Pulled pork sandwich', cat: 'plates', price: 12, unit: 'each', tags: ['dairy-free'], img: 'brisket', limited: false, desc: 'Pulled pork with tangy slaw on a soft bun.' },
    { id: 'p4', name: 'Smoked mushroom sandwich', cat: 'plates', price: 12, unit: 'each', tags: ['vegetarian'], img: 'sides', limited: false, desc: 'Smoked mushrooms, roasted pepper spread, arugula.' },
    { id: 's1', name: 'Pinto beans with burnt ends', cat: 'sides', price: 5, unit: 'each', tags: ['gluten-free', 'dairy-free'], img: 'sides', limited: false, desc: 'Slow-simmered with brisket trimmings.' },
    { id: 's2', name: 'Vinegar slaw', cat: 'sides', price: 4, unit: 'each', tags: ['vegetarian', 'gluten-free', 'dairy-free'], img: 'sides', limited: false, desc: 'Crisp cabbage, cider vinegar, a little sugar. No mayonnaise.' },
    { id: 's3', name: 'Potato salad', cat: 'sides', price: 4, unit: 'each', tags: ['vegetarian', 'gluten-free'], img: 'sides', limited: false, desc: 'Yellow mustard, egg, pickle relish.' },
    { id: 's4', name: 'Mac and cheese', cat: 'sides', price: 5, unit: 'each', tags: ['vegetarian'], img: 'sides', limited: false, desc: 'Three cheeses, toasted crumb top.' },
    { id: 's5', name: 'Jalapeno cornbread', cat: 'sides', price: 4, unit: 'each', tags: ['vegetarian', 'spicy'], img: 'sides', limited: false, desc: 'Skillet-baked with honey butter.' },
    { id: 'd1', name: 'Buttermilk pie', cat: 'desserts', price: 6, unit: 'slice', tags: ['vegetarian'], img: 'sweets', limited: true, desc: 'Custard-style pie with a crisp edge.' },
    { id: 'd2', name: 'Banana pudding cup', cat: 'desserts', price: 5, unit: 'each', tags: ['vegetarian'], img: 'sweets', limited: false, desc: 'Vanilla wafers, sliced banana, soft whipped cream.' },
    { id: 'd3', name: 'Dark chocolate pecan bar', cat: 'desserts', price: 5, unit: 'each', tags: ['vegetarian', 'dairy-free'], img: 'sweets', limited: false, desc: 'Fudgy bar with toasted pecans. Contains tree nuts.' },
    { id: 'k1', name: 'Sweet tea', cat: 'drinks', price: 3, unit: 'each', tags: ['vegetarian', 'gluten-free', 'dairy-free'], img: 'sides', limited: false, desc: 'Brewed hourly, served over ice.' },
    { id: 'k2', name: 'Lemonade', cat: 'drinks', price: 3, unit: 'each', tags: ['vegetarian', 'gluten-free', 'dairy-free'], img: 'sides', limited: false, desc: 'Fresh-squeezed, not too sweet.' },
    { id: 'k3', name: 'Root beer (bottle)', cat: 'drinks', price: 4, unit: 'each', tags: ['vegetarian', 'gluten-free', 'dairy-free'], img: 'sides', limited: false, desc: 'Cane sugar, glass bottle.' }
  ];
  var CATS = { meats: 'Meats by the pound', plates: 'Plates and sandwiches', sides: 'Sides', desserts: 'Desserts', drinks: 'Drinks' };
  var PRODUCTS = [
    { id: 'x1', name: 'Ridge Red table sauce', price: 9, img: 'sauce', desc: 'Tomato-forward and tangy with a slow smoky finish. 12 oz bottle.', tags: ['gluten-free', 'dairy-free'] },
    { id: 'x2', name: 'Cinder Gold mustard sauce', price: 9, img: 'sauce', desc: 'Sharp, sweet and bright. Good on pork. 12 oz bottle.', tags: ['gluten-free', 'dairy-free'] },
    { id: 'x3', name: 'Pit Salt brisket rub', price: 12, img: 'rub', desc: 'Coarse pepper, salt and garlic. 8 oz jar.', tags: ['gluten-free', 'dairy-free'] },
    { id: 'x4', name: 'Sweet Heat rib rub', price: 12, img: 'rub', desc: 'Brown sugar, paprika and a little cayenne. 8 oz jar.', tags: ['spicy', 'gluten-free', 'dairy-free'] },
    { id: 'x5', name: 'Sauce and rub set', price: 38, img: 'sauce', desc: 'Both sauces and both rubs in one box.', tags: ['gluten-free', 'dairy-free'] },
    { id: 'x6', name: 'Pit crew apron', price: 30, img: 'crew', desc: 'Heavy canvas apron with a leather strap. Merchandise, not food.', tags: [] }
  ];
  var HOURS = [ /* index = getDay(); [open, close] in hours, null = closed */
    [11, 15], null, [11, 15], [11, 15], [11, 15], [11, 15], [11, 15]
  ];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /* ---------- Announcement bar ---------- */
  (function () {
    var bar = $('[data-component="announcement-bar"]');
    if (!bar) { return; }
    if (store('cr-announce') === '1') { bar.hidden = true; return; }
    var btn = $('button', bar);
    if (btn) { btn.addEventListener('click', function () { bar.hidden = true; store('cr-announce', '1'); var h = $('.brand'); if (h) { h.focus(); } }); }
  })();

  /* ---------- Mobile nav disclosure ---------- */
  (function () {
    var btn = $('.nav-toggle'), wrap = $('#nav-wrap');
    if (!btn || !wrap) { return; }
    function set(open) { wrap.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
    });
  })();

  /* ---------- Open / sold-out status (hours-based + labeled demo override) ---------- */
  function lineState() { return store('cr-line') || 'auto'; }
  function computeStatus(now) {
    var d = now.getDay(), h = now.getHours() + now.getMinutes() / 60, today = HOURS[d], st = lineState();
    var out = { state: 'closed', text: '', sub: '' };
    function nextOpen() {
      for (var i = 1; i <= 7; i++) { var nd = (d + i) % 7; if (HOURS[nd]) { return DAYS[nd] + ' at 11 am'; } }
      return '';
    }
    if (st === 'soldout') { out.state = 'soldout'; out.text = 'Sold out for today (demo)'; out.sub = 'Simulated line status. Next opening: ' + nextOpen(); return out; }
    if (st === 'low') { out.state = 'low'; out.text = 'Open - running low on brisket (demo)'; out.sub = 'Simulated line status. Open until sold out, about 3 pm.'; return out; }
    if (!today) { out.text = 'Closed today (Monday)'; out.sub = 'Opens ' + nextOpen(); return out; }
    if (h < today[0]) { out.text = 'Closed - opens today at 11 am'; return out; }
    if (h >= today[1] && st === 'auto') { out.text = 'Closed for today'; out.sub = 'Next opening: ' + nextOpen(); return out; }
    out.state = 'open'; out.text = 'Open now until sold out'; out.sub = 'Hours-based, about 3 pm. Real sell-out status is not available in this replica.';
    return out;
  }
  function renderStatus() {
    var s = computeStatus(new Date());
    $$('[data-status-chip]').forEach(function (el) {
      el.setAttribute('data-state', s.state);
      var t = $('.chip-text', el); if (t) { t.textContent = s.text; }
    });
    $$('[data-status-sub]').forEach(function (el) { el.textContent = s.sub; });
    var today = new Date().getDay();
    $$('tr[data-dow]').forEach(function (tr) { var is = Number(tr.getAttribute('data-dow')) === today; tr.classList.toggle('today', is); if (is) { tr.setAttribute('data-today', 'true'); } else { tr.removeAttribute('data-today'); } });
  }
  renderStatus();
  window.setInterval(renderStatus, 60000);
  (function () {
    var sel = $('#line-demo');
    if (!sel) { return; }
    sel.value = lineState();
    sel.addEventListener('change', function () {
      store('cr-line', sel.value); renderStatus(); announce('Line status demo set to ' + sel.options[sel.selectedIndex].text);
      if (window.renderMenu) { window.renderMenu(); }
    });
  })();

  /* ---------- Cart (sessionStorage, demo) ---------- */
  function getCart() { try { return JSON.parse(store('cr-cart') || '{}') || {}; } catch (e) { return {}; } }
  function setCart(c) { store('cr-cart', JSON.stringify(c)); renderCartCount(); }
  function cartCount() { var c = getCart(), n = 0; Object.keys(c).forEach(function (k) { n += c[k]; }); return n; }
  function renderCartCount() { $$('[data-cart-count]').forEach(function (el) { el.textContent = cartCount(); }); }
  renderCartCount();

  /* ---------- Generic form validation ---------- */
  function labelText(f) {
    var l = f.id && $('label[for="' + f.id + '"]');
    return l ? l.textContent.replace(/\*|\(required\)|\(optional\)/g, '').replace(/\s+/g, ' ').trim() : (f.name || 'This field');
  }
  function fieldProblem(f) {
    var v = (f.value || '').trim(), name = labelText(f);
    if (f.type === 'checkbox') { return f.required && !f.checked ? 'Check the box to continue: ' + name : ''; }
    if (f.required && !v) { return f.getAttribute('data-msg') || ('Enter ' + (f.tagName === 'SELECT' ? 'a choice for ' : '') + name.toLowerCase()); }
    if (!v) { return ''; }
    if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { return 'Enter an email address like name@example.com'; }
    if (f.type === 'tel' && v.replace(/\D/g, '').length < 7) { return 'Enter a phone number with at least 7 digits'; }
    if (f.type === 'number') {
      var n = Number(v);
      if (isNaN(n)) { return 'Enter a number'; }
      if (f.min !== '' && n < Number(f.min)) { return name + ' must be at least ' + f.min; }
      if (f.max !== '' && n > Number(f.max)) { return name + ' must be no more than ' + f.max; }
    }
    if (f.type === 'date' && f.min && v < f.min) { return 'Choose a date on or after ' + f.min; }
    if (f.minLength > 0 && v.length < f.minLength) { return name + ' needs at least ' + f.minLength + ' characters'; }
    return '';
  }
  function setError(f, msg) {
    var id = f.id + '-error', e = document.getElementById(id), desc = (f.getAttribute('data-desc') || '');
    if (msg) {
      if (!e) { e = document.createElement('p'); e.id = id; e.className = 'field-error'; f.parentNode.appendChild(e); }
      e.textContent = msg; f.setAttribute('aria-invalid', 'true');
      f.setAttribute('aria-describedby', (desc + ' ' + id).trim());
    } else {
      if (e) { e.remove(); }
      f.removeAttribute('aria-invalid');
      if (desc) { f.setAttribute('aria-describedby', desc); } else { f.removeAttribute('aria-describedby'); }
    }
  }
  function validateForm(form) {
    var errs = [];
    $$('input,select,textarea', form).forEach(function (f) {
      if (f.type === 'hidden' || f.disabled || f.closest('[hidden]')) { setError(f, ''); return; }
      var p = fieldProblem(f); setError(f, p); if (p) { errs.push({ field: f, msg: p }); }
    });
    var old = $('.error-summary', form); if (old) { old.remove(); }
    if (errs.length) {
      var box = document.createElement('div'); box.className = 'error-summary'; box.tabIndex = -1; box.setAttribute('role', 'alert');
      var items = errs.map(function (x) { return '<li><a href="#' + x.field.id + '">' + esc(x.msg) + '</a></li>'; }).join('');
      box.innerHTML = '<h2>There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with this form</h2><ul>' + items + '</ul>';
      form.insertBefore(box, form.firstChild);
      $$('a', box).forEach(function (a, i) { a.addEventListener('click', function (ev) { ev.preventDefault(); errs[i].field.focus(); }); });
      box.focus();
    }
    return errs.length === 0;
  }
  $$('form[data-validate]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('input', function (e) { var f = e.target; if (f.getAttribute && f.getAttribute('aria-invalid') === 'true') { setError(f, fieldProblem(f)); } });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = validateForm(form);
      if (!ok) { return; }
      var hook = form.getAttribute('data-hook');
      var msg = hook && window.formHooks && window.formHooks[hook] ? window.formHooks[hook](form) : null;
      var ok2 = form.querySelector('[data-success]');
      if (ok2) {
        if (msg) { var m = $('[data-success-detail]', ok2); if (m) { m.textContent = msg; } }
        ok2.hidden = false; ok2.tabIndex = -1; ok2.focus();
      }
      if (form.getAttribute('data-reset') !== 'false') { form.reset(); }
    });
    form.addEventListener('reset', function () { var s = $('[data-success]', form); if (s) { s.hidden = true; } });
  });
  window.formHooks = {};
  /* hide stale success when user starts editing again */
  $$('form[data-validate]').forEach(function (form) {
    form.addEventListener('input', function () { var s = $('[data-success]', form); if (s && !s.hidden && document.activeElement !== s) { s.hidden = true; } });
  });

  /* ---------- Menu page ---------- */
  var menuRoot = $('#menu-list');
  if (menuRoot) {
    var pre = {}; try { pre = JSON.parse(store('cr-pre') || '{}') || {}; } catch (e) { pre = {}; }
    var q = $('#menu-search'), cat = $('#menu-cat'), sort = $('#menu-sort'), count = $('#menu-count'), diet = $$('input[name="diet"]');
    var dlg = $('#item-dialog'), lastTrigger = null, current = null;
    function itemStatus(m) {
      var st = lineState();
      if (m.limited && st === 'soldout') { return 'soldout'; }
      if (m.limited && st === 'low') { return 'low'; }
      return 'ok';
    }
    window.renderMenu = function () {
      var term = q.value.trim().toLowerCase(), c = cat.value, wanted = diet.filter(function (d) { return d.checked; }).map(function (d) { return d.value; });
      var list = MENU.filter(function (m) {
        if (c !== 'all' && m.cat !== c) { return false; }
        if (term && (m.name + ' ' + m.desc).toLowerCase().indexOf(term) < 0) { return false; }
        return wanted.every(function (w) { return m.tags.indexOf(w) >= 0; });
      });
      if (sort.value === 'price-asc') { list.sort(function (a, b) { return a.price - b.price; }); }
      else if (sort.value === 'price-desc') { list.sort(function (a, b) { return b.price - a.price; }); }
      else if (sort.value === 'name') { list.sort(function (a, b) { return a.name.localeCompare(b.name); }); }
      count.textContent = list.length === 0 ? 'No items match your filters.' : 'Showing ' + list.length + ' of ' + MENU.length + ' items';
      if (!list.length) {
        menuRoot.innerHTML = '<div class="empty"><p><strong>Nothing on the menu matches those filters.</strong></p><p>Try removing a dietary filter or clearing the search.</p><button type="button" class="btn secondary" id="empty-clear">Clear all filters</button></div>';
        $('#empty-clear').addEventListener('click', clearFilters);
        return;
      }
      var html = '';
      Object.keys(CATS).forEach(function (k) {
        var grp = list.filter(function (m) { return m.cat === k; });
        if (!grp.length) { return; }
        html += '<section aria-labelledby="cat-' + k + '" data-section="menu-category-' + k + '" data-component="menu-category"><h2 id="cat-' + k + '">' + CATS[k] + '</h2><div class="grid cols-3">';
        grp.forEach(function (m) {
          var s = itemStatus(m), flag = s === 'soldout' ? '<span class="badge-sold">Sold out (demo)</span>' : s === 'low' ? '<span class="badge-sold">Running low (demo)</span>' : '';
          html += '<article class="card menu-item" data-component="menu-item" data-item="' + m.id + '"><img src="assets/' + m.img + '.svg" alt="" width="400" height="300" loading="lazy">' +
            '<div class="top"><h3>' + esc(m.name) + '</h3><span class="price">' + money(m.price) + ' <small>' + m.unit + '</small></span></div>' +
            '<p>' + esc(m.desc) + '</p><p>' + m.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + flag + '</p>' +
            '<button type="button" class="btn secondary" data-open="' + m.id + '" aria-label="Details for ' + esc(m.name) + '">Details</button></article>';
        });
        html += '</div></section>';
      });
      menuRoot.innerHTML = html;
    };
    function clearFilters() { q.value = ''; cat.value = 'all'; sort.value = 'default'; diet.forEach(function (d) { d.checked = false; }); window.renderMenu(); announce('Filters cleared'); q.focus(); }
    [q, cat, sort].forEach(function (el) { el.addEventListener('input', window.renderMenu); });
    diet.forEach(function (d) { d.addEventListener('change', window.renderMenu); });
    $('#menu-clear').addEventListener('click', clearFilters);
    $('#menu-filters').addEventListener('submit', function (e) { e.preventDefault(); });
    window.renderMenu();
    menuRoot.addEventListener('click', function (e) {
      var b = e.target.closest('[data-open]'); if (!b) { return; }
      current = MENU.filter(function (m) { return m.id === b.getAttribute('data-open'); })[0]; lastTrigger = b;
      $('#dlg-title').textContent = current.name; $('#dlg-desc').textContent = current.desc;
      $('#dlg-price').textContent = money(current.price) + ' ' + current.unit;
      $('#dlg-tags').textContent = current.tags.length ? 'Dietary notes: ' + current.tags.join(', ') : 'No dietary tags listed.';
      $('#dlg-qty').value = 1; $('#dlg-msg').textContent = '';
      dlg.showModal();
    });
    function closeDlg() { dlg.close(); }
    $('#dlg-close').addEventListener('click', closeDlg);
    dlg.addEventListener('close', function () { if (lastTrigger) { lastTrigger.focus(); } });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) { closeDlg(); } });
    $('#dlg-add').addEventListener('click', function () {
      var n = parseInt($('#dlg-qty').value, 10);
      if (!(n >= 1 && n <= 20)) { $('#dlg-msg').textContent = 'Enter a quantity from 1 to 20.'; $('#dlg-qty').focus(); return; }
      pre[current.id] = (pre[current.id] || 0) + n; store('cr-pre', JSON.stringify(pre)); renderTray();
      announce(n + ' x ' + current.name + ' added to the demo pre-order'); closeDlg();
    });
    var tray = $('#tray-list'), trayTotal = $('#tray-total');
    function renderTray() {
      var ids = Object.keys(pre), total = 0;
      if (!ids.length) { tray.innerHTML = '<p class="empty">Your demo pre-order is empty. Use Details on any menu item to add it.</p>'; trayTotal.textContent = money(0); return; }
      tray.innerHTML = '<ul>' + ids.map(function (id) {
        var m = MENU.filter(function (x) { return x.id === id; })[0]; total += m.price * pre[id];
        return '<li>' + pre[id] + ' x ' + esc(m.name) + ' - ' + money(m.price * pre[id]) + ' <button type="button" class="btn secondary" data-remove="' + id + '" aria-label="Remove ' + esc(m.name) + ' from pre-order">Remove</button></li>';
      }).join('') + '</ul>';
      trayTotal.textContent = money(total);
    }
    tray.addEventListener('click', function (e) {
      var b = e.target.closest('[data-remove]'); if (!b) { return; }
      delete pre[b.getAttribute('data-remove')]; store('cr-pre', JSON.stringify(pre)); renderTray(); announce('Item removed'); $('#tray-heading').focus();
    });
    renderTray();
    window.formHooks.preorder = function () {
      if (!Object.keys(pre).length) { return null; }
      var n = Object.keys(pre).length; pre = {}; store('cr-pre', null); renderTray();
      return 'Demo only: ' + n + ' item type(s) were "submitted" locally. No order was placed and nothing was charged.';
    };
    var pf = $('#preorder-form');
    if (pf) {
      pf.addEventListener('submit', function (e) {
        if (!Object.keys(pre).length) { e.stopImmediatePropagation(); e.preventDefault(); var s = $('[data-success]', pf); if (s) { s.hidden = true; } $$('.error-summary', pf).forEach(function (x) { x.remove(); });
          var box = document.createElement('div'); box.className = 'error-summary'; box.tabIndex = -1; box.setAttribute('role', 'alert');
          box.innerHTML = '<h2>Your pre-order is empty</h2><p>Add at least one item with Details in the menu above, then submit again.</p>'; pf.insertBefore(box, pf.firstChild); box.focus(); }
      }, true);
    }
  }

  /* ---------- Sauces & rubs shop ---------- */
  var shop = $('#product-list');
  if (shop) {
    shop.innerHTML = PRODUCTS.map(function (p) {
      return '<article class="card" data-component="product-card"><img src="assets/' + p.img + '.svg" alt="" width="400" height="300" loading="lazy"><h3>' + esc(p.name) + '</h3><p>' + esc(p.desc) + '</p>' +
        '<p><span class="price">' + money(p.price) + '</span> ' + p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</p>' +
        '<button type="button" class="btn" data-add="' + p.id + '" aria-label="Add to cart: ' + esc(p.name) + '">Add to cart</button></article>';
    }).join('');
    shop.addEventListener('click', function (e) {
      var b = e.target.closest('[data-add]'); if (!b) { return; }
      var c = getCart(), id = b.getAttribute('data-add'); c[id] = (c[id] || 0) + 1; setCart(c);
      var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
      announce(p.name + ' added. Demo cart now has ' + cartCount() + ' items.');
    });
  }

  /* ---------- Cart page ---------- */
  var cartRoot = $('#cart-lines');
  if (cartRoot) {
    var renderCart = function () {
      var c = getCart(), ids = Object.keys(c).filter(function (k) { return c[k] > 0; }), total = 0, ck = $('#checkout-form');
      if (!ids.length) {
        cartRoot.innerHTML = '<div class="empty"><p><strong>Your demo cart is empty.</strong></p><a class="btn" href="sauces-rubs.html">Browse sauces and rubs</a></div>';
        $('#cart-total').textContent = money(0); if (ck) { ck.hidden = true; } return;
      }
      if (ck) { ck.hidden = false; }
      cartRoot.innerHTML = ids.map(function (id) {
        var p = PRODUCTS.filter(function (x) { return x.id === id; })[0]; total += p.price * c[id];
        return '<div class="cart-line" data-component="cart-line"><div><strong>' + esc(p.name) + '</strong><br>' + money(p.price) + ' each</div><div class="price">' + money(p.price * c[id]) + '</div>' +
          '<div class="qty-row"><label for="q-' + id + '">Quantity</label><input class="qty" type="number" min="1" max="20" id="q-' + id + '" value="' + c[id] + '" data-qty="' + id + '">' +
          '<button type="button" class="btn secondary" data-del="' + id + '" aria-label="Remove ' + esc(p.name) + ' from cart">Remove</button></div></div>';
      }).join('');
      $('#cart-total').textContent = money(total);
    };
    cartRoot.addEventListener('change', function (e) {
      var i = e.target.closest('[data-qty]'); if (!i) { return; }
      var n = parseInt(i.value, 10), c = getCart(), id = i.getAttribute('data-qty');
      if (!(n >= 1 && n <= 20)) { announce('Quantity must be between 1 and 20'); i.value = c[id]; return; }
      c[id] = n; setCart(c); renderCart(); announce('Quantity updated');
      var again = $('[data-qty="' + id + '"]'); if (again) { again.focus(); }
    });
    cartRoot.addEventListener('click', function (e) {
      var b = e.target.closest('[data-del]'); if (!b) { return; }
      var c = getCart(); delete c[b.getAttribute('data-del')]; setCart(c); renderCart(); announce('Item removed from cart');
      $('#cart-heading').focus();
    });
    window.formHooks.checkout = function () { setCart({}); renderCart(); return 'Demo only: no order was placed, nothing was charged and nothing will ship.'; };
    renderCart();
  }

  /* ---------- Gift card amount toggle ---------- */
  (function () {
    var amt = $('#gc-amount'), custom = $('#gc-custom-wrap'), cinput = $('#gc-custom');
    if (!amt) { return; }
    function sync() { var on = amt.value === 'custom'; custom.hidden = !on; cinput.required = on; }
    amt.addEventListener('change', sync); sync();
    window.formHooks.giftcard = function () { return 'Demo only: no gift card was created or sent, and no payment was taken.'; };
    var form = $('#giftcard-form'); if (form) { form.addEventListener('reset', function () { window.setTimeout(sync, 0); }); }
  })();

  /* ---------- Misc form hooks / date minimums ---------- */
  var iso = new Date(); var isoStr = iso.getFullYear() + '-' + String(iso.getMonth() + 1).padStart(2, '0') + '-' + String(iso.getDate()).padStart(2, '0');
  $$('input[type="date"][data-min-today]').forEach(function (d) { d.min = isoStr; });
  window.formHooks.newsletter = function () { return 'Demo only: your address was not stored or sent anywhere.'; };
  window.formHooks.inquiry = function () { return 'Demo only: this inquiry was not sent. A real restaurant would follow up by email or phone.'; };
  window.formHooks.contact = function () { return 'Demo only: your message was not sent.'; };
  window.formHooks.preorder = window.formHooks.preorder || null;
})();
