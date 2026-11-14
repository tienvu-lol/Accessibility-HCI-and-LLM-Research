# ECOM — Phase A source research (Codex slots 04–06)

Status: **provisional proposals; coordination and complete ten-source approval pending. No implementation authorized.**

Read Rules.md and MODEL_ALLOCATION.md in full, plus the central inventory README. Scope is e-commerce: one single-brand DTC store, one multi-category retailer and one specialty retailer. External-group strata remain proposals, not instructions to change their scope. Only Codex rows are populated; approval cells remain empty. Exact intended generator/version/runtime/operator remain TBD; this research session identifies itself as Codex, but an exact deployed model/version is not exposed as reliable project metadata.

## Coordination dependency

Central CSV initially contained ten empty source records. `pipelines/claude/research/ECOM.md` names Glossier, IKEA USA and Orvis, with HTTP-only claims dated 2026-11-10. Treat those URLs as unavailable to Codex while awaiting coordinator reservation; their records have not been imported or independently approved. `metadata/assignments.csv` labels those Claude slots generating but contains no source URLs or approvals; status alone is not approval. No open-source research reservation was located in the inspected records. Coordinator was asked in this session to reserve the three Claude URLs centrally and disclose open-source reservations **before final Codex selection**. No confirmation received at writing; these three Codex candidates are provisional and must be checked against any undisclosed reservations.

## Method and durable evidence

Actual attempts: **2026-11-12 UTC (2026-11-11 America/New_York)**, not the task preparation date by assumption. Live web search was used for Allbirds men's wool shoes, World Market furniture/returns and Adafruit components; official result URLs included https://www.allbirds.com/collections/mens?material=wool, https://www.worldmarket.com/customer-service/return-policy.html and https://www.adafruit.com/category/54. Search index freshness is not availability proof. Web open extracted the three canonical homepages; it did not render or exercise them.

Primary evidence: [HTTP observation log](evidence/ECOM-http-2026-11-12.json), containing per-request timestamps, requested/final URLs, status, title, limited headings/landmark/control/input summaries and stack strings. Evidence intentionally omits response tokens and full proprietary page bodies. HTTP GET via Python urllib, User-Agent Mozilla/5.0, redirects followed, no JavaScript or browser session. Third-party text was treated as untrusted reference data. A successful 200 plus recognizable source content supports `verified` **availability only**. It does not verify rendering or behavior. All interaction evidence below means markup was observed; behavior outcomes remain untested unless explicitly stated. No browser interaction verification was performed.

## Proposed three-source scope

| ID | Organization / canonical homepage | Assigned stratum | Complexity | Proposal |
|---|---|---|---|---|
| ECOM-04 | Allbirds — https://www.allbirds.com/ | single-brand direct-to-consumer store | medium | Provisional; 6 mapped pages; approval pending |
| ECOM-05 | World Market — https://www.worldmarket.com/ | multi-category retailer | high | Provisional; 7 mapped pages; approval pending |
| ECOM-06 | Adafruit Industries — https://www.adafruit.com/ | specialty retailer | medium | Provisional; 6 mapped pages; approval pending |

Page counts follow the inspected source branch, not a quota. Proposed `404.html` is a required local addition for all three; only Adafruit's actual 404 was inspected. Demo checkout is **not in source_pages**: no checkout page was fetched, and no validation was observed. If later requested for evaluation, `checkout.html` must be explicitly approved as an intentional simulated addition, with fictional data and no payment/account/shipping service. No persistent browser storage is justified by this inspection; any later use needs explicit documentation. No real transaction, login, return or newsletter submission was attempted.

## ECOM-04 — Allbirds

- Source ID: ECOM-04; category: e-commerce; subcategory/stratum: **single-brand direct-to-consumer store**.
- Canonical organization homepage: https://www.allbirds.com/
- Verification: 2026-11-12T00:52:36.949760+00:00; HTTP-only availability verified. All mapped URLs returned 200; detailed per-URL evidence below and in the shared log under source_id `ECOM-04`. Rendered/interaction verification: **UNVERIFIED / not tested**.
- Complexity: **medium** — Gender/category navigation, merchandise bands, size-dependent product purchase controls, filtered search and cart drawer; narrower merchandise domain than the multi-category retailer.
- Stack clues: Shopify and cdn/shop strings; v-model and @change template attributes suggest reactive client rendering (framework/runtime not confirmed). jquery/bootstrap strings alone do not establish active dependencies.

