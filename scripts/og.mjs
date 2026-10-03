// Generates the 1200x630 JPG social cards in public/og/ from the project heroes.
// Unfurlers want one fixed-size JPG, not a srcset — hence a card per project.
// Rerun after changing a hero or adding a project: `node scripts/og.mjs`
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const W = 1200, H = 630, BAR = 8 // the footer bar, restated as the card's signature edge
const OUT = 'public/og'
mkdirSync(OUT, { recursive: true })

// blue -> magenta -> amber, the footer sweep from src/utils/grads.ts
const bar = [
  '(', '-size', `${BAR}x600`, 'gradient:#187caa-#f92f8b', '-rotate', '90', ')',
  '(', '-size', `${BAR}x600`, 'gradient:#f92f8b-#fcbe37', '-rotate', '90', ')',
  '+append',
]

// first existing candidate wins; heroes are extensionless basenames whose one source
// (.jpg, or .avif for thumbs) lives in src/assets — see src/utils/images.ts
const pick = (/** @type {(string | undefined)[]} */ ...c) => c.flatMap(p => [`src/assets${p}.jpg`, `src/assets${p}.avif`]).find(existsSync)

/** @param {string} src @param {string} out */
const card = (src, out) => {
  execFileSync('magick', [
    src, '-auto-orient', '-resize', `${W}x${H}^`, '-gravity', 'center', '-extent', `${W}x${H}`,
    '(', ...bar, ')', '-gravity', 'south', '-composite',
    '-quality', '82', '-strip', out,
  ])
  console.log(out)
}

for (const f of readdirSync('content/work').filter(f => f.endsWith('.md'))) {
  const fm = readFileSync(`content/work/${f}`, 'utf8')
  const hero = fm.match(/^hero:\s*\n\s*src:\s*(\S+)/m)?.[1]
  const thumb = fm.match(/^thumb:\s*(\S+)/m)?.[1]
  // a video hero has no still to crop — fall back to the grid thumbnail
  const src = pick(...(hero?.endsWith('.webm') ? [thumb] : [hero, thumb]))
  if (!src) { console.warn(`no image for ${f}`); continue }
  card(src, `${OUT}/${f.replace(/\.md$/, '')}.jpg`)
}

// the site-wide card: the portrait, centre band
card('src/assets/imgs/0000-02_else/dr.jpg', `${OUT}/default.jpg`)
