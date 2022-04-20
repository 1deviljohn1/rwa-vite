import { ref, computed, Ref } from 'vue'
import { router } from '../router'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { ApiMethods, ApiEndpoints, UserResponse } from '../types'

export const useLoginForm = () => {
    const email = ref('')
    const password = ref('')
    const errors: Ref<Array<string>> = ref([])
    const isLoading = ref(false)

    const isSubmitAllowed = computed((): boolean => {
        return !!email.value.length && !!password.value.length
    })

    const onSubmitForm = async () => {
        const loginData = {
            user: {
                email: email.value,
                password: password.value,
            },
        }

        isLoading.value = true
        const user = await api(ApiMethods.Post, ApiEndpoints.Login, loginData)
        const userData = user.responseData as UserResponse
        isLoading.value = false

        if (userData) {
            errors.value = []
            const { setUser } = useUserStore()
            setUser(userData.user)
            router.push('/')
        } else {
            const errorData = user.responseError?.response?.data.errors
            errors.value = Object.entries(errorData).map((error) => {
                return `${error[0]} ${error[1]}`
            })
        }
    }

    return { email, password, errors, isLoading, isSubmitAllowed, onSubmitForm }
}
