// Ensures every work-grid thumbnail has a .jpg twin beside its .avif, so the
// grid degrades on the browsers that never shipped AVIF (Safari ≤15, Edge <121,
// Firefox <93) instead of rendering eleven blank squares — the tile label is
// hidden at rest on pointer devices, so a missing image leaves no text either.
// Encoded from the .avif rather than from a full-size source: the .avif is what
// ships, so the fallback is guaranteed to be the same crop at the same size.
// Rerun after adding a thumb, then `node scripts/media-size.mjs`:
//   node scripts/thumb-jpg.mjs
import { execFileSync } from 'node:child_process'
import { existsSync, globSync } from 'node:fs'

// q80 matches the site's other fallbacks; -strip drops the AVIF's metadata block
for (const avif of globSync('public/imgs/*/*_thumb.avif').sort()) {
  const jpg = avif.replace(/\.avif$/, '.jpg')
  if (existsSync(jpg)) continue
  execFileSync('magick', [avif, '-strip', '-quality', '80', jpg])
  console.log(`wrote ${jpg}`)
}
