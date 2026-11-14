# CHUR — Claude Phase A source research

Verification date: 2026-11-12. Method for all slots: "HTTP GET via curl" (`curl -sSL --max-time 25 -A "Mozilla/5.0"`), with title and nav links extracted by grep. No rendering and no JavaScript execution. No files were written.

Rejected candidates:
- cathedral.org (Washington National Cathedral): 403 Cloudflare "Attention Required".
- saintpatrickscathedral.org: 403 "Just a moment...".
- gracecathedral.org: 403 "Just a moment...".
- stmartinsaustin.org: 403.
- stpaulsdc.org: DNS failure.
- saddleback.com: reachable (200), but the server-rendered nav had only about 5 top links and the rest looked JS-driven (`_next`, `{{item...}}` templates), so it is a weaker replication source.

### CHUR-01
- source_id: CHUR-01
- category/subcategory: Church / Large multi-site church
- source_name: North Point Community Church (North Point Ministries)
- official_url: https://northpoint.org/
- verified_at: 2026-11-12, HTTP GET via curl. The home page returned 200 with title "Life is complicated. You want to get it right. We want to help. | North Point Community Church". All 11 interior pages below returned 200 with the titles shown.
- source_pages:
  1. https://northpoint.org/ - "Life is complicated. You want to get it right. We want to help. | North Point Community Church"
  2. https://northpoint.org/new-here - "We're glad you're here | North Point Community Church"
  3. https://northpoint.org/sundays - "Sundays at North Point Community Church | North Point Community Church"
  4. https://northpoint.org/messages - "Messages | North Point Community Church"
  5. https://northpoint.org/events - "Events | North Point Community Church"
  6. https://northpoint.org/groups - "Three-Month Groups | North Point Community Church"
  7. https://northpoint.org/volunteer - "Serve With Us | North Point Community Church"
  8. https://northpoint.org/give - "Give | North Point Community Church"
  9. https://northpoint.org/locations - "Locations | North Point Community Church"
  10. https://northpoint.org/church-overview - "Church Overview | North Point Community Church"
  11. https://northpoint.org/care-and-counseling - "Care and Counseling | North Point Community Church"
  12. https://northpoint.org/contact - "Contact Us | North Point Community Church"
- key_regions (observed from link text in the HTML; layout is inferred):
  - Header: top links "I'm New", "Events", "Watch" (/messages), "Give", "Serve" (/volunteer), "Deeper/Wider", and a "Join us Sunday" CTA. A "Watch now" link to /live is also present.
  - Nav dropdowns: not observed in the raw HTML (flat top links only).
  - Hero: "Join Us Sunday" call to action and a "Stay informed" block.
  - Body: featured event cards with "Details" and "Register Online" links (for example Habitat for Humanity build, "Be Rich" serve Sunday, Lead "Apply Online"), and a "View All Events" link.
  - Footer groups (observed links): Sundays, Church Overview, Contact Us, Groups, Volunteer, Care and Counseling, About NPM (northpointministries.org), Locations, Your Move (yourmove.is), global(x), Privacy Policy, Terms of Use.
- key_interactions:
  - Observed: plan-a-visit (/new-here, /sundays), a messages/media page (/messages), an events listing with detail pages (/events/<slug>-<date>), groups, volunteer opportunities, a give page, a locations list, care and counseling, a contact page, and a live-stream link (/live).
  - Inferred (not verified): sermon filter and search, location finder, give-form fields, contact form fields.
- complexity: high. It is a multi-campus organisation with many sections (events, groups, serving, giving, locations, live stream), and the site links out to sister domains.
- stack_clues: served via Cloudflare (`server: cloudflare`) with a `via: 1.1 Caddy` header. The HTML contains many "rails" substring matches, but those may be page text, so the backend framework is unknown. Server-rendered HTML with plain path URLs.
- limitations: no JavaScript was executed, so dropdowns, the hero carousel and form fields are unverified. Volunteer and giving may hand off to third-party domains. Event cards are date-driven and change over time.

