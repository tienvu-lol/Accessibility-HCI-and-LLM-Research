from pathlib import Path
from html.parser import HTMLParser
import json,re,hashlib,datetime
root=Path('Websites/fashion/codex/FASH-05');run=Path('Websites/pipelines/codex/runs/2026-11-13T21-37-53-739Z-build-FASH-05');errors=[];findings=[];inventory=json.loads((root/'component-inventory.json').read_text());known={c['id'] for c in inventory['components']}
class P(HTMLParser):
 def __init__(self):super().__init__();self.tags=[];self.ids=[];self.refs=[];self.labels=[]
 def handle_starttag(self,t,at):
  a=dict(at);self.tags.append((t,a))
  if 'id'in a:self.ids.append(a['id'])
  if t=='label':self.labels.append(a.get('for'))
  for k in ['href','src','action']:
   if k in a:self.refs.append((t,a[k]))
for p in sorted(root.glob('*.html')):
 d=P();d.feed(p.read_text());need=lambda ok,m:None if ok else errors.append(p.name+': '+m)
 need(len(d.ids)==len(set(d.ids)),'duplicate ids');need(sum(t=='h1' for t,a in d.tags)==1,'requires one h1');need(sum(t=='main' and a.get('id')=='main-content' for t,a in d.tags)==1,'main id');need(any(t=='a' and a.get('href')=='#main-content' for t,a in d.tags),'skip link')
 for t,a in d.tags:
  if t in ['header','nav','main','section','article','aside','form','footer','figure','details']:
   need(bool(a.get('data-section')and a.get('data-component')),'metadata missing '+t)
  if a.get('data-component'):
   need(a['data-component'] in known,'missing inventory '+a['data-component'])
   need(bool(re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*',a['data-component'])),'bad component key')
  if t=='button':need(a.get('type')in ['button','submit','reset'],'button type')
  if t=='img':need('alt'in a,'alt absent')
  if t in ['input','textarea']:need(a.get('id') in d.labels,'label absent')
  if 'aria-describedby'in a:
   for x in a['aria-describedby'].split():need(x in d.ids,'missing describedby target '+x)
 for t,ref in d.refs:
  need(not ref.startswith(('http:','https:','//','/','javascript:')),'nonrelative ref '+ref)
  need(ref!='#','placeholder link')
  file,_,fragment=ref.partition('#');dest=(p.parent/file.split('?')[0]) if file else p
  need(dest.exists(),'missing destination '+ref)
  if fragment:
   target=P();target.feed(dest.read_text());need(fragment in target.ids,'broken fragment '+ref)
 findings.append({'page':p.name,'h1_count':sum(t=='h1'for t,a in d.tags),'references_checked':len(d.refs),'instrumented_instances':sum('data-component'in a for t,a in d.tags)})
for c in inventory['components']:
 for loc in c['instances']:
  if 'generated_by'not in loc: assert loc['selector'] in '' or (f'data-section="{loc["section"]}"' in (root/loc['page']).read_text())
for p in root.rglob('*'):
 if p.is_file():
  if p.suffix in ['.css','.js','.html']:
   s=p.read_text();
   if re.search(r'\bfetch\s*\(|XMLHttpRequest|https?://|@import',s):errors.append('network/dependency pattern '+str(p))
  if p.suffix in ['.py','.ts','.jsx','.tsx','.php']:errors.append('prohibited file '+str(p))
for f in ['index.html','magazine.html','story.html','seasonal-concept.html','search.html','404.html','css/styles.css','js/main.js','README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json']:assert(root/f).is_file()
report={'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'method':'Python HTMLParser static audit; no rendered HTML or browser engine','pages':findings,'errors':errors,'checks':['all href/src/action relative and present; fragment targets','one H1, main and skip link','region metadata and inventory membership','labels, image alternatives, button types, describedby targets','unique ids and required files','runtime network dependency pattern audit'],'result':'pass'if not errors else'fail','limits':['DOM mock tests do not prove browser behavior','no HTML conformance validator','no rendered contrast/reflow/keyboard/axe or source fidelity test']}
(run/'static-audit.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
if errors:raise SystemExit(1)
