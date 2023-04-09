import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Conversation } from '@store/conversations/initialState'
import initialState, { UI, UserInPreview } from './initialState'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState as UI,
  reducers: {
    toggleShowAppOptions: (state, action: PayloadAction<boolean | undefined>) => {
      state.showAppOptions = typeof action.payload === 'boolean' ? action.payload : !state.showAppOptions
    },
    toggleAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload
    },
    toggleShowAuthenticatedUserProfile: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.showAuthenticatedUserProfile =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.showAuthenticatedUserProfile
    },
    toggleShowFriendsDrawer: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.showFriendsDrawer = !state.showFriendsDrawer
    },
    toggleShowSuggestionsDrawer: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      if (typeof action.payload === 'boolean')
        state.showFriendsSuggestionDrawer = action.payload
      else
        state.showFriendsSuggestionDrawer = !state.showFriendsSuggestionDrawer
    },
    toggleShowFriendRequestsDrawer: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      if (typeof action.payload === 'boolean')
        state.showFriendRequestsDrawer = action.payload
      else state.showFriendRequestsDrawer = !state.showFriendRequestsDrawer
    },
    toggleShowPendingFriendsDrawer: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      if (typeof action.payload === 'boolean')
        state.showPendingFriendsDrawer = action.payload
      else state.showPendingFriendsDrawer = !state.showPendingFriendsDrawer
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
    setActiveConversation: (state, action: PayloadAction<Conversation>) => {
      state.activeConversation = {
        ...action.payload,
        hasFetchedAllMessages: action.payload.hasFetchedAllMessages || false,
        hasFetchedInitialMessages:
          action.payload.hasFetchedInitialMessages || false,
        messagesPage: action.payload.messagesPage || 1,
      }
    },
    removeActiveConversation: (state) => {
      state.activeConversation = null
    },
    updateActiveConversation: (
      state,
      action: PayloadAction<
        Partial<
          Conversation & {
            hasFetchedAllMessages?: boolean
            hasFetchedInitialMessages?: boolean
            messagesPage?: number
          }
        >
      >,
    ) => {
      if (state.activeConversation) {
        state.activeConversation = {
          ...state.activeConversation,
          ...(action.payload as Conversation),

          hasFetchedAllMessages:
            action.payload.hasFetchedAllMessages ||
            state.activeConversation?.hasFetchedAllMessages,

          hasFetchedInitialMessages:
            action.payload.hasFetchedInitialMessages ||
            state.activeConversation?.hasFetchedInitialMessages,

          messagesPage:
            action.payload.messagesPage ||
            state.activeConversation?.messagesPage,
        }
      }
    },
  },
})

export const {
  toggleShowAppOptions,
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
  setActiveConversation,
  removeActiveConversation,
  updateActiveConversation,
  toggleShowAuthenticatedUserProfile,
} = uiSlice.actions

export default uiSlice.reducer
