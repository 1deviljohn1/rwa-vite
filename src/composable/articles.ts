import { ref } from 'vue'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { ArticlesResponse, ApiEndpoints, ApiMethods, ArticlesTypes } from '../types'

export const useArticles = async (type: ArticlesTypes) => {
    const { token } = useUserStore()
    const endpoint = type === ArticlesTypes.Articles ? ApiEndpoints.Articles : ApiEndpoints.Feed

    const articlesData = ref(await api(ApiMethods.Get, endpoint, null, token))
    const articles = articlesData.value.responseData as ArticlesResponse

    return articles.articles
}
