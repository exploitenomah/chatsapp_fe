import useFriends from '@sockets/useFriends'
import { useCallback } from 'react'
import useEmitter from '../useEmitters'
import { friendsEvents } from '@store/friends/initialState'

export default function useAcceptFriend() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)

  const handleAcceptFriend = useCallback(
    (friendshipId: string) => {
      friendsSocketEmitters.accept({ friendshipId })
    },
    [friendsSocketEmitters],
  )
  return handleAcceptFriend
}
