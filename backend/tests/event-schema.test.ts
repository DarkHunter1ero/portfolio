import { describe, expect, it } from "vitest";
import { analyticsEventSchema } from "../src/schemas/analytics";

const UUID = "123e4567-e89b-42d3-a456-426614174000";
const UUID2 = "123e4567-e89b-42d3-a456-426614174111";

function basePayload(overrides: Record<string, unknown> = {}) {
  return {
    event: "page_view",
    sessionId: UUID,
    visitorId: UUID2,
    page: "/",
    ...overrides,
  };
}

describe("analyticsEventSchema", () => {
  it("accepts a valid page_view payload", () => {
    const result = analyticsEventSchema.safeParse(basePayload());
    expect(result.success).toBe(true);
  });

  it("accepts all allowed event types with their metadata", () => {
    const cases: [string, Record<string, string> | undefined, string?][] = [
      ["page_view", undefined, "/"],
      ["project_view", { slug: "my-project" }, "/projects"],
      ["github_click", { source: "card", project: "repo-name" }],
      ["linkedin_click", { source: "footer" }],
      ["cv_download", { lang: "en" }],
      ["contact_submit", undefined],
    ];
    for (const [event, metadata, page] of cases) {
      const result = analyticsEventSchema.safeParse(
        basePayload({ event, metadata, page }),
      );
      expect(result.success, `event ${event} should parse`).toBe(true);
    }
  });

  it("rejects unknown event types", () => {
    const result = analyticsEventSchema.safeParse(
      basePayload({ event: "password_reset" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects invalid and non-v4 uuids", () => {
    expect(
      analyticsEventSchema.safeParse(basePayload({ sessionId: "not-a-uuid" }))
        .success,
    ).toBe(false);
    // v1-style uuid is rejected
    expect(
      analyticsEventSchema.safeParse(
        basePayload({ visitorId: "123e4567-e89b-12d3-a456-426614174000" })
      ).success,
    ).toBe(false);
  });

  it("rejects pages that do not start with '/'", () => {
    expect(
      analyticsEventSchema.safeParse(basePayload({ page: "home" })).success,
    ).toBe(false);
  });

  it("rejects pages longer than 180 characters", () => {
    const longPage = "/" + "a".repeat(181);
    expect(
      analyticsEventSchema.safeParse(basePayload({ page: longPage })).success,
    ).toBe(false);
  });

  it("rejects arbitrary junk in page paths", () => {
    expect(
      analyticsEventSchema.safeParse(basePayload({ page: "/<script>" }))
        .success,
    ).toBe(false);
  });

  it("strips query strings and fragments from pages", () => {
    const result = analyticsEventSchema.safeParse(
      basePayload({ event: "contact_submit", page: "/projects?tab=1#hero" }),
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe("/projects");
    }
  });

  it("requires page for page_view", () => {
    const { page: _page, ...rest } = basePayload();
    const result = analyticsEventSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("requires page for project_view", () => {
    const result = analyticsEventSchema.safeParse(
      basePayload({ event: "project_view", page: undefined }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects unknown metadata keys", () => {
    const result = analyticsEventSchema.safeParse(
      basePayload({
        event: "github_click",
        page: undefined,
        metadata: { source: "card", evil: "value" },
      }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects metadata values containing HTML/scripts", () => {
    const result = analyticsEventSchema.safeParse(
      basePayload({
        event: "project_view",
        metadata: { slug: "<script>alert(1)</script>" },
      }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects more than 5 metadata keys", () => {
    const result = analyticsEventSchema.safeParse(
      basePayload({
        event: "github_click",
        metadata: { a: "1", b: "2", c: "3", d: "4", e: "5", f: "6" },
      }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects metadata values longer than 100 characters", () => {
    const result = analyticsEventSchema.safeParse(
      basePayload({
        event: "cv_download",
        metadata: { lang: "a".repeat(101) },
      }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects unknown top-level keys (strict mode)", () => {
    const result = analyticsEventSchema.safeParse(
      basePayload({ ip: "1.2.3.4", ip_hash: "client-side-hash" }),
    );
    expect(result.success).toBe(false);
  });
});
