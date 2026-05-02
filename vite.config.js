import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),          /* Use default React plugin — no extra Babel transforms needed */
    tailwindcss(),
  ],

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },

  build: {
    /* Target modern browsers — smaller, faster bundles */
    target: "esnext",

    /* Inline small assets as base64 to save round-trips (8 KB threshold) */
    assetsInlineLimit: 8192,

    /* Vite 8 uses OXC/rolldown by default — fastest available minifier */
    /* Do NOT set minify: 'esbuild' — esbuild is not bundled in Vite 8 */

    /* Granular vendor splitting for optimal long-term caching */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (['react', 'react-dom', 'react-router-dom', 'scheduler'].some(p => id.includes(`/${p}/`)))
              return 'vendor-react';
            if (id.includes('framer-motion') || id.includes('motion'))
              return 'vendor-motion';
            if (id.includes('lucide-react') || id.includes('react-icons'))
              return 'vendor-icons';
            return 'vendor-misc';
          }
        },
      },
    },

    /* Chunk size warning threshold */
    chunkSizeWarningLimit: 500,

    /* CSS code splitting */
    cssCodeSplit: true,

    /* No source maps in production — smaller output */
    sourcemap: false,
  },

  /* Pre-bundle heavy deps to speed up cold dev starts */
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'react-icons/fa'],
  },
})
