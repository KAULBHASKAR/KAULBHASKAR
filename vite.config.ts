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
    chunkSizeWarningLimit: 800, // Adjusted slightly for heavy third-party bundles
    sourcemap: false,           // Set to false in production to reduce build resource footprint
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Ignore virtual internal modules used by Vite/Rollup
          if (id.startsWith('\0')) {
            return;
          }

          if (id.includes('node_modules')) {
            // 1. Core structural framework files group
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-framework';
            }
            // 2. Heavy visualization assets (Isolate to prevent blocking LCP)
            if (id.includes('react-big-calendar')) {
              return 'vendor-calendar';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            // 3. Carousel animations
            if (id.includes('react-slick') || id.includes('slick-carousel')) {
              return 'vendor-carousel';
            }
            // 4. Heavy Markdown parse engines
            if (id.includes('react-markdown') || id.includes('remark-gfm') || id.includes('gray-matter') || id.includes('buffer')) {
              return 'vendor-content';
            }

            // 5. Catch-all for lightweight minor packages (Prevents loose chunk fragmentation)
            return 'vendor-utils';
          }
        },
      },
    },
  },
})
