
export type PostWithCategory = {
    id: number
    title: string
    content: string
    userId: number
    categoryId: number
    category: {
        id: number
        title: string
    }
    author: {
        id: number
        email: string
    }
}

