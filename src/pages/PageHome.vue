<script setup lang="ts">
import { AppFeed } from '../components'
import articles from '../composable/articles'
import tags from '../composable/tags'
import { useUserStore } from '../stores/user'

const { username } = useUserStore()
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
                            <li v-if="username" class="nav-item">
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
