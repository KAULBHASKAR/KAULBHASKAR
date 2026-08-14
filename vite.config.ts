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
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();

            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router/')) {
              return 'vendor-framework';
            }
            if (id.includes('gray-matter') || id.includes('buffer')) {
              return 'vendor-blog-logic';
            }
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('react-markdown') || id.includes('remark-gfm')) return 'vendor-content';

            return 'vendor-libs';
          }
        },
      },
    },
  },
})
