<template>
  <div ref="holder" class="fixed inset-0 -z-10 bg-black" aria-hidden="true" />
</template>

<script setup lang="ts">
import type P5 from "p5";

const holder = ref<HTMLElement>();
let instance: P5 | undefined;

// p5 instance-mode sketch. setup/draw must be assigned on the instance — required by the
// p5 API, so the nested closures here are unavoidable (ponytail: p5 has no non-nested form).
function sketch(p: P5) {
  // plain {x,y} instead of p5.Vector: v2's bundled types omit Vector's instance
  // methods, and we only ever need two adds (ponytail: no vector math here)
  const points: { x: number; y: number }[] = [];
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
    p.background("#000000");
    p.angleMode(p.DEGREES);
    p.noiseDetail(1);
    sizing();
    const space = p.windowWidth / 200;
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

  p.draw = () => {
    p.noStroke();
    const max = Math.min(p.frameCount * 20, points.length);
    const cx = p.windowWidth / 2,
      cy = p.windowHeight / 2;
    for (let i = 0; i < max; i++) {
      const pt = points[i]!;
      const ox = pt.x,
        oy = pt.y;
      // every point advances — off-screen ones drift in later — but only visible ones get painted
      const angle = p.map(p.noise(ox * mult, oy * mult), 0, 1, 0, 720);
      pt.x += p.cos(angle);
      pt.y += p.sin(angle);
      if (p.dist(cx, cy, pt.x, pt.y) >= diameter) continue;
      // colour and alpha sample the pre-move position, as before
      const r = p.map(ox, 0, p.windowWidth, r1, r2);
      const g = p.map(oy, 0, p.windowHeight, g1, g2);
      const b = p.map(ox, 0, p.windowWidth, b1, b2);
      p.fill(r, g, b, p.map(p.dist(cx, cy, ox, oy), 0, diameter, 255, 0));
      p.ellipse(pt.x, pt.y, thickness);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    sizing();
    p.background("#000000");
  };
}

// dynamic import keeps p5 (~1 MB) out of the entry chunk — the .client suffix only stops SSR
onMounted(async () => {
  const { default: p5 } = await import("p5");
  instance = new p5(sketch, holder.value);
});
onBeforeUnmount(() => instance?.remove());
</script>
