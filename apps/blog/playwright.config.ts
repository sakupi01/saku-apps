import { defineConfig } from "next/experimental/testmode/playwright";

export default defineConfig({
  testDir: "test/e2e",
  webServer: {
    command: "NODE_ENV='test' bun run dev -- --experimental-test-proxy",
    url: "http://localhost:3000",
  },
});
