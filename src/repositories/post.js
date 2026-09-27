const posts = [
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
];

export function getAllPosts(take, category) {
    if (!take) {
        return posts
    }
    return posts.slice(0, take)
}

export function getPostById(id) {
    return posts.find((post) => post.id == id)
}

export function addPost(newPost) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(newPost)
            resolve(newPost)    
        }, 1000);
    });
}