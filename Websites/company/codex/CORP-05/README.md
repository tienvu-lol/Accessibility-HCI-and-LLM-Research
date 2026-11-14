# CORP-05 — Alder Community Credit Union

Independent local static research replica in the company / regional credit-union stratum. Fictional brand, original prose and two original local SVG illustrations. Inspired by BECU; no affiliation.

## Source and approval

Approved source: https://www.becu.org/ . Availability verified 2026-11-12T00:52:00.021127+00:00 through Python urllib GET with redirects plus live search/text extraction. These are availability/text observations, not browser verification. Evidence: `pipelines/codex/research/CORP.md` and `pipelines/codex/research/evidence/CORP-http-2026-11-12.json`. Samhith Varma approved verified Codex sources on 2026-11-12 in `metadata/change-log.md`, “Codex Phase A approval (slots 04–06)”. Earlier provisional language in research notes is historical. Active allocation 01–06; 07–10 deferred.

## Run

Open `index.html` directly in a modern browser. Relative links, inline location data, CSS and JS require no server, build, dependency, account or network. Sign-in displays a notice only. No data is submitted, persisted or collected.

## Complete sitemap and mapping

- `index.html` ← https://www.becu.org/
- `everyday-banking.html` ← https://www.becu.org/everyday-banking
- `checking.html` ← https://www.becu.org/everyday-banking/checking
- `rates.html` ← https://www.becu.org/rates
- `help.html` ← https://www.becu.org/support/top-questions
- `contact.html` ← https://www.becu.org/support/contact-us
- `locations.html` ← https://www.becu.org/locations/all-locations
- `about.html` ← https://www.becu.org/about-us/home
- `404.html` — protocol-required local recovery page (source arbitrary missing path returned 404).

## Features and datasets

Eight source-mapped pages plus 404. Shared repeated header/utility/primary navigation, breadcrumbs, community/help/footer bands, banking hub, checking benefits and membership explanation, grouped rate guide, support disclosures, contact-channel guide, fictional directory and about story. Two original SVGs. Three inline fictional locations; eight rate-product descriptions across four category groups; no customer records. Checking FAQ: four disclosures; support: three; contact: three.

Menu has mobile disclosure and Escape focus return. Native disclosures use browser keyboard behavior. Sign-in opens a modal notice with native modal focus containment, Escape dismissal and opener focus return. Location search matches names, services, hours and neighborhoods, announces counts/empty results, and resets. No sensitive fields. Contact is informational: no inquiry form was observed, so none is added. Membership/account opening, messaging, video banking and appointment booking are explicitly unavailable.

The rates page preserves the grouped category hub; no numeric rates or tables are included because tables were not observed. Locator filter behavior is inferred, not claimed as a live-source reproduction. No calculator or unsupported account screens.

## Validation and limits

See `generation-metadata.json` and the run evidence at `pipelines/codex/runs/2026-11-13T15-55-36-598Z-build-CORP-05/`. Shared QC was attempted once and exited 2: Chromium launch failed with permission errors (EPERM/SIGTRAP). No shared JSON report was emitted and axe/browser scans did not run; `qc-initial.log` and the explicitly separate `qc-outcome.json` retain evidence. Separate source checks passed (9 pages, 17 files, 199 instrumented instances), as did seven actual exported-filter cases and six mocked event-handler scenarios. The mock DOM tests do not establish browser interaction correctness. No screen-reader, real keyboard/browser, zoom, responsive visual, contrast audit or rendered fidelity verification is claimed. Initial output is preserved in `initial-artifact.tar.gz`; a same-worker correction removed out-of-scope numeric rates before validation. WCAG 2.2 AA is a target, not a conformance claim.
