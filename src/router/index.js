import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Settings from "../pages/Settings.vue";
import ArticleCreate from "../pages/ArticleCreate.vue";
import Article from "../pages/Article.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/article-create",
    name: "ArticleCreate",
    component: ArticleCreate,
  },
  {
    path: "/article",
    name: "Article",
    component: Article,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
