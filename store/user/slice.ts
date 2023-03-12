import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState, { User } from './initialState'

export const uiSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { firstName, lastName, nickName, email, _id } = action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.nickName = nickName
      state.email = email
      state._id = _id
    },
    clearUser: (state) => {
      const { firstName, lastName, nickName, email, _id } = initialState
      state.firstName = firstName
      state.lastName = lastName
      state.nickName = nickName
      state.email = email
      state._id = _id
    },
  },
})

export const { setUser, clearUser } = uiSlice.actions

export default uiSlice.reducer
