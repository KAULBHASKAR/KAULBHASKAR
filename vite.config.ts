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
      name: 'absolute-waterfall-kill-switch',
      transformIndexHtml(html: string) {
        // 1. Defer CSS loading entirely
        let optimizedHtml = html.replace(
          /<link rel="stylesheet" crossorigin href="(.*?)">/g,
          '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
        );

        // 2. 🛑 WIPE ALL MODULEPRELOADS (Standard & Custom format layers)
        optimizedHtml = optimizedHtml.replace(/<link rel="modulepreload"[\s\S]*?>/gi, '');

        // 3. 🛑 NUCLEAR STRIP: Match every single script tag in the HTML build file, 
        // but safely ignore the absolute main entry point chunk (index-*.js).
        optimizedHtml = optimizedHtml.replace(
          /<script\b[^>]*src="\/assets\/(?!index-)[^>]*"([^>]*>([\s\S]*?)<\/script>|[^>]*\/>)/gi,
          ''
        );

        return optimizedHtml;
      }
    } as Plugin,
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
    chunkSizeWarningLimit: 800,
    
    // Explicit hard override for dependency managers
    modulePreload: {
      polyfill: false,
      resolveDependencies: () => [] 
    },
    
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router/')
            ) {
              return 'vendor-core';
            }
            
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-big-calendar')) return 'vendor-calendar';
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-carousel';
            if (id.includes('esprima')) return 'vendor-esprima';
            if (id.includes('react-icons')) return 'vendor-icons';
            if (id.includes('react-helmet-async')) return 'vendor-helmet';

            if (
              id.includes('clsx') || 
              id.includes('tailwind-merge') || 
              id.includes('framer-motion')
            ) {
              return 'vendor-shared';
            }
          }
        },
      },
    },
  },
})
