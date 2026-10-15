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
    
    // ✅ Fixed: Added underscore prefixes to suppress unused parameter errors
    modulePreload: {
      resolveDependencies(_url, deps, _context) {
        return deps.filter(dep => dep.includes('vendor-core') || dep.includes('index'));
      }
    },
    
    rollupOptions: {
      output: {
        // ✅ Fixed: Cast options through 'any' to bypass strict version-mismatched Rollup type typing
        ...({ experimentalMinChunkSize: 20 * 1024 } as any),

        manualChunks: {
          'vendor-core': ['react', 'react-dom', 'react-router', 'react-helmet-async'],
          'vendor-ui-utils': ['clsx', 'tailwind-merge', 'framer-motion'],
        }
      },
    },
  },
})
