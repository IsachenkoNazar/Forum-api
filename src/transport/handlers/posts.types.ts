export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    category: string
};


export type CreatePostInput = Omit<Post, "id">

export interface PostHandlerContract{
    getPosts: (take?: number) => Promise<Post[]>
    getPostById: (id: number) => Promise<Post | null>
    createPost: (post: CreatePostInput) => Promise<Post | null>
}