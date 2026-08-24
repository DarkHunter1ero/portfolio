import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Pure-logic tests only: window/localStorage/sessionStorage/fetch are
    // stubbed manually per test, so no DOM environment is needed.
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
