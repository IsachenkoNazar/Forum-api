import express from "express";
import { createPostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post.js";
import { createPosthandler } from "./transport/handlers/post.js";
import { createPostRoute } from "./transport/routers/post.js";

import { createCategoryRoute } from "./category_routers/category.js";
import { CreateCategoryService } from "./category_service/category.js";
import { createCategorHandler } from "./category_handler/category.js";
import { createCategoryRepository} from "./category_repository/category.js";

import { db } from "./prisma/db.js";

const PORT = 5000;
const HOST = "localhost";

const app = express();

app.use(express.json());

const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const postHandler = createPosthandler(postRepository);
const postRoute = createPostRoute(postHandler);

const categoryRepository = createCategoryRepository(db)
const categoryService = CreateCategoryService(categoryRepository)
const categoryHandler = createCategorHandler(categoryService)
const categoryRoute = createCategoryRoute(categoryHandler)

app.use("/posts", postRoute);
app.use("/category", categoryRoute)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/posts`);
    console.log(`Server is running on http://${HOST}:${PORT}/category`)
});