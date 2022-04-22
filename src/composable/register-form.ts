import { ref, computed } from 'vue'
import { Form } from '../composable/form'
import { ApiEndpoints } from '../types'

class RegisterForm extends Form {
    username = ref('')
    apiEndpoint = ApiEndpoints.Register

    protected formData = (): object => {
        return {
            user: {
                username: this.username.value,
                email: this.email.value,
                password: this.password.value,
            },
        }
    }

    isSubmitAllowed = computed((): boolean => {
        return !!this.username.value.length && !!this.email.value.length && !!this.password.value.length
    })
}

export const useRegisterForm = () => {
    const RegisterFormObj = new RegisterForm()
    return {
        username: RegisterFormObj.username,
        email: RegisterFormObj.email,
        errors: RegisterFormObj.errors,
        isLoading: RegisterFormObj.isLoading,
        isSubmitAllowed: RegisterFormObj.isSubmitAllowed,
        onSubmit: RegisterFormObj.onSubmit,
        password: RegisterFormObj.password,
    }
}
