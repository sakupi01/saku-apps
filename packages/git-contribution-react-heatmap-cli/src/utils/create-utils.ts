import fs from "node:fs";
import path from "node:path";
import type { UtilsFiles } from "./registry/schema";
export function createUtils(dir: string, utils: UtilsFiles) {
  const constantsDir = path.join(process.cwd(), `${dir}/constants`);
  const typesDir = path.join(process.cwd(), `${dir}/types`);

  const variablesFileName = "variables.ts";
  const enumsFileName = "enums.ts";
  const typesFileName = "index.ts";

  const variablesFileNamePath = path.join(constantsDir, variablesFileName);
  const enumsFileNamePath = path.join(typesDir, enumsFileName);
  const typesFileNamePath = path.join(typesDir, typesFileName);

  fs.mkdirSync(constantsDir, { recursive: true });
  fs.mkdirSync(typesDir, { recursive: true });

  fs.writeFileSync(variablesFileNamePath, utils.variablesContent, {
    encoding: "utf-8",
  });
  fs.writeFileSync(enumsFileNamePath, utils.enumsContent, {
    encoding: "utf-8",
  });
  fs.writeFileSync(typesFileNamePath, utils.typesContent, {
    encoding: "utf-8",
  });
}
