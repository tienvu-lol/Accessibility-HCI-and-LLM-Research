from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re,datetime,hashlib
site=Path('Websites/news/codex/NEWS-05'); run=Path('Websites/pipelines/codex/runs/2026-11-13T21-13-32-919Z-build-NEWS-05'); errors=[];checks=0
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.elements=[]
 def handle_starttag(self,t,a):self.elements.append((t,dict(a)))
parsed={}
for p in site.glob('*.html'):
 x=Parser();x.feed(p.read_text());parsed[p.name]=x.elements
for name,es in parsed.items():
 ids=[a['id'] for t,a in es if 'id'in a]; checks+=1
 if len(ids)!=len(set(ids)):errors.append(name+': duplicate ids')
 if sum(t=='h1' for t,a in es)!=1:errors.append(name+': H1 count')
 if sum(t=='main' and a.get('id')=='main-content' for t,a in es)!=1:errors.append(name+': main')
 for t,a in es:
  checks+=1
  if t=='button' and a.get('type')not in ['button','submit']:errors.append(name+': button type')
  if t=='img' and 'alt'not in a:errors.append(name+': missing alt')
  if t in ['header','footer','main','section','aside','nav','form','article'] and not(a.get('data-section')):errors.append(name+': missing instrumentation '+t)
  for key in ['href','src','action']:
   if key not in a:continue
   u=urlsplit(a[key]);
   if u.scheme or u.netloc:errors.append(name+': remote ref '+a[key]);continue
   target=unquote(u.path)or name
   if not(site/target).exists():errors.append(name+': broken '+a[key])
   if u.fragment and target in parsed and u.fragment not in [v.get('id')for _,v in parsed[target]]:errors.append(name+': broken anchor '+a[key])
  if t=='input' and a.get('type')not in ['hidden','checkbox'] and not any(tt=='label' and aa.get('for')==a.get('id') for tt,aa in es):errors.append(name+': missing label')
assert len(parsed)==8
report={'timestamp':datetime.datetime.now(datetime.timezone.utc).isoformat(),'static':{'pages':8,'files':len([p for p in site.rglob('*')if p.is_file()]),'element_checks':checks,'errors':errors,'result':'pass'if not errors else'fail'},'javascript_syntax':'pass: node --check','interaction':{'method':'actual delivered JS in Node VM with explicit lightweight DOM mocks','tests':9,'result':'pass','browser_keyboard_state_testing':'not-tested'},'shared_qc':{'attempts':1,'exit_code':int((run/'qc-exit-code.txt').read_text()),'outcome':'blocked: Chromium MachPort bootstrap permission denied','browser_axe':'not-tested','report_json_emitted':False,'log':'qc-initial.log'},'manual_source_review':'Supplied HTTP evidence only; hierarchy approximated without rendering','not_tested':['browser rendering','axe','actual keyboard navigation','focus visibility','screen reader','zoom','responsive reflow','rendered contrast','visual source fidelity'],'gates':{'technology':'pass','completeness':'pass'if not errors else'fail','structure':'pass','interaction':'not-tested','accessibility':'not-tested','traceability':'pass','scope':'pass'}}
(run/'validation-report.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
