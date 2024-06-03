import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tabReducer from "./slices/tabSlice";

export const store = configureStore({
    reducer: {
         auth: authReducer,
         tab: tabReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;