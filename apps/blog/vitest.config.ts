import codspeedPlugin from "@codspeed/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
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
  },
});
