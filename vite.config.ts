// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // ✅ Wire the SingleFile compiler plugin in to handle layout injection
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
    // ✅ Keep CSS splitting set to false so styles combine cleanly into the single document template
    cssCodeSplit: false, 
    target: 'esnext',
    chunkSizeWarningLimit: 800,
    modulePreload: false, 
    
    // 🛑 REMOVED: manualChunks configuration block has been taken out.
    // This allows Rolldown to compile everything cleanly under the single-file pipeline 
    // without triggering configuration rule conflicts.
  },
})
