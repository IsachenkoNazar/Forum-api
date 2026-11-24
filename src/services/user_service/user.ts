
import type { PasswordHasherContract,UserServiceContract,UserServiceDependencies,} from "./user.types";

export function createUserService(dependencies: UserServiceDependencies): UserServiceContract{
    const {repository, refreshSessionRepository, passwordHasher, tokenHasher} = dependencies
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

            const refreshToken = tokenHasher.signRefreshToken(user.id)

            await refreshSessionRepository.create({
                userId: user.id,
                tokenHash: tokenHasher.hashRefreshToken(refreshToken),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })
        
            return{
                user: {
                    id: user.id,
                    email: user.email
                },
                accessToken: tokenHasher.signAccessToken(user.id),
                refreshToken
            }
        },
    
        async refresh(refreshToken){
            const userId = tokenHasher.verifyRefreshToken(refreshToken)
            const oldHash = await tokenHasher.hashRefreshToken(refreshToken)
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
                const newRefreshToken = tokenHasher.signRefreshToken(user.id)
                const isChanged = await refreshSessionRepository.update(oldHash, tokenHasher.hashRefreshToken(newRefreshToken),
                    new Date (Date.now() + 7 * 24 * 60 * 60 * 1000))
                    if(!isChanged){
                        throw new Error("INVALID REFRESH TOKEN")
            }
            return{
                accessToken: tokenHasher.signAccessToken(user.id),
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
                await refreshSessionRepository.delete(tokenHasher.hashRefreshToken(refreshToken))
        }
    }
}
