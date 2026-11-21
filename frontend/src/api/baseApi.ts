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

interface LoginRequest{
    email: string,
    password: string
}

interface UserResponse{
    id: number
    email: string,
}


export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: "include"
    }),
    tagTypes: ["Me"],
    endpoints: (builder) => ({
        getPosts: builder.query<PostWithCategory[], void>({query: ()=> "/posts"}),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (data) => ({
                url: "users/register",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Me']
        }),
        login: builder.mutation<void, LoginRequest>({
            query: (data) => ({
                url: "users/login",
                method: "POST",
                body: data
            })
        }),
        getMe: builder.query<UserResponse, void>({query: () => "/users/me", providesTags: ['Me']})
    })

})

export const {useGetPostsQuery, useRegisterMutation, useLoginMutation, useGetMeQuery} = baseApi