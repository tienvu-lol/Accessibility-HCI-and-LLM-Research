/* Fable & Hem replica: vanilla JS, inline sample data (no fetch, no network). */
const SECTIONS = {
  fashion: 'Fashion', beauty: 'Beauty', celebrity: 'Celebrity', culture: 'Culture', weddings: 'Weddings'
};
const AUTHORS = [
  { id: 'a1', name: 'Imogen Calder-Voss', role: 'Fashion Features Director', bio: 'Imogen Calder-Voss leads long-form fashion coverage at Fable & Hem, from designer profiles to the biannual runway report. Before joining the magazine, Imogen spent a decade reporting on tailoring houses and textile mills.' },
  { id: 'a2', name: 'Tobias Renwick', role: 'Beauty Editor', bio: 'Tobias Renwick edits the beauty desk, with a focus on hair, skin barrier care and the quiet revival of classic makeup techniques.' },
  { id: 'a3', name: 'Priya Anselm', role: 'Culture Editor', bio: 'Priya Anselm covers film costume, television, books and the podcast. Priya also hosts the magazine\'s weekly conversation series.' },
  { id: 'a4', name: 'Dalia Okonjo-Reyes', role: 'Senior Market Editor', bio: 'Dalia Okonjo-Reyes tracks what is worth buying, from bridal gowns to everyday bags, and writes the shopping guides.' },
  { id: 'a5', name: 'Marguerite Ellsworth-Nair', role: 'Contributing Writer', bio: 'Marguerite Ellsworth-Nair is a contributing writer based abroad. No stories are currently listed for this contributor.' }
];
const STORIES = [
  { id: 'tailoring-decade', t: 'Three Tailoring Obsessives Unpack a Designer’s Defining Decade', d: 'A pattern cutter, a collector and a costume historian revisit the sharpest shoulders of the nineties and explain why they are back.', s: 'fashion', f: ['trend', 'magazine'], a: 'a1', dt: '2026-11-08', m: 9, art: 'rose', tags: ['Tailoring'] },
  { id: 'wide-leg-denim', t: 'The Wide-Leg Jean Has a New Rival: The Barrel Leg', d: 'Denim buyers say the shape is gaining ground. Here is how to wear it without losing your proportions.', s: 'fashion', f: ['trend'], a: 'a4', dt: '2026-11-07', m: 5, art: 'sky', tags: ['Denim'] },
  { id: 'coat-season', t: 'Eight Coats Worth Queuing For This Winter', d: 'From boiled wool to bonded shearling, the outerwear that earns its place in the hall closet.', s: 'fashion', f: ['trend'], a: 'a4', dt: '2026-11-06', m: 6, art: 'ink', tags: ['Outerwear'] },
  { id: 'small-bag-again', t: 'Why the Tiny Bag Is Back on Every Arm', d: 'It holds a key and a lip balm, and designers say that is exactly the point.', s: 'fashion', f: ['trend'], a: 'a4', dt: '2026-11-05', m: 4, art: 'sand', tags: ['Accessories'] },
  { id: 'oxblood-everything', t: 'Oxblood Is the Color of the Season. Here’s How to Wear It', d: 'A deep red-brown is replacing black in the evening wardrobe, with help from velvet and patent leather.', s: 'fashion', f: ['trend'], a: 'a1', dt: '2026-11-04', m: 5, art: 'plum', tags: ['Color'] },
  { id: 'knit-layers', t: 'How to Layer Knits Without Looking Bulky', d: 'Three rules from a stylist who dresses people for sub-zero shoots.', s: 'fashion', f: ['trend'], a: 'a1', dt: '2026-11-02', m: 4, art: 'sage', tags: ['Outerwear'] },
  { id: 'belt-comeback', t: 'The Wide Belt Is Cinching Everything', d: 'Coats, cardigans and even oversized shirts get a defined waist this season.', s: 'fashion', f: ['trend'], a: 'a4', dt: '2026-10-30', m: 3, art: 'sand', tags: ['Accessories'] },
  { id: 'tuxedo-day', t: 'The Tuxedo Jacket Goes to Work', d: 'Satin lapels over denim, flannel trousers and sneakers: the evening staple is now a daytime one.', s: 'fashion', f: ['trend'], a: 'a1', dt: '2026-10-27', m: 5, art: 'ink', tags: ['Tailoring'] },
  { id: 'milan-notes', t: 'Milan Week Notes: Softness Wins the Front Row', d: 'Relaxed silhouettes and unlined fabrics dominated a week of quietly confident collections.', s: 'fashion', f: ['week'], a: 'a1', dt: '2026-10-25', m: 7, art: 'rose', tags: ['Runway'] },
  { id: 'paris-front-row', t: 'Paris Front Row: Who Sat Where, and What They Wore', d: 'A seating-chart reading of the week’s biggest shows, from debut collections to returning favorites.', s: 'fashion', f: ['week'], a: 'a1', dt: '2026-10-23', m: 6, art: 'plum', tags: ['Runway'] },
  { id: 'runway-report', t: 'Runway Report: Six Shapes You Will See Everywhere', d: 'Dropped waists, sculpted sleeves, pleated skirts and three more silhouettes from the season’s shows.', s: 'fashion', f: ['week', 'report'], a: 'a1', dt: '2026-10-21', m: 8, art: 'sky', tags: ['Runway'] },
  { id: 'street-style-week', t: 'Street Style From a Week of Rain and Red Lipstick', d: 'Umbrellas, trench coats and a surprising amount of crimson outside the venues.', s: 'fashion', f: ['week'], a: 'a4', dt: '2026-10-20', m: 4, art: 'sage', tags: ['Street style'] },
  { id: 'glossy-hair', t: 'The Glossy Bob Is Easier Than It Looks', d: 'A senior colorist explains the three-step routine behind mirror-bright hair.', s: 'beauty', f: [], a: 'a2', dt: '2026-11-08', m: 5, art: 'sand', tags: ['Hair'] },
  { id: 'winter-skin', t: 'Protect Your Skin Barrier Before the Heating Comes On', d: 'Dermatologists agree on a short list of habits that stop winter dryness before it starts.', s: 'beauty', f: [], a: 'a2', dt: '2026-11-05', m: 6, art: 'sky', tags: ['Skin'] },
  { id: 'minimal-nails', t: 'Minimal Nails, Maximum Polish: A Manicurist’s Guide', d: 'Short, neutral and impeccable: the case for the quiet manicure.', s: 'beauty', f: [], a: 'a2', dt: '2026-11-01', m: 3, art: 'rose', tags: ['Nails'] },
  { id: 'blurred-lip', t: 'Blurred Lips, Explained in Four Steps', d: 'Makeup artists share how to get a soft, diffused edge that lasts through dinner.', s: 'beauty', f: [], a: 'a2', dt: '2026-10-28', m: 4, art: 'plum', tags: ['Makeup'] },
  { id: 'gala-looks', t: 'Every Dress From the Autumn Gala, Ranked', d: 'Velvet gowns, sheer capes and one very memorable feathered cuff.', s: 'celebrity', f: [], a: 'a1', dt: '2026-11-07', m: 7, art: 'plum', tags: ['Red carpet'] },
  { id: 'cover-lead', t: 'Cover Story: The Actor Who Walked Away, and Why She Returned', d: 'An unhurried afternoon conversation about risk, craft and the clothes that carry a character.', s: 'celebrity', f: ['cover'], a: 'a3', dt: '2026-11-06', m: 12, art: 'rose', tags: ['Cover story'] },
  { id: 'cover-director', t: 'Cover Story: A Director’s Wardrobe Is Made of Borrowed Jackets', d: 'On set and off, one filmmaker dresses for the work, not the camera.', s: 'celebrity', f: ['cover'], a: 'a3', dt: '2026-10-15', m: 10, art: 'ink', tags: ['Cover story'] },
  { id: 'cover-musician', t: 'Cover Story: The Musician Who Designs Her Own Stage Clothes', d: 'Inside a studio where sketches, safety pins and sound checks share one table.', s: 'celebrity', f: ['cover'], a: 'a3', dt: '2026-09-30', m: 11, art: 'sage', tags: ['Cover story'] },
  { id: 'premiere-looks', t: 'Premiere Week: The Looks That Photographed Best', d: 'Our picks from three film premieres, with notes on tailoring and tone.', s: 'celebrity', f: [], a: 'a1', dt: '2026-10-29', m: 5, art: 'sky', tags: ['Red carpet'] },
  { id: 'film-costume', t: 'The Costume Designer Behind This Year’s Period Drama', d: 'A conversation about corsetry, color and why a hem can tell a whole story.', s: 'culture', f: [], a: 'a3', dt: '2026-11-03', m: 8, art: 'sand', tags: ['Film & TV'] },
  { id: 'tv-wardrobe', t: 'Best-Dressed Characters on Television Right Now', d: 'Our pick of the small-screen wardrobes worth studying, from a detective’s trench to a chef’s apron.', s: 'culture', f: [], a: 'a3', dt: '2026-10-26', m: 6, art: 'ink', tags: ['Film & TV'] },
  { id: 'fall-books', t: 'Fall Books for Anyone Who Loves Fashion History', d: 'Biographies, oral histories and a very good book about buttons.', s: 'culture', f: [], a: 'a3', dt: '2026-10-22', m: 5, art: 'sage', tags: ['Books'] },
  { id: 'podcast-episode', t: 'Podcast: What We Wear to Say Goodbye', d: 'This week’s episode on funeral dress codes, mourning color and modern ritual.', s: 'culture', f: ['podcast'], a: 'a3', dt: '2026-11-04', m: 38, art: 'plum', tags: ['Podcast'] },
  { id: 'sleeve-gown', t: 'Bridal Dresses With Sleeves Are Having a Moment', d: 'Bishop, puff and long lace: designers are covering arms in every style.', s: 'weddings', f: [], a: 'a4', dt: '2026-11-05', m: 6, art: 'sand', tags: ['Dresses'] },
  { id: 'barn-venues', t: 'Twelve Venues That Make a Small Wedding Feel Grand', d: 'Orchards, libraries and converted mills for guest lists under eighty.', s: 'weddings', f: [], a: 'a4', dt: '2026-10-31', m: 7, art: 'sage', tags: ['Ideas'] },
  { id: 'guest-dress', t: 'What to Wear as a Guest to an Autumn Wedding', d: 'A dress code decoder for black tie, cocktail and the dreaded “festive.”', s: 'weddings', f: [], a: 'a4', dt: '2026-10-24', m: 5, art: 'rose', tags: ['Guests'] }
];
const PRODUCTS = [
  { id: 'p1', n: 'Pleated Midi Dress in Oxblood', cat: 'Dresses', price: 289, art: 'plum' },
  { id: 'p2', n: 'Structured Mini Bag', cat: 'Bags', price: 195, art: 'sand' },
  { id: 'p3', n: 'Barrel-Leg Jeans in Indigo', cat: 'Denim', price: 128, art: 'sky' },
  { id: 'p4', n: 'Boiled Wool Wrap Coat', cat: 'Outerwear', price: 420, art: 'ink' },
  { id: 'p5', n: 'Satin Slingback Heels', cat: 'Shoes', price: 175, art: 'rose' },
  { id: 'p6', n: 'Rib-Knit Longline Cardigan', cat: 'Knitwear', price: 98, art: 'sage' },
  { id: 'p7', n: 'Silk Slip Dress in Ivory', cat: 'Dresses', price: 245, art: 'sand' },
  { id: 'p8', n: 'Leather Ankle Boots', cat: 'Shoes', price: 210, art: 'ink' }
];

