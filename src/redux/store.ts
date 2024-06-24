import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tabReducer from "./slices/tabSlice";
import chatReducer from "./slices/chatSlice";
import notificationReducer from "./slices/notification"

export const store = configureStore({
    reducer: {
         auth: authReducer,
         tab: tabReducer,
         chat: chatReducer,
         notification: notificationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;