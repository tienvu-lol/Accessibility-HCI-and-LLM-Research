// Replica QC: static audit + axe-core/runtime scan of every page at 1280px and 375px.
// Usage: node qc.js <siteDir> [--json out.json]   Exit code 1 if any check fails.
const fs = require('fs'), path = require('path'), { pathToFileURL } = require('url');
const { chromium } = require('playwright');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const dir = path.resolve(process.argv[2] || '.');
const jsonOut = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;
const fails = [], warns = [];
const fail = (m) => fails.push(m), warn = (m) => warns.push(m);

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(dir);
const rel = (f) => path.relative(dir, f).replace(/\\/g, '/');
const pages = files.filter((f) => f.endsWith('.html'));

// --- static checks
for (const req of ['index.html', '404.html', 'css/styles.css', 'js/main.js', 'README.md', 'fidelity-notes.md', 'component-inventory.json', 'generation-metadata.json'])
  if (!fs.existsSync(path.join(dir, req))) fail(`missing required file: ${req}`);
for (const j of ['component-inventory.json', 'generation-metadata.json']) {
  try { JSON.parse(fs.readFileSync(path.join(dir, j), 'utf8')); } catch (e) { if (fs.existsSync(path.join(dir, j))) fail(`invalid JSON: ${j}: ${e.message}`); }
}
for (const f of files) {
  const r = rel(f);
  if (/(^|\/)(package\.json|node_modules)|\.(ts|tsx|jsx|vue|svelte|php|py)$/.test(r)) fail(`prohibited file type: ${r}`);
  if (/jquery|bootstrap|tailwind|react|angular/i.test(path.basename(r)) && /\.(js|css)$/.test(r)) fail(`prohibited library file: ${r}`);
}
const checkRef = (from, ref, kind) => {
  if (!ref || /^(mailto:|tel:|data:|javascript:)/i.test(ref)) return;
  if (/^(https?:)?\/\//i.test(ref)) { if (kind !== 'a') fail(`remote dependency in ${rel(from)}: ${ref}`); return; }
  if (ref === '#') return fail(`placeholder href="#" in ${rel(from)}`);
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return;
  if (clean.startsWith('/')) return fail(`root-absolute path (breaks file://) in ${rel(from)}: ${ref}`);
  if (!fs.existsSync(path.resolve(path.dirname(from), decodeURI(clean)))) fail(`broken ${kind} in ${rel(from)}: ${ref}`);
};
for (const p of pages) {
  const h = fs.readFileSync(p, 'utf8');
  for (const m of h.matchAll(/<a\b[^>]*\bhref\s*=\s*"([^"]*)"/gi)) checkRef(p, m[1], 'a');
  for (const m of h.matchAll(/<(?:link|script|img|source|iframe|video|audio)\b[^>]*\b(?:href|src)\s*=\s*"([^"]*)"/gi)) checkRef(p, m[1], 'asset');
  for (const m of h.matchAll(/\bsrcset\s*=\s*"([^"]*)"/gi)) m[1].split(',').forEach((s) => checkRef(p, s.trim().split(/\s+/)[0], 'asset'));
  if (!/<main\b[^>]*id="main-content"/i.test(h)) fail(`no <main id="main-content"> in ${rel(p)}`);
  if (!/href="#main-content"/i.test(h)) fail(`no skip link to #main-content in ${rel(p)}`);
  if (!/data-section=/.test(h) || !/data-component=/.test(h)) fail(`no data-section/data-component metadata in ${rel(p)}`);
  if (!/<html[^>]*\blang=/i.test(h)) fail(`no lang on <html> in ${rel(p)}`);
}
for (const c of files.filter((f) => f.endsWith('.css')))
  for (const m of fs.readFileSync(c, 'utf8').matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) checkRef(c, m[1], 'asset');
for (const j of files.filter((f) => f.endsWith('.js'))) {
  const s = fs.readFileSync(j, 'utf8');
  if (/\bfetch\s*\(|XMLHttpRequest/.test(s)) warn(`network API used in ${rel(j)} (must not be needed for core features)`);
  for (const m of s.matchAll(/['"`]([\w./-]+\.html)(?:[#?][^'"`]*)?['"`]/g)) checkRef(path.join(dir, 'index.html'), m[1], 'js-link');
}

// --- runtime checks
(async () => {
  const browser = await chromium.launch();
  const axeTotals = {};
  for (const width of [1280, 375]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    for (const p of pages) {
      const page = await ctx.newPage(), r = rel(p);
      page.on('pageerror', (e) => fail(`JS error @${width} ${r}: ${e.message}`));
      page.on('console', (m) => m.type() === 'error' && fail(`console error @${width} ${r}: ${m.text()}`));
      page.on('request', (q) => !q.url().startsWith('file:') && !q.url().startsWith('data:') && fail(`network request @${width} ${r}: ${q.url()}`));
      page.on('requestfailed', (q) => fail(`failed request @${width} ${r}: ${q.url()}`));
      await page.goto(pathToFileURL(p).href, { waitUntil: 'load' });
      await page.addScriptTag({ content: AXE });
      const res = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }, preload: false }));  // preload XHRs CSS, which file:// blocks
      for (const v of res.violations) {
        axeTotals[v.id] = (axeTotals[v.id] || 0) + v.nodes.length;
        fail(`axe ${v.id} (${v.impact}) @${width} ${r}: ${v.nodes.length} node(s) e.g. ${v.nodes[0].target.join(' ')}`);
      }
      if (width === 375) {
        const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (over > 1) fail(`horizontal scroll @375 ${r}: ${over}px`);
      }
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  const summary = { site: dir, pages: pages.length, files: files.length, fails: fails.length, warns, axe: axeTotals, failures: fails };
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(summary, null, 2));
  console.log(`QC ${dir}\npages=${pages.length} files=${files.length} failures=${fails.length} warnings=${warns.length}`);
  [...new Set(fails)].slice(0, 80).forEach((m) => console.log('FAIL', m));
  warns.forEach((m) => console.log('WARN', m));
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error('QC crashed:', e); process.exit(2); });
