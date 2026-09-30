import { createPostRepository } from "../repositories/post.js";
import type { Request, Response } from "express";
import type { ErrorResponse } from "../transport/dto/errors.js";
import type { Post } from "../domain/products/entity.js";
import type { PostServiseContract } from "../domain/products/service.js";
import type { PostRepositoryContract } from "../domain/products/repository.js";



export function createPostService(postRepository: PostRepositoryContract){

function getPosts(
    req: Request,
    res: Response<Post[] | ErrorResponse>
    ) {
    const { take } = req.query;
    const posts = postRepository.getAllPosts(take? Number(take): undefined);
    return res.status(200).json(posts);
    }

function getPostId(
    req: Request,
    res: Response<Post | ErrorResponse>
    ) {
    const { id } = req.params;
    const post = postRepository.getPostById(Number(id));

    if (!post) {
    return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
    }

async function createPost(
    req: Request,
    res: Response<Post | ErrorResponse>
    ) {
    const { id, title, content,  category, author } = req.body;

    const newPostData = {
    id: id,
    title: title.trim(),
    content: content.trim(),
    category: category.trim(),
    author: author
    };

    const savedPost = await postRepository.addPost(newPostData) as Post;
    return res.status(201).json(savedPost);
    }    
    
    return {getPosts, getPostId, createPost }
}