
import type { PostRepositoryContract } from "../domain/products/repository.js";
import type { CreatePostInput, PostHandlerContract} from "../transport/handlers/posts.types.js"



export function createPostService(postRepository: PostRepositoryContract){

function getPosts(take?: number) {
    return postRepository.getAllPosts(take)
}

function getPostId(id: number) {
    return postRepository.getPostById(id)
}

async function createPost(data: CreatePostInput) {
    let { title, content,  categoryId, author } = data;

    let post = {
        title: title,
        content: content,
        categoryId: categoryId,
        author: author
    };

        return await postRepository.addPost(post)
    }    
    
    return {getPosts, getPostId, createPost }
}