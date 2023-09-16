import { createApp } from "vue";
/* @ts-ignore */
import App from "@/App.vue";
import { createPinia } from "pinia";
/* @ts-ignore */
import router from "@/router/router";
import "./nullStyle.css";

const app = createApp(App);
app.use(router).use(createPinia()).mount("#app");
