from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re
s=Path('Websites/e-commerce/codex/ECOM-06');r=Path('Websites/pipelines/codex/runs/2026-11-13T21-01-56-049Z-build-ECOM-06');errors=[];checks=[]
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.tags=[]
 def handle_starttag(self,t,a):self.tags.append((t,dict(a)))
parsed={}
for f in s.glob('*.html'):
 p=Parser();p.feed(f.read_text());parsed[f.name]=p.tags
 for tag,attrs in p.tags:
  if tag in ['header','nav','main','section','article','aside','form','footer'] and not all(x in attrs for x in ['data-section','data-component']):errors.append(f'{f.name}: uninstrumented {tag}')
  if tag=='button' and attrs.get('type') not in ['button','submit','reset']:errors.append(f'{f.name}: implicit button type')
  if tag=='img' and 'alt' not in attrs:errors.append(f'{f.name}: missing image alt')
  for attr in ['href','src']:
   v=attrs.get(attr)
   if not v:continue
   u=urlsplit(v)
   if u.scheme or v.startswith('//'):errors.append(f'{f.name}: nonlocal {v}');continue
   if v=='#':errors.append(f'{f.name}: empty anchor')
   target=s/unquote(u.path) if u.path else f
   if not target.exists():errors.append(f'{f.name}: broken {v}')
   if u.fragment and target.suffix=='.html':
    if not re.search(r'id="'+re.escape(u.fragment)+'"',target.read_text()):errors.append(f'{f.name}: missing target {v}')
 if sum(t=='h1' for t,a in p.tags)!=1:errors.append(f'{f.name}: H1 count')
 if not any(t=='main' and a.get('id')=='main-content' for t,a in p.tags):errors.append(f'{f.name}: main')
 if not any(t=='a' and a.get('href')=='#main-content' for t,a in p.tags):errors.append(f'{f.name}: skip')
for req in ['index.html','components.html','encoder.html','cart.html','search.html','shipping-returns.html','404.html','css/styles.css','js/main.js','README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json']:
 if not(s/req).is_file():errors.append('missing '+req)
for f in s.rglob('*'):
 if not f.is_file():continue
 if f.suffix in ['.html','.css','.js']:
  if re.search(r'https?://|\bfetch\s*\(|XMLHttpRequest|<iframe',f.read_text()):errors.append(f'{f.name}: remote/network code')
 if f.suffix=='.json':json.loads(f.read_text())
css=(s/'css/styles.css').read_text()
for a,b in [('(',')'),('{','}')]:
 if css.count(a)!=css.count(b):errors.append('CSS unbalanced '+a)
checks=['7 HTML page map + required artifacts','all local references and fragment targets exist','one H1, main and skip per page','semantic region instrumentation and explicit button types','image alt attributes','no remote/network runtime code','JSON parses and CSS delimiters balance']
report=dict(method='Python standard-library HTML parser and source checks; no browser or CSS layout engine',checks=checks,errors=errors,result='pass' if not errors else 'fail',pages=len(parsed),files=sum(p.is_file() for p in s.rglob('*')))
(r/'static-tests.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2));raise SystemExit(bool(errors))
