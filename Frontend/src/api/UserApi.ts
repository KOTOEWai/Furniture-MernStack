// ...existing code...
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { User } from "@/types";

export interface CreateUserResponse {
    success: boolean;
    result: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResult {
    token: string;
    id?: string;
    username?: string;
    email?: string;
    role?: string;
}

export interface LoginResponse {
    success: boolean;
    result: LoginResult;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: "include"
    },
    ),
    tagTypes: ["User"],
    endpoints: (builder) => ({

        createUser: builder.mutation<CreateUserResponse, Partial<User>>({
            query: (newUser) => ({
                url: "/user/register",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["User"],
        }),
        LoginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (user) => ({
                url: "/user/login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        getUserById: builder.query<User, string>({
            query: (id) => `/user/${id}`,
            providesTags: ["User"],
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => "/user/me",
            providesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/user/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),

    }),
});

export const {
    useCreateUserMutation,
    useLoginUserMutation,
    useGetUserByIdQuery,
    useGetCurrentUserQuery,
    useLogoutMutation
} = userApi;
