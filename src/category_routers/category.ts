import { Router } from "express";
import type { CategoryHandlerContract } from "../category_handler/category.types";

export function createCategoryRoute(CategoryHandler: CategoryHandlerContract){
    const CategoryRouter = Router();

    CategoryRouter.get("/", CategoryHandler.getAllCategory)
    CategoryRouter.get("/:id", CategoryHandler.getCategoryId)
    CategoryRouter.post("/", CategoryHandler.addCategory)

    return CategoryRouter
}