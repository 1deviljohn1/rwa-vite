<script setup lang="ts">
import { Tab } from '../types'

const props = defineProps<{
    tabs: Array<Tab>
    activeTag: string,
    activeFeed: string | null,
    loading: boolean
}>()

const emit = defineEmits(['select', 'submit'])

const select = (tabName: string) => {
    emit('select', tabName)
}

const getTabClasses = (name: string) => {
    return {
        active: name === props.activeFeed && !props.activeTag,
        disabled: props.loading,
    }
}
</script>

<template>
    <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
            <li v-for="tab in tabs" class="nav-item" @click="select(tab.name)">
                <button class="nav-link clear" :class="getTabClasses(tab.name)" :disabled="loading">
                    {{ tab.title }}
                </button>
            </li>
            <li v-if="activeTag" class="nav-item">
                <button class="nav-link clear active">#{{ activeTag }}</button>
            </li>
        </ul>
    </div>
</template>
