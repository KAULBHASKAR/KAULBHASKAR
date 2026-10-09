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
      name: 'strip-preloads-completely',
      // Runs right before the final HTML is generated to ensure clean SEO structure
      transformIndexHtml: {
        order: 'post',
        handler(html: string) {
          // Remove modulepreload link tags that cause the sequential network waterfall
          return html.replace(/<link rel="modulepreload"[\s\S]*?>/gi, '');
        }
      }
    } as Plugin,
    viteCompression({ algorithm: 'gzip', threshold: 1024, ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', threshold: 1024, ext: '.br' }),
  ],
  build: {
    cssCodeSplit: false, // Prevents individual style-sheet handshakes
    target: 'esnext',
    chunkSizeWarningLimit: 1200,
    modulePreload: false, // Instructs Vite to drop runtime preload mapping vectors
  }
})
