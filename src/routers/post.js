import { Router } from "express";

import { 
    getPosts,
    getPostId,
    createPost
} from "../handlers/post.js";

export const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPostId);
postRouter.post('/', createPost);