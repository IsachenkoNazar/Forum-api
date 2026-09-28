
import { createPostRepository } from "../../repositories/post.js";
import type { PostResponse } from "../dto/responses.js";
import type { CreatePostRequest } from "../dto/requests.js";
import type { ErrorResponse } from "../dto/errors.js";
import type { Request, Response } from "express";
import type { Post } from "../../domain/products/entity.js";

const postRepository = createPostRepository();

export function getPosts(
    req: Request,
    res: Response<Post[] | ErrorResponse>) {
    const { take } = req.query;

    if (!take) {
        return res.status(200).json(postRepository.getAllPosts());
    }

    const takeNum = Number(take);

    if (!takeNum || !Number.isInteger(takeNum) || takeNum <= 0) {
        return res.status(400).json({  
            message: "Query parameter 'take' is incorrect!" 
        });

    }

    const posts = postRepository.getAllPosts(takeNum);
    return res.status(200).json(posts);
}

export function getPostId(
    req:Request,
    res: Response<Post | ErrorResponse>){
    const postId = Number(req.params.id);

    if (!Number.isInteger(postId) || postId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer',
        });
    }

    const post = postRepository.getPostById(postId);

    if (!post) {
        return res.status(404).json({
            message: 'Post not found',
        });
    }

    return res.status(200).json(post);
}


export async function createPost(
    req:Request,
    res:Response<Post | ErrorResponse>) {
    const { id, title, content, category, author } = req.body;

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
        const newPost = await postRepository.addPost({
            id: id,
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

        return res.status(201).json(newPost as Post);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Failed to create post',
        });
    }
}
