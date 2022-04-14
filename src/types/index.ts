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

export type Tag = string

export interface Author {
    username: string
    bio: string | null
    image: string
    following: boolean
}

export interface ArticlesResponse {
    articles: Article[]
    articlesCount: number
}

export interface TagsResponse {
    tags: Tag[]
}

export enum ApiEndpoints {
    Articles = '/articles',
    Tags = '/tags',
}
