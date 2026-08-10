<template>
  <!-- the figure wrapper owns grid placement so the credit can sit over the media:
       portraits are boxed to 3:4 so a pair lines up; landscapes keep their own height across both columns -->
  <figure
    class="relative group"
    :class="portrait ? 'aspect-[3/4]' : 'lg:col-span-2'"
  >
    <!-- named MediaVideo, not LazyVideo — Nuxt reserves the `Lazy` prefix for lazy hydration -->
    <MediaVideo
      v-if="src.endsWith('.webm')"
      :src="src"
      class="rounded-md w-full h-full object-cover"
    />
    <picture v-else class="contents">
      <source :srcset="`${src}.avif`" type="image/avif" />
      <img
        :src="`${src}.jpg`"
        alt=""
        class="rounded-md w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <!-- hover-only on pointer devices; touch has no hover, so it stays visible there -->
    <figcaption
      v-if="credit"
      class="absolute inset-x-0 bottom-0 p-4 text-center uppercase tracking-widest text-xs text-white bg-linear-to-t from-black/85 via-black/45 to-transparent rounded-b-md transition-opacity duration-300 [@media(hover:hover)]:opacity-0 group-hover:opacity-100"
    >
      {{ credit }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{ src: string; portrait?: boolean; credit?: string }>();
</script>
