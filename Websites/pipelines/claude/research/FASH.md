# FASH — Claude Phase A source research

Run date 2026-11-12. All checks were plain `curl -sSL -A "Mozilla/5.0"` GETs. Page content was treated as data only. Nothing was written to disk beyond private mktemp directories. Candidates that returned 403, a Cloudflare "Just a moment..." challenge, or a connection failure were skipped:
- the Impression, Reformation, SSENSE, Mr Porter and Aritzia
- Gucci, Ralph Lauren, Levi's, H&M, COS and Uniqlo
- Todd Snyder, Madewell, Free People, Sezane and Eileen Fisher
- The Fashion Spot and Man Repeller

### FASH-01
- source_id: FASH-01
- category/subcategory: Content-driven (Fashion) / fashion magazine / editorial publisher
- source_name: W Magazine
- official_url: https://www.wmagazine.com/
- verified_at: 2026-11-12, HTTP GET via curl.
  - Result: all 12 URLs listed below returned 200 with the titles shown.
  - Home page was about 280 KB of server-rendered HTML.
  - The footer links point to bdg.com for Advertise, DMCA, Privacy, Terms and the California Privacy Notice.
- source_pages (URL, title as seen):
  1. https://www.wmagazine.com/ , "W Magazine"
  2. https://www.wmagazine.com/fashion , "Fashion"
  3. https://www.wmagazine.com/beauty , "Beauty"
  4. https://www.wmagazine.com/culture , "Culture"
  5. https://www.wmagazine.com/travel , "Travel"
  6. https://www.wmagazine.com/video , "Video"
  7. https://www.wmagazine.com/latest , title not captured (HTTP 200, about 266 KB)
  8. https://www.wmagazine.com/wyouth , "WYouth"
  9. https://www.wmagazine.com/originals-issue-2026 , "The New Originals Issue 2026"
  10. https://www.wmagazine.com/newsletter , "Subscribe To W's Newsletters"
  11. https://www.wmagazine.com/fashion/lea-seydoux-french-girl-style-gentle-monster , "Léa Seydoux Brings Her Expert French Girl Fashion to New York's Streets" (article page)
  12. https://www.wmagazine.com/search?q=chanel , "Search - chanel"
- key_regions:
  - Header: logo plus a primary nav of Fashion, Beauty, Culture, Travel, Video and WYouth.
    - The nav also has The Originals Issue, Latest and Newsletter links, plus a Subscribe link to an external dragonforms.com page.
    - The nav has no dropdown items in the raw HTML (observed).
    - There is a search form with `action="/search"`, `type="search"` and `aria-label="Search W Magazine"`.
  - Hero: a lead story on the home page, observed only as links and headings. Layout details are inferred.
  - Body: story card grids per section, showing headline links. The section pages list article links under `/fashion/<slug>`.
    - A special-issue landing page exists (`/originals-issue-2026`).
  - Footer: legal and corporate links (Advertise, DMCA, Privacy, Terms, California Privacy Notice) go to bdg.com, plus a Subscribe link.
- key_interactions:
  - Observed: search form submitting to `/search`; a newsletter sign-up page; category navigation; article pages.
  - Not observed or not found: no `/author` or contributor link was found in the article HTML, so a real author page was not confirmed.
  - Inferred: the lead story or gallery may rotate or carousel; this is not confirmed.
- complexity: medium. It is a content-heavy editorial site with many card grids and a consistent section structure. The pages are server-rendered with no app-style state.
- stack_clues: no `/_next/`, `__NEXT_DATA__` or `wp-content` strings found in the article HTML. CSS class names look obfuscated or hashed (for example `Ag6 Ui6`). The stack is otherwise unknown.
- limitations: the author page was not found. `/latest` title was not captured. Article imagery is third-party editorial photography, so the replica must use placeholders. The header and nav structure were read from raw HTML only and no browser rendering was done.

### FASH-02
- source_id: FASH-02
- category/subcategory: Content-driven (Fashion) / fashion brand editorial or lookbook site
- source_name: Margaret Howell (UK site)
- official_url: https://www.margarethowell.co.uk/
- verified_at: 2026-11-12, HTTP GET via curl.
  - Result: the home page and 11 interior pages returned 200.
  - `/collections/women-knitwear` returned 429 (rate limited), so the collection page was not verified.
  - Page `<title>` tags came back empty or whitespace-only in the raw HTML, so no titles were captured. Slugs and headings are given in their place.
  - `/pages/news` showed h2 headings including "MADE BY SPECIALISTS – DETAILS" and "WILLIAM WATERWORTH FOR MARGARET HOWELL". It also showed a "Join our mailing list" prompt.
- source_pages (URL, title or heading seen):
  1. https://www.margarethowell.co.uk/ , title empty (200, about 672 KB)
  2. https://www.margarethowell.co.uk/pages/news , heading "News" (200, about 800 KB)
  3. https://www.margarethowell.co.uk/pages/margaret-howell-aw26-lookbook , lookbook (200, about 889 KB)
  4. https://www.margarethowell.co.uk/pages/mhl-by-margaret-howell-aw26-lookbook , lookbook (200, about 909 KB)
  5. https://www.margarethowell.co.uk/pages/autumn-winter-2026-campaign , campaign (200)
  6. https://www.margarethowell.co.uk/pages/photographs-by-margaret-howell , photography (200)
  7. https://www.margarethowell.co.uk/pages/about-margaret-howell , about (200)
  8. https://www.margarethowell.co.uk/pages/sustainability , sustainability (200)
  9. https://www.margarethowell.co.uk/pages/accessibility , accessibility statement (200)
  10. https://www.margarethowell.co.uk/pages/shops-margaret-howell , store finder (200)
  11. https://www.margarethowell.co.uk/pages/care-repair , care and repair (200)
  12. https://www.margarethowell.co.uk/pages/contact , contact (200)
