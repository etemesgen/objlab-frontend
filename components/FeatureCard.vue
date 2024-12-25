<template>
  <div class="bg-white shadow-md rounded-lg p-6 text-center transition ease-in-out duration-300 hover:scale-105">
    <Icon :name="icon || ''" class="w-12 h-12 text-[#94543d] mb-4" />
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  icon: String,
  title: String,
  description: String,
});
</script>