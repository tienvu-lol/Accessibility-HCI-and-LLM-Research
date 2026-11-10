/* ==========================================================================
   PORT-03 - Juno Salvi (fictional motion & 3D designer)
   Protocol: WEB-REPLICA-V1.0 | Source of structure: https://andreaswannerstedt.se/

   PART A - site data (availability, work, notes, rates, reel, search index)
   PART B - behaviour: small named features pushed onto a registry, run on load.

   No libraries are used. The dropdown, slide-in navigation and disclosures
   are implemented in initUI() with browser APIs only, as RULES.md section 2
   requires. The project carousel is hand-written too, so its pause control
   and announcements behave exactly as this baseline needs.

   Everything a server would normally do (enquiries, newsletter, quotes) is
   simulated in the browser and says so on screen.
   ========================================================================== */

/* ---------------------------------------------------------------- PART A */

var SITE = {
  person: 'Juno Salvi',
  role: '3D & motion designer',
  city: 'Stockholm',
  timeZone: 'Europe/Stockholm',
  email: 'studio@junosalvi.example',

  /* Studio hours, local. 0 = Sunday. */
  hours: { 0: null, 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 15], 6: null },

  availability: {
    state: 'open',
    headline: 'Booking from February 2027',
    lead: '4–6 weeks',
    kinds: 'Loops, product films, installations',
    note: 'Two slots a quarter, kept deliberately small'
  },

  /* Rates used by the estimator on services.html. All invented. */
  rates: {
    loop:        { label: 'Looping animation', base: 4200, perSecond: 260 },
    product:     { label: 'Product film',      base: 9800, perSecond: 420 },
    installation:{ label: 'Installation loop', base: 15500, perSecond: 310 },
    titles:      { label: 'Title sequence',    base: 7400, perSecond: 380 }
  },
  revisionCost: 850,
  rushMultiplier: 1.35,

  reel: [
    { t: '0:00', title: 'Opening: Brass Pendulum', note: 'Loop, personal work, 2026' },
    { t: '0:12', title: 'Nordvik hand-held studies', note: 'Product film, 2026' },
    { t: '0:31', title: 'Terminal 4 arrivals wall', note: 'Installation, 2025' },
    { t: '0:52', title: 'Marble Parade titles', note: 'Title sequence, 2025' },
    { t: '1:09', title: 'Satisfying Objects vol. 6', note: 'Loop series, 2024' },
    { t: '1:28', title: 'Closing plate', note: 'Personal work, 2026' }
  ],

  searchIndex: [
    { title: 'Home', url: 'index.html', type: 'Page', text: 'juno salvi 3d motion designer stockholm loops product films installations showreel' },
    { title: 'Work', url: 'work.html', type: 'Page', text: 'projects grid list filter loops commercial installation titles experiments search' },
    { title: 'Showreel', url: 'reel.html', type: 'Page', text: 'reel video chapters 2026 playlist demo player' },
    { title: 'Services', url: 'services.html', type: 'Page', text: 'services packages rates estimate quote loops product film installation titles' },
    { title: 'Studio', url: 'about.html', type: 'Page', text: 'about studio biography process tools clients awards stockholm' },
    { title: 'Notes', url: 'notes.html', type: 'Page', text: 'journal writing render loops process notes' },
    { title: 'Contact', url: 'contact.html', type: 'Page', text: 'enquiry brief booking email availability stockholm' },
    { title: 'Accessibility', url: 'accessibility.html', type: 'Page', text: 'accessibility statement wcag 2.2 aa motion control reduced motion' },
    { title: 'Colophon', url: 'colophon.html', type: 'Page', text: 'how this site is built stack no build step placeholders' },
    { title: 'Brass Pendulum', url: 'project-brass-pendulum.html', type: 'Project', text: 'loop personal work brass metal pendulum satisfying case study' },
    { title: 'Nordvik Handheld', url: 'project-nordvik-handheld.html', type: 'Project', text: 'product film commercial nordvik device render case study' },
    { title: 'Terminal 4 Arrivals', url: 'project-terminal-four.html', type: 'Project', text: 'installation airport arrivals wall screens loop case study' },
    { title: 'Marble Parade', url: 'project-marble-parade.html', type: 'Project', text: 'title sequence festival marble parade typography case study' },
    { title: 'Satisfying Objects', url: 'project-satisfying-objects.html', type: 'Project', text: 'loop series personal work objects satisfying case study' },
    { title: 'Why I render at half speed', url: 'note-half-speed.html', type: 'Note', text: 'process render loops timing notes' },
    { title: 'A loop is a promise', url: 'note-a-loop-is-a-promise.html', type: 'Note', text: 'loops craft seam timing notes' },
    { title: 'Motion that asks permission', url: 'note-motion-permission.html', type: 'Note', text: 'accessibility reduced motion autoplay pause control notes' }
  ]
};

