from pathlib import Path
from html.parser import HTMLParser
import json,datetime,hashlib,tarfile
root=Path('Websites/government/codex/GOV-04');run=Path('Websites/pipelines/codex/runs/2026-11-13T21-27-01-148Z-build-GOV-04')
task=(run/'task.md').read_text();ctx=json.loads(task.split('```json\n')[1].split('\n```')[0]);source=ctx['selected_source'];mapping=json.loads(source['source_pages'])
class Audit(HTMLParser):
 def __init__(self,page):super().__init__();self.page=page;self.ids=[];self.links=[];self.h1=0;self.main=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id'in a:self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='main':self.main+=1;assert a.get('id')=='main-content'
  if tag in ['header','nav','main','section','article','aside','form','footer']:assert a.get('data-section') and a.get('data-component'),(self.page,tag)
  if 'data-component'in a:
   assert a.get('data-section');c=a['data-component'];inventory.setdefault(c,[]).append({'page':self.page,'selector':f'[data-component="{c}"]','data_section':a['data-section'],'id':a.get('id')})
  if tag=='img':assert 'alt'in a
  if tag=='button':assert a.get('type') in ['button','submit','reset']
  for key in ['href','src']:
   if key in a:self.links.append(a[key])
inventory={};parsers={};errors=[]
for f in root.glob('*.html'):
 p=Audit(f.name);p.feed(f.read_text());assert p.h1==p.main==1;assert len(p.ids)==len(set(p.ids));parsers[f.name]=p
for page,p in parsers.items():
 for link in p.links:
  assert not link.startswith(('http:','https:','//','# ')),link
  file,_,fragment=link.partition('#');target=root/(file or page);assert target.exists(),(page,link)
  if fragment:assert target.name in parsers and fragment in parsers[target.name].ids,(page,link)
