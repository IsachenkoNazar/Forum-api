import { getAllPosts, getPostById, addPost } from "../repositories/post.js";


export function getPosts(req, res) {
    const { take } = req.query;

    if (!take) {
        return res.status(200).json(getAllPosts());
    }

    const takeNum = parseInt(take);

    if (isNaN(takeNum) || takeNum <= 0) {
        return res.status(400).json({ 
            ok: false, 
            description: "Query parameter 'take' is incorrect!" 
        });
    }

    const posts = getAllPosts(takeNum);
    return res.status(200).json(posts);
}

export function getPostId(req, res) {
    const postId = Number(req.params.id);

    if (!Number.isInteger(postId) || postId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer',
        });
    }

    const post = getPostById(postId);

    if (!post) {
        return res.status(404).json({
            message: 'Post not found',
        });
    }

    return res.status(200).json(post);
}


export async function createPost(req, res) {
    const { title, content, category, author } = req.body;

    if (
        typeof title !== 'string' || !title.trim() ||
        typeof content !== 'string' || !content.trim() ||
        typeof category !== 'string' || !category.trim()
    ) {
        return res.status(422).json({
            message: 'Invalid post data',
        });
    }

    try {
        const newPost = await addPost({
            title: title.trim(),
            content: content.trim(),
            category: category.trim(),
            author: author
        });

        if (!newPost) {
            return res.status(409).json({
                message: 'Post already exists',
            });
        }

        return res.status(201).json(newPost);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Failed to create post',
        });
    }
}
