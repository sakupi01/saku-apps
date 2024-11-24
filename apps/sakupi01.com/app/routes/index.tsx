import FlowArea from "@/islands/portal/flowarea";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(<FlowArea />, {
    head: {
      title: "Portfolio - saku",
      description: "saku's Portfolio",
    },
  });
});
