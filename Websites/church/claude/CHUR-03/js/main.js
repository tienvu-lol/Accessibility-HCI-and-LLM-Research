/* Saint Aldric's Church (fictional) - CHUR-03 shared script. Vanilla JS, no network. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- inline sample data ---------- */
  var MINISTRIES = [
    { name: 'Altar Guild', category: 'Liturgical', schedule: 'Saturday mornings', text: 'Prepares the altar, linens and vessels for each service.' },
    { name: 'Lectors and Chalice Bearers', category: 'Liturgical', schedule: 'Rotating Sundays', text: 'Reads scripture aloud and assists with communion. Training is offered.' },
    { name: 'Parish Choir', category: 'Liturgical', schedule: 'Thursdays, 7:00 PM rehearsal', text: 'Sings at the 10:00 AM service. No audition; reading music is optional.' },
    { name: 'Acolytes', category: 'Liturgical', schedule: 'Sundays', text: 'Young people and adults who carry the cross and candles in procession.' },
    { name: 'Food Pantry Shelf', category: 'Outreach', schedule: 'Pack-out on the second Saturday', text: 'Stocks and sorts donated food for neighbors in need.' },
    { name: 'Winter Coat Drive', category: 'Outreach', schedule: 'November to January', text: 'Collects and distributes warm coats, hats and gloves.' },
    { name: 'Thrift Shop Crew', category: 'Outreach', schedule: 'Wednesday, Friday, Saturday', text: 'Sorts donations, runs the register and raises money for local causes.' },
    { name: 'Coffee Hour Hosts', category: 'Fellowship', schedule: 'Sundays after the 10:00 AM service', text: 'Sets up and shares a simple table of coffee, tea and baked goods.' },
    { name: 'Women’s Spirituality Circle', category: 'Fellowship', schedule: 'Alternate Tuesdays, 5:30 PM', text: 'Conversation, reading and prayer in the tea room.' },
    { name: 'Grief Support Circle', category: 'Support', schedule: 'First and third Mondays, 6:30 PM', text: 'A confidential gathering for people who have lost someone close.' },
    { name: 'Recovery Meeting Space', category: 'Support', schedule: 'Nightly; times vary by group', text: 'The parish hall hosts independent recovery groups. Groups run themselves.' }
  ];
  var ANNOUNCEMENTS = [
    { title: 'Winter schedule begins', category: 'Worship', date: '2026-11-09', text: 'From the first Sunday of Advent we worship at 8:00 AM and 10:00 AM on Sundays and 5:00 PM on Saturdays.' },
    { title: 'Family Church on the last Sunday', category: 'Worship', date: '2026-11-06', text: 'A shorter, livelier service with songs and a story, followed by a shared lunch.' },
    { title: 'Coffee hour hosts needed', category: 'Community', date: '2026-11-02', text: 'Sign up on the clipboard in the narthex to bring baked goods or help set up on a Sunday.' },
    { title: 'Books and Bread on Wednesdays', category: 'Education', date: '2026-10-28', text: 'Supper and a short discussion of a chosen reading, 5:30 to 6:30 PM in the parish hall.' },
    { title: 'Winter coat drive opens', category: 'Outreach', date: '2026-10-21', text: 'Bring clean coats, hats and gloves to the box by the front door. Distribution is in December.' },
    { title: 'Holiday Bazaar date set', category: 'Community', date: '2026-10-14', text: 'The bazaar is on Saturday 5 December 2026. Volunteers and baked goods are welcome.' }
  ];
  var EVENTS = [
    { id: 'e1', title: 'Pantry Pack-Out', category: 'Outreach', date: '2026-11-14', time: '9:00 – 11:00 AM', place: 'Parish hall', text: 'Sort and pack food boxes for neighbors. Gloves provided.' },
    { id: 'e2', title: 'Christ the King Sunday and Thanksgiving Lunch', category: 'Worship', date: '2026-11-22', time: '10:00 AM', place: 'Church and parish hall', text: 'Worship followed by a lunch celebrating the pledge campaign.' },
    { id: 'e3', title: 'Thanksgiving Eve Supper', category: 'Fellowship', date: '2026-11-25', time: '5:30 PM', place: 'Parish hall', text: 'A simple shared meal. Bring a side dish if you can.' },
    { id: 'e4', title: 'Hanging of the Greens', category: 'Worship', date: '2026-11-29', time: '10:00 AM', place: 'Church', text: 'First Sunday of Advent. Families help decorate the church after the service.' },
    { id: 'e5', title: 'Holiday Bazaar', category: 'Fellowship', date: '2026-12-05', time: '9:00 AM – 2:00 PM', place: 'Parish hall', text: 'Crafts, baked goods, white elephant table and the thrift shop open for business.' },
    { id: 'e6', title: 'Advent Study: Waiting Well', category: 'Education', date: '2026-12-09', time: '5:30 – 6:30 PM', place: 'Library', text: 'A short series on patience, hope and the weeks before Christmas.' },
    { id: 'e7', title: 'Winter Coat Distribution', category: 'Outreach', date: '2026-12-13', time: 'After the 10:00 AM service', place: 'Parish hall', text: 'Neighbors are invited to choose a coat, hat and gloves at no charge.' },
    { id: 'e8', title: 'Christmas Eve Services', category: 'Worship', date: '2026-12-24', time: '4:00 PM and 9:00 PM', place: 'Church', text: 'A family service at 4:00 PM and candlelit carols at 9:00 PM.' },
    { id: 'e9', title: 'Epiphany Evening Prayer', category: 'Worship', date: '2027-01-06', time: '7:00 PM', place: 'Chapel', text: 'A quiet service of readings, silence and song to mark Epiphany.' },
    { id: 'e10', title: 'Inquirers’ Class Open House', category: 'Education', date: '2027-01-16', time: '10:00 AM', place: 'Library', text: 'Come and see what the class is like before you sign up.' },
    { id: 'e11', title: 'Annual Meeting', category: 'Fellowship', date: '2027-01-24', time: 'After the 10:00 AM service', place: 'Parish hall', text: 'Reports, vestry elections and a budget for the year ahead.' }
  ];

  /* ---------- helpers ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var longDate = function (iso, withWeekday) {
    var opts = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
    if (withWeekday) opts.weekday = 'long';
    return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', opts);
  };

  /* ---------- navigation ---------- */
  var nav = $('#primary-nav');
  var navToggle = $('[data-nav-toggle]');
  var desktopHover = window.matchMedia('(hover: hover) and (min-width: 62rem)');

  function setSub(li, open) {
    li.classList.toggle('is-open', open);
    var btn = $('.sub-toggle', li);
    if (btn) btn.setAttribute('aria-expanded', String(open));
  }
  function closeSubs(except) {
    $$('.has-sub.is-open', nav).forEach(function (li) { if (li !== except) setSub(li, false); });
  }
  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    $$('.sub-toggle', nav).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var li = btn.parentElement;
        var open = !li.classList.contains('is-open');
        closeSubs(li);
        setSub(li, open);
      });
    });
    $$('.has-sub', nav).forEach(function (li) {
      li.addEventListener('mouseenter', function () { if (desktopHover.matches) { closeSubs(li); setSub(li, true); } });
      li.addEventListener('mouseleave', function () { if (desktopHover.matches) setSub(li, false); });
    });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeSubs(); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openLi = $('.has-sub.is-open', nav);
      if (openLi) {
        var btn = $('.sub-toggle', openLi);
        setSub(openLi, false);
        if (nav.contains(document.activeElement)) btn.focus();
      } else if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---------- accordions ---------- */
  $$('[data-component="accordion"]').forEach(function (acc) {
    var triggers = $$('.accordion-trigger', acc);
    var all = $('[data-accordion-all]', acc);
    var setOpen = function (btn, open) {
      btn.setAttribute('aria-expanded', String(open));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
    };
    var syncAll = function () {
      var allOpen = triggers.every(function (t) { return t.getAttribute('aria-expanded') === 'true'; });
      var noun = all.getAttribute('aria-label').replace(/^(Expand|Collapse) all /, '');
      all.textContent = allOpen ? 'Collapse all' : 'Expand all';
      all.setAttribute('aria-label', (allOpen ? 'Collapse all ' : 'Expand all ') + noun);
    };
    triggers.forEach(function (t) {
      t.addEventListener('click', function () { setOpen(t, t.getAttribute('aria-expanded') !== 'true'); syncAll(); });
    });
    all.addEventListener('click', function () {
      var open = all.textContent === 'Expand all';
      triggers.forEach(function (t) { setOpen(t, open); });
      syncAll();
    });
  });

  /* ---------- filterable lists (ministries, announcements, events) ---------- */
  var LISTS = {
    ministries: {
      items: MINISTRIES, noun: 'ministries',
      text: function (m) { return [m.name, m.text, m.schedule, m.category].join(' '); },
      match: function (m, f) { return !f.category || m.category === f.category; },
      html: function (m) {
        return '<li class="card"><h3>' + esc(m.name) + '</h3><p class="meta"><span class="tag">' + esc(m.category) + '</span> ' + esc(m.schedule) + '</p><p>' + esc(m.text) + '</p><p><a href="contact.html">Ask the office about joining</a></p></li>';
      }
    },
    announcements: {
      items: ANNOUNCEMENTS, noun: 'announcements',
      text: function (a) { return [a.title, a.text, a.category].join(' '); },
      match: function (a, f) { return !f.category || a.category === f.category; },
      html: function (a) {
        return '<li class="card"><h3>' + esc(a.title) + '</h3><p class="meta"><span class="tag">' + esc(a.category) + '</span> Posted ' + esc(longDate(a.date)) + '</p><p>' + esc(a.text) + '</p></li>';
      }
    },
    events: {
      items: EVENTS, noun: 'events',
      text: function (e) { return [e.title, e.text, e.place, e.category].join(' '); },
      match: function (e, f) { return (!f.category || e.category === f.category) && (!f.month || e.date.slice(0, 7) === f.month); },
      html: function (e) {
        return '<li class="card"><h3>' + esc(e.title) + '</h3><p class="meta"><span class="tag">' + esc(e.category) + '</span> <time datetime="' + e.date + '">' + esc(longDate(e.date, true)) + '</time>, ' + esc(e.time) + '</p><p>' + esc(e.place) + '</p><button type="button" class="btn btn-secondary" data-event-id="' + e.id + '">Details<span class="visually-hidden"> for ' + esc(e.title) + '</span></button></li>';
      }
    }
  };

  $$('[data-component="filter-list"]').forEach(function (root) {
    var cfg = LISTS[root.getAttribute('data-instance')];
    var form = $('[data-filter-form]', root);
    var results = $('[data-filter-results]', root);
    var status = $('[data-filter-status]', root);
    var empty = $('[data-filter-empty]', root);
    function render() {
      var f = {};
      $$('input, select', form).forEach(function (el) { f[el.name] = el.value.trim(); });
      var terms = (f.q || '').toLowerCase().split(/\s+/).filter(Boolean);
      var hits = cfg.items.filter(function (it) {
        var hay = cfg.text(it).toLowerCase();
        return cfg.match(it, f) && terms.every(function (t) { return hay.indexOf(t) !== -1; });
      });
      results.innerHTML = hits.map(cfg.html).join('');
      empty.hidden = hits.length > 0;
      status.textContent = hits.length === 0 ? 'No ' + cfg.noun + ' found.' : 'Showing ' + hits.length + ' of ' + cfg.items.length + ' ' + cfg.noun + '.';
    }
    form.addEventListener('input', render);
    form.addEventListener('change', render);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    $('[data-filter-reset]', form).addEventListener('click', function () { form.reset(); render(); $('input', form).focus(); });
    render();
  });

  /* ---------- event details dialog ---------- */
  var dialog = $('dialog[data-component="event-dialog"]');
  if (dialog) {
    var opener = null;
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-event-id]');
      if (!btn) return;
      var ev = EVENTS.filter(function (x) { return x.id === btn.getAttribute('data-event-id'); })[0];
      opener = btn;
      $('#event-dialog-title', dialog).textContent = ev.title;
      $('[data-dialog-when]', dialog).textContent = 'When: ' + longDate(ev.date, true) + ', ' + ev.time;
      $('[data-dialog-where]', dialog).textContent = 'Where: ' + ev.place;
      $('[data-dialog-body]', dialog).textContent = ev.text;
      dialog.showModal();
    });
    $('[data-dialog-close]', dialog).addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (opener && document.contains(opener)) opener.focus(); });
  }

  /* ---------- demo forms: validation, error summary, focus management ---------- */
  function labelOf(el) { return el.getAttribute('data-label') || 'This field'; }
  function fieldMessage(el) {
    var label = labelOf(el), v = el.value.trim();
    if (el.required && !v) return el.tagName === 'SELECT' ? 'Choose an option for ' + label + '.' : label + ' is required.';
    if (!v) return '';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return label + ' must be a valid email address, like name@example.org.';
    if (el.minLength > 0 && v.length < el.minLength) return label + ' must be at least ' + el.minLength + ' characters.';
    if (el.type === 'number' && (!/^\d+$/.test(v) || +v < +el.min || +v > +el.max)) return label + ' must be a whole number from 1 to 100,000.';
    return '';
  }
  function groupMessage(fs) {
    return $('input:checked', fs) ? '' : 'Choose ' + fs.getAttribute('data-label') + '.';
  }
  function setError(target, errEl, msg, inputs) {
    errEl.textContent = msg;
    errEl.hidden = !msg;
    inputs.forEach(function (i) {
      if (msg) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid');
      var ids = (i.getAttribute('data-base-describedby') || '').split(' ').filter(Boolean);
      if (msg) ids.push(errEl.id);
      if (ids.length) i.setAttribute('aria-describedby', ids.join(' ')); else i.removeAttribute('aria-describedby');
    });
  }

  $$('form[data-demo-form]').forEach(function (form) {
    var summary = $('[data-error-summary]', form);
    var success = $('[data-success]', form);
    var items = []; // { key, el (focus target), inputs, errEl, test }
    $$('.field', form).forEach(function (f) {
      var el = $('input, select, textarea', f);
      if (!el) return;
      el.setAttribute('data-base-describedby', el.getAttribute('aria-describedby') || '');
      items.push({ focus: el, inputs: [el], errEl: $('.error', f), test: function () { return fieldMessage(el); } });
    });
    $$('fieldset[data-required-group]', form).forEach(function (fs) {
      var radios = $$('input', fs);
      items.unshift({ focus: radios[0], inputs: radios, errEl: $('.error', fs), test: function () { return groupMessage(fs); } });
    });

    var other = $('[name="other"]', form);
    var amountRadios = $$('[name="amount"]', form);
    if (other) {
      amountRadios.forEach(function (r) {
        r.addEventListener('change', function () {
          other.required = r.value === 'other';
          if (!other.required) other.value = '';
        });
      });
    }

    function showSummary(errs) {
      if (!errs.length) { summary.hidden = true; summary.innerHTML = ''; return; }
      summary.innerHTML = '<h2>There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with your entries</h2><ul>' +
        errs.map(function (x) { return '<li><a href="#' + x.focus.id + '">' + esc(x.msg) + '</a></li>'; }).join('') + '</ul>';
      summary.hidden = false;
    }
    function runAll() {
      var errs = [];
      items.forEach(function (it) {
        var msg = it.test();
        setError(it, it.errEl, msg, it.inputs);
        if (msg) errs.push({ focus: it.focus, msg: msg });
      });
      return errs;
    }
    summary.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      document.getElementById(a.getAttribute('href').slice(1)).focus();
    });
    function refreshField(e) {
      var it = items.filter(function (x) { return x.inputs.indexOf(e.target) !== -1; })[0];
      if (!it || !summary.innerHTML) return;
      if (it.errEl.hidden && e.type === 'input') return; // do not nag while typing a fresh field
      setError(it, it.errEl, it.test(), it.inputs);
      if (other && e.target.name === 'amount') setError(null, $('#give-other-error'), '', [other]);
      showSummary(items.map(function (x) { return { focus: x.focus, msg: x.errEl.hidden ? '' : x.errEl.textContent }; }).filter(function (x) { return x.msg; }));
    }
    form.addEventListener('change', refreshField);
    form.addEventListener('input', refreshField);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      success.hidden = true;
      var errs = runAll();
      showSummary(errs);
      if (errs.length) { summary.focus(); return; }
      var data = new FormData(form), extra = '';
      if (data.has('amount')) {
        var amt = data.get('amount') === 'other' ? data.get('other') : data.get('amount');
        extra = ' Sample gift: $' + amt + ', ' + data.get('fund') + ', ' + data.get('frequency').toLowerCase() + '.';
      }
      form.reset();
      if (other) other.required = false;
      success.textContent = form.getAttribute('data-success-title') + '. This is a demonstration only: nothing was sent, saved or charged.' + extra;
      success.hidden = false;
      success.focus();
    });
  });
})();
