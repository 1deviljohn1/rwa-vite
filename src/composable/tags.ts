import { ref } from 'vue'
import { useFetch } from '../services/fetch'
import { TagsResponse, ApiEndpoints } from '../types'

const tagsData = ref(await useFetch(ApiEndpoints.Tags))
const tags = tagsData.value.data as TagsResponse

export default tags.tags
