// Brand gradient pairs. Index matches the `grad` field in content frontmatter.
// Literal class strings so Tailwind's static extractor picks them up. The hover
// treatment that uses them (`sweep`, `link`, `group-sweep`) lives in main.css.
export const grads = [
  "from-brand-pink to-brand-yellow",
  "from-brand-yellow to-brand-purple",
  "from-brand-purple to-brand-blue",
  "from-brand-blue to-brand-pink",
  "from-brand-blue via-brand-pink to-brand-yellow",
  "from-brand-yellow via-brand-pink to-brand-blue",
] as const;

// same pairs, scoped to <a> inside rendered markdown: Tailwind registers its gradient
// stops as non-inheriting, so the links can't pick them up from the wrapper
export const proseGrads = [
  "[&_a]:from-brand-pink [&_a]:to-brand-yellow",
  "[&_a]:from-brand-yellow [&_a]:to-brand-purple",
  "[&_a]:from-brand-purple [&_a]:to-brand-blue",
  "[&_a]:from-brand-blue [&_a]:to-brand-pink",
  "[&_a]:from-brand-blue [&_a]:via-brand-pink [&_a]:to-brand-yellow",
  "[&_a]:from-brand-yellow [&_a]:via-brand-pink [&_a]:to-brand-blue",
] as const;

// The Link Cycle Rule: a run of sibling links steps through the two-colour pairs in
// order of position, so two neighbours never sweep into the same key. Pass the index
// within the run; it wraps. Add a constant to start the run on a different pair.
// Only the first four: grads[4] and grads[5] are the three-stop sweeps, reserved for
// the moments that earn them (the author highlight, the footer bar, pitch headings).
export const gradCycle = (i: number) => grads[i % 4]!;

// paragraph rhythm and links for rendered markdown
export const prose = "[&_p]:my-5 [&_p]:leading-7 [&_p]:text-pretty [&_a]:link";
