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
    
    // 🚀 STEP 1: Turn off general preloading to clear the critical chaining waterfall
    modulePreload: false, 
    
    rollupOptions: {
      output: {
        // 🚀 STEP 2: Isolate heavy script targets to clear the Forced Reflow pipeline
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep layout metrics/carousels/calendars separated out of the main index lifecycle
            if (
              id.includes('react-big-calendar') || 
              id.includes('esprima') || 
              id.includes('slick-carousel') || 
              id.includes('react-slick')
            ) {
              return 'vendor-heavy-addons';
            }
            
            // Isolate animation layout calculation scripts
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animation';
            }
          }
        },
        
        // 🚀 STEP 3: Hard override to strip injected preload links from the bundle pipeline entirely
        experimentalMinChunkSize: 20000,
      },
    },
  },
  experimental: {
    // Completely stops Vite from appending any hidden modulepreload links into index.html
    renderBuiltUrl(filename, { type }) {
      if (type === 'html') {
        return { runtime: `window.__dynamic_base__ + ${JSON.stringify(filename)}` };
      }
      return { relative: true };
    }
  }
})
