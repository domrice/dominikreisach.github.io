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
            class="group cursor-pointer border border-solid border-black aspect-square overflow-hidden"
          >
            <div class="relative overflow-hidden aspect-square">
              <img
                :src="item.thumb"
                :alt="item.title"
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
                class="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div
                class="absolute inset-0 transition-all ease-in-out group-hover:bg-gradient-to-b lg:group-hover:bg-gradient-to-r opacity-75 aspect-square flex justify-center items-center text-transparent hover:text-white text-center text-2xl"
                :class="grads[item.grad]"
              >
                {{ item.title }}
              </div>
            </div>
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
