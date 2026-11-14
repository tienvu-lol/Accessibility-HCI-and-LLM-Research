from pathlib import Path
import re,json,datetime
from html.parser import HTMLParser
root=Path('/private/tmp/codex-uni-06-69zzltfx/repository');s=root/'Websites/university/codex/UNI-06';run=root/'Websites/pipelines/codex/runs/2026-11-13T15-34-51-838Z-build-UNI-06';now=datetime.datetime.now(datetime.timezone.utc).isoformat()
for p in s.glob('*.html'):
 h=p.read_text();h=h.replace('<button class="','<button type="button" class="').replace('<button>Search</button>','<button type="submit">Search</button>')
 h=h.replace('<nav class="breadcrumb"','<nav data-section="breadcrumb-navigation" data-component="breadcrumb" class="breadcrumb"').replace('<nav aria-label="Program sections"','<nav data-section="program-section-navigation" data-component="section-nav" aria-label="Program sections"').replace('<nav aria-label="Tuition sections"','<nav data-section="tuition-section-navigation" data-component="section-nav" aria-label="Tuition sections"')
 h=h.replace('<article>','<article data-section="'+('program-content' if p.name=='program-detail.html' else 'tuition-content')+'" data-component="content-article">')
 if p.name=='admissions.html':
  for title,id in [('New college students','new-student-pathway'),('Returning &amp; transfer students','returning-student-pathway'),('Returning & transfer students','returning-student-pathway'),('Career & continuing education','continuing-education-pathway')]:
   h=h.replace('<section><h3>'+title,'<section data-section="'+id+'" data-component="pathway-card"><h3>'+title)
 p.write_text(h)
class Scan(HTMLParser):
 def __init__(self):super().__init__();self.fail=[];self.components=[];self.buttons=0;self.regions=0
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='button':
   self.buttons+=1
   if d.get('type') not in ['button','submit','reset']:self.fail.append('button missing valid explicit type')
  if t in ['header','nav','main','footer','aside','article','section','form']:
   self.regions+=1
   if 'data-section'not in d:self.fail.append(t+' missing data-section')
   if t!='main' and 'data-component'not in d:self.fail.append(t+' missing data-component')
  if 'data-component'in d:self.components.append((d['data-component'],d.get('data-section')))
components={};reports=[]
for p in sorted(s.glob('*.html')):
 sc=Scan();sc.feed(p.read_text());reports.append({'page':p.name,'buttons_checked':sc.buttons,'regions_checked':sc.regions,'failures':sc.fail})
 for comp,section in sc.components:components.setdefault(comp,[]).append({'page':p.name,'section':section})
inv={'protocol_version':'1.0','replica_id':'UNI-06','category':'university','source_url':'https://www.waketech.edu/','components':[]}
for c,instances in sorted(components.items()):
 inv['components'].append({'id':c,'selector':f'[data-component="{c}"]','pages':sorted(set(x['page'] for x in instances)),'instances':instances,'behavior':['native links and structured content'] if c not in ['primary-nav','site-search'] else ['header disclosure and local navigation/search'],'keyboard':['Tab and Enter on links; native reading order'] if c not in ['primary-nav','site-search'] else ['Tab, Enter, Space on buttons; Escape dismisses and returns focus'],'status':'implemented','validation':'source instrumentation checked; header handler logic passed in Node VM; browser/axe not-tested (environmental launch block)'})
(s/'component-inventory.json').write_text(json.dumps(inv,indent=2))
report={'checked_at':now,'method':'independent HTMLParser all meaningful landmark/section/form elements and every button; main requires data-section, all reusable regions both attributes','pages':reports,'failures':sum(len(p['failures'])for p in reports)};(run/'repair-static-review.json').write_text(json.dumps(report,indent=2))
assert report['failures']==0,report
m=json.loads((s/'generation-metadata.json').read_text());m['generation_completed_at']=now;m['implementation_retries']=1;m['repairs']=[{'at':now,'author':'same gpt-6.1-sol collaboration worker','trigger':'parent independent source review','changes':['18 buttons now have explicit type: button for toggles, submit for search','instrumented all breadcrumb and local section navigation','instrumented program and tuition article containers','instrumented three admissions pathway cards','regenerated component inventory including exact page and section instances'],'initial_artifact_preserved':True,'validation':'repair-static-review.json: 6 pages, all buttons and meaningful regions pass; browser/axe still not-tested'}];(s/'generation-metadata.json').write_text(json.dumps(m,indent=2))
with (run/'validation-notes.md').open('a')as f:f.write('\n## Source review repair '+now+'\n\nParent independent source review identified implicit button types and missing instrumentation on breadcrumb/local nav, detail articles and admissions pathway cards. Same worker repaired all instances and regenerated the inventory with actual page/section instances. Independent full HTMLParser inspection of every button and meaningful region passed; see repair-static-review.json. Initial artifact archive remains unchanged. This is one documented implementation repair; no human source edits. Browser interaction/axe/reflow remain not-tested after environmental launch block.\n')
with (s/'README.md').open('a')as f:f.write('\nParent source review repair: explicit button types and complete meaningful-region instrumentation were added; component inventory regenerated. All buttons and meaningful regions passed independent static inspection (repair-static-review.json). Initial archive remains unchanged; browser/axe limits remain.\n')
print(json.dumps(report,indent=2))
