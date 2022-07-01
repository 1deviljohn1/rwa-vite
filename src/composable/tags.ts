import { ref } from 'vue'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { TagsResponse, ApiEndpoints, ApiMethods } from '../types'

export const useTags = async () => {
    const { token } = useUserStore()
    const tagsData = ref(await api(ApiMethods.Get, ApiEndpoints.Tags, null, token))
    const tags = tagsData.value.responseData as TagsResponse
    return tags.tags.filter(tag => tag)
}
