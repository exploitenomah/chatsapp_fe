import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Alert from '../../types/Alert'
import initialState from './initialState'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addAppAlert: (state, action: PayloadAction<Alert>) => {
      if (state.appAlerts.find((el) => el.message === action.payload.message))
        return
      state.appAlerts = [action.payload, ...state.appAlerts]
    },
    removeAppAlert: (state, action: PayloadAction<number>) => {
      state.appAlerts = state.appAlerts.filter(
        (appAlert) => appAlert.id !== action.payload,
      )
    },
  },
})

export const { addAppAlert, removeAppAlert } = notificationsSlice.actions

export default notificationsSlice.reducer
