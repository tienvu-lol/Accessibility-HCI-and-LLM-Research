// The file-emission protocol used by the generation agents.
// Open-weight chat models vary in tool-calling support, so files arrive as plain text
// between sentinel lines and are written only inside the one approved slot directory.
import fs from 'node:fs';
import path from 'node:path';
import {inside} from './lib.mjs';

export const FILE_OPEN = /^[ \t]*={3,}[ \t]*FILE:[ \t]*(\S.*?)[ \t]*={3,}[ \t]*$/;
export const FILE_CLOSE = /^[ \t]*={3,}[ \t]*END FILE[ \t]*={3,}[ \t]*$/;
export const DONE = /^[ \t]*={3,}[ \t]*STATUS:[ \t]*(COMPLETE|CONTINUE)[ \t]*={3,}[ \t]*$/;

export const ALLOWED_EXT = new Set(['.html', '.css', '.js', '.svg', '.json', '.md', '.txt', '.webmanifest']);
// RULES.md section 8 names README.md in capitals; every other path stays lowercase.
export const ALLOWED_EXACT = new Set(['README.md']);
export const ALLOWED_DIRS = new Set(['', 'css', 'js', 'assets', 'data']);
export const LIMITS = {maxFileBytes: 600 * 1024, maxFiles: 120, maxTotalBytes: 6 * 1024 * 1024};

const PROHIBITED_PATH = /(^|\/)(package(-lock)?\.json|node_modules|\.git|\.env)(\/|$)|\.(ts|tsx|jsx|vue|svelte|php|py|rb|sh|exe|dll)$/i;
const PROHIBITED_LIB = /(^|\/)(jquery|bootstrap|tailwind|react|react-dom|angular|vue|svelte)[.-]/i;

/** Parse one model response into file payloads plus the leftover prose. */
export function parseResponse(text) {
  const lines = String(text).replace(/\r\n/g, '\n').split('\n');
  const files = [], prose = [];
  let status = null, current = null, fenced = false;
  for (const line of lines) {
    if (current) {
      if (FILE_CLOSE.test(line)) { current.content = current.lines.join('\n'); delete current.lines; files.push(current); current = null; continue; }
      if (current.lines.length === 0 && /^[ \t]*```[a-zA-Z0-9]*[ \t]*$/.test(line)) { fenced = true; continue; }
      if (fenced && /^[ \t]*```[ \t]*$/.test(line)) { fenced = false; continue; }
      current.lines.push(line);
      continue;
    }
    const open = line.match(FILE_OPEN);
    if (open) { current = {path: open[1].trim(), lines: []}; fenced = false; continue; }
    const done = line.match(DONE);
    if (done) { status = done[1]; continue; }
    prose.push(line);
  }
  const truncated = Boolean(current);
  if (current) { current.content = current.lines.join('\n'); delete current.lines; current.truncated = true; }
  return {files, status, prose: prose.join('\n').trim(), truncated, partial: current ?? null};
}

