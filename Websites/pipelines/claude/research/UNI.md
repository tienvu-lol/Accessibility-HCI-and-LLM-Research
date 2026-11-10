Phase A research is done for all three slots. Every page below was fetched live on 2026-11-10 with `curl -sSL --max-time 25 -A "Mozilla/5.0"`, and each returned HTTP 200. I wrote no files.

Rejected candidates, in case a replacement is needed:
- umich.edu and williams.edu returned a 403 Cloudflare "Just a moment..." challenge.
- austincc.edu returned a 403 whose title did not match the site, and valenciacollege.edu returned a 200 with a title that did not match the site. Both were discarded.

### UNI-01
- **source_id:** UNI-01
- **category/subcategory:** School (University) / large public research university
- **source_name:** University of Wisconsin–Madison
- **official_url:** https://www.wisc.edu/
- **verified_at:** 2026-11-10, HTTP GET via curl. The home page returned 200 with title "University of Wisconsin–Madison". All 11 `www.wisc.edu` interior pages below returned 200 with the titles shown. Two subdomain pages were also fetched, with titles recorded below.
- **source_pages:**
  1. https://www.wisc.edu/ — University of Wisconsin–Madison
  2. https://www.wisc.edu/academics/ — Academics - University of Wisconsin–Madison
  3. https://www.wisc.edu/academics/majors/ — Undergraduate majors and certificates - University of Wisconsin–Madison
  4. https://www.wisc.edu/admissions/ — Admissions & Aid - University of Wisconsin–Madison
  5. https://www.wisc.edu/admissions/apply/ — Apply - University of Wisconsin–Madison
  6. https://www.wisc.edu/visit/ — Visit UW–Madison - University of Wisconsin–Madison
  7. https://www.wisc.edu/directories/ — Directory Search - University of Wisconsin–Madison
  8. https://www.wisc.edu/research/ — Research - University of Wisconsin–Madison
  9. https://www.wisc.edu/student-life/ — Student Life - University of Wisconsin–Madison
  10. https://www.wisc.edu/athletics/ — Athletics - University of Wisconsin–Madison
  11. https://www.wisc.edu/about/ — About UW–Madison - University of Wisconsin–Madison
  12. https://www.wisc.edu/about/facts/ — Facts - University of Wisconsin–Madison
  - Subdomain pages for reference only (separate sites, not for replication): https://today.wisc.edu/ ("All events | UW–Madison Events Calendar") and https://news.wisc.edu/ ("UW–Madison News").
  - `/admissions/cost-aid/` and `/admissions/tuition/` both returned 404. Tuition links out to `bursar.wisc.edu`.
- **key_regions (observed in HTML):**
  - **Header:**
    - A "Search People and Pages" form (`#uw-top-search-form`, `action=/search/`, input `q`).
    - A "Main Menu" with 6 flat items: Academics, Admissions & Aid, Student Life, Research, Athletics, About UW. I found no dropdown markup in the HTML.
    - A "Utility Menu": MyUW, Email/calendar, Canvas, Box, Google Apps, Zoom, Libraries, Map, News, Events, Visit, Apply, Jobs, Give.
  - **Hero:** the heading text near the top is "Launch your future at…", with Visit and Apply buttons.
  - **Home body sections (h2/h3):**
    - "Key next steps"
    - "Why choose UW–Madison?"
    - "Trending on campus" (news cards)
    - "Our research solves mysteries and transforms lives" / "More UW–Madison discoveries"
    - "We're a public university guided by public service"
    - "The Badger Way"
    - "We believe that one Badger can change the world"
    - "Madison, WI: The ultimate college town"
    - "Are you searching for something specific?" (bottom search form)
  - **Admissions page sections:** "Affording college", "Our promise to Wisconsin students" (Bucky's Tuition Promise, Bucky's Pell Pathway, Wisconsin Tribal Educational Promise, Badger Promise), "Choose from our top-ranked professional schools".
  - **Footer:** three groups under "Footer links": Popular, Resources, Quick links.
    - Popular: Academic calendar, Campus map, Directory search, Facts and figures, Jobs, Majors and certificates, Tuition and fees.
    - Resources: audience links (Alumni, Business and industry, Faculty and staff, International, Parents, Researchers, Students).
    - Quick links: Accessibility, Free Expression, Governance, Policies, Safety, Support UW, Title IX, Privacy notice.
    - The group-to-link assignment is partly inferred from link order.
