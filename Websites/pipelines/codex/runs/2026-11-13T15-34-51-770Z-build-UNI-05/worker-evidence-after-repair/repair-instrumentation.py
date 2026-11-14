from pathlib import Path
import re,json,datetime,hashlib
root=Path('/private/tmp/codex-uni-05-qrbdqs8r/repository');site=root/'Websites/university/codex/UNI-05';run=root/'Websites/pipelines/codex/runs/2026-11-13T15-34-51-770Z-build-UNI-05';inventory=json.loads((site/'component-inventory.json').read_text());previous={x['id']:x for x in inventory['components']};components={};changes=[]
void={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
for page in sorted(site.glob('*.html')):
 stack=[];counts={};count=0
 def tag(match):
  global count
  text=match.group();close=re.match(r'</([\w-]+)',text)
  if close:
   for i in range(len(stack)-1,-1,-1):
    if stack[i][0]==close[1]:del stack[i:];break
   return text
  m=re.match(r'<([\w-]+)\b',text)
  if not m:return text
  name=m[1];attrs=dict(re.findall(r'([\w-]+)="([^"]*)"',text));section=attrs.get('data-section');component=attrs.get('data-component');meaningful=name in ['header','nav','main','footer','section','article','aside','form'] or section or component
  if meaningful:
   parent=next((x[1].get('data-section') for x in reversed(stack) if x[1].get('data-section')),page.stem)
   if not section:
    section={'breadcrumbs':'breadcrumb-navigation','utility-nav':'recruitment-navigation','site-search':'site-search','program-card':'program-results','news-item':'news-results','feature-card':parent,'card-grid':parent,'aid-guidance':'cost-guidance','cost-table':'cost-overview','visit-slideshow':'campus-scenes','visit-question':'visit-preparation','policy-disclosure':'application-policies'}.get(component)
    if not section:section='footer-'+re.sub('[^a-z0-9]+','-',attrs.get('aria-label','navigation').lower()).strip('-') if name=='nav' else component or parent
    text=text[:-1]+f' data-section="{section}">';count+=1
   if not component:
    component={'main':'main-content','nav':'secondary-nav','section':'content-section'}.get(name,name+'-region')
    text=text[:-1]+f' data-component="{component}">';count+=1
   counts[component]=counts.get(component,0)+1;instance=f'{page.stem}-{component}-{counts[component]}'
   text=text[:-1]+f' data-instance="{instance}">';attrs.update({'data-section':section,'data-component':component})
   components.setdefault(component,[]).append({'page':page.name,'section':section,'instance':instance,'selector':f'[data-component="{component}"][data-instance="{instance}"]'})
  if name not in void and not text.endswith('/>'):stack.append((name,attrs))
  return text
 page.write_text(re.sub(r'</?[A-Za-z][^>]*>',tag,page.read_text()));changes.append({'page':page.name,'attributes_added':count})
new=[]
for component,instances in sorted(components.items()):
 entry=previous.get(component,{'id':component,'behavior':['semantic content region; local navigation where present'],'keyboard':['Tab to descendant controls; Enter to follow links'],'status':'implemented','validation':'static-inspected; browser not-tested'}).copy();entry['selector']=f'[data-component="{component}"]';entry['pages']=sorted(set(x['page'] for x in instances));entry['instances']=instances;new.append(entry)
inventory['components']=new;inventory['inventory_note']='Every semantic region and existing component container has both attributes and a unique page-scoped data-instance. Instances reflect final corrected HTML.';(site/'component-inventory.json').write_text(json.dumps(inventory,indent=2))
now=datetime.datetime.now(datetime.timezone.utc).isoformat();record={'corrected_at':now,'worker_model':'gpt-6.1-sol','reason':'Coordinator source review identified missing region/component instrumentation','changes':changes,'human_edits':[],'scope':'metadata attributes and inventory only; presentation and interaction code unchanged','browser_tests':'not rerun; prior launch blocker remains','initial_artifact':'initial-generated-artifact.tar.gz preserved unchanged'};(run/'instrumentation-correction.json').write_text(json.dumps(record,indent=2))
m=json.loads((site/'generation-metadata.json').read_text());m['retries'].append(record);m['generation_completed_at']=now;m['validation_evidence']['instrumentation']='instrumentation-correction.json and instrumentation-audit.json';(site/'generation-metadata.json').write_text(json.dumps(m,indent=2))
with (site/'README.md').open('a') as f:f.write('\nCoordinator source review identified incomplete instrumentation. The same gpt-6.1-sol worker added both region/component attributes and unique instance selectors throughout all semantic regions and existing component containers, then regenerated the inventory. Original artifact preserved; correction evidence: `instrumentation-correction.json` and `instrumentation-audit.json`. Presentation and interaction code were unchanged.\n')
with (site/'fidelity-notes.md').open('a') as f:f.write('\nPost-generation worker correction: completed descriptive research instrumentation and exact component instance inventory following coordinator source review. No visual, content or interaction changes.\n')
with (run/'correction-log.md').open('a') as f:f.write('\nCoordinator subsequently identified incomplete instrumentation. Same worker added missing data-section/data-component attributes across all 9 pages, preserving all existing values and adding page-scoped data-instance selectors. Exact instances regenerated in component inventory. Original archive unchanged. This is a model-only post-review repair, not an unmodified initial output. See instrumentation-correction.json and audit.\n')
rr=json.loads((run/'run.json').read_text());rr['retries'].append(record);rr['generation_completed_at']=now;(run/'run.json').write_text(json.dumps(rr,indent=2))
print(json.dumps(changes,indent=2))
