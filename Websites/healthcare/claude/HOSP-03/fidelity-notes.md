# HOSP-03 fidelity notes

Replica: **Larkspur Children's Hospital** (fictional). Reference: Children's Hospital of Philadelphia, https://www.chop.edu/ (verified 2026-11-10 by HTTP GET via curl; approved 2026-11-13; stratum: children's hospital). Research block: `Websites/pipelines/claude/research/HOSP.md`, `### HOSP-03`.

Basis: the replica is built from the research block only. I did not re-fetch the reference during this run, so nothing here claims anything newer than that block.

## Facets and result data were not observed
The research block records that the `/doctors` filter facets and result lists were **not present in the static HTML and could not be read**. The facets here (name/keyword, specialty, location, language, accepting new patients, sort) and all provider, location, specialty and condition data are **my own invention** over an inline dataset (24 providers, 10 locations, 14 specialties, 16 topic names). They do not reflect the reference's real facets or results.

## Page mapping
| Reference page | Local page | Status |
|---|---|---|
| `/` Welcome | `index.html` | replicated structure: alert block, hidden h1 "Welcome" plus visible h2 tagline, "Find care you can count on", "Explore care options", "Best in nation year after year" bands, footer. Tagline and all copy are original. |
| `/doctors` | `find-a-doctor.html` | approximated (search form content inferred) |
| `/doctors/search?filter=...Cardiology` | `doctor-search.html?specialty=Cardiology` | approximated; the filter-by-query-parameter pattern is replicated, facets invented |
| `/doctors/dori-yoav` | `doctor-profile.html?id=d01` | approximated; one template driven by inline data, invented provider |
| `/locations` | `locations.html` | approximated; type filter mirrors the Locations group in the nav |
| `/emergency-care-locations` | `emergency-care.html` | approximated; emergency notice plus filtered sites |
| `/specialties` | `specialties.html` | approximated; short searchable list |
| `/conditions-diseases` | `conditions.html` | approximated; names only |
| `/conditions-diseases/asthma` | `condition-detail.html` | approximated; **deliberately contains no clinical content** (paediatric medical-content guardrail) |
| `/get-care` | `get-care.html` | approximated |
| `/appointment-scheduling` | `appointments.html` | simulated form; content not inspected in the reference (inferred) |
| `/patients-and-families` | `patients-families.html` | approximated, placeholder prose |
| `/billing-and-insurance` | `billing-insurance.html` | approximated, placeholder prose |
| `/billing-and-insurance/online-bill-pay` | `online-bill-pay.html` | simulated, no payment |
| (none) | `404.html` | required by protocol |

14 content pages plus 404 (15 HTML files).

## Navigation
Replicated: Get care mega-menu (care options plus a Locations group with Primary, Specialty, Emergency, Urgent, Inpatient, Affiliates), Patients & families group, Billing & insurance group, primary links Locations and Specialties, utility Portal control, multi-group footer, "Sign up for newsletters", language-assistance block. Mobile uses a menu disclosure button; mega panels become stacked accordions-style panels.

### Pruned reference targets (not rebuilt, therefore not linked)
Per the fixed convention for the round, no stand-in or catch-all page exists. Pruned: "Go to CHOP.edu" link; utility links Research, Careers, International, Donate Now; Symptom Checker; Get a second opinion; Healthcare Professionals group (Continuing Education, events, Clinical Pathways, referral forms); Patients & Families sub-items for caring for your child, medical records, research studies, inpatient stays by campus, health forms; Family Health Coverage Program, accepted insurance plans, cost estimate; footer About group (Careers, mission, Innovation, Newsroom), Price transparency, surprise-billing rights, Ways to Give, Healthcare Providers, social links ("Join the conversation"), and the translated-language links. Optional reference pages `/symptom-checker` (excluded also by the clinical-content guardrail), `/second-opinions`, cost estimate, medical records, about, newsroom were not rebuilt.

## Intentional additions / approximations
- Patient portal: the reference links out to an external MyChart login. Locally it is a **clearly labeled non-functional demo dialog** (native `<dialog>`), because external targets cannot exist offline.
- Language assistance: shown as plain text names (not links) with an explanation, since translated pages do not exist.
- Footer newsletter form: simulated, labeled demo.
- Footer phone numbers use invented 555 numbers; the reference's real numbers are not reproduced.
- "Related" side boxes on detail pages are my addition for local navigation; sidebars on those reference pages were not observed.
- Breadcrumbs on interior pages: breadcrumb presence in the reference was not observed; added for the usability baseline.

## Not observed / unverified
Rendered and JavaScript behaviour of the reference, open state of its dropdowns, its accessibility, its real facets and results, the appointment and symptom-checker behaviour, and robots/terms permissions for replication (also flagged in the research block).

## Content safeguards
Fictional names, no real logos, seals or prose; abstract non-figurative SVG imagery only (no children depicted); no clinical guidance; the emergency notice only says to call local emergency services; all phone numbers use 555 exchanges; condition names are topic labels only.

## Research-relevant observations
- Doctor search data is rendered client-side by JS, mirroring the research block's inference that the reference's facets are JS-rendered; with JS disabled the result areas show a noscript note.
- The Escape key closes menus and the dialog and returns focus to the invoking control.
