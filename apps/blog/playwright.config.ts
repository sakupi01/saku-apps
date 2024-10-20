import { defineConfig } from "next/experimental/testmode/playwright.js";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: {
    command: "NODE_ENV='test' PORT=3001 bun run dev",
    url: "http://localhost:3001",
  },
});
