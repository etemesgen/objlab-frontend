<template>
  <div class="mt-32 flex justify-between">
    <div>
      <h1 class="text-5xl font-bold leading-normal bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Gérer vos objets en toute simplicité !</h1>
      <p class="mt-7 text-xl font-medium">L'outil qui vous permet de gérer vos objets de manière facile.</p>

      <div class="flex gap-4 mt-16">
        <NuxtLink to="/signup" class="bg-[#94543d] text-white font-semibold rounded-xl py-2 px-4 transition ease-in-out duration-300 hover:bg-[#94543d]/80 flex items-center">Démarrer <Icon name="fe:arrow-right" class="ml-2" /></NuxtLink>
      </div>
    </div>

    <img src="~/assets/illustration_objects.png" alt="illustration" class="w-1/2">
  </div>
</template>
