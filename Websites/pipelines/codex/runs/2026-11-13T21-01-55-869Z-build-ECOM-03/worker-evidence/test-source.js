// Executes actual delivered JS in Node VM. DOM, location, and storage are explicit mocks.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(process.argv[2],'utf8'); let data={};
function environment(block=false){const context={window:{},document:{getElementById:()=>null,addEventListener:()=>{}},localStorage:{getItem:k=>{if(block)throw Error('mock storage denied');return data[k]||null},setItem:(k,v)=>{if(block)throw Error('mock storage denied');data[k]=v},removeItem:k=>{delete data[k]}},location:{search:''},URLSearchParams,setTimeout};vm.createContext(context);vm.runInContext(source,context);return context.window.FieldkindDemo;}
let api=environment(),tests=0;function check(name,f){f();tests++;console.log('PASS '+name)}
check('four inline fictional samples',()=>assert.equal(api.products.length,4));
check('case-insensitive wool search returns two',()=>assert.equal(api.filterProducts('WOOL','','relevance').length,2));
check('size 12 filter returns Grove Runner/Pace',()=>assert.equal(api.filterProducts('','12','relevance').length,2));
check('query+size intersection',()=>assert.equal(api.filterProducts('wool','12','relevance').length,0));
check('unknown query empty result',()=>assert.equal(api.filterProducts('zzzz','','relevance').length,0));
check('ascending and descending price orders',()=>{assert.equal(api.filterProducts('','','asc')[0].price,88);assert.equal(api.filterProducts('','','desc')[0].price,124)});
check('invalid size selection rejected',()=>assert.equal(api.addItem([],'grove','99').length,0));
let cart=api.addItem([],'grove','9');cart=api.addItem(cart,'grove','9');
check('same size merges into one line',()=>{assert.equal(cart.length,1);assert.equal(cart[0].qty,2)});
check('distinct sizes form separate lines',()=>assert.equal(api.addItem(cart,'grove','10').length,2));
check('actual subtotal calculation',()=>assert.equal(api.subtotal(cart),196));
check('quantity update calculation',()=>assert.equal(api.subtotal(api.updateQuantity(cart,'grove','9',3)),294));
check('quantity cap 20',()=>{let c=[{id:'grove',size:'9',qty:20}];assert.equal(api.addItem(c,'grove','9')[0].qty,20)});
check('malformed cart records rejected',()=>assert.equal(api.normalizeCart([{id:'bad',size:'9',qty:1},{id:'grove',size:'9',qty:-1},null]).length,0));
check('nonpersonal storage roundtrip',()=>{api.saveCart(cart);assert.equal(api.readCart()[0].qty,2);assert.deepEqual(Object.keys(JSON.parse(data['fieldkind-demo-bag-v1'])[0]),['id','size','qty'])});
check('remove/empty clears persistence',()=>{api.saveCart(api.readCart().filter(x=>x.id!=='grove'));assert.equal(api.readCart().length,0);assert.equal(data['fieldkind-demo-bag-v1'],undefined)});
check('storage exception retains in-page memory',()=>{api=environment(true);api.saveCart(cart);assert.equal(api.readCart()[0].qty,2)});
console.log(JSON.stringify({tests,passed:tests,method:'actual main.js executed in Node VM; mocked DOM, location, storage; no browser/keyboard/axe tested'}));
