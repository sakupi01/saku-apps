import About from "@/islands/about";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(<About />, {
    head: {
      title: "saku's Portfolio - About",
      description: "saku's Portfolio",
    },
  });
});