/* ---------------------------------------------------------------- PART B */

var FEATURES = [];
function feature(name, fn) { FEATURES.push({ name: name, fn: fn }); }

function $1(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
}
function listen(el, type, fn) { if (el) { el.addEventListener(type, fn); } }
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function query(name) {
  var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
  return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
}
function prefersReduced() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function money(n) {
  return '€' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* ==========================================================================
   UI widgets - replaces Bootstrap's JavaScript
   --------------------------------------------------------------------------
   RULES.md section 2 prohibits Bootstrap, jQuery and every other UI library,
   so the three widgets this site used are implemented here with browser APIs
   only. Self-contained and identical across replicas: it reads data-ui
   attributes and keeps aria-expanded, focus and Escape behaviour correct.

     data-ui="dropdown-toggle"  aria-controls="<menu id>"
     data-ui="panel-open"       aria-controls="<panel id>"   (slide-in nav)
     data-ui="panel-close"      inside the panel
     data-ui="disclosure"       aria-controls="<region id>"  (collapse/accordion)

   The panel behaves as an overlay only below 992px; above that the same
   markup is ordinary inline navigation, so nothing is trapped or hidden.
   ========================================================================== */

function initUI() {
  var docEl = document.documentElement;
  var pick = function (sel, root) { return (root || document).querySelector(sel); };
  var pickAll = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /* -- dropdown menus ----------------------------------------------------- */

  var openMenu = null;

  function closeMenu(returnFocus) {
    if (!openMenu) { return; }
    var toggle = openMenu.toggle, menu = openMenu.menu;
    menu.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
    openMenu = null;
    if (returnFocus) { toggle.focus(); }
  }

  pickAll('[data-ui="dropdown-toggle"]').forEach(function (toggle) {
    var menu = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!menu) { return; }
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.contains('show');
      closeMenu(false);
      if (!isOpen) {
        menu.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
        openMenu = { toggle: toggle, menu: menu };
      }
    });

    menu.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { closeMenu(true); }
    });
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && openMenu) { closeMenu(true); }
  });

  document.addEventListener('click', function (ev) {
    if (!openMenu) { return; }
    if (openMenu.menu.contains(ev.target) || openMenu.toggle.contains(ev.target)) { return; }
    closeMenu(false);
  });

  document.addEventListener('focusin', function (ev) {
    if (!openMenu) { return; }
    if (openMenu.menu.contains(ev.target) || openMenu.toggle.contains(ev.target)) { return; }
    closeMenu(false);
  });

  /* -- slide-in panel ----------------------------------------------------- */

  var overlay = window.matchMedia('(max-width: 991.98px)');
  var openPanel = null;
  var backdrop = null;

  function panelIsOverlay() { return overlay.matches; }

  function closePanel(returnFocus) {
    if (!openPanel) { return; }
    var panel = openPanel.panel, opener = openPanel.opener;
    panel.classList.remove('show');
    if (opener) { opener.setAttribute('aria-expanded', 'false'); }
    if (backdrop && backdrop.parentNode) { backdrop.parentNode.removeChild(backdrop); }
    backdrop = null;
    document.body.classList.remove('ui-locked');
    openPanel = null;
    if (returnFocus && opener) { opener.focus(); }
  }

  function trapTab(ev) {
    if (!openPanel || ev.key !== 'Tab') { return; }
    var items = pickAll(FOCUSABLE, openPanel.panel).filter(function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
    if (!items.length) { return; }
    var first = items[0], last = items[items.length - 1];
    if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  }

  pickAll('[data-ui="panel-open"]').forEach(function (opener) {
    var panel = document.getElementById(opener.getAttribute('aria-controls'));
    if (!panel) { return; }
    opener.setAttribute('aria-expanded', 'false');

    opener.addEventListener('click', function () {
      if (!panelIsOverlay()) { return; }
      panel.classList.add('show');
      opener.setAttribute('aria-expanded', 'true');
      backdrop = document.createElement('div');
      backdrop.className = 'ui-backdrop';
      backdrop.addEventListener('click', function () { closePanel(true); });
      /* The panel usually sits inside a sticky header, which is its own
         stacking context. A backdrop appended to <body> would paint over the
         panel and swallow its clicks, so it goes next to the panel instead. */
      (panel.parentNode || document.body).insertBefore(backdrop, panel);
      document.body.classList.add('ui-locked');
      openPanel = { panel: panel, opener: opener };
      var first = pick(FOCUSABLE, panel);
      if (first) { first.focus(); }
    });
  });

  pickAll('[data-ui="panel-close"]').forEach(function (btn) {
    btn.addEventListener('click', function () { closePanel(true); });
  });

  document.addEventListener('keydown', function (ev) {
    if (!openPanel) { return; }
    if (ev.key === 'Escape') { closePanel(true); }
    trapTab(ev);
  });

  /* A panel left open while the viewport grows past the breakpoint would
     otherwise keep the backdrop and the scroll lock. */
  if (overlay.addEventListener) {
    overlay.addEventListener('change', function (ev) {
      if (!ev.matches) { closePanel(false); }
    });
  }

  /* -- disclosures: collapse panels and accordions ------------------------ */

  pickAll('[data-ui="disclosure"]').forEach(function (btn) {
    var region = document.getElementById(btn.getAttribute('aria-controls'));
    if (!region) { return; }
    if (!btn.hasAttribute('aria-expanded')) {
      btn.setAttribute('aria-expanded', region.classList.contains('show') ? 'true' : 'false');
    }
    btn.addEventListener('click', function () {
      var isOpen = region.classList.contains('show');
      region.classList.toggle('show', !isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  /* -- dialogs ------------------------------------------------------------ */

  pickAll('dialog.ui-dialog').forEach(function (dlg) {
    pickAll('[data-ui="dialog-close"]', dlg).forEach(function (btn) {
      btn.addEventListener('click', function () { dlg.close(); });
    });
    /* Clicking the backdrop (the dialog element itself) closes it. */
    dlg.addEventListener('click', function (ev) { if (ev.target === dlg) { dlg.close(); } });
  });
}

feature('ui-widgets', initUI);

/* -- motion control --------------------------------------------------------
   A single switch for every looping animation on the page (WCAG 2.2.2). It
   starts paused when the visitor asks for reduced motion, and the CSS also
   removes the animations outright in that case, so the control is a
   convenience rather than the only line of defence. */

feature('motion-control', function () {
  var buttons = $all('[data-component="motion-toggle"]');
  if (!buttons.length) { return; }
  var root = document.documentElement;
  var paused = prefersReduced();

  function paint() {
    root.setAttribute('data-motion', paused ? 'paused' : 'playing');
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      var label = $1('[data-motion-label]', btn);
      if (label) { label.textContent = paused ? 'Motion off' : 'Motion on'; }
      btn.setAttribute('title', paused ? 'Start the looping animations' : 'Stop the looping animations');
    });
    var live = $1('#motion-status');
    if (live) { live.textContent = paused ? 'Looping animations paused.' : 'Looping animations playing.'; }
  }

  buttons.forEach(function (btn) {
    listen(btn, 'click', function () { paused = !paused; paint(); });
  });
  paint();
});

/* -- studio clock and availability ----------------------------------------- */

feature('clock', function () {
  if (!$1('[data-component="local-time"], [data-component="availability-badge"], [data-component="studio-state"]')) {
    return;
  }

  function forced() {
    return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(query('demo-time'));
  }

  function parts() {
    var f = forced();
    if (f) {
      var h = parseInt(f[4], 10), mi = parseInt(f[5], 10);
      return {
        label: ('0' + h).slice(-2) + ':' + ('0' + mi).slice(-2),
        hour: h, minute: mi,
        day: new Date(Date.UTC(+f[1], f[2] - 1, +f[3])).getUTCDay()
      };
    }
    var now = new Date();
    try {
      var got = {};
      new Intl.DateTimeFormat('en-GB', {
        timeZone: SITE.timeZone, hour: '2-digit', minute: '2-digit',
        weekday: 'short', hour12: false
      }).formatToParts(now).forEach(function (p) { got[p.type] = p.value; });
      return {
        label: got.hour + ':' + got.minute,
        hour: parseInt(got.hour, 10) % 24,
        minute: parseInt(got.minute, 10),
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(got.weekday)
      };
    } catch (e) {
      return { label: ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2),
        hour: now.getHours(), minute: now.getMinutes(), day: now.getDay() };
    }
  }

  function paint() {
    var p = parts();
    var win = SITE.hours[p.day];
    var inStudio = !!win && (p.hour + p.minute / 60) >= win[0] && (p.hour + p.minute / 60) < win[1];

    $all('[data-component="local-time"]').forEach(function (el) {
      el.textContent = p.label + ' in ' + SITE.city;
    });
    $all('[data-component="studio-state"]').forEach(function (el) {
      el.setAttribute('data-state', inStudio ? 'in-studio' : 'away');
      el.textContent = inStudio ? 'In the studio' : 'Out of the studio';
    });
    $all('[data-component="availability-badge"]').forEach(function (el) {
      var open = SITE.availability.state === 'open';
      el.setAttribute('data-state', open ? (inStudio ? 'open' : 'away') : 'closed');
      el.textContent = open
        ? (inStudio ? 'Booking · in the studio now' : 'Booking · replies next working day')
        : 'Fully booked';
    });
    return !!forced();
  }

  if (!paint()) { window.setInterval(paint, 60000); }
});

/* -- copy to clipboard ------------------------------------------------------ */

feature('copy', function () {
  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', 'readonly');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  $all('[data-component="copy-button"]').forEach(function (btn) {
    listen(btn, 'click', function () {
      var value = btn.getAttribute('data-copy') || SITE.email;
      var label = btn.getAttribute('data-label') || 'Value';
      var status = document.getElementById(btn.getAttribute('data-status'));
      function done(ok) {
        if (!status) { return; }
        status.textContent = ok
          ? label + ' copied: ' + value
          : 'The browser blocked copying. The value is ' + value;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done(true); },
          function () { done(fallback(value)); });
      } else { done(fallback(value)); }
    });
  });
});

