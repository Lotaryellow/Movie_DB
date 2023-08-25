import { createRouter, createWebHistory } from "vue-router";

import PremereMain from "@/pages/PremereMain.vue";
import RandomMain from "@/pages/RandomMain.vue";
import FilmInfo from "@/pages/FilmInfo.vue";

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

  {
    path: "/info/:id?",
    component: FilmInfo,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
