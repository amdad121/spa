import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const authErrors = ref([])
  const authStatus = ref(null)
  const processing = ref(false)
  const loading = ref(true)
  const authenticated = ref(false)

  const router = useRouter()

  const setErrorsEmpty = () => (authErrors.value = [])

  // const setStatusEmpty = () => (authStatus.value = null)

  const csrf = () => axios.get('sanctum/csrf-cookie')

  const getUser = async () => {
    // authenticated.value = false
    loading.value = true

    try {
      const response = await axios.get('api/user')

      user.value = response.data
      authenticated.value = true

      if (!response.data.email_verified_at) {
        router.push({ name: 'email-verify' })
      }
    } catch (error) {
      // console.log(error.response.data.message)
      user.value = null
      authenticated.value = false
    } finally {
      loading.value = false
    }
  }

  const handleLogin = async ({ ...data }) => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      await axios.post('login', data)

      await getUser()

      router.push({ name: 'dashboard' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const handleRegister = async ({ ...data }) => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      await axios.post('register', data)

      await getUser()

      router.push({ name: 'dashboard' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const handleLogout = async () => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      await axios.post('logout')

      user.value = null
      authenticated.value = false

      router.push({ name: 'login' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const handleForgotPassword = async (email) => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      const response = await axios.post('forgot-password', { email })

      authStatus.value = response.data.status

      router.push({ name: 'login' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const handleResetPassword = async ({ ...data }) => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      const response = await axios.post('reset-password', data)

      authStatus.value = response.data.status

      router.push({ name: 'login' })
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  const handleVerificationSend = async () => {
    authErrors.value = []
    processing.value = true

    try {
      await csrf()
      const response = await axios.post('email/verification-notification')

      authStatus.value = response.data.status
    } catch (error) {
      if (error.response?.status === 422) {
        authErrors.value = error.response.data.errors
      }
    } finally {
      processing.value = false
    }
  }

  watch(
    authenticated,
    (val) => {
      window.localStorage.setItem('authenticated', JSON.stringify(val))
    },
    { deep: true }
  )

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
