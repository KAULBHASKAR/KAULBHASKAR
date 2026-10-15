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
    // 1. 🚨 FIX: Enable CSS Code Splitting so your lazy chunks only load their own styles
    cssCodeSplit: true,
    
    target: 'esnext',
    chunkSizeWarningLimit: 800,
    
    // Disables aggressive preloading of unvisited route chunks
    modulePreload: false, 
    
    rollupOptions: {
      output: {
        // 2. Adjust naming patterns to ensure optimal hashing and caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group Core framework runtimes into a unified caching bucket
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/')
            ) {
              return 'vendor-core';
            }
            
            // Heavy isolated structural plugins
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-big-calendar') || id.includes('calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('react-icons')) return 'vendor-icons';
            
            // 3. Prevent micro-vendor chunks by merging remaining minor utilities
            if (
              id.includes('clsx') || 
              id.includes('tailwind-merge') || 
              id.includes('framer-motion') ||
              id.includes('react-helmet-async') ||
              id.includes('esprima')
            ) {
              return 'vendor-utilities';
            }
          }
        },
      },
    },
  },
})
