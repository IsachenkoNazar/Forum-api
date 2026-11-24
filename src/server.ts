import express from "express";
import { db } from "./prisma/db.js";
import cors from "cors"
import cookieParser from "cookie-parser"

import {createPasswordHasher} from "./lib/password.js"
import { createTokenHasher } from "./lib/jwt.js";

import { createPostRepository } from "./repositories/post_repository/post.js";
import { createPostService } from "./services/post_service/post.js";
import { createPosthandler } from "./transport/handlers/post/post.js";
import { createPostRoute } from "./transport/routers/post.js";

import { createCategoryRoute } from "./transport/routers/category.js";
import { CreateCategoryService } from "./services/category_service/category.js";
import { createCategorHandler } from "./transport/handlers/category_handler/category.js";
import { createCategoryRepository} from "./repositories/category_repository/category.js";

import { createUserRepositoryContract } from "./repositories/user_repository/user.js";
import { createUserService } from "./services/user_service/user.js";
import { createUserHandler } from "./transport/handlers/user_handlers/user";
import { createUserRouter } from "./transport/routers/user.js";
import { createRequierAuth } from "./transport/middlewares/require_path.js";
import { CreateRefreshSessionRepository } from "./repositories/refresh-sessions/refresh-sessions.js";
import { ROUTS } from "./shared/constants/routers.js";
import { config } from "./config.js";

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
const refreshSessionRepository = CreateRefreshSessionRepository(db)

const passwordHasher = createPasswordHasher(config.passwordPepperSecret);
const tokenHasher = createTokenHasher(config.accessTokenSecret, config.refreshTokenSecret);


const userService = createUserService({
    repository: userRepository,
    refreshSessionRepository,
    passwordHasher,
    tokenHasher}
)
const userHandler = createUserHandler(userService)
const requireAuth = createRequierAuth(tokenHasher.verifyAccessToken)
const userRouter = createUserRouter(userHandler, requireAuth)

app.use(express.json());
app.use(cookieParser())
app.use(cors ({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(ROUTS.POSTS, postRoute);
app.use(ROUTS.CATEGORY, categoryRoute)
app.use(ROUTS.USERS, userRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/posts`);
    console.log(`Server is running on http://${HOST}:${PORT}/category`)
    console.log(`Server is running on http://${HOST}:${PORT}/users/register`)
    console.log(`Server is running on http://${HOST}:${PORT}/users/login`)
    console.log(`Server is running on http://${HOST}:${PORT}/users/logout`)


});