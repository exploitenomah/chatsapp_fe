import useFriends from '@sockets/useFriends'
import { useCallback } from 'react'
import useEmitter from '../useEmitters'
import { friendsEvents } from '@store/friends/initialState'

export default function useFriendRequestSeen() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)

  const handleFriendRequestSeen = useCallback(
    (friendshipId: string) => {
      friendsSocketEmitters.seen({ friendshipId })
    },
    [friendsSocketEmitters],
  )
  return handleFriendRequestSeen
}
