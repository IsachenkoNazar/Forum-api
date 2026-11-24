import type { RefreshSessionRepositoryContract } from "../../domain/refresh-session/repository"
import type { PublicUser } from "../../domain/user/entity"
import type { userRepositoryContract } from "../../domain/user/repository"

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

export interface TokenServiceContract {
	signAccessToken: (userId: number) => string;
	signRefreshToken: (userId: number) => string;

	verifyAccessToken: (token: string) => number;
	verifyRefreshToken: (token: string) => number;

	hashRefreshToken: (hash: string) => string;
};


export interface RefreshTokenHasherContract{
    hashRefreshToken: (hash: string) => string
}

export interface UserTokens{
    accessToken: string,
    refreshToken: string
}


export interface UserServiceDependencies{
    repository: userRepositoryContract,
    refreshSessionRepository: RefreshSessionRepositoryContract,
    passwordHasher: PasswordHasherContract,
    tokenHasher: TokenServiceContract
}



export interface UserServiceContract {
    register: (data: UserInput) => Promise<PublicUser>
    login: (data: UserInput) => Promise<{user: PublicUser} & UserTokens>
    refresh: (refreshToken: string) => Promise<UserTokens>
    me: (id: number) => Promise<PublicUser>
    logout: (refreshToken: string | undefined) => Promise<void>
}

