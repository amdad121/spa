<script setup>
import { useAuthStore } from '../stores/auth'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.vue'

const auth = useAuthStore()
</script>

<template>
  <AuthenticatedLayout>
    <h2>{{ auth.user?.name }}</h2>
    <h3>{{ auth.user?.email }}</h3>
  </AuthenticatedLayout>
</template>
