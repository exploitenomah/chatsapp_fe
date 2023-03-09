import { configureStore } from '@reduxjs/toolkit'
import ui from './ui/slice'

const store = configureStore({
  reducer: { ui },
})
const state = store.getState()
export type Store = typeof state
export default store
