'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const zlib = require('node:zlib');
const { execFileSync } = require('node:child_process');

const py = process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
const worker = path.join(__dirname, '..', 'worker');
const study = path.resolve(__dirname, '..', '..');

test('pack_runs emits the import NDJSON format', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pack-'));
  const cell = path.join(tmp, 'runs', 'A5', 'wcag', 'UNI-01', 'iter1');
  fs.mkdirSync(cell, { recursive: true });
  fs.writeFileSync(path.join(cell, 'index.html'), '<p>é</p>');
  fs.writeFileSync(path.join(cell, 'status.json'), '{"status":"ok"}');
  fs.writeFileSync(path.join(cell, 'notes.bin'), 'x');
  fs.mkdirSync(path.join(tmp, 'runs', 'A1', 'wcag', 'UNI-01'), { recursive: true });
  const out = path.join(tmp, 'runs.ndjson.gz');
  execFileSync(py, [path.join(worker, 'pack_runs.py'), '--runs', path.join(tmp, 'runs'), '--arms', 'A5,A6', '--out', out]);
  const lines = zlib.gunzipSync(fs.readFileSync(out)).toString().trim().split('\n').map((l) => JSON.parse(l));
  assert.strictEqual(lines.length, 1);
  assert.strictEqual(lines[0].cell, 'A5/wcag/UNI-01');
  assert.deepStrictEqual(Object.keys(lines[0].files).sort(), ['iter1/index.html', 'iter1/status.json']);
  assert.deepStrictEqual(lines[0].files['iter1/index.html'], { enc: 'utf8', data: '<p>é</p>' });
});

test('estimate.py output shape', () => {
  const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'est-')), 'estimate.json');
  execFileSync(py, [path.join(worker, 'estimate.py'), '--study', study, '--out', out]);
  const e = JSON.parse(fs.readFileSync(out, 'utf8'));
  assert.ok(e.mean_in > 0 && e.mean_out > 0);
  assert.deepStrictEqual(Object.keys(e['UNI-01']).sort(), ['both', 'naive', 'nielsen', 'wcag']);
  assert.ok(e['UNI-01'].wcag.in > e['UNI-01'].naive.in);
  assert.ok(e.calls_upper_bound.A1 > 0 && !('A5' in e.calls_upper_bound));
});
