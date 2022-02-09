import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/PageHome.vue'
import Login from '../pages/PageLogin.vue'
import Register from '../pages/PageRegister.vue'
import Profile from '../pages/PageProfile.vue'
import Settings from '../pages/PageSettings.vue'
import ArticleCreate from '../pages/PageArticleCreate.vue'
import Article from '../pages/PageArticle.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
    },
    {
        path: '/article-create',
        name: 'ArticleCreate',
        component: ArticleCreate,
    },
    {
        path: '/article',
        name: 'Article',
        component: Article,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
