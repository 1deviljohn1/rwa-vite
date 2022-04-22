import { Form } from '../composable/form'
import { computed } from 'vue'
import { ApiEndpoints } from '../types'

class LoginForm extends Form {
    apiEndpoint = ApiEndpoints.Login

    protected formData = (): object => {
        return {
            user: {
                email: this.email.value,
                password: this.password.value,
            },
        }
    }

    isSubmitAllowed = computed((): boolean => {
        return !!this.email.value.length && !!this.password.value.length
    })
}

export const useLoginForm = () => {
    const LoginFormObj = new LoginForm()
    return {
        email: LoginFormObj.email,
        errors: LoginFormObj.errors,
        isLoading: LoginFormObj.isLoading,
        isSubmitAllowed: LoginFormObj.isSubmitAllowed,
        onSubmit: LoginFormObj.onSubmit,
        password: LoginFormObj.password,
    }
}
