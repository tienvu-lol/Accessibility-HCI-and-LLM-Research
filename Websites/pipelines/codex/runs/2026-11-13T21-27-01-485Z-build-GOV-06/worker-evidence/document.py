from pathlib import Path
import json,hashlib,datetime,shutil,tarfile
from html.parser import HTMLParser
r=Path('/private/tmp/codex-gov-06-96l7nowh/repository/Websites');run=r/'pipelines/codex/runs/2026-11-13T21-27-01-485Z-build-GOV-06'; s=r/'government/codex/GOV-06'; task=json.loads((run/'run.json').read_text());source=task['selected_source'];maps=json.loads(source['source_pages']); pages=[p['local_file'] for p in maps]+['404.html']
class P(HTMLParser):
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('data-component'): instances.setdefault(a['data-component'],[]).append({'page':file,'element':tag,'section':a.get('data-section'),'selector':'[data-component="'+a['data-component']+'"][data-section="'+a.get('data-section','')+'"]'})
instances={}
for file in pages: P().feed((s/file).read_text())
instances['search-result']=[{'page':p,'element':'li','section':'site-search-results','selector':'#search-results [data-component="search-result"]','generated_by':'js/main.js on search submit'} for p in pages]
behaviors={'site-header':'Brand navigation and disclosure buttons','primary-nav':'Relative page navigation, current-page indication; menu disclosure','search-drawer':'Inline disclosure with query input focused on open; Escape restores trigger focus','search-form':'Client-side all-words lookup over five page records; empty-query and no-match statuses','feature-slideshow':'Manual previous/next cycling of three features; no automatic motion or timer','news-filter-form':'Intersection of subject/date/office/region/language criteria, explicit Go and reset','contact-form':'Optional email validation, required topic and question, first-error focus, local demo confirmation focus','side-navigation':'Section navigation disclosure; Escape restores trigger focus'}
components=[]
for name,loc in instances.items():
 components.append({'id':name,'selector':'[data-component="'+name+'"]','pages':sorted(set(x['page'] for x in loc)),'instances':loc,'behavior':[behaviors.get(name,'Semantic content or local navigation')],'keyboard':['Tab and Shift+Tab for links/controls','Enter for links; Enter/Space for buttons','Native select navigation where applicable','Escape for disclosures only'],'status':'implemented','validation':'static inventory generated from initial HTML; interaction and browser execution pending'})
