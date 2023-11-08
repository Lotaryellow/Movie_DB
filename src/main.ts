import { createApp } from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import App from "@/App.vue";
import { createPinia } from "pinia";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import router from "@/router/router";
import "./nullStyle.css";

const app = createApp(App);
app.use(router).use(createPinia()).mount("#app");
