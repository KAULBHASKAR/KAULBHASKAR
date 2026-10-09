// vite.config.ts
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'defer-css',
      transformIndexHtml(html: string) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="(.*?)">/g,
          '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
        );
      }
    } as Plugin,
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
    cssCodeSplit: false, // 🚀 Combine CSS to prevent individual sub-layout style cascading blocks
    target: 'esnext',
    chunkSizeWarningLimit: 1200,
    
    modulePreload: false, // Turn off preloading hints
    
    rollupOptions: {
      output: {
        // Consolidate the manual chunks into single, high-efficiency caches
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Core Framework Core Layer
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/') ||
              id.includes('react-helmet-async')
            ) {
              return 'vendor-core';
            }
            
            // 2. Combine ALL other third-party scripts (gsap, slick, icons, calendar) into one single async block
            // This replaces 10+ distinct small network handshakes with a single unified file download
            return 'vendor-features-bundle';
          }
        },
      },
    },
  },
})