### Source-to-local page map and status/title evidence

| Attempted URL | HTTP | Response title | Proposed local file |
|---|---|---|---|
| https://www.allbirds.com/ | 200 | Allbirds: Comfortable, Sustainable Shoes & Apparel | index.html |
| https://www.allbirds.com/collections/mens | 200 | Allbirds: Sustainable Men’s Shoes, Wear-All-Day Comfort | mens.html |
| https://www.allbirds.com/products/mens-tree-runner-nz-medium-grey | 200 | Men's Tree Runner NZ - Everyday Sneakers | Allbirds | tree-runner.html |
| https://www.allbirds.com/cart | 200 | (empty title) | cart.html |
| https://www.allbirds.com/search?q=wool | 200 | Search - Allbirds | search.html |
| https://www.allbirds.com/pages/returns-exchanges | 200 | Returns & Exchanges | 30-Day Return Policy | Allbirds | returns.html |

### Key regions (HTTP markup)

- Header with men/women navigation and search entry
- Home promotional hero followed by new-arrival, gender, best-seller and material/weather merchandising bands
- Collection and search product cards with size-related controls
- Product gallery/purchase area and product-information sections
- Shared cart-drawer markup and newsletter/policy footer

### Observed affordances and inferred behavior

- **Navigation and search — observed:** HTTP markup contains men/women buttons and search fields; expansion and submission effects untested.
- **Size selection and add to cart — observed:** Product markup contains Select A Size and add-to-cart buttons; enabled/disabled states and cart mutation untested.
- **Filter and sort — observed:** Search inputs include size filters and sort_by; relevance and ascending/descending price values were inspected in the initial HTTP response. Result changes untested.
- **Cart quantity/removal and persistence — inferred:** Cart/drawer integration suggested by assets and Added to Cart markup; populated cart and storage were not inspected.

Limitations: HTTP-only. Cart returns 200 with an empty title; shared shell is present but dedicated cart content is not established. Returned markup includes unexecuted template expressions. Returns page availability/title established, detailed layout not characterized. No rendered layout, mobile state, keyboard, storage or checkout tests.

Proposed substitutions: none selected. If coordination finds a reservation conflict or rendered inspection invalidates the proposed scope, request a same-stratum, comparable-complexity replacement and project-lead approval; do not replace autonomously during build. The cart mapping is conditional on further source inspection; a drawer-focused local cart approximation requires explicit scope approval.

## ECOM-05 — World Market

- Source ID: ECOM-05; category: e-commerce; subcategory/stratum: **multi-category retailer**.
- Canonical organization homepage: https://www.worldmarket.com/
- Verification: 2026-11-12T00:52:37.323742+00:00; HTTP-only availability verified. All mapped URLs returned 200; detailed per-URL evidence below and in the shared log under source_id `ECOM-05`. Rendered/interaction verification: **UNVERIFIED / not tested**.
- Complexity: **high** — Multiple merchandise departments, category landing plus filtered listing, store/localization controls, color choice, product details and search. Scope limits the furniture branch while preserving cross-department navigation.
- Stack clues: demandware.store and demandware.static URL paths identify Salesforce Commerce Cloud conventions; underlying application/version unknown.

### Source-to-local page map and status/title evidence

| Attempted URL | HTTP | Response title | Proposed local file |
|---|---|---|---|
| https://www.worldmarket.com/ | 200 | Furniture, Home Decor, Rugs, Outdoor & More | World Market | index.html |
| https://www.worldmarket.com/c/furniture/ | 200 | Unique & Affordable Furniture Sets | furniture.html |
| https://www.worldmarket.com/c/furniture/living-room-furniture/chairs/ | 200 | Accent & Living Room Chairs - World Market | chairs.html |
| https://www.worldmarket.com/p/sophie-upholstered-swivel-chair-112628.html | 200 | Sophie Upholstered Swivel Chair - World Market | sophie-chair.html |
| https://www.worldmarket.com/cart | 200 | Cart | World Market | cart.html |
| https://www.worldmarket.com/search?q=chair | 200 | chair - World Market | search.html |
| https://www.worldmarket.com/customer-service/return-policy.html | 200 | Return Policy & Refunds Guide | World Market | returns.html |

