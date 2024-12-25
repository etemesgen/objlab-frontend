<template>
  <div class="flex justify-between items-center">
    <img src="~/assets/objlab_logo.png" alt="objlab" class="w-56">

    <div class="flex gap-10">
      <NuxtLink
        to="/#features"
        class="relative text-[#e2ad74] text-lg font-semibold rounded-xl p-2 transition-all duration-300 hover:text-[#e2ad74]/80 after:block after:w-0 after:h-0.5 after:bg-[#94543d] hover:after:w-full hover:after:transition-all hover:after:duration-300"
      >
        Fonctionnalités
      </NuxtLink>
      <NuxtLink
        to="/#faq"
        class="relative text-[#e2ad74] text-lg font-semibold rounded-xl p-2 transition-all duration-300 hover:text-[#e2ad74]/80 after:block after:w-0 after:h-0.5 after:bg-[#94543d] hover:after:w-full hover:after:transition-all hover:after:duration-300"
      >
        FAQ
      </NuxtLink>
    </div>

    <div class="flex gap-4">
      <NuxtLink
        to="/signin"
        class="text-[#94543d] text-lg font-semibold rounded-xl p-2 transition ease-in-out duration-300 hover:text-[#e2ad74]"
      >
        Se connecter
      </NuxtLink>
      <NuxtLink
        to="/signup"
        class="bg-[#94543d] text-lg text-white font-semibold rounded-xl flex items-center px-4 transition ease-in-out duration-300 border-4 border-[#94543d] hover:border-[#e2ad74]"
      >
        S'inscrire
      </NuxtLink>
    </div>
  </div>
</template>