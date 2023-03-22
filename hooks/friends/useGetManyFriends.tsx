import { Store } from '@store/index'
import useFriends from '@sockets/useFriends'
import { friendsEvents, FriendsState } from '@store/friends/initialState'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useEmitter from '../useEmitters'
import { User } from '@store/user/initialState'

export default function useGetManyFriends() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)
  const { friendsPage, limit, hasFetchedAllFriends } = useSelector<
    Store,
    FriendsState
  >((store) => store.friends)
  const user = useSelector<Store, User>((store) => store.user)

  const handleGetFriends = useCallback(() => {
    if (hasFetchedAllFriends) return
    friendsSocketEmitters.getMany({
      page: friendsPage,
      limit,
      or: [{ requester: user._id }, { recipient: user._id }],
      isValid: true,
    })
  }, [hasFetchedAllFriends, user, friendsSocketEmitters, friendsPage, limit])
  return handleGetFriends
}
