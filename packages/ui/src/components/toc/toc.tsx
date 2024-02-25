"use client";

import clsx from "clsx";
import useHighlighted from "./hooks/useHighlighted";

// biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
export const Toc = ({ nodes }: { nodes: any[] }) => {
  if (!nodes?.length) {
    return null;
  }

  return <div className={"toc"}>{renderNodes(nodes)}</div>;
};

// biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
function renderNodes(nodes: any[]) {
  return (
    <ul className="list-none -indent-4 px-4">
      {nodes.map((node) => {
        return (
          <li key={node.data.hProperties.id}>
            {TOCLink({ node })}
            {node.children?.length > 0 && renderNodes(node.children)}
          </li>
        );
      })}
    </ul>
  );
}

const TOCLink = ({ node }: { node: any }) => {
  const id: string = node.data.hProperties.id;
  useHighlighted();
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(id);
        element &&
          element.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {node.value}
    </a>
  );
};
