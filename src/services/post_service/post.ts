
import type { PostRepositoryContract } from "../../domain/post/repository.js";
import type { CreatePostInput} from "../../domain/post/entity.js"
import type { PostHandlerContract } from "../../transport/handlers/post/posts.types.js";



export function createPostService(postRepository: PostRepositoryContract){

function getPosts(take?: number) {
    return postRepository.getAllPosts(take)
}

function getPostId(id: number) {
    return postRepository.getPostById(id)
}

async function createPost(data: CreatePostInput) {
    let { title, content,  categoryId, userId } = data;

    let post = {
        title: title,
        content: content,
        categoryId: categoryId,
        userId: userId
    };

        return await postRepository.addPost(post)
    }    
    
    return {getPosts, getPostId, createPost }
}