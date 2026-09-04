// Lists every hero/gallery item that has no `alt:` yet, so the descriptions can be
// written in one sitting, and doubles as the frontmatter parse check: an unquoted
// ": " inside a plain scalar is invalid YAML and either breaks the prerender or
// silently drops a project's media and credits. Reported here rather than thrown,
// so one bad file cannot hide the alt worklist for the other ten.
// Run: node scripts/alt-todo.mjs
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { parse } from 'yaml'

// a placeholder is worse than no alt: it asserts a description exists and delivers
// noise to a screen reader, and a truthy value would otherwise mark the item done here
const PLACEHOLDER = /^(alt text here|add alt|todo|tbd|image|photo)$/i

const files = globSync('content/{work,pitch}/*.md').sort()
let n = 0
const broken = []
for (const f of files) {
  let fm
  try {
    fm = parse(readFileSync(f, 'utf8').split('---')[1])
  } catch (e) {
    broken.push([f, e.message.split('\n')[0]])
    continue
  }
  const items = []
  const push = (m, kind) => items.push({ kind, ...(typeof m === 'string' ? { src: m } : m) })
  if (fm.hero) push(fm.hero, 'hero')
  for (const m of fm.media ?? []) push(m, 'gallery')
  for (const p of fm.projects ?? []) for (const m of p.media ?? []) push(m, `pitch · ${p.title}`)
  const todo = items.filter((i) => !i.alt || PLACEHOLDER.test(i.alt.trim()))
  if (!todo.length) continue
  console.log(`\n${f}`)
  for (const i of todo) {
    n++
    const flag = i.alt ? 'PLACEHOLDER ' : ''
    console.log(`  ${i.kind.padEnd(11)} ${i.src.padEnd(52)} ${flag}${i.credit ?? ''}`)
  }
}
console.log(`\n${n} items without alt`)

if (broken.length) {
  console.log(`\n${broken.length} file(s) with unparseable frontmatter:`)
  for (const [f, msg] of broken) console.log(`  ${f}\n    ${msg}`)
  process.exitCode = 1
}