- **key_interactions:**
  - **Observed:**
    - The site search form (GET `/search/`, `q`).
    - A look-ahead container (`uw-look-ahead-top`, `aria-controls` on the input).
    - Apply and Visit calls to action.
    - Many card and promo links.
    - The directory page loads a React LDAP-lookup bundle (`uw-ldap-lookup-react.*.js`).
    - A cookie-consent script is loaded.
    - A site-alert script is loaded (`uw-alerts.*.js`).
  - **Inferred:** the directory search is client-rendered and people-search results come from JS. The majors page is a short link page, not a filterable program finder (63 anchors total, no filter form seen). The application portal and login are simulation only.
- **complexity:** Medium. The `www` site is shallow and mostly server-rendered with a flat 6-item nav and many cards. Events, news and tuition live on subdomains, so they need stubs or simulated pages.
- **stack_clues:** Custom-built static site with fingerprinted assets (`/css/redesign.<hash>.css`, `/js/redesign.<hash>.js`), Google Tag Manager, CDN-hosted fonts and cookie consent at `cdn.wisc.cloud`, served via CloudFront. The CMS is unknown.
- **limitations:**
  - There is no real program finder on `www`.
  - The directory is JS-driven, and I did not fetch the API.
  - Events and news come from other subdomains.
  - I did not render the page, so dropdown or JS behaviour beyond the HTML is unverified.

### UNI-02
- **source_id:** UNI-02
- **category/subcategory:** School (University) / small private liberal-arts college
- **source_name:** Swarthmore College
- **official_url:** https://www.swarthmore.edu/
- **verified_at:** 2026-11-10, HTTP GET via curl. The home page returned 200 with title "Swarthmore Home :: Swarthmore College". All pages below returned 200 with the titles shown.
- **source_pages:**
  1. https://www.swarthmore.edu/ — Swarthmore Home :: Swarthmore College
  2. https://www.swarthmore.edu/meet-swarthmore — Meet Swarthmore :: Swarthmore College
  3. https://www.swarthmore.edu/academics — Academics :: Swarthmore College (hosts the "Programs of Study" list of departments)
  4. https://www.swarthmore.edu/biology — Biology :: Swarthmore College (department detail)
  5. https://www.swarthmore.edu/academics/design-your-own-major — Design Your Own Major :: Academics :: Swarthmore College
  6. https://www.swarthmore.edu/academics/academic-calendar — Academic Calendar :: Academics :: Swarthmore College
  7. https://www.swarthmore.edu/admissions-aid — Admissions & Aid :: Swarthmore College
  8. https://www.swarthmore.edu/admissions-aid/apply-to-swarthmore — Apply to Swarthmore :: Admissions & Aid :: Swarthmore College
  9. https://www.swarthmore.edu/admissions-aid/affordability-access — Affordability & Access :: Admissions & Aid :: Swarthmore College
  10. https://www.swarthmore.edu/financial-aid — Financial Aid :: Swarthmore College
  11. https://www.swarthmore.edu/admissions-aid/campus-tours-and-virtual-visits — Campus Tours and Virtual Visits :: Admissions & Aid :: Swarthmore College
  12. https://www.swarthmore.edu/campus-life — Campus Life :: Swarthmore College
  13. https://www.swarthmore.edu/news-events — News & Events :: Swarthmore College
  14. https://www.swarthmore.edu/news-events/stories-swarthmore — Stories from Swarthmore :: News & Events :: Swarthmore College
  - Other pages that returned 200: `/visit-swarthmore` ("Visit Swarthmore :: Swarthmore College") and `/directory` (title "Swarthmore College - Home", 920 KB, React people search).
  - Other URLs I guessed (`/academics/programs-study`, `/programs-study`, `/academics/departments-programs`, `/academics/majors-minors`) returned 404. The "Programs of Study" nav label points to `/academics`.
