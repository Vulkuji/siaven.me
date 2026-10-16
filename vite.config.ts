import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  publicDir: isSsrBuild ? false : "static",
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    sourcemap: false,
    assetsInlineLimit: 0,
    rolldownOptions: isSsrBuild
      ? undefined
      : {
          input: {
            home: fileURLToPath(new URL("./index.html", import.meta.url)),
            notFound: fileURLToPath(new URL("./404.html", import.meta.url)),
          },
        },
  },
}));
