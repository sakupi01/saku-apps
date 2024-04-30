import Portal from "@/islands/flowarea";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(<Portal />);
});
