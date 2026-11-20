'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { runRepair, runScore, runJudge, parseCsv } = require('../lib/runjob');

test('runRepair mock runs the real runner; every path is under the cell prefix; usage summed', async () => {
  const job = { id: 'repair:A1:naive:UNI-01', kind: 'repair', arm: 'A1', condition: 'naive', site: 'UNI-01', max_iter: 3, mock: true,
    provider: 'openai', base_url: 'http://127.0.0.1:1/v1', model_id: 'm', api_key_env: 'A1_API_KEY', api_key: 'sk-secret-123' };
  const res = await runRepair(job);
  assert.strictEqual(res.status, 'ok', res.error);
  const paths = Object.keys(res.files);
  assert.ok(paths.length > 0);
  for (const p of paths) assert.ok(p.startsWith('runs/A1/naive/UNI-01/iter'), p);
  assert.ok(paths.includes('runs/A1/naive/UNI-01/iter1/index.html'));
  assert.ok(res.usage.input > 0 && res.usage.output > 0);
  assert.ok(res.calls >= 2); // iter1 + convergence iter2
  assert.ok(!JSON.stringify(res).includes('sk-secret-123'));
});

test('runScore passes args to score.js, never the worker token, and returns rows + rules', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fake-score-'));
  const fake = path.join(dir, 'score.js');
  fs.writeFileSync(fake, `const fs=require('fs');const a=process.argv.slice(2);const o={};for(let i=0;i<a.length;i+=2)o[a[i].slice(2)]=a[i+1];
    if(process.env.WORKER_TOKEN) process.exit(3);
    if(!fs.existsSync(o.variant+'/index.html')) process.exit(4);
    fs.writeFileSync(o.out,'site_id,page\\n'+o.site+',"a,b"\\n');
    fs.writeFileSync(o['rules-out'],JSON.stringify({page:'index.html',breakpoint:1280,rules:[{id:'x'}]})+'\\n');`);
  process.env.WORKER_TOKEN = 'tok';
  const job = { id: 's', kind: 'score', arm: 'A1', condition: 'wcag', site: 'UNI-01', slice_files: ['index.html'],
    iterations: { 1: { 'index.html': '<p>1</p>' }, 2: { 'index.html': '<p>2</p>' } } };
  const res = await runScore(job, { scoreScript: fake });
  delete process.env.WORKER_TOKEN;
  assert.deepStrictEqual(res.rows, [['UNI-01', 'a,b'], ['UNI-01', 'a,b']]);
  assert.strictEqual(res.rules.length, 2);
  assert.strictEqual(res.rules[1].iteration, 2);
  await assert.rejects(runScore({ ...job, iterations: { 1: { 'x.html': '' } } }, { scoreScript: fake }), /score.js failed/);
});

test('runJudge mock returns 70 rows, 5 key rows, no api key leak', async () => {
  const variants = {};
  for (const c of ['naive', 'wcag', 'nielsen', 'both', 'baseline']) {
    variants[c] = { 'index.html': `<p>${c}</p>`, 'apply.html': '<p>a</p>', 'css/styles.css': 'a{}' };
  }
  const res = await runJudge({ id: 'judge:UNI-01:A1', kind: 'judge', site: 'UNI-01', arm: 'A1', mock: true, seed: 's', variants,
    provider: 'gemini', base_url: null, model_id: 'g', api_key: 'gk-secret', call_id: 'c1' });
  assert.strictEqual(res.status, 'ok', res.error);
  assert.strictEqual(res.rows.length, 70);
  assert.strictEqual(res.key_rows.length, 5);
  assert.strictEqual(res.rows[0][6], 'c1');
  assert.ok(!JSON.stringify(res).includes('gk-secret'));
});

test('parseCsv handles quotes and CRLF', () => {
  assert.deepStrictEqual(parseCsv('a,b\r\n"x,""y""",2\n'), [['a', 'b'], ['x,"y"', '2']]);
});
