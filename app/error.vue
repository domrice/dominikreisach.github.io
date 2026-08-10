<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 class="text-8xl font-extrabold tracking-tight mb-4">{{ error?.statusCode || 404 }}</h1>
      <p class="text-2xl md:text-3xl mb-8">Oops! You've scrolled into the void. 🌀</p>
      <p class="text-lg md:text-xl text-gray-400 mb-8 max-w-xl">
        Looks like the page you're looking for doesn't exist. But hey, at least you found this hidden corner of the internet.
      </p>
      <button class="inline-block bg-gradient-to-r from-brand-blue via-brand-pink to-brand-yellow text-white hover:text-opacity-30 font-semibold py-3 px-6 rounded-sm transition-all duration-300" @click="handleError">
        🏠 Back to Safety
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>()
const handleError = () => clearError({ redirect: '/' })
</script>
