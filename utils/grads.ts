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

// site-wide link treatment: underline, hover fades text into the gradient
export const linkClass =
  "underline hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent duration-300";

// same, scoped to <a> inside rendered markdown — pair with proseGrads[grad] for the colors
export const proseLinkClass =
  "[&_a]:underline [&_a]:hover:bg-linear-to-r [&_a]:hover:bg-clip-text [&_a]:hover:text-transparent [&_a]:duration-300";
