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
      meta: { requiresAuth: false },
      component: () => import('../views/Auth/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import('../views/Auth/Login.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { requiresAuth: false },
      component: () => import('../views/Auth/ForgotPassword.vue'),
    },
    {
      path: '/password-reset/:token',
      name: 'password-reset',
      meta: { requiresAuth: false },
      component: () => import('../views/Auth/ResetPassword.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requiresAuth: true },
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/email-verify',
      name: 'email-verify',
      meta: { requiresAuth: true },
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

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  auth.setErrorsEmpty()
  // auth.setStatusEmpty()
  await auth.getUser()
  // console.log(to.meta.requiresAuth && !auth.authUser.length)
  if (to.meta.requiresAuth && !auth.authUser.length) next({ name: 'login' })
  // else if (to.meta.requiresAuth && auth.authUser) next({ name: 'dashboard' })
  else next()
})

export default router
