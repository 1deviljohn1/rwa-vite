<script setup lang="ts">
import { ref, onBeforeMount, Ref } from 'vue'
import { AppFeed } from '../components'
import { useArticles } from '../composable/articles'
import { useTags } from '../composable/tags'
import { useUserStore } from '../stores/user'
import { Article, ArticlesTypes } from '../types'

const { isAuth } = useUserStore()
const { get: getArticles, favorite: favoriteArticle } = useArticles()
const articles: Ref<Array<Article>> = ref([])
const tags: Ref<Array<string>> = ref([])
const error = ref('')
const loading = ref(false)
const type = isAuth ? ArticlesTypes.Feed : ArticlesTypes.Articles
let activeFeed = ref(type)
let activeTag = ref('')
const tabs = [{ title: 'Global Feed', name: ArticlesTypes.Articles }]
const errorMessage = 'Oops! Something went wrong!'

if (isAuth) {
    tabs.unshift({ title: 'Your Feed', name: ArticlesTypes.Feed })
}

onBeforeMount(async () => {
    try {
        const [articlesFetch, tagsFetch] = await Promise.all([getArticles(type), useTags()])
        articles.value = articlesFetch
        tags.value = tagsFetch
    } catch (err) {
        error.value = errorMessage
    }
})

const loadArticles = async (type: ArticlesTypes, payload?: Record<string, unknown>) => {
    loading.value = true
    error.value = ''
    try {
        const articlesData = await getArticles(type, payload)
        articles.value = articlesData
    } catch (err) {
        error.value = errorMessage
    }
    loading.value = false
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
    activeTag.value = tag
    loadArticles(ArticlesTypes.Articles, { tag: activeTag.value })
}

const getTabClasses = (name: string) => {
    return {
        active: name === activeFeed.value && !activeTag.value,
        disabled: loading.value,
    }
}

const favorite = async (article: Article) => {
    try {
        const articlesData = await favoriteArticle(article.slug, article.favorited)
        const updatedIndex = articles.value.findIndex((article) => article.slug === article.slug)
        articles.value[updatedIndex] = articlesData
    } catch (err) {
        error.value = errorMessage
    }
}
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
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li v-for="tab in tabs" class="nav-item" @click="loadArticlesByType(tab.name)">
                                <button class="nav-link clear" :class="getTabClasses(tab.name)" :disabled="loading">
                                    {{ tab.title }}
                                </button>
                            </li>
                            <li v-if="activeTag" class="nav-item">
                                <button class="nav-link clear active">#{{ activeTag }}</button>
                            </li>
                        </ul>
                    </div>

                    <div v-if="error" class="article-preview">{{ error }}</div>
                    <template v-else>
                        <AppFeed v-if="articles.length && !loading" :articles="articles" @favorite="favorite" />
                        <div v-else class="article-preview">Loading articles...</div>
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
