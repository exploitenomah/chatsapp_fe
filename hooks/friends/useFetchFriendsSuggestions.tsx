import { Store } from '@store/index'
import useFriends from '@sockets/useFriends'
import { friendsEvents, FriendsState } from '@store/friends/initialState'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useEmitter from '../useEmitters'

export default function useFetchFriendsSuggestions() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)
  const { suggestionsPage, limit, hasFetchedAllSuggestions } = useSelector<
    Store,
    FriendsState
  >((store) => store.friends)

  const handleFetchSuggestions = useCallback(() => {
    if (hasFetchedAllSuggestions) return
    friendsSocketEmitters.getSuggestions({ page: suggestionsPage, limit })
  }, [friendsSocketEmitters, hasFetchedAllSuggestions, limit, suggestionsPage])
  return handleFetchSuggestions
}
