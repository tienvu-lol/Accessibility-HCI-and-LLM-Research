// Filesystem layer under DATA_DIR: validated uploads, atomic writes, iteration lookups.
const fs = require('fs');
const path = require('path');
const { HttpError } = require('./http');
const csv = require('./csv');

const EXT = new Set(['.html', '.css', '.json', '.js', '.svg', '.txt']);
const MAX_FILE = 5 * 1024 * 1024;
const MAX_TOTAL = 50 * 1024 * 1024;
const SEGMENT = /^[A-Za-z0-9._-]+$/;

// Decodes and validates an upload map; every path must sit under `prefix` (e.g. "runs/A1/wcag/UNI-01/").
function validateFiles(files, prefix) {
  if (!files || typeof files !== 'object' || Array.isArray(files)) throw new HttpError(400, 'files must be an object');
  const out = [];
  let total = 0;
  for (const [rel, f] of Object.entries(files)) {
    const parts = rel.split('/');
    if (!rel.startsWith(prefix) || parts.some((s) => s === '..' || s === '.' || !SEGMENT.test(s))) {
      throw new HttpError(400, `bad path: ${rel.slice(0, 120)}`);
    }
    if (!EXT.has(path.extname(rel).toLowerCase())) throw new HttpError(400, `bad extension: ${rel}`);
    if (!f || (f.enc !== 'utf8' && f.enc !== 'base64') || typeof f.data !== 'string') throw new HttpError(400, `bad file entry: ${rel}`);
    const buf = Buffer.from(f.data, f.enc);
    if (buf.length > MAX_FILE) throw new HttpError(413, `file too large: ${rel}`);
    total += buf.length;
    if (total > MAX_TOTAL) throw new HttpError(413, 'upload too large');
    out.push({ rel, buf });
  }
  return out;
}

function create(dataDir) {
  const abs = (rel) => path.join(dataDir, ...rel.split('/'));
  const readText = (rel) => { try { return fs.readFileSync(abs(rel), 'utf8'); } catch { return null; } };
  const readJson = (rel) => { try { return JSON.parse(readText(rel)); } catch { return null; } };

  // iteration numbers present in a cell directory, ascending
  function iterations(arm, cond, site) {
    try {
      return fs.readdirSync(abs(`runs/${arm}/${cond}/${site}`))
        .map((d) => /^iter(\d+)$/.exec(d)).filter(Boolean).map((m) => Number(m[1])).sort((a, b) => a - b);
    } catch { return []; }
  }

  // text files of one iteration (relative path -> content), minus run bookkeeping
  function iterFiles(arm, cond, site, n) {
    const root = abs(`runs/${arm}/${cond}/${site}/iter${n}`);
    const out = {};
    (function walk(dir, rel) {
      let entries = [];
      try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        const r = rel ? `${rel}/${e.name}` : e.name;
        if (e.isDirectory()) walk(path.join(dir, e.name), r);
        else if (EXT.has(path.extname(e.name).toLowerCase()) && r !== 'status.json' && r !== 'response.json') {
          out[r] = fs.readFileSync(path.join(dir, e.name), 'utf8');
        }
      }
    })(root, '');
    return out;
  }

  return {
    abs, readText, readJson, iterations, iterFiles,
    writeFiles(entries) { for (const { rel, buf } of entries) csv.writeAtomic(abs(rel), buf); },
    // set a file aside under a new name; missing file is not an error
    renameIfExists(rel, to) {
      try { fs.renameSync(abs(rel), abs(to)); return true; } catch { return false; }
    },
    appendLine(rel, obj) {
      fs.mkdirSync(path.dirname(abs(rel)), { recursive: true });
      fs.appendFileSync(abs(rel), JSON.stringify(obj) + '\n');
    },
    readJsonl(rel) {
      return (readText(rel) || '').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
    },
    lastStatus(arm, cond, site) {
      const its = iterations(arm, cond, site);
      for (let i = its.length - 1; i >= 0; i--) {
        const st = readJson(`runs/${arm}/${cond}/${site}/iter${its[i]}/status.json`);
        if (st) return { n: its[i], st };
      }
      return null;
    },
  };
}

module.exports = { create, validateFiles, MAX_FILE, MAX_TOTAL };
