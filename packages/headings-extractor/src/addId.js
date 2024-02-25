/*
 * Add an "id" attribute to the heading elements based on their content
 */
export default function addID(node, nodes) {
  const id = node.children.map((c) => c.value).join("");
  nodes[id] = (nodes[id] || 0) + 1;
  node.data = node.data || {
    hProperties: {
      id: `${id}${nodes[id] > 1 ? ` ${nodes[id] - 1}` : ""}`
        .split(" ")
        .join("-"),
    },
  };
}
