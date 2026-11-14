# WX-06 — Ridgecast

Weather / local TV weather or specialized forecast site — specialized mountain forecasts. Independent static replica with fictional branding, original text, local SVGs and sample data. No live API, forecast, warning, account, network runtime or operational claim.

## Run locally

Open `index.html` directly in an ordinary browser. Relative HTML/CSS/JS/SVG work through file:// without installation, compilation or server. Native content and navigation remain available without JS; enhanced controls state their fallback. No data is sent.

## Source and provenance

Approved source: https://www.mountain-forecast.com/. Verified at 2026-11-12T00:58:05.793873+00:00 by Live web search and web extracted-text opens/clicks; direct Python urllib HTTPS GET; HTTP-only, no browser/JS tests. This build relies on approved evidence, not new browsing. Source rendering, dynamic behavior and fresh-origin status were not reverified. Approved at 2026-11-12; record: `metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06)`. Detail: `Websites/pipelines/codex/research/WX.md` (WX-05 replacement addendum supersedes meteoblue).

Model assignment changed from gpt-6.1-sol to GPT-6/Codex under the interpretation of the user's instruction to proceed after the mismatch was disclosed; exact release/version unknown. Evidence: `Websites/pipelines/codex/research/evidence/weather-model-execution-2026-11-14.json`. No other model or human website edits. Serial single-session generation; separate per-site runs and QC. Original rows preserved in reassignment evidence.

## Complete sitemap and approved mapping

| Local file | Source |
|---|---|
| `index.html` | https://www.mountain-forecast.com/ |
| `summit-forecast.html` | https://www.mountain-forecast.com/peaks/Mount-Washington-2/forecasts/1917 |
| `mountain-info.html` | https://www.mountain-forecast.com/peaks/Mount-Washington-2 |
| `weather-map.html` | https://www.mountain-forecast.com/weather_maps/New-Hampshire |
| `404.html` | Intentional required local addition |

## Features and sample counts

Mountain search, three peak query contexts, three elevation samples, two three-day forecast ranges, C/F conversion, dense period matrix, native metric explanations, local section navigation, mountain profile/community note, two-scene gallery, map contours/road toggles and peak highlighting. No login/favorites or live conditions.

Three fictional peaks; three elevations × two ranges × nine periods per peak (54 calculated temperatures per peak, 162 across contexts); three SVGs including two gallery scenes; one fictional community note; one schematic region.

## Validation and limits

See QA.md for executed checks and actual outcomes. Markup/source review does not prove rendered behavior or compliance. Browser/axe, keyboard, screen reader, zoom, responsive layout and source fidelity are unverified unless actual evidence says otherwise. Weather, warnings and maps are fictional demonstrations and must not be used for planning. No fake news, operational weather or copied source media.

Run: `Websites/pipelines/codex/runs/2026-11-14T05-25-43-557Z-build-WX-06`. Includes task/protocol/source snapshots, actual timestamps, initial output, QC logs, source audit, complete ZIP and SHA-256 manifest.
