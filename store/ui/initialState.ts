import { User } from '@store/user/initialState'

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
  userInPreview:
    | null
    | (User & {
        isFriend?: boolean
        isPending?: boolean
        hasSentRequest?: boolean
      })
}

export default initialState
