/**
 * Client-safe API helpers. This is the ONLY thing pages/components should
 * use to talk to the backend now -- everything here calls this site's own
 * /api/* routes (same origin, HTTPS in production) instead of importing
 * server-only modules directly into the client bundle.
 *
 * Every function preserves the "resolve to `false` on any failure" contract
 * the old direct-import functions had, so call sites that check
 * `if (response === false)` keep working unchanged.
 */

async function safeGet(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return false;
    return await res.json();
  } catch (err) {
    return false;
  }
}

async function safeSend(path, method, body) {
  try {
    const res = await fetch(path, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body || {}),
    });
    if (!res.ok) return false;
    return await res.json();
  } catch (err) {
    return false;
  }
}

// --- generic reads (drop-in replacements for the old getData/getPrice/
// getReciept -- same `(subPath) => Promise<data|false>` shape, so they can
// still be passed directly as an SWR fetcher). ---

export async function getData(subPath) {
  return safeGet(`/api/get/getData?path=${encodeURIComponent(subPath || "")}`);
}

export async function getPrice(subPath) {
  return safeGet(`/api/get/getPrice?path=${encodeURIComponent(subPath || "")}`);
}

export async function getReciept(subPath) {
  return safeGet(`/api/get/getReciept?path=${encodeURIComponent(subPath || "")}`);
}

// --- balance / contract checks ---

export async function getBalInEth_(address, _mode) {
  // `_mode` ("latest" | "safe") is accepted for call-site compatibility --
  // the underlying endpoint only ever took an address, same as before this
  // restructure; this parameter was already unused pre-restructure.
  return safeGet(`/api/get/getBalInEth?address=${encodeURIComponent(address || "")}`);
}

export async function isContract(address) {
  return safeGet(`/api/get/isContract?address=${encodeURIComponent(address || "")}`);
}

// --- dashboard CRUD ---

export async function createDashboard(data) {
  return safeSend("/api/post/dashboard", "POST", data);
}

export async function updateDashboard(data) {
  return safeSend("/api/post/dashboard", "PUT", data);
}

export async function withdrawDashboard(id) {
  return safeSend("/api/post/dashboard", "PATCH", { id });
}

export async function deleteDashboard(id) {
  try {
    const res = await fetch(`/api/post/dashboard?id=${encodeURIComponent(id || "")}`, {
      method: "DELETE",
    });
    if (!res.ok) return false;
    return await res.json();
  } catch (err) {
    return false;
  }
}

// --- asset / profile / treasury / order / mnemonic ---

export async function createAsset(data) {
  return safeSend("/api/post/asset", "POST", data);
}

export async function createProfile(data) {
  return safeSend("/api/post/profile", "POST", data);
}

export async function createTreasury(data) {
  return safeSend("/api/post/treasury", "POST", data);
}

export async function createOrder(data) {
  return safeSend("/api/post/order", "POST", data);
}

export async function updateOrder(data) {
  return safeSend("/api/post/order", "PUT", data);
}

export async function genAddress(data) {
  return safeSend("/api/post/mnemonic", "POST", data);
}
