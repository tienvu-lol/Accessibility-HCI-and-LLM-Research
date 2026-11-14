from pathlib import Path
import json,datetime,hashlib,tarfile
root=Path('Websites'); run=root/'pipelines/codex/runs/2026-11-13T21-13-32-919Z-build-NEWS-05'; site=root/'news/codex/NEWS-05'; task=json.loads((run/'run.json').read_text()); source=task['selected_source']; pages=json.loads(source['source_pages']); names=[p['local_file'] for p in pages]+['404.html']; now=datetime.datetime.now(datetime.timezone.utc).isoformat()
metadata={'allocation_protocol':'WEB-REPLICA-ALLOCATION-V1.0','generation_protocol':'WEB-REPLICA-V1.0','category':'news','slot':5,'source_id':'NEWS-05','model_group':'codex','model_id':'gpt-6.1-sol','model_version':None,'model_provider_or_runtime':task['model']['runtime'],'model_attribution':'Declared task/session worker model; exact release version unavailable, not independently authenticated','generation_mode':'Isolated local-only collaboration worker; one approved replica','operator':'Samhith Varma','approved_source_url':source['source_url'],'source_name':source['source_name'],'source_verified_at':source['verified_at'],'source_verification_method':source['verification_method'],'source_verification_result':'HTTP availability verified; browser/runtime unverified','source_approved_at':source['approved_at'],'source_approval_reference':source['approval_reference'],'generation_started_at':(run/'generation-start.txt').read_text(),'generation_completed_at':now,'rules_revision':task['protocol_snapshots'][0]['sha256'],'category_prompt_revision':task['protocol_snapshots'][4]['sha256'],'protocol_snapshots':task['protocol_snapshots'],'prompt_or_transcript_reference':str(run/'task.md'),'task_sha256':task['task_sha256'],'human_edits':[],'cross_model_edits':[],'retries':[],'budget':None,'active_allocation':{'slots':[1,2,3,4,5,6],'deferred':[7,8,9,10],'approval_policy':'per model group'},'validation_summary':{x:'not-tested' for x in ['technology','completeness','structure','interaction','accessibility','traceability','scope']},'limitations':['Source evidence is HTTP-only; rendered layout and source interactions unverified.','Browser/axe, screen reader, zoom, reflow and real keyboard checks pending.']}
(site/'generation-metadata.json').write_text(json.dumps(metadata,indent=2)+'\n')
mapping='\n'.join('| '+p['local_file']+' | '+p['url']+' |' for p in pages)
(site/'README.md').write_text('''# NEWS-05 — Ridgeway News

Fictional local/regional newsroom inspired by the approved Cardinal News information architecture. Original prose and four original local SVG illustrations. This is an independent static research artifact, not an official news service.

## Source and scope

Source: https://cardinalnews.org/ . Verification: 2026-11-12T00:54:46.019250+00:00, live web discovery/extracted text and direct urllib HTTPS GET. Availability verified by HTTP only. No source browser, menu, newsletter submission or responsive behavior was executed. Approval: Samhith Varma, 2026-11-12, `metadata/change-log.md`, Codex Phase A approval. Earlier provisional research wording is superseded by that approval and the active-allocation amendment. Slots 01–06 are active; 07–10 deferred, with approval per group.

## Run

Open `index.html` directly in a browser. All assets, links and logic work without a server or network. JavaScript enables local search, article selection, disclosure, share-address feedback and form validation. Without JS, navigation/content remain readable; search explains its limitation. No address, membership or payment data is sent or saved.

## Complete sitemap and source mapping

| Local page | Source URL |
|---|---|
'''+mapping+'''
| 404.html | Diagnostic Cardinal invalid-path response (HTTP 404) |

## Sample data and behavior

Eight fictional stories, six geography groups, five newsletter choices and four SVG landscapes. Every story link uses `article.html?story=0` through `7`, changing headline, deck, geography and illustration; the common fictional article body deliberately discusses a generic consultation process. Main navigation repeats in HTML on every page. The expanded directory offers geography anchors and topic searches. Escape closes it and returns focus to its button.

Search matches headline, region and summary, case-insensitively. Try `housing`, `transit`, `library`, an empty query and `zzzz`. Positive results simulate a local dataset; source positive-result behavior was not verified. Newsletter validation requires a valid email and at least one choice; success explicitly creates no subscription. Share displays a local address without a clipboard/network dependency. Support routes to the FAQ funding explanation. Sign-in is visibly unavailable; no account or payment control is implied. FAQ uses linked answers, not an invented accordion.

## Validation

Evidence is in `pipelines/codex/runs/2026-11-13T21-13-32-919Z-build-NEWS-05/`. Initial artifact archive and SHA-256 manifest precede checks/corrections. See `validation-report.json`, `interaction-tests.log` and `qc-initial.log` for actual results. Browser/axe and actual keyboard, screen-reader, zoom and rendered fidelity checks must remain not-tested when browser launch is blocked. No conformance or pixel-fidelity claim is made.

## Files and provenance

8 HTML pages, shared `css/styles.css`, shared `js/main.js`, 4 SVGs and 4 documentation/provenance files: 18 files total. Generated as gpt-6.1-sol in the declared OpenAI collaboration worker runtime; exact release string unavailable. Protocol snapshots/task hashes are recorded in generation-metadata.json. No human or cross-model site edits at generation handoff.
''')
(site/'fidelity-notes.md').write_text('''# Fidelity notes — NEWS-05

The supplied research is HTTP extraction, not screenshots. Position, color, typography, spacing, responsive breakpoints and exact visual fidelity are approximations. No browser behavior is attributed to the source.

| Status | Mapping and decision |
|---|---|
| Replicated structure | Masthead/strapline and utilities; nested geography/topic directory and search; latest then Roanoke, New River, Lynchburg, Southwest, Danville and Martinsville bands; grouped topic/about/member footer. |
| Replicated structure | Politics archive; article headline/deck/byline, share region, image, body, author, popular stories, related and previous/next links; FAQ contents and answers; about mission/annual-report information. |
| Approximated | Original serif wordmark, red/black newspaper treatment and desktop column grids; no rendered source evidence established exact layout. Six bands contain representative subsets rather than every source story. |
| Simulated | Search over eight fictional records, five-choice newsletter validation/success, inline share-address display and eight selected article headers. Shared article body is intentionally generic, original fictional prose. |
| Inferred | Menu disclosure, Escape/focus return and newsletter success are local implementations; source runtime was not observed. |
| Added | Responsive CSS and explicit research notices; accessible validation, local positive search results, meaningful focus/status feedback. 404 is protocol-required and supported by diagnostic source HTTP 404. |
| Omitted | Real sign-in, payment/donation, external social services, trackers, consent services, annual PDF download, video, real weather and account verification. Sign-in is explicit unavailable text; support explains funding. No separate paid subscription or latest/most-read tabs: not observed. |
| Unverified | Rendered source hierarchy, visual placement, dynamic behavior, consent, responsive layout, successful enrollment and positive source search. The source query housing returned Nothing Found; its cause remains unknown. |

No copied logo, article prose, author identity, media, testimonials or claims of measured outcomes. The site is independent and uses fictional Ridgeway branding. No source re-verification was attempted during generation; source evidence and approval remain the supplied research snapshots.
''')
components=[('site-header',names,['masthead and utilities']),('primary-nav',names,['consistent direct page/anchor navigation']),('navigation-disclosure',names,['toggle directory','Escape closes and returns focus']),('search-form',names,['GET to local search']),('site-footer',names,['grouped local links']),('lead-grid',['index.html'],['lead and latest hierarchy']),('story-card',['index.html','politics.html','article.html'],['selected fictional article links']),('regional-band',['index.html'],['six geography bands']),('newsletter-callout',['index.html','politics.html'],['newsletter information/link']),('article-list',['politics.html'],['archive']),('breadcrumb',['article.html'],['hierarchical links']),('article-detail',['article.html'],['query-selected headline/deck/image']),('share-tools',['article.html'],['show local share address']),('article-figure',['article.html','about.html'],['local illustration and caption']),('author-bio',['article.html'],['fictional author context']),('popular-list',['article.html'],['ranked story links']),('related-stories',['article.html'],['related story links']),('post-navigation',['article.html'],['previous/next links']),('search-results',['search.html'],['local results and empty state']),('search-result',['search.html'],['generated result link']),('newsletter-form',['newsletters.html'],['five choices','email/list validation','explicit demo success']),('prose-section',['about.html'],['mission/annual overview/standards']),('table-of-contents',['faq.html'],['answer anchor navigation']),('faq-answer',['faq.html'],['free-access/funding explanations'])]
(site/'component-inventory.json').write_text(json.dumps({'protocol_version':'1.0','replica_id':'NEWS-05','category':'news','source_url':source['source_url'],'components':[{'id':id,'selector':f'[data-component="{id}"]','pages':ps,'behavior':behavior,'keyboard':['Tab','Enter']+(['Space','Escape'] if id=='navigation-disclosure' else ['Space'] if id in ['newsletter-form','share-tools'] else []),'status':'implemented','validation':'not-tested in browser; see run evidence for static/VM checks'} for id,ps,behavior in components]},indent=2)+'\n')
manifest={str(p.relative_to(site)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(site.rglob('*')) if p.is_file()}; (run/'initial-artifact-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
with tarfile.open(run/'initial-artifact.tar.gz','w:gz') as t:t.add(site,arcname='NEWS-05')
(run/'correction-log.json').write_text(json.dumps({'initial_preserved_at':now,'corrections':[],'qc_attempts':[]},indent=2))
print('Initial complete artifact preserved:',len(manifest),'files')
