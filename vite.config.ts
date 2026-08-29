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
      algorithm: 'gzip',       // enable gzip
      threshold: 1024,         // only compress files > 1KB
      ext: '.gz',              // output extension
      deleteOriginFile: false, // keep original files
    }),
    viteCompression({
      algorithm: 'brotliCompress', // optional: enable Brotli too
      threshold: 1024,
      ext: '.br',
      deleteOriginFile: false,
    }),
  ],
  // FIX 1: Provide fallback object polyfills for browser environments (iOS Safari fix)
  define: {
    'process.env': {},
    'global': 'globalThis',
  },
  build: {
    // FIX 2: Explicitly target es2020 / iOS 14+ compatible JS standards
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Isolate the heavy esprima library completely
            if (id.includes('esprima')) {
              return 'vendor-esprima';
            }
            // 2. Isolate core framework and routing modules
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router') || id.includes('@remix-run/router')) {
              return 'vendor-framework';
            }
            // 3. Keep your existing custom categories
            if (id.includes('gray-matter')) {
              return 'vendor-blog-logic';
            }
            // FIX 3: Isolate and handle standard buffer module separately if pulled
            if (id.includes('buffer')) {
              return 'vendor-buffer-poly';
            }
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('react-markdown') || id.includes('remark-gfm')) return 'vendor-content';

            // 4. Group all remaining smaller modules into one generic bundle 
            return 'vendor-libs';
          }
        },
      },
    },
  },
})
