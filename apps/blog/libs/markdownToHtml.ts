import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkRehype)
    .use(remarkGfm)
    .use(remarkToc, {
      heading: "目次",
      ordered: true,
      tight: false,
      maxDepth: 3,
    })
    .use(rehypePrettyCode, {
      theme: "rose-pine-dawn",
      keepBackground: true,
      defaultLang: "plaintext",
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
