
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product1 } from "@/types";
export const amazonApi = createApi({
    reducerPath: "amazonApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product1[], void>({
            query: () => "/furniture",
            providesTags: ["Product"],
        }),
    }),
});

export const { useGetAllProductsQuery } = amazonApi;
