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
    Own = 'own',
    Favorited = 'favorited',
}

export interface Tab {
    title: string,
    name: ArticlesTypes
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
    image: string | null
    token: string
}

export enum ApiEndpoints {
    Articles = '/articles',
    Feed = '/articles/feed',
    Tags = '/tags',
    Login = '/users/login',
    Register = '/users',
    User = '/user',
    FavoriteArticle = '/articles/:slug/favorite',
    Profile = '/profiles/:username',
    Follow = '/profiles/:username/follow'
}

export enum ApiMethods {
    Get = 'GET',
    Post = 'POST',
    Delete = 'DELETE',
    Put = 'PUT',
}
