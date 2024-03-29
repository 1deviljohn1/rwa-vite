import { defineStore } from 'pinia'
import { api } from '../services/api'
import { User } from '../types'
import { ApiEndpoints, ApiMethods } from '../types'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        token: '',
    }),
    getters: {
        isAuth: (state) => !!state.user?.username
    },
    actions: {
        setUser(user: User) {
            localStorage.setItem('u_t', user.token)
            this.user = user
            this.setToken(user.token)
        },
        clearUser() {
            localStorage.removeItem('u_t')
            this.user = null
            this.token = ''
        },
        setToken(token: string) {
            this.token = token
        },
        async getUserByToken(token: string) {
            const userData = await api(ApiMethods.Get, ApiEndpoints.User, null, token)
            const user = userData.responseData.user as User
            this.setUser(user)
            this.setToken(token)
        },
    },
})
