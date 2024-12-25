<template>
  <div class="flex justify-between items-center">
    <img src="~/assets/objlab_logo.png" alt="objlab" class="w-56">
    <Icon name="lucide:menu" class="w-8 h-8 cursor-pointer transition ease-in-out duration-300 hover:scale-110 md:hidden" @click="isOpen = true" />
    
    <div class="flex md:hidden" v-if="isOpen">    
      <div class="fixed top-0 left-0 w-full h-full bg-white z-50">
        <Icon name="lucide:x" class="w-6 h-6 absolute top-12 right-10 cursor-pointer transition ease-in-out duration-300 hover:scale-110" @click="isOpen = false" />
        
        <div class="flex flex-col h-full p-10">
          <NuxtLink
            to="/#features"
            class="text-[#e2ad74] text-lg font-semibold rounded-xl p-2 transition ease-in-out duration-300 hover:text-[#e2ad74]/80"
            @click="isOpen = false"
          >
            Fonctionnalités
          </NuxtLink>
          <NuxtLink
            to="/#faq"
            class="text-[#e2ad74] text-lg font-semibold rounded-xl p-2 transition ease-in-out duration-300 hover:text-[#e2ad74]/80"
            @click="isOpen = false"
          >
            FAQ
          </NuxtLink>
          <NuxtLink
            to="/signin"
            class="text-[#94543d] text-lg font-semibold rounded-xl p-2 transition ease-in-out duration-300 hover:text-[#e2ad74]"
            @click="isOpen = false"
          >
            Se connecter
          </NuxtLink>
          <NuxtLink
            to="/signup"
            class="bg-[#94543d] text-lg text-white font-semibold rounded-xl flex items-center px-4 transition ease-in-out duration-300 hover:bg-[#e2ad74]"
            @click="isOpen = false"
          >
            S'inscrire
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="hidden gap-10 md:flex">
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

    <div class="hidden md:flex gap-4">
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

<script setup lang="ts">
const isOpen = ref(false);
</script>