
import type { RefreshSessionRepositoryContract } from "../../domain/refresh-session/repository";
import type { userRepositoryContract } from "../../domain/user/repository";
import { signRefreshToken } from "../../lib/jwt";
import { CreateRefreshSessionRepository } from "../../repositories/refresh-sessions/refresh-sessions";
import type { PasswordHasherContract, TokenSignerContract, UserServiceContract, TokenVerifierContract, RefreshTokenHasherContract } from "./user.types";

export function createUserService(
    repository: userRepositoryContract,
    passwordHasher: PasswordHasherContract,
    tokenSigner: TokenSignerContract,
    tokenVerifier: TokenVerifierContract,
    refreshTokenHasher: RefreshTokenHasherContract,
    refreshSessionRepository: RefreshSessionRepositoryContract
): UserServiceContract{
    return{
        async register(data){
            const {email, password} = data
        
            const hashPassword = await passwordHasher.hashPassword(password)
        
            const user = await repository.createUser({
                email: email.trim(),
                passwordHash: hashPassword
            })
        
            return{
                id: user.id,
                email: user.email
            }
        
        },

        async login(data){

            const {email, password} = data

            const user = await repository.getUserByEmail(email.trim())

            if (!user || !await passwordHasher.verifyPassword(user.passwordHash, password)){
                throw new Error("Invalid credentials")
            }

            const refreshToken = tokenSigner.signRefreshToken(user.id)

            await refreshSessionRepository.create({
                userId: user.id,
                tokenHash: refreshTokenHasher.hashRefreshToken(refreshToken),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })
        
            return{
                user: {
                    id: user.id,
                    email: user.email
                },
                accessToken: tokenSigner.signAccessToken(user.id),
                refreshToken
            }
        },
    
        async refresh(refreshToken){
            const userId = tokenVerifier.verifyRefreshToken(refreshToken)
            const oldHash = await refreshTokenHasher.hashRefreshToken(refreshToken)
            const session = await refreshSessionRepository.getByHash(oldHash)
        

            if (!session) {
                throw new Error("INVALID_REFRESH_TOKEN")
            }

            if(userId !== session.userId || session.expiresAt <= new Date()) {
                throw new Error("INVALID_REFRESH_TOKEN")
            }
           
            const user = await repository.getUserById(userId)
            if(!user){
                throw new Error("INVALID_REFRESH_TOKEN")
            }
                const newRefreshToken = tokenSigner.signRefreshToken(user.id)
                const isChanged = await refreshSessionRepository.update(oldHash, refreshTokenHasher.hashRefreshToken(newRefreshToken),
                    new Date (Date.now() + 7 * 24 * 60 * 60 * 1000))
                    if(!isChanged){
                        throw new Error("INVALID REFRESH TOKEN")
            }
            return{
                accessToken: tokenSigner.signAccessToken(user.id),
                refreshToken: newRefreshToken

            }
        },
      
        async me(id){
            const user = await repository.getUserById(id)

            if(!user){
                throw new Error("UNATHORIZED")
            }

            return{
                id: user.id,
                email: user.email
            }
        },
        async logout(refreshToken) {
            if (!refreshToken) return;
                await refreshSessionRepository.delete(refreshTokenHasher.hashRefreshToken(refreshToken))
        }
    }
}
