from pathlib import Path
import json,re
from html.parser import HTMLParser
s=Path('Websites/e-commerce/codex/ECOM-06');r=Path('Websites/pipelines/codex/runs/2026-11-13T21-01-56-049Z-build-ECOM-06');run=json.loads((r/'run.json').read_text());source=run['selected_source'];pages=json.loads(source['source_pages']);files=sorted(p.name for p in s.glob('*.html'))
(s/'README.md').write_text('''# ECOM-06 — Circuit Grove

Local static, fictional specialty electronics retailer inspired by the approved Adafruit Industries information architecture. Source: https://www.adafruit.com/ . Actual generation: gpt-6.1-sol collaboration worker; release version unknown. Active allocation 01–06; open-source 07–10 deferred.

## Source evidence

Verified 2026-11-12T00:52:39.545675+00:00 using live search/web text extraction of home and HTTP GET urllib page-scope checks. HTTP-only; no source rendering, keyboard or interaction execution. Evidence: `pipelines/codex/research/ECOM.md`, ECOM-06 block. Approval: Samhith Varma, 2026-11-12, `metadata/change-log.md` Codex Phase A approval. Earlier provisional notes in research are superseded by that approval and active-allocation amendment. No new source verification claimed.

## Run locally

Open index.html directly in a browser. Every page uses relative links, local SVG art and inline JavaScript data; no server, network, package installation or build is required. JavaScript enables search/filter, cart and mobile menu behavior. Static navigation and catalog remain visible without JavaScript.

## Complete sitemap / source map

'''+ '\n'.join('- `'+p['local_file']+'` → '+p['url'] for p in pages)+'''
- `404.html` → required local page recovery addition; actual guessed /returns returned 404 in research, but this is original recovery copy.

## Sample data and behavior

Eight fictional products, six demo-available and two preview-only; no live stock claims. Eight original product SVGs and one circuit illustration. One encoder detail page with original illustrative specifications; no generic size/color matrix. Other part cards add directly to the cart or search the sample catalog.

Search matches name, part ID and category; default best match favors name prefixes; most recent uses fictional ordinal values. Availability and price radios apply on explicit Apply filters. Reset restores all filter options, keeping the search phrase. Empty results explain recovery. Header search is a file-compatible GET form.

Encoder quantities accept whole values 1–99. Optional knob adds the same quantity atomically, with maximum checks for both items. Cart quantities accept 0–99; zero removes a part. Update quantities rejects fractional/invalid values before mutation; Empty cart removes all selections and coupon. BENCH10 applies a rounded 10% sample discount; blank coupon removes it. Unknown codes announce an error. Checkout explanation remains inside cart.html and collects no information. Product specs, shipping and returns are fictional explanations, not engineering or service commitments.

Local storage is justified solely to preserve nonpersonal demo product selections and coupon across file navigation. Reads/writes are caught; blocked storage uses temporary page memory with visible fallback notice and resets on navigation. File-origin storage behavior varies by browser. No accounts, payment/customer fields, actual transaction, wishlist service, external tutorial or distributor screen.

## Validation and limitations

See generation-metadata.json for the seven gates and this run's qc-summary.json, qc-initial.log, interaction-tests.json and static-tests.json. Shared QC is attempted once; browser launch blocked means axe and browser interactions are not-tested, never zero violations. Node VM tests execute actual JavaScript core and handlers with labeled DOM/storage mocks, not a real browser. Static source review checks mapped structure/instrumentation and links. Responsive CSS and focus styles are implemented, but rendered visual fidelity, keyboard interaction, mobile reflow, zoom, contrast audit and screen-reader checks remain not-tested. HTTP-only source evidence supports architecture, not pixel fidelity. No conformance claim.
''')
(s/'fidelity-notes.md').write_text('''# Fidelity notes — ECOM-06

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
''')
class Inventory(HTMLParser):
 def __init__(self):super().__init__();self.items=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'data-component'in a:self.items.append((tag,a))
components={}
for file in files:
 p=Inventory();p.feed((s/file).read_text())
 for tag,a in p.items:
  c=components.setdefault(a['data-component'],dict(id=a['data-component'],selector='[data-component="'+a['data-component']+'"]',pages=[],instances=[],behavior=[],keyboard=['Tab and Enter for links; Tab, Enter/Space for buttons and summaries where present'],status='implemented',validation='static-inventory; browser not-tested'))
  if file not in c['pages']:c['pages'].append(file)
  c['instances'].append(dict(page=file,tag=tag,section=a['data-section'],selector='[data-section="'+a['data-section']+'"][data-component="'+a['data-component']+'"]'))
for id,c in components.items():
 c['behavior']={'primary-nav':['Menu button toggles mobile disclosure; Escape closes and returns focus'],'search-form':['GET navigation with local query; local dataset search'],'filter-form':['Explicit Apply; availability, price and best/recent sort; Reset'],'add-to-cart-form':['Whole quantity validation; optional same-quantity knob; local cart addition'],'cart-form':['Validate all quantities before update; zero removes; Empty clears cart/coupon'],'coupon-form':['BENCH10 sample discount; invalid error; blank removes'],'disclosure':['Native expandable help/technical note'],'product-card':['Local product/search link and available-item demo add'],'order-summary':['Integer-cent totals and explanatory checkout feedback']}.get(id,['Static semantic content and/or mapped local navigation'])
components['cart-item']=dict(id='cart-item',selector='[data-component="cart-item"]',pages=['cart.html'],instances=[dict(page='cart.html',section='cart-line-items',selector='#cart-items [data-component="cart-item"]',rendered='zero to six actual sample items depending on cart')],behavior=['Generated from selected available items; quantity labels, unit and line totals'],keyboard=['Tab to quantity inputs'],status='implemented',validation='Node VM handler test with DOM mocks; browser not-tested')
(s/'component-inventory.json').write_text(json.dumps(dict(protocol_version='1.0',replica_id='ECOM-06',category='e-commerce',source_url=source['source_url'],components=list(components.values())),indent=2)+'\n')
m=dict(allocation_protocol='WEB-REPLICA-ALLOCATION-V1.0',generation_protocol='WEB-REPLICA-V1.0',category='e-commerce',slot=6,source_id='ECOM-06',model_group='codex',model_id='gpt-6.1-sol',model_version=None,model_provider_or_runtime='OpenAI collaboration worker (gpt-6.1-sol), orchestrated in Codex; not historical research CLI',generation_mode='single-model local static generation in isolated snapshot',operator='Samhith Varma',approved_source_url=source['source_url'],source_verified_at=source['verified_at'],source_verification_method=source['verification_method'],source_approved_at=source['approved_at'],approval_reference=source['approval_reference'],generation_started_at=run['generation_started_at'],generation_completed_at=None,rules_revision=run['protocol_snapshots'][0],category_prompt_revision=run['protocol_snapshots'][3],protocol_snapshots=run['protocol_snapshots'],prompt_or_transcript_reference=str(r/'task.md'),prompt_sha256=run['task_sha256'],human_edits=[],cross_model_edits=[],generation_budget=None,active_allocation=dict(active=['01','02','03','04','05','06'],deferred=['07','08','09','10']),isolation='Snapshot copy; actual repo remains untouched by worker',validation_summary={k:'not-tested' for k in ['technology','completeness','structure','interaction','accessibility','traceability','scope']},validation_evidence=str(r),limitations=['HTTP-only source research; no rendered fidelity confirmation','Browser/axe checks pending shared QC launch attempt'])
(s/'generation-metadata.json').write_text(json.dumps(m,indent=2)+'\n')
