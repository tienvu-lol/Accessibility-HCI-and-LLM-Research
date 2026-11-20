const crypto = require('crypto');
const { parseCookies } = require('./http');

const sha = (s) => crypto.createHash('sha256').update(String(s)).digest();
const safeEqual = (a, b) => crypto.timingSafeEqual(sha(a), sha(b));
const MAX_AGE_S = 7 * 24 * 3600;

function create({ password, workerToken, now = Date.now }) {
  // Derived from the password so sessions survive restarts; random when auth is off.
  const secret = password ? sha('sid:' + password) : crypto.randomBytes(32);
  const sign = (v) => crypto.createHmac('sha256', secret).update(v).digest('base64url');
  const fails = new Map(); // ip -> failure timestamps

  const clientIp = (req) => {
    const xff = (req.headers['x-forwarded-for'] || '').split(',').pop().trim(); // last hop = our proxy's view
    return xff || req.socket.remoteAddress || '?';
  };
  const recent = (ip) => {
    const t = (fails.get(ip) || []).filter((x) => now() - x < 60000);
    fails.set(ip, t);
    return t;
  };

  return {
    secret,
    enabled: !!password,
    isAuthed(req) {
      if (!password) return true;
      const sid = parseCookies(req).sid || '';
      const [exp, sig] = sid.split('.');
      return !!sig && Number(exp) > now() && safeEqual(sig, sign(exp));
    },
    isWorker(req) {
      const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
      return !!workerToken && !!m && safeEqual(m[1], workerToken);
    },
    // -> {ok, limited, cookie}
    login(req, given) {
      const ip = clientIp(req);
      if (recent(ip).length >= 5) return { ok: false, limited: true };
      if (!password || typeof given !== 'string' || !safeEqual(given, password)) {
        recent(ip).push(now());
        return { ok: false, limited: false };
      }
      const exp = String(now() + MAX_AGE_S * 1000);
      const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
      return { ok: true, cookie: `sid=${exp}.${sign(exp)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${MAX_AGE_S}${secure}` };
    },
    logoutCookie: 'sid=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0',
  };
}

module.exports = { create };
