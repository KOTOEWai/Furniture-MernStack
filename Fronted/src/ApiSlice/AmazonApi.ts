
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product1 } from "@/Interface/Type";
export const amazonApi = createApi({
    reducerPath: "amazonApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api"}),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product1[], void>({
            query: () => "/furniture",
            providesTags: ["Product"],
        }),
    }),
});

export const { useGetAllProductsQuery } = amazonApi;
