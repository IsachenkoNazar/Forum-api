import type { CategoryRepositoryContract } from "../domain/category/repository";
import type { CreateCategoryInput } from "../domain/category/entity";


export function CreateCategoryService(categoryRepository: CategoryRepositoryContract){

    function getAllCategory(take?: number){
        return categoryRepository.getAllCategory(take)
    }

    function getCategoryId(id: number){
        return categoryRepository.getCategoryId(id)
    }

    async function addCategory(data: CreateCategoryInput){
        let { title } = data;

        let category = {
            title: title
        };
    
            return await categoryRepository.addCategory(category)
    }

    return{ getAllCategory, getCategoryId, addCategory}
}