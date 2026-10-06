import type { CreatePostInput } from "../../transport/handlers/posts.types.js"
import type {Post} from "../products/entity.js"

export interface PostRepositoryContract{
    getAllPosts: (take?: number) => Promise<Post[]>
    addPost: (post: CreatePostInput) => Promise<Post>
    getPostById: (id: number) => Promise<Post | null>
}