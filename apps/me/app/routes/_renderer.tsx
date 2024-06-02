import Footer from "@/components/footer";
import theme from "@/theme";
import { reactRenderer } from "@hono/react-renderer";
import {
  ColorModeScript,
  ThemeSchemeScript,
  defaultConfig,
} from "@yamada-ui/react";
import { UIProvider } from "@yamada-ui/react";

export default reactRenderer(({ children, head }) => {
  return (
    <UIProvider theme={theme}>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js" />
          ) : (
            <script type="module" src="/app/client.ts" />
          )}
          {head?.title ? <title>{head.title}</title> : ""}
          {head?.description ? (
            <meta name="description" content={`${head.description}`} />
          ) : (
            ""
          )}
          <link rel="canonical" href="https://skr-me.com/" />
          {head?.title ? (
            <meta name="og:title" content={`${head.title}`} />
          ) : (
            ""
          )}
          {head?.description ? (
            <meta name="og:description" content={`${head.description}`} />
          ) : (
            ""
          )}
          <meta
            property="og:url"
            content="https://skr-me.com/static/icon.svg"
          />
          <meta property="og:site_name" content="saku's portfolio" />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta
            property="og:image"
            content="https://skr-me.com/static/icon.svg"
          />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@SakuOnTheWeb" />
          <meta name="twitter:creator" content="@SakuOnTheWeb" />
          {head?.title ? (
            <meta name="twitter:title" content={`${head.title}`} />
          ) : (
            ""
          )}
          {head?.description ? (
            <meta name="twitter:description" content={`${head.description}`} />
          ) : (
            ""
          )}
          <meta name="twitter:image:type" content="image/png" />
          <meta name="twitter:image:width" content="512" />
          <meta name="twitter:image:height" content="512" />
          <meta
            name="twitter:image"
            content="https://skr-me.com/static/icon.svg"
          />
          <link
            rel="icon"
            href="/static/icon.svg"
            type="image/svg+xml"
            sizes="any"
          />
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
          {children}
          <Footer />
        </body>
      </html>
    </UIProvider>
  );
});
