'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const script=fs.readFileSync('Websites/fashion/codex/FASH-06/js/main.js','utf8');
let active=null;
class Element {
 constructor(tag='div'){this.tagName=tag;this.dataset={};this.attributes={};this.hidden=false;this.listeners={};this.children=[];this.textContent='';this.value='';}
 addEventListener(n,fn){this.listeners[n]=fn;}
 setAttribute(n,v){this.attributes[n]=v;}
 getAttribute(n){return this.attributes[n];}
 focus(){active=this;}
 append(...items){this.children.push(...items);}
 replaceChildren(...items){this.children=items;}
 fire(n,e={}){if(this.listeners[n])this.listeners[n](e);}
}
function setup(hasShare){
 const ids={};['edition-panel','search-panel','topics-panel','edition-name','search-input','search-results','search-status','search-form','clear-search'].forEach(id=>ids[id]=new Element());
 const toggles=['edition-panel','search-panel','topics-panel'].map(id=>{ids[id].hidden=true;const b=new Element('button');b.dataset.toggle=id;b.setAttribute('aria-expanded','false');return b;});
 const editions=['US','UK'].map(e=>{const b=new Element('button');b.dataset.edition=e;return b;});
 if(hasShare){['share-button','share-preview','share-text'].forEach(id=>ids[id]=new Element());ids['share-preview'].hidden=true;}
 const document=new Element();document.getElementById=id=>ids[id]||null;document.querySelectorAll=s=>s==='[data-toggle]'?toggles:editions;document.createElement=tag=>new Element(tag);
 vm.runInNewContext(script,{document,Array,String});return {ids,toggles,editions,document};
}
let tests=[];function test(name,fn){fn();tests.push(name);}
for(const article of [false,true]){
const {ids,toggles,editions,document}=setup(article);
test(`search opens and focuses (${article})`,()=>{toggles[1].fire('click');assert.equal(ids['search-panel'].hidden,false);assert.equal(active,ids['search-input']);assert.equal(toggles[1].getAttribute('aria-expanded'),'true');});
test(`search title and case (${article})`,()=>{ids['search-input'].value=' COAT ';let prevented=false;ids['search-form'].fire('submit',{preventDefault(){prevented=true;}});assert(prevented);assert.equal(ids['search-results'].children.length,1);assert.equal(ids['search-results'].children[0].children[2].href,'article.html');assert.equal(ids['search-results'].children[0].dataset.component,'search-result');assert.match(ids['search-status'].textContent,/1 sample story/);});
test(`category query (${article})`,()=>{ids['search-input'].value='guides';ids['search-form'].fire('submit',{preventDefault(){}});assert.equal(ids['search-results'].children.length,2);});
test(`empty and safe query (${article})`,()=>{ids['search-input'].value='<img onerror=alert(1)>';ids['search-form'].fire('submit',{preventDefault(){}});assert.equal(ids['search-results'].children.length,0);assert.match(ids['search-status'].textContent,/No sample/);});
test(`clear restores six and focus (${article})`,()=>{ids['clear-search'].fire('click');assert.equal(ids['search-results'].children.length,6);assert.equal(ids['search-input'].value,'');assert.equal(active,ids['search-input']);});
test(`mutual exclusion and escape (${article})`,()=>{toggles[2].fire('click');assert(ids['search-panel'].hidden);assert(!ids['topics-panel'].hidden);document.fire('keydown',{key:'Escape'});assert(ids['topics-panel'].hidden);assert.equal(active,toggles[2]);assert.equal(toggles[2].getAttribute('aria-expanded'),'false');});
test(`edition local selection (${article})`,()=>{toggles[0].fire('click');editions[1].fire('click');assert.equal(ids['edition-name'].textContent,'UK');assert(ids['edition-panel'].hidden);assert.equal(active,toggles[0]);});
test(`toggle closes itself (${article})`,()=>{toggles[2].fire('click');toggles[2].fire('click');assert(ids['topics-panel'].hidden);});
if(article)test('share preview focus, escape and repeated toggle',()=>{ids['share-button'].fire('click');assert(!ids['share-preview'].hidden);assert.equal(active,ids['share-text']);assert.equal(ids['share-button'].getAttribute('aria-expanded'),'true');document.fire('keydown',{key:'Escape'});assert(ids['share-preview'].hidden);assert.equal(active,ids['share-button']);ids['share-button'].fire('click');ids['share-button'].fire('click');assert(ids['share-preview'].hidden);});
}
console.log(JSON.stringify({status:'pass',tests:tests.length,cases:tests,method:'Actual delivered main.js executed under Node vm with explicit minimal DOM mocks. Does not validate native browser accessibility, layout or event semantics.'},null,2));
