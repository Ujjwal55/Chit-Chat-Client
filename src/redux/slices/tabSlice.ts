import { IUser } from "@/lib/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: number = 1
  
  

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        toggleTab(state, action: PayloadAction<number>) {
            return action.payload;
        }
    }
})

export const { toggleTab } = tabSlice.actions
export default tabSlice.reducer

