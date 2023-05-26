<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <template v-if="!auth.authUser">
          <RouterLink :to="{ name: 'register' }">Register</RouterLink>
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </template>
        <template v-else>
          <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
          <button @click="auth.handleLogout()" type="button">Logout</button>
        </template>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <div>Auth</div>
    <slot />
  </main>
</template>
