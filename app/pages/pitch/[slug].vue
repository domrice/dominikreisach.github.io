<template>
  <div v-if="doc">
    <main class="mx-auto max-w-5xl px-6 lg:px-12">
      <!-- a pitch opens straight into "about me"; the h1 names whose pitch it is -->
      <h1 class="sr-only">dominik reisach</h1>
      <!-- D3: every section is a gapped column — `py-20` stays padding, not gap,
           because it is what centres the `border-t` rule between two sections. -->
      <!-- about me -->
      <section :class="sectionClass">
        <h2 :class="headingClass">
          <span :class="[headingGrad, grads[doc.grad]]">{{ t.about }}</span>
        </h2>
        <div
          class="text-2xl lg:text-3xl text-white leading-relaxed text-pretty bg-black/80 rounded-md p-6"
          :class="[proseLinkClass, proseGrads[doc.grad]]"
        >
          <MDC :value="doc.intro" />
        </div>
      </section>

      <!-- featured projects -->
      <section :class="[sectionClass, rule]">
        <h2 :class="headingClass">
          <span :class="[headingGrad, grads[5]]">{{ t.projects }}</span>
        </h2>

        <!-- the projects are their own gapped column so the section gap can stay the
             heading distance every other section uses; 80px separates two projects -->
        <div class="flex flex-col gap-20">
          <div
            v-for="p in doc.projects"
            :key="p.title"
            class="flex flex-col gap-8"
          >
            <!-- title and blurb are one group: tighter to each other than to the media -->
            <div class="flex flex-col gap-6">
              <h3 class="text-2xl lg:text-4xl text-white">{{ p.title }}</h3>
              <div
                class="text-lg lg:text-xl text-white text-pretty lg:text-justify bg-black/80 rounded-md p-6"
                :class="[proseLinkClass, proseGrads[doc.grad]]"
              >
                <MDC :value="p.blurb" />
              </div>
            </div>
            <!-- landscape spans both columns, portrait takes one so pairs share a row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <MediaFigure
                v-for="m in p.media.map(item)"
                :key="m.src"
                v-bind="m"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- closing -->
      <section v-if="doc.closing" :class="[sectionClass, rule]">
        <h2 :class="headingClass">
          <span :class="[headingGrad, grads[4]]">{{ doc.closing.title }}</span>
        </h2>
        <blockquote
          class="text-2xl lg:text-3xl text-white leading-relaxed text-pretty bg-black/80 rounded-md p-6"
        >
          {{ doc.closing.text }}
        </blockquote>
      </section>

      <!-- contact -->
      <section :class="[sectionClass, rule, 'text-center']">
        <h2 :class="headingClass">
          <span :class="[headingGrad, grads[5]]">{{ t.contact }}</span>
        </h2>
        <!-- same faded panel as the copy blocks above, so the p5 canvas doesn't wash it out -->
        <div
          class="bg-black/80 rounded-md p-8 flex flex-col items-center gap-8"
        >
          <p
            v-if="t.contactText"
            class="text-xl lg:text-2xl text-white/80 leading-relaxed"
          >
            {{ t.contactText }}
          </p>
          <!-- gap, not space-x: the 44px boxes below carry their own side padding,
               so the *visual* distance between glyphs is gap + that padding. gap-5
               lands it back on the 32px this row read as before it grew. -->
          <ul class="flex justify-center gap-5 lg:gap-6">
            <li v-for="s in socials" :key="s.href">
              <a
                :class="[socialIcon, focusRing]"
                :href="s.href"
                v-bind="isExternal(s.href) ? external : undefined"
                :aria-label="
                  isExternal(s.href) ? `${s.label} (${t.newTab})` : s.label
                "
              >
                <!-- the icon carries no accessible name of its own; the anchor's label does -->
                <svg
                  :class="socialGlyph"
                  xmlns="http://www.w3.org/2000/svg"
                  :viewBox="s.viewBox"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path :d="s.path" />
                </svg>
              </a>
            </li>
          </ul>
          <!-- pitches are opened from a direct link, so there is nothing to go "back" to —
             offer the rest of the site at the end instead of a close button at the top -->
          <NuxtLink
            to="/"
            class="text-xl lg:text-2xl text-white"
            :class="[clipGrad.r, grads[5]]"
            >{{ t.explore }} →</NuxtLink
          >
        </div>
        <!-- the section gap owns this distance now; `pt-20` on top of it would have
             stacked to 144px, where the page only ever showed 80 -->
        <div class="text-sm text-white/60">
          © {{ new Date().getFullYear() }} Dominik Reisach. {{ t.rights }}
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
type Media = { src: string; portrait?: boolean; credit?: string };
const item = (m: string | Media): Media =>
  typeof m === "string" ? { src: m } : m;

