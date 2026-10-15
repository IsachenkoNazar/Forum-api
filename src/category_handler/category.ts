import type { CategoryResponse } from "../category_dto/responses";
import type { ErrorResponse } from "../category_dto/errors";
import { response, type Request, type Response } from "express";
import type { Category } from "../domain/category/entity";
import type { CategoryHandlerContract } from "./category.types";
import type { CategoryRepositoryContract } from "../domain/category/repository";


export function createCategorHandler(categoryRepository: CategoryRepositoryContract): CategoryHandlerContract{


    async function getAllCategory(
        req: Request,
        res: Response<Category[] | ErrorResponse>) {
        const {take} =   req.query

        if (!take){
            res.status(200).json(await categoryRepository.getAllCategory())
        
            return
        }
    
        const takeNum = Number(take);

        if (!takeNum || !Number.isInteger(takeNum) || takeNum <= 0) {
            res.status(400).json({
                message: "take is incorrect"
            })
            return
        }
        
        const category = await categoryRepository.getAllCategory(takeNum)
        return res.status(200).json(category)
        
    }

    async function getCategoryId(
        req: Request,
        res: Response<Category | ErrorResponse>){
        const categoryId = Number(req.params.id)

        if(!Number.isInteger(categoryId) || categoryId <= 0){
            return res.status(400).json({
                message: "id must be a positive",
            })
        }
        const category = await categoryRepository.getCategoryId(categoryId)

        if(!category){
            return res.status(404).json({
                message: "category not found",
            });
        }
    
        return res.status(200).json(category)
    }

    async function addCategory(
        req: Request,
        res: Response<CategoryResponse | ErrorResponse>) {
        const  {title, id } = req.body
        
        if(
            typeof title !== "string" || !title.trim()){
                return res.status(422).json({
                    message: "invalid category data"

                })
            }
            try{
                const newCategory = await categoryRepository.addCategory({
                    title: title.trim()
                })
            
                if (!newCategory){
                    return res.status(409).json({
                        message: "category already exist"
                    })
                }
                res.status(201).json(newCategory as CategoryResponse)
            }catch(error){
                console.error(error)

                response.status(500).json({
                    message: "failed to create category"
                })
            }
    }

    return { getAllCategory, getCategoryId, addCategory} as CategoryHandlerContract

}
