import type { Config } from "./config";
import { createTokenHasher } from "./lib/jwt";
import { createPasswordHasher } from "./lib/password";
import { createDb } from "./prisma/db"
import { createCategoryRepository } from "./repositories/category_repository/category";
import { createPostRepository } from "./repositories/post_repository/post";
import { CreateRefreshSessionRepository } from "./repositories/refresh-sessions/refresh-sessions";
import { createUserRepositoryContract } from "./repositories/user_repository/user";
import { createPostService } from "./services/post_service/post";
import { createUserService } from "./services/user_service/user";
import { createCategorHandler } from "./transport/handlers/category_handler/category";
import { createPosthandler } from "./transport/handlers/post/post";
import { createUserHandler } from "./transport/handlers/user_handlers/user";
import { createRequierAuth } from "./transport/middlewares/require_path";
import { createCategoryRoute } from "./transport/routers/category";
import { createPostRoute } from "./transport/routers/post";
import { createUserRouter } from "./transport/routers/user";

export function createContainer(config: Config){
    const db = createDb(config.databaseUrlSecret)
    
    const userRepository = createUserRepositoryContract(db)
    const refreshSessionRepository = CreateRefreshSessionRepository(db)

    const passwordHasher = createPasswordHasher(config.passwordPepperSecret)
    const tokenHasher = createTokenHasher(config.accessTokenSecret, config.refreshTokenSecret)


    const userService = createUserService({
        repository: userRepository,
        refreshSessionRepository,
        passwordHasher,
        tokenHasher
    })



    const requireAuth = createRequierAuth(tokenHasher.verifyAccessToken)

    const userRouter = createUserRouter(createUserHandler(userService), requireAuth)

    const postRouter = createPostRoute(createPosthandler(createPostRepository(db)))

    const categoryRouter = createCategoryRoute(createCategorHandler(createCategoryRepository(db)))

    return{
        routers: {
            userRouter, postRouter, categoryRouter
        }
    }
}
