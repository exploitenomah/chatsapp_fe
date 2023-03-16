import { User } from '@store/user/initialState'

export const friendsEvents = ['getSuggestions']

export type Friend = {
  requester: User
  is_valid: boolean
  recipient: User
}

export type FriendsState = {
  hasFetchedFriends: boolean
  friends: Friend[]
  friendsCount: number
  suggestionsPage: number
  suggestions: User[]
  hasFetchedAllSuggestions: boolean
  limit: number
}

const initialState: FriendsState = {
  hasFetchedFriends: false,
  friendsCount: 0,
  friends: [],
  suggestions: [],
  suggestionsPage: 1,
  limit: 5,
  hasFetchedAllSuggestions: false,
}

export default initialState
