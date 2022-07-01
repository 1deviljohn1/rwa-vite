import { ref } from 'vue'
import { router } from '../router'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { ApiMethods, ApiEndpoints, UserResponse } from '../types'
import { normalizeErrors } from '../utils/errors'

export class Form {
    email = ref('')
    password = ref('')
    errors = ref<string[]>([])
    isLoading = ref(false)
    requiredFields: Array<string> = []
    apiEndpoint!: ApiEndpoints

    protected formData = (): object => {
        return {}
    }

    onSubmit = async () => {
        const formData = this.formData()

        this.isLoading.value = true
        const user = await api(ApiMethods.Post, this.apiEndpoint, formData)
        const userData = user.responseData as UserResponse
        this.isLoading.value = false

        if (user.responseData) {
            this.errors.value = []
            const { setUser } = useUserStore()
            setUser(userData.user)
            router.push('/')
        } else {
            const errorData = user.responseError.response?.data.errors
            this.errors.value = normalizeErrors(errorData)
        }
    }
}
