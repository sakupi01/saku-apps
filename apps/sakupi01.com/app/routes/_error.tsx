// app/routes/_404.tsx
import type { NotFoundHandler } from "hono";

const handler: NotFoundHandler = (c) => {
  return c.render(
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100vw",
      }}
    >
      <img
        src="/static/cry-saku.png"
        alt="error saku"
        width={100}
        height={100}
      />
      <a href="/">back to home</a>
    </main>,
  );
};

export default handler;
