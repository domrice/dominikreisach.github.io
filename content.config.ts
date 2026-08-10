import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// One Markdown file per project in content/work/. Body = description prose only;
// everything structured (meta line, credits, hero, gallery) lives in frontmatter.
// paths under /imgs, .jpg/.avif pairs by basename or .webm; object form only for portrait/credited items
const media = z.array(
  z.union([
    z.string(),
    z.object({ src: z.string(), portrait: z.boolean().optional(), credit: z.string().optional() }),
  ]),
)

// plain string when the name carries no link, object when it does
const person = z.union([z.string(), z.object({ name: z.string(), url: z.string().optional() })])

export default defineContentConfig({
  collections: {
    work: defineCollection({
      type: 'page',
      source: 'work/**.md',
      schema: z.object({
        title: z.string(),
        order: z.number(),
        thumb: z.string(), // grid card image
        grad: z.number(), // palette index into utils/grads.ts (0-5)
        category: z.enum(['computation', 'design', 'misc']), // grid section in pages/work/index.vue; order within it comes from `order`
        hero: z.union([z.string(), z.object({ src: z.string(), credit: z.string().optional() })]).optional(), // top image basename (avif+jpg)
        media: media.optional(), // gallery below the text
        type: z.string().optional(), // "Design–Build Project"
        year: z.number().optional(),
        place: z.string().optional(), // "ETH Zurich, D-ARCH & D-BAUG"
        credits: z.array(z.object({ role: z.string(), people: z.array(person) })).optional(),
      }),
    }),

    // One Markdown file per pitch in content/pitch/. Route = /pitch/<filename>.
    // Standalone by design: each pitch carries its own project titles, blurbs, and
    // media picks so it can be framed for one recipient. Body unused.
    pitch: defineCollection({
      type: 'page',
      source: 'pitch/*.md',
      schema: z.object({
        lang: z.enum(['en', 'de']).default('en'), // picks the fixed strings in utils/pitchText.ts
        grad: z.number().default(0), // palette index into utils/grads.ts (0-5)
        intro: z.string(), // "about me" blurb, markdown
        projects: z.array(z.object({ title: z.string(), blurb: z.string(), media })),
        closing: z.object({ title: z.string(), text: z.string() }).optional(),
      }),
    }),

    // One YAML file per paper in content/publications/. No body, no route — the
    // page renders a flat list, so this is a data collection, not a page one.
    publications: defineCollection({
      type: 'data',
      source: 'publications/*.yml',
      schema: z.object({
        title: z.string(),
        date: z.string(), // "YYYY-MM" — sorts lexicographically = chronologically
        highlight: z.boolean().optional(), // pin first, above the date sort
        thumb: z.string(),
        venue: z.string(),
        authors: z.array(
          z.object({
            name: z.string(),
            me: z.boolean().optional(), // gradient highlight on card hover
            mark: z.enum(['first', 'super']).optional(), // ○ joint first authorship / △ joint supervision
          }),
        ),
        links: z.array(z.object({ label: z.string(), href: z.string() })),
      }),
    }),
  },
})
