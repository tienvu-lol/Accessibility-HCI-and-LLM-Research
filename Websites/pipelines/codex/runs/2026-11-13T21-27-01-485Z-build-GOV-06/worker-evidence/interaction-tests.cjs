// Actual replica JavaScript executed in node:vm with a deliberately limited DOM mock.
// These tests verify handler logic/state assignments, not native DOM/layout/keyboard behavior.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const path=require('path'),run=__dirname,site=path.resolve(run,'../../../../government/codex/GOV-06');
const fixtures=JSON.parse(fs.readFileSync(path.join(run,'dom-fixtures.json'),'utf8'));
const script=fs.readFileSync(path.join(site,'js/main.js'),'utf8');
let assertions=0;const ok=(value,label)=>{assert(value,label);assertions++;console.log('PASS',label);};
function boot(page){
 let doc;
 class E{
  constructor(tag,attrs={}){this.tagName=tag;this.attrs={...attrs};this.dataset={};for(const[k,v]of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=v;this.hidden='hidden'in attrs;this.value=attrs.value||'';this.events={};this.children=[];this.textContent='';}
  getAttribute(k){return this.attrs[k]??null}setAttribute(k,v){this.attrs[k]=String(v)}
  addEventListener(k,fn){(this.events[k]??=[]).push(fn)}
  emit(k,extra={}){const e={key:undefined,preventDefault(){this.prevented=true},...extra};for(const f of this.events[k]||[])f(e);return e}
  focus(){doc.activeElement=this}append(e){this.children.push(e)}replaceChildren(){this.children=[]}
  contains(e){return this===e ||this.children.includes(e)||(this.attrs.id==='search-panel'&&['site-query','search-form','search-status','search-results'].includes(e?.attrs.id))||(this.attrs.id==='side-links'&&e?.sideLink);}
 }
 const nodes=fixtures[page].map(n=>new E(n.tag,n.attrs));
 doc={activeElement:null,events:{},getElementById:id=>nodes.find(e=>e.attrs.id===id)||null,querySelectorAll:q=>{
 const m=q.match(/^\[([^=\]]+)(?:="([^"]+)")?\]$/);if(!m)throw Error('Unexpected mock selector '+q);return nodes.filter(e=>m[1]in e.attrs&&(m[2]===undefined||e.attrs[m[1]]===m[2]));
 },createElement:tag=>new E(tag),addEventListener(k,fn){(this.events[k]??=[]).push(fn)},emit(k,e){for(const f of this.events[k]||[])f(e)}};
 vm.runInNewContext(script,{document:doc,console},{filename:'main.js'});return{doc,id:doc.getElementById,all:doc.querySelectorAll,nodes};
}
for(const page of Object.keys(fixtures)){
 const {doc,id,all}=boot(page),toggles=all('[data-toggle]');const menu=toggles.find(e=>e.dataset.toggle==='primary-menu'),search=toggles.find(e=>e.dataset.toggle==='search-panel');
 menu.emit('click');ok(!id('primary-menu').hidden&&menu.getAttribute('aria-expanded')==='true',page+' menu expands');
 search.emit('click');ok(id('primary-menu').hidden&&!id('search-panel').hidden&&doc.activeElement===id('site-query'),page+' search opens, closes menu, focuses query');
 doc.emit('keydown',{key:'Escape',preventDefault(){}});ok(id('search-panel').hidden&&doc.activeElement===search,page+' Escape closes search and restores trigger');
 search.emit('click');id('site-query').value='water';id('search-form').emit('submit');ok(id('search-results').children.length===3,page+' water search returns three records');
 ok(id('search-results').children.every(e=>e.dataset.component==='search-result'&&e.dataset.section==='site-search-results'),page+' generated results instrumented');
 id('site-query').value='<img src=x>';id('search-form').emit('submit');ok(id('search-results').children.length===0&&id('search-status').textContent.startsWith('No local'),page+' no-match query cleared old results');
 id('site-query').value='   ';id('search-form').emit('submit');ok(id('search-status').textContent.startsWith('Enter'),page+' empty-query guidance');
 id('site-query').value='ENVIRONMENTAL SCIENCE';id('search-form').emit('submit');ok(id('search-results').children.length===1,page+' case insensitive all-word search');
 if(id('side-links')){const side=toggles.find(e=>e.dataset.toggle==='side-links');side.focus();doc.emit('keydown',{key:'Escape',preventDefault(){}});ok(id('side-links').hidden&&doc.activeElement===side,page+' local sidebar Escape');side.emit('click');ok(!id('side-links').hidden,page+' local sidebar reopens');}
}
{
 const{id}=boot('index.html');id('slide-prev').emit('click');ok(id('slide-status').textContent==='Feature 3 of 3'&&id('feature-link').href==='topics.html#land','slideshow previous wraps');
 id('slide-next').emit('click');ok(id('slide-status').textContent==='Feature 1 of 3','slideshow next wraps');id('slide-next').emit('click');ok(id('feature-title').textContent==='Science begins with a question','slideshow updates copy/title');
}
{
 const{id,all}=boot('news.html');const cards=all('[data-component="news-card"]');
 id('news-subject').value='water';id('news-filter').emit('submit');ok(cards.filter(c=>!c.hidden).length===3,'news water filter');
 id('news-language').value='Spanish';id('news-filter').emit('submit');ok(cards.filter(c=>!c.hidden).length===1,'news language intersection');
 id('news-region').value='Coast';id('news-filter').emit('submit');ok(cards.every(c=>c.hidden)&&id('news-status').textContent.startsWith('No fictional'),'news empty state');
 id('news-filter').emit('reset');ok(cards.every(c=>!c.hidden)&&id('news-region').value==='','news reset shows all five');
 id('news-date').value='2026-10';id('news-office').value='Community';id('news-filter').emit('submit');ok(cards.filter(c=>!c.hidden).length===1,'news date and office intersection');
}
{
 const{doc,id}=boot('contact-enforcement.html');id('question-form').emit('submit');ok(id('demo-topic').getAttribute('aria-invalid')==='true'&&doc.activeElement===id('demo-topic'),'question required fields and first error focus');
 id('demo-email').value='not-email';id('demo-topic').value='water';id('demo-message').value='A fictional sample question about a watershed.';id('question-form').emit('submit');ok(doc.activeElement===id('demo-email')&&id('email-error').textContent.length>0,'question optional invalid email');
 id('demo-email').value='reader@example.test';id('demo-message').value='short';id('question-form').emit('submit');ok(doc.activeElement===id('demo-message'),'question short text error focus');
 id('demo-message').value='A fictional sample question about a watershed.';id('question-form').emit('submit');ok(doc.activeElement===id('form-feedback')&&id('form-feedback').textContent.includes('Nothing was sent'),'question demo confirmation and focus');
 ok(['demo-topic','demo-email','demo-message'].every(k=>id(k).getAttribute('aria-invalid')==='false'),'question errors cleared on correction');
 id('demo-email').value='';id('question-form').emit('submit');ok(id('form-feedback').textContent.startsWith('Demo confirmation'),'question accepts omitted optional email');
 id('demo-message').value='x'.repeat(1001);id('question-form').emit('submit');ok(id('demo-message').getAttribute('aria-invalid')==='true','question upper length validation');
}
console.log(JSON.stringify({status:'pass',assertions,method:'node vm execution of actual main.js with labeled DOM mocks; native browser behavior not tested'}));
