<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>

<template>
  <header class="bg-gray-100 shadow">
    <div class="container mx-auto py-2">
      <nav class="flex items-center justify-between">
        <div class="text-xl font-semibold">
          <RouterLink :to="{ name: 'home' }">LOGO</RouterLink>
        </div>
        <div class="space-x-1">
          <template v-if="!auth.authenticated">
            <RouterLink
              class="px-2 py-2 hover:shadow-inner"
              :to="{ name: 'login' }"
              >Login</RouterLink
            >
            <RouterLink
              class="px-2 py-2 hover:shadow-inner"
              :to="{ name: 'register' }"
              >Register</RouterLink
            >
          </template>
          <template v-else>
            <RouterLink
              class="px-2 py-2 hover:shadow-inner"
              :to="{ name: 'dashboard' }"
              >Dashboard</RouterLink
            >
          </template>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <div class="container mx-auto my-5">
      <slot />
    </div>
  </main>
</template>
