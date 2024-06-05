import fs from "node:fs";
import path from "node:path";
import type { RegistryWithContent } from "./registry/schema";
export function createComponent(dir: string, item: RegistryWithContent) {
  const directory = path.join(process.cwd(), `${dir}/components/${item.name}`);

  const componentFileName = `${item.name}.tsx`;
  const styleFileName = `${item.name}.module.css`;

  const componentFilePath = path.join(directory, componentFileName);
  const styleFilePath = path.join(directory, styleFileName);

  fs.mkdirSync(directory, { recursive: true });

  fs.writeFileSync(componentFilePath, item.componentContent, {
    encoding: "utf-8",
  });
  fs.writeFileSync(styleFilePath, item.styleContent, {
    encoding: "utf-8",
  });
}
