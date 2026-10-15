import type { Category } from "../../domain/category/entity";

export interface PostResponse{
    id: number;
    title: string;
    content: string;
    author: string;
    category: Category;
}