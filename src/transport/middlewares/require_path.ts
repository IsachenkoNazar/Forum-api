import type { RequestHandler } from "express";
import { readAccessToken } from "../cookies/user";


export function createRequierAuth(verifyAccessToken: (token: string) => number): RequestHandler{
    return(req, res, next) => {
        const token = readAccessToken(req)
        if(typeof token !== "string"){
            res.status(401).json({ok: false, message: 'Unauthorized'})
            return
        }
    
    
        try{
            res.locals.userId = verifyAccessToken(token)
            next()
        }catch(error){
            res.status(401).json({message: 'Unathorized'})
            return
        }
    }
}