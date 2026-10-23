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
}


export interface UserServiceContract {
    register: (data: UserInput) => Promise<PublicUser>
    login: (data: UserInput) => Promise<{
        user: PublicUser,
        token: string
    }>
}