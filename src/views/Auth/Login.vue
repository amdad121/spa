<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()

const form = ref({
  email: null,
  password: null,
})
</script>

<template>
  <main>
    <div>
      <div v-if="auth.authStatus">{{ auth.authStatus }}</div>
      <form @submit.prevent="auth.handleLogin(form)" method="post">
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="form.email"
          />
          <div class="text-red-500" v-if="auth.authErrors.email">
            {{ auth.authErrors.email[0] }}
          </div>
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            class="rounded-md border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="form.password"
          />
          <div class="text-red-500" v-if="auth.authErrors.password">
            {{ auth.authErrors.password[0] }}
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <br />
      <router-link :to="{ name: 'forgot-password' }"
        >Forgot Password</router-link
      >
    </div>
  </main>
</template>
