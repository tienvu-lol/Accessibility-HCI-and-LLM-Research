from pathlib import Path
import re,json,datetime,hashlib
from html.parser import HTMLParser
r=Path('Websites/company/codex/CORP-05'); run=Path('Websites/pipelines/codex/runs/2026-11-13T15-55-36-598Z-build-CORP-05')
p=r/'rates.html';s=p.read_text();s=s.replace('Browse the same broad product categories as the reference. Every numeric value below is an invented research example, never a financial quote.','Browse the broad product categories represented by the reference. This fictional guide contains no current rates, quotes or financial offers.')
s=s.replace('Research addition: the source hub linked to product-rate categories; numeric tables were not observed. These compact fictional tables make the category content concrete.','The source hub groups product-rate categories. Numerical rate tables were not observed, so this local guide uses category descriptions rather than quotes.')
items={'deposits':('Deposit categories',[('Checking and savings','Everyday deposit accounts with product-specific terms.'),('Certificates','Term deposits with conditions set by a real provider.'),('Business deposits','Deposit products organized for business members.')]),'home':('Mortgage and home-equity categories',[('Mortgages','Home-financing product categories and their associated rate information.'),('Home equity','Borrowing categories tied to home equity.')]),'vehicles':('Vehicle-loan categories',[('New and used vehicles','Vehicle borrowing categories grouped by product type.')]),'borrowing':('Personal and business borrowing categories',[('Personal loans and credit cards','Everyday borrowing product categories.'),('Business loans and credit cards','Borrowing categories organized for business members.')])}
for key,(title,rows) in items.items():
 pattern=r'<section class="band " data-section="rate-'+key+r'".*?</section>'
 body=f'<section class="band " data-section="rate-{key}" data-component="content-band" aria-labelledby="rate-{key}-title"><div class="wrap"><h2 id="rate-{key}-title">{title}</h2><div id="{key}" class="grid two">'
 for i,(name,desc) in enumerate(rows):body+=f'<article class="card" data-section="{key}-category-{i+1}" data-component="feature-card"><h3>{name}</h3><p>{desc} This replica does not display or estimate a rate.</p></article>'
 body+='</div></div></section>';s=re.sub(pattern,lambda m:body,s,flags=re.S)
s=s.replace('Read the example in context','A guide to the categories').replace('APY means annual percentage yield; APR means annual percentage rate. These examples do not model fees, qualification, changing rates or individual circumstances. They cannot be used to evaluate a real product.','Rate information is specific to a product, its terms and an individual situation. This local category guide does not provide numeric rates, qualification decisions or advice. For research tasks, explore the descriptions and contact routes.')
p.write_text(s)
p=r/'checking.html';s=p.read_text().replace('<p class="large-number">0.10% <small>APY</small></p><p>Fictional example only. Not a quote, offer or current advertised rate.</p>','<p>Deposit-rate information belongs to the checking product category. No numeric rate is provided in this local demo.</p>').replace('Checking rate example','Checking rate information').replace('Read sample rate details','Explore deposit-rate categories');p.write_text(s)
for name in ['index.html','everyday-banking.html']:
 p=r/name;s=p.read_text().replace('All numbers are fictional.','No current rates are provided.').replace('fictional deposit examples','deposit-rate categories').replace('See deposit examples','See deposit categories').replace('See borrowing examples','See borrowing categories');p.write_text(s)
p=r/'README.md';s=p.read_text().replace('ten fictional rate rows across four tables','eight rate-product descriptions across four category groups').replace('Fictional numeric rate tables are an intentional category-content addition: source hub category links were observed, numerical tables were not.','The rates page preserves the grouped category hub; no numeric rates or tables are included because tables were not observed.');p.write_text(s)
p=r/'fidelity-notes.md';s=p.read_text().replace('Ten clearly fictional numeric examples in four rate tables supplement the observed category hub. They are not copied/current rates and are not financial advice. ','').replace('## Omitted','## Omitted').replace('Real trademarks, copied media/prose,','Numeric rate tables (not observed), real trademarks, copied media/prose,');p.write_text(s)
m=json.loads((r/'generation-metadata.json').read_text());m['research_additions']=['notice-only sign-in dialog'];m['retries']=[{'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'reason':'Coordinator clarified rates scope; initial numeric tables removed in favor of observed category hub. Initial artifact preserved before correction.','files':['rates.html','checking.html','index.html','everyday-banking.html','README.md','fidelity-notes.md','component-inventory.json','generation-metadata.json']}];(r/'generation-metadata.json').write_text(json.dumps(m,indent=2))
# Refresh inventory from actual page metadata.
inv=json.loads((r/'component-inventory.json').read_text());existing={c['id']:c for c in inv['components']};instances={}
class Parse(HTMLParser):
 def __init__(self,page):super().__init__();self.page=page
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'data-component' in a:
   k=a['data-component'];instances.setdefault(k,[]).append({'page':self.page,'tag':tag,'data_section':a.get('data-section'),'selector':f'[data-section="{a.get("data-section")}"][data-component="{k}"]'})
for p in r.glob('*.html'):Parse(p.name).feed(p.read_text())
inv['components']=[]
for k,ii in instances.items():
 c=existing[k];c['instances']=ii;c['pages']=sorted(set(x['page'] for x in ii));inv['components'].append(c)
(r/'component-inventory.json').write_text(json.dumps(inv,indent=2))
print('rate scope corrected; inventory refreshed')
