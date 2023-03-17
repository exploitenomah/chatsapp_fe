import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@store/user/initialState'
import { makeUniqueArrOfObjectsWithIdKey } from '@utils/index'
import initialState, { Friend } from './initialState'

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    updateFriends: (state, action: PayloadAction<Friend[]>) => {
      const allFriends = makeUniqueArrOfObjectsWithIdKey([
        ...state.friends,
        ...action.payload,
      ])
      state.friends = allFriends
      if (state.hasFetchedFriends === false) state.hasFetchedFriends = true
    },
    getSuggestions: (state, action: PayloadAction<User[]>) => {
      state.suggestions = makeUniqueArrOfObjectsWithIdKey([
        ...action.payload,
        ...state.suggestions,
      ])
      state.suggestionsPage = state.suggestionsPage + 1
      state.hasFetchedAllSuggestions = action.payload.length < state.limit
    },
    request: (state, action: PayloadAction<Friend>) => {
      if(!action.payload.is_valid){
        state.pendingFriends = makeUniqueArrOfObjectsWithIdKey([
        ...state.pendingFriends,
        action.payload,
      ])
      }
    },
  },
})

export const { updateFriends } = friendsSlice.actions

export const friendsActions = friendsSlice.actions

export default friendsSlice.reducer
