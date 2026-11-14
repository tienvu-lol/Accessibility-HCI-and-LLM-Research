from pathlib import Path
import json,datetime,hashlib,re,tarfile
root=Path('Websites/fashion/codex/FASH-05');run=Path('Websites/pipelines/codex/runs/2026-11-13T21-37-53-739Z-build-FASH-05');ctx=json.loads((run/'run.json').read_text());src=ctx['selected_source'];pages=json.loads(src['source_pages'])
readme='''# LOAM — FASH-05

Fictional brand editorial / lookbook research replica inspired by TOAST (https://www.toa.st/). Source availability verified 2026-11-12 by live web search/text extraction and direct Python urllib HTTP GET; no rendered source inspection. Approved by Samhith Varma on 2026-11-12; evidence: Websites/metadata/change-log.md section “Codex Phase A approval (slots 04–06)”. The prepared source record supersedes the original provisional research note.

Open index.html directly using file://. Six independent pages share local css/styles.css and js/main.js; no server, installation, accounts, network, analytics or build step. Fictional prose and four original local SVG illustrations.

## Complete sitemap and source map

'''
readme+='\n'.join(f"- `{p['local_file']}` ← {p['url']}" for p in pages)
readme+='''
- `404.html`: protocol-required local recovery addition, no source visual claim.

## Local interactions and dataset

The search uses six inline editorial records (2 Clothing, 2 Making, 2 Place), matches title/topic/description, handles blank and empty queries, and accepts initial ?q= parameters. These six magazine cards intentionally share the two approved detail destinations, representing topic teasers rather than six new detail screens. Article-only search reduces the original retail search scope.

Mobile navigation uses a button with expanded state; Escape closes it and returns focus. Community is a native details/summary disclosure with Escape support. Magazine topic links navigate within the page. Shared newsletter validates email and announces a clearly marked demo confirmation. Story comments require name/email/comment and safely preview text in the page; they are not saved or published. No real transactions, subscriptions or submissions occur. Forms display useful errors and move focus to the invalid field; success focuses status. Reload clears local form state. Search still has a magazine fallback without JavaScript; shared navigation remains visible without JavaScript.

## Validation and limitations

See the run evidence in `Websites/pipelines/codex/runs/2026-11-13T21-37-53-739Z-build-FASH-05/`: static-audit.json, interaction-tests.log, node-check.log, qc-attempt.log, qc-attempt-status.json and preservation hashes/archive. Executed results and seven gates are recorded in generation-metadata.json. Mocked JavaScript execution is distinct from browser interaction, native validation, layout or accessibility testing. No conformance claim. Rendered source fidelity, browser keyboard behavior, responsive/zoom layout, screen readers and initial/stateful axe testing require independent review. No source menu activation or form success was observed. No retail pages, author archive, carousel, lightbox, video, dedicated newsletter page, account or checkout were invented.
'''
(root/'README.md').write_text(readme)
(root/'fidelity-notes.md').write_text('''# Fidelity notes

Replicated: approved five-page map; delivery/country utility concept, brand and nested Community navigation, home seasonal feature and magazine entry, magazine introduction/category bands, article heading/body and comment affordance, seasonal imagery/quotation/related craft, search form, newsletter callout, grouped footer. Source evidence: Websites/pipelines/codex/research/FASH.md#fash-05--toast and task.md; original verification was HTTP/text only.

Approximated: geometry, spacing, typography, muted palette, responsive arrangement and original editorial illustrations. No source screenshots were available, so visual similarity is unverified. The utility line is static and identifies a demo region, not a functional country selector. Retail menu branches are reduced to an explicit editorial-only navigation; no commerce actions appear.

Simulated: newsletter email confirmation, comment preview, six-record article search, responsive menu activation. These recreate indicated affordances, not observed source transaction states. Search excludes products, an intentional disclosed scope reduction. Magazine teasers share story/concept destinations rather than adding speculative detail pages. All names, writing and artwork are fictional/original; no real endorsement.

Added: 404 recovery page required by protocol, visible demonstration disclosures, accessible status feedback, mobile button/Escape handling, local validation and no-JavaScript search fallback. These are implementation decisions, not verified source behaviors.

Omitted: retail/account/bag/checkout, video playback, external social/legal destinations and unavailable corporate pages; no mapped source screens removed. No independently observed author archive or interactive gallery, therefore none added. Seasonal concept remains a static visual narrative.

Unverified: rendered source/layout, source responsive behavior, source menu/search/form execution. Delivered browser rendering, axe and native keyboard/screen-reader/reflow checks remain subject to the actual QC evidence; mocked tests cannot establish these. No accessibility conformance is asserted.
''')
from html.parser import HTMLParser
class Parser(HTMLParser):
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if 'data-component' in a: instances.setdefault(a['data-component'],[]).append({'page':self.page,'section':a.get('data-section'),'selector':f"[data-section='{a.get('data-section')}'][data-component='{a['data-component']}']"})
instances={};parser=Parser()
for p in root.glob('*.html'):parser.page=p.name;parser.feed(p.read_text())
instances.setdefault('story-card',[]).append({'page':'search.html','section':'search-results','selector':"#search-results [data-component='story-card']",'generated_by':'js/main.js renderSearch'})
components=[]
for c,loc in sorted(instances.items()):
 behaviors={'primary-nav':['mobile disclosure button, expanded state and Escape focus return'],'disclosure-menu':['native details/summary; Escape closes and focuses summary'],'search-form':['local six-record search including initial query, blank and empty states'],'newsletter-form':['email validation and demo status focus'],'comment-form':['required fields and email validation; safe preview and status focus'],'story-card':['relative editorial destination link; search cards generated via DOM textContent']}
 components.append({'id':c,'selector':f"[data-component='{c}']",'pages':sorted(set(l['page'] for l in loc)),'instances':loc,'behavior':behaviors.get(c,['static semantic region or relative local links']),'keyboard':['Tab / Shift+Tab for contained links or fields','Enter for links; Enter/Space for native buttons and summary where present','Escape for menu/disclosure where relevant'],'status':'implemented','validation':'static audited; relevant delivered-JS behavior tested with DOM mocks; browser/native interaction not-tested'})
