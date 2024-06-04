import fs from "node:fs";
import path from "node:path";
export function createComponent(
  directory: string,
  item: { name: string; content: string },
) {
  const fileName = `${item.name}.tsx`;
  const filePath = path.join(directory, fileName);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filePath, item.content, { encoding: "utf-8" });
  console.log(`Component ${item.name} is generated under ${directory}`);
}
