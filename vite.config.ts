// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
    // ⚡️ Combined into a single file to eliminate multiple tiny css requests
    cssCodeSplit: false, 
    target: 'esnext',
    chunkSizeWarningLimit: 800,
    
    // ✅ Completely disables aggressive preloading of unvisited route chunks
    modulePreload: false, 
    
    rollupOptions: {
      output: {
        // ⚡️ Forces a predictable CSS name for index.html optimization
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/index.[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/')
            ) {
              return 'vendor-core';
            }
            
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('esprima')) return 'vendor-esprima';
            if (id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('react-helmet-async')) return 'vendor-helmet';

            if (
              id.includes('clsx') || 
              id.includes('tailwind-merge') || 
              id.includes('framer-motion')
            ) {
              return 'vendor-shared';
            }
          }
        },
      },
    },
  },
})
