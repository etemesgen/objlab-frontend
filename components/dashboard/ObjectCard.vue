<template>
  <div class="flex gap-4 items-center">
    <img :src="object.image" alt="object" class="w-20 h-20">
    <div class="flex flex-col">
      <h2 class="text-xl font-semibold leading-normal text-[#94543d]">{{ object.name }}</h2>
      <p class="text-sm font-medium leading-normal text-[#94543d]">{{ object.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  object: {
    type: Object,
    required: true
  }
})

const { object } = props
</script>