import { User } from '@store/user/initialState'

export const friendsEvents = ['getSuggestions', 'request']

export type Friend = {
  requester: string
  is_valid: boolean
  recipient: string
}

const initialState: FriendsState = {
  hasFetchedFriends: false,
  friendsCount: 0,
  friends: [],
  suggestions: [],
  suggestionsPage: 1,
  limit: 5,
  hasFetchedAllSuggestions: false,
  pendingFriends: [],
}

export type FriendsState = {
  hasFetchedFriends: boolean
  friends: Friend[]
  friendsCount: number
  suggestionsPage: number
  suggestions: User[]
  hasFetchedAllSuggestions: boolean
  limit: number
  pendingFriends: Friend[]
}

export default initialState
