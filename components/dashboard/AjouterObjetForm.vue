<template>
  <div class="p-4">
    <form @submit.prevent="handleAddObject" class="mt-4 space-y-5">
      <div v-if="image" class="mt-2">
        <img :src="image" alt="Preview" class="object-cover mx-auto">
      </div>

      <div class="space-y-2">
        <label for="image">Image</label>
        <input type="file" id="image" name="image" placeholder="Image" @change="handleImageUpload" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" required>
      </div>

      <div class="space-y-2">
        <label for="name">Nom</label>
        <input type="text" id="name" name="name" placeholder="Nom" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" required>
      </div>
      
      <div class="space-y-2">
        <label for="description">Description</label>
        <textarea type="text" id="description" name="description" placeholder="Description" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" rows="4" required></textarea>
      </div>

      <button type="submit" class="w-full bg-[#94543d] text-white font-semibold rounded-lg py-2 px-4 transition ease-in-out duration-300 hover:bg-[#94543d]/80 flex items-center justify-center" :disabled="isLoading"><Icon v-if="isLoading" name="eos-icons:loading" class="animate-spin mr-2 mb-1 w-5 h-5" />Ajouter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()
const config = useRuntimeConfig()
const imagePreview = ref('')
const image = ref('')
const isLoading = ref(false)

function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      image.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

async function handleAddObject(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  if(!image.value) {
    toast.add({
      title: 'Erreur',
      description: 'Veuillez sélectionner une image',
      icon: 'i-heroicons-x-circle',
      color: 'gray'
    })
    return
  }

  isLoading.value = true
  data.image = image.value

  await $fetch(config.public.API_URL + '/api/v1/objects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => {
    toast.add({
      title: 'Objet ajouté',
      description: 'L\'objet a été ajouté avec succès',
      icon: 'i-heroicons-check-circle',
      color: 'gray'
    })
    isLoading.value = false
  }).catch(() => {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de l\'ajout de l\'objet',
      icon: 'i-heroicons-x-circle',
      color: 'gray'
    })
    isLoading.value = false
  })
}
</script>