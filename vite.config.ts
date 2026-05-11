import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const BACKEND_TARGET = "http://localhost:8080";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/events": BACKEND_TARGET,
      "/EventReg2": BACKEND_TARGET,
      "/api": BACKEND_TARGET,
      "/feide": BACKEND_TARGET,
      "/oauth2": BACKEND_TARGET,
      "/login": BACKEND_TARGET,
      "/logout": BACKEND_TARGET,
    },
  },
});
