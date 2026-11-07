
import { Router } from "express";
import type { PostHandlerContract } from "../handlers/post/posts.types"

export function createPostRoute(PostHandler: PostHandlerContract) {
    const PostRouter = Router();

    PostRouter.get("/", PostHandler.getPosts);
    PostRouter.get("/:id", PostHandler.getPostById);
    PostRouter.get("/title:title", PostHandler.getPosts);
    PostRouter.post("/", PostHandler.createPost);

    return PostRouter;
}







