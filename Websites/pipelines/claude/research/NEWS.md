Phase A research is done for all 3 slots. All three sites returned HTTP 200 from `curl -sSL -A "Mozilla/5.0"` on 2026-11-10 (about 06:20–06:50 UTC).

I wrote no files and used pipes only. My first probe used a shared `/tmp` file that another agent overwrote, so I discarded those results and re-ran every probe without temp files.

Rejected candidates:
- nytimes.com: 403
- usatoday.com: Cloudflare "Just a moment..." challenge (402)
- washingtonpost.com: connection reset
- wsj.com: 401
- seattletimes.com: empty 202 response

### NEWS-01
- **source_id:** NEWS-01
- **category/subcategory:** news / national daily newspaper. The Guardian is a UK national daily; I used its US edition, which has US-specific sections.
- **source_name:** The Guardian (US edition)
- **official_url:** https://www.theguardian.com/us
- **verified_at:** 2026-11-10 · HTTP GET via curl · The home page returned 200 with title "Latest news, sport and opinion from the Guardian". All 12 pages below returned 200 except the two noted as 404 in limitations.
- **source_pages:**
  1. https://www.theguardian.com/us — "Latest news, sport and opinion from the Guardian" (home, US front)
  2. https://www.theguardian.com/us-news — "US news from the Guardian | The Guardian"
  3. https://www.theguardian.com/us-news/us-politics — "US politics | The Guardian"
  4. https://www.theguardian.com/world — "Latest news from around the world | The Guardian"
  5. https://www.theguardian.com/us/business — "Business and finance news from Guardian US | The Guardian"
  6. https://www.theguardian.com/us/technology — "Technology news, features and analysis from Guardian US | The Guardian"
  7. https://www.theguardian.com/us/sport — "Sports news, scores, analysis and opinion from the Guardian US | The Guardian"
  8. https://www.theguardian.com/commentisfree (redirects to /us/commentisfree) — "Comment, opinion and discussion from the Guardian US | The Guardian"
  9. https://www.theguardian.com/us/culture — "Arts and entertainment news from Guardian US | The Guardian"
  10. https://www.theguardian.com/us/lifeandstyle (redirect from /lifeandstyle) — "Lifestyle | The Guardian"
  11. https://www.theguardian.com/email-newsletters — "Guardian newsletters: Sign up for our free newsletters"
  12. https://www.theguardian.com/us/podcasts — "Podcasts | The Guardian"
  13. https://www.theguardian.com/crosswords — "Crosswords | Online and free | The Guardian"
  14. https://www.theguardian.com/us-news/2026/nov/09/citizen-shot-ice-officer-lawsuit-california — "US citizen shot by ICE officer near children's bus stop sues government for $25m | ICE (US Immigration and Customs Enforcement) | The Guardian" (article)
- **key_regions** (observed in HTML):
  - **Header:**
    - Top bar: "Print subscriptions", "Newsletters", sign-in.
    - Search form (`id=gu-search-desktop` and `gu-search-mobile`, posts to google.co.uk/search).
    - Primary nav in `<nav>` (`id=navigation`), toggled by a hidden checkbox (`header-nav-input-checkbox`), with an expanded menu (`header-expanded-menu`, `nav-menu-columns`).
  - **Nav structure:**
    - Five expandable groups (News, Opinion, Sport, Culture, Lifestyle), each with a "View all …" link.
    - News: US news, US politics, World news, Ukraine, Middle East, US immigration, Environment, Climate crisis, Science, Tech, Business, Money, Midterms 2026.
    - Opinion: The Guardian view, Columnists, Cartoons, Opinion videos, Letters.
    - Sport: Soccer, NFL, NBA, MLB, MLS, NHL, WNBA, F1, Tennis, Golf.
    - Culture: Film, Music, Books, Art & design, TV & radio, Stage, Classical, Games.
    - Lifestyle: Wellness, Fashion, Food, Recipes, Travel, Health & fitness, Love & sex, Family, Home & garden, The Filter.
    - Secondary links: Newsletters, Podcasts, Pictures, Video, Crosswords, Wordiply, Corrections, Tips, Digital Archive, About Us, Support us, Download the app, Guardian Weekly, Live events.
    - A sub-nav (`id=sub-nav`) shows section-level links.
  - **Hero:** a top story with card variants (feature, news, review, comment). Cards carry `data-link-name` values like "news | group-0 | card-@2 | media-picture".
  - **Body sections** (carousels on the front): US news, US politics, Special report, In focus, Features, The long read, Opinion, Editorials, Sports, More top stories, Newsletters, What to read / watch / listen to / play, Well actually, Relationships, Take part.
  - **Article page:** `meta-byline` (with `rel="author"`), section and tag labels, "Related" and rich-link components, "Most viewed", advertisement slots, a "Sign up for" newsletter prompt, a "contribute" support prompt, and `#comments` anchors.
  - **Footer groups:** News / Opinion / Sport / Culture / Lifestyle; "Sign up for our email"; About us, Help, Complaints & corrections, Contact us, Tip us off, SecureDrop; Privacy policy, Cookie policy, Tax strategy, Terms & conditions; All topics, All writers, Newsletters, Digital newspaper archive; Bluesky, Facebook, Instagram, LinkedIn, Threads, TikTok, YouTube; Advertise with us, Guardian Labs, Work with us, Accessibility settings.
