<script setup lang="ts">
import { useRegisterForm } from '../composable/register-form'
const { username, email, password, errors, isLoading, isSubmitAllowed, onSubmit } = useRegisterForm()
</script>

<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign up</h1>
                    <p class="text-xs-center">
                        <router-link to="/login">Have an account?</router-link>
                    </p>

                    <ul v-if="errors.length" class="error-messages">
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>

                    <form @submit.prevent="onSubmit">
                        <fieldset :disabled="isLoading" class="form-group">
                            <input
                                v-model.trim="username"
                                class="form-control form-control-lg"
                                type="text"
                                placeholder="Your Name"
                            />
                        </fieldset>
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
