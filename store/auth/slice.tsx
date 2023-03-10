import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/User'
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
  },
})

export const { authenticate, logout } = authSlice.actions

export default authSlice.reducer
