'use strict';
const fs = require('node:fs');

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const AXE_SOURCE = fs.readFileSync(require.resolve('axe-core'), 'utf8');

async function run(page) {
  await page.evaluate(AXE_SOURCE);
  const [wcag, best] = await page.evaluate(async (tags) => {
    const wcagRes = await axe.run(document, { runOnly: { type: 'tag', values: tags.wcag } });
    const bestRes = await axe.run(document, { runOnly: { type: 'tag', values: tags.best } });
    return [wcagRes, bestRes].map((r) => ({
      violations: r.violations.length,
      passes: r.passes.length,
      incomplete: r.incomplete.length,
      rules: r.violations.map((v) => ({ id: v.id, impact: v.impact, tags: v.tags, nodes: v.nodes.length })),
    }));
  }, { wcag: WCAG_TAGS, best: ['best-practice'] });
  const dom = await page.evaluate(() => ({
    textChars: (document.body ? document.body.innerText : '').length,
    elementCount: document.getElementsByTagName('*').length,
  }));
  return {
    violations: wcag.violations,
    passes: wcag.passes,
    incomplete: wcag.incomplete,
    rules: wcag.rules,
    bestPracticeViolations: best.violations,
    ...dom,
  };
}

module.exports = { run };
