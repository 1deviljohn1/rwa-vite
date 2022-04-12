import { createRouter, createWebHistory } from 'vue-router'
import { PageHome, PageLogin, PageRegister, PageProfile, PageSettings, PageArticleCreate, PageArticle } from '../pages'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: PageHome,
    },
    {
        path: '/login',
        name: 'Login',
        component: PageLogin,
    },
    {
        path: '/register',
        name: 'Register',
        component: PageRegister,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: PageProfile,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: PageSettings,
    },
    {
        path: '/article-create',
        name: 'ArticleCreate',
        component: PageArticleCreate,
    },
    {
        path: '/article',
        name: 'Article',
        component: PageArticle,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'active',
})
