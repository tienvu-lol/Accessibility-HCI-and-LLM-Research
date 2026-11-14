from pathlib import Path
from html.parser import HTMLParser
import json,re
site=Path(__file__).resolve().parents[4]/'government/codex/GOV-05'
errors=[]; counts={}; parsed={}
class Parse(HTMLParser):
 def __init__(self):super().__init__();self.tags=[]
 def handle_starttag(self,t,a):self.tags.append((t,dict(a)))
for p in site.glob('*.html'):
 parser=Parse();parser.feed(p.read_text());parsed[p.name]=parser.tags
for file,tags in parsed.items():
 ids=[a['id'] for t,a in tags if 'id'in a]; assert len(ids)==len(set(ids)),file
 assert sum(t=='h1'for t,a in tags)==1,file
 assert any(t=='main'and a.get('id')=='main-content'for t,a in tags),file
 for t,a in tags:
  if t in ['header','nav','main','section','article','aside','form','footer','dialog']:
   for key in ['data-section','data-component']:
    if not re.fullmatch('[a-z][a-z0-9-]*',a.get(key,'')):errors.append(f'{file}: {t} missing/invalid {key}')
  if t=='button' and a.get('type') not in ['button','submit','reset']:errors.append(f'{file} button no explicit type')
  if t=='img'and 'alt'not in a:errors.append(f'{file} img no alt')
  if t in ['input','textarea','select'] and not any(x=='label'and b.get('for')==a.get('id') for x,b in tags) and a.get('type')!='checkbox':errors.append(f'{file} unlabeled field')
  for attr in ['href','src']:
   if attr not in a:continue
   ref=a[attr]
   if ref.startswith(('http:','https:','/','//')):errors.append(f'{file}: unexpected remote/absolute ref {ref}');continue
   name,_,frag=ref.partition('#');target=site/(name or file)
   if not target.exists():errors.append(f'{file}: broken {ref}')
   elif frag and not any(b.get('id')==frag for x,b in parsed.get(target.name,[])):errors.append(f'{file}: missing fragment {ref}')
 counts[file]={'regions':sum(t in ['header','nav','main','section','article','aside','form','footer','dialog']for t,a in tags),'instrumented_instances':sum('data-component'in a for t,a in tags),'h1':1}
inv=json.loads((site/'component-inventory.json').read_text()); actual=sum(v['instrumented_instances']for v in counts.values());recorded=sum(len(c.get('instances',[]))for c in inv['components'] if c['id']!='directory-result');assert actual==recorded,(actual,recorded)
for p in site.rglob('*'):
 if p.suffix in ['.js','.css']:
  s=p.read_text()
  if re.search(r'\bfetch\s*\(|XMLHttpRequest|@import|https?://',s):errors.append(f'{p.name}: network dependency token')
result={'status':'pass'if not errors else'fail','errors':errors,'pages':len(parsed),'per_page':counts,'static_instrumentation_instances':actual,'inventory_static_instances':recorded,'checks':['one H1','main and skip target','relative local links and fragment targets','landmark instrumentation','button explicit type','image alt','field labels','duplicate ids','inventory instance count','no JS/CSS network tokens'],'limits':'Static source inspection; no native rendering, accessibility or interaction claim.'}
print(json.dumps(result,indent=2));assert not errors,errors
