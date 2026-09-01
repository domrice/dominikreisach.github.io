<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <!-- scrim, as everywhere else: the p5 canvas behind this is bright and moving -->
      <div class="flex flex-col items-center gap-8 bg-black/66 rounded-md p-8">
        <div class="flex flex-col items-center gap-6">
          <!-- the code is diagnostic, not the message: same micro-label slot as project meta -->
          <p class="uppercase tracking-widest text-xs text-white/50">
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
             .exact keeps cmd/ctrl+click on the real href, so it still opens in a new tab -->
        <a
          href="/"
          class="text-xl lg:text-2xl focus-visible:bg-gradient-to-r focus-visible:bg-clip-text focus-visible:text-transparent"
          :class="[linkClass, grads[0]]"
          @click.exact.prevent="clearError({ redirect: '/' })"
          >back to the homepage <span aria-hidden="true">&rarr;</span></a
        >
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number } }>();

// a 404 is a wrong address; on a fully static site anything else is a failed load,
// where reloading is the only recovery we can honestly name
const copy = computed(() => {
  const code = props.error?.statusCode ?? 404;
  return code === 404
    ? { code, title: "page not found", message: "this page doesn’t exist.", hint: "" }
    : {
        code,
        title: "error",
        message: "this page didn’t load.",
        hint: "reloading usually fixes it.",
      };
});

useHead({
  title: () => `${copy.value.title} · dominik reisach`,
  // a prerendered 404.html is a route like any other — keep it out of the index
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
