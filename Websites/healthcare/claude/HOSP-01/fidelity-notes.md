# Fidelity notes: HOSP-01 (Harborlight Health)

Source: https://www.ucsfhealth.org/ (see README for verification). Basis for all "observed" statements is the research inventory `Websites/pipelines/claude/research/HOSP.md` (curl + grep of server HTML on 2026-11-10). This run did not open the live site, so anything not listed there is **unverified**.

Legend: **R** replicated (observed in inventory), **A** approximated, **S** simulated, **I** intentional addition, **O** omitted, **U** unverified.

## Page mapping

| Local page | Source page | Status |
| --- | --- | --- |
| index.html | `/` | R sections and order from inventory (hero, "Great care starts here" with "I need / I need to / I need help with" cards, specialties, doctors, stories carousel with play/pause and prev/next, news cards, locations, "I want to..."). Hero heading and copy are original. |
| find-a-doctor.html | `/providers` | R typeahead search labeled "Search by specialty, name, condition". A filter facets, result cards and sort are **U** (not in static HTML) and were designed from category norms. |
| provider.html | `/providers/<letter>` pattern | A. Profile layout is inferred; no real profile was inspected. |
| locations.html | `/locations` | R page exists. A filters and cards (inferred). Map is an SVG placeholder. |
| medical-services.html | `/medical-services` | R page exists. I A-Z letter filter and text filter. |
| care.html | `/care` (+ `/care/conditions`, `/care/treatments`, `/care/medical-tests`) | A. Those pages had generic search titles and no readable content, so one tabbed page replaces them. |
| emergency-department.html | `/care/services/emergency-department` | R page exists. Body content is original and generic; no wait times (live status would be invented). |
| cancer-care.html | `/care/services/cancer` | R page exists. Body is original sample copy. |
| patients-visitors.html | `/patients-visitors` | R hub. Virtual Visits, Second Opinion and Refer a patient are separate pages/links on the source nav; here they are sections of this page (A). |
| request-appointment.html | `/patients-visitors/appointments` | R page exists. S form: fields, validation and success are inferred and simulated. |
| billing-insurance.html | `/patients-visitors/billing-insurance` | R page exists. I insurance plan checker (fictional plans). Online bill pay is a labeled demo notice, not a flow. |
| help-paying-your-bill.html | `.../help-paying-your-bill` | R page exists. I eligibility estimator with invented thresholds. |
| your-hospital-stay.html | `/patients-visitors/your-hospital-stay` | R page exists. I packing checklist. |
| mychart.html | `/mychart` | R page exists. S non-functional login with a labeled dialog for account help. Brand renamed "HarborChart". |
| about.html | `/about` | R page exists. Sections added so footer links (leadership, quality, accessibility, nondiscrimination, careers, giving, international, contact, research, education) land on real anchors. Copy states that those topics are not populated. |
| 404.html | source `/news` and one emergency path return 404 | A. Generic recovery page. |

## Component mapping

| Component | Source evidence | Status |
| --- | --- | --- |
| Skip link, logo, utility links (MyChart, Request appointment, Refer a patient, Search) | Observed | R (search is a disclosure panel; the source links to `/search` instead) |
| Primary nav: Care (with Conditions, Treatments, Medical Tests), Medical Services, Find a Doctor, Locations, Virtual Visits, Second Opinion, Clinical trials | Observed | R. "Clinical trials" is external on the source; here it goes to an `about.html` section. Dropdown and mobile menu behavior are A (only the Care submenu contents were observed). |
| Footer collapsible groups Quick links / More information / Research & education, back to top | Observed | R link labels. "Follow us" social links **O** (would need external links). |
| Carousel with play/pause and previous/next | Observed | R controls; slide content is original and fictional. |
| Typeahead on provider search | Observed (label only) | A. Suggestion behavior (doctors, specialties, conditions; combobox keyboard support) is implemented from ARIA practice. |
| Emergency notice bar above the header | Not observed | I category-typical addition. |
| Breadcrumbs, local nav on patients & visitors pages | Not observed | I/A structural aids required by the protocol. |

## Intentional additions (not observed on the source)

Emergency notice bar, A-Z service filter, insurance plan checker, financial assistance estimator, hospital stay packing checklist, doctor-profile template.

## Omitted

Real photos and video, "Follow us" social links, news archive (source `/news` is 404 in the inventory), clinical trial search, price transparency data, job listings, donation flow, real maps and directions, secure messaging, any live availability or wait times.

## Simulated

Appointment request, portal login and account-help dialog, insurance check, assistance estimate. None sends or stores data. Success states are labeled "Demonstration only".

## Research-relevant observations

- The source is large (300-700 KB pages) with a deep service tree; the replica keeps the top of that tree and uses small inline datasets.
- The source builds its search and filter results client-side, so those interactions were designed here without sight of the original behavior.
- Disclosure patterns (menu, search, footer groups, accordions) share one JS helper keyed on `aria-expanded` and `aria-controls`.
- Forms share one validation routine: inline `.field-error`, a focusable error summary, `aria-invalid` and `aria-describedby`.
