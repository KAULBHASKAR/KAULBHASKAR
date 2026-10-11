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
    chunkSizeWarningLimit: 1200, // Adjusted to match combined vendor targets
    
    // 🚀 FIXED: Tells the browser to download dependencies in parallel instead of waiting in a chain
    modulePreload: {
      polyfill: true,
    }, 
    
    rollupOptions: {
      output: {
        // 🚀 FIXED: Group tiny vendor pieces together to prevent 30+ sequential file downloads
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Bundle structural framework elements cleanly
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/') ||
              id.includes('react-helmet-async')
            ) {
              return 'vendor-framework';
            }
            
            // Group display UI components together
            if (
              id.includes('react-big-calendar') || 
              id.includes('react-slick') || 
              id.includes('slick-carousel') ||
              id.includes('react-icons')
            ) {
              return 'vendor-ui-addons';
            }
            
            // Animation utilities
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animation';
            }

            // Fallback for miscellaneous functional scripts
            return 'vendor-utility';
          }
        },
      },
    },
  },
})
