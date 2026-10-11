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
    
    // 🚀 STOPS THE WATERFALL: Disables dynamic module preloads from bloating the initial HTML header
    modulePreload: false, 
    
    // 🚀 FIXED: Moved from output options to root build options where Vite correctly handles chunk sizes
    experimentalMinChunkSize: 20000,

    rollupOptions: {
      output: {
        // 🚀 PREVENTS REFLOWS: Isolates heavy runtime evaluation libraries from the main thread lifecycle
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react-big-calendar') || 
              id.includes('esprima') || 
              id.includes('slick-carousel') || 
              id.includes('react-slick')
            ) {
              return 'vendor-heavy-addons';
            }
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animation';
            }
          }
        },
      },
    },
  },
  experimental: {
    // 🚀 FIXED: Aligned type safety check for type parameters ('public' | 'asset') to pass strict tsc compilation
    renderBuiltUrl(filename, { type }) {
      if (type === 'public') {
        return { runtime: `window.__dynamic_base__ + ${JSON.stringify(filename)}` };
      }
      return { relative: true };
    }
  }
})
