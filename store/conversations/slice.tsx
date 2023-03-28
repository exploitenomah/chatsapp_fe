import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import initialState, { Conversation } from './initialState'

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    getMany: (state, action: PayloadAction<Conversation[]>) => {
      state.idsOfConversationsNotFetched =
        state.idsOfConversationsNotFetched.filter((id) =>
          action.payload.map((conv) => conv._id).includes(id),
        )
      state.conversations = makeUniqueArrOfObjectsWith_IdKey(
        action.payload.map((item) => ({
          ...item,
          messages: item.messages || [],
          hasFetchedAllMessages: false,
          hasFetchedInitialMessages: false,
          messagesPage: 1,
          shouldScrollMessages: true,
        })),
      )
      if (state.hasFetchedConversations === false)
        state.hasFetchedConversations = true
    },
    new: (state, action: PayloadAction<Conversation>) => {
      state.conversations = makeUniqueArrOfObjectsWith_IdKey([
        { ...action.payload, messages: action.payload.messages || [] },
        ...state.conversations,
      ])
    },
    updateSingleConversation: (
      state,
      action: PayloadAction<{ conversationId: string; update: Conversation }>,
    ) => {
      const { conversationId, update } = action.payload
      state.conversations = state.conversations.map((conversation) => {
        if (conversation._id !== conversationId) return conversation
        else
          return {
            ...conversation,
            ...update,
            messages: makeUniqueArrOfObjectsWith_IdKey([
              ...(conversation.messages || []),
              ...(update.messages || []),
            ]),
          }
      })
    },
    addToIdsOfConversationsNotFetched: (
      state,
      action: PayloadAction<string>,
    ) => {
      const s = new Set([...state.idsOfConversationsNotFetched, action.payload])
      console.log(Array.from(s))
      state.idsOfConversationsNotFetched = Array.from(s)
    },
    removeFromIdsOfConversationsNotFetched: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.idsOfConversationsNotFetched =
        state.idsOfConversationsNotFetched.filter((id) =>
          action.payload.includes(id),
        )
    },
    updateNotifications: (
      state,
      action: PayloadAction<{
        totalUnseenMessages: number
        conversationsWithUnseenMessagesCount: number
      }>,
    ) => {
      state.totalUnseenMessages = action.payload.totalUnseenMessages
      state.conversationsWithUnseenMessagesCount =
        action.payload.conversationsWithUnseenMessagesCount
    },
  },
})
export const {
  updateSingleConversation,
  getMany,
  updateNotifications,
  addToIdsOfConversationsNotFetched,
  removeFromIdsOfConversationsNotFetched,
} = conversationsSlice.actions
export const conversationsActions = conversationsSlice.actions
export default conversationsSlice.reducer
