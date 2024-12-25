<template>
  <div class="flex flex-col m-24">
    <div class="flex justify-between items-baseline">
      <h1 class="text-3xl font-medium leading-normal">
        <span class="bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Salut,</span> {{ userName }} 👋 
      </h1>
      <div class="flex gap-10 pt-5 items-center">
        <Icon name="lucide:circle-user-round" class="w-6 h-6 cursor-pointer transition ease-in-out duration-300 hover:scale-110" @click="$router.push('/profil')" />
        <Icon name="lucide:log-out" class="w-6 h-6 cursor-pointer transition ease-in-out duration-300 hover:scale-110" @click="signOut" />
      </div>
    </div>

    <div class="mt-10 flex justify-between items-center">
      <h2 class="text-2xl font-medium leading-normal bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Liste des objets</h2>
      
      <div class="w-1/2 flex gap-4">
        <button class="bg-[#94543d] text-white text-sm font-semibold rounded-xl py-2 px-6 transition ease-in-out duration-300 hover:bg-[#94543d]/80 flex items-center" @click="isOpen = true"><Icon name="lucide:plus" class="mr-2 w-5 h-5" />Ajouter</button>
        <UModal v-model="isOpen">
          <ObjectForm type="add" :fetchObjects="handleFetchObjects" :isOpen="isOpen" />
        </UModal>
        
        <div class="w-full flex items-center border-2 border-gray-200 p-2 rounded-lg">
          <input type="text" placeholder="Rechercher..." v-model="search" class="w-full focus:outline-none">
          <Icon name="lucide:search" class="w-5 h-5" />
        </div>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-3 gap-10" v-if="filteredObjects.length > 0 && !isLoading">
      <div v-for="object in filteredObjects" :key="object.id">
        <ObjectCard :object="object" :fetchObjects="handleFetchObjects" />
      </div>
    </div>
  </div>
  
  <div v-if="isLoading" class="mt-10 text-center flex items-center justify-center">
    <Icon name="eos-icons:loading" class="animate-spin mr-2 mb-1 w-5 h-5" /> Chargement...
  </div>

  <div v-if="filteredObjects.length === 0 && !isLoading" class="mt-10 flex flex-col items-center space-y-4">
    <img src="~/assets/empty.png" alt="empty" class="w-80">
    <h3 class="text-xl">Vous n'avez aucun objet pour le moment.</h3>
  </div>
</template>

<script setup lang="ts">
import ObjectCard from '~/components/dashboard/ObjectCard.vue'
import ObjectForm from '~/components/dashboard/ObjectForm.vue'
import fetchObjects from '~/composables/objects/fetchObjects'

const userName = ref('')
const config = useRuntimeConfig()
const isLoading = ref(false)
const objects = ref([]) as any
const isOpen = ref(false)
const toast = useToast()
const search = ref('')

const filteredObjects = computed(() => {
  return objects.value.filter((object: any) => 
    object.name && object.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

function handleFetchObjects() {
  isLoading.value = true;
  fetchObjects(config.public.API_URL, toast)
  .then((response: any) => {
    objects.value = response;
    isLoading.value = false;
    isOpen.value = false;
  })
  .catch(() => {
    toast.add({
      title: 'Error',
      description: 'Une erreur est survenue au chargement des objets.',
      color: 'red',
    });
    isLoading.value = false;
    isOpen.value = false;
  });
}

function signOut() {
  localStorage.removeItem('user')
  navigateTo('/signin')
}

onMounted(async () => {
  const user: any = localStorage.getItem('user')

  if (!user) {
    navigateTo('/signin')
  }

  userName.value = JSON.parse(user).name
  handleFetchObjects()
})

</script>