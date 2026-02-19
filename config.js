// ============================================
// CONFIG - Paste your Supabase credentials here
// ============================================
const SUPABASE_URL = "https://fyfzokpnvxnnfxyweduw.supabase.co";      // e.g. https://abcdefghij.supabase.co
const SUPABASE_ANON_KEY = "sb_publishable_gGB2H7l5SB6vtEOiqtN5Fw_8QS5xsvj"; // your publishable key (sb_publishable_...)
// ============================================

const supaHeaders = {
  "apikey": SUPABASE_ANON_KEY,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

window.storage = {
  async get(key) {
    const res = await fetch(
      SUPABASE_URL + "/rest/v1/kv_store?key=eq." + encodeURIComponent(key) + "&select=key,value",
      { headers: supaHeaders }
    );
    const data = await res.json();
    if (!data || !data.length) throw new Error("Key not found: " + key);
    return { key: data[0].key, value: data[0].value };
  },

  async set(key, value) {
    const res = await fetch(
      SUPABASE_URL + "/rest/v1/kv_store",
      {
        method: "POST",
        headers: { ...supaHeaders, "Prefer": "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify({ key, value })
      }
    );
    const data = await res.json();
    if (!data || !data.length) return null;
    return { key: data[0].key, value: data[0].value };
  },

  async delete(key) {
    await fetch(
      SUPABASE_URL + "/rest/v1/kv_store?key=eq." + encodeURIComponent(key),
      { method: "DELETE", headers: supaHeaders }
    );
    return { key, deleted: true };
  },

  async list(prefix) {
    const url = prefix
      ? SUPABASE_URL + "/rest/v1/kv_store?key=like." + encodeURIComponent(prefix + "%") + "&select=key"
      : SUPABASE_URL + "/rest/v1/kv_store?select=key";
    const res = await fetch(url, { headers: supaHeaders });
    const data = await res.json();
    return { keys: (data || []).map(r => r.key) };
  }
};
