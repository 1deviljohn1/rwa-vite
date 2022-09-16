<script setup lang="ts">
import { ISOtoDate } from '../utils/date'
import { Article } from '../types'
import { useUserStore } from '../stores/user'
import { computed, ref, watch } from 'vue'
import { router } from '../router'
import { storeToRefs } from 'pinia'

const { isAuth } = storeToRefs(useUserStore())
const emit = defineEmits(['favorite'])
const disabled = ref(false)
interface Props {
    article: Article
    favoriteProcessing: boolean
}
const props = defineProps<Props>()

watch(
    () => props.favoriteProcessing,
    (value) => {
        if (!value) {
            disabled.value = false
        }
    }
)

const favorite = (article: Article) => {
    if (!isAuth.value) {
        router.push({ name: 'Login' })
        return
    }

    disabled.value = true
    emit('favorite', article)
}

const favoriteClass = (favorited: boolean) => {
    return {
        disabled: disabled.value,
        active: disabled.value,
        'btn-primary': favorited,
        'btn-outline-primary': !favorited,
    }
}

const authorLink = computed((): string => {
    return `/profile/${props.article.author.username}`
})
</script>

<template>
    <div class="article-meta">
        <router-link :to="authorLink"><img :src="article.author.image" /></router-link>
        <div class="info">
            <router-link :to="authorLink" class="author">{{ article.author.username }}</router-link>
            <span class="date">{{ ISOtoDate(article.updatedAt) }}</span>
        </div>
        <button
            :class="favoriteClass(article.favorited)"
            class="btn btn-sm pull-xs-right"
            :disabled="disabled"
            @click="favorite(article)"
        >
            <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
    </div>
    <a href="preview.html" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul v-if="article.tagList.length" class="tag-list">
            <li v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill tag-outline">
                {{ tag }}
            </li>
        </ul>
    </a>
</template>
