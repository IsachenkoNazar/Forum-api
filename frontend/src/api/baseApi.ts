import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostWithCategory } from "../types/posts";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    endpoints: (builder) => ({
        getPosts: builder.query<PostWithCategory[], void>({query: ()=> "/posts"})
    })

})

export const {useGetPostsQuery} = baseApi