### CHUR-02
- source_id: CHUR-02
- category/subcategory: Church / Historic cathedral
- source_name: Cathedral of Saint John the Divine (New York)
- official_url: https://www.stjohndivine.org/
- verified_at: 2026-11-12, HTTP GET via curl. The home page returned 200 with title "Home - Cathedral of Saint John the Divine". All interior pages below returned 200 with the titles shown.
- source_pages:
  1. https://www.stjohndivine.org/ - "Home - Cathedral of Saint John the Divine"
  2. https://www.stjohndivine.org/visit/main-page-link/ - "Plan Your Visit - Cathedral of Saint John the Divine"
  3. https://www.stjohndivine.org/visit/timed-tickets/ - "Timed Tickets - Cathedral of Saint John the Divine"
  4. https://www.stjohndivine.org/calendar/ - "Calendar - Cathedral of Saint John the Divine"
  5. https://www.stjohndivine.org/spiritual-life/services/ - "Services - Cathedral of Saint John the Divine"
  6. https://www.stjohndivine.org/about/leadership/ - "Leadership - Cathedral of Saint John the Divine"
  7. https://www.stjohndivine.org/music/main-page-link/ - "Music - Cathedral of Saint John the Divine"
  8. https://www.stjohndivine.org/art-ideas/american-poets-corner/ - "American Poets Corner - Cathedral of Saint John the Divine"
  9. https://www.stjohndivine.org/watch-listen - "Watch & Listen - Cathedral of Saint John the Divine"
  10. https://www.stjohndivine.org/education-outreach/the-cathedral-school/ - "The Cathedral School - Cathedral of Saint John the Divine"
  11. https://www.stjohndivine.org/support/donate/ - "Donate Now - Cathedral of Saint John the Divine"
  12. https://www.stjohndivine.org/about/blog/ - "Blog - Cathedral of Saint John the Divine"
- key_regions (nav items observed in the HTML):
  - Header utility links: Support Us (/support/donate/), Calendar, Watch, Donate, Shop, Search.
  - Main nav with 7 dropdowns:
    - About: About the Cathedral, Leadership, Space Rentals, Funerals, Blog, Press Releases.
    - Visit: Plan Your Visit, Timed Tickets, Public Guided Tours, School and Youth Programs, Adult Programs, Virtual Visits, Explore The Cathedral, Covid 19 Policies, Digital Guide to the Cathedral.
    - Spiritual Life: Worship at the Cathedral, The Columbarium, Dean & Clergy, Bishop & Diocese, Services, Pastoral Services, Congregation of St. Saviour, Community at the Crossing, Nightwatch.
    - Education & Outreach: Serving Our Community, Cathedral Community Cares, ACT, The Cathedral School, The Gardens Conservancy, Friends of the Cathedral, Volunteer, Community Good Episcopal Federal Credit Union.
    - Art & Ideas: Cathedral Arts and Culture, Textile Conservation Lab, American Poets Corner, Art & Exhibitions, Residencies, Civic Engagement, Crafts at the Cathedral 2026.
    - Music: Music at the Cathedral, Choral Ensembles, Visiting Liturgical Choir, Festivals, Music Staff, Organs & Recitals, Great Music in a Great Space.
    - Support: Why Give, Donate Now, More Ways to Give, Spirit of the City, Program Support, Leadership Circles, Dedicate a Chair.
  - Body: "Learn more" (about), "See Full Calendar", "Timed Tickets", and "View Full Schedule" (/calendar/?category=4&monthView=1). Hero layout is inferred.
  - Footer: not inspected (limitation).
- key_interactions:
  - Observed: plan-a-visit, timed tickets, a calendar with category and month-view query parameters, a services page, leadership/clergy, a watch/listen page, a donate page, a search page, a shop link, and a blog and press releases.
  - Inferred: ticket purchase flow (likely external), prayer request, calendar filtering UI.
