document.documentElement.classList.add('js');
/* Curbside Signal (fictional) - behaviour. Vanilla JS, no network, works from file://.
   The data block below is shared with the static HTML generation step (inline data, no fetch). */
/* ---- Sample data (all fictional) ---- */
const AUTHORS = {
  'tavi-brennick': { name: 'Tavi Brennick', role: 'Footwear editor (fictional)', bio: 'Invented staff writer who covers sole units, lasts and the language of invented silhouettes. Not a real person.' },
  'odalys-penhallow': { name: 'Odalys Penhallow', role: 'Fashion editor (fictional)', bio: 'Invented staff writer who tracks outerwear, textiles and how trousers are cut. Not a real person.' },
  'juno-starrow': { name: 'Juno Starrow', role: 'Street-style correspondent (fictional)', bio: 'Invented correspondent who files observational notes from made-up cities. Not a real person.' },
  'casimir-dyle': { name: 'Casimir Dyle', role: 'Culture editor (fictional)', bio: 'Invented editor for art, design and listening notes. Not a real person.' },
  'ines-varga-holt': { name: 'Ines Varga-Holt', role: 'Contributing writer (fictional)', bio: 'Invented contributor who writes about daily rituals and small spaces. Not a real person.' }
};
const ART = [
  ['Orange disc over slate blocks', 'an orange circle overlapping two slate-grey rectangles on a cream field'],
  ['Teal arches', 'three nested teal arches on a pale background'],
  ['Diagonal stripes', 'bold black and yellow diagonal stripes cut by a white square'],
  ['Stacked bars', 'horizontal bars in rust, sand and charcoal stacked on a dark ground'],
  ['Quarter circles', 'four quarter circles in green and lilac meeting at the centre'],
  ['Grid of squares', 'a grid of small squares in graded blue tones with one orange square'],
  ['Wave band', 'a wide wavy band in coral crossing a deep navy field'],
  ['Split field', 'a vertical split between olive and pink with a thin black circle outline'],
  ['Triangles', 'overlapping triangles in mustard, plum and pale cream'],
  ['Dots', 'a loose scatter of large dots in red, grey and cream'],
  ['Pillars', 'tall rounded pillars in brown, teal and sand of different heights'],
  ['Concentric rings', 'concentric rings in violet and peach on a dark background'],
  ['Offset blocks', 'two offset blocks in lime and charcoal casting a flat shadow'],
  ['Half moons', 'two half moons in orange and blue facing each other']
].map((a, i) => ({ file: 'assets/art-' + String(i + 1).padStart(2, '0') + '.svg', title: a[0], alt: 'Abstract placeholder artwork: ' + a[1] + '.' }));
const SECTIONS = { fashion: 'Fashion', footwear: 'Footwear', culture: 'Culture' };
const ARTICLES = [
 // footwear
 ['f01','Pylon Mid and the return of the chunky midsole','footwear',['Silhouettes','Design notes'],'tavi-brennick','2099-03-02',0,'An invented mid-top from the invented label Tarnwick leans on a thick, layered midsole and a short collar.','The Pylon Mid stacks three foam layers in two densities, so the sole reads as a tidy tower rather than a single slab. The upper stays plain on purpose, which lets the profile do the talking.|Designers describe the idea as proportion first, detail second. A short, padded collar keeps the line low while the heel gets a small stabiliser tab.'],
 ['f02','Salt Quarry: a colourway built from three greys','footwear',['Colourways'],'tavi-brennick','2099-03-04',1,'Pale stone, wet slate and a cool charcoal share one upper in this invented colourway.','Salt Quarry works because the three greys differ in temperature, not just darkness. The warmest sits on the toe, the coolest on the heel, and the eye reads a gentle gradient.|A single orange pull tab is the only accent. It is a reminder that restraint can be a design decision rather than an absence of one.'],
 ['f03','Tessel Runner gets a mesh-and-felt rebuild','footwear',['Materials','Silhouettes'],'tavi-brennick','2099-03-06',2,'The invented Tessel Runner swaps its smooth overlays for felted panels over open mesh.','Felt gives the runner a matte, almost woolly surface, while the mesh underneath keeps the structure light. The two textures meet in a stitched seam that doubles as a flex point.|Expect the update in muted shades first. Brighter variations are described as later, unannounced sample ideas.'],
 ['f04','Brindle Hall and Quillon Works pair up on a trail slip-on','footwear',['Collabs','Silhouettes'],'tavi-brennick','2099-03-09',3,'Two invented labels combine a bungee lace system with a sculpted rubber outsole in a fictional collaboration.','The slip-on borrows a hiking tongue and replaces laces with a toggle. The outsole carries a pattern of staggered lugs that the two imaginary teams call a shared handwriting.|Everything about this pairing is sample copy for a fictional magazine, including the studios and the product itself.'],
 ['f05','Lattice High: laces, loops and the case for fewer eyelets','footwear',['Design notes'],'tavi-brennick','2099-03-11',4,'The invented Lattice High replaces six eyelets with a woven strap panel.','A woven strap panel spreads pressure across the instep and cuts the number of holes in the upper. The result is a cleaner side profile and a lacing path that adjusts in small steps.|It is a quiet reminder that the most visible part of a shoe is often its fastening.'],
 ['f06','A field guide to sole patterns, from waffle to wave','footwear',['Design notes','Materials'],'tavi-brennick','2099-03-13',5,'A visual vocabulary of tread patterns, described in plain language and with invented examples.','Tread patterns fall into a few families: grids, chevrons, waves and lugs. Each family implies a different surface, from dry pavement to wet leaves.|Reading the pattern is a good first step in understanding what a shoe was designed for, long before looking at the upper.'],
 ['f07','Dovetail Slip arrives in Moss Receipt and Dusk Ledger','footwear',['Colourways','Silhouettes'],'tavi-brennick','2099-03-16',6,'Two invented colourways for an invented slip-on, one leafy and one dusky.','Moss Receipt is a dark green with cream stitching, while Dusk Ledger layers aubergine over a pale sole. Both lean on tonal suede-look textiles that catch light unevenly.|The slip-on keeps a low vamp and an elastic gusset so it can be worn without ceremony.'],
 ['f08','Why rubber toe caps keep showing up on low-tops','footwear',['Materials','Design notes'],'tavi-brennick','2099-03-18',7,'A short note on toe protection, wear patterns and the look of a shaped bumper.','A rubber bumper protects the point where the upper bends most. It also adds a contrast line that makes a plain low-top look finished.|Used well, it frames the toe like a border. Used badly, it fights the rest of the proportions.'],
 ['f09','Grommet Trail: an all-weather boot imagined for city puddles','footwear',['Silhouettes','Materials'],'tavi-brennick','2099-03-20',8,'An invented boot with a taped seam construction and a lightly rockered sole.','Grommet Trail keeps the stitching count low and covers the seams with a thin tape. A mild rocker in the sole encourages a rolling step.|The invented label describes the upper as sealed, not armoured, which is a useful distinction when imagining weather gear.'],
 ['f10','Ember Court revisits the thin-sole court shoe','footwear',['Silhouettes'],'tavi-brennick','2099-03-23',9,'A slim, low, almost flat court shoe returns in an invented range.','Thin soles put the wearer close to the ground and keep the profile compact. Ember Court adds a small heel counter for structure.|The palette stays within cream, tan and one deep red for contrast.'],
 // fashion
 ['a01','Waxed shells and quiet hardware: this month\'s outerwear','fashion',['Outerwear','Textiles'],'odalys-penhallow','2099-03-01',10,'Matte coatings, hidden zips and muted snaps define a new wave of invented shell jackets.','The most noticeable change in this month\'s sample outerwear is how little hardware shows. Zips hide behind plackets, snaps match the fabric and pulls shrink to a small loop.|Waxed cotton and soft nylon blends do most of the work. A handful of invented labels, including Sorrel Union and Fennimore Dye, offer variations on the same quiet idea.'],
 ['a02','Wide trousers, three ways to hold the line','fashion',['Trousers','Layering'],'odalys-penhallow','2099-03-03',11,'Pleats, pressed creases and a firm waistband keep a wide leg looking deliberate.','A pressed crease gives volume a spine. A firm waistband and a flat front stop the fabric from collapsing at the hip.|Pair a wide leg with something shorter on top, and the proportions do the rest.'],
 ['a03','Street style from Veldmark: colour on a grey day','fashion',['Street style','Colour'],'juno-starrow','2099-03-05',12,'An invented city, a long grey winter and a spectrum of bright outer layers.','Veldmark\'s streets are narrow and its skies are low, so a yellow raincoat reads like a signal flare. Observers note the repeated use of one strong colour against neutrals.|These are observational sketches written for a fictional magazine, not reports about real places or people.'],
 ['a04','Layering without bulk: a short guide','fashion',['Layering'],'odalys-penhallow','2099-03-07',13,'Thin layers, different lengths and a deliberate order keep outfits light.','Start with a smooth base, add a mid-weight layer with a shorter hem and finish with an outer shell that skims rather than squeezes.|Lengths staggered by a few centimetres make the layers visible without adding weight.'],
 ['a05','Textile of the month: boiled wool','fashion',['Textiles'],'odalys-penhallow','2099-03-10',0,'Dense, springy and slightly fuzzy, boiled wool is a staple of the invented winter range.','Boiled wool is knitted and then shrunk, so the stitches close into a dense, felt-like surface. It holds a shape well and resists fraying at cut edges.|That makes it popular for jackets with raw hems and minimal seams.'],
 ['a06','The tote bag as a notice board','fashion',['Street style','Colour'],'juno-starrow','2099-03-12',1,'Printed slogans, hand-drawn badges and small pockets turn a simple bag into a message board.','The plain canvas tote has become a place for small statements: a stencilled word, a woven patch or a safety-pin collection.|None of the examples here refers to a real label or slogan; they are sketches for a fictional magazine.'],
 ['a07','Sorrel Union debuts a reversible work jacket','fashion',['Outerwear','Textiles'],'odalys-penhallow','2099-03-14',2,'The invented label offers a jacket that is moss on one side and rust on the other.','Reversible garments need clean internal seams and a pocket plan that works both ways. This invented design uses bound seams and two flat pockets on each face.|The collar folds to hide the lining colour when needed.'],
 ['a08','Tangerine Static: when one accent colour runs a wardrobe','fashion',['Colour'],'juno-starrow','2099-03-15',3,'A single bright hue shows up across hats, socks and shell linings.','Repeating one saturated colour in small doses ties an outfit together. The trick is spacing: one accent near the face, one near the feet.|Neutrals do the heavy lifting in between.'],
 ['a09','Cropped, cuffed, stacked: how hems are behaving','fashion',['Trousers'],'odalys-penhallow','2099-03-17',4,'Hems are being shortened, rolled and left to pool, sometimes in the same outfit.','A cropped hem shows the shoe, a cuff adds a line and a stacked hem creates texture. All three are in circulation in the sample photographs.|Choose one per outfit to avoid visual noise.'],
 ['a10','Street style from Port Valmere: bike lanes and bomber sleeves','fashion',['Street style','Outerwear'],'juno-starrow','2099-03-19',5,'Cyclists in an invented port city favour short, sleek jackets and reflective details.','Port Valmere\'s bike lanes run beside the water, and its commuters favour compact jackets that will not catch on a chain. Reflective piping shows up on cuffs and hems.|As with all street-style notes here, the city and its commuters are invented.'],
 // culture
 ['c01','Poster walls of Kestrel Bay: an informal survey','culture',['Art','Events'],'casimir-dyle','2099-03-01',6,'Layered paper, wheatpaste and bold type fill the walls of an invented harbour town.','The poster walls of Kestrel Bay change every week. Layers of paper build a thick, peeling crust that reveals older colours when the top sheets fall away.|The survey is a made-up piece about a made-up town and is meant to demonstrate how a culture section might read.'],
 ['c02','Hollowmast Studio\'s new modular shelving, explained','culture',['Design','Lifestyle'],'casimir-dyle','2099-03-04',7,'An invented design studio proposes shelves that interlock without tools.','Each shelf unit has a tongue-and-groove edge that locks into the next. The system can grow sideways or upwards, and it comes apart for a move.|The studio is imaginary and the product does not exist.'],
 ['c03','Slow mornings: the lifestyle of a three-minute coffee','culture',['Lifestyle'],'ines-varga-holt','2099-03-06',8,'A short essay on small rituals that make a day begin gently.','A short ritual does not need a long window. Three minutes by an open window, a warm mug and no screen can mark the start of the day.|The essay describes habits in general terms, with no claims about health or performance.'],
 ['c04','Eight tape-label mixes to play on a long train','culture',['Music','Lifestyle'],'casimir-dyle','2099-03-08',9,'Invented collectives and invented mixes for imaginary journeys.','The eight imaginary mixes in this sample list are described by mood: rain on glass, golden hour, night platform. Each one is a fictional release by a fictional collective.|No real artists, labels or tracks are referenced.'],
 ['c05','A sample pop-up in Orrin Quay turns a car park into a gallery','culture',['Events','Art'],'casimir-dyle','2099-03-10',10,'An invented city hosts an invented pop-up of invented printmakers.','Concrete pillars become display plinths, and the painted bay lines turn into a ready-made gallery plan. A small team in the story rearranges the layout each evening.|The event described here is entirely fictional and has no date or address in the real world.'],
 ['c06','Colour fields: a note on flat-pattern painting','culture',['Art'],'casimir-dyle','2099-03-12',11,'Flat shapes, hard edges and a limited palette define a style of fictional painting.','Flat-pattern painting removes depth and lets colour do the work. The edges are crisp, and the surfaces are even.|This note is an imagined review of imagined paintings.'],
 ['c07','Furniture for small flats, and the fold-flat movement','culture',['Design','Lifestyle'],'ines-varga-holt','2099-03-14',12,'Tables that fold, stools that stack and shelves that hang from a single rail.','Fold-flat furniture lets a small room change roles during a day. A table becomes a desk and then a shelf.|The pieces in this story are sketches rather than products.'],
 ['c08','Ildermoor Night Market, imagined','culture',['Events','Lifestyle'],'ines-varga-holt','2099-03-16',13,'A made-up night market with made-up stalls, described as a thought experiment.','Imagine lantern strings, folding tables and the smell of toasted spices. The invented Ildermoor Night Market has no opening hours and no address.|It is a creative exercise rather than an event listing.'],
 ['c09','The zine table is back','culture',['Art','Lifestyle'],'casimir-dyle','2099-03-18',0,'Photocopied pages, staples and tiny print runs are a small revival in this sample world.','A zine is a quick way to publish a small idea. Folded paper, a stapler and a copier are all it takes.|The tables described here are fictional.'],
 ['c10','Listening room: the five-track EP format','culture',['Music'],'ines-varga-holt','2099-03-20',2,'Short releases that fit a single commute are an imagined trend.','Five tracks can carry a mood without outstaying it. The format gives the imagined artists a way to release quickly.|The artists and the tracks in this piece are invented.']
].map(r => ({ id: r[0], title: r[1], section: r[2], tags: r[3], author: r[4], date: r[5], art: r[6], dek: r[7], body: r[8].split('|') }));
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function fmtDate(d) { const p = d.split('-'); return Number(p[2]) + ' ' + MONTHS[Number(p[1]) - 1] + ' ' + p[0]; }
function cardHTML(a, level) {
  const h = 'h' + (level || 3);
  return '<li class="card" data-component="story-card" data-id="' + a.id + '" data-section-name="' + a.section + '" data-tags="' + esc(a.tags.join('|')) + '" data-date="' + a.date + '" data-author="' + a.author + '" data-search="' + esc((a.title + ' ' + a.dek + ' ' + a.tags.join(' ') + ' ' + AUTHORS[a.author].name).toLowerCase()) + '">' +
    '<img class="card-img" src="' + ART[a.art].file + '" alt="" width="400" height="250" loading="lazy">' +
    '<div class="card-body"><p class="kicker">' + SECTIONS[a.section] + '</p><' + h + ' class="card-title"><a href="article.html?id=' + a.id + '">' + esc(a.title) + '</a></' + h + '>' +
    '<p class="card-dek">' + esc(a.dek) + '</p><p class="meta"><time datetime="' + a.date + '">' + fmtDate(a.date) + '</time> · ' + esc(AUTHORS[a.author].name) + '</p></div></li>';
}
function articleHTML(a) {
  const rel = ARTICLES.filter(x => x.id !== a.id && x.section === a.section).slice(0, 3);
  return '<nav aria-label="Breadcrumb" class="breadcrumb" data-section="breadcrumbs" data-component="breadcrumbs"><ol><li><a href="index.html">Home</a></li><li><a href="' + a.section + '.html">' + SECTIONS[a.section] + '</a></li><li><span aria-current="page">Story</span></li></ol></nav>' +
    '<article class="article" data-section="article" data-component="article-body" data-id="' + a.id + '"><header><p class="kicker">' + SECTIONS[a.section] + '</p><h1>' + esc(a.title) + '</h1><p class="lede">' + esc(a.dek) + '</p>' +
    '<p class="meta">By <a href="author.html?a=' + a.author + '">' + esc(AUTHORS[a.author].name) + '</a> (fictional) · <time datetime="' + a.date + '">' + fmtDate(a.date) + '</time> (sample date)</p></header>' +
    '<figure class="article-figure"><img src="' + ART[a.art].file + '" alt="' + esc(ART[a.art].alt) + '" width="800" height="500"><figcaption>Placeholder artwork: ' + esc(ART[a.art].title) + '. No photography is used on this site.</figcaption></figure>' +
    '<div class="prose">' + a.body.map(p => '<p>' + esc(p) + '</p>').join('') + '</div>' +
    '<p class="tags-line"><span>Topics:</span> ' + a.tags.map(t => '<a class="tag" href="' + a.section + '.html?tag=' + encodeURIComponent(t) + '">' + esc(t) + '</a>').join(' ') + '</p></article>' +
    '<section aria-labelledby="related-title" data-section="related-stories" data-component="card-grid"><h2 id="related-title">More in ' + SECTIONS[a.section] + '</h2><ul class="grid grid-3" role="list">' + rel.map(x => cardHTML(x, 3)).join('') + '</ul></section>';
}
const DROPS = [
 ['d01','Pylon Mid, Salt Quarry (sample)','Tarnwick','Footwear','2099-04-03','Veldmark'],
 ['d02','Waxed Field Shell (sample)','Sorrel Union','Apparel','2099-04-05','Port Valmere'],
 ['d03','Tessel Runner, felt edition (sample)','Quillon Works','Footwear','2099-04-09','Kestrel Bay'],
 ['d04','Canvas Notice Tote (sample)','Marrow Lane','Accessories','2099-04-11','Orrin Quay'],
 ['d05','Dovetail Slip, Moss Receipt (sample)','Brindle Hall','Footwear','2099-04-14','Ildermoor'],
 ['d06','Boiled Wool Overshirt (sample)','Fennimore Dye','Apparel','2099-04-18','Veldmark'],
 ['d07','Lattice High, Dusk Ledger (sample)','Tarnwick','Footwear','2099-05-02','Kestrel Bay'],
 ['d08','Reflective Piping Bomber (sample)','Ostler Peak','Apparel','2099-05-06','Port Valmere'],
 ['d09','Stack Hem Trouser (sample)','Plinth Wardrobe','Apparel','2099-05-08','Orrin Quay'],
 ['d10','Grommet Trail Boot (sample)','Hollowmast Footwear','Footwear','2099-05-13','Ildermoor'],
 ['d11','Toggle Cap (sample)','Marrow Lane','Accessories','2099-05-16','Veldmark'],
 ['d12','Ember Court, cream (sample)','Brindle Hall','Footwear','2099-05-20','Kestrel Bay'],
 ['d13','Reversible Work Jacket (sample)','Sorrel Union','Apparel','2099-06-03','Port Valmere'],
 ['d14','Woven Strap Belt (sample)','Cobalt Allotment','Accessories','2099-06-07','Orrin Quay'],
 ['d15','Trail Slip-on, shared edition (sample)','Brindle Hall x Quillon Works','Footwear','2099-06-12','Ildermoor'],
 ['d16','Felt Panel Cap (sample)','Quillon Works','Accessories','2099-06-19','Veldmark']
].map(r => ({ id: r[0], name: r[1], brand: r[2], type: r[3], date: r[4], city: r[5] }));
const BRANDS = [
 ['Brindle Hall','Footwear','Kestrel Bay','Invented footwear label with a taste for slip-ons.'],
 ['Cobalt Allotment','Accessories','Orrin Quay','Invented maker of woven belts and straps.'],
 ['Fennimore Dye','Apparel','Veldmark','Invented dye house turning out wool overshirts.'],
 ['Hollowmast Footwear','Footwear','Ildermoor','Invented boot maker focused on sealed seams.'],
 ['Hollowmast Studio','Studio','Ildermoor','Invented design studio behind modular shelving.'],
 ['Kettle & Vane','Apparel','Port Valmere','Invented rainwear label for commuters.'],
 ['Lumen Parcel','Accessories','Kestrel Bay','Invented bag maker with reflective trims.'],
 ['Marrow Lane','Accessories','Orrin Quay','Invented tote and cap brand.'],
 ['Nocturne Thread','Apparel','Ildermoor','Invented knitwear house working in dark tones.'],
 ['Ostler Peak','Apparel','Port Valmere','Invented jacket label with compact cuts.'],
 ['Plinth Wardrobe','Apparel','Orrin Quay','Invented trouser specialist.'],
 ['Quillon Works','Footwear','Kestrel Bay','Invented runner and trail shoe workshop.'],
 ['Ridgeline Atelier','Apparel','Veldmark','Invented outerwear atelier.'],
 ['Sorrel Union','Apparel','Port Valmere','Invented label known for reversible garments.'],
 ['Tarnwick','Footwear','Veldmark','Invented sneaker label with chunky soles.'],
 ['Tidewrack','Accessories','Kestrel Bay','Invented maker of canvas goods.'],
 ['Umber & Ash','Apparel','Ildermoor','Invented tonal basics label.'],
 ['Vesper Mill','Studio','Orrin Quay','Invented print and zine studio.'],
 ['Warren Signal','Accessories','Port Valmere','Invented hat and scarf maker.'],
 ['Yarrow Court','Footwear','Veldmark','Invented court-shoe label.']
].map(r => ({ name: r[0], type: r[1], city: r[2], blurb: r[3], letter: r[0][0] }));
const SLIDES = [
 ['Plate 1: Orange over slate', 0], ['Plate 2: Teal arches', 1], ['Plate 3: Black and yellow', 2], ['Plate 4: Stacked bars', 3],
 ['Plate 5: Quarter circles', 4], ['Plate 6: Blue grid', 5], ['Plate 7: Coral wave', 6], ['Plate 8: Olive and pink', 7]
].map(s => ({ cap: s[0] + ' (invented artwork)', art: s[1] }));