### Key regions (HTTP markup)

- Utility header with store selection, search, account and cart affordances
- Department navigation spanning furniture, decor, bath and food/drinks
- Home seasonal merchandising and department bands
- Furniture editorial landing and chair listing with filter/sort controls
- Product purchase area with color and add-to-cart controls
- Empty-cart state and return-policy content; shared service/legal footer

### Observed affordances and inferred behavior

- **Store selection and search — observed:** ZIP/city field and store-selection buttons exist in markup; no location submitted. HTTP assigned Tuscaloosa while web extraction showed Oakbrook: locale is not stable.
- **Listing filters and sorting — observed:** Chair listing has FILTER/SORT, price/color controls and ascending/descending price options. No result-changing action performed.
- **Product color and add to cart — observed:** Sophie product markup identifies color and Add to Cart; selection/mutation untested.
- **Search and empty cart — observed:** Search URL returned Search Results heading; cart returned empty-cart heading. Populated cart not observed.
- **Cart quantity/removal — inferred:** Expected purchase-flow behavior, not present in observed empty state; exclude from fidelity claims until tested.

Limitations: HTTP-only. No dropdown expansion, responsive layout, cart mutation, checkout, validation or storage tested. Store location varies by tool/session. Rewards/account/store-service flows outside proposed page scope; product stock and campaigns vary.

Proposed substitutions: none selected. If coordination finds a reservation conflict or rendered inspection invalidates the proposed scope, request a same-stratum, comparable-complexity replacement and project-lead approval; do not replace autonomously during build. 

## ECOM-06 — Adafruit Industries

- Source ID: ECOM-06; category: e-commerce; subcategory/stratum: **specialty retailer**.
- Canonical organization homepage: https://www.adafruit.com/
- Verification: 2026-11-12T00:52:39.545675+00:00; HTTP-only availability verified. All mapped URLs returned 200; detailed per-URL evidence below and in the shared log under source_id `ECOM-06`. Rendered/interaction verification: **UNVERIFIED / not tested**.
- Complexity: **medium** — Dense product-category navigation, technical product sections, quantity/add-on purchase area, search filters and cart form; no configurator or observed size/color matrix. Broad electronics catalog increases navigation density, but proposed branch is bounded.
- Stack clues: jquery/bootstrap strings in returned markup. Store backend and framework version unknown; no claim of Zen Cart based on URL style.

### Source-to-local page map and status/title evidence

| Attempted URL | HTTP | Response title | Proposed local file |
|---|---|---|---|
| https://www.adafruit.com/ | 200 | Adafruit Industries, Unique & fun DIY electronics and kits | index.html |
| https://www.adafruit.com/category/54 | 200 | Components & Parts Products Category on Adafruit Industries | components.html |
| https://www.adafruit.com/product/5001 | 200 | ANO Directional Navigation and Scroll Wheel Rotary Encoder : Adafruit Industries, Unique & fun DIY electronics and kits | encoder.html |
| https://www.adafruit.com/shopping_cart | 200 | The Shopping Cart : Adafruit Industries, Unique & fun DIY electronics and kits | cart.html |
| https://www.adafruit.com/?q=encoder | 200 | Search Results for 'encoder' on Adafruit Industries | search.html |
| https://www.adafruit.com/returns | 404 | Page Not Found : Adafruit Industries, Unique & fun DIY electronics and kits | Excluded: unavailable help-route guess; observed 404 evidence only |
| https://www.adafruit.com/shipping | 200 | Shipping & Returns | shipping-returns.html |

### Key regions (HTTP markup)

- Shop/learning/community utility links, search, account and cart header
- Product-category navigation and new/featured merchandise areas
- Components & Parts product listing with purchase affordances
- Encoder product gallery, description, technical details, learning links and related items
- Search results with sort, availability and price filter forms
- Cart quantity/coupon/wishlist controls and Shipping & Returns help page

### Observed affordances and inferred behavior

