<template>
  <!-- all clips are 16:9 after SAR correction; fixes layout before metadata loads -->
  <video
    ref="el"
    :aria-label="alt || undefined"
    :poster="poster"
    width="16"
    height="9"
    preload="none"
    controls
    controlslist="nodownload"
    disablepictureinpicture
    loop
    muted
    playsinline
    class="focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
  >
    <source :src="src" type="video/webm" />
    <!-- Apple ships no software AV1 decoder, so Safari before M3/A17 Pro needs h264 -->
    <source :src="src.replace(/\.webm$/, '.mp4')" type="video/mp4" />
  </video>
</template>

<script setup lang="ts">
// a <video> has no alt: the description becomes its accessible name instead
const props = defineProps<{ src: string; alt?: string }>();

// autoplay would download the whole file immediately even with preload="none",
// so playback is gated on visibility instead
const el = ref<HTMLVideoElement>();
const poster = computed(() => props.src.replace(/\.webm$/, "_poster.avif"));

// reduced motion no longer gates `controls` — a clip that starts on its own and
// loops for more than 5s needs a stop for everyone, not only for that setting
// (WCAG 2.2.2). What it still gates is the start: under reduced motion the clip
// holds its poster until asked.
//
// `disablepictureinpicture` drops the pop-out button. Chromium floats it in the
// video's top-right corner, which is exactly where the credit now lives, and
// popping a looping process clip out of the page it explains is a feature no
// visitor here asked for. Firefox ignores the attribute (its toggle is a browser
// preference), so one browser keeps showing it.
//
// `controlslist="nodownload"` drops the save button: the footage is All Rights
// Reserved, and offering a download next to a play button reads as a licence.
// Chromium and Safari honour it, Firefox ignores it, and the file URL is public
// either way — it removes an invitation, not a capability. Fullscreen and the
// playback rate stay: a process clip is worth scrubbing and enlarging.
const reduced = useReducedMotion();

onMounted(() => {
  // the observer only ever pauses off-screen, so a pause that arrives while the
  // clip is visible came from the visitor — and re-entering the viewport must not
  // undo it, or `controls` would be a stop button the scroll position overrides
  let visible = false;
  let userPaused = false;
  el.value!.addEventListener("pause", () => visible && (userPaused = true));
  el.value!.addEventListener("play", () => (userPaused = false));

  const io = new IntersectionObserver(([e]) => {
    visible = e!.isIntersecting;
    if (!visible) el.value?.pause();
    else if (!reduced.value && !userPaused) el.value?.play();
  });
  io.observe(el.value!);
  onBeforeUnmount(() => io.disconnect());
});
</script>