/* -- forms ------------------------------------------------------------------ */

feature('forms', function () {
  function problem(field) {
    var label = field.getAttribute('data-label') || 'This field';
    var kind = field.getAttribute('data-validate') || '';
    var value = field.value || '';
    if (field.type === 'checkbox') {
      return (field.required && !field.checked) ? label + ' must be ticked to continue.' : '';
    }
    if (field.required && !value.trim()) { return label + ' is required.'; }
    if (value.trim() && kind === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
      return 'Enter an email address in the form name@example.com.';
    }
    if (value.trim() && kind === 'brief' && value.trim().length < 12) {
      return 'A sentence or two, please — at least a dozen characters.';
    }
    return '';
  }

  function show(field, message) {
    var slot = null;
    (field.getAttribute('aria-describedby') || '').split(' ').forEach(function (id) {
      if (/-error$/.test(id)) { slot = document.getElementById(id); }
    });
    if (slot) { slot.textContent = message; }
    if (message) { field.setAttribute('aria-invalid', 'true'); }
    else { field.removeAttribute('aria-invalid'); }
  }

  $all('form[data-form]').forEach(function (form) {
    var name = form.getAttribute('data-form');
    var fields = $all('[data-label]', form);
    var summary = $1('[data-component="error-summary"]', form);
    var list = summary ? $1('ul', summary) : null;
    var success = $1('[data-component="success-panel"]', form.parentNode);
    var live = $1('[data-component="form-status"]', form.parentNode);

    fields.forEach(function (field) {
      listen(field, 'blur', function () { show(field, problem(field)); });
      listen(field, 'input', function () {
        if (field.getAttribute('aria-invalid') === 'true') { show(field, problem(field)); }
      });
    });

    listen(form, 'submit', function (ev) {
      ev.preventDefault();
      var bad = [];
      fields.forEach(function (field) {
        var message = problem(field);
        show(field, message);
        if (message) { bad.push({ id: field.id, message: message }); }
      });

      if (bad.length && summary && list) {
        list.innerHTML = bad.map(function (b) {
          return '<li><a href="#' + escapeHtml(b.id) + '">' + escapeHtml(b.message) + '</a></li>';
        }).join('');
        summary.hidden = false;
        summary.setAttribute('tabindex', '-1');
        summary.focus();
        $all('a', summary).forEach(function (link) {
          listen(link, 'click', function (e) {
            e.preventDefault();
            var target = document.getElementById(link.getAttribute('href').slice(1));
            if (target) { target.focus(); }
          });
        });
        return;
      }

      if (summary) { summary.hidden = true; }
      var ref = name.toUpperCase().slice(0, 2) + '-' + (Math.floor(Math.random() * 9000) + 1000);
      if (success) {
        var refSlot = $1('[data-ref]', success);
        if (refSlot) { refSlot.textContent = ref; }
        var echo = $1('[data-echo]', success);
        if (echo) {
          var mail = $1('[data-validate="email"]', form);
          echo.textContent = mail ? mail.value.trim() : SITE.email;
        }
        form.hidden = true;
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
      if (live) {
        live.textContent = 'Demo only: ' + name + ' accepted, reference ' + ref + '. Nothing was sent.';
      }
    });
  });
});

/* -- work grid: category filter, search, grid/list view --------------------- */

feature('work-grid', function () {
  var grid = $1('[data-component="work-grid"]');
  if (!grid) { return; }

  var tiles = $all('[data-project]', grid);
  var chips = $all('[data-component="filter-chip"]');
  var search = $1('[data-component="work-search"]');
  var count = $1('[data-component="result-count"]');
  var empty = $1('[data-component="empty-state"]');
  var views = $all('[data-component="view-button"]');
  var active = query('kind') || 'all';
  var view = 'grid';

  function apply() {
    var q = search ? search.value.trim().toLowerCase() : '';
    var shown = 0;
    tiles.forEach(function (tile) {
      var kind = tile.getAttribute('data-kind');
      var hay = (tile.getAttribute('data-search') || '').toLowerCase();
      var ok = (active === 'all' || kind === active) && (!q || hay.indexOf(q) > -1);
      tile.hidden = !ok;
      if (ok) { shown++; }
    });
    chips.forEach(function (chip) {
      chip.setAttribute('aria-pressed', chip.getAttribute('data-kind') === active ? 'true' : 'false');
    });
    if (count) {
      count.textContent = shown + (shown === 1 ? ' project' : ' projects') +
        (active === 'all' ? '' : ' in ' + active) +
        (q ? ' matching “' + q + '”' : '') +
        ', ' + view + ' view';
    }
    if (empty) { empty.hidden = shown !== 0; }
  }

  function setView(next) {
    view = next;
    grid.setAttribute('data-view', next);
    views.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-view') === next ? 'true' : 'false');
    });
    apply();
  }

  chips.forEach(function (chip) {
    listen(chip, 'click', function () { active = chip.getAttribute('data-kind'); apply(); });
  });
  views.forEach(function (btn) {
    listen(btn, 'click', function () { setView(btn.getAttribute('data-view')); });
  });
  if (search) {
    listen(search, 'input', apply);
    listen(search.form, 'submit', function (e) { e.preventDefault(); apply(); });
  }
  setView('grid');
});

