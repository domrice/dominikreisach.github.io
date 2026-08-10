import { writeFile } from 'node:fs/promises'
import { readdirSync } from 'node:fs'

const SITE = 'https://dominikreisach.xyz'

// pitch pages are linked from nowhere, so crawlLinks never finds them — list them explicitly
const pitches = readdirSync('content/pitch').map(f => `/pitch/${f.replace(/\.md$/, '')}`)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxt/ui', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  // GitHub Pages: fully static output (.output/public)
  nitro: {
    preset: 'static',
    prerender: { crawlLinks: true, routes: ['/', ...pitches] },
    hooks: {
      // sitemap from the routes actually prerendered, so it can't go stale
      async 'prerender:done'(result) {
        const today = new Date().toISOString().slice(0, 10)
        const urls = [...result.prerenderedRoutes]
          .map(r => (typeof r === 'string' ? r : r.route))
          .filter(r => !r.includes('.') && !r.startsWith('/pitch')) // pitch pages are unlisted
          .sort()
          .map(r => `  <url><loc>${SITE}${r}</loc><lastmod>${today}</lastmod></url>`)
        await writeFile(
          '.output/public/sitemap.xml',
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
        )
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en', class: 'scroll-smooth scrollbar-hide font-titillium' },
      title: 'dominik reisach',
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Dominik Reisach: Personal Portfolio Website' },
        { name: 'author', content: 'Dominik Reisach' },
        { name: 'keywords', content: 'architecture, research, design, digital fabrication, computational design, portfolio, personal website' },
      ],
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        // body copy is the first thing painted — preload it so text doesn't swap in late
        { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: '/fonts/titillium-web-v17-latin-regular.woff2' },
      ],
    },
  },
})