components=[]
for c,instances in inventory.items():components.append({'id':c,'selector':f'[data-component="{c}"]','pages':sorted(set(x['page'] for x in instances)),'instances':instances,'behavior':['Semantic content or navigation; see README for active controls'],'keyboard':['Native Tab/Enter; Space on buttons and disclosures; Escape on menu and demo panels'],'status':'implemented','validation':'static-audit-pass; browser-not-tested'})
for c in ['search-result-list','search-result']:components.append({'id':c,'selector':f'[data-component="{c}"]','pages':list(parsers),'instances':[{'page':'all six pages','location':'#search-results','created_by':'site-search submit listener','count':'one list and 0–5 items per submission'}],'behavior':['Dynamic local-search results'],'keyboard':['Tab and Enter on result links'],'status':'implemented','validation':'DOM-mock tests; browser-not-tested'})
(root/'component-inventory.json').write_text(json.dumps({'protocol_version':'1.0','replica_id':'GOV-04','category':'government','source_url':source['source_url'],'components':components},indent=2)+'\n')
maptext='\n'.join(f'- `{p["local_file"]}` ← {p["url"]}' for p in mapping)
(root/'README.md').write_text(f'''# GOV-04 — City of Alderhaven

Fictional municipal research demo inspired structurally by City of Boston, {source['source_url']}. No official affiliation or operational services.

Source verified 2026-11-13 through connected web search/page-open text retrieval, accepted by the project lead. No fresh origin HTTP, rendered reference or reference interaction verification. Existing approved evidence was read; no new source visit is claimed. Approval: 2026-11-13T00:11:23.688078+00:00, Samhith Varma, replacement-approval-2026-11-13.json.

Open index.html directly in a browser. All six pages and resources use relative local paths; no server, install or network is required.

Complete sitemap and approved source mapping:
{maptext}
- `404.html`: required research missing-page addition.

The home has a city-status band, popular topics and community feature. Departments contains six original sample entries; notices contains four original sample notices and agendas, filterable by keyword and four departments. Shared search indexes five mapped pages. Parking has section navigation and a practice inquiry with one valid sample ID (DEMO-101). Government has role descriptions and a service-help disclosure. Header menu toggles at narrow widths and supports Escape; language demonstration explicitly explains translation is unavailable. All pages have repeated critical navigation and grouped footer. Notices use native details disclosures. Search and department inputs announce empty states. No AI backend, real cases, payment, registration, report or service contact is available. No information is persisted.

Validation evidence is in `pipelines/codex/runs/2026-11-13T21-27-01-148Z-build-GOV-04/`: static-audit.json, js-tests.log, qc-first.log and qc-first.json if produced. Node syntax and delivered-JS behavior were checked with explicit DOM mocks; this does not establish browser keyboard/focus, layout, screen reader or axe results. Shared QC is attempted without modification. See generation metadata for final outcomes.

Browser rendering, zoom/reflow, actual keyboard, screen-reader output, rendered contrast, mobile behavior and source visual fidelity remain not tested. CSS includes visible focus, reflow and reduced-motion rules as implementation targets. No accessibility conformance claim is made.
''')
(root/'fidelity-notes.md').write_text('''# Fidelity and deviations

Replicated from approved text evidence: five-page municipal information architecture, menu/search/language affordances, city-status homepage bands, department directory, public-notice text/department filtering, service detail section navigation and government overview/service handoff. Each page mapping is in README.

Approximated: navy/blue municipal visual hierarchy, roomy content bands, uppercase utilities, outlined form controls, directory rows, notice list, interior sidebar and grouped footer. Exact rendered layout, colors, breakpoints, menus and source footer structure were not verified. This is a structural approximation, not a pixel-perfect replica.

Simulated: local search across five pages replaces live/AI search; notice filters operate on four invented notices; parking inquiry never transmits; service handoff becomes a labeled local disclosure; language affordance explains English-only demo. Mobile menu behavior is inferred, not observed in execution.

Added: conspicuous research warnings; original harbor SVG; six fictional departments, four fictional notices and original civic copy; department keyword filtering is an inferred usability approximation of directory behavior; 404 is protocol-required. Practice inquiry is a labeled local substitute for an external operational route rather than a claimed observed source form.

Omitted: real officials, seals, addresses, phone/emergency numbers, operational alerts, live service statuses, payments, external portals, AI backend, real translations and external social/legal destinations. No extra calendar or report page was invented. Original artwork carries no real identity.

Unverified: rendered reference and replica, responsive comparison, browser interaction, assistive technology, visual contrast and zoom. Automated DOM mocks cover delivered logic only. Shared QC browser launch outcome is documented in run evidence.
''')
metadata={'allocation_protocol':'WEB-REPLICA-ALLOCATION-V1.0','generation_protocol':'WEB-REPLICA-V1.0','category':'government','slot':4,'source_id':'GOV-04','model_group':'codex','model_id':'gpt-6.1-sol','model_version':None,'model_provider_or_runtime':'OpenAI collaboration worker; parent explicitly assigned gpt-6.1-sol, runtime reports GPT-6-based agent; independent exact underlying version unavailable','model_identity_basis':'Task declaration and orchestrator assignment, no independent introspection API','generation_mode':'isolated local-only build, one source; three parallel approved workers at orchestration level','operator':'Samhith Varma','approved_source_url':source['source_url'],'source_verified_at':source['verified_at'],'source_verification_method':source['verification_method'],'source_verification_limitations':source['limitations'],'source_approved_at':source['approved_at'],'approval_reference':source['approval_reference'],'generation_started_at':(run/'generation-start.txt').read_text(),'generation_completed_at':None,'rules_revision':ctx['protocol_snapshots'][0]['sha256'],'category_prompt_revision':next(x['sha256'] for x in ctx['protocol_snapshots'] if x['path']=='pipelines/codex/prompts/build.md'),'protocol_snapshots':ctx['protocol_snapshots'],'prompt_or_transcript_reference':str(run/'task.md'),'task_sha256':hashlib.sha256((run/'task.md').read_bytes()).hexdigest(),'generation_budget':None,'tools_used':['exec_command','Python standard library generation/audit','Node.js syntax and explicit DOM mocks','shared qc.js attempted'],'human_edits':[],'cross_model_edits':[],'active_allocation':'01–06; open-source 07–10 deferred','validation_summary':{'technology':'pass','completeness':'pass','structure':'pass','interaction':'not-tested','accessibility':'not-tested','traceability':'pass','scope':'pass'},'validation_limitations':'Static structure and logic tests are not rendered interaction or accessibility verification. Parent review pending.'}
(root/'generation-metadata.json').write_text(json.dumps(metadata,indent=2)+'\n')
(run/'static-audit.json').write_text(json.dumps({'pages':len(parsers),'source_map':mapping,'links_assets_fragments':'pass','one_h1_main_unique_ids':'pass','region_instrumentation':'pass','component_inventory_instances':sum(len(x['instances']) for x in components),'button_types_alt_attributes':'pass','browser_accessibility':'not-tested'},indent=2)+'\n')
with tarfile.open(run/'initial-artifact.tar.gz','w:gz') as tar:tar.add(root,arcname='GOV-04')
(run/'initial-sha256.json').write_text(json.dumps({str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(root.rglob('*')) if p.is_file()},indent=2)+'\n')
(run/'changes-and-retries.md').write_text('# Changes and retries\n\nInitial artifact captured after implementation/documentation/static audit and before QC or subsequent corrections. No human/cross-model edits. Initial source-path read failed because protocols are under Websites; corrected read, no artifact effect. No source/rendered verification invented.\n')
print('Static audit passed; six pages, local links, fragments, semantic region metadata, inventory, initial archive and hashes preserved.')
