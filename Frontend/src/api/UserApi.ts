import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import type { User } from "@/types";
import { type RootState } from "../store";
import { clearUser, setAccessToken } from "../store/slices/userSlice";

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface CreateUserResponse {
    success: boolean;
    result: {
        id: string;
        username: string;
        email: string;
        role: string;
        accessToken: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResult extends User {
    accessToken: string;
}

export interface LoginResponse {
    success: boolean;
    result: {
        id: string;
        username: string;
        email: string;
        role: string;
        accessToken: string;
    };
}

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Attempt to get a new token
        const refreshResult = await baseQuery(
            { url: '/user/refresh-token', method: 'POST' },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as { accessToken: string };

            // Store the new token
            api.dispatch(setAccessToken(accessToken));

            // Retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearUser());
        }
    }
    return result;
};

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        createUser: builder.mutation<CreateUserResponse, RegisterRequest>({
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
