import { ref } from 'vue'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { ArticlesResponse, SingleArticleResponse, ApiEndpoints, ApiMethods, ArticlesTypes } from '../types'

const favorite = async (slug: string, favorited: boolean) => {
    const { token } = useUserStore()
    const endpoint = ApiEndpoints.FavoriteArticle.replace(':slug', slug)
    const method = favorited ? ApiMethods.Delete : ApiMethods.Post

    const articlesData = ref(await api(method, endpoint, null, token))
    const article = articlesData.value.responseData as SingleArticleResponse
    return article.article
}

const get = async (type: ArticlesTypes, payload?: Record<string, unknown>) => {
    const { token } = useUserStore()
    const endpoint = type === ArticlesTypes.Articles ? ApiEndpoints.Articles : ApiEndpoints.Feed

    const articlesData = ref(await api(ApiMethods.Get, endpoint, payload, token))
    const articles = articlesData.value.responseData as ArticlesResponse

    return articles.articles
}

export const useArticles = () => {
    return {
        get,
        favorite,
    }
}
