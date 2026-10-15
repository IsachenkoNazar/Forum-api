import type { Category, CreateCategoryInput } from "./entity";

export interface CategoryServiceContract{
    getAllCategory(): Promise<Category[]>
    getCategoryId(id: number): Promise<Category | null>
    addCategory(input: CreateCategoryInput): Promise<Category>
}