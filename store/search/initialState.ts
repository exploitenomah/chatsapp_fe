// import { User } from '@store/user/initialState'

import { User } from '@store/user/initialState'

const initialState: SearchState = {
  searchText: '',
  searchResults: [],
}

export type SearchState = {
  searchText: string
  searchResults: User[]
}

export default initialState
