<template>
  <!-- the figure wrapper owns grid placement so the credit can sit over the media:
       portraits are boxed to 3:4 so a pair lines up; landscapes keep their own height across both columns -->
  <figure
    class="relative group"
    :class="portrait ? 'aspect-[3/4]' : 'lg:col-span-2'"
  >
    <!-- named MediaVideo, not LazyVideo — Nuxt reserves the `Lazy` prefix for lazy hydration -->
    <MediaVideo
      v-if="isVideo(src)"
      :src="src"
      :alt="alt"
      class="rounded-md w-full h-full object-cover"
    />
    <picture v-else class="contents">
      <source :srcset="`${src}.avif`" type="image/avif" />
      <img
        :src="`${src}.jpg`"
        :alt="alt || ''"
        v-bind="sizeAttrs(src)"
        class="rounded-md w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <!-- hover-only on pointer devices; touch has no hover, so it stays visible
         there — which is why a video's credit clings to the top edge instead -->
    <figcaption v-if="credit" :class="captionClass(src)">
      {{ credit }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
// alt is authored per item in frontmatter, and the two collections earn their
// defaults differently. On `work` a `credit` is attribution ("Photo © …"), which
// describes nothing — so all 106 items carry a real `alt`. On `pitch` the same
// field is used as a German descriptive caption, and a `<figcaption>` inside the
// `<figure>` is already announced with the image; alt there would say it twice, so
// absent alt is correct. The exception is a pitch item whose caption is *only*
// attribution — those carry an `alt` of their own.
defineProps<{ src: string; portrait?: boolean; credit?: string; alt?: string }>();
</script>
