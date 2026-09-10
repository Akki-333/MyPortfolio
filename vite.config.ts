import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: path.resolve(rootDir, "client"),
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "client/src"),
    },
  },
  build: {
    outDir: path.resolve(rootDir, "dist"),
    emptyOutDir: true,
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
    // Kept low so the project cover SVGs stay real files. Inlined as data
    // URIs they would ship inside the JS chunk, which both defeats their
    // `loading="lazy"` and makes every content edit invalidate the bundle.
    assetsInlineLimit: 1024,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // Split the framework out of the app chunk: React changes far less
        // often than the content, so it stays cached across content edits.
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
