import { reactRenderer } from "@hono/react-renderer";
import {
  ColorModeScript,
  ThemeSchemeScript,
  defaultConfig,
} from "@yamada-ui/react";
import { UIProvider } from "@yamada-ui/react";

export default reactRenderer(({ children, head }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js"></script>
        ) : (
          <script type="module" src="/app/client.ts"></script>
        )}
        {head?.title ? <title>{head.title}</title> : ""}
      </head>
      <ColorModeScript
        type="cookie"
        nonce="testing"
        initialColorMode={defaultConfig.initialColorMode}
      />
      <ThemeSchemeScript
        type="cookie"
        nonce="testing"
        initialThemeScheme={defaultConfig.initialThemeScheme}
      />
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
});
