Phase A research is done for all three slots. This was read-only: no files were written, and the temp dir I used was deleted.

All checks were `curl -sSL --max-time 25 -A "Mozilla/5.0"`, with the status and `<title>` recorded as I saw them. The system date was 2026-11-10; the shell's UTC clock read 2026-11-11, so `verified_at` uses 2026-11-10.

Candidates that blocked curl or failed, so I replaced or skipped them:
- **Fashionista:** 403.
- **Reformation, SSENSE and Aritzia:** Cloudflare "Just a moment…" page.
- **Mr Porter, J.Crew, Kate Spade and Madewell:** 403.
- **Man Repeller:** TLS error.

### FASH-01
- **source_id:** FASH-01
- **category/subcategory:** Content-driven (Fashion) / fashion magazine / editorial publisher
- **source_name:** Harper's BAZAAR (US edition, Hearst)
- **official_url:** https://www.harpersbazaar.com/
- **verified_at:** 2026-11-10; HTTP GET via curl; home returned 200 and `<title>` "Harper's BAZAAR - Your Source for Fashion Trends, Beauty Tips, Pop Culture News, and Celebrity Style". All 15 interior URLs below returned 200 with the titles shown. Both author pages returned 200.
- **source_pages** (all 200):
  1. https://www.harpersbazaar.com/ — "Harper's BAZAAR - Your Source for Fashion Trends, Beauty Tips, Pop Culture News, and Celebrity Style"
  2. /fashion/ — "Fashion 2026 - Runway Trends, Fashion Designers, and Style Tips"
  3. /fashion/trends/ — "Fashion Trends 2026 - Shopping Guides, Street Style and Fashion News"
  4. /fashion/fashion-week/ — "Fashion Week 2026 - Runway Shows, Trends and Street Style"
  5. /beauty/ — "Beauty Tips 2026 - Latest Hair, Makeup, and Beauty Advice"
  6. /celebrity/ — "Celebrity News 2026 - Celeb Red Carpet, Relationships, and Event Coverage"
  7. /cover-stories/ — "Exclusive Celebrity Photos and Interviews - Celebrity Cover Stories"
  8. /culture/ — "Culture Guide 2026 - Top New Movies, TV, Music and Books"
  9. /shopping/ — "Harper's BAZAAR Shopping"
  10. /wedding/ — "Wedding Ideas, Decor, and Dresses 2026 - Advice for Brides From BAZAAR Bridal"
  11. /fashion/a74389922/prada-in-the-nineties-best-of-miuccia-prada/ — "Three Prada Obsessives Unpack Miuccia's Defining Decade" (article)
  12. /author/431191/laia-garcia-4/ — "Laia Garcia-Furtado | Harper's BAZAAR" (author)
  13. /email/harpersbazaar-newsletter — "Harper's BAZAAR Newsletter: Sign Up for Free"
  14. /search/?q=dress — "Search"
  15. /sitemap/ — "Sitemap"
  - Optional extras: /culture/travel-dining/, /royal-news/.
- **key_regions** (observed in HTML):
  - **Header:** a "Skip to Content" link (`#main-content`) comes first. The top bar has an "Other Editions" locale list (US, UK, España, Italia, Nederland, Taiwan, Japan), Newsletter, Sign in, Subscribe, and a search form with `role="search"`.
  - **Nav:**
    - `<nav data-tracking-id="topNav">` holds Fashion, Beauty, Celebrity, Culture, Shopping and Bazaar Bride/Weddings, plus "More".
    - "More" holds Travel & Food and Politics.
    - Buttons labelled "Open Fashion/Beauty/Celebrity/Culture/Shopping submenu" exist, so there are dropdowns. Their item text did not appear in the static HTML I parsed, so I can't list it.
    - A sidebar dialog (`nav#sidepanel`, "Open Sidepanel Menu") repeats the same sections.
  - **Hero and body:** curated blocks carry `data-vars-block-*` attributes. Home sections include Fashion, Beauty, Celebrity News, Cover Stories, From the Magazine, Shopping, Film & TV, Trends, Runway Report, Royals and a Podcast. There is a "More Stories" region and a `nav aria-label="Pagination"`.
  - **Article:** h1, byline linking to `/author/<id>/<slug>/`, a JSON-LD script, and shopping/affiliate links.
  - **Footer:** `nav aria-label="Footer"` and `aria-label="Legal"`. It holds Newsletter, Media Kit, Press Room, Community Guidelines, Advertise Online, Customer Service, Subscribe, CA Notice at Collection, Your CA Privacy Rights/Shine the Light, DAA Industry Opt Out, Terms of Use, Site Map, and the "A Part of Hearst Digital Media" credit.
