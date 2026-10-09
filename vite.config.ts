// vite.config.ts
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Combined Custom Plugin: Defers CSS and aggressively strips all sub-route script chain leaks
    {
      name: 'optimize-html-delivery',
      transformIndexHtml(html: string) {
        // 1. Defer CSS loading to avoid blocking page paint
        let optimizedHtml = html.replace(
          /<link rel="stylesheet" crossorigin href="(.*?)">/g,
          '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
        );

        // 2. Clear out any hidden browser modulepreloads forcing background async cascades
        optimizedHtml = optimizedHtml.replace(/<link rel="modulepreload"[\s\S]*?>/gi, '');

        // 3. Forcefully strip secondary async script blocks injected into index.html,
        // leaving ONLY the index execution entry script file alive.
        optimizedHtml = optimizedHtml.replace(
          /<script type="module" crossorigin src="\/assets\/(?!(index-)).*?\.js"><\/script>/gi, 
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
    
    // Explicit object assignment ensures deep overrides catch any sub-dependencies
    modulePreload: {
      polyfill: false,
      resolveDependencies: () => [] // Forces Vite/Rollup to stop bundling child dependency graphs into entry manifests
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
