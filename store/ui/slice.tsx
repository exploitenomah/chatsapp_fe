import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Conversation } from '@store/conversations/initialState'
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
    setActiveConversation: (state, action: PayloadAction<Conversation>) => {
      state.activeConversation = {
        ...action.payload,
        hasFetchedAllMessages: false,
        hasFetchedInitialMessages: false,
        messagesPage: 1,
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
} = uiSlice.actions

export default uiSlice.reducer
