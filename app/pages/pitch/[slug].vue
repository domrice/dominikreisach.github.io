<template>
  <div v-if="doc">
    <main class="mx-auto max-w-5xl px-6 lg:px-12">
      <!-- about me -->
      <section class="py-20">
        <h2 :class="[headingClass, grads[doc.grad]]">{{ t.about }}</h2>
        <div
          class="text-2xl lg:text-3xl text-gray-300 leading-relaxed text-pretty bg-black/66 rounded-md p-6"
          :class="[proseLinkClass, proseGrads[doc.grad]]"
        >
          <MDC :value="doc.intro" />
        </div>
      </section>

      <!-- featured projects -->
      <section class="py-20 border-t border-brand-pink">
        <h2 :class="[headingClass, grads[5]]">{{ t.projects }}</h2>

        <div v-for="p in doc.projects" :key="p.title" class="mb-20">
          <h3 class="text-2xl lg:text-4xl mb-6 text-white">{{ p.title }}</h3>
          <div
            class="text-lg lg:text-xl text-gray-300 mb-8 text-pretty lg:text-justify bg-black/66 rounded-md p-6"
            :class="[proseLinkClass, proseGrads[doc.grad]]"
          >
            <MDC :value="p.blurb" />
          </div>
          <!-- landscape spans both columns, portrait takes one so pairs share a row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-12">
            <MediaFigure
              v-for="m in p.media.map(item)"
              :key="m.src"
              v-bind="m"
            />
          </div>
        </div>
      </section>

      <!-- closing -->
      <section v-if="doc.closing" class="py-20 border-t border-brand-pink">
        <h2 :class="[headingClass, 'mb-12', grads[4]]">
          {{ doc.closing.title }}
        </h2>
        <blockquote
          class="text-2xl lg:text-3xl text-gray-300 leading-relaxed text-pretty bg-black/66 rounded-md p-6"
        >
          {{ doc.closing.text }}
        </blockquote>
      </section>

      <!-- contact -->
      <section class="py-20 border-t border-brand-pink text-center">
        <h2 :class="[headingClass, 'mb-12', grads[5]]">
          {{ t.contact }}
        </h2>
        <!-- same faded panel as the copy blocks above, so the p5 canvas doesn't wash it out -->
        <!-- one gap owns every vertical distance here, so child margins can't fight the padding -->
        <div
          class="bg-black/66 rounded-md p-8 flex flex-col items-center gap-8"
        >
          <p
            v-if="t.contactText"
            class="text-xl lg:text-2xl text-gray-300 leading-relaxed"
          >
            {{ t.contactText }}
          </p>
          <a
            href="mailto:dominik.reisach@icloud.com"
            class="text-2xl lg:text-3xl text-gray-300 hover:bg-linear-to-r hover:bg-clip-text hover:text-transparent duration-300"
            :class="grads[doc.grad]"
            >dominik.reisach@icloud.com</a
          >
          <div class="flex justify-center space-x-8">
            <a
              class="fill-gray-300 hover:fill-brand-pink duration-300 transform hover:scale-110"
              href="https://www.github.com/dominikreisach"
              target="_blank"
              title="GitHub"
            >
              <svg
                class="h-8 lg:h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
            </a>
            <a
              class="fill-gray-300 hover:fill-brand-pink duration-300 transform hover:scale-110"
              href="https://www.linkedin.com/in/dominik-reisach"
              target="_blank"
              title="LinkedIn"
            >
              <svg
                class="h-8 lg:h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                />
              </svg>
            </a>
          </div>
          <!-- pitches are opened from a direct link, so there is nothing to go "back" to —
             offer the rest of the site at the end instead of a close button at the top -->
          <NuxtLink
            to="/"
            class="mt-8 text-xl lg:text-2xl text-gray-300 hover:bg-linear-to-r hover:bg-clip-text hover:text-transparent duration-300"
            :class="grads[5]"
            >{{ t.explore }} →</NuxtLink
          >
        </div>
        <div class="pt-20 text-sm text-gray-400">
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

const headingClass =
  "text-4xl lg:text-6xl text-center mb-16 bg-linear-to-r bg-clip-text text-transparent w-fit mx-auto";

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

useHead({
  // overrides the site-wide lang from nuxt.config for this page only
  htmlAttrs: { lang: doc.value.lang },
  // unlisted by design: sent as a direct link, never indexed
  meta: [{ name: "robots", content: "noindex,nofollow" }],
});
</script>
