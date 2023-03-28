import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import initialState, { Message } from './initialState'

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessageWithoutConversationInState: (
      state,
      action: PayloadAction<Message>,
    ) => {
      state.messagesWithoutConversationInState =
        makeUniqueArrOfObjectsWith_IdKey([
          ...state.messagesWithoutConversationInState,
          action.payload,
        ]).map((msg) => {
          if (msg.conversationId === action.payload.conversationId) {
            if (msg._id === action.payload._id)
              return { ...msg, isLatest: true }
            else return { ...msg, isLatest: false }
          } else return msg
        })
    },
    removeMessageWithoutConversationInState: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.messagesWithoutConversationInState =
        state.messagesWithoutConversationInState.filter(
          (msg) => msg.conversationId !== action.payload,
        )
    },
  },
})

export const {
  removeMessageWithoutConversationInState,
  addMessageWithoutConversationInState,
} = messagesSlice.actions

export default messagesSlice.reducer
