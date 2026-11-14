from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re,datetime
site=Path('Websites/restaurant/codex/REST-05');run=Path('Websites/pipelines/codex/runs/2026-11-14T05-07-13-605Z-build-REST-05')
class A(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[];self.h1=0;self.landmarks=set();self.components=set();self.errors=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if t=='h1':self.h1+=1
  if t in ['header','main','footer']:self.landmarks.add(t)
  if 'data-component' in a:self.components.add(a['data-component'])
  if t=='img' and 'alt' not in a:self.errors.append('image missing alt')
  if t in ['a','link','script','img']:
   ref=a.get('href',a.get('src'))
   if ref is not None:self.refs.append(ref)
parsers={};errs=[];refs=0
for p in site.glob('*.html'):
 a=A();a.feed(p.read_text());parsers[p.name]=a
 if a.h1!=1:errs.append(p.name+': h1 count '+str(a.h1))
 if len(a.ids)!=len(set(a.ids)):errs.append(p.name+': duplicate IDs')
 if a.landmarks!={'header','main','footer'}:errs.append(p.name+': missing landmark')
 if 'main-content' not in a.ids:errs.append(p.name+': missing skip target')
 errs.extend(p.name+': '+x for x in a.errors)
for name,a in parsers.items():
 for ref in a.refs:
  refs+=1;u=urlsplit(ref)
  if not ref or ref=='#':errs.append(name+': empty/placeholder reference');continue
  if u.scheme or u.netloc:errs.append(name+': external reference '+ref);continue
  p=site/unquote(u.path) if u.path else site/name
  if not p.is_file():errs.append(name+': missing '+ref)
  if u.fragment and p.suffix=='.html' and u.fragment not in parsers[p.name].ids:errs.append(name+': missing fragment '+ref)
inv=json.loads((site/'component-inventory.json').read_text())
for c in inv['components']:
 if sorted(c['pages'])!=sorted(name for name,p in parsers.items() if c['id'] in p.components):errs.append('Inventory page mismatch '+c['id'])
for req in ['index.html','404.html','css/styles.css','js/main.js','README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json']:
 if not (site/req).is_file():errs.append('Missing '+req)
for p in site.rglob('*'):
 if p.suffix in ['.tsx','.jsx','.ts','.vue','.php','.py']:errs.append('Prohibited file '+str(p))
js=(site/'js/main.js').read_text()
if re.search(r'\bfetch\s*\(|XMLHttpRequest|https?://',js):errs.append('Network JS')
result={'timestamp':datetime.datetime.now(datetime.timezone.utc).isoformat(),'pages':len(parsers),'references_checked':refs,'component_types':len(inv['components']),'passed':not errs,'failures':errs,'checks':['local links/assets/fragments','unique IDs and one H1','main/header/footer/skip target','image alt presence','component pages match actual selectors','required artifacts','prohibited files/network JS'],'limits':'Static parsed/source checks only. Not browser interaction/layout/axe execution.'};(run/'static-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));assert not errs
