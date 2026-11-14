/* The Weft Review (FASH-01 replica). Vanilla JS, no dependencies. Sample data is inline so pages work from file://. */
(function () {
'use strict';
const SECTIONS = {
  fashion: { label: 'Fashion', page: 'fashion.html', blurb: 'Garments, cloth and the people-free craft of making them: mills, pleating rooms, dye baths and trims.' },
  culture: { label: 'Culture', page: 'culture.html', blurb: 'Archives, essays and objects: what a workroom, a label or a swatch book can tell us.' },
  travel: { label: 'Travel', page: 'travel.html', blurb: 'Dye gardens, button markets and mill towns, all of them invented for this sample.' },
  video: { label: 'Video', page: 'video.html', blurb: 'Short films about thread, pleats and sets. Playback is a demo only in this replica.' },
  nextwave: { label: 'Next Wave', page: 'nextwave.html', blurb: 'Our younger desk: student showcases, zines, workshops and first machines.' }
};
const ARTS = {
  'art-01': 'Vertical stripes in rust, cream and moss green',
  'art-02': 'Concentric circles in indigo and pale blue',
  'art-03': 'Diagonal bands in ochre and charcoal',
  'art-04': 'Checkerboard grid of teal and sand squares',
  'art-05': 'Large terracotta half circles on a cream field',
  'art-06': 'Overlapping translucent rectangles in plum and rose',
  'art-07': 'Horizontal pleat-like stripes in graded greys',
  'art-08': 'Field of small cream dots on deep green',
  'art-09': 'Zigzag of mustard and navy triangles',
  'art-10': 'Fine cross-hatched lines on a pale linen colour field',
  'art-11': 'Layered arches in sage and cream',
  'art-12': 'One large circle on a background split into black and bone'
};
const STORIES = [
 {id:'coat-six-wools',url:'article.html',sec:'fashion',issue:1,title:'A coat built from six undyed wools',dek:'At Hollowbrook Mills, a winter coat is assembled from the natural shades of six fleeces, and nothing is dyed.',by:'Ilsabet Corrow',date:'2031-02-14',tags:['Materials','Craft'],art:'art-01',read:6,body:['The coat begins in a sorting shed, where six wools are laid out side by side: a cream, a fawn, a pale grey, a brown, a charcoal and a near-black. Each is woven into its own cloth and cut into panels.','Because the colours are the fibre itself, the finished coat reads as a quiet patchwork of seams. The makers say the hardest part is matching the weight of six different cloths so the coat hangs as one.']},
 {id:'pleating-room',sec:'fashion',issue:1,title:'Pleats, counted: inside the Nimbrel pleating room',dek:'Atelier Nimbrel sets every fold by hand against a numbered paper template.',by:'Dov Haverlund',date:'2031-02-11',tags:['Craft','Process'],art:'art-07',read:5,body:['Pleating at Atelier Nimbrel is a counting exercise. A cut cloth is sandwiched between paper templates, rolled, steamed and left overnight to set.','The room keeps a ledger of every template, and the oldest are patched with tape. A fold that looks effortless on the finished skirt is, the team says, the product of a very patient spreadsheet of habits.']},
 {id:'indigo-twice',sec:'fashion',issue:1,title:'Indigo, twice: the case for the slow dye bath',dek:'Two dips, a day of air and a second dip: why one dye house refuses to hurry blue.',by:'Nuala Peterkin-Voss',date:'2031-02-08',tags:['Colour','Process'],art:'art-02',read:7,body:['Indigo needs air to turn from green to blue, and the dyers at Saltmarch Dye Works use that pause as a design tool. A cloth dipped, aired and dipped again lands in a deeper, less even blue.','They keep a swatch wall of one hundred and twenty dips, each labelled with the number of passes and the weather on the day.']},
 {id:'paper-cotton-shirt',sec:'fashion',title:'Paper-weight cotton and the new summer shirt',dek:'A crisp, light weave is turning up in collars, cuffs and long overshirts.',by:'Casimir Dellmore',date:'2031-02-05',tags:['Materials'],art:'art-10',read:4,body:['The cloth is woven tight and finished with a gentle starch so it holds a crease like folded paper. Designers at Maison Corvane use it for oversized collars that stand away from the neck.','Care is simple: wash cool, press while damp, and accept the soft wrinkles that appear by afternoon.']},
 {id:'button-rooms',sec:'fashion',title:'Button rooms: how a trim house sorts ten thousand closures',dek:'Horn, shell, brass and glass: a visit to the drawers of Pellam & Roe Trims.',by:'Yevanna Brightwater',date:'2031-02-02',tags:['Craft','Materials'],art:'art-04',read:5,body:['The trim house is organised by material, then by size, then by a private system of coloured thread tied to each drawer pull.','Customers arrive with a fabric swatch and leave with a small paper envelope. The staff say a good button is chosen by weight in the hand as much as by colour.']},
 {id:'autumn-palette',sec:'fashion',title:'Autumn palette notes: moss, rust and a dusty teal',dek:'Three colours that keep appearing on mood boards, and the cloths that carry them best.',by:'Orrin Salcombe',date:'2031-01-30',tags:['Colour'],art:'art-08',read:3,body:['Moss reads best on a matte wool, rust on a brushed cotton, and dusty teal on a fine twill with a little sheen.','Our colour editors suggest pairing no more than two at a time, and keeping the third as a thread, a lining or a button.']},
 {id:'visible-mending',sec:'fashion',issue:1,title:'Hems that show their work: visible mending at Atelier Corvane',dek:'Contrasting stitches, patched elbows and a repair counter that is part of the shop.',by:'Tamsin Ardeley',date:'2031-01-27',tags:['Mending','Craft'],art:'art-03',read:6,body:['Atelier Corvane offers a repair counter beside the fitting rooms. Mends are done in bold thread so they become a feature rather than a secret.','A sample board by the till shows nine mending stitches, from a simple darn to a woven patch, each named by the mender who taught it.']},
 {id:'cloth-week-day-one',sec:'fashion',title:'Meridian Cloth Week diary: day one in Port Valmere',dek:'Our notebook from the opening day of an invented week of mills, makers and cut cloth.',by:'Bastien Okoro-Lind',date:'2031-01-24',tags:['Events','Places'],art:'art-09',read:5,body:['Meridian Cloth Week opens on a quayside in Port Valmere, with stalls of cloth rolled like loaves. The first talk is about warp tension and is better attended than the evening party.','By afternoon the stalls are trading remnants, and the quay smells of steam and wet wool.']},
 {id:'linen-after-rain',sec:'fashion',title:'Linen after rain: a field guide to crinkle',dek:'Why linen wrinkles, how it recovers and which weaves forgive the most.',by:'Marisol Quennell',date:'2031-01-20',tags:['Materials','Process'],art:'art-11',read:4,body:['Linen fibres are stiff and take a fold readily. A looser weave lets the cloth relax between wears, while a tighter one keeps its lines.','A gentle steam on a hanger often does more than a hot iron.']},
 {id:'tailoring-three-seams',sec:'fashion',title:'Tailoring in three seams',dek:'A jacket pared back to its structure: shoulder, side and sleeve.',by:'Halvard Pryce',date:'2031-01-17',tags:['Craft','Process'],art:'art-06',read:5,body:['Pared down, a jacket is three seams doing most of the work. Each is shaped, pressed and eased before the next is stitched.','The tailors at Studio Aldermere call it listening to the cloth: the pressing iron is the most-used tool in the room.']},
 {id:'loom-museum',sec:'culture',title:'The loom museum that reopened in Saltmarch',dek:'Forty restored looms, one working weave shed and a very quiet gift shop.',by:'Junia Estrada-Bell',date:'2031-02-13',tags:['History','Places'],art:'art-05',read:6,body:['The museum occupies a former wool exchange. On the ground floor, volunteers run two looms every weekday so that visitors can hear the shuttle.','Upstairs, labelled samples trace the shift from hand-woven twills to the first power-loom stripes.']},
 {id:'hand-bound-lookbooks',sec:'culture',title:'A quiet revival of hand-bound lookbooks',dek:'Small labels are stitching their seasonal books by hand, with swatches tipped in.',by:'Ilsabet Corrow',date:'2031-02-09',tags:['Craft','History'],art:'art-10',read:4,body:['A hand-bound book can carry real fabric samples, which a screen cannot. Printers describe a rise in orders for small runs of thirty or forty copies.','Some labels give them away at fittings; others keep them as an archive.']},
 {id:'swatch-book-archives',sec:'culture',title:'Why costume archives are digitising their swatch books',dek:'Fragile, faded and irreplaceable: a plan to preserve cloth samples as colour data.',by:'Dov Haverlund',date:'2031-02-03',tags:['History','Process'],art:'art-04',read:5,body:['The Anselbridge Textile Archive holds three hundred swatch books, many sun-faded. Staff photograph each page under controlled light before it is put away.','The aim is not to replace the cloth but to let researchers browse it without touching it.']},
 {id:'pattern-cutter-grainline',sec:'culture',issue:1,title:'Interview: a pattern cutter on the poetry of the grainline',dek:'Wenna Thackray talks paper, chalk and the thread that decides how a garment hangs.',by:'Nuala Peterkin-Voss',date:'2031-01-31',tags:['Craft','Process'],art:'art-07',read:8,body:['Wenna Thackray, a fictional pattern cutter in this sample, says the grainline is the first decision and the last one she revisits.','She describes her bench as a place where very small mistakes are cheap and very large ones are impossible.']},
 {id:'care-symbols',sec:'culture',title:'Reading the label: a short history of care symbols',dek:'Tubs, triangles and squares: where the little pictograms on a label came from.',by:'Casimir Dellmore',date:'2031-01-26',tags:['History'],art:'art-12',read:4,body:['Care symbols were designed to cross languages. A tub means wash, a triangle means bleach, a square means dry.','Our archive has an early set from a fictional trade body, drawn by hand and later simplified.']},
 {id:'spindle-prize',sec:'culture',title:'The Spindle Prize shortlist, explained',dek:'Six invented makers, six pieces of cloth, and the jury notes on each.',by:'Yevanna Brightwater',date:'2031-01-22',tags:['Events'],art:'art-09',read:6,body:['The Spindle Prize is an invented award for textile craft. This year the jury looked at warp-faced stripes, a felted hanging and a double cloth that can be turned inside out.','Winners are announced at the end of the month; this page lists only the shortlist.']},
 {id:'workroom-sounds',sec:'culture',title:'Sound of the workroom: a listening essay',dek:'Shears, steam, a radio in the next room: an essay on the ambient music of making.',by:'Orrin Salcombe',date:'2031-01-18',tags:['Sound','Process'],art:'art-02',read:5,body:['Every workroom has a rhythm. Shears sound different on organza than on denim, and a steam press has its own slow breath.','Our writer recorded an afternoon and found a pattern in the pauses.']},
 {id:'dye-gardens',sec:'travel',issue:1,title:'Three days among the dye gardens of Kestrelmouth',dek:'Madder, weld and woad: a walking itinerary through gardens grown for colour.',by:'Tamsin Ardeley',date:'2031-02-12',tags:['Places','Colour'],art:'art-08',read:7,body:['Kestrelmouth is a small coastal town with four public dye gardens. The first day is for madder, the second for weld and the third for woad.','Each garden has a small shed where visitors can see a cloth dipped and then hung to dry.']},
 {id:'buttons-port-valmere',sec:'travel',title:'Where to find buttons in Port Valmere',dek:'A map of six haberdashery counters, a market stall and one very narrow shop.',by:'Bastien Okoro-Lind',date:'2031-02-07',tags:['Places','Materials'],art:'art-04',read:3,body:['Start at the quay market, where a single stall sells buttons by the scoop. Work uphill to the narrow shop on Lantern Row.','Bring a swatch and an empty tin.']},
 {id:'train-wool-country',sec:'travel',title:'A train to the wool country',dek:'A slow line across moorland, with stops at three mills that welcome visitors.',by:'Marisol Quennell',date:'2031-02-01',tags:['Places'],art:'art-11',read:6,body:['The line runs twice a day and is best taken in the morning. Mills at Brannoch, Lowther Cross and Ashmere open their yards on weekdays.','Pack a flask; the platforms are exposed.']},
 {id:'anselbridge-stalls',sec:'travel',title:'Market stalls of Anselbridge: remnants and ribbons',dek:'Saturday mornings among the cloth ends, thread cones and ribbon reels.',by:'Halvard Pryce',date:'2031-01-28',tags:['Places','Materials'],art:'art-01',read:4,body:['The Anselbridge market sets up before dawn. The best remnants are gone by nine, but the ribbon sellers stay all day.','Haggling is gentle and entirely optional.']},
 {id:'brannoch-mill-town',sec:'travel',title:'Weekend in a mill town: Brannoch',dek:'Chimneys, canals and a surprisingly good bakery near the weave shed.',by:'Junia Estrada-Bell',date:'2031-01-21',tags:['Places','History'],art:'art-03',read:5,body:['Brannoch grew around a single mill, and its streets still bend around the old yard. A canal path links the weave shed to the dye works.','The town holds a small open day each spring.']},
 {id:'capsule-for-rain',sec:'travel',title:'Packing a capsule for rain',dek:'Five garments in tough, quick-drying cloth for a week of wet weather.',by:'Casimir Dellmore',date:'2031-01-15',tags:['Materials'],art:'art-05',read:3,body:['Choose cloths that dry quickly: waxed cotton, tight synthetics and light wool.','Roll rather than fold, and keep one dry layer sealed in a pouch.']},
 {id:'v-set-build',sec:'video',title:'Behind the set: building a room of hanging cloth',dek:'A four-minute look at how a hall was hung with two hundred metres of fabric.',by:'Dov Haverlund',date:'2031-02-10',tags:['Process','Events'],art:'art-06',read:4,body:['A short film following the crew as they hang, tension and light a set made entirely of cloth.'],runtime:'4:12'},
 {id:'v-thirty-seconds',sec:'video',title:'Thirty seconds of thread',dek:'A macro film of a needle passing through linen, set to the sound of the workroom.',by:'Yevanna Brightwater',date:'2031-02-04',tags:['Craft','Sound'],art:'art-10',read:1,body:['A very short film in close-up.'],runtime:'0:30'},
 {id:'v-pleat-unfolds',sec:'video',title:'A pleat unfolds',dek:'Time-lapse of a pleated length being released from its paper template.',by:'Nuala Peterkin-Voss',date:'2031-01-29',tags:['Craft','Process'],art:'art-07',read:2,body:['A time-lapse film of pleats being released.'],runtime:'1:48'},
 {id:'n-graduate-showcase',sec:'nextwave',title:'Graduate collections at the Tolliver Quay showcase',dek:'Eight invented students, eight small collections, and the cloths they chose.',by:'Orrin Salcombe',date:'2031-02-06',tags:['Events','Workshop'],art:'art-09',read:5,body:['The Tolliver Quay showcase fills a harbour warehouse with student work. This year many collections began with a single reclaimed cloth.','Jurors praised clear finishing and good notes on process.']},
 {id:'n-zine-labels',sec:'nextwave',title:'Zine-making for small labels',dek:'Fold, staple, trim: a beginner guide to a lookbook you can photocopy.',by:'Tamsin Ardeley',date:'2031-01-25',tags:['Workshop','Craft'],art:'art-12',read:4,body:['A zine needs only a sheet of paper, a pair of scissors and a stapler. Fold into eight, cut one slit, and the pages stand up.','Use real swatches, held with a dab of glue stick.']},
 {id:'n-fabric-workshop',sec:'nextwave',title:'Reclaimed-fabric workshops: a how-to',dek:'How to run an evening session where participants rework old cloth into new bags.',by:'Marisol Quennell',date:'2031-01-19',tags:['Workshop','Mending'],art:'art-01',read:5,body:['Ask everyone to bring a worn garment. Unpick the seams, press the pieces flat and decide together what they might become.','Keep tools simple: scissors, needles and a shared iron.']},
 {id:'n-first-machine',sec:'nextwave',title:'A first sewing machine: what to look for',dek:'A short checklist for choosing a basic machine, with no brand names attached.',by:'Halvard Pryce',date:'2031-01-12',tags:['Workshop','Process'],art:'art-03',read:4,body:['Look for a machine with a solid metal frame, clear stitch selection and easy threading.','Try it in a shop first and sew a straight line through two layers of cotton.']}
];
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmt = (d) => { const p = d.split('-'); return MON[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0]; };
const storyUrl = (s) => s.url || ('story.html?id=' + s.id);
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const el = (tag, attrs, text) => { const n = document.createElement(tag); if (attrs) Object.keys(attrs).forEach((k) => n.setAttribute(k, attrs[k])); if (text != null) n.textContent = text; return n; };
document.documentElement.classList.add('js');

/* ---------- header menu disclosure (inferred behaviour; reference nav was not rendered) ---------- */
(function () {
  const btn = $('.menu-toggle'), wrap = $('#site-menu');
  if (!btn || !wrap) return;
  const set = (open) => { btn.setAttribute('aria-expanded', open ? 'true' : 'false'); wrap.classList.toggle('open', open); };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true' && getComputedStyle(btn).display !== 'none') { set(false); btn.focus(); }
  });
})();

