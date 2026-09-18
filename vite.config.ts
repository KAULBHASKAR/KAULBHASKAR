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
    chunkSizeWarningLimit: 500,
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
            
            // 3. New Fix: Intercept deep React Icon ESM files to prevent the 'vendor-es...' block
            if (id.includes('react-icons') || id.includes('/esm/')) {
              return 'vendor-icons-engine';
            }

            // 4. Safely parse out the distinct package name string 
            const parts = id.toString().split('node_modules/');
            const packagePath = parts[parts.length - 1];
            const packageName = packagePath.split('/')[0]; // Extract the first folder directory string
            
            // Return clean chunk names without the '@' symbol
            return `vendor-${packageName.replace('@', '')}`;
          }
        },
      },
    },
  },
})
