import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { ViteRsw } from "vite-plugin-rsw";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteRsw()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
