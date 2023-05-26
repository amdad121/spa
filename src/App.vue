<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { computed } from 'vue'

const auth = useAuthStore()

auth.getUser()

const loading = computed(() => auth.loading)
</script>

<template>
  <div v-if="loading" class="fixed inset-0 bg-gray-900 text-white opacity-50">
    <div class="grid h-screen place-items-center">
      <div class="flex flex-col items-center justify-center gap-2">
        <svg
          class="h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading...
      </div>
    </div>
  </div>
  <template v-else>
    <RouterView />
  </template>
</template>
