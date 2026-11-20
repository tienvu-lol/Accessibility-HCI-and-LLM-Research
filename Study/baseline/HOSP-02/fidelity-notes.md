# HOSP-02 fidelity notes

Source: Hoag Hospital, https://www.hoag.org/ (verified 2026-11-10 via curl; approved 2026-11-13). Observations come only from the approved research block in `Websites/pipelines/claude/research/HOSP.md`; I did not re-fetch the reference during the build.

## Replicated
- Page inventory: 14 of the 14 listed pages mapped one to one (see README).
- Information architecture: utility links (Pay Your Bill, Contact Us, Find Care), four-part primary nav (Explore Services, Locations, Resources, About), hero with h1 + h2 over a search widget with a specialty/physician radio toggle and text and location inputs, Quick Links tiles (6), institutes intro, Why Choose, testimonial carousel, community band, articles cards, thin footer with main phone number.
- Doctor search lives only in the home widget and `find-care.html`; no provider directory or profile pages were created.

## Approximated
- Dropdown and carousel behavior (recorded as inferred in the research): click/Enter disclosure, Escape closes, manual carousel buttons (no autoplay).
- Emergency announcement: the research found the component but not its text, so the banner copy is original and says to call local emergency services.
- Hero h1/h2 and all copy are original ("A New Chapter of Care in Westmere" mirrors the new-campus-headline pattern).
- Insurance, classes and locations are filtered lists over invented data.

## Simulated
Patient-portal sign-in (reference links off-site to MyChart) is a labeled non-functional dialog; Pay Your Bill and "Sign in" open it.

## Intentionally added
- Simulated appointment request form on `contact-us.html` (research: no appointment form observed).
- Filters/sort on locations, classes and insurance (reference interaction unverified).
- Programs search on the services page. No provider profile page was added.

## Omitted / pruned navigation (not linked anywhere)
Utility: On Demand (external), Donate. Explore Services: Primary Care, Digestive Health, Neurosciences, Orthopedics, Spine, Women's Health, Imaging & Radiology (covered as entries on the single Programs & Services page, not nav items). Locations: Hoag Hospital Irvine analog, Primary Care, Health Centers, Urgent Care (these appear as filter types on the locations page). Resources: Resources, Health Risk Assessments, Support Groups, Patient Stories (support groups appear as an event category). About: Awards & Accreditations, Safety & Quality, Community Health, Culture, Graduate Medical Education. Footer: Privacy Policy, Terms of Use, Legal. Article detail pages. The About menu is a plain link because only the Overview target exists. No catch-all or stand-in page exists.

## Unverified
Actual dropdown/carousel behavior, ER notice text, footer details beyond the research block, behavior of live site at build time.

## Research-relevant observations
Reference titles for Patients & Visitors and insurance share a generic title; the replica gives each page a distinct title (an accessibility-positive deviation). Home-page articles are unlinked cards because their targets were pruned.
