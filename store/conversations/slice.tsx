import { createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {},
})

export default conversationsSlice.reducer
