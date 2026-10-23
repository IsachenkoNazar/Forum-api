import type { Response, Request } from "express";
import type { UserCredendialsBody } from "../dto/request";

export interface UserHandlerContract{
    register: (
        req: Request<{}, {}, UserCredendialsBody>,
        res: Response,
    ) => Promise<void>

    login: (
        req: Request<{}, {}, UserCredendialsBody>,
        res: Response,
    ) => Promise<void>
}