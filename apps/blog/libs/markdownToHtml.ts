// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />
// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

import remarkEmbedder from "@remark-embedder/core";
import oembedTransformer from "@remark-embedder/transformer-oembed";
import { h } from "hastscript";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import rlc from "remark-link-card";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import { visit } from "unist-util-visit";
import collapse from "remark-collapse";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    // @ts-expect-error
    .use(remarkEmbedder, {
      transformers: [CodeSandboxTransformer, oembedTransformer],
    })
    .use(rlc)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(myRemarkPlugin)
    .use(remarkToc, {
      heading: "目次",
      ordered: true,
      tight: false,
      maxDepth: 3,
    })
    .use(collapse, {
      test: "目次",
      summary: (str: string) => str,
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-light",
      keepBackground: true,
      defaultLang: "plaintext",
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}

const CodeSandboxTransformer = {
  name: "CodeSandbox",
  // shouldTransform can also be async
  shouldTransform(url: string) {
    const { host, pathname } = new URL(url);

    return (
      ["codesandbox.io", "www.codesandbox.io"].includes(host) &&
      pathname.includes("/s/")
    );
  },
  // getHTML can also be async
  getHTML(url: string) {
    const iframeUrl = url.replace("/s/", "/embed/");

    return `<iframe title='codesandbox' src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
  },
};

const myRemarkPlugin = () => {
  /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  // @ts-expect-error
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
          const tagName = "details";
          data.hName = tagName;
          data.hProperties = h(tagName, node.attributes || {}).properties;
        }
      }
    });
  };
};
