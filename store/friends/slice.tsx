import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { makeUniqueArrOfObjectsWithIdKey } from '@utils/index'
import initialState, { Friend } from './initialState'

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    updateFriends: (state, action: PayloadAction<Friend[]>) => {
      const allFriends = (state.friends = makeUniqueArrOfObjectsWithIdKey([
        ...state.friends,
        ...action.payload,
      ]) as Friend[])
      state.friends = allFriends
      if (state.hasFetchedFriends === false) state.hasFetchedFriends = true
    }
  },
})

export const { updateFriends } = friendsSlice.actions

export default friendsSlice.reducer
