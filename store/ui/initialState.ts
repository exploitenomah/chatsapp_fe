import { Conversation } from '@store/conversations/initialState'
import { User } from '@store/user/initialState'

export type UserInPreview = User & {
  isPending?: boolean
  isFriend?: boolean
  hasSentRequest?: boolean
}
const initialState: UI = {
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
}

export type UI = {
  showFriendsDrawer: boolean
  showFriendsSuggestionDrawer: boolean
  showFriendRequestsDrawer: boolean
  showPendingFriendsDrawer: boolean
  showLogin: boolean
  showSignup: boolean
  appLoading: boolean
  loading: boolean
  userInPreview: null | UserInPreview
  activeConversation: Conversation | null
}

export default initialState
