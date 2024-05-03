import { createRoute } from "honox/factory";
import FlowArea from "@/islands/portal/flowarea";

export default createRoute((c) => {
  // Honoのハンドラを返す
  return c.render(<FlowArea />, {
    head: {
      title: "saku's Portfolio - Home",
      description: "saku's Portfolio",
    },
  });
});
