from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re
s=Path('Websites/fashion/codex/FASH-06');fail=[];counts={};tags={};refs=[]
class Parse(HTMLParser):
 def __init__(self,p):super().__init__();self.p=p;self.nodes=[]
 def handle_starttag(self,t,at):self.nodes.append((t,dict(at)))
for p in sorted(s.glob('*.html')):
 parser=Parse(p);parser.feed(p.read_text());nodes=parser.nodes;tags[p.name]=nodes
 for t,a in nodes:
  if t in ['header','nav','main','section','article','aside','form','footer']:
   if not all(x in a for x in ['data-section','data-component']):fail.append(f'{p.name}: missing metadata {t}')
  for k in ['data-section','data-component']:
   if k in a and not re.fullmatch('[a-z][a-z0-9]*(?:-[a-z0-9]+)*',a[k]):fail.append(f'invalid {k}')
  if t=='img' and ('alt' not in a or not a['alt']):fail.append(f'{p.name}: image alternative')
  if t=='button' and a.get('type') not in ['button','submit','reset']:fail.append(f'{p.name}: button type')
  if t in ['a','img','script','link']:
   u=a.get('href',a.get('src',''));o=urlsplit(u)
   if o.scheme or o.netloc:fail.append(f'{p.name}: nonlocal dependency {u}')
   dest=(p.parent/unquote(o.path)) if o.path else p
   if not dest.exists():fail.append(f'{p.name}: broken {u}')
   if o.fragment:
    q=Parse(dest);q.feed(dest.read_text());
    if not any(b.get('id')==o.fragment for _,b in q.nodes):fail.append(f'{p.name}: broken fragment {u}')
   refs.append([p.name,u])
 if sum(t=='h1' for t,a in nodes)!=1:fail.append(f'{p.name}: h1 count')
 if sum(t=='main' and a.get('id')=='main-content' for t,a in nodes)!=1:fail.append(f'{p.name}: main count')
 if not any(t=='a' and a.get('href')=='#main-content' for t,a in nodes):fail.append('missing skip')
 ids=[a['id'] for _,a in nodes if 'id' in a]
 if len(ids)!=len(set(ids)):fail.append(f'{p.name}: duplicate ids')
 for t,a in nodes:
  if t in ['input','textarea'] and not any(tt=='label' and aa.get('for')==a.get('id') for tt,aa in nodes):fail.append(f'{p.name}: missing label')
 counts[p.name]={'h1':1,'regions':sum(t in ['header','nav','main','section','article','aside','form','footer'] for t,a in nodes),'instrumented':sum('data-component' in a for t,a in nodes)}
inv=json.loads((s/'component-inventory.json').read_text())
actual={(p,a['data-component'],a['data-section']) for p,nodes in tags.items() for t,a in nodes if 'data-component' in a}
listed={(x['page'],c['id'],x['section']) for c in inv['components'] for x in c['instances'] if 'dynamic' not in x}
if actual!=listed:fail.append('inventory instance coverage mismatch')
for c in inv['components']:
 for page in c['pages']:
  actual_instances=[a for t,a in tags[page] if a.get('data-component')==c['id']]
  described=[i for i in c['instances'] if i['page']==page and 'dynamic' not in i]
  if len(actual_instances)!=len(described):fail.append(f'inventory count mismatch {c["id"]} {page}')
for p in s.rglob('*'):
 if p.is_file() and p.suffix in ['.html','.css','.js']:
  text=p.read_text()
  if re.search(r'\bfetch\s*\(|XMLHttpRequest|https?://',text):fail.append(f'network-like reference in {p.name}')
print(json.dumps({'status':'fail' if fail else 'pass','pages':counts,'references_checked':len(refs),'unique_components':len(inv['components']),'failures':fail,'limits':'Static parser and inventory audit; does not execute browser or establish accessibility conformance.'},indent=2))
assert not fail,fail