// D2: the anchor was inline and 32px tall — the glyph *was* the target. It is now
// the box, the glyph is centred in it, and the box never goes below 44px (WCAG 2.5.5).
// `size-11 lg:size-12` rather than SiteFooter's flat size-11: these glyphs are 32/40px
// where the footer's are 16/20px, so at `lg` a 44px box would leave 2px around a 40px
// icon and the focus ring would trace the glyph. 48px keeps a visible margin.
// D1: the anchor is `display: inline`, and transforms are ignored on non-replaced
// inline elements — so the `hover:scale-110` that used to sit here was dead CSS.
// It moved to the <svg>, which *is* replaced, driven from here as `group`. Keeping it
// on the glyph is also what makes the box above safe to add: the ink leans in, the
// hit target stays put.
// `transition-[fill]` rather than `transition`: the ring must appear instantly, not
// fade in over 300ms.
const socialIcon =
  "group inline-flex size-11 lg:size-12 items-center justify-center rounded-sm fill-white hover:fill-brand-pink focus-visible:fill-brand-pink transition-[fill] duration-300 ease-out";

// the lean-in itself. 1.10 is the work tile's figure — the site already means
// "reach for this" with that number. Reduced motion drops the movement and keeps
// the colour: an alternative, not a kill switch.
const socialGlyph =
  "h-8 lg:h-10 transition-transform duration-300 ease-out group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transform-none";

// A3: these headings are the last text on the site that sat bare on the p5 canvas,
// centred — exactly where the never-cleared buffer brightens. The scrim cannot go on
// the same element as the gradient: `bg-clip-text` clips *every* background on the
// element, so a `bg-black/80` alongside `bg-linear-to-r` would be clipped to the
// glyphs and scrim nothing. So the h2 is the plate and an inner span owns the clip —
// the same split the close control uses (box and glyph are different elements).
// The plate is the column, not the glyphs: no `w-fit`, so the flex column stretches
// it to exactly the width of the prose panels and the media grid below it, and
// `rounded-md` + `bg-black/80` + `p-6` are the same three values those panels use.
// A heading plate that hugged its text made every section start on a different edge.
// `text-balance` still governs the wrap, and a long German closing title now has the
// full column to wrap inside.
// D3: `mb-16` moved out of here into `sectionClass`'s gap.
const headingClass =
  "text-4xl lg:text-6xl text-center text-balance bg-black/80 rounded-md p-6";

// D3: this page ran entirely on child margins while every other page uses parent gap.
// `py-20` stays padding on purpose — it is what puts `rule`'s hairline halfway between
// two sections; a gap would leave the border sitting on the content above it.
const sectionClass = "py-20 flex flex-col gap-16";
const rule = "border-t border-brand-pink";

// pb as in `clipBox` (grads.ts): at line-height 1 the clip box cuts the descenders of
// a static gradient heading too. Cancelled by an equal -mb, so the plate does not grow.
const headingGrad =
  "inline-block pb-[0.2em] -mb-[0.2em] bg-linear-to-r bg-clip-text text-transparent";

definePageMeta({ layout: "bare" });

const route = useRoute();
const { data: doc } = await useAsyncData(`pitch-${route.path}`, () =>
  queryCollection("pitch").path(route.path).first(),
);
if (!doc.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Pitch not found",
    fatal: true,
  });

const t = computed(() => pitchText[doc.value!.lang]);

// the reply-to plus the two profiles a pitch recipient actually follows up on.
// `title` is gone: it duplicated the aria-label as a tooltip, and the outbound-link
// rule in main.css already announces the new tab through the label. The same paths
// also live in SiteFooter (which carries five) — one shared source is a job for D6's
// extract pass, not for this one.
const socials = [
  {
    // the address used to be set here as prose, and the visible string had drifted
    // out of sync with its own href. As a glyph it exists once, in the href — the
    // same treatment the footer uses, and the plaintext harvesters grep for is gone.
    href: "mailto:dreams_foodie.3k@icloud.com",
    label: t.value.email,
    viewBox: "0 0 512 512",
    path: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4C504.9 141.3 512 127.1 512 112c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z",
  },
  {
    href: "https://www.github.com/dominikreisach",
    label: "GitHub",
    viewBox: "0 0 496 512",
    path: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
  },
  {
    href: "https://www.linkedin.com/in/dominik-reisach",
    label: "LinkedIn",
    viewBox: "0 0 448 512",
    path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
  },
];

useHead({
  // the recipient is the point of a pitch page; the slug already names them
  title: doc.value.recipient ?? route.path.split("/").pop(),
  // overrides the site-wide lang from nuxt.config for this page only
  htmlAttrs: { lang: doc.value.lang },
  // unlisted by design: sent as a direct link, never indexed
  meta: [{ name: "robots", content: "noindex,nofollow" }],
});
</script>
