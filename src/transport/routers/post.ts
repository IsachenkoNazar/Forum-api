
import { Router } from "express";
import type { PostHandlerContract } from "../handlers/posts.types.js";

export function createPostRoute(PostHandler: PostHandlerContract) {
    const PostRouter = Router();

    PostRouter.get("/", PostHandler.getPosts);
    PostRouter.get("/:id", PostHandler.getPostById);
    PostRouter.post("/", PostHandler.createPost);

    return PostRouter;
}







