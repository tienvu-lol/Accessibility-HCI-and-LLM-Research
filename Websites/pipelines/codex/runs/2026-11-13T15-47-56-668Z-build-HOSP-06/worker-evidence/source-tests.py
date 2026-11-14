from pathlib import Path
from html.parser import HTMLParser
import json, re
root=Path('Websites/healthcare/codex/HOSP-06'); errors=[]; actual=[]
class Parser(HTMLParser):
 def __init__(self,p):super().__init__();self.p=p;self.nodes=[]
 def handle_starttag(self,t,attrs):self.nodes.append((t,dict(attrs)))
parsed={}
for p in root.glob('*.html'):
 x=Parser(p);x.feed(p.read_text());parsed[p.name]=x.nodes
for name,nodes in parsed.items():
 ids=[a['id'] for t,a in nodes if 'id'in a]
 if len(ids)!=len(set(ids)):errors.append(name+': duplicate id')
 if sum(t=='h1'for t,a in nodes)!=1:errors.append(name+': h1 count')
 for t,a in nodes:
  if t in ['header','nav','main','section','article','aside','form','footer','dialog','details'] and not all(k in a for k in ['data-section','data-component']):errors.append(name+': instrumentation '+t)
  if t=='button' and a.get('type')not in ['button','submit','reset']:errors.append(name+': missing button type')
  if t=='img' and 'alt'not in a:errors.append(name+': image alt')
  if 'data-component'in a:actual.append((name,t,a['data-section'],a['data-component']))
  for key in ['href','src']:
   if key not in a:continue
   ref=a[key]
   if re.match(r'(https?:|//|javascript:)',ref):errors.append(name+': external/script reference')
   dest,_,fragment=ref.partition('#')
   if dest and not (root/dest).is_file():errors.append(name+': broken '+ref)
   if fragment and (not dest or dest.endswith('.html')):
    target=parsed.get(dest or name,[])
    if not any(b.get('id')==fragment for _,b in target):errors.append(name+': missing fragment '+ref)
 for t,a in nodes:
  if t in ['input','select'] and a.get('type')not in ['hidden','submit']:
   if not any(b.get('for')==a.get('id') for tag,b in nodes if tag=='label'):errors.append(name+': no label '+a.get('id',''))
inv=json.loads((root/'component-inventory.json').read_text());recorded=[(i['page'],i['tag'],i['section'],c['id'])for c in inv['components']for i in c['instances']]
if sorted(actual)!=sorted(recorded):errors.append('Inventory mismatch')
required=['index.html','specialties.html','heart-center.html','providers.html','provider-detail.html','locations.html','main-campus.html','your-visit.html','appointments.html','billing.html','404.html','css/styles.css','js/main.js','README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json']
for path in required:
 if not(root/path).is_file():errors.append('missing '+path)
for p in root.rglob('*'):
 if p.is_file() and p.suffix in ['.tsx','.jsx','.php','.py','.ts']:errors.append('prohibited '+str(p))
result={'method':'Python HTMLParser source audit; no rendering or accessibility engine','pages':len(parsed),'files':len([p for p in root.rglob('*')if p.is_file()]),'instrumented_instances':len(actual),'inventory_instances':len(recorded),'assertions':['one h1','unique IDs','all region instrumentation','all explicit button types','image alt present','form controls have labels','local links/assets exist','fragment targets exist','inventory exactly matches actual instances','required artifacts','allowed file types'],'errors':errors,'status':'pass'if not errors else 'fail'}
Path('Websites/pipelines/codex/runs/2026-11-13T15-47-56-668Z-build-HOSP-06/source-tests.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2));assert not errors
