<script setup>
import { useUserStore } from '../stores/user'

const { username } = useUserStore()
</script>

<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <a class="navbar-brand" href="/">conduit</a>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li v-if="username" class="nav-item">
                    <router-link to="/article-create" class="nav-link">
                        <i class="ion-compose"></i>&nbsp;New Article</router-link
                    >
                </li>
                <li v-if="username" class="nav-item">
                    <router-link to="/settings" class="nav-link"> <i class="ion-gear-a"></i>&nbsp;Settings</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">Sign in</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">Sign up</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
