import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// One Markdown file per project in content/work/. Body = description prose only;
// everything structured (meta line, credits, hero, gallery) lives in frontmatter.
// stills by extensionless /imgs/... basename (source in src/assets/imgs, see utils/images.ts),
// clips by their /imgs/....webm path (public/imgs, see scripts/video.mjs)
const item = z.object({
  src: z.string(),
  portrait: z.boolean().optional(),
  credit: z.string().optional(),
  alt: z.string().optional(), // what the image shows; a credit is attribution, not a description
})

// pitch: a plain string, or an object for portrait/credited items. Alt may be absent:
// a pitch `credit` is a descriptive caption, announced with the image already
const media = z.array(z.union([z.string().transform((src) => ({ src })), item]))

// work: alt is required, so a missing description fails the build
const described = item.extend({ alt: z.string().min(1) })

// palette index into utils/grads.ts
const grad = z.literal([0, 1, 2, 3, 4, 5])

// plain string when the name carries no link, object when it does
const person = z.union([
  z.string().transform((name): { name: string; url?: string } => ({ name })),
  z.object({ name: z.string(), url: z.string().optional() }),
])

export const collections = {
  work: defineCollection({
    loader: glob({ base: './content/work', pattern: '*.md' }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(), // meta/og description; first sentence of the body
      order: z.number(),
      thumb: z.string(), // grid card image: basename without extension, like every still
      grad,
      category: z.enum(['computation', 'design', 'misc']), // grid section; order within it comes from `order`
      hero: described.optional(), // top image basename, or a .webm
      media: z.array(described).optional(), // gallery below the text
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
    loader: glob({ base: './content/pitch', pattern: '*.md' }),
    schema: z.object({
      lang: z.enum(['en', 'de']).default('en'), // picks the fixed strings in utils/pitchText.ts
      grad: grad.default(0),
      recipient: z.string().optional(), // document title; falls back to the slug
      intro: z.string(), // "about me" blurb, markdown
      projects: z.array(z.object({ title: z.string(), blurb: z.string(), media })),
      closing: z.object({ title: z.string(), text: z.string() }).optional(),
    }),
  }),

  // One YAML file per paper in content/publications/. No body, no route — the
  // page renders a flat list, so this is a data collection, not a page one.
  publications: defineCollection({
    loader: glob({ base: './content/publications', pattern: '*.yml' }),
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
      // both optional: a forthcoming paper has no DOI to link yet, and `status`
      // is authored per file rather than derived from an empty `links`, so a
      // published paper awaiting its DOI is never labelled as unpublished
      status: z.string().optional(), // "in press"
      links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
      bibtex: z.string().optional(), // copied to the clipboard, not downloaded
    }),
  }),
}
