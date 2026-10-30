import "dotenv/config"
import type { UserServiceContract, UserTokens } from "../../user_service/user.types"
import type { UserHandlerContract } from "./user.types"
import type { Response } from "express"


function setUserTokens(
    res: Response,
    tokens: UserTokens
){
    res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        path: "/"

    })
    res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
    }) 
}
export function createUserHandler(
    service: UserServiceContract
): UserHandlerContract{
    return{
        async register(req, res){
            try{
                const {email, password} = req.body

                if (!email || !password){
                    res.status(422).json({message: 'Validation error'})
                    return
                }


                const user = await service.register({email, password})
                res.status(201).json(user)

            }

            catch(error) {
                if (error instanceof Error && error.message === "Email is already used!") {
                    res.status(409).json({ message: "Email is already used" });
                    return;
                }
                
                res.status(500).json({message: "Internal server error"})
            }
        },

        async login(req, res){
            try{
                const {email, password} = req.body

                const result = await service.login({email, password})

                setUserTokens(res, {
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken
                })
                res.status(200).json(result)
            }
            catch(error){
                if (error instanceof Error && error.message === "Invalid credentials") {
                    res.status(401).json({ message: "Invalid password" });
                    return
                }
            console.error(error)
            res.status(500).json({message: 'Internal server error'})
            }   
        },

        async refresh(req, res) {
            const refreshToken = req.cookies?.refreshToken
            if (typeof refreshToken !== 'string'){
                res.status(401).json({message: 'unathorized'})
                return
            } 
            try{
                const tokens = await service.refresh(refreshToken)
                setUserTokens(res, tokens)
                res.status(200).json({message: "tokens update"})
            }
            catch(error){
                res.status(500).json({message: "Internal server error"})
            }
            return
        },

        async me(req, res) {
            try{
                const userId = res.locals.userId
                const user = await service.me(userId)

                res.status(200).json(user)
            }
        
            catch(error){
                res.status(500).json({message: "Internal server error"})
            }
        }
}}
