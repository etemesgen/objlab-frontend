<template>
  <div class="flex flex-col m-24">
    <div class="flex justify-between items-baseline">
      <h1 class="text-3xl font-medium leading-normal"><span class="bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Salut,</span> {{ userName }} 👋 </h1>
      <div class="flex gap-10 pt-5 items-center">
        <Icon name="lucide:circle-user-round" class="w-6 h-6 cursor-pointer" />
        <Icon name="lucide:log-out" class="w-6 h-6 cursor-pointer" />
      </div>
    </div>

    <div class="mt-10 flex justify-between items-center">
      <h2 class="text-2xl font-medium leading-normal bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Mes objets</h2>
      
      <div class="w-1/2 flex gap-4">
        <button class="bg-[#94543d] text-white text-sm font-semibold rounded-xl py-2 px-6 transition ease-in-out duration-300 hover:bg-[#94543d]/80 flex items-center" @click="isOpen = true"><Icon name="lucide:plus" class="mr-2 w-5 h-5" />Ajouter</button>
        <UModal v-model="isOpen">
          <AjouterObjetForm />
        </UModal>
        
        <div class="w-full flex items-center border-2 border-gray-200 p-2 rounded-lg">
          <input type="text" placeholder="Rechercher..." class="w-full focus:outline-none">
          <Icon name="lucide:search" class="w-5 h-5" />
        </div>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-3 gap-10" v-for="object in objects" :key="object.id">
      <ObjectCard :object="object" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ObjectCard from '~/components/dashboard/ObjectCard.vue'
import AjouterObjetForm from '~/components/dashboard/AjouterObjetForm.vue'

const userName = ref('')
const config = useRuntimeConfig()
let isLoading = ref(false)
let objects = ref([]) as any
const toast = useToast()
const isOpen = ref(false)

async function fetchObjects() {
  await $fetch(config.public.API_URL + '/api/v1/objects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response: any) => {
    objects.value = response
    isLoading.value = false
  }).catch(() => {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue au chargement des objets',
      icon: 'i-heroicons-x-circle',
      color: 'gray'
    })
    isLoading.value = false
  })
}

onMounted(() => {
  const user: any = localStorage.getItem('user')

  if (!user) {
    navigateTo('/signin')
  }

  userName.value = JSON.parse(user).name
  fetchObjects()
})

</script>