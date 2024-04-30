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
  } else {
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
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvczAwMjk5Ni9EZXZlbG9wL3Nha3UtYXBwcy9hcHBzL21lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvczAwMjk5Ni9EZXZlbG9wL3Nha3UtYXBwcy9hcHBzL21lL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zMDAyOTk2L0RldmVsb3Avc2FrdS1hcHBzL2FwcHMvbWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGFnZXMgZnJvbSBcIkBob25vL3ZpdGUtY2xvdWRmbGFyZS1wYWdlc1wiO1xuaW1wb3J0IGhvbm94IGZyb20gXCJob25veC92aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGlmIChtb2RlID09PSBcImNsaWVudFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJ1aWxkOiB7XG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICBpbnB1dDogW1wiLi9hcHAvY2xpZW50LnRzXCJdLFxuICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3RhdGljL2NsaWVudC5qc1wiLFxuICAgICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwic3RhdGljL2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJzdGF0aWMvYXNzZXRzL1tuYW1lXS5bZXh0XVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgXCJAXCI6IFwiL2FwcFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBzc3I6IHtcbiAgICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgICBcInJlYWN0XCIsXG4gICAgICAgICAgXCJyZWFjdC1kb21cIixcbiAgICAgICAgICBcIkB5YW1hZGEtdWkvcmVhY3RcIixcbiAgICAgICAgICBcIkB5YW1hZGEtdWkvY29yZVwiLFxuICAgICAgICAgIFwicmVhY3RmbG93XCIsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgcGx1Z2luczogW2hvbm94KCksIHBhZ2VzKCldLFxuICAgICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgIFwiQFwiOiBcIi9hcHBcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBTLE9BQU8sV0FBVztBQUM1VCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsTUFBSSxTQUFTLFVBQVU7QUFDckIsV0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLFFBQ0wsZUFBZTtBQUFBLFVBQ2IsT0FBTyxDQUFDLGlCQUFpQjtBQUFBLFVBQ3pCLFFBQVE7QUFBQSxZQUNOLGdCQUFnQjtBQUFBLFlBQ2hCLGdCQUFnQjtBQUFBLFlBQ2hCLGdCQUFnQjtBQUFBLFVBQ2xCO0FBQUEsUUFDRjtBQUFBLFFBQ0EsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLE9BQU87QUFBQSxVQUNMLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsUUFDSCxVQUFVO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFBQSxNQUMxQixTQUFTO0FBQUEsUUFDUCxPQUFPO0FBQUEsVUFDTCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
