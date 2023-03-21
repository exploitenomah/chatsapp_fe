import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@store/user/initialState'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import initialState, { Friend, FriendsState } from './initialState'

const handleFriendsPayload = (
  state: Draft<FriendsState>,
  payload: Friend[],
) => {
  const usersFriends = payload.filter((item) => item.isValid === true)
  state.friends = makeUniqueArrOfObjectsWith_IdKey([
    ...state.friends,
    ...usersFriends,
  ])

  const payloadIsFriendsOfUser = payload.every((item) => item.isValid === true)
  if (payloadIsFriendsOfUser) {
    state.friendsPage =
      makeUniqueArrOfObjectsWith_IdKey([...state.friends, ...payload]).length /
      state.limit
    state.hasFetchedAllFriends = payload.length < state.limit
  }
}

const handleFriendRequestsPayload = (
  state: Draft<FriendsState>,
  payload: Friend[],
) => {
  const friendRequests = payload.filter(
    (item) => item.isValid === false && item.recipient._id === state.user?._id,
  )
  state.friendRequests = makeUniqueArrOfObjectsWith_IdKey([
    ...state.friendRequests,
    ...friendRequests,
  ])
  const payloadIsFriendRequests = payload.every(
    (item) => item.recipient._id === state.user?._id,
  )
  if (payloadIsFriendRequests) {
    state.friendRequestsPage =
      makeUniqueArrOfObjectsWith_IdKey([...state.friendRequests, ...payload])
        .length / state.limit
    state.hasFetchedAllFriendRequests = payload.length < state.limit
  }
}

const handlePendingFriendsPayload = (
  state: Draft<FriendsState>,
  payload: Friend[],
) => {
  const pendingFriends = payload.filter(
    (item) => item.isValid === false && item.requester._id === state.user?._id,
  )

  state.pendingFriends = makeUniqueArrOfObjectsWith_IdKey([
    ...state.pendingFriends,
    ...pendingFriends,
  ])
  const payloadIsPendingFriends = payload.every(
    (item) => item.requester._id === state.user?._id,
  )
  if (payloadIsPendingFriends) {
    state.pendingFriendsPage =
      makeUniqueArrOfObjectsWith_IdKey([...state.pendingFriends, ...payload])
        .length / state.limit
    state.hasFetchedAllPendingFriends = payload.length < state.limit
  }
}

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
        if (payload.requester._id === state.user?._id) {
          state.pendingFriends = makeUniqueArrOfObjectsWith_IdKey([
            ...state.pendingFriends,
            payload,
          ])
        } else if (payload.recipient._id === state.user?._id) {
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
    accept: (state, action: PayloadAction<Friend | null>) => {
      const payload = action.payload
      const filterOutPayload = (req: Friend) => req._id !== payload?._id
      state.friendRequests = state.friendRequests.filter(filterOutPayload)
      state.pendingFriends = state.pendingFriends.filter(filterOutPayload)
      if (payload) {
        state.friends = makeUniqueArrOfObjectsWith_IdKey([
          ...state.friends,
          payload,
        ])
      }
    },
    seen: (state, action: PayloadAction<Friend | null>) => {
      const payload = action.payload
      const updatePayload = (item: Friend) =>
        item._id === payload?._id ? payload : item
      state.friendRequests = state.friendRequests.map(updatePayload)
      state.pendingFriends = state.pendingFriends.map(updatePayload)
      state.friends = state.friends.map(updatePayload)
    },
    getMany: (state, action: PayloadAction<Friend[]>) => {
      const payload = action.payload
      handleFriendsPayload(state, payload)
      handleFriendRequestsPayload(state, payload)
      handlePendingFriendsPayload(state, payload)
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
