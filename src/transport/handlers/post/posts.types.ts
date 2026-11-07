
import type { Request, Response } from 'express';
import type { Post } from "../../../domain/post/entity"

export type CreatePostInput = Omit<Post, "id">


export interface PostHandlerContract {
  getPosts: (req: Request, res: Response) => Promise<any>;
  getPostById: (req: Request, res: Response) => Promise<any>;
  createPost: (req: Request, res: Response) => Promise<any>;
}