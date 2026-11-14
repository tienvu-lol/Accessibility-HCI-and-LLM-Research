from pathlib import Path
from html.parser import HTMLParser
import json,re
site=Path('/private/tmp/codex-ecom-04-fneg7xss/repository/Websites/e-commerce/codex/ECOM-04');errors=[];counts={};links=0
class Audit(HTMLParser):
 def handle_starttag(self,tag,attrs):
  global links
  a=dict(attrs);counts[tag]=counts.get(tag,0)+1
  if tag in ['header','nav','main','section','article','aside','form','footer','details']:
   if not all(a.get(x) for x in ['data-component','data-section']):errors.append(f'{page}: missing instrumentation {tag}')
  if tag=='button' and a.get('type') not in ['button','submit','reset']:errors.append(f'{page}: missing button type')
  if tag=='img' and 'alt' not in a:errors.append(f'{page}: missing alt')
  for attr in ['href','src']:
   ref=a.get(attr)
   if not ref:continue
   links+=1
   if ref.startswith(('http:','https:','//','/')):errors.append(f'{page}: nonlocal reference {ref}')
   f=ref.split('#')[0].split('?')[0]
   if f and not (site/f).exists():errors.append(f'{page}: broken reference {ref}')
for file in site.glob('*.html'):
 page=file.name;s=file.read_text();Audit().feed(s)
 if len(re.findall('<h1[ >]',s))!=1:errors.append(page+': h1 count')
 if 'href="#main-content"' not in s or 'id="main-content"' not in s:errors.append(page+': skip/main')
for f in ['index.html','mens.html','tree-runner.html','cart.html','search.html','returns.html','404.html','README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json','css/styles.css','js/main.js']:
 if not (site/f).is_file():errors.append('missing '+f)
for f in site.glob('*.json'):json.loads(f.read_text())
js=(site/'js/main.js').read_text()
if re.search(r'fetch\s*\(|XMLHttpRequest|https?://',js):errors.append('network dependency')
print(json.dumps({'method':'separate Python HTMLParser source audit; not shared QC browser output','pages':len(list(site.glob('*.html'))),'files':len([x for x in site.rglob('*') if x.is_file()]),'references_checked':links,'tag_counts':counts,'errors':errors},indent=2))
raise SystemExit(bool(errors))