- **Menu and search — observed:** toggle menu and search fields in HTTP markup; no expansion or submission action performed.
- **Filter and sort — observed:** Search contains best-match/most-recent inputs, availability checkboxes, price-bracket inputs and apply buttons; effects untested.
- **Quantity and add to cart — observed:** Product has qty input and Add to Cart; add-on checkbox markup present. No purchase/cart mutation.
- **Cart controls — observed:** Shopping-cart markup includes Empty Cart, Update Quantities and coupon Apply; actual item removal/quantity updates untested.
- **Product variants — inferred:** No size/color variant selector established for selected encoder; do not add a generic variant matrix.

Limitations: HTTP-only. Guessed /returns returned 404; linked /shipping returned 200 and is the correct help page. No checkout, account, cart mutation, rendered layout, keyboard or storage testing. Technical/learning/distributor external pages outside scope.

Proposed substitutions: none selected. If coordination finds a reservation conflict or rendered inspection invalidates the proposed scope, request a same-stratum, comparable-complexity replacement and project-lead approval; do not replace autonomously during build. Correct the unavailable help-route guess to the observed /shipping page; this is the linked page for this candidate, not a replacement organization.

## Comparability and selection bias

Claude notes call Glossier medium, IKEA high and Orvis medium-high; Codex candidates are medium/high/medium respectively. The specialty match is imperfect: Adafruit has technical depth and search controls rather than Orvis's apparel variant breadth. Coordinator should agree bounded page/interaction scope before claiming matched difficulty. Open-source complexity is unknown, so category-wide comparability cannot yet be established. Do not silently expand/shrink another group's scope to make a match.

Codex had live search plus HTTP/web text extraction; this pass used no rendered browser. Claude's cited pass used curl without JavaScript. Open-source access is unknown. Successful raw-HTML access influenced selection and may favor server-delivered content; these candidates do not represent a random retail sample. Campaigns, locale, inventory and template responses change. Different sources confound source difficulty with model group; the 3/3/4 allocation is not a causal control.

## Ten-slot coordination / approval view

External rows below report existing notes only; they do not reserve, approve or assign those organizations centrally. All exact model versions and approved scope/model mappings require project-lead reconciliation.

| ID | Group | Stratum / current research | Source / URL | Approval status |
|---|---|---|---|---|
| ECOM-01 | claude | DTC beauty per Claude notes | Glossier — https://www.glossier.com/ | Pending central reservation, scope/model reconciliation and approval |
| ECOM-02 | claude | Multi-category home furnishings per Claude notes | IKEA USA — https://www.ikea.com/us/en/ | Pending central reservation, scope/model reconciliation and approval |
| ECOM-03 | claude | Specialty outdoor per Claude notes | Orvis — https://www.orvis.com/ | Pending central reservation, scope/model reconciliation and approval |
| ECOM-04 | codex | Single-brand DTC; medium | Allbirds — https://www.allbirds.com/ | Provisional; reservation conflict check and approval pending |
| ECOM-05 | codex | Multi-category retailer; high | World Market — https://www.worldmarket.com/ | Provisional; reservation conflict check and approval pending |
| ECOM-06 | codex | Specialty retailer; medium | Adafruit Industries — https://www.adafruit.com/ | Provisional; reservation conflict check and approval pending |
| ECOM-07 | open-source | Pending; proposed DTC stratum only | Unknown — pending coordinator | Pending source, scope, verification, exact model and approval |
| ECOM-08 | open-source | Pending; proposed multi-category stratum only | Unknown — pending coordinator | Pending source, scope, verification, exact model and approval |
| ECOM-09 | open-source | Pending; proposed specialty stratum only | Unknown — pending coordinator | Pending source, scope, verification, exact model and approval |
| ECOM-10 | open-source | Pending; proposed additional DTC reserve only | Unknown — pending coordinator | Pending source, scope, verification, exact model and approval |

**Coordinator action requested:** reserve Claude's documented URLs; confirm all open-source reservations/selections and reconcile the ten unique sources, page scope, complexity and exact model assignments. Then obtain project-lead approval for the complete ten-source inventory. All ten slots currently lack recorded complete-inventory approval. Stop here; no site folders or website code were created, and no build agents launched.
