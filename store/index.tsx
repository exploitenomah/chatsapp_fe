import { configureStore } from '@reduxjs/toolkit'
import ui from './ui/slice'
import auth from './auth/slice'
import notification from './notifications/slice'
import user from './user/slice'
import friends from './friends/slice'
import conversations from './conversations/slice'

const store = configureStore({
  reducer: { ui, auth, notification, user, friends, conversations },
})
const state = store.getState()
export type Store = typeof state
export default store
