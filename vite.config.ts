import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    include: ["react-player/lib/players/YouTube"],
  },
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@PUBLIC": path.resolve(__dirname, "public"),
    },
  },
});
