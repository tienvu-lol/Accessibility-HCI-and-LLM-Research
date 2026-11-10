Verification ran on 2026-11-10 (curl run at 06:20Z, later requests the same day). All three sites returned HTTP 200 with server-rendered HTML. No files were written. Mayo, Johns Hopkins, Michigan Medicine and Mount Sinai were not used: curl got a 403 or a Cloudflare challenge. Stanford Health Care returned an unrelated Carleton College title, so I dropped it. Duke Health also worked, but I chose UCSF for the richer navigation.

Common method for all three: `curl -sSL --max-time 25 -A "Mozilla/5.0" <url>`, then grep for `<title>`, `<a href>` and `<input>`/`<label>`. Anything marked "inferred" was not observed in the HTML.

### HOSP-01
- **source_id:** HOSP-01
- **category/subcategory:** healthcare / large academic medical center
- **source_name:** UCSF Health
- **official_url:** https://www.ucsfhealth.org/
- **verified_at:** 2026-11-10 (ISO 8601: 2026-11-10T06:20Z), HTTP GET via curl. The home page returned 200 with a ~446 KB body. Title: "Ranked #1 in CA and Among the Best Hospitals in the Nation | UCSF Health".
- **source_pages** (all 200 and title-checked):
  1. `/` – Ranked #1 in CA and Among the Best Hospitals in the Nation | UCSF Health
  2. `/providers` – Find a Doctor | UCSF Health
  3. `/locations` – Find a Location | UCSF Health
  4. `/medical-services` – Medical Services | UCSF Health
  5. `/care` – Conditions and Care | UCSF Health
  6. `/care/services/emergency-department` – Emergency Department | UCSF Health
  7. `/care/services/cancer` – Cancer Care | UCSF Health
  8. `/patients-visitors` – Patients & Visitors | UCSF Health
  9. `/patients-visitors/appointments` – Request an Appointment | UCSF Health
  10. `/patients-visitors/billing-insurance` – Billing & Insurance | UCSF Health
  11. `/patients-visitors/billing-insurance/help-paying-your-bill` – Help Paying Your Bill | UCSF Health
  12. `/patients-visitors/your-hospital-stay` – Your Hospital Stay | UCSF Health
  13. `/mychart` – MyChart | UCSF Health
  14. `/about` – About UCSF Health | UCSF Health
  - **Not usable:** `/care/conditions`, `/care/treatments`, `/conditions` and `/medical-tests` all return 200 with the title "Search Page | UCSF Health". `/news` and `/patients-visitors/emergency-department` return 404.
- **key_regions:**
  - **Header:** "Skip to main content" link, logo, MyChart, "Request appointment" and "Refer a patient" utility links, search link `/search`, mobile menu button.
  - **Nav (observed):** Care, Medical Services, Find a Doctor, Locations, Virtual Visits (`/patients-visitors/virtual-visits`), Second Opinion, Clinical trials (external). Care expands to Conditions (`/care/conditions`), Treatments (`/care/treatments`) and Medical Tests (`/care/medical-tests`).
  - **Hero:** an h1 with "Your hea…" (truncated in my grep) over a large image.
  - **Body sections (h2/h3):**
    - "Great care starts here", with h3 cards "I need…", "I need to…" and "I need help with…"
    - "Expert care in every specialty"
    - "Our doctors specialize in you"
    - "Real people, remarkable recoveries" (media carousel with play/pause and previous/next controls)
    - "Latest & greatest from UCSF Health" (news cards)
    - "Excellent care everywhere" (locations)
    - "I want to..." (quick actions)
  - **Footer:** collapsible groups "Quick links", "More information" and "Research & education", plus "Follow us".
    - Quick links: Find a doctor, Find a location, Explore care, Refer a patient, Locations & directions, Contact us, Patient relations, Help paying your bill, International services, Join our team, Donate.
    - More information: About us, Leadership, Quality of patient care, Price transparency, News & stories, Media resources, Accessibility resources, nondiscrimination notice.
    - Research & education: Clinical trials, UCSF, and the Schools of Medicine, Nursing, Pharmacy and Dentistry.
    - Back-to-top link.
- **key_interactions:**
  - **Observed:** `/providers` has a typeahead search (label "Search by specialty, name, con…"). `/patients-visitors/appointments` is a request-appointment page. MyChart is linked from the header and has its own page.
  - **Observed:** an Emergency Department service page and a "Help paying your bill" page both exist.
  - **Inferred:** the request-appointment form and the filters on `/providers` and `/locations` (not inspected).
  - **Inferred:** the provider profile URL pattern. `/providers/<letter>` links exist, but I did not fetch a profile.
  - **Inferred:** the dropdown contents beyond the Care submenu.
