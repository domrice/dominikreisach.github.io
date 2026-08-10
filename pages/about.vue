<script setup lang="ts">
// cycle the first four brand pairs; number links sequentially, modulo wraps
const link = (i: number) => [linkClass, grads[i % 4]];
</script>

<template>
  <div class="relative min-h-screen w-full">
    <CloseLink :grad="grads[1]" />
    <div class="mx-auto max-w-6xl pt-20 lg:pt-36 pb-6 px-6 lg:px-12">
      <!-- scrim is the whole card, so the image edge reads as the scrim edge; on lg the
           square photo covers the text's height so top/bottom line up exactly -->
      <div
        class="flex flex-col lg:flex-row bg-black/66 rounded-md overflow-hidden"
      >
        <picture class="lg:basis-1/2 lg:shrink-0">
          <source srcset="/imgs/0000-02_else/dr.avif" type="image/avif" />
          <img
            src="/imgs/0000-02_else/dr.jpg"
            alt="Dominik Reisach"
            width="1200"
            height="1200"
            class="w-full h-full object-cover"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
        <div class="text-pretty lg:text-justify lg:basis-1/2 p-6 self-center">
          I am a computational engineer and software developer specializing in
          geometry processing, computer vision, and digital fabrication. My work
          focuses on developing robust computational pipelines and optimization
          tools for 3D modeling, robotic fabrication, and generative design.
          <br /><br />
          My background in architecture gives me strong spatial and geometric
          intuition, which I apply to computational workflows for complex design
          and fabrication problems. I have built a
          <a
            :class="link(0)"
            href="https://github.com/dominikreisach/Spruce-Beetle"
            target="_blank"
            >Rhino3D/Grasshopper plugin</a
          >
          that automates the upcycling of timber waste using C#, developed
          packing and stacking algorithms in Python that combine computational
          geometry and machine learning, and created vision-based robotic
          fabrication systems for material-aware production.<br /><br />
          I am currently pursuing a PhD at
          <a :class="link(1)" href="https://ethz.ch/en" target="_blank"
            >ETH Zurich</a
          >, co-supervised by
          <a
            :class="link(2)"
            href="https://www.langenberg.arch.ethz.ch/?lang=en"
            target="_blank"
            >Silke Langenberg</a
          >
          and
          <a :class="link(3)" href="https://dbt.arch.ethz.ch/" target="_blank"
            >Benjamin Dillenburger</a
          >, focusing on computational methods for upcycling stone offcuts and
          ceramic tiles through integrated geometry processing, automated design
          workflows, and robotic fabrication. I am part of the
          <a :class="link(4)" href="https://dfab.ch/" target="_blank"
            >NCCR Digital Fabrication</a
          >
          and an associated PhD Researcher at the
          <a :class="link(5)" href="https://ai.ethz.ch/" target="_blank"
            >ETH AI Center</a
          >.
        </div>
      </div>
    </div>
  </div>
</template>
