<template>
  <div class="flex justify-between items-center">
    <img src="~/assets/objlab_logo.png" alt="objlab" class="w-56">
    <div class="flex gap-4">
      <NuxtLink to="/signin" class="text-[#94543d] text-lg font-semibold rounded-xl p-2 transition ease-in-out duration-300 hover:text-[#e2ad74]">Se connecter</NuxtLink>
      <NuxtLink to="/signup" class="bg-[#94543d] text-lg text-white font-semibold rounded-xl flex items-center px-4 transition ease-in-out duration-300 border-4 border-[#94543d] hover:border-4 hover:border-[#e2ad74]">S'inscrire</NuxtLink>
    </div>
  </div>
</template>