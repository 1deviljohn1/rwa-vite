<script setup lang="ts">
import { computed, ref } from 'vue'
import { router } from '../router'
import { api } from '../services/api'
import { useUserStore } from '../stores/user'
import { ApiMethods, ApiEndpoints, UserResponse } from '../types'

const { user, token, setUser } = useUserStore()
const image = ref(user?.image || '')
const username = ref(user?.username)
const bio = ref(user?.bio || '')
const email = ref(user?.email)
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const isSubmitAllowed = computed(() => {
    return password.value
})

const submit = async () => {
    isLoading.value = true
    error.value = ''

    const formData = {
        user: {
            image: image.value,
            username: username.value,
            bio: bio.value,
            email: email.value,
            password: password.value,
        },
    }

    const userData = await api(ApiMethods.Put, ApiEndpoints.User, formData, token)
    if (userData.responseData) {
        const user = userData.responseData as UserResponse
        setUser(user.user)
        router.push({ name: 'Profile' })
    } else {
        error.value = userData.responseError.response?.data
    }

    isLoading.value = false
    password.value = ''
}
</script>

<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <ul v-if="error" class="error-messages">
                        <li>{{ error }}</li>
                    </ul>

                    <form @submit.prevent="submit">
                        <fieldset>
                            <fieldset class="form-group" :disabled="isLoading">
                                <input
                                    v-model="image"
                                    class="form-control"
                                    type="text"
                                    placeholder="URL of profile picture"
                                />
                            </fieldset>
                            <fieldset class="form-group" :disabled="isLoading">
                                <input
                                    v-model="username"
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                />
                            </fieldset>
                            <fieldset class="form-group" :disabled="isLoading">
                                <textarea
                                    v-model="bio"
                                    class="form-control form-control-lg"
                                    rows="8"
                                    placeholder="Short bio about you"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group" :disabled="isLoading">
                                <input
                                    v-model="email"
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                />
                            </fieldset>
                            <fieldset class="form-group" :disabled="isLoading">
                                <input
                                    v-model="password"
                                    class="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                />
                            </fieldset>
                            <button
                                class="btn btn-lg btn-primary pull-xs-right"
                                :disabled="isLoading || !isSubmitAllowed"
                            >
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