- **key_interactions:**
  - **Observed:** top-nav links, sidebar menu open/close buttons, per-section submenu buttons, search form (also works at `/search/?q=`), newsletter sign-up page, author links, pagination nav, locale selector ("Select location").
  - **Inferred:** submenu hover/click dropdown behavior and infinite scroll or "load more". I did not run any JavaScript.
- **complexity:** high. It is a dense, ad- and tracking-heavy page (about 856 KB of HTML on the home page), with many nested sections, a sidebar dialog and a mega-menu pattern.
- **stack_clues:**
  - Next.js: `_next/static` appears 67 times and `<title data-next-head>` is present, so it is server-rendered.
  - CSS-in-JS classes (`css-xxxx`).
  - A Hearst design system (`hds-do-not-use`).
- **limitations:**
  - Submenu item text is not in the static HTML.
  - Heavy ads and tracking, so replicate with placeholders only.
  - Article pages return many shopping links (label them as demos).
  - I did not check for a gallery or slideshow page. The one article I fetched had a single "gallery/carousel/slideshow" keyword hit, so I can't confirm one exists.

### FASH-02
- **source_id:** FASH-02
- **category/subcategory:** Content-driven (Fashion) / fashion brand editorial or lookbook site
- **source_name:** Tory Burch, with the "Tory Daily" editorial blog and runway pages
- **official_url:** https://www.toryburch.com/en-us/
- **verified_at:** 2026-11-10; HTTP GET via curl; home returned 200 and `<title>` "Women's Clothing, Dresses, Designer Shoes, Handbags, Accessories | Tory Burch". All 14 pages below returned 200 with the titles shown.
- **source_pages** (all 200):
  1. /en-us/ — "Women's Clothing, Dresses, Designer Shoes, Handbags, Accessories | Tory Burch"
  2. /en-us/blog/torys-blog.html — "Tory Daily : Fashion Trends, Style Tips, Inspiration & News"
  3. /en-us/blog/torys-blog-style-landing.html — "Style | Tory Daily"
  4. /en-us/blog/torys-blog-culture-landing.html — "Culture | Tory Daily"
  5. /en-us/blog/torys-blog-travel-landing.html — "Travel | Tory Daily"
  6. /en-us/blog/torys-blog-issues-landing.html — "Issues | Tory Daily"
  7. /en-us/blog/torys-blog-archive.html — "Archive | Tory Daily"
  8. /en-us/blog-post/blog-post.html?bpid=742601 — "Spring/Summer 2027: Runway Report | Tory Daily" (article)
  9. /en-us/blog-post/blog-post.html?bpid=742204 — "Spring/Summer 2026: The Campaign | Tory Daily" (campaign/lookbook-style post)
  10. /en-us/blog/torys-blog-search-results.html?q=dress — "Search Results | Tory Daily"
  11. /en-us/new/runway/ — "RUNWAY | Tory Burch"
  12. /en-us/new/runway/spring-summer-2027/ — "Tory Burch Spring/Summer 2027 Runway Live Stream | NY Fashion Week | Tory Burch"
  13. /en-us/about-us/ — "About Us | Tory Burch"
  14. /en-us/sitemap/ — "Site Map | Tory Burch"
  - Optional extras: /en-us/new/runway/runwayindex/ ("RunwayIndex | Tory Burch"), /en-us/our-impact/ ("Our Impact | Tory Burch").
