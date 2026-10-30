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
    chunkSizeWarningLimit: 600, // Bumped slightly to account for healthy grouping
    
    // FIXED: Removed resolveDependencies: () => [] restriction. 
    // Allowing native preloading breaks the waterfall chain by downloading assets concurrently.
    modulePreload: true, 
    
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Framework Core Essentials
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/') ||
              id.includes('node_modules/react-router-dom/')
            ) {
              return 'vendor-core';
            }
            
            // 2. Heavy animation engines
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('framer-motion')) return 'vendor-motion';
            
            // 3. Isolated heavy components (Only needed on deep routes)
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('esprima')) return 'vendor-esprima';
            if (id.includes('react-helmet-async')) return 'vendor-helmet';
            
            // 4. UI Framework Elements & Icons
            if (id.includes('react-icons') || id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui-icons';
            }

            // 5. Standard Utilities & Shared Libraries
            if (
              id.includes('clsx') || 
              id.includes('tailwind-merge') || 
              id.includes('axios') ||
              id.includes('date-fns')
            ) {
              return 'vendor-shared';
            }

            // FIXED: Removed the aggressive loop that created thousands of tiny separate scripts.
            // Catch-all bundle for minor packages ensures they load in a single round-trip.
            return 'vendor-utils';
          }

          // 6. COLLAPSE INTERNAL MICRO-COMPONENTS
          // Consolidating your internal parts stops sequential script chaining on the homepage.
          if (id.includes('src/components/')) {
            return 'main-layout-components';
          }
        },
      },
    },
  },
})
