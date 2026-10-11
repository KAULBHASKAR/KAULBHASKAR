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
    chunkSizeWarningLimit: 800,
    
    // 🚀 Keep auto-preloading off so unvisited views aren't fetched upfront
    modulePreload: false, 
    
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Isolate heavy libraries that aren't needed for the initial text paint
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            if (id.includes('react-big-calendar') || id.includes('esprima')) {
              return 'vendor-heavy-addons';
            }
            // Let the rest bundle into standard core chunks naturally
          }
        },
      },
    },
  },
})
