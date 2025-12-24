import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import InstagramStalker from "../pages/InstagramStalker.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Dashboard",
      icon: "home",
    },
  },
  {
    path: "/instagram-stalker",
    name: "InstagramStalker",
    component: InstagramStalker,
    meta: {
      title: "Instagram Stalker",
      icon: "instagram",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Update document title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - API Tools Dashboard`;
  next();
});

export default router;
