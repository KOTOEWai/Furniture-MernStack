import type { ProductApiResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://furniture-api.fly.dev/v1/" }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductApiResponse, void>({
            query: () => "/products",
            providesTags: ["Product"],
        }),
    }),
});


export const { useGetAllProductsQuery } = productApi;