/* Kelmoran Landmarks Service - fictional sample site. Vanilla JS, inline data, no network. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var REGIONS = ['Ostrand Shelf', 'Embermoor Basin', 'Thistlewake Coast', 'Lowmere Plain', 'Velmoor Highlands'];
  var TYPES = { coastal: 'Coastal', highland: 'Highland', forest: 'Forest', wetland: 'Wetland', desert: 'Desert', heritage: 'Heritage' };
  var SITES = [
    ['heron-glass-reach', 'Heron-Glass Reach', 'coastal', 'Thistlewake Coast', 'A made-up shoreline of glassy tidal pools and pale shingle, invented for this sample.', ['Imaginary tidal pools', 'A fictional lantern jetty', 'Sample field-guide trail map']],
    ['salt-lantern-cove', 'Salt-Lantern Cove', 'coastal', 'Thistlewake Coast', 'An invented cove where glowing salt crusts are said to catch the evening light.', ['Fictional salt terraces', 'Illustrative cove viewpoint']],
    ['marrowtide-spit', 'Marrowtide Spit', 'coastal', 'Ostrand Shelf', 'A narrow imaginary sand spit used here to demonstrate list and detail layouts.', ['Sample dune boardwalk', 'Invented birdwatching hide']],
    ['quillon-shingle', 'Quillon Shingle', 'coastal', 'Ostrand Shelf', 'A fictional pebble beach with banded stones, described only for illustration.', ['Banded pebble display', 'Sample picnic lawn']],
    ['ostrelle-headland', 'Ostrelle Headland', 'coastal', 'Thistlewake Coast', 'An imaginary headland with a pretend signal tower.', ['Fictional signal tower', 'Illustrative cliff garden']],
    ['brindlemoor-heights', 'Brindlemoor Heights', 'highland', 'Velmoor Highlands', 'An invented upland of heather-coloured slopes, written as sample copy.', ['Sample ridge viewpoint', 'Imaginary stone circle']],
    ['velmoor-crown', 'Velmoor Crown', 'highland', 'Velmoor Highlands', 'A fictional crown-shaped peak that exists only in this dataset.', ['Illustrative summit marker', 'Invented cloud gallery']],
    ['tarnwick-ridge', 'Tarnwick Ridge', 'highland', 'Velmoor Highlands', 'A make-believe ridge with imaginary tarns, used to exercise filters.', ['Sample tarn viewpoint', 'Fictional ridge shelter']],
    ['ashgrave-pinnacle', 'Ashgrave Pinnacle', 'highland', 'Embermoor Basin', 'An invented volcanic spire described with sample text only.', ['Fictional ash gardens', 'Illustrative spire outlook']],
    ['skelling-notch', 'Skelling Notch', 'highland', 'Embermoor Basin', 'An imaginary mountain pass named for demonstration.', ['Sample pass gallery', 'Invented waymarker']],
    ['tamsel-hollow', 'Tamsel Hollow', 'forest', 'Lowmere Plain', 'A pretend wooded hollow with invented moss patterns.', ['Fictional moss gallery', 'Sample woodland loop map']],
    ['whisperfern-wold', 'Whisperfern Wold', 'forest', 'Lowmere Plain', 'A fictional woodland of tall invented ferns.', ['Imaginary fern hall', 'Illustrative clearing']],
    ['dunmarrow-grove', 'Dunmarrow Grove', 'forest', 'Embermoor Basin', 'An invented grove used to show a mid-length description.', ['Sample grove pavilion', 'Fictional seed library']],
    ['lorrenwick-canopy', 'Lorrenwick Canopy', 'forest', 'Velmoor Highlands', 'A make-believe high forest with an imaginary canopy walk.', ['Illustrative canopy deck', 'Invented lichen display']],
    ['fallowmere-glade', 'Fallowmere Glade', 'forest', 'Ostrand Shelf', 'A fictional glade, described only as sample content.', ['Sample meadow edge', 'Imaginary orchard row']],
    ['pellicor-fen', 'Pellicor Fen', 'wetland', 'Lowmere Plain', 'An invented fen of pale reeds and pretend still water.', ['Fictional reed gallery', 'Sample boardwalk drawing']],
    ['mirrowdeep-mere', 'Mirrowdeep Mere', 'wetland', 'Lowmere Plain', 'A pretend lake used to demonstrate the wetland filter.', ['Imaginary mirror shoreline', 'Illustrative heron hide']],
    ['sedgewhistle-carr', 'Sedgewhistle Carr', 'wetland', 'Ostrand Shelf', 'A fictional waterlogged woodland with invented sedge meadows.', ['Sample sedge meadow', 'Fictional carr lookout']],
    ['lumenreed-delta', 'Lumenreed Delta', 'wetland', 'Thistlewake Coast', 'An imaginary river delta with softly lit reed beds, written for illustration.', ['Invented delta map', 'Sample reed lantern display']],
    ['nettlebrook-flats', 'Nettlebrook Flats', 'wetland', 'Embermoor Basin', 'A make-believe floodplain used as sample data.', ['Illustrative floodplain model', 'Fictional brook crossing']],
    ['quillon-salt-flats', 'Quillon Salt Flats', 'desert', 'Embermoor Basin', 'An invented salt pan with a pretend mirror-like surface.', ['Sample salt pan gallery', 'Imaginary sunrise lawn']],
    ['cindervane-dunes', 'Cindervane Dunes', 'desert', 'Embermoor Basin', 'A fictional dune field of dark sand, described only for the dataset.', ['Invented dune viewpoint', 'Sample sand-ripple display']],
    ['parchmere-badlands', 'Parchmere Badlands', 'desert', 'Lowmere Plain', 'An imaginary banded badland used to illustrate long names in a list.', ['Fictional layered cliffs', 'Illustrative color wheel']],
    ['ochrewind-mesa', 'Ochrewind Mesa', 'desert', 'Velmoor Highlands', 'A pretend flat-topped mesa with invented ochre walls.', ['Sample mesa outlook', 'Fictional pigment garden']],
    ['singing-sandwash', 'Singing Sandwash', 'desert', 'Ostrand Shelf', 'An invented dry channel said, in fiction, to hum at dusk.', ['Imaginary resonance garden', 'Sample channel map']],
    ['old-brassline-works', 'Old Brassline Works', 'heritage', 'Lowmere Plain', 'A fictional industrial site used to demonstrate a heritage entry.', ['Invented foundry hall', 'Sample tool display']],
    ['candlestone-terraces', 'Candlestone Terraces', 'heritage', 'Velmoor Highlands', 'An imaginary set of stone terraces with a pretend mason history.', ['Fictional terrace walls', 'Illustrative mason gallery']],
    ['harrowkiln', 'Harrowkiln', 'heritage', 'Embermoor Basin', 'A make-believe kiln village described as sample copy.', ['Sample kiln hall', 'Imaginary pottery row']],
    ['mossbell-stair', 'Mossbell Stair', 'heritage', 'Thistlewake Coast', 'An invented ruined stair and observation platform.', ['Fictional stair gallery', 'Sample star-chart wall']],
    ['ferrowick-waystation', 'Ferrowick Waystation', 'heritage', 'Ostrand Shelf', 'A pretend waystation on an imaginary old road.', ['Invented waystation yard', 'Illustrative road map']]
  ].map(function (a) { return { id: a[0], name: a[1], type: a[2], region: a[3], summary: a[4], highlights: a[5] }; });

  var TOPICS = [
    { id: 'tide-glass-foxes', group: 'Animals', name: 'Tide-glass Foxes', text: 'An imaginary fox with a pale, translucent coat. This page is a storytelling sample and says nothing about real animals.', sites: ['heron-glass-reach', 'salt-lantern-cove'] },
    { id: 'lantern-moths', group: 'Animals', name: 'Lantern Moths', text: 'A made-up moth whose wings are described as faintly luminous. Entirely invented for the dataset.', sites: ['tamsel-hollow', 'whisperfern-wold'] },
    { id: 'singing-dunes', group: 'Geology and natural features', name: 'Singing Dunes', text: 'A fictional dune field that hums in the story world. Sample copy only.', sites: ['cindervane-dunes', 'singing-sandwash'] },
    { id: 'basalt-terraces', group: 'Geology and natural features', name: 'Basalt Terraces', text: 'Imaginary stepped rock formations used to demonstrate a topic page.', sites: ['ashgrave-pinnacle', 'candlestone-terraces'] },
    { id: 'mere-reeds', group: 'Plants', name: 'Mere Reeds', text: 'Invented reed species with silver-green stems. No botanical claims are made.', sites: ['pellicor-fen', 'mirrowdeep-mere'] },
    { id: 'whisperferns', group: 'Plants', name: 'Whisperferns', text: 'A fictional fern said to rustle in still air. Illustrative copy.', sites: ['whisperfern-wold', 'dunmarrow-grove'] },
    { id: 'brassline-industry', group: 'History and culture', name: 'Brassline Industry', text: 'An invented craft history for a made-up valley, written for sample purposes.', sites: ['old-brassline-works', 'harrowkiln'] },
    { id: 'candlestone-masons', group: 'History and culture', name: 'Candlestone Masons', text: 'A fictional guild of terrace builders. Not a record of any real people.', sites: ['candlestone-terraces', 'mossbell-stair'] }
  ];

  var NEWS = [
    { id: 'n1', date: '2099-03-04', cat: 'Collections', title: 'Sample field guide to Tide-glass Foxes added to this demo', text: 'An invented guide used to show how news entries look. It describes a fictional animal.' },
    { id: 'n2', date: '2099-02-18', cat: 'Programmes', title: 'Imaginary volunteer programme described on the Get Involved page', text: 'A made-up programme overview. No programme exists and nothing can be joined.' },
    { id: 'n3', date: '2099-02-02', cat: 'Collections', title: 'Fictional Brassline archive catalogue shown as a sample list', text: 'A pretend catalogue entry that illustrates a long headline in a news list.' },
    { id: 'n4', date: '2099-01-21', cat: 'Site updates', title: 'Directory of thirty invented sites available in this demo', text: 'The directory demonstrates search, filters and empty states over fictional data.' },
    { id: 'n5', date: '2098-12-09', cat: 'Programmes', title: 'Make-believe youth drawing series announced for the story world', text: 'An illustrative item describing an imaginary activity. It is not an event.' },
    { id: 'n6', date: '2098-11-27', cat: 'Site updates', title: 'Topic pages now list related fictional sites', text: 'A sample update showing how topics link to the directory.' },
    { id: 'n7', date: '2098-10-14', cat: 'Collections', title: 'Candlestone Masons gallery text revised in the sample dataset', text: 'Invented gallery copy used to demonstrate dated entries.' },
    { id: 'n8', date: '2098-09-30', cat: 'Site updates', title: 'Contact form demo explained', text: 'The contact page is a simulation. Nothing typed into it is sent or stored.' }
  ];

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function siteById(id) { return SITES.filter(function (s) { return s.id === id; })[0]; }
  function param(n) { return new URLSearchParams(location.search).get(n); }

  /* ---------- Global navigation (two levels) ---------- */
  var nav = $('#primary-nav'), toggle = $('#menu-toggle'), list = $('#primary-menu');
  function setOpen(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var p = document.getElementById(btn.getAttribute('aria-controls'));
    if (p) p.hidden = !open;
    if (!open && p) $$('.sub-btn[aria-expanded="true"]', p).forEach(function (b) { setOpen(b, false); });
  }
  function closeAll(except) {
    $$('.nav-btn[aria-expanded="true"]', nav).forEach(function (b) { if (b !== except) setOpen(b, false); });
  }
  if (nav) {
    $$('.nav-btn', nav).forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true';
        closeAll(b); setOpen(b, open);
      });
    });
    $$('.sub-btn', nav).forEach(function (b) {
      b.addEventListener('click', function () { setOpen(b, b.getAttribute('aria-expanded') !== 'true'); });
    });
    if (toggle) toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      list.classList.toggle('is-open', open);
      if (!open) closeAll();
    });
    nav.addEventListener('focusout', function () {
      setTimeout(function () { if (!nav.contains(document.activeElement)) closeAll(); }, 0);
    });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeAll(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (nav) {
      var sub = $$('.sub-btn[aria-expanded="true"]', nav)[0];
      if (sub) { setOpen(sub, false); sub.focus(); return; }
      var top = $$('.nav-btn[aria-expanded="true"]', nav)[0];
      if (top) { setOpen(top, false); top.focus(); return; }
      if (toggle && toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(toggle).display !== 'none') {
        toggle.setAttribute('aria-expanded', 'false'); list.classList.remove('is-open'); toggle.focus();
      }
    }
  });

  /* ---------- Accordions ---------- */
  $$('.acc-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
    });
  });

  var page = document.body.getAttribute('data-page');
  var main = $('#main-content');

  function typeImg(t) { return 'assets/type-' + t + '.svg'; }
  function siteCard(s) {
    return '<li><article class="card" data-component="site-card" data-instance="' + s.id + '"><img src="' + typeImg(s.type) + '" alt="" width="400" height="200"><div class="card-body"><h3><a href="site.html?id=' + s.id + '">' + esc(s.name) + '</a></h3><p><span class="badge">' + TYPES[s.type] + '</span><span class="badge">' + esc(s.region) + '</span></p><p>' + esc(s.summary) + '</p></div></article></li>';
  }

  /* ---------- Home ---------- */
  if (page === 'home') {
    var feat = $('#featured-site');
    if (feat) feat.innerHTML = siteCard(siteById('heron-glass-reach'));
  }

  /* ---------- Find a site ---------- */
  if (page === 'finder') {
    var f = $('#finder-form'), q = $('#q'), reg = $('#region'), sortSel = $('#sort'), out = $('#results'), cnt = $('#result-count'), act = $('#active-filters'), empty = $('#empty-state');
    REGIONS.forEach(function (r) { var o = document.createElement('option'); o.value = r; o.textContent = r; reg.appendChild(o); });
    var tbox = $('#type-boxes');
    Object.keys(TYPES).forEach(function (k) {
      tbox.insertAdjacentHTML('beforeend', '<label class="check"><input type="checkbox" name="type" value="' + k + '"> ' + TYPES[k] + '</label>');
    });
    var pp = new URLSearchParams(location.search);
    if (pp.get('q')) q.value = pp.get('q');
    if (pp.get('region')) reg.value = pp.get('region');
    pp.getAll('type').forEach(function (t) { var c = $('input[value="' + t + '"]', tbox); if (c) c.checked = true; });
    var render = function () {
      var term = q.value.trim().toLowerCase(), types = $$('input:checked', tbox).map(function (c) { return c.value; });
      var res = SITES.filter(function (s) {
        return (!term || (s.name + ' ' + s.summary + ' ' + s.region + ' ' + TYPES[s.type]).toLowerCase().indexOf(term) > -1) &&
          (!reg.value || s.region === reg.value) && (!types.length || types.indexOf(s.type) > -1);
      });
      res.sort(function (a, b) { return sortSel.value === 'za' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name); });
      out.innerHTML = res.map(siteCard).join('');
      cnt.textContent = res.length === 0 ? 'No sites match. 0 of ' + SITES.length + ' shown.' : res.length + (res.length === 1 ? ' site' : ' sites') + ' shown of ' + SITES.length + '.';
      empty.hidden = res.length !== 0;
      var chips = [];
      if (term) chips.push('Search: ' + term);
      if (reg.value) chips.push('Region: ' + reg.value);
      types.forEach(function (t) { chips.push('Type: ' + TYPES[t]); });
      act.innerHTML = chips.length ? '<span class="visually-hidden">Active filters: </span>' + '<ul class="chips">' + chips.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' : '<p class="hint">No filters applied.</p>';
    };
    var reset = function () { q.value = ''; reg.value = ''; sortSel.value = 'az'; $$('input[type=checkbox]', tbox).forEach(function (c) { c.checked = false; }); render(); q.focus(); };
    f.addEventListener('submit', function (e) { e.preventDefault(); render(); });
    f.addEventListener('input', render); f.addEventListener('change', render);
    $('#reset-filters').addEventListener('click', reset);
    $('#empty-reset').addEventListener('click', reset);
    render();
  }

  /* ---------- Site detail / site plan ---------- */
  if (page === 'site' || page === 'site-plan') {
    var s = siteById(param('id'));
    var h1 = $('#site-title');
    if (!s) {
      h1.textContent = 'Site not found';
      document.title = 'Site not found - Kelmoran Landmarks Service (fictional)';
      $('#site-body').innerHTML = '<p>No fictional site matches that address. <a href="find-a-site.html">Browse the site directory</a>.</p>';
      var tabs = $('#site-tabs'); if (tabs) tabs.hidden = true;
    } else {
      h1.textContent = s.name + (page === 'site-plan' ? ': plan your visit (sample)' : '');
      document.title = s.name + ' - Kelmoran Landmarks Service (fictional)';
      $$('[data-site-name]').forEach(function (n) { n.textContent = s.name; });
      $('#tab-overview').href = 'site.html?id=' + s.id; $('#tab-plan').href = 'site-plan.html?id=' + s.id;
      var rel = TOPICS.filter(function (t) { return t.sites.indexOf(s.id) > -1; });
      var relHtml = rel.length ? '<ul>' + rel.map(function (t) { return '<li><a href="topic.html?t=' + t.id + '">' + esc(t.name) + '</a></li>'; }).join('') + '</ul>' : '<p>No related topics in this sample.</p>';
      if (page === 'site') {
        $('#site-body').innerHTML = '<p><img src="' + typeImg(s.type) + '" alt="Abstract illustration for a ' + TYPES[s.type].toLowerCase() + ' site, not a real place" width="400" height="200"></p>' +
          '<p><span class="badge">' + TYPES[s.type] + '</span><span class="badge">' + esc(s.region) + '</span></p>' +
          '<h2>About this site</h2><p>' + esc(s.summary) + '</p>' +
          '<h2>Highlights (illustrative)</h2><ul>' + s.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>' +
          '<h2>Related topics</h2>' + relHtml;
      } else {
        $('#site-body').innerHTML = '<h2>Ways to explore (illustrative)</h2><ul>' + s.highlights.map(function (h) { return '<li>' + esc(h) + ' (described for illustration only)</li>'; }).join('') + '</ul>' +
          '<h2>Where this site sits in the story world</h2><p>' + esc(s.name) + ' lies in the imaginary ' + esc(s.region) + ' of the Republic of Kelmora. The region, the site and every feature named here are invented.</p>' +
          '<h2>Sample contact details</h2><dl class="facts"><dt>Sample phone</dt><dd>555-0142 (fictional)</dd><dt>Sample email</dt><dd>sites@kelmoran-landmarks.example (fictional, not a working address)</dd></dl>' +
          '<h2>Related topics</h2>' + relHtml;
      }
    }
  }

  /* ---------- Topics ---------- */
  if (page === 'topic') {
    var t = TOPICS.filter(function (x) { return x.id === param('t'); })[0];
    var th1 = $('#topic-title'), tb = $('#topic-body');
    if (param('t') && !t) {
      th1.textContent = 'Topic not found';
      tb.innerHTML = '<p>No fictional topic matches that address. Choose one below.</p>';
    }
    if (t) {
      th1.textContent = t.name;
      document.title = t.name + ' - Kelmoran Landmarks Service (fictional)';
      $('#topic-crumb').textContent = t.name;
      tb.innerHTML = '<p><span class="badge">' + esc(t.group) + '</span></p><p>' + esc(t.text) + '</p><h2>Related fictional sites</h2><ul class="grid">' + t.sites.map(function (i) { return siteCard(siteById(i)); }).join('') + '</ul><p><a href="topic.html">Back to all topics</a></p>';
    } else {
      var groups = {}; TOPICS.forEach(function (x) { (groups[x.group] = groups[x.group] || []).push(x); });
      tb.insertAdjacentHTML('beforeend', Object.keys(groups).map(function (g) {
        return '<section aria-labelledby="g-' + g.length + g.charCodeAt(0) + '" data-section="topic-group" data-component="topic-list"><h2 id="g-' + g.length + g.charCodeAt(0) + '">' + esc(g) + '</h2><ul class="grid">' + groups[g].map(function (x) { return '<li><article class="card"><div class="card-body"><h3><a href="topic.html?t=' + x.id + '">' + esc(x.name) + '</a></h3><p>' + esc(x.text) + '</p></div></article></li>'; }).join('') + '</ul></section>';
      }).join(''));
    }
  }

  /* ---------- News ---------- */
  if (page === 'news') {
    var ns = $('#news-cat'), nl = $('#news-list'), nc = $('#news-count');
    var rn = function () {
      var items = NEWS.filter(function (n) { return !ns.value || n.cat === ns.value; });
      nl.innerHTML = items.map(function (n) { return '<article class="news-item" data-component="news-item"><p class="hint"><time datetime="' + n.date + '">Sample date ' + n.date + '</time> <span class="badge">' + n.cat + '</span></p><h2>' + esc(n.title) + '</h2><p>' + esc(n.text) + '</p></article>'; }).join('');
      nc.textContent = items.length + (items.length === 1 ? ' item' : ' items') + ' shown.';
    };
    ns.addEventListener('change', rn); rn();
  }

  /* ---------- Contact form (simulation) ---------- */
  var cf = $('#contact-form');
  if (cf) {
    var summary = $('#error-summary'), result = $('#demo-result');
    var rules = [
      ['c-name', function (v) { return v.trim() ? '' : 'Enter a name. Use an invented name, not your own.'; }],
      ['c-email', function (v) { return !v.trim() ? 'Enter an email address. Use an invented one.' : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter an email address in the form name@example.test.'); }],
      ['c-topic', function (v) { return v ? '' : 'Choose a topic.'; }],
      ['c-message', function (v) { return v.trim().length >= 10 ? '' : 'Enter a message of at least 10 characters.'; }],
      ['c-demo', function (v, el) { return el.checked ? '' : 'Tick the box to confirm you understand this is a demo.'; }]
    ];
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      result.hidden = true;
      var errs = [];
      rules.forEach(function (r) {
        var el = document.getElementById(r[0]), msg = r[1](el.value, el), slot = document.getElementById(r[0] + '-err');
        if (msg) { errs.push({ id: r[0], msg: msg }); el.setAttribute('aria-invalid', 'true'); slot.textContent = msg; slot.hidden = false; }
        else { el.removeAttribute('aria-invalid'); slot.textContent = ''; slot.hidden = true; }
      });
      if (errs.length) {
        summary.innerHTML = '<h2>There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with the form</h2><ul>' + errs.map(function (x) { return '<li><a href="#' + x.id + '">' + esc(x.msg) + '</a></li>'; }).join('') + '</ul>';
        summary.hidden = false; summary.focus();
        $$('a', summary).forEach(function (a) { a.addEventListener('click', function (ev) { ev.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus(); }); });
      } else {
        summary.hidden = true; summary.innerHTML = '';
        cf.reset(); cf.hidden = true; result.hidden = false; result.focus();
      }
    });
    $('#demo-again').addEventListener('click', function () { result.hidden = true; cf.hidden = false; $('#c-name').focus(); });
  }
})();
