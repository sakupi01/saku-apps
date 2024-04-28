import { css } from "hono/css";
import { createRoute } from "honox/factory";
import SomeComponent from "../components/some-component";

const className = css`
  font-family: sans-serif;
  color: red;
`;

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  return c.render(
    <div class={className}>
      <h1>Hello, {name}!</h1>
      <SomeComponent />
    </div>,
    { title: name },
  );
});
