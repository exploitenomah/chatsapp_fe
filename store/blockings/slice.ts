import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState, { Blocking } from './initialState'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'

export const blockingsSlice = createSlice({
  name: 'blockings',
  initialState,
  reducers: {
    getOne: (state, action: PayloadAction<Blocking | null>) => {
      if (action.payload?._id) {
        state.blockings = makeUniqueArrOfObjectsWith_IdKey([
          ...state.blockings,
          action.payload,
        ])
      }
    },
    unblock: (
      state,
      action: PayloadAction<{
        unblocked: Boolean
        blockingId: string
      }>,
    ) => {
      state.blockings = state.blockings.filter(
        (blocking) => blocking._id !== action.payload.blockingId,
      )
      console.log(action.payload,  'line 27')
    },
    block: (state, action: PayloadAction<Blocking>) => {
      if (action.payload?._id) {
        state.blockings = makeUniqueArrOfObjectsWith_IdKey([
          ...state.blockings,
          action.payload,
        ])
      }
    },
  },
})

export const { getOne, unblock, block } = blockingsSlice.actions

export const blockingsActions = blockingsSlice.actions
export default blockingsSlice.reducer