/** Reject a path the agent may not write. Returns null when acceptable. */
export function rejectPath(relPath) {
  if (!relPath || typeof relPath !== 'string') return 'empty path';
  if (relPath.length > 160) return 'path too long';
  if (path.isAbsolute(relPath) || /^[a-zA-Z]:/.test(relPath)) return 'absolute paths are not allowed';
  const normal = relPath.replace(/\\/g, '/').replace(/^\.\//, '');
  if (normal.split('/').includes('..')) return 'parent traversal is not allowed';
  if (ALLOWED_EXACT.has(normal)) return null;
  if (normal !== normal.toLowerCase()) return `use lowercase paths (only ${[...ALLOWED_EXACT].join(', ')} may use capitals)`;
  if (!/^[a-z0-9][a-z0-9._/-]*$/.test(normal)) return 'path has unexpected characters';
  if (PROHIBITED_PATH.test(normal)) return 'prohibited file type or location (RULES.md section 2)';
  if (PROHIBITED_LIB.test(normal)) return 'prohibited library file (RULES.md section 2)';
  const dir = path.posix.dirname(normal) === '.' ? '' : path.posix.dirname(normal);
  if (!ALLOWED_DIRS.has(dir)) return `directory "${dir}" is not one of: ${[...ALLOWED_DIRS].filter(Boolean).join(', ')} or the site root`;
  if (!ALLOWED_EXT.has(path.posix.extname(normal))) return `extension ${path.posix.extname(normal) || '(none)'} is not allowed`;
  return null;
}

/** Content-level constraints that RULES.md section 2 imposes and that QC would fail on. */
export function contentProblems(relPath, content) {
  const problems = [];
  const ext = path.posix.extname(relPath);
  if (Buffer.byteLength(content) > LIMITS.maxFileBytes) problems.push(`exceeds ${LIMITS.maxFileBytes} bytes`);
  if (ext === '.json') { try { JSON.parse(content); } catch (e) { problems.push(`invalid JSON: ${e.message}`); } }
  if (['.html', '.css', '.js'].includes(ext)) {
    for (const m of content.matchAll(/\b(?:src|href)\s*=\s*["'](https?:)?\/\/[^"']+["']/gi))
      if (!/^<a\b/i.test(m[0])) problems.push(`remote dependency: ${m[0].slice(0, 90)}`);
    for (const m of content.matchAll(/@import\s+(?:url\()?["']?(https?:)?\/\//gi)) problems.push(`remote @import: ${m[0].slice(0, 60)}`);
    if (/\bcdn\.(jsdelivr|cloudflare|tailwindcss)|unpkg\.com|cdnjs\.|fonts\.googleapis|code\.jquery/i.test(content))
      problems.push('references a remote CDN (prohibited: the replica must run offline from file://)');
  }
  if (ext === '.html') {
    if (/<script\b[^>]*\bsrc\s*=\s*["'][^"']*\b(jquery|bootstrap|tailwind|react|vue|angular)\b/i.test(content))
      problems.push('loads a prohibited framework or library');
    if (/\srequire\s*\(|\bimport\s+[\w{]/.test(content) && /<script\b(?![^>]*type=["']module)/i.test(content) === false)
      problems.push('module import without a module script; the replica must run from file:// without a build step');
  }
  if (ext === '.js' && /\brequire\s*\(['"][a-z@]/i.test(content)) problems.push('npm-style require() is prohibited');
  return problems;
}

/**
 * Write accepted files into the slot directory. Returns per-file results;
 * nothing outside `siteDir` is ever touched.
 */
export function applyFiles(siteDir, files, {state = {written: new Map(), bytes: 0}} = {}) {
  const results = [];
  for (const file of files) {
    const reason = rejectPath(file.path);
    if (reason) { results.push({path: file.path, ok: false, reason}); continue; }
    if (file.truncated) { results.push({path: file.path, ok: false, reason: 'block was cut off before its END FILE marker; resend this file complete'}); continue; }
    const problems = contentProblems(file.path, file.content);
    if (problems.length) { results.push({path: file.path, ok: false, reason: problems.join('; ')}); continue; }
    const bytes = Buffer.byteLength(file.content);
    const replacing = state.written.has(file.path);
    if (!replacing && state.written.size >= LIMITS.maxFiles) { results.push({path: file.path, ok: false, reason: `file count limit ${LIMITS.maxFiles} reached`}); continue; }
    const projected = state.bytes - (replacing ? state.written.get(file.path) : 0) + bytes;
    if (projected > LIMITS.maxTotalBytes) { results.push({path: file.path, ok: false, reason: 'site size limit reached'}); continue; }
    const target = inside(siteDir, file.path);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.writeFileSync(target, file.content.endsWith('\n') ? file.content : file.content + '\n');
    state.bytes = projected;
    state.written.set(file.path, bytes);
    results.push({path: file.path, ok: true, bytes, replaced: replacing});
  }
  return {results, state};
}

export const PROTOCOL_HELP = `Emit every file between sentinel lines, exactly like this:

=== FILE: index.html ===
<!doctype html>
...complete file contents...
=== END FILE ===

Rules for the protocol:
- One sentinel pair per file. Never nest them and never put two files in one block.
- Always write the file's COMPLETE contents. There is no patch or diff mode, and "..." or
  "unchanged" placeholders are rejected. Re-emitting a path replaces that file.
- Paths are relative to the site root and lowercase, except README.md, and limited to the site root or
  css/, js/, assets/ and data/. Allowed extensions: .html .css .js .svg .json .md .txt
- Markdown code fences inside a block are optional and are stripped if present.
- End every reply with one status line:
    === STATUS: CONTINUE ===   more files still to come, you will be asked to go on
    === STATUS: COMPLETE ===   the deliverable is finished
- If a reply would be cut off, stop at a file boundary, emit CONTINUE, and finish in the next reply.
- Prose outside the blocks is kept as your notes; keep it short.`;
