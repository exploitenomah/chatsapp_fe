import { configureStore } from '@reduxjs/toolkit'
import ui from './ui/slice'
import auth from './auth/slice'
import notification from './notifications/slice'
import user from './user/slice'
import friends from './friends/slice'
import conversations from './conversations/slice'
import messages from './messages/slice'
import search from './search/slice'

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: ['ui.activeConversation', 'conversations.conversations'],
      },
      serializableCheck: {
        ignoredPaths: ['ui.activeConversation', 'conversations.conversations'],
      },
    }),
  reducer: {
    ui,
    auth,
    notification,
    user,
    friends,
    conversations,
    messages,
    search,
  },
})
const state = store.getState()
export type Store = typeof state
export default store
