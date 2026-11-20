// Server-sent events: pushes `state` on change (debounced) and every 3 s.
function create(getSnapshot) {
  const clients = new Set();
  let last = '';
  let timer = null;

  function send(force) {
    if (clients.size === 0) return;
    const snap = getSnapshot();
    const stable = JSON.stringify({ ...snap, now: 0 });
    if (!force && stable === last) return;
    last = stable;
    const body = JSON.stringify(snap);
    for (const res of clients) res.write(`event: state\ndata: ${body}\n\n`);
  }
  const beat = setInterval(() => send(true), 3000);
  beat.unref();

  return {
    add(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive' });
      clients.add(res);
      req.on('close', () => clients.delete(res));
      res.write(`event: state\ndata: ${JSON.stringify(getSnapshot())}\n\n`);
    },
    notify() {
      if (timer) return;
      timer = setTimeout(() => { timer = null; send(false); }, 150);
      timer.unref();
    },
    close() {
      clearInterval(beat);
      for (const res of clients) res.end();
      clients.clear();
    },
  };
}

module.exports = { create };
