import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState, { Blocking } from './initialState'

export const blockingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getOne: (state, action: PayloadAction<Blocking>) => {
      console.log(action.payload, 'line: 9')
    },
    unblock: (state, action: PayloadAction<Blocking>) => {
      console.log(action.payload, 'line: 12')
    },
    block: (state, action: PayloadAction<Blocking>) => {
      console.log(action.payload, 'line: 15')
    },
  },
})

export const { getOne, unblock } = blockingsSlice.actions

export const blockingsActions = blockingsSlice.actions
export default blockingsSlice.reducer
