import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Splits heavy dependencies into their own separate files
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group heavy animation libraries together
            if (id.includes('gsap')) {
              return 'vendor-animation';
            }
            // Isolate the giant calendar package
            if (id.includes('react-big-calendar')) {
              return 'vendor-calendar';
            }
            // Isolate Markdown parsing utilities
            if (id.includes('react-markdown') || id.includes('remark-gfm') || id.includes('gray-matter')) {
              return 'vendor-markdown';
            }
            // Standard core vendor chunk for React and router core
            if (id.includes('react') || id.includes('react-router')) {
              return 'vendor-core';
            }
            // Fallback grouping for minor utilities (date-fns, slick, etc.)
            return 'vendor-utils';
          }
        },
      },
    },
    // Warns you if an individual chunk exceeds safe loading sizes
    chunkSizeWarningLimit: 600,
  },
});
