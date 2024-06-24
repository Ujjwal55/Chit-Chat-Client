import { IMessageAlert } from '@/lib/types/types';
import { createSlice } from '@reduxjs/toolkit';

function getInitialMessageAlert(): Array<IMessageAlert> {
  if (typeof window !== "undefined") {
    const storedAlert = localStorage.getItem("NEW_MESSAGE_ALERT");
    if (storedAlert !== null) {
      return JSON.parse(storedAlert) as Array<IMessageAlert>;
    }
  }
  return [{ chatId: "", count: 0 }];
}

const initialState = {
  notificationCount: 0,
  newMessageAlert: getInitialMessageAlert()
};

const chatSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    incrementNotification(state) {
        state.notificationCount += 1;
    },
    decrementNotification(state) {
        state.notificationCount -= 1;
    },
    reset(state) {
      state.notificationCount = 0;
    },
    setNewMessageAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex((item: { chatId: string ; count: number }) => item.chatId === action.payload.chatId);

      if(index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId: action.payload.chatId,
          count: 1
        })
      }
    },
    resetNewMessageAlert(state, action) {
      const index = state.newMessageAlert.findIndex((item: { chatId: string ; count: number }) => item.chatId === action.payload);
      if(index !== -1) {
        state.newMessageAlert[index].count = 0;
      }
    }
  },
});

export const { incrementNotification, decrementNotification, reset, setNewMessageAlert, resetNewMessageAlert } = chatSlice.actions;

export default chatSlice.reducer;
