# WX-05 — Daymark Weather

Weather / commercial weather portal. Independent static replica with fictional branding, original text, local SVGs and sample data. No live API, forecast, warning, account, network runtime or operational claim.

## Run locally

Open `index.html` directly in an ordinary browser. Relative HTML/CSS/JS/SVG work through file:// without installation, compilation or server. Native content and navigation remain available without JS; enhanced controls state their fallback. No data is sent.

## Source and provenance

Approved source: https://www.timeanddate.com/weather/. Verified at 2026-11-13 by Connected web search and page-open text retrieval; accepted by project lead with disclosed cache/origin/browser limitations. This build relies on approved evidence, not new browsing. Source rendering, dynamic behavior and fresh-origin status were not reverified. Approved at 2026-11-13T00:11:23.688078+00:00; record: `pipelines/codex/research/evidence/replacement-approval-2026-11-13.json`. Detail: `Websites/pipelines/codex/research/WX.md` (WX-05 replacement addendum supersedes meteoblue).

Model assignment changed from gpt-6.1-sol to GPT-6/Codex under the interpretation of the user's instruction to proceed after the mismatch was disclosed; exact release/version unknown. Evidence: `Websites/pipelines/codex/research/evidence/weather-model-execution-2026-11-14.json`. No other model or human website edits. Serial single-session generation; separate per-site runs and QC. Original rows preserved in reassignment evidence.

## Complete sitemap and approved mapping

| Local file | Source |
|---|---|
| `index.html` | https://www.timeanddate.com/weather/ |
| `location.html` | https://www.timeanddate.com/weather/usa/new-york |
| `hourly.html` | https://www.timeanddate.com/weather/usa/new-york/hourly |
| `extended.html` | https://www.timeanddate.com/weather/usa/new-york/ext |
| `help.html` | https://www.timeanddate.com/weather/ext-help.html |
| `404.html` | Intentional required local addition |

## Features and sample counts

Four-city search with blank/empty/results feedback; city query IDs carry to separate hourly/extended pages; C/F selector updates displayed sample temperatures; three-day hourly selector; fourteen-row extended table; help accordions; mobile navigation with Escape/focus return. No radar or new about page. No live account, ads, notifications or API.

Four fictional cities; three hourly sample days × four periods per city (48 calculated rows); fourteen extended rows per city context (56 calculated rows); one local original SVG.

## Validation and limits

See QA.md for executed checks and actual outcomes. Markup/source review does not prove rendered behavior or compliance. Browser/axe, keyboard, screen reader, zoom, responsive layout and source fidelity are unverified unless actual evidence says otherwise. Weather, warnings and maps are fictional demonstrations and must not be used for planning. No fake news, operational weather or copied source media.

Run: `Websites/pipelines/codex/runs/2026-11-14T05-25-43-487Z-build-WX-05`. Includes task/protocol/source snapshots, actual timestamps, initial output, QC logs, source audit, complete ZIP and SHA-256 manifest.
