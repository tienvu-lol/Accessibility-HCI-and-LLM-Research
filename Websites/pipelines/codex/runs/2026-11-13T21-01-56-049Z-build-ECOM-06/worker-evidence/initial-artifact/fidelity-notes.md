# Fidelity notes — ECOM-06

- Replicated from observed HTTP markup: utility/shop/search/cart header; dense category sidebar and merchandise areas; components listing; product gallery, quantity/add-on form, description, technical information and related products; search best-match/recent, availability and price controls; cart Empty/Update/coupon affordances; shipping help route.
- Approximated: exact spacing, colors, typography, sidebar widths, product gallery geometry and responsive arrangements. Source was never rendered. Green workbench visual language is original; no pixel-perfect claim.
- Simulated: all catalog values and availability; product purchasing, add-on and cart mutations; coupon rules; sorting/filter effects; shipping/returns explanations. Those effects were not executed on source. A 10% BENCH10 code is original local sample data.
- Intentionally added: required 404 recovery page, one logical H1/skip link on each page, explicit demo disclosures, temporary-memory fallback and instrumentation. Local product persistence supports file-navigation tests; it is not an observed source behavior.
- Omitted: account and external community/distributor/tutorial services, wishlist service, real checkout/shipping/payment flows. No observed size/color variant matrix exists for the selected part, so none was added. The learning callout stays within the mapped encoder technical notes. Related non-encoder parts have direct sample add or search links, not invented detail screens.
- Unverified: source rendered hierarchy, colors, mobile expansion, keyboard, storage, populated cart and actual sort/filter/add-on effects. Only architecture and affordances from approved HTTP evidence guide this implementation.

## Page-specific interpretation

Home preserves shop/sidebar/new merchandise with an original circuit promotion and workbench band. Components and search use the same eight-part sample grid; search has the observed form controls. Encoder has a single illustration rather than an unverified thumbnail carousel, a separate knob checkbox and inline technical notes. Cart starts empty and becomes populated through sample additions; checkout is explanatory text within this map. Shipping & Returns gives fictional local-demo help, not copied policies. The guessed /returns route was unavailable and is not mapped.

## Revision history

Initial generated artifact preserved in the run's initial-artifact directory before validation/corrections. Same-model corrections after that snapshot, if any, are logged in corrections.json. No human code edits, external code, or generated-site code reuse.
