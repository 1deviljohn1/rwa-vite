<script setup lang="ts">
import { AppHeader } from './components'
import { router } from './router'
</script>

<template>
    <AppHeader />
    <router-view :key="router.currentRoute.value.fullPath" />
</template>
