export interface Article {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
    author: Author
}

export enum ArticlesTypes {
    Articles = 'articles',
    Feed = 'feed',
}

export interface ArticlesResponse {
    articles: Article[]
    articlesCount: number
}

export interface SingleArticleResponse {
    article: Article
}

export interface TagsResponse {
    tags: string[]
}

export interface Author {
    username: string
    bio: string | null
    image: string
    following: boolean
}

export interface User {
    email: string
    username: string
    bio: string | null
    image: string
    token: string
}

export interface UserResponse {
    user: User
}

export enum ApiEndpoints {
    Articles = '/articles',
    Feed = '/articles/feed',
    Tags = '/tags',
    Login = '/users/login',
    Register = '/users',
    User = '/user',
    FavoriteArticle = '/articles/:slug/favorite',
}

export enum ApiMethods {
    Get = 'GET',
    Post = 'POST',
    Delete = 'DELETE',
}
