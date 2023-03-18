import useFriends from '@sockets/useFriends'
import { useCallback } from 'react'
import useEmitter from '../useEmitters'
import { friendsEvents } from '@store/friends/initialState'

export default function useRemoveFriend() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)

  const handleRemoveFriend = useCallback(
    (friendshipId: string) => {
      friendsSocketEmitters.remove({ friendshipId })
    },
    [friendsSocketEmitters],
  )
  return handleRemoveFriend
}
