<script setup lang="ts">
import { ISOtoDate } from '../utils/date'
import { Article } from '../types'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const { isAuth } = useUserStore()
const router = useRouter()

const emit = defineEmits(['favorite'])

interface Props {
    articles: Article[]
}

defineProps<Props>()

const favourite = (article: Article) => {
    if (!isAuth) {
        router.push({ name: 'Login' })
        return
    }

    emit('favorite', article)
}

const favoriteClass = (favorited: boolean) => {
    return favorited ? 'btn-primary' : 'btn-outline-primary'
}
</script>

<template>
    <div v-for="article in articles" :key="article.slug" class="article-preview">
        <div class="article-meta">
            <a href="profile.html"><img :src="article.author.image" /></a>
            <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{ ISOtoDate(article.updatedAt) }}</span>
            </div>
            <button
                :class="favoriteClass(article.favorited)"
                class="btn btn-sm pull-xs-right"
                @click="favourite(article)"
            >
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
