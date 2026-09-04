<template>
  <div class="relative min-h-screen w-full">
    <CloseLink :grad="grads[3]" />
    <main
      class="grid grid-cols-1 gap-12 mx-auto max-w-6xl pt-20 lg:pt-36 pb-6 px-6 lg:px-12 text-pretty text-sm lg:text-base"
    >
      <h1 class="sr-only">publications</h1>
      <article
        v-for="p in publications"
        :key="p.title"
        class="flex flex-col lg:flex-row outline outline-1 group bg-black/80"
      >
        <!-- the column stretches to the card's height, so above `lg` the 16:9 thumb
             crops to fill it rather than leaving a black band under a taller text
             column. Below `lg` the parent height is auto, `h-full` resolves to auto
             and the thumb keeps its full frame. `contents` lets the <img> be the
             flex item — <picture> is a box that would swallow the stretch. -->
        <div class="basis-2/5 flex-initial">
          <picture class="contents">
            <source :srcset="`${p.thumb}.avif`" type="image/avif" />
            <!-- decorative: the h2 beside it already announces the title -->
            <img
              :src="`${p.thumb}.jpg`"
              alt=""
              v-bind="sizeAttrs(p.thumb)"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div class="flex flex-col gap-3 m-6 justify-center basis-3/5">
          <h2 class="text-lg lg:text-xl">{{ p.title }}</h2>
          <p>
            <template v-for="(a, i) in p.authors" :key="a.name"
              ><span v-if="i">, </span
              ><span :class="a.me && hl"
                >{{ a.name }}<sup v-if="a.mark">{{ mark[a.mark] }}</sup></span
              ></template
            >
          </p>
          <!-- cite is the venue's element; not-italic keeps the single-style system -->
          <p>
            <cite class="not-italic">{{ p.venue }}</cite>
          </p>
          <!-- authored per file, never derived from a missing link row: a paper
               whose DOI simply isn't pasted in yet must not read as unpublished -->
          <p
            v-if="p.status"
            class="uppercase tracking-widest text-xs text-white/60"
          >
            {{ p.status }}
          </p>
          <!-- gap owns the rhythm, so no whitespace ever lands inside an
               underline; the middot is decoration, hidden from the reading order -->
          <div
            v-if="p.links?.length"
            class="flex flex-wrap items-baseline gap-x-2 gap-y-1"
          >
            <template v-for="(l, i) in p.links" :key="l.href">
              <span v-if="i" aria-hidden="true" class="text-white/50">·</span>
              <a
                :class="[linkClass, linkGrad(i)]"
                v-bind="external"
                :href="l.href"
                >{{ l.label }}</a
              >
            </template>
          </div>
        </div>
      </article>
      <!-- a legend, not prose: two terms at label size, so this is the system's
           one case inversion. uppercase via CSS keeps the source lowercase -->
      <dl
        class="flex flex-wrap gap-x-9 gap-y-1 uppercase tracking-widest text-xs text-white/60"
      >
        <div
          v-for="l in legend"
          :key="l.glyph"
          class="flex items-baseline gap-2"
        >
          <dt>
            <sup>{{ l.glyph }}</sup>
          </dt>
          <dd>{{ l.term }}</dd>
        </div>
      </dl>
    </main>
  </div>
</template>

<script setup lang="ts">
// author highlight: the six-pair blue-pink-yellow sweep, driven by the card's group
const hl = `${clipGrad.group.r} ${grads[4]}`;
// Link Cycle Rule, started on pair 3 so a card's first link doesn't repeat the close glyph
const linkGrad = (i: number) => gradCycle(i + 3);

const mark = { first: "○", super: "△" };

// the legend reads its glyphs from `mark`, so the key and the superscripts
// beside the author names cannot drift apart
const legend = [
  { glyph: mark.first, term: "joint first authorship" },
  { glyph: mark.super, term: "joint supervision" },
];

usePageSeo({
  title: "publications",
  description: "Publications and conference contributions by Dominik Reisach.",
});

// DB sorts newest-first; toSorted is stable, so hoisting the highlight keeps
// date order intact in both groups
const { data: publications } = await useAsyncData(
  "publications-list",
  async () =>
    (
      await queryCollection("publications").order("date", "DESC").all()
    ).toSorted((a, b) => +!!b.highlight - +!!a.highlight),
);
</script>
