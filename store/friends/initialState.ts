import { User } from '@store/user/initialState'

export const friendsEvents = [
  'getSuggestions',
  'request',
  'getMany',
  'remove',
  'accept',
]

export type Friend = {
  requester: string
  isValid: boolean
  recipient: string
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
}

export default initialState
