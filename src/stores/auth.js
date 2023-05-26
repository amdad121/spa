import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const authErrors = ref([])
  const authStatus = ref(null)
  const processing = ref(false)
  const loading = ref(true)
  const authenticated = ref(false)

  const setErrorsEmpty = () => (authErrors.value = [])

  // const setStatusEmpty = () => (authStatus.value = null)

  const csrf = () => axios.get('sanctum/csrf-cookie')

  const getUser = async () => {
    // authenticated.value = false

    try {
      const response = await axios.get('api/user')

      user.value = response.data
      authenticated.value = true

      if (!response.data.email_verified_at) {
        this.router.push({ name: 'email-verify' })
      }

      loading.value = false
    } catch (error) {
      // console.log(error.response.data.message)
      loading.value = false
      authenticated.value = false
    }
  }

  const handleLogin = async (data) => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      await axios.post('login', {
        email: data.email,
        password: data.password,
      })

      await getUser()

      processing.value = false
      authenticated.value = true

      this.router.push({ name: 'dashboard' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }

      processing.value = false
    }
  }

  const handleRegister = async (data) => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      await axios.post('register', {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })

      processing.value = false
      authenticated.value = true

      this.router.push({ name: 'dashboard' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }

      processing.value = false
    }
  }

  const handleLogout = async () => {
    authErrors.value = []

    try {
      await csrf()
      await axios.post('logout')

      user.value = null
      authenticated.value = false

      this.router.push({ name: 'login' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    }
  }

  const handleForgotPassword = async (email) => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      const response = await axios.post('forgot-password', { email })

      authStatus.value = response.data.status

      processing.value = false

      this.router.push({ name: 'login' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }

      processing.value = false
    }
  }

  const handleResetPassword = async (data) => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      const response = await axios.post('reset-password', {
        token: data.token,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })

      authStatus.value = response.data.status

      processing.value = false

      this.router.push({ name: 'login' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }

      processing.value = false
    }
  }

  const handleVerificationSend = async () => {
    authErrors.value = []

    try {
      await csrf()
      const response = await axios.post('email/verification-notification')

      authStatus.value = response.data.status
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    }
  }

  return {
    user,
    authErrors,
    authStatus,
    processing,
    loading,
    authenticated,
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
