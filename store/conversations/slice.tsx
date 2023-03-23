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
    new: (state, action: PayloadAction<Conversation>) => {
      state.conversations = makeUniqueArrOfObjectsWith_IdKey([
        action.payload,
        ...state.conversations,
      ])
    },
  },
})

export const conversationsActions = conversationsSlice.actions
export default conversationsSlice.reducer
