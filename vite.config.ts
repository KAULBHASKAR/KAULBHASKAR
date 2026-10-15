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
    target: 'esnext',
    chunkSizeWarningLimit: 1200,
    
    // 1. 🚨 FIX: Re-enable modulePreload but strictly filter out lazy dependencies.
    // This tells Vite to preload core entry files while preventing background chunks from preloading.
    modulePreload: {
      resolveDependencies(url, deps, context) {
        // Only preload critical core framework files needed for the very first frame paint
        return deps.filter(dep => dep.includes('vendor-core') || dep.includes('index'));
      }
    },
    
    rollupOptions: {
      output: {
        // 2. Prevent dynamic file chunk fragmentation by setting a minimum chunk size threshold
        experimentalMinChunkSize: 20 * 1024, // 20 KiB minimum (merges micro components under 20KB together)

        // 3. Simplified Object-Based Manual Chunks
        // Avoid function-based string loops which often trigger deep structural dependency loops in Rollup
        manualChunks: {
          'vendor-core': ['react', 'react-dom', 'react-router', 'react-helmet-async'],
          'vendor-ui-utils': ['clsx', 'tailwind-merge', 'framer-motion'],
        }
      },
    },
  },
})