/* ---------- card builder (used by search, related) ---------- */
function cardEl(s, lvl) {
  const li = el('li', { class: 'card', 'data-component': 'story-card' });
  const art = el('article');
  art.appendChild(el('img', { src: 'assets/' + s.art + '.svg', alt: '', width: '400', height: '300', loading: 'lazy' }));
  const b = el('div', { class: 'card-body' });
  b.appendChild(el('p', { class: 'kicker' }, SECTIONS[s.sec].label));
  const h = el('h' + lvl); const a = el('a', { href: storyUrl(s) }, s.title); h.appendChild(a); b.appendChild(h);
  b.appendChild(el('p', { class: 'dek' }, s.dek));
  b.appendChild(el('p', { class: 'meta' }, 'By ' + s.by + ' / ' + fmt(s.date) + ' / ' + s.read + ' min'));
  art.appendChild(b); li.appendChild(art); return li;
}

/* ---------- filter + sort on listing pages ---------- */
(function () {
  const form = $('[data-filter-form]'), section = $('[data-filter-list]');
  if (!form || !section) return;
  const list = $('.card-grid', section), items = $$('[data-item]', list), empty = $('[data-empty]', section), count = $('[data-result-count]', form);
  const f = (k) => $('[data-f="' + k + '"]', form);
  function apply() {
    const q = f('q').value.trim().toLowerCase(), tag = f('tag').value, sec = f('sec') ? f('sec').value : '', sort = f('sort').value;
    const words = q.split(/\s+/).filter(Boolean);
    const shown = items.filter((it) => {
      const ok = words.every((w) => it.dataset.search.indexOf(w) > -1) && (!tag || it.dataset.tags.split('|').indexOf(tag) > -1) && (!sec || it.dataset.sec === sec);
      it.hidden = !ok; return ok;
    });
    const cmp = { new: (a, b) => b.dataset.date.localeCompare(a.dataset.date), old: (a, b) => a.dataset.date.localeCompare(b.dataset.date), az: (a, b) => a.querySelector('h2,h3').textContent.localeCompare(b.querySelector('h2,h3').textContent) }[sort];
    items.slice().sort(cmp).forEach((it) => list.appendChild(it));
    list.hidden = shown.length === 0; empty.hidden = shown.length !== 0;
    count.textContent = shown.length === 0 ? 'No stories match your filters.' : shown.length + (shown.length === 1 ? ' story' : ' stories') + ' shown of ' + items.length + '.';
  }
  form.addEventListener('input', apply); form.addEventListener('change', apply);
  form.addEventListener('submit', (e) => e.preventDefault());
  $('[data-f-reset]', form).addEventListener('click', () => { form.reset(); apply(); f('q').focus(); });
  const pre = new URLSearchParams(location.search); if (pre.get('tag')) f('tag').value = pre.get('tag');
  count.textContent = items.length + ' stories shown of ' + items.length + '.';
  apply();
})();

