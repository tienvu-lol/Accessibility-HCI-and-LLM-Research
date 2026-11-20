"use strict";
const branches = [
 {name:"Fairhaven Center",city:"Fairhaven",zip:"10001",address:"12 Harbor Walk",type:"branch",hours:"Mon–Fri 9 am–5 pm; Sat 9 am–noon",services:"Branch and ATM; sample accessible entrance"},
 {name:"Cedar Square",city:"Cedar",zip:"10002",address:"45 Cedar Lane",type:"branch",hours:"Mon–Fri 9 am–5 pm",services:"Branch and ATM; sample meeting space"},
 {name:"Fairhaven Station ATM",city:"Fairhaven",zip:"10003",address:"8 Station Court",type:"atm",hours:"Sample access: daily 6 am–10 pm",services:"ATM only"}
];
function filterBranches(query,service){const term=query.trim().toLowerCase();return branches.filter(b=>(service==="all"||b.type===service)&&[b.name,b.city,b.zip,b.address].some(v=>v.toLowerCase().includes(term)));}
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-inner');
menuButton.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('open',!expanded);});
const productsButton=document.querySelector('[aria-controls="products-menu"]');
const products=document.querySelector('#products-menu');
productsButton.addEventListener('click',()=>{const expanded=productsButton.getAttribute('aria-expanded')==='true';productsButton.setAttribute('aria-expanded',String(!expanded));products.hidden=expanded;});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!products.hidden){products.hidden=true;productsButton.setAttribute('aria-expanded','false');productsButton.focus();}else if(menuButton.getAttribute('aria-expanded')==='true'){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.focus();}}});
const dialog=document.querySelector('dialog');let trigger=null;
document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{trigger=button;dialog.showModal();}));
dialog.addEventListener('close',()=>{if(trigger)trigger.focus();});
const search=document.querySelector('#branch-search');
if(search){const query=document.querySelector('#query'),service=document.querySelector('#service'),results=document.querySelector('#branch-results'),status=document.querySelector('#search-status'),error=document.querySelector('#search-error');
 function render(){const matches=filterBranches(query.value,service.value);results.replaceChildren();matches.forEach(b=>{const article=document.createElement('article');article.className='branch';article.dataset.section='location-results';article.dataset.component='branch-card';const h=document.createElement('h3');h.textContent=b.name;article.append(h);[b.address+', '+b.city+' '+b.zip,b.hours,b.services,'Fictional location — no appointments or directions available.'].forEach(text=>{const p=document.createElement('p');p.textContent=text;article.append(p);});results.append(article);});status.textContent=matches.length?matches.length+' sample location'+(matches.length===1?'':'s')+' found.':'No sample locations found. Try Fairhaven, Cedar or a sample ZIP.';}
 search.addEventListener('submit',event=>{event.preventDefault();if(!query.value.trim()){error.textContent='Enter a city, sample ZIP or branch name, or choose Show all.';query.setAttribute('aria-invalid','true');query.focus();return;}error.textContent='';query.removeAttribute('aria-invalid');render();});
 document.querySelector('#reset-search').addEventListener('click',()=>{query.value='';service.value='all';error.textContent='';query.removeAttribute('aria-invalid');render();query.focus();});render();}