(root/'component-inventory.json').write_text(json.dumps({'protocol_version':'1.0','replica_id':'FASH-05','category':'fashion','source_url':src['source_url'],'components':components},indent=2))
meta={'allocation_protocol':'WEB-REPLICA-ALLOCATION-V1.0','generation_protocol':'WEB-REPLICA-V1.0','category':'fashion','slot':5,'source_id':'FASH-05','model_group':'codex','model_id':'gpt-6.1-sol','model_version':None,'model_provider_or_runtime':ctx['model']['runtime'],'model_attribution':'parent orchestration declaration and supplied assignment; release/version not exposed or independently authenticated by worker','generation_mode':'single assigned collaboration worker in isolated snapshot; parent coordinates three separately scoped deliveries','operator':'Samhith Varma','approved_source_url':src['source_url'],'source_name':'TOAST','source_verified_at':src['verified_at'],'source_verification_method':src['verification_method'],'source_verification_result':'verified for HTTP availability only','source_evidence_reference':src['evidence_reference'],'source_approved_at':src['approved_at'],'approval_reference':src['approval_reference'],'generation_started_at':(run/'generation-start.txt').read_text(),'generation_completed_at':None,'rules_revision':ctx['protocol_snapshots'][0]['sha256'],'allocation_revision':ctx['protocol_snapshots'][1]['sha256'],'category_prompt_revision':ctx['protocol_snapshots'][3]['sha256'],'prompt_or_transcript_reference':str(run/'task.md'),'prompt_sha256':hashlib.sha256((run/'task.md').read_bytes()).hexdigest(),'protocol_snapshots':ctx['protocol_snapshots'],'source_page_map':pages,'active_allocation':'all ten slots; Codex own slots approved under per-group readiness','tool_access':['exec_command local Python file generation/audit','Node vm actual-delivered-JS mock tests','shared external qc.js Playwright attempt'],'generation_budget':None,'human_edits':[],'cross_model_edits':[],'retries':[],'validation_summary':{k:'not-tested' for k in ['technology','completeness','structure','interaction','accessibility','traceability','scope']},'validation_evidence':str(run),'limitations':['Source rendered geometry and interactions unverified','Browser/axe result to be recorded after actual shared QC attempt','No independent runtime release authentication']}
(root/'generation-metadata.json').write_text(json.dumps(meta,indent=2))
with tarfile.open(run/'first-artifact.tar.gz','w:gz') as t:t.add(root,arcname='FASH-05')
(run/'first-artifact-sha256.json').write_text(json.dumps({str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(root.rglob('*')) if p.is_file()},indent=2))
print('Wrote docs/inventory/metadata and preserved first artifact')