/* -- case-study carousel ----------------------------------------------------
   Hand-written so that it never autoplays under reduced motion, always has a
   visible pause control, and announces each slide in a polite live region. */

feature('carousel', function () {
  var root = $1('[data-component="carousel"]');
  if (!root) { return; }

  var slides = $all('[data-slide]', root);
  var prev = $1('[data-component="carousel-prev"]', root);
  var next = $1('[data-component="carousel-next"]', root);
  var toggle = $1('[data-component="carousel-toggle"]', root);
  var caption = $1('[data-component="carousel-caption"]', root);
  var live = $1('[data-component="carousel-status"]', root);
  var dots = $all('[data-component="carousel-dot"]', root);
  var index = 0;
  var timer = null;
  var playing = false;

  function paint() {
    slides.forEach(function (slide, i) { slide.hidden = i !== index; });
    dots.forEach(function (dot, i) {
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
    if (caption) { caption.textContent = slides[index].getAttribute('data-caption') || ''; }
    if (live) {
      live.textContent = 'Image ' + (index + 1) + ' of ' + slides.length + ': ' +
        (slides[index].getAttribute('data-caption') || '');
    }
  }

  function go(step) {
    index = (index + step + slides.length) % slides.length;
    paint();
  }

  function stop() {
    playing = false;
    if (timer) { window.clearInterval(timer); timer = null; }
    if (toggle) {
      toggle.setAttribute('aria-pressed', 'false');
      toggle.textContent = 'Play slideshow';
    }
  }

  function start() {
    if (prefersReduced()) { return; }
    playing = true;
    timer = window.setInterval(function () { go(1); }, 5000);
    if (toggle) {
      toggle.setAttribute('aria-pressed', 'true');
      toggle.textContent = 'Pause slideshow';
    }
  }

  listen(prev, 'click', function () { stop(); go(-1); });
  listen(next, 'click', function () { stop(); go(1); });
  dots.forEach(function (dot, i) {
    listen(dot, 'click', function () { stop(); index = i; paint(); });
  });
  listen(toggle, 'click', function () { if (playing) { stop(); } else { start(); } });
  listen(root, 'mouseenter', function () { if (playing) { stop(); } });
  listen(root, 'focusin', function () { if (playing) { stop(); } });
  listen(root, 'keydown', function (ev) {
    if (ev.key === 'ArrowLeft') { stop(); go(-1); }
    if (ev.key === 'ArrowRight') { stop(); go(1); }
  });

  paint();
  stop();   /* never autoplay on load: the visitor starts it (WCAG 2.2.2) */
});

/* -- showreel: chapter buttons drive a demo "player" ------------------------ */

feature('reel', function () {
  var stage = $1('[data-component="reel-stage"]');
  if (!stage) { return; }
  var nowPlaying = $1('[data-component="reel-now"]');
  var live = $1('[data-component="reel-status"]');

  function announce(chapter) {
    if (nowPlaying) {
      nowPlaying.textContent = chapter.title + ' — ' + chapter.t;
    }
    if (live) {
      live.textContent = 'Demo player: cued ' + chapter.title + ' at ' + chapter.t +
        '. No video file is bundled with this replica.';
    }
  }

  $all('[data-component="chapter-button"]').forEach(function (btn, i) {
    listen(btn, 'click', function () {
      var chapter = SITE.reel[i] || { title: btn.textContent, t: '0:00' };
      announce(chapter);
      $all('[data-component="chapter-button"]').forEach(function (b) {
        b.setAttribute('aria-current', b === btn ? 'true' : 'false');
      });
    });
  });

  $all('[data-component="reel-play"]').forEach(function (btn) {
    listen(btn, 'click', function () { announce(SITE.reel[0]); });
  });
});

/* -- services: estimate calculator ------------------------------------------ */

feature('estimator', function () {
  var form = $1('[data-component="estimator"]');
  if (!form) { return; }

  var kind = $1('#est-kind', form);
  var seconds = $1('#est-seconds', form);
  var revisions = $1('#est-revisions', form);
  var rush = $1('#est-rush', form);
  var out = $1('[data-component="estimate-output"]');
  var low = $1('[data-estimate-low]');
  var high = $1('[data-estimate-high]');
  var detail = $1('[data-estimate-detail]');

  function recalc() {
    var rate = SITE.rates[kind.value] || SITE.rates.loop;
    var secs = Math.max(3, Math.min(120, parseInt(seconds.value, 10) || 10));
    var revs = Math.max(0, Math.min(6, parseInt(revisions.value, 10) || 0));
    var base = rate.base + rate.perSecond * secs + SITE.revisionCost * revs;
    if (rush.checked) { base *= SITE.rushMultiplier; }
    var lowValue = base * 0.9;
    var highValue = base * 1.25;

    if (low) { low.textContent = money(lowValue); }
    if (high) { high.textContent = money(highValue); }
    if (detail) {
      detail.textContent = rate.label + ', ' + secs + ' seconds, ' + revs +
        (revs === 1 ? ' revision round' : ' revision rounds') +
        (rush.checked ? ', rush timeline' : '') + '.';
    }
    if (out) { out.hidden = false; }
  }

  [kind, seconds, revisions, rush].forEach(function (el) {
    listen(el, 'input', recalc);
    listen(el, 'change', recalc);
  });
  listen(form, 'submit', function (ev) { ev.preventDefault(); recalc(); });
  recalc();
});

/* -- site search ------------------------------------------------------------- */

feature('site-search', function () {
  var results = $1('[data-component="search-results"]');
  if (!results) { return; }
  var input = $1('[data-component="site-search-input"]');
  var summary = $1('[data-component="search-summary"]');
  var q = query('q');
  if (input && q) { input.value = q; }

  function render(term) {
    term = (term || '').trim().toLowerCase();
    if (!term) {
      summary.textContent = 'Type a word to search ' + SITE.searchIndex.length + ' pages, projects and notes.';
      results.innerHTML = '';
      return;
    }
    var hits = SITE.searchIndex.map(function (e) {
      var t = e.title.toLowerCase();
      var score = t.indexOf(term) === 0 ? 3 : (t.indexOf(term) > -1 ? 2 :
        ((e.title + ' ' + e.text).toLowerCase().indexOf(term) > -1 ? 1 : 0));
      return { e: e, score: score };
    }).filter(function (h) { return h.score > 0; })
      .sort(function (a, b) { return b.score - a.score; });

    summary.textContent = hits.length
      ? hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + term + '”'
      : 'No matches for “' + term + '”. Try "loop", "installation" or "rates".';

    results.innerHTML = hits.map(function (h) {
      return '<li><a href="' + escapeHtml(h.e.url) + '">' +
        '<span class="when">' + escapeHtml(h.e.type) + '</span>' +
        '<span><h3>' + escapeHtml(h.e.title) + '</h3>' +
        '<p>' + escapeHtml(h.e.text.slice(0, 90)) + '…</p></span></a></li>';
    }).join('');
  }

  render(q);
  if (input) {
    listen(input, 'input', function () { render(input.value); });
    listen(input.form, 'submit', function (e) { e.preventDefault(); render(input.value); });
  }
});

/* -- odds and ends ----------------------------------------------------------- */

feature('stamps', function () {
  $all('[data-component="year-stamp"]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
  $all('[data-count="search-entries"]').forEach(function (el) {
    el.textContent = String(SITE.searchIndex.length);
  });
  $all('[data-component="to-top"]').forEach(function (link) {
    listen(link, 'click', function (ev) {
      ev.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' });
      var skip = $1('.skip-link');
      if (skip) { skip.focus(); }
    });
  });
});

/* -- run --------------------------------------------------------------------- */

document.documentElement.className += ' js';
FEATURES.forEach(function (f) {
  try {
    f.fn();
  } catch (err) {
    /* One broken feature must never take the rest of the page with it. */
    if (window.console && window.console.warn) {
      window.console.warn('feature failed: ' + f.name, err);
    }
  }
});
