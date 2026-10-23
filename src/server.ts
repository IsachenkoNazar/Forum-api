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
import { createUserRepositoryContract } from "./user_repository/user.js";
import { createUserService } from "./user_service/user.js";
import { hashPassword, verifyPassword } from "./lib/password.js";
import { signAccessToken } from "./lib/jwt.js";
import { createUserHandler } from "./user_transport/user_handlers/user.js";
import { createUserRouter } from "./user_transport/user_routers/user.js";

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


const userRepository = createUserRepositoryContract(db)
const userService = createUserService(userRepository,
    {hashPassword: hashPassword,
        verifyPassword: verifyPassword
    }, {signAccessToken: signAccessToken }
)
const userHandler = createUserHandler(userService)
const userRouter = createUserRouter(userHandler)


app.use("/posts", postRoute);
app.use("/category", categoryRoute)
app.use("/users", userRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/posts`);
    console.log(`Server is running on http://${HOST}:${PORT}/category`)
    console.log(`Server is running on http://${HOST}:${PORT}/users/register`)
        console.log(`Server is running on http://${HOST}:${PORT}/users/login`)

});