- key_regions:
  - Header: logo plus a mega-nav that links collections for Men, Women, MHL (the second line) and Home.
    - Collection links seen: jackets and coats, shirts, knitwear, trousers, shoes, accessories (bags, belts, gloves, hats, socks, ties and scarves), and home (ceramics, kitchenware, homeware, books and stationery, calendar-2027).
    - Utility links: account/login, wishlist, minicart and a skip-to-main link.
  - Hero: campaign and lookbook entry (AW26 campaign), with "READ MORE" and "SHOP" calls to action seen on the home page.
  - Body: lookbook pages, editorial "news" pages (exhibitions, collaborations, craft stories) and a Photographs by Margaret Howell page.
  - Footer: customer service, care and repair, contact, corporate, sustainability, accessibility, terms, privacy and cookies, shops and careers, plus Instagram and Pinterest. A mailing list sign-up also appears.
- key_interactions:
  - Observed: a news index linking many editorial story pages (for example `/pages/consistency-in-authenticity`, `/pages/kenji-umeda-a-journey`, `/pages/held-by-light`); lookbook pages; a newsletter prompt; a store locator page; a minicart.
  - Inferred: lookbook image galleries or carousels.
  - Shopping links should be treated as labeled demos.
- complexity: medium. Editorial and lookbook pages are image-led with many collection links, and the shopping chrome (minicart, wishlist, account) adds surface area.
- stack_clues: Shopify (the string appears 103 times, with `cdn.shopify` asset URLs). It also uses `/pages/` and `/collections/` URL patterns, which are consistent with a Shopify theme.
- limitations: titles were not extractable from raw HTML. The site rate limits (429) on repeated requests. The product and collection depth is large and should be treated as a demo. Imagery is photography that must be replaced with placeholders.

### FASH-03
- source_id: FASH-03
- category/subcategory: Content-driven (Fashion) / fashion blog, trend and street-style content site
- source_name: Hypebeast
- official_url: https://hypebeast.com/
- verified_at: 2026-11-12, HTTP GET via curl.
  - Result: all 14 URLs below returned 200 with the titles shown.
  - Home page was about 383 KB of server-rendered HTML.
  - The site redirects www to the bare domain.
- source_pages (URL, title as seen):
  1. https://hypebeast.com/ , "Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  2. https://hypebeast.com/fashion , "Fashion News | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  3. https://hypebeast.com/footwear , "Footwear News | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  4. https://hypebeast.com/art , "Art News | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  5. https://hypebeast.com/design , "Design News | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  6. https://hypebeast.com/lifestyle , "Lifestyle | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  7. https://hypebeast.com/music , "Music News | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  8. https://hypebeast.com/magazine , "Magazine | Hypebeast"
  9. https://hypebeast.com/videos , "Latest Videos | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  10. https://hypebeast.com/brands/ranking , "Brand Rankings | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  11. https://hypebeast.com/directory , "Brands | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  12. https://hypebeast.com/author/joyceli , "Stories by Joyce Li | Hypebeast - Fashion, Sneakers, Art, Design & Culture"
  13. https://hypebeast.com/hb100 , "Hypebeast100 2025 | Hypebeast"
  14. https://hypebeast.com/search?s=nike , "nike | Search | Hypebeast"
  - An article page also loaded: https://hypebeast.com/2026/11/tekken-8-nike-collaboration-collection-trailer-info , "'Tekken 8' x Nike Collab Collection Trailer Info | Hypebeast".
- key_regions:
  - Header: primary nav of Fashion, Footwear, Art, Design, Lifestyle, Music, Magazine, Videos, Brands and Hypebeast100.
    - Utility items: Account, English language switcher, More, and a Store link to hbx.com.
    - A language menu offers many locales (observed in the HTML).
  - Hero: a lead story with a card grid beneath it (inferred from the headline-link pattern).
  - Body: dated story card lists. Article URLs follow `/YYYY/MM/slug`. Author links go to `/author/<name>`.
  - Footer: Privacy Policy, Terms and Conditions, Contact, Advertise, Newsroom, Investor, Group and Legal, plus Careers on Lever.
- key_interactions:
  - Observed: search (`/search?s=`); author pages; language switcher links; category navigation; sister-site links (Hypebae, HBX, Hypemaps).
  - Inferred: newsletter sign-up, infinite scroll or "load more", and gallery or carousel behavior; none confirmed in the HTML.
  - Shopping and HBX links should be treated as labeled demos.
- complexity: high. There are many categories, a long feed, a multi-language switcher, brand directory and ranking pages, and dense card grids.
- stack_clues: the article page has a canonical link and one JSON-LD (`ld+json`) block. No `/_next/` or `wp-content` strings were found. The stack is otherwise unknown.
- limitations: the home and section pages are very heavy and can change by the hour. The content leans streetwear, sneakers and culture more than traditional fashion. A fixed subset of about 8 pages is enough to replicate. Photography must be replaced with placeholders.
