'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { run } = require('./axe_probe');

test('axe probe flags img without alt', async (t) => {
  let browser;
  try {
    browser = await require('playwright').chromium.launch();
  } catch (e) {
    return t.skip('chromium not available');
  }
  try {
    const page = await browser.newPage();
    await page.setContent('<!doctype html><html lang="en"><head><title>t</title></head><body><main><h1>Hello</h1><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw="><p>Some text</p></main></body></html>');
    const out = await run(page);
    assert.ok(out.violations >= 1);
    assert.ok(out.passes > 0);
    assert.ok(out.textChars >= 14);
    assert.ok(out.elementCount > 5);
    assert.strictEqual(typeof out.bestPracticeViolations, 'number');
  } finally {
    await browser.close();
  }
});

test('axe probe does not count best-practice-only issues as violations', async (t) => {
  let browser;
  try {
    browser = await require('playwright').chromium.launch();
  } catch (e) {
    return t.skip(`chromium not available: ${e.message.split('\n')[0]}`);
  }
  try {
    const page = await browser.newPage();
    // no h1 and no landmark: best-practice rules only
    await page.setContent('<!doctype html><html lang="en"><head><title>t</title></head><body><p>Plain text only</p></body></html>');
    const out = await run(page);
    assert.strictEqual(out.violations, 0);
    assert.deepStrictEqual(out.rules, []);
    assert.ok(out.bestPracticeViolations >= 1);
  } finally {
    await browser.close();
  }
});
