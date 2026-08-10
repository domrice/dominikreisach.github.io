<template>
  <header class="text-4xl md:text-5xl lg:text-6xl">
    <nav class="grid h-screen p-9 lg:p-12 grid-rows-1 gap-y-6 lg:gap-y-0 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2">
      <div class="justify-self-center lg:justify-self-start order-1">
        <NuxtLink to="/" class="hover:bg-gradient-to-r from-brand-pink to-brand-yellow hover:bg-clip-text hover:text-transparent duration-300">dominik reisach</NuxtLink>
      </div>
      <div class="justify-self-center lg:justify-self-end order-2">
        <NuxtLink to="/about" class="hover:bg-gradient-to-r from-brand-yellow to-brand-purple hover:bg-clip-text hover:text-transparent duration-300 text-2xl md:text-4xl lg:text-6xl">about</NuxtLink>
      </div>
      <div class="justify-self-center lg:justify-self-start order-last lg:order-3">
        <NuxtLink to="/work" class="hover:bg-gradient-to-r from-brand-purple to-brand-blue hover:bg-clip-text hover:text-transparent duration-300 text-2xl md:text-4xl lg:text-6xl">selected work</NuxtLink>
      </div>
      <div class="justify-self-center lg:justify-self-end order-3 lg:order-4">
        <NuxtLink to="/publications" class="hover:bg-gradient-to-r from-brand-blue to-brand-pink hover:bg-clip-text hover:text-transparent duration-300 text-2xl md:text-4xl lg:text-6xl text-right">publications</NuxtLink>
      </div>
    </nav>
  </header>
</template>
