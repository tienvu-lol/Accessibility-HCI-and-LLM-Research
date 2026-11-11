/* Verdant Environmental Agency (fictional) - shared behavior. All data is inline; nothing is fetched. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var byId = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var param = function (k) { return new URLSearchParams(location.search).get(k) || ''; };
  document.documentElement.classList.add('js');

  /* ---------- demo datasets (fictional) ---------- */
  var OFFICES = [
    { id: 1, name: 'Region 1 - Harbor Coast', city: 'Port Alder', areas: 'Northmark, Alder Coast, Tidewell', phone: '555-0101' },
    { id: 2, name: 'Region 2 - Capital Corridor', city: 'New Ashby', areas: 'Ashby, Corinth Bay, Larkin Islands', phone: '555-0102' },
    { id: 3, name: 'Region 3 - Mid-River', city: 'Fairhaven', areas: 'Fairhaven, Oldmill, Westerly Valley', phone: '555-0103' },
    { id: 4, name: 'Region 4 - Southern Reach', city: 'Cedar Point', areas: 'Cedar, Marlow, Southfork, Pelican Sound', phone: '555-0104' },
    { id: 5, name: 'Region 5 - Great Lakes Basin', city: 'Lakeport', areas: 'Lakeport, Ironwood, Calder, Three Rivers', phone: '555-0105' },
    { id: 6, name: 'Region 6 - Gulf Plains', city: 'San Marlo', areas: 'San Marlo, Red Mesa, Bayou Crest', phone: '555-0106' },
    { id: 7, name: 'Region 7 - Heartland', city: 'Prairie Gate', areas: 'Prairie Gate, Amber Fields, Tallgrass', phone: '555-0107' },
    { id: 8, name: 'Region 8 - Mountain West', city: 'High Meadow', areas: 'High Meadow, Silverton Ridge, Basin Rock', phone: '555-0108' },
    { id: 9, name: 'Region 9 - Pacific Southwest', city: 'Sunvale', areas: 'Sunvale, Coronado Bay, Desert Wells', phone: '555-0109' },
    { id: 10, name: 'Region 10 - Northwest', city: 'Evergreen Bay', areas: 'Evergreen Bay, Rainier Falls, Kestrel Sound', phone: '555-0110' }
  ];
  var NEWS_TOPICS = ['Air', 'Water', 'Land and cleanup', 'Chemicals', 'Enforcement', 'Grants'];
  var NEWS = [
    { t: 'Agency opens applications for river restoration grants', d: '2026-11-03', r: 5, k: 'Grants', s: 'Community groups can apply for small awards to restore stream banks and wetlands. A webinar is planned for next month.' },
    { t: 'New drinking water guidance published for small systems', d: '2026-10-29', r: 3, k: 'Water', s: 'The guidance explains sampling schedules and record keeping in plain language for operators of very small systems.' },
    { t: 'Regional office announces cleanup of former tannery site', d: '2026-10-22', r: 1, k: 'Land and cleanup', s: 'Crews will remove contaminated soil over the next two seasons while nearby residents receive monthly updates.' },
    { t: 'Wildfire smoke tips now available in ten languages', d: '2026-10-15', r: 9, k: 'Air', s: 'A one-page checklist covers indoor air, masks and when to check local air quality readings.' },
    { t: 'Settlement requires upgrades at coastal chemical plant', d: '2026-10-08', r: 6, k: 'Enforcement', s: 'The operator agreed to install leak detection and publish quarterly monitoring summaries.' },
    { t: 'Radon action month encourages households to test', d: '2026-10-01', r: 8, k: 'Air', s: 'Short-term test kits are the first step. Homes with high results should arrange a follow-up test and mitigation advice.' },
    { t: 'Lead pipe replacement funding reaches rural towns', d: '2026-09-24', r: 7, k: 'Water', s: 'Towns in three regions will receive funds to identify and replace lead service lines.' },
    { t: 'Chemical safety review adds new reporting rules', d: '2026-09-17', r: 2, k: 'Chemicals', s: 'Manufacturers must submit updated safety summaries by the end of the next quarter.' },
    { t: 'Harbor beach water quality season summary released', d: '2026-09-10', r: 1, k: 'Water', s: 'Most monitored beaches met standards on most days. A table lists the few advisory days by site.' },
    { t: 'Brownfield redevelopment awards announced', d: '2026-09-02', r: 4, k: 'Grants', s: 'Eleven communities will use these grants to assess and plan reuse of idle industrial properties.' },
    { t: 'Stormwater inspection results shared with Gulf cities', d: '2026-08-26', r: 6, k: 'Enforcement', s: 'Inspectors reviewed construction sites and found common problems with sediment controls.' },
    { t: 'Northwest labs publish open data on shellfish bed monitoring', d: '2026-08-19', r: 10, k: 'Water', s: 'Datasets are available as downloadable tables with a short guide to the measurement methods.' }
  ];
  var TOPICS = [
    ['Air quality', 'environmental-topics.html#air'], ['Algal blooms', 'water-topics.html'], ['Asbestos', 'environmental-topics.html#chemicals'],
    ['Beach water quality', 'water-topics.html'], ['Bed bugs', 'environmental-topics.html#bed-bugs'], ['Chemical safety', 'environmental-topics.html#chemicals'],
    ['Climate indicators', 'environmental-topics.html#science'], ['Compliance assistance', 'laws-regulations.html#compliance'], ['Contaminated sites', 'environmental-topics.html#land-waste'],
    ['Disaster debris', 'environmental-topics.html#emergency-response'], ['Drinking water standards', 'drinking-water.html'], ['Emergency spill response', 'environmental-topics.html#emergency-response'],
    ['Enforcement actions', 'laws-regulations.html#enforcement'], ['Fish consumption advisories', 'water-topics.html'], ['Groundwater', 'drinking-water.html'],
    ['Hazardous waste', 'environmental-topics.html#land-waste'], ['Health effects of pollution', 'environmental-topics.html#health'], ['Indoor air', 'environmental-topics.html#air'],
    ['Lakes and rivers', 'water-topics.html'], ['Lead in paint and pipes', 'environmental-topics.html#lead'], ['Mold', 'environmental-topics.html#mold'],
    ['Nutrient pollution', 'water-topics.html'], ['Pesticides', 'environmental-topics.html#chemicals'], ['Private wells', 'drinking-water.html'],
    ['Radon testing', 'radon.html'], ['Recycling', 'environmental-topics.html#land-waste'], ['Regional offices', 'regional-offices.html'],
    ['Report a violation', 'report-violation.html'], ['Research grants', 'environmental-topics.html#research'], ['Septic systems', 'water-topics.html'],
    ['Stormwater', 'water-topics.html'], ['Toxic releases by location', 'environmental-topics.html#info-by-location'], ['Underground storage tanks', 'environmental-topics.html#land-waste'],
    ['Vapor intrusion', 'environmental-topics.html#land-waste'], ['Wastewater', 'water-topics.html'], ['Wetlands', 'water-topics.html'],
    ['Wildfire smoke', 'environmental-topics.html#air'], ['Youth education', 'environmental-topics.html#science']
  ];

  /* ---------- disclosures (banner, search drawer, mobile nav, dropdowns, accordions) ---------- */
  function setOpen(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    byId(btn.getAttribute('aria-controls')).hidden = !open;
  }
  var toggles = $$('button[aria-controls][aria-expanded]');
  toggles.forEach(function (btn) {
    var panel = byId(btn.getAttribute('aria-controls'));
    // Panels start collapsed; the mobile nav panel is forced visible on desktop by CSS.
    panel.hidden = btn.getAttribute('aria-expanded') !== 'true';
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      if (open && btn.classList.contains('nav-link-btn')) closeMenus(btn);
      setOpen(btn, open);
    });
  });
  function closeMenus(except) {
    $$('.nav-link-btn[aria-expanded="true"]').forEach(function (b) { if (b !== except) setOpen(b, false); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var active = document.activeElement;
    var open = $$('button[aria-controls][aria-expanded="true"]').filter(function (b) {
      return b === active || byId(b.getAttribute('aria-controls')).contains(active);
    });
    var btn = open.pop();
    if (btn) { setOpen(btn, false); btn.focus(); }
  });
  function outside(e) {
    var nav = $('[data-component="primary-nav"]');
    if (nav && !nav.contains(e.target)) closeMenus();
  }
  document.addEventListener('click', outside);
  document.addEventListener('focusin', outside);

  /* dismissible site alert (not persisted) */
  var dismiss = $('[data-action="dismiss-alert"]');
  if (dismiss) dismiss.addEventListener('click', function () {
    var banner = dismiss.closest('.site-alert');
    banner.hidden = true;
    var brand = $('.brand');
    if (brand) brand.focus();
  });

  /* back to top */
  var top = $('[data-action="back-to-top"]');
  if (top) top.addEventListener('click', function () {
    window.scrollTo(0, 0);
    var brand = $('.brand');
    if (brand) brand.focus();
  });

  /* ---------- language selector (labeled demo) ---------- */
  $$('[data-language]').forEach(function (b) {
    b.addEventListener('click', function () {
      var out = byId('language-status');
      out.textContent = 'Demo only: "' + b.textContent + '" was selected, but translated pages are not included in this replica. This site stays in English.';
      $$('[data-language]').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
    });
  });

  /* ---------- A-Z topic index ---------- */
  var az = byId('az-results');
  if (az) {
    var azQuery = byId('topic-filter'), azCount = byId('az-count'), azLetter = '';
    var letterBox = byId('az-letters');
    var present = {};
    TOPICS.forEach(function (t) { present[t[0][0].toUpperCase()] = true; });
    letterBox.innerHTML = '<li><button type="button" aria-pressed="true" data-letter="">All</button></li>' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (l) {
        return '<li><button type="button" aria-pressed="false" data-letter="' + l + '"' + (present[l] ? '' : ' disabled aria-label="' + l + ' (no topics)"') + '>' + l + '</button></li>';
      }).join('');
    azQuery.value = param('q');
    var renderAz = function () {
      var q = azQuery.value.trim().toLowerCase(), last = '';
      var hits = TOPICS.filter(function (t) {
        return (!azLetter || t[0][0].toUpperCase() === azLetter) && (!q || t[0].toLowerCase().indexOf(q) > -1);
      });
      az.innerHTML = hits.map(function (t) {
        var l = t[0][0].toUpperCase(), head = '';
        if (l !== last && !q) head = '<li class="letter-head" aria-hidden="true">' + l + '</li>';
        last = l;
        return head + '<li><a href="' + t[1] + '">' + esc(t[0]) + '</a></li>';
      }).join('');
      azCount.textContent = hits.length + (hits.length === 1 ? ' topic' : ' topics') + ' shown';
      byId('az-empty').hidden = hits.length > 0;
    };
    azQuery.addEventListener('input', renderAz);
    letterBox.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || b.disabled) return;
      azLetter = b.dataset.letter;
      $$('button', letterBox).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      renderAz();
    });
    byId('az-reset').addEventListener('click', function () {
      azQuery.value = ''; azLetter = '';
      $$('button', letterBox).forEach(function (o, i) { o.setAttribute('aria-pressed', String(i === 0)); });
      renderAz();
      azQuery.focus();
    });
    byId('az-form').addEventListener('submit', function (e) { e.preventDefault(); renderAz(); });
    renderAz();
  }

  /* ---------- newsroom filters ---------- */
  var newsBox = byId('news-results');
  if (newsBox) {
    var nq = byId('news-q'), nr = byId('news-region'), nt = byId('news-topic'), ns = byId('news-sort');
    nr.insertAdjacentHTML('beforeend', OFFICES.map(function (o) { return '<option value="' + o.id + '">' + esc(o.name) + '</option>'; }).join(''));
    nt.insertAdjacentHTML('beforeend', NEWS_TOPICS.map(function (k) { return '<option>' + esc(k) + '</option>'; }).join(''));
    nq.value = param('q');
    var renderNews = function () {
      var q = nq.value.trim().toLowerCase();
      var hits = NEWS.filter(function (n) {
        return (!nr.value || String(n.r) === nr.value) && (!nt.value || n.k === nt.value) &&
          (!q || (n.t + ' ' + n.s).toLowerCase().indexOf(q) > -1);
      }).sort(function (a, b) { return ns.value === 'oldest' ? a.d.localeCompare(b.d) : b.d.localeCompare(a.d); });
      newsBox.innerHTML = hits.map(function (n) {
        return '<li><h3>' + esc(n.t) + '</h3><p class="meta"><time datetime="' + n.d + '">' + n.d + '</time> &middot; <span class="tag">' + esc(n.k) + '</span> ' + esc(OFFICES[n.r - 1].name) + '</p><p>' + esc(n.s) + '</p></li>';
      }).join('');
      byId('news-count').textContent = hits.length + (hits.length === 1 ? ' news release' : ' news releases') + ' found';
      byId('news-empty').hidden = hits.length > 0;
    };
    ['input', 'change'].forEach(function (ev) { byId('news-form').addEventListener(ev, renderNews); });
    byId('news-form').addEventListener('submit', function (e) { e.preventDefault(); renderNews(); });
    byId('news-reset').addEventListener('click', function () {
      setTimeout(function () { renderNews(); nq.focus(); }, 0);
    });
    renderNews();
  }

  /* ---------- regional offices table ---------- */
  var offBody = byId('office-rows');
  if (offBody) {
    var oq = byId('office-q');
    var renderOffices = function () {
      var q = oq.value.trim().toLowerCase();
      var hits = OFFICES.filter(function (o) { return !q || (o.name + ' ' + o.city + ' ' + o.areas).toLowerCase().indexOf(q) > -1; });
      offBody.innerHTML = hits.map(function (o) {
        return '<tr><th scope="row">' + esc(o.name) + '</th><td data-label="Office city">' + esc(o.city) + '</td><td data-label="Areas served">' + esc(o.areas) + '</td><td data-label="Phone (sample)">' + o.phone + '</td></tr>';
      }).join('');
      byId('office-count').textContent = hits.length + (hits.length === 1 ? ' office' : ' offices') + ' shown';
      byId('office-empty').hidden = hits.length > 0;
      byId('office-table').hidden = hits.length === 0;
    };
    oq.addEventListener('input', renderOffices);
    byId('office-form').addEventListener('submit', function (e) { e.preventDefault(); renderOffices(); });
    byId('office-reset').addEventListener('click', function () { oq.value = ''; renderOffices(); oq.focus(); });
    renderOffices();
  }

  /* ---------- simulated forms with validation ---------- */
  function fieldError(input) {
    var v = input.value.trim(), label = input.dataset.label || 'This field';
    if (input.type === 'checkbox') return '';
    if (input.dataset.required !== undefined && !v) return input.tagName === 'SELECT' ? 'Choose an option for ' + label : 'Enter ' + label;
    if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter ' + label + ' in the format name@example.org';
    if (v && input.dataset.min && v.length < Number(input.dataset.min)) return label.charAt(0).toUpperCase() + label.slice(1) + ' must be at least ' + input.dataset.min + ' characters';
    if (v && input.type === 'date' && v > new Date().toISOString().slice(0, 10)) return 'Enter a date that is not in the future';
    return '';
  }
  function showError(input, msg) {
    var wrap = input.closest('.field'), old = $('.field-error', wrap);
    if (old) old.remove();
    var hintId = input.dataset.hint || '';
    if (!msg) { input.removeAttribute('aria-invalid'); input.setAttribute('aria-describedby', hintId); if (!hintId) input.removeAttribute('aria-describedby'); return; }
    var p = document.createElement('p');
    p.className = 'field-error';
    p.id = input.id + '-error';
    p.textContent = msg;
    input.insertAdjacentElement('beforebegin', p);
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', (hintId + ' ' + p.id).trim());
  }
  $$('form[data-validate]').forEach(function (form) {
    var summary = $('.error-summary', form.parentNode), done = $('.success-panel', form.parentNode);
    var inputs = $$('input[data-label], select[data-label], textarea[data-label]', form);
    inputs.forEach(function (i) {
      i.addEventListener('blur', function () { if (i.value.trim() || i.getAttribute('aria-invalid')) showError(i, fieldError(i)); });
      i.addEventListener('input', function () { if (i.getAttribute('aria-invalid') && !fieldError(i)) showError(i, ''); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = [];
      inputs.forEach(function (i) { var m = fieldError(i); showError(i, m); if (m) bad.push([i, m]); });
      if (bad.length) {
        $('ul', summary).innerHTML = bad.map(function (b) { return '<li><a href="#' + b[0].id + '" data-focus="' + b[0].id + '">' + esc(b[1]) + '</a></li>'; }).join('');
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;
      form.hidden = true;
      $('.ref', done).textContent = 'DEMO-' + String(Date.now()).slice(-6);
      done.hidden = false;
      done.focus();
    });
    form.addEventListener('reset', function () {
      setTimeout(function () { inputs.forEach(function (i) { showError(i, ''); }); summary.hidden = true; }, 0);
    });
    summary.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-focus]');
      if (!a) return;
      e.preventDefault();
      byId(a.dataset.focus).focus();
    });
    var again = $('[data-action="new-submission"]', done);
    if (again) again.addEventListener('click', function () {
      form.reset(); done.hidden = true; form.hidden = false; inputs[0].focus();
    });
  });
})();
