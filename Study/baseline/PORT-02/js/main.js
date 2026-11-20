/* ==========================================================================
   PORT-02 - Priya Raman (fictional personal portfolio)
   Protocol: WEB-REPLICA-V1.0 | Source of structure: https://brittanychiang.com/

   PART A - site data (availability, featured work, archive, writing, search)
   PART B - behaviour, as a small module object of named init functions.

   No libraries are used. The dropdown, slide-in navigation and disclosures
   are implemented in initUI() with browser APIs only, as RULES.md section 2
   requires, and the lightbox uses the native <dialog> element.

   Anything that would need a server (enquiry form, newsletter) is simulated
   in memory and says so.
   ========================================================================== */

/* ---------------------------------------------------------------- PART A */

var SITE = {
  person: 'Priya Raman',
  role: 'Senior frontend engineer, accessibility',
  employer: 'Keelpoint',
  city: 'Boston, Massachusetts',
  timeZone: 'America/New_York',
  email: 'priya@ramanbuilds.example',
  themeKey: 'pr-theme',

  /* Local working hours used by the availability badge. 0 = Sunday. */
  hours: { 0: null, 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 16], 6: null },

  availability: {
    state: 'open',
    headline: 'Open to a senior frontend or design-engineering role',
    detail: 'Boston or remote in US Eastern time',
    notice: '6 weeks',
    interests: 'Design systems, accessibility, developer tooling'
  },

  featured: [
    { id: 'fretboard', title: 'Fretboard', year: 2026, url: 'project-fretboard.html',
      tech: ['TypeScript', 'Canvas', 'Web Audio'],
      stat: '11k monthly players',
      blurb: 'A guitar-tab editor that plays what you write. Runs offline, weighs 48 KB, and every control is reachable from the keyboard.' },
    { id: 'umbra-theme', title: 'Umbra Theme', year: 2025, url: 'project-umbra-theme.html',
      tech: ['TextMate grammars', 'JSON', 'WCAG'],
      stat: '124k installs',
      blurb: 'An editor theme built contrast-first: every token pair measured against its background, in both a dark and a light variant.' },
    { id: 'transit-clock', title: 'Transit Clock', year: 2025, url: 'project-transit-clock.html',
      tech: ['Web Components', 'SVG', 'ARIA live'],
      stat: '9 stations',
      blurb: 'A departures board for a hallway screen, legible at four metres, that announces changes politely instead of flashing them.' },
    { id: 'ramanbuilds-v4', title: 'ramanbuilds.example v4', year: 2024, url: 'project-ramanbuilds-v4.html',
      tech: ['HTML', 'CSS', 'Vanilla JS'],
      stat: '0 dependencies',
      blurb: 'This site: one stylesheet, one script, no build step, and a performance budget written into the README.' }
  ],

  /* The full archive table, mirroring the source site's /archive page. */
  archive: [
    { year: 2026, title: 'Fretboard', made: 'Personal', tech: ['TypeScript', 'Canvas', 'Web Audio'], href: 'project-fretboard.html', kind: 'case' },
    { year: 2026, title: 'Focus Order Inspector', made: 'Keelpoint', tech: ['JavaScript', 'DevTools'], href: 'https://github.com/', kind: 'ext' },
    { year: 2026, title: 'Keelpoint Design Tokens', made: 'Keelpoint', tech: ['CSS', 'JSON', 'Style Dictionary'], href: 'https://github.com/', kind: 'ext' },
    { year: 2025, title: 'Umbra Theme', made: 'Personal', tech: ['TextMate grammars', 'JSON', 'WCAG'], href: 'project-umbra-theme.html', kind: 'case' },
    { year: 2025, title: 'Transit Clock', made: 'Personal', tech: ['Web Components', 'SVG', 'ARIA live'], href: 'project-transit-clock.html', kind: 'case' },
    { year: 2025, title: 'Keyboard Map', made: 'Keelpoint', tech: ['JavaScript', 'Testing'], href: 'https://github.com/', kind: 'ext' },
    { year: 2024, title: 'ramanbuilds.example v4', made: 'Personal', tech: ['HTML', 'CSS', 'Vanilla JS'], href: 'project-ramanbuilds-v4.html', kind: 'case' },
    { year: 2024, title: 'Tidemark Component Library', made: 'Tidemark', tech: ['React', 'CSS', 'Storybook'], href: 'https://github.com/', kind: 'ext' },
    { year: 2024, title: 'Contrast Pair', made: 'Personal', tech: ['JavaScript', 'WCAG'], href: 'https://codepen.io/', kind: 'ext' },
    { year: 2023, title: 'Tidemark Checkout Rebuild', made: 'Tidemark', tech: ['TypeScript', 'React'], href: 'https://github.com/', kind: 'ext' },
    { year: 2023, title: 'Reduced Motion Audit Script', made: 'Personal', tech: ['JavaScript', 'Playwright'], href: 'https://github.com/', kind: 'ext' },
    { year: 2022, title: 'Lumen Editorial Templates', made: 'Lumen & Co', tech: ['HTML', 'CSS', 'Eleventy'], href: 'https://github.com/', kind: 'ext' },
    { year: 2021, title: 'Scoutline Case Study Engine', made: 'Scoutline', tech: ['PHP', 'CSS'], href: 'https://github.com/', kind: 'ext' },
    { year: 2020, title: 'Fieldhouse Scoreboard', made: 'Fieldhouse', tech: ['JavaScript', 'SVG'], href: 'https://codepen.io/', kind: 'ext' },
    { year: 2019, title: 'Brightwall Campaign Microsites', made: 'Brightwall', tech: ['HTML', 'CSS', 'jQuery'], href: 'https://github.com/', kind: 'ext' },
    { year: 2018, title: 'First Portfolio (v1)', made: 'Personal', tech: ['HTML', 'CSS'], href: 'https://github.com/', kind: 'ext' }
  ],

  posts: [
    { id: 'tab-order-is-a-product-decision', title: 'Tab order is a product decision',
      date: '2026-09-30', url: 'post-tab-order.html', tags: ['accessibility', 'process'], minutes: 8,
      excerpt: 'Nobody signs off on tab order, so it gets decided by the order someone happened to write the divs in.' },
    { id: 'shipping-a-theme-contrast-first', title: 'Shipping an editor theme contrast-first',
      date: '2026-06-18', url: 'post-contrast-first.html', tags: ['accessibility', 'craft'], minutes: 10,
      excerpt: 'I measured every token pair before picking a single hue. The theme got prettier, not uglier, which surprised me.' },
    { id: 'budgets-beat-opinions', title: 'Performance budgets beat opinions',
      date: '2026-03-05', url: 'post-budgets-beat-opinions.html', tags: ['performance', 'process'], minutes: 7,
      excerpt: 'A number in CI ends an argument that three senior engineers could not finish in two weeks.' },
    { id: 'the-component-nobody-uses', title: 'The component nobody uses',
      date: '2025-10-14', url: 'post-component-nobody-uses.html', tags: ['design-systems', 'craft'], minutes: 9,
      excerpt: 'Every design system has one: shipped, documented, adopted by nobody. Deleting it taught me more than building it.' }
  ],

  searchIndex: [
    { title: 'Home', url: 'index.html', type: 'Page', text: 'priya raman senior frontend engineer accessibility boston about experience projects writing' },
    { title: 'Project archive', url: 'archive.html', type: 'Page', text: 'archive table all projects sortable year made at built with filter search' },
    { title: 'Writing', url: 'writing.html', type: 'Page', text: 'articles notes essays accessibility performance design systems' },
    { title: 'About', url: 'about.html', type: 'Page', text: 'biography how i work accessibility practice mentoring boston' },
    { title: 'Resume', url: 'resume.html', type: 'Page', text: 'cv experience keelpoint tidemark lumen scoutline fieldhouse brightwall education skills download print' },
    { title: 'Uses', url: 'uses.html', type: 'Page', text: 'setup editor terminal hardware keyboard testing tools screen reader' },
    { title: 'Contact', url: 'contact.html', type: 'Page', text: 'hire email enquiry form availability notice period remote' },
    { title: 'Accessibility', url: 'accessibility.html', type: 'Page', text: 'accessibility statement wcag 2.2 aa keyboard screen reader known limits' },
    { title: 'Colophon', url: 'colophon.html', type: 'Page', text: 'how this site is built stack typefaces no build step performance budget' },
    { title: 'Fretboard', url: 'project-fretboard.html', type: 'Project', text: 'guitar tab editor canvas web audio typescript offline keyboard case study' },
    { title: 'Umbra Theme', url: 'project-umbra-theme.html', type: 'Project', text: 'editor theme contrast wcag tokens dark light installs case study' },
    { title: 'Transit Clock', url: 'project-transit-clock.html', type: 'Project', text: 'departures board web components svg aria live hallway screen case study' },
    { title: 'ramanbuilds.example v4', url: 'project-ramanbuilds-v4.html', type: 'Project', text: 'personal site one stylesheet one script no build step performance budget' },
    { title: 'Tab order is a product decision', url: 'post-tab-order.html', type: 'Writing', text: 'accessibility keyboard focus order process essay' },
    { title: 'Shipping an editor theme contrast-first', url: 'post-contrast-first.html', type: 'Writing', text: 'accessibility contrast colour theme craft essay' },
    { title: 'Performance budgets beat opinions', url: 'post-budgets-beat-opinions.html', type: 'Writing', text: 'performance budget ci process essay' },
    { title: 'The component nobody uses', url: 'post-component-nobody-uses.html', type: 'Writing', text: 'design systems adoption deletion craft essay' }
  ]
};

