// Real HTTP verification, performed by the orchestrator rather than by a model.
// The agents never fetch anything; they only interpret the evidence this produces,
// so a "verified" cell in the inventory always traces to a recorded status line here.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadSetup, cliArgs, writeJSON, nowISO, inside} from './lib.mjs';

const decode = html => html
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/&reg;/g, '\u00ae').replace(/&trade;/g, '\u2122').replace(/&copy;/g, '\u00a9')
  .replace(/&mdash;/g, '\u2014').replace(/&ndash;/g, '\u2013').replace(/&hellip;/g, '\u2026')
  .replace(/&[lr]squo;/g, "'").replace(/&[lr]dquo;/g, '"')
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));

const robotsCache = new Map();

/** Minimal robots.txt check for the wildcard user-agent. Fetching is skipped where disallowed. */
export async function robotsAllows(target, cfg) {
  const url = new URL(target);
  const origin = url.origin;
  if (!robotsCache.has(origin)) {
    robotsCache.set(origin, (async () => {
      try {
        const res = await fetch(`${origin}/robots.txt`, {
          headers: {'user-agent': cfg.http_user_agent, accept: 'text/plain'},
          signal: AbortSignal.timeout(cfg.http_timeout_ms), redirect: 'follow',
        });
        if (!res.ok) return {rules: [], note: `robots.txt HTTP ${res.status}; treated as permissive`};
        const text = (await res.text()).slice(0, 200_000);
        const rules = []; let applies = false;
        for (const raw of text.split(/\r?\n/)) {
          const line = raw.replace(/#.*$/, '').trim();
          if (!line) continue;
          const [field, ...rest] = line.split(':');
          const value = rest.join(':').trim();
          const key = field.trim().toLowerCase();
          if (key === 'user-agent') applies = value === '*';
          else if (applies && (key === 'disallow' || key === 'allow')) rules.push({type: key, path: value});
        }
        return {rules, note: 'robots.txt read for user-agent *'};
      } catch (e) {
        return {rules: [], note: `robots.txt unreachable (${e.name}); treated as permissive`};
      }
    })());
  }
  const {rules, note} = await robotsCache.get(origin);
  const target_path = url.pathname + (url.search || '');
  let decision = {allowed: true, rule: null};
  for (const rule of rules) {
    if (!rule.path) continue;
    if (!target_path.startsWith(rule.path)) continue;
    if (rule.rule_len === undefined) rule.rule_len = rule.path.length;
    if (decision.rule && decision.rule.rule_len >= rule.rule_len) continue;
    decision = {allowed: rule.type === 'allow', rule};
  }
  return {allowed: decision.allowed, matched: decision.rule?.path ?? null, note};
}

/** Fetch one URL and record exactly what came back. Never throws. */
export async function fetchPage(target, cfg, {respectRobots = true} = {}) {
  const record = {url: target, fetched_at: nowISO(), method: 'HTTP GET', ok: false, status: null, final_url: null,
    redirected: null, content_type: null, bytes: null, title: null, robots: null, error: null, links: []};
  let parsed;
  try { parsed = new URL(target); } catch { record.error = 'invalid URL'; return record; }
  if (!['http:', 'https:'].includes(parsed.protocol)) { record.error = 'only http(s) URLs are fetched'; return record; }
  if (respectRobots) {
    record.robots = await robotsAllows(target, cfg);
    if (!record.robots.allowed) { record.error = `skipped: robots.txt disallows ${record.robots.matched} for user-agent *`; return record; }
  }
  try {
    const res = await fetch(target, {
      headers: {'user-agent': cfg.http_user_agent, accept: 'text/html,application/xhtml+xml'},
      signal: AbortSignal.timeout(cfg.http_timeout_ms), redirect: 'follow',
    });
    record.status = res.status;
    record.final_url = res.url;
    record.redirected = res.url !== target;
    record.content_type = res.headers.get('content-type');
    const html = (await res.text()).slice(0, 3_000_000);
    record.bytes = Buffer.byteLength(html);
    record.ok = res.ok;
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    record.title = title ? decode(title[1]).replace(/\s+/g, ' ').trim().slice(0, 300) : null;
    record.links = extractLinks(html, res.url);
    record.html = html;
  } catch (e) {
    record.error = e.name === 'TimeoutError' ? `timed out after ${cfg.http_timeout_ms}ms` : `${e.name}: ${e.message}`;
  }
  return record;
}

/** Internal links with their anchor text, navigation links first. */
export function extractLinks(html, baseUrl, limit = 160) {
  const base = new URL(baseUrl);
  const navRegions = [...html.matchAll(/<(nav|header)\b[\s\S]*?<\/\1>/gi)].map(m => m[0]).join('\n');
  const seen = new Map();
  const collect = (source, inNav) => {
    for (const m of source.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
      let url;
      try { url = new URL(decode(m[1]), base); } catch { continue; }
      if (!['http:', 'https:'].includes(url.protocol)) continue;
      if (url.hostname.replace(/^www\./, '') !== base.hostname.replace(/^www\./, '')) continue;
      url.hash = '';
      const key = url.href.replace(/\/$/, '');
      const text = decode(m[2].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim().slice(0, 120);
      if (!seen.has(key)) seen.set(key, {url: url.href, text, in_nav: inNav});
      else if (inNav) seen.get(key).in_nav = true;
      if (seen.size >= limit) return;
    }
  };
  collect(navRegions, true);
  collect(html, false);
  return [...seen.values()].sort((a, b) => Number(b.in_nav) - Number(a.in_nav));
}

/** Sequential fetches with a courtesy delay; concurrency against one host is never the point here. */
export async function fetchAll(urls, cfg, {delayMs = 700, keepHtml = false} = {}) {
  const out = [];
  for (const [i, url] of urls.entries()) {
    if (i) await new Promise(r => setTimeout(r, delayMs));
    const record = await fetchPage(url, cfg);
    if (!keepHtml) delete record.html;
    out.push(record);
  }
  return out;
}

/**
 * Condense fetch records for a prompt. The link caps matter: navigation repeats on nearly every
 * page of a site, so a full dump is mostly redundant and can overflow a small context window.
 */
export const evidenceSummary = (records, {navLimit = 40, otherLimit = 40} = {}) => records.map(r => {
  const nav = r.links.filter(l => l.in_nav), other = r.links.filter(l => !l.in_nav);
  const out = {
    url: r.url, status: r.status, ok: r.ok, title: r.title, bytes: r.bytes,
    final_url: r.redirected ? r.final_url : null, error: r.error,
  };
  if (navLimit > 0) out.nav_links = nav.slice(0, navLimit).map(l => ({url: l.url, text: l.text}));
  if (otherLimit > 0) out.other_links = other.slice(0, otherLimit).map(l => ({url: l.url, text: l.text}));
  if (navLimit === 0 && nav.length) out.nav_links_omitted = nav.length;
  if (otherLimit === 0 && other.length) out.other_links_omitted = other.length;
  return out;
});

export const isMain = meta => process.argv[1] && fileURLToPath(meta.url) === path.resolve(process.argv[1]);

if (isMain(import.meta)) {
  try {
    const {positional, flags} = cliArgs(process.argv.slice(2), {out: 'value', 'keep-html': 'boolean'});
    if (!positional.length) throw new Error('Usage: node verify-sources.mjs <url> [url...] [--out pipeline-relative.json] [--keep-html]');
    const setup = loadSetup();
    const records = await fetchAll(positional, setup.config.research, {keepHtml: Boolean(flags['keep-html'])});
    for (const r of records)
      console.log(`${r.ok ? 'OK  ' : 'FAIL'} ${r.status ?? '---'} ${r.url}${r.title ? ` :: ${r.title}` : ''}${r.error ? ` :: ${r.error}` : ''}`);
    if (flags.out) {
      const target = inside(setup.pipeline, flags.out);
      fs.mkdirSync(path.dirname(target), {recursive: true});
      writeJSON(target, {tool: 'verify-sources.mjs', user_agent: setup.config.research.http_user_agent, fetched_at: nowISO(), records});
      console.log(`Evidence written to ${path.relative(setup.pipeline, target)}`);
    }
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
