import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const apiBaseUrlProd = "https://api.mypayd.app/v1";

export default defineConfig({
  server: {
    port: 8089,
    host: true,
  },
  define: {
    "process.env": {
      REACT_APP_API_BASE_URL: apiBaseUrlProd,
    },
    global: "window",
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
