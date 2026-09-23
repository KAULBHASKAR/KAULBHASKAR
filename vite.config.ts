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
    // 💡 FIX: Turn this back on (default). Preloading avoids sequential evaluation waterfalls 
    // that spike the "Other" (609 ms) thread metrics.
    modulePreload: true, 
    chunkSizeWarningLimit: 800, // Balanced threshold for animation-heavy sites
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Isolate immutable core framework items
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router')) {
              return 'vendor-core';
            }
            
            // 2. Isolate heavy operational blockers so they stay out of the core pipeline
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('react-icons') || id.includes('/esm/')) return 'vendor-icons';
            if (id.includes('esprima')) return 'vendor-esprima';

            // 3. 💡 TARGET FIX: Stop aggressive micro-chunking. Group remaining minor dependencies 
            // together to minimize main thread parsing loops and context compilation work.
            return 'vendor-shared';
          }
        },
      },
    },
  },
})
