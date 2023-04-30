import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState, { User } from './initialState'

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getMe: (state, action: PayloadAction<User>) => {
      const {
        firstName,
        lastName,
        nickName,
        email,
        _id,
        friendsCount,
        about,
        profileImage,
      } = action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.nickName = nickName
      state.email = email
      state._id = _id
      state.about = about
      state.profileImage = profileImage
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
    updateMe: (state, action: PayloadAction<User>) => {
      const { firstName, lastName, nickName, email, _id, about, profileImage } =
        action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.nickName = nickName
      state.email = email
      state.about = about
      state._id = _id
      if (profileImage) {
        state.profileImage = profileImage
      }
    },
  },
})

export const { getMe, clearUser } = userSlice.actions

export const userActions = userSlice.actions
export default userSlice.reducer
