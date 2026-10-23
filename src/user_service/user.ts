
import type { userRepositoryContract } from "../domain/user/repository";
import type { PasswordHasherContract, TokenSignerContract, UserServiceContract } from "./user.types";


export function createUserService(
    repository: userRepositoryContract,
    PasswordHasher: PasswordHasherContract,
    TokenSigner: TokenSignerContract
): UserServiceContract{
    return{
        async register(data){
            const {email, password} = data
        
            const hashPassword = await PasswordHasher.hashPassword(password)
        
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

            if (!user || await PasswordHasher.verifyPassword(user.passwordHash, password)){
                throw new Error("Invalid credentials")
            }
        
            return{
                user: {
                    id: user.id,
                    email: user.email
                },
                token: TokenSigner.signAccessToken(user.id)
            }
        }
    }
}
