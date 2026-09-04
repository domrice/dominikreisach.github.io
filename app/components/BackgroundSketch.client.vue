<template>
  <div ref="holder" class="fixed inset-0 -z-10 bg-black" aria-hidden="true" />
</template>

<script setup lang="ts">
import type P5 from "p5";

const holder = ref<HTMLElement>();
const reduced = useReducedMotion();
let instance: P5 | undefined;
// set by the sketch once the reduced-motion field has finished developing, so the
// visibility handler below never restarts a loop that is deliberately over
let settled = false;

// target point count, viewport-independent. 24k matches the density the sketch had at
// 1440x900, the viewport this composition was authored against.
const POINTS = 24000;

// p5 instance-mode sketch. setup/draw must be assigned on the instance — required by the
// p5 API, so the nested closures here are unavoidable (ponytail: p5 has no non-nested form).
function sketch(p: P5, still: boolean) {
  // plain {x,y} instead of p5.Vector: v2's bundled types omit Vector's instance
  // methods, and we only ever need two adds (ponytail: no vector math here)
  const points: { x: number; y: number }[] = [];
  // the inner loop runs POINTS times a frame, so it uses plain Math rather than p.map /
  // p.dist / p.cos: every p5 method call goes through a decorator, and the angle is the
  // same 0–2τ sweep p.map(noise, 0, 1, 0, 720) produced under angleMode(DEGREES).
  let mult: number,
    r1: number,
    g1: number,
    b1: number,
    r2: number,
    g2: number,
    b2: number;
  let diameter: number, thickness: number;

  // only changes on resize, which clears the canvas anyway
  const sizing = () => {
    if (p.windowWidth < 600) {
      diameter = p.windowWidth / 2;
      thickness = 1.5;
    } else if (p.windowWidth < 900) {
      diameter = p.windowWidth / 3;
      thickness = 2.0;
    } else {
      diameter = p.windowWidth / 4;
      thickness = 2.5;
    }
  };

  p.setup = () => {
    const c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.position(0, 0);
    c.style("z-index", "-1");
    c.style("position", "fixed");
    // a full-viewport canvas at 3x is ~2.25x the fill rate of 2x for dots this small
    p.pixelDensity(Math.min(p.displayDensity(), 2));
    p.background("#000000");
    p.noiseDetail(1);
    sizing();
    // spacing from viewport AREA, so density is resolution-independent and the count
    // lands near POINTS everywhere. Deriving it from width alone made the count scale
    // inversely with width: a 390px phone seeded 86k points against a laptop's 25k.
    const space = Math.sqrt((p.windowWidth * p.windowHeight) / POINTS);
    for (let x = 0; x < p.windowWidth; x += space)
      for (let y = 0; y < p.windowHeight; y += space)
        points.push({ x: x + p.random(-50, 50), y: y + p.random(-50, 50) });
    p.shuffle(points, true);
    r1 = p.random(255);
    g1 = p.random(255);
    b1 = p.random(255);
    r2 = p.random(255);
    g2 = p.random(255);
    b2 = p.random(255);
    mult = p.random(0.001, 0.005);
  };

  // The field never clears, so it develops rather than loops: once it has drifted for
  // long enough the picture stops changing meaningfully and the frames are pure battery.
  // Reduced motion gets the same picture, arrived at without the drift.
  const ramp = still ? Math.ceil(POINTS / 60) : 20;
  const stopAfter = still ? 60 : 2100;
  // our own counter: p.frameCount keeps ticking and we need to restart it on resize
  let frames = 0;

  p.draw = () => {
    p.noStroke();
    const max = Math.min(++frames * ramp, points.length);
    const w = p.windowWidth,
      h = p.windowHeight,
      cx = w / 2,
      cy = h / 2;
    for (let i = 0; i < max; i++) {
      const pt = points[i]!;
      const ox = pt.x,
        oy = pt.y;
      // every point advances — off-screen ones drift in later — but only visible ones get painted
      const angle = p.noise(ox * mult, oy * mult) * 4 * Math.PI;
      pt.x += Math.cos(angle);
      pt.y += Math.sin(angle);
      if (Math.hypot(cx - pt.x, cy - pt.y) >= diameter) continue;
      // colour and alpha sample the pre-move position, as before
      const fx = ox / w,
        fy = oy / h;
      p.fill(
        r1 + fx * (r2 - r1),
        g1 + fy * (g2 - g1),
        b1 + fx * (b2 - b1),
        255 * (1 - Math.hypot(cx - ox, cy - oy) / diameter),
      );
      p.ellipse(pt.x, pt.y, thickness);
    }
    if (frames >= stopAfter) {
      settled = true;
      p.noLoop();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    sizing();
    p.background("#000000");
    // a resize wipes the buffer, so a frozen field has to redevelop
    if (settled) {
      settled = false;
      frames = 0;
      p.loop();
    }
  };
}

// nothing decorative should keep burning frames behind a hidden tab
const onVisibility = () => {
  if (settled) return;
  document.hidden ? instance?.noLoop() : instance?.loop();
};

// dynamic import keeps p5 (~1 MB) out of the entry chunk — the .client suffix only stops SSR
onMounted(async () => {
  document.addEventListener("visibilitychange", onVisibility);
  const { default: p5 } = await import("p5");
  // p5 v2 validates every call's arguments with zod, including in the production entry.
  // With ~24k points a frame that was over half of this page's main-thread time.
  (p5 as unknown as { disableFriendlyErrors: boolean }).disableFriendlyErrors = true;
  instance = new p5((p: P5) => sketch(p, reduced.value), holder.value);
});
onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", onVisibility);
  instance?.remove();
});
</script>
