<template>
  <NuxtLayout>
    <main
      class="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <!-- scrim, as everywhere else: the p5 canvas behind this is bright and moving -->
      <div class="flex flex-col items-center gap-8 bg-black/80 rounded-md p-8">
        <div class="flex flex-col items-center gap-6">
          <!-- the code is diagnostic, not the message: same micro-label slot as project meta -->
          <p class="uppercase tracking-widest text-xs text-white/60">
            error {{ copy.code }}
          </p>
          <h1 class="text-3xl lg:text-5xl leading-tight text-balance max-w-2xl">
            {{ copy.message }}
          </h1>
          <p v-if="copy.hint" class="text-lg lg:text-xl text-white/80">
            {{ copy.hint }}
          </p>
        </div>
        <!-- clearError, not a NuxtLink: navigating away without it leaves the error state set.
             .exact keeps cmd/ctrl+click on the real href, so it still opens in a new tab.
             The two exits step through the pairs by position (Link Cycle Rule). -->
        <nav class="flex flex-wrap justify-center gap-x-10 gap-y-4">
          <a
            v-for="(exit, i) in exits"
            :key="exit.to"
            :href="exit.to"
            class="text-xl lg:text-2xl"
            :class="[linkClass, gradCycle(i)]"
            @click.exact.prevent="clearError({ redirect: exit.to })"
            >{{ exit.label }} <span aria-hidden="true">&rarr;</span></a
          >
        </nav>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number } }>();

// a 404 is a wrong address; on a fully static site anything else is a failed load,
// where reloading is the only recovery we can honestly name
const copy = computed(() => {
  const code = props.error?.statusCode ?? 404;
  return code === 404
    ? {
        code,
        title: "page not found",
        message: "this page doesn’t exist.",
        hint: "",
      }
    : {
        code,
        title: "error",
        message: "this page didn’t load.",
        hint: "reloading usually fixes it.",
      };
});

// a wrong project URL is the likeliest way anyone lands here, so the section index
// leads: it is the likelier intent and the only page that can answer "what was here?"
const exits = [
  { to: "/work", label: "back to selected work" },
  { to: "/", label: "back to the homepage" },
];

useHead({
  title: () => copy.value.title,
  // a prerendered 404.html is a route like any other — keep it out of the index
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
