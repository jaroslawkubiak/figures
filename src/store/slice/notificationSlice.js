import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: '',
    hide: '',
  },
  reducers: {
    addNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.hide = action.payload.hide;
    },
    removeNotification(state, action) {
      state.message = null;
      state.type = null;
      state.hide = null;
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export const notificationReducers = notificationSlice.reducer;
