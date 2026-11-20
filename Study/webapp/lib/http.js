const fs = require('fs');
const path = require('path');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.csv': 'text/csv; charset=utf-8',
};

class HttpError extends Error {
  constructor(status, message, extra) { super(message); this.status = status; this.extra = extra; }
}

function json(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}

// Resolves to the utf8 body; rejects with 413 past maxBytes.
function readBody(req, maxBytes = 1 << 20) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let n = 0;
    req.on('data', (c) => {
      n += c.length;
      if (n > maxBytes) { reject(new HttpError(413, 'body too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function readJson(req, maxBytes) {
  const text = await readBody(req, maxBytes);
  if (!text) return {};
  try {
    const v = JSON.parse(text);
    if (v === null || typeof v !== 'object') throw new Error('not an object');
    return v;
  } catch { throw new HttpError(400, 'invalid JSON'); }
}

// Joins untrusted segments under base; null when anything escapes it.
function safeJoin(base, segments) {
  for (const s of segments) if (!s || s === '.' || s === '..' || /[\/\0:]/.test(s)) return null;
  const full = path.join(base, ...segments);
  return full.startsWith(base + path.sep) ? full : null;
}

// Streams a file; false (nothing written) when missing. opts: {csp, type, cache}
function sendFile(res, file, opts = {}) {
  let st;
  try { st = fs.statSync(file); } catch { return false; }
  if (!st.isFile()) return false;
  const headers = {
    'Content-Type': opts.type || TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Content-Length': st.size,
    'Cache-Control': opts.cache || 'no-cache',
    'X-Content-Type-Options': 'nosniff',
  };
  if (opts.csp) headers['Content-Security-Policy'] = opts.csp;
  res.writeHead(200, headers);
  fs.createReadStream(file).pipe(res);
  return true;
}

function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

module.exports = { HttpError, json, readBody, readJson, safeJoin, sendFile, parseCookies };