(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var params = new URLSearchParams(location.search);

  /* ---------- Navigation: mobile disclosure + dropdowns ---------- */
  var menuBtn = $('#menu-toggle'), nav = $('#site-nav');
  function setMenu(open) {
    if (!menuBtn || !nav) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    menuBtn.querySelector('.btn-label').textContent = open ? 'Close menu' : 'Menu';
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  var dropBtns = $$('.dropdown-toggle');
  function closeDrops(except, returnFocus) {
    dropBtns.forEach(function (b) {
      if (b === except) return;
      if (b.getAttribute('aria-expanded') === 'true') {
        b.setAttribute('aria-expanded', 'false');
        if (returnFocus) b.focus();
      }
    });
  }
  dropBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      closeDrops(b, false);
      b.setAttribute('aria-expanded', String(!open));
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-dropdown')) closeDrops(null, false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openDrop = dropBtns.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    if (openDrop) { openDrop.setAttribute('aria-expanded', 'false'); openDrop.focus(); return; }
    if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });
  nav && nav.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !e.relatedTarget.closest('.has-dropdown')) closeDrops(null, false);
  });

  function announce(el, msg) { if (el) el.textContent = msg; }
  function plural(n, w) { return n + ' ' + (n === 1 ? w : (/y$/.test(w) ? w.slice(0, -1) + 'ies' : w + 's')); }

  /* ---------- Section fronts: tag chips + sort ---------- */
  var secRoot = $('[data-filter-root="stories"]');
  if (secRoot) {
    var list = $('.story-list', secRoot), status = $('.filter-status', secRoot), empty = $('.empty-state', secRoot);
    var chips = $$('.chip', secRoot), sortSel = $('.sort-select', secRoot);
    var active = {};
    var items = $$('.card', list);
    var firstTag = params.get('tag');
    if (firstTag) { chips.forEach(function (c) { if (c.dataset.tag === firstTag) active[firstTag] = true; }); }
    var applyStories = function () {
      var keys = Object.keys(active), shown = 0;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.tag === '*' ? String(keys.length === 0) : String(!!active[c.dataset.tag])); });
      var ordered = items.slice().sort(function (a, b) { return sortSel && sortSel.value === 'oldest' ? a.dataset.date.localeCompare(b.dataset.date) : b.dataset.date.localeCompare(a.dataset.date); });
      ordered.forEach(function (li) {
        var tags = li.dataset.tags.split('|');
        var ok = !keys.length || keys.some(function (k) { return tags.indexOf(k) > -1; });
        li.hidden = !ok; if (ok) shown++;
        list.appendChild(li);
      });
      empty.hidden = shown !== 0;
      announce(status, plural(shown, 'story') + ' shown' + (keys.length ? ' for ' + keys.join(', ') : '') + '.');
    };
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        if (c.dataset.tag === '*') active = {}; else if (active[c.dataset.tag]) delete active[c.dataset.tag]; else active[c.dataset.tag] = true;
        applyStories();
      });
    });
    sortSel && sortSel.addEventListener('change', applyStories);
    var clear = $('.clear-filters', secRoot);
    clear && clear.addEventListener('click', function () { active = {}; applyStories(); var all = $('.chip[data-tag="*"]', secRoot); all && all.focus(); });
    applyStories();
    // Culture dropdown deep links like culture.html?tag=Art
  }

  /* ---------- Home: load more ---------- */
  var more = $('#load-more');
  if (more) {
    var feed = $('#latest-feed'), hiddenItems = $$('.card[hidden]', feed), step = 6;
    var mstatus = $('#load-more-status');
    more.addEventListener('click', function () {
      var batch = hiddenItems.splice(0, step);
      batch.forEach(function (li) { li.hidden = false; });
      if (batch.length) { var link = $('a', batch[0]); link && link.focus(); }
      announce(mstatus, batch.length + ' more stories loaded. ' + (hiddenItems.length ? hiddenItems.length + ' remain.' : 'That is all of the sample stories.'));
      if (!hiddenItems.length) { more.disabled = true; more.textContent = 'No more sample stories'; }
    });
  }

  /* ---------- Article page ---------- */
  var artRoot = $('#article-root');
  if (artRoot) {
    var id = params.get('id') || 'a01';
    var art = ARTICLES.filter(function (a) { return a.id === id; })[0];
    if (art) {
      if (artRoot.dataset.id !== art.id) { artRoot.innerHTML = articleHTML(art); artRoot.dataset.id = art.id; }
      document.title = art.title + ' | Curbside Signal (fictional)';
    } else {
      artRoot.innerHTML = '<div class="empty-state" data-component="empty-state"><h1>Story not found</h1><p>No sample story has the identifier "' + esc(id) + '". <a href="index.html">Return to the home page</a> or <a href="search.html">search the sample stories</a>.</p></div>';
      document.title = 'Story not found | Curbside Signal (fictional)';
    }
  }

  /* ---------- Author page ---------- */
  var authRoot = $('#author-root');
  if (authRoot) {
    var key = params.get('a');
    if (!AUTHORS[key]) key = 'tavi-brennick';
    var au = AUTHORS[key];
    $('#author-name').textContent = au.name;
    $('#author-role').textContent = au.role;
    $('#author-bio').textContent = au.bio;
    document.title = 'Stories by ' + au.name + ' (fictional) | Curbside Signal';
    var n = 0;
    $$('.card', authRoot).forEach(function (li) { var ok = li.dataset.author === key; li.hidden = !ok; if (ok) n++; });
    announce($('#author-count'), plural(n, 'story') + ' by ' + au.name + '.');
    $$('.author-switch a', authRoot).forEach(function (a) { if (a.dataset.a === key) a.setAttribute('aria-current', 'true'); });
  }

  /* ---------- Search ---------- */
  var sRoot = $('#search-root');
  if (sRoot) {
    var q = (params.get('q') || '').trim(), qlow = q.toLowerCase();
    var sIn = $('#search-page-input'), sStatus = $('#search-status'), sEmpty = $('#search-empty'), sIntro = $('#search-intro');
    sIn.value = q;
    var results = $$('[data-search]', sRoot), count = 0;
    if (!q) {
      results.forEach(function (r) { r.hidden = true; });
      sEmpty.hidden = true; sIntro.hidden = false;
      announce(sStatus, 'Enter a search term to search the sample stories and brands.');
    } else {
      sIntro.hidden = true;
      var terms = qlow.split(/\s+/);
      results.forEach(function (r) {
        var ok = terms.every(function (t) { return r.dataset.search.indexOf(t) > -1; });
        r.hidden = !ok; if (ok) count++;
      });
      $$('.result-group', sRoot).forEach(function (g) { g.hidden = !$('[data-search]:not([hidden])', g); });
      sEmpty.hidden = count !== 0;
      $('#search-empty-term').textContent = q;
      announce(sStatus, plural(count, 'result') + ' for "' + q + '".');
    }
  }

  /* ---------- Brands directory ---------- */
  var bRoot = $('[data-filter-root="brands"]');
  if (bRoot) {
    var bText = $('#brand-text'), bType = $('#brand-type'), bStatus = $('.filter-status', bRoot), bEmpty = $('.empty-state', bRoot);
    var bItems = $$('.brand-item', bRoot);
    var applyBrands = function () {
      var t = bText.value.trim().toLowerCase(), ty = bType.value, shown = 0;
      bItems.forEach(function (li) {
        var ok = (!t || li.dataset.search.indexOf(t) > -1) && (ty === '*' || li.dataset.type === ty);
        li.hidden = !ok; if (ok) shown++;
      });
      bEmpty.hidden = shown !== 0;
      announce(bStatus, plural(shown, 'brand') + ' shown.');
    };
    bText.addEventListener('input', applyBrands);
    bType.addEventListener('change', applyBrands);
    $('#brand-reset').addEventListener('click', function () { bText.value = ''; bType.value = '*'; applyBrands(); bText.focus(); });
    $('#brand-form').addEventListener('submit', function (e) { e.preventDefault(); applyBrands(); });
    applyBrands();
  }

  /* ---------- Release calendar (sample data) ---------- */
  var cRoot = $('[data-filter-root="calendar"]');
  if (cRoot) {
    var cType = $('#cal-type'), cMonth = $('#cal-month'), cSaved = $('#cal-saved'), cStatus = $('.filter-status', cRoot), cEmpty = $('.empty-state', cRoot), savedStatus = $('#saved-status');
    var rows = $$('tbody tr', cRoot), saved = {};
    var applyCal = function () {
      var shown = 0;
      rows.forEach(function (r) {
        var ok = (cType.value === '*' || r.dataset.type === cType.value) && (cMonth.value === '*' || r.dataset.date.slice(0, 7) === cMonth.value) && (!cSaved.checked || saved[r.dataset.id]);
        r.hidden = !ok; if (ok) shown++;
      });
      $$('table', cRoot).forEach(function (t) { t.hidden = shown === 0; });
      cEmpty.hidden = shown !== 0;
      announce(cStatus, plural(shown, 'sample entry') + ' shown.');
    };
    [cType, cMonth, cSaved].forEach(function (el) { el.addEventListener('change', applyCal); });
    $$('.save-btn', cRoot).forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.closest('tr').dataset.id, on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', String(on));
        b.querySelector('.save-label').textContent = on ? 'Marked' : 'Mark';
        if (on) saved[id] = true; else delete saved[id];
        announce(savedStatus, plural(Object.keys(saved).length, 'sample entry') + ' marked in this demo list. Nothing is saved or sent.');
        if (cSaved.checked) applyCal();
      });
    });
    $('#cal-reset').addEventListener('click', function () { cType.value = '*'; cMonth.value = '*'; cSaved.checked = false; applyCal(); cType.focus(); });
    applyCal();
  }

  /* ---------- Gallery carousel + lightbox ---------- */
  var gal = $('#gallery');
  if (gal) {
    var idx = 0, total = SLIDES.length;
    var gImg = $('#gallery-img'), gCap = $('#gallery-cap'), gInd = $('#gallery-indicator'), gOpen = $('#gallery-open');
    var dlg = $('#lightbox'), dImg = $('#lightbox-img'), dCap = $('#lightbox-cap'), dInd = $('#lightbox-indicator');
    var thumbs = $$('.thumb', gal);
    var opener = null;
    var show = function (i, say) {
      idx = (i + total) % total;
      var s = SLIDES[idx], a = ART[s.art];
      gImg.src = a.file; gImg.alt = a.alt; gCap.textContent = s.cap;
      dImg.src = a.file; dImg.alt = a.alt; dCap.textContent = s.cap;
      var label = 'Plate ' + (idx + 1) + ' of ' + total;
      dInd.textContent = label;
      if (say !== false) gInd.textContent = label; else gInd.textContent = '';
      $('#gallery-count-visible').textContent = (idx + 1) + ' / ' + total;
      thumbs.forEach(function (t, k) { t.setAttribute('aria-current', k === idx ? 'true' : 'false'); });
    };
    $('#gallery-prev').addEventListener('click', function () { show(idx - 1); });
    $('#gallery-next').addEventListener('click', function () { show(idx + 1); });
    $('#lightbox-prev').addEventListener('click', function () { show(idx - 1); });
    $('#lightbox-next').addEventListener('click', function () { show(idx + 1); });
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { show(k); }); });
    gal.addEventListener('keydown', function (e) {
      if (e.target.closest('input,select,textarea')) return;
      if (e.key === 'ArrowLeft') { show(idx - 1); } else if (e.key === 'ArrowRight') { show(idx + 1); }
    });
    gOpen.addEventListener('click', function () {
      opener = gOpen;
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
      $('#lightbox-close').focus();
    });
    var closeDlg = function () { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };
    $('#lightbox-close').addEventListener('click', closeDlg);
    dlg.addEventListener('close', function () { if (opener) { opener.focus(); opener = null; } });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDlg(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeDlg(); }
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
    });
    show(0, false);
  }

  /* ---------- Newsletter (simulation) ---------- */
  var nl = $('#newsletter-form');
  if (nl) {
    var sum = $('#error-summary'), ok = $('#nl-success'), emailI = $('#nl-email'), freqs = $$('input[name="freq"]', nl);
    var setErr = function (input, msgEl, msg) {
      msgEl.textContent = msg; msgEl.hidden = !msg;
      if (input.length) { input.forEach(function (i) { msg ? i.setAttribute('aria-invalid', 'true') : i.removeAttribute('aria-invalid'); }); }
      else { msg ? input.setAttribute('aria-invalid', 'true') : input.removeAttribute('aria-invalid'); }
    };
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = [], v = emailI.value.trim();
      var eMsg = '', fMsg = '';
      if (!v) eMsg = 'Enter an email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) eMsg = 'Enter an email address in the form name@example.test.';
      var chosen = freqs.some(function (f) { return f.checked; });
      if (!chosen) fMsg = 'Choose how often you would like the demo digest.';
      setErr(emailI, $('#nl-email-err'), eMsg);
      setErr(freqs, $('#nl-freq-err'), fMsg);
      if (eMsg) errs.push(['nl-email', eMsg]);
      if (fMsg) errs.push(['nl-freq-weekly', fMsg]);
      ok.hidden = true;
      if (errs.length) {
        sum.hidden = false;
        sum.innerHTML = '<h2 id="error-summary-title">There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with the form</h2><ul>' + errs.map(function (x) { return '<li><a href="#' + x[0] + '">' + esc(x[1]) + '</a></li>'; }).join('') + '</ul>';
        sum.focus();
        $$('a', sum).forEach(function (a) { a.addEventListener('click', function (ev) { ev.preventDefault(); var t = document.getElementById(a.getAttribute('href').slice(1)); t && t.focus(); }); });
        return;
      }
      sum.hidden = true; sum.innerHTML = '';
      ok.hidden = false;
      ok.focus();
      nl.reset();
    });
    emailI.addEventListener('input', function () { if (emailI.getAttribute('aria-invalid')) { setErr(emailI, $('#nl-email-err'), ''); } });
  }
})();
