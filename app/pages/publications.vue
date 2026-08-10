<template>
  <div class="relative min-h-screen w-full">
    <CloseLink grad="from-brand-blue to-brand-pink" />
    <div
      class="grid grid-cols-1 gap-12 mx-auto max-w-6xl pt-20 lg:pt-36 pb-6 px-6 lg:px-12 text-pretty text-sm lg:text-base"
    >
      <div
        v-for="p in publications"
        :key="p.title"
        class="flex flex-col lg:flex-row outline outline-1 group bg-black/66"
      >
        <div class="basis-2/5 flex-initial">
          <picture>
            <source :srcset="`${p.thumb}.avif`" type="image/avif" />
            <img
              :src="`${p.thumb}.jpg`"
              :alt="p.title"
              class="object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div class="flex flex-col gap-3 m-6 justify-center basis-3/5">
          <div class="text-lg lg:text-xl">{{ p.title }}</div>
          <div>
            <template v-for="(a, i) in p.authors" :key="a.name"
              ><span v-if="i">, </span
              ><span :class="a.me && hl"
                >{{ a.name }}<sup v-if="a.mark">{{ mark[a.mark] }}</sup></span
              ></template
            >
          </div>
          <div>{{ p.venue }}</div>
          <div>
            <a
              v-for="(l, i) in p.links"
              :key="l.href"
              class="underline hover:bg-clip-text hover:text-transparent duration-300"
              :class="linkGrad(i)"
              target="_blank"
              :href="l.href"
              >{{ l.label }}
            </a>
          </div>
        </div>
      </div>
      <div class="tracking-widest text-xs text-white/50">
        <div>
          Authors marked with a <sup>&#9675;</sup> denote joint first
          authorship.
        </div>
        <div>
          Authors marked with a <sup>&#9651;</sup> indicate joint supervision.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const hl =
  "group-hover:bg-gradient-to-r from-brand-blue via-brand-pink to-brand-yellow group-hover:bg-clip-text group-hover:text-transparent duration-300";
const grads = [
  "hover:bg-gradient-to-r from-brand-blue to-brand-pink",
  "hover:bg-gradient-to-r from-brand-pink to-brand-yellow",
  "hover:bg-gradient-to-r from-brand-yellow to-brand-purple",
];
const linkGrad = (i: number) => grads[i % grads.length];

const mark = { first: "○", super: "△" };

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
