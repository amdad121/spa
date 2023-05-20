import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      meta: { middleware: 'guest' },
      component: () => import('../views/Auth/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { middleware: 'guest' },
      component: () => import('../views/Auth/Login.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { middleware: 'guest' },
      component: () => import('../views/Auth/ForgotPassword.vue'),
    },
    {
      path: '/password-reset/:token',
      name: 'password-reset',
      meta: { middleware: 'guest' },
      component: () => import('../views/Auth/ResetPassword.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { middleware: 'auth' },
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/email-verify',
      name: 'email-verify',
      meta: { middleware: 'auth' },
      component: () => import('../views/Auth/EmailVerify.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  auth.setErrorsEmpty()
  // auth.setStatusEmpty()
  next()
})

export default router
