import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState, { searchLimit } from './initialState'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'
import { User } from '@store/user/initialState'

const searchSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    toggleLoading: (state, action: PayloadAction<boolean | undefined>) => {
      state.loading =
        typeof action.payload === 'boolean' ? action.payload : !state.loading
    },
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
      state.searchedUsersPage = 1
    },
    updateSearchedUsersResults: (state, action: PayloadAction<User[]>) => {
      if (action.payload.length >= searchLimit)
        state.searchedUsersPage = state.searchedUsersPage + 1
      state.searchedUsersResults = makeUniqueArrOfObjectsWith_IdKey([
        ...state.searchedUsersResults,
        ...action.payload,
      ])
    },
  },
})

export const { updateSearchText, updateSearchedUsersResults, toggleLoading } =
  searchSlice.actions

export const searchActions = searchSlice.actions

export default searchSlice.reducer
