from pathlib import Path
from html.parser import HTMLParser
import json,urllib.parse
site=Path(__file__).resolve().parents[4]/'healthcare/codex/HOSP-05'
# parents: run / runs / codex / pipelines / Websites
class P(HTMLParser):
 def __init__(self):super().__init__();self.nodes=[]
 def handle_starttag(self,t,a):self.nodes.append((t,dict(a)))
errors=[]; count=0
for f in site.glob('*.html'):
 p=P();p.feed(f.read_text());count+=1
 ids=[a['id']for t,a in p.nodes if 'id'in a]
 if len(ids)!=len(set(ids)):errors.append(f'{f.name}: duplicate IDs')
 if sum(t=='h1'for t,a in p.nodes)!=1:errors.append(f'{f.name}: H1 count')
 for t,a in p.nodes:
  if t in ['header','nav','main','section','article','aside','form','footer','dialog','details'] and not all(a.get(x)for x in ['data-section','data-component']):errors.append(f'{f.name}: instrumentation {t}')
  if t=='button'and not a.get('type'):errors.append(f'{f.name}: button type')
  if t=='img'and 'alt'not in a:errors.append(f'{f.name}: alt')
  for k in ['href','src']:
   if k not in a:continue
   u=urllib.parse.urlsplit(a[k]);target=site/(u.path or f.name)
   if u.scheme or u.netloc:errors.append(f'{f.name}: remote URL')
   elif not target.exists():errors.append(f'{f.name}: missing {a[k]}')
   elif u.fragment:
    pp=P();pp.feed(target.read_text());
    if not any(x.get('id')==u.fragment for tt,x in pp.nodes):errors.append(f'{f.name}: missing fragment {a[k]}')
for f in ['README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json','css/styles.css','js/main.js']:
 if not(site/f).exists():errors.append('missing '+f)
for f in site.glob('*.json'):json.loads(f.read_text())
result={'method':'Python HTMLParser static structural/link audit, not browser','pages':count,'errors':errors,'pass':not errors};print(json.dumps(result,indent=2))
if errors:raise SystemExit(1)
