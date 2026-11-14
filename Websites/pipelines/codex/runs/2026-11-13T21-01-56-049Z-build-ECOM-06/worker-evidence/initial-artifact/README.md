# ECOM-06 — Circuit Grove

Local static, fictional specialty electronics retailer inspired by the approved Adafruit Industries information architecture. Source: https://www.adafruit.com/ . Actual generation: gpt-6.1-sol collaboration worker; release version unknown. Active allocation 01–06; open-source 07–10 deferred.

## Source evidence

Verified 2026-11-12T00:52:39.545675+00:00 using live search/web text extraction of home and HTTP GET urllib page-scope checks. HTTP-only; no source rendering, keyboard or interaction execution. Evidence: `pipelines/codex/research/ECOM.md`, ECOM-06 block. Approval: Samhith Varma, 2026-11-12, `metadata/change-log.md` Codex Phase A approval. Earlier provisional notes in research are superseded by that approval and active-allocation amendment. No new source verification claimed.

## Run locally

Open index.html directly in a browser. Every page uses relative links, local SVG art and inline JavaScript data; no server, network, package installation or build is required. JavaScript enables search/filter, cart and mobile menu behavior. Static navigation and catalog remain visible without JavaScript.

## Complete sitemap / source map

- `index.html` → https://www.adafruit.com/
- `components.html` → https://www.adafruit.com/category/54
- `encoder.html` → https://www.adafruit.com/product/5001
- `cart.html` → https://www.adafruit.com/shopping_cart
- `search.html` → https://www.adafruit.com/?q=encoder
- `shipping-returns.html` → https://www.adafruit.com/shipping
- `404.html` → required local page recovery addition; actual guessed /returns returned 404 in research, but this is original recovery copy.

## Sample data and behavior

Eight fictional products, six demo-available and two preview-only; no live stock claims. Eight original product SVGs and one circuit illustration. One encoder detail page with original illustrative specifications; no generic size/color matrix. Other part cards add directly to the cart or search the sample catalog.

Search matches name, part ID and category; default best match favors name prefixes; most recent uses fictional ordinal values. Availability and price radios apply on explicit Apply filters. Reset restores all filter options, keeping the search phrase. Empty results explain recovery. Header search is a file-compatible GET form.

Encoder quantities accept whole values 1–99. Optional knob adds the same quantity atomically, with maximum checks for both items. Cart quantities accept 0–99; zero removes a part. Update quantities rejects fractional/invalid values before mutation; Empty cart removes all selections and coupon. BENCH10 applies a rounded 10% sample discount; blank coupon removes it. Unknown codes announce an error. Checkout explanation remains inside cart.html and collects no information. Product specs, shipping and returns are fictional explanations, not engineering or service commitments.

Local storage is justified solely to preserve nonpersonal demo product selections and coupon across file navigation. Reads/writes are caught; blocked storage uses temporary page memory with visible fallback notice and resets on navigation. File-origin storage behavior varies by browser. No accounts, payment/customer fields, actual transaction, wishlist service, external tutorial or distributor screen.

## Validation and limitations

See generation-metadata.json for the seven gates and this run's qc-summary.json, qc-initial.log, interaction-tests.json and static-tests.json. Shared QC is attempted once; browser launch blocked means axe and browser interactions are not-tested, never zero violations. Node VM tests execute actual JavaScript core and handlers with labeled DOM/storage mocks, not a real browser. Static source review checks mapped structure/instrumentation and links. Responsive CSS and focus styles are implemented, but rendered visual fidelity, keyboard interaction, mobile reflow, zoom, contrast audit and screen-reader checks remain not-tested. HTTP-only source evidence supports architecture, not pixel fidelity. No conformance claim.
