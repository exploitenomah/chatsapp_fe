import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState from './initialState'

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload
    },
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
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const {
  toggleShowFriendsDrawer,
  toggleShowSuggestionsDrawer,
  hideSignupAndLogin,
  toggleShowLogin,
  toggleShowSignup,
  toggleAppLoading,
  updateLoading,
} = uiSlice.actions

export default uiSlice.reducer
