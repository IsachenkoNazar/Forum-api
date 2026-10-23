
import type { userRepositoryContract } from "../domain/user/repository";

type DataBase = typeof import("../prisma/db.js").db


export function createUserRepositoryContract(db: DataBase): userRepositoryContract{
    return{
        async createUser(data){
            try{
                const NewUser = await db.orm.public.User.create(data)

                return NewUser
            } catch(error) {
                if(error instanceof Error && "sqlState" in error && error.sqlState === "23505"){
                    throw new Error("Email is already used!")
                }
                throw error
            
            }
        },
    
        async getUserByEmail(email){
            return db.orm.public.User.where({email}).first()
        }
    }
}