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
}

export default initialState
