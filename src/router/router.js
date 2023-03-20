import { createRouter, createWebHistory } from "vue-router";

import PremereMain from "@/pages/PremereMain.vue";
import RandomMain from "@/pages/RandomMain.vue";

const routes = [
  {
    path: "/",
    component: PremereMain,
  },
  {
    path: "/random",
    component: RandomMain,
    props: true,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