/* ---------------------------------------------------------------- PART B */

var APP = (function () {
  'use strict';

  var dom = {
    one: function (sel, root) { return (root || document).querySelector(sel); },
    all: function (sel, root) {
      return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    },
    on: function (el, type, fn) { if (el) { el.addEventListener(type, fn); } },
    esc: function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    param: function (name) {
      var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
      return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
    },
    reduced: function () {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    store: {
      get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
    }
  };

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

  /* -- theme ------------------------------------------------------------- */

  function theme() {
    var root = document.documentElement;
    var saved = dom.store.get(SITE.themeKey);
    if (saved === 'light' || saved === 'dark') { root.setAttribute('data-theme', saved); }

    function current() {
      var set = root.getAttribute('data-theme');
      if (set) { return set; }
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)
        ? 'light' : 'dark';
    }

    function paint() {
      var now = current();
      dom.all('[data-component="theme-toggle"]').forEach(function (btn) {
        var next = now === 'dark' ? 'light' : 'dark';
        btn.setAttribute('aria-pressed', now === 'light' ? 'true' : 'false');
        var label = dom.one('[data-theme-label]', btn);
        if (label) { label.textContent = now === 'dark' ? 'Dark' : 'Light'; }
        btn.setAttribute('title', 'Switch to the ' + next + ' theme');
        var sr = dom.one('[data-theme-sr]', btn);
        if (sr) { sr.textContent = ' theme, currently ' + now + '. Activate for the ' + next + ' theme.'; }
      });
    }

    dom.all('[data-component="theme-toggle"]').forEach(function (btn) {
      dom.on(btn, 'click', function () {
        var next = current() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        dom.store.set(SITE.themeKey, next);
        paint();
        var live = dom.one('#theme-status');
        if (live) { live.textContent = next === 'light' ? 'Light theme on.' : 'Dark theme on.'; }
      });
    });

    paint();
  }

  /* -- spotlight: a pointer-following glow, decorative only -------------- */

  function spotlight() {
    var layer = dom.one('[data-component="spotlight"]');
    if (!layer) { return; }
    if (dom.reduced() || !window.matchMedia('(hover: hover)').matches) {
      document.documentElement.setAttribute('data-spotlight', 'off');
      return;
    }
    var pending = false, x = 0, y = 0;
    dom.on(window, 'pointermove', function (ev) {
      x = ev.clientX; y = ev.clientY;
      if (pending) { return; }
      pending = true;
      window.requestAnimationFrame(function () {
        layer.style.setProperty('--spot-x', x + 'px');
        layer.style.setProperty('--spot-y', y + 'px');
        pending = false;
      });
    });
  }

  /* -- clock and availability -------------------------------------------- */

  function clock() {
    if (!dom.one('[data-component="local-time"], [data-component="availability-badge"], [data-component="desk-state"]')) {
      return;
    }

    function forced() {
      return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(dom.param('demo-time'));
    }

    function parts() {
      var f = forced();
      if (f) {
        var h = parseInt(f[4], 10), mi = parseInt(f[5], 10);
        return {
          label: (h % 12 === 0 ? 12 : h % 12) + ':' + ('0' + mi).slice(-2) + ' ' + (h < 12 ? 'am' : 'pm'),
          hour: h, minute: mi,
          day: new Date(Date.UTC(+f[1], f[2] - 1, +f[3])).getUTCDay()
        };
      }
      var now = new Date();
      try {
        var got = {};
        new Intl.DateTimeFormat('en-US', {
          timeZone: SITE.timeZone, hour: 'numeric', minute: '2-digit',
          weekday: 'short', hour12: true
        }).formatToParts(now).forEach(function (p) { got[p.type] = p.value; });
        var h24 = parseInt(new Intl.DateTimeFormat('en-US', {
          timeZone: SITE.timeZone, hour: 'numeric', hour12: false
        }).format(now), 10) % 24;
        return {
          label: got.hour + ':' + got.minute + ' ' + (got.dayPeriod || '').toLowerCase(),
          hour: h24, minute: parseInt(got.minute, 10),
          day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(got.weekday)
        };
      } catch (e) {
        return { label: now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2),
          hour: now.getHours(), minute: now.getMinutes(), day: now.getDay() };
      }
    }

    function paint() {
      var p = parts();
      var win = SITE.hours[p.day];
      var at = !!win && (p.hour + p.minute / 60) >= win[0] && (p.hour + p.minute / 60) < win[1];

      dom.all('[data-component="local-time"]').forEach(function (el) {
        el.textContent = p.label + ' in Boston';
      });
      dom.all('[data-component="desk-state"]').forEach(function (el) {
        el.setAttribute('data-state', at ? 'at-desk' : 'away');
        el.textContent = at ? 'At the keyboard' : 'Away from the keyboard';
      });
      dom.all('[data-component="availability-badge"]').forEach(function (el) {
        var open = SITE.availability.state === 'open';
        el.setAttribute('data-state', open ? (at ? 'open' : 'away') : 'closed');
        el.textContent = open
          ? (at ? 'Open to work · at the keyboard' : 'Open to work · replies within a day')
          : 'Not looking right now';
      });
      return !!forced();
    }

    if (!paint()) { window.setInterval(paint, 60000); }
  }

  /* -- copy to clipboard -------------------------------------------------- */

  function copiers() {
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

    dom.all('[data-component="copy-button"]').forEach(function (btn) {
      dom.on(btn, 'click', function () {
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
        } else {
          done(fallback(value));
        }
      });
    });
  }

  /* -- forms: validation, error summary, simulated submit ----------------- */

  function forms() {
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
      if (value.trim() && kind === 'message' && value.trim().length < 12) {
        return 'A little more detail, please — at least a dozen characters.';
      }
      return '';
    }

    function show(field, message) {
      var ids = (field.getAttribute('aria-describedby') || '').split(' ');
      var slot = null;
      ids.forEach(function (id) { if (/-error$/.test(id)) { slot = document.getElementById(id); } });
      if (slot) { slot.textContent = message; }
      if (message) { field.setAttribute('aria-invalid', 'true'); }
      else { field.removeAttribute('aria-invalid'); }
    }

    dom.all('form[data-form]').forEach(function (form) {
      var name = form.getAttribute('data-form');
      var fields = dom.all('[data-label]', form);
      var summary = dom.one('[data-component="error-summary"]', form);
      var list = summary ? dom.one('ul', summary) : null;
      var success = dom.one('[data-component="success-panel"]', form.parentNode);
      var live = dom.one('[data-component="form-status"]', form.parentNode);

      fields.forEach(function (field) {
        dom.on(field, 'blur', function () { show(field, problem(field)); });
        dom.on(field, 'input', function () {
          if (field.getAttribute('aria-invalid') === 'true') { show(field, problem(field)); }
        });
      });

      dom.on(form, 'submit', function (ev) {
        ev.preventDefault();
        var bad = [];
        fields.forEach(function (field) {
          var message = problem(field);
          show(field, message);
          if (message) { bad.push({ id: field.id, message: message }); }
        });

        if (bad.length && summary && list) {
          list.innerHTML = bad.map(function (b) {
            return '<li><a href="#' + dom.esc(b.id) + '">' + dom.esc(b.message) + '</a></li>';
          }).join('');
          summary.hidden = false;
          summary.setAttribute('tabindex', '-1');
          summary.focus();
          dom.all('a', summary).forEach(function (link) {
            dom.on(link, 'click', function (e) {
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
          var refSlot = dom.one('[data-ref]', success);
          if (refSlot) { refSlot.textContent = ref; }
          var echo = dom.one('[data-echo]', success);
          if (echo) {
            var mail = dom.one('[data-validate="email"]', form);
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
  }

  /* -- archive table: filter, search, sort -------------------------------- */

  function archive() {
    var table = dom.one('[data-component="archive-table"]');
    if (!table) { return; }

    var rows = dom.all('tbody tr', table);
    var body = dom.one('tbody', table);
    var chips = dom.all('[data-component="tech-chip"]');
    var search = dom.one('[data-component="archive-search"]');
    var count = dom.one('[data-component="result-count"]');
    var empty = dom.one('[data-component="empty-state"]');
    var active = dom.param('tech') || 'all';
    var sortKey = 'year';
    var sortDir = 'descending';

    function apply() {
      var q = search ? search.value.trim().toLowerCase() : '';
      var shown = 0;
      rows.forEach(function (row) {
        var tech = (row.getAttribute('data-tech') || '').split('|');
        var hay = (row.getAttribute('data-search') || '').toLowerCase();
        var ok = (active === 'all' || tech.indexOf(active) > -1) && (!q || hay.indexOf(q) > -1);
        row.hidden = !ok;
        if (ok) { shown++; }
      });
      chips.forEach(function (chip) {
        chip.setAttribute('aria-pressed', chip.getAttribute('data-tech') === active ? 'true' : 'false');
      });
      if (count) {
        count.textContent = shown + (shown === 1 ? ' project' : ' projects') +
          (active === 'all' ? '' : ' using ' + active) +
          (q ? ' matching “' + q + '”' : '') +
          ', sorted by ' + sortKey + ' ' + sortDir;
      }
      if (empty) { empty.hidden = shown !== 0; }
    }

    function sort(key, dir) {
      sortKey = key;
      sortDir = dir;
      var sorted = rows.slice().sort(function (a, b) {
        var av = a.getAttribute('data-' + key) || '';
        var bv = b.getAttribute('data-' + key) || '';
        if (key === 'year') { av = parseInt(av, 10); bv = parseInt(bv, 10); }
        else { av = av.toLowerCase(); bv = bv.toLowerCase(); }
        if (av < bv) { return dir === 'ascending' ? -1 : 1; }
        if (av > bv) { return dir === 'ascending' ? 1 : -1; }
        return 0;
      });
      sorted.forEach(function (row) { body.appendChild(row); });
      dom.all('th[data-sort-key]', table).forEach(function (th) {
        th.setAttribute('aria-sort', th.getAttribute('data-sort-key') === key ? dir : 'none');
      });
      apply();
    }

    dom.all('[data-component="sort-button"]').forEach(function (btn) {
      dom.on(btn, 'click', function () {
        var th = btn.closest('th');
        var key = th.getAttribute('data-sort-key');
        var dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
        sort(key, dir);
      });
    });

    chips.forEach(function (chip) {
      dom.on(chip, 'click', function () { active = chip.getAttribute('data-tech'); apply(); });
    });
    if (search) {
      dom.on(search, 'input', apply);
      dom.on(search.form, 'submit', function (e) { e.preventDefault(); apply(); });
    }
    apply();
  }

  /* -- writing list: tag filter + "show more" ----------------------------- */

  function writing() {
    var list = dom.one('[data-component="post-list"]');
    if (!list) { return; }

    var items = dom.all('[data-post]', list);
    var chips = dom.all('[data-component="tag-chip"]');
    var search = dom.one('[data-component="post-search"]');
    var more = dom.one('[data-component="show-more"]');
    var count = dom.one('[data-component="post-count"]');
    var empty = dom.one('[data-component="empty-state"]');
    var step = 2;
    var limit = step;
    var active = dom.param('tag') || 'all';
    if (search && dom.param('q')) { search.value = dom.param('q'); }

    function matching() {
      var q = search ? search.value.trim().toLowerCase() : '';
      return items.filter(function (item) {
        var tags = (item.getAttribute('data-tags') || '').split(' ');
        var hay = (item.getAttribute('data-search') || '').toLowerCase();
        return (active === 'all' || tags.indexOf(active) > -1) && (!q || hay.indexOf(q) > -1);
      });
    }

    function apply() {
      var found = matching();
      items.forEach(function (item) { item.hidden = true; });
      found.slice(0, limit).forEach(function (item) { item.hidden = false; });
      chips.forEach(function (chip) {
        chip.setAttribute('aria-pressed', chip.getAttribute('data-tag') === active ? 'true' : 'false');
      });
      if (count) {
        count.textContent = 'Showing ' + Math.min(limit, found.length) + ' of ' + found.length +
          (found.length === 1 ? ' post' : ' posts') +
          (active === 'all' ? '' : ' tagged “' + active + '”');
      }
      if (more) {
        more.hidden = found.length <= limit;
        more.textContent = 'Show ' + Math.min(step, found.length - limit) + ' more';
      }
      if (empty) { empty.hidden = found.length !== 0; }
    }

    chips.forEach(function (chip) {
      dom.on(chip, 'click', function () { active = chip.getAttribute('data-tag'); limit = step; apply(); });
    });
    if (search) {
      dom.on(search, 'input', function () { limit = step; apply(); });
      dom.on(search.form, 'submit', function (e) { e.preventDefault(); limit = step; apply(); });
    }
    if (more) {
      dom.on(more, 'click', function () {
        limit += step;
        apply();
        var shown = matching().slice(0, limit);
        var last = shown[shown.length - 1];
        var link = last ? dom.one('a', last) : null;
        if (link) { link.focus(); }
      });
    }
    apply();
  }

  /* -- site search --------------------------------------------------------- */

  function siteSearch() {
    var results = dom.one('[data-component="search-results"]');
    if (!results) { return; }
    var input = dom.one('[data-component="site-search-input"]');
    var summary = dom.one('[data-component="search-summary"]');
    var q = dom.param('q');
    if (input && q) { input.value = q; }

    function render(term) {
      term = (term || '').trim().toLowerCase();
      if (!term) {
        summary.textContent = 'Type a word to search ' + SITE.searchIndex.length + ' pages, projects and posts.';
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
        : 'No matches for “' + term + '”. Try "contrast", "archive" or "budget".';

      results.innerHTML = hits.map(function (h) {
        return '<li class="group-row"><div class="when">' + dom.esc(h.e.type) + '</div>' +
          '<div><h3><a href="' + dom.esc(h.e.url) + '">' + dom.esc(h.e.title) + '</a></h3>' +
          '<p>' + dom.esc(h.e.text.slice(0, 96)) + '…</p></div></li>';
      }).join('');
    }

    render(q);
    if (input) {
      dom.on(input, 'input', function () { render(input.value); });
      dom.on(input.form, 'submit', function (e) { e.preventDefault(); render(input.value); });
    }
  }

  /* -- native <dialog> lightbox -------------------------------------------- */

  function lightbox() {
    var dlg = dom.one('[data-component="lightbox"]');
    if (!dlg) { return; }
    var img = dom.one('[data-lightbox-image]', dlg);
    var cap = dom.one('[data-lightbox-caption]', dlg);
    var title = dom.one('[data-lightbox-title]', dlg);
    var opener = null;

    dom.all('[data-component="gallery-shot"]').forEach(function (btn) {
      dom.on(btn, 'click', function () {
        opener = btn;
        img.setAttribute('src', btn.getAttribute('data-full'));
        img.setAttribute('alt', btn.getAttribute('data-alt') || '');
        title.textContent = btn.getAttribute('data-title') || 'Image';
        cap.textContent = btn.getAttribute('data-caption') || '';
        if (typeof dlg.showModal === 'function') { dlg.showModal(); }
        else { dlg.setAttribute('open', 'open'); }
      });
    });

    dom.all('[data-component="lightbox-close"]', dlg).forEach(function (btn) {
      dom.on(btn, 'click', function () { dlg.close(); });
    });

    dom.on(dlg, 'close', function () { if (opener) { opener.focus(); } });
    dom.on(dlg, 'click', function (ev) { if (ev.target === dlg) { dlg.close(); } });
  }

  /* -- rail anchor nav ------------------------------------------------------ */

  function railNav() {
    var nav = dom.one('[data-component="rail-nav"]');
    if (!nav || !('IntersectionObserver' in window)) { return; }
    var links = dom.all('a[href^="#"]', nav);
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);
    if (!targets.length) { return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) { a.setAttribute('aria-current', 'true'); }
          else { a.removeAttribute('aria-current'); }
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* -- reveal, top, stamps, print ------------------------------------------- */

  function reveal() {
    var targets = dom.all('[data-reveal]');
    if (!targets.length) { return; }
    if (dom.reduced() || !('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }

  function misc() {
    dom.all('[data-component="to-top"]').forEach(function (link) {
      dom.on(link, 'click', function (ev) {
        ev.preventDefault();
        window.scrollTo({ top: 0, behavior: dom.reduced() ? 'auto' : 'smooth' });
        var skip = dom.one('.skip-link');
        if (skip) { skip.focus(); }
      });
    });
    dom.all('[data-component="print-button"]').forEach(function (btn) {
      dom.on(btn, 'click', function () { window.print(); });
    });
    dom.all('[data-component="year-stamp"]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
    dom.all('[data-count="archive"]').forEach(function (el) {
      el.textContent = String(SITE.archive.length);
    });
    dom.all('[data-count="posts"]').forEach(function (el) {
      el.textContent = String(SITE.posts.length);
    });
    dom.all('[data-count="search-entries"]').forEach(function (el) {
      el.textContent = String(SITE.searchIndex.length);
    });
  }

  function init() {
    document.documentElement.className += ' js';
    initUI();
    theme();
    spotlight();
    clock();
    copiers();
    forms();
    archive();
    writing();
    siteSearch();
    lightbox();
    railNav();
    reveal();
    misc();
  }

  return { init: init, dom: dom };
}());

APP.init();
