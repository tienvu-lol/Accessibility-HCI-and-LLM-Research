// Synthetic repository fixture: a throwaway Websites tree with a consistent 3/3/4 register.
// Nothing here touches the real dataset, and no fixture source is a real reference.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {toCSV} from '../scripts/lib.mjs';

export const PIPELINE_SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const INVENTORY_FIELDS = ['category','slot','source_id','model_group','model_id','model_version','subcategory',
  'source_name','source_url','verified_at','verification_method','verification_result','evidence_reference',
  'source_pages','key_regions','key_interactions','complexity','stack_clues','limitations',
  'approved_at','approved_by','approval_reference'];
const REGISTER_FIELDS = ['category','slot','source_id','source_name','source_url','model_group','model_id',
  'model_version','status','approved_at','generated_at','relative_path','reviewer','notes'];

const group = slot => slot <= 3 ? 'claude' : slot <= 6 ? 'codex' : 'open-source';
const pad = n => String(n).padStart(2, '0');

export function makeFixture({approveOpenSource = false, pages = 7} = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'os-pipeline-fixture-'));
  fs.cpSync(PIPELINE_SRC, path.join(root, 'pipelines/open-source'), {
    recursive: true,
    filter: src => !/[/\\](runs|node_modules|research[/\\]evidence|research[/\\]proposals)([/\\]|$)/.test(src),
  });
  fs.mkdirSync(path.join(root, 'pipelines/open-source/runs'), {recursive: true});
  fs.rmSync(path.join(root, 'pipelines/open-source/models.json'), {force: true});
  fs.writeFileSync(path.join(root, 'Rules.md'), '# Fixture Rules.md (WEB-REPLICA-V1.0 stand-in)\n');
  fs.writeFileSync(path.join(root, 'MODEL_ALLOCATION.md'), '# Fixture MODEL_ALLOCATION.md (WEB-REPLICA-ALLOCATION-V1.0 stand-in)\n');
  fs.mkdirSync(path.join(root, 'metadata/source-inventories'), {recursive: true});
  fs.writeFileSync(path.join(root, 'metadata/change-log.md'), '# Fixture change log\n');
  fs.mkdirSync(path.join(root, 'tools/qc'), {recursive: true});
  fs.writeFileSync(path.join(root, 'tools/qc/qc.js'), '// fixture stand-in for the shared QC tool\n');

  const categories = JSON.parse(fs.readFileSync(path.join(root, 'pipelines/open-source/categories.json'), 'utf8')).categories;
  const register = [];
  for (const c of categories) {
    const rows = [];
    for (let slot = 1; slot <= 10; slot++) {
      const id = `${c.prefix}-${pad(slot)}`;
      const g = group(slot);
      const ours = g === 'open-source';
      const filled = ours && approveOpenSource;
      const pageList = Array.from({length: pages}, (_, i) => ({
        url: `https://fixture-${id.toLowerCase()}.example/${i === 0 ? '' : `page-${i}`}`,
        title: i === 0 ? `${id} home` : `${id} page ${i}`,
        local_file: i === 0 ? 'index.html' : `page-${i}.html`,
      }));
      rows.push({
        category: c.category, slot: pad(slot), source_id: id, model_group: g,
        model_id: filled ? 'fixture-org/Fixture-Model' : '', model_version: '',
        subcategory: c.sampling_strata.find(s => s.slot === slot).stratum,
        source_name: filled ? `${id} Fixture Organization` : '',
        source_url: filled ? `https://fixture-${id.toLowerCase()}.example/` : '',
        verified_at: filled ? '2026-11-13' : '',
        verification_method: filled ? 'fixture: no real request was made' : '',
        verification_result: filled ? 'verified' : '',
        evidence_reference: filled ? 'pipelines/open-source/categories.json#fixture-placeholder' : '',
        source_pages: filled ? JSON.stringify(pageList) : '',
        key_regions: filled ? JSON.stringify(['header', 'primary navigation', 'hero', 'card grid', 'footer']) : '',
        key_interactions: filled ? JSON.stringify([{name: 'responsive navigation', evidence: 'observed', notes: 'fixture'},
          {name: 'listing filter', evidence: 'inferred', notes: 'fixture'}]) : '',
        complexity: filled ? 'medium' : '',
        stack_clues: filled ? 'unknown' : '',
        limitations: filled ? 'fixture row; not a real reference site' : '',
        approved_at: filled ? '2026-11-13' : '',
        approved_by: filled ? 'fixture operator' : '',
        approval_reference: filled ? 'fixture test' : '',
      });
      register.push({
        category: c.category, slot: pad(slot), source_id: id,
        source_name: filled ? `${id} Fixture Organization` : '',
        source_url: filled ? `https://fixture-${id.toLowerCase()}.example/` : '',
        model_group: g, model_id: filled ? 'fixture-org/Fixture-Model' : '', model_version: '',
        status: filled ? 'approved' : 'planned',
        approved_at: filled ? '2026-11-13' : '', generated_at: '',
        relative_path: `${c.category}/${g}/${id}`, reviewer: '', notes: '',
      });
    }
    fs.writeFileSync(path.join(root, `metadata/source-inventories/${c.category}.csv`), toCSV(INVENTORY_FIELDS, rows));
  }
  fs.writeFileSync(path.join(root, 'metadata/assignments.csv'), toCSV(REGISTER_FIELDS, register));
  return root;
}

export function declareFixtureModels(root, {baseUrl, keyEnv = 'FIXTURE_TEST_KEY', openWeights = true} = {}) {
  const slots = {};
  for (const slot of [7, 8, 9, 10]) {
    slots[String(slot)] = {
      model_id: `fixture-org/Fixture-Model`, model_version: null,
      weights_url: 'https://example.invalid/fixture-weights',
      license: 'apache-2.0', open_weights: openWeights,
      eligibility_note: 'fixture declaration for tests only',
      provider: 'fixture', base_url: baseUrl, api_key_env: keyEnv,
      params: {temperature: 0, max_tokens: 4096},
    };
  }
  fs.writeFileSync(path.join(root, 'pipelines/open-source/models.json'),
    JSON.stringify({schema_version: '1.0', declared_at: '2026-11-13T00:00:00Z', declared_by: 'fixture operator', slots}, null, 2) + '\n');
}

export const cleanup = root => fs.rmSync(root, {recursive: true, force: true});