/* ---------- search page ---------- */
(function () {
  const res = $('#search-results'); if (!res) return;
  const p = new URLSearchParams(location.search), q = (p.get('q') || '').trim(), sec = p.get('sec') || '';
  $('#search-q').value = q; if (SECTIONS[sec]) $('#search-sec').value = sec; else if (sec) { /* ignore unknown section */ }
  const status = $('#search-status'), empty = $('#search-empty');
  if (!q) { status.textContent = 'Enter a search term above. Try "wool", "dye" or "pleat".'; return; }
  const words = q.toLowerCase().split(/\s+/);
  const hits = STORIES.filter((s) => (!sec || s.sec === sec) && words.every((w) => (s.title + ' ' + s.dek + ' ' + s.tags.join(' ') + ' ' + s.by + ' ' + s.body.join(' ')).toLowerCase().indexOf(w) > -1));
  hits.forEach((s) => res.appendChild(cardEl(s, 3)));
  status.textContent = hits.length + (hits.length === 1 ? ' result' : ' results') + ' for "' + q + '".';
  empty.hidden = hits.length !== 0; res.hidden = hits.length === 0;
  document.title = 'Search: ' + q + ' | The Weft Review';
})();

/* ---------- dynamic story page ---------- */
(function () {
  const root = $('#story-root'); if (!root || document.body.dataset.page !== 'story.html') return;
  const id = new URLSearchParams(location.search).get('id');
  const s = STORIES.filter((x) => x.id === id)[0];
  const h1 = $('#story-title'), crumb = $('.breadcrumb li[aria-current]');
  if (!s) {
    h1.textContent = 'Story not found'; document.title = 'Story not found | The Weft Review'; crumb.textContent = 'Not found';
    root.appendChild(el('p', { class: 'lede' }, 'That story does not exist in this sample archive.'));
    const p = el('p'); p.appendChild(el('a', { href: 'latest.html' }, 'Browse the latest stories')); root.appendChild(p); return;
  }
  const noscript = $('noscript', root); if (noscript) noscript.remove();
  h1.textContent = s.title; document.title = s.title + ' | The Weft Review'; crumb.textContent = s.title;
  const head = el('header'); h1.parentNode.insertBefore(head, h1); head.appendChild(el('p', { class: 'kicker' }, SECTIONS[s.sec].label)); head.appendChild(h1);
  head.appendChild(el('p', { class: 'lede' }, s.dek));
  head.appendChild(el('p', { class: 'meta' }, 'By ' + s.by + ' / ' + fmt(s.date) + ' / ' + s.read + ' min read'));
  const fig = el('figure', { class: 'story-art' });
  fig.appendChild(el('img', { src: 'assets/' + s.art + '.svg', alt: ARTS[s.art] + '. Abstract illustration, not a photograph.', width: '800', height: '600' }));
  if (s.runtime) fig.appendChild(el('figcaption', null, 'Video, ' + s.runtime + '. Demo only: this replica contains no video file and nothing plays.'));
  root.appendChild(fig);
  const prose = el('div', { class: 'prose' }); s.body.forEach((t) => prose.appendChild(el('p', null, t))); root.appendChild(prose);
  const tags = el('p', { class: 'tags' }, 'Topics: '); s.tags.forEach((t) => { tags.appendChild(el('span', { class: 'tag' }, t)); tags.appendChild(document.createTextNode(' ')); }); root.appendChild(tags);
  const rel = STORIES.filter((x) => x.sec === s.sec && x.id !== s.id).slice(0, 3), box = $('#related');
  if (rel.length) { rel.forEach((r) => $('#related-list').appendChild(cardEl(r, 3))); $('#related-title').textContent = 'More in ' + SECTIONS[s.sec].label; box.hidden = false; }
})();

