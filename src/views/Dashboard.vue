<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getUser()
})
</script>

<template>
  <AuthenticatedLayout>
    <h2>{{ authStore.authUser?.name }}</h2>
    <h3>{{ authStore.authUser?.email }}</h3>
  </AuthenticatedLayout>
</template>
