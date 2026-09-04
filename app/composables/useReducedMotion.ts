// One live matchMedia list, shared by the canvas and the gallery video. Live rather
// than read-once so flipping the OS setting mid-session takes effect without a reload.
export function useReducedMotion() {
  const reduced = ref(false);
  onMounted(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (reduced.value = mq.matches);
    sync();
    mq.addEventListener("change", sync);
    onBeforeUnmount(() => mq.removeEventListener("change", sync));
  });
  return reduced;
}
