import { User } from '@store/user/initialState'

const initialState: SearchState = {
  searchText: '',
  searchedUsersResults: [],
  loading: false,
  searchedUsersPage: 0,
}

export type SearchState = {
  searchText: string
  searchedUsersResults: User[]
  searchedUsersPage: number
  loading: boolean
}

export const searchLimit = 100

export default initialState
