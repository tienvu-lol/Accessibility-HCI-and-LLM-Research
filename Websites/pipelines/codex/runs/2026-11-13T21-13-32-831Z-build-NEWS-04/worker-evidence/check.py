from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json
s=Path('Websites/news/codex/NEWS-04');r=Path('Websites/pipelines/codex/runs/2026-11-13T21-13-32-831Z-build-NEWS-04');errors=[];counts={}
class P(HTMLParser):
 def __init__(self):super().__init__();self.tags=[];self.ids=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs);self.tags.append((t,a))
  if 'id'in a:self.ids.append(a['id'])
parsed={}
for f in s.glob('*.html'):
 p=P();p.feed(f.read_text());parsed[f.name]=p
for f,p in parsed.items():
 h=(s/f).read_text();counts[f]={'h1':sum(t=='h1' for t,a in p.tags),'regions':sum(t in ['header','nav','main','section','article','aside','form','footer'] for t,a in p.tags)}
 if counts[f]['h1']!=1:errors.append(f+' h1')
 if len(p.ids)!=len(set(p.ids)):errors.append(f+' duplicate ids')
 for t,a in p.tags:
  if t in ['header','nav','main','section','article','aside','form','footer'] and 'data-section' not in a:errors.append(f+' uninstrumented '+t)
  if t=='button' and 'type'not in a:errors.append(f+' button type')
  if t=='img'and 'alt'not in a:errors.append(f+' alt')
  for k in ['href','src']:
   if k not in a:continue
   u=urlsplit(a[k]);target=u.path or f
   if u.scheme or a[k].startswith('/'):errors.append(f+' nonrelative '+a[k]);continue
   if not (s/unquote(target)).exists():errors.append(f+' broken '+a[k])
   if u.fragment and target.endswith('.html') and u.fragment not in parsed[target].ids:errors.append(f+' missing anchor '+a[k])
 if 'Fictional publication'not in h:errors.append(f+' fiction notice')
for required in ['README.md','fidelity-notes.md','generation-metadata.json','component-inventory.json','css/styles.css','js/main.js']:
 if not (s/required).exists():errors.append('missing '+required)
for f in ['generation-metadata.json','component-inventory.json']:json.loads((s/f).read_text())
result={'method':'Python HTMLParser static audit; no browser execution','pages':counts,'files':sum(f.is_file() for f in s.rglob('*')),'errors':errors,'result':'pass' if not errors else 'fail'};(r/'static-audit.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
