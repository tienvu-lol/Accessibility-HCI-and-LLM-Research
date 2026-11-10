/* ==========================================================================
   PORT-01 - Tobias Quill (fictional personal portfolio)
   Protocol: WEB-REPLICA-V1.0 | Source of structure: https://tholman.com/

   One file, two halves:
     PART A - site data (availability, projects, writing, talks, search index)
     PART B - behavior, in a single IIFE, vanilla JavaScript only.

   No libraries are used. The dropdown, slide-in navigation, disclosures and
   image dialog are implemented in initUI() below with browser APIs only, as
   RULES.md section 2 requires.

   Anything that would need a server (contact form, newsletter) is simulated
   in memory and announces itself as a demo.
   ========================================================================== */

/* ---------------------------------------------------------------- PART A */

var SITE = {
  person: 'Tobias Quill',
  role: 'Interactive developer & creative technologist',
  city: 'Portland, Oregon',
  timeZone: 'America/Los_Angeles',
  email: 'hello@tquill.example',
  /* Local working hours used by the availability badge. 0 = Sunday. */
  hours: {
    0: null,
    1: [9, 18],
    2: [9, 18],
    3: [9, 18],
    4: [9, 18],
    5: [9, 15],
    6: null
  },
  availability: {
    state: 'open',
    headline: 'Taking two new projects for Q1 2027',
    capacity: 'About 2 days a week, from January 2027',
    leadTime: '3-4 weeks',
    kinds: 'Prototypes, design engineering, teaching'
  },

  /* Work grid. kind: "case" items have a page here; "toy" items are hosted
     elsewhere, which is how the source site lists most of its experiments. */
  projects: [
    {
      id: 'cursor-weather',
      title: 'Cursor Weather',
      year: 2026,
      kind: 'case',
      url: 'project-cursor-weather.html',
      tags: ['canvas', 'toy', 'open-source'],
      blurb: 'A pointer that carries its own microclimate: drizzle, fog and the occasional hailstorm, drawn on a 2 KB canvas layer.',
      role: 'Design, build, writing',
      thumb: 'assets/img/project-cursor-weather.svg'
    },
    {
      id: 'keyboard-garden',
      title: 'Keyboard Garden',
      year: 2026,
      kind: 'case',
      url: 'project-keyboard-garden.html',
      tags: ['hardware', 'accessibility'],
      blurb: 'A split keyboard whose keys sprout a plant for every thousand words written, with a printed companion card for screen reader users.',
      role: 'Firmware, enclosure, docs',
      thumb: 'assets/img/project-keyboard-garden.svg'
    },
    {
      id: 'tiny-orrery',
      title: 'Tiny Orrery',
      year: 2025,
      kind: 'case',
      url: 'project-tiny-orrery.html',
      tags: ['svg', 'teaching', 'open-source'],
      blurb: 'A hand-cranked SVG solar system for a middle-school science unit. Keyboard operable, printable, and legible at 400% zoom.',
      role: 'Build, curriculum support',
      thumb: 'assets/img/project-tiny-orrery.svg'
    },
    {
      id: 'paper-plotter',
      title: 'Paper Plotter',
      year: 2025,
      kind: 'case',
      url: 'project-paper-plotter.html',
      tags: ['hardware', 'type'],
      blurb: 'A pen plotter queue that turns a week of git commits into a plotted broadsheet, printed every Friday at 4pm.',
      role: 'Toolchain, type design',
      thumb: 'assets/img/project-paper-plotter.svg'
    },
    {
      id: 'focus-ring-museum',
      title: 'The Focus Ring Museum',
      year: 2024,
      kind: 'case',
      url: 'project-focus-ring-museum.html',
      tags: ['accessibility', 'teaching', 'open-source'],
      blurb: 'Eighty-one focus indicators, collected, measured against WCAG 2.2 and labelled like butterflies in a case.',
      role: 'Research, build',
      thumb: 'assets/img/project-focus-ring-museum.svg'
    },
    {
      id: 'elevator-pitch',
      title: 'Elevator Pitch',
      year: 2024,
      kind: 'toy',
      url: 'https://codepen.io/',
      tags: ['toy', 'canvas'],
      blurb: 'A lift that travels one floor for every scroll of the page. It never reaches the top floor.',
      role: 'Weekend build',
      thumb: 'assets/img/project-elevator-pitch.svg'
    },
    {
      id: 'typewriter-tax',
      title: 'Typewriter Tax',
      year: 2023,
      kind: 'toy',
      url: 'https://github.com/',
      tags: ['toy', 'type'],
      blurb: 'A writing app that charges you a key press for every adverb. Balance payable in semicolons.',
      role: 'Weekend build',
      thumb: 'assets/img/project-typewriter-tax.svg'
    },
    {
      id: 'queue-of-one',
      title: 'Queue of One',
      year: 2023,
      kind: 'toy',
      url: 'https://github.com/',
      tags: ['open-source', 'toy'],
      blurb: 'A 40-line task runner for people who only ever have one task. Downloaded, inexplicably, 90,000 times.',
      role: 'Maintainer',
      thumb: 'assets/img/project-queue-of-one.svg'
    },
    {
      id: 'ninety-nine-buttons',
      title: 'Ninety-Nine Buttons',
      year: 2022,
      kind: 'toy',
      url: 'https://codepen.io/',
      tags: ['toy', 'accessibility'],
      blurb: 'Ninety-nine buttons, each with a different hover state, all keyboard reachable in under four seconds.',
      role: 'Weekend build',
      thumb: 'assets/img/project-ninety-nine-buttons.svg'
    }
  ],

  posts: [
    {
      id: 'making-it-rain',
      title: 'Making it rain on your cursor',
      date: '2026-10-21',
      url: 'post-making-it-rain.html',
      tags: ['canvas', 'toy'],
      minutes: 7,
      excerpt: 'Weather on a pointer sounds like three lines of code. It is three lines of code and then four weeks of deciding when to stop.'
    },
    {
      id: 'focus-rings-furniture',
      title: "Focus rings aren't ugly, they're furniture",
      date: '2026-08-04',
      url: 'post-focus-rings-furniture.html',
      tags: ['accessibility', 'craft'],
      minutes: 9,
      excerpt: 'A focus indicator is not decoration you apologise for. It is the handrail on your staircase, and nobody asks a handrail to be invisible.'
    },
    {
      id: 'twelve-small-tools',
      title: 'Twelve small tools I built instead of one large one',
      date: '2026-05-12',
      url: 'post-twelve-small-tools.html',
      tags: ['tooling', 'craft'],
      minutes: 11,
      excerpt: 'The large tool was going to take a year. The twelve small ones took nine weekends and I still use seven of them.'
    },
    {
      id: 'plotting-400-pages',
      title: 'What I learned plotting four hundred pages',
      date: '2026-02-17',
      url: 'post-plotting-400-pages.html',
      tags: ['hardware', 'type'],
      minutes: 8,
      excerpt: 'Pens dry out, paper curls, and a plotter will happily draw a perfect rectangle 2mm off the page every time if you let it.'
    },
    {
      id: 'teaching-with-toys',
      title: 'Teaching a classroom with toys instead of slides',
      date: '2025-11-03',
      url: 'post-teaching-with-toys.html',
      tags: ['teaching', 'craft'],
      minutes: 6,
      excerpt: 'Thirty-one eleven-year-olds will find every edge case in your interface within ninety seconds. Bring a notebook.'
    },
    {
      id: 'in-praise-of-small-pages',
      title: 'In praise of small, boring web pages',
      date: '2025-06-09',
      url: 'post-in-praise-of-small-pages.html',
      tags: ['craft', 'tooling'],
      minutes: 5,
      excerpt: 'This site is one stylesheet and one script. It will still open in eleven years, which is more than I can say for anything I shipped at work.'
    }
  ],

  talks: [
    { title: 'Serious play: the case for useless software', venue: 'Interface Northwest', year: 2026, kind: 'Talk', url: 'talks.html#serious-play' },
    { title: 'Focus rings, handrails and other furniture', venue: 'A11y Portland', year: 2026, kind: 'Talk', url: 'talks.html#focus-rings' },
    { title: 'Episode 212: tinkering as practice', venue: 'The Long Build podcast', year: 2025, kind: 'Podcast', url: 'talks.html#long-build' },
    { title: 'Twelve tools, nine weekends', venue: 'Cascadia JS Meetup', year: 2025, kind: 'Talk', url: 'talks.html#twelve-tools' },
    { title: 'Plotting the week', venue: 'Type & Machine Club', year: 2024, kind: 'Workshop', url: 'talks.html#plotting-the-week' },
    { title: 'Episode 88: the smallest useful website', venue: 'Static & Proud podcast', year: 2024, kind: 'Podcast', url: 'talks.html#smallest-website' }
  ],

  /* Client-side site search index. Keep the keywords lowercase. */
  searchIndex: [
    { title: 'Home', url: 'index.html', type: 'Page', text: 'tobias quill interactive developer creative technologist portland contraptions toys experiments availability' },
    { title: 'Work', url: 'work.html', type: 'Page', text: 'projects case studies toys experiments filter tags canvas hardware accessibility open source' },
    { title: 'Writing', url: 'writing.html', type: 'Page', text: 'blog essays notes archive tags pagination' },
    { title: 'About', url: 'about.html', type: 'Page', text: 'biography how i work history portland workshop tinkering teaching' },
    { title: 'Resume', url: 'resume.html', type: 'Page', text: 'cv curriculum vitae experience education skills download print harborlight' },
    { title: 'Uses', url: 'uses.html', type: 'Page', text: 'toolkit editor hardware keyboard software fonts desk setup plotter' },
    { title: 'Talks & podcasts', url: 'talks.html', type: 'Page', text: 'speaking conferences workshops podcast episodes slides' },
    { title: 'Contact', url: 'contact.html', type: 'Page', text: 'email enquiry form hire freelance availability copy email' },
    { title: 'Colophon', url: 'colophon.html', type: 'Page', text: 'how this site is built typefaces stack credits no build step' },
    { title: 'Accessibility', url: 'accessibility.html', type: 'Page', text: 'accessibility statement wcag 2.2 aa conformance keyboard screen reader' },
    { title: 'Cursor Weather', url: 'project-cursor-weather.html', type: 'Project', text: 'canvas pointer rain drizzle fog hail toy open source case study' },
    { title: 'Keyboard Garden', url: 'project-keyboard-garden.html', type: 'Project', text: 'hardware split keyboard firmware plants accessibility braille companion card' },
    { title: 'Tiny Orrery', url: 'project-tiny-orrery.html', type: 'Project', text: 'svg solar system school teaching keyboard zoom printable' },
    { title: 'Paper Plotter', url: 'project-paper-plotter.html', type: 'Project', text: 'plotter pen git commits broadsheet type design hardware' },
    { title: 'The Focus Ring Museum', url: 'project-focus-ring-museum.html', type: 'Project', text: 'focus indicators wcag 2.2 contrast accessibility research collection' },
    { title: 'Making it rain on your cursor', url: 'post-making-it-rain.html', type: 'Writing', text: 'canvas weather pointer toy essay drizzle' },
    { title: "Focus rings aren't ugly, they're furniture", url: 'post-focus-rings-furniture.html', type: 'Writing', text: 'accessibility focus indicator handrail craft essay' },
    { title: 'Twelve small tools I built instead of one large one', url: 'post-twelve-small-tools.html', type: 'Writing', text: 'tooling small tools weekend craft essay' },
    { title: 'What I learned plotting four hundred pages', url: 'post-plotting-400-pages.html', type: 'Writing', text: 'plotter hardware pens paper type essay' },
    { title: 'Teaching a classroom with toys instead of slides', url: 'post-teaching-with-toys.html', type: 'Writing', text: 'teaching classroom toys craft essay school' },
    { title: 'In praise of small, boring web pages', url: 'post-in-praise-of-small-pages.html', type: 'Writing', text: 'craft tooling small boring static html essay' }
  ]
};

