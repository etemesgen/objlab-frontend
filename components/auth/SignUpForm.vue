<template>
  <div class="mx-auto w-[80%] md:w-1/2 md:mt-10">
    <img src="~/assets/objlab_logo.png" alt="objlab" class="w-56 cursor-pointer" @click="$router.push('/')">
    <h1 class="text-3xl font-bold leading-normal bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Bienvenue !</h1>

    <form @submit.prevent="handleUserSignup" class="mt-5 space-y-5">
      <div class="space-y-2">
        <label for="name">Nom</label>
        <input type="text" id="name" name="name" placeholder="Nom" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" required>
      </div>

      <div class="space-y-2">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" required>
      </div>
      
      <div class="space-y-2">
        <label for="password">Mot de passe</label>
        <div class="relative flex items-center p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400">
          <input type="password" id="password" name="password" placeholder="Mot de passe" class="w-full focus:outline-none" required>
          <Icon :name="hidePassword ? 'lucide:eye-off' : 'lucide:eye'" class="cursor-pointer" @click="handlePasswordVisibility('password')" />
        </div>
      </div>

      <div class="space-y-2">
        <label for="confirm-password">Confirmer le mot de passe</label>
        <div class="relative flex items-center p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400">
          <input type="password" id="confirm-password" name="confirm-password" placeholder="Mot de passe" class="w-full focus:outline-none" @input="confirmPassword" required>
          <Icon :name="hideConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'" class="cursor-pointer" @click="handlePasswordVisibility('confirm-password')" />
        </div>

        <p v-if="passwordDoesNotMatch" class="text-red-500">Les mots de passe ne correspondent pas.</p>
      </div>

      <div class="flex gap-4 pt-5">
        <button class="w-full bg-[#94543d] text-white font-semibold rounded-xl py-2 px-4 transition ease-in-out duration-300 hover:bg-[#94543d]/80 flex items-center justify-center" :disabled="isLoading"><Icon v-if="isLoading" name="eos-icons:loading" class="animate-spin mr-2 mb-1 w-5 h-5" />S'inscrire</button>
        <NuxtLink to="/signin" class="w-full bg-[#e2ad74] text-white font-semibold rounded-xl py-2 px-4 transition ease-in-out duration-300 hover:bg-[#e2ad74]/80 flex items-center justify-center">Se connecter</NuxtLink>        
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import handleSignup from '~/composables/auth/handleSignUp';

const toast = useToast()
const hidePassword = ref(true)
const hideConfirmPassword = ref(true)
const passwordDoesNotMatch = ref(false)
const isLoading = ref(false)
const config = useRuntimeConfig()

function handlePasswordVisibility(field: string) {
  const passwordInput = document.getElementById(field) as HTMLInputElement;

  if (field === 'password' && hidePassword.value) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }

  if (field === 'confirm-password' && hideConfirmPassword.value) {
    const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
    confirmPasswordInput.type = 'text';
  } else {
    const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
    confirmPasswordInput.type = 'password';
  }

  field === 'password' ? hidePassword.value = !hidePassword.value : hideConfirmPassword.value = !hideConfirmPassword.value;
}

function confirmPassword(event: Event) {
  const password = (event.target as HTMLInputElement).value;
  const confirmPassword = (document.getElementById('password') as HTMLInputElement).value;
  
  if (password !== confirmPassword) {
    passwordDoesNotMatch.value = true;
  } else {
    passwordDoesNotMatch.value = false;
  }
}

function handleUserSignup(event: Event) {
  if (passwordDoesNotMatch.value) {
    toast.add({
      title: 'Erreur',
      description: 'Les mots de passe ne correspondent pas',
      icon: 'i-heroicons-x-circle',
      color: 'gray'
    })
    return;
  }

  isLoading.value = true

  handleSignup(
    event,
    config.public.API_URL,
  ).then(() => {
    isLoading.value = false
    navigateTo('/signin')
  }).catch(() => {
    isLoading.value = false
    toast.add({
      title: 'Erreur',
      description: 'Erreur lors de l\'inscription',
      icon: 'i-heroicons-x-circle',
      color: 'gray'
    })
  });
}
</script>