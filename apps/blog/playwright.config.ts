import { defineConfig } from "next/experimental/testmode/playwright";

export default defineConfig({
  testDir: "test/e2e",
  webServer: {
    command:
      "NODE_ENV='test' PORT=3001 bun run dev -- --experimental-test-proxy",
    url: "http://localhost:3001",
  },
});
