import { isStructuredError } from "@prisma/orm-postgres/utils";
import type { CategoryRepositoryContract } from "../domain/category/repository";
import type { CreateCategoryInput } from "../domain/category/entity";
import type { field } from "@prisma/orm-postgres/contract-builder";

type DataBase = typeof import("../prisma/db.js")["db"];

export function createCategoryRepository(db: DataBase): CategoryRepositoryContract {
    async function getAllCategory() {
        return db.orm.public.Category.orderBy((category) => category.id.asc()).all();
    }

    async function getCategoryId(id: number) {
        return db.orm.public.Category.where({ id }).first();
    }

    async function addCategory(data: { title: string }) {
        return db.orm.public.Category.create(data);
    }

    return { 
        getAllCategory, 
        getCategoryId, 
        addCategory 
    };
}