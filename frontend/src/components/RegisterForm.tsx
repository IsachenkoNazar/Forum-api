import {useForm}  from "react-hook-form"
import { useRegisterMutation } from "../api/baseApi"

interface RegisterFormValues{
    email: string,
    password: string
}

export function RegisterForm(){
    const {register, handleSubmit} = useForm<RegisterFormValues>()
    const [registerUser] = useRegisterMutation()

   async function onSubmit(data: RegisterFormValues){
        const result = await registerUser(data)
        alert(`Користувач ${result.data?.email} успішно зареєстровано`)
   }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className = "register-form">
            <input type="email"
            placeholder="usermail@gmail.com"
            required
            className="input-email"
            {...register("email")}
            />

            <input type="password"
            placeholder="enter password" 
            required
            className="input-password"
            {...register("password")}
            />
        <button type="submit" className="button">Register</button>
        </div>
        </form>
    )
}