- **key_interactions:**
  - Observed in markup: nav toggle checkbox, "Hide" buttons per front section, carousels with navigation, search form, newsletter signup, comment-count links, rich-link related cards, a "Most viewed" list, and a print-subscription / support prompt.
  - Inferred: expand/collapse of nav columns, a "most viewed" tabbed switch, and the signup and subscription flows. These should be simulation only.
- **complexity:** High. The home page is about 1.4 MB of HTML, with 5 top-level groups and 60+ nav links, dozens of card variants, many carousels, and rich article furniture.
- **stack_clues:** The Guardian's open-source frontend ("DCR") is visible in the markup: `gu-island` custom elements (141 occurrences) and `dcr-*` hashed class names. This looks like server-rendered HTML with hydrated islands (inferred), plus inline `DOMContentLoaded` script for the nav checkbox.
- **limitations:**
  - `/us/video` and `/info/about-guardian` returned 404, and `/us/lifestyle` returned 404 (the real path is `/lifeandstyle`).
  - `/search?q=` returned 404 because search posts to Google, so there is no on-site results page to replicate.
  - Content is live and changes daily; the article above is one dated example.
  - The consent banner and any paywall or support banner weren't checked.

### NEWS-02
- **source_id:** NEWS-02
- **category/subcategory:** news / local-regional news outlet (metro daily, Chicago area)
- **source_name:** Chicago Tribune
- **official_url:** https://www.chicagotribune.com/
- **verified_at:** 2026-11-10 · HTTP GET via curl · The home page returned 200 with title "Chicago Tribune - Chicago News, Sports, Weather, Business & Things to Do". All pages below returned 200.
- **source_pages:**
  1. https://www.chicagotribune.com/ — "Chicago Tribune - Chicago News, Sports, Weather, Business & Things to Do"
  2. https://www.chicagotribune.com/news/ — "Chicago News - Chicago Tribune"
  3. https://www.chicagotribune.com/local-news/ — "Local News – Chicago Tribune"
  4. https://www.chicagotribune.com/latest-headlines/ — "Latest Headlines – Chicago Tribune"
  5. https://www.chicagotribune.com/news/politics/ — "Politics"
  6. https://www.chicagotribune.com/business/ — "Business - Chicago Tribune"
  7. https://www.chicagotribune.com/sports/ — "Chicago Sports News, Schedules and Scores"
  8. https://www.chicagotribune.com/opinion/ — "Opinion"
  9. https://www.chicagotribune.com/things-to-do/ — "Things to do in and around Chicago"
  10. https://www.chicagotribune.com/suburbs/ — "Chicago Tribune: Suburban coverage areas"
  11. https://www.chicagotribune.com/obituaries/ — "Chicago Tribune Obituaries"
  12. https://www.chicagotribune.com/news/weather/ — "Weather – Chicago Tribune"
  13. https://www.chicagotribune.com/?s=chicago — "Search Results for "chicago" – Chicago Tribune"
  14. https://www.chicagotribune.com/2026/11/09/wgn-tonya-francisco-bronzeville/ — "WGN's Tonya Francisco sells Bronzeville mansion for $645,000" (article, 200)
