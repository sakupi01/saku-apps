import { UIProvider } from "@yamada-ui/react";
import ReactFlow, { useNodesState } from "reactflow";
import theme from "@/theme";
import Content from "../../components/index";
import "reactflow/dist/base.css";
import { nodeSet } from "./constants/nodes";
import usePositionNodes from "./hooks/usePositionNodes";

export default function FlowArea() {
  const { nodeTypes, initialNodes } = nodeSet;
  const [nodes, setNode, onNodesChange] = useNodesState(initialNodes);
  const breakpoint = usePositionNodes({ setNode });

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
