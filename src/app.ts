import express from "express"
import type { Config } from "./config"
import { createContainer } from "./container"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ROUTS } from "./shared/constants/routers"

export function createApp(config: Config){
    const {routers} = createContainer(config)
    const app = express()
    
    app.use(cors({
        origin: config.corsOrigin,
        credentials: true
    }))


    app.use(express.json())
    app.use(cookieParser())

    app.use(ROUTS.CATEGORY, routers.categoryRouter)
    app.use(ROUTS.POSTS, routers.postRouter)
    app.use(ROUTS.USERS, routers.userRouter)


    return app
}