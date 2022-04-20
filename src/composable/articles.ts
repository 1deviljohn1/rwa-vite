import { ref } from 'vue'
import { api } from '../services/api'
import { ArticlesResponse, ApiEndpoints, ApiMethods } from '../types'

export const useArticles = async () => {
    const articlesData = ref(await api(ApiMethods.Get, ApiEndpoints.Articles))
    const articles = articlesData.value.responseData as ArticlesResponse

    return articles.articles
}
