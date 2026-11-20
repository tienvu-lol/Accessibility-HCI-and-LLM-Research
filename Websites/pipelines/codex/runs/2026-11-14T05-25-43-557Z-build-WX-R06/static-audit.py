from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from collections import Counter
import json,hashlib,zipfile,sys
root=Path('Websites')
class Parse(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[];self.errors=[];self.components=Counter();self.h1=0;self.landmarks=set();self.tags=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.tags.append((tag,a))
  if 'id' in a:self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag in ['header','nav','main','footer']:self.landmarks.add(tag)
  if 'data-component' in a:self.components[a['data-component']]+=1
  if tag=='img' and 'alt' not in a:self.errors.append('image missing alt')
  if tag in ['a','link','script','img','source','iframe','video','audio']:
   for k in ['href','src']:
    if k in a:self.refs.append(a[k])
  if tag=='a' and a.get('href')=='#':self.errors.append('placeholder href')
  if tag=='html' and a.get('lang')!='en':self.errors.append('missing/incorrect lang')
for sid in sys.argv[1:]:
 site=root/'weather/codex'/sid;rp=next(p for p in sorted((root/'pipelines/codex/runs').glob('*-build-'+sid),reverse=True));r=json.loads((rp/'run.json').read_text());errors=[];ps={};references=0
 for p in sorted(site.glob('*.html')):
  a=Parse();a.feed(p.read_text());ps[p.name]=a
  errors.extend(f'{p.name}: {e}' for e in a.errors)
  if a.h1!=1:errors.append(f'{p.name}: H1 count {a.h1}')
  if a.landmarks!={'header','nav','main','footer'}:errors.append(f'{p.name}: missing landmark')
  if len(a.ids)!=len(set(a.ids)):errors.append(f'{p.name}: duplicate IDs')
  if 'main-content' not in a.ids:errors.append(f'{p.name}: missing main destination')
  if '#main-content' not in a.refs:errors.append(f'{p.name}: missing skip link')
 required=[p['local_file'] for p in json.loads(r['selected_source']['source_pages'])]+['404.html']
 if sorted(required)!=sorted(ps):errors.append('approved sitemap mismatch')
 for name,a in ps.items():
  for ref in a.refs:
   references+=1;u=urlsplit(ref)
   if u.scheme or u.netloc:errors.append(f'{name}: external reference {ref}');continue
   p=site/unquote(u.path) if u.path else site/name
   if not p.is_file():errors.append(f'{name}: broken reference {ref}')
   if u.fragment and p.suffix=='.html' and p.name in ps and u.fragment not in ps[p.name].ids:errors.append(f'{name}: broken fragment {ref}')
 for f in ['css/styles.css','js/main.js','README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json']:
  if not (site/f).is_file():errors.append('missing '+f)
 inv=json.loads((site/'component-inventory.json').read_text());meta=json.loads((site/'generation-metadata.json').read_text());inv_ids=[]
 for c in inv['components']:
  cid=c['id'];inv_ids.append(cid);actual=sorted(n for n,a in ps.items() if cid in a.components)
  if actual!=sorted(c['pages']):errors.append('inventory mismatch: '+cid)
 actual_ids=set(c for a in ps.values() for c in a.components)
 if actual_ids!=set(inv_ids):errors.append('inventory missing/extra component IDs: '+str(actual_ids.symmetric_difference(inv_ids)))
 if meta['source_id']!=sid or meta['model_group']!='codex':errors.append('metadata attribution mismatch')
 if meta['model_id']!='gpt-6':errors.append('model changed')
 for f in site.rglob('*'):
  if f.suffix in ['.ts','.tsx','.jsx','.vue','.php','.py']:errors.append('prohibited file: '+str(f))
 report={'site':sid,'method':'single-session static parsing and source inspection (self-review); not browser/axe execution','pages':len(ps),'files':len([p for p in site.rglob('*') if p.is_file()]),'references_checked':references,'component_types':len(actual_ids),'errors':errors,'passed':not errors,'browser_interactions':'not-tested; launch permission unavailable in this environment'}
 (rp/'static-audit.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report));
 if errors:sys.exit(1)
