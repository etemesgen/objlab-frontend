<template>
  <div class="p-4">
    <form @submit.prevent="onSubmit(object && object._id, object && object.image, $event)" class="mt-4 space-y-5">
      <div v-if="image" class="mt-2 w-full relative">
        <img :src="image" alt="Preview" class="object-cover mx-auto h-44">
      </div>

      <div v-if="object && object.image" class="mt-2 w-full relative">
        <img :src="object && object.image" alt="Object image" class="object-cover mx-auto h-44">
      </div>

      <div class="space-y-2">
        <label for="image">Image</label>
        <input type="file" id="image" name="image" placeholder="Image" @change="handleImageUpload" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" :required="type === 'add'">
      </div>

      <div class="space-y-2">
        <label for="name">Nom</label>
        <input type="text" id="name" name="name" placeholder="Nom" :value="object ? object.name : ''" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" :required="type === 'add'">
      </div>
      
      <div class="space-y-2">
        <label for="description">Description</label>
        <textarea type="text" id="description" name="description" placeholder="Description" :value="object ? object.description : ''" class="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-400" rows="4" :required="type === 'add'"></textarea>
      </div>

      <button v-if="type === 'add'" type="submit" class="w-full bg-[#94543d] text-white font-semibold rounded-lg py-2 px-4 transition ease-in-out duration-300 hover:bg-[#94543d]/80 flex items-center justify-center" :disabled="isLoading"><Icon v-if="isLoading" name="eos-icons:loading" class="animate-spin mr-2 mb-1 w-5 h-5" />Ajouter</button>

      <div class="flex items-center gap-4" v-if="type === 'edit'">
        <button type="submit" class="w-full bg-[#e2ad74] text-white font-semibold rounded-lg py-2 px-4 transition ease-in-out duration-300 hover:bg-[#e2ad74]/80 flex items-center justify-center">Modifier</button>
        <button class="w-full bg-red-500 text-white font-semibold rounded-lg py-2 px-4 transition ease-in-out duration-300 hover:bg-red-300 flex items-center justify-center" @click="deleteObject(object && object._id)">Supprimer</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { handleDeleteObject } from '~/composables/objects/handleDeleteObject';

const toast = useToast()
const config = useRuntimeConfig()
const image = ref('')
const isLoading = ref(false)

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  object: {
    type: Object,
    required: false
  },
  fetchObjects: {
    type: Function,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
})

const { type, object, fetchObjects } = props
const emit = defineEmits(['update:isOpen'])

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

function onSubmit(id: any, objectImage: string, event: Event) {
  image.value = image.value ? image.value : objectImage
  isLoading.value = true
  handleObjectAction(
    id,
    event,
    type,
    config.public.API_URL,
    toast,
    image
  ).then(() => {
    image.value = ''
    isLoading.value = false
    fetchObjects();
    emit('update:isOpen', false);
  });
}

function deleteObject(id: any) {
  handleDeleteObject(id, config.public.API_URL, toast).then(() => {
    fetchObjects();
  });
}
</script>