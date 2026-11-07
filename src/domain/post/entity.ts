import type { Category } from "../category/entity";
import type { User } from "../user/entity";

export type CreatePostInput = Omit<Post, "id">;

export interface Post{
    id: number;
    title: string;
    content: string;
    userId: number;
    categoryId: number
}

export type PostWithCategory = Post & {category: Category}
export type PostWithUser = Post & {user: User}