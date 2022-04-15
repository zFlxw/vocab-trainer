import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/stores/stores";
import hasToken from '@/App.vue';
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ProfileView from "@/views/ProfileView.vue";
import LearnEditView from "@/views/LearnEditView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },
  {
    path: "/learn",
    component: LearnEditView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
