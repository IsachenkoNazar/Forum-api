import type { CreatePostInput } from "../post/entity"
import type {Post, PostWithCategory} from "./entity.js"

export interface PostRepositoryContract{
    getAllPosts: (take?: number, categoryId?: number, userId?: number) => Promise<PostWithCategory[]>
    addPost: (post: CreatePostInput) => Promise<Post | null | undefined>
    getPostById: (id: number, categoryId?: number, userId?: number) => Promise<PostWithCategory | null>
}