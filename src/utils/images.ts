import type { ImageMetadata, ImageOutputFormat } from "astro";

// Every still has one best-quality source in src/assets/imgs/ (the q94–99 JPG, or
// the AVIF for thumbs and posters, which never had anything better). Frontmatter
// keeps naming it by the extensionless /imgs/... basename it always used, so the
// glob is re-keyed to that. Videos still live under public/imgs/ by the same path.
const files = import.meta.glob<ImageMetadata>("../assets/imgs/**/*.{jpg,avif}", {
  eager: true,
  import: "default",
});
const stills = Object.fromEntries(
  Object.entries(files).map(([k, v]) => [k.slice("../assets".length).replace(/\.\w+$/, ""), v]),
);

// content is authored by hand: a typo should name itself, not fail as "expected an image"
export const still = (src: string) => {
  const img = stills[src];
  if (!img) throw new Error(`no image source for ${src} in src/assets/imgs/`);
  return img;
};

// One strategy for every <Picture>: AVIF for every browser that has it, a mozjpeg JPG
// (astro.config) for the ones that don't — both at the same widths, so a legacy phone
// still gets a phone-sized file, and a modern one never downloads the fallback.
// Astro drops widths above the source's own, so a 1080px thumb tops out at 1080.
// 1280 is there for 3× phones (342px × 3 ≈ 1026); 1920 for 2× laptops (928px × 2).
export const picture: { formats: ImageOutputFormat[]; fallbackFormat: ImageOutputFormat; widths: number[] } = {
  formats: ["avif"],
  fallbackFormat: "jpg",
  widths: [640, 960, 1280, 1920],
};
