<template>
  <div class="fixed top-6 lg:top-12 right-6 lg:right-12 z-10">
    <NuxtLink
      :to="to"
      class="block cursor-pointer hover:bg-gradient-to-l hover:bg-clip-text hover:text-transparent duration-300 text-4xl lg:text-6xl"
      :class="grad"
      aria-label="Close"
      >&empty;</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ grad: string; to?: string }>(), { to: '/' })
</script>
