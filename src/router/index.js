import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import InstagramStalker from "../pages/stalker/InstagramStalker.vue";
import EWalletCheck from "../pages/tools/EWalletCheck.vue";

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
  {
    path: "/e-wallet-check",
    name: "EWalletCheck",
    component: EWalletCheck,
    meta: {
      title: "E-Wallet Check",
      icon: "wallet",
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
