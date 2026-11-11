# Fidelity notes — CHUR-01 (Harbor Ridge Church replica of https://saddleback.com/)

Source facts below come only from the 2026-11-10 research record (`Websites/pipelines/claude/research/CHUR.md`). I did not re-crawl the source in this run, and I make no claim of pixel fidelity.

## Page and component mapping

| Area | Source (research record) | Replica | Status |
| --- | --- | --- | --- |
| Header | Logo, top nav (Locations, Watch, About, Care, Giving), My Dashboard, Sign In, watch-now link, language dropdown | `site-header` with utility bar (language menu, Sign in, Watch now), brand, five primary links | **Replicated** (structure). "My Dashboard" **omitted**. |
| Sign In | Umbraco members sign-in form | Native `<dialog>` with email/password form | **Simulated** (no accounts). |
| Language dropdown | English, Español, Filipino, 简体中文, 繁體中文 | Same five options in a disclosure menu | **Simulated**: only a notice is shown; no translated pages. |
| Big nav menu | Groups: Get involved, Care, Growth, More | `mega-menu` with the same four group names; items adapted to local pages | **Approximated**. Source items without a local page (Activate, Kids, Students, Parents, Stronger Homes, Stories, Internships, Apps) are **omitted** or merged (Apps → home `#app`). |
| Mobile navigation | Not inspected | "Menu" disclosure holding links and the expanded groups | **Intentionally added** pattern. |
| Home | First-step block, Locations, Your First Step Starts Here, The App, Stay Connected | Hero, Our campuses, Your first step, App, Stay connected (same order) | **Replicated** (order); hero copy invented. Unrendered `{{item.header}}` placeholders seen on the source were **not** reproduced. |
| Locations | Campus list (details not inspected) | Filterable campus cards (name/city search, feature select) | **Approximated**; feature filter is an **addition**. |
| Watch | "Watch Saddleback Online"; archive search not checked | Poster placeholder, online times, message archive with search, series, topic, sort | Online block **approximated**; archive and filters **inferred / added**. No media. |
| About | About Us (content not inspected) | Story, beliefs accordion, leadership cards, stories | **Approximated**; all text invented; staff are fictional. |
| Care | Care hub | Four-card hub (Prayer, Recovery, Counseling, Support groups) matching the source's Care menu group | **Approximated**. Counseling and Support groups point to the contact form / filtered groups. |
| Giving | Campus `<select>` with per-campus giving popups; third-party flow | Campus select, fund, amount, frequency, email, demo result | **Simulated**. Per-campus popups **omitted**. No payment fields. |
| Events | Search input, Filters panel with Campus select, hidden date inputs | Search, campus, category, "On or after" date | **Replicated** (search, campus) and **approximated** (date inputs made visible); category is an **addition**. |
| Small groups | Page exists; finder inferred | Search, type, day, campus filters | **Inferred**. |
| Serve | Page exists | Search, area, campus filters | **Inferred**. |
| Prayer | Custom dropdown `#customPrayerDropdown` and a "Prayer Requests" section | Request form with native select, textarea, radios | **Approximated**: native controls instead of a custom dropdown; form interior was not inspected, so **unverified**. |
| Celebrate Recovery | Page exists | Overview, accordion, meeting table by campus | **Approximated**; curriculum text is original and generic, not the real program's. |
| Podcasts | Page exists (nav URL redirected to `/pursue-growth/`) | Show cards with `<details>` episode lists | **Approximated**; no audio. |
| Contact | Page exists | Contact form with topic prefill | **Approximated**. |
| Careers | Page exists | Filterable sample postings | **Approximated**; postings are invented and not real jobs. |
| Footer | Social links, locations link, Privacy Policy, Terms of Use | Grouped link columns, legal links | **Approximated**. Social links **omitted** (no accounts). Legal pages consolidated into `legal.html` (**intentional deviation**). |
| 404 | not applicable | `404.html` with routes back | **Added** (required by RULES.md). |

## Rationale for material deviations

- Legal: one short page instead of two to stay within the 8–15 reference-page budget.
- Sign-in, giving, forms: RULES.md section 5 requires simulation-only for external-service flows.
- Messages and events data are invented sample records; none are real sermons, speakers, or dates.
- Interior-page content for Watch, Prayer, Locations, and About was not inspected during research, so those layouts follow common church-site patterns rather than observed structure.

## Research-relevant observations

- The source stack (jQuery, Vue, Umbraco forms) was not reproduced; the same behaviors use native `<dialog>`, `<details>`, and one vanilla JS file.
- Interaction density is high: one global dialog, three disclosure menus, six filter forms, five validated forms. All forms share one validation routine with an error summary that receives focus.
- A defect found and fixed during development: the results list was re-rendered on the `change` event, which fired on blur and swallowed the first click on the empty-state "Clear filters" button. It now re-renders on `input` only.

## Unverified

- Everything about the source beyond the 2026-11-10 research record, including whether any of the observed behaviors have changed since.
