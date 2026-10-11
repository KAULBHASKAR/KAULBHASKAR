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
    chunkSizeWarningLimit: 1000,
    
    // 🚀 FIXED: Allow standard module preloading so the browser loads only what's required for the active view
    modulePreload: {
      polyfill: true,
    }, 
    
    rollupOptions: {
      output: {
        // 🚀 FIXED: Cleaned up code-splitting to isolate only the largest libraries 
        // Anything else will be loaded lazily on demand instead of blocking the main thread
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep heavy animation engines separate so they don't bloat your landing paint
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            // Keep specialized heavy layout components out of the initial payload
            if (id.includes('react-big-calendar') || id.includes('esprima')) {
              return 'vendor-heavy-addons';
            }
          }
        },
      },
    },
  },
})
