import { FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useFetchFriendsSuggestions from './useFetchFriendsSuggestions'

export default function useFetchInitialSuggestions() {
  const { hasFetchedInitialSuggestions } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )
  const handleFetchSuggestions = useFetchFriendsSuggestions()

  const fetchInitialSuggestions = useCallback(() => {
    hasFetchedInitialSuggestions === false && handleFetchSuggestions()
  }, [handleFetchSuggestions, hasFetchedInitialSuggestions])

  return fetchInitialSuggestions
}
