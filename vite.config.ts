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
    cssCodeSplit: true,
    target: 'esnext',
    chunkSizeWarningLimit: 800,
    
    // ✅ FIX: Using the correct, type-safe function signature for modulePreload.
    // By returning an empty array for everything except the base entry chunk,
    // we stop vendor-calendar and vendor-esprima from preloading on initial mobile load.
    modulePreload: {
      resolveDependencies(_, deps) {
        // Only allow dependencies if they belong to the critical runtime path
        return deps.filter(dep => dep.includes('vendor-core') || dep.includes('index'));
      }
    },
    
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core framework layer
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/')
            ) {
              return 'vendor-core';
            }
            
            // Isolated major ecosystem dependencies
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('esprima')) return 'vendor-esprima';
            if (id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('react-helmet-async')) return 'vendor-helmet';

            // Utility styling items layer
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
