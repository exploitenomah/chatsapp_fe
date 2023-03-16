import { Store } from '@store/index'
import useFriends from '@sockets/useFriends'
import { FriendsState } from '@store/friends/initialState'
import { toggleShowSuggestionsDrawer } from '@store/ui/slice'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useEmitter from './useEmitters'

export default function useFetchFriendsSuggestions() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, ['getSuggestions'])
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
