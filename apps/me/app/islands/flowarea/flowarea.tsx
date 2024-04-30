import { UIProvider } from "@yamada-ui/react";
import ReactFlow, { useNodesState } from "reactflow";
import theme from "@/theme";
import { nodeTypes } from "./nodes";
import Content from "./content/index";
import "reactflow/dist/base.css";
import { useEffect, useState } from "react";
import { useBreakpoint } from "./hooks/useBreakPoints";

const initialNodes = [
  {
    id: "1",
    type: "aboutItem",
    position: { x: 0, y: 15 },
    data: {
      label: "About",
    },
  },
  {
    id: "2",
    type: "githubItem",
    position: { x: 330, y: 0 },
    data: {
      label: "GitHub",
    },
  },
  {
    id: "3",
    type: "xItem",
    position: { x: 330 + 180, y: 0 },
    data: {
      label: "Twitter",
    },
  },
  {
    id: "4",
    type: "zennItem",
    position: { x: 330 + 180 + 180, y: 0 },
    data: {
      label: "Zenn",
    },
  },
  {
    id: "5",
    type: "blogItem",
    position: { x: 330, y: 180 },
    data: {
      label: "Blog",
    },
  },
  {
    id: "6",
    type: "contactItem",
    position: { x: 330 + 180, y: 180 },
    data: {
      label: "Contact",
    },
  },
  {
    id: "7",
    type: "experimentsItem",
    position: { x: 330 + 180 + 180, y: 180 },
    data: {
      label: "Experiments",
    },
  },
];

export default function PortalFlowArea() {
  const breakpoint = useBreakpoint();
  const [nodes, setNode, onNodesChange] = useNodesState(initialNodes);

  useEffect(() => {
    const handleResize = () => {
      setNode((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          position: {
            x:
              node.position.x +
              window.innerWidth / 2 -
              (breakpoint === "base" || "md" || "sm" || "lg" || "xl"
                ? 150
                : 300),
            y:
              node.position.y +
              (breakpoint === "sm"
                ? window.innerHeight + 400
                : breakpoint === "xl" || "2xl"
                  ? window.innerHeight - 200
                  : window.innerHeight - 150),
          },
        })),
      );
    };
    handleResize();
  }, []);

  return (
    <UIProvider theme={theme}>
      <div
        style={{
          width: "100vw",
          height: breakpoint === "sm" ? "110vh" : "100vh",
        }}
      >
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          defaultViewport={{
            x: 0,
            y: 0,
            zoom: breakpoint === "sm" ? 0.4 : 0.8,
          }}
          deleteKeyCode={null}
        >
          <Content />
        </ReactFlow>
      </div>
    </UIProvider>
  );
}
