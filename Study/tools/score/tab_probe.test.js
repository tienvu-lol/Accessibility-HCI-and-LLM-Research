'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { run, orderMismatches, clipFor } = require('./tab_probe');

test('orderMismatches counts DOM-index decreases', () => {
  const s = (...i) => i.map((domIndex) => ({ domIndex }));
  assert.strictEqual(orderMismatches(s(1, 2, 3)), 0);
  assert.strictEqual(orderMismatches(s(5, 1, 2)), 1);
});

test('clipFor pads, clamps to viewport, skips empty rects', () => {
  const vp = { width: 100, height: 100 };
  assert.deepStrictEqual(clipFor({ left: 10, top: 10, width: 20, height: 10 }, vp), { x: 6, y: 6, width: 28, height: 18 });
  assert.deepStrictEqual(clipFor({ left: 90, top: 0, width: 50, height: 10 }, vp), { x: 86, y: 0, width: 14, height: 18 });
  assert.strictEqual(clipFor({ left: 10, top: 10, width: 0, height: 0 }, vp), null);
});

// Fake page: two stops then focus leaves the document; second stop has no visible ring.
test('run() with fake page keeps screenshots in memory only', async () => {
  const stopsData = [
    { tag: 'a', id: 's', text: 'Skip', domIndex: 3, rect: { x: 0, y: 0, width: 10, height: 10 }, view: { left: 0, top: 0, width: 10, height: 10 } },
    { tag: 'button', id: '', text: 'Go', domIndex: 2, rect: { x: 0, y: 20, width: 10, height: 10 }, view: { left: 0, top: 20, width: 10, height: 10 } },
  ];
  let presses = 0;
  let current = 0;
  const shotOpts = [];
  // shots 1-2 (stop 1) differ; shots 3-4 (stop 2) are identical -> one focus-visible fail
  const page = {
    viewportSize: () => ({ width: 200, height: 200 }),
    keyboard: { press: async (k) => { if (k === 'Tab') presses++; } },
    screenshot: async (o) => { shotOpts.push(o); current++; return Buffer.from(current <= 2 ? 'a' + current : 'same'); },
    evaluate: async (fn, arg) => {
      switch (fn.name) {
        case 'resetFocus': return 2;
        case 'describeActive': return presses <= stopsData.length ? stopsData[presses - 1] : null;
        case 'countUnreachable': return 1;
        case 'blurActive': case 'refocus': return undefined;
        default: return null;
      }
    },
  };
  const r = await run(page);
  assert.strictEqual(r.stops.length, 2);
  assert.ok(!('view' in r.stops[0]));
  assert.strictEqual(r.tabOrderMismatches, 1);
  assert.strictEqual(r.unreachableInteractives, 1);
  assert.strictEqual(r.keyboardTraps, 0);
  assert.strictEqual(r.focusVisibleFails, 1);
  assert.ok(shotOpts.length > 0 && shotOpts.every((o) => !('path' in o)));
});

// ---- real-browser fixtures (skipped when chromium cannot launch) ----

const HEAD = '<style>a,button{display:inline-block;margin:8px;padding:4px}</style>';
const FIXTURES = {
  clean: `${HEAD}<style>a:focus,button:focus{outline:3px solid #00f}</style>
    <a href="#main-content">Skip</a><button>One</button><button>Two</button>
    <main id="main-content" tabindex="-1"><a href="#x">Link</a></main>`,
  noOutline: `${HEAD}<style>a:focus,button:focus{outline:none}</style>
    <a href="#main-content">Skip</a><button>One</button><button>Two</button>
    <main id="main-content" tabindex="-1"><a href="#x">Link</a></main>`,
  reordered: `${HEAD}<style>a:focus,button:focus{outline:3px solid #00f}</style>
    <a href="#main-content">Skip</a><button>One</button><button tabindex="1">Two</button>
    <main id="main-content" tabindex="-1"><a href="#x">Link</a></main>
    <div onclick="1">Fake button</div>`,
};

async function launch() {
  try {
    const { chromium } = require('playwright');
    return await chromium.launch();
  } catch (e) {
    return null;
  }
}

test('tab probe fixtures', async (t) => {
  const browser = await launch();
  if (!browser) return t.skip('chromium not available');
  try {
    const probe = async (html) => {
      const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
      await page.setContent(html);
      const out = await run(page);
      await page.close();
      return out;
    };
    const clean = await probe(FIXTURES.clean);
    assert.strictEqual(clean.focusVisibleFails, 0);
    assert.strictEqual(clean.tabOrderMismatches, 0);
    assert.strictEqual(clean.keyboardTraps, 0);
    assert.strictEqual(clean.unreachableInteractives, 0);
    assert.strictEqual(clean.skipLinkOk, true);

    const none = await probe(FIXTURES.noOutline);
    assert.ok(none.focusVisibleFails >= 3);

    const re = await probe(FIXTURES.reordered);
    assert.ok(re.tabOrderMismatches >= 1);
    assert.strictEqual(re.unreachableInteractives, 1);
  } finally {
    await browser.close();
  }
});