/* ---------------------------------------------------------------- PART B */

(function () {
  'use strict';

  document.documentElement.className += ' js';

  /* -- small helpers ----------------------------------------------------- */

  function one(sel, root) { return (root || document).querySelector(sel); }
  function all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function on(el, type, fn) { if (el) { el.addEventListener(type, fn); } }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }
  function fmtDate(iso) {
    var p = iso.split('-');
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    return months[parseInt(p[1], 10) - 1] + ' ' + parseInt(p[2], 10) + ', ' + p[0];
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

  initUI();

  /* -- 1. local time + availability badge -------------------------------
     Testing aid: ?demo-time=YYYY-MM-DDTHH:MM forces the studio's local clock
     for that page load only, so "away" and "working" states are reproducible. */

  function studioNow() {
    var forced = param('demo-time');
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(forced);
    if (m) { return { date: new Date(), forced: m }; }
    return { date: new Date(), forced: null };
  }

  function forcedParts(m) {
    /* The forced value is read as the studio's own wall clock, so a test
       reads the same whatever time zone the browser is in. */
    var y = parseInt(m[1], 10), mo = parseInt(m[2], 10), d = parseInt(m[3], 10);
    var h = parseInt(m[4], 10), mi = parseInt(m[5], 10);
    var day = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return {
      label: h12 + ':' + ('0' + mi).slice(-2) + ' ' + (h < 12 ? 'am' : 'pm'),
      hour: h, minute: mi, day: day
    };
  }

  function studioParts(date) {
    /* Intl is used when available so the clock follows the studio's zone, not
       the visitor's. Falls back to the visitor's clock on very old engines. */
    try {
      var f = new Intl.DateTimeFormat('en-US', {
        timeZone: SITE.timeZone, hour: 'numeric', minute: '2-digit',
        weekday: 'short', hour12: true
      });
      var parts = {};
      f.formatToParts(date).forEach(function (p) { parts[p.type] = p.value; });
      var h24 = new Intl.DateTimeFormat('en-US', {
        timeZone: SITE.timeZone, hour: 'numeric', hour12: false
      }).format(date);
      var dayIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
      return {
        label: parts.hour + ':' + parts.minute + ' ' + (parts.dayPeriod || '').toLowerCase(),
        hour: parseInt(h24, 10) % 24,
        minute: parseInt(parts.minute, 10),
        day: dayIdx < 0 ? date.getDay() : dayIdx
      };
    } catch (e) {
      return {
        label: date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2),
        hour: date.getHours(), minute: date.getMinutes(), day: date.getDay()
      };
    }
  }

  function workingState(p) {
    var window_ = SITE.hours[p.day];
    if (!window_) { return 'away'; }
    var now = p.hour + p.minute / 60;
    return (now >= window_[0] && now < window_[1]) ? 'working' : 'away';
  }

  function paintClocks() {
    var now = studioNow();
    var p = now.forced ? forcedParts(now.forced) : studioParts(now.date);
    var state = workingState(p);

    all('[data-component="local-time"]').forEach(function (el) {
      el.textContent = p.label + ' in ' + SITE.city.split(',')[0];
    });

    all('[data-component="availability-badge"]').forEach(function (el) {
      var isOpen = SITE.availability.state === 'open';
      el.setAttribute('data-state', isOpen ? (state === 'working' ? 'open' : 'away') : 'closed');
      var text = isOpen
        ? (state === 'working' ? 'Available for work · at the desk now' : 'Available for work · away from the desk')
        : 'Booked up for now';
      el.textContent = text;
    });

    all('[data-component="desk-state"]').forEach(function (el) {
      el.setAttribute('data-state', state === 'working' ? 'at-desk' : 'away');
      el.textContent = state === 'working' ? 'At the desk' : 'Away from the desk';
    });

    all('[data-component="desk-state-dot"]').forEach(function (el) {
      el.setAttribute('data-state', state === 'working' ? 'at-desk' : 'away');
    });

    return now.forced;
  }

  if (one('[data-component="local-time"], [data-component="availability-badge"], [data-component="desk-state"]')) {
    var forced = paintClocks();
    if (!forced) { window.setInterval(paintClocks, 60000); }
  }

  /* -- 2. copy to clipboard (email, permalink) --------------------------- */

  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); },
        function () { done(fallbackCopy(text)); });
    } else {
      done(fallbackCopy(text));
    }
  }

  function fallbackCopy(text) {
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

  all('[data-component="copy-button"]').forEach(function (btn) {
    on(btn, 'click', function () {
      var value = btn.getAttribute('data-copy') || SITE.email;
      var status = one('#' + btn.getAttribute('data-status'));
      copyText(value, function (ok) {
        var label = btn.getAttribute('data-label') || 'Address';
        if (status) {
          status.textContent = ok
            ? label + ' copied: ' + value
            : 'Copying was blocked by the browser. The address is ' + value;
        }
      });
    });
  });

  /* -- 3. forms: validation, error summary, simulated submit ------------- */

  var RULES = {
    required: function (v) { return v.trim().length > 0; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
    min12: function (v) { return v.trim().length >= 12; }
  };

  function fieldError(field) {
    var required = field.hasAttribute('required');
    var value = field.value || '';
    var kind = field.getAttribute('data-validate') || '';
    var label = field.getAttribute('data-label') || 'This field';

    if (field.type === 'checkbox') {
      return (required && !field.checked) ? label + ' must be ticked to continue.' : '';
    }
    if (required && !RULES.required(value)) { return label + ' is required.'; }
    if (value.trim() && kind === 'email' && !RULES.email(value)) {
      return 'Enter an email address in the form name@example.com.';
    }
    if (value.trim() && kind === 'message' && !RULES.min12(value)) {
      return 'Tell me a little more — at least a dozen characters.';
    }
    return '';
  }

  function showFieldError(field, message) {
    var slot = one('#' + field.getAttribute('aria-describedby').split(' ').filter(function (id) {
      return /-error$/.test(id);
    })[0]);
    if (slot) { slot.textContent = message; }
    if (message) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  }

  all('form[data-form]').forEach(function (form) {
    var name = form.getAttribute('data-form');
    var summary = one('[data-component="error-summary"]', form);
    var summaryList = summary ? one('ul', summary) : null;
    var success = one('[data-component="success-panel"]', form.parentNode);
    var fields = all('[data-label]', form);

    fields.forEach(function (field) {
      on(field, 'blur', function () { showFieldError(field, fieldError(field)); });
      on(field, 'input', function () {
        if (field.getAttribute('aria-invalid') === 'true') {
          showFieldError(field, fieldError(field));
        }
      });
    });

    on(form, 'submit', function (ev) {
      ev.preventDefault();
      var problems = [];

      fields.forEach(function (field) {
        var message = fieldError(field);
        showFieldError(field, message);
        if (message) { problems.push({ id: field.id, message: message }); }
      });

      if (problems.length && summary && summaryList) {
        summaryList.innerHTML = problems.map(function (p) {
          return '<li><a href="#' + esc(p.id) + '">' + esc(p.message) + '</a></li>';
        }).join('');
        summary.hidden = false;
        summary.setAttribute('tabindex', '-1');
        summary.focus();
        all('a', summary).forEach(function (link) {
          on(link, 'click', function (e) {
            e.preventDefault();
            var target = one(link.getAttribute('href'));
            if (target) { target.focus(); }
          });
        });
        return;
      }

      if (summary) { summary.hidden = true; }

      /* Simulated submit. Nothing leaves the browser. */
      var ref = name.toUpperCase().slice(0, 2) + '-' +
        String(Math.floor(Math.random() * 9000) + 1000);
      if (success) {
        var refSlot = one('[data-ref]', success);
        if (refSlot) { refSlot.textContent = ref; }
        var echo = one('[data-echo]', success);
        if (echo) {
          var emailField = one('[data-validate="email"]', form);
          echo.textContent = emailField ? emailField.value.trim() : SITE.email;
        }
        form.hidden = true;
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
      var live = one('[data-component="form-status"]', form.parentNode);
      if (live) { live.textContent = 'Demo only: ' + name + ' accepted, reference ' + ref + '. Nothing was sent.'; }
    });
  });

  /* -- 4. work.html: tag filter + text search ---------------------------- */

  (function workFilters() {
    var grid = one('[data-component="project-grid"]');
    if (!grid) { return; }

    var cards = all('[data-project]', grid);
    var chips = all('[data-component="filter-chip"]');
    var search = one('[data-component="project-search"]');
    var count = one('[data-component="result-count"]');
    var empty = one('[data-component="empty-state"]');
    var activeTag = param('tag') || 'all';

    function apply() {
      var q = search ? search.value.trim().toLowerCase() : '';
      var shown = 0;

      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(' ');
        var haystack = (card.getAttribute('data-search') || '').toLowerCase();
        var tagOk = activeTag === 'all' || tags.indexOf(activeTag) > -1;
        var textOk = !q || haystack.indexOf(q) > -1;
        var show = tagOk && textOk;
        card.hidden = !show;
        if (show) { shown++; }
      });

      chips.forEach(function (chip) {
        chip.setAttribute('aria-pressed', chip.getAttribute('data-tag') === activeTag ? 'true' : 'false');
      });
      if (count) {
        count.textContent = shown + (shown === 1 ? ' project' : ' projects') +
          (activeTag === 'all' ? '' : ' tagged “' + activeTag + '”') +
          (q ? ' matching “' + q + '”' : '');
      }
      if (empty) { empty.hidden = shown !== 0; }
    }

    chips.forEach(function (chip) {
      on(chip, 'click', function () {
        activeTag = chip.getAttribute('data-tag');
        apply();
      });
    });
    if (search) {
      on(search, 'input', apply);
      on(search.form, 'submit', function (e) { e.preventDefault(); apply(); });
    }
    apply();
  }());

  /* -- 5. writing.html: tag filter, search, pagination ------------------- */

  (function writingList() {
    var list = one('[data-component="post-list"]');
    if (!list) { return; }

    var items = all('[data-post]', list);
    var chips = all('[data-component="tag-chip"]');
    var search = one('[data-component="post-search"]');
    var count = one('[data-component="post-count"]');
    var empty = one('[data-component="empty-state"]');
    var pager = one('[data-component="pagination"]');
    var perPage = 3;
    var page = 1;
    var activeTag = param('tag') || 'all';
    var initialQuery = param('q');
    if (search && initialQuery) { search.value = initialQuery; }

    function matches() {
      var q = search ? search.value.trim().toLowerCase() : '';
      return items.filter(function (item) {
        var tags = (item.getAttribute('data-tags') || '').split(' ');
        var haystack = (item.getAttribute('data-search') || '').toLowerCase();
        return (activeTag === 'all' || tags.indexOf(activeTag) > -1) &&
          (!q || haystack.indexOf(q) > -1);
      });
    }

    function paintPager(pages) {
      if (!pager) { return; }
      if (pages < 2) { pager.hidden = true; return; }
      pager.hidden = false;
      var ul = one('ul', pager);
      var html = '';
      for (var i = 1; i <= pages; i++) {
        html += '<li><button type="button" class="pagination-page"' +
          (i === page ? ' aria-current="page"' : '') +
          ' data-page="' + i + '">' +
          '<span class="visually-hidden">Page </span>' + i + '</button></li>';
      }
      ul.innerHTML = html;
      all('button', ul).forEach(function (btn) {
        on(btn, 'click', function () {
          page = parseInt(btn.getAttribute('data-page'), 10);
          apply();
          var heading = one('[data-component="post-list-heading"]');
          if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus(); }
        });
      });
    }

    function apply() {
      var found = matches();
      var pages = Math.max(1, Math.ceil(found.length / perPage));
      if (page > pages) { page = pages; }
      var start = (page - 1) * perPage;

      items.forEach(function (item) { item.hidden = true; });
      found.slice(start, start + perPage).forEach(function (item) { item.hidden = false; });

      chips.forEach(function (chip) {
        chip.setAttribute('aria-pressed', chip.getAttribute('data-tag') === activeTag ? 'true' : 'false');
      });
      if (count) {
        count.textContent = found.length + (found.length === 1 ? ' post' : ' posts') +
          (activeTag === 'all' ? '' : ' tagged “' + activeTag + '”') +
          (found.length > perPage ? ', page ' + page + ' of ' + pages : '');
      }
      if (empty) { empty.hidden = found.length !== 0; }
      paintPager(pages);
    }

    chips.forEach(function (chip) {
      on(chip, 'click', function () {
        activeTag = chip.getAttribute('data-tag');
        page = 1;
        apply();
      });
    });
    if (search) {
      on(search, 'input', function () { page = 1; apply(); });
      on(search.form, 'submit', function (e) { e.preventDefault(); page = 1; apply(); });
    }
    apply();
  }());

  /* -- 6. search.html: client-side site search --------------------------- */

  (function siteSearch() {
    var results = one('[data-component="search-results"]');
    if (!results) { return; }

    var input = one('[data-component="site-search-input"]');
    var summary = one('[data-component="search-summary"]');
    var q = param('q');
    if (input && q) { input.value = q; }

    function score(entry, needle) {
      var t = entry.title.toLowerCase();
      var hay = (entry.title + ' ' + entry.text).toLowerCase();
      if (t.indexOf(needle) === 0) { return 3; }
      if (t.indexOf(needle) > -1) { return 2; }
      return hay.indexOf(needle) > -1 ? 1 : 0;
    }

    function render(needle) {
      needle = (needle || '').trim().toLowerCase();
      if (!needle) {
        summary.textContent = 'Type a word to search ' + SITE.searchIndex.length + ' pages, projects and posts.';
        results.innerHTML = '';
        return;
      }
      var hits = SITE.searchIndex
        .map(function (e) { return { e: e, s: score(e, needle) }; })
        .filter(function (h) { return h.s > 0; })
        .sort(function (a, b) { return b.s - a.s; });

      summary.textContent = hits.length === 0
        ? 'No matches for “' + needle + '”. Try "plotter", "focus" or "canvas".'
        : hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + needle + '”';

      results.innerHTML = hits.map(function (h) {
        return '<li><a href="' + esc(h.e.url) + '">' +
          '<span class="link-title">' + esc(h.e.title) + '</span>' +
          '<span class="link-note">' + esc(h.e.text.slice(0, 92)) + '…</span>' +
          '<span class="link-year">' + esc(h.e.type) + '</span></a></li>';
      }).join('');
    }

    render(q);
    if (input) {
      on(input, 'input', function () { render(input.value); });
      on(input.form, 'submit', function (e) { e.preventDefault(); render(input.value); });
    }
  }());

  /* -- 7. gallery lightbox (native <dialog>) ---------------------------- */

  (function lightbox() {
    var dlg = one('#lightbox');
    if (!dlg) { return; }
    var img = one('[data-lightbox-image]', dlg);
    var cap = one('[data-lightbox-caption]', dlg);
    var title = one('[data-lightbox-title]', dlg);
    var opener = null;

    all('[data-component="gallery-shot"]').forEach(function (btn) {
      on(btn, 'click', function () {
        opener = btn;
        img.setAttribute('src', btn.getAttribute('data-full'));
        img.setAttribute('alt', btn.getAttribute('data-alt') || '');
        title.textContent = btn.getAttribute('data-title') || 'Image';
        cap.textContent = btn.getAttribute('data-caption') || '';
        if (typeof dlg.showModal === 'function') { dlg.showModal(); }
        else { dlg.setAttribute('open', 'open'); }
      });
    });

    on(dlg, 'close', function () { if (opener) { opener.focus(); } });
  }());

  /* -- 8. scroll reveal (skipped when reduced motion is requested) ------- */

  (function reveal() {
    var targets = all('[data-reveal]');
    if (!targets.length) { return; }
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  }());

  /* -- 9. in-page anchor nav: mark the section in view ------------------- */

  (function anchorNav() {
    var nav = one('[data-component="anchor-nav"]');
    if (!nav || !('IntersectionObserver' in window)) { return; }
    var links = all('a[href^="#"]', nav);
    var sections = links.map(function (a) { return one(a.getAttribute('href')); })
      .filter(function (s) { return !!s; });
    if (!sections.length) { return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (a) {
          var isCurrent = a.getAttribute('href') === '#' + entry.target.id;
          if (isCurrent) {
            a.setAttribute('aria-current', 'true');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }());

  /* -- 10. back to top -------------------------------------------------- */

  all('[data-component="to-top"]').forEach(function (link) {
    on(link, 'click', function (ev) {
      ev.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
      var first = one('.skip-link');
      if (first) { first.focus(); }
    });
  });

  /* -- 11. print the resume -------------------------------------------- */

  all('[data-component="print-button"]').forEach(function (btn) {
    on(btn, 'click', function () { window.print(); });
  });

  /* -- 12. stamps: current year, counts -------------------------------- */

  all('[data-component="year-stamp"]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
  all('[data-count="projects"]').forEach(function (el) {
    el.textContent = String(SITE.projects.length);
  });
  all('[data-count="posts"]').forEach(function (el) {
    el.textContent = String(SITE.posts.length);
  });
  all('[data-count="search-entries"]').forEach(function (el) {
    el.textContent = String(SITE.searchIndex.length);
  });

  /* -- 13. latest-writing teasers on the home page ---------------------- */

  (function latestWriting() {
    var slot = one('[data-component="latest-writing"]');
    if (!slot) { return; }
    slot.innerHTML = SITE.posts.slice(0, 3).map(function (p) {
      return '<li><a href="' + esc(p.url) + '">' +
        '<span class="link-title">' + esc(p.title) + '</span>' +
        '<span class="link-note">' + esc(p.excerpt.slice(0, 96)) + '…</span>' +
        '<span class="link-year"><time datetime="' + esc(p.date) + '">' +
        esc(fmtDate(p.date)) + '</time></span></a></li>';
    }).join('');
  }());

}());
