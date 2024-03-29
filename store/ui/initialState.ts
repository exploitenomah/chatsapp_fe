import { Conversation } from '@store/conversations/initialState'
import { User } from '@store/user/initialState'

export type UserInPreview = User & {
  isPending?: boolean
  isFriend?: boolean
  hasSentRequest?: boolean
}
const initialState: UI = {
  showAppOptions: false,
  showFriendsDrawer: false,
  showFriendsSuggestionDrawer: false,
  showFriendRequestsDrawer: false,
  showPendingFriendsDrawer: false,
  showLogin: false,
  showSignup: false,
  appLoading: true,
  loading: false,
  userInPreview: null,
  activeConversation: null,
  showAuthenticatedUserProfile: false,
  deviceIsMobile: true,
  idOfMsgClickedFromSearch: '',
  showConversationSearchDrawer: false,
}

export type UI = {
  showConversationSearchDrawer: boolean
  idOfMsgClickedFromSearch: string
  showAppOptions: boolean
  showFriendsDrawer: boolean
  showFriendsSuggestionDrawer: boolean
  showFriendRequestsDrawer: boolean
  showPendingFriendsDrawer: boolean
  showLogin: boolean
  showSignup: boolean
  appLoading: boolean
  loading: boolean
  userInPreview: null | UserInPreview
  activeConversation:
    | null
    | (Conversation & {
        messagesPage: number
        hasFetchedAllMessages: boolean
        hasFetchedInitialMessages: boolean
      })
  showAuthenticatedUserProfile: boolean
  deviceIsMobile: boolean
}

export const messagesLimit = 100
export default initialState
