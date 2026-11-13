import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostWithCategory } from "../types/posts";

interface RegisterResponse{
    id: number,
    email: string
}

interface RegisterRequest{
    email: string,
    password: string
}

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    endpoints: (builder) => ({
        getPosts: builder.query<PostWithCategory[], void>({query: ()=> "/posts"}),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (data) => ({
                url: "users/register",
                method: "POST",
                body: data
            })
        })
    })

})

export const {useGetPostsQuery, useRegisterMutation} = baseApi