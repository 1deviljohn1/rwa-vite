import { ref } from 'vue'
import { api } from '../services/api'
import { TagsResponse, ApiEndpoints, ApiMethods } from '../types'

export const useTags = async () => {
    const tagsData = ref(await api(ApiMethods.Get, ApiEndpoints.Tags))
    const tags = tagsData.value.responseData as TagsResponse
    return tags.tags
}
