import { computed, ref } from 'vue'
import { router } from '../router'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { ApiMethods, ApiEndpoints, Author } from '../types'

const error = ref('')
const isLoading = ref(true)
const isFollowProcessing = ref(false)
const profile = ref<Author | null>(null)
const isFollowing = ref(false)

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

    isLoading.value = false
}

const follow = async () => {
    isFollowProcessing.value = true

    const { token } = useUserStore()
    const pageUsername = router.currentRoute.value.params.username
    const method = isFollowing.value ? ApiMethods.Delete : ApiMethods.Post
    const userData = await api(method, ApiEndpoints.Follow.replace(':username', pageUsername as string), null, token)
    const user = userData.responseData.profile as Author
    isFollowing.value = user.following

    isFollowProcessing.value = false
}

export const useProfile = () => {
    return {
        profile,
        error,
        isLoading,
        isCurrentUser,
        isFollowingText,
        isFollowProcessing,
        buttonClass,
        follow,
        loadProfile,
    }
}
