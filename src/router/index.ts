import { createRouter, createWebHashHistory } from "vue-router";
export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/404",
    name: "NotFund",
    hidden: true,
    meta: { notNeedAuth: true },
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
