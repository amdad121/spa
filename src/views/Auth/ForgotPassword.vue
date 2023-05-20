<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()

const email = ref(null)
</script>

<template>
  <main>
    <div>
      <form @submit.prevent="auth.handleForgotPassword(email)" method="post">
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email" />
          <div class="text-red-500" v-if="auth.authErrors.email">
            {{ auth.authErrors.email[0] }}
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <br />
      <router-link :to="{ name: 'login' }">Back to Login</router-link>
    </div>
  </main>
</template>
