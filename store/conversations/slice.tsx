import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import initialState, { Conversation } from './initialState'

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    getMany: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = makeUniqueArrOfObjectsWith_IdKey(action.payload)
      if (state.hasFetchedConversations === false)
        state.hasFetchedConversations = true
    },
  },
})

export const conversationsActions = conversationsSlice.actions
export default conversationsSlice.reducer
