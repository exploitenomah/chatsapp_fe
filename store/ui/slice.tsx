import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@store/user/initialState'
import initialState, { UI, UserInPreview } from './initialState'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState as UI,
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
    toggleShowFriendRequestsDrawer: (state) => {
      state.showFriendRequestsDrawer = !state.showFriendRequestsDrawer
    },
    toggleShowPendingFriendsDrawer: (state) => {
      state.showPendingFriendsDrawer = !state.showPendingFriendsDrawer
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
    updateUserInPreview: (state, action: PayloadAction<UserInPreview>) => {
      state.userInPreview = action.payload
    },
    removeUserInPreview: (state) => {
      state.userInPreview = null
    },
  },
})

export const {
  toggleShowFriendsDrawer,
  toggleShowSuggestionsDrawer,
  toggleShowFriendRequestsDrawer,
  toggleShowPendingFriendsDrawer,
  hideSignupAndLogin,
  toggleShowLogin,
  toggleShowSignup,
  toggleAppLoading,
  updateLoading,
  updateUserInPreview,
  removeUserInPreview,
} = uiSlice.actions

export default uiSlice.reducer
