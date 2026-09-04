import { writeFile } from 'node:fs/promises'
import { readdirSync } from 'node:fs'

const SITE = 'https://dominikreisach.xyz'

// pitch pages are linked from nowhere, so crawlLinks never finds them — list them explicitly
const pitches = readdirSync('content/pitch').map(f => `/pitch/${f.replace(/\.md$/, '')}`)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  // single source for the origin, shared by the sitemap hook and usePageSeo
  runtimeConfig: { public: { site: SITE } },
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
          // GitHub Pages 301s /about -> /about/, so emit the form it actually serves
          .map(r => `  <url><loc>${SITE}${r.endsWith('/') ? r : r + '/'}</loc><lastmod>${today}</lastmod></url>`)
        await writeFile(
          '.output/public/sitemap.xml',
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
        )
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en', class: 'motion-safe:scroll-smooth font-titillium' },
      title: 'dominik reisach',
      // every page sets a bare, lowercase title; the name is appended here once
      titleTemplate: '%s · dominik reisach',
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Dominik Reisach: Personal Portfolio Website' },
        { name: 'author', content: 'Dominik Reisach' },
        { name: 'keywords', content: 'architecture, research, design, digital fabrication, computational design, portfolio, personal website' },
        // the site's ground, so browser chrome and a home-screen launch stay black
        { name: 'theme-color', content: '#000000' },
        // without this iOS labels the shortcut with the full document title
        { name: 'apple-mobile-web-app-title', content: 'dominik reisach' },
      ],
      link: [
        // the whole set comes from one 16x16 pixel map — see scripts/icons.mjs.
        // SVG first for browsers that take it, .ico as the universal fallback
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', sizes: '48x48 32x32 16x16', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // body copy is the first thing painted — preload it so text doesn't swap in late
        { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: '/fonts/titillium-web-v17-latin-regular.woff2' },
      ],
    },
  },
})
