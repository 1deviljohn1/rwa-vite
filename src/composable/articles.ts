import { ref } from 'vue'
import { useFetch } from '../services/fetch'
import { ArticlesResponse, ApiEndpoints } from '../types'

const articlesData = ref(await useFetch(ApiEndpoints.Articles))
const articles = articlesData.value.data as ArticlesResponse

export default articles.articles
