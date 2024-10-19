import Experiments from "@/islands/experiments";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(<Experiments />, {
    head: {
      title: "Experiments - saku",
      description: "Experiments in saku's Portfolio",
    },
  });
});
