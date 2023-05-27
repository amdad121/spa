import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home' },
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'Register', middleware: 'guest' },
      component: () => import('../views/Auth/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login', middleware: 'guest' },
      component: () => import('../views/Auth/Login.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { title: 'Forgot Password', middleware: 'guest' },
      component: () => import('../views/Auth/ForgotPassword.vue'),
    },
    {
      path: '/password-reset/:token',
      name: 'password-reset',
      meta: { title: 'Password Reset', middleware: 'guest' },
      component: () => import('../views/Auth/ResetPassword.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { title: 'Dashboard', middleware: 'auth' },
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/email-verify',
      name: 'email-verify',
      meta: { title: 'Email Verify', middleware: 'auth' },
      component: () => import('../views/Auth/EmailVerify.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ' :: ' + import.meta.env.VITE_APP_NAME

  const auth = useAuthStore()
  await auth.getUser()

  auth.setErrorsEmpty()

  // if (!auth.authStatus) {
  //   auth.setStatusEmpty()
  // }

  if (to.meta.middleware == 'guest' && auth.authenticated) {
    next({ name: 'dashboard' })
  } else if (to.meta.middleware == 'auth' && !auth.authenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
