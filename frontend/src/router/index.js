import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Data from "../views/Data.vue";

const routes = [
  {
    path: "/data",
    name: "Data",
    component: Data,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
