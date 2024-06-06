import fs from "node:fs";
import path from "node:path";
import { join } from "node:path";
/*
 * Check if the required dependencies are installed in the given project's package.json
 * Dynamic require of
 */
export const checkTailwindCSS = async () => {
  const path = join(process.cwd(), "package.json");
  const data = fs.readFileSync(path, "utf8");
  const packageJson = JSON.parse(data);
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  return devDependencies.includes("tailwindcss");
};
