import type { CreatePostInput } from "../../transport/handlers/posts.types.js"
import type {Post, PostWithCategory} from "../products/entity.js"

export interface PostRepositoryContract{
    getAllPosts: (take?: number, categoryId?: number) => Promise<PostWithCategory[]>
    addPost: (post: CreatePostInput) => Promise<Post | null | undefined>
    getPostById: (id: number, categoryId?: number) => Promise<PostWithCategory | null>
}