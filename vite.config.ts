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
    // Keeps components styling loaded chunks instead of a single giant global render-blocker
    cssCodeSplit: true,
    target: 'esnext',
    chunkSizeWarningLimit: 1200,
    
    // Configures preloading logic safely for Vite 6+ engines
    modulePreload: {
      resolveDependencies(_url, deps, _context) {
        // Preload index and core structures exclusively to stop secondary background route preloads
        return deps.filter(dep => dep.includes('vendor-core') || dep.includes('index'));
      }
    },
    
    rollupOptions: {
      output: {
        // ✅ Rolldown-compatible function chunk strategy
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Main framework runtime engine
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/')
            ) {
              return 'vendor-core';
            }

            // Group heavy animation and text engines away from critical paint views
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('react-big-calendar') || id.includes('calendar')) {
              return 'vendor-calendar';
            }

            // Pack shared lightweight utility dependencies cleanly to avoid micro-file spam
            if (
              id.includes('clsx') || 
              id.includes('tailwind-merge') || 
              id.includes('framer-motion') || 
              id.includes('react-helmet-async') ||
              id.includes('react-icons')
            ) {
              return 'vendor-ui-shared';
            }
          }
        }
      },
    },
  },
})
