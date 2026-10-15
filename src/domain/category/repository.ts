import type { CreateCategoryInput, Category } from "./entity";


export interface CategoryRepositoryContract{
    getAllCategory: (take?: number) => Promise<Category[]>
    addCategory: (category: CreateCategoryInput) => Promise<Category | null>
    getCategoryId: (id: number) => Promise<Category | null>
}