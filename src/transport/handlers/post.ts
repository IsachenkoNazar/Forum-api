
import type { PostResponse } from "../dto/responses.js";
import type { ErrorResponse } from "../dto/errors.js";
import type { Request, Response } from "express";
import type { Post } from "../../domain/products/entity.js";
import type { PostHandlerContract } from "./posts.types.js";
import type { PostRepositoryContract } from "../../domain/products/repository.js";


export function createPosthandler(postRepository: PostRepositoryContract): PostHandlerContract{


    async function getPosts(
        req: Request,
        res: Response<Post[] | ErrorResponse>) {
        const { take } = req.query;

        if (!take) {
            res.status(200).json(await postRepository.getAllPosts());
            return
        }

        const takeNum = Number(take);

        if (!takeNum || !Number.isInteger(takeNum) || takeNum <= 0) {
            res.status(400).json({  
                message: "Query parameter 'take' is incorrect!" 
            });
            return
        }

        const posts = await postRepository.getAllPosts(takeNum);
        return res.status(200).json(posts);
    }

    async function getPostById(
        req:Request,
        res: Response<Post | ErrorResponse>){
        const postId = Number(req.params.id);

        if (!Number.isInteger(postId) || postId <= 0) {
            return res.status(400).json({
                message: 'id must be a positive integer',
            });
        }

        const post = await postRepository.getPostById(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        return res.status(200).json(post);
    }


    async function createPost(
        req:Request,
        res:Response<PostResponse| ErrorResponse>) {
        const { id, title, content, category, author } = req.body;

        if (
            typeof title !== 'string' || !title.trim() ||
            typeof content !== 'string' || !content.trim() ||
            typeof category !== 'string' || !category.trim()
        ) {
            res.status(422).json({
                message: 'Invalid post data',
            });
            return;
        }

        try {
            const newPost = await postRepository.addPost({
                title: title.trim(),
                content: content.trim(),
                category: category.trim(),
                author: author
            });

            if (!newPost) {
                res.status(409).json({
                    message: 'Post already exists',
                });
                return;
            }

            res.status(201).json(newPost as PostResponse);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to create post',
            });
        }
    }

    return { getPosts, getPostById, createPost } as unknown as PostHandlerContract;
}

