import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState from './initialState'

const searchSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
  },
})

export const { updateSearchText } = searchSlice.actions

export const searchActions = searchSlice.actions

export default searchSlice.reducer
