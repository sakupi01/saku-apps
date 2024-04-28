import { createRoute } from "honox/factory";
import Badge from "../islands/badge";
import SomeComponent from "../components/some-component";

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  return c.render(
    <>
      <Badge name="saku" />
      <SomeComponent />
    </>,
  );
});
