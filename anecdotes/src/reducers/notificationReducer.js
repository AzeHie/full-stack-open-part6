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
      return {
        message: action.payload,
        isVisible: true,
      };
    },
    hideNotification(state) {
      return {
        ...state,
        message: '',
        isVisible: false,
      };
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(hideNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
