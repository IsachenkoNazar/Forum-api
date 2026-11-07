import type { Request, Response } from "express";

export interface CategoryHandlerContract {
  getAllCategory: (req: Request, res: Response) => Promise<Response>;
  getCategoryId: (req: Request, res: Response) => Promise<Response>;
  addCategory: (req: Request, res: Response) => Promise<Response>;
}