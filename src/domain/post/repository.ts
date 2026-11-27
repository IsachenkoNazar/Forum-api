import type { CreatePostInput } from "../post/entity"
import type {Post, PostWithCategory} from "./entity.js"

export interface PostFilter{
    take?: number | undefined
    categoryId?: number | undefined
    userId?: number | undefined
}

export interface PostRepositoryContract{
    getAllPosts: (filter: PostFilter) => Promise<PostWithCategory[]>
    addPost: (post: CreatePostInput) => Promise<Post | null | undefined>
    getPostById: (id: number, categoryId?: number, userId?: number) => Promise<PostWithCategory | null>
}