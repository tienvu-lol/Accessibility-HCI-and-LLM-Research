from pathlib import Path
from html.parser import HTMLParser
from datetime import datetime,timezone
import json,hashlib,tarfile
run=Path(__file__).parent;root=run.parents[3];site=root/'company/codex/CORP-04'
task=json.loads((run/'task.md').read_text().split('```json\n')[1].split('\n```')[0]);source=task['selected_source'];pages=json.loads(source['source_pages']);mapping='\n'.join(f"| {p['local_file']} | {p['url']} |" for p in pages)
(site/'README.md').write_text(f'''# CORP-04 — Harborline Bank

Independent fictional national retail bank research replica, inspired by the approved Chase information architecture. Six mapped pages plus the required 404; original prose and three original local SVGs. No affiliation or real banking services.

Source availability verified {source['verified_at']} via {source['verification_method']}. This build uses that preserved Phase A evidence; no new live visit or rendered observation is claimed. Approval: {source['approved_at']}, Samhith Varma, {source['approval_reference']}. The provisional wording in historical research predates this approval. Active allocation is 01–06; 07–10 remain deferred.

Open index.html directly in an ordinary browser. No server, installation, network or build step is required. Navigate among the following complete pages:

| Local page | Approved source |
|---|---|
{mapping}
| 404.html | Protocol-required local recovery page; source missing-path evidence in CORP.md |

Homepage includes audience/product navigation, promotional hierarchy, sign-in demonstration, product shortcuts, content bands and grouped footer. Checking includes three-option comparison and sample fee table; Everyday detail includes benefits, fee explanation, FAQ and action aside. Help and contact are resource hubs, not submission forms. Branch search uses three inline fictional records: two branches and one ATM, across two invented cities and three sample ZIPs. Checking uses three fictional products; fees and waiver amounts are labeled invented samples. No rates/calculator were observed and none is added.

Interactions: responsive menu and product disclosure with Escape return; native FAQ disclosures; native modal notice for sign-in/account-opening controls with close/focus return; local locator search, service filtering, empty results, required-query errors and reset. No credentials, identity, customer data, financial transactions or appointments are collected. Source locator internals were unavailable: its local search/results design is an inferred approximation, not a verified reproduction.

Validation evidence is retained in pipelines/codex/runs/2026-11-13T15-55-36-495Z-build-CORP-04. Shared qc.js is invoked once against the complete initial output. Browser and axe results depend on execution and are reported in generation-metadata.json and validation-report.json; a launch failure is not a clean scan. Separate static and mocked-DOM logic tests are not browser interaction evidence. Screen reader, rendered fidelity, zoom, keyboard traversal, responsive reflow and visual contrast verification remain not-tested if browser launch is blocked. Read fidelity-notes.md and component-inventory.json for limits and actual instances.
''')
(site/'fidelity-notes.md').write_text('''# Fidelity and scope

Replicated: approved six-page hierarchy, audience/product navigation, homepage sign-in panel and banking shortcuts, comparison categories, account benefit/fee/FAQ structure, customer-service topics, contact routing, branch locator destination and grouped banking/legal footer.

Approximated: navy/blue/white banking visual language, promotional illustration, spacing, responsive arrangement, menu behavior, local comparison contents and detail aside. Original SVG artwork replaces proprietary imagery. No screenshot or rendered source observation supports pixel fidelity; hierarchy is based on preserved HTTP markup/text evidence.

Simulated: sign-in and account opening show a native dialog explanation without fields. Fictional sample fees/waivers illustrate the fee explanation. The locator uses three invented records and client-side filtering. It has no map service, real addresses, directions, appointment flow, geolocation or live availability.

Intentionally added: protocol-required 404 recovery, explicit research/demo notices, search validation/empty/reset feedback, and an original stylized nongeographic map. Search internals are inferred from the locator destination, not observed controls. Flex/Premier comparison links explicitly explain their comparison-only status on the existing detail page.

Omitted: real authentication, applications, payments, forms collecting personal information, mortgages/calculator, rates hub, about/careers and unapproved screens. Contact is a resource hub; no inquiry form was observed. No separate recommendation wizard was established; direct comparison replaces that uncertain behavior.

Unverified: source mobile/keyboard states, precise geometry/content sequence where source extraction had placeholders, locator internals, visual matching, assistive technology, screen resizing, browser execution and native dialog focus behavior unless actual browser QC succeeds. Static structure and mocked event tests establish only the recorded limited claims. No conformance or measured-outcome claims are made.
''')
class Inventory(HTMLParser):
 def __init__(self,page):super().__init__();self.page=page
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'data-component' in a:
   c=a['data-component'];items.setdefault(c,[]).append({'page':self.page,'tag':tag,'data_section':a.get('data-section'),'selector':f"[data-section='{a.get('data-section')}'][data-component='{c}']",'instance_in_page':sum(x['page']==self.page for x in items[c])+1})
