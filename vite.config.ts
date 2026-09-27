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
    modulePreload: true, // Prevents sequential evaluation waterfalls
    chunkSizeWarningLimit: 800, // Balanced threshold for animation/heavy ecosystems
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Isolate immutable core framework items (Absolute bare essentials)
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/')
            ) {
              return 'vendor-core';
            }
            
            // 2. Isolate heavy operational blockers so they stay out of the core pipeline
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('esprima')) return 'vendor-esprima';
            if (id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('react-helmet-async')) return 'vendor-helmet';

            // 3. Fallback: Only group utility items that are universally shared.
            // If they are specific to a single route, Vite will split them dynamically instead of bloat-loading them.
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
