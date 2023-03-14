import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState from './initialState'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isLoggedIn = action.payload.length > 0
    },
    logout: (state) => {
      state.token = ''
      state.isLoggedIn = false
    },
    goOffline: (state) => {
      state.isOffline = true
    },
    goOnline: (state) => {
      state.isOffline = false
    },
  },
})

export const { authenticate, logout, goOffline, goOnline } = authSlice.actions

export default authSlice.reducer
