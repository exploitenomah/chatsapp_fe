import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState, { User } from './initialState'

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getMe: (state, action: PayloadAction<User>) => {
      const { firstName, lastName, nickName, email, _id, friendsCount } =
        action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.nickName = nickName
      state.email = email
      state._id = _id
      state.friendsCount = friendsCount
    },
    clearUser: (state) => {
      const { firstName, lastName, nickName, email, _id, friendsCount } =
        initialState
      state.firstName = firstName
      state.lastName = lastName
      state.nickName = nickName
      state.email = email
      state._id = _id
      state.friendsCount = friendsCount
    },
  },
})

export const { getMe, clearUser } = userSlice.actions

export const userActions = userSlice.actions
export default userSlice.reducer
