import About from "@/islands/about";
import { Stack } from "@yamada-ui/react";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(<About />, {
    head: {
      title: "saku's Portfolio - About",
      description: "saku's Portfolio",
    },
  });
});
