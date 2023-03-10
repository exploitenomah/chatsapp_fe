import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Alert from '../../types/Alert'
import initialState from './initialState'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addAppAlert: (state, action: PayloadAction<Alert>) => {
      state.appAlerts = [action.payload, ...state.appAlerts]
    },
  },
})

export const { addAppAlert } = notificationsSlice.actions

export default notificationsSlice.reducer
