import { User } from '@store/user/initialState'

export const friendsEvents = [
  'getSuggestions',
  'request',
  'getMany',
  'remove',
  'accept',
  'seen',
]

export type Friend = {
  requester: User
  isValid: boolean
  recipient: User
  _id: string
  createdAt: string
  updatedAt: string
  seen: boolean
}

const initialState: FriendsState = {
  user: null,
  suggestionsPage: 1,
  hasFetchedAllSuggestions: false,
  hasFetchedAllFriends: false,
  hasFetchedInitialSuggestions: false,
  friendsPage: 1,
  friendsCount: 0,
  friends: [],
  suggestions: [],
  limit: 5,
  pendingFriends: [],
  friendRequests: [],
  totalNotificationsCount: 0,
  pendingFriendsNotificationCount: 0,
  friendRequestsNotificationCount: 0,
  friendRequestsPage: 1,
  pendingFriendsPage: 1,
  hasFetchedAllFriendRequests: false,
  hasFetchedAllPendingFriends: false,
}

export type FriendsState = {
  limit: number
  suggestionsPage: number
  friendsPage: number
  friends: Friend[]
  friendsCount: number
  suggestions: User[]
  hasFetchedAllSuggestions: boolean
  pendingFriends: Friend[]
  user: null | User
  friendRequests: Friend[]
  hasFetchedAllFriends: boolean
  hasFetchedInitialSuggestions: boolean
  totalNotificationsCount: number
  pendingFriendsNotificationCount: number
  friendRequestsNotificationCount: number
  friendRequestsPage: number
  pendingFriendsPage: number
  hasFetchedAllFriendRequests: boolean
  hasFetchedAllPendingFriends: boolean
}

export default initialState
