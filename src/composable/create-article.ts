import { computed, ref } from 'vue'
import { ApiEndpoints, ApiMethods } from '../types'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { router } from '../router'
import { normalizeErrors } from '../utils/errors'

const isLoading = ref(false)
const title = ref('')
const description = ref('')
const body = ref('')
const tagList = ref('')
const errors = ref<string[]>([])
const isSubmitAllowed = computed((): boolean => {
    return !!title.value && !!description.value && !!body.value
})

const clearForm = () => {
    title.value = '';
    description.value = '';
    body.value = '';
    tagList.value = '';
}

const onSubmit = async () => {
    isLoading.value = true
    const { token } = useUserStore()

    const formData = {
        article: {
            title: title.value,
            description: description.value,
            body: body.value,
            tagList: tagList.value.split(','),
        },
    }

    const savedArticle = await api(ApiMethods.Post, ApiEndpoints.Articles, formData, token)
    if (savedArticle.responseData) {
        errors.value = []
        clearForm()
        router.push({ name: 'Home' })
    } else {
        const errorData = savedArticle.responseError.response?.data.errors
        errors.value = normalizeErrors(errorData)
    }

    isLoading.value = false
}

export const useCreateArticle = () => {
    return {
        errors,
        isLoading,
        title,
        description,
        body,
        tagList,
        isSubmitAllowed,
        onSubmit,
    }
}
