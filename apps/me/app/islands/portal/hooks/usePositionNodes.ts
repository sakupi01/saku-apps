import { useEffect, useLayoutEffect } from "react";
import type { Node } from "reactflow";
import { useBreakpoint } from "./useBreakPoints";

export default function usePositionNodes({
  setNode,
}: {
  setNode: React.Dispatch<
    React.SetStateAction<
      Node<
        {
          label: string;
        },
        string | undefined
      >[]
    >
  >;
}) {
  const breakpoint = useBreakpoint();
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      setNode((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          position: {
            x:
              node.position.x +
              window.innerWidth / 2 -
              (breakpoint === ("base" || "md" || "sm" || "lg" || "xl")
                ? 150
                : 300),
            y:
              node.position.y +
              (breakpoint === "sm"
                ? window.innerHeight + 400
                : breakpoint === ("xl" || "2xl")
                  ? window.innerHeight - 200
                  : window.innerHeight - 150),
          },
        })),
      );
    };
    handleResize();
  }, []);
  return breakpoint;
}
