// Builds one self-contained rater HTML per rater from human_items.csv + blinding_key.csv.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const HEADER = ['site_id', 'arm', 'question', 'rater_id', 'verdict', 'note', 'shown_left', 'shown_right', 'ts'];
const QUESTIONS = 14;

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((x) => x !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), r[i]])));
}

// Deterministic PRNG: sha256 of the seed string, re-hashed per draw.
function rng(seed) {
  let n = 0;
  return () => crypto.createHash('sha256').update(`${seed}|${n++}`).digest().readUInt32BE(0) / 2 ** 32;
}

function shuffle(arr, rand) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function plan(items, key, raterId, seed) {
  const rand = rng(`${seed}|${raterId}`);
  const labelOf = (it, cond) => {
    const r = key.find((k) => k.site_id === it.site_id && k.arm === it.arm && k.condition === cond);
    if (!r) throw new Error(`blinding key missing ${it.site_id} ${it.arm} ${cond}`);
    return r.label_shown;
  };
  return shuffle(items, rand).map((it) => {
    const flip = rand() < 0.5;
    const [left, right] = flip ? ['both', 'wcag'] : ['wcag', 'both'];
    const src = (cond) => `../variants/${it.site_id}/${it.arm}/${labelOf(it, cond)}/`;
    return {
      site_id: it.site_id, arm: it.arm, shown_left: left, shown_right: right,
      pages: ['index.html', it.form_page], left_src: src(left), right_src: src(right),
    };
  });
}

function page(raterId, order) {
  // Condition names live only in this base64 blob, decoded at runtime for the CSV export.
  const blob = Buffer.from(JSON.stringify(order)).toString('base64');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Rater ${raterId}</title>
<style>
body{font:14px sans-serif;margin:0;padding:8px}
.frames{display:flex;gap:8px}.frames div{flex:1}
iframe{width:100%;height:55vh;border:1px solid #888}
.q{margin:4px 0}.q input[type=text]{width:40%}
</style></head><body>
<h1>Rater ${raterId} <small id="progress"></small></h1>
<div>Page: <button id="pg0">index</button> <button id="pg1">form page</button></div>
<div class="frames"><div><h2>A</h2><iframe id="fa"></iframe></div><div><h2>B</h2><iframe id="fb"></iframe></div></div>
<div id="qs"></div>
<button id="next">Next</button> <button id="export">Export CSV</button>
<script>
var RATER=${JSON.stringify(raterId)}, KEY='harness_'+RATER;
var HEADER=${JSON.stringify(HEADER)}, QN=${QUESTIONS};
var ORDER=JSON.parse(atob(${JSON.stringify(blob)}));
var state=JSON.parse(localStorage.getItem(KEY)||'{"i":0,"ans":{}}');
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function show(p){var it=ORDER[state.i];document.getElementById('fa').src=it.left_src+it.pages[p];document.getElementById('fb').src=it.right_src+it.pages[p];}
function render(){
  var it=ORDER[state.i];
  document.getElementById('progress').textContent='item '+(state.i+1)+' / '+ORDER.length;
  var h='';
  for(var q=1;q<=QN;q++){var a=state.ans[state.i+':'+q]||{};
    h+='<div class="q">Q'+q+' '+['A','B','Tie'].map(function(v){return '<label><input type="radio" name="q'+q+'" value="'+v+'"'+(a.v===v?' checked':'')+'> '+v+'</label>';}).join(' ')+
      ' <input type="text" id="n'+q+'" placeholder="note (optional)" value="'+(a.n||'').replace(/"/g,'&quot;')+'"></div>';}
  document.getElementById('qs').innerHTML=h;
  show(0);
}
function collect(){
  for(var q=1;q<=QN;q++){var c=document.querySelector('input[name=q'+q+']:checked');
    var k=state.i+':'+q,prev=state.ans[k]||{};
    var v=c?c.value:undefined,n=document.getElementById('n'+q).value;
    if(v!==prev.v||n!==(prev.n||''))state.ans[k]=v?{v:v,n:n,ts:new Date().toISOString()}:prev;}
  save();
}
function csvCell(s){s=String(s==null?'':s);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}
function exportCsv(){
  collect();
  var rows=[HEADER.join(',')];
  ORDER.forEach(function(it,i){for(var q=1;q<=QN;q++){var a=state.ans[i+':'+q];if(!a)continue;
    var verdict=a.v==='Tie'?'tie':(a.v==='A'?it.shown_left:it.shown_right);
    rows.push([it.site_id,it.arm,'Q'+q,RATER,verdict,a.n,it.shown_left,it.shown_right,a.ts].map(csvCell).join(','));}});
  var link=document.createElement('a');
  link.href=URL.createObjectURL(new Blob([rows.join('\n')+'\n'],{type:'text/csv'}));
  link.download='human_ratings_'+RATER+'.csv';link.click();
}
document.getElementById('pg0').onclick=function(){show(0);};
document.getElementById('pg1').onclick=function(){show(1);};
document.getElementById('next').onclick=function(){collect();if(state.i<ORDER.length-1){state.i++;save();render();}};
document.getElementById('export').onclick=exportCsv;
render();
</script></body></html>
`;
}

function buildHarness({ itemsCsv, keyCsv, outDir, raters = ['R1', 'R2', 'R3'] } = {}) {
  const root = path.join(__dirname, '..');
  itemsCsv = itemsCsv || path.join(root, 'sample', 'human_items.csv');
  keyCsv = keyCsv || path.join(root, 'blinding_key.csv');
  outDir = outDir || path.join(__dirname, 'harness');
  const items = parseCsv(fs.readFileSync(itemsCsv, 'utf8'));
  const key = parseCsv(fs.readFileSync(keyCsv, 'utf8'));
  const seed = items[0].seed;
  fs.mkdirSync(outDir, { recursive: true });
  const plans = {};
  for (const r of raters) {
    plans[r] = plan(items, key, r, seed);
    fs.writeFileSync(path.join(outDir, `rater_${r}.html`), page(r, plans[r]));
  }
  // Sidecar records each rater's item order and left/right assignment.
  fs.writeFileSync(path.join(outDir, 'randomization.json'), JSON.stringify(plans, null, 2));
  return plans;
}

if (require.main === module) {
  const [itemsCsv, keyCsv, outDir] = process.argv.slice(2);
  buildHarness({ itemsCsv, keyCsv, outDir });
}

module.exports = { buildHarness, HEADER };
