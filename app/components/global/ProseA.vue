<!-- overrides mdc's ProseA: absolute URLs in markdown open in a new tab, on the
     same `external` terms as every hand-written outbound link -->
<template>
  <NuxtLink
    :href="href"
    :target="blank"
    :rel="blank === external.target ? external.rel : undefined"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const { href = "", target } = defineProps<{
  href?: string;
  target?: string;
}>();

const blank = target ?? (href.startsWith("http") ? external.target : undefined);
</script>
