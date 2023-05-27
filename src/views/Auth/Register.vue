<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import GuestLayout from '../../Layouts/GuestLayout.vue'

const auth = useAuthStore()

const form = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
})
</script>

<template>
  <GuestLayout>
    <h3 class="mb-4 border-b pb-2 text-center text-xl font-semibold">
      Register
    </h3>
    <form
      @submit.prevent="auth.handleRegister(form)"
      class="flex flex-col gap-4"
    >
      <div class="flex flex-col gap-2">
        <label for="name">Name</label>
        <input
          class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          v-model="form.name"
        />
        <div class="text-red-500" v-if="auth.authErrors.name">
          {{ auth.authErrors.name[0] }}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <input
          class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="email"
          v-model="form.email"
        />
        <div class="text-red-500" v-if="auth.authErrors.email">
          {{ auth.authErrors.email[0] }}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input
          class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="password"
          v-model="form.password"
        />
        <div class="text-red-500" v-if="auth.authErrors.password">
          {{ auth.authErrors.password[0] }}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="confirm-password">Confirm Password</label>
        <input
          class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="password"
          v-model="form.password_confirmation"
        />
        <div class="text-red-500" v-if="auth.authErrors.password_confirmation">
          {{ auth.authErrors.password_confirmation[0] }}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <router-link :to="{ name: 'login' }">Back to Login</router-link>
        </div>
        <div>
          <button
            type="submit"
            class="inline-flex items-center rounded-md bg-green-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out hover:bg-green-400"
            :class="{ 'cursor-not-allowed ': auth.processing }"
            :disabled="auth.processing"
          >
            <svg
              v-if="auth.processing"
              class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
            Register
          </button>
        </div>
      </div>
    </form>
  </GuestLayout>
</template>
