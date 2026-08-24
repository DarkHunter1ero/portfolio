/**
 * Anonymous analytics identifiers.
 *
 * - `visitorId`: random UUID v4 persisted in localStorage with a 1-year
 *   rolling expiry (re-extended on every read).
 * - `sessionId`: random UUID v4 stored in sessionStorage, so every browser
 *   tab is a fresh session.
 *
 * No personal data, no fingerprinting — both IDs are pure random UUIDs.
 * All storage access is wrapped in try/catch so private-browsing modes
 * (where localStorage/sessionStorage throw) never break tracking or UX;
 * in that case an in-memory id is used for the lifetime of the page.
 */

const VISITOR_KEY = "portfolio_analytics_visitor_id";
const VISITOR_EXPIRY_KEY = "portfolio_analytics_visitor_expiry";
const SESSION_KEY = "portfolio_analytics_session_id";

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

/** In-memory fallbacks for storage-restricted browsers. */
const memoryIds = new Map<string, string>();

/** Generates a UUID v4 via crypto.randomUUID when available. */
function randomUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  // Fallback: build a v4 UUID from crypto.getRandomValues (or Math.random
  // as a last resort) with the version/variant bits set manually.
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function readStorage(storage: Storage | null, key: string): string | null {
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage: Storage | null, key: string, value: string): void {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {
    // Storage full or blocked — keep the in-memory id instead.
  }
}

/**
 * Returns the persisted visitor id, creating (and re-expiring) it when
 * missing or expired. Returns null during SSR.
 */
export function getVisitorId(): string | null {
  if (typeof window === "undefined") return null;

  const memory = memoryIds.get(VISITOR_KEY);
  const existing = readStorage(window.localStorage, VISITOR_KEY);
  const expiryRaw = readStorage(window.localStorage, VISITOR_EXPIRY_KEY);
  const expiry = expiryRaw !== null ? Number(expiryRaw) : NaN;
  const now = Date.now();

  if (existing && Number.isFinite(expiry) && expiry > now) {
    // Rolling expiry: extend by a year on every read.
    try {
      window.localStorage.setItem(VISITOR_EXPIRY_KEY, String(now + ONE_YEAR_MS));
    } catch {
      // Ignore write failures — the id stays valid for this page load.
    }
    return existing;
  }

  // Missing or expired: mint a new id (1-year expiry from now).
  const id = memory ?? randomUUID();
  memoryIds.set(VISITOR_KEY, id);
  writeStorage(window.localStorage, VISITOR_KEY, id);
  writeStorage(window.localStorage, VISITOR_EXPIRY_KEY, String(now + ONE_YEAR_MS));
  return id;
}

/**
 * Returns the per-tab session id, creating one on first access.
 * Returns null during SSR.
 */
export function getSessionId(): string | null {
  if (typeof window === "undefined") return null;

  const memory = memoryIds.get(SESSION_KEY);
  const existing = readStorage(window.sessionStorage, SESSION_KEY);
  if (existing) return existing;
  if (memory) return memory;

  const id = randomUUID();
  memoryIds.set(SESSION_KEY, id);
  writeStorage(window.sessionStorage, SESSION_KEY, id);
  return id;
}