items={}
for p in sorted(site.glob('*.html')):Inventory(p.name).feed(p.read_text())
items['branch-card']=[{'page':'locations.html','tag':'article','data_section':'location-results','selector':"#branch-results [data-component='branch-card']",'instance_in_page':i,'generated_from':n}for i,n in enumerate(['Fairhaven Center','Cedar Square','Fairhaven Station ATM'],1)]
interactive={'primary-nav':'Direct navigation and responsive disclosure; Tab, Enter; Escape closes mobile menu','navigation-disclosure':'Enter/Space toggles product links; Escape closes and restores trigger focus','simulation-dialog':'Native showModal, Escape or close submits method=dialog; close restores trigger focus','accordion':'Native details disclosure; Enter/Space toggle summary','search-form':'Submit filters inline records; empty query sets error/aria-invalid and focuses input; reset clears filter','search-results':'Polite result status and generated local branch cards'}
(site/'component-inventory.json').write_text(json.dumps({'protocol_version':'1.0','replica_id':'CORP-04','category':'company','source_url':source['source_url'],'components':[{'id':c,'selector':f"[data-component='{c}']",'pages':sorted(set(x['page'] for x in instances)),'instances':instances,'behavior':[interactive.get(c,'Static semantic region, content or local navigation')],'keyboard':[interactive.get(c,'Native Tab/Enter for contained links and controls')],'status':'implemented','validation':'source-inspected; browser not-tested; see validation-report for mocked logic scope'}for c,instances in items.items()]},indent=2))
meta={'allocation_protocol':'WEB-REPLICA-ALLOCATION-V1.0','generation_protocol':'WEB-REPLICA-V1.0','category':'company','slot':4,'source_id':'CORP-04','model_group':'codex','model_id':'gpt-6.1-sol','model_version':None,'model_provider_or_runtime':'OpenAI collaboration worker (gpt-6.1-sol), orchestrated in Codex','generation_mode':'single worker; isolated source snapshot; local-only','operator':'Samhith Varma','approved_source_url':source['source_url'],'source_verified_at':source['verified_at'],'source_verification_method':source['verification_method'],'source_approved_at':source['approved_at'],'approval_reference':source['approval_reference'],'source_evidence':source['evidence_reference'],'generation_started_at':json.loads((run/'generation-start.json').read_text())['generation_started_at'],'generation_completed_at':None,'rules_revision':task['protocol_snapshots'][0]['sha256'],'category_prompt_revision':next(p['sha256'] for p in task['protocol_snapshots'] if p['path']=='pipelines/codex/categories.json'),'prompt_or_transcript_reference':'pipelines/codex/runs/2026-11-13T15-55-36-495Z-build-CORP-04/task.md','protocol_snapshots':task['protocol_snapshots'],'human_edits':[],'cross_model_edits':[],'active_allocation':{'active':[1,2,3,4,5,6],'deferred':[7,8,9,10]},'generation_budget':None,'retries':[],'validation_summary':{k:'not-tested' for k in ['technology','completeness','structure','interaction','accessibility','traceability','scope']},'limitations':['Exact model version and generation budget not exposed.','Source only HTTP/text verified; rendered fidelity unverified.']}
(site/'generation-metadata.json').write_text(json.dumps(meta,indent=2))
with tarfile.open(run/'initial-output.tar.gz','w:gz') as tar:tar.add(site,arcname='CORP-04')
(run/'initial-manifest.json').write_text(json.dumps({str(p.relative_to(site)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(site.rglob('*'))if p.is_file()},indent=2))
print('Initial output preserved',len(list(site.rglob('*'))))
