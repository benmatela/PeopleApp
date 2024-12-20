import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',  // Vite will listen on all network interfaces
    port: 3000,        // Port for Vite dev server
    watch: {
      usePolling: true,  // Use polling for file changes (required for Docker)
    }
  },
  base: "/"
});
