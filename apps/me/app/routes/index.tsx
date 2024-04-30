import { createRoute } from "honox/factory";
import FlowArea from "@/islands/portal/flowarea";

export default createRoute((c) => {
  return c.render(<FlowArea />);
});
