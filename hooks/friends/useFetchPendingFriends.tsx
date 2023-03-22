import { Store } from '@store/index'
import useFriends from '@sockets/useFriends'
import { friendsEvents, FriendsState } from '@store/friends/initialState'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useEmitter from '../useEmitters'

export default function useGetManyPendingFriends() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)
  const { pendingFriendsPage, limit, hasFetchedAllPendingFriends, user } =
    useSelector<Store, FriendsState>((store) => store.friends)

  const handleGetFriendRequests = useCallback(() => {
    if (hasFetchedAllPendingFriends) return
    friendsSocketEmitters.getMany({
      page: pendingFriendsPage,
      limit,
      requester: user?._id,
      isValid: false,
    })
  }, [
    hasFetchedAllPendingFriends,
    friendsSocketEmitters,
    pendingFriendsPage,
    limit,
    user?._id,
  ])
  return handleGetFriendRequests
}
