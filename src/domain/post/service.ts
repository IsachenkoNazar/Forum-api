import type {Post} from "./entity.js"

export interface PostServiseContract{
    getPosts: (take: number, ) => Post[];
    getPostId: (take: number) => Post | undefined;
    createPost: (post: Post) => Promise<Post>
}