<template>
  <div class="mx-auto w-1/2 mt-10">
    <h1 class="text-3xl font-bold leading-normal bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Ravi de vous revoir !</h1>

    <form @submit.prevent="handleUserSignin" class="mt-5 space-y-5">
      <div class="space-y-2">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" required>
      </div>
      
      <div class="space-y-2">
        <label for="password">Mot de passe</label>
        <div class="relative flex items-center p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400">
          <input type="password" id="password" name="password" placeholder="Mot de passe" class="w-full focus:outline-none" required>
          <Icon :name="hidePassword ? 'lucide:eye-off' : 'lucide:eye'" class="cursor-pointer" @click="handlePasswordVisibility" />
        </div>
      </div>

      <div class="flex gap-4 pt-5">
        <button class="w-full bg-[#94543d] text-white font-semibold rounded-xl py-2 px-4 transition ease-in-out duration-300 hover:bg-[#94543d]/80 flex items-center justify-center">Se connecter</button>
        <NuxtLink to="/signup" class="w-full bg-[#e2ad74] text-white font-semibold rounded-xl py-2 px-4 transition ease-in-out duration-300 hover:bg-[#e2ad74]/80 flex items-center justify-center">S'inscrire</NuxtLink>        
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import handleSignIn from '~/composables/auth/handleSignIn';

const toast = useToast()
const hidePassword = ref(true)
const config = useRuntimeConfig()
const isLoading = ref(false)

function handlePasswordVisibility() {
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

function handleUserSignin(event: Event) {
  isLoading.value = true
  handleSignIn(
    event,
    config.public.API_URL,
    toast
  ).then(() => {
    isLoading.value = false
  }).catch(() => {
    isLoading.value = false
  });
}
</script>