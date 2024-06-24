import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '@/lib/types/types';

interface ChatState {
  selectedChat: IChat | null
}

const initialState: ChatState = {
  selectedChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<IChat>) {
      state.selectedChat = action.payload;
    },
  },
});

export const { setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
