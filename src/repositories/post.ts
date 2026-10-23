import { isStructuredError } from "@prisma/orm-postgres/utils";
import type { PostRepositoryContract } from "../domain/products/repository.js";
import type { CreatePostInput, PostHandlerContract } from "../transport/handlers/posts.types.js";
import type { PostWithCategory } from "../domain/products/entity.js";
import type { PostWithUser } from "../domain/products/entity.js";

type DataBase = typeof import("../prisma/db.js")["db"];

export function createPostRepository(db: DataBase): PostRepositoryContract {
    async function getAllPosts(take?: number, categoryId?: number, userId?: number) {
        const query = db.orm.public.Post.orderBy((post) => {
            return post.id.asc();
        })
        .include("category")
        .include("author")
        .where({ categoryId: categoryId, userId: userId})

        if (!take) {
            return query.all()
        }

        return query.limit(take).all()
    }

    async function addPost(post: CreatePostInput) {
        try {
            const { userId, categoryId, ...fields } = post;
            return db.orm.public.Post.create({
                ...fields, 
                author: (author) => author.connect({ id: userId }),
                category: (category) => category.connect({ id: categoryId }),
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
        const post =  await db.orm.public.Post.where({ id })
        .include("author")
        .include("category").first();
        return post;
    }

    return { getAllPosts, addPost, getPostById }
}





