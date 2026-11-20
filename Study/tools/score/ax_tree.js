'use strict';
// AX tree probe via CDP Accessibility.getFullAXTree (C6).

const INTERACTIVE = new Set(['button', 'link', 'textbox', 'searchbox', 'checkbox', 'radio',
  'combobox', 'listbox', 'menuitem', 'tab', 'switch', 'slider', 'spinbutton', 'option']);
const LANDMARKS = new Set(['banner', 'navigation', 'main', 'complementary', 'contentinfo',
  'search', 'form', 'region']);
const OVERLONG = 150;

async function run(page) {
  const session = await page.context().newCDPSession(page);
  let nodes;
  try {
    await session.send('Accessibility.enable').catch(() => {});
    ({ nodes } = await session.send('Accessibility.getFullAXTree'));
  } finally {
    await session.detach().catch(() => {});
  }
  const out = { interactiveNodes: 0, nameChars: 0, namesMissing: 0, namesOverlong: 0,
    headingSkips: 0, headings: [], landmarks: [] };
  let prev = 0;
  for (const n of nodes) {
    if (n.ignored) continue;
    const role = n.role && n.role.value;
    const name = ((n.name && n.name.value) || '').trim();
    if (INTERACTIVE.has(role)) {
      out.interactiveNodes++;
      out.nameChars += name.length;
      if (!name) out.namesMissing++;
      else if (name.length > OVERLONG) out.namesOverlong++;
    } else if (role === 'heading') {
      const p = (n.properties || []).find((x) => x.name === 'level');
      const level = p ? Number(p.value.value) : 2;
      if (prev && level > prev + 1) out.headingSkips++;
      prev = level;
      out.headings.push({ level, name });
    } else if (LANDMARKS.has(role)) {
      out.landmarks.push(role);
    }
  }
  return out;
}

module.exports = { run };
