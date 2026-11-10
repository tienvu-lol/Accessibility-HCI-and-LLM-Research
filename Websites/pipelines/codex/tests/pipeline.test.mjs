import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {PIPELINE,WEBSITES,readCSV,parseCSV,loadSetup,validateSetup,validateSchema,buildReadiness,inside,readJSON} from '../scripts/lib.mjs';
const model={id:'fixture-model',version:null,runtime:'fixture-runtime',operator:'test-only'};
function csv(rows) {
  const fields=Object.keys(rows[0]); const quote=x=>'"'+String(x ?? '').replaceAll('"','""')+'"';
  return [fields,...rows.map(r=>fields.map(k=>r[k]))].map(row=>row.map(quote).join(',')).join('\n')+'\n';
}
function fixture(fn) {
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'codex-pipeline-test-'));const root=path.join(tmp,'Websites');fs.mkdirSync(root);
  try {
    fs.cpSync(PIPELINE,path.join(root,'pipelines/codex'),{recursive:true,filter:src=>!src.includes(`${path.sep}runs${path.sep}`)});
    fs.cpSync(path.join(WEBSITES,'metadata'),path.join(root,'metadata'),{recursive:true});
    for(const f of ['Rules.md','MODEL_ALLOCATION.md','tools/qc/qc.js']) {const out=path.join(root,f);fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(path.join(WEBSITES,f),out);}
    const inv=path.join(root,'metadata/source-inventories/university.csv');const rows=readCSV(inv);
    for(const r of rows) Object.assign(r,{source_name:`Fixture ${r.source_id}`,source_url:`https://${r.source_id.toLowerCase()}.example/`,model_id:model.id,model_version:'',subcategory:'test fixture only',verified_at:'2026-01-01',verification_method:'synthetic test fixture; not real verification',verification_result:'verified',evidence_reference:'Rules.md',source_pages:JSON.stringify([{url:`https://${r.source_id.toLowerCase()}.example/`,title:'Synthetic test',local_file:'index.html'}]),key_regions:JSON.stringify(['header','main','footer']),key_interactions:JSON.stringify([{name:'Navigation',evidence:'observed',notes:'Synthetic fixture'}]),complexity:'medium',stack_clues:'unknown',limitations:'Synthetic fixture only',approved_at:'2026-01-01',approved_by:'fixture',approval_reference:'synthetic test only'});
    fs.writeFileSync(inv,csv(rows));
    const register=path.join(root,'metadata/assignments.csv');const assignments=readCSV(register);
    for(const row of assignments) {const r=rows.find(r=>r.category===row.category && r.source_id===row.source_id);if(r)Object.assign(row,{source_url:r.source_url,model_id:r.model_id,approved_at:r.approved_at});}
    fs.writeFileSync(register,csv(assignments));
    fn({root,setup:loadSetup(root),inv,rows,tmp});
  } finally {fs.rmSync(tmp,{recursive:true,force:true});}
}
test('real setup validates with exactly 30 Codex builds',()=>{const s=loadSetup();assert.deepEqual(validateSetup(s),[]);assert.equal(s.queue.tasks.filter(t=>t.phase==='build').length,30);});
test('CSV handles escaped quotes, commas, multiline fields, CRLF, and BOM',()=>assert.deepEqual(parseCSV('\ufeffa,b\r\n"one, two","line 1\nline ""2"""\r\n'),[{a:'one, two',b:'line 1\nline "2"'}]));
test('CSV rejects truncated quotes and inconsistent columns',()=>{assert.throws(()=>parseCSV('a,b\n"bad,b'));assert.throws(()=>parseCSV('a,b\none\n'));});
test('path traversal and absolute paths are rejected',()=>{assert.throws(()=>inside(WEBSITES,'../../outside'));assert.throws(()=>inside(WEBSITES,'/tmp/outside'));});
test('schema rejects extra properties, allocation changes and zero concurrency',()=>{const c=readJSON(path.join(PIPELINE,'config.json'));const schema=readJSON(path.join(PIPELINE,'schemas/config.schema.json'));c.unexpected=true;c.slots=[1,2,3];c.execution.max_concurrent_builds=0;assert.ok(validateSchema(c,schema).length>=3);});
test('real unapproved source inventories block build preparation',()=>assert.ok(buildReadiness(loadSetup(),'UNI-04',model).some(e=>e.includes('missing source_name'))));
test('complete synchronized synthetic inventory passes readiness',()=>fixture(({setup})=>assert.deepEqual(buildReadiness(setup,'UNI-04',model),[])));
test('unknown models, other groups and concurrency overflow block',()=>fixture(({setup})=>{assert.ok(buildReadiness(setup,'UNI-04',{}).length);assert.ok(buildReadiness(setup,'UNI-01',model).length);setup.queue.tasks.find(t=>t.id==='build-UNI-05').status='running';assert.ok(buildReadiness(setup,'UNI-04',model).some(e=>e.includes('concurrency')));}));
test('one missing approval anywhere in the ten-source inventory blocks',()=>fixture(({setup,inv,rows})=>{rows[9].approval_reference='';fs.writeFileSync(inv,csv(rows));assert.ok(buildReadiness(setup,'UNI-04',model).some(e=>e.includes('UNI-10')));}));
test('duplicate sources, unverified sources and missing index mapping block',()=>fixture(({setup,inv,rows})=>{rows[1].source_url=rows[0].source_url;rows[2].verification_result='UNVERIFIED';rows[3].source_pages='[{"url":"https://test.example/","title":"Test","local_file":"other.html"}]';fs.writeFileSync(inv,csv(rows));const errors=buildReadiness(setup,'UNI-04',model);assert.ok(errors.some(e=>e.includes('duplicate')));assert.ok(errors.some(e=>e.includes('not verified')));assert.ok(errors.some(e=>e.includes('index.html')));}));
test('assignment drift blocks approved inventory',()=>fixture(({setup,root})=>{const file=path.join(root,'metadata/assignments.csv');const rows=readCSV(file);rows.find(r=>r.source_id==='UNI-04').model_version='changed-version';fs.writeFileSync(file,csv(rows));assert.ok(buildReadiness(setup,'UNI-04',model).some(e=>e.includes('synchronized')));}));
test('recorded task has exact snapshots; creates no site and does not change queue',()=>fixture(({root})=>{const script=path.join(root,'pipelines/codex/scripts/prepare-task.mjs');const before=fs.readFileSync(path.join(root,'pipelines/codex/queue/manifest.json'),'utf8');const result=spawnSync(process.execPath,[script,'build','UNI-04','--record','--model',model.id,'--runtime',model.runtime,'--operator',model.operator],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);const runs=path.join(root,'pipelines/codex/runs');const dir=fs.readdirSync(runs).find(n=>n.includes('-build-UNI-04'));assert.ok(dir);const record=readJSON(path.join(runs,dir,'run.json'));assert.equal(record.status,'prepared');assert.equal(record.generation_started_at,null);assert.equal(fs.readdirSync(path.join(runs,dir,'snapshots')).length,7);assert.ok(!fs.existsSync(path.join(root,'university/codex/UNI-04')));assert.equal(fs.readFileSync(path.join(root,'pipelines/codex/queue/manifest.json'),'utf8'),before);}));
test('CLI rejects unknown phases/options, existing outputs and missing repair evidence',()=>fixture(({root})=>{const script=path.join(root,'pipelines/codex/scripts/prepare-task.mjs');const base=['--model',model.id,'--runtime',model.runtime,'--operator',model.operator];for(const args of [['publish','UNI-04'],['research','UNI','--unknown'],['build','UNI-01']])assert.notEqual(spawnSync(process.execPath,[script,...args],{encoding:'utf8'}).status,0);const site=path.join(root,'university/codex/UNI-04');fs.mkdirSync(site,{recursive:true});fs.writeFileSync(path.join(site,'index.html'),'fixture');assert.notEqual(spawnSync(process.execPath,[script,'build','UNI-04',...base],{encoding:'utf8'}).status,0);fs.writeFileSync(path.join(site,'generation-metadata.json'),'{}');assert.notEqual(spawnSync(process.execPath,[script,'repair','UNI-04',...base],{encoding:'utf8'}).status,0);}));
