import { getAllPosts, getPostById, addPost } from "../repositories/post.js";

export function getPosts(req, res) {
    const { take } = req.query;
    const posts = getAllPosts(take);
    return res.status(200).json(posts);
}

export function getPostId(req, res) {
    const { id } = req.params;
    const post = getPostById(id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
}

export async function createPost(req, res) {
    const { title, content, description, category, author } = req.body;

    const newPostData = {
        title,
        content,
        description,
        category,
        author
    };

    const savedPost = await addPost(newPostData);
    return res.status(201).json(savedPost);
}