// Node mock DOM execution of the delivered main.js. This is not native browser testing.
const assert=require('node:assert/strict');
const source=require('../../../../government/codex/GOV-05/js/main.js');
let count=0;function check(name,fn){fn();count++;console.log('PASS (mock DOM): '+name);}
class Element{
 constructor(){this.listeners={};this.dataset={};this.attrs={};this.value='';this.textContent='';this.children=[];this.open=false;this.checked=[];this.classList={values:new Set(),add:v=>this.classList.values.add(v),remove:v=>this.classList.values.delete(v),toggle:(v,on)=>on?this.classList.values.add(v):this.classList.values.delete(v)};}
 addEventListener(k,f){this.listeners[k]=f;}setAttribute(k,v){this.attrs[k]=v;}getAttribute(k){return this.attrs[k];}removeAttribute(k){delete this.attrs[k];}append(...nodes){this.children.push(...nodes);}replaceChildren(...nodes){this.children=nodes;}focus(){global.focused=this;}querySelectorAll(){return this.checked;}showModal(){this.open=true;}close(){this.open=false;this.listeners.close?.();}fire(type){this.listeners[type]?.({preventDefault(){},key:'Escape'});}
}
const ids=['menu-toggle','primary-nav','search-form','search-query','search-results','search-status','agency-filters','agency-query','agency-results','agency-status','feedback-dialog','feedback-open','feedback-close','feedback-form','feedback-text','feedback-error','feedback-status'];
const elements=Object.fromEntries(ids.map(i=>[i,new Element()]));
global.document={querySelector:s=>elements[s.slice(1)],querySelectorAll:()=>[],createElement:()=>new Element(),addEventListener:(k,f)=>document[k]=f};
source.init();
check('agency initial population',()=>assert.equal(elements['agency-results'].children.length,6));
check('agency keyword filtering',()=>{elements['agency-query'].value='river';elements['agency-filters'].fire('input');assert.equal(elements['agency-results'].children.length,1);});
check('agency category and keyword intersection empty',()=>{elements['agency-filters'].checked=[{value:'Community'}];elements['agency-filters'].fire('input');assert.equal(elements['agency-results'].children.length,0);assert.match(elements['agency-status'].textContent,/No agencies/);});
check('agency category OR matching',()=>assert.equal(source.filterAgencies('', ['Community','Government']).length,4));
check('search matching result nodes and instrumentation',()=>{elements['search-query'].value='records';elements['search-form'].fire('submit');assert.equal(elements['search-results'].children.length,2);assert.equal(elements['search-results'].children[0].dataset.component,'directory-result');assert.equal(elements['search-results'].children[0].dataset.section,'search-result');});
check('search empty results',()=>{elements['search-query'].value='zzzz';elements['search-form'].fire('submit');assert.match(elements['search-status'].textContent,/No local sample/);});
check('search blank state',()=>{elements['search-query'].value=' ';elements['search-form'].fire('submit');assert.match(elements['search-status'].textContent,/Enter a keyword/);});
check('mobile menu open and Escape close focus',()=>{elements['menu-toggle'].fire('click');assert.equal(elements['menu-toggle'].attrs['aria-expanded'],'true');document.keydown({key:'Escape'});assert.equal(elements['menu-toggle'].attrs['aria-expanded'],'false');assert.equal(global.focused,elements['menu-toggle']);});
check('feedback opens with text focus',()=>{elements['feedback-open'].fire('click');assert.equal(elements['feedback-dialog'].open,true);assert.equal(global.focused,elements['feedback-text']);});
check('feedback invalid validation focus',()=>{elements['feedback-text'].value='short';elements['feedback-form'].fire('submit');assert.equal(elements['feedback-text'].attrs['aria-invalid'],'true');assert.match(elements['feedback-error'].textContent,/at least 10/);assert.equal(global.focused,elements['feedback-text']);});
check('feedback simulated completion',()=>{elements['feedback-text'].value='The directory was clear.';elements['feedback-form'].fire('submit');assert.match(elements['feedback-status'].textContent,/Nothing was sent or saved/);assert.equal(elements['feedback-text'].value,'');assert.equal(elements['feedback-text'].attrs['aria-invalid'],undefined);});
check('feedback close returns focus',()=>{elements['feedback-close'].fire('click');assert.equal(elements['feedback-dialog'].open,false);assert.equal(global.focused,elements['feedback-open']);});
console.log(`${count} mock DOM checks passed. Native dialog/focus/keyboard/viewport and screen-reader behavior remain not-tested.`);
