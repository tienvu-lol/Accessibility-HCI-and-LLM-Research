import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
export const PIPELINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const WEBSITES = path.resolve(PIPELINE, '../..');
export const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));
export const hash = data => crypto.createHash('sha256').update(data).digest('hex');
export function inside(root, relative) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative)) throw new Error('Expected a relative path');
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(root + path.sep)) throw new Error(`Path escapes root: ${relative}`);
  let existing = resolved;
  while (!fs.existsSync(existing)) existing = path.dirname(existing);
  if (!fs.realpathSync(existing).startsWith(fs.realpathSync(root) + path.sep) && fs.realpathSync(existing) !== fs.realpathSync(root)) throw new Error('Symlink escapes root');
  return resolved;
}
export function parseCSV(text) {
  text = text.replace(/^\uFEFF/,'');
  const rows = []; let row = [], field = '', quoted = false, closed = false;
  for (let i=0; i<text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i+1] === '"') { field += '"'; i++; }
      else if (ch === '"') { quoted = false; closed = true; }
      else field += ch;
    } else if (ch === '"') {
      if (field || closed) throw new Error('Malformed CSV quote');
      quoted = true;
    } else if (ch === ',') { row.push(field); field=''; closed=false; }
    else if (ch === '\r' || ch === '\n') {
      if (ch === '\r' && text[i+1] === '\n') i++;
      row.push(field); if (row.some(Boolean)) rows.push(row);
      row=[]; field=''; closed=false;
    } else {
      if (closed) throw new Error('Unexpected text after CSV closing quote');
      field += ch;
    }
  }
  if (quoted) throw new Error('Unterminated CSV quote');
  if (field || row.length || closed) { row.push(field); rows.push(row); }
  if (!rows.length) throw new Error('Empty CSV');
  const headers = rows.shift();
  if (new Set(headers).size !== headers.length) throw new Error('Duplicate CSV columns');
  return rows.map((values,i) => {
    if (values.length !== headers.length) throw new Error(`CSV row ${i+2}: ${values.length} fields; expected ${headers.length}`);
    return Object.fromEntries(headers.map((key,j) => [key, values[j]]));
  });
}
export const readCSV = file => parseCSV(fs.readFileSync(file,'utf8'));
// Dependency-free validation for the JSON Schema subset used by config.schema.json.
export function validateSchema(value, schema, label='$') {
  const errors=[];
  if ('const' in schema && JSON.stringify(value)!==JSON.stringify(schema.const)) errors.push(`${label}: expected ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.some(x=>JSON.stringify(x)===JSON.stringify(value))) errors.push(`${label}: not in allowed values`);
  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  const actual = value===null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  if (schema.type && !types.some(t=>t===actual || (t==='integer' && Number.isInteger(value)))) return [...errors,`${label}: invalid type ${actual}`];
  if (typeof value==='number') {
    if (schema.minimum!==undefined && value<schema.minimum) errors.push(`${label}: below minimum`);
    if (schema.maximum!==undefined && value>schema.maximum) errors.push(`${label}: above maximum`);
  }
  if (typeof value==='string' && schema.minLength && value.trim().length<schema.minLength) errors.push(`${label}: empty string`);
  if (Array.isArray(value)) {
    if (schema.minItems!==undefined && value.length<schema.minItems) errors.push(`${label}: too few items`);
    if (schema.maxItems!==undefined && value.length>schema.maxItems) errors.push(`${label}: too many items`);
    if (schema.uniqueItems && new Set(value.map(x=>JSON.stringify(x))).size!==value.length) errors.push(`${label}: duplicate items`);
    if (schema.items) value.forEach((x,i)=>errors.push(...validateSchema(x,schema.items,`${label}[${i}]`)));
  } else if (value && typeof value==='object') {
    for (const key of schema.required || []) if (!(key in value)) errors.push(`${label}: missing ${key}`);
    for (const [key,item] of Object.entries(value)) {
      if (schema.properties?.[key]) errors.push(...validateSchema(item,schema.properties[key],`${label}.${key}`));
      else if (schema.additionalProperties===false) errors.push(`${label}: unknown ${key}`);
    }
  }
  return errors;
}
export function loadSetup(root=WEBSITES) {
  const pipeline=inside(root,'pipelines/codex');
  return {root,pipeline,config:readJSON(path.join(pipeline,'config.json')),categories:readJSON(path.join(pipeline,'categories.json')).categories,queue:readJSON(path.join(pipeline,'queue/manifest.json'))};
}
export const expectedGroup = slot => slot<=3 ? 'claude' : slot<=6 ? 'codex' : 'open-source';
export const categoryFor = (setup,target) => setup.categories.find(c=>c.prefix===target || c.category===target || new RegExp(`^${c.prefix}-0[456]$`).test(target));
export function validateSetup(setup) {
  const {root,pipeline,config,categories,queue}=setup;
  const errors=validateSchema(config,readJSON(path.join(pipeline,'schemas/config.schema.json')));
  const requiredCategories=['university','healthcare','company','e-commerce','news','government','fashion','weather','nonprofit','church'];
  if (JSON.stringify([...categories.map(c=>c.category)].sort())!==JSON.stringify([...requiredCategories].sort())) errors.push('Exactly the ten study categories are required');
  const allIDs=new Set();
  const assignments=readCSV(inside(root,config.paths.assignments));
  for (const c of categories) {
    if (!/^[A-Z]+$/.test(c.prefix)) errors.push('Invalid category prefix');
    const strata=c.sampling_strata;
    if (!Array.isArray(strata) || strata.length!==10) { errors.push(`${c.category}: ten slot strata required`); continue; }
    for (let slot=1; slot<=10; slot++) {
      const id=`${c.prefix}-${String(slot).padStart(2,'0')}`;
      const s=strata.filter(s=>s.slot===slot);
      if (s.length!==1 || s[0].source_id!==id || s[0].model_group!==expectedGroup(slot) || !s[0].stratum?.trim()) errors.push(`${id}: invalid stratum`);
      const rows=assignments.filter(r=>r.category===c.category && Number(r.slot)===slot);
      if (rows.length!==1 || rows[0].source_id!==id || rows[0].model_group!==expectedGroup(slot) || rows[0].relative_path!==`${c.category}/${expectedGroup(slot)}/${id}`) errors.push(`${id}: invalid central assignment`);
      if (allIDs.has(id)) errors.push(`Duplicate source ID ${id}`); allIDs.add(id);
    }
    if (!c.representative_pages?.length || !c.conditional_interactions?.length || !c.simulation_notes) errors.push(`${c.category}: missing category requirements`);
    const inventory=readCSV(inside(root,`${config.paths.inventories}/${c.category}.csv`));
    if (inventory.length!==10 || new Set(inventory.map(x=>Number(x.slot))).size!==10) errors.push(`${c.category}: inventory must have ten unique slots`);
    for (const r of inventory) {
      const n=Number(r.slot);
      if (r.category!==c.category || !Number.isInteger(n) || n<1 || n>10 || r.source_id!==`${c.prefix}-${String(n).padStart(2,'0')}` || r.model_group!==expectedGroup(n)) errors.push(`${c.category}: invalid inventory slot`);
    }
  }
  const expectedTasks=categories.flatMap(c=>[`research-${c.prefix}`,...[4,5,6].map(n=>`build-${c.prefix}-0${n}`)]);
  if (queue.tasks.length!==40 || new Set(queue.tasks.map(t=>t.id)).size!==40 || expectedTasks.some(id=>!queue.tasks.some(t=>t.id===id))) errors.push('Queue must contain exactly ten research tasks and thirty Codex build tasks');
  for (const t of queue.tasks) {
    const c=categoryFor(setup,t.target);
    if (!c || t.category!==c.category || !['research','build'].includes(t.phase) || t.id!==`${t.phase}-${t.target}` || !['planned','prepared','running','completed','blocked'].includes(t.status)) errors.push(`Invalid task ${t.id}`);
    const deps=t.phase==='research' ? [] : [`research-${c?.prefix}`];
    if (JSON.stringify(t.depends_on)!==JSON.stringify(deps)) errors.push(`Invalid dependencies ${t.id}`);
  }
  for (const file of Object.values(config.paths)) inside(root,file);
  for (const file of [config.paths.rules,config.paths.allocation,config.paths.qc]) if (!fs.existsSync(inside(root,file))) errors.push(`Missing shared file ${file}`);
  return errors;
}
function jsonField(row,field) {
  let value; try { value=JSON.parse(row[field]); } catch {throw new Error(`${row.source_id}: ${field} must be a JSON array`);}
  if (!Array.isArray(value) || !value.length) throw new Error(`${row.source_id}: empty ${field}`);
  return value;
}
export function buildReadiness(setup,id,model) {
  const errors=[]; const c=categoryFor(setup,id);
  if (!c || !new RegExp(`^${c?.prefix}-0[456]$`).test(id)) return ['Build target must be an allocated Codex ID (04–06)'];
  const inventory=readCSV(inside(setup.root,`${setup.config.paths.inventories}/${c.category}.csv`));
  const register=readCSV(inside(setup.root,setup.config.paths.assignments));
  const seen=new Set();
  for (const row of inventory) {
    try {
      for (const key of ['source_name','source_url','model_id','subcategory','verified_at','verification_method','verification_result','evidence_reference','complexity','stack_clues','limitations','approved_at','approved_by','approval_reference']) if (!row[key]?.trim()) throw new Error(`${row.source_id}: missing ${key}`);
      const url=new URL(row.source_url);
      if (!['http:','https:'].includes(url.protocol)) throw new Error(`${row.source_id}: invalid source URL`);
      url.hostname=url.hostname.replace(/^www\./i,''); url.hash=''; url.search=''; url.protocol='https:';
      const normalized=url.href.replace(/\/$/,'');
      if (seen.has(normalized)) throw new Error(`${row.source_id}: duplicate reference URL`);seen.add(normalized);
      if (row.verification_result!=='verified') throw new Error(`${row.source_id}: source is not verified`);
      if (!['low','medium','high'].includes(row.complexity)) throw new Error(`${row.source_id}: complexity must be low, medium or high`);
      for (const key of ['verified_at','approved_at']) if (!/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(row[key]) || Number.isNaN(Date.parse(row[key]))) throw new Error(`${row.source_id}: invalid ${key}`);
      const pages=jsonField(row,'source_pages'); const names=new Set();
      for (const page of pages) {
        if (!page.title || !/^https?:\/\//.test(page.url) || !/^[a-z0-9][a-z0-9-]*\.html$/.test(page.local_file) || names.has(page.local_file)) throw new Error(`${row.source_id}: invalid/duplicate page mapping`);
        names.add(page.local_file);
      }
      if (!names.has('index.html')) throw new Error(`${row.source_id}: page map requires index.html`);
      jsonField(row,'key_regions');
      for (const item of jsonField(row,'key_interactions')) if (!item.name || !['observed','inferred'].includes(item.evidence)) throw new Error(`${row.source_id}: interactions need name and observed/inferred evidence`);
      const evidence=row.evidence_reference;
      if (!/^https?:\/\//.test(evidence) && !fs.existsSync(inside(setup.root,evidence))) throw new Error(`${row.source_id}: missing evidence file`);
      const match=register.find(r=>r.category===c.category && r.source_id===row.source_id);
      if (!match || match.source_url!==row.source_url || match.model_id!==row.model_id || (match.model_version || '')!==(row.model_version || '') || match.approved_at!==row.approved_at) throw new Error(`${row.source_id}: approval/source/model not synchronized with assignment register`);
    } catch(e) { errors.push(e.message); }
  }
  if (!model?.id || !model?.runtime || !model?.operator) errors.push('Actual model ID, runtime, and operator are required before build preparation');
  const selected=inventory.find(r=>r.source_id===id);
  if (model?.id && selected?.model_id && model.id!==selected.model_id) errors.push('Requested model differs from approved assignment');
  if ((model?.version || '')!==(selected?.model_version || '')) errors.push('Requested model version differs from approved assignment');
  const running=setup.queue.tasks.filter(t=>t.phase==='build' && t.status==='running');
  if (running.length>=setup.config.execution.max_concurrent_builds) errors.push('Build concurrency limit reached in queue; finish or reconcile active run first');
  return errors;
}
export function cliArgs(argv,allowed) {
  const positional=[],flags={};
  for (let i=0;i<argv.length;i++) {
    const item=argv[i];
    if (!item.startsWith('--')) {positional.push(item);continue;}
    const key=item.slice(2);
    if (!(key in allowed) || key in flags) throw new Error(`Unknown or repeated option ${item}`);
    if (allowed[key]==='boolean') flags[key]=true;
    else {if (!argv[i+1] || argv[i+1].startsWith('--')) throw new Error(`Missing value for ${item}`);flags[key]=argv[++i];}
  }
  return {positional,flags};
}
