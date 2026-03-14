import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";
import { amazonApi } from "../api/AmazonApi";
import { userApi } from "../api/UserApi";
import userSlice from "./slices/userSlice";
export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [amazonApi.reducerPath]: amazonApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        user: userSlice
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productApi.middleware).concat(amazonApi.middleware).concat(userApi.middleware);

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;