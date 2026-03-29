import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product1 } from "@/types";

interface GetProductsResponse {
  data: Product1[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const amazonApi = createApi({
  reducerPath: "amazonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, Record<string, any>>({
      query: (params) => ({
        url: 'furniture',
        params: params,
      }),
    }),
    getFurnitureCategories: builder.query<{ name: string; count: number }[], void>({
      query: () => 'furniture-categories',
    }),
    getFurnitureColors: builder.query<{ name: string; count: number }[], void>({
      query: () => 'furniture-colors',
    }),
  }),
});

export const { useGetProductsQuery, useGetFurnitureCategoriesQuery, useGetFurnitureColorsQuery } = amazonApi;

