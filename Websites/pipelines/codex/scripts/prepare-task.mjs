import fs from 'node:fs';
import path from 'node:path';
import {loadSetup,validateSetup,buildReadiness,categoryFor,readCSV,inside,cliArgs,hash} from './lib.mjs';
try {
  const {positional,flags}=cliArgs(process.argv.slice(2),{record:'boolean',model:'value','model-version':'value',runtime:'value',operator:'value',qc:'value'});
  const [phase,target]=positional;
  if (positional.length!==2 || !['research','build','repair'].includes(phase)) throw new Error('Usage: node prepare-task.mjs research PREFIX|build ID|repair ID [--record] [--model ID --runtime NAME --operator NAME] [--qc pipeline-relative-report.json]');
  const setup=loadSetup();const errors=validateSetup(setup);if(errors.length) throw new Error(errors.join('\n'));
  const c=categoryFor(setup,target);if(!c) throw new Error('Unknown category/target');
  if (phase==='research' && ![c.prefix,c.category].includes(target)) throw new Error('Research target must be a category or prefix');
  if (phase!=='research' && !new RegExp(`^${c.prefix}-0[456]$`).test(target)) throw new Error('Only Codex slots 04–06 can be prepared');
  const model={...setup.config.model,id:flags.model || setup.config.model.id,version:flags['model-version'] || setup.config.model.version,runtime:flags.runtime || setup.config.model.runtime,operator:flags.operator || setup.config.model.operator};
  if (phase!=='research') {const blocked=buildReadiness(setup,target,model);if(blocked.length) throw new Error('BLOCKED:\n'+blocked.join('\n'));}
  const inventoryPath=inside(setup.root,`${setup.config.paths.inventories}/${c.category}.csv`);
  const inventory=readCSV(inventoryPath);const selected=inventory.find(r=>r.source_id===target);
  const output=phase==='research' ? `pipelines/codex/research/${c.prefix}.md` : `${c.category}/codex/${target}`;
  if (phase==='build' && fs.existsSync(inside(setup.root,output)) && fs.readdirSync(inside(setup.root,output)).length) throw new Error('Site output already exists; use a documented repair run rather than overwrite');
  let qcFile=null;
  if (phase==='repair') {
    if (!fs.existsSync(inside(setup.root,`${output}/generation-metadata.json`))) throw new Error('Repair requires an existing generated site and metadata');
    if (!flags.qc) throw new Error('Repair requires --qc with an actual recorded QC report');
    qcFile=inside(setup.pipeline,flags.qc);
    const report=JSON.parse(fs.readFileSync(qcFile,'utf8'));
    if (path.resolve(report.site || '')!==inside(setup.root,output) || !Number.isInteger(report.fails) || report.fails<1 || !Array.isArray(report.failures) || !report.failures.length) throw new Error('Repair QC report must identify this site and actual failures');
  } else if (flags.qc) throw new Error('--qc is only valid for repair');
  const evidenceFiles=[inside(setup.root,setup.config.paths.rules),inside(setup.root,setup.config.paths.allocation),path.join(setup.pipeline,'config.json'),path.join(setup.pipeline,'categories.json'),path.join(setup.pipeline,'prompts',`${phase}.md`),inventoryPath,inside(setup.root,setup.config.paths.assignments)];
  if(qcFile)evidenceFiles.push(qcFile);
  const snapshots=evidenceFiles.map(file=>({path:path.relative(setup.root,file).split(path.sep).join('/'),sha256:hash(fs.readFileSync(file))}));
  const context={phase,target:phase==='research'?c.prefix:target,category:c.category,category_requirements:c,model,output_relative_to_Websites:output,selected_source:selected || null,category_inventory:inventory,protocol_snapshots:snapshots,prepared_at:new Date().toISOString(),task_is_execution:false};
  const prompt=fs.readFileSync(path.join(setup.pipeline,'prompts',`${phase}.md`),'utf8')+'\n\n## Exact task context\n\n```json\n'+JSON.stringify(context,null,2)+'\n```\n';
  if (!flags.record) {process.stdout.write(prompt);}
  else {
    const stamp=new Date().toISOString().replace(/[:.]/g,'-');
    const runID=`${stamp}-${phase}-${context.target}`;
    const dir=inside(setup.pipeline,`runs/${runID}`);fs.mkdirSync(dir,{recursive:false});
    fs.writeFileSync(path.join(dir,'task.md'),prompt,{flag:'wx'});
    const snap=path.join(dir,'snapshots');fs.mkdirSync(snap);
    evidenceFiles.forEach((file,i)=>fs.copyFileSync(file,path.join(snap,`${String(i+1).padStart(2,'0')}-${path.basename(file)}`),fs.constants.COPYFILE_EXCL));
    fs.writeFileSync(path.join(dir,'run.json'),JSON.stringify({...context,run_id:runID,status:'prepared',task_sha256:hash(prompt),generation_started_at:null,generation_completed_at:null,tool_access:null,budget:null,retries:[],human_edits:[],qc_runs:[],model_attribution:'operator/config declaration; not independently authenticated'},null,2)+'\n');
    fs.writeFileSync(path.join(dir,'handoff.md'),'# Handoff\n\nStatus: prepared, not executed.\n\nRecord start/completion, actual model/runtime, tool access, budget/retries, output files, interactions tested, QC reports, limitations, and any human or cross-model edits after execution. Preparation is not source approval or a completed site.\n');
    console.log(`Prepared ${path.relative(setup.root,dir)}\nNo model, website build, queue transition, or publication was launched.`);
  }
} catch(e) {console.error(e.message);process.exitCode=1;}
