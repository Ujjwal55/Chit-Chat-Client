import { IUser } from "@/lib/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAuthSlice {
    isLoggedIn: boolean;
    user: any;
}

const initialState: IAuthSlice = {
    isLoggedIn: false,
    user: [],
};
  
  

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        setUserProfile: (state, action: PayloadAction<IUser>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
    }
})

export const { login, logout, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
