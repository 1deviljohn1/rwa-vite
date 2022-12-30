import { computed, ref } from 'vue'
import { router } from '../router'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { useArticles } from '../composable/articles'
import { ApiMethods, ApiEndpoints, Author, Tab, ArticlesTypes, Article } from '../types'

const error = ref('')
const profileLoading = ref(true)
const articlesLoading = ref(false)
const followProcessing = ref(false)
const profile = ref<Author | null>(null)
const isFollowing = ref(false)
const favoriteProcessing = ref(false)
const activeTab = ref(ArticlesTypes.Own)
const articles = ref<Array<Article>>([])
const { get: getArticles, favorite: favoriteArticle } = useArticles()
const tabs: Array<Tab> = [
    { title: 'My Articles', name: ArticlesTypes.Own },
    { title: 'Favorited Articles', name: ArticlesTypes.Favorited },
]

const buttonClass = computed(() => {
    return isFollowing.value ? 'btn-outline-secondary' : 'btn-secondary'
})

const isFollowingText = computed(() => {
    return isFollowing.value ? 'Unfollow' : 'Follow'
})

const isCurrentUser = computed((): boolean => {
    const { user } = useUserStore()
    const username = ref(user?.username)
    const pageUsername = router.currentRoute.value.params.username

    return pageUsername === username.value
})

const loadProfile = async () => {
    profileLoading.value = true
    const { token } = useUserStore()
    const user = router.currentRoute.value.params.username
    const profileResponse = await api(
        ApiMethods.Get,
        ApiEndpoints.Profile.replace(':username', user as string),
        null,
        token
    )

    if (profileResponse.responseData) {
        profile.value = profileResponse.responseData.profile as Author
        isFollowing.value = profile.value.following
    }

    if (profileResponse.responseError && profileResponse.responseError.response?.status === 404) {
        error.value = `There is no user with username <b>${user}</b>`
    }

    profileLoading.value = false
}

const loadArticles = async (tab: ArticlesTypes) => {
    const user = router.currentRoute.value.params.username
    const payload = tab === ArticlesTypes.Own ? { author: user } : { favorited: user }

    articlesLoading.value = true
    activeTab.value = tab
    const articlesData = await getArticles(ArticlesTypes.Articles, payload)
    articles.value = articlesData
    articlesLoading.value = false
}

const follow = async () => {
    followProcessing.value = true

    const { token } = useUserStore()
    const pageUsername = router.currentRoute.value.params.username
    const method = isFollowing.value ? ApiMethods.Delete : ApiMethods.Post
    const userData = await api(method, ApiEndpoints.Follow.replace(':username', pageUsername as string), null, token)
    const user = userData.responseData.profile as Author
    isFollowing.value = user.following

    followProcessing.value = false
}

const favorite = async (article: Article) => {
    favoriteProcessing.value = true
    const articlesData = await favoriteArticle(article.slug, article.favorited)
    const updatedIndex = articles.value.findIndex((item) => item.slug === article.slug)
    articles.value[updatedIndex] = articlesData
    favoriteProcessing.value = false
}

export const useProfile = () => {
    return {
        profile,
        error,
        profileLoading,
        articlesLoading,
        isCurrentUser,
        isFollowingText,
        followProcessing,
        favoriteProcessing,
        buttonClass,
        tabs,
        activeTab,
        articles,
        follow,
        favorite,
        loadProfile,
        loadArticles,
    }
}
