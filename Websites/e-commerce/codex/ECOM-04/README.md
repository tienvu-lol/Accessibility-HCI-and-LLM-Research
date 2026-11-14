# ECOM-04 — Fieldkind

Fictional single-brand footwear research replica inspired by Allbirds. Actual generation model: gpt-6.1-sol, OpenAI collaboration worker in Codex; exact version unknown. Local-only snapshot isolation; no publishing or transaction service.

Source availability verified 2026-11-12T00:52:36.949760+00:00 using live search/home text extraction and urllib HTTP GET; **no rendered source inspection**. Approval: metadata/change-log.md § 2026-11-12 — Codex Phase A approval (slots 04–06). Research provisional wording predates this later approval. Active allocation 01–06; 07–10 deferred.

## Sitemap and source mapping
- `index.html` ← https://www.allbirds.com/
- `mens.html` ← https://www.allbirds.com/collections/mens
- `tree-runner.html` ← https://www.allbirds.com/products/mens-tree-runner-nz-medium-grey
- `cart.html` ← https://www.allbirds.com/cart
- `search.html` ← https://www.allbirds.com/search?q=wool
- `returns.html` ← https://www.allbirds.com/pages/returns-exchanges
- `404.html`: required intentional local addition; no observed source 404 claimed.

Open `index.html` directly in a browser. All core links are relative and data is inline; no install, build, network or server required. `404.html` is a manual local page, not a file-server error interceptor.

## Samples and behaviors
Four fictional shoes with five distinct sample sizes (US men 8–12), four original shoe SVGs and four original editorial SVGs. Only Grove Runner has an approved product-detail page. Other product cards explicitly route to that mapped sample. Search matches name/material/color, size filter restricts supported demo sizes, and sort supports relevance/original order and ascending/descending price. Zero matches has a meaningful empty state; Reset clears controls. Product size selection is required before adding. Native details provide product/help disclosures. Header menu supports Escape and focus return on mobile.

Cart quantity (1–20), remove, subtotal and local persistence are **inferred simulations**, not observed source outcomes. Storage key `fieldkind-demo-bag-v1` contains only fictional product ID, size and quantity. The storage exception fallback retains data within the current page session; file:// storage can vary by browser/page, and cross-page persistence is not guaranteed. No real stock, orders, address, payment, account or personal data. The cart checkout explanation remains on the cart page. Newsletter is visibly unavailable and collects no email.

## Verification
Shared QC and source-level test evidence are retained in `pipelines/codex/runs/2026-11-13T21-01-55-869Z-build-ECOM-04`. See generation metadata for exact gates and handoff for outcomes. Source-level VM tests use an explicitly mocked DOM/storage and do not establish browser interaction/accessibility success. Rendered source fidelity, real browser keyboard/mobile/reflow, screen reader, zoom, and cross-page file storage remain unverified unless separately evidenced. No conformance claim.

Actual results: shared QC site run exited 2 because Chromium bootstrap MachPortRendezvous permission was denied; no axe/browser checks or QC JSON report were produced. No reinstall/bypass/retry. `qc-status.json` is an explicit blocked-status record, not a shared QC result. Separate source audit passed for 7 pages / 21 files; 16 actual-JS Node VM tests passed. Browser interaction and accessibility gates are not-tested. Initial output archive precedes corrections; corrections are recorded in generation metadata.
