import { Store } from '@store/index'
import useFriends from '@sockets/useFriends'
import { friendsEvents, FriendsState } from '@store/friends/initialState'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useEmitter from '../useEmitters'

export default function useGetManyFriendRequests() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)
  const { friendRequestsPage, limit, hasFetchedAllFriends, user } = useSelector<
    Store,
    FriendsState
  >((store) => store.friends)

  const handleGetFriendRequests = useCallback(() => {
    if (hasFetchedAllFriends) return
    friendsSocketEmitters.getMany({
      page: friendRequestsPage,
      limit,
      recipient: user?._id,
      isValid: false,
    })
  }, [
    hasFetchedAllFriends,
    friendsSocketEmitters,
    friendRequestsPage,
    limit,
    user?._id,
  ])
  return handleGetFriendRequests
}
