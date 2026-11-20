/* Trattoria Fico Nero - fictional demo site. Vanilla JS, no network, works from file://. */
(function () {
  'use strict';
  var SEARCH_INDEX = [{"t":"Home","u":"index.html","k":"address hours walk-ins menu","type":"Page"},{"t":"Plain-Text Menu","u":"text-menu.html","k":"menu text dishes wine","type":"Page"},{"t":"Gatherings","u":"gatherings.html","k":"private events inquiry","type":"Page"},{"t":"Shop","u":"shop.html","k":"olive oil tote apron","type":"Page"},{"t":"Craft Cocktails","u":"cocktails.html","k":"drinks bar","type":"Page"},{"t":"Marta & Joel","u":"owners.html","k":"owners story","type":"Page"},{"t":"Press","u":"press.html","k":"reviews","type":"Page"},{"t":"Community","u":"community.html","k":"neighbors pantry apprenticeship","type":"Page"},{"t":"Gallery","u":"gallery.html","k":"photos","type":"Page"},{"t":"Reserve (demo)","u":"reserve.html","k":"reservation table booking","type":"Page"},{"t":"Accessibility","u":"accessibility.html","k":"statement","type":"Page"},{"t":"Cart","u":"cart.html","k":"demo cart","type":"Page"},{"t":"Castelvetrano-style olives, orange peel","u":"text-menu.html#m-spuntini","k":"Warmed in rosemary oil. SPUNTINI vegan gluten-free","type":"Dish"},{"t":"Fried sage leaves","u":"text-menu.html#m-spuntini","k":"Light batter, sea salt. SPUNTINI vegetarian","type":"Dish"},{"t":"Marinated white beans","u":"text-menu.html#m-spuntini","k":"Lemon, chili, torn parsley. SPUNTINI vegan gluten-free","type":"Dish"},{"t":"Crispy rice balls","u":"text-menu.html#m-spuntini","k":"Smoked mozzarella centers, tomato jam. SPUNTINI vegetarian","type":"Dish"},{"t":"Ricotta and honeyed fig","u":"text-menu.html#m-bruschetta","k":"Thyme, cracked pepper. BRUSCHETTA vegetarian","type":"Dish"},{"t":"Roasted tomato and garlic","u":"text-menu.html#m-bruschetta","k":"Basil, aged vinegar. BRUSCHETTA vegan","type":"Dish"},{"t":"Chicken liver mousse","u":"text-menu.html#m-bruschetta","k":"Pickled shallot, capers. BRUSCHETTA ","type":"Dish"},{"t":"Whipped chickpea","u":"text-menu.html#m-bruschetta","k":"Preserved lemon, olive oil. BRUSCHETTA vegan","type":"Dish"},{"t":"Shaved fennel salad","u":"text-menu.html#m-antipasti","k":"Blood orange, mint, pecorino. ANTIPASTI vegetarian gluten-free","type":"Dish"},{"t":"Beef carpaccio","u":"text-menu.html#m-antipasti","k":"Arugula, shaved parmesan, lemon. ANTIPASTI gluten-free","type":"Dish"},{"t":"Burrata","u":"text-menu.html#m-antipasti","k":"Charred bread, pistachio, mint oil. ANTIPASTI vegetarian","type":"Dish"},{"t":"Stuffed zucchini blossoms","u":"text-menu.html#m-antipasti","k":"Herbed ricotta, tomato water. ANTIPASTI vegetarian","type":"Dish"},{"t":"Octopus and potato","u":"text-menu.html#m-antipasti","k":"Paprika oil, celery leaf. ANTIPASTI gluten-free","type":"Dish"},{"t":"Braised spinach","u":"text-menu.html#m-verdure","k":"Garlic, raisins, toasted pine nuts. VERDURE vegan gluten-free","type":"Dish"},{"t":"Roasted carrots","u":"text-menu.html#m-verdure","k":"Whipped feta, dukkah-style crumb. VERDURE vegetarian","type":"Dish"},{"t":"Brussels sprouts","u":"text-menu.html#m-verdure","k":"Crisp edges, balsamic glaze. VERDURE vegan gluten-free","type":"Dish"},{"t":"Escarole with anchovy dressing","u":"text-menu.html#m-verdure","k":"Breadcrumbs, lemon. VERDURE ","type":"Dish"},{"t":"Spaghetti al limone","u":"text-menu.html#m-pasta","k":"Butter, black pepper, lemon zest. Pasta vegetarian","type":"Dish"},{"t":"Cacio e pepe","u":"text-menu.html#m-pasta","k":"Tonnarelli, pecorino, cracked pepper. Pasta vegetarian","type":"Dish"},{"t":"Mushroom pappardelle","u":"text-menu.html#m-pasta","k":"Mixed mushrooms, thyme, white wine. Pasta vegan","type":"Dish"},{"t":"Pork ragu rigatoni","u":"text-menu.html#m-pasta","k":"Slow-cooked, 6 hours. Pasta ","type":"Dish"},{"t":"Gluten-free penne arrabbiata","u":"text-menu.html#m-pasta","k":"Tomato, chili, garlic, parsley. Pasta vegan gluten-free","type":"Dish"},{"t":"Spinach gnocchi","u":"text-menu.html#m-pasta","k":"Brown butter, sage. Pasta vegetarian","type":"Dish"},{"t":"Seared sea bass","u":"text-menu.html#m-pesce","k":"Fennel, olives, saffron broth. PESCE gluten-free","type":"Dish"},{"t":"Mussels in white wine","u":"text-menu.html#m-pesce","k":"Garlic, parsley, grilled bread. PESCE ","type":"Dish"},{"t":"Roasted shrimp","u":"text-menu.html#m-pesce","k":"Lemon, chili, white beans. PESCE gluten-free","type":"Dish"},{"t":"Roast half chicken","u":"text-menu.html#m-carne","k":"Salsa verde, crisp potatoes. CARNE gluten-free","type":"Dish"},{"t":"Veal meatballs","u":"text-menu.html#m-carne","k":"Tomato sauce, shaved parmesan. CARNE ","type":"Dish"},{"t":"Grilled ribeye","u":"text-menu.html#m-carne","k":"Rosemary salt, arugula. CARNE gluten-free","type":"Dish"},{"t":"Wild mushroom risotto (Thursday)","u":"text-menu.html#m-specials","k":"Carnaroli rice, mascarpone. SPeCIALS vegetarian gluten-free","type":"Dish"},{"t":"Whole branzino (Friday)","u":"text-menu.html#m-specials","k":"Serves two. Ask your server. SPeCIALS gluten-free","type":"Dish"},{"t":"Lemon olive-oil cake (daily)","u":"text-menu.html#m-specials","k":"Candied zest, whipped cream. SPeCIALS vegetarian","type":"Dish"},{"t":"Prosecco brut, glass","u":"text-menu.html#m-spumanti","k":"Pear, white flowers. Spumanti vegan","type":"Dish"},{"t":"Franciacorta-style rose, bottle","u":"text-menu.html#m-spumanti","k":"Strawberry, brioche. Spumanti vegan","type":"Dish"},{"t":"Vermentino, glass","u":"text-menu.html#m-bianchi","k":"Citrus, saline finish. Bianchi vegan","type":"Dish"},{"t":"Verdicchio, bottle","u":"text-menu.html#m-bianchi","k":"Almond, green apple. Bianchi vegan","type":"Dish"},{"t":"Fiano, bottle","u":"text-menu.html#m-bianchi","k":"Hazelnut, stone fruit. Bianchi vegan","type":"Dish"},{"t":"Montepulciano, glass","u":"text-menu.html#m-rossi","k":"Plum, soft tannins. Rossi vegan","type":"Dish"},{"t":"Nebbiolo, bottle","u":"text-menu.html#m-rossi","k":"Rose petal, tar, cherry. Rossi vegan","type":"Dish"},{"t":"Sangiovese riserva, bottle","u":"text-menu.html#m-rossi","k":"Dried cherry, leather. Rossi vegan","type":"Dish"},{"t":"Bitter spritz","u":"text-menu.html#m-aperitivi","k":"Bitter orange liqueur, sparkling wine, soda. Aperitivi vegan","type":"Dish"},{"t":"Garden vermouth and tonic","u":"text-menu.html#m-aperitivi","k":"House botanical vermouth, tonic, olive. Aperitivi vegan","type":"Dish"},{"t":"Alcohol-free spritz","u":"text-menu.html#m-aperitivi","k":"Bitter citrus cordial, soda, orange. Aperitivi vegan","type":"Dish"},{"t":"Fig Negroni","u":"text-menu.html#m-cocktails-list","k":"Gin, fig-infused bitter, red vermouth. Cocktails vegan","type":"Dish"},{"t":"Rosemary Gimlet","u":"text-menu.html#m-cocktails-list","k":"Gin, rosemary syrup, lime. Cocktails vegan","type":"Dish"},{"t":"Espresso Martini","u":"text-menu.html#m-cocktails-list","k":"Vodka, espresso, coffee liqueur. Cocktails vegan","type":"Dish"},{"t":"Estate olive oil tin, 500 ml","u":"shop.html","k":"A fictional, peppery finishing oil in a reusable tin.","type":"Shop item"},{"t":"Canvas market tote","u":"shop.html","k":"Heavy cotton tote with the fig emblem.","type":"Shop item"},{"t":"Kitchen apron","u":"shop.html","k":"Adjustable apron, two deep pockets.","type":"Shop item"},{"t":"House recipes zine","u":"shop.html","k":"Twelve family recipes, stapled, 32 pages.","type":"Shop item"},{"t":"Fig bitters, 100 ml","u":"shop.html","k":"Our bar fig bitters, bottled for home use.","type":"Shop item"},{"t":"Olive wood serving spoon","u":"shop.html","k":"Hand-finished, each grain differs.","type":"Shop item"},{"t":"Fig Negroni","u":"cocktails.html","k":"Gin, house fig-infused bitter liqueur and red vermouth over one large cube.","type":"Cocktail"},{"t":"Rosemary Gimlet","u":"cocktails.html","k":"Gin, rosemary syrup and fresh lime, served up.","type":"Cocktail"},{"t":"Bitter Spritz","u":"cocktails.html","k":"Bitter orange liqueur, sparkling wine and soda over ice.","type":"Cocktail"},{"t":"Espresso Martini","u":"cocktails.html","k":"Vodka, fresh espresso and coffee liqueur, shaken hard.","type":"Cocktail"},{"t":"Orchard Zero","u":"cocktails.html","k":"Alcohol-free: pear shrub, ginger, lemon and soda.","type":"Cocktail"}];
  var PRODUCTS = [{"id":"oil","n":"Estate olive oil tin, 500 ml","p":24},{"id":"tote","n":"Canvas market tote","p":18},{"id":"apron","n":"Kitchen apron","p":32},{"id":"zine","n":"House recipes zine","p":12},{"id":"bitters","n":"Fig bitters, 100 ml","p":16},{"id":"spoon","n":"Olive wood serving spoon","p":14}];
  var CART_KEY = 'ficonero-demo-cart';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var memCart = {};

  /* ---------- storage-safe cart ---------- */
  function loadCart() {
    try { var v = JSON.parse(localStorage.getItem(CART_KEY) || 'null'); if (v && typeof v === 'object') return v; } catch (e) { }
    return memCart;
  }
  function saveCart(c) { memCart = c; try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) { } updateCartLink(); }
  function cartCount() { var c = loadCart(), n = 0; for (var k in c) n += c[k]; return n; }
  function updateCartLink() {
    var n = cartCount();
    $$('[data-cart-link]').forEach(function (a) { a.textContent = n ? 'Cart (' + n + ')' : 'Cart'; });
  }
  function prod(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }

  /* ---------- mobile nav disclosure ---------- */
  var toggle = $('.nav-toggle'), nav = $('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); toggle.focus();
      }
    });
  }

  /* ---------- open/closed indicator (device clock; demo) ---------- */
  var os = $('[data-open-status]');
  if (os) {
    var d = new Date(), day = d.getDay(), mins = d.getHours() * 60 + d.getMinutes();
    var openAt = (day >= 1 && day <= 4) ? 11 * 60 : 10 * 60;
    var isOpen = mins >= openAt && mins < 23 * 60;
    os.textContent = (isOpen ? 'Open now' : 'Closed now') + ' (demo indicator, based on your device clock and the posted hours; intentional addition).';
    os.classList.add(isOpen ? 'is-open' : 'is-closed');
  }

  /* ---------- accordion (cocktails) ---------- */
  $$('.accordion button[aria-expanded]').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
  });
  var all = $('#cocktail-toggle-all');
  if (all) all.addEventListener('click', function () {
    var expand = all.getAttribute('aria-pressed') !== 'true';
    all.setAttribute('aria-pressed', String(expand));
    all.textContent = expand ? 'Collapse all' : 'Expand all';
    $$('.accordion button[aria-expanded]').forEach(function (b) {
      b.setAttribute('aria-expanded', String(expand));
      document.getElementById(b.getAttribute('aria-controls')).hidden = !expand;
    });
  });

  /* ---------- menu filter ---------- */
  var mf = $('#menu-filter');
  if (mf) {
    var q = $('#menu-q'), boxes = $$('input[type=checkbox]', mf), items = $$('.menu-item'), groups = $$('.menu-group');
    var runFilter = function () {
      var term = q.value.trim().toLowerCase();
      var need = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
      var shown = 0;
      items.forEach(function (li) {
        var diet = (li.getAttribute('data-diet') || '').split(' ');
        var ok = need.every(function (n) { return diet.indexOf(n) > -1 || (n === 'v' && diet.indexOf('vg') > -1); });
        if (ok && term) ok = li.textContent.toLowerCase().indexOf(term) > -1;
        li.hidden = !ok; if (ok) shown++;
      });
      groups.forEach(function (g) {
        if (g.querySelector('.menu-group')) { g.hidden = !g.querySelector('.menu-item:not([hidden])'); return; }
        g.hidden = !g.querySelector('.menu-item:not([hidden])');
      });
      $('#menu-count').textContent = 'Showing ' + shown + ' of ' + items.length + ' items.';
      $('#menu-empty').hidden = shown > 0;
    };
    mf.addEventListener('submit', function (e) { e.preventDefault(); });
    q.addEventListener('input', runFilter);
    boxes.forEach(function (b) { b.addEventListener('change', runFilter); });
    $('#menu-reset').addEventListener('click', function () { q.value = ''; boxes.forEach(function (b) { b.checked = false; }); runFilter(); q.focus(); });
    runFilter();
  }

  /* ---------- site search ---------- */
  var sr = $('#search-results');
  if (sr) {
    var params = new URLSearchParams(location.search), term = (params.get('q') || '').trim();
    $('#sp-q').value = term;
    var cnt = $('#search-count');
    if (!term) { cnt.textContent = 'Enter a word to search.'; }
    else {
      var words = term.toLowerCase().split(/\s+/);
      var hits = SEARCH_INDEX.filter(function (r) {
        var hay = (r.t + ' ' + r.k).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) > -1; });
      });
      hits.forEach(function (r) {
        var li = document.createElement('li'), a = document.createElement('a'), s = document.createElement('span');
        a.href = r.u; a.textContent = r.t; s.textContent = ' (' + r.type + ')';
        li.appendChild(a); li.appendChild(s); sr.appendChild(li);
      });
      cnt.textContent = hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for "' + term + '".';
      $('#search-empty').hidden = hits.length > 0;
    }
  }

  /* ---------- shop + cart ---------- */
  $$('[data-add]').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = loadCart(), id = b.getAttribute('data-add');
      c[id] = (c[id] || 0) + 1; saveCart(c);
      $('#shop-status').textContent = prod(id).n + ' added to demo cart. Cart now has ' + cartCount() + ' item' + (cartCount() === 1 ? '' : 's') + '.';
    });
  });
  var root = $('#cart-root');
  function renderCart(msg) {
    var c = loadCart(), ids = Object.keys(c).filter(function (k) { return c[k] > 0 && prod(k); });
    root.textContent = '';
    if (!ids.length) {
      root.innerHTML = '<div class="empty-state"><h2>Your cart is empty</h2><p><a href="shop.html">Browse the shop</a></p></div>';
      $('#cart-status').textContent = msg || '';
      return;
    }
    var total = 0, h = '<table><caption class="visually-hidden">Demo cart contents</caption><thead><tr><th scope="col">Item</th><th scope="col">Quantity</th><th scope="col">Price</th><th scope="col">Remove</th></tr></thead><tbody>';
    ids.forEach(function (id) {
      var p = prod(id), line = p.p * c[id]; total += line;
      h += '<tr><th scope="row">' + p.n + '</th><td><label class="visually-hidden" for="q-' + id + '">Quantity for ' + p.n + '</label><input id="q-' + id + '" data-qty="' + id + '" type="number" min="1" max="20" value="' + c[id] + '"></td><td>$' + line + '.00</td><td><button type="button" data-remove="' + id + '">Remove<span class="visually-hidden"> ' + p.n + '</span></button></td></tr>';
    });
    h += '</tbody><tfoot><tr><th scope="row" colspan="2">Subtotal (demo)</th><td colspan="2">$' + total + '.00</td></tr></tfoot></table>';
    h += '<p><button type="button" id="checkout">Place demo order</button></p>';
    root.innerHTML = h;
    $('#cart-status').textContent = msg || '';
    $$('[data-qty]', root).forEach(function (i) {
      i.addEventListener('change', function () {
        var v = parseInt(i.value, 10), cc = loadCart();
        if (!(v >= 1)) v = 1; if (v > 20) v = 20;
        cc[i.getAttribute('data-qty')] = v; saveCart(cc); renderCart('Quantity updated.');
        var again = document.getElementById('q-' + i.getAttribute('data-qty')); if (again) again.focus();
      });
    });
    $$('[data-remove]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var cc = loadCart(); delete cc[b.getAttribute('data-remove')]; saveCart(cc);
        renderCart('Item removed.');
        var n = $('#cart-root button, #cart-root a'); if (n) n.focus();
      });
    });
    $('#checkout').addEventListener('click', function () {
      saveCart({});
      root.innerHTML = '<div class="demo-success" tabindex="-1" id="order-done"><h2>Demo order placed</h2><p>This was a simulation. No payment was taken and nothing will be made or shipped.</p><p><a href="shop.html">Back to the shop</a></p></div>';
      $('#order-done').focus();
    });
  }
  if (root) renderCart();

  /* ---------- gallery lightbox ---------- */
  var lb = $('#lightbox');
  if (lb && lb.showModal) {
    var opener = null;
    $$('.thumb').forEach(function (t) {
      t.addEventListener('click', function () {
        opener = t; $('#lb-img').src = t.getAttribute('data-full'); $('#lb-img').alt = t.getAttribute('data-alt');
        $('#lb-cap').textContent = t.getAttribute('data-alt'); lb.showModal();
      });
    });
    $('#lb-close').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('close', function () { if (opener) opener.focus(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  }

  /* ---------- form validation (all forms are demos) ---------- */
  function labelOf(f) { var l = document.querySelector('label[for="' + f.id + '"]'); return l ? l.textContent.replace(/\s*\(optional\)/, '') : f.name; }
  function msgFor(f) {
    var v = (f.value || '').trim();
    if (f.required && !v) return f.tagName === 'SELECT' ? 'Choose an option for ' + labelOf(f) + '.' : 'Enter ' + labelOf(f).toLowerCase() + '.';
    if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter an email address like name@example.com.';
    if (f.type === 'number' && v) {
      var n = Number(v);
      if (isNaN(n) || (f.min && n < +f.min) || (f.max && n > +f.max)) return 'Enter a number between ' + f.min + ' and ' + f.max + '.';
    }
    if (f.hasAttribute('data-future') && v) {
      var t = new Date(); t.setHours(0, 0, 0, 0);
      var p = v.split('-'); if (new Date(+p[0], +p[1] - 1, +p[2]) < t) return 'Choose today or a later date.';
    }
    return '';
  }
  $$('form[data-validate]').forEach(function (form) {
    var summary = $('.error-summary', form), status = $('[data-status]', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = [];
      $$('input, select, textarea', form).forEach(function (f) {
        var old = document.getElementById(f.id + '-error'); if (old) old.remove();
        f.removeAttribute('aria-invalid');
        var d = (f.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== f.id + '-error'; });
        var m = msgFor(f);
        if (m) {
          var p = document.createElement('p'); p.className = 'field-error'; p.id = f.id + '-error'; p.textContent = m;
          f.parentNode.appendChild(p); f.setAttribute('aria-invalid', 'true'); d.push(p.id); errs.push({ f: f, m: m });
        }
        if (d.length) f.setAttribute('aria-describedby', d.join(' ')); else f.removeAttribute('aria-describedby');
      });
      status.textContent = '';
      if (errs.length) {
        summary.innerHTML = '<h2>There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with this form</h2><ul></ul>';
        errs.forEach(function (x) {
          var li = document.createElement('li'), a = document.createElement('a');
          a.href = '#' + x.f.id; a.textContent = x.m;
          a.addEventListener('click', function (ev) { ev.preventDefault(); x.f.focus(); });
          li.appendChild(a); $('ul', summary).appendChild(li);
        });
        summary.hidden = false; summary.focus();
        return;
      }
      summary.hidden = true; summary.textContent = '';
      var kind = form.getAttribute('data-demo-form');
      var text = {
        newsletter: 'Demo only: thanks, but no subscription was created and nothing was stored.',
        reservation: 'Demo only: your request was not sent and no table is held. Walk-ins are always welcome.',
        gathering: 'Demo only: your inquiry was not sent. No one will contact you.'
      }[kind];
      form.reset();
      status.textContent = text;
      status.classList.add('demo-success');
    });
  });

  var dt = $('#r-date');
  if (dt) { var n = new Date(); dt.min = n.getFullYear() + '-' + ('0' + (n.getMonth() + 1)).slice(-2) + '-' + ('0' + n.getDate()).slice(-2); }
  updateCartLink();
})();
