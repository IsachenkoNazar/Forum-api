import type { UserTokens } from "../../services/user_service/user.types"
import type { Response, Request } from "express"
import {COOKIES} from "../../shared/constants/cookies"


export function setUserTokens(res: Response,tokens: UserTokens)
{
    res.cookie(COOKIES.ACCESS_TOKEN, tokens.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        path: "/"

    })
    res.cookie(COOKIES.REFRESH_TOKEN, tokens.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
    }) 
}

export function clearUserTokens(res: Response){
    res.clearCookie(COOKIES.ACCESS_TOKEN, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/"
    })

    res.clearCookie(COOKIES.REFRESH_TOKEN, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/"
    })

}


export function readAccessToken(req: Request){

    const accessToken = req.cookies[COOKIES.ACCESS_TOKEN] 

    return typeof accessToken ==='string'
    ?accessToken
    :undefined
}

export function readRefreshToken(req: Request){

    const refreshToken = req.cookies[COOKIES.ACCESS_TOKEN] 

    return typeof refreshToken ==='string'
    ?refreshToken
    :undefined
}