- complexity: high. It has 7 mega-dropdowns with about 60 sub-pages, a calendar, ticketing, and a music, arts and school mix.
- stack_clues: served via Cloudflare. A string match on "Craft" appeared once in the HTML, which is a weak and unconfirmed hint at Craft CMS. Server-rendered with path URLs. Otherwise unknown.
- limitations: no JavaScript was executed, so mobile nav, calendar interactivity and ticket flow are unverified. The footer and hero were not parsed. Weak CMS signal. Washington National Cathedral and St. Patrick's were blocked (403), which is why this site was chosen.

### CHUR-03
- source_id: CHUR-03
- category/subcategory: Church / Small community congregation (Unitarian Universalist)
- source_name: The Unitarian Universalist Congregation in Westport (CT)
- official_url: https://uuwestport.org/
- verified_at: 2026-11-12, HTTP GET via curl. The home page returned 200. Its title is long: "The Unitarian Universalist Congregation in Westport – 10 Lyons Plains Rd., Westport, CT 06880 – Ph: (203)227-7205 Sunday Services: 10:00 AM". All interior pages below returned 200 with the titles shown.
- source_pages:
  1. https://uuwestport.org/ - "The Unitarian Universalist Congregation in Westport – 10 Lyons Plains Rd., Westport, CT 06880 – Ph: (203)227-7205 Sunday Services: 10:00 AM"
  2. https://uuwestport.org/ministers-greeting/ - "Greetings from The Unitarian Universalist Congregation in Westport"
  3. https://uuwestport.org/ministers-greeting/upcoming-services/ - "Upcoming Services"
  4. https://uuwestport.org/calendar-2/ - "Calendar"
  5. https://uuwestport.org/mission-statement/ - "Our Mission Statement"
  6. https://uuwestport.org/mission-statement/vision-statement/ - "Our Vision Statement"
  7. https://uuwestport.org/membership/ - "Membership"
  8. https://uuwestport.org/mission-statement/small-group-ministries/ - "Small Group Ministries"
  9. https://uuwestport.org/faith-formation-for-children-and-youth/ - "Faith Formation for Children and Youth: Fall/Winter 2026"
  10. https://uuwestport.org/our-choirs/ - "Our Choirs"
  11. https://uuwestport.org/mission-statement/donate/ - "BASICS ON PLEDGING AND CONTRIBUTING TO YOUR PLEDGE"
  12. https://uuwestport.org/ministers-greeting/contact-us/ - "Contact The Unitarian Universalist Congregation In Westport"
  13. https://uuwestport.org/mission-statement/soundings-2/ - "SOUNDINGS"
- key_regions (observed from link text; layout is inferred):
  - Header: the site title links to home, with the address, phone and Sunday service time in the title.
  - Nav: the raw nav links did not reveal a clear dropdown structure. Observed links: Contact Us, Soundings (Newsletter), Donate/Pledge, Congregational Calendar, Sunday Services, Pastoral Care Chaplains, Rentals (event space reservation form), and Realm Member Directory (external login at ministrylogin.com).
  - Body: the greeting page links to Membership, Mission, Vision, Small Group Ministry, Family Faith Formation, Social Justice, and Choirs.
  - Footer: not inspected.
- key_interactions:
  - Observed: service listing page, congregational calendar, membership, small groups, faith formation, choirs, pledge/donate information page, contact page, newsletter page, event-space reservation form (page exists), and a member directory login (external).
  - Inferred: contact form, reservation form fields, calendar plugin behaviour.
  - Not found: a sermons archive, a prayer-request form (not seen in nav).
- complexity: low to medium. It is a WordPress multi-page site with a modest page count, mixed page-title styles, and some deep nesting (mission-statement and ministers-greeting used as parent paths for unrelated content).
- stack_clues: WordPress (66 `wp-content` references), Site Kit by Google 1.190.0 (generator meta), and a "divi" string match, so possibly the Divi theme (inferred). Member directory via Realm (ministrylogin.com).
- limitations: no JavaScript was executed. The URL structure is inconsistent (the greeting and mission paths act as parents), so the replication sitemap should be normalised. The congregation size is inferred from the site and not verified. Nav dropdown structure and footer were not confirmed from the raw HTML. No prayer-request or sermon archive was seen.
