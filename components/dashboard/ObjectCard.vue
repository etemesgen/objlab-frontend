<template>
  <div class="flex flex-col space-y-4 shadow p-4 rounded-lg transition ease-in-out duration-300 hover:scale-105">
    <div class="w-full h-36 relative">
      <img :src="object.image" alt="object" class="object-cover mx-auto w-full h-full">
    </div>

    <div class="pt-5 flex justify-between items-end">
      <div class="space-y-2">
        <h2 class="text-xl font-semibold text-[#94543d] truncate">{{ object.name }}</h2>
        <p class="text-sm text-gray-700 font-medium truncate">{{ object.description }}</p>
      </div>

      <div class="flex gap-4 pt-5 items-center">
        <Icon name="lucide:edit" class="w-5 h-5 cursor-pointer transition ease-in-out duration-300 hover:scale-110" @click="isOpen = true" />
        <UModal v-model="isOpen">
          <ObjectForm type="edit" :object="object" :fetchObjects="fetchObjects" :isOpen="isOpen" />
        </UModal>
        <Icon name="lucide:trash-2" class="w-5 h-5 cursor-pointer text-red-500 transition ease-in-out duration-300 hover:scale-110" @click="isOpenDelete = true" />
        <UModal v-model="isOpenDelete">
          <div class="p-4 space-y-4">
            <h2 class="text-xl font-semibold text-[#94543d]">Supprimer l'objet</h2>
            <p class="text-sm text-gray-700 font-medium">Êtes-vous sûr de vouloir supprimer cet objet ?</p>
            <button class="w-1/3 bg-red-500 text-white font-semibold rounded-lg py-2 px-4 focus:outline-none transition ease-in-out duration-300 hover:bg-red-300 flex items-center justify-center" @click="deleteObject(object._id)">Supprimer</button>
          </div>
        </UModal>
      </div>
    </div>    
  </div>
</template>

<script setup lang="ts">
import ObjectForm from './ObjectForm.vue';
import { handleDeleteObject } from '~/composables/handleDeleteObject';

const isOpen = ref(false);
const isOpenDelete = ref(false);
const props = defineProps({
  object: {
    type: Object,
    required: true,
  },
  fetchObjects: {
    type: Function,
    required: true,
  },
});

const { object, fetchObjects } = props;

const config = useRuntimeConfig();
const toast = useToast();

function deleteObject(id: any) {
  handleDeleteObject(id, config.public.API_URL, toast).then(() => {
    fetchObjects();
    isOpen.value = false;
    isOpenDelete.value = false;
  });
}
</script>