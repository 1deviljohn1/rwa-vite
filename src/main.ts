import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import { useUserStore } from './stores/user'
import './asssets/scss/app.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

if (localStorage.getItem('u_t')) {
    try {
        const { getUserByToken } = useUserStore()
        await getUserByToken(localStorage.getItem('u_t') || '')
    } catch (error) {
        error
    }
}

app.use(router)
app.mount('#app')
