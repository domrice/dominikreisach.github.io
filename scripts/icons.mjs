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

// greedy maximal rectangles: widest run first, then as far down as that exact run holds.
// 29 lit pixels collapse to 6 rects, which is what keeps the SVG a few hundred bytes.
const rects = (grid) => {
  const seen = grid.map(r => [...r].map(() => false))
  const out = []
  const lit = (x, y) => grid[y][x] === '#' && !seen[y][x]
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++) {
      if (!lit(x, y)) continue
      let w = 0, h = 1
      while (lit(x + w, y)) w++
      while (y + h < grid.length && [...Array(w)].every((_, i) => lit(x + i, y + h))) h++
      for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++) seen[y + dy][x + dx] = true
      out.push({ x, y, w, h })
    }
  return out
}

// crispEdges so the tab favicon lands on the pixel grid the mark was drawn on
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N}" shape-rendering="crispEdges">
  <rect width="${N}" height="${N}" fill="${PINK}"/>
  <path fill="${WHITE}" d="${rects(MARK).map(r => `M${r.x} ${r.y}h${r.w}v${r.h}h-${r.w}z`).join('')}"/>
</svg>
`
writeFileSync('public/favicon.svg', svg)
console.log('public/favicon.svg')

// P3 PPM: the map as literal pixels, so no rasteriser gets a say in the geometry
const ppm = (grid) => {
  const n = grid.length
  const px = grid.flatMap(row => [...row].map(c => (c === '#' ? '255 255 255' : '249 47 139')))
  writeFileSync('/tmp/dr-mark.ppm', `P3\n${n} ${n}\n255\n${px.join('\n')}\n`)
  return '/tmp/dr-mark.ppm'
}
const base = ppm(MARK)

// -filter point = nearest neighbour: an integer scale of a pixel drawing has one correct
// answer, and it is not interpolation
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
grow(base, 45, '/tmp/dr-mark-720.png')
execFileSync('magick', ['/tmp/dr-mark-720.png', '-filter', 'box', '-resize', '180x180', '-strip', 'public/apple-touch-icon.png'])
console.log('public/apple-touch-icon.png')

// Android masks icons to its own shape and only guarantees the central 80%. The mark fills
// 62.5% of the grid, whose corners sit exactly on that boundary — a 20-unit grid drops it
// to 50% and puts the descender corners comfortably inside.
const pad = 2
const padded = MARK.map(r => '.'.repeat(pad) + r + '.'.repeat(pad))
const framed = [...Array(pad).fill('.'.repeat(N + 2 * pad)), ...padded, ...Array(pad).fill('.'.repeat(N + 2 * pad))]
grow(ppm(framed), 32, '/tmp/dr-mark-maskable.png') // 20 * 32 = 640
execFileSync('magick', ['/tmp/dr-mark-maskable.png', '-filter', 'box', '-resize', '512x512', '-strip', 'public/icon-maskable-512.png'])
console.log('public/icon-maskable-512.png')

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
