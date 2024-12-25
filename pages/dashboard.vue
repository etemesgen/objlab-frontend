<template>
  <div class="flex flex-col m-24">
    <div class="flex justify-between items-baseline">
      <h1 class="text-3xl font-medium leading-normal"><span class="bg-gradient-to-r from-[#94543d] to-[#e2ad74] to-50% bg-clip-text text-transparent">Salut,</span> {{ userName }} 👋 </h1>
      <div class="flex gap-10 pt-5 items-center">
        <Icon name="lucide:circle-user-round" class="w-6 h-6" />
        <Icon name="lucide:log-out" class="w-6 h-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userName = ref('')
const config = useRuntimeConfig()

onMounted(() => {
  const user: any = localStorage.getItem('user')

  if (!user) {
    navigateTo('/signin')
  }

  userName.value = JSON.parse(user).name
})

</script>