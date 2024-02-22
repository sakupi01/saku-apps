// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />
// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import { visit } from "unist-util-visit";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkDirective)
    .use(myRemarkPlugin)
    .use(remarkToc, {
      heading: "目次",
      ordered: true,
      tight: false,
      maxDepth: 3,
    })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "rose-pine-dawn",
      keepBackground: true,
      defaultLang: "plaintext",
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

function myRemarkPlugin() {
  /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  //@ts-ignore
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name === "note") {
          // biome-ignore lint/suspicious/noAssignInExpressions: <As described https://github.com/remarkjs/remark-directive?tab=readme-ov-file#use>
          const data = node.data || (node.data = {});
          const tagName = node.type === "textDirective" ? "span" : "div";

          data.hName = tagName;
          data.hProperties = h(tagName, node.attributes || {}).properties;
        } else {
          // biome-ignore lint/suspicious/noAssignInExpressions: <As described https://github.com/remarkjs/remark-directive?tab=readme-ov-file#use>
          const data = node.data || (node.data = {});
          data.hName = "details";
          data.hProperties = h("details", node.attributes || {}).properties;
        }
      }
    });
  };
}
