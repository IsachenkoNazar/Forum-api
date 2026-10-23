import "dotenv/config"
import type { UserServiceContract } from "../../user_service/user.types"
import type { UserHandlerContract } from "./user.types"


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
                if (error instanceof Error && error.message === "USER ALREADY EXIST") {
                    res.status(409).json({ message: "User already exist" });
                    return;
                }
                
                res.status(500).json({message: "Internal server error"})
            }
        },

        async login(req, res){
            try{
                const {email, password} = req.body

                const result = await service.login({email, password})

                res.cookie("token", result.token, {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 15 * 60 * 1000,
                    path: "/"

                })
            
                res.status(200).json(result.user)
            }
            catch(error){
                if (error instanceof Error && error.message === "PASSWORD_IS_WRONG") {
                res.status(401).json({ message: "Password is wrong" });
                return
            }
            res.status(500).json({message: 'Internal server error'})
        }
    }
}}
