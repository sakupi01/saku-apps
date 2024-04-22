import { toString as tSFunc } from "mdast-util-to-string";

export default function transformNode(node, output, indexMap) {
  const transformedNode = {
    value: tSFunc(node),
    depth: node.depth,
    data: node.data,
    children: [],
  };

  // get heading 2 nodes
  if (node.depth === 2) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
}