(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const params = new URLSearchParams(location.search);
  const author = (id) => AUTHORS.find((a) => a.id === id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function say(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    clearTimeout(say.timer);
    say.timer = setTimeout(() => { t.textContent = ''; }, 9000);
  }

  function cardHtml(s) {
    const href = 'article.html?story=' + s.id;
    return '<article class="card" data-component="story-card" data-story="' + s.id + '">' +
      '<a class="card-img" href="' + href + '" tabindex="-1" aria-hidden="true"><img src="assets/art-' + s.art + '.svg" alt="" width="800" height="600" loading="lazy"></a>' +
      '<div class="card-body"><p class="kicker">' + SECTIONS[s.s] + '</p><h3 class="card-title"><a href="' + href + '">' + esc(s.t) + '</a></h3>' +
      '<p class="dek">' + esc(s.d) + '</p><p class="meta">By ' + esc(author(s.a).name) + ' · ' + fmtDate(s.dt) + '</p></div></article>';
  }

  /* Disclosures: submenus, search toggle, editions list, sidepanel accordions */
  function setExpanded(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    const target = document.getElementById(btn.getAttribute('aria-controls'));
    if (target.hasAttribute('data-mobile-toggle')) target.classList.toggle('open', open);
    else target.hidden = !open;
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toggle]');
    if (btn) {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      if (btn.hasAttribute('data-autoclose')) $$('[data-autoclose][aria-expanded="true"]').forEach((b) => b !== btn && setExpanded(b, false));
      setExpanded(btn, open);
      if (open && btn.hasAttribute('data-focus-in')) { const i = $('input', document.getElementById(btn.getAttribute('aria-controls'))); if (i) i.focus(); }
      return;
    }
    $$('[data-autoclose][aria-expanded="true"]').forEach((b) => { if (!b.parentElement.contains(e.target)) setExpanded(b, false); });
    const opener = e.target.closest('[data-open-dialog]');
    if (opener) { const d = document.getElementById(opener.dataset.openDialog); d.returnTo = opener; d.showModal(); return; }
    if (e.target.closest('[data-close-dialog]')) { e.target.closest('dialog').close(); return; }
    if (e.target.tagName === 'DIALOG') e.target.close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    $$('[data-autoclose][aria-expanded="true"]').forEach((b) => {
      const hadFocus = b.parentElement.contains(document.activeElement);
      setExpanded(b, false);
      if (hadFocus) b.focus();
    });
  });
  $$('dialog').forEach((d) => d.addEventListener('close', () => { if (d.returnTo) d.returnTo.focus(); }));

  /* Forms: shared validation, error summary, focus management, demo success */
  function labelText(f) {
    const l = document.querySelector('label[for="' + f.id + '"]');
    return l ? l.firstChild.textContent.trim() : f.name;
  }
  function validate(form) {
    const errors = [];
    $$('input, select, textarea', form).forEach((f) => {
      const box = document.getElementById(f.id + '-error');
      let msg = '';
      if (!f.checkValidity()) {
        msg = f.validity.valueMissing ? (f.dataset.errorMissing || 'Enter ' + labelText(f).toLowerCase() + '.') : (f.dataset.errorInvalid || f.validationMessage);
      }
      if (box) { box.textContent = msg; box.hidden = !msg; }
      if (msg) { f.setAttribute('aria-invalid', 'true'); errors.push({ f, msg }); } else f.removeAttribute('aria-invalid');
    });
    const sum = $('[data-error-summary]', form);
    if (sum) {
      sum.hidden = !errors.length;
      $('ul', sum).innerHTML = errors.map((x) => '<li><a href="#' + x.f.id + '">' + esc(x.msg) + '</a></li>').join('');
      if (errors.length) sum.focus();
    }
    if (errors.length && !sum) errors[0].f.focus();
    return !errors.length;
  }
  $$('form[data-validate]').forEach((form) => {
    form.noValidate = true;
    form.addEventListener('submit', (e) => {
      if (!validate(form)) { e.preventDefault(); return; }
      if (form.hasAttribute('data-demo')) {
        e.preventDefault();
        const ok = $('[data-success]', form.parentElement);
        form.hidden = true;
        ok.hidden = false;
        ok.focus();
      }
    });
    form.addEventListener('click', (e) => {
      const a = e.target.closest('[data-error-summary] a');
      if (a) { e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).focus(); }
    });
  });
  $$('[data-reset-form]').forEach((b) => b.addEventListener('click', () => {
    const form = $('form', b.closest('[data-form-wrap]'));
    form.reset();
    $$('[aria-invalid]', form).forEach((f) => f.removeAttribute('aria-invalid'));
    form.hidden = false;
    b.closest('[data-success]').hidden = true;
    $('input, select', form).focus();
  }));

  /* Paged / filterable lists */
  function initPaged(box) {
    const list = $('.story-list', box);
    const size = Number(box.dataset.pageSize) || Infinity;
    const status = $('.status', box);
    const empty = $('.empty', box);
    const noun = box.dataset.noun || 'stories';
    let pager = null;
    let page = 1;
    function render(focusList) {
      const items = $$(':scope > li', list);
      const matches = items.filter((li) => li.dataset.match !== 'false');
      const pages = Math.max(1, Math.ceil(matches.length / size));
      page = Math.min(page, pages);
      items.forEach((li) => { li.hidden = true; });
      const slice = matches.slice((page - 1) * size, page * size);
      slice.forEach((li) => { li.hidden = false; });
      status.textContent = matches.length ? 'Showing ' + ((page - 1) * size + 1) + '–' + ((page - 1) * size + slice.length) + ' of ' + matches.length + ' ' + noun : '';
      if (empty) empty.hidden = matches.length > 0;
      if (pager) pager.remove();
      pager = null;
      if (pages > 1) {
        pager = document.createElement('nav');
        pager.className = 'pager';
        pager.setAttribute('aria-label', 'Pagination');
        pager.setAttribute('data-component', 'pagination');
        let h = '<button type="button" data-go="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') + '>Previous</button>';
        for (let i = 1; i <= pages; i++) h += '<button type="button" data-go="' + i + '"' + (i === page ? ' aria-current="page"' : '') + '><span class="visually-hidden">Page </span>' + i + '</button>';
        h += '<button type="button" data-go="' + (page + 1) + '"' + (page === pages ? ' disabled' : '') + '>Next</button>';
        pager.innerHTML = h;
        box.appendChild(pager);
        pager.addEventListener('click', (e) => {
          const b = e.target.closest('button[data-go]');
          if (!b) return;
          page = Number(b.dataset.go);
          render(true);
        });
      }
      if (focusList) {
        const first = $('a', slice[0]);
        if (first) { first.focus(); list.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' }); }
      }
    }
    box.refresh = (resetPage) => { if (resetPage) page = 1; render(false); };
    render(false);
  }
  function listItem(s) { return '<li data-tags="' + esc(s.tags.join('|')) + '">' + cardHtml(s) + '</li>'; }

  $$('[data-paged]:not([data-deferred])').forEach(initPaged);

  $$('[data-filter-group]').forEach((group) => {
    const box = $(group.dataset.target);
    group.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', group).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      applyFilter(group, box, b.dataset.filter);
    });
  });
  function applyFilter(group, box, value) {
    $$(':scope > li', $('.story-list', box)).forEach((li) => {
      li.dataset.match = String(value === 'all' || li.dataset.tags.split('|').includes(value));
    });
    box.refresh(true);
  }
  const sortSel = $('[data-sort-for]');
  if (sortSel) {
    const box = $(sortSel.dataset.sortFor);
    const list = $('.story-list', box);
    sortSel.addEventListener('change', () => {
      const k = sortSel.value;
      const items = $$(':scope > li', list).sort((a, b) => k === 'low' ? a.dataset.price - b.dataset.price : k === 'high' ? b.dataset.price - a.dataset.price : a.dataset.order - b.dataset.order);
      items.forEach((li) => list.appendChild(li));
      say('Sorted: ' + sortSel.options[sortSel.selectedIndex].text);
    });
  }
  const catParam = params.get('cat');
  if (catParam) { const b = $('[data-filter-group] button[data-filter="' + catParam.replace(/"/g, '') + '"]'); if (b) b.click(); }

  $$('[data-demo-action]').forEach((b) => b.addEventListener('click', () => say(b.dataset.demoAction)));
  $$('[data-copy-link]').forEach((b) => b.addEventListener('click', () => {
    const done = () => say('Link copied to clipboard.');
    const fail = () => say('Could not copy automatically. Copy the address from your browser bar.');
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(location.href).then(done, fail); else fail();
  }));

  /* Carousel (lookbook) */
  $$('[data-component="carousel"]').forEach((c) => {
    const slides = $$('.slide', c);
    const count = $('.slide-count', c);
    let i = 0;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.hidden = k !== i; });
      count.textContent = (i + 1) + ' of ' + slides.length;
    };
    $('[data-prev]', c).addEventListener('click', () => show(i - 1));
    $('[data-next]', c).addEventListener('click', () => show(i + 1));
    show(0);
  });

  /* Search page */
  const results = $('#search-results');
  if (results) {
    const q = (params.get('q') || '').trim();
    const section = params.get('section') || 'all';
    const sort = params.get('sort') || 'relevance';
    $('#q').value = q;
    $('#section').value = section;
    $('#sort').value = sort;
    const heading = $('#results-heading');
    const empty = $('.empty', results);
    if (!q) {
      heading.textContent = 'Search the magazine';
      $('#search-intro').hidden = false;
      results.hidden = true;
    } else {
      const words = q.toLowerCase().split(/\s+/);
      const scored = STORIES.filter((s) => section === 'all' || s.s === section).map((s) => {
        const title = s.t.toLowerCase();
        const dek = s.d.toLowerCase();
        const meta = (s.tags.join(' ') + ' ' + SECTIONS[s.s] + ' ' + author(s.a).name).toLowerCase();
        let score = 0;
        for (const w of words) {
          if (!(title + dek + meta).includes(w)) return null;
          score += (title.includes(w) ? 3 : 0) + (meta.includes(w) ? 2 : 0) + (dek.includes(w) ? 1 : 0);
        }
        return { s, score };
      }).filter(Boolean);
      scored.sort((a, b) => sort === 'newest' ? b.s.dt.localeCompare(a.s.dt) : b.score - a.score || b.s.dt.localeCompare(a.s.dt));
      heading.textContent = scored.length + (scored.length === 1 ? ' result for “' : ' results for “') + q + '”';
      $('.story-list', results).innerHTML = scored.map((x) => listItem(x.s)).join('');
      document.title = 'Search: ' + q + ' | Fable & Hem';
    }
    initPaged(results);
    if (!q) empty.hidden = true;
  }

  /* Article page */
  const art = $('[data-article]');
  if (art) {
    const id = params.get('story');
    const s = STORIES.find((x) => x.id === id);
    if (id && !s) $('#story-missing').hidden = false;
    if (s) {
      const a = author(s.a);
      document.title = s.t + ' | Fable & Hem';
      $('[data-fill="title"]').textContent = s.t;
      $('[data-fill="dek"]').textContent = s.d;
      $('[data-fill="kicker"]').textContent = SECTIONS[s.s];
      const crumb = $('[data-fill="crumb"]');
      crumb.textContent = SECTIONS[s.s];
      crumb.href = s.s + '.html';
      const by = $('[data-fill="byline"]');
      by.textContent = a.name;
      by.href = 'author.html?id=' + a.id;
      $('[data-fill="date"]').textContent = fmtDate(s.dt);
      $('[data-fill="date"]').dateTime = s.dt;
      $('[data-fill="reading"]').textContent = s.m + (s.f.includes('podcast') ? ' min listen' : ' min read');
      $('[data-fill="img"]').src = 'assets/art-' + s.art + '.svg';
      $('#demo-body-note').hidden = s.id === 'tailoring-decade';
      $('#related-grid').innerHTML = STORIES.filter((x) => x.s === s.s && x.id !== s.id).slice(0, 3).map(cardHtml).join('');
    }
  }

  /* Author page */
  const authorBox = $('[data-author-page]');
  if (authorBox) {
    const a = author(params.get('id')) || AUTHORS[0];
    document.title = a.name + ' | Fable & Hem';
    $('[data-fill="name"]').textContent = a.name;
    $('[data-fill="role"]').textContent = a.role;
    $('[data-fill="bio"]').textContent = a.bio;
    const own = STORIES.filter((s) => s.a === a.id);
    $('.story-list', authorBox).innerHTML = own.map(listItem).join('');
    initPaged($('[data-paged]', authorBox));
    $('#contributors').innerHTML = AUTHORS.map((x) => '<li><a href="author.html?id=' + x.id + '"' + (x.id === a.id ? ' aria-current="page"' : '') + '>' + esc(x.name) + '</a>, ' + esc(x.role) + '</li>').join('');
  }
})();
