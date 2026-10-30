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
    chunkSizeWarningLimit: 500, // Dropped to 500 to catch massive files early
    
    // ⚠️ CRUCIAL: Changed from 'false' to optimized object settings.
    // Completely disabling modulePreload can cause sudden layout shifts and delayed page hydration 
    // on slow mobile devices. Instead, we allow preloading but turn off the aggressive dynamic injection link tags.
    modulePreload: {
      resolveDependencies: () => [] 
    },
    
    rollupOptions: {
      output: {
        // Keeps names clean and safe for browsers to parse out
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
            
            // 2. Separate heavy animation engines entirely
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('framer-motion')) return 'vendor-motion';
            
            // 3. Isolated heavy components (Only needed on deep routes)
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('esprima')) return 'vendor-esprima';
            if (id.includes('react-helmet-async')) return 'vendor-helmet';
            
            // 4. Icons (Massive source of mobile parsing delays)
            if (id.includes('react-icons') || id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui-icons';
            }

            // 5. General Small Utilities
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('axios')) {
              return 'vendor-shared';
            }

            // 🔥 6. AGGRESSIVE BREAKUP STRATEGY FOR EVERYTHING ELSE
            // If a node_module hasn't been grouped above, break it out into its own scoped file
            // instead of letting Vite dump it into a monolithic fallback vendor bundle.
            const parts = id.toString().split('node_modules/');
            if (parts.length > 1) {
              const moduleName = parts[1].split('/')[0];
              // Avoid making chunks for internal subfolders or scopes
              if (moduleName && !moduleName.startsWith('.')) {
                return `vendor-pkg-${moduleName.replace('@', '')}`;
              }
            }
          }
        },
      },
    },
  },
})
