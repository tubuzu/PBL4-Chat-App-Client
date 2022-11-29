import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SystemNotificationType } from '../../utils/types';

export interface SystemNotificationState {
  notification: SystemNotificationType | null;
}

const initialState: SystemNotificationState = {
  notification: null,
};

export const systemNotificationSlice = createSlice({
  name: 'systemNotification',
  initialState,
  reducers: {
    setSystemNotification: (state, action: PayloadAction<SystemNotificationType>) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { setSystemNotification, clearNotification } = systemNotificationSlice.actions;

export default systemNotificationSlice.reducer;
