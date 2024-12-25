<template>
  <div>
    <img src="~/assets/objlab_logo.png" alt="objlab" class="w-56 cursor-pointer mx-auto mt-10" @click="$router.push('/')">

    <div class="flex flex-col m-5 md:mx-10">
      <div class="flex justify-between items-baseline">
        <h1 class="text-3xl font-medium leading-normal">
          <span class="bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Salut,</span> {{ user?.name }} 👋
        </h1>
        <div class="flex gap-5 md:gap-10 pt-5 items-center">
          <Icon name="lucide:layout-dashboard" class="w-6 h-6 cursor-pointer transition ease-in-out duration-300 hover:scale-110" @click="$router.push('/dashboard')" />
          <Icon name="lucide:log-out" class="w-6 h-6 cursor-pointer transition ease-in-out duration-300 hover:scale-110" @click="signOut" />
        </div>
      </div>

      <div class="mt-10 flex flex-col md:w-1/2 space-y-4">
        <h2 class="text-2xl font-medium leading-normal bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Profil</h2>
      
        <form @submit.prevent="handleUpdate(user?._id, $event)" class="space-y-5">
          <div class="space-y-2">
            <label for="name">Nom</label>
            <input v-model="user.name" type="text" id="name" name="name" placeholder="Nom" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400">
          </div>
          
          <div class="space-y-2">
            <label for="email">Email</label>
            <input v-model="user.email" type="email" id="email" name="email" placeholder="Email" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400">
          </div>
          
          <div class="space-y-2">
            <label for="password">Mot de passe</label>
            <div class="relative flex items-center p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400">
              <input v-model="user.password" type="password" id="password" name="password" placeholder="Mot de passe" class="w-full focus:outline-none">
              <Icon :name="hidePassword ? 'lucide:eye-off' : 'lucide:eye'" class="cursor-pointer" @click="handlePasswordVisibility" />
            </div>
          </div>

          <div class="flex gap-4 pt-5">
            <button class="w-full bg-[#94543d] text-white text-sm font-semibold rounded-lg py-2 px-6 transition ease-in-out duration-300 hover:bg-[#94543d]/80 flex items-center justify-center" :disabled="isLoadingUpdate"><Icon v-if="isLoadingUpdate" name="eos-icons:loading" class="animate-spin mr-2 mb-1 w-5 h-5" />Modifier</button>
            <button class="w-full bg-red-500 text-white text-sm font-semibold rounded-lg py-2 px-6 transition ease-in-out duration-300 hover:bg-red-300 flex items-center justify-center" :disabled="isLoadingDelete" @click="handleDelete(user?._id)">
              <Icon v-if="isLoadingDelete" name="eos-icons:loading" class="animate-spin mr-2 mb-1 w-5 h-5" />Supprimer
            </button>
          </div>
        </form>
      </div>      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { handleEditProfil } from '~/composables/profil/handleEditProfil'
import { handleDeleteProfil } from '~/composables/profil/handleDeleteProfil'

const user = ref({ _id: '', name: '', email: '', password: '' })
const config = useRuntimeConfig()
const toast = useToast()
const hidePassword = ref(true)
const isLoadingUpdate = ref(false)
const isLoadingDelete = ref(false)

function signOut() {
  localStorage.removeItem('user')
  navigateTo('/signin')
}

function handlePasswordVisibility() {
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

async function handleUpdate(id: any, event: Event) {
  isLoadingUpdate.value = true
  await handleEditProfil(
    id,
    event,
    config.public.API_URL,
    toast
  ).then(() => {
    localStorage.setItem('user', JSON.stringify(user.value))
    isLoadingUpdate.value = false
  }).catch(() => {
    isLoadingUpdate.value = false
  })
}

async function handleDelete(id: any) {
  isLoadingDelete.value = true
  await handleDeleteProfil(id, config.public.API_URL, toast)
  .then(() => {
    signOut()      
  }).catch(() => {
    isLoadingDelete.value = false
  })
}

onMounted(() => {
  const userData = localStorage.getItem('user')
  user.value = userData ? JSON.parse(userData) : null

  if (!user.value) {
    navigateTo('/signin')
  }
})
</script>