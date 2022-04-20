import { defineStore } from 'pinia'
import { User } from '../types'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: undefined as User | undefined,
    }),
    actions: {
        setUser(user: User) {
            this.user = user
        },
    },
})
