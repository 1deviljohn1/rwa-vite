export interface Article {
    slug: string
    title: string
    description: string
    body: string
    tagList: Tag[]
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
    author: Author
}

export interface ArticlesResponse {
    articles: Article[]
    articlesCount: number
}

export type Tag = string

export interface TagsResponse {
    tags: Tag[]
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
    Tags = '/tags',
    Login = '/users/login',
    Register = '/users',
}

export enum ApiMethods {
    Get = 'GET',
    Post = 'POST',
}
