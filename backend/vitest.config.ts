import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts"],
    // Fail the whole run if someone commits .only() — guards CI against
    // accidentally running a subset of the suite.
    forbidOnly: true,
  },
});
