from pathlib import Path
from html.parser import HTMLParser
import json,re
r=Path('/private/tmp/codex-gov-06-96l7nowh/repository/Websites');s=r/'government/codex/GOV-06';run=r/'pipelines/codex/runs/2026-11-13T21-27-01-485Z-build-GOV-06'
class P(HTMLParser):
 def __init__(self):super().__init__();self.nodes=[]
 def handle_starttag(self,tag,attrs):self.nodes.append({'tag':tag,'attrs':dict(attrs)})
parsed={};issues=[];checks=0
inv=json.loads((s/'component-inventory.json').read_text());inventory={c['id']:c for c in inv['components']}
for f in sorted(s.glob('*.html')):
 p=P();p.feed(f.read_text());nodes=p.nodes;parsed[f.name]=nodes; ids=[n['attrs']['id'] for n in nodes if 'id'in n['attrs']]
 def check(ok,msg):
  global checks;checks+=1
  if not ok:issues.append(f.name+': '+msg)
 check(sum(n['tag']=='h1' for n in nodes)==1,'exactly one H1');check(sum(n['tag']=='main' for n in nodes)==1,'exactly one main');check(len(ids)==len(set(ids)),'unique IDs')
 check(any(n['tag']=='main' and n['attrs'].get('id')=='main-content' for n in nodes),'main target');check(any(n['tag']=='a'and n['attrs'].get('href')=='#main-content' for n in nodes),'skip link')
 for n in nodes:
  a=n['attrs'];tag=n['tag']
  if tag in ['header','nav','main','section','article','aside','form','footer'] or 'data-component'in a or 'data-section'in a:
   check(bool(a.get('data-section')and a.get('data-component')),'both metadata on '+tag)
   check(all(re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*',a.get(k,'')) for k in ['data-component','data-section']),'stable kebab metadata')
   c=inventory.get(a.get('data-component'));check(c is not None,'inventory component '+str(a.get('data-component')))
   if c:check(any(i['page']==f.name and i['section']==a.get('data-section') for i in c['instances']),'inventory location')
  if tag=='button':check(a.get('type') in ['button','submit','reset'],'explicit button type')
  if tag=='img':check('alt'in a,'image alt')
  if tag in ['input','select','textarea'] and a.get('type')not in ['hidden','submit']:
   check(any(k['tag']=='label'and k['attrs'].get('for')==a.get('id') for k in nodes),'label '+str(a.get('id')))
  for attr in ['aria-controls','aria-labelledby','aria-describedby']:
   if attr in a:
    for target in a[attr].split():check(target in ids,attr+' target '+target)
  for key in ['href','src']:
   if key not in a:continue
   value=a[key];check(value!='#','no placeholder');check(not value.startswith(('/', 'http:', 'https:', '//','javascript:')),'relative local reference '+value)
   path,_,frag=value.partition('#');dest=s/path if path else f
   check(dest.exists(),'reference exists '+value)
   if frag and dest.exists() and dest.suffix=='.html':
    other=P();other.feed(dest.read_text());check(any(k['attrs'].get('id')==frag for k in other.nodes),'fragment exists '+value)
 for level in [int(n['tag'][1]) for n in nodes if re.fullmatch('h[1-6]',n['tag'])]: pass
 text=f.read_text();check('FICTIONAL RESEARCH DEMO'in text,'conspicuous demo notice')
for file in [s/'js/main.js',s/'css/styles.css']:
 check(not re.search(r'\bfetch\s*\(|XMLHttpRequest|https?://|@import',file.read_text()),'no runtime remote API/dependency '+file.name)
for file in s.rglob('*'):
 if file.is_file():check(file.suffix in ['.html','.css','.js','.svg','.md','.json'],'allowed extension '+file.name)
result={'method':'Python HTMLParser static audit; not a browser or accessibility engine','checks':checks,'issues':issues,'pages':len(parsed),'status':'pass'if not issues else 'fail'}
(run/'static-audit.json').write_text(json.dumps(result,indent=2));(run/'dom-fixtures.json').write_text(json.dumps(parsed));print(json.dumps(result,indent=2))
