import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  isVisible: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      console.log(showNotification);
      return {
        message: action.payload,
        isVisible: true
      }
    },
    hideNotification(state) {
      console.log(hideNotification);
      return {
        ...state,
        message: '',
        isVisible: false
      }
    }
  }
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;