import FlowArea from "@/islands/portal/flowarea";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(<FlowArea />, {
    head: {
      title: "saku's Portfolio - Home",
      description: "saku's Portfolio",
    },
  });
});
