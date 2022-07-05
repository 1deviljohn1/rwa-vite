<script setup lang="ts">
import { useLoginForm } from '../composable/login-form'
const { email, password, errors, isLoading, onSubmit, isSubmitAllowed } = useLoginForm()
</script>

<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign in</h1>
                    <p class="text-xs-center">
                        <router-link to="/register">Need an account?</router-link>
                    </p>

                    <ul v-if="errors.length" class="error-messages">
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>

                    <form @submit.prevent="onSubmit">
                        <fieldset :disabled="isLoading" class="form-group">
                            <input
                                v-model.trim="email"
                                class="form-control form-control-lg"
                                type="email"
                                placeholder="Email"
                            />
                        </fieldset>
                        <fieldset :disabled="isLoading" class="form-group">
                            <input
                                v-model.trim="password"
                                class="form-control form-control-lg"
                                type="password"
                                placeholder="Password"
                            />
                        </fieldset>
                        <button :disabled="!isSubmitAllowed || isLoading" class="btn btn-lg btn-primary pull-xs-right">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
