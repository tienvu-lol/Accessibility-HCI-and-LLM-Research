// Shared hosted-provider keys and a separate key for each configured self-hosted arm.
const PROVIDERS = ['openai', 'anthropic', 'gemini'];

// Memory only: never written to disk, logged or returned except {set,last4,source}.
function create(env = process.env, openArms = {}) {
  const armSlots = new Map(Object.keys(openArms).map((arm) => [arm, arm.toLowerCase()]));
  const envNames = new Map(PROVIDERS.map((p) => [p, `${p.toUpperCase()}_API_KEY`]));
  for (const [arm, slot] of armSlots) envNames.set(slot, openArms[arm].api_key_env || `${arm}_API_KEY`);
  const store = new Map();
  for (const [slot, name] of envNames) if (env[name]) store.set(slot, { key: env[name], source: 'env' });
  return {
    armSlot: (arm) => armSlots.get(arm) || null,
    has: (slot) => envNames.has(slot),
    set(slot, key) { store.set(slot, { key, source: 'ui' }); },
    delete(slot) { store.delete(slot); },
    get(slot) { return store.get(slot)?.key || null; },
    id(slot) { const e = store.get(slot); return e ? `${slot}:${e.key.slice(-4)}` : null; },
    envName: (slot) => envNames.get(slot) || null,
    status() {
      return Object.fromEntries([...envNames.keys()].map((slot) => {
        const e = store.get(slot);
        return [slot, e ? { set: true, last4: e.key.slice(-4), source: e.source } : { set: false, last4: null, source: null }];
      }));
    },
  };
}

module.exports = { create, PROVIDERS };
