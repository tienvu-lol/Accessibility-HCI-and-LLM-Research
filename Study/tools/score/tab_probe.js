'use strict';
// Tab traversal probe (C6, README section 5): one Tab trace -> order, trap, unreachable,
// focus-visible (in-memory screenshot diff, nothing persisted) and skip-link results.

const MAX_STOPS = 300;
const TRAP_REPEATS = 3; // same element focused this many consecutive times = trap
const RING_PAD = 4; // outlines are drawn outside the border box

// ---- in-page helpers (serialised by Playwright; must be self-contained) ----

function resetFocus() {
  if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
  window.scrollTo(0, 0);
  const cands = document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,summary,[tabindex],[contenteditable=true]');
  return cands.length;
}

function describeActive() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  const all = document.getElementsByTagName('*');
  const domIndex = Array.prototype.indexOf.call(all, el);
  const r = el.getBoundingClientRect();
  const text = (el.innerText || el.value || el.getAttribute('aria-label') || el.getAttribute('alt') || '')
    .replace(/\s+/g, ' ').trim().slice(0, 80);
  return {
    tag: el.tagName.toLowerCase(), id: el.id || '', text, domIndex,
    rect: { x: Math.round(r.left + scrollX), y: Math.round(r.top + scrollY), width: Math.round(r.width), height: Math.round(r.height) },
    view: { left: r.left, top: r.top, width: r.width, height: r.height },
  };
}

function blurActive() { if (document.activeElement) document.activeElement.blur(); }

function refocus(domIndex) {
  const el = document.getElementsByTagName('*')[domIndex];
  if (el) el.focus({ preventScroll: true });
}

// Visible, enabled elements a user could click that never received focus.
function countUnreachable(stopIdx) {
  const seen = new Set(stopIdx);
  const sel = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[onclick],'
    + '[role=button],[role=link],[role=checkbox],[role=menuitem],[role=tab],[role=switch]';
  const all = document.getElementsByTagName('*');
  const radioGroupHit = new Set();
  const list = Array.from(document.querySelectorAll(sel));
  const key = (el) => (el.form ? 'f' + Array.prototype.indexOf.call(document.forms, el.form) : 'd') + ':' + el.name;
  for (const el of list) {
    if (el.type === 'radio' && el.name && seen.has(Array.prototype.indexOf.call(all, el))) radioGroupHit.add(key(el));
  }
  let n = 0;
  for (const el of list) {
    if (el.disabled || el.closest('[inert],[hidden],[aria-hidden=true]')) continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (cs.visibility === 'hidden' || cs.display === 'none' || (r.width === 0 && r.height === 0)) continue;
    if (el.type === 'radio' && el.name && radioGroupHit.has(key(el))) continue; // arrow keys reach the rest
    if (!seen.has(Array.prototype.indexOf.call(all, el))) n++;
  }
  return n;
}

// Activate the first stop (a skip link) and report whether it lands on #main-content.
function skipLinkLands() {
  const target = document.getElementById('main-content');
  return !!target && location.hash === '#main-content';
}

// ---- pure analysis (unit-tested without a browser) ----

function orderMismatches(stops) {
  let n = 0;
  for (let i = 1; i < stops.length; i++) if (stops[i].domIndex < stops[i - 1].domIndex) n++;
  return n;
}

function clipFor(view, vp) {
  const x = Math.max(0, Math.floor(view.left - RING_PAD));
  const y = Math.max(0, Math.floor(view.top - RING_PAD));
  const width = Math.min(vp.width - x, Math.ceil(view.width + 2 * RING_PAD));
  const height = Math.min(vp.height - y, Math.ceil(view.height + 2 * RING_PAD));
  return width > 0 && height > 0 && view.width > 0 && view.height > 0 ? { x, y, width, height } : null;
}

async function run(page) {
  const vp = page.viewportSize() || await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  const candidates = await page.evaluate(resetFocus);
  const stops = [];
  const seen = new Set();
  let keyboardTraps = 0;
  let focusVisibleFails = 0;
  let repeats = 0;
  let last = -1;

  for (let i = 0; i < MAX_STOPS; i++) {
    await page.keyboard.press('Tab');
    const s = await page.evaluate(describeActive);
    if (!s) break; // focus left the document: one full cycle
    if (s.domIndex === last) {
      if (candidates > 1 && ++repeats >= TRAP_REPEATS - 1) { keyboardTraps = 1; break; }
      continue;
    }
    if (seen.has(s.domIndex)) {
      if (s.domIndex !== stops[0].domIndex) keyboardTraps = 1; // looping on a subset
      break;
    }
    repeats = 0;
    last = s.domIndex;
    seen.add(s.domIndex);
    const { view, ...stop } = s;
    stops.push(stop);

    const clip = clipFor(view, vp);
    if (clip) {
      const focused = await page.screenshot({ clip, type: 'png' });
      await page.evaluate(blurActive);
      const plain = await page.screenshot({ clip, type: 'png' });
      await page.evaluate(refocus, s.domIndex);
      if (focused.equals(plain)) focusVisibleFails++;
    }
  }

  const unreachableInteractives = await page.evaluate(countUnreachable, stops.map((s) => s.domIndex));

  let skipLinkOk = false;
  const first = stops[0];
  if (first && first.tag === 'a') {
    await page.evaluate(resetFocus);
    await page.keyboard.press('Tab');
    const href = await page.evaluate(() => document.activeElement && document.activeElement.getAttribute('href'));
    if (href && href.startsWith('#')) {
      await page.keyboard.press('Enter');
      skipLinkOk = await page.evaluate(skipLinkLands);
    }
  }

  return { stops, tabOrderMismatches: orderMismatches(stops), keyboardTraps,
    unreachableInteractives, focusVisibleFails, skipLinkOk };
}

module.exports = { run, orderMismatches, clipFor };
