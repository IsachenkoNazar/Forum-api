import type { Post } from "../domain/products/entity.js";
import type { PostRepositoryContract } from "../domain/products/repository.js";
import type { CreatePostInput } from "../transport/handlers/posts.types.js";

type DataBase = typeof import("../prisma/db.js")["db"];

export function createPostRepository(db: DataBase): PostRepositoryContract {
    async function getAllPosts(take?: number) {
        const query = db.orm.public.Post.orderBy((post) => {
            return post.id.asc();
        });

        if (!take) {
            return query.all();
        }

        return query.limit(take).all();
    }

    async function addPost(post: CreatePostInput) {
        return db.orm.public.Post.create(post);
    }

    async function getPostById(id: number) {
        return await db.orm.public.Post.where({ id }).first();
    }

    return { getAllPosts, addPost, getPostById };
}





