// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />
// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

import { h } from "hastscript";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import remarkDirective from "remark-directive";
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
    .use(rehypePrettyCode, {
      theme: "rose-pine-dawn",
      keepBackground: true,
      defaultLang: "plaintext",
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
// This plugin is an example to turn `::note` into divs, passing arbitrary
// attributes.
function myRemarkPlugin() {
  /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name === "node") {
          const data = node.data || (node.data = {});
          const tagName = node.type === "textDirective" ? "span" : "div";

          data.hName = tagName;
          data.hProperties = h(tagName, node.attributes || {}).properties;
        } else {
          const title = node.children[0];
          const content = node.children.slice(1);
          console.log(title, content);

          const data = node.data || (node.data = {});
          data.hName = "details";
          data.hProperties = h("details", node.attributes || {}).properties;
          // data.hChildren = h("summary", title).properties;
          // data.hChildren = h("div", content).properties;
        }
      }
    });
  };
}
//           <details open>
//   <summary>Hello</summary>
//   World!
// </details>
