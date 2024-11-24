import path from "node:path";
import codspeedPlugin from "@codspeed/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
    exclude: ["./tests/**/*.bench.ts", "./tests/**/*.test.ts"],
    env: {
      ZENN_URL: "https://zenn.dev/api/articles",
      ZENN_BASE_URL: "https://zenn.dev/s_a_k_u",
    },
    benchmark: {
      include: ["**/*.bench.(js|ts)"],
    },
    coverage: {
      include: ["**/*.ts"],
      exclude: [
        "**/*.test.ts",
        "**/*.bench.ts",
        "**/*.config.ts",
        "**/*.d.ts",
        "**/__mocks__/**",
        "**/*.xml",
        "**/.next/**",
        "**/robots.ts",
        "**/sitemap.ts",
      ],
      reporter: ["text", "json", "html"],
    },
    setupFiles: ["./setup.vitest.ts"],
  },
});