- **key_regions** (observed):
  - **Header:** `<header class="main-header" role="banner">` with `<nav class="nav">` and a search form (`input type="search" name="q"`).
  - **Main nav and dropdowns:**
    - The main nav has Gifts, Handbags, Shoes, Ready-To-Wear, Home, Accessories, Sport and Sale. The Accessories, Sport and Sale items came from the link scan, not from a read of the full nav.
    - Dropdowns use `subnav-title` headings: Categories, Collections, Shops, By Occasion, Gifts By Price, Holiday and Featured.
    - The nav also links to Tory Daily and Runway.
  - **Tory Daily sub-nav:** Issues, Style, Beauty, Culture, Travel, Entertaining, Music, Sport, Archive.
  - **Body:**
    - A card grid of posts linking to `blog-post.html?bpid=…`, each with a "Read More" link.
    - Post titles include "Spring/Summer 2027: The Collection", "Introducing Resort 2027", "Fall/Winter 2026: The Campaign" and "Spring/Summer 2027: Runway Report".
    - Blog posts carry share/Pinterest/Instagram links, newsletter mentions, an author string, and a slideshow reference (the slideshow plugin CSS is loaded).
  - **Footer:** column headers Help, Shop, About Tory Burch and Follow Us.
    - Links: Find a Store, Contact Us, Careers, Instagram, Facebook, TikTok, Pinterest, YouTube.
    - Legal: Privacy & Usage, CA Privacy Policy, Terms of Use, Site Map.
- **key_interactions:**
  - **Observed:** mega-menu nav, a site search form and a separate blog search form (GET), category landing pages, an archive page, and social links.
  - **Inferred:** hover dropdowns, a slideshow/carousel (a slideshow CSS plugin is loaded and the keyword appears twice), and a newsletter signup (the word "newsletter" appears 6 times, but I did not locate a form).
- **complexity:** high. This is a commerce site with a large mega-menu and heavy pages (home about 908 KB), though the editorial section on its own is medium. Replicate only Tory Daily, runway and about pages, and keep shopping links as labeled demos.
- **stack_clues:** Salesforce Commerce Cloud (Demandware): 124 `on/demandware` references and `dwac`. The blog pulls assets from WordPress (`blog.toryburch.com/wp-content`, `xmlrpc.php`) and uses a divine-slideshows plugin.
- **limitations:**
  - I did not extract exact main-nav dropdown item text.
  - `/en-us/our-story/` and `/en-us/tory-daily/` returned 404. They are not valid URLs, so use the ones above.
  - Some pages are very large (handbags about 3.3 MB), so they aren't good replication targets.
  - Tory Burch's own product imagery must be replaced with placeholders.

### FASH-03
- **source_id:** FASH-03
- **category/subcategory:** Content-driven (Fashion) / fashion blog, trend and street-style content site
- **source_name:** Fashion Bomb Daily
- **official_url:** https://fashionbombdaily.com/. The `www.` host redirects here.
- **verified_at:** 2026-11-10; HTTP GET via curl; home returned 200 and `<title>` "Fashion Bomb Daily - Multicultural Fashion, Beauty & Style". All 14 pages below returned 200 with the titles shown.
- **source_pages** (all 200):
  1. https://fashionbombdaily.com/ — "Fashion Bomb Daily - Multicultural Fashion, Beauty & Style"
  2. /category/fashion/ — "Fashion Archives - Fashion Bomb Daily"
  3. /category/real-style/ — "Real Style Archives - Fashion Bomb Daily" (Street Style)
  4. /category/trend/ — "Trend Archives - Fashion Bomb Daily"
  5. /category/celebrity-style/ — "Celebrity Style Archives - Fashion Bomb Daily"
  6. /category/fashion-show/ — "Fashion Show Archives - Fashion Bomb Daily" (Runway)
  7. /category/black-designers/ — "Black Designers Archives - Fashion Bomb Daily"
  8. /category/what-to-wear/ — "What to Wear Archives - Fashion Bomb Daily"
  9. /category/beauty/ — "Beauty Archives - Fashion Bomb Daily"
  10. /2026/11/08/lacma-art-film-gala-best-dressed-jordyn-woods-gucci-rosie-huntington-whiteley-viola-davis-kim-kardashian-kylie-jenner-ashi-studio/ — "2026 LACMA Art + Film Gala Best Dressed: Jordyn Woods, Rosie Huntington-Whiteley, Viola Davis, and Kim Kardashian in Gucci and Kylie Jenner in Ashi Studio Couture - Fashion Bomb Daily" (article)
  11. /author/the-fashion-bomb-staff/ — "The Fashion Bomb Staff, Author at Fashion Bomb Daily"
  12. /?s=dress — "You searched for dress - Fashion Bomb Daily"
  13. /about/ — "About Fashion Bomb Daily - Fashion Bomb Daily"
  14. /contact/ — "Contact Us - Fashion Bomb Daily"
  - Optional extras: /press/ ("Press & Features - Fashion Bomb Daily"), /bombfashionshowla/ ("The Bomb Fashion Show LA - Fashion Bomb Daily").
