import 'dotenv/config'
import jwt from "jsonwebtoken"
import { createHash, randomUUID } from 'node:crypto';


export function createTokenHasher(accessTokenSecret: string, refreshTokenSecret: string){

    function signAccessToken(userId: number){
        return jwt.sign({}, accessTokenSecret!, {
            algorithm: "HS256",
            subject: String(userId),
            expiresIn: '15m'
        })
    }
    
    function signRefreshToken(userId: number){
        return jwt.sign({type: "refresh"}, refreshTokenSecret, {
            algorithm: "HS256",
            subject: String(userId),
            expiresIn: '7d',
            jwtid: randomUUID()
        })
    }
    
    function verifyAccessToken(token: string){
        try{
            const payload = jwt.verify(token, accessTokenSecret, {
                algorithms: ["HS256"]
            })
            if (typeof payload === "string" || typeof payload.sub !== "string"){
                throw new Error()
            }
            const userId = Number(payload.sub)
            return userId
        } catch {
            throw new Error("INVALID_ACCESS_TOKEN")
        }
    }
    
    function verifyRefreshToken(token: string){
            try{
            const payload = jwt.verify(token, refreshTokenSecret, {
                algorithms: ["HS256"]
            })
            if (typeof payload === "string" || typeof payload.sub !== "string" || payload.type !== "refresh"){
                throw new Error()
            }
            const userId = Number(payload.sub)
            return userId
        } catch {
            throw new Error("INVALID_REFRESH_TOKEN")
            }
    }
    
    function hashRefreshToken(token: string): string{
        return createHash("sha256").update(token).digest('hex')
    }


return {signAccessToken,signRefreshToken,verifyAccessToken,verifyRefreshToken,hashRefreshToken,}
}

