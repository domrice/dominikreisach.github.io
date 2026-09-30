# [dominikreisach.xyz](https://www.dominikreisach.xyz)

Static site built with Nuxt 4, Nuxt UI and Nuxt Content.

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.4-000?logo=bun&logoColor=white)
![License](https://img.shields.io/static/v1?label=code&message=MIT&color=green)
![License](https://img.shields.io/static/v1?label=content&message=All%20Rights%20Reserved&color=red)

## Develop

```sh
bun install
bun run dev        # http://localhost:3000
```

## Build

```sh
bun run generate   # static site → .output/public
bun run preview    # serve the build locally
```

Pushing to `main` deploys to GitHub Pages.

## Content

All content lives in `content/` as Markdown/YAML, and media in `public/imgs/<project>/`.

| Path | What |
| --- | --- |
| `content/work/*.md` | Projects |
| `content/publications/*.yml` | Publications |
| `content/pitch/*.md` | Unlisted pages at `/pitch/<slug>` |

## License

- Code (Nuxt, Vue, TypeScript, CSS): [MIT](LICENSE-MIT)
- Content (images, text, videos): All Rights Reserved, see [LICENSE](LICENSE)
