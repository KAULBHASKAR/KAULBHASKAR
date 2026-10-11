// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJsPlugin(),
    viteCompression({
      algorithm: 'gzip',
      threshold: 1024,
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 1024,
      ext: '.br',
    }),
  ],
  build: {
    cssCodeSplit: false,
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
    
    // 🚀 THE FIX: Stops Vite from injecting massive lists of <link rel="modulepreload"> into the HTML header.
    // This blocks the browser from downloading layout sections until the user actually requests them!
    modulePreload: false, 
    
    rollupOptions: {
      output: {
        // 🚀 THE FIX: Pull everything into a single streamlined bundle structure.
        // For a landing page under 300 KiB, a unified payload loads faster than 25 separate tiny chunks hitting the server concurrently.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor-bundle';
          }
        },
      },
    },
  },
})
