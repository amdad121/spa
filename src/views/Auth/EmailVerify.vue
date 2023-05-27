<script setup>
import GuestLayout from '../../Layouts/GuestLayout.vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
</script>

<template>
  <GuestLayout>
    <h3 class="mb-4 border-b pb-2 text-center text-xl font-semibold">
      Email Verify
    </h3>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <div
      v-if="auth.authStatus"
      class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"
    >
      A new verification link has been sent to the email address you provided
      during registration.
    </div>

    <div class="mt-4 flex items-center justify-between">
      <button
        @click="auth.handleVerificationSend()"
        type="button"
        :class="{ 'cursor-not-allowed ': auth.processing }"
        :disabled="auth.processing"
      >
        Resend Verification Email
      </button>

      <button
        @click="auth.handleLogout()"
        type="submit"
        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
      >
        Log Out
      </button>
    </div>
  </GuestLayout>
</template>
