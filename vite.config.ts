// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { viteSingleFile } from 'vite-plugin-singlefile' // ✅ Import the plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // ✅ Add it to the plugins array. 
    // It intercepts the final asset tree and wires the CSS directly into index.html
    viteSingleFile({ removeViteModuleLoader: false }), 
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
    cssCodeSplit: false, 
    target: 'esnext',
    chunkSizeWarningLimit: 800,
    modulePreload: false, 
    rollupOptions: {
      output: {
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
