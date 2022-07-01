<script setup lang="ts">
import { useCreateArticle } from '../composable/create-article'

const { errors, isLoading, title, description, body, tagList, isSubmitAllowed, onSubmit } = useCreateArticle()
</script>

<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <ul v-if="errors.length" class="error-messages">
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                    
                    <form>
                        <fieldset>
                            <fieldset :disabled="isLoading" class="form-group">
                                <input
                                    v-model="title"
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Article Title"
                                />
                            </fieldset>
                            <fieldset :disabled="isLoading" class="form-group">
                                <input
                                    v-model="description"
                                    type="text"
                                    class="form-control"
                                    placeholder="What's this article about?"
                                />
                            </fieldset>
                            <fieldset :disabled="isLoading" class="form-group">
                                <textarea
                                    v-model="body"
                                    class="form-control"
                                    rows="8"
                                    placeholder="Write your article (in markdown)"
                                ></textarea>
                            </fieldset>
                            <fieldset :disabled="isLoading" class="form-group">
                                <input v-model="tagList" type="text" class="form-control" placeholder="Enter tags" />
                                <div class="tag-list"></div>
                            </fieldset>
                            <button
                                class="btn btn-lg pull-xs-right btn-primary"
                                type="button"
                                :disabled="!isSubmitAllowed || isLoading"
                                @click="onSubmit"
                            >
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
