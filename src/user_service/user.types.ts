import type { PublicUser } from "../domain/user/entity"
import { hashPassword } from "../lib/password"

export interface UserInput{
    email: string,
    password:string
}

export interface PasswordHasherContract{
    hashPassword: (password: string) => Promise<string>
    verifyPassword: (hash: string, password: string) => Promise<boolean>
}

export interface TokenSignerContract{
   signAccessToken: (userId: number) => string
   signRefreshToken: (userId: number) => string 
}

export interface TokenVerifierContract{
    verifyAccessToken: (token: string) => number
    verifyRefreshToken: (token: string) => number
}

export interface UserTokens{
    accessToken: string,
    refreshToken: string
}


export interface UserServiceContract {
    register: (data: UserInput) => Promise<PublicUser>
    login: (data: UserInput) => Promise<{user: PublicUser} & UserTokens>
    refresh: (refreshToken: string) => Promise<UserTokens>
    me: (id: number) => Promise<PublicUser>
}