"use client";

import { Logs } from "lucide-react";
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
    <div
      className="hidden md:block w-[60px] h-[60px] fixed left-8 
    transition-all ease-out duration-[0.5s]
    origin-top-left
    has-[:hover]:w-[250px] has-[:hover]:h-[85vh]
    [&>.menu]:has-[:hover]:visible [&>.menu]:has-[:hover]:opacity-100 
    [&>.menu]:has-[:hover]:delay-[0.4s]
     [&>.menu-icon]:has-[:hover]:text-blossom 
     rounded-full border border-neutral-200 shadow-sm"
    >
      <div
        className="menu-icon p-2 md:p-3 rounded-full transition-all duration-[0.3s] ease-in-out 
      flex items-center justify-center"
      >
        <Logs className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
      </div>
      <div className="menu p-4 max-w-[250px] md:flex flex-col gap-2 sticky top-2 hidden opacity-0">
        <div className={"toc"}>{renderNodes(nodes)}</div>
        <Divider />
        {githubLink && githubLink}
        {backToTopLink}
      </div>
    </div>
  );
};

// biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
function renderNodes(nodes: any[]) {
  return (
    <ul className="list-none pl-2">
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
