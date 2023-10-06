import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'

const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const ManageView = () => import('@/views/ManageView.vue')
const SongView = () => import('@/views/SongView.vue')

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  {
    name: 'authenticated',
    path: '/authenticated',
    meta: {
      requiresAuth: true
    },
    children: [{ name: 'manage', path: 'manage', component: ManageView }]
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongView
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()

  if (store.userLoggedIn) next()
  else next({ name: 'home' })
})

export default router