/* ---------- gallery + lightbox ---------- */
(function () {
  const g = $('[data-gallery]'); if (!g) return;
  const slides = $$('[data-slide]', g), thumbs = $$('[data-thumb]', g), status = $('[data-gal-status]', g);
  const dlg = $('#lightbox'), n = slides.length; let cur = 0, opener = null;
  g.classList.add('gal-js');
  function show(i, announce) {
    cur = (i + n) % n;
    slides.forEach((s, k) => { s.hidden = k !== cur; });
    thumbs.forEach((t, k) => { if (k === cur) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
    if (announce !== false) status.textContent = 'Slide ' + (cur + 1) + ' of ' + n;
    if (dlg.open) fillLb();
  }
  function fillLb() {
    const img = $('img', slides[cur]);
    const lb = $('#lb-img'); lb.src = img.getAttribute('src'); lb.alt = img.alt;
    $('#lb-cap').textContent = $('figcaption', slides[cur]).textContent;
    $('#lb-status').textContent = 'Slide ' + (cur + 1) + ' of ' + n;
  }
  $('[data-gal-prev]', g).addEventListener('click', () => show(cur - 1));
  $('[data-gal-next]', g).addEventListener('click', () => show(cur + 1));
  thumbs.forEach((t, k) => t.addEventListener('click', () => show(k)));
  g.addEventListener('keydown', (e) => {
    if (e.target.closest('button') === null && e.target !== g) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1); } else if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
  });
  function closeLb() { if (dlg.open) dlg.close(); }
  $('[data-gal-open]', g).addEventListener('click', (e) => { opener = e.currentTarget; fillLb(); dlg.showModal(); $('[data-lb-close]', dlg).focus(); });
  $('[data-lb-prev]', dlg).addEventListener('click', () => show(cur - 1));
  $('[data-lb-next]', dlg).addEventListener('click', () => show(cur + 1));
  $('[data-lb-close]', dlg).addEventListener('click', closeLb);
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1); } else if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) closeLb(); });
  dlg.addEventListener('close', () => { if (opener) opener.focus(); });
  show(0, false);
})();

