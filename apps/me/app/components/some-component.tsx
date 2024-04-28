import { useRequestContext } from "@hono/react-renderer";
import Counter from "../islands/counter";

export default function SomeComponent() {
  const c = useRequestContext();
  return <Counter initVal={parseInt(c.req.query("initCounterVal") ?? "0")} />;
}
