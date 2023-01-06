/// <reference types="vitest" />

import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    include: ["./src/**/*.spec.ts"],
    environment: "happy-dom",
    coverage: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      fileName: () => "index.js",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vite", "path", "js-yaml", "fast-glob", "fs"]
    }
  },
  plugins: [dts()]
});
