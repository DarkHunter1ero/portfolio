/**
 * Unit tests for the analytics tracker (pure logic, no DOM).
 *
 * window/localStorage/sessionStorage/fetch are stubbed via vi.stubGlobal;
 * fake timers make the dedupe window deterministic. Each test re-imports the
 * module (vi.resetModules) so the module-level `recentSends` map starts empty.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/** In-memory Storage stub (enough of the Web Storage API for these tests). */
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

let fetchMock: ReturnType<typeof vi.fn>;

async function importTracker(): Promise<typeof import("./tracker")> {
  vi.resetModules();
  return import("./tracker");
}

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("tracker dedupe", () => {
  it("sends exactly ONE fetch for the same event+page twice within the window", async () => {
    vi.useFakeTimers();
    const localStorageStub = createStorageStub();
    const sessionStorageStub = createStorageStub();
    vi.stubGlobal("window", {
      location: { pathname: "/" },
      localStorage: localStorageStub,
      sessionStorage: sessionStorageStub,
    });

    const { track } = await importTracker();

    track("page_view", { page: "/about" });
    track("page_view", { page: "/about" });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // After the dedupe window expires, the same pair is sent again.
    vi.advanceTimersByTime(1500);
    track("page_view", { page: "/about" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("sends two fetches for two distinct events on the same page", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("window", {
      location: { pathname: "/" },
      localStorage: createStorageStub(),
      sessionStorage: createStorageStub(),
    });

    const { track } = await importTracker();

    track("page_view", { page: "/about" });
    track("project_view", { page: "/about", metadata: { slug: "foo" } });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe("tracker page stripping", () => {
  it("strips query string and fragment from the sent page", async () => {
    vi.stubGlobal("window", {
      location: { pathname: "/" },
      localStorage: createStorageStub(),
      sessionStorage: createStorageStub(),
    });

    const { track } = await importTracker();
    track("page_view", { page: "/projects/foo?utm=x#screenshots" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string) as { page: string };
    expect(body.page).toBe("/projects/foo");
  });

  it("strips query and fragment when the page comes from window.location.pathname", async () => {
    vi.stubGlobal("window", {
      // Even if a stubbed location leaks query/fragment into pathname, the
      // sent payload must stay clean. github_click has an optional `page`,
      // so the tracker falls back to window.location.pathname.
      location: { pathname: "/work?tab=dev#list" },
      localStorage: createStorageStub(),
      sessionStorage: createStorageStub(),
    });

    const { track } = await importTracker();
    track("github_click", {});

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string) as { page: string };
    expect(body.page).toBe("/work");
  });
});

describe("tracker failure handling", () => {
  it("does not throw or produce an unhandled rejection when fetch rejects", async () => {
    fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("window", {
      location: { pathname: "/" },
      localStorage: createStorageStub(),
      sessionStorage: createStorageStub(),
    });

    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown) => unhandled.push(reason);
    process.on("unhandledRejection", onUnhandled);
    try {
      const { track } = await importTracker();

      expect(() => track("page_view", { page: "/about" })).not.toThrow();

      // Flush microtasks/macrotasks so a rejection would have surfaced.
      await new Promise<void>((resolve) => setImmediate(resolve));
      expect(unhandled).toEqual([]);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    } finally {
      process.off("unhandledRejection", onUnhandled);
    }
  });
});
