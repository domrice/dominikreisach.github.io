// Generates the whole icon set in public/ from ONE source: the 16x16 pixel map below,
// which is the mark that has always shipped as favicon.ico — white lowercase "dr" on
// brand-pink. Every size is an integer multiple of the grid (or an exact division of
// one), so the monogram stays crisp instead of being resampled into mush.
// Rerun after changing MARK: `node scripts/icons.mjs`
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const PINK = '#f92f8b' // brand-pink, the mark's ground since the first favicon
const WHITE = '#ffffff'

// prettier-ignore
const MARK = [
  '................',
  '................',
  '................',
  '.......#........',
  '.......#........',
  '.......#........',
  '.......#........',
  '.......#........',
  '...#####.####...',
  '...#...#.#......',
  '...#...#.#......',
  '...#...#.#......',
  '...#####.#......',
  '................',
  '................',
  '................',
]
const N = MARK.length

// crispEdges so the tab favicon lands on the pixel grid the mark was drawn on
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N}" shape-rendering="crispEdges">
  <rect width="${N}" height="${N}" fill="${PINK}"/>
  <path fill="${WHITE}" d="${MARK.flatMap((r, y) => [...r].map((c, x) => (c === '#' ? `M${x} ${y}h1v1h-1z` : ''))).join('')}"/>
</svg>
`
writeFileSync('public/favicon.svg', svg)
console.log('public/favicon.svg')

// P3 PPM: the map as literal pixels, so no rasteriser gets a say in the geometry
const base = '/tmp/dr-mark.ppm'
const px = MARK.flatMap(row => [...row].map(c => (c === '#' ? '255 255 255' : '249 47 139')))
writeFileSync(base, `P3\n${N} ${N}\n255\n${px.join('\n')}\n`)

// -filter point = nearest neighbour: an integer scale of a pixel drawing has one correct
// answer, and it is not interpolation
/** @param {string} src @param {number} mult @param {string} out @param {string[]} extra */
const grow = (src, mult, out, extra = []) => {
  execFileSync('magick', [src, '-filter', 'point', '-resize', `${mult * 100}%`, ...extra, '-strip', out])
  console.log(out)
}

// 48 is 3x the grid and divides evenly by 16 and 32, so all three ico frames stay exact.
// -colors 2 keeps it a two-entry palette, which is the whole image — 15 KB of truecolour
// frames for a two-colour monogram would be silly.
grow(base, 3, 'public/favicon.ico', ['-colors', '2', '-define', 'icon:auto-resize=48,32,16'])
grow(base, 12, 'public/icon-192.png') // manifest, Android home screen
grow(base, 32, 'public/icon-512.png') // manifest, splash and install dialogs

// 180 is not a multiple of 16, so go crisp to 720 (45x) and box-average down by exactly 4:
// every stem lands on the same 11.25px, which nearest-neighbour at 180 could not promise
grow(base, 45, 'public/apple-touch-icon.png', ['-filter', 'box', '-resize', '180x180'])

// Android masks icons to its own shape and only guarantees the central 80%. The mark fills
// 62.5% of the grid, whose corners sit exactly on that boundary — a 20-unit grid drops it
// to 50% and puts the descender corners comfortably inside: 2 grid units of border at 32x.
grow(base, 32, 'public/icon-maskable-512.png', ['-bordercolor', PINK, '-border', '64', '-filter', 'box', '-resize', '512x512'])

// display: browser — the icons are for a home-screen shortcut, not an app shell.
// theme/background are the site's ground, so a shortcut opens into black, not white.
writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'dominik reisach',
      short_name: 'dominik reisach',
      description: 'Computational engineer and software developer.',
      start_url: '/',
      display: 'browser',
      theme_color: '#000000',
      background_color: '#000000',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  ) + '\n',
)
console.log('public/site.webmanifest')
