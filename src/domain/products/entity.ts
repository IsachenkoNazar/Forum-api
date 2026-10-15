import type { Category } from "../category/entity";

export type CreatePostInput = Omit<Post, "id">;

export interface Post{
    id: number;
    title: string;
    content: string;
    author: string;
    categoryId: number
}

export type PostWithCategory = Post & {category: Category}