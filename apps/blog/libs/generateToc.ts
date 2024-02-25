import { remark } from "remark";
import generateHeadingTree from "@repo/headings-extractor";

export default async function generateToc(markdown: string) {
  const result = await remark().use(generateHeadingTree).process(markdown);
  const tree = result.data.headings;

  return tree.toString();
}
