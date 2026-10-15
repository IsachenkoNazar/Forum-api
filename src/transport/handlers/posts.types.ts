import type { Category } from "../../domain/category/entity";
import type { Request, Response } from 'express';
import type { Post } from "../../domain/products/entity";

export type CreatePostInput = Omit<Post, "id">


export interface PostHandlerContract {
  getPosts: (req: Request, res: Response) => Promise<any>;
  getPostById: (req: Request, res: Response) => Promise<any>;
  createPost: (req: Request, res: Response) => Promise<any>;
}