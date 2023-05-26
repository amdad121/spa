<script setup>
import DefaultLayout from '../Layouts/DefaultLayout.vue'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <router-link :to="{ name: 'login' }">Login</router-link>
  <DefaultLayout>
    <TheWelcome />
  </DefaultLayout>
</template>