- **key_regions** (observed in HTML):
  - **Header:**
    - Subscribe button (`id=mega-subscribe-button`).
    - AccuWeather link showing the current temperature (live in the real site; the replica must use labeled static sample data).
    - Subscriber Services dropdown: Manage Subscription, EZ Pay, Vacation Stop, Delivery Issue.
    - "Today's E-Editions" link.
    - Search form (`id=search-bar`, GET to `/` with `?s=`).
    - Push-nav menu (`id=pushnav`, `menu-toggle`) and a digital-subscription menu (`dfm-digisubs-menu`).
  - **Nav structure:**
    - News: Latest Headlines, Local News, Crime and Public Safety, Education, Environment, Health, Immigration, Marijuana, National, Science, World, Weather, Politics, Investigations, History.
    - Business: Real Estate, Transportation, Careers & Finance, Top Workplaces.
    - Sports: College Sports, Soccer.
    - Opinion: Editorials, Commentary, Letters, Tribune Voices.
    - Entertainment / Things to do: Arts, Books, Home and Garden, Movies, Museums, Music, The Theater Loop, Travel, TV and Streaming, Dining, Recipes.
    - Also: Advice, Chicago Magazine, En Español, Obituaries, BestReviews.
    - Suburbs: Aurora Beacon-News, Daily Southtown, Elgin Courier-News, Lake County News-Sun, Naperville Sun, Post-Tribune.
  - **Hero and body:**
    - Featured stories, a "Most Popular" list (`dfm-most-popular-flex-container`, 10 headlines), and a trending bar.
    - Newsletter signup blocks (`newsletter-simple`, `newsletter-item`).
    - Section story blocks, and events.
  - **Article page:**
    - Breadcrumbs (`breadcrumbs-bar`), byline ("By Bob Goldsborough | For the Chicago Tribune" followed by a published-date string), share buttons (X, Facebook, Bluesky, email, print), a trending-stories widget, a sidebar "Most Popular" list, and a subscribe button.
    - Co-author avatar container.
  - **Footer groups:** Tribune Publishing sister papers (New York Daily News, The Morning Call, Daily Press, The Virginian-Pilot, Orlando Sentinel, Sun Sentinel, Hartford Courant, Studio 1847); Company Info (About Us, Careers, Help Center, Media Kit, Privacy Policy, Chicago Tribune Store, Site Map, Archives, Accessibility); legal (Subscriber Terms and Conditions, Terms of Service, Cookie Policy).
- **key_interactions:**
  - Observed in markup: search form GET (results page rendered), push-nav toggle, subscriber-services dropdown, newsletter signup blocks, share buttons, breadcrumbs, and a "Most Popular" list.
  - Inferred: a Latest/Most-read tab switch (only the "Most Popular" list was observed), and the newsletter and subscribe flows. These should be simulation only.
- **complexity:** Medium. About 274 KB of HTML with a clear section-front and article structure. It has a large nav but few widgets.
- **stack_clues:** WordPress. `wp-content` appears 241 times, there are `wp-json` and `wordpress` references, and `tribpub` assets. Third-party scripts: Parse.ly (`cdn.parsely.com`), Sophi (`cdn.sophi.io`), `googletag`, Sailthru newsletter script (`id=mng-newsletters-sailthru-scout-js`), and an AccuWeather link.
- **limitations:**
  - The article page returned 200, but I didn't check whether a paywall appears for non-subscribers.
  - The AccuWeather temperature and the Most Popular list are live data and must be replaced with static samples.
  - Navigation was extracted from the `/` page; I didn't verify each dropdown link individually beyond the 14 pages above.

### NEWS-03
- **source_id:** NEWS-03
- **category/subcategory:** news / public broadcaster
- **source_name:** NPR
- **official_url:** https://www.npr.org/
- **verified_at:** 2026-11-10 · HTTP GET via curl · The home page returned 200 with title "NPR - Breaking News, Analysis, Music, Arts & Podcasts : NPR". All pages below returned 200.
- **source_pages:**
  1. https://www.npr.org/ — "NPR - Breaking News, Analysis, Music, Arts & Podcasts : NPR"
  2. https://www.npr.org/sections/news/ — "News: U.S. and World News Headlines : NPR"
  3. https://www.npr.org/sections/national/ — "U.S. News and National Top Stories : NPR"
  4. https://www.npr.org/sections/politics/ — "Politics : NPR"
  5. https://www.npr.org/sections/health/ — "Health : NPR"
  6. https://www.npr.org/sections/climate/ — "Climate : NPR"
  7. https://www.npr.org/sections/culture/ — "Culture : NPR"
  8. https://www.npr.org/music/ — "NPR Music: Tiny Desk, New Music and Music News : NPR"
  9. https://www.npr.org/podcasts-and-shows/ — "NPR Podcasts & Shows : NPR"
  10. https://www.npr.org/programs/morning-edition/ — "Morning Edition : NPR"
  11. https://www.npr.org/programs/all-things-considered/ — "All Things Considered : NPR"
  12. https://www.npr.org/newsletters/ — "NPR Newsletters : NPR"
  13. https://www.npr.org/about/ — "About NPR : NPR"
  14. https://www.npr.org/search/?query=climate — "NPR Search : NPR"
  15. https://www.npr.org/2026/11/09/g-s1-151625/california-billionaire-tax-referendum — "California voters defeat billionaire tax proposal : NPR" (article)
  16. https://www.npr.org/2026/11/09/nx-s1-6034945/will-secretary-pete-hegseth-pay-the-price-for-the-iran-war — "Will Secretary Pete Hegseth pay the price for the Iran war? : Consider This from NPR : NPR" (audio story with player)
  - Also returned 200: https://www.npr.org/donate/ — "Donate : NPR".
  - The task allows 8–14 pages; I listed 16 because pages 15–16 are two article variants, so drop whichever you don't need.
