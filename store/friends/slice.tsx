import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@store/user/initialState'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import initialState, { Friend } from './initialState'

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    updateFriends: (state, action: PayloadAction<Friend[]>) => {
      const allFriends = makeUniqueArrOfObjectsWith_IdKey([
        ...state.friends,
        ...action.payload,
      ])
      state.friends = allFriends
    },
    getSuggestions: (state, action: PayloadAction<User[]>) => {
      state.suggestions = makeUniqueArrOfObjectsWith_IdKey([
        ...action.payload,
        ...state.suggestions,
      ])
      state.suggestionsPage = state.suggestionsPage + 1
      state.hasFetchedAllSuggestions = action.payload.length < state.limit
      if (state.hasFetchedInitialSuggestions === false)
        state.hasFetchedInitialSuggestions = true
    },
    request: (state, action: PayloadAction<Friend>) => {
      const payload = action.payload
      if (!payload.isValid) {
        if (payload.requester === state.user?._id) {
          state.pendingFriends = makeUniqueArrOfObjectsWith_IdKey([
            ...state.pendingFriends,
            payload,
          ])
        } else if (payload.recipient === state.user?._id) {
          state.friendRequests = makeUniqueArrOfObjectsWith_IdKey([
            ...state.friendRequests,
            payload,
          ])
        }
      }
    },
    remove: (state, action: PayloadAction<Friend | null>) => {
      const payload = action.payload
      const filterOutPayload = (req: Friend) => req._id !== payload?._id
      state.friendRequests = state.friendRequests.filter(filterOutPayload)
      state.pendingFriends = state.pendingFriends.filter(filterOutPayload)
      state.friends = state.friends.filter(filterOutPayload)
    },
    accept: (state, action: PayloadAction<Friend>) => {
      const payload = action.payload
      const filterOutPayload = (req: Friend) => req._id !== payload._id
      state.friendRequests = state.friendRequests.filter(filterOutPayload)
      state.pendingFriends = state.pendingFriends.filter(filterOutPayload)
      state.friends = makeUniqueArrOfObjectsWith_IdKey([
        ...state.friends,
        payload,
      ])
    },
    getMany: (state, action: PayloadAction<Friend[]>) => {
      const payload = action.payload
      const usersFriends = payload.filter((item) => item.isValid === true)
      state.friends = makeUniqueArrOfObjectsWith_IdKey([
        ...state.friends,
        ...usersFriends,
      ])
      const friendRequests = payload.filter(
        (item) => item.isValid === false && item.recipient === state.user?._id,
      )
      state.friendRequests = makeUniqueArrOfObjectsWith_IdKey([
        ...state.friendRequests,
        ...friendRequests,
      ])
      const pendingFriends = payload.filter(
        (item) => item.isValid === false && item.requester === state.user?._id,
      )
      state.pendingFriends = makeUniqueArrOfObjectsWith_IdKey([
        ...state.pendingFriends,
        ...pendingFriends,
      ])
      state.friendsPage = state.friendsPage + 1
      state.hasFetchedAllFriends = payload.length < state.limit
    },
    updateTotalNotificationsCount: (state, action: PayloadAction<number>) => {
      state.totalNotificationsCount = action.payload
    },
    updateFriendRequestsNotificationCount: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.friendRequestsNotificationCount = action.payload
    },
    updatePendingFriendsNotificationCount: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.pendingFriendsNotificationCount = action.payload
    },
  },
})

export const {
  updateFriends,
  updateUser,
  updateTotalNotificationsCount,
  updateFriendRequestsNotificationCount,
  updatePendingFriendsNotificationCount,
} = friendsSlice.actions

export const friendsActions = friendsSlice.actions

export default friendsSlice.reducer
