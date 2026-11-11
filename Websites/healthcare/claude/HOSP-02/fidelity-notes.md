# HOSP-02 fidelity notes

Source: https://www.hoag.org/ (Hoag Hospital, community/regional nonprofit health system). Observations come from the lead's curl-based research (`Websites/pipelines/claude/research/HOSP.md`, 2026-11-10). **This run did not visit the live site**; nothing below was newly observed, and visual design (colors, type, imagery) was not inspected at all.

## Page mapping

| Local page | Status | Notes |
| --- | --- | --- |
| index.html | replicated / approximated | Section order follows the research: hero with search, Quick Links tiles, institutes, Why Choose, testimonial carousel, community, articles. Hero h1 paraphrased ("A New Chapter of Care in Eastvale"). Article cards link to existing local pages instead of article pages. |
| find-care.html | approximated | Reference `/find-care/` and the home widget: radio toggle (specialty/condition vs physician), text, location. Result lists were not in the reference HTML, so filters, count and cards are inferred. |
| locations.html, location-harbor-point.html | approximated | Reference location list and one hospital page; contents invented. |
| patients-visitors.html, insurance-accepted.html | approximated | Reference page content not read in detail; accordion layout and plan search are inferred. |
| billing-help.html | approximated | Includes a Pay Your Bill anchor because the reference's utility "Pay Your Bill" link goes to the MyChart login. |
| institute-cancer.html, institute-heart.html | approximated | Two institute pages sharing one template. |
| specialties-services.html | approximated | Program list follows the Explore Services menu items; text filter is an addition. |
| classes-events.html | approximated | Reference page is 5 MB with generic title; listings and filters are inferred. |
| about.html, contact.html, legal.html | approximated | About sub-sections are anchors for the About menu items. Footer Privacy/Terms/Legal consolidated into one page. |
| portal-login.html | simulated | Reference links off-site to MyChart. Local labelled demo form. |
| 404.html | intentionally added | Required by RULES.md. |

## Components

- **Replicated (structure):** skip link, utility nav (Pay Your Bill, Donate, Contact Us, Find Care), four dropdown menus with the reference's item labels, thin footer (Privacy, Terms, Legal, phone), alert banner for the `emergency-announcement` component.
- **Simulated:** portal login, contact form, event registration, pay-bill.
- **Intentionally added:** provider-profile dialog, registration dialog, programs/insurance/events text filters, breadcrumbs, side navigation on patients & visitors pages, 404 and legal pages, accessibility-oriented error summaries.
- **Omitted:** `/patients-visitors/infection-prevention/`, the "On Demand" external link (replaced by a "Virtual Care Options" filter link, a deviation), the optional article page, any appointment-request form (reference has none in the observed HTML), Hoag logos, text and photography, the real ER text (unseen).
- **Unverified:** dropdown open/close behaviour, carousel controls (autoplay unknown; replica uses manual controls), mega-menu column layout, any visual styling, the content behind `/legal`.

## Rationale for material deviations

- No autoplay carousel: avoids a WCAG 2.2.2 pause requirement without extra controls.
- Provider profile as a dialog: the reference has no standalone profile URL.
- Fictional location names: the reference's Newport Beach/Irvine hospitals mapped to Harbor Point/Eastvale to avoid real place-and-brand mimicry.

## Research-relevant observations

- The reference uses Astro islands with generic page titles on several pages; the replica uses distinct titles on every page (an accessibility-positive deviation).
- Replica is a clean WCAG-oriented baseline: axe-core reported 0 violations, so a ceiling effect for repair studies is possible. No defects were injected.
