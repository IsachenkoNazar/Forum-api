import type {Post} from "../products/entity.js"

export interface PostRepositoryContract{
    getAllPosts: (take?: number) => Post[];
    addPost: (post: Post) => Promise<Post>
    getPostById: (title: number) => Post | undefined
}