<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { router } from '../router'
import { useUserStore } from '../stores/user'
import { isImage } from '../utils/string'

const { isAuth, user } = storeToRefs(useUserStore())
const { clearUser } = useUserStore()
const hasAvatar = computed((): boolean => {
    return !!(user.value?.image && isImage(user.value?.image))
})

const logout = () => {
    clearUser()
    router.push({ name: 'Home' })
}
</script>

<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link to="/" class="navbar-brand">conduit</router-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li v-if="isAuth" class="nav-item">
                    <router-link to="/article-create" class="nav-link">
                        <i class="ion-compose"></i>&nbsp;New Article</router-link
                    >
                </li>
                <li v-if="isAuth" class="nav-item">
                    <router-link to="/settings" class="nav-link"><i class="ion-gear-a"></i>&nbsp;Settings</router-link>
                </li>
                <li v-if="isAuth" class="nav-item">
                    <router-link :to="`/profile/${user?.username}`" class="nav-link">
                        <img v-if="hasAvatar" class="user-pic" :src="(user?.image as string)" :alt="user?.username" />
                        {{ user?.username }}
                    </router-link>
                </li>
                <li v-if="isAuth" class="nav-item">
                    <button class="clear btn-logout" @click="logout">
                        <i class="ion-log-out"></i>
                    </button>
                </li>
                <li v-if="!isAuth" class="nav-item">
                    <router-link to="/login" class="nav-link">Sign in</router-link>
                </li>
                <li v-if="!isAuth" class="nav-item">
                    <router-link to="/register" class="nav-link">Sign up</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
