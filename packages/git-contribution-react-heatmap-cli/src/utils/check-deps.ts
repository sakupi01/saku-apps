import fs from "node:fs";
import path from "node:path";
import { join } from "node:path";
/*
 * Check if tailwindcss is there checking if tailwind.config.ts|js exists
 */
export const checkTailwindCSS = async () => {
  const path2Config = join(process.cwd(), "tailwind.config");
  const exists = fs.existsSync(`${path2Config}.${"ts" || "js"}`);
  return exists;
};
