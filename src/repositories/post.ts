import { isStructuredError } from "@prisma/orm-postgres/utils";
import type { PostRepositoryContract } from "../domain/products/repository.js";
import type { CreatePostInput, PostHandlerContract } from "../transport/handlers/posts.types.js";
import type { PostWithCategory } from "../domain/products/entity.js";

type DataBase = typeof import("../prisma/db.js")["db"];

export function createPostRepository(db: DataBase): PostRepositoryContract {
    async function getAllPosts(take?: number, categoryId?: number) {
        const query = db.orm.public.Post.orderBy((post) => {
            return post.id.asc();
        }).include("category").where({ categoryId: categoryId });

        if (!take) {
            return query.all()
        }

        return query.limit(take).all()
    }

    async function addPost(post: CreatePostInput) {
        try {
            const { categoryId, ...fields } = post;
            return db.orm.public.Post.create({
                ...fields, category: (category) => {
                    return category.connect({id: categoryId})
                }
            });
        }   
    catch (error){
        if (error instanceof Error && "sqlState" in error){
            if (error.sqlState === "23505"){
                throw new Error("POST ALREADY EXIST")
            }
        
        if (isStructuredError(error) && error.code === "ORM.RELATION_ROW_MISSING"){
            throw new Error("CATEGORY NOT FOUND")
        }


        } 
    
        }
    }

    async function getPostById(id: number) {
        const post =  await db.orm.public.Post.where({ id }).include("category").first();
        return post;
    }

    return { getAllPosts, addPost, getPostById }
}





