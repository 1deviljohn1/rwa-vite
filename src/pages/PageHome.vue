<script setup lang="ts">
import { ref, onBeforeMount, Ref } from 'vue'
import { AppFeed } from '../components'
import { useArticles } from '../composable/articles'
import { useTags } from '../composable/tags'
import { useUserStore } from '../stores/user'
import { Article, Tag, ArticlesTypes } from '../types'

const { isAuth } = useUserStore()
const articles: Ref<Array<Article>> = ref([])
const tags: Ref<Array<Tag>> = ref([])
const error = ref('')
const loading = ref(false)
const type = isAuth ? ArticlesTypes.Feed : ArticlesTypes.Articles
let activeTab = ref(type)
const tabs = [{ title: 'Global Feed', name: ArticlesTypes.Articles }]
const errorMessage = 'Oops! Something went wrong!'

if (isAuth) {
    tabs.unshift({ title: 'Your Feed', name: ArticlesTypes.Feed })
}

onBeforeMount(async () => {
    try {
        const [articlesFetch, tagsFetch] = await Promise.all([useArticles(type), useTags()])
        articles.value = articlesFetch
        tags.value = tagsFetch
    } catch (err) {
        error.value = errorMessage
    }
})

const loadArticles = async (type: ArticlesTypes) => {
    if (activeTab.value === type) {
        return
    }

    loading.value = true

    error.value = ''
    activeTab.value = type

    try {
        const articlesData = await useArticles(type)
        articles.value = articlesData
    } catch (err) {
        error.value = errorMessage
    }

    loading.value = false
}

const getTabClasses = (name: string) => {
    return {
        active: name === activeTab.value,
        disabled: loading,
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
                            <li v-for="tab in tabs" class="nav-item" @click="loadArticles(tab.name)">
                                <button class="nav-link clear" :class="getTabClasses(tab.name)">
                                    {{ tab.title }}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div v-if="error" class="article-preview">{{ error }}</div>
                    <template v-else>
                        <AppFeed v-if="articles.length && !loading" :articles="articles" />
                        <div v-else class="article-preview">Loading articles...</div>
                    </template>
                </div>

                <div v-if="tags.length" class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <div class="tag-list">
                            <button v-for="(tag, index) in tags" :key="index" class="tag-pill tag-default clear">
                                {{ tag }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
