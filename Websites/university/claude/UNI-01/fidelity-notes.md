# Fidelity notes – UNI-01 (Wren Hollow University)

Source: https://www.wisc.edu/ , verified 2026-11-10 by HTTP GET (curl) in the research inventory (`Websites/pipelines/claude/research/UNI.md`). Observations below come only from that inventory (HTML-level, not rendered). Terms: **replicated** = matches observed structure; **approximated** = same intent, different mechanism; **simulated** = front-end demo of an external flow; **added** = intentional addition not observed; **omitted**; **unverified**.

## Page mapping

| Local page | Reference | Status |
| --- | --- | --- |
| index.html | `/` | Replicated section order: hero (Visit/Apply) → Key next steps → Why choose → Trending on campus → research discoveries → public-service → “The Wren Way” → “one Wren can change the world” → college-town band → bottom search form. Copy is original. |
| academics.html | `/academics/` | Approximated (content inferred from page title only). |
| majors.html | `/academics/majors/` | Reference: short link page. Replica adds a **search/filter finder** (added). |
| program.html | – | Added (category-typical program detail). |
| admissions.html | `/admissions/` | Replicated: “Affording college”, promises, professional schools. Estimator **added/simulated**. |
| apply.html | `/admissions/apply/` | Steps and deadlines approximated; application-start form **simulated**. |
| visit.html | `/visit/` | Approximated; visit-request form **added/simulated**. |
| directory.html | `/directories/` | Approximated; the reference’s React LDAP lookup was not inspected (**unverified**). |
| research.html, student-life.html, athletics.html, about.html, facts.html | same paths | Approximated from page titles and nav labels only. |
| news.html | `news.wisc.edu`, `today.wisc.edu` | Reference pages are separate sites. Replica merges news and events into one **simulated** page. |
| search.html | `/search/` | Approximated with local data. |
| 404.html | – | Required by protocol. |
| (tuition) | `/admissions/tuition/` 404; bursar subdomain | Omitted as a page; folded into admissions. |

## Component mapping

| Component | Status | Notes |
| --- | --- | --- |
| Header search form (“Search People and Pages”, GET, `q`) | Replicated | Plus approximated look-ahead: the reference has a look-ahead container with `aria-controls`; the data source and keyboard model are unknown, so a link list with Arrow/Escape keys was built. |
| Main menu, 6 flat items | Replicated | The research found no dropdown markup, so none was added. Mobile disclosure is an approximation (reference responsive behavior unverified). |
| Utility menu (14 items) | Approximated | Reduced to MyWren, “Campus tools” disclosure (8 demo items), News, Events, Visit, Apply. External services are demo dialogs. |
| Hero with Visit and Apply buttons | Replicated | Original illustration. |
| Card grids for next steps, news, research | Replicated | |
| Footer: Popular / Resources / Quick links | Replicated | The group-to-link assignment is partly inferred in the research. Items without a local page are demo buttons. |
| Cookie-consent and site-alert scripts | Omitted | Not needed for the baseline; would add unrelated dialogs. |
| Google Tag Manager, CDN fonts, CloudFront | Omitted | Prohibited remote dependencies; system font stack used. |
| Local section nav (sidebar) | Added | Not observed in the reference. |
| Cost estimator, program finder/detail, application and visit forms | Added/simulated | Category-typical features; the reference lacks a real program finder. |

## Deviations and rationale

- Colors, typography and layout are original (maroon/gold on a neutral palette) to avoid copying brand identity.
- Facts, numbers, dates, names and people are invented; the school names, programs and promises are fictional analogues.
- `href="#"` is not used anywhere; dead-end links became demo buttons with an explicit notice.

## Research-relevant observations

- Dynamic regions (results lists, dialog, error messages) are JS-rendered, so accessibility tools see them only after interaction.
- Error summary is `role="alert"` and receives focus; inline errors are linked via `aria-describedby` and prefixed “Error:” in text, not color only.
- Look-ahead is intentionally not an ARIA combobox: a status region announces suggestion counts and the list contains ordinary links. This is a design choice worth comparing against a full combobox pattern.
- Not tested: screen readers, zoom, a full manual keyboard walkthrough (see README).