- **key_regions** (observed):
  - **Header:** a "Skip to content" link (`#primary`), a custom logo, Shop and "Shop Instagram Feed" links, and a search form (`role="search"`, `name="s"`).
  - **Nav:**
    - Fashion, Accessories, What to Wear, Runway, Red Carpet Fashion, Black Designers, Street Style, Trend, Celebrity Style.
    - Celebrity-name categories: Beyonce, Cardi B, Jennifer Lopez, Kanye West, Kim Kardashian.
    - Lifestyle: Hair, Beauty, Lifestyle, Art, Events, Health, Fashion Bomb Kids, Home, Couples.
    - Others: Fashion Bomb Events, The Bomb Fashion Show LA, Cocktails/Conversations with Claire, Claire Cares, The Fabys.
    - The HTML has 12 `.sub-menu` elements, so there are dropdowns.
  - **Home body:** "THE LATEST" two-column featured list, "FASHION BOMB TV", "BLACK DESIGNERS", "POPULAR POSTS", and a "Stay Connected" social block.
  - **Article:** h1 `entry-header__title`, `entry-author` avatar and info, `entry-social-share` buttons, related articles (3 items), and a `theiaPostSlider` slides/preloaded-slide structure. The post body also has a "Black Designers Resource" widget and a FashionBombDailyShop.com promo.
  - **Footer:** `site-footer__menu` widgets. Links: Contact Us, About, Advertising, Press & Features, Privacy Policy, Terms Of Use.
- **key_interactions:**
  - **Observed:** category dropdown nav, search (GET `?s=`), share buttons with tooltips, related-articles list, author archive page.
  - **Inferred:** slideshow pagination within a post (theiaPostSlider classes present), and click-to-expand dropdowns.
- **complexity:** medium. It is a single-column WordPress blog (about 125–147 KB per page) with a large category menu and a repeatable article template.
- **stack_clues:** WordPress. 170 `wp-content` references and 4 `wp-json`. Theme "thescene" (body class `wp-theme-thescene`, Theia Post Slider plugin) and Jetpack. Google Publisher Tag (`googletag`, 6 occurrences) shows ad slots.
- **limitations:**
  - Heavy ads (googletag).
  - `/author/fashionbombdaily/` returned 404; the real author URL is `/author/the-fashion-bomb-staff/`.
  - Posts embed real celebrity and photo content, so replace all imagery with placeholders.
  - Shop links go to the external fashionbombdailyshop.com, so label them as demos.
  - Newsletter: I did not find a signup form on the home or article page.

I did not check whether any chosen site's `robots.txt` or terms restrict replication. I also did not render pages in a browser, so nothing marked inferred (dropdown behavior, slideshows) was confirmed by interaction.


Skipped: browser rendering, dropdown item text for Harper's BAZAAR, and any `robots.txt` or terms check. Risk: Tory Burch is a commerce site, so keep the replica to Tory Daily, runway and about pages only.
