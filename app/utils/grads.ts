// Brand gradient pairs. Index matches the `grad` field in content/work/*.md frontmatter.
// Literal class strings so Tailwind's static extractor picks them up.
export const grads = [
  "from-brand-pink to-brand-yellow",
  "from-brand-yellow to-brand-purple",
  "from-brand-purple to-brand-blue",
  "from-brand-blue to-brand-pink",
  "from-brand-blue via-brand-pink to-brand-yellow",
  "from-brand-yellow via-brand-pink to-brand-blue",
];

// same pairs, scoped to <a> inside rendered markdown (no typography plugin here,
// so use the native descendant variant rather than prose-a:)
export const proseGrads = [
  "[&_a]:from-brand-pink [&_a]:to-brand-yellow",
  "[&_a]:from-brand-yellow [&_a]:to-brand-purple",
  "[&_a]:from-brand-purple [&_a]:to-brand-blue",
  "[&_a]:from-brand-blue [&_a]:to-brand-pink",
  "[&_a]:from-brand-blue [&_a]:via-brand-pink [&_a]:to-brand-yellow",
  "[&_a]:from-brand-yellow [&_a]:via-brand-pink [&_a]:to-brand-blue",
];

// `bg-clip-text` clips the gradient to the *padding* box, and the display sizes run at
// line-height 1, whose box is shorter than the em box — so descenders (g, y, p) lose
// their tips the moment the sweep lands. Extend the box past them and cancel the growth
// with an equal negative margin: the fill is complete and nothing moves. Bottom only —
// a top pad would push the glyphs down inside the box, and it also survives the flex
// item in CloseLink, where a negative top margin *would* shift the glyph. Unconditional
// rather than hover-only, so there is no reflow mid-sweep.
const clipBox = "pb-[0.2em] -mb-[0.2em]";

// WCAG 2.4.7: the gradient sweep is not a focus indicator. It can *reduce* contrast
// (brand-purple is 3.20:1 on black) and it is not a change in presence, only in hue —
// so every focusable element in the system also draws a ring. 2px matches the two
// instances that already shipped it (the work tile, the footer icons) and clears
// 2.4.11's minimum; the offset is outward because these are bare glyphs on black,
// where the tile's inset ring would land on the image instead. It rides on the
// clipBox padding, which is what the descenders occupy anyway, so the ring tracks
// the em box rather than the shorter line box.
const ring =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// for a wrapper that owns the hit area while a child span owns the gradient
// (`clipGrad.group.*`): a span is never focused, so the ring cannot live in that
// string. DESIGN.md -> Close Control states the anchor owns hit area *and* focus ring.
export const focusRing = ring;

// The Latent Colour Rule as one string: white at rest, glyphs fade into the gradient
// pair on hover or keyboard focus and fade back out. Pair with grads[i] for the colours.
// Keyed by sweep direction; both spellings stay literal so Tailwind's extractor sees them.
export const clipGrad = {
  r:
    `${clipBox} ${ring} ` +
    "hover:bg-linear-to-r hover:bg-clip-text hover:text-transparent focus-visible:bg-linear-to-r focus-visible:bg-clip-text focus-visible:text-transparent duration-300",
  l:
    `${clipBox} ${ring} ` +
    "hover:bg-linear-to-l hover:bg-clip-text hover:text-transparent focus-visible:bg-linear-to-l focus-visible:bg-clip-text focus-visible:text-transparent duration-300",
  // the same sweep driven by an ancestor `group`, for glyphs that are not
  // themselves interactive: the anchor owns the hit area and the focus, the glyph
  // owns the gradient (the author highlight on a publication card, the close glyph)
  group: {
    r:
      `${clipBox} ` +
      "group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:text-transparent group-focus-visible:bg-linear-to-r group-focus-visible:bg-clip-text group-focus-visible:text-transparent duration-300",
    l:
      `${clipBox} ` +
      "group-hover:bg-linear-to-l group-hover:bg-clip-text group-hover:text-transparent group-focus-visible:bg-linear-to-l group-focus-visible:bg-clip-text group-focus-visible:text-transparent duration-300",
  },
};

// site-wide link treatment: underline at rest, the clip gradient on interaction
export const linkClass = `underline ${clipGrad.r}`;

// The Link Cycle Rule: a run of sibling links steps through the two-colour pairs in
// order of position, so two neighbours never sweep into the same key. Pass the index
// within the run; it wraps. Add a constant to start the run on a different pair.
// Only the first four: grads[4] and grads[5] are the three-stop sweeps, reserved for
// the moments that earn them (the author highlight, the footer bar, pitch headings).
export const gradCycle = (i: number) => grads[i % 4]!;

// same, scoped to <a> inside rendered markdown (no typography plugin here,
// so use the native descendant variant rather than prose-a:)
// markdown links were the one link kind with no keyboard state at all: no ring, and
// not even the sweep, so a `focus-visible` block is added here rather than only a ring
export const proseLinkClass =
  "[&_a]:pb-[0.2em] [&_a]:-mb-[0.2em] [&_a]:underline [&_a]:duration-300 [&_a]:hover:bg-linear-to-r [&_a]:hover:bg-clip-text [&_a]:hover:text-transparent [&_a]:focus-visible:bg-linear-to-r [&_a]:focus-visible:bg-clip-text [&_a]:focus-visible:text-transparent [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-white";
