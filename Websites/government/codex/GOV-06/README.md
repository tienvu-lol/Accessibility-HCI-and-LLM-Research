# GOV-06 · Aster Environmental Agency

Fictional research demo inspired by the approved U.S. Environmental Protection Agency information architecture. Aster is an invented jurisdiction; this site has no governmental authority, operational services, emergency response, applications or message delivery. All prose and SVG artwork are original.

## Source and scope

Source: https://www.epa.gov/ . Verified 2026-11-12T00:55:55.417382+00:00 by live web search/open/click text extraction plus urllib HTTP GET (HTTP 200 for the five mapped pages). No rendered reference inspection or source interaction execution occurred. Source approval: Samhith Varma, 2026-11-12, `metadata/change-log.md` “Codex Phase A approval (slots 04–06)”; historical provisional wording in research notes is superseded by that approval and the active-allocation amendment. Active allocation is slots 01–06; open-source slots 07–10 remain deferred.

## Complete sitemap and source mapping

- `index.html` ← https://www.epa.gov/
- `topics.html` ← https://www.epa.gov/environmental-topics
- `about.html` ← https://www.epa.gov/aboutepa
- `news.html` ← https://www.epa.gov/newsreleases
- `contact-enforcement.html` ← https://www.epa.gov/enforcement/forms/contact-us-about-enforcement
- `404.html` — protocol-required local addition; missing-page HTTP heading evidence exists, rendered source layout unverified.

## Run locally

Open `index.html` directly in a browser, then use ordinary relative links. No server, build step, dependencies or network is required. JavaScript enables search, filters, disclosures, slideshow and form validation. No information is sent or stored; reloading clears entered values. The dedicated 404 is reached explicitly; file:// does not route missing paths automatically.

## Samples and interactions

- Five inline page search records; all entered words must match the title or keywords. Try “water”, “enforcement”, an empty query and “zzzz”. Results appear in the search drawer, with a status message.
- Three manual slideshow features. Previous and next wrap around. There is no auto-advance, pause control or motion timer.
- Eight environmental subject sections, three fictional regional offices, three sample headquarters offices, three home resource cards and three home news cards.
- Five fictional news releases across three subjects, three dates, three offices, three regions and two content languages. Go combines criteria; reset restores all. Language classifies release content and never translates the website. Try Air + Coast for an empty result.
- Three question topics. Optional email is checked if entered; topic and a 10–1000-character fictional question are required. Errors mark fields and focus the first invalid field; success focuses an explicit local-only confirmation. No question, incident or report reaches anyone.
- Menu and search drawers close each other. Escape closes an open drawer and restores its trigger. News/contact local navigation can also be collapsed. All use native buttons and normal document flow, not modal dialogs.

## Evaluation evidence

Run evidence: `pipelines/codex/runs/2026-11-13T21-27-01-485Z-build-GOV-06/` in the repository. Initial artifact and hashes are preserved before audit or corrective edits. See `validation.json`, `static-audit.json`, `interaction-tests.log`, `qc-initial.log` and `qc-attempt.json` which are included. Shared QC was attempted once without changing the tool and exited 2 because Chromium launch was blocked; no QC JSON was produced. Browser/axe/reflow status is not-tested. The separate static audit passed 1,115 checks and the actual JavaScript passed 67 labeled DOM-mock assertions. A test-only path error was retained and corrected before that passing run; no site-code repair occurred. Exact gate status is in generation-metadata.json.

## Limits

Layout, spacing and responsive behavior approximate extracted structure; no pixel-fidelity claim. No official seals, real officials, testimonials, real addresses or operational notices. No reporting portal, calendar, translation widget, third-party search, live careers/grants or social network integration. Footer Follow routes to local news. Source snippets differed in freshness; all dates/content here are fictional samples. Native browser, screen reader, zoom, rendered focus/contrast, responsive and reference-fidelity inspection require further testing. WCAG 2.2 AA is an implementation target, not a conformance claim.
