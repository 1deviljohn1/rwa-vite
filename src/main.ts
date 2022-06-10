import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router/index'
import App from './App.vue'
import { useUserStore } from './stores/user'
import './asssets/scss/app.scss'

const app = createApp(App)
app.use(router)
app.use(createPinia())

if (localStorage.getItem('u_t')) {
    const { getUserByToken } = useUserStore()
    await getUserByToken(localStorage.getItem('u_t') || '')
}

app.mount('#app')
