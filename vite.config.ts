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
    chunkSizeWarningLimit: 1200,
    
    // 🚀 FIXED: Enforces standard safe preloading structure matching Vite 5 types
    modulePreload: {
      polyfill: true
    }, 

    rollupOptions: {
      output: {
        // 🚀 FIXED: Standardized chunk grouping strategy to prevent the massive request waterfall
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group heavy animation libraries together
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            // Group complex UI component engines together
            if (
              id.includes('react-big-calendar') || 
              id.includes('esprima') || 
              id.includes('slick-carousel') || 
              id.includes('react-slick')
            ) {
              return 'vendor-ui-addons';
            }
            // Let smaller utility libraries fall back into standard bundle files naturally
          }
        },
      },
    },
  },
})
