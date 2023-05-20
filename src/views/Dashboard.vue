<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getUser()
})
</script>

<template>
  <main>
    <h2>{{ authStore.authUser?.name }}</h2>
    <h3>{{ authStore.authUser?.email }}</h3>
  </main>
</template>
