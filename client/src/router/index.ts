import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/profile',
    component: ProfileView
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
