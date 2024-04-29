import pages from "@hono/vite-cloudflare-pages";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: ["./app/client.ts"],
          output: {
            entryFileNames: "static/client.js",
            chunkFileNames: "static/assets/[name]-[hash].js",
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
        emptyOutDir: false,
      },
      resolve: {
        alias: {
          "@": "/app",
        },
      },
    };
  } else {
    return {
      ssr: {
        external: ["react", "react-dom", "@yamada-ui/react"],
      },
      plugins: [honox(), pages()],
      resolve: {
        alias: {
          "@": "/app",
        },
      },
    };
  }
});
