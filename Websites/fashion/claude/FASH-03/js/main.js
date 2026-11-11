/* Stitch & Strut Daily - fictional demo site. Vanilla JS, no network requests; all data is inline. */
(function () {
  'use strict';

  var STORIES = [
    {"id":1,"cats":["celebrity-style","fashion"],"date":"2026-11-08","pop":98,"title":"Lumen Art + Film Gala Best Dressed: Velvet Capes, Liquid Silver and One Very Brave Feather","dek":"Our desk ranks the red-carpet looks that earned a second glance at this year's invented-for-the-occasion gala.","b":["The carpet at the Lumen Art + Film Gala rewarded commitment. Marisol Vance arrived in a floor-length velvet cape the color of plum wine, while Ines Calloway chose liquid silver that moved like water under the flashbulbs.","The boldest choice belonged to Dex Okonkwo-Hale, whose single sculpted feather collar stole the evening. Our rule of thumb: if the silhouette still reads from across the street, the look worked."]},
    {"id":2,"cats":["street-style","fashion"],"date":"2026-11-07","pop":85,"title":"Street Style Report: Rain-Ready Layers Take Over the Crosswalk","dek":"Waxed jackets, bright umbrellas and boots with real tread: the wet-weather uniform has finally become fashionable.","b":["Grey skies did not stop the morning crowd. The standout formula was a long waxed coat over cropped trousers, finished with a bold umbrella that doubled as the accent color of the outfit.","Footwear leaned practical: lug-sole boots, rubber loafers and the occasional heroic suede sneaker. Proof that dressing for the forecast and dressing well can happen at the same time."]},
    {"id":3,"cats":["trend","fashion"],"date":"2026-11-06","pop":90,"title":"Trend Watch: The Return of the Sculpted Shoulder","dek":"Structured shoulders are back on blazers, knits and even evening dresses. Here is how to wear them without looking like a costume.","b":["Designers are building shoulders again, from gentle padding in soft knits to architectural peaks on tailoring. The trick is balance: pair a strong top half with a fluid skirt or straight trouser.","If you are wary, start with a single piece. A sharp blazer over a plain tee and jeans is the lowest-risk way to try the shape before you commit to a full statement coat."]},
    {"id":4,"cats":["runway","fashion"],"date":"2026-11-05","pop":70,"title":"Runway Recap: Atelier Nonpareil Opens the Season With Midnight Blues","dek":"A single color story, forty looks and a soundtrack of rain: the show was a lesson in restraint.","b":["Atelier Nonpareil limited itself to shades of blue, from ink to near-black, and let texture do the work. Pleated silk, boiled wool and glossy vinyl shared the stage without ever clashing.","Accessories were minimal, with slim belts and sculptural cuffs. The closing look, a hooded gown in navy taffeta, drew the loudest applause of the week."]},
    {"id":5,"cats":["designers"],"date":"2026-11-04","pop":66,"title":"Designer Spotlight: Adaeze Folarin Builds a Label From Deadstock Silk","dek":"The young designer turns leftover fabric into limited drops and keeps her studio small on purpose.","b":["Adaeze Folarin sources deadstock silk from mills that would otherwise discard it, then cuts each piece in runs of no more than thirty. Her studio fits in a converted garage and her waiting list keeps growing.","Next season she plans to add tailoring in recycled wool. Her advice to new designers is simple: finish one perfect garment before you try to build a collection."]},
    {"id":6,"cats":["what-to-wear","fashion"],"date":"2026-11-03","pop":80,"title":"What to Wear to a Winter Wedding Without Freezing","dek":"Warm layers that still photograph beautifully, from velvet wraps to thermal tights nobody will notice.","b":["Start with a base layer you can forget about: fine merino or silk thermals under a dress keep the chill out without adding bulk. Then choose a statement wrap, such as velvet or heavy satin, that can come off indoors.","Shoes matter most. Pick closed-toe heels or block-heeled boots, and carry a small pair of foldable flats for the dance floor and the car park."]},
    {"id":7,"cats":["beauty"],"date":"2026-11-02","pop":55,"title":"Beauty Notes: Glass Skin Meets Matte Lip","dek":"Dewy complexion plus a velvet-matte color is the contrast of the season. We break down the routine.","b":["The idea is contrast: a luminous, lightly moisturized base with a flat, saturated lip. Keep the cheeks soft so the mouth does the talking.","Prep matters. Exfoliate gently the night before, use a hydrating serum in the morning, and blot only the center of the face so the glow survives."]},
    {"id":8,"cats":["celebrity-style"],"date":"2026-11-01","pop":74,"title":"Celebrity Style: Marisol Vance's Airport Looks, Ranked","dek":"Travel dressing is a sport, and these five arrivals show the range from sweatsuit to full tailoring.","b":["Number five is a matching grey sweatsuit with a vivid scarf, comfortable and still considered. Number one is a camel overcoat over a white column dress, which should not work at a security line and somehow does.","The common thread is a strong third piece: a scarf, a hat, an oversized bag. It turns a travel day into an outfit."]},
    {"id":9,"cats":["street-style"],"date":"2026-10-30","pop":60,"title":"Street Style: Thrifted Tailoring on the Morning Commute","dek":"Second-hand blazers and wide trousers dominate the platform. We asked what people paid.","b":["Vintage tailoring is having a moment because the cut is better than much of what is new. A boxy blazer found for the price of lunch was the most common story we heard.","Fit is the secret. Nearly everyone had taken a piece to a tailor, shortening hems and nipping waists, so old clothes look deliberate."]},
    {"id":10,"cats":["trend"],"date":"2026-10-28","pop":52,"title":"Trend Watch: Chunky Knit Scarves Get Dramatic","dek":"Oversized, draped and occasionally tied in a bow, the scarf is now the main event of the outfit.","b":["Scarves this season are measured in feet. Wrap one twice, let the ends fall to the hem, and keep the rest of the outfit quiet.","Color blocking works best: a burnt orange scarf with a charcoal coat, or ivory against deep green."]},
    {"id":11,"cats":["runway","fashion"],"date":"2026-10-26","pop":61,"title":"Runway Recap: Maison Quill Stages Show in a Parking Garage","dek":"Concrete, headlights and unexpected eveningwear: the setting was half the story.","b":["Maison Quill traded the usual white tent for a multi-story car park, and models walked the ramps between parked vintage cars. The raw setting made the satin and lace look even more luxurious.","Standouts included a trench coat cut from sequined mesh and boots with a metallic heel that echoed the car chrome."]},
    {"id":12,"cats":["designers","fashion"],"date":"2026-10-24","pop":77,"title":"Black Designers to Know: Five Labels Reinventing Outerwear","dek":"From hand-quilted puffers to reversible capes, these independent studios are changing how winter looks.","b":["Our list spans three countries and a wide range of prices. Each label shares a commitment to small runs and transparent sourcing, and every one offers at least one coat worth saving for.","Look for hand-quilted down alternatives, reversible wool capes and parkas with secret pockets. We have linked each studio's profile on its own page in the full guide."]},
    {"id":13,"cats":["what-to-wear"],"date":"2026-10-22","pop":68,"title":"What to Wear: Five Ways to Style a Leather Skirt","dek":"One versatile piece, five outfits: office, dinner, weekend, concert and a very cold Tuesday.","b":["For the office, pair a midi leather skirt with a fine knit and low block heels. For dinner, swap the knit for a silk camisole and add a sharp blazer.","On weekends, go casual with an oversized sweatshirt and sneakers. The skirt does the heavy lifting in every version."]},
    {"id":14,"cats":["beauty"],"date":"2026-10-20","pop":49,"title":"Beauty: The Braid Revival, Step by Step","dek":"Fishtails, micro braids and one clever twist: how to get the look at home in twenty minutes.","b":["Begin with slightly textured hair, since freshly washed strands slip. A light mist of salt spray gives enough grip for any braid.","Work in small sections and tug gently at the edges once finished. A little looseness reads as intentional rather than messy."]},
    {"id":15,"cats":["fashion"],"date":"2026-10-18","pop":44,"title":"Fashion Notes: Why Everyone Is Wearing Mismatched Earrings","dek":"Two different earrings, one deliberate statement. Here is how to pull it off.","b":["The mismatched earring is the easiest way to look curated. Pick a shared metal or color, then vary the shape: a hoop on one side, a drop on the other.","It also solves a practical problem: lose one and you have simply started a new pair."]},
    {"id":16,"cats":["celebrity-style"],"date":"2026-10-16","pop":58,"title":"Celebrity Style: Dex Okonkwo-Hale Wears a Suit Like Pajamas","dek":"Soft shoulders, loose trousers and no tie: the relaxed suit has a new ambassador.","b":["Dex Okonkwo-Hale has made a habit of wearing tailoring that looks slept in on purpose. The jackets are unstructured and the trousers pool slightly over the shoe.","The takeaway: comfort and polish are not opposites, as long as the fabric is good and the fit is considered."]},
    {"id":17,"cats":["street-style"],"date":"2026-10-14","pop":40,"title":"Street Style: Market Day Colors in the Old Town","dek":"Stall owners and shoppers brought saturated color to a grey Saturday.","b":["Market crowds dress for the stalls: tomato red, mustard and deep teal showed up in everything from aprons to anoraks.","One recurring detail was the tote bag, worn crossbody and stuffed with produce. Fashion and function met at the vegetable table."]},
    {"id":18,"cats":["designers"],"date":"2026-10-12","pop":63,"title":"Designer Spotlight: Teodora Marsh on Tailoring for Every Body","dek":"An inclusive pattern library and made-to-measure pricing without the premium: a studio visit.","b":["Teodora Marsh builds each pattern in twelve sizes and offers adjustments at no extra cost. Her studio walls are covered in fit notes from customers.","She believes tailoring should be a service, not a luxury. Her next project is a trouser that adjusts across three inseam lengths."]},
    {"id":19,"cats":["runway","trend"],"date":"2026-10-10","pop":57,"title":"Runway Recap: The Quiet Luxury Backlash Gets Loud","dek":"After seasons of beige, designers answered with sequins, prints and unapologetic volume.","b":["Several houses seem to have agreed that minimalism has had its turn. Ruffles, jacquards and clashing prints dominated the week.","Expect the street to follow: bold color and surface detail are the likely answer to a long stretch of neutral dressing."]},
    {"id":20,"cats":["trend","fashion"],"date":"2026-10-08","pop":46,"title":"Trend: Micro-Bags Are Back and Impractically Tiny","dek":"Bags that hold a lipstick and nothing else are on every shoulder. We test how much they carry.","b":["The micro-bag has returned, and it fits a card, a key and, with some persistence, a folded tissue. Phones are out of the question.","Our advice: treat it as jewelry. Carry your real essentials in a coat pocket and let the tiny bag be the accessory."]}
  ];
  var CATS = {
    'fashion': { name: 'Fashion', page: 'fashion.html', blurb: 'Everything on the daily fashion beat: collections, wardrobe notes and the pieces people keep asking about.' },
    'street-style': { name: 'Street Style', page: 'street-style.html', blurb: 'Real people, real outfits: what we spotted on commutes, markets and crosswalks.' },
    'trend': { name: 'Trend', page: 'trend.html', blurb: 'The shapes, colors and accessories moving from the runway to your wardrobe.' },
    'celebrity-style': { name: 'Celebrity Style', page: 'celebrity-style.html', blurb: 'Red carpets, airports and after-parties, ranked by our desk.' },
    'runway': { name: 'Runway', page: 'runway.html', blurb: 'Recaps and standout looks from the season\'s shows.' },
    'designers': { name: 'Black Designers', page: 'designers.html', blurb: 'Studio visits, label guides and the independent designers we are watching.' },
    'what-to-wear': { name: 'What to Wear', page: 'what-to-wear.html', blurb: 'Practical outfit ideas for weddings, work, weather and weekends.' },
    'beauty': { name: 'Beauty', page: 'beauty.html', blurb: 'Skin, hair and makeup routines worth trying.' }
  };
  var PAGE_SIZE = 6;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(text) { return String(text).replace(/[&<>"']/g, function (c) { return ENTITIES[c]; }); }
  function fmtDate(iso) {
    return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  function byId(id) { return STORIES.filter(function (s) { return s.id === id; })[0]; }
  function primary(story) { return CATS[story.cats[0]]; }
  function thumb(story) { return 'assets/look-' + (story.id % 6 + 1) + '.svg'; }
  function params() { return new URLSearchParams(window.location.search); }

  function card(story) {
    return '<article class="card" data-component="story-card">' +
      '<img src="' + thumb(story) + '" alt="" width="160" height="200" loading="lazy">' +
      '<div class="card__body"><p class="kicker">' + esc(primary(story).name) + '</p>' +
      '<h3><a href="article.html?id=' + story.id + '">' + esc(story.title) + '</a></h3>' +
      '<p>' + esc(story.dek) + '</p>' +
      '<p class="meta"><time datetime="' + story.date + '">' + fmtDate(story.date) + '</time></p></div></article>';
  }

  /* ---------- Header: mobile menu, dropdown disclosures, demo dialog ---------- */
  function initNav() {
    var menuButton = $('.menu-toggle');
    var nav = $('[data-component="primary-nav"]');
    var subToggles = $$('.nav-sub-toggle');
    function closeSubs(except) {
      subToggles.forEach(function (t) {
        if (t !== except) { t.setAttribute('aria-expanded', 'false'); }
      });
    }
    menuButton.addEventListener('click', function () {
      var open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      if (!open) { closeSubs(); }
    });
    subToggles.forEach(function (t) {
      t.addEventListener('click', function () {
        var open = t.getAttribute('aria-expanded') !== 'true';
        closeSubs(t);
        t.setAttribute('aria-expanded', String(open));
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      var openSub = subToggles.filter(function (t) { return t.getAttribute('aria-expanded') === 'true'; })[0];
      if (openSub) { closeSubs(); openSub.focus(); return; }
      if (menuButton.getAttribute('aria-expanded') === 'true' && menuButton.offsetParent !== null) {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        menuButton.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) { closeSubs(); }
    });
    nav.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !nav.contains(e.relatedTarget)) { closeSubs(); }
    });
  }

  function initDemoDialog() {
    var dialog = $('#demo-dialog');
    var text = $('#demo-dialog-text');
    var trigger = null;
    document.addEventListener('click', function (e) {
      var button = e.target.closest('[data-demo]');
      if (!button) { return; }
      trigger = button;
      text.textContent = button.getAttribute('data-demo') + ' is a demonstration control in this fictional replica. It does not open an external site, play media or complete any action.';
      dialog.showModal();
    });
    $('[data-close-dialog]', dialog).addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) { dialog.close(); } });
    dialog.addEventListener('close', function () { if (trigger) { trigger.focus(); } });
  }

  /* ---------- Story lists: category, search and author pages ---------- */
  function initStoryList(options) {
    var list = $('#story-list');
    var status = $('#list-status');
    var more = $('#load-more');
    var sort = $('#sort-order');
    var filter = $('#cat-filter');
    var shown = PAGE_SIZE;
    var items = [];

    function compute() {
      items = options.items.filter(function (s) { return !filter || !filter.value || s.cats.indexOf(filter.value) !== -1; });
      items.sort(sort.value === 'popular' ? function (a, b) { return b.pop - a.pop; } : function (a, b) { return a.date < b.date ? 1 : -1; });
    }
    function render(focusIndex) {
      var visible = items.slice(0, shown);
      list.innerHTML = visible.map(card).join('');
      more.hidden = visible.length >= items.length;
      var summary = items.length ? 'Showing ' + visible.length + ' of ' + items.length + ' stories.' : '';
      status.textContent = summary;
      $('#empty-state').hidden = items.length > 0;
      if (options.onRender) { options.onRender(items.length); }
      if (typeof focusIndex === 'number') { $$('.card h3 a', list)[focusIndex].focus(); }
    }
    sort.addEventListener('change', function () { shown = PAGE_SIZE; compute(); render(); });
    if (filter) { filter.addEventListener('change', function () { shown = PAGE_SIZE; compute(); render(); }); }
    more.addEventListener('click', function () {
      var firstNew = shown;
      shown += PAGE_SIZE;
      render(firstNew);
    });
    compute();
    render();
  }

  function initCategoryPage() {
    var slug = $('main').getAttribute('data-category');
    initStoryList({ items: STORIES.filter(function (s) { return s.cats.indexOf(slug) !== -1; }) });
  }

  function initAuthorPage() {
    initStoryList({ items: STORIES });
  }

  function initSearchPage() {
    var query = (params().get('s') || '').trim();
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    var box = $('#site-search-input');
    box.value = query;
    var matches = terms.length ? STORIES.filter(function (s) {
      var haystack = (s.title + ' ' + s.dek + ' ' + s.b.join(' ') + ' ' + s.cats.join(' ')).toLowerCase();
      return terms.every(function (t) { return haystack.indexOf(t) !== -1; });
    }) : [];
    var summary = $('#result-summary');
    var controls = $('.list-controls');
    if (!terms.length) {
      summary.textContent = 'Type a word into the search box above to look through the demo stories.';
      controls.hidden = true;
      $('#list-status').hidden = true;
      $('#load-more').hidden = true;
      $('#empty-state').hidden = true;
      return;
    }
    $('#empty-query').textContent = query;
    initStoryList({
      items: matches,
      onRender: function (count) {
        summary.textContent = count + (count === 1 ? ' story matches' : ' stories match') + ' “' + query + '”.';
        controls.hidden = matches.length === 0;
      }
    });
    document.title = 'You searched for ' + query + ' - Stitch & Strut Daily';
  }

  /* ---------- Article page ---------- */
  function initArticlePage() {
    var root = $('#article-root');
    var story = byId(Number(params().get('id') || 1));
    if (!story) {
      document.title = 'Story not found - Stitch & Strut Daily';
      root.innerHTML = '<div class="empty" data-component="empty-state" data-section="story-not-found"><h1>Story not found</h1>' +
        '<p>That story id is not in the demo data. Try the <a href="index.html">home page</a> or <a href="search.html">search</a>.</p></div>';
      return;
    }
    document.title = story.title + ' - Stitch & Strut Daily';
    var cat = primary(story);
    var related = STORIES.filter(function (s) { return s.id !== story.id && s.cats.indexOf(story.cats[0]) !== -1; })
      .concat(STORIES.filter(function (s) { return s.id !== story.id && s.cats.indexOf(story.cats[0]) === -1; }))
      .slice(0, 3);
    root.innerHTML =
      '<nav class="breadcrumb" aria-label="Breadcrumb" data-section="breadcrumb" data-component="breadcrumb"><ol>' +
      '<li><a href="index.html">Home</a></li><li><a href="' + cat.page + '">' + esc(cat.name) + '</a></li><li><a href="article.html?id=' + story.id + '" aria-current="page">Story</a></li></ol></nav>' +
      '<article data-section="article" data-component="article-body"><header class="entry-header">' +
      '<p class="kicker"><a href="' + cat.page + '">' + esc(cat.name) + '</a></p><h1>' + esc(story.title) + '</h1>' +
      '<p class="entry-dek">' + esc(story.dek) + '</p>' +
      '<div class="entry-author" data-section="author-info" data-component="author-card"><img src="assets/avatar.svg" alt="" width="48" height="48">' +
      '<p>By <a href="author.html">The Stitch &amp; Strut Staff</a><br><time datetime="' + story.date + '">' + fmtDate(story.date) + '</time></p></div>' +
      '<div class="share" data-section="share" data-component="share-buttons"><h2 class="share__title">Share this story</h2>' +
      '<button type="button" class="btn btn--small" id="copy-link">Copy link</button> ' +
      '<button type="button" class="btn btn--small" data-demo="Share on Chirp">Share on Chirp (demo)</button> ' +
      '<button type="button" class="btn btn--small" data-demo="Share on Pinboard">Share on Pinboard (demo)</button> ' +
      '<p role="status" id="share-status" class="share__status"></p></div></header>' +
      slideshowHtml(story) +
      '<div class="entry-content">' + story.b.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '<aside class="widget" data-section="designer-resource" data-component="promo-widget" aria-labelledby="resource-title">' +
      '<h2 id="resource-title">Designer resource</h2><p>Browse our running list of independent studios in the <a href="designers.html">Black Designers</a> archive.</p></aside>' +
      '<aside class="widget" data-section="shop-promo" data-component="promo-widget" aria-labelledby="shop-title">' +
      '<h2 id="shop-title">Shop the story (demo)</h2><p>The original site links to an external shop. Here the button is a labeled demo only.</p>' +
      '<button type="button" class="btn" data-demo="Shop the story">Shop the look</button></aside></div></article>' +
      '<section aria-labelledby="related-title" data-section="related-articles" data-component="card-list"><h2 id="related-title">Related stories</h2>' +
      '<div class="card-list">' + related.map(card).join('') + '</div></section>';
    initShare();
    initSlideshow(story);
  }

  function slideshowHtml(story) {
    var dots = [1, 2, 3, 4].map(function (n) {
      return '<li><button type="button" class="dot" data-slide="' + (n - 1) + '" aria-label="Go to slide ' + n + ' of 4">' + n + '</button></li>';
    }).join('');
    return '<section class="slideshow" aria-roledescription="carousel" aria-label="Photo slideshow" data-section="story-slideshow" data-component="slideshow">' +
      '<figure><img id="slide-img" src="" alt="" width="640" height="420"><figcaption id="slide-caption"></figcaption></figure>' +
      '<div class="slide-controls"><button type="button" class="btn btn--small" id="slide-prev">Previous slide</button>' +
      '<p id="slide-status" aria-live="polite"></p>' +
      '<button type="button" class="btn btn--small" id="slide-next">Next slide</button></div><ol class="dots">' + dots + '</ol></section>';
  }

  function initSlideshow(story) {
    var total = 4;
    var index = 0;
    var img = $('#slide-img');
    var dots = $$('.dot');
    function show(n) {
      index = (n + total) % total;
      img.src = 'assets/look-' + ((story.id + index) % 6 + 1) + '.svg';
      img.alt = 'Placeholder illustration for look ' + (index + 1) + ' of ' + total;
      $('#slide-caption').textContent = 'Look ' + (index + 1) + ': placeholder artwork standing in for a photograph.';
      $('#slide-status').textContent = 'Slide ' + (index + 1) + ' of ' + total;
      dots.forEach(function (d, i) {
        if (i === index) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); }
      });
    }
    $('#slide-prev').addEventListener('click', function () { show(index - 1); });
    $('#slide-next').addEventListener('click', function () { show(index + 1); });
    dots.forEach(function (d) { d.addEventListener('click', function () { show(Number(d.getAttribute('data-slide'))); }); });
    $('.slideshow').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { show(index - 1); } else if (e.key === 'ArrowRight') { show(index + 1); }
    });
    show(0);
  }

  function initShare() {
    var status = $('#share-status');
    $('#copy-link').addEventListener('click', function () {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(
          function () { status.textContent = 'Link copied to the clipboard.'; },
          function () { status.textContent = 'Could not copy automatically. The address is in your browser’s address bar.'; });
      } else {
        status.textContent = 'Copying is not available here. The address is in your browser’s address bar.';
      }
    });
  }

  /* ---------- Contact form (demo, nothing is sent) ---------- */
  function initContactForm() {
    var form = $('#contact-form');
    var summary = $('#error-summary');
    var fields = [
      { id: 'cf-name', label: 'Name', check: function (v) { return v.trim() ? '' : 'Enter your name.'; } },
      { id: 'cf-email', label: 'Email address', check: function (v) {
        if (!v.trim()) { return 'Enter your email address.'; }
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter an email address in the format name@example.com.';
      } },
      { id: 'cf-topic', label: 'Topic', check: function (v) { return v ? '' : 'Choose a topic.'; } },
      { id: 'cf-message', label: 'Message', check: function (v) {
        if (!v.trim()) { return 'Enter a message.'; }
        return v.trim().length >= 20 ? '' : 'Write at least 20 characters so we can help.';
      } }
    ];
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = [];
      fields.forEach(function (f) {
        var input = document.getElementById(f.id);
        var message = f.check(input.value);
        var holder = document.getElementById(f.id + '-error');
        holder.textContent = message;
        holder.hidden = !message;
        input.classList.toggle('is-invalid', Boolean(message));
        if (message) { input.setAttribute('aria-invalid', 'true'); errors.push({ f: f, message: message }); } else { input.removeAttribute('aria-invalid'); }
      });
      if (errors.length) {
        summary.innerHTML = '<h2 id="error-summary-title">There ' + (errors.length === 1 ? 'is 1 problem' : 'are ' + errors.length + ' problems') + ' with your message</h2><ul>' +
          errors.map(function (x) { return '<li><a href="#' + x.f.id + '">' + esc(x.f.label) + ': ' + esc(x.message) + '</a></li>'; }).join('') + '</ul>';
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;
      form.hidden = true;
      var done = $('#contact-success');
      done.hidden = false;
      $('h2', done).focus();
    });
    summary.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) { return; }
      e.preventDefault();
      document.getElementById(link.getAttribute('href').slice(1)).focus();
    });
    $('#contact-again').addEventListener('click', function () {
      form.reset();
      $$('.field-error', form).forEach(function (p) { p.hidden = true; });
      form.hidden = false;
      $('#contact-success').hidden = true;
      $('#cf-name').focus();
    });
  }

  initNav();
  initDemoDialog();
  var page = document.body.getAttribute('data-page');
  if (page === 'category') { initCategoryPage(); }
  else if (page === 'author') { initAuthorPage(); }
  else if (page === 'search') { initSearchPage(); }
  else if (page === 'article') { initArticlePage(); }
  else if (page === 'contact') { initContactForm(); }
})();
