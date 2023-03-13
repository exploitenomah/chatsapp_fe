import { User } from '@store/user/initialState'

export type Friend = {
  requester: User
  is_valid: boolean
  recipient: User
}

export type FriendsState = {
  hasFetchedFriends: boolean
  friends: Friend[]
  friendsCount: number
}

const initialState: FriendsState = {
  hasFetchedFriends: false,
  friendsCount: 0,
  friends: [],
}

export default initialState
