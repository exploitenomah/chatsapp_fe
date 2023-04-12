import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import initialState, { Conversation } from './initialState'

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    unSeenMsgsCount: (
      state,
      action: PayloadAction<{
        conversationId: string
        unSeenMsgsCount: number
      }>,
    ) => {
      state.conversations = state.conversations.map((conv) => {
        if (conv._id !== action.payload.conversationId) return conv
        else return { ...conv, unSeenMsgsCount: action.payload.unSeenMsgsCount }
      })
    },
    getMany: (state, action: PayloadAction<Conversation[]>) => {
      state.idsOfConversationsNotFetched =
        state.idsOfConversationsNotFetched.filter((id) =>
          action.payload.map((conv) => conv._id).includes(id),
        )
      const updConversationsList = makeUniqueArrOfObjectsWith_IdKey(
        action.payload.map((item) => ({
          ...item,
          messages: item.messages || [],
          hasFetchedAllMessages: false,
          hasFetchedInitialMessages: false,
          messagesPage: 1,
          shouldScrollMessages: true,
        })),
      )
      state.conversations = updConversationsList
      if (state.hasFetchedInitialConversations === false)
        state.hasFetchedInitialConversations = true
      state.hasFetchedAllConversation = action.payload.length < 100
      state.conversationsPage = Math.ceil(updConversationsList.length / 100) + 1
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
      const idsOfConversationsNotInState = new Set([
        ...state.idsOfConversationsNotFetched,
        action.payload,
      ])
      state.idsOfConversationsNotFetched = Array.from(
        idsOfConversationsNotInState,
      )
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
    resetConversations: () => initialState,
  },
})
export const {
  updateSingleConversation,
  getMany,
  updateNotifications,
  addToIdsOfConversationsNotFetched,
  removeFromIdsOfConversationsNotFetched,
  resetConversations,
} = conversationsSlice.actions
export const conversationsActions = conversationsSlice.actions
export default conversationsSlice.reducer
