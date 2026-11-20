'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { run } = require('./ax_tree');

const n = (role, name, level) => ({ ignored: false, role: { value: role }, name: { value: name },
  properties: level ? [{ name: 'level', value: { value: level } }] : [] });

test('fixture AX tree', async () => {
  const nodes = [n('banner', ''), n('main', ''), n('heading', 'Title', 1), n('heading', 'Sub', 3),
    n('button', ''), n('link', 'Home'), { ignored: true, role: { value: 'button' }, name: { value: 'x' } }];
  const page = { context: () => ({ newCDPSession: async () => ({
    send: async (m) => (m === 'Accessibility.getFullAXTree' ? { nodes } : {}),
    detach: async () => {} }) }) };
  const r = await run(page);
  assert.strictEqual(r.interactiveNodes, 2);
  assert.strictEqual(r.nameChars, 4);
  assert.strictEqual(r.namesMissing, 1);
  assert.strictEqual(r.headingSkips, 1);
  assert.deepStrictEqual(r.landmarks, ['banner', 'main']);
  assert.deepStrictEqual(r.headings.map((h) => h.level), [1, 3]);
});
