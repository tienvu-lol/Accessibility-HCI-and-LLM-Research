# HOSP-03 fidelity notes

Source: https://www.chop.edu/ (children's hospital). All source facts below come from the Phase A research block in `Websites/pipelines/claude/research/HOSP.md`, which fetched static HTML with curl on 2026-11-10. Rendered/JavaScript behaviour, open menu states and page layout were **not observed** by me; anything about them is inferred or invented and labeled so. Nothing was visited in a browser during this run.

## Page and region mapping

| Local page | Status | Notes |
| --- | --- | --- |
| `index.html` | replicated (structure), approximated (content) | Observed: visually hidden h1 "Welcome", h2 hero line, sections "Find care you can count on", "Explore care options", "Best in nation year after year", global alert block. Replicated: hidden h1, hero h2, same three section slots in order, alert region. Approximated: hero copy and card text are original. The recognition section is replaced by clearly labeled **sample figures** because real awards cannot be invented. The finder as a tabbed widget is **inferred**; the source markup of the finder was not read. An emergency-notice band is an **intentional addition**. |
| `doctors.html` | approximated | Source `/doctors` has search inputs whose filter facets are likely JS-rendered (inferred). Local: form with name, specialty, location plus specialty chips. |
| `doctor-search.html` | approximated / simulated | Source URL pattern `?filter=provider.specialties.name:Cardiology` observed; local uses `?specialty=Cardiology`. Filter set (language, accepting new patients, video visits, sort, paging) is **inferred / intentionally added** per category brief. |
| `provider.html` | approximated | One profile page driven by `?id=`; source has one URL per doctor. Profile content is invented; source profile contents were not read. |
| `locations.html` | approximated | Source groups: Primary, Specialty, Emergency, Urgent, Inpatient, Community Hospital Affiliates (nav). Local keeps the first five as a type filter; affiliates omitted. Map is a placeholder image (**intentional addition** of a placeholder only). |
| `emergency-care.html` | approximated | Source ER notice text was not seen (research limitation). Local copy is original and includes a 911 notice. |
| `specialties.html`, `conditions.html` | approximated | Source search pages exist; A-Z letter buttons are **inferred** and added for keyboard/filter coverage. Source titles/lists not read (570 KB page). |
| `condition-asthma.html` | approximated | Source page title "Asthma in children". Section structure and copy are original; FAQ accordion is an addition. |
| `get-care.html` | approximated | Source "Get Care at CHOP" content not read. Cards mirror the Get Care mega-menu entries; comparison table is an **intentional addition**. |
| `appointment-scheduling.html` | simulated | Source page exists; its content/form not inspected. Local form is a demo (**inferred** fields). |
| `patients-and-families.html` | approximated | Source nav lists resources, caring for your child, medical records, inpatient stays, health forms; these became anchored sections with an "On this page" aside (aside is an addition). |
| `billing-and-insurance.html` | approximated | Nav lists pay a bill, accepted insurance plans, cost estimate. Insurance plan search over 8 invented plans is an **intentional addition**. The reference's cost-estimate request form is omitted. |
| `online-bill-pay.html` | simulated | Source page exists; local is a labeled non-functional demo. |
| `portal-login.html` | intentionally added | Source "MyCHOP Portal" link goes off-site to an external login. Local demo page stands in so the link is not dead. |
| `404.html` | added | Required by RULES.md. Source `/specialties/cardiology` returned 404 in research; no relation to the local 404 copy. |

## Components

- **Header**: replicated utility row, primary nav and "Get Care" mega-menu structure as observed in the research (care options group and locations group), plus Patients & Families and Billing & Insurance groups, with Locations and Specialties as direct links. Menu items that have no local page were omitted (symptom checker, second opinion, Healthcare Professionals, research studies, Family Health Coverage Program, clinical pathways). Desktop panels open on click, not hover (the source's open state was not observed). Mobile disclosure is **inferred**.
- **Utility links**: source has Research, Careers, International, Donate Now, MyCHOP Portal and a "Go to CHOP.edu" link; local keeps only the portal (as demo) and adds Find a doctor, Emergency care and Pay a bill (additions).
- **Footer**: groups Get care and Patients & families mirror the source's groups; About CHOP, Healthcare Providers, Ways to Give, newsletters and social links are omitted. Source phone numbers are replaced by invented 555-01xx numbers. The multilingual block is **simulated** as a button + dialog stating translations are not included.
- **Global alert block**: source block present, text not seen; local text is original and says no real alerts are shown.
- **Forms**: all simulated; validation messages and error summary patterns are chosen for the study baseline, not copied from the source.

## Deviations with rationale

- Per-doctor URLs collapse into one `provider.html?id=` to keep the file count small.
- Query-string state works on `file://` but `history.replaceState` rewrites the URL query only.
- Sample data (14 / 9 / 16 / 20 / 8) is intentionally small; four specialties (Ophthalmology, Sleep Medicine, Surgery, Urology) have no doctors to demonstrate the empty state.

## Research-relevant observations

- Reference complexity is high (large nav, many content types); the replica covers the navigation depth with 5 top-level items and one mega-menu, and the search/filter interactions with client-side lists, so dropdown, tab, dialog, accordion, filter and form patterns are all present for evaluation.
- Interactive custom widgets (mega-menu, tabs, dialog, filters with live regions) are the likely places for accessibility differences between replicas.
- Validation errors appear only after submit (not on blur) because blur-time error insertion shifted the submit button during a scripted click in testing.
- axe-core cannot judge the quality of focus order, live-region wording or reading order; those are untested.
