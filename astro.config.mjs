import { defineConfig, sharpImageService } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import { markdown } from './src/utils/external'

export default defineConfig({
  site: 'https://dominikreisach.xyz',
  prefetch: { prefetchAll: true },
  // pitch pages are unlisted: built, but kept out of the sitemap
  integrations: [sitemap({ filter: p => !p.includes('/pitch/') })],
  markdown: { processor: markdown },
  // the quality knobs for every still (src/utils/images.ts). AVIF q60, not sharp's 50:
  // at 50 the photography's fine texture (bark, stone) visibly smears at 1:1; 60 holds
  // it at ~65% of the old hand-made AVIFs' bytes. mozjpeg makes the legacy fallback
  // progressive and smaller at no cost to AVIF browsers, which never fetch it.
  // Astro's encode cache does not hash these: after changing one, `rm -rf node_modules/.astro`
  image: { service: sharpImageService({ avif: { quality: 60 }, jpeg: { mozjpeg: true } }) },
  vite: { plugins: [tailwindcss()] },
})