- **complexity:** high. It has a mega-nav with mobile and desktop variants, carousels, typeahead search, a deep service tree, and 300–700 KB pages.
- **stack_clues:** Next.js (`/_next/static/` assets and `data-next-head` title attributes). Sitecore Cloud media is served from `edge.sitecorecloud.io`. Styling looks like Tailwind-style utility classes.
- **limitations:**
  - Search and filter results are not in the HTML.
  - The `/care/*` search pages have generic titles.
  - No provider profile was verified.
  - Pages are very large.
  - I did not check whether the site is bot-gated at volume.

### HOSP-02
- **source_id:** HOSP-02
- **category/subcategory:** healthcare / community-regional hospital (nonprofit health system, Orange County CA)
- **source_name:** Hoag Hospital (Hoag Health Network)
- **official_url:** https://www.hoag.org/
- **verified_at:** 2026-11-10, HTTP GET via curl. The home page returned 200 with a ~470 KB body. Title: "Best Health System in Orange County | Hoag Hospital".
- **source_pages** (all 200 and title-checked):
  1. `/` – Best Health System in Orange County | Hoag Hospital
  2. `/find-care/` – Best Healthcare System in Orange County
  3. `/locations` – Our Locations
  4. `/locations/hoag-hospital-newport-beach` – Hoag Hospital Newport Beach
  5. `/patients-visitors/` – Patients & Visitors
  6. `/patients-visitors/insurance-accepted` – Patients & Visitors (generic title; the content is insurance accepted)
  7. `/patients-visitors/infection-prevention/` – Infection Prevention
  8. `/billing-information/help-paying-your-bill/` – Billing Information | Hoag Health Network
  9. `/institute/cancer/` – Hoag Family Cancer Institute | Hoag Hospital
  10. `/institute/heart-vascular/` – Hoag Heart & Vascular Institute | Hoag Hospital
  11. `/specialties-services/` – Specialities & Programs at Hoag
  12. `/resources/classes-events/` – Resources (generic title; 5 MB)
  13. `/about-hoag/` – About Hoag
  14. `/contact-us/` – Contact Us - Hoag
  - **Optional:** `/articles/rethinking-memory-loss-and-dementia/` – Rethinking Memory Loss and Dementia.
  - **Not usable:** `/find-a-doctor` and `/find-care/?type=physician` return the same page as `/find-care/`. `/doctors`, `/billing` and `/emergency-services/` also return the generic find-care page, so there is no standalone doctor directory URL.
- **key_regions:**
  - **Header:** "Skip to content" link. Utility links: On Demand (external), Pay Your Bill (links to the MyChart login), Donate, Contact Us, Find Care.
  - **Nav (dropdowns):**
    - Explore Services: Primary Care, Cancer, Digestive Health, Heart & Vascular, Neurosciences, Orthopedics, Spine, Women's Health, Imaging & Radiology Services, Other Programs & Services.
    - Locations: All Locations, Hoag Hospital Newport Beach, Hoag Hospital Irvine, Primary Care, Health Centers, Urgent Care.
    - Resources: Patients & Visitors, Resources, Health Risk Assessments, Classes & Events, Support Groups, Patient Stories.
    - About Hoag: Overview, Awards & Accreditations, Safety & Quality, Community Health, Culture, Graduate Medical Education.
  - **Hero:** h1 "A New Era of Care in Irvine", h2 "Find the care you need, when you need it". It sits over a search widget (see interactions).
  - **Body sections:**
    - "Quick Links" tiles: Find a Doctor, Pay my bill, Sign in to MyChart, Check Insurance, Visitor Info, Find a Hoag Location.
    - Institutes intro (centers of excellence).
    - "Why Choose Hoag".
    - Patient testimonial carousel.
    - "We're part of your community".
    - Articles cards.
  - **Footer:** thin: Privacy Policy, Terms of Use, Legal (`/legal`) and the phone number (800) 400-4624. Footer groups are minimal.
- **key_interactions:**
  - **Observed:** the home hero search has a radio toggle ("specialty_or_condition" vs "find_a_physician") plus a text input and a location input. A MyChart login link, a Pay Your Bill link and a "Check Insurance" tile also exist.
  - **Observed:** an `emergency-announcement` component is present in the source (an alert banner), but its text is not visible in the HTML.
  - **Inferred:** the dropdown open/close behaviour and the testimonial carousel controls.
  - **Inferred:** no appointment-request form was seen in the home HTML; booking is presumably via MyChart or phone.
- **complexity:** medium. The nav is rich but the footer is simple, and many pages are static content.
- **stack_clues:** `<meta name="generator" content="Astro v7.4.2">`, Astro islands, and `hds-` prefixed utility classes (a custom design system).
- **limitations:**
  - There is no standalone doctor directory or profile page; find-a-doctor is only the home widget and `/find-care/`.
  - Several titles are generic ("Resources", "Patients & Visitors"), and the Resources pages are ~5 MB.
  - `/patients-visitors/` and `/patients-visitors/insurance-accepted` share the same title.
  - The ER notice text was not seen.
  - The MyChart and On Demand links go off-site (hoagconnect.org / ondemand.hoag.org).

