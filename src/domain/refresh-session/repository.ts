import type { RefreshSession } from "./entity";

export type NewRefreshSession = Pick<RefreshSession, "userId" | "tokenHash" | "expiresAt">

export interface RefreshSessionRepositoryContract{
    create: (data: NewRefreshSession) => Promise<void>
    getByHash: (tokenHash: string) => Promise<RefreshSession | null>
    update: (oldHash:string, newHash:string, expiresAt:Date)=> Promise<boolean>
    delete: (tokenHash: string)=> Promise<void>
}
