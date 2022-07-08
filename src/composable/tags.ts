import { ref } from 'vue'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { ApiEndpoints, ApiMethods } from '../types'

export const useTags = async () => {
    const { token } = useUserStore()
    const tagsData = ref(await api(ApiMethods.Get, ApiEndpoints.Tags, null, token))
    const tags = tagsData.value.responseData.tags as string[]
    return tags.filter(tag => tag)
}
