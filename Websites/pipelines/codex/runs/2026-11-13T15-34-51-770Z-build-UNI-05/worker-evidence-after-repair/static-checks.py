from pathlib import Path
from html.parser import HTMLParser
import json,re,datetime
s=Path('/private/tmp/codex-uni-05-qrbdqs8r/repository/Websites/university/codex/UNI-05'); r=s.parents[2]/'pipelines/codex/runs/2026-11-13T15-34-51-770Z-build-UNI-05'
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.tags=[]
 def handle_starttag(self,t,a):self.tags.append((t,dict(a)))
parsers={}
for p in s.glob('*.html'):
 parser=Parser();parser.feed(p.read_text());parsers[p.name]=parser
errors=[]
for f,parser in parsers.items():
 tags=parser.tags;ids=[a['id'] for t,a in tags if 'id' in a]
 if len(ids)!=len(set(ids)):errors.append(f+' duplicate IDs')
 for t,a in tags:
  for key in ['href','src']:
   ref=a.get(key)
   if not ref:continue
   if re.match(r'^[a-z]+:',ref):errors.append(f+' nonlocal '+ref);continue
   file,_,frag=ref.partition('#'); target=s/(file or f)
   if not target.exists():errors.append(f+' broken '+ref)
   if frag and target.name in parsers and not any(a.get('id')==frag for _,a in parsers[target.name].tags):errors.append(f+' missing fragment '+ref)
  if t=='img' and 'alt' not in a:errors.append(f+' missing alt')
  if t in ['input','select'] and a.get('type')!='hidden' and not any(tt=='label' and aa.get('for')==a.get('id') for tt,aa in tags):errors.append(f+' missing label')
 if sum(t=='h1' for t,a in tags)!=1:errors.append(f+' h1 count')
 for tag in ['header','main','footer']: 
  if not any(t==tag for t,a in tags):errors.append(f+' missing '+tag)
 if not any(t=='a' and a.get('href')=='#main-content' for t,a in tags):errors.append(f+' skip')
for x in s.glob('*.json'):json.loads(x.read_text())
def rgb(h):return [int(h[i:i+2],16)/255 for i in (0,2,4)]
def lum(h):return sum((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)*w for v,w in zip(rgb(h),[.2126,.7152,.0722]))
def ratio(a,b):x,y=sorted([lum(a),lum(b)]);return round((y+.05)/(x+.05),2)
contrasts={f'{a} on {b}':ratio(a,b) for a,b in [('8b233c','ffffff'),('ffffff','8b233c'),('242b29','ffffff'),('242b29','f2eee6'),('555555','ffffff'),('ffffff','242b29')]}
result={'tested_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'html_pages':len(parsers),'files':len(list(x for x in s.rglob('*') if x.is_file())),'checks':['local href/src paths and fragments','unique IDs','exactly one H1','header/main/footer','input/select labels','image alt presence','skip link','documentation JSON parse'],'errors':errors,'contrast_calculations':contrasts,'contrast_limit':'Solid token pairs only; image-overlaid hero, states and computed browser colors not verified.','browser_runtime':'blocked: shared QC Chromium launch failed before axe or page checks','accessibility_conformance':'not established'}
(r/'static-results.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
assert not errors
