import { configureStore } from '@reduxjs/toolkit'
import ui from './ui/slice'
import auth from './auth/slice'
import notification from './notifications/slice'

const store = configureStore({
  reducer: { ui, auth, notification },
})
const state = store.getState()
export type Store = typeof state
export default store
