<script setup lang="ts">
import { ref, onBeforeMount, Ref } from 'vue'
import { AppFeed } from '../components'
import { useArticles } from '../composable/articles'
import { useTags } from '../composable/tags'
import { useUserStore } from '../stores/user'
import { Article, Tag } from '../types'

const { user } = useUserStore()
const articles: Ref<Array<Article>> = ref([])
const tags: Ref<Array<Tag>> = ref([])
const error = ref('')

onBeforeMount(async () => {
    try {
        const [articlesFetch, tagsFetch] = await Promise.all([useArticles(), useTags()])
        articles.value = articlesFetch
        tags.value = tagsFetch
    } catch (err) {
        error.value = 'Service unavailable'
    }
})
</script>

<template>
    <div class="home-page">
        <div class="banner">
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
                            <li v-if="user?.username" class="nav-item">
                                <a class="nav-link disabled" href="">Your Feed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="">Global Feed</a>
                            </li>
                        </ul>
                    </div>

                    <div v-if="error" class="article-preview">{{ error }}</div>
                    <template v-else>
                        <AppFeed v-if="articles.length" :articles="articles" />
                        <div v-else class="article-preview">Loading articles...</div>
                    </template>
                </div>

                <div v-if="tags.length" class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <div class="tag-list">
                            <a v-for="(tag, index) in tags" :key="index" class="tag-pill tag-default" href="">
                                {{ tag }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
