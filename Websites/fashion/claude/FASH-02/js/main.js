/* Vesperine replica (FASH-02): vanilla JS, no network calls. All data below is fictional demo data. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  /* SHARED-START: data and markup helpers; build-time pre-rendering uses this same block */
  const CATS = {
    issues: { label: 'Issues', href: 'journal-issues.html' },
    style: { label: 'Style', href: 'journal-style.html' },
    beauty: { label: 'Beauty', href: 'journal-archive.html?category=beauty' },
    culture: { label: 'Culture', href: 'journal-culture.html' },
    travel: { label: 'Travel', href: 'journal-travel.html' },
    entertaining: { label: 'Entertaining', href: 'journal-archive.html?category=entertaining' },
    music: { label: 'Music', href: 'journal-archive.html?category=music' },
    sport: { label: 'Sport', href: 'journal-archive.html?category=sport' }
  };
  const DEFAULT_BPID = '742601';
  const POSTS = [
    { id: '742601', cat: 'style', date: '2026-09-14', author: 'Imogen Hale', img: 'wide-1', title: 'Spring/Summer 2027: Runway Report',
      excerpt: 'Soft tailoring, loose knits and one very long scarf: what walked at the Vesperine show.',
      body: ['The show opened in near silence. Models crossed a floor of pale limestone wearing long, softly padded jackets in oatmeal and clay, and the room leaned in to hear the fabric move.',
        'Tailoring was the story. Trousers were cut high and wide, shirts were worn open over fine knit vests, and every waistband sat a little higher than expected. Nothing felt stiff.',
        'Colour came in small, deliberate doses: a sage coat, a rust scarf the length of the catwalk, a single pair of lilac shoes. Evening looks stayed monochrome, with gathered silk skirts and bare, simple tops.',
        'Our verdict: this is a collection built to be worn on a Tuesday. Browse every look on the runway page, then read the campaign story for how the pieces were styled on location.'] },
    { id: '742204', cat: 'style', date: '2026-02-02', author: 'Teodor Lind', img: 'wide-2', campaign: true, title: 'Spring/Summer 2026: The Campaign',
      excerpt: 'Six frames from a week at a seaside greenhouse, with the stories behind each look.',
      body: ['A week at a glass greenhouse by the sea gave the campaign its light.'] },
    { id: '742590', cat: 'style', date: '2026-09-10', author: 'Imogen Hale', img: 'look-2', title: 'Spring/Summer 2027: The Collection',
      excerpt: 'A first look at the full line, from featherweight coats to the new everyday tote.',
      body: ['The new collection is organised around three ideas: layers that travel, colours borrowed from garden walls, and shapes that forgive a long day.',
        'Highlights include a reversible trench, a knit polo in three weights, and a structured tote made from recycled leather offcuts.'] },
    { id: '742580', cat: 'style', date: '2026-11-03', author: 'Teodor Lind', img: 'look-5', title: 'Introducing Resort 2027',
      excerpt: 'Warm-weather linen, bright knits and sandals made for cobbled streets.',
      body: ['Resort 2027 is the collection for people who pack carry-on only. Everything is washable, wrinkle-friendly and happy in a hot afternoon.',
        'Look for the striped linen shirt dress, a crocheted cardigan that folds to the size of a paperback, and flat sandals with a cushioned insole.'] },
    { id: '742570', cat: 'culture', date: '2026-10-22', author: 'Priya Nandakumar', img: 'wide-3', title: 'The Case for the Long Lunch',
      excerpt: 'Why the best conversations still happen over three courses and no phones.',
      body: ['We asked six friends of the house to describe the best meal of their year. Five of them named a lunch that ran past four o’clock.',
        'The common thread was not the food. It was the permission to stay put, to let the table empty slowly and the light change in the window.'] },
    { id: '742560', cat: 'culture', date: '2026-06-12', author: 'Priya Nandakumar', img: 'look-3', title: 'Three Ceramicists, One Shared Kiln',
      excerpt: 'Inside a studio where glazes, firing schedules and lunch are all shared.',
      body: ['In a converted bus depot, three makers fire their work in a single gas kiln and take turns loading it before sunrise.',
        'Their pieces look nothing alike, yet visitors say the studio feels like one mind. The secret, they admit, is a very strict rota.'] },
    { id: '742550', cat: 'travel', date: '2026-10-05', author: 'Teodor Lind', img: 'wide-1', title: 'A Weekend in Lisbon, Packed Light',
      excerpt: 'One bag, three outfits and a list of hills worth climbing.',
      body: ['Lisbon rewards flat shoes and a good scarf. We packed one bag, wore the heaviest layers on the plane and never regretted it.',
        'Our route linked a morning market, two viewpoints and a tiny tile museum. Leave an afternoon empty for wandering; you will need it.'] },
    { id: '742540', cat: 'travel', date: '2025-09-18', author: 'Teodor Lind', img: 'look-6', title: 'Slow Trains Through the Dolomites',
      excerpt: 'A week of regional railways, mountain huts and very good soup.',
      body: ['The regional line climbs slowly enough that you can read the names on the farmhouses. We changed trains four times and never felt rushed.',
        'Pack layers, a paper map and small change for the hut kitchens. The soup is worth the climb.'] },
    { id: '742530', cat: 'issues', date: '2026-10-15', author: 'Imogen Hale', img: 'look-4', title: 'Issue 12: The Quiet Return of Repair',
      excerpt: 'Tailors, cobblers and knit menders are busy again. We spent a month in their workshops.',
      body: ['Repair counters are back on the high street, and they are booked weeks ahead. Customers bring in coats their parents bought.',
        'This issue also looks at what makes a garment mendable: seam allowances, spare buttons and fabric that ages well.'] },
    { id: '742520', cat: 'issues', date: '2025-11-20', author: 'Priya Nandakumar', img: 'wide-2', title: 'Issue 11: What We Keep',
      excerpt: 'Seven people on the one garment they will never give away.',
      body: ['A wedding jacket, a swimming cap, a lopsided scarf knitted in a hospital waiting room. Each object came with a story and a stain.',
        'The conclusion was unanimous: we keep what remembers us back.'] },
    { id: '742510', cat: 'beauty', date: '2026-10-28', author: 'Priya Nandakumar', img: 'look-1', title: 'A Five-Minute Autumn Routine',
      excerpt: 'Four steps, one mirror and no more than a pea of anything.',
      body: ['As the air dries out, simplify. Cleanse once, add a light oil, press in a balm and finish with sunscreen even on grey days.',
        'Keep the shelf short: a routine you can finish before the kettle boils is a routine you will keep.'] },
    { id: '742500', cat: 'entertaining', date: '2026-11-05', author: 'Imogen Hale', img: 'wide-3', title: 'Soup Suppers for Small Tables',
      excerpt: 'Two pots, one loaf and six chairs: a menu that scales from two guests to eight.',
      body: ['Make the soup the day before. Roast squash with sage, simmer lentils with lemon, and serve both with warm bread and a bowl of salted butter.',
        'Set the table early, light one candle per guest and let people serve themselves. Conversation does the rest.'] },
    { id: '742490', cat: 'music', date: '2026-09-30', author: 'Teodor Lind', img: 'look-2', title: 'Playlist: Rain on the Atelier Roof',
      excerpt: 'Forty minutes of piano, cello and brushed drums for a grey afternoon.',
      body: ['Our studio plays this list when the pattern cutters are working on something fiddly. It is mostly instrumental and entirely unhurried.',
        'Tracks are described by mood only; this is a demo page and no audio is included.'] },
    { id: '742480', cat: 'sport', date: '2025-12-02', author: 'Imogen Hale', img: 'look-5', title: 'Trail Notes: The First Cold Run',
      excerpt: 'What to wear, what to skip and why the second mile is the warmest.',
      body: ['Start slightly cold. Your body will warm within ten minutes, and nobody enjoys peeling off a sweaty jacket at the top of a hill.',
        'A light wind layer, thin gloves and a headband cover most mornings. Save the heavier gear for snow.'] }
  ];
  const LOOKS = [
    { n: 1, group: 'tailoring', name: 'Oatmeal long jacket with high-waisted trousers', img: 'look-1' },
    { n: 2, group: 'tailoring', name: 'Charcoal pinstripe suit, open collar', img: 'look-4' },
    { n: 3, group: 'knitwear', name: 'Rust knit vest over a white shirt', img: 'look-6' },
    { n: 4, group: 'outerwear', name: 'Sage wrap coat with oversized pockets', img: 'look-3' },
    { n: 5, group: 'evening', name: 'Gathered silk skirt in midnight blue', img: 'look-2' },
    { n: 6, group: 'knitwear', name: 'Cropped cardigan with ribbed hem', img: 'look-6' },
    { n: 7, group: 'tailoring', name: 'Sand linen trousers and matching shirt', img: 'look-4' },
    { n: 8, group: 'evening', name: 'Column dress in warm grey', img: 'look-5' },
    { n: 9, group: 'outerwear', name: 'Reversible trench in clay and cream', img: 'look-1' },
    { n: 10, group: 'knitwear', name: 'Chunky scarf, long enough to trail', img: 'look-3' },
    { n: 11, group: 'evening', name: 'Draped jersey gown with bare shoulders', img: 'look-2' },
    { n: 12, group: 'tailoring', name: 'Cream double-breasted blazer and slim skirt', img: 'look-5' }
  ];
  const LOOK_GROUPS = { all: 'All looks', tailoring: 'Tailoring', knitwear: 'Knitwear', outerwear: 'Outerwear', evening: 'Evening' };
  const fmt = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
  const postHref = (p) => (p.campaign ? 'campaign.html' : 'article.html?bpid=' + p.id);
  const byDate = (a, b) => (a.date < b.date ? 1 : -1);
  const cardHTML = (p, level) => `<li class="card" data-component="story-card"><img src="assets/${p.img}.svg" alt="" width="800" height="600" loading="lazy"><div class="card-body"><p class="eyebrow">${CATS[p.cat].label} <span aria-hidden="true">·</span> <time datetime="${p.date}">${fmt(p.date)}</time></p><h${level} class="card-title"><a href="${postHref(p)}">${p.title}</a></h${level}><p>${p.excerpt}</p><a class="more" href="${postHref(p)}" aria-label="Read more: ${p.title}">Read More</a></div></li>`;
  const related = (p) => POSTS.filter((q) => q.id !== p.id).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat) || byDate(a, b)).slice(0, 3);
  const breadcrumbHTML = (p) => `<nav aria-label="Breadcrumb" class="breadcrumb" data-section="breadcrumb" data-component="breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="journal.html">Vesper Notes</a></li><li><a href="${CATS[p.cat].href}">${CATS[p.cat].label}</a></li><li><span aria-current="page">${p.title}</span></li></ol></nav>`;
  const shareHTML = (p) => `<div class="share" data-section="share" data-component="share-links"><h2 class="share-title">Share this story</h2><button type="button" class="btn btn-secondary" data-copy-link>Copy link</button> <a class="btn btn-secondary" href="mailto:?subject=${encodeURIComponent(p.title)}">Email this story</a><p class="field-hint" role="status" data-copy-status></p></div>`;
  const articleHTML = (p) => `${breadcrumbHTML(p)}<article class="article" data-section="article" data-component="article-body"><header class="article-header"><p class="eyebrow">${CATS[p.cat].label}</p><h1>${p.title}</h1><p class="byline">By ${p.author} <span aria-hidden="true">·</span> <time datetime="${p.date}">${fmt(p.date)}</time></p></header><figure><img src="assets/${p.img}.svg" alt="Placeholder illustration for the story “${p.title}”" width="1600" height="900"><figcaption>Placeholder artwork, not a photograph.</figcaption></figure><div class="prose">${p.body.map((t) => `<p>${t}</p>`).join('')}</div></article>${shareHTML(p)}`;
  const lookHTML = (l) => `<li data-group="${l.group}"><button type="button" class="look" data-look="${l.n}"><img src="assets/${l.img}.svg" alt="Look ${l.n}, ${l.group}: ${l.name}" width="800" height="1000" loading="lazy"><span class="look-label">Look ${l.n} <span class="look-group">${LOOK_GROUPS[l.group]}</span></span></button></li>`;
  /* SHARED-END */

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;

  /* ---------- Header: mega menu, mobile disclosure, search disclosure ---------- */
  const menu = $('#primary-menu');
  const menuToggle = $('#menu-toggle');
  const triggers = $$('.nav-trigger');
  const searchToggle = $('#search-toggle');
  const searchPanel = $('#header-search');
  const panelOf = (t) => document.getElementById(t.getAttribute('aria-controls'));
  const setPanel = (t, open) => { t.setAttribute('aria-expanded', String(open)); panelOf(t).hidden = !open; };
  const closePanels = (except) => triggers.forEach((t) => { if (t !== except) setPanel(t, false); });
  const setSearch = (open) => { searchToggle.setAttribute('aria-expanded', String(open)); searchPanel.hidden = !open; };
  const setMenu = (open) => { menuToggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); };

  triggers.forEach((t) => {
    setPanel(t, false);
    t.addEventListener('click', () => {
      // a pointer click right after a hover-open keeps the panel open instead of toggling it shut
      const open = t.dataset.hovered ? true : t.getAttribute('aria-expanded') !== 'true';
      delete t.dataset.hovered;
      closePanels(t); setPanel(t, open);
    });
    const item = t.closest('.nav-item');
    const hoverable = () => window.matchMedia('(hover: hover) and (min-width: 901px)').matches;
    item.addEventListener('mouseenter', () => { if (hoverable()) { closePanels(t); setPanel(t, true); t.dataset.hovered = '1'; } });
    item.addEventListener('mouseleave', () => { if (hoverable()) { setPanel(t, false); delete t.dataset.hovered; } });
  });
  setSearch(false);
  searchToggle.addEventListener('click', () => {
    const open = searchToggle.getAttribute('aria-expanded') !== 'true';
    setSearch(open);
    if (open) $('#site-search-q').focus();
  });
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openTrigger = triggers.find((t) => t.getAttribute('aria-expanded') === 'true');
    if (openTrigger) { const inside = panelOf(openTrigger).contains(document.activeElement); closePanels(); if (inside) openTrigger.focus(); return; }
    if (searchToggle.getAttribute('aria-expanded') === 'true') { setSearch(false); searchToggle.focus(); return; }
    if (menuToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); menuToggle.focus(); }
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav-item')) closePanels(); });
  $('#primary-nav').addEventListener('focusout', (e) => { if (e.relatedTarget && !$('#primary-nav').contains(e.relatedTarget)) closePanels(); });

  /* ---------- Forms: shared validation with inline errors, summary, focus ---------- */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fieldError = (f) => document.getElementById(f.id + '-error');
  function validate(form) {
    const problems = [];
    $$('[data-msg-required]', form).forEach((f) => {
      const empty = f.type === 'checkbox' ? !f.checked : !f.value.trim();
      let msg = '';
      if (empty) msg = f.dataset.msgRequired;
      else if (f.type === 'email' && !EMAIL.test(f.value.trim())) msg = f.dataset.msgFormat;
      const err = fieldError(f);
      err.textContent = msg;
      err.hidden = !msg;
      f.setAttribute('aria-invalid', String(Boolean(msg)));
      if (msg) problems.push({ field: f, msg });
    });
    const summary = $('.error-summary', form);
    summary.hidden = !problems.length;
    summary.innerHTML = problems.length
      ? `<p class="error-summary-title">There ${problems.length === 1 ? 'is 1 problem' : 'are ' + problems.length + ' problems'} with your entry</p><ul>${problems.map((x) => `<li><a href="#${x.field.id}">${x.msg}</a></li>`).join('')}</ul>`
      : '';
    if (problems.length) summary.focus();
    return problems;
  }
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.error-summary a');
    if (!link) return;
    e.preventDefault();
    document.getElementById(link.getAttribute('href').slice(1)).focus();
  });
  $$('form[data-validate]').forEach((form) => form.addEventListener('submit', (e) => {
    const problems = validate(form);
    if (problems.length) { e.preventDefault(); return; }
    if (form.dataset.validate === 'demo') {
      e.preventDefault();
      const done = $('[data-demo-success]', form.parentElement);
      done.textContent = `Demo only: nothing was sent or stored. In a live site, a confirmation would go to ${$('[type=email]', form).value.trim()}.`;
      done.hidden = false;
      form.hidden = true;
      done.focus();
    }
  }));

  /* ---------- Share: copy link ---------- */
  document.addEventListener('click', async (e) => {
    if (!e.target.closest('[data-copy-link]')) return;
    const status = $('[data-copy-status]');
    try { await navigator.clipboard.writeText(location.href); status.textContent = 'Link copied.'; }
    catch (err) { status.textContent = 'Could not copy automatically. Copy the address from your browser address bar.'; }
  });

  /* ---------- Story lists ---------- */
  const renderCards = (ul, posts, level) => { ul.innerHTML = posts.map((p) => cardHTML(p, level)).join(''); };
  const sorted = (posts, dir) => [...posts].sort((a, b) => (dir === 'oldest' ? -byDate(a, b) : byDate(a, b)));
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  const latest = $('[data-render="latest"]');
  if (latest) renderCards(latest, [...POSTS].sort(byDate).slice(0, 3), 3);

  if (page === 'journal') {
    const list = $('[data-render="all-stories"]'), more = $('#load-more'), status = $('#list-status');
    const all = [...POSTS].sort(byDate);
    let shown = 6;
    const draw = () => { renderCards(list, all.slice(0, shown), 2); status.textContent = `Showing ${shown >= all.length ? all.length : shown} of ${all.length} stories.`; more.hidden = shown >= all.length; };
    more.addEventListener('click', () => { shown += 6; draw(); $$('.card-title a', list)[shown - 6].focus(); });
    draw();
  }

  if (page === 'category') {
    const list = $('[data-render="category-stories"]'), sort = $('#sort'), status = $('#list-status');
    const posts = POSTS.filter((p) => p.cat === list.dataset.category);
    const draw = () => { renderCards(list, sorted(posts, sort.value), 2); status.textContent = `${plural(posts.length, 'story')}, ${sort.value === 'oldest' ? 'oldest' : 'newest'} first.`; };
    sort.addEventListener('change', draw);
    draw();
  }

  if (page === 'archive') {
    const form = $('#archive-filters'), list = $('[data-render="archive-stories"]'), status = $('#list-status'), empty = $('#archive-empty');
    const q = $('#af-q'), cat = $('#af-cat'), year = $('#af-year'), sort = $('#af-sort');
    cat.innerHTML = '<option value="">All sections</option>' + Object.entries(CATS).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
    year.innerHTML = '<option value="">All years</option>' + [...new Set(POSTS.map((p) => p.date.slice(0, 4)))].sort().reverse().map((y) => `<option>${y}</option>`).join('');
    if (CATS[params.get('category')]) cat.value = params.get('category');
    if ([...year.options].some((o) => o.value === params.get('year'))) year.value = params.get('year');
    const draw = () => {
      const term = q.value.trim().toLowerCase();
      const hits = sorted(POSTS.filter((p) => (!cat.value || p.cat === cat.value) && (!year.value || p.date.startsWith(year.value)) && (!term || (p.title + ' ' + p.excerpt).toLowerCase().includes(term))), sort.value);
      renderCards(list, hits, 2);
      empty.hidden = hits.length > 0;
      status.textContent = hits.length ? `${plural(hits.length, 'story')} found.` : 'No stories found.';
    };
    form.addEventListener('submit', (e) => e.preventDefault());
    form.addEventListener('input', draw);
    form.addEventListener('change', draw);
    form.addEventListener('reset', () => setTimeout(() => { cat.value = ''; draw(); }));
    $('#archive-empty-reset').addEventListener('click', () => { form.reset(); q.focus(); });
    draw();
  }

  if (page === 'search') {
    const term = (params.get('q') || '').trim();
    const input = $('#search-q'), status = $('#list-status'), list = $('[data-render="search-results"]'), empty = $('#search-empty'), prompt = $('#search-prompt');
    input.value = term;
    if (params.has('q') && !term) {
      validate($('#search-form'));
      prompt.hidden = true;
    } else if (term) {
      prompt.hidden = true;
      const words = term.toLowerCase().split(/\s+/);
      const hits = POSTS.filter((p) => { const hay = (p.title + ' ' + p.excerpt + ' ' + p.author + ' ' + CATS[p.cat].label + ' ' + p.body.join(' ')).toLowerCase(); return words.every((w) => hay.includes(w)); }).sort(byDate);
      renderCards(list, hits, 2);
      status.textContent = hits.length ? `${plural(hits.length, 'result')} for “${term}”.` : '';
      empty.hidden = hits.length > 0;
      if (!hits.length) $('#search-empty-term').textContent = term;
    }
  }

  /* ---------- Article page: swap story by ?bpid= ---------- */
  const root = $('#article-root');
  if (root) {
    const id = params.get('bpid');
    if (id && id !== DEFAULT_BPID) {
      const post = POSTS.find((p) => p.id === id && !p.campaign);
      if (post) {
        root.innerHTML = articleHTML(post);
        document.title = post.title + ' | Vesper Notes';
        renderCards($('[data-render="related"]'), related(post), 3);
      } else {
        root.innerHTML = '<h1>We could not find that story</h1><p class="error-text">The story number in the address does not match any story in this demo.</p><p><a class="btn" href="journal.html">Browse Vesper Notes</a> <a class="btn btn-secondary" href="journal-archive.html">Open the archive</a></p>';
        document.title = 'Story not found | Vesper Notes';
        $('[data-section="related-stories"]').hidden = true;
      }
    }
  }

  /* ---------- Lookbook carousel (campaign page) ---------- */
  const carousel = $('[data-component="lookbook-carousel"]');
  if (carousel) {
    const slides = $$('.slide', carousel), dots = $$('.dot', carousel), count = $('.carousel-count', carousel);
    let index = 0;
    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, k) => { s.hidden = k !== index; });
      dots.forEach((d, k) => { if (k === index) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      count.textContent = `Frame ${index + 1} of ${slides.length}`;
    };
    $('[data-prev]', carousel).addEventListener('click', () => show(index - 1));
    $('[data-next]', carousel).addEventListener('click', () => show(index + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => show(k)));
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { show(index - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { show(index + 1); e.preventDefault(); }
    });
    show(0);
  }

  /* ---------- Runway show: stream dialog, looks filter, look viewer ---------- */
  const streamDialog = $('#stream-dialog');
  if (streamDialog) {
    $('#stream-open').addEventListener('click', () => streamDialog.showModal());
    streamDialog.addEventListener('click', (e) => { if (e.target === streamDialog) streamDialog.close(); });
  }
  const gallery = $('[data-render="looks"]');
  if (gallery) {
    const dialog = $('#look-dialog'), status = $('#list-status');
    let group = 'all', current = 0;
    const visible = () => LOOKS.filter((l) => group === 'all' || l.group === group);
    const drawLooks = () => {
      const items = visible();
      gallery.innerHTML = items.map(lookHTML).join('');
      status.textContent = `Showing ${plural(items.length, 'look')}: ${LOOK_GROUPS[group].toLowerCase()}.`;
    };
    $$('[data-filter]').forEach((b) => b.addEventListener('click', () => {
      group = b.dataset.filter;
      $$('[data-filter]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      drawLooks();
    }));
    const showLook = (i) => {
      const items = visible();
      current = (i + items.length) % items.length;
      const l = items[current];
      $('#look-dialog-title').textContent = `Look ${l.n}`;
      $('#look-dialog-img').src = `assets/${l.img}.svg`;
      $('#look-dialog-img').alt = `Look ${l.n}: ${l.name}`;
      $('#look-dialog-text').textContent = `${l.name}. Category: ${LOOK_GROUPS[l.group]}. Placeholder artwork. Shopping from this look is not available in the demo.`;
    };
    gallery.addEventListener('click', (e) => {
      const b = e.target.closest('[data-look]');
      if (!b) return;
      showLook(visible().findIndex((l) => l.n === Number(b.dataset.look)));
      dialog.showModal();
    });
    $('[data-look-prev]', dialog).addEventListener('click', () => showLook(current - 1));
    $('[data-look-next]', dialog).addEventListener('click', () => showLook(current + 1));
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    drawLooks();
  }

  /* ---------- Demo notice page ---------- */
  if (page === 'demo') {
    const topic = (params.get('topic') || 'This link').slice(0, 60);
    $('#demo-topic').textContent = topic;
    $('#demo-topic-inline').textContent = topic;
    document.title = `Demo link: ${topic} | Vesperine`;
  }
})();
