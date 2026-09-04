<template>
  <div v-if="doc" class="relative min-h-screen w-full">
    <!-- right-20/-32 reserves the close glyph's corner: the title wraps or shrinks
         rather than running under it. w-fit keeps the hover box on the glyphs. -->
    <div
      class="fixed top-6 lg:top-12 left-6 lg:left-12 right-20 lg:right-32 z-10"
    >
      <h1
        class="w-fit lowercase text-2xl md:text-4xl lg:text-6xl"
        :class="[clipGrad.r, grads[doc.grad]]"
      >
        {{ doc.title }}
      </h1>
    </div>
    <CloseLink to="/work" :grad="grads[doc.grad]" />

    <main
      class="flex flex-col gap-8 lg:gap-12 mx-auto max-w-5xl pt-20 lg:pt-36 pb-6 px-6 lg:px-12"
    >
      <figure v-if="hero" class="relative group">
        <MediaVideo
          v-if="isVideo(hero.src)"
          :src="hero.src"
          :alt="hero.alt"
          class="rounded-md w-full"
        />
        <picture v-else class="contents">
          <source :srcset="`${hero.src}.avif`" type="image/avif" />
          <img
            :src="`${hero.src}.jpg`"
            :alt="hero.alt || ''"
            v-bind="sizeAttrs(hero.src)"
            class="rounded-md w-full"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
        <figcaption v-if="hero.credit" :class="captionClass(hero.src)">
          {{ hero.credit }}
        </figcaption>
      </figure>

      <!-- bg-black/80 dims the p5 canvas behind the copy so white text keeps contrast -->
      <div class="flex flex-col gap-6 max-w-3xl bg-black/80 rounded-md p-6">
        <p
          v-if="meta.length"
          class="uppercase tracking-widest text-xs text-white/60"
        >
          {{ meta.join(" · ") }}
        </p>

        <ContentRenderer
          :value="doc"
          class="text-left lg:text-justify"
          :class="[proseLinkClass, proseGrads[doc.grad]]"
        />

        <dl
          v-if="doc.credits"
          class="grid gap-x-8 gap-y-2 sm:grid-cols-[auto_1fr] text-sm border-t border-white/10 pt-6"
        >
          <template v-for="c in doc.credits" :key="c.role">
            <!-- the quietest tier in the system: /60 measures 7.0:1 on black and
                 ~4.7:1 over the scrim, so a role label stays readable at 14px -->
            <dt class="text-white/60">{{ c.role }}</dt>
            <dd class="text-white/80 mb-2 sm:mb-0">
              <template v-for="(p, i) in c.people.map(person)" :key="i"
                ><span v-if="i">, </span
                ><a
                  v-if="p.url"
                  :href="p.url"
                  v-bind="external"
                  :class="[linkClass, grads[doc.grad]]"
                  >{{ p.name }}</a
                ><template v-else>{{ p.name }}</template></template
              >
            </dd>
          </template>
        </dl>
      </div>

      <!-- landscape spans both columns (natural height, no crop), portrait takes one so pairs share a row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <MediaFigure
          v-for="m in (doc.media || []).map(item)"
          :key="m.src"
          v-bind="m"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
type Media = { src: string; portrait?: boolean; credit?: string; alt?: string };
const item = (m: string | Media): Media =>
  typeof m === "string" ? { src: m } : m;

const person = (p: string | { name: string; url?: string }) =>
  typeof p === "string" ? { name: p } : p;

const route = useRoute();
const { data: doc } = await useAsyncData(`work-${route.path}`, () =>
  queryCollection("work").path(route.path).first(),
);
if (!doc.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
    fatal: true,
  });

const hero = computed(() => doc.value?.hero && item(doc.value.hero));

const meta = computed(() =>
  [doc.value?.type, doc.value?.place, doc.value?.year].filter(Boolean),
);

// titles are authored lowercase in frontmatter, matching the Lowercase Rule.
// description falls back to the meta line for the one project with no prose.
usePageSeo({
  title: doc.value.title,
  description: doc.value.description || meta.value.join(" · "),
  image: `/og/${route.path.split("/").pop()}.jpg`,
});
</script>
