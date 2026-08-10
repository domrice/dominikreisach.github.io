<!-- overrides mdc's ProseA: absolute URLs in markdown open in a new tab -->
<template>
  <NuxtLink
    :href="href"
    :target="target ?? (href.startsWith('http') ? '_blank' : undefined)"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const { href = "", target } = defineProps<{
  href?: string;
  target?: string;
}>();
</script>
