# [dominikreisach.xyz](https://www.dominikreisach.xyz)

Static site built with Astro and Tailwind.

![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.4-000?logo=bun&logoColor=white)
![License](https://img.shields.io/static/v1?label=code&message=MIT&color=green)
![License](https://img.shields.io/static/v1?label=content&message=All%20Rights%20Reserved&color=red)

## Develop

```sh
bun install
bun run dev        # http://localhost:4321
```

## Build

```sh
bun run build      # static site → dist/
bun run preview    # serve the build locally
```

Pushing to `main` deploys to GitHub Pages.

## Content

All content lives in `content/` as Markdown/YAML. Stills live in `src/assets/imgs/<project>/`
(Astro encodes them at build); clips are encoded from `masters/` into `public/imgs/<project>/`
with `node scripts/video.mjs` (needs `ffmpeg`).

| Path | What |
| --- | --- |
| `content/work/*.md` | Projects |
| `content/publications/*.yml` | Publications |
| `content/pitch/*.md` | Unlisted pages at `/pitch/<slug>` |

## License

- Code (Astro, TypeScript, CSS): [MIT](LICENSE-MIT)
- Content (images, text, videos): All Rights Reserved, see [LICENSE](LICENSE)
