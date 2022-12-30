<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useProfile } from '../composable/profile'
import { AppTabs, AppArticle } from '../components'
import { ArticlesTypes } from '../types'
const {
    error,
    profileLoading,
    articlesLoading,
    profile,
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
} = useProfile()

onBeforeMount(async () => {
    await Promise.all([loadProfile(), loadArticles(ArticlesTypes.Own)])
})
</script>

<template>
    <div v-if="!profileLoading" class="profile-page">
        <div v-if="error" class="container">
            <div class="row">
                <p v-html="error"></p>
            </div>
        </div>

        <template v-else>
            <div class="user-info">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-md-10 offset-md-1">
                            <img :src="profile?.image" class="user-img" />
                            <h4>{{ profile?.username }}</h4>
                            <p>{{ profile?.bio }}</p>

                            <button
                                v-if="!isCurrentUser"
                                :class="buttonClass"
                                class="btn btn-sm action-btn"
                                :disabled="followProcessing"
                                @click="follow"
                            >
                                <i class="ion-plus-round"></i>
                                &nbsp; {{ isFollowingText }} {{ profile?.username }}
                            </button>
                            <router-link v-else to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
                                <i class="ion-gear-a"></i>
                                &nbsp; Edit Profile Settings
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <AppTabs
                            :tabs="tabs"
                            :active-feed="activeTab"
                            :loading="articlesLoading"
                            @select="loadArticles"
                        />

                        <div v-for="article in articles" :key="article.slug" class="article-preview">
                            <AppArticle
                                :article="article"
                                :favorite-processing="favoriteProcessing"
                                @favorite="favorite"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
