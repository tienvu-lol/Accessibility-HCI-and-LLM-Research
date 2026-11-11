Three sources are verified and reachable, one per stratum. The checks were plain `curl -sSL -A "Mozilla/5.0"` GETs against the pages listed, run on 2026-11-10.

Candidates that failed and were replaced or skipped:
- cathedral.org, saintpatrickscathedral.org and gracecathedral.org returned a 403 "Just a moment..." challenge.
- stpatrickscathedral.org returned a 401.
- Several other guesses had no DNS record.

I did not try to bypass the challenge pages.

### CHUR-01
- **source_id:** CHUR-01
- **category/subcategory:** church / large multi-site church
- **source_name:** Saddleback Church
- **official_url:** https://saddleback.com/ (the `www.` form redirects here)
- **verified_at:** 2026-11-10; HTTP GET via curl; the home page returned 200, title "Saddleback Church", about 144 KB of HTML. All 14 pages below returned 200.
- **source_pages (URL, title):**
  1. https://saddleback.com/ "Saddleback Church"
  2. /locations/ "Locations | Saddleback Church"
  3. /watch/ "Watch Saddleback Online"
  4. /about/ "About Us"
  5. /care/ "Saddleback Cares"
  6. /giving/ "Giving | Saddleback Church"
  7. /events "Events | Saddleback Church"
  8. /sections/get-involved/adults/small-groups/ "Small Groups | Saddleback Church"
  9. /sections/get-involved/adults/serve "Serve | Saddleback Church"
  10. /sections/get-care/prayer/ "Prayer | Saddleback Church"
  11. /sections/get-care/celebrate-recovery/ "Celebrate Recovery | Saddleback Church"
  12. /sections/pursue-growth/podcasts/ "Podcasts | Saddleback Church". The nav link `/sections/resources/podcasts/` redirected here.
  13. /sections/more/contact-us/ "Contact Us | Saddleback Church"
  14. /sections/more/careers/ "Careers | Saddleback Church"
- **key_regions (observed in the HTML):**
  - **Header:** logo, a top nav of Locations, Watch, About, Care and Giving, a "My Dashboard" link, a "Sign In" button (an Umbraco members sign-in form), a watch-now link, and a language dropdown.
  - **Language options:** English, Español, Filipino, 简体中文 and 繁體中文.
  - **Nav menu:** a large get-involved/care/growth/more menu. Its groups are:
    - Get involved: Activate, Small Groups, Serve, Events, Kids, Students, Parents, Stronger Homes.
    - Care: Prayer, Celebrate Recovery, Counseling, Support Groups.
    - Growth: Resources, Message Resources, Podcasts, Apps.
    - More: Stories, Internships, Careers, Contact Us.
  - **Hero:** a "First Things First" or first-step block. Some template placeholders appear unrendered (`{{item.header}}`).
  - **Body sections:** "Locations", "Your First Step Starts Here", "The Saddleback App" and "Stay Connected".
  - **Footer:** social links (Instagram, Facebook, YouTube, Spotify), a locations link, Privacy Policy and Terms of Use.
- **key_interactions:**
  - **Observed:**
    - The events page has a search input (`input[type=search]#eventsSearchInput`), a Filters panel with a Campus `<select>`, and hidden calendar date inputs.
    - The giving page has a campus `<select>` (Vue `v-model`) and per-campus giving popups.
    - The prayer page has a custom dropdown `#customPrayerDropdown` and a "Prayer Requests" section.
    - The language dropdown and the sign-in form are present.
    - A small-groups page exists.
  - **Inferred:** a small-group finder, a campus picker, a sermon/media archive under Watch, and a prayer-request form. I did not inspect the interiors of Watch or the prayer-request form.
- **complexity:** high. It has a large mega-nav, multilingual routes, campus-driven pages, an events search with filters, giving with campus selection, and a sign-in dashboard.
- **stack_clues:**
  - Umbraco (`UmbracoMembers.OpenIdConnect`, `ufprt` and `__RequestVerificationToken` hidden inputs).
  - jQuery 3.6, jQuery UI, magnific-popup, and Vue (`v-model`).
  - "Divi" and "ChurchTrac" strings show up in the HTML, and I don't know why.
  - The nav is server-rendered, with a few client-side templated bits.
- **limitations:** The giving flow, sign-in and dashboard are behind third-party or authenticated systems. Some home-page content is client-templated. I did not check the Watch archive's search.

### CHUR-02
- **source_id:** CHUR-02
- **category/subcategory:** church / historic cathedral
- **source_name:** Cathedral of Saint John the Divine (New York)
- **official_url:** https://www.stjohndivine.org/
- **verified_at:** 2026-11-10; HTTP GET via curl; the home page returned 200, title "Home - Cathedral of Saint John the Divine", about 40 KB. All 16 URL checks returned 200; `/visit` and `/visit/main-page-link/` resolved to the same page, so I list 15 distinct pages.
- **source_pages (all titles end with " - Cathedral of Saint John the Divine"):**
  1. / "Home"
  2. /about "About"
  3. /about/leadership "Leadership"
  4. /visit "Plan Your Visit"
  5. /visit/public-guided-tours "Public Guided Tours"
  6. /spiritual-life/services "Services"
  7. /spiritual-life/dean-clergy "Dean & Clergy"
  8. /music "Music"
  9. /music/choral-ensembles "Choral Ensembles"
  10. /art-ideas "Art & Ideas"
  11. /calendar/ "Calendar"
  12. /watch-listen "Watch & Listen"
  13. /support/donate "Donate Now"
  14. /education-outreach/volunteer "Volunteer"
  15. /search/ "Search"

  Choose 8–14 of these when replicating.
