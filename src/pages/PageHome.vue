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

onBeforeMount(async () => {
    articles.value = await useArticles()
    tags.value = await useTags()
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

                    <AppFeed v-if="articles" :articles="articles" />
                </div>

                <div v-if="tags" class="col-md-3">
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
