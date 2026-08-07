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
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 1024,
      ext: '.br',
      deleteOriginFile: false,
    }),
  ],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800, // Raised slightly for React 19 + GSAP
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group framework core files
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router/')) {
              return 'vendor-framework';
            }
            // Group markdown parsing packages
            if (id.includes('gray-matter') || id.includes('buffer') || id.includes('react-markdown') || id.includes('remark-gfm')) {
              return 'vendor-content';
            }
            // Group heavy UI features
            if (id.includes('react-big-calendar')) {
              return 'vendor-calendar';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('react-slick') || id.includes('slick-carousel')) {
              return 'vendor-carousel';
            }
            // Catch-all for remaining npm packages
            return 'vendor-libs';
          }
        },
      },
    },
  },
})
