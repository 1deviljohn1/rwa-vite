import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { PageHome, PageLogin, PageRegister, PageProfile, PageSettings, PageArticleCreate, PageArticle } from '../pages'
import { useUserStore } from '../stores/user'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: PageHome,
    },
    {
        path: '/login',
        name: 'Login',
        component: PageLogin,
        meta: { onlyForGuest: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: PageRegister,
        meta: { onlyForGuest: true },
    },
    {
        path: '/profile/:username',
        name: 'Profile',
        component: PageProfile,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: PageSettings,
        meta: { requiresAuth: true },
    },
    {
        path: '/article-create',
        name: 'ArticleCreate',
        component: PageArticleCreate,
        meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
    const { isAuth } = useUserStore()

    if (to.meta.requiresAuth && !isAuth) {
        next({ name: 'Login' })
    } else if (to.meta.onlyForGuest && isAuth) {
        next({ name: 'Home' })
    } else {
        next()
    }
})