(s/'component-inventory.json').write_text(json.dumps({'protocol_version':'1.0','replica_id':'GOV-06','category':'government','source_url':source['source_url'],'components':components},indent=2))
maptext='\n'.join('- `'+p['local_file']+'` ← '+p['url'] for p in maps)+'\n- `404.html` — protocol-required local addition; missing-page HTTP heading evidence exists, rendered source layout unverified.'
(s/'README.md').write_text('''# GOV-06 · Aster Environmental Agency

Fictional research demo inspired by the approved U.S. Environmental Protection Agency information architecture. Aster is an invented jurisdiction; this site has no governmental authority, operational services, emergency response, applications or message delivery. All prose and SVG artwork are original.

## Source and scope

Source: https://www.epa.gov/ . Verified 2026-11-12T00:55:55.417382+00:00 by live web search/open/click text extraction plus urllib HTTP GET (HTTP 200 for the five mapped pages). No rendered reference inspection or source interaction execution occurred. Source approval: Samhith Varma, 2026-11-12, `metadata/change-log.md` “Codex Phase A approval (slots 04–06)”; historical provisional wording in research notes is superseded by that approval and the active-allocation amendment. Active allocation is slots 01–06; open-source slots 07–10 remain deferred.

## Complete sitemap and source mapping

'''+maptext+'''

## Run locally

Open `index.html` directly in a browser, then use ordinary relative links. No server, build step, dependencies or network is required. JavaScript enables search, filters, disclosures, slideshow and form validation. No information is sent or stored; reloading clears entered values. The dedicated 404 is reached explicitly; file:// does not route missing paths automatically.

## Samples and interactions

- Five inline page search records; all entered words must match the title or keywords. Try “water”, “enforcement”, an empty query and “zzzz”. Results appear in the search drawer, with a status message.
- Three manual slideshow features. Previous and next wrap around. There is no auto-advance, pause control or motion timer.
- Eight environmental subject sections, three fictional regional offices, three sample headquarters offices, three home resource cards and three home news cards.
- Five fictional news releases across three subjects, three dates, three offices, three regions and two content languages. Go combines criteria; reset restores all. Language classifies release content and never translates the website. Try Air + Coast for an empty result.
- Three question topics. Optional email is checked if entered; topic and a 10–1000-character fictional question are required. Errors mark fields and focus the first invalid field; success focuses an explicit local-only confirmation. No question, incident or report reaches anyone.
- Menu and search drawers close each other. Escape closes an open drawer and restores its trigger. News/contact local navigation can also be collapsed. All use native buttons and normal document flow, not modal dialogs.

## Evaluation evidence

Run evidence: `pipelines/codex/runs/2026-11-13T21-27-01-485Z-build-GOV-06/` in the repository. Initial artifact and hashes are preserved before audit or corrective edits. See `validation.json`, `static-audit.json`, `interaction-tests.log`, `qc-initial.log` and `qc-attempt.json` when generated. Shared QC will be attempted once without changing the tool; browser/axe/reflow status remains not-tested if launch is blocked. Exact gate status is in generation-metadata.json.

## Limits

Layout, spacing and responsive behavior approximate extracted structure; no pixel-fidelity claim. No official seals, real officials, testimonials, real addresses or operational notices. No reporting portal, calendar, translation widget, third-party search, live careers/grants or social network integration. Footer Follow routes to local news. Source snippets differed in freshness; all dates/content here are fictional samples. Native browser, screen reader, zoom, rendered focus/contrast, responsive and reference-fidelity inspection require further testing. WCAG 2.2 AA is an implementation target, not a conformance claim.
''')
(s/'fidelity-notes.md').write_text('''# Fidelity notes — GOV-06

## Replicated structure

The five approved source templates map exactly as listed in README. All pages repeat a research-notice band, agency masthead, primary navigation/search affordances, main landmark and four grouped footer columns. Home follows a feature/slideshow → career/grant/water resources → news sequence. Topics groups eight environmental subjects. About follows headquarters → regional offices → headquarters offices → related resources. News combines subject/date/office/location/language browsing with a newsroom sidebar. Enforcement contact provides guidance and the question form with a local sidebar. These are text/HTTP-observed structural patterns, not verified rendered geometry.

## Approximated

The dark blue masthead, serif headings, content widths, green resource rules, two-column feature and interior sidebars are an original visual approximation. SVG landscape and building illustrations replace all real photography and branding. The fictional jurisdiction and agency identity replace EPA names in visible content. Three regions and offices provide representative content without claiming coverage of the real organization.

## Simulated

Search uses five inline page records instead of the source's external GET service. News Go applies an intersection across five local release attributes instead of navigating to live browse services; the dataset and releases are invented. The enforcement question form validates sample inputs and displays a local confirmation; no POST, reporting or delivery occurs. Its source required topic is retained; the question minimum is an explicit research validation decision. Source CAPTCHA/honeypot and mailing addresses are omitted because this site has no server or real contact purpose.

## Added and inferred

Conspicuous demo notices, disclosure Escape behavior and validation/error focus management are research/accessibility additions. Menu/search opening, slideshow cycling and sidebar disclosure behavior are inferred from observed control markup because source interactions were not executed. Manual cycling avoids an unobserved timing assumption. Search-result metadata and status messaging are implementation additions. The protocol-required 404 provides helpful local routes; source HTTP not-found text was observed but rendered layout was not.

## Omitted

No uninspected calendars, report portal, account/application flow, emergency service, real contact details or translation widget. Language browsing is content classification only. Careers/grants link to clearly labeled explanatory sections rather than inventing transactional pages. Footer social destinations are approximated by the local news collection; no copied social logo or dead link is supplied.

## Unverified

Reference visual fidelity, responsive/menu rendering, source keyboard and form behavior, and freshness are unverified. Browser launch, axe and real keyboard/screen-reader/reflow/zoom checks must be reported separately from static and mocked-DOM tests. No conformance, measured outcome or pixel-perfect claim is made.
''')
meta={'allocation_protocol':'WEB-REPLICA-ALLOCATION-V1.0','generation_protocol':'WEB-REPLICA-V1.0','category':'government','slot':6,'source_id':'GOV-06','model_group':'codex','model_id':'gpt-6.1-sol','model_version':None,'model_provider_or_runtime':'OpenAI collaboration worker (gpt-6.1-sol), orchestrated in Codex','model_attribution':'Task/runtime declaration identifies model; independent release/build identifier unavailable.','generation_mode':'single assigned parallel worker in isolated filesystem snapshot; local-only HTML/CSS/vanilla JavaScript','operator':'Samhith Varma','approved_source_url':source['source_url'],'source_verified_at':source['verified_at'],'source_verification_method':source['verification_method'],'source_verification_result':'verified HTTP availability only; rendered/interaction unverified','source_approved_at':source['approved_at'],'source_approved_by':source['approved_by'],'approval_reference':source['approval_reference'],'source_evidence_reference':source['evidence_reference'],'generation_started_at':json.loads((run/'generation-start.json').read_text())['started_at'],'generation_completed_at':None,'rules_revision':'sha256:'+task['protocol_snapshots'][0]['sha256'],'allocation_revision':'sha256:'+task['protocol_snapshots'][1]['sha256'],'category_prompt_revision':'sha256:'+task['protocol_snapshots'][3]['sha256'],'prompt_or_transcript_reference':str(run.relative_to(r))+'/task.md; sha256:'+task['task_sha256'],'protocol_snapshots':task['protocol_snapshots'],'tool_access':['shell filesystem execution','real UTC clock','shared external QC evaluation tool; browser launch may be restricted'],'generation_budget':None,'active_allocation':{'slots':[1,2,3,4,5,6],'deferred':[7,8,9,10]},'human_edits':[],'cross_model_edits':[],'retries':[],'validation_summary':{k:'not-tested' for k in ['technology','completeness','structure','interaction','accessibility','traceability','scope']},'limitations':['No rendered source inspection','No conformance claim','No hosting, commits or shared metadata edits by worker']}
(s/'generation-metadata.json').write_text(json.dumps(meta,indent=2))
# Immutable initial evidence is outside replica.
initial=run/'initial-artifact';shutil.copytree(s,initial)
hashes={str(f.relative_to(initial)):hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(initial.rglob('*')) if f.is_file()};(run/'initial-hashes.json').write_text(json.dumps(hashes,indent=2))
(run/'revision-log.json').write_text(json.dumps([{'revision':'initial-generated-artifact','at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'changes':'First complete six-page implementation and research documents preserved before audits or corrections.','hashes':'initial-hashes.json'}],indent=2))
print('Preserved',len(hashes),'initial files and',len(components),'component patterns')
