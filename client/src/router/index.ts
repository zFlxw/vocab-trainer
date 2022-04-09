import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useUserStore } from '@/stores/stores'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/profile',
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.getUser && userStore.getUser.token) {
        next();
      } else {
        next({ name: 'home' });
      }
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
