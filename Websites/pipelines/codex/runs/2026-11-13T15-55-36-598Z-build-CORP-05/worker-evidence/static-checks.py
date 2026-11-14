from pathlib import Path
from html.parser import HTMLParser
import json,re
site=Path('Websites/company/codex/CORP-05'); run=Path('Websites/pipelines/codex/runs/2026-11-13T15-55-36-598Z-build-CORP-05'); issues=[]; pages={}
class Parse(HTMLParser):
 def __init__(self):super().__init__();self.tags=[]
 def handle_starttag(self,t,a):self.tags.append((t,dict(a)))
for p in site.glob('*.html'):
 q=Parse();q.feed(p.read_text());pages[p.name]=q.tags
for name,tags in pages.items():
 if sum(t=='h1' for t,a in tags)!=1:issues.append(name+': h1 count')
 ids=[a['id'] for t,a in tags if 'id' in a]
 if len(ids)!=len(set(ids)):issues.append(name+': duplicate id')
 if not any(t=='main' and a.get('id')=='main-content' for t,a in tags):issues.append(name+': main')
 for t,a in tags:
  if t in ['header','nav','main','section','article','aside','form','footer','dialog','details'] and not all(k in a for k in ['data-section','data-component']):issues.append(name+': metadata on '+t)
  if t=='button' and a.get('type') not in ['button','submit','reset']:issues.append(name+': button type')
  if t=='img' and 'alt' not in a:issues.append(name+': image alt')
  for k in ['href','src']:
   ref=a.get(k)
   if not ref:continue
   if re.match(r'^(https?:|//|javascript:)',ref):issues.append(name+': external reference '+ref);continue
   path,_,anchor=ref.partition('#');target=path or name
   if not (site/target).exists():issues.append(name+': missing '+ref)
   elif anchor and target.endswith('.html') and not any(x.get('id')==anchor for tt,x in pages.get(target,[])):issues.append(name+': missing anchor '+ref)
  if t=='input':
   if not any(tt=='label' and aa.get('for')==a.get('id') for tt,aa in tags):issues.append(name+': label')
expected={'index.html','everyday-banking.html','checking.html','rates.html','help.html','contact.html','locations.html','about.html','404.html'}
if set(pages)!=expected:issues.append('page map')
for p in ['css/styles.css','js/main.js','README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json']:
 if not (site/p).is_file():issues.append('missing '+p)
for p in site.rglob('*'):
 if p.is_file() and p.suffix in ['.js','.css','.html']:
  s=p.read_text()
  if re.search(r'\b(fetch\s*\(|XMLHttpRequest|localStorage|sessionStorage)',s):issues.append('network/storage API '+p.name)
  if p.suffix=='.html' and re.search(r'\b(?:src|href)="https?://',s):issues.append('remote dependency '+p.name)
inv=json.loads((site/'component-inventory.json').read_text())
actual=sum('data-component' in a for tags in pages.values() for t,a in tags)
reported=sum(len(c['instances']) for c in inv['components'])
if actual!=reported:issues.append('inventory count')
result={'kind':'source checks only; no browser or accessibility execution','pages':len(pages),'files':sum(p.is_file() for p in site.rglob('*')),'instrumented_instances':actual,'inventory_instances':reported,'checks':['required files and approved map','relative paths and fragment targets','one h1 and main per page','unique IDs','both metadata attributes on meaningful regions','explicit button types','alt attributes','input labels','no remote assets/network/storage APIs','inventory instance counts'],'issues':issues,'status':'pass' if not issues else 'fail'}
(run/'static-checks.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
