import { User } from '@store/user/initialState'

const initialState = {
  showFriendsDrawer: false,
  showFriendsSuggestionDrawer: false,
  showLogin: false,
  showSignup: false,
  appLoading: true,
  loading: false,
}

export type UI = typeof initialState & {
  userInPreview: null | (User & { isFriend?: boolean })
}

export default initialState
