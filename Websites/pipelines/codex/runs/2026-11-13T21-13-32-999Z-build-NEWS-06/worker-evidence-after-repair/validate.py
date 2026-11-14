from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re
root=Path('Websites/news/codex/NEWS-06'); errors=[]; details={}
class Audit(HTMLParser):
 def __init__(self): super().__init__(); self.tags=[];self.ids=[];self.refs=[]
 def handle_starttag(self,t,a):
  d=dict(a);self.tags.append((t,d))
  if 'id' in d:self.ids.append(d['id'])
  for k in ['href','src']:
   if k in d:self.refs.append((t,d[k]))
parsers={}
for p in root.glob('*.html'):
 a=Audit();a.feed(p.read_text());parsers[p.name]=a
 if len(a.ids)!=len(set(a.ids)):errors.append(f'{p.name}: duplicate ids')
 if len([1 for t,d in a.tags if t=='h1'])!=1:errors.append(f'{p.name}: h1 count')
 if not any(t=='main' and d.get('id')=='main-content' for t,d in a.tags):errors.append(f'{p.name}: main')
 for t,d in a.tags:
  if t in ['section','article','aside','header','footer','nav','form','dialog','main'] and ('data-section' not in d or 'data-component' not in d):errors.append(f'{p.name}: uninstrumented {t}')
  if t=='button' and d.get('type') not in ['button','submit']:errors.append(f'{p.name}: button type')
  if t=='img' and 'alt' not in d:errors.append(f'{p.name}: missing alt')
 details[p.name]={'h1':1,'ids':len(a.ids),'links_and_assets':len(a.refs)}
for name,a in parsers.items():
 for t,ref in a.refs:
  u=urlsplit(ref)
  if u.scheme or ref.startswith('//'):errors.append(f'{name}: non-local ref {ref}');continue
  target=u.path or name
  if not (root/unquote(target)).exists():errors.append(f'{name}: missing {target}')
  if u.fragment and target.endswith('.html') and u.fragment not in parsers[target].ids:errors.append(f'{name}: missing fragment {ref}')
for p in root.glob('*.json'):json.loads(p.read_text())
js=(root/'js/main.js').read_text()
for token in ['fetch(', 'XMLHttpRequest','localStorage','sessionStorage','https://']:
 if token in js:errors.append('JS unexpected network/storage: '+token)
print(json.dumps({'status':'pass' if not errors else 'fail','errors':errors,'pages':details,'scope':'HTML parser: page existence, one H1, main, landmark instrumentation, unique IDs, explicit button types, alt presence, all local links/assets/fragments; JSON parse; JS network/storage token scan. CSS and real accessibility not established.'},indent=2))
if errors:raise SystemExit(1)
