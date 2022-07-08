<script setup lang="ts">
import { AppHeader, AppFooter } from './components'
import { router } from './router'
</script>

<template>
    <AppHeader />
    <router-view :key="router.currentRoute.value.fullPath" />
    <AppFooter />
</template>
