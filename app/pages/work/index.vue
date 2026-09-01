<template>
  <div class="relative min-h-screen w-full">
    <CloseLink grad="from-brand-purple to-brand-blue" />
    <div class="mx-auto max-w-[120rem] pt-20 lg:pt-36 pb-6 px-6 lg:px-12">
      <section v-for="g in grouped" :key="g.label" class="mb-10 lg:mb-16">
        <h2 class="lowercase text-2xl lg:text-3xl mb-3">{{ g.label }}</h2>
        <div
          class="grid grid-flow-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lowercase"
        >
          <NuxtLink
            v-for="item in g.items"
            :key="item.path"
            :to="item.path"
            class="group relative block border border-solid border-black aspect-square overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
          >
            <img
              :src="item.thumb"
              alt=""
              width="800"
              height="800"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
            />
            <!-- the project's chromatic key, as the pointer reward. Sits beneath the scrim so
                 centred white type clears the amber stops. opacity is what fades —
                 background-image cannot be transitioned, so the old transition-all never ran. -->
            <div
              aria-hidden="true"
              class="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out bg-linear-to-b lg:bg-linear-to-r group-hover:opacity-75 group-focus-visible:opacity-75 group-active:opacity-75 motion-reduce:transition-none"
              :class="grads[item.grad]"
            />
            <!-- the tile names itself, centred. hidden until hover on pointer devices; always
                 visible on touch, where no hover exists — same mechanism as MediaFigure's
                 credits. The radial scrim backs the type without veiling the thumbnail's edges,
                 and is what keeps white legible over the amber gradients. -->
            <span
              class="absolute inset-0 flex items-center justify-center p-4 text-center text-2xl text-white bg-radial from-black/50 via-black/25 to-transparent transition-opacity duration-500 ease-out [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            >
              {{ item.title }}
            </span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// fixed section order + display labels; a category with no items renders nothing
const sections = [
  ["computation", "computation"],
  ["design", "architecture & design"],
  ["misc", "misc"],
] as const;

const { data: items } = await useAsyncData("work-list", () =>
  queryCollection("work").order("order", "ASC").all(),
);

// ponytail: filter per section is O(sections × items) — fine at 8 items; one reduce if this ever passes ~100
const grouped = computed(() =>
  sections
    .map(([key, label]) => ({
      label,
      items: items.value!.filter((i) => i.category === key),
    }))
    .filter((g) => g.items.length),
);
</script>
