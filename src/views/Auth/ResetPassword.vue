<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const route = useRoute()

const form = ref({
  token: route.params.token,
  email: route.query.email,
  password: null,
  password_confirmation: null,
})
</script>

<template>
  <main>
    <div>
      <form @submit.prevent="auth.handleResetPassword(form)" method="post">
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="form.email" readonly />
          <div class="text-red-500" v-if="auth.authErrors.email">
            {{ auth.authErrors.email[0] }}
          </div>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="form.password" />
          <div class="text-red-500" v-if="auth.authErrors.password">
            {{ auth.authErrors.password[0] }}
          </div>
        </div>
        <div>
          <label for="confirm-password">Confirm Password</label>
          <input type="password" v-model="form.password_confirmation" />
          <div
            class="text-red-500"
            v-if="auth.authErrors.password_confirmation"
          >
            {{ auth.authErrors.password_confirmation[0] }}
          </div>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </main>
</template>
