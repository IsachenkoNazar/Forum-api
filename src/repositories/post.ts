import type { Post } from "../domain/products/entity.js";

export function createPostRepository() {
    const posts: Post[] = [
    {
        id: 1,
        title: "nature",
        content: "birds, trees and plants",
        author: "Isachenko",
        category: "nature",
    },
    {
        id: 2,
        title: "animals",
        content: "variety of animals",
        author: "Isachenko",
        category: "animals",
    }
]

    function getAllPosts(take?: number) {
        if (!take) {
            return posts
        }
    return posts.slice(0, take)
}

    function getPostById(id: number) {
        return posts.find((post) => post.id == id)
}

    function addPost(newPost: Post ) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                posts.push(newPost)
                resolve(newPost)    
            }, 1000);
        });
    }
    return {getAllPosts, getPostById, addPost}
}





