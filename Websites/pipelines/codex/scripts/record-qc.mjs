import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {loadSetup,validateSetup,categoryFor,inside,cliArgs,hash} from './lib.mjs';
try {
  const {positional,flags}=cliArgs(process.argv.slice(2),{run:'value'});
  const [id]=positional;
  if(positional.length!==1 || !flags.run || !/^[A-Za-z0-9-]+$/.test(flags.run)) throw new Error('Usage: node record-qc.mjs UNI-04 --run RUN-ID');
  const setup=loadSetup();const errors=validateSetup(setup);if(errors.length)throw new Error(errors.join('\n'));
  const c=categoryFor(setup,id);
  if(!c || !new RegExp(`^${c.prefix}-0[456]$`).test(id))throw new Error('Invalid Codex ID');
  const dir=inside(setup.pipeline,`runs/${flags.run}`);
  const runFile=path.join(dir,'run.json');const run=JSON.parse(fs.readFileSync(runFile,'utf8'));
  if(run.target!==id || !['build','repair'].includes(run.phase))throw new Error('Run does not belong to this build/repair target');
  const site=inside(setup.root,`${c.category}/codex/${id}`);
  if(!fs.existsSync(path.join(site,'index.html')))throw new Error('No generated site to test');
  const stamp=new Date().toISOString().replace(/[:.]/g,'-');const out=path.join(dir,`qc-${stamp}.json`);const log=path.join(dir,`qc-${stamp}.log`);
  const tool=inside(setup.root,setup.config.paths.qc);
  const started=new Date().toISOString();
  const result=spawnSync(process.execPath,[tool,site,'--json',out],{cwd:setup.root,encoding:'utf8',maxBuffer:16*1024*1024});
  fs.writeFileSync(log,(result.stdout || '')+(result.stderr || '')+(result.error?.message || ''));
  let report=null;try{report=JSON.parse(fs.readFileSync(out,'utf8'));}catch{}
  const passed=result.status===0 && report?.fails===0 && path.resolve(report.site || '')===site;
  run.qc_runs.push({started_at:started,completed_at:new Date().toISOString(),exit_code:result.status,passed,qc_tool_sha256:hash(fs.readFileSync(tool)),report:report?path.basename(out):null,log:path.basename(log)});
  fs.writeFileSync(runFile,JSON.stringify(run,null,2)+'\n');
  console.log(`QC ${passed?'PASS':'FAIL/UNAVAILABLE'}: ${path.relative(setup.pipeline,log)}`);
  console.log('This does not mark the site submitted or accepted; interaction and human review remain separate.');
  process.exitCode=passed?0:1;
} catch(e) {console.error(e.message);process.exitCode=1;}
