import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import type { PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Initialize plugins array with common plugins
  const plugins: PluginOption[] = [react()];

  // Add development-only plugins
  if (mode !== 'production') {
    plugins.push(runtimeErrorOverlay());
    
    // Add Replit-specific plugins if running on Replit
    if (process.env.REPL_ID) {
      import("@replit/vite-plugin-cartographer")
        .then(({ cartographer }) => plugins.push(cartographer()))
        .catch(console.error);
    }
  }

  // Base configuration
  const config: UserConfig = {
    base: '/',
    plugins,
    optimizeDeps: {
      include: ['react', 'react-dom', 'wouter'],
    },
    server: {
      headers: {
        'Cache-Control': 'no-cache',
      },
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['wouter', 'date-fns'],
          },
          // Ensure consistent chunk naming for better caching
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash][ext]',
        },
      },
      // Minify for production
      minify: 'esbuild',
      // Report compressed bundle sizes
      reportCompressedSize: true,
    }
  };

  return config;
});
