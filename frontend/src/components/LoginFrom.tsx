import { useForm } from "react-hook-form"
import { useLoginMutation } from "../api/baseApi"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

interface LoginFormValues {
    email: string
    password: string
}

export function LoginFrom() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        setError,
        clearErrors,
    } = useForm<LoginFormValues>()

    const [loginUser, { isLoading }] = useLoginMutation()

    async function onSubmit(data: LoginFormValues) {
        console.log(data.email)
        clearErrors("root")

        try {
            await loginUser(data).unwrap()
        } catch (error) {
            const apiError = error as FetchBaseQueryError
            let message = "Can't login. Try again"

            if (apiError?.status === 401) {
                message = "Invalid email or password"
            } else if (
                apiError?.status === "FETCH_ERROR" ||
                apiError?.status === "TIMEOUT_ERROR"
            ) {
                message = "Can't connect with server"
            }

            setError("root", { message })
        }
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="login-form">
            <input
                className="input-email"
                type="email"
                placeholder="example@gmail.com"
                required
                {...register("email", {
                    required: "Enter email",
                    maxLength: {
                        value: 100,
                        message: "You are exceeding your symbol limit",
                    },
                })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
                className="input-password"
                type="password"
                placeholder="create password"
                required
                {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <p>{isDirty ? "Fill the form" : "Form isn't filled"}</p>
            <p>
                {!isDirty
                    ? "Fill the form"
                    : isValid
                      ? "Fields were successfully checked"
                      : "Check the data"}
            </p>

            {errors.root && <p>{errors.root.message}</p>}

            <button type="submit" disabled={isLoading} className="button-login">
                {isLoading ? "Logging in" : "Login"}
            </button>
        </form>
    )
}