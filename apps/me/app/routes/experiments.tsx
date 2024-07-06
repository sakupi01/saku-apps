import Experiments from "@/islands/experiments";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(<Experiments />, {
    head: {
      title: "saku's Portfolio - Experiments",
      description: "saku's Portfolio",
    },
  });
});
