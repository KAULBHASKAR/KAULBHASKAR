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
    cssCodeSplit: false, // Set to false to merge CSS into a single predictable bundle
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Enforce clean, predictable output filenames for caching and static linking
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('react-router/')) {
              return 'vendor-framework';
            }
            if (id.includes('gray-matter') || id.includes('buffer') || id.includes('react-markdown') || id.includes('remark-gfm')) {
              return 'vendor-content';
            }
            if (id.includes('react-big-calendar')) {
              return 'vendor-calendar';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('react-slick') || id.includes('slick-carousel')) {
              return 'vendor-carousel';
            }
            return 'vendor-libs';
          }
        },
      },
    },
  },
})
