// vite.config.ts
import pages from "file:///Users/s002996/Develop/saku-apps/node_modules/@hono/vite-cloudflare-pages/dist/index.js";
import honox from "file:///Users/s002996/Develop/saku-apps/node_modules/honox/dist/vite/index.js";
import { defineConfig } from "file:///Users/s002996/Develop/saku-apps/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: ["./app/client.ts"],
          output: {
            entryFileNames: "static/client.js",
            chunkFileNames: "static/assets/[name]-[hash].js",
            assetFileNames: "static/assets/[name].[ext]"
          }
        },
        emptyOutDir: false
      },
      resolve: {
        alias: {
          "@": "/app"
        }
      }
    };
  }
  return {
    ssr: {
      external: [
        "react",
        "react-dom",
        "@yamada-ui/react",
        "@yamada-ui/core",
        "reactflow"
      ]
    },
    plugins: [honox(), pages()],
    resolve: {
      alias: {
        "@": "/app"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvczAwMjk5Ni9EZXZlbG9wL3Nha3UtYXBwcy9hcHBzL21lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvczAwMjk5Ni9EZXZlbG9wL3Nha3UtYXBwcy9hcHBzL21lL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zMDAyOTk2L0RldmVsb3Avc2FrdS1hcHBzL2FwcHMvbWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGFnZXMgZnJvbSBcIkBob25vL3ZpdGUtY2xvdWRmbGFyZS1wYWdlc1wiO1xuaW1wb3J0IGhvbm94IGZyb20gXCJob25veC92aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGlmIChtb2RlID09PSBcImNsaWVudFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJ1aWxkOiB7XG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICBpbnB1dDogW1wiLi9hcHAvY2xpZW50LnRzXCJdLFxuICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3RhdGljL2NsaWVudC5qc1wiLFxuICAgICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwic3RhdGljL2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJzdGF0aWMvYXNzZXRzL1tuYW1lXS5bZXh0XVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgXCJAXCI6IFwiL2FwcFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgc3NyOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcInJlYWN0XCIsXG4gICAgICAgIFwicmVhY3QtZG9tXCIsXG4gICAgICAgIFwiQHlhbWFkYS11aS9yZWFjdFwiLFxuICAgICAgICBcIkB5YW1hZGEtdWkvY29yZVwiLFxuICAgICAgICBcInJlYWN0Zmxvd1wiLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtob25veCgpLCBwYWdlcygpXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogXCIvYXBwXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsT0FBTyxXQUFXO0FBQzVULE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxNQUFJLFNBQVMsVUFBVTtBQUNyQixXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDTCxlQUFlO0FBQUEsVUFDYixPQUFPLENBQUMsaUJBQWlCO0FBQUEsVUFDekIsUUFBUTtBQUFBLFlBQ04sZ0JBQWdCO0FBQUEsWUFDaEIsZ0JBQWdCO0FBQUEsWUFDaEIsZ0JBQWdCO0FBQUEsVUFDbEI7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFhO0FBQUEsTUFDZjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsT0FBTztBQUFBLFVBQ0wsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFBQSxJQUMxQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
