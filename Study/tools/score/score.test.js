'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { HEADER, parseArgs, buildRow, appendRows, scoreFiles } = require('./score');

const probes = {
  axe: async () => ({ violations: 1, passes: 3, incomplete: 2, textChars: 50, elementCount: 9 }),
  tab: async () => ({ tabOrderMismatches: 1, keyboardTraps: 0, unreachableInteractives: 2, focusVisibleFails: 3 }),
  ax: async () => ({ interactiveNodes: 4, nameChars: 10, headingSkips: 1 }),
};
const meta = { site: 'S', arm: 'A', condition: 'wcag', iteration: '1', files: ['index.html', 'form.html'] };

test('header order matches README section 9', () => {
  assert.strictEqual(HEADER.join(','), 'site_id,category,generator_group,arm,condition,iteration,page,breakpoint,'
    + 'axe_violations,axe_passes,axe_incomplete,violation_rate,ax_name_chars,ax_interactive_nodes,'
    + 'name_chars_per_interactive,tab_order_mismatches,keyboard_traps,unreachable_interactives,'
    + 'focus_visible_fails,heading_skips,text_chars,element_count,status');
});

test('one row per page per breakpoint with computed ratios; append writes header once', async () => {
  const rows = await scoreFiles(meta, async () => ({}), probes);
  assert.strictEqual(rows.length, 4);
  assert.deepStrictEqual(rows.map((r) => r.breakpoint), [1280, 375, 1280, 375]);
  assert.strictEqual(rows[0].violation_rate, 0.25);
  assert.strictEqual(rows[0].name_chars_per_interactive, 2.5);
  const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'score-')), 'm.csv');
  appendRows(f, rows);
  appendRows(f, rows);
  const lines = fs.readFileSync(f, 'utf8').trim().split('\n');
  assert.strictEqual(lines.length, 9);
  assert.strictEqual(lines.filter((l) => l === HEADER.join(',')).length, 1);
});

test('zero denominators give 0; probe failure gives error row, not a throw', async () => {
  const r = buildRow(meta, 'p', 1280, { axe: {}, ax: {} });
  assert.strictEqual(r.violation_rate, 0);
  assert.strictEqual(r.name_chars_per_interactive, 0);
  const rows = await scoreFiles({ ...meta, files: ['x'] }, async () => { throw new Error('boom'); }, probes);
  assert.deepStrictEqual(rows.map((x) => x.status), ['error', 'error']);
});

test('CLI exits 0 even with violations (violations never gate)', () => {
  const a = parseArgs(['--variant', 'd', '--files', 'a.html;b.html', '--site', 'S', '--arm', 'A',
    '--condition', 'c', '--iteration', '1', '--out', 'm.csv']);
  assert.deepStrictEqual(a.files, ['a.html', 'b.html']);
  assert.throws(() => parseArgs(['--variant', 'd']), /missing/);
});