- **key_regions (observed in HTML):**
  - **Header:**
    - A utility area: phone (610) 328-8000, A-Z Index, Calendar, Directory, Campus Map, Make A Gift, Visit Swarthmore.
    - A "Main Horizontal Navigation" with 6 dropdown groups (ARIA `menuitem`/`aria-posinset` attributes are present):
      - Meet Swarthmore: What's Distinctive…, Mission, Why Liberal Arts?, A Brief History, By the Numbers, Explore Swarthmore, Traditions, Diversity @Swarthmore, Meet the President.
      - Academics: Academic Calendar, Programs of Study, Course Catalog, Faculty Spotlight, Course Spotlight, First-Year Experience, Global Engagement, Honors Program, Libraries, Registrar, Research, Tri-College Consortium.
      - Campus Life: Arts@Swarthmore, Athletics & Recreation, Be Well, Career Services, Clubs & Activities, Commencement, Living @ Swarthmore, New Students, Offices & Services, Sustainability.
      - Admissions & Aid: Affordability & Access, Apply to Swarthmore, Financial Aid & Cost, Swarthmore Tuition Guarantee, Life After Swarthmore, Campus Tours and Virtual Visits, SwatStories, Visit Admissions.
      - News & Events: Stories, Social Media, Faculty Experts, Faculty & Alumni Lectures, Campus Calendar, Campus Classifieds, Communications Office.
      - A sixth group, unnamed in my extraction, whose first link is `/meet-swarthmore`. The list above has only the 5 named groups, so the 6 is unconfirmed.
    - An "Additional Navigation and Search Menu" with a flyout search (GET `/search`, input `keys`) and an Accessibility Options panel with an Animation On/Off toggle.
  - **Hero:** a homepage ambient video with a Pause/Play control, the line "Swarthmore is a community where people with good ideas come together to make great ones", and a "Meet Swarthmore" button.
  - **Home body sections:** Alumni Voices and Sustainability, Garnet Weekend feature, "Watch" video cards ("Beyond the Classroom"), "To Zero By Thirty-Five", "Tuition Guarantee", "Homepage Link List", "Living @ Swarthmore", "Opportunities in Philadelphia", "News from Swarthmore".
  - **Footer ("Site Footer"):** Contact Information, Social Links, Site Feedback and Accessibility, Legal Links, Helpful Links - Left Column (A-Z Index, Academic Calendar, Accessibility Resources, Alumni Resources, Application Requirements, Athletics & Recreation, Calendar, Campus Map, Course Catalog, Dash, Directory, Faculty Handbook, Global Engagement, Libraries, Parent Resources, Tripod Catalog…), Helpful Links - Right Column, Giving.
- **key_interactions:**
  - **Observed:**
    - Dropdown mega-menu with ARIA menu roles.
    - Site search flyout.
    - Directory search form (`directory-search--form`, `role=combobox`, placeholder "Find faculty and staff...").
    - Animation on/off toggle.
    - Pause/play on the video.
    - Visit page with "Sign up for a campus tour", "Take a self-guided campus tour" and "Take a virtual tour" links.
  - **Inferred:** the tour sign-up is an external form, since the page itself had only a `/search` form. Calendar, catalog, careers and the application portal are separate subdomains, so only stubs or simulation are possible there.
- **complexity:** Medium-high. It has a deep multi-group dropdown nav, many server-rendered interior pages, a department template, a video hero, a footer with many link groups, and a JS directory.
- **stack_clues:** Drupal (observed `/sites/default/files/...` and `/themes/custom/swarthmore_theme/`), the `ambient_video_poster` image style, a `.webp` derivative, and Cloudflare-style delivery (inferred only). Page titles use the `Page :: Section :: Swarthmore College` pattern.
- **limitations:**
  - No dedicated program-finder page with filters (departments are a plain list).
  - Events, catalog and directory data are external or JS-driven.
  - I did not render the page, so the sixth nav group is unconfirmed.

### UNI-03
- **source_id:** UNI-03
- **category/subcategory:** School (University) / community college
- **source_name:** Northern Virginia Community College (NOVA)
- **official_url:** https://www.nvcc.edu/
- **verified_at:** 2026-11-10, HTTP GET via curl. The home page returned 200 with title "Home | Northern Virginia Community College". All pages below returned 200 with the titles shown.
- **source_pages:**
  1. https://www.nvcc.edu/ — Home | Northern Virginia Community College
  2. https://www.nvcc.edu/academics/programs/index.html — Find a Program | Northern Virginia Community College
  3. https://www.nvcc.edu/academics/schedule/index.html — Schedule of Classes | Northern Virginia Community College
  4. https://www.nvcc.edu/academics/calendar/index.html — Academic Calendar | Northern Virginia Community College
  5. https://www.nvcc.edu/admissions/index.html — Admissions & Aid | Northern Virginia Community College
  6. https://www.nvcc.edu/admissions/apply/index.html — Apply to NOVA | Northern Virginia Community College
  7. https://www.nvcc.edu/admissions/financialaid/index.html — Financial Aid | Northern Virginia Community College
  8. https://www.nvcc.edu/admissions/tuition/index.html — Tuition & Costs | Northern Virginia Community College
  9. https://www.nvcc.edu/admissions/visit/index.html — Visit & Connect | Northern Virginia Community College
  10. https://www.nvcc.edu/student-resources/index.html — Student Resources | Northern Virginia Community College
  11. https://www.nvcc.edu/student-life/index.html — Student Life | Northern Virginia Community College
  12. https://www.nvcc.edu/about/locations/index.html — NOVA Locations | Northern Virginia Community College
  13. https://www.nvcc.edu/about/directory/ — College Directory
  14. https://www.nvcc.edu/about/news/index.html — News | Northern Virginia Community College (`/news/index.html` also returns 200 with the same title)
