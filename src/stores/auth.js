import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref(null)
  const authErrors = ref([])
  const authStatus = ref(null)

  function setErrorsEmpty() {
    authErrors.value = []
  }

  // function setStatusEmpty() {
  //   authStatus.value = null
  // }

  async function getToken() {
    await axios.get('sanctum/csrf-cookie')
  }

  async function getUser() {
    await getToken()
    const response = await axios.get('api/user')
    authUser.value = response.data

    if (!response.data.email_verified_at) {
      this.router.push({ name: 'email-verify' })
    }
  }

  async function handleLogin(data) {
    authErrors.value = []
    try {
      await getToken()
      await axios.post('login', {
        email: data.email,
        password: data.password,
      })

      this.router.push({ name: 'dashboard' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    }
  }

  async function handleRegister(data) {
    authErrors.value = []
    try {
      await getToken()
      await axios.post('register', {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })

      this.router.push({ name: 'dashboard' })
    } catch (error) {
      if (error.response.status === 422) {
        authErrors.value = error.response.data.errors
      }
    }
  }

  async function handleLogout() {
    authErrors.value = []
    try {
      await getToken()
      await axios.post('logout')

      authUser.value = null

      this.router.push({ name: 'login' })
    } catch (error) {
      if (error.response.status === 422) {
        authErrors.value = error.response.data.errors
      }
    }
  }

  async function handleForgotPassword(email) {
    authErrors.value = []
    try {
      await getToken()
      const response = await axios.post('forgot-password', { email })

      authStatus.value = response.data.status

      this.router.push({ name: 'login' })
    } catch (error) {
      if (error.response.status === 422) {
        authErrors.value = error.response.data.errors
      }
    }
  }

  async function handleResetPassword(data) {
    authErrors.value = []
    try {
      await getToken()
      const response = await axios.post('reset-password', {
        token: data.token,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })

      authStatus.value = response.data.status

      this.router.push({ name: 'login' })
    } catch (error) {
      if (error.response.status === 422) {
        authErrors.value = error.response.data.errors
      }
    }
  }

  async function handleVerificationSend(data) {
    authErrors.value = []
    try {
      await getToken()
      const response = await axios.post('email/verification-notification')

      authStatus.value = response.data.status
    } catch (error) {
      if (error.response.status === 422) {
        authErrors.value = error.response.data.errors
      }
    }
  }

  return {
    authUser,
    authErrors,
    authStatus,
    setErrorsEmpty,
    // setStatusEmpty,
    getUser,
    handleLogin,
    handleRegister,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
    handleVerificationSend,
  }
})
