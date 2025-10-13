import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./ApiSlice/productApi";
import { amazonApi } from "./ApiSlice/AmazonApi";
export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [amazonApi.reducerPath]: amazonApi.reducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productApi.middleware).concat(amazonApi.middleware);
        
    }
})