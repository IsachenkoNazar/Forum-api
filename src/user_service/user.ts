
import type { userRepositoryContract } from "../domain/user/repository";
import type { PasswordHasherContract, TokenSignerContract, UserServiceContract, TokenVerifierContract } from "./user.types";


export function createUserService(
    repository: userRepositoryContract,
    passwordHasher: PasswordHasherContract,
    tokenSigner: TokenSignerContract,
    tokenVerifier: TokenVerifierContract
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
        
            return{
                user: {
                    id: user.id,
                    email: user.email
                },
                accessToken: tokenSigner.signAccessToken(user.id),
                refreshToken: tokenSigner.signRefreshToken(user.id)
            }
        },
    
        async refresh(refreshToken){
            const userId = tokenVerifier.verifyRefreshToken(refreshToken)
            const user = await repository.getUserById(userId)
        
            if(!user){
                throw new Error("INVALID_REFRESH_TOKEN")
            }
            return{
                accessToken: tokenSigner.signAccessToken(user.id),
                refreshToken: tokenSigner.signRefreshToken(user.id)

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
        }
    }
}