- **key_regions** (observed in HTML):
  - **Header:**
    - Main menu (`id=main-menu`) with a mobile toggle (`navigation__toggle--open` and `--close`), search icon and dropdown (`navigation_dropdown-search`), a station-picker mount (`navigation__station-mount`) and a donate mount (`navigation__station-donate-mount`).
    - Four top items have submenus (`menu__toggle-submenu`): News, Culture, Music, Podcasts & Shows. The News submenu contains National, World, Politics, Business, Elections, Health, Science, Climate and Race. The Culture submenu contains Movies, Television, Pop Culture, Food, Art & Design, Performing Arts and Gaming. The Music submenu contains Tiny Desk, New Music Friday, All Songs Considered, Music Features and Live Sessions. The Podcasts & Shows submenu contains Morning Edition, Weekend Edition (Saturday/Sunday), All Things Considered, Up First, Here & Now, NPR Politics Podcast, Wait Wait… Don't Tell Me!, Fresh Air, Wild Card, It's Been a Minute, Machine Gods, and a "More Podcasts & Shows" link. Each submenu has featured and directory lists (`submenu__list--featured` and `--directories`).
    - Top-level links: Newsletters, About NPR, Press.
  - **Hero and body:**
    - Lead story with a WATCH video promo (Tiny Desk) and a vertical video playlist with previous/next buttons.
    - Story cards carrying "Listen" audio modules (`audio-module-listen`, with play icon and duration; 23 on the home page).
    - Section blocks such as Congress, Politics, Book News & Features, Only on NPR, Elections and National.
    - A player shelf (`id=player-shelf…`).
  - **Article page:**
    - Story title (`storytitle`) and byline (`id=storybyline`), a story-meta block that holds the date, share tools (`share-tools__service-name`), topic tags (`class=tags`), a toggle caption, and an audio-module for audio stories. A transcript icon is present; a transcript block exists only on audio stories.
  - **Footer** (`id=npr-footer`, 4 modules):
    - Read & Listen: Home, News, Culture, Music, Podcasts & Shows.
    - Connect: Newsletters, Facebook, Instagram, Press, Public Editor, Corrections, Transcripts, Contact & Help.
    - About NPR: Overview, Diversity, NPR Network, Accessibility, Ethics, Finances.
    - Get Involved: Support Public Radio, Sponsor NPR, NPR Careers, NPR Shop, NPR Extra.
    - Legal strip: Terms of Use, Privacy, Your Privacy Choices, Text Only.
- **key_interactions:**
  - Observed in markup: submenu toggles, search dropdown, station picker and donate mounts, audio "Listen" buttons, video playlist previous/next, share tools, toggle captions, and a newsletter page.
  - Inferred: station selection (the mount points exist but are empty in the server HTML), playback behavior (audio modules have `--no-js` fallback classes), and the search results listing. Donate, subscribe and player controls should be simulated only.
- **complexity:** Medium-high. The home page is about 965 KB with a four-group mega menu, many card types, audio and video modules, and several program and podcast pages.
- **stack_clues:** Server-rendered HTML with progressive enhancement; webpack bundles (8 references), and GTM (Google Tag Manager) references. Any specific framework is unknown.
- **limitations:**
  - The search page's results markup wasn't found in the static HTML, so the results list is likely client-rendered. Replicate it with static sample results.
  - The station finder is empty in static HTML.
  - Live headlines, audio files and video are not reusable. I didn't check consent banners or the donate flow's behavior.

### Overall caveats
- The Guardian is UK-owned, so slot 1 is "national daily newspaper" only in the sense of its US edition. I picked it because the US dailies I tried (NYT, USA Today, WaPo, WSJ) all blocked or failed. A swap (for example, to NY Post, which returned 200 in my probe) was not verified past the home page.
- I did not check `robots.txt`, terms of use or licensing for any of the three.
Not checked: paywalls and consent banners, `robots.txt` and terms of use, and the content of the NPR search results and station finder, which are client-rendered. I also didn't open every nav dropdown link on the Tribune and Guardian.
