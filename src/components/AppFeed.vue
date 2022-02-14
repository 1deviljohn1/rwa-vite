<script setup>
import { ISOtoDate } from '../utils/date'

defineProps({
    articles: {
        type: Object,
        default() {
            return []
        },
    },
})
</script>

<template>
    <div v-for="article in articles" :key="article.slug" class="article-preview">
        <div class="article-meta">
            <a href="profile.html"><img :src="article.author.image" /></a>
            <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{ ISOtoDate(article.updatedAt) }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
        </div>
        <a href="" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
            <ul v-if="article.tagList.length" class="tag-list">
                <li v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill tag-outline">
                    {{ tag }}
                </li>
            </ul>
        </a>
    </div>
</template>
