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
