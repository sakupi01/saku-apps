import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";
import { serveStatic } from "hono/cloudflare-workers";

const app = createApp();
app.get("/static/*", serveStatic({ root: "./", manifest: "" }));

showRoutes(app);

export default app;
