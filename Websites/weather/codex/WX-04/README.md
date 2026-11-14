# WX-04 — Northlight Weather

Weather / national meteorological service. Independent static replica with fictional branding, original text, local SVGs and sample data. No live API, forecast, warning, account, network runtime or operational claim.

## Run locally

Open `index.html` directly in an ordinary browser. Relative HTML/CSS/JS/SVG work through file:// without installation, compilation or server. Native content and navigation remain available without JS; enhanced controls state their fallback. No data is sent.

## Source and provenance

Approved source: https://www.metoffice.gov.uk/. Verified at 2026-11-12T00:58:05.656483+00:00 by Live web search and web extracted-text opens/clicks; direct Python urllib HTTPS GET; HTTP-only, no browser/JS tests. This build relies on approved evidence, not new browsing. Source rendering, dynamic behavior and fresh-origin status were not reverified. Approved at 2026-11-12; record: `metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)`. Detail: `Websites/pipelines/codex/research/WX.md` (WX-05 replacement addendum supersedes meteoblue).

Model assignment changed from gpt-6.1-sol to GPT-6/Codex under the interpretation of the user's instruction to proceed after the mismatch was disclosed; exact release/version unknown. Evidence: `Websites/pipelines/codex/research/evidence/weather-model-execution-2026-11-14.json`. No other model or human website edits. Serial single-session generation; separate per-site runs and QC. Original rows preserved in reassignment evidence.

## Complete sitemap and approved mapping

| Local file | Source |
|---|---|
| `index.html` | https://www.metoffice.gov.uk/ |
| `london.html` | https://weather.metoffice.gov.uk/forecast/gcpvj0u3w |
| `warnings.html` | https://weather.metoffice.gov.uk/warnings-and-advice/uk-warnings |
| `radar.html` | https://weather.metoffice.gov.uk/maps-and-charts/rainfall-radar-forecast-map |
| `about.html` | https://www.metoffice.gov.uk/about-us |
| `404.html` | Intentional required local addition |

## Features and sample counts

Local place search with success/empty/blank states; five forecast-day buttons and hourly table; native metric explanations; warning-day radios with warning and empty-day states; manual six-frame fictional radar with layer visibility; shared mobile navigation and Escape focus return. No F/C conversion added because it was not observed for this source. Subscription is visibly a nonfunctional demonstration, not a signup.

Three places, five forecast days × four hourly periods per place (60 calculated sample rows), three warning records across five days, six schematic frames, two original SVGs.

## Validation and limits

See QA.md for executed checks and actual outcomes. Markup/source review does not prove rendered behavior or compliance. Browser/axe, keyboard, screen reader, zoom, responsive layout and source fidelity are unverified unless actual evidence says otherwise. Weather, warnings and maps are fictional demonstrations and must not be used for planning. No fake news, operational weather or copied source media.

Run: `Websites/pipelines/codex/runs/2026-11-14T05-25-43-413Z-build-WX-04`. Includes task/protocol/source snapshots, actual timestamps, initial output, QC logs, source audit, complete ZIP and SHA-256 manifest.
