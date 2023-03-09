import { createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'

export const uiSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggleShowFriendsDrawer: (state) => {
      state.showFriendsDrawer = !state.showFriendsDrawer
    },
    toggleShowSuggestionsDrawer: (state) => {
      state.showFriendsSuggestionDrawer = !state.showFriendsSuggestionDrawer
    },
    toggleShowSignup: (state) => {
      state.showSignup = !state.showSignup
      state.showLogin = false
    },
    toggleShowLogin: (state) => {
      state.showLogin = !state.showLogin
      state.showSignup = false
    },
    hideSignupAndLogin: (state) => {
      state.showSignup = false
      state.showLogin = false
    },
  },
})

export const {
  toggleShowFriendsDrawer,
  toggleShowSuggestionsDrawer,
  hideSignupAndLogin,
  toggleShowLogin,
  toggleShowSignup,
} = uiSlice.actions

export default uiSlice.reducer
