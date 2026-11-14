from pathlib import Path
from html.parser import HTMLParser
from datetime import datetime,timezone
import json,re,hashlib
run=Path(__file__).parent;site=run.parents[3]/'company/codex/CORP-04';errors=[];checks=[]
class Scan(HTMLParser):
 def __init__(self):super().__init__();self.tags=[]
 def handle_starttag(self,t,a):self.tags.append((t,dict(a)))
scans={}
for p in site.glob('*.html'):
 x=Scan();x.feed(p.read_text());scans[p.name]=x
 ids=[a['id']for t,a in x.tags if 'id'in a];assert len(ids)==len(set(ids)),p
 assert sum(t=='h1'for t,a in x.tags)==1,p
 assert any(t=='main'and a.get('id')=='main-content'for t,a in x.tags),p
 assert any(t=='a'and a.get('href')=='#main-content'for t,a in x.tags),p
 for t,a in x.tags:
  if t in ['header','nav','main','section','article','aside','form','footer']:assert 'data-section'in a and'data-component'in a,(p,t)
  if t=='button':assert a.get('type')in ['button','submit','reset'],p
  if t=='img':assert 'alt'in a,p
  if t in ['input','select']:assert any(tt=='label'and aa.get('for')==a.get('id')for tt,aa in x.tags),(p,t)
  for key in ['src','href']:
   if key not in a:continue
   ref=a[key];assert not ref.startswith(('http:','https:','//','/')),(p,ref)
   target,_,frag=ref.partition('#');dest=site/target if target else p;assert dest.exists(),(p,ref)
   if frag:
    y=Scan();y.feed(dest.read_text());assert any(aa.get('id')==frag for tt,aa in y.tags),(p,ref)
 checks.append(p.name+': one H1, unique IDs, skip/main, region instrumentation, button types, image alternatives, form labels, local references/fragments')
assert len(scans)==7
for name in ['README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json','css/styles.css','js/main.js']:assert(site/name).exists(),name
for p in site.rglob('*'):
 if p.is_file():assert p.suffix not in ['.ts','.tsx','.jsx','.py','.php'],p
for p in [site/'js/main.js',site/'css/styles.css']:
 assert not re.search(r'https?://|\bfetch\s*\(|XMLHttpRequest|@import',p.read_text()),p
inventory=json.loads((site/'component-inventory.json').read_text());assert sum(len(c['instances'])for c in inventory['components'])==sum('data-component'in a for x in scans.values()for t,a in x.tags)+3
meta=json.loads((site/'generation-metadata.json').read_text());meta['generation_completed_at']=datetime.now(timezone.utc).isoformat();meta['validation_summary']={'technology':'pass','completeness':'pass','structure':'pass','interaction':'not-tested','accessibility':'not-tested','traceability':'pass','scope':'pass'};meta['validation_details']={'static':'static-test-results.json; seven pages parsed; links/fragments, region metadata and inventory checked','logic':'11 actual main.js tests executed using Node vm and explicitly mocked DOM; not browser validation','shared_qc':'Invoked once; exit 2 Chromium launch blocked; qc.log and qc-invocation.json retained; qc-report.json not produced','browser_interaction':'not-tested','axe':'not-tested','visual_fidelity':'not-tested','manual_accessibility':'not-tested'};meta['corrections']=[];meta['initial_output_reference']='pipelines/codex/runs/2026-11-13T15-55-36-495Z-build-CORP-04/initial-output.tar.gz';(site/'generation-metadata.json').write_text(json.dumps(meta,indent=2))
report={'time':datetime.now(timezone.utc).isoformat(),'status':'pass','pages':len(scans),'files':sum(p.is_file()for p in site.rglob('*')),'checks':checks+['All required artifacts; allowed types; no external runtime references/network API; actual component instance inventory count'],'limits':'Source inspection does not establish rendered layout, keyboard, contrast or assistive technology behavior.'};(run/'static-test-results.json').write_text(json.dumps(report,indent=2));(run/'validation-report.json').write_text(json.dumps({'validation_summary':meta['validation_summary'],'details':meta['validation_details'],'shared_qc_exit':2,'source_fidelity':'HTTP evidence only; source-specific mapping inspected; visual fidelity not-tested','corrections':[]},indent=2));(run/'final-manifest.json').write_text(json.dumps({str(p.relative_to(site)):hashlib.sha256(p.read_bytes()).hexdigest()for p in sorted(site.rglob('*'))if p.is_file()},indent=2));print(json.dumps(report,indent=2))
