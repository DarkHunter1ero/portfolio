/**
 * Unit tests for analytics session identifiers (pure logic, no DOM).
 *
 * window/localStorage/sessionStorage are stubbed via vi.stubGlobal. Each test
 * re-imports the module (vi.resetModules) so the module-level `memoryIds`
 * map starts empty.
 */

import { afterEach, describe, expect, it, vi } from "vitest";

const VISITOR_KEY = "portfolio_analytics_visitor_id";
const VISITOR_EXPIRY_KEY = "portfolio_analytics_visitor_expiry";
const SESSION_KEY = "portfolio_analytics_session_id";

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function createStorageStub(initial: Record<string, string> = {}): Storage {
  const store = new Map<string, string>(Object.entries(initial));
  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
  };
}

/** crypto stub WITHOUT randomUUID — forces the v4 fallback path. */
const cryptoWithoutRandomUUID = {
  getRandomValues: (arr: Uint8Array): Uint8Array => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  },
};

async function importSession(): Promise<typeof import("./session")> {
  vi.resetModules();
  return import("./session");
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("session UUID fallback", () => {
  it("mints a UUID v4 when crypto.randomUUID is unavailable (getRandomValues path)", async () => {
    vi.stubGlobal("crypto", cryptoWithoutRandomUUID);
    const localStorageStub = createStorageStub();
    const sessionStorageStub = createStorageStub();
    vi.stubGlobal("window", {
      location: { pathname: "/" },
      localStorage: localStorageStub,
      sessionStorage: sessionStorageStub,
    });

    const { getVisitorId, getSessionId } = await importSession();

    // The backend rejects non-v4 UUIDs — this is the wire contract.
    expect(getVisitorId()).toMatch(UUID_V4_REGEX);
    expect(getSessionId()).toMatch(UUID_V4_REGEX);

    // The minted ids must actually be persisted.
    expect(localStorageStub.getItem(VISITOR_KEY)).toMatch(UUID_V4_REGEX);
    expect(sessionStorageStub.getItem(SESSION_KEY)).toMatch(UUID_V4_REGEX);
  });

  it("mints a UUID v4 when crypto is entirely unavailable (Math.random path)", async () => {
    vi.stubGlobal("crypto", undefined);
    vi.stubGlobal("window", {
      location: { pathname: "/" },
      localStorage: createStorageStub(),
      sessionStorage: createStorageStub(),
    });

    const { getVisitorId, getSessionId } = await importSession();

    expect(getVisitorId()).toMatch(UUID_V4_REGEX);
    expect(getSessionId()).toMatch(UUID_V4_REGEX);
  });
});

describe("session persistence", () => {
  it("reads the visitorId from localStorage instead of minting a new one", async () => {
    const existingVisitorId = "11111111-2222-4333-8444-555555555555";
    const localStorageStub = createStorageStub({
      [VISITOR_KEY]: existingVisitorId,
      [VISITOR_EXPIRY_KEY]: String(Date.now() + 60_000),
    });
    vi.stubGlobal("window", {
      location: { pathname: "/" },
      localStorage: localStorageStub,
      sessionStorage: createStorageStub(),
    });

    const { getVisitorId } = await importSession();

    expect(getVisitorId()).toBe(existingVisitorId);
    // The stored id must not have been replaced.
    expect(localStorageStub.getItem(VISITOR_KEY)).toBe(existingVisitorId);
  });

  it("reads the sessionId from sessionStorage instead of minting a new one", async () => {
    const existingSessionId = "aaaaaaa1-bbbb-4ccc-8ddd-eeeeeeeeeeee";
    const sessionStorageStub = createStorageStub({
      [SESSION_KEY]: existingSessionId,
    });
    vi.stubGlobal("window", {
      location: { pathname: "/" },
      localStorage: createStorageStub(),
      sessionStorage: sessionStorageStub,
    });

    const { getSessionId } = await importSession();

    expect(getSessionId()).toBe(existingSessionId);
    expect(sessionStorageStub.getItem(SESSION_KEY)).toBe(existingSessionId);
  });
});