- **key_regions (observed in HTML):**
  - **Header:**
    - A "Skip To Main Content" link.
    - A Google Translate language list of about 20 languages (`#googtrans(...)` anchors).
    - A "Quick Links" dropdown: College Safety, Contact Us, Directory, Bookstore, Libraries, Schedule of Classes, Catalog, Testing Centers, NOVA Service Portal, Forms, Closings.
    - An "Info For" dropdown: Current Students, Visiting Students, International Students, Alumni, Adult Learners, Parents & Family, Employers, Military & Veterans, Faculty & Staff.
    - Apply, Give and Request Info buttons.
    - A "Search NOVA" form (GET `/search`, `q`).
  - **Main nav (6 dropdown groups):**
    - Academics: Explore Academics, Programs of Study, Workforce & Professional Development, Honors Program, Online Learning, Study Abroad, Class Schedules, Divisions, Academic Calendar.
    - Admissions & Aid: Explore, Register for Classes, Dual Enrollment, Financial Aid, Tuition & Costs, Visit, International Admissions.
    - Student Resources: Parking, Accommodations & Accessibility, Student-Parents, Financial Education, ESL, Advising, Transfer Planning, Career Services, Technology, Transcripts, Tutoring, NOVACard, Student Success Guides.
    - Student Life: Clubs & Organizations, Athletics & Fitness, Dining, Arts & Theater, College Galleries, Nighthawks VOTE!, Mentoring, Health & Wellness, SGA, Contact Student Life.
    - About: About NOVA, At a Glance, Locations, Care & Inclusion Resources, Accreditation, Leadership, NOVA Offices, Faculty & Staff Directory.
    - A sixth group, News, is likely but the extraction cut off; the `/about/news/` link is observed.
  - **Hero:** an h3 "Support for Every Journey" with calls to action. Home sections include "Find What Works", "You get", "Advising & Support", "Student Resources", "Financial Aid Options", "Six …" (a stats block, text cut off), "Got questions?".
  - **Footer:** "Connect with Us", "Academics", "Campus", "Tools" groups.
- **key_interactions:**
  - **Observed:**
    - Program finder form (`/academics/programs/`):
      - The form `action` is `https://www.nvcc.edu/api/programfinder/programs/` and the form carries `spa-form` / `data-spa-empty-template` attributes.
      - It has a text input "Search for programs" (`name=query`, `data-auto-submit`).
      - It has a `Degree` select (`DegreeTypes`) and an `Interest` select (`interests`).
    - Directory search form (`/about/directory/search`) with people/other radio choices.
    - Site search.
    - Google Translate language list.
    - Request Info and Apply links to external portals.
    - Visit page with campus-tour and virtual-tour (YouVisit) links and webinar/event links on `nighthawkhub.nvcc.edu`.
  - **Inferred:** program results render client-side from the API. Selecting a degree or interest probably filters them. The application portal and login are simulation only.
- **complexity:** Medium-high. It has a large mega-nav with two extra utility dropdowns, language translation, a JS-driven program finder with filters, a directory search form, and many uniform interior pages.
- **stack_clues:** Static `.html` URLs (`index.html`) with a `bundle.js?v=…` front-end bundle, an `api/programfinder` endpoint, Google Translate, a Gideon Taylor chat hook (`chatui.ida.gideontaylor.com`), and `Server: AmazonS3` response headers. The CMS is unknown.
- **limitations:**
  - The program list is API-loaded and I did not fetch the API.
  - The title on `/about/locations/` is duplicated ("… | Northern Virginia Community College | Northern Virginia Community College").
  - `/about/directory/` has the bare title "College Directory".
  - The News dropdown group and the footer link lists were not fully captured.

I did not render any page in a browser, so dropdown behaviour is read from the HTML only.
Skipped: I did not call the NOVA program-finder API or render any page. Risk: the JS-driven pieces (directories, program finder, dropdown behaviour) are unconfirmed.
