import type { RefreshSessionRepositoryContract } from "../../domain/refresh-session/repository";

type DataBase = typeof import("../../prisma/db.js").db

export function CreateRefreshSessionRepository(db: DataBase): RefreshSessionRepositoryContract{
    return{
        async create(data){
            await db.orm.public.RefreshSession.create(data)
        },

        async getByHash(tokenHash){
            return await db.orm.public.RefreshSession.where({tokenHash}).first()
        },

        async update(oldHash, newHash, expiresAt){
            const result = await db.orm.public.RefreshSession.where({tokenHash: oldHash}).update({
                tokenHash: newHash,
                expiresAt
            })
        
            return result? true: false
        },
        

        async delete(tokenHash){
            await db.orm.public.RefreshSession.where({tokenHash}).delete()
        }
    }
}