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
    target: 'esnext', // Optimization: Allows efficient tree-shaking for modern devices
    chunkSizeWarningLimit: 500, // Reduced back down to standard to monitor leaks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Isolate immutable core framework items
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router')) {
              return 'vendor-core';
            }
            
            // 2. Heavy components that must remain isolated to their respective pages
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            
            // 3. Fix: Instead of generic catch-all grouping, break down by specific package name
            // This isolates every independent third-party dependency into its own async chunk file.
            const parts = id.toString().split('node_modules/');
            const packageName = parts[parts.length - 1].split('/')[0];
            
            // Exclude scoped packages prefix if necessary (e.g., @radix-ui/react-slot -> radix-ui)
            return `vendor-${packageName.replace('@', '')}`;
          }
        },
      },
    },
  },
})