- **key_regions (observed):**
  - **Header:** logo, a utility bar with Support Us, Donate, Shop, Search, Calendar and Watch, and a primary nav with these dropdown groups:
    - About: About the Cathedral, Leadership, Space Rentals, Funerals, Blog, Press Releases.
    - Visit: Plan Your Visit, Timed Tickets, Public Guided Tours, School and Youth Programs, Adult Programs, Virtual Visits, Explore, Covid 19 Policies, Digital Guide.
    - Spiritual Life: Worship, Columbarium, Dean & Clergy, Bishop & Diocese, Services, Pastoral Services, Congregation of St. Saviour, Community at the Crossing, Nightwatch.
    - Education & Outreach: eight items.
    - Art & Ideas: seven items.
    - Music: seven items.
    - Support: seven items.
  - **Hero and body:**
    - Today's date.
    - "Hours & Admission" and "Sunday Services" cards.
    - "Live at the Cathedral" with upcoming-event cards: Daily Eucharist, Choral Evensong, Holy Eucharist, tours.
    - "2026-2027 Events".
    - "Seeking more?" with Livestreams and Recordings, and Support the Cathedral.
  - **Footer:** "Stay in Touch" newsletter form (Mailchimp: first name, last name, email, submit) and "Share the Cathedral".
- **key_interactions:**
  - **Observed:**
    - A newsletter signup form that posts to Mailchimp.
    - A calendar page with per-event detail URLs such as `/calendar/58654/online-morning-prayer`.
    - A search page and a services page with "Sundays" and "Weekdays" schedules.
    - A donate page and a watch/listen page.
    - Wide dropdown menus.
  - **Inferred:** calendar filtering. The calendar page had no `<form>` or inputs in the static HTML, so any filters would be client-side. Also inferred: timed-ticket booking is external.
- **complexity:** medium to high. The nav is very large (about 60 links), but the pages are content-driven, server-rendered and have few forms.
- **stack_clues:** Divi (a WordPress theme, based on its HTML strings, but no WordPress generator tag was confirmed), jQuery 3.6.0, and a Mailchimp form action.
- **limitations:** I did not read the service times text itself, only the headings. Timed-ticket booking, the shop and donation processing are probably external systems and I did not check them.

### CHUR-03
- **source_id:** CHUR-03
- **category/subcategory:** church / small community congregation
- **source_name:** Holy Trinity Episcopal Church (Tiverton, RI)
- **official_url:** https://holytrinitychurch.org/
- **verified_at:** 2026-11-10; HTTP GET via curl; the home page returned 200, title "Holy Trinity Episcopal Church – Tiverton", about 98 KB. All 13 URLs returned 200.
- **source_pages (titles end with "– Holy Trinity Episcopal Church" except Home):**
  1. / "Holy Trinity Episcopal Church – Tiverton"
  2. /who-we-are/ "Who We Are"
  3. /who-we-are/history/ "History"
  4. /who-we-are/vestry/ "Staff & Vestry"
  5. /who-we-are/search-process/ "Rector"
  6. /what-we-believe/ "What We Believe"
  7. /what-we-do/ "Outreach & Community"
  8. /who-we-are/special-services/ "Special Services"
  9. /who-we-are/education/ "Adult Formation" in the nav, with the page title "Education"
  10. /stewardship/giving/ "Giving"
  11. /announcements/ "Announcements"
  12. /thrift-shoppe/ "Trinity Trader Thrift Shoppe"
  13. /contact-us/ "Contact Us"
- **key_regions (observed):**
  - **Header:** email and phone contact bar (office@ address, 1-401-624-4759), a Facebook link, and a nav of:
    - Home
    - Who We Are (dropdown: History, Staff & Vestry, Rector, Special Services, Adult Formation)
    - What We Believe
    - What We Do
    - Giving (dropdown: Giving)
    - Announcements
    - Calendar (external, mychurchevents.com)
    - Ministry Scheduler (external)
    - Thrift Shop
    - Contact Us
  - **Hero:** "Welcome to Holy Trinity Church in Tiverton, RI!"
  - **Body:** "Faith in Action: Worship, Service, and Community for…", "Rooted in Tradition", "Open to All", and cards for Our Beliefs, Worship & Special Services, Our Mission and Serving & Giving.
  - **Footer:** a Southcoast Internet credit. I did not capture the other footer groups.
- **key_interactions:**
  - **Observed:**
    - A YouTube embed on the home page (4 matches).
    - A giving page with an "Invest in Holy Trinity's Future by Giving Online" heading and a "Frequently Asked Questions" section.
    - An announcements page with 9 `<h2>`s.
    - Links to an external calendar and an external ministry scheduler.
    - No forms or inputs on the home page or the announcements page.
  - **Inferred:** online giving goes through an external provider, and there is no sermon archive, since I saw none.
- **complexity:** low. It is a small brochure-style site with a shallow tree and no first-party forms, search or archive.
- **stack_clues:** WordPress (a generator meta tag reading "WordPress 7.1.4", which looks odd, so treat the version as unverified), Beaver Builder (`fl-` class names), jQuery with magnificpopup/fitvids, and `wp-content` URLs.
- **limitations:** It has no sermon archive, prayer form or ministry finder, so the category-typical features are thin. I did not check the service times text. The calendar and the ministry scheduler are external.

I also checked two other small candidates. firstcongregationalucc.org (Anamosa, IA) has only about 7 pages. stgregs.info (Columbus, OH) is a second option for CHUR-03, but I did not check its interior pages.

I skipped probing the Watch archive and sermon pages, the actual service-time text, and anything behind the external giving, calendar and ticketing providers. I also did not check robots.txt or terms of use for any of the three sites. Saddleback's home page has unrendered `{{item.header}}` template tags, so replication from the static HTML may need the rendered DOM.
