import { User } from '@store/user/initialState'

export type UserInPreview = User & {
  isPending?: boolean
  isFriend?: boolean
  hasSentRequest?: boolean
}
const initialState: UI = {
  showFriendsDrawer: false,
  showFriendsSuggestionDrawer: false,
  showLogin: false,
  showSignup: false,
  appLoading: true,
  loading: false,
  userInPreview: null,
}

export type UI = {
  showFriendsDrawer: boolean
  showFriendsSuggestionDrawer: boolean
  showLogin: boolean
  showSignup: boolean
  appLoading: boolean
  loading: boolean
  userInPreview: null | UserInPreview
}

export default initialState