### HOSP-03
- **source_id:** HOSP-03
- **category/subcategory:** healthcare / children's hospital
- **source_name:** Children's Hospital of Philadelphia (CHOP)
- **official_url:** https://www.chop.edu/
- **verified_at:** 2026-11-10, HTTP GET via curl. The home page returned 200 with a ~196 KB body. Title: "Welcome | Children's Hospital of Philadelphia".
- **source_pages** (all 200 and title-checked; every title ends in " | Children's Hospital of Philadelphia"):
  1. `/` – Welcome
  2. `/doctors` – Find a Doctor
  3. `/doctors/search?filter=provider.specialties.name%3ACardiology` – Doctor Search
  4. `/doctors/dori-yoav` – Yoav Dori, MD, PhD
  5. `/locations` – Locations
  6. `/emergency-care-locations` – Emergency Care for Kids
  7. `/specialties` – Search specialties
  8. `/conditions-diseases` – Search conditions
  9. `/conditions-diseases/asthma` – Asthma in children
  10. `/get-care` – Get Care at CHOP
  11. `/appointment-scheduling` – Appointment Scheduling
  12. `/patients-and-families` – Patients & Families
  13. `/billing-and-insurance` – Billing and Insurance
  14. `/billing-and-insurance/online-bill-pay` – Online Bill Pay
  - **Optional (all 200):** `/symptom-checker`, `/second-opinions`, `/centers-programs/billing-and-insurance/request-cost-estimate`, `/patients-and-visitors/obtaining-medical-records`, `/about-us`, `/newsroom`.
  - **Not usable:** `/specialties/cardiology` returns 404.
- **key_regions:**
  - **Header:** "Go to CHOP.edu" link. Utility links: Research, Careers, International, Donate Now, MyCHOP Portal (`mychop.chop.edu/mychart`). Primary links: Locations, Specialties.
  - **Nav (Get Care mega-menu):** See all types of care, Schedule an appointment, Find a doctor, Symptom Checker, Get a second opinion, Conditions we treat. Locations group: Primary Care, Specialty Care, Emergency Care, Urgent Care, Inpatient Care for Kids, Community Hospital Affiliates.
  - **Nav (other groups):** Patients & Families (Resources for families, Caring for your child, medical records, research studies, inpatient stays for the Philadelphia and King of Prussia campuses, health forms). Billing & insurance (Pay a bill, Family Health Coverage Program, accepted insurance plans, cost estimate). Healthcare Professionals (Continuing Education, events, Clinical Pathways, referral forms).
  - **Hero:** h1 (visually hidden) "Welcome", then h2 "Breakthroughs. Every day."
  - **Body sections:** "Find care you can count on", "Explore care options", "Best in nation year after year", plus an alert region (the global alert block is present).
  - **Footer:** groups About CHOP (Careers, Our mission, Innovation, Newsroom), Get Care (Find a doctor / location / specialty, second opinion), Patients & Families (Insurance & billing, Price transparency, surprise-billing rights, Caring for your child), Healthcare Providers (Refer a patient, Clinical pathways), Ways to Give, and phone numbers (1-800-879-2467, 267-426-5332, 215-590-3800).
  - **Footer extras:** "Sign up for newsletters", "Join the conversation." (social), and a "Language Assistance/Auxiliary Aids and Services Available" block linking to English, Español, العربية, 繁體中文, Deitsch, ગુજરાતી, Deutsch, हिंदी, Italiano, Tagalog and Polski.
- **key_interactions:**
  - **Observed:** specialty filter links under `/doctors/search?filter=…`. Search/filter pages exist for doctors, specialties and conditions. Pages for appointment scheduling, symptom checker, second opinions and online bill pay exist. A MyCHOP Portal link goes to an external MyChart login. Emergency, urgent-care and inpatient location pages exist. A global alert block is present.
  - **Inferred:** the Find-a-Doctor form fields. The `/doctors` HTML shows search inputs without a populated filter list, so the filter facets are probably JavaScript-rendered.
  - **Inferred:** the appointment form and symptom-checker behaviour (page content not inspected).
- **complexity:** high. It has a large mega-nav, many content types (doctors, conditions, specialties, programs), a multilingual footer, and 100–570 KB pages.
- **stack_clues:** `<meta name="generator" content="Drupal 11">`, `drupal-settings-json`, `drupal-link-system-path` attributes, and `block-outline-frontend-*` block ids. The HTML uses `<header>`, `<main>`, `<footer>` and 7 `<nav>` landmarks.
- **limitations:**
  - The `/doctors` filter facets and result lists did not appear in the static HTML, so I could not read them.
  - `/specialties` is ~570 KB and its titles are generic.
  - Several program pages sit under the `/centers-programs/` prefix and are not individually checked.
  - The MyCHOP portal and the CE and giving pages are external.

Not checked: rendered/JavaScript behaviour, the open state of any dropdown, accessibility conformance, and robots/terms-of-use permissions for replication.
