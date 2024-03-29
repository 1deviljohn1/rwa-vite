<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onBeforeMount, watch, computed } from 'vue'
import { AppArticle, AppTabs } from '../components'
import { useArticles } from '../composable/articles'
import { useTags } from '../composable/tags'
import { useUserStore } from '../stores/user'
import { Article, ArticlesTypes, Tab } from '../types'

const { token, isAuth } = storeToRefs(useUserStore())
const { get: getArticles, favorite: favoriteArticle } = useArticles()
const articles = ref<Array<Article>>([])
const tags = ref<Array<string>>([])
const error = ref('')
const loading = ref(true)
const favoriteProcessing = ref(false)
const type = computed<ArticlesTypes>(() => {
    return isAuth.value ? ArticlesTypes.Feed : ArticlesTypes.Articles
})
let activeFeed = ref<ArticlesTypes | null>(type.value)
let activeTag = ref('')
const tabs = ref<Array<Tab>>([{ title: 'Global Feed', name: ArticlesTypes.Articles }])
const errorMessage = 'Oops! Something went wrong!'
const noArticlesText = 'No articles are here... yet.'
const loadingArticlesText = 'Loading articles...'

if (isAuth.value) {
    tabs.value.unshift({ title: 'Your Feed', name: ArticlesTypes.Feed })
}

onBeforeMount(() => {
    loadPageData()
})

const loadPageData = async () => {
    try {
        const [articlesFetch, tagsFetch] = await Promise.all([getArticles(type.value), useTags()])
        articles.value = articlesFetch
        tags.value = tagsFetch
    } catch (err) {
        error.value = errorMessage
    } finally {
        loading.value = false
    }
}

const loadArticles = async (type: ArticlesTypes, payload?: Record<string, unknown>) => {
    loading.value = true
    error.value = ''
    try {
        const articlesData = await getArticles(type, payload)
        articles.value = articlesData
    } catch (err) {
        error.value = errorMessage
    } finally {
        loading.value = false
    }
}

const loadArticlesByType = async (type: ArticlesTypes) => {
    if (activeFeed.value === type) {
        return
    }
    activeFeed.value = type
    activeTag.value = ''
    loadArticles(type)
}

const loadArticlesByTag = async (tag: string) => {
    if (activeTag.value === tag) {
        return
    }
    activeFeed.value = null
    activeTag.value = tag
    loadArticles(ArticlesTypes.Articles, { tag: activeTag.value })
}

const favorite = async (article: Article) => {
    favoriteProcessing.value = true
    try {
        const articlesData = await favoriteArticle(article.slug, article.favorited)
        const updatedIndex = articles.value.findIndex((item) => item.slug === article.slug)
        articles.value[updatedIndex] = articlesData
    } catch (err) {
        error.value = errorMessage
    } finally {
        favoriteProcessing.value = false
    }
}

watch(token, async (value) => {
    if (!value) {
        tabs.value.shift()
        activeFeed.value = ArticlesTypes.Articles
        activeTag.value = ''
    }

    loadPageData()
})
</script>

<template>
    <div class="home-page">
        <div v-if="!isAuth" class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <AppTabs
                        :tabs="tabs"
                        :active-tag="activeTag"
                        :active-feed="activeFeed"
                        :loading="loading"
                        @select="loadArticlesByType"
                    />

                    <div v-if="error" class="article-preview">{{ error }}</div>
                    <template v-else>
                        <template v-if="articles.length && !loading">
                            <div v-for="article in articles" :key="article.slug" class="article-preview">
                                <AppArticle
                                    :article="article"
                                    :favorite-processing="favoriteProcessing"
                                    @favorite="favorite"
                                />
                            </div>
                        </template>
                        <div v-if="loading" class="article-preview">{{ loadingArticlesText }}</div>
                        <div v-if="!loading && !articles.length" class="article-preview">{{ noArticlesText }}</div>
                    </template>
                </div>

                <div v-if="tags.length" class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <div class="tag-list">
                            <button
                                v-for="(tag, index) in tags"
                                :key="index"
                                class="tag-pill tag-default clear"
                                :class="{ 'tag-primary': tag === activeTag }"
                                :disabled="loading"
                                @click="loadArticlesByTag(tag)"
                            >
                                {{ tag }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
