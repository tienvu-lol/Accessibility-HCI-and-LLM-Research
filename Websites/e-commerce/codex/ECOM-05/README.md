# ECOM-05 — Hearth & Field
Fictional multi-category home-goods retailer inspired by World Market's approved information architecture. Open index.html directly; all core links and data work locally. No installation or server required.

## Source and scope
Source: https://www.worldmarket.com/. Verified 2026-11-12T00:52:37.323742+00:00 by Live search + web text extraction of home; HTTP GET urllib for page scope; HTTP-only, no rendering/JS. Verification established HTTP/text evidence, not rendered appearance or behavior. Approved 2026-11-12 by Samhith Varma, metadata/change-log.md Phase A approval slots 04–06. Active allocation 01–06; 07–10 deferred. No new live source inspection performed during generation.

## Complete page mapping
- `index.html` → https://www.worldmarket.com/
- `furniture.html` → https://www.worldmarket.com/c/furniture/
- `chairs.html` → https://www.worldmarket.com/c/furniture/living-room-furniture/chairs/
- `sophie-chair.html` → https://www.worldmarket.com/p/sophie-upholstered-swivel-chair-112628.html
- `cart.html` → https://www.worldmarket.com/cart
- `search.html` → https://www.worldmarket.com/search?q=chair
- `returns.html` → https://www.worldmarket.com/customer-service/return-policy.html
- `404.html` → required local fallback (intentional addition).

## Dataset and behavior
Ten fictional products: four chairs, six cross-department sample finds. Only Marlow has an approved-map detail route (sophie-chair.html). Four product colors and two fictional stores. Department links route to category sections or useful local searches. Search matches product name/type/color; color and price filters combine; sorting changes price order. Native accordions reveal help/product copy. Mobile navigation supports Escape; store dialog uses native modal focus management and returns focus to its opener. Store search matches city/ZIP and selection updates the header for this page only; no location is transmitted or persisted.

Color selection changes illustration/name. Add-to-bag, quantity 1–20, removal, subtotal, localStorage and persistence are **inferred local simulations**, not verified source behavior. Storage key hf-demo-cart contains only sanitized product/color/quantity records. Storage errors fall back to in-page memory and announce the limitation when saving. No payment/address/customer fields, checkout, accounts or rewards screens. No stock assertions or real transactions.

## Validation
Eight HTML pages, common CSS/JS and five original SVG assets. Source audit checks page map, local references, one H1, meaningful-region instrumentation and explicit button types. Actual JS pure-function tests exercise search/filter/sort/color/cart validation/math; these are Node tests, not browser interaction tests. Shared QC evidence lives in pipelines/codex/runs/2026-11-13T21-01-55-959Z-build-ECOM-05. Browser/axe execution may be blocked by host permission; see qc.log and validation.json for actual result. No accessibility conformance claim. Keyboard, screen reader, zoom, responsive visual rendering and source fidelity remain not-tested in a browser.

Final outcome: shared QC exited 2 during Chromium launch (host permission block), so no axe/runtime score exists. Ten Node JS tests passed, including explicitly mocked real color/add/menu/dialog/storage-fallback handlers. Full browser interaction and accessibility gates are not-tested. No browser installation or permission bypass attempted. First output is retained in the run evidence; no site code repairs followed it. Test-harness path was corrected once.
