"use client";

import { ReactNode } from "react";
import { Divider } from "../divider/divider";
import useHighlighted from "./hooks/useHighlighted";

export const Toc = ({
  nodes,
  githubLink,
  backToTopLink,
  //  biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
}: { nodes: any[]; githubLink?: ReactNode; backToTopLink: ReactNode }) => {
  if (!nodes?.length) {
    return null;
  }

  return (
    <div className="md:flex flex-col gap-2 sticky top-2 hidden md:visible">
      <div className={"toc"}>{renderNodes(nodes)}</div>
      <Divider />
      {githubLink && githubLink}
      {backToTopLink}
    </div>
  );
};

// biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
function renderNodes(nodes: any[]) {
  return (
    <ul className="list-none -indent-4 px-4">
      {nodes.map((node) => {
        return (
          <li key={node.data.hProperties.id}>
            {TOCLink({ node })}
            {node.children?.length > 0 &&
              node.depth < 3 &&
              renderNodes(node.children)}
          </li>
        );
      })}
    </ul>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
const TOCLink = ({ node }: { node: any }) => {
  const id: string = node.data.hProperties.id;
  useHighlighted();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <a href={`#${id}`}>{node.value}</a>
    </button>
  );
};
