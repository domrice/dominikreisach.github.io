<script setup lang="ts">
// the three destinations, in reading order, each taking the next pair of the
// global six. `place` is the grid choreography: they alternate sides at `lg`,
// and `order-last` keeps "selected work" at the bottom of the single column on
// phones while it sits third on the two-column desktop grid.
const destinations = [
  {
    to: "/about",
    label: "about",
    grad: grads[1],
    place: "lg:justify-self-end order-2",
  },
  {
    to: "/work",
    label: "selected work",
    grad: grads[2],
    place: "lg:justify-self-start order-last lg:order-3",
  },
  {
    to: "/publications",
    label: "publications",
    grad: grads[3],
    // text-align inherits, so the wrapper carries it: same wrapped line as before
    place: "lg:justify-self-end order-3 lg:order-4 text-right",
  },
];

// the home page is exactly one screen and carries no footer — the `bare` layout
// drops it, which is what makes the full-viewport entry hold
definePageMeta({ layout: "bare" });

// the home page *is* the name — opt out of the template rather than repeat it
usePageSeo({
  title: "dominik reisach",
  bare: true, // the home page *is* the name — appending it would say it twice
  description:
    "Computational engineer and software developer specializing in geometry processing, computer vision, and digital fabrication.",
});

// the site's one structured-data record: who this portfolio is about.
// `scrollbar-hide` is scoped here rather than site-wide: this page is the only
// one that can't scroll, so it's the only one where the bar is pure noise —
// everywhere else it's the affordance that says there is more below. `tall:`
// (main.css) qualifies "can't scroll": below 480px of viewport height the entry
// stack no longer fits, so the bar comes back rather than hiding the overflow.
useHead({
  htmlAttrs: { class: "tall:scrollbar-hide" },
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Dominik Reisach",
        url: "https://dominikreisach.xyz/",
        jobTitle: "Computational Engineer and Software Developer",
        affiliation: {
          "@type": "Organization",
          name: "ETH Zurich",
          url: "https://ethz.ch/en",
        },
        identifier: "https://orcid.org/0000-0002-2101-3463",
        sameAs: [
          "https://www.github.com/dominikreisach",
          "https://www.linkedin.com/in/dominik-reisach",
          "https://scholar.google.com/citations?user=sP_DuvgAAAAJ",
          "https://orcid.org/0000-0002-2101-3463",
        ],
      }),
    },
  ],
});
</script>

<template>
  <header class="text-4xl md:text-5xl lg:text-6xl">
    <!-- `min-h-dvh`, not `h-dvh`: the `1fr` row still absorbs all the slack, so a
         normal viewport renders identically — but a short one lets the stack push
         past the fold and scroll instead of clipping the last destination off it -->
    <nav
      class="grid min-h-dvh p-9 lg:p-12 grid-rows-1 gap-y-6 lg:gap-y-0 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2"
    >
      <!-- the name is the document's h1, not a link: this *is* /. It keeps the latent
           colour anyway — on this page the name is the subject, not a destination.
           `self-start` keeps the box on the glyphs: as a grid item it would otherwise
           stretch down the row and take the hover with it -->
      <h1
        class="self-start justify-self-center lg:justify-self-start order-1"
        :class="[clipGrad.r, grads[0]]"
      >
        dominik reisach
      </h1>
      <!-- `py-2.5` on the anchors, not the wrappers: vertical padding on a
           non-replaced inline element grows the hit box without touching the line
           box, so the 24px `text-2xl` targets reach WCAG 2.5.8's 44px on phones
           with zero layout change. 20px of the 24px `gap-y-6` is consumed, leaving
           a 4px dead zone between them — the same reclamation `SiteFooter` does
           with `-my-3`, minus the negative margin, since nothing here is padded. -->
      <div
        v-for="d in destinations"
        :key="d.to"
        class="justify-self-center"
        :class="d.place"
      >
        <NuxtLink
          :to="d.to"
          class="text-2xl md:text-4xl lg:text-6xl py-2.5"
          :class="[clipGrad.r, d.grad]"
          >{{ d.label }}</NuxtLink
        >
      </div>
    </nav>
  </header>
</template>
