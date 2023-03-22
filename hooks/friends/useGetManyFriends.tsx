import { Store } from '@store/index'
import useFriends from '@sockets/useFriends'
import { friendsEvents, FriendsState } from '@store/friends/initialState'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useEmitter from '../useEmitters'

export default function useGetManyFriends() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)
  const { friendsPage, limit, hasFetchedAllFriends, user } = useSelector<
    Store,
    FriendsState
  >((store) => store.friends)

  const handleGetFriends = useCallback(() => {
    if (hasFetchedAllFriends) return
    friendsSocketEmitters.getMany({
      page: friendsPage,
      limit,
      or: [{ requester: user?._id }, { recipient: user?._id }],
      isValid: true,
    })
  }, [
    hasFetchedAllFriends,
    friendsSocketEmitters,
    friendsPage,
    limit,
    user?._id,
  ])
  return handleGetFriends
}
