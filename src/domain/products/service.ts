import type {Post} from "../products/entity.js"

export interface PostServiseContract{
    getPosts: (take: number, ) => Post[];
    getPostId: (take: number) => Post | undefined;
    createPost: (post: Post) => Promise<Post>
}