/* ---------- newsletter simulation ---------- */
(function () {
  const form = $('#nl-form'); if (!form) return;
  const summary = $('#error-summary'), ok = $('#nl-success');
  const email = $('#nl-email'), emailErr = $('#nl-email-err'), dayErr = $('#nl-day-err');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errs = [];
    const v = email.value.trim();
    if (!v) errs.push(['nl-email', 'Enter your email address.']);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs.push(['nl-email', 'Enter an email address in the format name@example.invalid.']);
    const day = $('input[name="day"]:checked', form);
    if (!day) errs.push(['nl-day-set', 'Choose a preferred delivery day.']);
    [[email, emailErr, 'nl-email'], [null, dayErr, 'nl-day-set']].forEach((r) => {
      const hit = errs.filter((x) => x[0] === r[2])[0];
      r[1].hidden = !hit; r[1].textContent = hit ? hit[1] : '';
      if (r[0]) { if (hit) r[0].setAttribute('aria-invalid', 'true'); else r[0].removeAttribute('aria-invalid'); }
    });
    const ul = $('ul', summary); ul.textContent = '';
    if (errs.length) {
      errs.forEach((x) => { const li = el('li'); const a = el('a', { href: '#' + x[0] }, x[1]); a.addEventListener('click', (ev) => { ev.preventDefault(); const t = x[0] === 'nl-day-set' ? $('input[name="day"]', form) : $('#' + x[0]); t.focus(); }); li.appendChild(a); ul.appendChild(li); });
      ok.hidden = true; summary.hidden = false; summary.focus(); return;
    }
    summary.hidden = true;
    const lists = $$('input[name="list"]:checked', form).length;
    $('p', ok).textContent = 'Thank you' + ($('#nl-name').value.trim() ? ', ' + $('#nl-name').value.trim() : '') + '. In a real service you would now be on ' + lists + ' list' + (lists === 1 ? '' : 's') + ', with delivery on ' + day.parentNode.textContent.trim() + '.';
    form.hidden = true; ok.hidden = false; ok.focus();
  });
})();
})();
