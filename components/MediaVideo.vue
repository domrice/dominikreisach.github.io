<template>
  <video ref="el" :poster="poster" preload="none" loop muted playsinline>
    <source :src="src" type="video/webm" />
    <!-- Apple ships no software AV1 decoder, so Safari before M3/A17 Pro needs h264 -->
    <source :src="src.replace(/\.webm$/, '.mp4')" type="video/mp4" />
  </video>
</template>

<script setup lang="ts">
const props = defineProps<{ src: string }>();

// autoplay would download the whole file immediately even with preload="none",
// so playback is gated on visibility instead
const el = ref<HTMLVideoElement>();
const poster = computed(() => props.src.replace(/\.webm$/, "_poster.avif"));

onMounted(() => {
  const io = new IntersectionObserver(([e]) =>
    e.isIntersecting ? el.value?.play() : el.value?.pause(),
  );
  io.observe(el.value!);
  onBeforeUnmount(() => io.disconnect());
});
</script>
