// biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
export const Toc = ({ nodes }: { nodes: any[] }) => {
  if (!nodes?.length) {
    return null;
  }

  return (
    <div className={"toc"}>
      <h3 className="text-2xl font-semibold text-left text-basic my-6">
        Table of contents
      </h3>
      {renderNodes(nodes)}
    </div>
  );
};

// biome-ignore lint/suspicious/noExplicitAny: <As described https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents>
function renderNodes(nodes: any[]) {
  return (
    <ul className="list-none -indent-4">
      {nodes.map((node) => (
        <li key={node.data.hProperties.id}>
          <a href={`#${node.data.hProperties.id}`}>{node.value}</a>
          {node.children?.length > 0 && renderNodes(node.children)}
        </li>
      ))}
    </ul>
  );
}
