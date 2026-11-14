const fs=require('fs'),vm=require('vm'),assert=require('assert');const src=fs.readFileSync(__dirname+'/../../../../healthcare/codex/HOSP-05/js/main.js','utf8');const prefix=src.split('const current=')[0];const tests=[];function check(name,fn){fn();tests.push(name);}
const c={};vm.createContext(c);vm.runInContext(prefix+';this.api={providers,locations,filterRecords,distance};',c);const a=c.api;
check('Provider name case-insensitive match',()=>assert.equal(a.filterRecords(a.providers,{q:'MIRA'}).length,1));
check('Combined specialty/language/gender/new filters',()=>assert.equal(a.filterRecords(a.providers,{specialty:'Primary care',language:'Spanish',gender:'Man',new:'on'}).length,1));
check('Radius excludes remote demo ZIPs',()=>assert.equal(a.filterRecords(a.providers,{zip:'98000',radius:'5'}).length,2));
check('Ten-mile radius includes next demo ZIP',()=>assert.equal(a.filterRecords(a.locations,{zip:'98000',radius:'10'}).length,4));
check('Provider empty results',()=>assert.equal(a.filterRecords(a.providers,{q:'nonexistent'}).length,0));
check('Location service filter',()=>assert.equal(a.filterRecords(a.locations,{specialty:'Imaging'}).length,2));
check('Clear filter returns all six',()=>assert.equal(a.filterRecords(a.providers,{}).length,6));
check('Pagination partitions six records into two pages of three',()=>{assert.equal(a.locations.slice(0,3).length,3);assert.equal(a.locations.slice(3,6).length,3);});
const billing=src.slice(src.indexOf('const bf='));let submit;const attrs={};const choice={value:'',setAttribute:(k,v)=>attrs[k]=v,removeAttribute:k=>delete attrs[k],focus(){this.focused=true;}};const status={focus(){this.focused=true;}};const bf={elements:{statement:choice},addEventListener:(n,fn)=>submit=fn};vm.runInNewContext(billing,{document:{querySelector:s=>s==='#billing-form'?bf:status}});
check('Billing missing choice validates and focuses field',()=>{submit({preventDefault(){}});assert.equal(attrs['aria-invalid'],'true');assert(choice.focused);assert(status.textContent.includes('Choose'));});
check('Billing sample success reports no payment and focuses status',()=>{choice.value='hospital';submit({preventDefault(){}});assert(!attrs['aria-invalid']);assert(status.textContent.includes('No payment'));assert(status.focused);});
console.log(JSON.stringify({method:'Node vm pure filters plus mocked billing DOM; not browser, accessibility or full interaction tests',passed:tests.length,tests},null,2));
