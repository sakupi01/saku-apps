// _renderer.tsx, which will load the /app/client.ts entry file for the client.
// The _renderer.tsx is applied under each directory, and the app/routes/posts/_renderer.tsx is applied in app/routes/posts/*.
// The JSX Renderer middleware allows you to create a Renderer as follows:

import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <Script src="/app/client.ts" async />
        {/* Don't forget to add <Style /> as it contains the CSS content. */}
        <Style />
      </head>
      <body>{children}</body>
    </html>
  );
});
