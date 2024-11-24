import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./apps/me/vite.config.ts",
  "./apps/git-app/vite.config.ts",
  "./apps/blog/vitest.config.ts",
]);
